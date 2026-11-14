// Campos das fichas / anamneses / questionários — partilhado pela ficha do paciente (ficha.html)
// e pelo "Preencher agora" na app. Os tipos antigos (text, multiple_choice, scale) continuam iguais.
//
// Tipos: text (texto longo) · short (resposta curta) · multiple_choice (escolher uma) · multi (marcar várias)
//        yesno (sim/não, com pormenor opcional) · scale (0–10) · number (com unidade) · date · title (título/secção, sem resposta)
//
// Cada pergunta pode ter: help (nota pequena), required (obrigatória), cond {de, valor} (só aparece se…)

export const FC_TIPOS = [
  ['text', 'Texto livre (resposta longa)'],
  ['short', 'Resposta curta'],
  ['multiple_choice', 'Escolher uma opção'],
  ['multi', 'Marcar várias opções'],
  ['yesno', 'Sim / Não (com pormenor opcional)'],
  ['scale', 'Escala (0 a 10)'],
  ['number', 'Número (com unidade)'],
  ['date', 'Data'],
  ['title', 'Título de secção (sem resposta)']
];
export const FC_SEM_RESPOSTA = new Set(['title']);

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const attr = (s) => esc(s).replace(/`/g, '&#96;');

// Texto final guardado para cada resposta (as fichas guardam sempre texto ou número)
export function fcValorTexto(q, v) {
  if (v == null || v === '') return '';
  if (q.type === 'multi') return Array.isArray(v) ? v.join('; ') : String(v);
  if (q.type === 'yesno') {
    if (typeof v === 'object') return v.v ? (v.v + (v.d ? ' — ' + v.d : '')) : '';
    return String(v);
  }
  if (q.type === 'number') return String(v) + (q.unidade ? ' ' + q.unidade : '');
  if (q.type === 'date') { try { const d = new Date(v); return isNaN(d) ? String(v) : d.toLocaleDateString('pt-PT'); } catch (_) { return String(v); } }
  return v;
}

const vazio = (q, v) => v == null || v === '' || (Array.isArray(v) && !v.length) || (typeof v === 'object' && !Array.isArray(v) && !v.v);

// Uma pergunta está visível se não tem condição, ou se a resposta à pergunta indicada coincide
export function fcVisivel(q, perguntas, estado) {
  const c = q.cond; if (!c || !c.de) return true;
  const de = perguntas.find(x => x.id === c.de);
  if (de && !fcVisivel(de, perguntas, estado)) return false;
  const v = estado[c.de];
  if (vazio(de || {}, v)) return false;
  if (!c.valor) return true;
  if (Array.isArray(v)) return v.includes(c.valor);
  if (typeof v === 'object') return v.v === c.valor;
  return String(v) === c.valor;
}

// Lista das perguntas obrigatórias em falta (só as visíveis)
export function fcEmFalta(perguntas, estado) {
  return perguntas.filter(q => q.required && !FC_SEM_RESPOSTA.has(q.type) && fcVisivel(q, perguntas, estado) && vazio(q, estado[q.id]));
}

// Respostas finais (só perguntas visíveis e com resposta/ou título)
export function fcRespostas(perguntas, estado) {
  return perguntas.filter(q => !FC_SEM_RESPOSTA.has(q.type) && fcVisivel(q, perguntas, estado))
    .map(q => ({ questionId: q.id, label: q.label, value: fcValorTexto(q, estado[q.id]) }));
}

// HTML de uma pergunta. Os eventos chamam window.__fcSet(id, valor) e window.__fcAtualizar() (definidos pelo ecrã).
export function fcPerguntaHtml(q, estado, idioma) {
  const id = attr(q.id), v = estado[q.id];
  const obr = q.required ? ' <span style="color:#b91c1c;" title="Obrigatória">*</span>' : '';
  const ajuda = q.help ? `<div class="fcAjuda" style="font-size:12px;color:#64748b;margin:2px 0 8px;">${esc(q.help)}</div>` : '';
  const abre = `<div class="card fcq" data-fcq="${id}">`;
  if (q.type === 'title') {
    return `<div class="fcq" data-fcq="${id}" style="margin:18px 4px 4px;"><h3 style="margin:0;color:var(--primary);">${esc(q.label)}</h3>${q.help ? `<p style="font-size:13px;color:#64748b;margin:4px 0 0;">${esc(q.help)}</p>` : ''}</div>`;
  }
  const rotulo = `<label>${esc(q.label)}${obr}</label>${ajuda}`;
  if (q.type === 'short') return `${abre}${rotulo}<input data-fci="${id}" value="${attr(v || '')}" oninput="window.__fcSet('${id}', this.value)"></div>`;
  if (q.type === 'number') return `${abre}${rotulo}<div style="display:flex;gap:8px;align-items:center;"><input data-fci="${id}" type="number" inputmode="decimal" step="any" value="${attr(v == null ? '' : v)}" oninput="window.__fcSet('${id}', this.value)" style="flex:1;margin:0;"><span class="muted">${esc(q.unidade || '')}</span></div></div>`;
  if (q.type === 'date') return `${abre}${rotulo}<input data-fci="${id}" type="date" value="${attr(v || '')}" oninput="window.__fcSet('${id}', this.value)"></div>`;
  if (q.type === 'scale') {
    let b = ''; for (let i = 0; i <= 10; i++) b += `<button type="button" id="scale-${id}-${i}" class="${v === i ? 'selected' : ''}" onclick="window.__setScale('${id}', ${i})">${i}</button>`;
    return `${abre}${rotulo}<div class="scale">${b}</div></div>`;
  }
  if (q.type === 'multiple_choice') {
    const op = (q.options || []).map((o, i) => `<div class="choice ${v === o ? 'selected' : ''}" id="choice-${id}-${i}" onclick="window.__setChoice('${id}', ${i})">${esc(o)}</div>`).join('');
    return `${abre}${rotulo}${op}</div>`;
  }
  if (q.type === 'multi') {
    const sel = Array.isArray(v) ? v : [];
    const op = (q.options || []).map((o, i) => `<div class="choice ${sel.includes(o) ? 'selected' : ''}" id="multi-${id}-${i}" onclick="window.__toggleMulti('${id}', ${i})">${sel.includes(o) ? '☑' : '☐'} ${esc(o)}</div>`).join('');
    return `${abre}${rotulo}${op}</div>`;
  }
  if (q.type === 'yesno') {
    const r = (v && typeof v === 'object') ? v : {};
    const sim = idioma && idioma.sim || 'Sim', nao = idioma && idioma.nao || 'Não';
    const det = q.detalhe ? `<div class="fcDet" style="${r.v === 'Sim' ? '' : 'display:none;'}margin-top:8px;"><label style="font-weight:400;">${esc(q.detalheRotulo || 'Se sim, indique qual:')}</label><textarea rows="2" data-fcd="${id}" oninput="window.__fcDetalhe('${id}', this.value)">${esc(r.d || '')}</textarea></div>` : '';
    return `${abre}${rotulo}<div style="display:flex;gap:8px;"><div class="choice ${r.v === 'Sim' ? 'selected' : ''}" id="yn-${id}-Sim" style="flex:1;text-align:center;" onclick="window.__setYesNo('${id}','Sim')">${esc(sim)}</div><div class="choice ${r.v === 'Não' ? 'selected' : ''}" id="yn-${id}-Nao" style="flex:1;text-align:center;" onclick="window.__setYesNo('${id}','Não')">${esc(nao)}</div></div>${det}</div>`;
  }
  return `${abre}${rotulo}<textarea rows="3" data-fci="${id}" oninput="window.__fcSet('${id}', this.value)">${esc(v || '')}</textarea></div>`;
}

// Liga os eventos ao ecrã. "estado" é o objeto de respostas; "perguntas" a lista; "aoMudar" corre depois de cada alteração.
export function fcLigar(perguntas, estado, raiz, aoMudar) {
  const q = (id) => perguntas.find(x => x.id === id);
  const refresca = () => { fcAtualizarVisibilidade(perguntas, estado, raiz); aoMudar && aoMudar(); };
  window.__fcSet = (id, val) => { estado[id] = val; refresca(); };
  window.__fcAtualizar = refresca;
  window.__setScale = (id, val) => { for (let i = 0; i <= 10; i++) document.getElementById(`scale-${id}-${i}`)?.classList.toggle('selected', i === val); estado[id] = val; refresca(); };
  window.__setChoice = (id, idx) => { const f = q(id); (f.options || []).forEach((_, i) => document.getElementById(`choice-${id}-${i}`)?.classList.toggle('selected', i === idx)); estado[id] = f.options[idx]; refresca(); };
  window.__toggleMulti = (id, idx) => { const f = q(id); const o = f.options[idx]; const sel = Array.isArray(estado[id]) ? estado[id].slice() : []; const k = sel.indexOf(o); if (k >= 0) sel.splice(k, 1); else sel.push(o); estado[id] = sel; (f.options || []).forEach((x, i) => { const el = document.getElementById(`multi-${id}-${i}`); if (el) { const on = sel.includes(x); el.classList.toggle('selected', on); el.textContent = (on ? '☑ ' : '☐ ') + x; } }); refresca(); };
  window.__setYesNo = (id, val) => { const r = (estado[id] && typeof estado[id] === 'object') ? estado[id] : {}; r.v = val; estado[id] = r; document.getElementById(`yn-${id}-Sim`)?.classList.toggle('selected', val === 'Sim'); document.getElementById(`yn-${id}-Nao`)?.classList.toggle('selected', val === 'Não'); const d = document.querySelector(`[data-fcq="${id}"] .fcDet`); if (d) d.style.display = val === 'Sim' ? '' : 'none'; refresca(); };
  window.__fcDetalhe = (id, txt) => { const r = (estado[id] && typeof estado[id] === 'object') ? estado[id] : {}; r.d = txt; estado[id] = r; };
  refresca();
}

export function fcAtualizarVisibilidade(perguntas, estado, raiz) {
  (raiz || document).querySelectorAll('[data-fcq]').forEach(el => {
    const q = perguntas.find(x => x.id === el.dataset.fcq); if (!q) return;
    el.style.display = fcVisivel(q, perguntas, estado) ? '' : 'none';
  });
}

export function fcHtmlTodas(perguntas, estado, idioma) { return perguntas.map(q => fcPerguntaHtml(q, estado, idioma)).join(''); }
