const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const { onDocumentCreated, onDocumentWritten } = require('firebase-functions/v2/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { setGlobalOptions } = require('firebase-functions/v2');

initializeApp();
const db = getFirestore();
const auth = getAuth();

// Região europeia — mantém os dados a serem processados na UE (RGPD),
// tal como o resto do projeto (Firestore já está em eur3).
setGlobalOptions({ region: 'europe-west1' });

// ── 1. Atribuir tenantId + role a uma conta (substitui o script manual) ─
// Só a plataforma (tu) pode chamar isto. Antes fazias isto à mão no Cloud
// Shell com setclaim.js — agora é uma função protegida, chamada a partir
// de um botão no futuro painel de administração da plataforma.
exports.assignTenantClaim = onCall(async (request) => {
  const callerUid = request.auth?.uid;
  if (!callerUid) {
    throw new HttpsError('unauthenticated', 'É necessário iniciar sessão.');
  }
  const adminSnap = await db.doc(`platform_admins/${callerUid}`).get();
  if (!adminSnap.exists) {
    throw new HttpsError('permission-denied', 'Só a plataforma pode atribuir subscritores.');
  }

  const { uid, tenantId, role } = request.data || {};
  if (!uid || !tenantId) {
    throw new HttpsError('invalid-argument', 'uid e tenantId são obrigatórios.');
  }

  const tenantSnap = await db.doc(`tenants/${tenantId}`).get();
  if (!tenantSnap.exists) {
    throw new HttpsError('not-found', 'Esse tenantId não existe.');
  }

  await auth.setCustomUserClaims(uid, { tenantId, role: role || 'owner' });
  return { success: true, uid, tenantId, role: role || 'owner' };
});

// ── 2. Sincronizar automaticamente o perfil público ─────────────────────
// Sempre que o documento de um tenant muda (nome, logótipo, cor, contacto,
// redes sociais), reflete os campos públicos em public_tenant_profiles.
// Isto substitui a sincronização feita no cliente (saveProfile) — passa a
// funcionar mesmo que os dados sejam editados diretamente na consola, e
// tira essa responsabilidade/risco do browser do subscritor.
exports.syncPublicProfile = onDocumentWritten('tenants/{tenantId}', async (event) => {
  const after = event.data?.after?.data();
  if (!after) return; // documento apagado — não sincroniza remoção aqui

  const slug = after.slug;
  if (!slug) return;

  await db.doc(`public_tenant_profiles/${slug}`).set({
    tenantId: event.params.tenantId,
    businessName: after.businessName || '',
    tagline: after.profile?.tagline || '',
    about: after.profile?.about || '',
    branding: after.branding || {},
    phone: after.profile?.phone || '',
    email: after.profile?.email || '',
    address: after.profile?.address || '',
    social: after.profile?.social || {},
    legalTexts: after.legalTexts || {}
  }, { merge: true });
});

// ── 3. Validar pedidos de marcação públicos ────────────────────────────
// O funil público (marcar.html) escreve em public_booking_requests porque
// o cliente final não tem conta. Esta função NÃO cria pacientes nem
// marcações sozinha (o cliente ainda não deu consentimento RGPD e o
// subscritor quer rever cada pedido). Faz o trabalho chato antes:
//  - rejeita pedidos para contas inativas;
//  - descobre a duração REAL do serviço escolhido (e o intervalo entre
//    sessões), em vez de assumir 50 minutos;
//  - verifica se o horário pedido choca com marcações já existentes e
//    deixa o aviso no pedido (conflict / conflictWith) para o subscritor ver.
// O pedido continua em "pending_review" até o subscritor aceitar na app.
exports.processBookingRequest = onDocumentCreated('public_booking_requests/{requestId}', async (event) => {
  const snap = event.data;
  const request = snap.data();
  if (!request || request.status !== 'pending_review') return;

  const { tenantId, serviceId, requestedStart } = request;
  if (!tenantId) return;

  const tenantSnap = await db.doc(`tenants/${tenantId}`).get();
  if (!tenantSnap.exists || !['trial', 'active'].includes(tenantSnap.data().status)) {
    await snap.ref.update({ status: 'rejected', reason: 'tenant_inactive' });
    return;
  }

  let svc = null;
  if (serviceId) {
    const svcSnap = await db.doc(`tenants/${tenantId}/services/${serviceId}`).get();
    if (svcSnap.exists) svc = svcSnap.data();
  }
  const durationMinutes = parseInt(svc?.durationMinutes, 10) || 50;
  const bufferMinutes = parseInt(svc?.bufferMinutes, 10) || 0;

  const update = { durationMinutes, bufferMinutes, validatedAt: FieldValue.serverTimestamp() };

  const start = requestedStart ? new Date(requestedStart) : null;
  if (start && !isNaN(start.getTime())) {
    const end = new Date(start.getTime() + durationMinutes * 60000);
    update.requestedEnd = end.toISOString();

    // Marcações que começam nas 12h anteriores até ao fim do pedido.
    const near = await db.collection(`tenants/${tenantId}/appointments`)
      .where('startsAt', '>=', Timestamp.fromDate(new Date(start.getTime() - 12 * 3600000)))
      .where('startsAt', '<', Timestamp.fromDate(new Date(end.getTime() + bufferMinutes * 60000)))
      .get();

    let clash = null;
    near.forEach(d => {
      if (clash) return;
      const a = d.data();
      if (a.status === 'cancelled' || !a.startsAt) return;
      const aStart = a.startsAt.toDate();
      const aEnd = a.endsAt ? a.endsAt.toDate() : new Date(aStart.getTime() + 50 * 60000);
      const aBuf = (parseInt(a.bufferMinutes, 10) || 0) * 60000;
      const pedidoFim = end.getTime() + bufferMinutes * 60000;
      if (aStart.getTime() < pedidoFim && aEnd.getTime() + aBuf > start.getTime()) {
        clash = { patientName: a.patientName || '', serviceName: a.serviceName || '', startsAt: aStart.toISOString() };
      }
    });
    update.conflict = !!clash;
    if (clash) update.conflictWith = clash;
  }

  await snap.ref.update(update);
});

// ── 4. Auto-associar respostas de fichas quando já vêm identificadas ────
// Quando o link enviado ao paciente já inclui o patientId (ver
// "Enviar ficha a este paciente" no painel), a resposta pode ser anexada
// à ficha automaticamente, sem precisar do toque manual de confirmação —
// porque já não há ambiguidade sobre a quem pertence.
exports.processFormResponse = onDocumentCreated('public_form_responses/{responseId}', async (event) => {
  const snap = event.data;
  const response = snap.data();
  if (!response || response.status !== 'pending_review' || !response.patientId) return;

  const { tenantId, patientId, formId, formTitle, answers, submittedAt } = response;

  const patientSnap = await db.doc(`tenants/${tenantId}/patients/${patientId}`).get();
  if (!patientSnap.exists) return; // deixa pendente para associação manual

  await db.collection(`tenants/${tenantId}/patients/${patientId}/formResponses`).add({
    formId, formTitle, answers,
    submittedAt: submittedAt || FieldValue.serverTimestamp(),
    autoAttached: true
  });

  await snap.ref.update({ status: 'processed', processedAt: FieldValue.serverTimestamp() });
});

// ── 5. Limpar registos órfãos (RGPD) ────────────────────────────────────
// Antes de a app apagar tudo ao eliminar um paciente, ficavam para trás
// relatórios, fichas, mensagens, check-ins e protocolos de pacientes que já
// não existem. Esta função encontra-os. Por defeito só CONTA (apply=false);
// só apaga quando recebe apply=true. Só a plataforma pode chamar.
async function exigirPlataforma(request) {
  const callerUid = request.auth?.uid;
  if (!callerUid) throw new HttpsError('unauthenticated', 'É necessário iniciar sessão.');
  const adminSnap = await db.doc(`platform_admins/${callerUid}`).get();
  if (!adminSnap.exists) throw new HttpsError('permission-denied', 'Só a plataforma pode fazer isto.');
  return callerUid;
}

exports.cleanOrphanRecords = onCall({ timeoutSeconds: 300, memory: '512MiB' }, async (request) => {
  await exigirPlataforma(request);
  const apply = request.data?.apply === true;
  const subs = ['reports', 'formResponses', 'messages', 'checkins', 'healingProtocols'];
  const existe = new Map();
  const patientExiste = async (tenantId, patientId) => {
    const k = `${tenantId}/${patientId}`;
    if (!existe.has(k)) existe.set(k, (await db.doc(`tenants/${tenantId}/patients/${patientId}`).get()).exists);
    return existe.get(k);
  };

  const resultado = { apply, porColecao: {} };
  for (const sub of subs) {
    const snap = await db.collectionGroup(sub).get();
    let orfaos = 0;
    for (const d of snap.docs) {
      const partes = d.ref.path.split('/'); // tenants/{t}/patients/{p}/{sub}/{id}
      if (partes.length !== 6 || partes[0] !== 'tenants' || partes[2] !== 'patients') continue;
      if (!(await patientExiste(partes[1], partes[3]))) {
        orfaos++;
        if (apply) await d.ref.delete();
      }
    }
    resultado.porColecao[sub] = orfaos;
  }

  // Contactos privados de pacientes que já não existem.
  const contactos = await db.collectionGroup('patientContacts').get();
  let orfaosContactos = 0;
  for (const d of contactos.docs) {
    const partes = d.ref.path.split('/'); // tenants/{t}/patientContacts/{p}
    if (partes.length !== 4 || partes[0] !== 'tenants') continue;
    if (!(await patientExiste(partes[1], partes[3]))) {
      orfaosContactos++;
      if (apply) await d.ref.delete();
    }
  }
  resultado.porColecao.patientContacts = orfaosContactos;
  resultado.total = Object.values(resultado.porColecao).reduce((a, b) => a + b, 0);
  return resultado;
});

// ── 6. Apagar uma conta de subscritor por completo ─────────────────────
// Remove o subscritor e TUDO o que lhe pertence: pacientes e restantes
// dados, perfil público, pedidos pendentes e os utilizadores de login.
// Irreversível. Exige que escrevas o identificador da conta para confirmar.
// A conta da própria plataforma (hikari-terapias) nunca pode ser apagada.
// Nota: as fotos já enviadas para o Cloudinary não são apagadas aqui.
exports.deleteTenantAccount = onCall({ timeoutSeconds: 540, memory: '512MiB' }, async (request) => {
  const callerUid = await exigirPlataforma(request);
  const { tenantId, confirm } = request.data || {};
  if (!tenantId) throw new HttpsError('invalid-argument', 'tenantId é obrigatório.');
  if (tenantId === 'hikari-terapias') {
    throw new HttpsError('failed-precondition', 'Esta conta não pode ser apagada.');
  }
  if (confirm !== tenantId) {
    throw new HttpsError('failed-precondition', 'Confirmação incorreta: escreve exatamente o identificador da conta.');
  }

  const ref = db.doc(`tenants/${tenantId}`);
  const snap = await ref.get();
  if (!snap.exists) throw new HttpsError('not-found', 'Essa conta não existe.');
  const t = snap.data();

  // 1. Utilizadores de login ligados a esta conta (nunca administradores da plataforma).
  const uids = [];
  let pageToken;
  do {
    const page = await auth.listUsers(1000, pageToken);
    for (const u of page.users) {
      if (u.customClaims?.tenantId === tenantId && u.uid !== callerUid) uids.push(u.uid);
    }
    pageToken = page.pageToken;
  } while (pageToken);
  const seguros = [];
  for (const uid of uids) {
    if (!(await db.doc(`platform_admins/${uid}`).get()).exists) seguros.push(uid);
  }

  // 2. Dados externos à conta que apontam para ela.
  const externas = ['public_booking_requests', 'public_form_responses', 'public_training_signups',
    'platform_support_requests', 'modulo_requests', 'pe_questionarios', 'privateMethodRequests', 'inviteCodes'];
  const apagadasExternas = {};
  for (const col of externas) {
    const q = await db.collection(col).where('tenantId', '==', tenantId).get();
    apagadasExternas[col] = q.size;
    for (const d of q.docs) await d.ref.delete();
  }
  if (t.slug) await db.doc(`public_tenant_profiles/${t.slug}`).delete();

  // 3. A conta em si, com todas as subcoleções (pacientes, agenda, etc.).
  await db.recursiveDelete(ref);

  // 4. Por fim, os logins (só depois de os dados saírem).
  let loginsApagados = 0;
  if (seguros.length) {
    const r = await auth.deleteUsers(seguros);
    loginsApagados = r.successCount;
  }

  return { success: true, tenantId, loginsApagados, externas: apagadasExternas };
});
