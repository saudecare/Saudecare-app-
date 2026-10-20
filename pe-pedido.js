// Pedido do método exclusivo (terapeuta) e painel de pedidos (dono do método).
// Não contém o método: só o formulário, a assinatura e a gestão dos pedidos.
const esc = (t) => String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const aviso = (m, e) => { if (window.toast) window.toast(m, !!e); };
const I = 'width:100%;padding:12px;border:1px solid #d8e0dc;border-radius:8px;margin-bottom:10px;font-size:16px;box-sizing:border-box;font-family:inherit;';
const L = 'font-size:12px;color:#64748b;display:block;margin:4px 0;font-weight:600;';

let ESTADO = { termo: null, assinou: false, cert: null };

function baixar(base64, mime, nome) {
  const bin = atob(base64); const u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i);
  const url = URL.createObjectURL(new Blob([u], { type: mime }));
  const a = document.createElement('a'); a.href = url; a.target = '_blank'; a.download = nome || ''; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}

function caixa(cor, borda, icone, titulo, texto) {
  return `<div style="background:${cor};border:1px solid ${borda};border-radius:12px;padding:22px;text-align:center;"><div style="font-size:1.6rem;margin-bottom:8px;">${icone}</div><div style="font-weight:700;margin-bottom:6px;">${titulo}</div><p style="font-size:0.9rem;">${texto}</p></div>`;
}

window.renderPedidoMetodo = async function (main) {
  if (!main) main = document.querySelector('main, #main, .main-content') || document.body;
  main.innerHTML = '<div class="card">A carregar…</div>';
  let est = { estado: 'nenhum' }, termo = null;
  try { est = await window.peChamar('peTermoEstado', {}); } catch (e) { main.innerHTML = `<div class="card"><h2>Indisponível</h2><p class="muted">${esc(e.message)}</p></div>`; return; }
  const topo = `<div style="max-width:640px;margin:18px auto;padding:0 6px;"><div style="text-align:center;margin-bottom:18px;"><div style="font-size:2.4rem;">🎓</div><h2 style="margin:6px 0;">Métodos com formação certificada</h2>
    <p class="muted">Para terapeutas com formação em biomicrohertz. O método é configurado para uso exclusivo de quem o pede e comprova a sua formação.</p></div>`;
  if (est.estado === 'pendente') { main.innerHTML = topo + caixa('#fef9c3', '#fde047', '⏳', 'Pedido em análise', 'Recebemos o seu pedido e a declaração assinada. Será avisado quando for decidido.') + '</div>'; return; }
  if (est.estado === 'aprovado') { main.innerHTML = topo + caixa('#dcfce7', '#86efac', '✅', 'Pedido aprovado', 'O método foi ativado na sua conta. Atualize a página e abra "Pesquisa Emocional Clínica" nas Ferramentas.') + '</div>'; return; }
  if (est.estado === 'revogado') { main.innerHTML = topo + caixa('#fee2e2', '#fca5a5', '🚫', 'Acesso revogado', esc(est.motivo || 'O acesso foi terminado. Contacte o administrador da plataforma.')) + '</div>'; return; }
  try { termo = await window.peChamar('peTermoTexto', {}); } catch (e) { main.innerHTML = `<div class="card"><p class="muted">${esc(e.message)}</p></div>`; return; }
  ESTADO = { termo, assinou: false, cert: null };
  main.innerHTML = topo + `${est.estado === 'recusado' ? `<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:10px;padding:12px;margin-bottom:14px;font-size:0.9rem;">O pedido anterior foi recusado${est.motivo ? ': ' + esc(est.motivo) : '.'} Pode fazer um novo pedido.</div>` : ''}
    <div class="card"><h3 style="margin-top:0;">1 · Os seus dados e a sua formação</h3>
      <label style="${L}">Nome completo</label><input id="ppNome" style="${I}" autocomplete="name">
      <label style="${L}">Cédula ou n.º profissional (se tiver)</label><input id="ppCed" style="${I}">
      <label style="${L}">Nome da formação em biomicrohertz</label><input id="ppForm" style="${I}">
      <label style="${L}">Formador ou instituição</label><input id="ppFormador" style="${I}">
      <label style="${L}">Data da formação</label><input id="ppData" type="date" style="${I}">
      <label style="${L}">N.º do certificado (se tiver)</label><input id="ppNcert" style="${I}">
      <label style="${L}">Comprovativo da formação (foto ou PDF do certificado)</label><input id="ppCert" type="file" accept="image/*,application/pdf" style="${I}" onchange="ppCertificado(this)"><div id="ppCertInfo" class="muted"></div></div>
    <div class="card"><h3 style="margin-top:0;">2 · ${esc(termo.titulo)}</h3>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:14px;font-size:0.85rem;line-height:1.6;max-height:260px;overflow-y:auto;margin-bottom:14px;">${termo.clausulas.map((c, i) => `<p style="margin:0 0 8px;"><b>${i + 1}.</b> ${esc(c)}</p>`).join('')}</div>
      ${termo.aceites.map(([k, t]) => `<label style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;font-size:0.88rem;cursor:pointer;"><input type="checkbox" class="ppAc" data-k="${k}" style="width:20px;height:20px;margin:2px 0 0;flex-shrink:0;"> <span>${esc(t)}</span></label>`).join('')}</div>
    <div class="card"><h3 style="margin-top:0;">3 · Assinatura</h3>
      <p class="muted" style="margin-bottom:8px;">Assine com o dedo (ou o rato) na caixa e escreva o seu nome completo por baixo.</p>
      <canvas id="ppSig" width="560" height="200" style="width:100%;height:160px;border:1px dashed #94a3b8;border-radius:10px;background:#fff;touch-action:none;"></canvas>
      <button class="ghost" style="margin:6px 0 10px;" onclick="ppLimparSig()">Limpar assinatura</button>
      <label style="${L}">Escreva o seu nome completo (igual ao de cima)</label><input id="ppNomeAss" style="${I}">
      <button class="primary" id="ppEnviar" style="width:100%;padding:14px;" onclick="ppEnviar()">Assinar e enviar pedido</button>
      <div id="ppMsg" style="margin-top:10px;"></div></div></div>`;
  ppIniciarSig();
};

window.ppCertificado = async function (inp) {
  const f = inp.files && inp.files[0]; const info = document.getElementById('ppCertInfo'); ESTADO.cert = null;
  if (!f) { info.textContent = ''; return; }
  try {
    if (f.type === 'application/pdf') {
      if (f.size > 3300000) { info.textContent = 'O PDF é demasiado grande (máx. 3 MB).'; inp.value = ''; return; }
      ESTADO.cert = await new Promise((ok, no) => { const r = new FileReader(); r.onload = () => ok(r.result); r.onerror = no; r.readAsDataURL(f); });
    } else {
      const url = URL.createObjectURL(f);
      const im = await new Promise((ok, no) => { const i = new Image(); i.onload = () => ok(i); i.onerror = no; i.src = url; });
      const k = Math.min(1, 1600 / Math.max(im.width, im.height)); const c = document.createElement('canvas'); c.width = Math.round(im.width * k); c.height = Math.round(im.height * k);
      c.getContext('2d').drawImage(im, 0, 0, c.width, c.height); URL.revokeObjectURL(url); ESTADO.cert = c.toDataURL('image/jpeg', 0.85);
    }
    info.textContent = '✅ ' + f.name;
  } catch (_) { info.textContent = 'Não consegui ler esse ficheiro.'; inp.value = ''; }
};

function ppIniciarSig() {
  const c = document.getElementById('ppSig'); if (!c) return; const x = c.getContext('2d'); x.lineWidth = 3; x.lineCap = 'round'; x.strokeStyle = '#0f172a'; let d = false;
  const pt = (e) => { const r = c.getBoundingClientRect(); return [(e.clientX - r.left) * (c.width / r.width), (e.clientY - r.top) * (c.height / r.height)]; };
  c.addEventListener('pointerdown', (e) => { d = true; c.setPointerCapture(e.pointerId); const [a, b] = pt(e); x.beginPath(); x.moveTo(a, b); x.lineTo(a + 0.1, b + 0.1); x.stroke(); ESTADO.assinou = true; e.preventDefault(); });
  c.addEventListener('pointermove', (e) => { if (!d) return; const [a, b] = pt(e); x.lineTo(a, b); x.stroke(); e.preventDefault(); });
  const fim = () => { d = false; }; c.addEventListener('pointerup', fim); c.addEventListener('pointercancel', fim);
}
window.ppLimparSig = function () { const c = document.getElementById('ppSig'); if (c) { c.getContext('2d').clearRect(0, 0, c.width, c.height); ESTADO.assinou = false; } };

window.ppEnviar = async function () {
  const v = (id) => (document.getElementById(id)?.value || '').trim(); const msg = document.getElementById('ppMsg'); const btn = document.getElementById('ppEnviar');
  const erro = (t) => { msg.innerHTML = `<div style="background:#fee2e2;border:1px solid #fca5a5;border-radius:8px;padding:12px;color:#b91c1c;font-size:0.9rem;">⚠️ ${esc(t)}</div>`; };
  const aceites = {}; document.querySelectorAll('.ppAc').forEach(c => { aceites[c.dataset.k] = c.checked; });
  if (!v('ppNome') || !v('ppForm') || !v('ppFormador') || !v('ppData')) return erro('Preencha o nome e os dados da formação.');
  if (!ESTADO.cert) return erro('Junte o comprovativo da formação (foto ou PDF).');
  if (!Object.values(aceites).length || !Object.values(aceites).every(Boolean)) return erro('Tem de aceitar todas as declarações.');
  if (!ESTADO.assinou) return erro('Falta a assinatura na caixa.');
  if (!v('ppNomeAss')) return erro('Escreva o seu nome completo por baixo da assinatura.');
  btn.disabled = true; btn.textContent = '⏳ A enviar…'; msg.innerHTML = '';
  try {
    const r = await window.peChamar('peTermoSubmeter', { versao: ESTADO.termo.versao, hash: ESTADO.termo.hash, aceites, nomeCompleto: v('ppNome'), cedula: v('ppCed'), nomeAssinado: v('ppNomeAss'),
      formacao: { nome: v('ppForm'), formador: v('ppFormador'), data: v('ppData'), nCert: v('ppNcert') }, certificado: ESTADO.cert, assinatura: document.getElementById('ppSig').toDataURL('image/png') });
    window.__ppPdf = r.pdf;
    document.getElementById('ppEnviar').closest('.card').innerHTML = `<div style="text-align:center;"><div style="font-size:1.8rem;">✅</div><h3>Pedido enviado</h3><p class="muted">O seu pedido e a declaração assinada ficaram registados. Será avisado quando for decidido.</p>
      <button class="primary" style="margin-top:10px;" onclick="baixar_pp()">📄 Descarregar a minha cópia do termo (PDF)</button></div>`;
  } catch (e) { btn.disabled = false; btn.textContent = 'Assinar e enviar pedido'; erro(e.message || 'Não foi possível enviar.'); }
};
window.baixar_pp = () => { if (window.__ppPdf) baixar(window.__ppPdf, 'application/pdf', 'Termo-assinado.pdf'); };

// ─── Painel do dono do método ───
const cores = { pendente: '#b45309', aprovado: '#16a34a', recusado: '#b91c1c', revogado: '#b91c1c' };
window.peTermosAdmin = async function () {
  let ov = document.getElementById('pe-termos-ov');
  if (!ov) { ov = document.createElement('div'); ov.id = 'pe-termos-ov'; ov.style.cssText = 'position:fixed;inset:0;background:#f1f5f9;z-index:9999;overflow-y:auto;padding:12px;'; document.body.appendChild(ov); }
  ov.innerHTML = '<div style="max-width:760px;margin:0 auto;padding:20px;">A carregar…</div>';
  let lista = [], cfg = { folderId: '', conta: '' };
  try { lista = (await window.peChamar('peTermoAdmin', { acao: 'listar' })).pedidos; cfg = await window.peChamar('peTermoAdmin', { acao: 'config' }); }
  catch (e) { ov.innerHTML = `<div style="max-width:760px;margin:0 auto;padding:16px;"><button class="ghost" onclick="peTermosFechar()">✖ Fechar</button><p style="color:#b91c1c;">${esc(e.message)}</p></div>`; return; }
  const b = (acao, id, txt, extra) => `<button class="ghost" style="padding:7px 10px;font-size:0.8rem;${extra || ''}" onclick="peTermoAcao('${acao}','${id}')">${txt}</button>`;
  ov.innerHTML = `<div style="max-width:760px;margin:0 auto;"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;"><b style="font-size:1.1rem;color:#1e3a8a;">📜 Pedidos do método e termos assinados</b><button class="ghost" onclick="peTermosFechar()">✖ Fechar</button></div>
    <div class="card" style="margin-bottom:12px;"><b>📁 Pasta do Drive para as provas</b>
      <p class="muted" style="margin:6px 0;">Crie uma pasta no seu Drive, partilhe-a (como <b>Editor</b>) com esta conta e cole aqui o endereço da pasta:</p>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:8px;font-size:0.8rem;word-break:break-all;margin-bottom:8px;">${esc(cfg.conta || '(a conta aparece depois de publicar as funções)')}</div>
      <input id="peDriveId" value="${esc(cfg.folderId)}" placeholder="Endereço ou ID da pasta do Drive" style="${I}">
      <button class="primary" onclick="peGuardarPasta()">Guardar pasta</button></div>
    ${lista.length ? lista.map(p => `<div class="card" style="margin-bottom:10px;border-left:4px solid ${cores[p.estado] || '#94a3b8'};">
      <div style="display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;"><b>${esc(p.nome)}</b><span style="font-size:0.78rem;font-weight:700;color:${cores[p.estado] || '#64748b'};">${esc(p.estado.toUpperCase())}</span></div>
      <div class="muted" style="margin:4px 0 8px;">${esc(p.businessName || p.tenantId)} · ${esc(p.email)}<br>Formação: ${esc(p.formacao)} · ${esc(p.formador)} · ${esc(p.data)}${p.nCert ? ' · cert. ' + esc(p.nCert) : ''}${p.cedula ? ' · cédula ' + esc(p.cedula) : ''}<br>Pedido em ${new Date(p.enviadoEm).toLocaleString('pt-PT')} · Drive: ${esc(p.drive || '—')}${p.motivo ? '<br>Motivo: ' + esc(p.motivo) : ''}</div>
      <div style="display:flex;gap:6px;flex-wrap:wrap;">${b('termo', p.id, '📄 Termo assinado')}${b('certificado', p.id, '🎓 Comprovativo')}
      ${p.estado === 'pendente' ? b('aprovar', p.id, '✅ Aprovar', 'color:#16a34a;border-color:#86efac;') + b('recusar', p.id, '✖ Recusar') : ''}
      ${p.estado === 'aprovado' ? b('revogar', p.id, '🚫 Revogar acesso', 'color:#b91c1c;border-color:#fca5a5;') : ''}${b('reenviarDrive', p.id, '☁️ Enviar para o Drive')}</div></div>`).join('') : '<div class="muted" style="text-align:center;padding:20px;">Ainda não há pedidos.</div>'}</div>`;
};
window.peTermosFechar = () => document.getElementById('pe-termos-ov')?.remove();
window.peGuardarPasta = async function () {
  try { const r = await window.peChamar('peTermoAdmin', { acao: 'config', folderId: document.getElementById('peDriveId').value }); aviso('✅ Pasta guardada.'); document.getElementById('peDriveId').value = r.folderId; }
  catch (e) { aviso(e.message, true); }
};
let armada = null;
window.peTermoAcao = async function (acao, id) {
  try {
    if (acao === 'termo' || acao === 'certificado') { const r = await window.peChamar('peTermoAdmin', { acao: 'ficheiro', id, qual: acao }); baixar(r.base64, r.mime, `${acao}-${id}`); return; }
    const chave = acao + id;
    if (['aprovar', 'revogar', 'recusar'].includes(acao) && armada !== chave) { armada = chave; aviso({ aprovar: '⚠️ Toque outra vez para APROVAR (ativa o método nesta conta).', revogar: '⚠️ Toque outra vez para REVOGAR o acesso.', recusar: '⚠️ Toque outra vez para RECUSAR.' }[acao]); setTimeout(() => { if (armada === chave) armada = null; }, 5000); return; }
    armada = null;
    const r = await window.peChamar('peTermoAdmin', { acao, id });
    aviso(acao === 'reenviarDrive' ? (r.drive === 'ok' ? '✅ Enviado para o Drive.' : 'Drive: ' + (r.erro || r.drive)) : '✅ Feito.');
    await window.peTermosAdmin();
  } catch (e) { aviso(e.message, true); }
};
