// Fichas e questionários enviados aos pacientes por link.
//  • fichaEnviarEmail: envia o link ao paciente a partir do Gmail do próprio terapeuta.
//  • fichaAutoAnexar: quando o paciente responde, a resposta fica guardada sozinha na ficha dele.
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onDocumentUpdated } = require('firebase-functions/v2/firestore');
const nodemailer = require('nodemailer');
const db = getFirestore();

const ok = (t) => String(t == null ? '' : t).trim();
const EMAIL = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
const linkDe = (id) => `https://vindora.pt/form-publica.html?r=${id}`;

exports.fichaEnviarEmail = onCall({ timeoutSeconds: 60 }, async (request) => {
  const t = (request.auth && request.auth.token) || {};
  if (!request.auth || !t.tenantId) throw new HttpsError('unauthenticated', 'Inicie sessão.');
  const tid = t.tenantId;
  const id = ok(request.data && request.data.responseId);
  if (!id) throw new HttpsError('invalid-argument', 'Falta a ficha.');
  const rs = await db.doc(`public_form_responses/${id}`).get();
  const r = rs.data();
  if (!r || r.tenantId !== tid) throw new HttpsError('permission-denied', 'Ficha inválida.');
  const seg = (await db.doc(`tenant_secrets/${tid}`).get()).data();
  if (!seg || !seg.email || !seg.pass) throw new HttpsError('failed-precondition', 'sem-gmail');
  let para = ok(request.data && request.data.email).toLowerCase();
  let nome = '';
  if (r.patientId) {
    const p = (await db.doc(`tenants/${tid}/patients/${r.patientId}`).get()).data() || {};
    const rq = p.requester;
    if (!EMAIL.test(para)) para = ok((rq && rq.enviarParaResponsavel && rq.email) || p.email).toLowerCase();
    nome = (p.fullName || r.patientName || '').split(' ')[0];
  }
  if (!EMAIL.test(para)) throw new HttpsError('failed-precondition', 'sem-email');
  const td = (await db.doc(`tenants/${tid}`).get()).data() || {};
  const titulo = r.titulo || r.formTitle || 'Questionário';
  const texto = `Olá${nome ? ' ' + nome : ''}!\n\nPedimos que preencha "${titulo}" antes da sua próxima consulta. Demora poucos minutos e as respostas ficam guardadas na sua ficha, com total confidencialidade.\n\nPreencher aqui:\n${linkDe(id)}\n\nObrigado!\n${td.businessName || ''}`;
  try {
    await nodemailer.createTransport({ service: 'gmail', auth: { user: seg.email, pass: seg.pass } })
      .sendMail({ from: `${td.businessName || 'Consultório'} <${seg.email}>`, to: para, subject: `Questionário: ${titulo}`, text: texto });
  } catch (e) { throw new HttpsError('failed-precondition', 'O Gmail recusou o envio. Confirme a ligação em Perfil → Modelos de Mensagens.'); }
  await rs.ref.update({ enviadoPorEmailEm: new Date().toISOString() }).catch(() => {});
  return { ok: true, para };
});

// Guarda a resposta na ficha do paciente (só para fichas criadas pela equipa com o paciente já escolhido).
async function anexar(id, d) {
  if (!d || d.criadoPorEquipa !== true || !d.patientId || !d.tenantId || d.anexadaAoPaciente) return;
  const respostas = Array.isArray(d.respostas) ? d.respostas : (Array.isArray(d.answers) ? d.answers : null);
  if (!respostas || !respostas.length) return;
  const pRef = db.doc(`tenants/${d.tenantId}/patients/${d.patientId}`);
  if (!(await pRef.get()).exists) return;
  const ja = await pRef.collection('formResponses').where('sourceResponseId', '==', id).limit(1).get();
  if (ja.empty) {
    await pRef.collection('formResponses').add({
      sourceResponseId: id, formId: d.formId || '', formTitle: d.titulo || d.formTitle || 'Ficha',
      respostas, respondentName: d.respondentName || d.patientName || '', completadoEm: d.completadoEm || FieldValue.serverTimestamp(),
      submittedAt: d.completadoEm || FieldValue.serverTimestamp(), autoAnexada: true
    });
  }
  await db.doc(`public_form_responses/${id}`).update({ anexadaAoPaciente: true });
}
exports.fichaAutoAnexar = onDocumentUpdated('public_form_responses/{id}', async (event) => {
  const a = event.data.before.data(), b = event.data.after.data();
  if (!b || (a && a.completadoEm && a.respostas)) return;
  try { await anexar(event.params.id, b); } catch (e) { console.error('anexar', event.params.id, e.message); }
});
