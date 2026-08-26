const { initializeApp } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
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

// ── 3. Promover pedidos de marcação públicos para marcações reais ──────
// O funil público (saudecare-funil-publico.html) escreve em
// public_booking_requests porque o cliente final não tem conta. Esta
// função confirma o pedido e cria a marcação real na agenda do
// subscritor — hoje isto fica preso na fila sem ninguém automatizar.
exports.processBookingRequest = onDocumentCreated('public_booking_requests/{requestId}', async (event) => {
  const snap = event.data;
  const request = snap.data();
  if (!request || request.status !== 'pending_review') return;

  const { tenantId, serviceName, servicePrice, clientName, clientPhone, clientEmail, requestedStart } = request;

  const tenantSnap = await db.doc(`tenants/${tenantId}`).get();
  if (!tenantSnap.exists || !['trial', 'active'].includes(tenantSnap.data().status)) {
    await snap.ref.update({ status: 'rejected', reason: 'tenant_inactive' });
    return;
  }

  // Cria (ou reaproveita) o paciente pelo telefone/email antes de marcar.
  const patientsRef = db.collection(`tenants/${tenantId}/patients`);
  let patientId;
  const existing = await patientsRef
    .where('phone', '==', clientPhone || '__none__')
    .limit(1).get();

  if (!existing.empty) {
    patientId = existing.docs[0].id;
  } else {
    const newPatient = await patientsRef.add({
      fullName: clientName,
      phone: clientPhone || '',
      email: clientEmail || '',
      clinicalNotes: '',
      consentGivenAt: FieldValue.serverTimestamp(),
      consentVersion: 'booking-v1',
      createdBy: 'system:booking-funnel'
    });
    patientId = newPatient.id;
  }

  const startDate = new Date(requestedStart);
  await db.collection(`tenants/${tenantId}/appointments`).add({
    patientId,
    patientName: clientName,
    serviceName: serviceName || '',
    startsAt: startDate,
    endsAt: new Date(startDate.getTime() + 50 * 60000), // duração por defeito; ajustável no painel
    status: 'pending', // fica visível como "a confirmar" até o subscritor validar
    createdAt: FieldValue.serverTimestamp(),
    source: 'public_booking_funnel'
  });

  await snap.ref.update({ status: 'processed', processedAt: FieldValue.serverTimestamp() });
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
