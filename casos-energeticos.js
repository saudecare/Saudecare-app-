/* 🏠 Casos e Alvos — Triagem, Limpeza e Verificação para casas, terrenos, dinheiro,
   negócios e empresas, tribunal, motas, objetos, amor, saúde e pessoas, dentro da
   Radiestesia Cabalística. Exclusivo da Hikari Fafe. Textos escritos de raiz.
   Cada caso é uma ficha com várias sessões (completa ou só de verificação). */

export const TIPOS = {
  casa: { e: '🏠', n: 'Casa', ref: 'Morada ou nome da casa', aviso: '',
    esp: ['Geopatia (correntes de água, falhas, cruzamentos)', 'Campo eletromagnético (quadro elétrico, wi-fi, aparelhos)', 'Cargas de antigos moradores', 'Presenças ou entidades no local', 'Bloqueio na entrada de energia e prosperidade', 'Objeto ou trabalho colocado na casa'] },
  terreno: { e: '🌳', n: 'Terreno', ref: 'Localização ou artigo matricial', aviso: '',
    esp: ['Geopatia (correntes de água, falhas)', 'Memórias do terreno (acontecimentos, conflitos, perdas)', 'Presenças ou guardiões do lugar', 'Trabalho enterrado ou colocado', 'Bloqueio à venda, uso ou construção', 'Cargas familiares de heranças e partilhas'] },
  dinheiro: { e: '💰', n: 'Dinheiro', ref: 'Situação (ex.: dívida, poupança, rendimento)', aviso: 'Trabalho energético de apoio: não substitui o contabilista nem o aconselhamento financeiro.',
    esp: ['Bloqueio de abundância', 'Crenças e padrões de escassez', 'Dívidas energéticas ou herdadas', 'Inveja ou olho gordo sobre o dinheiro', 'Cordões a antigos sócios ou credores', 'Fugas de energia (perdas e gastos repetidos sem razão)'] },
  negocio: { e: '🏢', n: 'Negócios e Empresas', ref: 'Nome da empresa, negócio ou contrato', aviso: 'Trabalho energético de apoio: não substitui o contabilista, o advogado nem a gestão do negócio.',
    esp: ['Bloqueio de clientes e vendas', 'Negócio, contrato ou venda parados sem razão', 'Inveja ou trabalho feito pela concorrência', 'Cordões a sócios, fornecedores ou antigos donos', 'Padrões do dono (medo, culpa, autossabotagem)', 'Cargas no espaço físico da empresa', 'Dívidas e pressão sobre a empresa'] },
  tribunal: { e: '⚖️', n: 'Tribunal e Processos', ref: 'N.º do processo ou descrição', aviso: 'Trabalho energético de apoio: não substitui o advogado. Pede-se sempre o mais justo, sem interferir na vontade de terceiros.',
    esp: ['Bloqueio do processo (atrasos sem razão)', 'Cordões com a outra parte', 'Magia ou inimizade contra o caso', 'Medo e ansiedade de quem vai a tribunal', 'Cargas emocionais do conflito (raiva, culpa, sensação de injustiça)', 'Confusão ou falta de clareza nos documentos'] },
  mota: { e: '🏍️', n: 'Mota ou Veículo', ref: 'Matrícula ou descrição', aviso: '',
    esp: ['Cargas de donos anteriores', 'Objeto ou trabalho colocado no veículo', 'Energia de acidentes ou perdas', 'Proteção do condutor fragilizada', 'Cordões ao antigo dono'] },
  objeto: { e: '🔮', n: 'Objeto', ref: 'Descrição do objeto', aviso: '',
    esp: ['Cargas de donos anteriores', 'Objeto trabalhado ou carregado', 'Negatividade absorvida', 'Ligação a uma pessoa ou a um lugar', 'Origem desconhecida'] },
  amor: { e: '💞', n: 'Amor e Relações', ref: 'Relação (ex.: nomes ou situação)', aviso: 'Pede-se sempre sem interferir na vontade da outra pessoa.',
    esp: ['Cordões a ex-parceiros ou a terceiros', 'Amarração ou trabalho de magia', 'Feridas emocionais e padrões repetidos', 'Bloqueio da abertura do coração', 'Cargas no quarto ou na casa', 'Ciúme, mágoa ou rancor retidos'] },
  saude: { e: '🌿', n: 'Saúde', ref: 'Pessoa ou situação', aviso: 'Apoio energético complementar: não substitui o acompanhamento médico.',
    esp: ['Campo eletromagnético ou geopatia no local onde dorme ou trabalha', 'Larva astral', 'Bloqueios por chakra', 'Causa emocional ligada à zona afetada', 'Obsessor ou entidade agarrada', 'Perda de vitalidade (cansaço profundo)'] },
  pessoa: { e: '👤', n: 'Pessoa', ref: 'Nome da pessoa', aviso: 'Para a triagem completa de uma pessoa (40 pontos e chakras) usa a Triagem — Pêndulo Hebraico.',
    esp: ['Larva astral', 'Campo eletromagnético ou geopatia', 'Obsessor ou entidade agarrada', 'Bloqueios por chakra', 'Padrões e crenças limitantes'] }
};

const COMUNS = ['Miasma (resíduo energético denso)', 'Olho gordo ou inveja', 'Magia consciente ou inconsciente', 'Cordões e ligações energéticas', 'Cargas e memórias antigas'];
const DIAS_VERIF = 7;
const MAX_ETQ_PRIMEIRA = 10;

const pad = n => String(n).padStart(2, '0');
const hoje = () => { const d = new Date(); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const somaDias = (iso, n) => { const [a, m, d] = iso.split('-').map(Number); const x = new Date(a, m - 1, d + n); return `${x.getFullYear()}-${pad(x.getMonth() + 1)}-${pad(x.getDate())}`; };
const dataPT = iso => { if (!iso) return '—'; const [a, m, d] = String(iso).split('-'); return d && m && a ? `${d}/${m}/${a}` : '—'; };
const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const causasDe = tipo => COMUNS.concat((TIPOS[tipo] || TIPOS.casa).esp);
const lista = x => Array.isArray(x) ? x : [];

export function renderCasos(main, ctx) {
  if (ctx.tenantId !== 'hikari-terapias') {
    main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica.</p></div>';
    return;
  }
  const esc = ctx.escapeHtml;
  const S = { view: 'lista', casos: null, pacs: null, fEstado: '*', fTipo: '*', caso: null, novo: null, wiz: null };

  /* ── Estado de um caso e de uma sessão ── */
  const aVerificar = c => c.estado !== 'fechado' && !!c.proxima && c.proxima <= hoje();
  const badge = c => {
    if (c.estado === 'fechado') return '<span style="color:#666;">🔒 Fechado</span>';
    if (aVerificar(c)) return `<span style="color:#b94a48;font-weight:700;">🔔 Verificar (${dataPT(c.proxima)})</span>`;
    if (c.estado === 'limpo') return `<span style="color:#2f7d32;">✅ Limpo${c.proxima ? ' · reconfirmar ' + dataPT(c.proxima) : ''}</span>`;
    return `<span style="color:#d9822b;">🕓 Em curso${c.proxima ? ' · verificar ' + dataPT(c.proxima) : ''}</span>`;
  };
  const chips = (arr, cor, fundo) => lista(arr).map(x => `<span style="display:inline-block;margin:2px 4px 2px 0;padding:3px 9px;border-radius:99px;font-size:.8rem;background:${fundo};color:${cor};">${esc(x)}</span>`).join('');
  const resolvidas = s => lista(s.causas).filter(x => lista(s.persistem).indexOf(x) < 0);
  const textoSessao = (caso, s) => {
    const t = TIPOS[caso.tipo] || TIPOS.casa;
    const L = [`${t.e} ${t.n}: ${caso.titulo}`, `Sessão ${s.modo === 'verificacao' ? 'de verificação' : 'completa'} de ${dataPT(s.data)}.`];
    if (s.bovisIni) L.push('Bovis ' + (s.modo === 'verificacao' ? 'medido' : 'inicial') + ': ' + s.bovisIni);
    if (s.bovisFin) L.push('Bovis final: ' + s.bovisFin);
    if (lista(s.causas).length) L.push((s.modo === 'verificacao' ? 'Verificadas' : 'Detetadas') + ': ' + s.causas.join('; '));
    if (lista(s.persistem).length) L.push('Ainda presentes: ' + s.persistem.join('; '));
    if (resolvidas(s).length) L.push('Resolvidas: ' + resolvidas(s).join('; '));
    if (lista(s.novas).length) L.push('Novas: ' + s.novas.join('; '));
    if (lista(s.etiquetas).length) L.push('Etiquetas (' + (s.via === 'fisica' ? 'físicas' : s.via === 'ambas' ? 'físicas e etéricas' : 'etéricas') + '): ' + s.etiquetas.map(x => x.codigo + ' ' + x.pt).join('; '));
    L.push('Resultado: ' + ({ limpo: 'limpo', parcial: 'parcial', por_limpar: 'por limpar' }[s.resultado] || '—') + (s.proxima ? ' · próxima verificação ' + dataPT(s.proxima) : ''));
    if (s.notas) L.push('Notas: ' + s.notas);
    return L.join('\n');
  };

  /* ── Dados ── */
  async function carregar() {
    if (S.casos) return;
    S.casos = await ctx.listar();
  }
  function ordenar() {
    S.casos.sort((a, b) => (aVerificar(b) - aVerificar(a)) || ((b._t || 0) - (a._t || 0)));
  }
  async function gravarCaso(caso) {
    const dados = { titulo: caso.titulo, tipo: caso.tipo, referencia: caso.referencia || '', objetivo: caso.objetivo || '', pacienteId: caso.pacienteId || '', pacienteNome: caso.pacienteNome || '', prep: caso.prep || {}, sessoes: lista(caso.sessoes), estado: caso.estado || 'em-curso', proxima: caso.proxima || '' };
    const id = await ctx.gravar(caso.id || null, dados);
    caso.id = id; caso._t = Date.now();
    if (!S.casos.some(c => c.id === id)) S.casos.unshift(caso);
    return id;
  }

  /* ── Ecrãs ── */
  const voltarLista = '<button class="ghost" data-a="lista" style="margin-bottom:8px;">← Casos e Alvos</button>';

  function verLista() {
    ordenar();
    const tipos = Object.entries(TIPOS);
    let vis = S.casos.filter(c => (S.fTipo === '*' || c.tipo === S.fTipo));
    if (S.fEstado === 'verificar') vis = vis.filter(aVerificar);
    else if (S.fEstado === 'curso') vis = vis.filter(c => c.estado !== 'fechado');
    else if (S.fEstado === 'fechado') vis = vis.filter(c => c.estado === 'fechado');
    const nVer = S.casos.filter(aVerificar).length;
    const ch = (k, t) => `<button data-a="fEstado" data-v="${k}" class="${S.fEstado === k ? 'primary' : 'ghost'}" style="white-space:nowrap;">${t}</button>`;
    main.innerHTML = `<h2 style="margin:0 0 4px;">🏠 Casos e Alvos</h2>
      <p class="muted" style="margin:0 0 10px;">Triagem, Limpeza e Verificação de casas, terrenos, dinheiro, negócios e empresas, tribunal, motas, objetos, amor, saúde e pessoas. Cada caso fica numa ficha, com as sessões e a evolução.</p>
      <button class="primary" data-a="novo" style="width:100%;padding:14px;margin-bottom:10px;">➕ Novo caso</button>
      <div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:8px;">${ch('*', 'Todos')}${ch('verificar', '🔔 A verificar' + (nVer ? ' (' + nVer + ')' : ''))}${ch('curso', 'Em curso')}${ch('fechado', 'Fechados')}</div>
      <select data-i="fTipo" style="margin-bottom:10px;"><option value="*">Todos os tipos</option>${tipos.map(([k, t]) => `<option value="${k}" ${S.fTipo === k ? 'selected' : ''}>${t.e} ${esc(t.n)}</option>`).join('')}</select>
      ${vis.length ? vis.map(c => { const t = TIPOS[c.tipo] || TIPOS.casa; const n = lista(c.sessoes).length;
        return `<div class="card" data-a="abrir" data-id="${esc(c.id)}" style="cursor:pointer;margin-bottom:8px;">
          <div style="display:flex;gap:10px;align-items:center;"><div style="font-size:1.8rem;">${t.e}</div><div style="flex:1;min-width:0;"><strong>${esc(c.titulo)}</strong>
          <div class="muted" style="font-size:.82rem;">${esc(t.n)}${c.pacienteNome ? ' · ' + esc(c.pacienteNome) : ''} · ${n} sessão(ões)</div>
          <div style="font-size:.88rem;margin-top:2px;">${badge(c)}</div></div></div></div>`; }).join('') : '<div class="card"><p class="muted">Ainda não há casos aqui. Toca em “Novo caso” para começar.</p></div>'}`;
  }

  function verNovo() {
    const N = S.novo, t = TIPOS[N.tipo];
    main.innerHTML = `${voltarLista}<h2 style="margin:0 0 8px;">➕ Novo caso</h2>
      <div class="card"><label>Tipo de caso</label>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:6px;">${Object.entries(TIPOS).map(([k, x]) => `<button data-a="tipo" data-v="${k}" class="${N.tipo === k ? 'primary' : 'ghost'}" style="text-align:left;padding:10px;">${x.e} ${esc(x.n)}</button>`).join('')}</div>
      ${t.aviso ? `<p class="muted" style="margin-top:8px;">ℹ️ ${esc(t.aviso)}</p>` : ''}</div>
      <div class="card"><label>Nome do caso</label><input data-i="n.titulo" value="${esc(N.titulo)}" placeholder="Ex.: ${esc(t.n)} — nome fácil de reconhecer">
      <label style="margin-top:10px;display:block;">Identificação</label><input data-i="n.referencia" value="${esc(N.referencia)}" placeholder="${esc(t.ref)}">
      <label style="margin-top:10px;display:block;">O que se pretende (o objetivo)</label><textarea data-i="n.objetivo" rows="3" placeholder="Ex.: desbloquear a venda, limpar e proteger, abrir caminhos…">${esc(N.objetivo)}</textarea>
      <label style="margin-top:10px;display:block;">Ligar a um paciente (opcional)</label>
      <select data-i="n.pacienteId"><option value="">— sem paciente —</option>${(S.pacs || []).map(p => `<option value="${esc(p.id)}" ${N.pacienteId === p.id ? 'selected' : ''}>${esc(p.fullName)}</option>`).join('')}</select>
      <p class="muted" style="margin-top:4px;font-size:.82rem;">Se ligares a um paciente, cada sessão fica também no histórico da ficha dele.</p></div>
      <button class="primary" data-a="criar" style="width:100%;padding:14px;">Criar caso</button>`;
  }

  function verCaso() {
    const c = S.caso, t = TIPOS[c.tipo] || TIPOS.casa, ss = lista(c.sessoes);
    const prep = c.prep || {};
    const P = (k, txt) => `<div data-a="prep" data-v="${k}" style="display:flex;gap:10px;align-items:center;padding:8px;margin-top:4px;border-radius:10px;cursor:pointer;background:${prep[k] ? '#eef7ee' : '#f7f7f5'};"><span style="font-size:1.3rem;">${prep[k] ? '☑' : '⬜'}</span><span style="flex:1;font-size:.9rem;">${txt}</span></div>`;
    const bovis = ss.filter(s => s.bovisIni || s.bovisFin).map(s => `${dataPT(s.data)}: ${s.bovisIni || '—'}${s.bovisFin ? ' → ' + s.bovisFin : ''}`);
    main.innerHTML = `${voltarLista}
      <div class="card"><div style="display:flex;gap:10px;align-items:center;"><div style="font-size:2rem;">${t.e}</div><div style="flex:1;"><h2 style="margin:0;">${esc(c.titulo)}</h2><div class="muted" style="font-size:.85rem;">${esc(t.n)}${c.referencia ? ' · ' + esc(c.referencia) : ''}</div></div></div>
        ${c.objetivo ? `<p style="margin:8px 0 0;"><strong>🎯 Objetivo:</strong> ${esc(c.objetivo)}</p>` : ''}
        ${c.pacienteNome ? `<p class="muted" style="margin:4px 0 0;">👤 ${esc(c.pacienteNome)}</p>` : ''}
        <p style="margin:8px 0 0;">${badge(c)}</p>
        ${t.aviso ? `<p class="muted" style="margin:8px 0 0;">ℹ️ ${esc(t.aviso)}</p>` : ''}</div>
      <div class="card"><h3 style="margin:0 0 4px;">🧭 1. Preparação</h3>
        ${P('permissao', 'Perguntei ao pêndulo se posso trabalhar neste caso')}${P('objetivo', 'O objetivo está definido e a identificação do alvo está à mão')}${P('elevado', 'Pedi o que for mais elevado e justo, sem interferir na vontade de terceiros')}</div>
      ${c.estado === 'fechado' ? `<button class="ghost" data-a="reabrir" style="width:100%;margin-bottom:8px;">↩️ Reabrir caso</button>` : `
      <button class="primary" data-a="sessao" data-v="completa" style="width:100%;padding:14px;">➕ Nova sessão<br><small>Triagem → Limpeza → Verificação</small></button>
      ${ss.length ? `<button class="ghost" data-a="sessao" data-v="verificacao" style="width:100%;margin-top:8px;padding:12px;">🔎 Só verificação<br><small>Repetir a pesquisa e medir o Bovis</small></button>` : ''}`}
      ${bovis.length > 1 ? `<div class="card" style="margin-top:10px;"><h3 style="margin:0 0 4px;">📈 Bovis ao longo do tempo</h3>${bovis.map(x => `<div class="muted">${esc(x)}</div>`).join('')}</div>` : ''}
      <h3 style="margin:14px 0 6px;">🗂️ Sessões (${ss.length})</h3>
      ${ss.length ? ss.slice().reverse().map(s => `<div class="card" style="margin-bottom:8px;">
        <div style="display:flex;justify-content:space-between;gap:8px;"><strong>${s.modo === 'verificacao' ? '🔎 Verificação' : '✨ Sessão completa'} · ${dataPT(s.data)}</strong><span>${s.resultado === 'limpo' ? '✅' : s.resultado === 'parcial' ? '🟡' : '🔴'}</span></div>
        ${s.bovisIni || s.bovisFin ? `<div class="muted">Bovis ${esc(s.bovisIni || '—')}${s.bovisFin ? ' → ' + esc(s.bovisFin) : ''}</div>` : ''}
        ${lista(s.persistem).length ? `<div style="margin-top:4px;"><span class="muted">Ainda presentes:</span><br>${chips(s.persistem, '#8a2b27', '#fbe9e8')}</div>` : ''}
        ${resolvidas(s).length ? `<div style="margin-top:4px;"><span class="muted">Resolvidas:</span><br>${chips(resolvidas(s), '#256428', '#e6f4e7')}</div>` : ''}
        ${lista(s.novas).length ? `<div style="margin-top:4px;"><span class="muted">Novas:</span><br>${chips(s.novas, '#8a5a12', '#fdf1de')}</div>` : ''}
        ${lista(s.etiquetas).length ? `<div class="muted" style="margin-top:4px;">🏷️ ${s.etiquetas.map(x => esc(x.codigo)).join(' · ')} (${s.via === 'fisica' ? 'físicas' : s.via === 'ambas' ? 'físicas e etéricas' : 'etéricas'})</div>` : ''}
        ${s.notas ? `<div style="margin-top:4px;font-size:.9rem;">📝 ${esc(s.notas)}</div>` : ''}
        ${s.proxima ? `<div class="muted" style="margin-top:4px;">Próxima verificação: ${dataPT(s.proxima)}</div>` : ''}</div>`).join('') : '<div class="card"><p class="muted">Ainda não há sessões. Faz a preparação e toca em “Nova sessão”.</p></div>'}
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px;">${c.estado !== 'fechado' ? '<button class="ghost" data-a="fechar">🔒 Fechar caso</button>' : ''}<button class="ghost" data-a="apagar" style="color:#b94a48;">🗑️ Apagar caso</button></div>`;
  }

  /* ── Sessão ── */
  function novaWiz(modo) {
    const c = S.caso, ss = lista(c.sessoes), ult = ss[ss.length - 1];
    const W = { modo, passo: 1, data: hoje(), bovisIni: '', bovisFin: '', causas: [], outras: '', etiquetas: [], via: 'eterica', q: '', persistem: [], novasTxt: '', resultado: '', manual: false, notas: '', proxima: somaDias(hoje(), DIAS_VERIF) };
    if (modo === 'verificacao' && ult) W.base = lista(ult.persistem).length ? ult.persistem.slice() : lista(ult.causas).slice();
    return W;
  }
  const primeiraSessao = () => !lista(S.caso.sessoes).some(s => s.modo === 'completa');
  const causasWiz = () => { const W = S.wiz; return W.causas.concat(W.outras.split(',').map(x => x.trim()).filter(Boolean)); };
  const resultadoAuto = () => { const W = S.wiz; return W.persistem.length ? 'parcial' : 'limpo'; };

  function listaEtqHTML() {
    const W = S.wiz, q = norm(W.q);
    const vis = ctx.etiquetas.filter(x => !q || norm(x.codigo).replace(/\s+/g, '').indexOf(q.replace(/\s+/g, '')) >= 0 || norm(x.pt).indexOf(q) >= 0).slice(0, 60);
    return vis.map(x => { const on = W.etiquetas.indexOf(x.codigo) >= 0;
      return `<div data-a="etq" data-v="${esc(x.codigo)}" style="display:flex;gap:10px;align-items:center;padding:8px;margin-top:4px;border-radius:10px;cursor:pointer;background:${on ? '#eef7ee' : '#f7f7f5'};"><span style="font-size:1.2rem;">${on ? '☑' : '⬜'}</span><strong style="min-width:62px;">${esc(x.codigo)}</strong><span style="flex:1;font-size:.88rem;">${esc(x.pt)}</span></div>`; }).join('') || '<p class="muted">Nenhuma etiqueta encontrada.</p>';
  }

  function verSessao() {
    const W = S.wiz, c = S.caso, t = TIPOS[c.tipo] || TIPOS.casa;
    const total = W.modo === 'verificacao' ? 1 : 3;
    const barra = `<div class="row" style="gap:4px;margin-bottom:12px;">${Array.from({ length: total }).map((_, i) => `<div style="flex:1;height:5px;border-radius:3px;background:${i < W.passo ? 'var(--primary)' : '#e5e5e5'};"></div>`).join('')}</div>`;
    const cab = `<button class="ghost" data-a="sair" style="margin-bottom:8px;">← ${esc(c.titulo)}</button>${barra}`;
    const data = `<label>Data</label><input type="date" data-i="w.data" value="${esc(W.data)}" max="${hoje()}">`;
    const toggles = (arr, marcados, acao) => arr.map((nome, i) => { const on = marcados.indexOf(nome) >= 0;
      return `<div data-a="${acao}" data-v="${esc(nome)}" style="display:flex;gap:10px;align-items:center;padding:9px;margin-top:4px;border-radius:10px;cursor:pointer;background:${on ? (acao === 'persiste' ? '#fbe9e8' : '#eef7ee') : '#f7f7f5'};"><span style="font-size:1.2rem;">${on ? '☑' : '⬜'}</span><span style="min-width:24px;font-weight:700;color:#777;">${i + 1}</span><span style="flex:1;font-size:.92rem;">${esc(nome)}</span></div>`; }).join('');

    if (W.modo === 'verificacao') {
      const base = W.base || [];
      main.innerHTML = `${cab}<h2 style="margin:0 0 8px;">🔎 Só verificação</h2>
        <div class="card">${data}<label style="margin-top:10px;display:block;">Bovis medido hoje</label><input data-i="w.bovisFin" value="${esc(W.bovisFin)}" inputmode="decimal" placeholder="Ex.: 8500"></div>
        <div class="card"><h3 style="margin:0 0 4px;">Repete a pesquisa</h3><p class="muted" style="margin:0 0 6px;">Mentaliza cada número. Marca o que o pêndulo ainda deteta.</p>${toggles(base, W.persistem, 'persiste') || '<p class="muted">Sem pontos da sessão anterior.</p>'}
        <label style="margin-top:10px;display:block;">Algo novo que tenha aparecido? (separa por vírgulas)</label><input data-i="w.novasTxt" value="${esc(W.novasTxt)}"></div>
        ${fimHTML()}`;
      return;
    }
    if (W.passo === 1) {
      const todas = causasDe(c.tipo);
      main.innerHTML = `${cab}<h2 style="margin:0 0 8px;">🔍 1. Triagem</h2>
        <div class="card">${data}<label style="margin-top:10px;display:block;">Bovis inicial</label><input data-i="w.bovisIni" value="${esc(W.bovisIni)}" inputmode="decimal" placeholder="Ex.: 6500"></div>
        <div class="card"><h3 style="margin:0 0 4px;">Pesquisa numerada · ${t.e} ${esc(t.n)}</h3><p class="muted" style="margin:0 0 6px;">Mentaliza cada número e marca o que o pêndulo deteta.</p>${toggles(todas, W.causas, 'causa')}
        <label style="margin-top:10px;display:block;">Outras causas detetadas (separa por vírgulas)</label><input data-i="w.outras" value="${esc(W.outras)}"></div>
        <button class="primary" data-a="seguinte" style="width:100%;padding:14px;">Seguinte → Limpeza</button>`;
    } else if (W.passo === 2) {
      const sel = W.etiquetas.map(cod => ctx.etiquetas.find(x => x.codigo === cod)).filter(Boolean);
      const excesso = primeiraSessao() && W.etiquetas.length > MAX_ETQ_PRIMEIRA;
      main.innerHTML = `${cab}<h2 style="margin:0 0 8px;">🧹 2. Limpeza</h2>
        <div class="card"><p class="muted" style="margin:0;">Usa só as etiquetas dos 72 Nomes e as restantes que o pêndulo indicar para o que foi detetado.${primeiraSessao() ? ` Na 1.ª sessão, no máximo ${MAX_ETQ_PRIMEIRA}.` : ''}</p>
        <div style="margin:8px 0;"><strong>${W.etiquetas.length} escolhida(s)</strong>${excesso ? `<div style="color:#b94a48;font-size:.88rem;margin-top:4px;">⚠️ Muitas etiquetas numa só sessão desgastam o campo. Reduz para ${MAX_ETQ_PRIMEIRA} ou menos.</div>` : ''}
        <div style="margin-top:4px;">${sel.map(x => `<span data-a="etq" data-v="${esc(x.codigo)}" style="display:inline-block;margin:2px 4px 2px 0;padding:4px 10px;border-radius:99px;background:#5b2a86;color:#fff;font-size:.82rem;cursor:pointer;">${esc(x.codigo)} ✕</span>`).join('')}</div></div>
        <input data-i="w.q" value="${esc(W.q)}" placeholder="Número (24, A7) ou palavra (inveja, perdoar)…" style="width:100%;margin:6px 0;">
        <div id="casos-etq" style="max-height:44vh;overflow:auto;">${listaEtqHTML()}</div></div>
        <div class="card"><label>Como aplicaste?</label>
        <select data-i="w.via"><option value="eterica" ${W.via === 'eterica' ? 'selected' : ''}>Por via etérica (com o pêndulo)</option><option value="fisica" ${W.via === 'fisica' ? 'selected' : ''}>Etiquetas físicas</option><option value="ambas" ${W.via === 'ambas' ? 'selected' : ''}>Físicas e etéricas</option></select></div>
        <div class="row" style="gap:8px;"><button class="ghost" data-a="anterior">← Voltar</button><button class="primary" data-a="seguinte" style="flex:1;">Seguinte → Verificação</button></div>`;
    } else {
      const det = causasWiz();
      main.innerHTML = `${cab}<h2 style="margin:0 0 8px;">✅ 3. Verificação</h2>
        <div class="card"><label>Bovis final (depois de aplicar todas as etiquetas)</label><input data-i="w.bovisFin" value="${esc(W.bovisFin)}" inputmode="decimal"></div>
        <div class="card"><h3 style="margin:0 0 4px;">Repete a pesquisa</h3><p class="muted" style="margin:0 0 6px;">Marca só o que o pêndulo ainda deteta.</p>${det.length ? toggles(det, W.persistem, 'persiste') : '<p class="muted">Não foi detetado nada na triagem.</p>'}</div>
        ${fimHTML()}`;
    }
  }

  function fimHTML() {
    const W = S.wiz;
    const res = W.manual ? W.resultado : resultadoAuto();
    const R = (k, t) => `<button data-a="res" data-v="${k}" class="${res === k ? 'primary' : 'ghost'}" style="flex:1;padding:10px;">${t}</button>`;
    return `<div class="card"><label>Resultado</label><div class="row" style="gap:6px;margin-top:6px;">${R('limpo', '✅ Limpo')}${R('parcial', '🟡 Parcial')}${R('por_limpar', '🔴 Por limpar')}</div>
      <label style="margin-top:10px;display:block;">Próxima verificação (recomendado ${DIAS_VERIF} dias ou mais)</label><input type="date" data-i="w.proxima" value="${esc(W.proxima)}">
      <label style="margin-top:10px;display:block;">Notas</label><textarea data-i="w.notas" rows="3">${esc(W.notas)}</textarea></div>
      <div class="row" style="gap:8px;">${W.modo === 'completa' ? '<button class="ghost" data-a="anterior">← Voltar</button>' : ''}<button class="primary" data-a="guardar" style="flex:1;padding:14px;">💾 Guardar sessão</button></div>`;
  }

  async function guardarSessao() {
    const W = S.wiz, c = S.caso;
    const verif = W.modo === 'verificacao';
    const novas = verif ? W.novasTxt.split(',').map(x => x.trim()).filter(Boolean) : [];
    const resultado = W.manual ? W.resultado : resultadoAuto();
    const s = {
      id: 's' + Date.now(), modo: W.modo, data: W.data || hoje(),
      bovisIni: verif ? String(W.bovisFin || '').trim() : String(W.bovisIni || '').trim(),
      bovisFin: verif ? '' : String(W.bovisFin || '').trim(),
      causas: verif ? lista(W.base) : causasWiz(), persistem: W.persistem.slice(), novas,
      etiquetas: verif ? [] : W.etiquetas.map(cod => ctx.etiquetas.find(x => x.codigo === cod)).filter(Boolean).map(x => ({ codigo: x.codigo, pt: x.pt })),
      via: verif ? '' : W.via, resultado, proxima: W.proxima || '', notas: String(W.notas || '').trim()
    };
    c.sessoes = lista(c.sessoes).concat([s]);
    c.estado = resultado === 'limpo' ? 'limpo' : 'em-curso';
    c.proxima = s.proxima;
    try {
      await gravarCaso(c);
    } catch (e) {
      c.sessoes = c.sessoes.slice(0, -1);
      console.error(e); ctx.toast('⚠️ Não consegui guardar. Tenta outra vez.', true); return;
    }
    if (c.pacienteId) {
      const t = TIPOS[c.tipo] || TIPOS.casa;
      const ok = await ctx.guardarNaFicha(c.pacienteId, { tipo: 'caso-energetico', titulo: `${t.n}: ${c.titulo}`, texto: textoSessao(c, s), dados: { casoId: c.id, tipoCaso: c.tipo, sessao: s } });
      ctx.toast(ok ? 'Sessão guardada ✓ (também na ficha do paciente)' : 'Sessão guardada ✓ (mas não consegui pôr na ficha do paciente)', !ok);
    } else ctx.toast('Sessão guardada ✓');
    S.wiz = null; S.view = 'caso'; ver();
  }

  /* ── Navegação e eventos ── */
  function ver() {
    if (S.view === 'lista') verLista();
    else if (S.view === 'novo') verNovo();
    else if (S.view === 'caso') verCaso();
    else verSessao();
    window.scrollTo(0, 0);
  }
  function repintarSessao() {
    const el = main.querySelector('#casos-etq'), y = el ? el.scrollTop : 0, sy = window.scrollY;
    verSessao();
    const n = main.querySelector('#casos-etq'); if (n) n.scrollTop = y;
    window.scrollTo(0, sy);
  }
  const alternar = (arr, v) => { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); };

  const acoes = {
    lista: () => { S.view = 'lista'; S.caso = null; ver(); },
    fEstado: b => { S.fEstado = b.dataset.v; verLista(); },
    novo: async () => { if (!S.pacs) { try { S.pacs = await ctx.pacientes(); } catch (e) { S.pacs = []; } } S.novo = { tipo: 'casa', titulo: '', referencia: '', objetivo: '', pacienteId: '' }; S.view = 'novo'; ver(); },
    tipo: b => { S.novo.tipo = b.dataset.v; verNovo(); },
    criar: async () => {
      const N = S.novo;
      if (!N.titulo.trim()) { ctx.toast('Dá um nome ao caso.', true); return; }
      const pac = (S.pacs || []).find(p => p.id === N.pacienteId);
      const caso = { titulo: N.titulo.trim(), tipo: N.tipo, referencia: N.referencia.trim(), objetivo: N.objetivo.trim(), pacienteId: pac ? pac.id : '', pacienteNome: pac ? pac.fullName : '', prep: {}, sessoes: [], estado: 'em-curso', proxima: '' };
      try { await gravarCaso(caso); } catch (e) { console.error(e); ctx.toast('⚠️ Não consegui criar o caso.', true); return; }
      S.caso = caso; S.view = 'caso'; ctx.toast('Caso criado ✓'); ver();
    },
    abrir: b => { S.caso = S.casos.find(c => c.id === b.dataset.id); if (!S.caso) return; S.view = 'caso'; ver(); },
    prep: async b => { const c = S.caso; c.prep = c.prep || {}; c.prep[b.dataset.v] = !c.prep[b.dataset.v]; verCaso(); try { await gravarCaso(c); } catch (e) { ctx.toast('⚠️ Não consegui guardar.', true); } },
    sessao: b => { S.wiz = novaWiz(b.dataset.v); S.view = 'sessao'; ver(); },
    sair: async () => { if (await ctx.confirmar('Sair da sessão?', 'O que preencheste nesta sessão ainda não foi guardado.', 'Sair')) { S.wiz = null; S.view = 'caso'; ver(); } },
    causa: b => { alternar(S.wiz.causas, b.dataset.v); repintarSessao(); },
    persiste: b => { alternar(S.wiz.persistem, b.dataset.v); repintarSessao(); },
    etq: b => { alternar(S.wiz.etiquetas, b.dataset.v); repintarSessao(); },
    res: b => { S.wiz.resultado = b.dataset.v; S.wiz.manual = true; repintarSessao(); },
    seguinte: () => { S.wiz.passo++; ver(); },
    anterior: () => { S.wiz.passo--; ver(); },
    guardar: () => guardarSessao(),
    fechar: async () => { const c = S.caso; if (!(await ctx.confirmar('Fechar o caso?', 'Deixa de aparecer nas verificações. Podes reabri-lo quando quiseres.', 'Fechar'))) return; c.estado = 'fechado'; c.proxima = ''; try { await gravarCaso(c); } catch (e) { ctx.toast('⚠️ Não consegui guardar.', true); return; } verCaso(); },
    reabrir: async () => { const c = S.caso; c.estado = 'em-curso'; try { await gravarCaso(c); } catch (e) { ctx.toast('⚠️ Não consegui guardar.', true); return; } verCaso(); },
    apagar: async () => {
      const c = S.caso;
      if (!(await ctx.confirmar('Apagar o caso?', `“${c.titulo}” e todas as sessões deixam de existir. Se estava ligado a um paciente, os registos já postos na ficha dele mantêm-se.`, 'Apagar'))) return;
      try { await ctx.apagar(c.id); } catch (e) { console.error(e); ctx.toast('⚠️ Não consegui apagar.', true); return; }
      S.casos = S.casos.filter(x => x.id !== c.id); S.caso = null; S.view = 'lista'; ctx.toast('Caso apagado'); ver();
    }
  };

  main.onclick = e => {
    const b = e.target.closest('[data-a]');
    if (!b || !main.contains(b)) return;
    const f = acoes[b.dataset.a];
    if (f) { Promise.resolve(f(b)).catch(err => { console.error(err); ctx.toast('⚠️ ' + (err && err.message ? err.message : 'Erro inesperado'), true); }); }
  };
  main.oninput = e => {
    const t = e.target, k = t.dataset && t.dataset.i;
    if (!k) return;
    if (k === 'fTipo') { S.fTipo = t.value; verLista(); return; }
    const [obj, campo] = k.split('.');
    if (obj === 'n') S.novo[campo] = t.value;
    else if (obj === 'w') {
      S.wiz[campo] = t.value;
      if (campo === 'q') { const el = main.querySelector('#casos-etq'); if (el) el.innerHTML = listaEtqHTML(); }
    }
  };

  main.innerHTML = '<p class="muted">A carregar…</p>';
  carregar().then(() => ver()).catch(e => {
    console.error(e);
    main.innerHTML = '<div class="card"><h2>🏠 Casos e Alvos</h2><p class="muted">Não consegui abrir: ' + esc(e && e.message ? e.message : String(e)) + '</p></div>';
  });
}
