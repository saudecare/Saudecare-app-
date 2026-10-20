// ═══════════════════════════════════════════════════════════════════
//  CONSULTAS GUIADAS POR PASSOS — construtor + execução
//  Tipo de método "guided": uma sequência de passos feitos com blocos
//  (pergunta, escolha com conhecimento, instrução, tratamento, notas).
//  Não toca nos métodos antigos (lista livre / mapeamento por zonas).
// ═══════════════════════════════════════════════════════════════════

const esc = (t) => (window.escapeHtml ? window.escapeHtml(String(t == null ? '' : t)) : String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
const aviso = (m, e) => { if (window.toast) window.toast(m, !!e); };

const CG_TIPOS = {
  pergunta:  { icone: '❓', nome: 'Pergunta',                    desc: 'Resposta em texto, escolha, escala 0–10 ou sim/não.' },
  escolha:   { icone: '🔘', nome: 'Escolha com conhecimento',    desc: 'Botões com o nome que quiser; cada um com tema, pergunta, exemplos e texto extra.' },
  instrucao: { icone: '📌', nome: 'Instrução ou imagem',         desc: 'Texto e imagem para o terapeuta (ou para o plano do paciente).' },
  tratamento:{ icone: '🌿', nome: 'Tratamento passo a passo',    desc: 'Lista de passos para fazer na sessão ou em casa, com temporizador opcional.' },
  notas:     { icone: '📝', nome: 'Notas do terapeuta',          desc: 'Espaço livre para observações.' }
};

let CG = { steps: [], aberto: null };
const uid = () => 's' + Math.random().toString(36).slice(2, 9);

function passoNovo(tipo) {
  const b = { id: uid(), type: tipo, title: '', help: '' };
  if (tipo === 'pergunta') return { ...b, title: 'Nova pergunta', qtype: 'text', options: [], noRelatorio: true };
  if (tipo === 'escolha') return { ...b, title: 'Nova escolha', multi: true, options: [{ id: uid(), label: 'Opção 1', tema: '', pergunta: '', exemplos: [], extra: '' }], noRelatorio: true };
  if (tipo === 'instrucao') return { ...b, title: 'Instrução', texto: '', imagem: '', noPlano: false };
  if (tipo === 'tratamento') return { ...b, title: 'Tratamento', passos: [], segundos: 0, noPlano: true };
  return { ...b, title: 'Notas', noRelatorio: false };
}

const MODELO_SIMPLES = () => ([
  { ...passoNovo('pergunta'), title: 'Qual é o motivo da consulta?', qtype: 'text' },
  { ...passoNovo('pergunta'), title: 'Intensidade do desconforto agora (0 a 10)', qtype: 'scale' },
  { ...passoNovo('escolha'), title: 'Áreas a trabalhar hoje', multi: true, options: [
      { id: uid(), label: 'Cabeça e pescoço', tema: 'Pensamentos e tensão acumulada.', pergunta: 'O que te tem ocupado a cabeça?', exemplos: ['Preocupações com o trabalho', 'Dificuldade em desligar'], extra: '' },
      { id: uid(), label: 'Peito e coração', tema: 'Emoções e relações.', pergunta: 'O que te pesa no coração?', exemplos: ['Uma despedida ou perda recente'], extra: '' },
      { id: uid(), label: 'Barriga e costas', tema: 'Segurança, controlo e esforço.', pergunta: 'Onde sentes que carregas demasiado?', exemplos: ['Responsabilidades que não são tuas'], extra: '' } ] },
  { ...passoNovo('tratamento'), title: 'Exercício para fazer em casa', passos: ['Senta-te com conforto e respira fundo 3 vezes.', 'Coloca a mão na zona que trabalhámos e respira devagar durante 2 minutos.', 'Bebe um copo de água no fim.'], segundos: 120 },
  { ...passoNovo('notas'), title: 'Notas do terapeuta', noRelatorio: true }
]);

// ─── Rascunho (usado pelos ganchos da app) ───
window.cgNovoRascunho = () => { CG = { steps: [], aberto: null }; };
window.cgCarregarRascunho = (p) => { CG = { steps: JSON.parse(JSON.stringify((p && p.steps) || [])), aberto: null }; };
window.cgLerRascunho = () => JSON.parse(JSON.stringify(CG.steps));
window.cgValidar = () => {
  if (!CG.steps.length) return 'Adicione pelo menos um passo.';
  for (const s of CG.steps) {
    if (!String(s.title || '').trim()) return 'Há um passo sem título.';
    if (s.type === 'escolha' && !(s.options || []).some(o => String(o.label || '').trim())) return `O passo "${s.title}" precisa de pelo menos uma opção com nome.`;
  }
  return '';
};

// ─── Construtor ───
function linhas(v) { return String(v || '').split('\n').map(x => x.trim()).filter(Boolean); }
const campo = (rot, html) => `<label style="margin-top:8px;">${rot}</label>${html}`;

function editorPasso(s, i) {
  const t = CG_TIPOS[s.type] || CG_TIPOS.notas;
  const abrir = CG.aberto === s.id;
  let corpo = campo('Título do passo (o que o terapeuta vê)', `<input value="${esc(s.title)}" onchange="cgSet('${s.id}','title',this.value)">`) +
    campo('Ajuda para o terapeuta (opcional)', `<textarea rows="2" onchange="cgSet('${s.id}','help',this.value)" placeholder="ex: Peça ao paciente para fechar os olhos antes de responder.">${esc(s.help)}</textarea>`);
  if (s.type === 'pergunta') {
    corpo += campo('Tipo de resposta', `<select onchange="cgSet('${s.id}','qtype',this.value,true)">${[['text', 'Texto livre'], ['choice', 'Escolher uma opção'], ['multi', 'Escolher várias'], ['scale', 'Escala de 0 a 10'], ['yesno', 'Sim / Não']].map(([v, n]) => `<option value="${v}" ${s.qtype === v ? 'selected' : ''}>${n}</option>`).join('')}</select>`);
    if (s.qtype === 'choice' || s.qtype === 'multi') corpo += campo('Opções (uma por linha)', `<textarea rows="4" onchange="cgSetLinhas('${s.id}','options',this.value)">${esc((s.options || []).join('\n'))}</textarea>`);
  }
  if (s.type === 'escolha') {
    corpo += `<label style="display:flex;gap:8px;align-items:center;margin-top:8px;"><input type="checkbox" style="width:auto;margin:0;" ${s.multi ? 'checked' : ''} onchange="cgSet('${s.id}','multi',this.checked)"> Pode escolher várias opções</label>`;
    corpo += (s.options || []).map((o, j) => `<details style="margin-top:8px;background:#f6f8f7;border-radius:8px;padding:8px;"><summary style="cursor:pointer;font-weight:600;">🔘 ${esc(o.label || 'Opção ' + (j + 1))}</summary>
      ${campo('Nome do botão', `<input value="${esc(o.label)}" onchange="cgOpt('${s.id}',${j},'label',this.value,true)">`)}
      ${campo('Tema / o que significa', `<textarea rows="2" onchange="cgOpt('${s.id}',${j},'tema',this.value)">${esc(o.tema)}</textarea>`)}
      ${campo('Pergunta para questionar', `<textarea rows="2" onchange="cgOpt('${s.id}',${j},'pergunta',this.value)">${esc(o.pergunta)}</textarea>`)}
      ${campo('Exemplos de situações (um por linha)', `<textarea rows="3" onchange="cgOptLinhas('${s.id}',${j},this.value)">${esc((o.exemplos || []).join('\n'))}</textarea>`)}
      ${campo('Conhecimento adicional (aparece no relatório)', `<textarea rows="3" onchange="cgOpt('${s.id}',${j},'extra',this.value)">${esc(o.extra)}</textarea>`)}
      <button class="danger" style="margin-top:8px;" onclick="cgRemOpt('${s.id}',${j})">Remover esta opção</button></details>`).join('');
    corpo += `<button class="ghost" style="margin-top:8px;width:100%;" onclick="cgAddOpt('${s.id}')">+ Adicionar opção</button>`;
  }
  if (s.type === 'instrucao') {
    corpo += campo('Texto', `<textarea rows="4" onchange="cgSet('${s.id}','texto',this.value)">${esc(s.texto)}</textarea>`) +
      campo('Imagem (opcional)', `<input id="cgImg_${s.id}" value="${esc(s.imagem)}" onchange="cgSet('${s.id}','imagem',this.value)" placeholder="https://...">`) +
      (window.imageUploadFieldHTML ? window.imageUploadFieldHTML(`cgImg_${s.id}`, `tenants/${window.tenantId ? window.tenantId() : 'x'}/protocols`) : '') +
      `<label style="display:flex;gap:8px;align-items:center;"><input type="checkbox" style="width:auto;margin:0;" ${s.noPlano ? 'checked' : ''} onchange="cgSet('${s.id}','noPlano',this.checked)"> Incluir no plano do paciente</label>`;
  }
  if (s.type === 'tratamento') {
    corpo += campo('Passos (um por linha)', `<textarea rows="6" onchange="cgSetLinhas('${s.id}','passos',this.value)">${esc((s.passos || []).join('\n'))}</textarea>`) +
      campo('Temporizador em segundos (0 = sem temporizador)', `<input type="number" min="0" value="${Number(s.segundos) || 0}" onchange="cgSet('${s.id}','segundos',parseInt(this.value,10)||0)">`) +
      `<label style="display:flex;gap:8px;align-items:center;"><input type="checkbox" style="width:auto;margin:0;" ${s.noPlano ? 'checked' : ''} onchange="cgSet('${s.id}','noPlano',this.checked)"> Incluir no plano do paciente</label>`;
  }
  if (s.type === 'pergunta' || s.type === 'escolha' || s.type === 'notas') {
    corpo += `<label style="display:flex;gap:8px;align-items:center;margin-top:8px;"><input type="checkbox" style="width:auto;margin:0;" ${s.noRelatorio ? 'checked' : ''} onchange="cgSet('${s.id}','noRelatorio',this.checked)"> Mostrar no relatório do paciente</label>`;
  }
  return `<div class="card" style="margin-bottom:8px;border-left:3px solid #6a4fb3;">
    <div class="row"><strong>${t.icone} ${i + 1}. ${esc(s.title || t.nome)}</strong>
      <div><button class="ghost" ${i === 0 ? 'disabled' : ''} onclick="cgMover(${i},-1)" style="padding:4px 10px;">↑</button>
      <button class="ghost" ${i === CG.steps.length - 1 ? 'disabled' : ''} onclick="cgMover(${i},1)" style="padding:4px 10px;">↓</button>
      <button class="ghost" onclick="cgAbrir('${s.id}')" style="padding:4px 10px;">${abrir ? 'Fechar' : 'Editar'}</button></div></div>
    <div class="muted">${t.nome}</div>
    ${abrir ? `<div>${corpo}<button class="danger" style="margin-top:10px;" onclick="cgApagar('${s.id}')">Remover este passo</button></div>` : ''}</div>`;
}

window.cgRenderConstrutor = function () {
  return `<div id="cgBuilder">${cgHtmlConstrutor()}</div>`;
};
function cgHtmlConstrutor() {
  const botoes = Object.entries(CG_TIPOS).map(([k, t]) => `<button class="ghost" style="text-align:left;" onclick="cgAdd('${k}')"><strong>${t.icone} ${t.nome}</strong><br><span class="muted">${t.desc}</span></button>`).join('');
  return `<p class="muted" style="margin:8px 0;">Monte a consulta passo a passo. A ordem que definir aqui é a ordem em que aparece durante o atendimento.</p>
    ${CG.steps.length ? CG.steps.map(editorPasso).join('') : `<div class="card" style="background:#f6f8f7;"><p class="muted">Ainda não há passos.</p><button class="ghost" style="width:100%;" onclick="cgModelo()">✨ Começar com um modelo simples (editável)</button></div>`}
    <details style="margin-top:10px;" ${CG.steps.length ? '' : 'open'}><summary style="cursor:pointer;font-weight:700;color:var(--primary);">➕ Adicionar um passo</summary>
    <div style="display:grid;gap:8px;margin-top:8px;">${botoes}</div></details>`;
}
function cgRefresh() { const el = document.getElementById('cgBuilder'); if (el) el.innerHTML = cgHtmlConstrutor(); }
const achar = (id) => CG.steps.find(s => s.id === id);
window.cgAdd = (t) => { const s = passoNovo(t); CG.steps.push(s); CG.aberto = s.id; cgRefresh(); };
window.cgModelo = () => { CG.steps = MODELO_SIMPLES(); CG.aberto = null; cgRefresh(); };
window.cgAbrir = (id) => { CG.aberto = CG.aberto === id ? null : id; cgRefresh(); };
window.cgApagar = (id) => { CG.steps = CG.steps.filter(s => s.id !== id); CG.aberto = null; cgRefresh(); };
window.cgMover = (i, d) => { const j = i + d; if (j < 0 || j >= CG.steps.length) return; [CG.steps[i], CG.steps[j]] = [CG.steps[j], CG.steps[i]]; cgRefresh(); };
window.cgSet = (id, k, v, rerender) => { const s = achar(id); if (!s) return; s[k] = v; if (k === 'title' || rerender) cgRefresh(); };
window.cgSetLinhas = (id, k, v) => { const s = achar(id); if (s) s[k] = linhas(v); };
window.cgOpt = (id, j, k, v, rerender) => { const s = achar(id); if (!s || !s.options[j]) return; s.options[j][k] = v; if (rerender) cgRefresh(); };
window.cgOptLinhas = (id, j, v) => { const s = achar(id); if (s && s.options[j]) s.options[j].exemplos = linhas(v); };
window.cgAddOpt = (id) => { const s = achar(id); if (!s) return; s.options.push({ id: uid(), label: 'Opção ' + (s.options.length + 1), tema: '', pergunta: '', exemplos: [], extra: '' }); cgRefresh(); };
window.cgRemOpt = (id, j) => { const s = achar(id); if (!s) return; s.options.splice(j, 1); cgRefresh(); };

// ─── Execução ───
let EX = null;

window.cgExecutar = function (patientId, patientName, area, proto, protoId) {
  EX = { patientId, patientName, area, proto, protoId, i: 0, resp: {}, preview: !!window.__previewMode };
  cgPasso();
};

function lerAtual() {
  const s = EX.proto.steps[EX.i]; if (!s) return;
  const r = EX.resp[s.id] || (EX.resp[s.id] = {});
  if (s.type === 'pergunta') {
    if (s.qtype === 'text') r.valor = (document.getElementById('cgIn')?.value || '').trim();
  }
  if (s.type === 'notas') r.valor = (document.getElementById('cgIn')?.value || '').trim();
  if (s.type === 'instrucao') r.feito = !!document.getElementById('cgFeito')?.checked;
}

function cartaoConhecimento(o) {
  return `<div style="background:#f6f8f7;border-left:3px solid #6a4fb3;border-radius:8px;padding:10px;margin-top:8px;">
    <strong>${esc(o.label)}</strong>
    ${o.tema ? `<div style="margin-top:4px;">🔎 <b>Tema:</b> ${esc(o.tema)}</div>` : ''}
    ${(o.exemplos || []).length ? `<div style="margin-top:4px;">📌 <b>Situações que podem ter acontecido:</b><ul style="margin:4px 0 0 18px;">${o.exemplos.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div>` : ''}
    ${o.pergunta ? `<div style="margin-top:4px;">❓ <b>Pergunta:</b> ${esc(o.pergunta)}</div>` : ''}
    ${o.extra ? `<div style="margin-top:4px;">📚 ${esc(o.extra)}</div>` : ''}</div>`;
}

function cgPasso() {
  const steps = EX.proto.steps || []; const s = steps[EX.i]; const r = EX.resp[s.id] || (EX.resp[s.id] = {});
  let corpo = '';
  if (s.type === 'pergunta') {
    if (s.qtype === 'text') corpo = `<textarea id="cgIn" rows="3" style="width:100%;">${esc(r.valor || '')}</textarea>`;
    else if (s.qtype === 'scale') corpo = `<div style="display:flex;flex-wrap:wrap;gap:6px;">${Array.from({ length: 11 }, (_, n) => `<button class="${r.valor === String(n) ? 'primary' : 'ghost'}" style="min-width:44px;" onclick="cgResp('${s.id}','${n}')">${n}</button>`).join('')}</div>`;
    else if (s.qtype === 'yesno') corpo = `<div style="display:flex;gap:8px;">${['Sim', 'Não'].map(v => `<button class="${r.valor === v ? 'primary' : 'ghost'}" style="flex:1;" onclick="cgResp('${s.id}','${v}')">${v}</button>`).join('')}</div>`;
    else corpo = `<div style="display:grid;gap:8px;">${(s.options || []).map(o => { const on = s.qtype === 'multi' ? (r.lista || []).includes(o) : r.valor === o; return `<button class="${on ? 'primary' : 'ghost'}" style="text-align:left;" onclick="cgResp('${s.id}',${JSON.stringify(o).replace(/"/g, '&quot;')},${s.qtype === 'multi'})">${esc(o)}</button>`; }).join('')}</div>`;
  } else if (s.type === 'escolha') {
    const sel = r.sel || [];
    corpo = `<div style="display:grid;gap:8px;">${(s.options || []).filter(o => o.label).map(o => `<button class="${sel.includes(o.id) ? 'primary' : 'ghost'}" style="text-align:left;" onclick="cgEscolher('${s.id}','${o.id}')">${sel.includes(o.id) ? '✔ ' : ''}${esc(o.label)}</button>`).join('')}</div>` +
      (s.options || []).filter(o => sel.includes(o.id)).map(cartaoConhecimento).join('');
  } else if (s.type === 'instrucao') {
    corpo = `${s.texto ? `<div style="white-space:pre-wrap;">${esc(s.texto)}</div>` : ''}${s.imagem ? `<img src="${esc(s.imagem)}" style="max-width:100%;border-radius:8px;margin-top:8px;" alt="">` : ''}
      <label style="display:flex;gap:8px;align-items:center;margin-top:10px;"><input id="cgFeito" type="checkbox" style="width:auto;margin:0;" ${r.feito ? 'checked' : ''}> Feito</label>`;
  } else if (s.type === 'tratamento') {
    corpo = `<ol style="margin:0 0 8px 18px;">${(s.passos || []).map(p => `<li style="margin-bottom:6px;">${esc(p)}</li>`).join('')}</ol>` +
      (s.segundos > 0 ? `<div style="text-align:center;margin-top:8px;"><div id="cgTimer" style="font-size:2rem;font-weight:700;">${fmt(s.segundos)}</div><button class="ghost" onclick="cgTimer(${s.segundos})">⏱ Iniciar temporizador</button></div>` : '');
  } else {
    corpo = `<textarea id="cgIn" rows="4" style="width:100%;">${esc(r.valor || '')}</textarea>`;
  }
  const ultimo = EX.i === steps.length - 1;
  EX.area.innerHTML = `<div class="card">
    <div class="muted">Passo ${EX.i + 1} de ${steps.length}</div>
    <div style="height:6px;background:#e2e8f0;border-radius:4px;margin:6px 0 12px;"><div style="height:6px;width:${Math.round(((EX.i + 1) / steps.length) * 100)}%;background:var(--primary);border-radius:4px;"></div></div>
    <h3 style="margin:0 0 6px;">${(CG_TIPOS[s.type] || {}).icone || ''} ${esc(s.title)}</h3>
    ${s.help ? `<p class="muted" style="margin-bottom:10px;">${esc(s.help)}</p>` : ''}
    ${corpo}
    <div class="row" style="margin-top:16px;">
      <button class="ghost" ${EX.i === 0 ? 'disabled' : ''} onclick="cgNav(-1)">← Anterior</button>
      <button class="primary" onclick="cgNav(1)">${ultimo ? '✅ Concluir e gerar relatório' : 'Seguinte →'}</button>
    </div></div>`;
}
const fmt = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
let _t = null;
window.cgTimer = (n) => { clearInterval(_t); let r = n; const el = document.getElementById('cgTimer'); _t = setInterval(() => { r--; const e = document.getElementById('cgTimer'); if (!e) { clearInterval(_t); return; } e.textContent = fmt(Math.max(0, r)); if (r <= 0) { clearInterval(_t); aviso('⏱ Tempo terminado.'); try { navigator.vibrate && navigator.vibrate(300); } catch (_) {} } }, 1000); if (el) el.textContent = fmt(r); };
window.cgResp = (id, v, multi) => {
  const r = EX.resp[id] || (EX.resp[id] = {});
  if (multi) { r.lista = r.lista || []; const k = r.lista.indexOf(v); if (k >= 0) r.lista.splice(k, 1); else r.lista.push(v); }
  else r.valor = v;
  lerAtual(); cgPasso();
};
window.cgEscolher = (id, oid) => {
  const s = EX.proto.steps.find(x => x.id === id); const r = EX.resp[id] || (EX.resp[id] = {}); r.sel = r.sel || [];
  const k = r.sel.indexOf(oid);
  if (k >= 0) r.sel.splice(k, 1); else { if (!s.multi) r.sel = []; r.sel.push(oid); }
  lerAtual(); cgPasso();
};
window.cgNav = function (d) {
  clearInterval(_t); lerAtual();
  if (d > 0 && EX.i === EX.proto.steps.length - 1) { cgConcluir(); return; }
  EX.i = Math.max(0, Math.min(EX.proto.steps.length - 1, EX.i + d)); cgPasso();
};

// ─── Relatório e plano ───
export function cgConstruir(proto, resp, nomePaciente, data) {
  const R = [], P = [];
  const titulo = proto.name || 'Consulta';
  for (const s of proto.steps || []) {
    const r = resp[s.id] || {};
    if (s.type === 'pergunta' && s.noRelatorio !== false) {
      const v = r.lista ? r.lista.join(', ') : (r.valor || '');
      if (v) R.push(`${s.title}: ${v}`);
    }
    if (s.type === 'escolha' && s.noRelatorio !== false) {
      const sel = (s.options || []).filter(o => (r.sel || []).includes(o.id));
      if (sel.length) {
        R.push(`\n${s.title.toUpperCase()}`);
        sel.forEach(o => {
          R.push(`• ${o.label}`);
          if (o.tema) R.push(`  Tema: ${o.tema}`);
          if ((o.exemplos || []).length) { R.push('  Situações que podem ter acontecido:'); o.exemplos.forEach(e => R.push(`   - ${e}`)); }
          if (o.pergunta) R.push(`  Pergunta para te questionares: ${o.pergunta}`);
          if (o.extra) R.push(`  Para saberes mais: ${o.extra}`);
        });
      }
    }
    if (s.type === 'notas' && s.noRelatorio && r.valor) R.push(`\n${s.title}: ${r.valor}`);
    if (s.type === 'instrucao' && s.noPlano && (s.texto || s.imagem)) P.push(`${s.title}\n${s.texto || ''}`.trim());
    if (s.type === 'tratamento' && s.noPlano && (s.passos || []).length) P.push(`${s.title}\n` + s.passos.map((p, i) => `${i + 1}. ${p}`).join('\n') + (s.segundos > 0 ? `\n(Temporizador sugerido: ${fmt(s.segundos)})` : ''));
  }
  const relatorio = `${titulo.toUpperCase()}\n${nomePaciente} · ${data}\n\n` + R.join('\n');
  const plano = P.length ? `PLANO / RECEITA\n${nomePaciente} · ${data}\n\n` + P.join('\n\n') : '';
  return { relatorio, plano, texto: relatorio + (plano ? '\n\n' + plano : '') };
}

async function cgConcluir() {
  const data = new Date().toLocaleDateString('pt-PT');
  const out = cgConstruir(EX.proto, EX.resp, EX.patientName, data);
  const prev = EX.preview;
  if (!prev && EX.patientId && window.guardarNaFicha) {
    const ok = await window.guardarNaFicha(EX.patientId, { tipo: 'consulta_guiada', titulo: EX.proto.name, texto: out.texto,
      dados: JSON.parse(JSON.stringify({ protocoloId: EX.protoId || '', respostas: EX.resp, relatorio: out.relatorio, plano: out.plano, data })) });
    if (!ok) aviso('⚠️ Não consegui gravar na ficha. Copie o relatório antes de sair.', true);
  }
  if (window.renderGeneratedReportScreen) window.renderGeneratedReportScreen(EX.proto.name, out.texto, [], EX.patientName, prev);
  else EX.area.innerHTML = `<div class="card"><h3>Relatório</h3><pre style="white-space:pre-wrap;">${esc(out.texto)}</pre></div>`;
}
