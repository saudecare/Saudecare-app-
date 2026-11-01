/* Orações e Salmos — biblioteca da Hikari Fafe: criar, editar, ordenar e enviar por link ao paciente.
   Ferramenta exclusiva da conta hikari-terapias. Cada oração é um documento em «oracoes/{id}» e a página
   de leitura do paciente é oracao.html?o={id} (feita para telemóvel e para qualquer ecrã). */
import { ORACAO_MIGUEL, MODELO_VAZIO } from './oracoes-padrao.js';

export const TENANT_ORACOES = 'hikari-terapias';
const BASE_LINK = 'https://vindora.pt/oracao.html?o=';
const BASE_ENVIO = 'https://vindora.pt/oracao.html?e=';
const TIPOS_DOC = { oracao: '🙏 Oração', salmo: '📜 Salmo', ciclo: '🗓️ Ciclo de dias' };
const TIPOS_SEC = { texto: 'Texto', passos: 'Passos (um por linha)', oracao: 'Oração (texto de leitura)', aviso: 'Aviso' };
const clone = (o) => JSON.parse(JSON.stringify(o));

export function renderOracoes(main, ctx) {
  if (ctx.tenantId !== TENANT_ORACOES) {
    main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica e não está disponível na sua subscrição.</p></div>';
    return;
  }
  const esc = ctx.escapeHtml;
  let lista = [];
  let envios = [];
  let ed = null; // documento em edição: { id|null, ...dados }

  async function carregar() {
    main.innerHTML = '<div class="card"><p class="muted">A carregar as orações…</p></div>';
    try { lista = await ctx.listar(); try { envios = await ctx.listarEnvios(); } catch (_) { envios = []; } }
    catch (e) {
      main.innerHTML = `<div class="card"><h2>🙏 Orações e Salmos</h2><p class="muted" style="color:var(--danger)">Ainda não está ativado na conta (falta publicar as regras da base de dados). ${esc(e.message || '')}</p><button class="primary" id="o-tent">Tentar outra vez</button></div>`;
      main.querySelector('#o-tent').onclick = carregar; return;
    }
    // primeira vez: instala já a oração do Arcanjo Miguel
    let semente = false; try { semente = localStorage.getItem('oracoes_semente_v1') === '1'; } catch (_) {}
    if (!lista.length && !semente) {
      try { await ctx.gravar(null, Object.assign(clone(ORACAO_MIGUEL), { ordem: 1 })); try { localStorage.setItem('oracoes_semente_v1', '1'); } catch (_) {} lista = await ctx.listar(); } catch (_) {}
    }
    vistaLista();
  }

  function vistaLista() {
    ed = null;
    const temMiguel = lista.some((o) => o.padraoId === ORACAO_MIGUEL.padraoId);
    main.innerHTML = `<div class="row" style="margin-bottom:10px;gap:8px;flex-wrap:wrap;">
        <h2 style="margin:0;">🙏 Orações e Salmos</h2>
        <button class="primary" id="o-nova">➕ Nova oração ou salmo</button>
      </div>
      <p class="muted" style="margin:0 0 12px;">Escreve ou edita as orações e envia por link ao paciente. A página abre bem no telemóvel, com letra ajustável e fundo claro, sépia ou escuro.</p>
      ${temMiguel ? '' : `<div class="card" style="margin-bottom:12px;"><p style="margin:0 0 8px;">A oração de 21 dias do Arcanjo Miguel não está na tua lista.</p><button class="ghost" id="o-miguel">✨ Instalar a oração do Arcanjo Miguel (21 dias)</button></div>`}
      <div id="o-lista">${lista.map(cartao).join('') || '<div class="card"><p class="muted">Ainda sem orações. Carrega em «Nova oração ou salmo».</p></div>'}</div>
      ${painelEnvios()}`;
    main.querySelector('#o-nova').onclick = () => abrirEditor(null);
    const m = main.querySelector('#o-miguel');
    if (m) m.onclick = async () => { await ctx.gravar(null, Object.assign(clone(ORACAO_MIGUEL), { ordem: 1 })); ctx.toast('Oração instalada.'); carregar(); };
    main.querySelectorAll('[data-acao]').forEach((b) => { b.onclick = () => acao(b.dataset.acao, b.dataset.id); });
    main.querySelectorAll('[data-env]').forEach((b) => { b.onclick = () => acaoEnvio(b.dataset.env, b.dataset.id); });
  }

  // ───────── painel dos envios (link único por pessoa + progresso) ─────────
  const dataPT = (iso) => { if (!iso) return '—'; const d = new Date(iso); return isNaN(d) ? '—' : d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit' }) + ' ' + d.toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }); };
  function painelEnvios() {
    if (!envios.length) return `<h3 style="margin:18px 0 6px;">👥 Quem recebeu</h3><p class="muted">Quando enviares uma oração a alguém, aparece aqui com o progresso.</p>`;
    const ord = envios.slice().sort((a, b) => String(b.ultimaAtividade || b.criadoEmIso || '').localeCompare(String(a.ultimaAtividade || a.criadoEmIso || '')));
    return `<h3 style="margin:18px 0 6px;">👥 Quem recebeu <span class="muted" style="font-size:.85rem;">(cada pessoa tem o seu link)</span></h3>` + ord.map((e) => {
      const o = lista.find((x) => x.id === e.oracaoId) || {}; const dias = o.dias || 0; const f = (e.feitos || []).length;
      const pct = dias ? Math.round(f / dias * 100) : 0;
      const prog = dias ? `<div style="height:8px;background:#e8e3d6;border-radius:9px;overflow:hidden;margin:6px 0 2px;"><i style="display:block;height:100%;width:${pct}%;background:#b7791f;"></i></div><span style="font-size:.85rem;">${f >= dias ? '🌟 Completou os ' + dias + ' dias' : f + ' de ' + dias + ' dias feitos'}</span>`
        : `<span style="font-size:.85rem;">${e.vezes ? '🙏 Rezou ' + e.vezes + (e.vezes === 1 ? ' vez' : ' vezes') : (e.abertoEm ? '👀 Já abriu, ainda não marcou' : '⏳ Ainda não abriu')}</span>`;
      return `<div class="card" style="margin-bottom:8px;"><div class="row" style="gap:8px;"><strong>${esc(e.patientNome || 'Sem nome')}</strong><span class="muted" style="font-size:.8rem;">${esc(o.emoji || '🙏')} ${esc(e.titulo || o.titulo || '')}</span></div>
        ${prog}<div class="muted" style="font-size:.78rem;margin-top:2px;">${e.abertoEm ? 'Abriu: ' + dataPT(e.abertoEm) + ' · ' : 'Ainda não abriu · '}Última atividade: ${dataPT(e.ultimaAtividade)}</div>
        <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px;"><button class="ghost" data-env="copiar" data-id="${esc(e.id)}">🔗 Copiar link</button><button class="ghost" data-env="wa" data-id="${esc(e.id)}">📱 Reenviar</button><button class="ghost" data-env="apagar" data-id="${esc(e.id)}" style="color:var(--danger)">🗑️</button></div></div>`;
    }).join('');
  }
  async function acaoEnvio(a, id) {
    const e = envios.find((x) => x.id === id); if (!e) return; const link = BASE_ENVIO + id;
    if (a === 'copiar') { try { await navigator.clipboard.writeText(link); ctx.toast('Link copiado.'); } catch (_) { ctx.toast('Não consegui copiar.', true); } }
    else if (a === 'wa') { const d = String(e.telefone || '').replace(/\D/g, ''); const t = d.length === 9 ? '351' + d : d; window.open(`https://wa.me/${t}?text=${encodeURIComponent(mensagem(e.patientNome, e.titulo, link))}`, '_blank'); }
    else if (a === 'apagar') { if (!(await ctx.confirmar('Apagar este envio?', 'O link desta pessoa deixa de funcionar e perde-se o progresso dela.', 'Apagar'))) return; await ctx.apagarEnvio(id); ctx.toast('Apagado.'); carregar(); }
  }
  const mensagem = (nome, titulo, link) => `Olá${nome ? ' ' + String(nome).split(' ')[0] : ''}! 🙏 Enviei-te «${titulo}» para leres com calma, no telemóvel. Este link é só teu e guarda o teu progresso:\n${link}`;

  function cartao(o) {
    const dias = o.dias ? ` · ${o.dias} dias` : '';
    return `<div class="card" style="margin-bottom:10px;">
      <div style="display:flex;gap:12px;align-items:flex-start;">
        <div style="font-size:2rem;line-height:1;">${esc(o.emoji || '🙏')}</div>
        <div style="flex:1;min-width:0;"><strong style="display:block;">${esc(o.titulo)}</strong>
          <span class="muted" style="font-size:.85rem;">${esc(TIPOS_DOC[o.tipo] || 'Oração')}${dias}${o.subtitulo ? ' · ' + esc(o.subtitulo) : ''}</span></div>
      </div>
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px;">
        <button class="primary" data-acao="enviar" data-id="${esc(o.id)}">📤 Enviar ao paciente</button>
        <button class="ghost" data-acao="ver" data-id="${esc(o.id)}">👁 Ver como o paciente</button>
        <button class="ghost" data-acao="editar" data-id="${esc(o.id)}">✏️ Editar</button>
        <button class="ghost" data-acao="duplicar" data-id="${esc(o.id)}">⧉ Duplicar</button>
        <button class="ghost" data-acao="apagar" data-id="${esc(o.id)}" style="color:var(--danger)">🗑️</button>
      </div></div>`;
  }

  async function acao(a, id) {
    const o = lista.find((x) => x.id === id); if (!o) return;
    if (a === 'ver') window.open(BASE_LINK + id, '_blank');
    else if (a === 'editar') abrirEditor(o);
    else if (a === 'enviar') modalEnviar(o);
    else if (a === 'duplicar') { const c = clone(o); delete c.id; delete c.padraoId; c.titulo = (o.titulo || '') + ' (cópia)'; await ctx.gravar(null, c); ctx.toast('Duplicada.'); carregar(); }
    else if (a === 'apagar') {
      if (!(await ctx.confirmar('Apagar esta oração?', 'Os links já enviados aos pacientes deixam de funcionar.', 'Apagar'))) return;
      await ctx.apagar(id); ctx.toast('Apagada.'); carregar();
    }
  }

  // ───────── enviar ─────────
  async function modalEnviar(o) {
    const fundo = document.createElement('div');
    fundo.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.5);z-index:10000;display:flex;align-items:flex-start;justify-content:center;padding:14px;overflow:auto;';
    fundo.innerHTML = `<div class="card" style="max-width:480px;width:100%;background:#fff;margin:auto;">
      <div class="row"><strong>📤 Enviar «${esc(o.titulo)}»</strong><button class="ghost" id="e-x">✖</button></div>
      <p class="muted" style="margin:8px 0;">Cada pessoa recebe <b>o seu próprio link</b>, que guarda o progresso dela. Escolhe o paciente ou escreve um nome.</p>
      <input id="e-busca" type="search" placeholder="🔍 Procurar paciente…" style="width:100%;margin-bottom:8px;">
      <div id="e-pac" style="max-height:30vh;overflow:auto;display:grid;gap:6px;margin-bottom:8px;"></div>
      <input id="e-nome" type="text" placeholder="…ou escreve o nome da pessoa" style="width:100%;margin-bottom:8px;">
      <div id="e-esc" class="muted" style="margin-bottom:8px;"></div>
      <div style="display:grid;gap:8px;">
        <button class="primary" id="e-wa">📱 WhatsApp</button>
        <button class="ghost" id="e-mail">✉️ E-mail</button>
        <button class="ghost" id="e-copiar">🔗 Copiar link</button>
        <button class="ghost" id="e-part">📤 Partilhar…</button>
      </div>
      <div id="e-link" style="background:#f3f6fa;border-radius:8px;padding:8px;margin-top:10px;word-break:break-all;font-size:.8rem;user-select:all;display:none;"></div></div>`;
    document.body.appendChild(fundo);
    const fecha = () => { fundo.remove(); carregar(); };
    fundo.querySelector('#e-x').onclick = fecha; fundo.onclick = (e) => { if (e.target === fundo) fecha(); };
    let pacs = []; let sel = null;
    try { pacs = await ctx.pacientes(); } catch (_) {}
    const norm = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    const nomeAtual = () => sel ? sel.fullName : fundo.querySelector('#e-nome').value.trim();
    const pinta = () => {
      const q = norm(fundo.querySelector('#e-busca').value);
      const f = pacs.filter((p) => !q || norm(p.fullName).includes(q) || norm(p.email).includes(q) || String(p.phone || '').replace(/\D/g, '').includes(q.replace(/\D/g, '') || '§')).slice(0, 40);
      const box = fundo.querySelector('#e-pac');
      box.innerHTML = f.map((p) => `<button class="ghost" data-p="${esc(p.id)}" style="text-align:left;">${esc(p.fullName)} <span class="muted" style="font-size:.8rem;">${esc(p.phone || p.email || '')}</span></button>`).join('') || '<span class="muted">Nenhum paciente encontrado.</span>';
      box.querySelectorAll('[data-p]').forEach((b) => { b.onclick = () => { sel = pacs.find((p) => p.id === b.dataset.p); fundo.querySelector('#e-nome').value = ''; fundo.querySelector('#e-esc').textContent = '✔ ' + sel.fullName; fundo.querySelector('#e-link').style.display = 'none'; }; });
    };
    fundo.querySelector('#e-busca').oninput = pinta; pinta();
    fundo.querySelector('#e-nome').oninput = () => { sel = null; fundo.querySelector('#e-esc').textContent = ''; fundo.querySelector('#e-link').style.display = 'none'; };
    // cria (ou reutiliza) o link único desta pessoa para esta oração
    async function obterLink() {
      const nome = nomeAtual(); if (!nome) { ctx.toast('Escolhe um paciente ou escreve um nome.', true); return null; }
      let e = envios.find((x) => x.oracaoId === o.id && ((sel && x.patientId === sel.id) || (!sel && !x.patientId && x.patientNome === nome)));
      if (!e) {
        const dados = { oracaoId: o.id, titulo: o.titulo || '', patientId: sel ? sel.id : '', patientNome: nome, telefone: sel ? sel.phone : '', email: sel ? sel.email : '' };
        try { const id = await ctx.criarEnvio(dados); e = Object.assign({ id, feitos: [], vezes: 0 }, dados); envios.push(e); }
        catch (err) { ctx.toast('Não consegui criar o link: ' + (err.message || err), true); return null; }
      }
      const link = BASE_ENVIO + e.id; const box = fundo.querySelector('#e-link'); box.textContent = link; box.style.display = 'block';
      return { link, e };
    }
    fundo.querySelector('#e-wa').onclick = async () => { const r = await obterLink(); if (!r) return; const d = String((sel && sel.phone) || '').replace(/\D/g, ''); const t = d.length === 9 ? '351' + d : d; window.open(`https://wa.me/${t}?text=${encodeURIComponent(mensagem(nomeAtual(), o.titulo, r.link))}`, '_blank'); };
    fundo.querySelector('#e-mail').onclick = async () => { const r = await obterLink(); if (!r) return; location.href = `mailto:${(sel && sel.email) || ''}?subject=${encodeURIComponent(o.titulo)}&body=${encodeURIComponent(mensagem(nomeAtual(), o.titulo, r.link))}`; };
    fundo.querySelector('#e-copiar').onclick = async () => { const r = await obterLink(); if (!r) return; try { await navigator.clipboard.writeText(r.link); ctx.toast('Link copiado.'); } catch (_) { ctx.toast('Não consegui copiar. Seleciona o link e copia à mão.', true); } };
    fundo.querySelector('#e-part').onclick = async () => { const r = await obterLink(); if (!r) return; const m = mensagem(nomeAtual(), o.titulo, r.link); try { if (navigator.share) await navigator.share({ title: o.titulo, text: m }); else { await navigator.clipboard.writeText(m); ctx.toast('Mensagem copiada.'); } } catch (_) {} };
  }

  // ───────── editor ─────────
  function abrirEditor(o) {
    ed = o ? clone(o) : Object.assign(clone(MODELO_VAZIO), { id: null });
    if (!Array.isArray(ed.seccoes)) ed.seccoes = [];
    if (!Array.isArray(ed.temasDias)) ed.temasDias = [];
    vistaEditor();
  }
  function lerForm() {
    const q = (s) => main.querySelector(s);
    if (!q('#d-titulo')) return;
    ed.titulo = q('#d-titulo').value.trim(); ed.subtitulo = q('#d-sub').value.trim(); ed.emoji = q('#d-emoji').value.trim() || '🙏'; ed.tipo = q('#d-tipo').value;
    const nd = ed.tipo === 'ciclo' ? Math.max(1, Math.min(60, parseInt(q('#d-dias').value, 10) || ed.dias || 21)) : 0;
    ed.dias = nd;
    ed.seccoes = Array.from(main.querySelectorAll('[data-sec]')).map((el) => {
      const tipo = el.querySelector('.s-tipo').value; const titulo = el.querySelector('.s-tit').value.trim(); const txt = el.querySelector('.s-txt').value;
      return tipo === 'passos' ? { tipo, titulo, itens: txt.split('\n').map((x) => x.trim()).filter(Boolean) } : { tipo, titulo, texto: txt };
    });
    if (nd) {
      const old = ed.temasDias; const novo = [];
      for (let i = 0; i < nd; i++) {
        const el = main.querySelector(`[data-dia="${i}"]`);
        novo.push(el ? { titulo: el.querySelector('.t-tit').value.trim(), intencao: el.querySelector('.t-int').value.trim(), acao: el.querySelector('.t-aca').value.trim() } : (old[i] || { titulo: '', intencao: '', acao: '' }));
      }
      ed.temasDias = novo;
    } else ed.temasDias = [];
  }
  function vistaEditor() {
    const sec = (s, i) => `<div data-sec="${i}" class="card" style="margin-bottom:10px;background:#fafafa;">
        <div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:8px;">
          <select class="s-tipo" style="flex:1;min-width:140px;">${Object.keys(TIPOS_SEC).map((k) => `<option value="${k}" ${k === s.tipo ? 'selected' : ''}>${TIPOS_SEC[k]}</option>`).join('')}</select>
          <button class="ghost" data-m="${i}:-1" ${i === 0 ? 'disabled' : ''}>⬆</button><button class="ghost" data-m="${i}:1" ${i === ed.seccoes.length - 1 ? 'disabled' : ''}>⬇</button><button class="ghost" data-x="${i}" style="color:var(--danger)">🗑️</button></div>
        <input class="s-tit" value="${esc(s.titulo || '')}" placeholder="Título da secção (ex.: Para que serve)" style="width:100%;margin-bottom:8px;">
        <textarea class="s-txt" rows="${s.tipo === 'oracao' ? 12 : 6}" placeholder="Escreve aqui…" style="width:100%;">${esc(s.tipo === 'passos' ? (s.itens || []).join('\n') : (s.texto || ''))}</textarea></div>`;
    const dias = ed.tipo === 'ciclo' ? Array.from({ length: ed.dias || 0 }, (_, i) => { const t = ed.temasDias[i] || {}; return `<details data-dia="${i}" style="border:1px solid #e5e7eb;border-radius:10px;padding:8px 10px;margin-bottom:6px;background:#fff;"><summary><b>Dia ${i + 1}</b> · ${esc(t.titulo || 'sem título')}</summary>
        <input class="t-tit" value="${esc(t.titulo || '')}" placeholder="Tema do dia" style="width:100%;margin:8px 0;">
        <textarea class="t-int" rows="2" placeholder="Intenção do dia" style="width:100%;margin-bottom:8px;">${esc(t.intencao || '')}</textarea>
        <textarea class="t-aca" rows="2" placeholder="Pequena ação para este dia" style="width:100%;">${esc(t.acao || '')}</textarea></details>`; }).join('') : '';
    main.innerHTML = `<div class="row" style="margin-bottom:10px;"><h2 style="margin:0;">${ed.id ? '✏️ Editar' : '➕ Nova'}</h2><button class="ghost" id="d-voltar">⬅ Voltar</button></div>
      <div class="card" style="margin-bottom:12px;">
        <div style="display:flex;gap:8px;margin-bottom:8px;"><input id="d-emoji" value="${esc(ed.emoji || '🙏')}" style="width:62px;text-align:center;font-size:1.3rem;"><input id="d-titulo" value="${esc(ed.titulo || '')}" placeholder="Título" style="flex:1;font-weight:700;"></div>
        <input id="d-sub" value="${esc(ed.subtitulo || '')}" placeholder="Subtítulo (opcional)" style="width:100%;margin-bottom:8px;">
        <select id="d-tipo" style="width:100%;margin-bottom:8px;">${Object.keys(TIPOS_DOC).map((k) => `<option value="${k}" ${k === ed.tipo ? 'selected' : ''}>${TIPOS_DOC[k]}</option>`).join('')}</select>
        <div id="d-diasbox" style="display:${ed.tipo === 'ciclo' ? 'block' : 'none'};"><label class="muted" style="font-size:.85rem;">Quantos dias tem o ciclo?</label><input id="d-dias" type="number" min="1" max="60" value="${ed.dias || 21}" style="width:100%;"></div>
      </div>
      <h3 style="margin:14px 0 8px;">Conteúdo</h3>
      ${ed.seccoes.map(sec).join('')}
      <button class="ghost" id="d-addsec" style="width:100%;margin-bottom:12px;">➕ Acrescentar secção</button>
      ${ed.tipo === 'ciclo' ? `<h3 style="margin:14px 0 4px;">Dia a dia</h3><p class="muted" style="margin:0 0 8px;font-size:.85rem;">O paciente vê, cada dia, o tema, a intenção e a pequena ação.</p>${dias}` : ''}
      <div class="row" style="gap:8px;margin-top:14px;"><button class="primary" id="d-guardar" style="flex:1;">💾 Guardar</button></div>`;
    const q = (s) => main.querySelector(s);
    q('#d-voltar').onclick = () => { carregar(); };
    q('#d-tipo').onchange = () => { lerForm(); if (ed.tipo === 'ciclo' && !ed.dias) ed.dias = 21; vistaEditor(); };
    const dd = q('#d-dias'); if (dd) dd.onchange = () => { lerForm(); vistaEditor(); };
    q('#d-addsec').onclick = () => { lerForm(); ed.seccoes.push({ tipo: 'texto', titulo: '', texto: '' }); vistaEditor(); };
    main.querySelectorAll('[data-m]').forEach((b) => { b.onclick = () => { lerForm(); const [i, d] = b.dataset.m.split(':').map(Number); const j = i + d; if (j < 0 || j >= ed.seccoes.length) return; [ed.seccoes[i], ed.seccoes[j]] = [ed.seccoes[j], ed.seccoes[i]]; vistaEditor(); }; });
    main.querySelectorAll('[data-x]').forEach((b) => { b.onclick = async () => { if (!(await ctx.confirmar('Apagar esta secção?', 'O texto desta secção perde-se.', 'Apagar'))) return; lerForm(); ed.seccoes.splice(+b.dataset.x, 1); vistaEditor(); }; });
    q('#d-guardar').onclick = async () => {
      lerForm();
      if (ed.titulo.length < 2) return ctx.toast('Escreve um título.', true);
      const { id, ...dados } = ed;
      try { await ctx.gravar(id, dados); ctx.toast('Guardado. ✅'); carregar(); }
      catch (e) { ctx.toast('Não consegui guardar: ' + (e.message || e), true); }
    };
  }

  carregar();
}
