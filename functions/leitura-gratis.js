// Limite da leitura grátis (Mapa da Alma / Tarot): uma por semana por contacto e por rede,
// verificado no servidor. Alunos entram com um código que só o servidor valida.
const crypto = require('crypto');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const db = getFirestore();
const DONO = 'hikari-terapias';
const SEMANA = 7 * 864e5;
const hash = (t) => crypto.createHash('sha256').update('vindora-gratis|' + t).digest('hex').slice(0, 40);
const normContacto = (c) => { const s = String(c || '').trim().toLowerCase(); return s.includes('@') ? s : s.replace(/\D/g, '').replace(/^(00)?351/, ''); };

async function codigoAluno() {
  const ref = db.doc('settings/leituraGratis');
  const d = (await ref.get()).data() || {};
  if (d.codigoAluno) return d.codigoAluno;
  const c = crypto.randomBytes(6).toString('hex');
  await ref.set({ codigoAluno: c }, { merge: true });
  return c;
}

exports.leituraGratis = onCall({ timeoutSeconds: 30 }, async (request) => {
  const d = request.data || {};
  const codigo = String(d.codigo || '').trim();
  if (codigo && codigo === await codigoAluno()) return { permitido: true, aluno: true };
  const contacto = normContacto(d.contacto);
  if (contacto.length < 5) return { permitido: true };
  const ip = String((request.rawRequest && (request.rawRequest.headers['x-forwarded-for'] || request.rawRequest.ip)) || '').split(',')[0].trim();
  const kC = `c_${hash(contacto)}`, kI = ip ? `i_${hash(ip)}` : null;
  const agora = Date.now();
  return db.runTransaction(async (tx) => {
    const rc = db.doc(`leituras_gratis/${kC}`), ri = kI ? db.doc(`leituras_gratis/${kI}`) : null;
    const sc = await tx.get(rc), si = ri ? await tx.get(ri) : null;
    const tC = sc.exists ? sc.data().ultima || 0 : 0;
    if (tC && agora - tC < SEMANA) return { permitido: false, proxima: tC + SEMANA };
    let n = 0, ini = agora;
    if (si && si.exists && agora - (si.data().inicio || 0) < SEMANA) { n = si.data().n || 0; ini = si.data().inicio; }
    if (n >= 3) return { permitido: false, proxima: ini + SEMANA };
    tx.set(rc, { ultima: agora, em: FieldValue.serverTimestamp() });
    if (ri) tx.set(ri, { n: n + 1, inicio: ini });
    return { permitido: true };
  });
});

exports.leituraGratisConfig = onCall(async (request) => {
  const t = (request.auth && request.auth.token) || {};
  if (t.tenantId !== DONO || t.role !== 'owner') throw new HttpsError('permission-denied', 'Só o dono.');
  if (request.data && request.data.acao === 'novo') {
    const c = crypto.randomBytes(6).toString('hex');
    await db.doc('settings/leituraGratis').set({ codigoAluno: c }, { merge: true });
    return { codigo: c };
  }
  return { codigo: await codigoAluno() };
});
