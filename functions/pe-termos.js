// Pedido do método exclusivo com declaração assinada.
// O terapeuta pede, declara a sua formação e assina; fica tudo registado (PDF + dados +
// código de verificação), guardado no Storage e enviado para uma pasta do Drive.
// O dono do método aprova, recusa ou revoga. Só depois de aprovado o método é entregue.
const crypto = require('crypto');
const { PDFDocument, StandardFonts, rgb } = require('pdf-lib');
const { GoogleAuth } = require('google-auth-library');
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { onCall, HttpsError } = require('firebase-functions/v2/https');

const db = getFirestore();
const DONO = 'hikari-terapias';

// ─── Texto do termo (versão única; qualquer alteração cria uma nova versão) ───
const TERMO = {
  versao: '2026-10-21-v1',
  titulo: 'Declaração de formação e termo de uso exclusivo',
  clausulas: [
    'O método de atendimento «Pesquisa Emocional Clínica» foi criado e é utilizado pela Hikari Fafe (Ricardo Correia). A Vindora é a plataforma onde esse método é configurado.',
    'O subscritor declara, sob a sua responsabilidade, que possui formação em biomicrohertz e que o conteúdo, os passos, as fichas e os questionários que pede fazem parte dessa sua formação e matéria, tendo legitimidade para os utilizar na sua prática.',
    'A Vindora não fornece, não vende nem distribui materiais de formação. Limita-se a configurar a ferramenta, a pedido do subscritor e para uso exclusivo dele, com base na formação que o subscritor declara possuir.',
    'O uso é pessoal e intransmissível, associado apenas à conta e ao consultório identificados neste pedido. É proibido copiar, reproduzir, partilhar, revender, ensinar ou tentar aceder ao código ou aos textos do método fora da ferramenta.',
    'O subscritor é o único responsável pelo uso que faz do método, pelos documentos que emite e pela sua prática clínica ou terapêutica perante os seus pacientes. Os documentos emitidos não substituem aconselhamento médico ou psicológico.',
    'O subscritor compromete-se a fornecer comprovativo da formação sempre que o dono do método o solicite. A informação prestada neste pedido tem de ser verdadeira.',
    'O incumprimento destes termos ou a prestação de informação falsa implica a revogação imediata do acesso, sem direito a reembolso, e o subscritor responde pelos danos causados.',
    'Os dados deste pedido (identificação, formação e comprovativo) são tratados apenas para verificar o direito de acesso e guardar prova deste termo, nos termos do RGPD, e podem ser apagados a pedido, sem prejuízo da conservação necessária para defesa de direitos.',
    'O documento assinado fica guardado com data e hora, endereço de rede e um código de verificação que permite provar que não foi alterado.'
  ],
  aceites: [
    ['formacao', 'Declaro que possuo formação em biomicrohertz e que os dados e o comprovativo que apresento são verdadeiros.'],
    ['conteudo', 'Declaro que o conteúdo que peço faz parte da minha formação e matéria, e que o peço para uso exclusivo meu.'],
    ['partilha', 'Comprometo-me a não copiar, partilhar, revender nem ensinar o método ou os seus textos a terceiros.'],
    ['responsabilidade', 'Assumo a responsabilidade pela utilização do método e pelos documentos que emitir.'],
    ['dados', 'Autorizo o tratamento e a guarda destes dados e do comprovativo para esta finalidade.']
  ]
};
const textoCanonico = () => JSON.stringify({ v: TERMO.versao, t: TERMO.titulo, c: TERMO.clausulas, a: TERMO.aceites });
const hashTexto = () => crypto.createHash('sha256').update(textoCanonico()).digest('hex');
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');

async function exigirAdmin(request) {
  const uid = request.auth && request.auth.uid;
  if (!uid) throw new HttpsError('unauthenticated', 'Inicia sessão.');
  const t = request.auth.token || {};
  if (t.tenantId === DONO && t.role === 'owner') return uid;
  if ((await db.doc(`platform_admins/${uid}`).get()).exists) return uid;
  throw new HttpsError('permission-denied', 'Só o dono do método pode fazer isto.');
}
function exigirDono(request) {
  const t = (request.auth && request.auth.token) || {};
  if (!request.auth) throw new HttpsError('unauthenticated', 'Inicia sessão.');
  if (!t.tenantId || t.role !== 'owner') throw new HttpsError('permission-denied', 'Só o titular da conta pode fazer o pedido.');
  return t;
}
const str = (v, n) => String(v == null ? '' : v).trim().slice(0, n);
function dataUrl(v, tipos, maxBytes) {
  const m = /^data:([a-z\/+.-]+);base64,([A-Za-z0-9+\/=]+)$/.exec(String(v || ''));
  if (!m || !tipos.includes(m[1])) throw new HttpsError('invalid-argument', 'Ficheiro inválido.');
  const buf = Buffer.from(m[2], 'base64');
  if (!buf.length || buf.length > maxBytes) throw new HttpsError('invalid-argument', 'Ficheiro demasiado grande.');
  return { mime: m[1], buf };
}
const extDe = (m) => (m === 'application/pdf' ? 'pdf' : m === 'image/png' ? 'png' : 'jpg');

// ─── PDF do termo ───
async function criarPdf(R, assinaturaPng, hashFinal) {
  const pdf = await PDFDocument.create();
  const f = await pdf.embedFont(StandardFonts.Helvetica), fb = await pdf.embedFont(StandardFonts.HelveticaBold);
  const W = 595, H = 842, M = 48; let page = pdf.addPage([W, H]); let y = H - M;
  const nova = () => { page = pdf.addPage([W, H]); y = H - M; };
  const quebra = (txt, font, size, largura) => {
    const out = []; let linha = '';
    for (const w of String(txt).split(/\s+/)) { const t = linha ? linha + ' ' + w : w; if (font.widthOfTextAtSize(t, size) > largura && linha) { out.push(linha); linha = w; } else linha = t; }
    if (linha) out.push(linha); return out;
  };
  const par = (txt, { font = f, size = 10, cor = rgb(0.1, 0.12, 0.18), gap = 6, indent = 0 } = {}) => {
    for (const l of quebra(txt, font, size, W - 2 * M - indent)) { if (y < M + 30) nova(); page.drawText(l, { x: M + indent, y, size, font, color: cor }); y -= size + 3; }
    y -= gap;
  };
  const san = (s) => String(s).replace(/[^\x09\x0A\x0D\x20-\x7E -ÿ]/g, '');
  par(san(TERMO.titulo), { font: fb, size: 15, gap: 4 });
  par(`Versão do termo: ${TERMO.versao}  ·  Registo n.º ${R.id}`, { size: 9, cor: rgb(0.4, 0.45, 0.55), gap: 10 });
  par('1. Identificação', { font: fb, size: 11, gap: 3 });
  const D = R.dados;
  [`Nome: ${D.nomeCompleto}`, `Consultório/clínica: ${R.businessName || '-'}`, `Email da conta: ${R.email || '-'}`, `Cédula / n.º profissional: ${D.cedula || '-'}`,
    `Formação: ${D.formacao.nome}`, `Formador / instituição: ${D.formacao.formador}`, `Data da formação: ${D.formacao.data}`, `N.º do certificado: ${D.formacao.nCert || '-'}`,
    `Comprovativo anexo: ${R.certificado ? 'sim (ficheiro guardado com este registo)' : 'não'}`].forEach(l => par(san(l), { gap: 1 }));
  y -= 8;
  par('2. Termos', { font: fb, size: 11, gap: 3 });
  TERMO.clausulas.forEach((c, i) => par(san(`${i + 1}. ${c}`), { size: 9.5, gap: 4 }));
  y -= 4;
  par('3. Declarações aceites', { font: fb, size: 11, gap: 3 });
  TERMO.aceites.forEach(([, t]) => par(san('[x] ' + t), { size: 9.5, gap: 3 }));
  y -= 6;
  if (y < 190) nova();
  par('4. Assinatura', { font: fb, size: 11, gap: 4 });
  const img = await pdf.embedPng(assinaturaPng); const dim = img.scale(Math.min(200 / img.width, 70 / img.height));
  page.drawRectangle({ x: M, y: y - dim.height - 6, width: dim.width + 12, height: dim.height + 12, borderColor: rgb(0.8, 0.83, 0.88), borderWidth: 0.6 });
  page.drawImage(img, { x: M + 6, y: y - dim.height, width: dim.width, height: dim.height }); y -= dim.height + 20;
  par(san(`Assinado por: ${R.assinatura.nome}`), { font: fb, size: 10, gap: 1 });
  par(`Data e hora (Lisboa): ${new Date(R.enviadoEm).toLocaleString('pt-PT', { timeZone: 'Europe/Lisbon' })}`, { size: 9.5, gap: 1 });
  par(san(`Endereço de rede: ${R.ip || '-'}`), { size: 9.5, gap: 8 });
  par('Código de verificação (SHA-256) do registo:', { size: 8.5, cor: rgb(0.4, 0.45, 0.55), gap: 1 });
  par(hashFinal, { size: 8, cor: rgb(0.25, 0.3, 0.4), gap: 1 });
  return Buffer.from(await pdf.save());
}

// ─── Drive ───
async function tokenDrive() {
  const auth = new GoogleAuth({ scopes: ['https://www.googleapis.com/auth/drive'] });
  const client = await auth.getClient();
  const t = await client.getAccessToken();
  let email = '';
  try { email = (await auth.getCredentials()).client_email || ''; } catch (_) {}
  return { token: t.token || t, email };
}
async function enviarDrive(folderId, nome, mime, buf, token) {
  const b = 'pe' + crypto.randomBytes(8).toString('hex');
  const meta = JSON.stringify({ name: nome, parents: [folderId] });
  const corpo = Buffer.concat([
    Buffer.from(`--${b}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n${meta}\r\n--${b}\r\nContent-Type: ${mime}\r\n\r\n`),
    buf, Buffer.from(`\r\n--${b}--`)]);
  const r = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&supportsAllDrives=true&fields=id,webViewLink', {
    method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': `multipart/related; boundary=${b}` }, body: corpo });
  if (!r.ok) throw new Error(`Drive ${r.status}: ${(await r.text()).slice(0, 200)}`);
  return r.json();
}
async function guardarNoDrive(id, R, ficheiros) {
  const cfg = (await db.doc('settings/peTermosDrive').get()).data() || {};
  if (!cfg.folderId) return { estado: 'sem-pasta' };
  try {
    const { token } = await tokenDrive();
    const base = `Termo-${String(R.businessName || R.tenantId).replace(/[^\w-]+/g, '-').slice(0, 40)}-${R.enviadoEm.slice(0, 10)}-${id}`;
    const out = [];
    for (const [nome, mime, buf] of ficheiros) out.push((await enviarDrive(cfg.folderId, `${base}-${nome}`, mime, buf, token)).webViewLink || 'ok');
    return { estado: 'ok', links: out, em: new Date().toISOString() };
  } catch (e) { return { estado: 'erro', erro: String(e.message || e).slice(0, 300) }; }
}

// ─── Funções chamadas pela app ───
exports.peTermoTexto = onCall(async (request) => {
  if (!request.auth) throw new HttpsError('unauthenticated', 'Inicia sessão.');
  return { versao: TERMO.versao, titulo: TERMO.titulo, clausulas: TERMO.clausulas, aceites: TERMO.aceites, hash: hashTexto() };
});

exports.peTermoEstado = onCall(async (request) => {
  const t = exigirDono(request);
  const s = await db.collection('pe_termos').where('tenantId', '==', t.tenantId).get();
  if (s.empty) return { estado: 'nenhum' };
  const todos = s.docs.map(x => ({ id: x.id, ...x.data() })).sort((a, b) => String(b.enviadoEm).localeCompare(String(a.enviadoEm)));
  const d = todos[0];
  return { estado: d.estado, motivo: d.motivo || '', id: d.id, enviadoEm: d.enviadoEm };
});

exports.peTermoSubmeter = onCall({ timeoutSeconds: 120, memory: '512MiB' }, async (request) => {
  const t = exigirDono(request);
  if (t.tenantId === DONO) throw new HttpsError('failed-precondition', 'Esta conta é a do dono do método.');
  const d = request.data || {};
  if (d.hash !== hashTexto() || d.versao !== TERMO.versao) throw new HttpsError('failed-precondition', 'O texto dos termos mudou. Volta a abrir o pedido.');
  const ac = d.aceites || {};
  if (!TERMO.aceites.every(([k]) => ac[k] === true)) throw new HttpsError('invalid-argument', 'É preciso aceitar todas as declarações.');
  const nomeCompleto = str(d.nomeCompleto, 120), nomeAss = str(d.nomeAssinado, 120);
  const form = { nome: str(d.formacao && d.formacao.nome, 160), formador: str(d.formacao && d.formacao.formador, 160), data: str(d.formacao && d.formacao.data, 40), nCert: str(d.formacao && d.formacao.nCert, 60) };
  if (!nomeCompleto || !form.nome || !form.formador || !form.data) throw new HttpsError('invalid-argument', 'Preenche o nome e os dados da formação.');
  if (nomeAss.toLowerCase().replace(/\s+/g, ' ') !== nomeCompleto.toLowerCase().replace(/\s+/g, ' ')) throw new HttpsError('invalid-argument', 'O nome da assinatura tem de ser igual ao nome completo.');
  const ass = dataUrl(d.assinatura, ['image/png'], 400000);
  const cert = d.certificado ? dataUrl(d.certificado, ['image/jpeg', 'image/png', 'application/pdf'], 4500000) : null;
  if (!cert) throw new HttpsError('invalid-argument', 'Junta o comprovativo da formação (foto ou PDF).');

  const ex = await db.collection('pe_termos').where('tenantId', '==', t.tenantId).where('estado', 'in', ['pendente', 'aprovado']).limit(1).get();
  if (!ex.empty) throw new HttpsError('already-exists', 'Já existe um pedido em análise ou aprovado.');

  const tdoc = (await db.doc(`tenants/${t.tenantId}`).get()).data() || {};
  const ip = String((request.rawRequest && (request.rawRequest.headers['x-forwarded-for'] || request.rawRequest.ip)) || '').split(',')[0].trim();
  const id = crypto.randomBytes(6).toString('hex');
  const R = {
    id, tenantId: t.tenantId, uid: request.auth.uid, email: (request.auth.token && request.auth.token.email) || '', businessName: tdoc.businessName || '',
    dados: { nomeCompleto, cedula: str(d.cedula, 60), formacao: form }, termo: { versao: TERMO.versao, hash: hashTexto() },
    assinatura: { nome: nomeAss, hash: sha(ass.buf) }, certificado: { mime: cert.mime, hash: sha(cert.buf) },
    enviadoEm: new Date().toISOString(), ip, ua: str(request.rawRequest && request.rawRequest.headers['user-agent'], 200)
  };
  const hashFinal = sha(JSON.stringify(R));
  const pdf = await criarPdf(R, ass.buf, hashFinal);
  const registo = Buffer.from(JSON.stringify({ ...R, hashFinal }, null, 2));
  const bucket = getStorage().bucket();
  const base = `pe_termos/${id}`;
  const certNome = `comprovativo.${extDe(cert.mime)}`;
  await Promise.all([
    bucket.file(`${base}/termo.pdf`).save(pdf, { contentType: 'application/pdf' }),
    bucket.file(`${base}/${certNome}`).save(cert.buf, { contentType: cert.mime }),
    bucket.file(`${base}/registo.json`).save(registo, { contentType: 'application/json' })
  ]);
  const drive = await guardarNoDrive(id, R, [['termo.pdf', 'application/pdf', pdf], [certNome, cert.mime, cert.buf], ['registo.json', 'application/json', registo]]);
  await db.doc(`pe_termos/${id}`).set({ ...R, hashFinal, estado: 'pendente', ficheiros: { termo: `${base}/termo.pdf`, certificado: `${base}/${certNome}`, registo: `${base}/registo.json` }, drive, criadoEm: FieldValue.serverTimestamp() });
  return { ok: true, id, hash: hashFinal, pdf: pdf.toString('base64') };
});

exports.peTermoAdmin = onCall({ timeoutSeconds: 120, memory: '512MiB' }, async (request) => {
  await exigirAdmin(request);
  const { acao, id } = request.data || {};
  if (acao === 'config') {
    const cfg = (await db.doc('settings/peTermosDrive').get()).data() || {};
    let email = ''; try { email = (await tokenDrive()).email; } catch (_) {}
    if (request.data.folderId !== undefined) {
      const fid = str(request.data.folderId, 200).replace(/^.*\/folders\//, '').replace(/[?&].*$/, '');
      await db.doc('settings/peTermosDrive').set({ folderId: fid }, { merge: true }); return { folderId: fid, conta: email };
    }
    return { folderId: cfg.folderId || '', conta: email };
  }
  if (acao === 'listar') {
    const s = await db.collection('pe_termos').orderBy('enviadoEm', 'desc').limit(200).get();
    return { pedidos: s.docs.map(x => { const v = x.data(); return { id: x.id, tenantId: v.tenantId, businessName: v.businessName, email: v.email, nome: v.dados.nomeCompleto, formacao: v.dados.formacao.nome, formador: v.dados.formacao.formador,
      data: v.dados.formacao.data, nCert: v.dados.formacao.nCert, cedula: v.dados.cedula, estado: v.estado, motivo: v.motivo || '', enviadoEm: v.enviadoEm, drive: (v.drive && v.drive.estado) || '' }; }) };
  }
  const ref = db.doc(`pe_termos/${String(id || '')}`); const s = await ref.get();
  if (!s.exists) throw new HttpsError('not-found', 'Pedido não encontrado.');
  const v = s.data(); const bucket = getStorage().bucket();
  if (acao === 'ficheiro') {
    const caminho = request.data.qual === 'certificado' ? v.ficheiros.certificado : v.ficheiros.termo;
    const [buf] = await bucket.file(caminho).download();
    const mime = caminho.endsWith('.pdf') ? 'application/pdf' : caminho.endsWith('.png') ? 'image/png' : 'image/jpeg';
    return { mime, base64: buf.toString('base64') };
  }
  if (acao === 'aprovar') {
    await ref.update({ estado: 'aprovado', aprovadoEm: new Date().toISOString(), motivo: '' });
    await db.doc(`tenants/${v.tenantId}`).set({ modulos: { pesquisaEmocional: true }, peVersaoPadrao: TERMO.versao, peTermoId: id }, { merge: true });
    return { ok: true };
  }
  if (acao === 'recusar' || acao === 'revogar') {
    await ref.update({ estado: acao === 'recusar' ? 'recusado' : 'revogado', motivo: str(request.data.motivo, 300), decididoEm: new Date().toISOString() });
    await db.doc(`tenants/${v.tenantId}`).set({ modulos: { pesquisaEmocional: false } }, { merge: true });
    return { ok: true };
  }
  if (acao === 'reenviarDrive') {
    const [pdf] = await bucket.file(v.ficheiros.termo).download(); const [cert] = await bucket.file(v.ficheiros.certificado).download(); const [reg] = await bucket.file(v.ficheiros.registo).download();
    const certNome = v.ficheiros.certificado.split('/').pop(); const mime = certNome.endsWith('.pdf') ? 'application/pdf' : certNome.endsWith('.png') ? 'image/png' : 'image/jpeg';
    const drive = await guardarNoDrive(id, v, [['termo.pdf', 'application/pdf', pdf], [certNome, mime, cert], ['registo.json', 'application/json', reg]]);
    await ref.update({ drive }); return { ok: true, drive: drive.estado, erro: drive.erro || '' };
  }
  throw new HttpsError('invalid-argument', 'Ação desconhecida.');
});

exports._teste = { criarPdf, TERMO, hashTexto };
