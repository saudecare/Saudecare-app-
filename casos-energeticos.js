/* 🏠 Casos e Alvos — Triagem, Limpeza e Verificação para casas, terrenos, dinheiro,
   negócios e empresas, tribunal, motas, objetos, amor, saúde e pessoas, dentro da
   Radiestesia Cabalística. Exclusivo da Hikari Fafe. Textos escritos de raiz.
   Cada caso é uma ficha com várias sessões (completa ou só de verificação). */

import { analisar, EXEMPLOS, causasParaNumeros } from './casos-motor.js';

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
const MAX_ETQ_PRIMEIRA = 13; // protocolo base (10) + até 3 do pedido

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
  const S = { view: 'lista', casos: null, pacs: null, fEstado: '*', fTipo: '*', caso: null, novo: null, wiz: null, ass: null };

  /* ── Estado de um caso e de uma sessão ── */
  const aVerificar = c => c.estado !== 'fechado' && !!c.proxima && c.proxima <= hoje();
  const badge = c => {
    if (c.estado === 'fechado') return '<span style="color:#666;">🔒 Fechado</span>';
    if (aVerificar(c)) return `<span style="color:#b94a48;font-weight:700;">🔔 Verificar (${dataPT(c.proxima)})</span>`;
    if (c.estado === 'limpo') return `<span style="color:#2f7d32;">✅ Limpo${c.proxima ? ' · reconfirmar ' + dataPT(c.proxima) : ''}</span>`;
    if (lista(c.sessoes).some(x => x.limpeza === 'pendente')) return '<span style="color:#8a5a12;font-weight:700;">🧹 Limpeza por aplicar</span>';
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
    if (lista(s.etiquetas).length) L.push('Etiquetas (' + (s.via === 'fisica' ? 'físicas' : s.via === 'ambas' ? 'físicas e etéricas' : 'etéricas') + (s.aplicacao ? ', ' + (s.aplicacao === 'todas' ? 'todas ao mesmo tempo' : 'uma a uma') : '') + '): ' + s.etiquetas.map(x => x.codigo + ' ' + x.pt).join('; '));
    { const lc = leituraObj(s.leitura); if (lc && ctx.sintetizarLeitura) L.push('Leitura complementar: ' + ctx.sintetizarLeitura(nomeLeitura(caso), lc, true)); }
    if (s.limpeza === 'pendente') L.push('Pesquisa concluída. Limpeza por aplicar mais tarde (protocolo gerado automaticamente).');
        L.push('Resultado: ' + ({ limpo: 'limpo', parcial: 'parcial', por_limpar: 'por limpar' }[s.resultado] || '—') + (s.proxima ? ' · próxima verificação ' + dataPT(s.proxima) : ''));
    if (s.notas) L.push('Notas: ' + s.notas);
    return L.join('\n');
  };

  /* ── Leitura complementar (3 cartas: momento, o que está por trás, tendência) ── */
  const arc = n => lista(ctx.arcanos).find(x => x.n === n);
  const leituraObj = l => { if (!l) return null; const m = arc(l.m), p = arc(l.p), t = arc(l.t); return m && p && t ? { momento: m, porTras: p, tendencia: t } : null; };
  const leituraCompacta = lc => lc ? { m: lc.momento.n, p: lc.porTras.n, t: lc.tendencia.n } : null;
  const nomeLeitura = c => String(c.pacienteNome || '').split(/\s+/)[0] || c.titulo;
  const ultimaLeitura = c => { const ss = lista(c.sessoes).filter(x => x.leitura); return ss.length ? leituraObj(ss[ss.length - 1].leitura) : null; };
  const sortear = () => { const [m, p, t] = ctx.tirarCartas(); return { momento: m, porTras: p, tendencia: t }; };


  const testemunhoCaso = c => ({ nome: c.referencia || c.titulo, sub: (TIPOS[c.tipo] || TIPOS.casa).n, foto: '' });
  const pendente = c => lista(c.sessoes).find(x => x.limpeza === 'pendente');
  /* ── Protocolo de cura da sessão (igual ao do Pêndulo: fases, hebraico, nome em português, porquê) ── */
  function protocoloCura(codigos, auto) {
    const info = {}; lista(auto).forEach(x => { info[x.codigo] = x; });
    const fases = [];
    lista(codigos).forEach(cod => {
      const e = ctx.etiquetas.find(x => x.codigo === cod); if (!e) return;
      const a = info[cod] || {}, nome = a.fase || 'Acrescentadas à mão';
      let f = fases.find(y => y.fase === nome);
      if (!f) { f = { fase: nome, porque: a.porque || '', itens: [] }; fases.push(f); }
      f.itens.push({ codigo: e.codigo, pt: e.pt, heb: a.heb || e.heb || '', nota: a.nota || '' });
    });
    return fases;
  }
  const protocoloCuraHtml = (fases, aberto) => lista(fases).length ? `<details class="card" ${aberto ? 'open' : ''} style="border:2px solid var(--primary);"><summary style="cursor:pointer;font-weight:700;">📋 Protocolo de cura desta sessão</summary>
    <p class="muted" style="margin:6px 0;">Por ordem de uso. Cada fase diz porquê, com a etiqueta em hebraico e o nome em português.</p>
    ${fases.map(f => `<div style="margin-top:10px;padding:10px;border-radius:10px;background:#eef7ee;"><strong>${esc(f.fase)}</strong>${f.porque ? `<div class="muted" style="font-size:.82rem;">${esc(f.porque)}</div>` : ''}
      ${f.itens.map(i => `<div style="margin-top:6px;">${i.heb ? `<span style="font-size:1.15rem;" dir="rtl">${esc(i.heb)}</span> — ` : ''}<strong>${esc(i.codigo)}</strong> ${esc(i.pt)}${i.nota ? `<div class="muted" style="font-size:.8rem;">${esc(i.nota)}</div>` : ''}</div>`).join('')}</div>`).join('')}</details>` : '';

  /* ── Relatório ilustrado para o paciente (para link do portal / PDF), como no Pêndulo ── */
  function relatorioSessao(c, s) {
    if (!ctx.relatorio) return '';
    const t = TIPOS[c.tipo] || TIPOS.casa, nome = String(c.pacienteNome || '').split(/\s+/)[0];
    const verif = s.modo === 'verificacao', blocos = [];
    blocos.push({ tipo: 'texto', icone: '👋', titulo: nome ? `Olá, ${nome}` : 'Olá', paras: [verif ? `Fiz a verificação do trabalho sobre “${c.objetivo || c.titulo}”, para ver como está tudo.` : `Aqui está o resumo do trabalho energético sobre “${c.objetivo || c.titulo}”.`] });
    const det = lista(s.causas);
    if (det.length) blocos.push({ tipo: 'lista', icone: '🔎', titulo: verif ? 'O que foi verificado' : 'O que foi encontrado', marca: '•', itens: det });
    const cura = lista(s.protocoloCura);
    if (cura.length) blocos.push({ tipo: 'linha', icone: '🧹', titulo: s.limpeza === 'pendente' ? 'Limpeza prevista' : 'O que foi limpo', passos: cura.map(f => ({ rotulo: f.fase.replace(/^\d+\.\s*/, ''), texto: f.itens.map(i => i.pt).join(' · ') })) });
    else if (lista(s.etiquetas).length) blocos.push({ tipo: 'lista', icone: '🏷️', titulo: 'Etiquetas trabalhadas', marca: '•', itens: s.etiquetas.map(x => x.pt) });
    const lc = leituraObj(s.leitura);
    if (lc && ctx.sintetizarLeitura) blocos.push({ tipo: 'texto', icone: '🌙', titulo: 'Leitura do momento', paras: [ctx.sintetizarLeitura(nome || c.titulo, lc, false)] });
    const res = { limpo: 'Neste momento o pêndulo não deteta nada por limpar. 🌿', parcial: 'Ficou limpo grande parte do que foi encontrado; há ainda pontos a acompanhar.', por_limpar: 'Ainda há pontos por limpar; vamos continuar nas próximas sessões.' }[s.resultado] || '';
    const seg = [res];
    if (lista(s.persistem).length) seg.push('Ainda a acompanhar: ' + s.persistem.join('; ') + '.');
    if (s.proxima) seg.push('Próxima verificação: ' + dataPT(s.proxima) + '.');
    blocos.push({ tipo: 'resumo', icone: '✅', titulo: 'Nos dias seguintes', paras: seg.filter(Boolean) });
    const d = c.protocolo ? dicasPaciente(c.protocolo) : [];
    if (d.length) blocos.push({ tipo: 'lista', icone: '🌿', titulo: 'Em casa, sugere-se', marca: '•', itens: d });
    if (c.protocolo && lista(c.protocolo.medico).length) blocos.push({ tipo: 'lista', icone: '⚕️', titulo: 'Cuidados com a saúde', marca: '•', itens: c.protocolo.medico });
    return ctx.relatorio.fragmento({ tema: 'triagem', emoji: t.e, titulo: verif ? 'Verificação do trabalho' : 'Relatório do trabalho', subtitulo: c.titulo, nome: c.pacienteNome || '', data: dataPT(s.data), assinatura: 'Ricardo Correia, Hikari Fafe', blocos, aviso: 'Este é um trabalho energético e não substitui o acompanhamento médico.' });
  }

  /* ── Plano para o paciente (linguagem simples, assinado em nome do terapeuta) ── */
  const dicasPaciente = p => lista(p.dicas).filter(d => !/^(Trabalho energético de apoio|Pedir sempre)/.test(d));
  function planoPacienteLinhas(c) {
    const p = c.protocolo; if (!p) return null;
    const nome = String(c.pacienteNome || '').split(/\s+/)[0];
    const L = [`Olá${nome ? ', ' + nome : ''},`, `Aqui fica o resumo do trabalho feito a partir do que pediu: “${c.objetivo || c.titulo}”.`];
    if (lista(p.temas).length) L.push('Áreas trabalhadas: ' + p.temas.join(', ') + '.');
    const d = dicasPaciente(p); if (d.length) L.push('Em casa, sugere-se:\n' + d.map(x => '• ' + x).join('\n'));
    if (lista(p.medico).length) L.push('Cuidados com a saúde:\n' + p.medico.map(x => '• ' + x).join('\n'));
    const lc = ultimaLeitura(c); if (lc && ctx.sintetizarLeitura) L.push('Leitura do momento: ' + ctx.sintetizarLeitura(nome || c.titulo, lc, false));
    L.push('Próximos passos: uma primeira sessão de limpeza, uma verificação passados cerca de 7 dias e, depois, as sessões que forem necessárias.');
    L.push('Este é um trabalho energético e não substitui o acompanhamento médico.');
    L.push('Ricardo Correia, Hikari Fafe');
    return L;
  }
  const planoPacienteHtml = L => '<div style="font-family:sans-serif;line-height:1.55;color:#2b2b2b;">' + L.map(x => '<p style="margin:0 0 .9em;">' + esc(x).replace(/\n/g, '<br>') + '</p>').join('') + '</div>';

  /* ── Dados ── */
  async function carregar() {
    if (S.casos) return;
    S.casos = await ctx.listar();
  }
  function ordenar() {
    S.casos.sort((a, b) => (aVerificar(b) - aVerificar(a)) || ((b._t || 0) - (a._t || 0)));
  }
  async function gravarCaso(caso) {
    const dados = { titulo: caso.titulo, tipo: caso.tipo, referencia: caso.referencia || '', objetivo: caso.objetivo || '', pacienteId: caso.pacienteId || '', pacienteNome: caso.pacienteNome || '', prep: caso.prep || {}, sessoes: lista(caso.sessoes), estado: caso.estado || 'em-curso', proxima: caso.proxima || '', pesquisa: lista(caso.pesquisa), protocolo: caso.protocolo || null, rascunho: caso.rascunho || null };
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
      <button class="primary" data-a="assistente" style="width:100%;padding:14px;margin-bottom:8px;">✨ Descrever a situação<br><small>Escreves o que queres e a app cria a pesquisa e o protocolo</small></button>
      <button class="ghost" data-a="novo" style="width:100%;padding:12px;margin-bottom:10px;">➕ Novo caso (escolher o tipo)</button>
      <div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:8px;">${ch('*', 'Todos')}${ch('verificar', '🔔 A verificar' + (nVer ? ' (' + nVer + ')' : ''))}${ch('curso', 'Em curso')}${ch('fechado', 'Fechados')}</div>
      <select data-i="fTipo" style="margin-bottom:10px;"><option value="*">Todos os tipos</option>${tipos.map(([k, t]) => `<option value="${k}" ${S.fTipo === k ? 'selected' : ''}>${t.e} ${esc(t.n)}</option>`).join('')}</select>
      ${vis.length ? vis.map(c => { const t = TIPOS[c.tipo] || TIPOS.casa; const n = lista(c.sessoes).length;
        return `<div class="card" data-a="abrir" data-id="${esc(c.id)}" style="cursor:pointer;margin-bottom:8px;">
          <div style="display:flex;gap:10px;align-items:center;"><div style="font-size:1.8rem;">${t.e}</div><div style="flex:1;min-width:0;"><strong>${esc(c.titulo)}</strong>
          <div class="muted" style="font-size:.82rem;">${esc(t.n)}${c.pacienteNome ? ' · ' + esc(c.pacienteNome) : ''} · ${n} sessão(ões)</div>
          <div style="font-size:.88rem;margin-top:2px;">${badge(c)}${c.rascunho ? ' · <span style="color:#d9822b;font-weight:700;">📝 sessão em curso</span>' : ''}</div></div></div></div>`; }).join('') : '<div class="card"><p class="muted">Ainda não há casos aqui. Toca em “Novo caso” para começar.</p></div>'}`;
  }

  function verAssistente() {
    const A = S.ass, R = A.res;
    let h = `${voltarLista}<h2 style="margin:0 0 4px;">✨ Protocolo automático</h2>
      <p class="muted" style="margin:0 0 10px;">Escreve o que se pretende ou o que a pessoa sente, com as tuas palavras. A app reconhece os temas e monta a pesquisa, as interferências externas a verificar, as etiquetas sugeridas e o plano para o paciente.</p>
      <div class="card"><textarea data-i="a.texto" rows="4" placeholder="Ex.: durmo mal, acordo muitas vezes de noite para urinar e quero perder peso. Ver se há interferência externa.">${esc(A.texto)}</textarea>
      <div style="margin:8px 0;">${EXEMPLOS.map((x, i) => `<span data-a="exemplo" data-v="${i}" style="display:inline-block;margin:3px 4px 3px 0;padding:5px 10px;border-radius:99px;background:#eef0f7;font-size:.8rem;cursor:pointer;">${esc(x)}</span>`).join('')}</div>
      <label style="display:block;margin-top:6px;">Para qual paciente? (opcional)</label>
      <select data-i="a.pacienteId"><option value="">— sem paciente —</option>${(S.pacs || []).map(p => `<option value="${esc(p.id)}" ${A.pacienteId === p.id ? 'selected' : ''}>${esc(p.fullName)}</option>`).join('')}</select>
      <div data-a="cartasAss" style="display:flex;gap:10px;align-items:center;padding:8px;margin-top:8px;border-radius:10px;cursor:pointer;background:${A.cartas ? '#eef7ee' : '#f7f7f5'};"><span style="font-size:1.3rem;">${A.cartas ? '☑' : '⬜'}</span><span style="flex:1;font-size:.9rem;">🎴 Incluir uma leitura complementar automática (3 cartas)</span></div>
      <button class="primary" data-a="gerar" style="width:100%;padding:14px;margin-top:10px;">✨ Gerar protocolo</button></div>`;
    if (R && R.vazio) h += '<div class="card"><p class="muted">Escreve um pouco mais para eu perceber o que se pretende.</p></div>';
    else if (R) {
      const eq = ctx.etiquetas;
      const sug = lista(R.sugeridas).map(cod => eq.find(x => x.codigo === cod)).filter(Boolean);
      const L = planoPacienteLinhas({ pacienteNome: (S.pacs || []).find(p => p.id === A.pacienteId)?.fullName || '', objetivo: A.texto, titulo: A.titulo, protocolo: { temas: R.temas.map(x => x.nome), dicas: R.dicas, medico: R.medico } });
      h += `<div class="card" style="border:2px solid var(--primary);"><h3 style="margin:0 0 6px;">O que percebi</h3>
        ${R.semTema ? '<p class="muted">Não reconheci um tema concreto. Usei a pesquisa geral, com as interferências externas. Podes escolher o tipo à mão.</p>' : `<div>${R.temas.map(x => `<span style="display:inline-block;margin:2px 4px 2px 0;padding:4px 10px;border-radius:99px;background:#eef7ee;">${x.e} ${esc(x.nome)}</span>`).join('')}</div>`}
        <label style="display:block;margin-top:10px;">Tipo de caso</label><select data-i="a.tipo">${Object.entries(TIPOS).map(([k, t]) => `<option value="${k}" ${A.tipo === k ? 'selected' : ''}>${t.e} ${esc(t.n)}</option>`).join('')}</select>
        <label style="display:block;margin-top:10px;">Nome do caso</label><input data-i="a.titulo" value="${esc(A.titulo)}"></div>
        <div class="card"><h3 style="margin:0 0 4px;">🔍 Pesquisa com o pêndulo (${R.pesquisa.length} pontos)</h3><p class="muted" style="margin:0 0 6px;">Mentaliza cada número e verifica a deteção. Os 🌐 são as interferências externas.</p>
        ${R.pesquisa.map((x, i) => `<div style="padding:5px 0;border-bottom:1px solid #eee;font-size:.9rem;"><strong style="color:#777;">${i + 1}.</strong> ${esc(x)}</div>`).join('')}</div>
        ${R.chakras.length ? `<div class="card"><h3 style="margin:0 0 4px;">🌀 Chakras a verificar</h3>${R.chakras.map(x => `<span style="display:inline-block;margin:2px 4px 2px 0;padding:4px 10px;border-radius:99px;background:#f3ecfa;">${esc(x)}</span>`).join('')}</div>` : ''}
        ${sug.length ? `<div class="card"><h3 style="margin:0 0 4px;">🏷️ Etiquetas sugeridas (${sug.length})</h3><p class="muted" style="margin:0 0 6px;">Confirma com o pêndulo quais aplicar.</p>${sug.map(x => `<div style="font-size:.88rem;padding:3px 0;"><strong>${esc(x.codigo)}</strong> · ${esc(x.pt)}</div>`).join('')}</div>` : ''}
        ${R.medico.length ? `<div class="card" style="background:#fff6e8;border:1px solid #e8c48a;"><h3 style="margin:0 0 4px;">⚕️ Sinais para levar ao médico</h3>${R.medico.map(x => `<p style="margin:4px 0;font-size:.9rem;">• ${esc(x)}</p>`).join('')}</div>` : ''}
        ${R.dicas.length ? `<div class="card"><h3 style="margin:0 0 4px;">🌿 Passos práticos</h3>${R.dicas.map(x => `<p style="margin:4px 0;font-size:.9rem;">• ${esc(x)}</p>`).join('')}</div>` : ''}
        <div class="card"><h3 style="margin:0 0 4px;">🗓️ Plano</h3><p style="margin:0;font-size:.9rem;">${esc(R.plano)}</p></div>
        <details class="card"><summary style="cursor:pointer;font-weight:700;">📲 Plano para o paciente (pré-visualização)</summary><div style="margin-top:8px;">${planoPacienteHtml(L)}</div></details>
        <button class="primary" data-a="criarAss" data-v="sessao" style="width:100%;padding:14px;margin-top:6px;">▶️ Criar o caso e começar a sessão</button>
        <button class="ghost" data-a="criarAss" data-v="so" style="width:100%;padding:12px;margin-top:8px;">💾 Só criar o caso</button>`;
    }
    main.innerHTML = h;
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
      ${c.protocolo ? `<details class="card"><summary style="cursor:pointer;font-weight:700;">✨ Protocolo deste caso</summary><div style="margin-top:8px;font-size:.9rem;">
        ${lista(c.protocolo.temas).length ? `<p><strong>Temas:</strong> ${c.protocolo.temas.map(esc).join(', ')}</p>` : ''}
        ${lista(c.protocolo.chakras).length ? `<p><strong>Chakras:</strong> ${c.protocolo.chakras.map(esc).join(', ')}</p>` : ''}
        ${lista(c.protocolo.medico).length ? `<p><strong>⚕️ Para o médico:</strong></p>${c.protocolo.medico.map(x => `<p style="margin:2px 0;">• ${esc(x)}</p>`).join('')}` : ''}
        ${lista(c.protocolo.dicas).length ? `<p><strong>🌿 Passos práticos:</strong></p>${c.protocolo.dicas.map(x => `<p style="margin:2px 0;">• ${esc(x)}</p>`).join('')}` : ''}
        ${c.pacienteId ? `<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:8px;"><button class="ghost" data-a="planoPac">📲 Guardar plano na ficha do paciente</button>${ctx.enviarPortal ? '<button class="ghost" data-a="enviarPac">📤 Enviar link do portal</button>' : ''}</div>` : '<p class="muted">Liga o caso a um paciente para lhe poderes enviar o plano.</p>'}</div></details>` : ''}
      <div class="card"><h3 style="margin:0 0 4px;">🧭 1. Preparação</h3>
        ${P('permissao', 'Perguntei ao pêndulo se posso trabalhar neste caso')}${P('objetivo', 'O objetivo está definido e a identificação do alvo está à mão')}${P('elevado', 'Pedi o que for mais elevado e justo, sem interferir na vontade de terceiros')}</div>
      ${(() => { const p = pendente(c); if (!p || c.estado === 'fechado') return ''; const f = lista(p.feitas).length; return `<div class="card" style="border:2px solid #8a5a12;"><h3 style="margin:0 0 4px;">🧹 Limpeza por aplicar</h3><p class="muted" style="margin:0 0 6px;">Pesquisa de ${dataPT(p.data)} · ${lista(p.etiquetas).length} etiqueta(s) escolhidas automaticamente${f ? ' · ' + f + ' já aplicadas' : ''}. O protocolo está pronto.</p>${protocoloCuraHtml(p.protocoloCura, false)}${ctx.limpezaEterica ? `<div class="row" style="gap:8px;margin-top:8px;"><button class="primary" data-a="limparPend" data-v="todas" style="flex:1;padding:12px;">⚡ Todas juntas</button><button class="ghost" data-a="limparPend" data-v="uma" style="flex:1;padding:12px;">1️⃣ Uma a uma</button></div><p class="muted" style="font-size:.82rem;margin:6px 0 0;">O testemunho (${esc(testemunhoCaso(c).nome)}) fica sempre à vista.</p>` : ''}<button class="ghost" data-a="limpezaFeita" style="width:100%;margin-top:8px;">✔ Já apliquei por outra via (físicas)</button></div>`; })()}
      ${c.rascunho ? `<div class="card" style="border:2px solid #d9822b;"><h3 style="margin:0 0 4px;">📝 Sessão em curso</h3><p class="muted" style="margin:0 0 8px;">${c.rascunho.modo === 'verificacao' ? 'Verificação' : 'Sessão completa'} · ${c.rascunho.modo === 'verificacao' ? '' : 'passo ' + c.rascunho.passo + ' de 3 · '}${lista(c.rascunho.causas).length} ponto(s) detetado(s) · ${lista(c.rascunho.etiquetas).length} etiqueta(s). Está tudo guardado.</p><div class="row" style="gap:8px;"><button class="primary" data-a="continuar" style="flex:1;padding:12px;">▶️ Continuar</button><button class="ghost" data-a="descartar">🗑️ Descartar</button></div></div>` : ''}
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
        ${lista(s.etiquetas).length ? `<div class="muted" style="margin-top:4px;">🏷️ ${s.etiquetas.map(x => esc(x.codigo)).join(' · ')} (${s.via === 'fisica' ? 'físicas' : s.via === 'ambas' ? 'físicas e etéricas' : 'etéricas'}${s.aplicacao ? ', ' + (s.aplicacao === 'todas' ? 'todas ao mesmo tempo' : 'uma a uma') : ''})</div>` : ''}
        ${leituraObj(s.leitura) ? `<div class="muted" style="margin-top:4px;font-size:.88rem;">🎴 ${esc(ctx.sintetizarLeitura(nomeLeitura(c), leituraObj(s.leitura), true))}</div>` : ''}
        ${lista(s.protocoloCura).length ? protocoloCuraHtml(s.protocoloCura, false).replace('class="card"', 'class="card" style="margin-top:6px;"') : ''}
        ${s.notas ? `<div style="margin-top:4px;font-size:.9rem;">📝 ${esc(s.notas)}</div>` : ''}
        ${ctx.relatorio ? `<div class="row" style="gap:6px;flex-wrap:wrap;margin-top:8px;"><button class="ghost" data-a="verRel" data-v="${esc(s.id)}">👁️ Ver relatório</button><button class="ghost" data-a="pdfRel" data-v="${esc(s.id)}">📄 PDF ilustrado</button>${c.pacienteId && ctx.enviarPortal ? '<button class="primary" data-a="enviarPac">📲 Enviar link ao paciente</button>' : ''}</div>` : ''}
        ${s.proxima ? `<div class="muted" style="margin-top:4px;">Próxima verificação: ${dataPT(s.proxima)}</div>` : ''}</div>`).join('') : '<div class="card"><p class="muted">Ainda não há sessões. Faz a preparação e toca em “Nova sessão”.</p></div>'}
      <div class="row" style="gap:8px;flex-wrap:wrap;margin-top:12px;">${c.estado !== 'fechado' ? '<button class="ghost" data-a="fechar">🔒 Fechar caso</button>' : ''}<button class="ghost" data-a="apagar" style="color:#b94a48;">🗑️ Apagar caso</button></div>`;
  }

  /* ── Sessão ── */
  function novaWiz(modo) {
    const c = S.caso, ss = lista(c.sessoes), ult = ss[ss.length - 1];
    const W = { modo, passo: 1, data: hoje(), bovisIni: '', bovisFin: '', causas: [], outras: '', etiquetas: [], via: 'eterica', q: '', persistem: [], novasTxt: '', resultado: '', manual: false, leitura: null, modoCartas: 'auto', aplicacao: '', cm: '', cp: '', ct: '', notas: '', proxima: somaDias(hoje(), DIAS_VERIF) };
    if (modo === 'verificacao' && ult) W.base = lista(ult.persistem).length ? ult.persistem.slice() : lista(ult.causas).slice();
    return W;
  }
  /* ── Sessão em curso: guarda-se sozinha e retoma-se onde ficou ── */
  const serializarWiz = W => ({ modo: W.modo, passo: W.passo, data: W.data, bovisIni: W.bovisIni, bovisFin: W.bovisFin, causas: W.causas, outras: W.outras, etiquetas: W.etiquetas, via: W.via, persistem: W.persistem, novasTxt: W.novasTxt, resultado: W.resultado, manual: !!W.manual, leitura: leituraCompacta(W.leitura), modoCartas: W.modoCartas, aplicacao: W.aplicacao || '', feitas: lista(W.feitas), cm: W.cm, cp: W.cp, ct: W.ct, notas: W.notas, proxima: W.proxima, base: lista(W.base), auto: lista(W.auto).map(x => ({ codigo: x.codigo, pt: x.pt, fase: x.fase || '', pedido: !!x.pedido })), autoChave: W.autoChave || '', em: Date.now() });
  const desserializarWiz = R => { const W = novaWiz(R.modo); Object.assign(W, R, { leitura: leituraObj(R.leitura), q: '' }); return W; };
  let tRasc = null;
  async function guardarRascunho() {
    clearTimeout(tRasc);
    const c = S.caso, W = S.wiz; if (!c || !W) return;
    c.rascunho = serializarWiz(W);
    try { await gravarCaso(c); } catch (e) { console.warn('Rascunho:', e); }
  }
  function agendarRascunho() { if (S.view !== 'sessao' || !S.wiz) return; clearTimeout(tRasc); tRasc = setTimeout(guardarRascunho, 600); }
  const primeiraSessao = () => !lista(S.caso.sessoes).some(s => s.modo === 'completa');
  const causasWiz = () => { const W = S.wiz; return W.causas.concat(W.outras.split(',').map(x => x.trim()).filter(Boolean)); };
  // Escolha automática das etiquetas, pelo mesmo caminho do Pêndulo Hebraico:
  // 1.ª sessão = protocolo base; depois, as fases pedidas pelo que foi detetado (+ fecho).
  const chaveAuto = () => JSON.stringify([primeiraSessao(), causasWiz()]);
  function calcularAuto(forcar) {
    const W = S.wiz, c = S.caso;
    if (!ctx.etiquetasAuto || (!forcar && W.autoChave === chaveAuto())) return;
    W.auto = ctx.etiquetasAuto({ primeira: primeiraSessao(), numeros: causasParaNumeros(causasWiz()), sugeridas: lista(c.protocolo && c.protocolo.sugeridas).slice(0, 3) });
    W.etiquetas = W.auto.map(x => x.codigo); W.autoChave = chaveAuto();
  }
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
    const cab = `<button class="ghost" data-a="sair" style="margin-bottom:4px;">← ${esc(c.titulo)}</button><div class="muted" style="font-size:.78rem;margin:0 0 8px;">💾 Guarda automaticamente. Podes sair e continuar depois.</div>${barra}`;
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
      const todas = lista(c.pesquisa).length ? c.pesquisa : causasDe(c.tipo);
      main.innerHTML = `${cab}<h2 style="margin:0 0 8px;">🔍 1. Triagem</h2>
        <div class="card">${data}<label style="margin-top:10px;display:block;">Bovis inicial</label><input data-i="w.bovisIni" value="${esc(W.bovisIni)}" inputmode="decimal" placeholder="Ex.: 6500"></div>
        <div class="card"><h3 style="margin:0 0 4px;">Pesquisa numerada · ${lista(c.pesquisa).length ? '✨ protocolo do caso' : t.e + ' ' + esc(t.n)}</h3><p class="muted" style="margin:0 0 6px;">Mentaliza cada número e marca o que o pêndulo deteta.</p>${toggles(todas, W.causas, 'causa')}
        <label style="margin-top:10px;display:block;">Outras causas detetadas (separa por vírgulas)</label><input data-i="w.outras" value="${esc(W.outras)}"></div>
        <div class="card"><h3 style="margin:0 0 4px;">🎴 Leitura complementar (opcional)</h3><p class="muted" style="margin:0 0 8px;">Um complemento sobre o momento. Não faz parte do diagnóstico do pêndulo.</p>
        <div class="row" style="gap:6px;"><button data-a="modoCartas" data-v="auto" class="${W.modoCartas === 'auto' ? 'primary' : 'ghost'}" style="flex:1;">🎴 Automática</button><button data-a="modoCartas" data-v="manual" class="${W.modoCartas === 'manual' ? 'primary' : 'ghost'}" style="flex:1;">✋ Baralho físico</button></div>
        ${W.leitura ? `<p style="margin:10px 0 2px;"><strong>Momento atual:</strong> ${W.leitura.momento.n} — ${esc(W.leitura.momento.nome)}</p><p style="margin:2px 0;"><strong>Por trás disto:</strong> ${W.leitura.porTras.n} — ${esc(W.leitura.porTras.nome)}</p><p style="margin:2px 0;"><strong>Tendência:</strong> ${W.leitura.tendencia.n} — ${esc(W.leitura.tendencia.nome)}</p><p class="muted" style="margin:6px 0 0;font-size:.88rem;">${esc(ctx.sintetizarLeitura(nomeLeitura(c), W.leitura, true))}</p>` : '<p class="muted" style="margin:10px 0 0;">— por preencher —</p>'}
        ${W.modoCartas === 'auto' ? `<button class="ghost" data-a="tirar3" style="width:100%;margin-top:10px;">🎴 ${W.leitura ? 'Tirar outra vez' : 'Tirar as 3 cartas'}</button>` : ['cm|Momento atual', 'cp|Por trás disto', 'ct|Tendência'].map(x => { const [k, tt] = x.split('|'); return `<label style="display:block;margin-top:8px;">${tt}</label><select data-i="w.${k}"><option value="">—</option>${lista(ctx.arcanos).map(a => `<option value="${a.n}" ${String(W[k]) === String(a.n) ? 'selected' : ''}>${a.n} — ${esc(a.nome)}</option>`).join('')}</select>`; }).join('')}
        ${W.leitura ? '<button class="ghost" data-a="limparCartas" style="margin-top:8px;">Limpar leitura</button>' : ''}</div>
        <button class="primary" data-a="seguinte" style="width:100%;padding:14px;">Seguinte → Limpeza</button>
        <button class="ghost" data-a="soPesquisa" style="width:100%;margin-top:8px;padding:12px;">📥 Terminar só a pesquisa<br><small>Guarda tudo e o protocolo de cura fica pronto para aplicares mais tarde</small></button>`;
    } else if (W.passo === 2) {
      const sel = W.etiquetas.map(cod => ctx.etiquetas.find(x => x.codigo === cod)).filter(Boolean);
      const excesso = primeiraSessao() && W.etiquetas.length > MAX_ETQ_PRIMEIRA;
      main.innerHTML = `${cab}<h2 style="margin:0 0 8px;">🧹 2. Limpeza</h2>
        ${lista(W.auto).length ? `<div class="card" style="border:2px solid var(--primary);"><h3 style="margin:0 0 4px;">✨ Escolhidas automaticamente</h3>
        <p class="muted" style="margin:0 0 6px;">${primeiraSessao() ? 'Protocolo base da 1.ª sessão' : 'Fases pedidas pelo que foi detetado, mais o fecho'}${lista(W.auto).some(x => x.pedido) ? ', e as do pedido do caso' : ''}. Toca para tirar ou pôr.</p>
        ${W.auto.map((x, i) => { const on = W.etiquetas.indexOf(x.codigo) >= 0, nova = i === 0 || W.auto[i - 1].fase !== x.fase;
          return (nova ? `<div style="margin-top:8px;font-size:.8rem;font-weight:700;color:#5b2a86;">${esc(x.fase)}</div>` : '') + `<div data-a="etq" data-v="${esc(x.codigo)}" style="display:flex;gap:10px;align-items:center;padding:8px;margin-top:3px;border-radius:10px;cursor:pointer;background:${on ? '#eef7ee' : '#f7f7f5'};"><span style="font-size:1.2rem;">${on ? '☑' : '⬜'}</span><strong style="min-width:62px;">${esc(x.codigo)}</strong><span style="flex:1;font-size:.88rem;">${esc(x.pt)}</span></div>`; }).join('')}
        <button class="ghost" data-a="recalcular" style="margin-top:8px;">🔄 Recalcular automaticamente</button></div>` : ''}
        <details class="card"><summary style="cursor:pointer;font-weight:700;">➕ Acrescentar ou tirar etiquetas à mão</summary>
        <p class="muted" style="margin:6px 0 0;">${primeiraSessao() ? `Na 1.ª sessão, o protocolo base e no máximo 3 do pedido (${MAX_ETQ_PRIMEIRA}).` : 'Usa só as que o pêndulo indicar para o que foi detetado.'}</p>
        <div style="margin:8px 0;"><strong>${W.etiquetas.length} escolhida(s)</strong>${excesso ? `<div style="color:#b94a48;font-size:.88rem;margin-top:4px;">⚠️ Muitas etiquetas numa só sessão desgastam o campo. Reduz para ${MAX_ETQ_PRIMEIRA} ou menos.</div>` : ''}
        <div style="margin-top:4px;">${sel.map(x => `<span data-a="etq" data-v="${esc(x.codigo)}" style="display:inline-block;margin:2px 4px 2px 0;padding:4px 10px;border-radius:99px;background:#5b2a86;color:#fff;font-size:.82rem;cursor:pointer;">${esc(x.codigo)} ✕</span>`).join('')}</div></div>
        ${lista(c.protocolo && c.protocolo.sugeridas).length ? `<div style="margin:6px 0;"><span class="muted" style="font-size:.82rem;">✨ Sugeridas (toca para escolher):</span><br>${c.protocolo.sugeridas.map(cod => ctx.etiquetas.find(x => x.codigo === cod)).filter(Boolean).map(x => `<span data-a="etq" data-v="${esc(x.codigo)}" style="display:inline-block;margin:3px 4px 0 0;padding:4px 10px;border-radius:99px;background:${W.etiquetas.indexOf(x.codigo) >= 0 ? '#5b2a86;color:#fff' : '#f3ecfa'};font-size:.82rem;cursor:pointer;" title="${esc(x.pt)}">${esc(x.codigo)}</span>`).join('')}</div>` : ''}
        <input data-i="w.q" value="${esc(W.q)}" placeholder="Número (24, A7) ou palavra (inveja, perdoar)…" style="width:100%;margin:6px 0;">
        <div id="casos-etq" style="max-height:44vh;overflow:auto;">${listaEtqHTML()}</div></details>
        ${protocoloCuraHtml(protocoloCura(W.etiquetas, W.auto), true)}
        <div class="card"><h3 style="margin:0 0 4px;">🧹 Aplicar a limpeza</h3>
        <p class="muted" style="margin:0 0 8px;">Abre o ecrã de limpeza com as ${W.etiquetas.length} etiqueta(s) escolhidas: todas ao mesmo tempo ou uma a uma, com o pêndulo.</p>
        ${W.aplicacao ? `<p style="margin:0 0 8px;color:#2f7d32;">✅ Aplicadas (${W.aplicacao === 'todas' ? 'todas ao mesmo tempo' : 'uma a uma'})</p>` : (lista(W.feitas).length ? `<p style="margin:0 0 8px;color:#d9822b;">🕓 ${W.feitas.filter(x => W.etiquetas.indexOf(x) >= 0).length} de ${W.etiquetas.length} já aplicadas. Toca para continuar.</p>` : '')}
        ${ctx.limpezaEterica ? `<div class="row" style="gap:8px;"><button class="primary" data-a="limpar" data-v="todas" ${W.etiquetas.length ? '' : 'disabled'} style="flex:1;padding:12px;">⚡ Todas juntas</button><button class="ghost" data-a="limpar" data-v="uma" ${W.etiquetas.length ? '' : 'disabled'} style="flex:1;padding:12px;">1️⃣ Uma a uma</button></div>` : ''}</div>
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
      <div class="row" style="gap:8px;">${W.modo === 'completa' ? '<button class="ghost" data-a="anterior">← Voltar</button>' : ''}<button class="primary" data-a="guardar" style="flex:1;padding:14px;">💾 Guardar sessão</button></div>
      ${ctx.relatorio ? '<button class="ghost" data-a="verRelWiz" style="width:100%;margin-top:8px;">👁️ Pré-visualizar o relatório do paciente</button><p class="muted" style="font-size:.82rem;">Ao guardar, o relatório fica na ficha do paciente (se o caso estiver ligado a um) e podes enviá-lo por link do portal.</p>' : ''}`;
  }

  function montarSessao() {
    const W = S.wiz, c = S.caso;
    const verif = W.modo === 'verificacao';
    const novas = verif ? W.novasTxt.split(',').map(x => x.trim()).filter(Boolean) : [];
    const pend = !verif && !!W.soPesquisa;
    const resultado = pend ? 'por_limpar' : (W.manual ? W.resultado : resultadoAuto());
    const s = {
      id: 's' + Date.now(), modo: W.modo, data: W.data || hoje(),
      bovisIni: verif ? String(W.bovisFin || '').trim() : String(W.bovisIni || '').trim(),
      bovisFin: verif ? '' : String(W.bovisFin || '').trim(),
      causas: verif ? lista(W.base) : causasWiz(), persistem: W.persistem.slice(), novas,
      etiquetas: verif ? [] : W.etiquetas.map(cod => ctx.etiquetas.find(x => x.codigo === cod)).filter(Boolean).map(x => ({ codigo: x.codigo, pt: x.pt })),
      via: verif ? '' : W.via, aplicacao: verif ? '' : (W.aplicacao || ''), leitura: verif ? null : leituraCompacta(W.leitura), resultado, proxima: W.proxima || '', notas: String(W.notas || '').trim()
    };
    s.protocoloCura = verif ? [] : protocoloCura(W.etiquetas, W.auto);
    s.limpeza = pend ? 'pendente' : '';
    s.feitas = pend ? lista(W.feitas) : [];
    return s;
  }
  async function concluirLimpeza(modo, via) {
    const c = S.caso, p = pendente(c); if (!p) return;
    p.limpeza = 'feita'; p.aplicacao = modo || ''; p.via = via || 'eterica'; p.feitas = lista(p.etiquetas).map(x => x.codigo); p.dataLimpeza = hoje();
    if (!p.proxima) p.proxima = somaDias(hoje(), DIAS_VERIF);
    c.proxima = p.proxima;
    try { await gravarCaso(c); } catch (e) { console.error(e); ctx.toast('⚠️ Não consegui guardar.', true); return; }
    if (c.pacienteId) {
      const t = TIPOS[c.tipo] || TIPOS.casa;
      await ctx.guardarNaFicha(c.pacienteId, { tipo: 'caso-energetico', titulo: `${t.n}: ${c.titulo} (limpeza aplicada)`, texto: `${t.e} ${t.n}: ${c.titulo}\nLimpeza aplicada em ${dataPT(hoje())}: ` + lista(p.etiquetas).map(x => x.codigo + ' ' + x.pt).join(', ') + '. Próxima verificação: ' + dataPT(p.proxima) + '.', reportHtml: relatorioSessao(c, p) || undefined, dados: { casoId: c.id, tipoCaso: c.tipo, sessao: p } });
    }
    ctx.toast('Limpeza registada ✓ Faz a verificação passados uns dias');
    ver();
  }
  async function guardarSessao() {
    const W = S.wiz, c = S.caso;
    const s = montarSessao(), resultado = s.resultado;
    clearTimeout(tRasc); const rascAnt = c.rascunho; c.rascunho = null;
    c.sessoes = lista(c.sessoes).concat([s]);
    c.estado = resultado === 'limpo' ? 'limpo' : 'em-curso';
    if (s.limpeza === 'pendente') s.proxima = '';
    c.proxima = s.proxima;
    try {
      await gravarCaso(c);
    } catch (e) {
      c.sessoes = c.sessoes.slice(0, -1); c.rascunho = rascAnt;
      console.error(e); ctx.toast('⚠️ Não consegui guardar. Tenta outra vez.', true); return;
    }
    if (c.pacienteId) {
      const t = TIPOS[c.tipo] || TIPOS.casa;
      const ok = await ctx.guardarNaFicha(c.pacienteId, { tipo: 'caso-energetico', titulo: `${t.n}: ${c.titulo}`, texto: textoSessao(c, s), reportHtml: relatorioSessao(c, s) || undefined, dados: { casoId: c.id, tipoCaso: c.tipo, sessao: s } });
      ctx.toast(ok ? 'Sessão guardada ✓ Relatório na ficha — já podes enviar o link' : 'Sessão guardada ✓ (mas não consegui pôr na ficha do paciente)', !ok);
    } else ctx.toast('Sessão guardada ✓');
    S.wiz = null; S.view = 'caso'; ver();
  }

  /* ── Navegação e eventos ── */
  function ver() {
    if (S.view === 'lista') verLista();
    else if (S.view === 'novo') verNovo();
    else if (S.view === 'assistente') verAssistente();
    else if (S.view === 'caso') verCaso();
    else verSessao();
    window.scrollTo(0, 0);
    if (S.view === 'sessao') guardarRascunho();
  }
  function repintarSessao() {
    const el = main.querySelector('#casos-etq'), y = el ? el.scrollTop : 0, sy = window.scrollY;
    verSessao();
    const n = main.querySelector('#casos-etq'); if (n) n.scrollTop = y;
    window.scrollTo(0, sy);
    agendarRascunho();
  }
  const alternar = (arr, v) => { const i = arr.indexOf(v); if (i >= 0) arr.splice(i, 1); else arr.push(v); };

  const acoes = {
    lista: () => { S.view = 'lista'; S.caso = null; ver(); },
    fEstado: b => { S.fEstado = b.dataset.v; verLista(); },
    assistente: async () => { if (!S.pacs) { try { S.pacs = await ctx.pacientes(); } catch (e) { S.pacs = []; } } S.ass = S.ass || { texto: '', pacienteId: '', res: null, tipo: 'pessoa', titulo: '', cartas: true }; S.view = 'assistente'; ver(); },
    cartasAss: () => { S.ass.cartas = !S.ass.cartas; verAssistente(); },
    modoCartas: b => { S.wiz.modoCartas = b.dataset.v; repintarSessao(); },
    tirar3: () => { S.wiz.leitura = sortear(); repintarSessao(); },
    limparCartas: () => { const W = S.wiz; W.leitura = null; W.cm = W.cp = W.ct = ''; repintarSessao(); },
    exemplo: b => { S.ass.texto = EXEMPLOS[Number(b.dataset.v)] || ''; S.ass.res = null; verAssistente(); },
    gerar: () => {
      const A = S.ass; A.res = analisar(A.texto, ctx.etiquetas);
      if (!A.res.vazio) { A.tipo = A.res.tipo; if (!A.titulo.trim()) { const t = A.texto.trim().replace(/\s+/g, ' '); A.titulo = (t.charAt(0).toUpperCase() + t.slice(1)).slice(0, 50); } }
      verAssistente();
    },
    criarAss: async b => {
      const A = S.ass, R = A.res; if (!R || R.vazio) return;
      const pac = (S.pacs || []).find(p => p.id === A.pacienteId);
      const caso = { titulo: (A.titulo || 'Caso').trim().slice(0, 80), tipo: A.tipo || R.tipo, referencia: '', objetivo: A.texto.trim(), pacienteId: pac ? pac.id : '', pacienteNome: pac ? pac.fullName : '', prep: {}, sessoes: [], estado: 'em-curso', proxima: '',
        pesquisa: R.pesquisa.slice(), protocolo: { temas: R.temas.map(x => x.nome), chakras: R.chakras.slice(), sugeridas: R.sugeridas.slice(), medico: R.medico.slice(), dicas: R.dicas.slice(), plano: R.plano } };
      try { await gravarCaso(caso); } catch (e) { console.error(e); ctx.toast('⚠️ Não consegui criar o caso.', true); return; }
      S.caso = caso; S.ass = null; ctx.toast('Caso criado ✓');
      const querCartas = A.cartas;
      if (b.dataset.v === 'sessao') { S.wiz = novaWiz('completa'); if (querCartas && ctx.tirarCartas) S.wiz.leitura = sortear(); S.view = 'sessao'; } else S.view = 'caso';
      ver();
    },
    planoPac: async () => {
      const c = S.caso, L = planoPacienteLinhas(c); if (!L || !c.pacienteId) return;
      const ok = await ctx.guardarNaFicha(c.pacienteId, { tipo: 'plano-paciente', titulo: 'Plano: ' + c.titulo, texto: L.join('\n\n'), reportHtml: planoPacienteHtml(L), dados: { casoId: c.id } });
      ctx.toast(ok ? 'Plano guardado na ficha do paciente ✓' : 'Não consegui guardar na ficha.', !ok);
    },
    enviarPac: () => { if (S.caso.pacienteId && ctx.enviarPortal) ctx.enviarPortal(S.caso.pacienteId); },
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
    sessao: async b => { if (S.caso.rascunho && !(await ctx.confirmar('Já tens uma sessão em curso', 'Começar outra descarta a que está em curso. Preferes continuar a anterior?', 'Começar nova'))) return; S.wiz = novaWiz(b.dataset.v); S.view = 'sessao'; ver(); },
    sair: async () => { await guardarRascunho(); S.wiz = null; S.view = 'caso'; ctx.toast('Sessão guardada. Podes continuar quando quiseres ✓'); ver(); },
    continuar: () => { const c = S.caso; if (!c.rascunho) return; S.wiz = desserializarWiz(c.rascunho); S.view = 'sessao'; ver(); },
    descartar: async () => { const c = S.caso; if (!(await ctx.confirmar('Descartar a sessão em curso?', 'O que já pesquisaste e limpaste nesta sessão deixa de existir.', 'Descartar'))) return; clearTimeout(tRasc); c.rascunho = null; S.wiz = null; try { await gravarCaso(c); } catch (e) { ctx.toast('⚠️ Não consegui guardar.', true); } verCaso(); },
    causa: b => { alternar(S.wiz.causas, b.dataset.v); repintarSessao(); },
    persiste: b => { alternar(S.wiz.persistem, b.dataset.v); repintarSessao(); },
    etq: b => { alternar(S.wiz.etiquetas, b.dataset.v); repintarSessao(); },
    res: b => { S.wiz.resultado = b.dataset.v; S.wiz.manual = true; repintarSessao(); },
    seguinte: () => { if (S.wiz.modo === 'completa' && S.wiz.passo === 1) calcularAuto(false); S.wiz.passo++; ver(); },
    limpar: b => {
      const W = S.wiz, modo = b.dataset.v; if (!W.etiquetas.length) return;
      ctx.limpezaEterica(modo, W.etiquetas.slice(), S.caso.pacienteId || '', {
        testemunho: testemunhoCaso(S.caso),
        jaFeitas: lista(W.feitas),
        onProgresso: cods => { W.feitas = cods; agendarRascunho(); },
        onConcluir: () => { W.aplicacao = modo; W.via = 'eterica'; W.feitas = W.etiquetas.slice(); repintarSessao(); }
      });
    },
    soPesquisa: async () => {
      const W = S.wiz; calcularAuto(false); W.soPesquisa = true; await guardarSessao();
    },
    limparPend: b => {
      const c = S.caso, p = pendente(c); if (!p) return;
      const cods = lista(p.etiquetas).map(x => x.codigo), modo = b.dataset.v;
      ctx.limpezaEterica(modo, cods, c.pacienteId || '', {
        testemunho: testemunhoCaso(c), jaFeitas: lista(p.feitas),
        onProgresso: async f => { p.feitas = f; try { await gravarCaso(c); } catch (e) { console.error(e); } },
        onConcluir: () => concluirLimpeza(modo)
      });
    },
    limpezaFeita: async () => { if (await ctx.confirmar('Limpeza já aplicada?', 'Marca a limpeza pendente como feita (por exemplo, com etiquetas físicas).', 'Marcar como feita')) concluirLimpeza('', 'fisica'); },
    recalcular: () => { calcularAuto(true); repintarSessao(); },
    anterior: () => { S.wiz.passo--; ver(); },
    guardar: () => guardarSessao(),
    verRelWiz: () => { const c = S.caso, h = relatorioSessao(c, montarSessao()); if (h) ctx.relatorio.ver(h, 'Relatório do trabalho'); },
    verRel: b => { const c = S.caso, x = lista(c.sessoes).find(y => y.id === b.dataset.v); const h = x && relatorioSessao(c, x); if (h) ctx.relatorio.ver(h, 'Relatório do trabalho'); },
    pdfRel: b => { const c = S.caso, x = lista(c.sessoes).find(y => y.id === b.dataset.v); const h = x && relatorioSessao(c, x); if (h) ctx.relatorio.pdf(h, 'Relatório do trabalho'); },
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
    else if (obj === 'a') { S.ass[campo] = t.value; if (campo === 'texto') S.ass.res = S.ass.res; }
    else if (obj === 'w') {
      S.wiz[campo] = t.value; agendarRascunho();
      if (campo === 'cm' || campo === 'cp' || campo === 'ct') { const W = S.wiz, m = arc(Number(W.cm)), p = arc(Number(W.cp)), q = arc(Number(W.ct)); if (W.cm !== '' && W.cp !== '' && W.ct !== '' && m && p && q) { W.leitura = { momento: m, porTras: p, tendencia: q }; repintarSessao(); } return; }
      if (campo === 'q') { const el = main.querySelector('#casos-etq'); if (el) el.innerHTML = listaEtqHTML(); }
    }
  };

  main.innerHTML = '<p class="muted">A carregar…</p>';
  carregar().then(() => ver()).catch(e => {
    console.error(e);
    main.innerHTML = '<div class="card"><h2>🏠 Casos e Alvos</h2><p class="muted">Não consegui abrir: ' + esc(e && e.message ? e.message : String(e)) + '</p></div>';
  });
}
