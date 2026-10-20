// Licenças de teste do método "Pesquisa Emocional Clínica".
// Tudo passa por aqui: criar/pausar/prolongar/remover/apagar links, ativar a conta
// de quem testa e entregar o código do método SÓ a licenças válidas.
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { getAuth } = require('firebase-admin/auth');
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

const db = getFirestore();
const auth = getAuth();
const SITE = 'https://vindora.pt/pe-teste.html';
const DONO = 'hikari-terapias';
const DIA = 86400000;

async function exigirAdmin(request) {
  const uid = request.auth && request.auth.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Inicia sessão.');
  const t = request.auth.token || {};
  if (t.tenantId === DONO && t.role === 'owner') return uid;
  const s = await db.doc(`platform_admins/${uid}`).get();
  if (s.exists) return uid;
  throw new HttpsError('permission-denied', 'Só o dono do método pode gerir licenças.');
}

const idTenant = (id) => `pe-${id}`;
const link = (id, token) => `${SITE}?l=${id}.${token}`;
const iguais = (a, b) => {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
};
function estadoEfetivo(l) {
  if (l.estado === 'ativa' && l.expiraEm && l.expiraEm.toMillis() < Date.now()) return 'expirada';
  if (l.estado === 'pendente' && l.linkAte && l.linkAte.toMillis() < Date.now()) return 'link caducado';
  return l.estado;
}
async function estadoTenant(id, status, extra) {
  await db.doc(`tenants/${idTenant(id)}`).set({ status, statusChangedAt: FieldValue.serverTimestamp(), ...(extra || {}) }, { merge: true });
}

exports.peAdmin = onCall({ timeoutSeconds: 300, memory: '512MiB' }, async (request) => {
  await exigirAdmin(request);
  const { acao, id } = request.data || {};
  const ref = id ? db.doc(`pe_licencas/${String(id)}`) : null;
  const carregar = async () => {
    const s = await ref.get();
    if (!s.exists) throw new HttpsError('not-found', 'Licença não encontrada.');
    return s.data();
  };

  if (acao === 'criar') {
    const nome = String(request.data.nome || '').trim().slice(0, 80);
    const dias = Math.max(1, Math.min(365, parseInt(request.data.dias, 10) || 7));
    const email = String(request.data.email || '').trim().toLowerCase().slice(0, 120);
    if (!nome) throw new HttpsError('invalid-argument', 'Escreve o nome de quem vai testar.');
    const novoId = crypto.randomBytes(5).toString('hex');
    const token = crypto.randomBytes(24).toString('base64url');
    await db.doc(`pe_licencas/${novoId}`).set({
      nome, token, dias, emailPrevisto: email || null, estado: 'pendente',
      criadaEm: FieldValue.serverTimestamp(), linkAte: Timestamp.fromMillis(Date.now() + 14 * DIA),
      uid: null, email: null, expiraEm: null, acessos: 0
    });
    return { id: novoId, link: link(novoId, token) };
  }

  if (acao === 'listar') {
    const snap = await db.collection('pe_licencas').orderBy('criadaEm', 'desc').limit(200).get();
    return { licencas: snap.docs.map((d) => {
      const l = d.data();
      return { id: d.id, nome: l.nome, email: l.email || l.emailPrevisto || '', dias: l.dias, estado: estadoEfetivo(l),
        expiraEm: l.expiraEm ? l.expiraEm.toMillis() : null, criadaEm: l.criadaEm ? l.criadaEm.toMillis() : null,
        ultimoAcesso: l.ultimoAcesso ? l.ultimoAcesso.toMillis() : null, acessos: l.acessos || 0,
        link: (l.estado === 'pendente') ? link(d.id, l.token) : null };
    }) };
  }

  if (acao === 'pausar' || acao === 'remover') {
    const l = await carregar();
    await ref.update({ estado: acao === 'pausar' ? 'pausada' : 'removida' });
    if (l.uid) {
      await estadoTenant(id, 'suspended');
      try { await auth.revokeRefreshTokens(l.uid); } catch (_) {}
      if (acao === 'remover') { try { await auth.updateUser(l.uid, { disabled: true }); } catch (_) {} }
    }
    return { ok: true };
  }

  if (acao === 'retomar') {
    const l = await carregar();
    if (l.estado === 'removida' && l.uid) { try { await auth.updateUser(l.uid, { disabled: false }); } catch (_) {} }
    await ref.update({ estado: l.uid ? 'ativa' : 'pendente' });
    if (l.uid) await estadoTenant(id, 'trial', { trialEndsAt: l.expiraEm });
    return { ok: true };
  }

  if (acao === 'prolongar') {
    const l = await carregar();
    const dias = Math.max(1, Math.min(365, parseInt(request.data.dias, 10) || 7));
    if (!l.uid) { await ref.update({ dias: dias, linkAte: Timestamp.fromMillis(Date.now() + 14 * DIA) }); return { ok: true }; }
    const base = Math.max(Date.now(), l.expiraEm ? l.expiraEm.toMillis() : 0);
    const nova = Timestamp.fromMillis(base + dias * DIA);
    await ref.update({ expiraEm: nova, estado: l.estado === 'expirada' || l.estado === 'ativa' ? 'ativa' : l.estado });
    if (l.estado === 'ativa' || l.estado === 'expirada') await estadoTenant(id, 'trial', { trialEndsAt: nova });
    else await db.doc(`tenants/${idTenant(id)}`).set({ trialEndsAt: nova }, { merge: true });
    return { ok: true, expiraEm: nova.toMillis() };
  }

  if (acao === 'apagar') {
    const l = await carregar();
    if (l.uid) { try { await auth.deleteUser(l.uid); } catch (_) {} }
    try { await db.recursiveDelete(db.doc(`tenants/${idTenant(id)}`)); } catch (_) {}
    await ref.delete();
    return { ok: true };
  }

  throw new HttpsError('invalid-argument', 'Ação desconhecida.');
});

// Chamada por quem testa logo depois de criar a conta, com o link na mão.
exports.peAtivar = onCall(async (request) => {
  const uid = request.auth && request.auth.uid;
  const email = request.auth && request.auth.token && request.auth.token.email;
  if (!uid || !email) throw new HttpsError('unauthenticated', 'Inicia sessão.');
  const id = String((request.data || {}).l || ''), token = String((request.data || {}).t || '');
  if (!/^[0-9a-f]{10}$/.test(id) || !token) throw new HttpsError('invalid-argument', 'Link inválido.');
  const ref = db.doc(`pe_licencas/${id}`);
  const s = await ref.get();
  if (!s.exists || !iguais(s.data().token, token)) throw new HttpsError('permission-denied', 'Este link não é válido.');
  const l = s.data();
  if (l.estado === 'ativa' && l.uid === uid) return { ok: true, jaAtiva: true };
  if (l.estado !== 'pendente') throw new HttpsError('permission-denied', 'Este link já foi usado ou está suspenso.');
  if (l.linkAte && l.linkAte.toMillis() < Date.now()) throw new HttpsError('permission-denied', 'Este link caducou. Pede um novo.');
  if (l.emailPrevisto && l.emailPrevisto !== String(email).toLowerCase()) throw new HttpsError('permission-denied', 'Este link é para outro email.');
  // Nunca mexer numa conta que já pertence a uma clínica Vindora (perderia o acesso).
  if (request.auth.token.tenantId) throw new HttpsError('failed-precondition', 'Este email já pertence a uma conta Vindora. Para o teste, usa outro email.');
  const expira = Timestamp.fromMillis(Date.now() + l.dias * DIA);
  await db.doc(`tenants/${idTenant(id)}`).set({
    name: l.nome, nome: l.nome, status: 'trial', plan: 'pe-teste', trialEndsAt: expira,
    ownerUid: uid, ownerEmail: email, modulos: { pesquisaEmocional: true }, tipo: 'pe-teste',
    createdAt: FieldValue.serverTimestamp()
  });
  await auth.setCustomUserClaims(uid, { tenantId: idTenant(id), role: 'owner', peLic: id });
  await ref.update({ estado: 'ativa', uid, email: String(email).toLowerCase(), ativadaEm: FieldValue.serverTimestamp(), expiraEm: expira, termosAceitesEm: (request.data || {}).termos === true ? FieldValue.serverTimestamp() : null });
  return { ok: true };
});

async function licencaValida(request) {
  const t = (request.auth && request.auth.token) || {};
  if (!request.auth) throw new HttpsError('unauthenticated', 'Inicia sessão.');
  if (t.tenantId === DONO && t.role === 'owner') return { id: 'dono', dono: true };
  if (!t.peLic) {
    // Subscritor com pedido aprovado (termo assinado) e módulo ativo.
    if (t.tenantId) {
      const td = (await db.doc(`tenants/${t.tenantId}`).get()).data() || {};
      if (td.modulos && td.modulos.pesquisaEmocional === true && td.peTermoId) {
        const ts = (await db.doc(`pe_termos/${td.peTermoId}`).get()).data();
        if (ts && ts.estado === 'aprovado' && ts.tenantId === t.tenantId) return { id: 't-' + td.peTermoId, termo: true };
      }
    }
    throw new HttpsError('permission-denied', 'Sem licença.');
  }
  const s = await db.doc(`pe_licencas/${t.peLic}`).get();
  if (!s.exists) throw new HttpsError('permission-denied', 'Licença inexistente.');
  const l = s.data();
  if (l.uid !== request.auth.uid || l.estado !== 'ativa') throw new HttpsError('permission-denied', 'Acesso suspenso.');
  if (!l.expiraEm || l.expiraEm.toMillis() < Date.now()) throw new HttpsError('permission-denied', 'O período de teste terminou.');
  return { id: t.peLic, l, ref: s.ref };
}

// Estado da licença (para mostrar "faltam X dias").
exports.peEntrar = onCall(async (request) => {
  const v = await licencaValida(request);
  if (v.dono || v.termo) return { ok: true, dono: !!v.dono };
  await v.ref.update({ ultimoAcesso: FieldValue.serverTimestamp(), acessos: FieldValue.increment(1) });
  return { ok: true, nome: v.l.nome, expiraEm: v.l.expiraEm.toMillis() };
});

// Entrega do código do método, ofuscado e com marca de água, só a licenças válidas.
let CACHE = null;
function codigoOfuscado() {
  if (CACHE) return CACHE;
  const fonte = fs.readFileSync(path.join(__dirname, 'protegido', 'pe-modulo.js'), 'utf8');
  let saida = fonte;
  try {
    const O = require('javascript-obfuscator');
    saida = O.obfuscate(fonte, {
      compact: true, simplify: true, stringArray: true, stringArrayEncoding: ['base64'], stringArrayThreshold: 0.75,
      stringArrayRotate: true, stringArrayShuffle: true, splitStrings: true, splitStringsChunkLength: 12,
      identifierNamesGenerator: 'hexadecimal', renameGlobals: false, selfDefending: false, debugProtection: false,
      controlFlowFlattening: false, deadCodeInjection: false, transformObjectKeys: false, unicodeEscapeSequence: false
    }).getObfuscatedCode();
  } catch (e) { console.error('ofuscação falhou, a enviar sem ofuscar', e.message); }
  CACHE = saida;
  return CACHE;
}
exports.peModulo = onCall({ timeoutSeconds: 120, memory: '1GiB' }, async (request) => {
  const v = await licencaValida(request);
  const marca = `globalThis.__peWM=${JSON.stringify(v.id + ':' + request.auth.uid.slice(0, 6))};\n`;
  return { codigo: marca + codigoOfuscado() };
});
