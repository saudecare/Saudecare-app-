/* Pesquisa Integrada (pêndulo + apometria) — ferramenta exclusiva da Hikari Fafe.
   Guia passo a passo: paciente e segurança → 7 corpos → o que saiu na pesquisa → chakras → plano à medida → guardar na ficha. */
import { NIVEIS, CORPOS, CHAKRAS, ALERTAS, ACHADOS, TECNICAS, TEXTO_PACIENTE, CAUSAS_40, NIVEIS_ABERTURA, faixaChakra, nivelDePct, MODALIDADES, MSG_ANTES_DISTANCIA, MSG_DEPOIS_DISTANCIA, PRE_CONSULTA, PRE_TITULO, PRE_DESCRICAO, PRE_FORM_ID, SEG_FORM, SEG_FORM_ID, SEG_TITULO, SEG_DESCRICAO, MSG_CONSCIENCIA, DICAS_VIBRACAO } from './apometria-dados.js';

const TENANT = 'hikari-terapias';
const PASSOS = ['Paciente', 'Corpos', 'Energias', 'Chakras', 'Plano', 'Sessão', 'Guardar'];
const COACH = [
  'Prepara o espaço e a pessoa. Se ainda não enviaste, manda o questionário de pré-consulta: as respostas entram aqui sozinhas e preenchem os sinais de cuidado. Escolhe presencial ou à distância e confirma o consentimento.',
  'Faz a pesquisa com o pêndulo: um corpo de cada vez, do físico ao átmico (carinha ou %). Começa o tratamento pelo corpo que ficar mais fraco. Se a pessoa estiver à distância, trabalha sobre o nome (ou a fotografia).',
  'Pesquisa as energias numeradas de 1 a 40, como já fazes. Assinala só o que o pêndulo confirmou. Em dúvida, volta a perguntar.',
  'Mede o Bovis inicial, a % de abertura de cada chakra (1 a 9) e o nível de abertura de caminhos. Os chakras mais fechados dizem por onde começar.',
  'Revê o plano. Poucas técnicas bem feitas valem mais do que muitas. Se houver sinais de cuidado, mantém só o que é suave.',
  'Hora de trabalhar. Segue a técnica atual, marca os passos e passa à seguinte. Vai devagar. No fim, aterra sempre a pessoa.',
  'Regista, compara com a vez anterior e envia a mensagem. À distância, faz o acompanhamento passadas 24 a 48 horas.'
];
const coluna = (v) => (NIVEIS.find((n) => n.v === v) || { cor: '#d1d5db' }).cor;
function mapaSvg(corpos) {
  const ord = ['atmico', 'budico', 'mental-sup', 'mental-inf', 'astral', 'etereo', 'fisico'];
  const el = ord.map((id, i) => { const rx = 118 - i * 15, ry = 150 - i * 19; const v = corpos[id]; return `<ellipse cx="130" cy="160" rx="${rx}" ry="${ry}" fill="${v == null ? '#f3f4f6' : coluna(v)}" fill-opacity="${v == null ? 1 : .55}" stroke="#fff" stroke-width="2"/>`; }).join('');
  return `<svg viewBox="0 0 260 320" style="width:100%;max-width:260px;display:block;margin:6px auto;" role="img" aria-label="Mapa dos 7 corpos">${el}<g>${ord.map((id, k) => { const c = CORPOS.find((x) => x.id === id); return `<text x="130" y="${160 - (150 - k * 19) + 13}" text-anchor="middle" font-size="9" font-weight="600" fill="#111">${c.n}. ${c.nome.replace(/ \(.*\)/, '')}</text>`; }).join('')}</g></svg><div style="text-align:center;font-size:.78rem;">${NIVEIS.map((n) => `<span style="margin:0 6px;"><span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${n.cor};"></span> ${n.rotulo}</span>`).join('')}</div>`;
}

export function renderPesquisaIntegrada(main, ctx) {
  if (ctx.tenantId !== TENANT) { main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica.</p></div>'; return; }
  const esc = ctx.escapeHtml;
  let cic = { ciclos: [] }; let seg = null; let escN = false; let pre = null; let pacs = []; let hist = []; let meus = {}; let inicioSessao = 0; let tecAtual = 0;
  let S, passo;
  const novo = () => ({ pac: null, alertas: {}, primeira: false, corpos: {}, achados: {}, chakras: {}, escolhidas: null, notas: '', bovisIni: '', bovisFin: '', causas: {}, chakraPct: {}, corpoPct: {}, caminhos: null, modo: 'presencial', check: {}, testemunho: '', hora: '', feitas: {}, passosFeitos: {} });
  S = novo(); passo = 0;

  const rt = (s) => esc(String(s).split('[NOME]').join(S.pac ? S.pac.fullName : '(nome da pessoa)')).split('\n').map((l) => l.startsWith('🗣️') ? `<div style="margin:3px 0;padding:6px 8px;background:#eef4ff;border-left:3px solid #1e3a5f;border-radius:6px;font-style:italic;">${l}</div>` : `<div style="margin:2px 0;">${l}</div>`).join('');
  const corpoNome = (id) => (CORPOS.find((c) => c.id === id) || {}).nome || id;
  const nivel = (v) => NIVEIS.find((n) => n.v === v) || NIVEIS[0];
  const graves = () => ALERTAS.filter((a) => a.grave && S.alertas[a.id]);
  const urgente = () => ALERTAS.some((a) => a.urgente && S.alertas[a.id]);
  const delicado = () => ALERTAS.some((a) => S.alertas[a.id] && ['sens', 'medo', 'menor', 'gravida'].includes(a.id));

  /* ───── pré-consulta: respostas do paciente ───── */
  const pontos = (v) => { const m = /^\s*(\d)/.exec(String(v == null ? '' : v)); return m ? +m[1] : null; };
  const DIA = 864e5;
  const cur = () => { const l = cic.ciclos; const c = l[l.length - 1]; return c && !c.fechado ? c : null; };
  const nFeitas = (c) => (c ? c.consultas.filter((x) => x.feita).length : 0);
  const ultimaFeita = (c) => (c ? c.consultas.filter((x) => x.feita).reduce((m, x) => Math.max(m, x.data || 0), 0) : 0);
  function refPre() { const c = cur(); if (c) { const prev = cic.ciclos.slice(0, -1).reduce((m, k) => Math.max(m, ultimaFeita(k)), 0); return prev; } return hist[0] ? hist[0].t || 0 : 0; }
  const preValida = () => !!(pre && pre.estado === 'respondido' && (!pre.quando || pre.quando > refPre()));
  const segValida = () => !!(seg && seg.estado === 'respondido' && (!seg.quando || seg.quando >= ultimaFeita(cur()) - DIA));
  function analiseSeg() {
    if (!segValida()) return null; const r = seg.resp || {}; const linhas = []; let soma = 0; let n = 0; let reac = false; let quer = false; const txt = [];
    SEG_FORM.forEach((q) => { const v = r[q.id]; if (v == null || v === '') return;
      if (q.medir) { const sc = pontos(v); if (sc != null) { linhas.push({ curto: q.curto, v: String(v).replace(/^\s*\d\s*·\s*/, ''), sc }); soma += sc; n++; } }
      else if (q.tipo === 'sim_nao') { const sim = /^sim/i.test(String(v)); if (q.curto === 'Reações') reac = sim; else quer = sim; }
      else txt.push(q.curto + ': ' + v); });
    return { linhas, media: n ? soma / n : null, reac, quer, txt };
  }
  function analisePre() {
    if (!preValida()) return null;
    const r = pre.resp || {}; const alertas = {}; const grupo = {}; const sug = {};
    PRE_CONSULTA.forEach((q) => {
      const v = r[q.id]; if (v == null || v === '') return;
      if (q.tipo === 'sim_nao') { if (q.alerta && /^sim/i.test(String(v))) alertas[q.alerta] = true; return; }
      if (q.tipo !== 'opcao') return;
      const sc = pontos(v); if (sc == null) return;
      if (q.alerta && sc >= (q.alertaMin || 2)) alertas[q.alerta] = true;
      if (q.corpo) (grupo[q.corpo] = grupo[q.corpo] || []).push(sc);
      if (sc >= 2) (q.causas || []).forEach((n) => { sug[n] = Math.max(sug[n] || 0, sc); });
    });
    const dicas = {}; Object.entries(grupo).forEach(([id, a]) => { const m = a.reduce((x, y) => x + y, 0) / a.length; dicas[id] = m < 0.5 ? 0 : m < 1.25 ? 1 : m < 2 ? 2 : 3; });
    const motivo = PRE_CONSULTA.filter((q) => q.tipo === 'area' && /motivo|Desde quando/.test(q.label)).map((q) => (r[q.id] ? `${q.label} ${r[q.id]}` : '')).filter(Boolean).join('\n');
    const qc = PRE_CONSULTA.find((x) => x.consentimento); const consentimento = !!(qc && /^sim/i.test(String(r[qc.id] || '')));
    const qn = PRE_CONSULTA.filter((x) => x.tipo === 'area' && /nome completo/i.test(x.label)).pop(); const assinatura = qn ? String(r[qn.id] || '') : '';
    return { alertas, dicas, sug, motivo, consentimento, assinatura };
  }
  function aplicarPre() {
    const a = analisePre(); if (!a) return;
    Object.keys(a.alertas).forEach((k) => { S.alertas[k] = true; });
    if (!S.notas && a.motivo) S.notas = 'Pré-consulta: ' + a.motivo;
    S.escolhidas = null;
  }
  function recalcAchados() {
    const novo = {};
    CAUSAS_40.forEach((c) => { if (S.causas[c.n]) { const d = ACHADOS.find((x) => x.id === c.cat); if (d && !novo[c.cat]) novo[c.cat] = S.achados[c.cat] || { n: 1, corpos: d.corpos.slice(), sub: [] }; } });
    S.achados = novo;
  }
  /* ───── plano sugerido à medida ───── */
  function sugerir() {
    const pont = {};
    Object.entries(S.achados).forEach(([id, a]) => {
      const def = ACHADOS.find((x) => x.id === id); if (!def) return;
      def.tecnicas.forEach((t) => { pont[t] = (pont[t] || 0) + (a.n || 1) * 2; });
    });
    const fracos = Object.values(S.corpos).filter((v) => v >= 2).length;
    if (fracos) { pont.reiki = (pont.reiki || 0) + fracos; pont.chakras = (pont.chakras || 0) + 1; }
    const mu = Object.values(S.chakras).filter((v) => v >= 2).length; if (mu) pont.chakras = (pont.chakras || 0) + mu;
    const bloqueada = (t) => { const d = TECNICAS.find((x) => x.id === t); return d && d.forte && (graves().length || delicado()); };
    const ord = Object.entries(pont).filter(([t]) => !bloqueada(t) && TECNICAS.some((x) => x.id === t && !x.fixa && x.id !== 'pesquisa')).sort((a, b) => b[1] - a[1]).map(([t]) => t);
    const max = delicado() || S.primeira ? 3 : 4;
    return { principais: ord.slice(0, max), alternativas: ord.slice(max), bloqueadas: Object.keys(pont).filter(bloqueada) };
  }
  const fixas = (pos) => TECNICAS.filter((t) => t.fixa === pos).map((t) => t.id);
  const planoAtual = () => { if (!S.escolhidas) S.escolhidas = sugerir().principais.slice(); return fixas('inicio').concat(S.escolhidas, fixas('fim')); };

  /* ───── relatórios ───── */
  function textoTerapeuta() {
    const L = [`ATENDIMENTO GUIADO — ${S.pac ? S.pac.fullName : ''} — ${new Date().toLocaleDateString('pt-PT')}`, ''];
    { const c = cur(); if (c) { const f = Math.min(nFeitas(c) + 1, c.total); const x = c.consultas[f - 1]; L.push(`Consulta ${f} de ${c.total}${c.total === 1 ? ' (única)' : ''} — ${x && x.pago ? 'paga' : 'por pagar'}${x && x.valor ? ' (' + x.valor + ' €)' : ''}`, ''); } }
    { const sg = analiseSeg(); if (sg) { L.push('== Como se sentiu desde a última sessão ==', ...sg.linhas.map((l) => `${l.curto}: ${l.v}`), sg.reac ? 'Teve reações depois da sessão.' : '', ...sg.txt, sg.quer ? 'Pediu para falar contigo antes da próxima consulta.' : '', ''); } }
    L.push('Alertas assinalados: ' + (ALERTAS.filter((a) => S.alertas[a.id]).map((a) => a.texto).join('; ') || 'nenhum'));
    L.push('', '== 7 corpos ==');
    CORPOS.forEach((c) => L.push(`${c.n}. ${c.nome}: ${nivel(S.corpos[c.id] || 0).rotulo}`));
    L.push('', '== Energias detetadas (1 a 40) ==');
    const det = CAUSAS_40.filter((c) => S.causas[c.n]); L.push(det.length ? det.map((c) => `${c.n}. ${c.nome}`).join('\n') : 'Nada assinalado.');
    { const an = analisePre(); if (an) { const sug = Object.keys(an.sug).map(Number); const conf = sug.filter((n) => S.causas[n]); const so = sug.filter((n) => !S.causas[n]); const so2 = det.filter((c) => !sug.includes(c.n)).map((c) => c.n);
      L.push('', '== Cruzamento com o questionário de pré-consulta ==', `Termo de consentimento: ${an.consentimento ? 'aceite' + (an.assinatura ? ' (assinado: ' + an.assinatura + ')' : '') : 'NÃO aceite'}`, `Confirmadas pelo pêndulo e indicadas pelo paciente: ${conf.join(', ') || 'nenhuma'}`, `Indicadas pelo paciente e não confirmadas: ${so.join(', ') || 'nenhuma'}`, `Detetadas só pelo pêndulo: ${so2.join(', ') || 'nenhuma'}`); } }
    L.push('', '== Detalhe por tipo ==');
    const ac = Object.entries(S.achados);
    ac.forEach(([id, a]) => { const d = ACHADOS.find((x) => x.id === id); L.push(`• ${d.nome} — ${nivel(a.n).rotulo}${a.corpos && a.corpos.length ? ' · corpos: ' + a.corpos.map(corpoNome).join(', ') : ''}${a.sub && a.sub.length ? ' · ' + a.sub.join(', ') : ''}`); });
    const chp = Object.entries(S.chakraPct).filter(([, v]) => v != null);
    if (chp.length) { L.push('', '== Chakras (% de abertura) =='); chp.forEach(([i, v]) => L.push(`${+i + 1}. ${CHAKRAS[i]}: ${v}% — ${faixaChakra(v).rotulo}`)); }
    if (S.caminhos != null) L.push('', 'Abertura de caminhos: ' + NIVEIS_ABERTURA[S.caminhos]);
    L.push('', '== Plano da sessão ==');
    planoAtual().forEach((t, i) => { const d = TECNICAS.find((x) => x.id === t); L.push(`${i + 1}. ${d.nome}`); });
    if (S.bovisIni || S.bovisFin) L.push('', `Bovis: ${S.bovisIni || '—'} → ${S.bovisFin || '—'}`);
    if (S.notas) L.push('', 'Notas: ' + S.notas);
    return L.join('\n');
  }
  function textoPaciente() {
    const nome = S.pac ? String(S.pac.fullName).split(' ')[0] : '';
    const tem = Object.entries(S.achados).map(([id]) => ACHADOS.find((x) => x.id === id)).filter(Boolean);
    const L = [`Olá${nome ? ' ' + nome : ''}! 🌿`, '', TEXTO_PACIENTE.intro, '', '🕊️ Eu sou um intercessor: peço e trabalho para o teu bem, mas a mudança que se mantém é a tua. Atraímos o que vibramos, por isso a tua parte é cuidar do teu estado todos os dias.', ''];
    const fracos = CORPOS.filter((c) => (S.corpos[c.id] || 0) >= 2);
    if (fracos.length) L.push('O que a pesquisa mostrou que precisa de mais atenção: ' + fracos.map((c) => c.nome.replace(/ \(.*\)/, '').toLowerCase()).join(', ') + '.', '');
    if (tem.length) { L.push('Foram sentidos sinais de:'); tem.forEach((d) => L.push(`• ${d.nome}: ${d.simples}`)); L.push(''); }
    const casa = planoAtual().map((t) => TECNICAS.find((x) => x.id === t)).filter((d) => d.dur === 'em casa' || ['oracao', 'meditacao'].includes(d.id));
    if (casa.length) { L.push('Para fazeres em casa:'); casa.forEach((d) => L.push(`• ${d.nome}`)); L.push(''); }
    L.push('🌟 A tua parte, para não voltares ao mesmo:');
    tem.slice(0, 3).forEach((d) => { const t = DICAS_VIBRACAO.achados[d.id]; if (t) L.push(t); });
    fracos.slice(0, 2).forEach((c) => { const d = DICAS_VIBRACAO.corpos[c.id]; if (d) L.push(d); });
    DICAS_VIBRACAO.gerais.slice(0, 4).forEach((d) => L.push(d));
    L.push('', DICAS_VIBRACAO.fecho, '', TEXTO_PACIENTE.fim);
    return L.join('\n');
  }

  /* ───── ecrãs ───── */
  const barra = () => `<div style="display:flex;gap:4px;margin:6px 0 14px;">${PASSOS.map((p, i) => `<div style="flex:1;text-align:center;font-size:.72rem;padding:6px 2px;border-radius:8px;${i === passo ? 'background:#1e3a5f;color:#fff;font-weight:700;' : i < passo ? 'background:#e7eef7;color:#1e3a5f;' : 'background:#f1f1f1;color:#888;'}">${i + 1}<br>${p}</div>`).join('')}</div>`;
  const nav = (ok = true, textoSeg = 'Seguinte →') => `<div class="row" style="gap:8px;margin-top:14px;">${passo > 0 ? '<button class="ghost" id="pi-ant" style="flex:1">← Anterior</button>' : ''}${passo < PASSOS.length - 1 ? `<button class="primary" id="pi-seg" style="flex:2" ${ok ? '' : 'disabled'}>${textoSeg}</button>` : ''}</div>`;
  const botoesNivel = (nome, atual) => `<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;">${NIVEIS.map((n) => `<button data-nv="${nome}" data-v="${n.v}" style="border-radius:10px;padding:8px 2px;border:2px solid ${atual === n.v ? n.cor : '#ddd'};background:${atual === n.v ? n.cor + '22' : '#fff'};font-size:.78rem;cursor:pointer;line-height:1.25;">${n.carinha}<br>${n.rotulo}</button>`).join('')}</div>`;

  function ver() {
    const coach = `<div style="background:#eef6ff;border-left:4px solid #1e3a5f;padding:8px 12px;border-radius:8px;margin:0 0 12px;font-size:.88rem;">💡 <b>O que fazer agora:</b> ${esc(COACH[passo])}</div>`;
    const h = [`<div class="row" style="gap:8px;flex-wrap:wrap;margin-bottom:6px;"><h2 style="margin:0;">🧭 Atendimento Guiado</h2><button class="ghost" id="pi-novo">↺ Recomeçar</button></div>`, barra(), coach];
    if (passo === 0) h.push(passo0());
    else if (passo === 1) h.push(passo1());
    else if (passo === 2) h.push(passo2());
    else if (passo === 3) h.push(passo3());
    else if (passo === 4) h.push(passo4());
    else if (passo === 5) h.push(passoSessao());
    else h.push(passo6());
    main.innerHTML = h.join('');
    ligar();
  }

  function cartaoCiclo() {
    if (!S.pac) return ''; const c = cur(); const f = nFeitas(c);
    const picker = (tit) => `<div style="font-size:.88rem;margin:4px 0 8px;">${tit}</div><div style="display:flex;flex-wrap:wrap;gap:6px;">${[1, 2, 3, 4, 5, 6, 7, 8].map((n) => `<button class="ghost" data-ncons="${n}" style="min-width:64px;">${n === 1 ? 'Única' : n}</button>`).join('')}</div>`;
    if (!c || escN) return `<div class="card" style="margin:10px 0;background:#fffaf0;"><b>📆 Percurso de consultas</b>${picker(escN ? 'Quantas consultas ao todo? (podes alterar quando quiseres)' : 'Quantas consultas indicou o pêndulo para esta pessoa? <i>Única</i> = uma só consulta.')}${escN ? '<button class="ghost" id="pi-cic-canc" style="margin-top:8px;">Cancelar</button>' : ''}</div>`;
    const dias = f ? Math.floor((Date.now() - ultimaFeita(c)) / DIA) : 0;
    const completo = f >= c.total; const passou = f > 0 && f < c.total && dias > 30;
    const aviso = completo ? `<div style="margin:8px 0;padding:8px;border-radius:8px;background:#ecfdf5;font-size:.85rem;">✅ Percurso concluído. Se a pessoa voltou, começa um <b>novo percurso</b>: pede-se um novo questionário de pré-consulta.</div>` : passou ? `<div style="margin:8px 0;padding:8px;border-radius:8px;background:#fef3c7;font-size:.85rem;">⏳ Passaram <b>${dias} dias</b> desde a última consulta. Se a pessoa está a recomeçar, abre um <b>novo percurso</b>.</div>` : '';
    return `<div class="card" style="margin:10px 0;background:#fffaf0;"><b>📆 Percurso: consulta ${Math.min(f + 1, c.total)} de ${c.total}${c.total === 1 ? ' (única)' : ''}</b>
      <div style="margin:8px 0;display:grid;gap:6px;">${c.consultas.map((x, i) => `<div style="display:flex;gap:8px;align-items:center;font-size:.9rem;"><span style="width:26px;height:26px;border-radius:50%;background:${x.feita ? '#166534' : i === f ? '#1e3a5f' : '#e5e7eb'};color:#fff;display:inline-flex;align-items:center;justify-content:center;font-weight:700;">${x.feita ? '✓' : i + 1}</span><span style="flex:1;">${x.feita ? 'Feita em ' + ctx.dataPT(x.data) : i === f ? 'Esta consulta' : 'Por marcar'}</span><input type="number" inputmode="decimal" data-val="${i}" value="${x.valor || ''}" placeholder="€" style="width:64px;padding:4px;"><button class="ghost" data-pago="${i}" style="padding:4px 10px;${x.pago ? 'border-color:#166534;color:#166534;' : ''}">${x.pago ? '💶 Paga' : '💶 Por pagar'}</button></div>`).join('')}</div>${aviso}${(() => { const v = c.consultas.reduce((t, x) => t + (+x.valor || 0), 0); const rec = c.consultas.reduce((t, x) => t + (x.pago ? +x.valor || 0 : 0), 0); return v ? `<div style="font-size:.85rem;margin:6px 0;">💶 Total <b>${v} €</b> · recebido <b>${rec} €</b> · por receber <b>${v - rec} €</b></div>` : ''; })()}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;"><button class="ghost" id="pi-cic-alt">✏️ Alterar nº</button><button class="ghost" id="pi-cic-novo">🔁 Novo percurso</button></div></div>`;
  }
  function cartaoConsc() {
    return `<div class="card" style="margin:10px 0;background:#faf5ff;"><b>🕊️ Mensagem de consciência</b><div style="font-size:.88rem;margin:4px 0 8px;">Explica ao paciente que és um intercessor, que a mudança é dele e como atraímos pela nossa vibração. Envia antes da 1.ª consulta.</div><div style="display:grid;gap:6px;"><button class="ghost" id="pi-con-wa">📱 Enviar por WhatsApp</button><button class="ghost" id="pi-con-ver">👁️ Ler / copiar</button></div><pre id="pi-con-txt" style="display:none;white-space:pre-wrap;font-family:inherit;font-size:.85rem;background:#fff;padding:10px;border-radius:8px;margin-top:8px;">${esc(MSG_CONSCIENCIA)}</pre></div>`;
  }
  function cartaoSeg() {
    if (!S.pac) return ''; const c = cur(); if (!(nFeitas(c) >= 1 || (!c && hist.length))) return '';
    const a = analiseSeg(); const m = a && a.media != null ? a.media : null;
    const car = m == null ? '' : m < 1 ? '😟' : m < 1.7 ? '😐' : m < 2.4 ? '🙂' : '😄';
    const corpo = a ? `<div style="font-size:.88rem;margin:6px 0;">${car} <b>Respondeu${seg.quando ? ' em ' + ctx.dataPT(seg.quando) : ''}.</b>${a.linhas.map((l) => `<div>• ${esc(l.curto)}: ${esc(l.v)}</div>`).join('')}${a.reac ? '<div>• Teve reações depois da sessão</div>' : ''}${a.txt.map((t) => `<div class="muted">${esc(t)}</div>`).join('')}${a.quer ? '<div style="color:#b45309;"><b>📞 Quer falar contigo.</b></div>' : ''}</div>` : seg && seg.estado === 'pendente' ? '<div style="font-size:.88rem;margin:4px 0 8px;">⏳ Enviado, ainda não respondido.</div>' : '<div style="font-size:.88rem;margin:4px 0 8px;">Opcional: pergunta à pessoa como se sentiu desde a última sessão.</div>';
    return `<div class="card" style="margin:10px 0;background:#f7fff9;"><b>💬 Como se tem sentido</b>${corpo}<div style="display:grid;gap:6px;"><button class="ghost" id="pi-seg-env">📨 ${a || (seg && seg.id) ? 'Enviar de novo' : 'Enviar ficha de acompanhamento'}</button>${seg && seg.estado === 'pendente' && seg.id ? '<button class="ghost" id="pi-seg-reenv">📱 Reenviar o link</button>' : ''}<button class="ghost" id="pi-seg-ref">🔄 Ver se já respondeu</button></div></div>`;
  }
  function cartaoPre() {
    if (!S.pac) return '';
    const a = analisePre(); const f = nFeitas(cur()); const opc = f > 0;
    const velho = pre && pre.estado === 'respondido' && !a;
    const estado = a ? `✅ <b>Respondido${pre.quando ? ' em ' + ctx.dataPT(pre.quando) : ''}.</b> Os sinais de cuidado foram assinalados automaticamente e as respostas vão cruzar com a tua pesquisa (⭐).` : pre && pre.estado === 'pendente' ? '⏳ <b>Enviado, ainda não respondido.</b>' : 'Ainda não enviaste o questionário de pré-consulta a esta pessoa.';
    return `<div class="card" style="margin:10px 0;background:#f5f9ff;"><b>📨 Pré-consulta</b> <span style="font-size:.75rem;padding:2px 8px;border-radius:99px;background:${opc ? '#e5e7eb' : '#fde68a'};">${opc ? 'opcional' : 'recomendado antes da 1.ª consulta'}</span><div style="font-size:.88rem;margin:4px 0 8px;">${velho ? '🕓 O último questionário é de ' + ctx.dataPT(pre.quando) + ' (de um percurso anterior). Envia um novo para atualizar.' : estado}</div><div style="display:grid;gap:6px;">${!a && !(pre && pre.estado === 'pendente') ? '<button class="primary" id="pi-pre-env">📨 Enviar o questionário de pré-consulta</button>' : ''}${pre && pre.estado === 'pendente' && pre.id ? '<button class="ghost" id="pi-pre-reenv">📱 Reenviar o link</button>' : ''}${a ? '<button class="ghost" id="pi-pre-novo">➕ Enviar um novo questionário</button>' : ''}<button class="ghost" id="pi-pre-ref">🔄 Ver se já respondeu</button></div></div>`;
  }
  function passo0() {
    const alerta = graves().length ? `<div class="card" style="border:2px solid #dc2626;background:#fef2f2;margin:10px 0;"><b>⚠️ Atenção.</b> ${urgente() ? '<b>Se há risco para a vida, liga já ao 112 ou ao SNS 24 (808 24 24 24).</b> ' : ''}Com estes sinais <b>não é sugerido o desdobramento, nem as técnicas mais fortes</b>. Aconselha acompanhamento médico ou psicológico e usa só técnicas suaves (Reiki, oração, meditação).</div>` : '';
    const mod = MODALIDADES.find((m) => m.id === S.modo);
    const blocoMod = `<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:0 0 8px;">${MODALIDADES.map((m) => `<button data-modo="${m.id}" style="padding:12px 4px;border-radius:12px;border:2px solid ${S.modo === m.id ? '#1e3a5f' : '#ddd'};background:${S.modo === m.id ? '#e7eef7' : '#fff'};font-weight:700;cursor:pointer;">${m.nome}</button>`).join('')}</div>
      <div class="card" style="margin-bottom:8px;"><b>Antes de começar</b>${mod.checklist.map((c, i) => `<label style="display:flex;gap:8px;align-items:center;margin-top:6px;font-size:.9rem;"><input type="checkbox" data-chk="${S.modo}${i}" ${S.check[S.modo + i] ? 'checked' : ''} style="width:20px;height:20px;"> ${esc(c)}</label>`).join('')}
      ${S.modo === 'distancia' ? `<label style="display:block;margin-top:8px;font-size:.88rem;">Testemunho (nome completo, data de nascimento, fotografia…)<input id="pi-test" value="${esc(S.testemunho)}" style="width:100%"></label><label style="display:block;margin-top:6px;font-size:.88rem;">Hora combinada<input id="pi-hora" type="time" value="${esc(S.hora)}"></label><button class="ghost" id="pi-wa-antes" style="margin-top:8px;width:100%;">📱 Enviar à pessoa as instruções para a sessão à distância</button>` : ''}</div>`;
    return `<p class="muted" style="margin:0 0 8px;">Escolhe o paciente e assinala os sinais de cuidado. Isto ajuda a app a sugerir só o que é adequado a esta pessoa.</p>
      ${S.pac ? `<div class="card" style="display:flex;gap:8px;align-items:center;"><b style="flex:1;color:#166534;">✔ ${esc(S.pac.fullName)}</b><button class="ghost" id="pi-trocar">Trocar</button></div>${cartaoCiclo()}${cartaoPre()}${cartaoSeg()}${cartaoConsc()}` : `<input id="pi-busca" type="search" placeholder="🔍 Procurar paciente…" style="width:100%;margin-bottom:8px;"><div id="pi-pacs" style="max-height:40vh;overflow:auto;display:grid;gap:6px;margin-bottom:8px;"></div>`}
      ${blocoMod}
      <label style="display:flex;gap:8px;align-items:center;margin-bottom:8px;"><input type="checkbox" id="pi-prim" ${S.primeira ? 'checked' : ''} style="width:20px;height:20px;"> É a 1.ª consulta (limita as etiquetas a 10 e os tratamentos intensos)</label>
      <h3 style="margin:12px 0 6px;">Sinais de cuidado</h3>
      ${ALERTAS.map((a) => `<label style="display:flex;gap:8px;align-items:flex-start;margin-bottom:6px;font-size:.92rem;"><input type="checkbox" data-al="${a.id}" ${S.alertas[a.id] ? 'checked' : ''} style="width:20px;height:20px;flex-shrink:0;margin-top:2px;"> <span>${esc(a.texto)}</span></label>`).join('')}
      ${alerta}${S.pac && hist.length ? `<div class="card" style="margin-top:10px;"><b>📚 ${hist.length} pesquisa(s) anterior(es) desta pessoa.</b> No fim vais ver a comparação.</div>` : ''}
      ${nav(!!S.pac, 'Seguinte → os 7 corpos')}`;
  }
  function passo1() {
    return `<p class="muted" style="margin:0 0 4px;">Com o pêndulo, vê como está cada corpo. Toca na carinha que corresponde.${S.modo === 'distancia' ? ' À distância: pesquisa sobre o nome ou a fotografia.' : ''}</p><div class="card" style="margin-bottom:8px;">${mapaSvg(S.corpos)}</div>` +
      CORPOS.map((c) => `<div class="card" style="margin-bottom:8px;"><div class="row"><b>${c.emoji} ${c.n}. ${esc(c.nome)}</b></div><div class="muted" style="font-size:.82rem;margin:2px 0 8px;">${esc(c.sobre)} <i>Sinais: ${esc(c.sinais)}</i></div>${(() => { const a = analisePre(); return a && a.dicas[c.id] != null ? `<div style="font-size:.8rem;margin-bottom:6px;color:${nivel(a.dicas[c.id]).cor};">📨 Pelo questionário: ${nivel(a.dicas[c.id]).carinha} ${nivel(a.dicas[c.id]).rotulo} (confirma com o pêndulo)</div>` : ''; })()}${botoesNivel('corpo:' + c.id, S.corpos[c.id] ?? -1)}<div style="margin-top:6px;font-size:.82rem;">ou % de vibração: <input type="number" min="0" max="100" data-cpct="${c.id}" value="${S.corpoPct[c.id] ?? ''}" placeholder="—" style="width:76px;"> %</div></div>`).join('') + nav();
  }
  function passo2() {
    const nDet = Object.values(S.causas).filter(Boolean).length; const an = analisePre(); const sug = an ? an.sug : {}; const nSug = Object.keys(sug).length;
    const cats = Object.keys(S.achados);
    return `<p class="muted" style="margin:0 0 6px;">Pesquisa cada número com o pêndulo e marca só os que confirmares. <b>${nDet}</b> de ${CAUSAS_40.length} detetadas.${nSug ? ` <b>⭐ ${nSug}</b> foram sugeridas pelas respostas do paciente: confirma-as com o pêndulo.` : ''}</p>
      <div class="card" style="margin-bottom:10px;">${CAUSAS_40.map((c) => `<label style="display:flex;gap:8px;align-items:center;padding:7px 0;border-bottom:1px solid #f0f0f0;cursor:pointer;"><span style="width:26px;height:26px;border-radius:50%;background:${S.causas[c.n] ? '#1e3a5f' : '#eef2ee'};color:${S.causas[c.n] ? '#fff' : '#333'};display:flex;align-items:center;justify-content:center;font-size:.72rem;font-weight:700;flex-shrink:0;">${c.n}</span><input type="checkbox" data-causa="${c.n}" ${S.causas[c.n] ? 'checked' : ''} style="width:22px;height:22px;flex-shrink:0;"><span style="flex:1;font-size:.92rem;">${esc(c.nome)}</span>${sug[c.n] ? '<span title="Sugerida pelo questionário" style="font-size:.85rem;">⭐</span>' : ''}</label>`).join('')}</div>
      ${cats.length ? `<h3 style="margin:10px 0 6px;">Detalhe do que saiu</h3><p class="muted" style="margin:0 0 6px;font-size:.85rem;">Indica a intensidade, os corpos afetados e o tipo, para o plano ficar à medida.</p>` : ''}` +
      cats.map((id) => { const d = ACHADOS.find((x) => x.id === id); const a = S.achados[id]; const nums = CAUSAS_40.filter((c) => c.cat === id && S.causas[c.n]).map((c) => c.n).join(', ');
        return `<div class="card" style="margin-bottom:8px;border:2px solid #1e3a5f;"><b>${esc(d.nome)}</b> <span class="muted" style="font-size:.78rem;">(n.º ${nums})</span><div style="margin-top:8px;">${botoesNivel('ach:' + id, a.n)}</div>
          <div style="margin-top:8px;font-size:.82rem;"><b>Corpos afetados:</b><br>${CORPOS.map((c) => `<label style="display:inline-flex;gap:4px;align-items:center;margin:2px 8px 2px 0;"><input type="checkbox" data-ac-c="${id}|${c.id}" ${(a.corpos || []).includes(c.id) ? 'checked' : ''} style="width:16px;height:16px;">${c.emoji} ${esc(c.nome.replace(/ \(.*\)/, ''))}</label>`).join('')}</div>
          ${d.subs ? `<div style="margin-top:6px;font-size:.82rem;"><b>Tipo:</b><br>${d.subs.map((x) => `<label style="display:flex;gap:6px;align-items:center;margin:2px 0;"><input type="checkbox" data-ac-s="${id}|${esc(x)}" ${(a.sub || []).includes(x) ? 'checked' : ''} style="width:16px;height:16px;">${esc(x)}</label>`).join('')}</div>` : ''}</div>`; }).join('') + nav();
  }
  function passo3() {
    return `<div class="card" style="margin-bottom:10px;"><b>⚡ Bovis inicial</b><div class="muted" style="font-size:.82rem;margin:2px 0 6px;">Mede agora. O final mede-se só no fim, depois de aplicar tudo.</div><input id="pi-bi2" type="number" placeholder="ex: 6500" value="${esc(S.bovisIni)}" style="width:100%"></div>
      <div class="card" style="margin-bottom:10px;"><b>🌈 Chakras 1 a 9 — % de abertura</b><p class="muted" style="font-size:.8rem;margin:4px 0 8px;">100% = totalmente aberto. 70–89% equilibrado · 90–100% muito aberto (aterrar) · 40–69% pouco aberto · abaixo de 40% muito fechado. É uma escala de apoio.</p>
      ${CHAKRAS.map((c, i) => { const f = faixaChakra(S.chakraPct[i]); return `<div style="display:flex;align-items:center;gap:8px;margin-bottom:8px;"><div style="flex:1;font-weight:700;font-size:.92rem;">${i + 1} — ${esc(c)}<div style="font-size:.75rem;font-weight:400;color:${f.cor};min-height:1em;">${esc(f.rotulo)}</div></div><input type="number" min="0" max="100" data-chk-pct="${i}" value="${S.chakraPct[i] ?? ''}" placeholder="—" style="width:86px;font-size:1.05rem;"> %</div>`; }).join('')}</div>
      <div class="card"><b>🚪 Nível de abertura de caminhos</b><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:8px;">${NIVEIS_ABERTURA.map((n, i) => `<button data-cam="${i}" style="padding:12px 4px;border-radius:12px;border:2px solid ${S.caminhos === i ? '#1e3a5f' : '#ddd'};background:${S.caminhos === i ? '#e7eef7' : '#fff'};font-weight:700;cursor:pointer;">${n}</button>`).join('')}</div></div>` + nav(true, 'Seguinte → o plano');
  }
  function passo4() {
    const sug = sugerir(); const plano = planoAtual();
    const cartao = (id, fixa) => {
      const d = TECNICAS.find((x) => x.id === id); const i = (S.escolhidas || []).indexOf(id);
      return `<div class="card" style="margin-bottom:8px;"><div class="row" style="gap:6px;"><b>${d.nome}</b><span class="muted" style="font-size:.78rem;">${esc(d.dur)}</span></div>
        ${d.limite && S.primeira ? `<div style="font-size:.8rem;color:#b45309;margin-top:4px;">📌 ${esc(d.limite)}</div>` : ''}
        ${d.nota ? `<div style="font-size:.8rem;color:#b45309;margin-top:4px;">⚠️ ${esc(d.nota)}</div>` : ''}
        <details style="margin-top:6px;"><summary style="cursor:pointer;font-size:.85rem;">Ver passos</summary><ol style="margin:6px 0 0 18px;font-size:.88rem;">${d.passos.map((p) => `<li style="margin-bottom:6px;">${rt(p)}</li>`).join('')}</ol></details>
        ${fixa ? '' : `<div class="row" style="gap:6px;margin-top:8px;"><button class="ghost" data-up="${id}" ${i === 0 ? 'disabled' : ''}>▲</button><button class="ghost" data-dn="${id}" ${i === S.escolhidas.length - 1 ? 'disabled' : ''}>▼</button><button class="ghost" data-rm="${id}" style="color:#dc2626">Tirar</button></div>`}</div>`;
    };
    const fora = TECNICAS.filter((t) => !t.fixa && t.id !== 'pesquisa' && !S.escolhidas.includes(t.id));
    return `<p class="muted" style="margin:0 0 8px;">Plano à medida, pelo que saiu${delicado() || S.primeira ? ' e por ser uma pessoa a tratar com mais cuidado: poucas técnicas e só as mais suaves' : ''}. Podes mudar a ordem, tirar ou juntar.</p>
      ${sug.bloqueadas.length ? `<div class="card" style="background:#fef9e7;margin-bottom:8px;font-size:.85rem;">🛑 Não sugeridas por precaução: ${sug.bloqueadas.map((t) => esc((TECNICAS.find((x) => x.id === t) || {}).nome || t)).join(', ')}.</div>` : ''}
      <h3 style="margin:8px 0 6px;">Começo</h3>${fixas('inicio').map((i) => cartao(i, true)).join('')}
      <h3 style="margin:8px 0 6px;">Tratamento</h3>${S.escolhidas.map((i) => cartao(i, false)).join('') || '<p class="muted">Nenhuma técnica escolhida.</p>'}
      <h3 style="margin:8px 0 6px;">Fim</h3>${fixas('fim').map((i) => cartao(i, true)).join('')}
      ${fora.length ? `<details style="margin-top:10px;"><summary style="cursor:pointer;"><b>➕ Juntar outra técnica</b></summary><div style="display:grid;gap:6px;margin-top:6px;">${fora.map((t) => `<button class="ghost" data-add="${t.id}" style="text-align:left;" ${(t.forte && (graves().length)) ? 'disabled' : ''}>${t.nome}${t.forte ? ' ⚠️' : ''}</button>`).join('')}</div></details>` : ''}
      ${nav(true, 'Seguinte → fazer a sessão')}`;
  }
  function passoSessao() {
    const plano = planoAtual(); if (!inicioSessao) inicioSessao = Date.now();
    tecAtual = Math.min(tecAtual, plano.length - 1);
    const id = plano[tecAtual]; const d = TECNICAS.find((x) => x.id === id);
    const feitos = Object.keys(S.feitas).length;
    const lista = plano.map((t, i) => { const x = TECNICAS.find((y) => y.id === t); return `<button data-tec="${i}" style="border:none;background:${i === tecAtual ? '#1e3a5f' : S.feitas[t] ? '#dcfce7' : '#f1f1f1'};color:${i === tecAtual ? '#fff' : '#333'};border-radius:999px;padding:6px 10px;font-size:.78rem;white-space:nowrap;cursor:pointer;">${S.feitas[t] ? '✅ ' : ''}${i + 1}. ${x.nome.replace(/^\S+\s/, '')}</button>`; }).join('');
    const pf = S.passosFeitos[id] || {};
    const extra = id === 'etiquetas' ? `<button class="ghost" id="pi-etq" style="width:100%;margin-top:8px;">🎴 Abrir a Triagem — Pêndulo Hebraico (etiquetas e Bovis)</button>` : id === 'oracao' ? `<div class="muted" style="font-size:.85rem;margin-top:8px;">Escolhe a oração em 🙏 Orações e Salmos e envia o link à pessoa.</div>` : '';
    const dist = S.modo === 'distancia' && ['desdobra', 'implantes', 'acolher', 'vidas'].includes(id) ? `<div style="font-size:.85rem;color:#0369a1;margin-top:6px;">📡 À distância: trabalha sobre o nome${S.testemunho ? ' (' + esc(S.testemunho) + ')' : ''} e pede à pessoa para ficar quieta, de olhos fechados, a respirar devagar.</div>` : '';
    const min = Math.floor((Date.now() - inicioSessao) / 60000);
    return `<div style="height:8px;background:#e5e7eb;border-radius:9px;overflow:hidden;margin-bottom:6px;"><i style="display:block;height:100%;width:${Math.round(feitos / plano.length * 100)}%;background:#16a34a;"></i></div>
      <div class="muted" style="font-size:.8rem;margin-bottom:8px;">${feitos} de ${plano.length} feitas · ${min} min desde o início${S.modo === 'distancia' ? ' · 📡 à distância' : ''}</div>
      <div style="display:flex;gap:6px;overflow-x:auto;margin-bottom:10px;padding-bottom:4px;">${lista}</div>
      <div class="card" style="border:2px solid #1e3a5f;"><h3 style="margin:0 0 4px;">${d.nome}</h3><div class="muted" style="font-size:.8rem;">⏱️ ${esc(d.dur)}</div>
        ${d.nota ? `<div style="color:#b45309;font-size:.85rem;margin-top:6px;">⚠️ ${esc(d.nota)}</div>` : ''}${d.limite && S.primeira ? `<div style="color:#b45309;font-size:.85rem;margin-top:6px;">📌 ${esc(d.limite)}</div>` : ''}
        <div style="margin-top:10px;">${d.passos.map((p, i) => `<label style="display:flex;gap:10px;align-items:flex-start;margin-bottom:10px;font-size:1rem;"><input type="checkbox" data-pf="${id}|${i}" ${pf[i] ? 'checked' : ''} style="width:24px;height:24px;flex-shrink:0;margin-top:2px;"> <span style="flex:1;">${rt(p)}</span></label>`).join('')}</div>
        ${meus[id] ? `<div style="background:#f3f6fa;border-radius:10px;padding:10px;margin-top:6px;"><b>✍️ O teu comando</b><div style="white-space:pre-wrap;margin-top:4px;">${esc(meus[id])}</div></div>` : ''}${dist}${extra}
        <button class="primary" id="pi-feita" style="width:100%;min-height:54px;margin-top:12px;font-size:1.05rem;">${tecAtual < plano.length - 1 ? '✅ Feita. Passar à seguinte →' : '✅ Última técnica feita'}</button></div>
      <div class="row" style="gap:8px;margin-top:12px;"><button class="ghost" id="pi-ant" style="flex:1">← Plano</button><button class="primary" id="pi-seg" style="flex:2">Terminar → guardar</button></div>`;
  }
  function passo6() {
    const ant = hist[0];
    let comp = '';
    if (ant && ant.dados && ant.dados.corpos) {
      comp = `<div class="card" style="margin:8px 0;"><b>📈 Comparação com a pesquisa anterior (${ctx.dataPT(ant.t)})</b><div style="font-size:.88rem;margin-top:6px;">${CORPOS.map((c) => { const a = ant.dados.corpos[c.id], b = S.corpos[c.id]; if (a == null || b == null) return ''; const d = b - a; return `<div>${c.emoji} ${esc(c.nome.replace(/ \(.*\)/, ''))}: ${nivel(a).carinha} → ${nivel(b).carinha} ${d < 0 ? '✅ melhorou' : d > 0 ? '⚠️ piorou' : '= igual'}</div>`; }).join('')}</div></div>`;
    }
    return `<div class="card" style="margin-bottom:8px;"><b>🗺️ Mapa dos 7 corpos</b>${mapaSvg(S.corpos)}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:8px;"><label>Bovis inicial<input id="pi-bi" type="number" value="${esc(S.bovisIni)}" style="width:100%"></label><label>Bovis final<input id="pi-bf" type="number" value="${esc(S.bovisFin)}" style="width:100%"></label></div>
      <label>Notas da sessão<textarea id="pi-notas" rows="3" style="width:100%">${esc(S.notas)}</textarea></label>${comp}
      <details open style="margin:10px 0;"><summary><b>📋 Resumo para ti</b></summary><pre style="white-space:pre-wrap;font-family:inherit;font-size:.85rem;background:#f6f7f9;padding:10px;border-radius:8px;">${esc(textoTerapeuta())}</pre></details>
      <details style="margin:10px 0;"><summary><b>💌 Mensagem para o paciente (serena)</b></summary><pre id="pi-pt" style="white-space:pre-wrap;font-family:inherit;font-size:.85rem;background:#f6f7f9;padding:10px;border-radius:8px;">${esc(textoPaciente())}</pre></details>
      <div style="display:grid;gap:8px;"><button class="primary" id="pi-gravar">💾 Guardar na ficha do paciente</button><button class="ghost" id="pi-wa">📱 Enviar mensagem ao paciente por WhatsApp</button><button class="ghost" id="pi-copiar">📋 Copiar o resumo</button>${S.modo === 'distancia' ? '<button class="ghost" id="pi-wa-depois">📡 Mensagem de acompanhamento (à distância)</button>' : ''}</div>
      <div class="row" style="margin-top:12px;"><button class="ghost" id="pi-ant">← Anterior</button></div>`;
  }

  /* ───── ligações ───── */
  function ligar() {
    const q = (s) => main.querySelector(s);
    const on = (s, f) => { const e = q(s); if (e) e.onclick = f; };
    on('#pi-novo', async () => { if (await ctx.confirmar('Recomeçar?', 'O que não guardaste perde-se.', 'Recomeçar')) { S = novo(); passo = 0; hist = []; pre = null; seg = null; cic = { ciclos: [] }; escN = false; inicioSessao = 0; tecAtual = 0; ver(); } });
    on('#pi-ant', () => { passo = Math.max(0, passo - 1); ver(); window.scrollTo(0, 0); });
    on('#pi-seg', () => { passo++; ver(); window.scrollTo(0, 0); });
    main.querySelectorAll('[data-nv]').forEach((b) => b.onclick = () => {
      const [tipo, id] = b.dataset.nv.split(':'); const v = +b.dataset.v;
      if (tipo === 'corpo') S.corpos[id] = v; else if (tipo === 'chk') S.chakras[id] = v; else if (tipo === 'ach') S.achados[id].n = v;
      const y = window.scrollY; ver(); window.scrollTo(0, y);
    });
    main.querySelectorAll('[data-al]').forEach((c) => c.onchange = () => { S.alertas[c.dataset.al] = c.checked; S.escolhidas = null; const y = window.scrollY; ver(); window.scrollTo(0, y); });
    const prim = q('#pi-prim'); if (prim) prim.onchange = () => { S.primeira = prim.checked; S.escolhidas = null; };
    main.querySelectorAll('[data-causa]').forEach((c) => c.onchange = () => {
      S.causas[c.dataset.causa] = c.checked; recalcAchados(); S.escolhidas = null; const y = window.scrollY; ver(); window.scrollTo(0, y);
    });
    main.querySelectorAll('[data-chk-pct]').forEach((c) => c.onchange = () => { const v = c.value === '' ? null : Math.max(0, Math.min(100, parseInt(c.value, 10) || 0)); S.chakraPct[c.dataset.chkPct] = v; const f = faixaChakra(v); if (f.v == null) delete S.chakras[c.dataset.chkPct]; else S.chakras[c.dataset.chkPct] = f.v; S.escolhidas = null; const y = window.scrollY; ver(); window.scrollTo(0, y); });
    main.querySelectorAll('[data-cpct]').forEach((c) => c.onchange = () => { if (c.value === '') { delete S.corpoPct[c.dataset.cpct]; return; } const v = Math.max(0, Math.min(100, parseInt(c.value, 10) || 0)); S.corpoPct[c.dataset.cpct] = v; S.corpos[c.dataset.cpct] = nivelDePct(v); S.escolhidas = null; const y = window.scrollY; ver(); window.scrollTo(0, y); });
    main.querySelectorAll('[data-cam]').forEach((b) => b.onclick = () => { S.caminhos = +b.dataset.cam; const y = window.scrollY; ver(); window.scrollTo(0, y); });
    const bi2 = q('#pi-bi2'); if (bi2) bi2.oninput = () => { S.bovisIni = bi2.value; };
    main.querySelectorAll('[data-ac]').forEach((c) => c.onchange = () => {
      const id = c.dataset.ac; if (c.checked) { const d = ACHADOS.find((x) => x.id === id); S.achados[id] = { n: 1, corpos: d.corpos.slice(), sub: [] }; } else delete S.achados[id];
      S.escolhidas = null; const y = window.scrollY; ver(); window.scrollTo(0, y);
    });
    main.querySelectorAll('[data-ac-c]').forEach((c) => c.onchange = () => { const [id, cid] = c.dataset.acC.split('|'); const a = S.achados[id]; a.corpos = a.corpos.filter((x) => x !== cid); if (c.checked) a.corpos.push(cid); });
    main.querySelectorAll('[data-ac-s]').forEach((c) => c.onchange = () => { const i = c.dataset.acS.indexOf('|'); const id = c.dataset.acS.slice(0, i), s = c.dataset.acS.slice(i + 1); const a = S.achados[id]; a.sub = a.sub.filter((x) => x !== s); if (c.checked) a.sub.push(s); });
    const mover = (id, d) => { planoAtual(); const i = S.escolhidas.indexOf(id), j = i + d; if (j < 0 || j >= S.escolhidas.length) return; [S.escolhidas[i], S.escolhidas[j]] = [S.escolhidas[j], S.escolhidas[i]]; const y = window.scrollY; ver(); window.scrollTo(0, y); };
    main.querySelectorAll('[data-up]').forEach((b) => b.onclick = () => mover(b.dataset.up, -1));
    main.querySelectorAll('[data-dn]').forEach((b) => b.onclick = () => mover(b.dataset.dn, 1));
    main.querySelectorAll('[data-rm]').forEach((b) => b.onclick = () => { S.escolhidas = S.escolhidas.filter((x) => x !== b.dataset.rm); const y = window.scrollY; ver(); window.scrollTo(0, y); });
    main.querySelectorAll('[data-add]').forEach((b) => b.onclick = () => { S.escolhidas.push(b.dataset.add); const y = window.scrollY; ver(); window.scrollTo(0, y); });
    // paciente
    const busca = q('#pi-busca');
    if (busca) {
      const norm = (t) => String(t || '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
      const pinta = () => { const t = norm(busca.value); const f = pacs.filter((p) => !t || norm(p.fullName).includes(t)).slice(0, 40); const box = q('#pi-pacs'); box.innerHTML = f.map((p) => `<button class="ghost" data-p="${esc(p.id)}" style="text-align:left;">${esc(p.fullName)}</button>`).join('') || '<span class="muted">Nenhum paciente.</span>'; box.querySelectorAll('[data-p]').forEach((b) => b.onclick = async () => { S.pac = pacs.find((p) => p.id === b.dataset.p); try { hist = await ctx.listar(S.pac.id); } catch (_) { hist = []; } if (!hist.length) S.primeira = true; try { pre = ctx.lerPreConsulta ? await ctx.lerPreConsulta(S.pac.id) : null; } catch (_) { pre = null; } try { seg = await ctx.lerPreConsulta(S.pac.id, SEG_FORM_ID); } catch (_) { seg = null; } try { cic = (await ctx.lerCiclo(S.pac.id)) || { ciclos: [] }; } catch (_) { cic = { ciclos: [] }; } escN = false; aplicarPre(); ver(); }); };
      busca.oninput = pinta; pinta();
    }
    main.querySelectorAll('[data-modo]').forEach((b) => b.onclick = () => { S.modo = b.dataset.modo; ver(); });
    main.querySelectorAll('[data-chk]').forEach((c) => c.onchange = () => { S.check[c.dataset.chk] = c.checked; });
    const te = q('#pi-test'); if (te) te.oninput = () => { S.testemunho = te.value; };
    const ho = q('#pi-hora'); if (ho) ho.oninput = () => { S.hora = ho.value; };
    const tel = () => { const d = String((S.pac && S.pac.phone) || '').replace(/\D/g, ''); return d.length === 9 ? '351' + d : d; };
    on('#pi-wa-antes', () => { if (!S.pac) return ctx.toast('Escolhe primeiro o paciente.', true); window.open(`https://wa.me/${tel()}?text=${encodeURIComponent(MSG_ANTES_DISTANCIA + (S.hora ? '\nHora combinada: ' + S.hora + '.' : ''))}`, '_blank'); });
    on('#pi-wa-depois', () => window.open(`https://wa.me/${tel()}?text=${encodeURIComponent(MSG_DEPOIS_DISTANCIA)}`, '_blank'));
    main.querySelectorAll('[data-tec]').forEach((b) => b.onclick = () => { tecAtual = +b.dataset.tec; ver(); });
    main.querySelectorAll('[data-pf]').forEach((c) => c.onchange = () => { const [id, i] = c.dataset.pf.split('|'); (S.passosFeitos[id] = S.passosFeitos[id] || {})[i] = c.checked; });
    on('#pi-feita', () => { const plano = planoAtual(); S.feitas[plano[tecAtual]] = true; if (tecAtual < plano.length - 1) tecAtual++; ver(); window.scrollTo(0, 0); });
    on('#pi-etq', () => { if (ctx.abrirTriagem) ctx.abrirTriagem(); });
    const enviarPre = async () => {
      try { const id = await ctx.criarPreConsulta(S.pac, { titulo: PRE_TITULO, descricao: PRE_DESCRICAO + ' O terapeuta é um intercessor: a mudança que se mantém depende também de si. No fim encontra o termo de consentimento, que precisa de aceitar.', perguntas: PRE_CONSULTA.map((p) => { const o = { id: p.id, label: p.label, tipo: p.tipo }; if (p.opcoes) o.opcoes = p.opcoes; return o; }) }); pre = { id, estado: 'pendente' }; ctx.abrirEnvio({ responseId: id, titulo: PRE_TITULO, patientId: S.pac.id, patientName: S.pac.fullName }); ver(); }
      catch (e) { ctx.toast('Não consegui criar o questionário: ' + (e.message || e), true); }
    };
    on('#pi-pre-env', enviarPre); on('#pi-pre-novo', enviarPre);
    on('#pi-pre-reenv', () => ctx.abrirEnvio({ responseId: pre.id, titulo: PRE_TITULO, patientId: S.pac.id, patientName: S.pac.fullName }));
    on('#pi-pre-ref', async () => { try { pre = await ctx.lerPreConsulta(S.pac.id); aplicarPre(); ctx.toast(pre && pre.estado === 'respondido' ? 'Respostas carregadas. ✅' : 'Ainda sem respostas.'); } catch (e) { ctx.toast('Não consegui ver.', true); } ver(); });
    on('#pi-con-wa', () => { const d = String((S.pac && S.pac.phone) || '').replace(/\D/g, ''); const t = d.length === 9 ? '351' + d : d; window.open(`https://wa.me/${t}?text=${encodeURIComponent(MSG_CONSCIENCIA)}`, '_blank'); });
    on('#pi-con-ver', async () => { const e = q('#pi-con-txt'); if (e) e.style.display = e.style.display === 'none' ? 'block' : 'none'; try { await navigator.clipboard.writeText(MSG_CONSCIENCIA); ctx.toast('Copiado.'); } catch (_) {} });
    on('#pi-trocar', () => { S.pac = null; S.alertas = {}; pre = null; seg = null; cic = { ciclos: [] }; hist = []; ver(); });
    const gCic = async () => { try { await ctx.gravarCiclo(S.pac.id, cic); } catch (e) { ctx.toast('Não consegui guardar o percurso.', true); } };
    main.querySelectorAll('[data-ncons]').forEach((b) => b.onclick = async () => {
      const n = +b.dataset.ncons; const c = cur(); const mk = (i, o) => Object.assign({ feita: false, pago: false }, o || {});
      if (c) { while (c.consultas.length < n) c.consultas.push(mk()); if (n < c.consultas.length) c.consultas = c.consultas.slice(0, Math.max(n, nFeitas(c))); c.total = c.consultas.length; }
      else cic.ciclos.push({ id: 'c' + Date.now(), inicio: Date.now(), total: n, consultas: Array.from({ length: n }, mk), fechado: false });
      escN = false; await gCic(); ver();
    });
    main.querySelectorAll('[data-pago]').forEach((b) => b.onclick = async () => { const c = cur(); const x = c.consultas[+b.dataset.pago]; x.pago = !x.pago; x.pagoEm = x.pago ? Date.now() : 0; await gCic(); const y = window.scrollY; ver(); window.scrollTo(0, y); });
    main.querySelectorAll('[data-val]').forEach((e) => e.onchange = async () => { const c = cur(); c.consultas[+e.dataset.val].valor = +e.value || 0; await gCic(); const y = window.scrollY; ver(); window.scrollTo(0, y); });
    on('#pi-cic-alt', () => { escN = true; ver(); }); on('#pi-cic-canc', () => { escN = false; ver(); });
    on('#pi-cic-novo', async () => { if (!(await ctx.confirmar('Novo percurso?', 'O percurso atual fica fechado e começa um novo, com novo questionário de pré-consulta.', 'Começar novo'))) return; const c = cur(); if (c) c.fechado = true; await gCic(); escN = false; ver(); });
    const enviarSeg = async () => {
      try { const id = await ctx.criarPreConsulta(S.pac, { titulo: SEG_TITULO, descricao: SEG_DESCRICAO, perguntas: SEG_FORM.map((p) => { const o = { id: p.id, label: p.label, tipo: p.tipo }; if (p.opcoes) o.opcoes = p.opcoes; return o; }) }, SEG_FORM_ID); seg = { id, estado: 'pendente' }; ctx.abrirEnvio({ responseId: id, titulo: SEG_TITULO, patientId: S.pac.id, patientName: S.pac.fullName }); ver(); }
      catch (e) { ctx.toast('Não consegui criar a ficha: ' + (e.message || e), true); }
    };
    on('#pi-seg-env', enviarSeg);
    on('#pi-seg-reenv', () => ctx.abrirEnvio({ responseId: seg.id, titulo: SEG_TITULO, patientId: S.pac.id, patientName: S.pac.fullName }));
    on('#pi-seg-ref', async () => { try { seg = await ctx.lerPreConsulta(S.pac.id, SEG_FORM_ID); ctx.toast(seg && seg.estado === 'respondido' ? 'Respostas carregadas. ✅' : 'Ainda sem respostas.'); } catch (e) { ctx.toast('Não consegui ver.', true); } ver(); });
    const bi = q('#pi-bi'); if (bi) bi.oninput = () => { S.bovisIni = bi.value; };
    const bf = q('#pi-bf'); if (bf) bf.oninput = () => { S.bovisFin = bf.value; };
    const nt = q('#pi-notas'); if (nt) nt.oninput = () => { S.notas = nt.value; };
    on('#pi-copiar', async () => { try { await navigator.clipboard.writeText(textoTerapeuta()); ctx.toast('Copiado.'); } catch (_) { ctx.toast('Não consegui copiar.', true); } });
    on('#pi-wa', () => { const d = String((S.pac && S.pac.phone) || '').replace(/\D/g, ''); const t = d.length === 9 ? '351' + d : d; window.open(`https://wa.me/${t}?text=${encodeURIComponent(textoPaciente())}`, '_blank'); });
    on('#pi-gravar', async () => {
      if (!S.pac) return ctx.toast('Escolhe primeiro o paciente.', true);
      try {
        await ctx.gravar(S.pac.id, { tipo: 'pesquisa-integrada', reportText: textoTerapeuta(), textoPaciente: textoPaciente(), dados: { consulta: (() => { const c = cur(); return c ? { n: Math.min(nFeitas(c) + 1, c.total), total: c.total, paga: !!(c.consultas[nFeitas(c)] || {}).pago } : null; })(), seguimento: (() => { const sg = analiseSeg(); return sg ? { media: sg.media, linhas: sg.linhas, reacoes: sg.reac } : null; })(), preConsulta: (() => { const an = analisePre(); return an ? { consentimento: an.consentimento, assinatura: an.assinatura, id: pre.id || '', sugeridas: Object.keys(an.sug).map(Number), dicas: an.dicas } : null; })(), causas: S.causas, chakraPct: S.chakraPct, corpoPct: S.corpoPct, caminhos: S.caminhos, modo: S.modo, testemunho: S.testemunho, hora: S.hora, feitas: S.feitas, minutos: inicioSessao ? Math.round((Date.now() - inicioSessao) / 60000) : 0, corpos: S.corpos, achados: S.achados, chakras: S.chakras, plano: planoAtual(), alertas: S.alertas, bovisIni: S.bovisIni, bovisFin: S.bovisFin, notas: S.notas, primeira: S.primeira } });
        { let c = cur(); if (!c) { c = { id: 'c' + Date.now(), inicio: Date.now(), total: 1, consultas: [{ feita: false, pago: false }], fechado: false }; cic.ciclos.push(c); }
          const x = c.consultas.find((k) => !k.feita); if (x) { x.feita = true; x.data = Date.now(); } try { await ctx.gravarCiclo(S.pac.id, cic); } catch (_) {} }
        ctx.toast('Guardado na ficha. ✅'); hist = await ctx.listar(S.pac.id);
      } catch (e) { ctx.toast('Não consegui guardar: ' + (e.message || e), true); }
    });
  }

  (async () => { try { pacs = await ctx.pacientes(); } catch (_) {} try { meus = (await ctx.carregarMeus()) || {}; } catch (_) {} ver(); })();
}
