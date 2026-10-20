// Lembretes automáticos por e-mail, enviados a partir do e-mail de cada terapeuta.
// A palavra-passe de aplicação fica só no servidor (tenant_secrets, sem acesso do cliente).
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { onCall, HttpsError } = require('firebase-functions/v2/https');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const { onDocumentCreated, onDocumentUpdated } = require('firebase-functions/v2/firestore');
const nodemailer = require('nodemailer');
const db = getFirestore();

const ok = (t) => String(t == null ? '' : t).trim();
const mail = (e, p) => nodemailer.createTransport({ service: 'gmail', auth: { user: e, pass: p } });
function dono(request) {
  const t = (request.auth && request.auth.token) || {};
  if (!request.auth || !t.tenantId || t.role !== 'owner') throw new HttpsError('permission-denied', 'Só o titular da conta pode ligar os lembretes.');
  return t.tenantId;
}

exports.lembretesLigar = onCall({ timeoutSeconds: 60 }, async (request) => {
  const tid = dono(request);
  const email = ok(request.data && request.data.email).toLowerCase();
  const pass = ok(request.data && request.data.pass).replace(/\s/g, '');
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) throw new HttpsError('invalid-argument', 'E-mail inválido.');
  if (pass.length < 12) throw new HttpsError('invalid-argument', 'Cole a palavra-passe de aplicação (16 letras).');
  try {
    await mail(email, pass).sendMail({ from: email, to: email, subject: 'Vindora — lembretes ligados',
      text: 'Está tudo certo. A partir de agora, os lembretes das consultas serão enviados aos seus pacientes a partir deste e-mail, 24 horas antes de cada consulta.' });
  } catch (e) { throw new HttpsError('failed-precondition', 'O Gmail recusou a ligação. Confirme o e-mail e a palavra-passe de aplicação.'); }
  await db.doc(`tenant_secrets/${tid}`).set({ email, pass, atualizadoEm: FieldValue.serverTimestamp() }, { merge: true });
  await db.doc(`tenants/${tid}`).set({ remindersSettings: { emailLigado: true, emailRemetente: email } }, { merge: true });
  return { ok: true, email };
});

exports.lembretesDesligar = onCall(async (request) => {
  const tid = dono(request);
  await db.doc(`tenant_secrets/${tid}`).delete().catch(() => {});
  await db.doc(`tenants/${tid}`).set({ remindersSettings: { emailLigado: false, emailRemetente: '', autoEmailReminders: false } }, { merge: true });
  return { ok: true };
});

const preencher = (modelo, v) => String(modelo).replace(/\{\{(\w+)\}\}/g, (_, k) => (v[k] != null ? v[k] : ''));

exports.lembretesEnviar = onSchedule({ schedule: 'every 30 minutes', timeZone: 'Europe/Lisbon', timeoutSeconds: 300, memory: '512MiB' }, async () => {
  const ts = await db.collection('tenants').where('remindersSettings.autoEmailReminders', '==', true).get();
  const agora = Date.now();
  for (const t of ts.docs) {
    try {
      const td = t.data() || {};
      const seg = (await db.doc(`tenant_secrets/${t.id}`).get()).data();
      if (!seg || !seg.email || !seg.pass) continue;
      const fuso = (td.availability && td.availability.timezone) || 'Europe/Lisbon';
      const modelo = (td.messageTemplates && td.messageTemplates.lembrete) || 'Olá {{nome}}, só a lembrar da sua consulta de {{servico}} amanhã, dia {{data}} às {{hora}}. Até breve!';
      const de = Timestamp.fromMillis(agora + 23 * 3600e3), ate = Timestamp.fromMillis(agora + 25 * 3600e3);
      const as = await db.collection(`tenants/${t.id}/appointments`).where('startsAt', '>=', de).where('startsAt', '<=', ate).get();
      const tr = mail(seg.email, seg.pass);
      for (const a of as.docs) {
        const d = a.data();
        if (d.lembreteEmailEm || d.status === 'cancelled' || d.noFixedTime || !d.patientId) continue;
        const p = (await db.doc(`tenants/${t.id}/patients/${d.patientId}`).get()).data() || {};
        const rq = p.requester; const para = ok((rq && rq.enviarParaResponsavel && rq.email) || p.email);
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(para)) continue;
        const dt = d.startsAt.toDate();
        const texto = preencher(modelo, { nome: (d.patientName || p.fullName || '').split(' ')[0], servico: d.serviceName || '',
          data: dt.toLocaleDateString('pt-PT', { timeZone: fuso, day: '2-digit', month: '2-digit' }), hora: dt.toLocaleTimeString('pt-PT', { timeZone: fuso, hour: '2-digit', minute: '2-digit' }) });
        try {
          await tr.sendMail({ from: `${td.businessName || 'Consultório'} <${seg.email}>`, to: para, subject: 'Lembrete da sua consulta', text: texto });
          await a.ref.update({ lembreteEmailEm: new Date().toISOString() });
        } catch (e) { console.error('lembrete', t.id, a.id, e.message); }
      }
    } catch (e) { console.error('lembretes tenant', t.id, e.message); }
  }
});

// Confirmação e cancelamento por e-mail ao utente (mesmo e-mail e mesma opção dos lembretes).
async function avisar(tid, d, tipo) {
  const t = (await db.doc(`tenants/${tid}`).get()).data() || {};
  if (!(t.remindersSettings && t.remindersSettings.autoEmailReminders)) return;
  const seg = (await db.doc(`tenant_secrets/${tid}`).get()).data();
  if (!seg || !seg.email || !seg.pass || !d.patientId || !d.startsAt || d.noFixedTime) return;
  const p = (await db.doc(`tenants/${tid}/patients/${d.patientId}`).get()).data() || {};
  const rq = p.requester; const para = ok((rq && rq.enviarParaResponsavel && rq.email) || p.email);
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(para)) return;
  const fuso = (t.availability && t.availability.timezone) || 'Europe/Lisbon';
  const def = { confirmacao: 'Olá {{nome}}! A sua marcação de {{servico}} está confirmada para {{data}} às {{hora}}. Até já!', cancelamento: 'Olá {{nome}}, foi necessário cancelar a marcação de {{servico}} do dia {{data}} às {{hora}}. Vamos remarcar assim que possível.' };
  const dt = d.startsAt.toDate();
  const texto = preencher((t.messageTemplates && t.messageTemplates[tipo]) || def[tipo], { nome: (d.patientName || p.fullName || '').split(' ')[0], servico: d.serviceName || '',
    data: dt.toLocaleDateString('pt-PT', { timeZone: fuso, day: '2-digit', month: '2-digit', year: 'numeric' }), hora: dt.toLocaleTimeString('pt-PT', { timeZone: fuso, hour: '2-digit', minute: '2-digit' }) });
  await mail(seg.email, seg.pass).sendMail({ from: `${t.businessName || 'Consultório'} <${seg.email}>`, to: para, subject: tipo === 'confirmacao' ? 'Marcação confirmada' : 'Marcação cancelada', text: texto });
}
exports.avisoMarcacaoCriada = onDocumentCreated('tenants/{tid}/appointments/{aid}', async (event) => {
  const d = event.data && event.data.data(); if (!d || d.status === 'cancelled') return;
  try { await avisar(event.params.tid, d, 'confirmacao'); } catch (e) { console.error('confirmacao', e.message); }
});
exports.avisoMarcacaoCancelada = onDocumentUpdated('tenants/{tid}/appointments/{aid}', async (event) => {
  const a = event.data.before.data(), b = event.data.after.data();
  if (!a || !b || a.status === 'cancelled' || b.status !== 'cancelled') return;
  try { await avisar(event.params.tid, b, 'cancelamento'); } catch (e) { console.error('cancelamento', e.message); }
});
