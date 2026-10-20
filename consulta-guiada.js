// ═══════════════════════════════════════════════════════════════════
//  CONSULTAS GUIADAS POR PASSOS — construtor + execução
//  Tipo de método "guided": uma sequência de passos feitos com blocos
//  (pergunta, escolha com conhecimento, instrução, tratamento, notas).
//  Não toca nos métodos antigos (lista livre / mapeamento por zonas).
// ═══════════════════════════════════════════════════════════════════

const iconeUri = (o) => (typeof o.icone === 'number' && window.CG_IMG && window.CG_IMG.icones[o.icone]) ? window.CG_IMG.uri(window.CG_IMG.icones[o.icone]) : '';
const esc = (t) => (window.escapeHtml ? window.escapeHtml(String(t == null ? '' : t)) : String(t == null ? '' : t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
const aviso = (m, e) => { if (window.toast) window.toast(m, !!e); };

const CG_TIPOS = {
  pergunta:  { icone: '❓', nome: 'Pergunta',                    desc: 'Resposta em texto, escolha, escala 0–10 ou sim/não.' },
  mapa:      { icone: '🧍', nome: 'Mapa do corpo ou imagem com pontos', desc: 'Corpo (frente/costas), os 7 chakras ou a sua imagem: toque para pôr pontos e dê-lhes nomes e conhecimento.' },
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
  if (tipo === 'mapa') return { ...b, title: 'Mapa do corpo', fundo: 'corpoFrente', imagem: '', points: [], multi: true, noRelatorio: true, noPlano: true };
  if (tipo === 'instrucao') return { ...b, title: 'Instrução', texto: '', imagem: '', noPlano: false };
  if (tipo === 'tratamento') return { ...b, title: 'Tratamento', passos: [], segundos: 0, noPlano: true };
  return { ...b, title: 'Notas', noRelatorio: false };
}

const CHAKRAS_TXT = [
  { tema: 'Ligação ao sentido da vida, à espiritualidade e ao propósito.', pergunta: 'Sentes que a tua vida tem direção e sentido?', exemplos: ['Perda de sentido depois de um luto, divórcio ou despedimento', 'Deixar de acreditar em algo em que se confiava muito'], extra: 'Associado ao topo da cabeça e à cor violeta.' },
  { tema: 'Intuição, clareza mental e imaginação.', pergunta: 'Confias no que a tua intuição te diz?', exemplos: ['Ignorar durante muito tempo o que se sentia ser verdade', 'Excesso de pensamento que não deixa ver com clareza'], extra: 'Associado à zona entre as sobrancelhas e à cor índigo.' },
  { tema: 'Expressão, comunicação e verdade pessoal.', pergunta: 'O que ficou por dizer e já pesa em ti?', exemplos: ['Calar uma injustiça no trabalho ou em família', 'Ter sido proibido/a de dar opinião desde criança'], extra: 'Associado ao pescoço e à cor azul.' },
  { tema: 'Amor, mágoa, perdão e relações próximas.', pergunta: 'Quem ou o quê ainda tens por perdoar, incluindo a ti próprio/a?', exemplos: ['Uma traição ou separação que ainda dói', 'Sentir-se rejeitado/a por alguém muito próximo'], extra: 'Associado ao centro do peito e à cor verde.' },
  { tema: 'Poder pessoal, autoestima e vontade.', pergunta: 'Onde sentes que cedes o teu poder aos outros?', exemplos: ['Ter de agradar para ser aceite', 'Perder o controlo de uma situação importante'], extra: 'Associado à boca do estômago e à cor amarela.' },
  { tema: 'Emoções, prazer, criatividade e relações íntimas.', pergunta: 'Permites-te sentir prazer e criar sem culpa?', exemplos: ['Reprimir emoções para não incomodar', 'Dificuldade em sentir prazer nas pequenas coisas'], extra: 'Associado ao baixo-ventre e à cor laranja.' },
  { tema: 'Segurança, estabilidade e pertença.', pergunta: 'Sentes-te seguro/a e apoiado/a na tua vida?', exemplos: ['Insegurança financeira ou de habitação', 'Falta de apoio familiar na infância'], extra: 'Associado à base da coluna e à cor vermelha.' }
];
function pontosChakras() {
  const M = (window.CG_IMG && window.CG_IMG.chakrasMeta) || [];
  return M.map((m, i) => ({ id: uid(), label: `${i + 1}. ${m.nome} (${m.sans})`, x: 50, y: Math.round((m.y / 440) * 1000) / 10, cor: m.cor, icone: i, ...CHAKRAS_TXT[i] }));
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
    if (s.type === 'mapa' && !(s.points || []).length) return `O passo "${s.title}" precisa de pelo menos um ponto no mapa.`;
    if (s.type === 'mapa' && s.fundo === 'custom' && !s.imagem) return `O passo "${s.title}" precisa da sua imagem.`;
  }
  return '';
};

// ─── Construtor ───
function linhas(v) { return String(v || '').split('\n').map(x => x.trim()).filter(Boolean); }
const campo = (rot, html) => `<label style="margin-top:8px;">${rot}</label>${html}`;

function fundoUri(s) {
  const I = window.CG_IMG || {};
  if (s.fundo === 'custom') return s.imagem || '';
  const svg = I[s.fundo] || I.corpoFrente;
  return svg ? I.uri(svg) : '';
}
// Mapa com pontos. modo: 'edit' (arrastar/adicionar), 'run' (tocar para marcar), 'doc' (só ver)
function mapaHtml(s, modo, sel, destaque) {
  const selSet = new Set(sel || []);
  const dots = (s.points || []).map((p, n) => {
    const on = selSet.has(p.id), edit = modo === 'edit';
    const cor = p.cor || '#dc2626';
    const tam = modo === 'doc' ? (on ? 20 : 16) : (on || destaque === p.id ? 28 : 24);
    const estilo = `position:absolute;left:${p.x}%;top:${p.y}%;width:${tam}px;height:${tam}px;margin:${-tam / 2}px 0 0 ${-tam / 2}px;border-radius:50%;background:${cor};` +
      `opacity:${modo === 'edit' || on ? 1 : 0.4};border:${on ? '3px solid #0f172a' : (destaque === p.id ? '3px solid #0f172a' : '2px solid #fff')};box-shadow:0 0 ${on ? 8 : 3}px ${on ? cor : 'rgba(0,0,0,.35)'};` +
      `color:#fff;font:700 ${modo === 'doc' ? 10 : 11}px/1 Arial,sans-serif;display:flex;align-items:center;justify-content:center;box-sizing:border-box;touch-action:none;${modo === 'doc' ? '' : 'cursor:pointer;'}`;
    const ev = edit ? `data-pid="${p.id}" onpointerdown="cgDotDown(event,'${s.id}','${p.id}')"` : modo === 'run' ? `onclick="cgEscolher('${s.id}','${p.id}')"` : '';
    return `<div ${ev} style="${estilo}">${n + 1}</div>`;
  }).join('');
  const uri = fundoUri(s);
  return `<div class="cgMapa" data-sid="${s.id}" style="position:relative;display:block;width:100%;max-width:${s.fundo === 'custom' ? (modo === 'doc' ? 230 : 300) : (modo === 'doc' ? 150 : 220)}px;margin:8px auto;line-height:0;${modo === 'edit' ? 'touch-action:none;' : ''}">
    ${uri ? `<img src="${esc(uri)}" alt="" style="width:100%;display:block;border-radius:10px;background:#fff;border:1px solid #e2e8f0;" draggable="false">` : '<div style="padding:30px;text-align:center;line-height:1.4;" class="muted">Escolha uma imagem.</div>'}${dots}</div>`;
}

function editorMapa(s) {
  const f = (v, n) => `<option value="${v}" ${s.fundo === v ? 'selected' : ''}>${n}</option>`;
  const sel = (s.points || []).find(p => p.id === CG.ponto);
  return campo('Imagem de fundo', `<select onchange="cgSet('${s.id}','fundo',this.value,true)">${f('corpoFrente', 'Corpo humano — frente')}${f('corpoCostas', 'Corpo humano — costas')}${f('chakras', 'Corpo com os 7 chakras e as suas cores')}${f('custom', 'A minha imagem')}</select>`) +
    (s.fundo === 'custom' ? campo('Endereço da imagem', `<input id="cgImg_${s.id}" value="${esc(s.imagem)}" onchange="cgSet('${s.id}','imagem',this.value,true)" placeholder="https://...">`) + (window.imageUploadFieldHTML ? window.imageUploadFieldHTML(`cgImg_${s.id}`, `tenants/${window.tenantId ? window.tenantId() : 'x'}/protocols`) : '') : '') +
    `<label style="display:flex;gap:8px;align-items:center;margin-top:8px;"><input type="checkbox" style="width:auto;margin:0;" ${s.multi ? 'checked' : ''} onchange="cgSet('${s.id}','multi',this.checked)"> Pode marcar vários pontos</label>` +
    `<div class="muted" style="margin-top:8px;">👆 Toque na imagem para <b>adicionar um ponto</b>. Arraste um ponto para o mover.</div>` +
    `<div id="cgMapaEd_${s.id}">${mapaHtml(s, 'edit', [], CG.ponto)}</div>` +
    `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px;">${s.fundo === 'chakras' ? `<button class="ghost" onclick="cgChakras('${s.id}')">🌈 Pôr os 7 chakras (substitui os pontos)</button>` : ''}<button class="ghost" onclick="cgLimparPontos('${s.id}')">Limpar pontos</button></div>` +
    `<div style="margin-top:8px;">${(s.points || []).map((p, j) => `<button class="${p.id === CG.ponto ? 'primary' : 'ghost'}" style="margin:2px;padding:6px 10px;" onclick="cgPonto('${p.id}')"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.cor || '#dc2626'};margin-right:6px;"></span>${j + 1}. ${esc((p.label || '').slice(0, 22))}</button>`).join('')}</div>` +
    (sel ? `<div style="background:#f6f8f7;border-radius:8px;padding:10px;margin-top:8px;"><strong>✏️ Ponto ${(s.points.indexOf(sel)) + 1}</strong>
      ${campo('Nome do ponto', `<input value="${esc(sel.label)}" onchange="cgPt('${s.id}','${sel.id}','label',this.value,true)">`)}
      ${campo('Cor', `<input type="color" value="${esc(sel.cor || '#dc2626')}" style="height:42px;padding:2px;" onchange="cgPt('${s.id}','${sel.id}','cor',this.value,true)">`)}
      <div style="display:grid;grid-template-columns:repeat(3,48px);gap:6px;justify-content:center;margin:8px 0;"><span></span><button class="ghost" onclick="cgMovePt('${s.id}','${sel.id}',0,-0.5)">▲</button><span></span><button class="ghost" onclick="cgMovePt('${s.id}','${sel.id}',-0.5,0)">◀</button><span></span><button class="ghost" onclick="cgMovePt('${s.id}','${sel.id}',0.5,0)">▶</button><span></span><button class="ghost" onclick="cgMovePt('${s.id}','${sel.id}',0,0.5)">▼</button><span></span></div>
      ${campo('Tema / o que significa', `<textarea rows="2" onchange="cgPt('${s.id}','${sel.id}','tema',this.value)">${esc(sel.tema)}</textarea>`)}
      ${campo('Pergunta para questionar', `<textarea rows="2" onchange="cgPt('${s.id}','${sel.id}','pergunta',this.value)">${esc(sel.pergunta)}</textarea>`)}
      ${campo('Exemplos de situações (um por linha)', `<textarea rows="3" onchange="cgPtLinhas('${s.id}','${sel.id}',this.value)">${esc((sel.exemplos || []).join('\n'))}</textarea>`)}
      ${campo('Conhecimento adicional (aparece no relatório)', `<textarea rows="3" onchange="cgPt('${s.id}','${sel.id}','extra',this.value)">${esc(sel.extra)}</textarea>`)}
      <button class="danger" style="margin-top:8px;" onclick="cgRemPt('${s.id}','${sel.id}')">Remover este ponto</button></div>` : '') +
    `<label style="display:flex;gap:8px;align-items:center;margin-top:10px;"><input type="checkbox" style="width:auto;margin:0;" ${s.noPlano ? 'checked' : ''} onchange="cgSet('${s.id}','noPlano',this.checked)"> Mostrar o mapa com os pontos marcados no plano do paciente</label>`;
}

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
  if (s.type === 'mapa') corpo += editorMapa(s);
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
  if (s.type === 'pergunta' || s.type === 'escolha' || s.type === 'notas' || s.type === 'mapa') {
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

window.cgPonto = (id) => { CG.ponto = CG.ponto === id ? null : id; cgRefresh(); };
const achaPt = (sid, pid) => { const s = achar(sid); return s ? (s.points || []).find(p => p.id === pid) : null; };
window.cgPt = (sid, pid, k, v, rerender) => { const p = achaPt(sid, pid); if (!p) return; p[k] = v; if (rerender) cgRefresh(); };
window.cgPtLinhas = (sid, pid, v) => { const p = achaPt(sid, pid); if (p) p.exemplos = linhas(v); };
window.cgRemPt = (sid, pid) => { const s = achar(sid); if (!s) return; s.points = s.points.filter(p => p.id !== pid); CG.ponto = null; cgRefresh(); };
window.cgLimparPontos = (sid) => { const s = achar(sid); if (!s) return; s.points = []; CG.ponto = null; cgRefresh(); };
window.cgChakras = (sid) => { const s = achar(sid); if (!s) return; s.fundo = 'chakras'; s.points = pontosChakras(); CG.ponto = null; cgRefresh(); };
window.cgMovePt = (sid, pid, dx, dy) => { const p = achaPt(sid, pid); if (!p) return; p.x = Math.max(0, Math.min(100, Math.round((p.x + dx) * 10) / 10)); p.y = Math.max(0, Math.min(100, Math.round((p.y + dy) * 10) / 10)); cgRefreshMapa(sid); };
function cgRefreshMapa(sid) { const s = achar(sid); const el = document.getElementById('cgMapaEd_' + sid); if (s && el) el.innerHTML = mapaHtml(s, 'edit', [], CG.ponto); }
let _drag = null;
window.cgDotDown = (ev, sid, pid) => { window.__cgUltimo = Date.now(); ev.preventDefault(); ev.stopPropagation(); _drag = { sid, pid, moved: false }; CG.ponto = pid; try { ev.target.setPointerCapture(ev.pointerId); } catch (_) {} };
document.addEventListener('pointermove', (ev) => {
  if (!_drag) return; const m = document.querySelector(`.cgMapa[data-sid="${_drag.sid}"]`); const p = achaPt(_drag.sid, _drag.pid); if (!m || !p) return;
  const r = m.getBoundingClientRect(); p.x = Math.max(0, Math.min(100, Math.round(((ev.clientX - r.left) / r.width) * 1000) / 10)); p.y = Math.max(0, Math.min(100, Math.round(((ev.clientY - r.top) / r.height) * 1000) / 10)); _drag.moved = true;
  const d = m.querySelector(`[data-pid="${p.id}"]`); if (d) { d.style.left = p.x + '%'; d.style.top = p.y + '%'; }
});
document.addEventListener('pointerup', () => { if (_drag) { window.__cgUltimo = Date.now(); _drag = null; cgRefresh(); } });
// tocar numa zona vazia da imagem acrescenta um ponto
document.addEventListener('click', (ev) => {
  if (Date.now() - (window.__cgUltimo || 0) < 600) return;
  const m = ev.target.closest && ev.target.closest('.cgMapa'); if (!m || ev.target.closest('[data-pid]')) return;
  if (!m.parentElement || !String(m.parentElement.id).startsWith('cgMapaEd_')) return;
  const s = achar(m.dataset.sid); if (!s) return; const r = m.getBoundingClientRect();
  const p = { id: uid(), label: 'Ponto ' + ((s.points || []).length + 1), x: Math.round(((ev.clientX - r.left) / r.width) * 1000) / 10, y: Math.round(((ev.clientY - r.top) / r.height) * 1000) / 10, cor: '#dc2626', tema: '', pergunta: '', exemplos: [], extra: '' };
  s.points = s.points || []; s.points.push(p); CG.ponto = p.id; cgRefresh();
});

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
  o = { ...o, label: o.label || '' };
  const ic = iconeUri(o);
  return `<div style="background:#f6f8f7;border-left:3px solid ${esc(o.cor || '#6a4fb3')};border-radius:8px;padding:10px;margin-top:8px;">
    <div style="display:flex;gap:10px;align-items:center;">${ic ? `<img src="${ic}" alt="" style="width:44px;height:44px;">` : ''}<strong>${esc(o.label)}</strong></div>
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
  } else if (s.type === 'mapa') {
    const sel = r.sel || [];
    corpo = mapaHtml(s, 'run', sel) + `<div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px;">${(s.points || []).map((p, n) => `<button class="${sel.includes(p.id) ? 'primary' : 'ghost'}" style="padding:6px 10px;" onclick="cgEscolher('${s.id}','${p.id}')"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${p.cor || '#dc2626'};margin-right:6px;"></span>${n + 1}. ${esc(p.label)}</button>`).join('')}</div>` +
      (s.points || []).filter(p => sel.includes(p.id)).map(cartaoConhecimento).join('');
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
  if (s.type === 'mapa' || s.type === 'escolha') { /* ok */ }
  const k = r.sel.indexOf(oid);
  if (k >= 0) r.sel.splice(k, 1); else { if (!s.multi) r.sel = []; r.sel.push(oid); }
  lerAtual(); cgPasso();
};
window.cgNav = function (d) {
  clearInterval(_t); lerAtual();
  if (d > 0 && EX.i === EX.proto.steps.length - 1) { cgConcluir(); return; }
  EX.i = Math.max(0, Math.min(EX.proto.steps.length - 1, EX.i + d)); cgPasso();
};

// ─── Relatório e plano (texto + documentos com a marca do subscritor) ───
const fmtT = (n) => `${Math.floor(n / 60)}:${String(n % 60).padStart(2, '0')}`;
const AVISO = 'Este documento é uma ferramenta de apoio no âmbito de uma terapia complementar e não substitui o aconselhamento médico ou psicológico.';

function selecionados(s, r) { return (s.type === 'mapa' ? (s.points || []) : (s.options || [])).filter(o => (r.sel || []).includes(o.id)); }

export function cgConstruir(proto, resp, nomePaciente, data) {
  const R = [], P = [];
  const titulo = proto.name || 'Consulta';
  for (const s of proto.steps || []) {
    const r = resp[s.id] || {};
    if (s.type === 'pergunta' && s.noRelatorio !== false) {
      const v = r.lista ? r.lista.join(', ') : (r.valor || '');
      if (v) R.push(`${s.title}: ${v}`);
    }
    if ((s.type === 'escolha' || s.type === 'mapa') && s.noRelatorio !== false) {
      const sel = selecionados(s, r);
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
    if (s.type === 'mapa' && s.noPlano) { const sel = selecionados(s, r); if (sel.length) P.push(`${s.title} — pontos a trabalhar:\n` + sel.map(o => `• ${o.label}`).join('\n')); }
    if (s.type === 'instrucao' && s.noPlano && (s.texto || s.imagem)) P.push(`${s.title}\n${s.texto || ''}`.trim());
    if (s.type === 'tratamento' && s.noPlano && (s.passos || []).length) P.push(`${s.title}\n` + s.passos.map((p, i) => `${i + 1}. ${p}`).join('\n') + (s.segundos > 0 ? `\n(Temporizador sugerido: ${fmtT(s.segundos)})` : ''));
  }
  const relatorio = `${titulo.toUpperCase()}\n${nomePaciente} · ${data}\n\n` + R.join('\n');
  const plano = P.length ? `PLANO / RECEITA\n${nomePaciente} · ${data}\n\n` + P.join('\n\n') : '';
  return { relatorio, plano, texto: relatorio + (plano ? '\n\n' + plano : '') };
}

function marcaAtual() {
  const m = (window.cgMarca && window.cgMarca()) || {};
  return { nome: m.nome || '', logo: m.logo || '', cor: /^#[0-9a-fA-F]{6}$/.test(m.cor || '') ? m.cor : '#1e3a8a' };
}
function cabecalho(titulo, nomePaciente, data, m) {
  return `<div style="background:${m.cor};color:#fff;border-radius:12px;padding:16px;margin-bottom:14px;display:flex;gap:14px;align-items:center;">
    ${m.logo ? `<img src="${esc(m.logo)}" alt="" style="width:64px;height:64px;border-radius:50%;object-fit:cover;background:#fff;flex-shrink:0;">` : ''}
    <div>${m.nome ? `<div style="font-size:0.78rem;letter-spacing:2px;font-weight:700;opacity:.9;">${esc(m.nome.toUpperCase())}</div>` : ''}
    <div style="font-size:1.2rem;font-weight:800;">${esc(titulo)}</div>
    <div style="font-size:0.85rem;opacity:.9;margin-top:2px;">${esc(nomePaciente)} · ${esc(data)}</div></div></div>`;
}
function cartaoDoc(o) {
  return `<div style="border:1px solid #e2e8f0;border-radius:10px;padding:10px 12px;margin-bottom:8px;break-inside:avoid;page-break-inside:avoid;">
    <div style="display:flex;gap:10px;align-items:center;">${iconeUri(o) ? `<img src="${iconeUri(o)}" alt="" style="width:40px;height:40px;">` : ''}<div style="font-weight:700;color:#0f172a;">${esc(o.label)}</div></div>
    ${o.tema ? `<div style="font-size:0.88rem;margin-top:3px;">🔎 <b>Tema:</b> ${esc(o.tema)}</div>` : ''}
    ${(o.exemplos || []).length ? `<div style="font-size:0.88rem;margin-top:3px;">📌 <b>Situações que podem ter acontecido:</b><ul style="margin:3px 0 0 18px;padding:0;">${o.exemplos.map(e => `<li>${esc(e)}</li>`).join('')}</ul></div>` : ''}
    ${o.pergunta ? `<div style="font-size:0.88rem;margin-top:3px;color:#1e3a8a;">❓ <b>Pergunta para te questionares:</b> ${esc(o.pergunta)}</div>` : ''}
    ${o.extra ? `<div style="font-size:0.86rem;margin-top:3px;color:#334155;">📚 <b>Para saberes mais:</b> ${esc(o.extra)}</div>` : ''}</div>`;
}
export function cgDocumentos(proto, resp, nomePaciente, data, marca) {
  const m = marca || marcaAtual(); let rel = '', plano = '';
  for (const s of proto.steps || []) {
    const r = resp[s.id] || {};
    if (s.type === 'pergunta' && s.noRelatorio !== false) {
      const v = r.lista ? r.lista.join(', ') : (r.valor || '');
      if (v) rel += `<div style="font-size:0.92rem;margin:6px 0;"><b>${esc(s.title)}</b><br><span style="color:#334155;">${esc(v)}</span></div>`;
    }
    if ((s.type === 'escolha' || s.type === 'mapa') && s.noRelatorio !== false) {
      const sel = selecionados(s, r);
      if (sel.length) rel += `<h3 style="color:${m.cor};margin:16px 0 8px;font-size:1.02rem;break-after:avoid;">${esc(s.title)}</h3>` + (s.type === 'mapa' ? mapaHtml(s, 'doc', sel.map(o => o.id)) : '') + sel.map(cartaoDoc).join('');
    }
    if (s.type === 'notas' && s.noRelatorio && r.valor) rel += `<div style="margin-top:14px;"><b style="color:${m.cor};">${esc(s.title)}</b><p style="font-size:0.9rem;white-space:pre-wrap;color:#334155;margin-top:4px;">${esc(r.valor)}</p></div>`;
    if (s.type === 'mapa' && s.noPlano) {
      const sel = selecionados(s, r);
      if (sel.length) plano += `<h3 style="color:${m.cor};margin:16px 0 6px;font-size:1.02rem;break-after:avoid;">${esc(s.title)} — pontos a trabalhar</h3>${mapaHtml(s, 'doc', sel.map(o => o.id))}<ol style="font-size:0.9rem;color:#334155;margin:6px 0 0 20px;">${sel.map(o => `<li>${esc(o.label)}</li>`).join('')}</ol>`;
    }
    if (s.type === 'instrucao' && s.noPlano && (s.texto || s.imagem)) plano += `<h3 style="color:${m.cor};margin:16px 0 6px;font-size:1.02rem;break-after:avoid;">${esc(s.title)}</h3>${s.texto ? `<p style="font-size:0.9rem;white-space:pre-wrap;color:#334155;">${esc(s.texto)}</p>` : ''}${s.imagem ? `<img src="${esc(s.imagem)}" alt="" style="max-width:260px;border-radius:8px;">` : ''}`;
    if (s.type === 'tratamento' && s.noPlano && (s.passos || []).length) plano += `<h3 style="color:${m.cor};margin:16px 0 6px;font-size:1.02rem;break-after:avoid;">${esc(s.title)}</h3><ol style="font-size:0.9rem;line-height:1.55;color:#334155;margin:0 0 6px 20px;">${s.passos.map(p => `<li style="margin-bottom:4px;">${esc(p)}</li>`).join('')}</ol>${s.segundos > 0 ? `<div style="font-size:0.84rem;color:#64748b;">⏱ Temporizador sugerido: ${fmtT(s.segundos)}</div>` : ''}`;
  }
  const rodape = `<p style="font-size:0.74rem;color:#64748b;margin-top:18px;border-top:1px solid #e2e8f0;padding-top:8px;">${esc(AVISO)}</p>${m.nome ? `<div style="text-align:center;font-size:0.78rem;color:#64748b;margin-top:6px;">${esc(m.nome)}</div>` : ''}`;
  return {
    htmlRel: `<div>${cabecalho(proto.name || 'Consulta', nomePaciente, data, m)}${rel}${rodape}</div>`,
    htmlPlano: plano ? `<div>${cabecalho('O Teu Plano em Casa', nomePaciente, data, m)}${plano}${rodape}</div>` : ''
  };
}

// ─── PDF e envio ───
function carregarHtml2Pdf() {
  if (window.html2pdf) return Promise.resolve();
  if (carregarHtml2Pdf._p) return carregarHtml2Pdf._p;
  carregarHtml2Pdf._p = new Promise((ok, no) => {
    const sc = document.createElement('script');
    sc.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    sc.onload = ok; sc.onerror = () => { carregarHtml2Pdf._p = null; no(new Error('Não consegui carregar o gerador de PDF.')); };
    document.head.appendChild(sc);
  });
  return carregarHtml2Pdf._p;
}
async function imagensParaDados(host) {
  for (const im of Array.from(host.querySelectorAll('img'))) {
    const src = im.getAttribute('src') || '';
    if (!src || src.startsWith('data:')) continue;
    try {
      const b = await (await fetch(src, { mode: 'cors' })).blob();
      im.src = await new Promise((ok, no) => { const f = new FileReader(); f.onload = () => ok(f.result); f.onerror = no; f.readAsDataURL(b); });
    } catch (_) { im.remove(); }
  }
}
function nomeFicheiro(qual) {
  const n = String(EX.patientName || 'paciente').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `${qual === 'plano' ? 'Plano' : 'Relatorio'}-${n}-${new Date().toISOString().slice(0, 10)}.pdf`;
}
window.cgPdf = async function (qual) {
  const html = qual === 'plano' ? EX.out.htmlPlano : EX.out.htmlRel;
  if (!html) { aviso('Não há conteúdo para este PDF.', true); return; }
  aviso('A preparar o PDF…');
  let wrap;
  try {
    await carregarHtml2Pdf();
    wrap = document.createElement('div'); wrap.style.cssText = 'position:fixed;left:-10000px;top:0;';
    const host = document.createElement('div');
    host.style.cssText = 'box-sizing:border-box;width:720px;background:#fff;padding:18px;color:#0f172a;font-family:system-ui,sans-serif;';
    host.innerHTML = html; wrap.appendChild(host); document.body.appendChild(wrap);
    await imagensParaDados(host);
    const nome = nomeFicheiro(qual);
    const blob = await window.html2pdf().set({ margin: [10, 8, 12, 8], filename: nome, image: { type: 'jpeg', quality: 0.9 },
      html2canvas: { scale: 1.6, useCORS: true, backgroundColor: '#ffffff', windowWidth: 720 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: ['css', 'legacy'], avoid: ['li', 'img'] } }).from(host).outputPdf('blob');
    const f = new File([blob], nome, { type: 'application/pdf' });
    if (navigator.canShare && navigator.canShare({ files: [f] })) { try { await navigator.share({ files: [f], title: nome }); return; } catch (e) { if (e && e.name === 'AbortError') return; } }
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(a.href), 60000); aviso('✅ PDF pronto: ' + nome);
  } catch (e) { console.error(e); aviso('Não consegui criar o PDF. ' + (e.message || ''), true); }
  finally { if (wrap) wrap.remove(); }
};
function telefoneWA() { const d = String((EX.contacto && EX.contacto.phone) || '').replace(/\D/g, ''); return !d ? '' : d.length === 9 ? '351' + d : d; }
function abrirLink(u) { if (window.openExternalLink) window.openExternalLink(u); else window.open(u, '_blank'); }
window.cgWhatsApp = (qual) => {
  const nome = String(EX.patientName || '').split(' ')[0];
  let t = `Olá ${nome}! ${qual === 'plano' ? 'Segue o teu plano em casa.' : 'Segue o teu relatório da consulta.'}\n\n` + (qual === 'plano' ? EX.out.plano : EX.out.relatorio);
  if (t.length > 3500) t = t.slice(0, 3400) + '\n\n[…] O documento completo segue em PDF.';
  abrirLink(`https://wa.me/${telefoneWA()}?text=${encodeURIComponent(t)}`);
};
window.cgEmail = (qual) => {
  const mail = (EX.contacto && EX.contacto.email) || '';
  const corpo = (qual === 'plano' ? EX.out.plano : EX.out.relatorio).slice(0, 1500) + '\n\n[…] O documento completo segue em anexo (PDF).';
  abrirLink(`mailto:${mail}?subject=${encodeURIComponent(qual === 'plano' ? 'O teu plano em casa' : 'O teu relatório da consulta')}&body=${encodeURIComponent(corpo)}`);
};
window.cgCopiar = (qual) => { const t = qual === 'plano' ? EX.out.plano : EX.out.relatorio; if (window.copiarTexto) window.copiarTexto(t, 'Texto copiado.'); else navigator.clipboard && navigator.clipboard.writeText(t); };

function blocoDoc(qual, titulo, html) {
  const b = (cor, txt, fn) => `<button onclick="${fn}" style="background:${cor};color:#fff;padding:11px 14px;border:none;border-radius:8px;font-weight:700;cursor:pointer;">${txt}</button>`;
  return `<div style="margin-bottom:20px;"><h3 style="margin:0 0 8px;">${titulo}</h3>
    <details style="margin-bottom:10px;"><summary style="cursor:pointer;font-weight:600;" class="muted">👁 Ver como fica</summary><div style="background:#fff;border:1px solid #e2e8f0;border-radius:10px;padding:14px;margin-top:8px;">${html}</div></details>
    <div style="display:flex;gap:8px;flex-wrap:wrap;">${b('#16a34a', '📄 PDF para enviar', `cgPdf('${qual}')`)}${b('#25D366', '📱 WhatsApp', `cgWhatsApp('${qual}')`)}${b('#1e3a8a', '✉️ E-mail', `cgEmail('${qual}')`)}<button class="ghost" onclick="cgCopiar('${qual}')">📋 Copiar texto</button></div></div>`;
}
function mostrarResultado(preview) {
  const o = EX.out;
  EX.area.innerHTML = `<div class="card">
    <h2>${preview ? '🔎 Pré-visualização do resultado' : '✅ Consulta guardada na ficha'}</h2>
    ${preview ? '<p class="muted" style="margin-bottom:10px;">Nada disto foi guardado.</p>' : ''}
    ${blocoDoc('rel', '1 · Relatório do paciente', o.htmlRel)}
    ${o.htmlPlano ? blocoDoc('plano', '2 · Plano / receita em casa', o.htmlPlano) : '<p class="muted">Esta consulta não tem plano em casa (marque "incluir no plano" nos passos que quiser).</p>'}
    <p class="muted" style="text-align:center;">O PDF fica pronto a enviar: no telemóvel abre a partilha (WhatsApp, e-mail…); no computador é descarregado.</p>
    <div style="margin-top:14px;">${preview ? `<button class="ghost" onclick="renderView('protocols')">✕ Fechar</button>` : (EX.patientId ? `<button class="ghost" onclick="viewPatient('${EX.patientId}')">👤 Voltar à ficha do paciente</button>` : '')}</div></div>`;
}

async function cgConcluir() {
  const data = new Date().toLocaleDateString('pt-PT');
  const t = cgConstruir(EX.proto, EX.resp, EX.patientName, data);
  const docs = cgDocumentos(EX.proto, EX.resp, EX.patientName, data);
  EX.out = { ...t, ...docs };
  const prev = EX.preview;
  if (!prev && EX.patientId) {
    try { const sn = await window.db().doc(`tenants/${window.tenantId()}/patients/${EX.patientId}`).get(); EX.contacto = sn.data() || {}; } catch (_) { EX.contacto = {}; }
    if (window.guardarNaFicha) {
      const ok = await window.guardarNaFicha(EX.patientId, { tipo: 'consulta_guiada', titulo: EX.proto.name, texto: t.texto,
        dados: JSON.parse(JSON.stringify({ protocoloId: EX.protoId || '', respostas: EX.resp, relatorio: t.relatorio, plano: t.plano, htmlRelatorio: docs.htmlRel, htmlPlano: docs.htmlPlano, data })) });
      if (!ok) aviso('⚠️ Não consegui gravar na ficha. Copie o relatório antes de sair.', true);
    }
  }
  mostrarResultado(prev);
}
