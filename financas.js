// Financeiro do subscritor: recebimentos, despesas, resultado, dívidas e exportação para o contabilista.
// Registo interno de controlo — NÃO é documento fiscal.
// Recebido = marcações pagas (exceto as pagas com pacote, para não contar a sessão duas vezes)
//          + pacotes vendidos no período.
// Despesas ficam em tenants/{id}/expenses (só o titular da conta vê).

const MESES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const METODOS = { dinheiro: 'Dinheiro', mbway: 'MB WAY', transferencia: 'Transferência', cartao: 'Cartão / TPA', link: 'Link online', pacote: 'Venda de pacotes', '': 'Sem método' };
export const CATEGORIAS_DESPESA = ['Renda / espaço', 'Material', 'Formação', 'Publicidade', 'Software / subscrições', 'Deslocações', 'Contabilidade / impostos', 'Segurança Social', 'Outras'];

const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const eur = (n) => (Math.round((n || 0) * 100) / 100).toLocaleString('pt-PT', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';
const num = (v) => { const n = parseFloat(String(v == null ? '' : v).replace(',', '.')); return isFinite(n) ? n : 0; };
const dia = (d) => d.toLocaleDateString('pt-PT', { day: '2-digit', month: '2-digit', year: 'numeric' });

function emFalta(a) {
  const p = a.price || 0;
  if (a.paymentStatus === 'paid') return 0;
  if (typeof a.amountPaid === 'number') return Math.max(0, p - a.amountPaid);
  return p;
}
function recebido(a) {
  if (a.paymentStatus === 'paid') return a.price || 0;
  if (typeof a.amountPaid === 'number') return a.amountPaid;
  return 0;
}

// Cálculo puro (testável): marcações, pacotes (com data) e despesas de um período [ini, fim]
export function calcularPeriodo({ marcacoes, pacotes, despesas }) {
  const r = { recebido: 0, pendente: 0, pacotes: 0, despesas: 0, porMetodo: {}, porServico: {}, porCategoria: {}, linhas: [] };
  (marcacoes || []).forEach(a => {
    if (a.status === 'cancelled' || !a.price) return;
    const rec = a.paymentMethod === 'pacote' ? 0 : recebido(a);
    const falta = a.paymentMethod === 'pacote' ? 0 : emFalta(a);
    r.recebido += rec; r.pendente += falta;
    if (rec > 0) {
      const m = a.paymentMethod || ''; r.porMetodo[m] = (r.porMetodo[m] || 0) + rec;
      const s = a.serviceName || 'Sem serviço'; r.porServico[s] = (r.porServico[s] || 0) + rec;
    }
    r.linhas.push({ data: a.data, tipo: 'Sessão', descricao: `${a.patientName || ''} — ${a.serviceName || ''}`, metodo: a.paymentMethod || '', valor: rec, pendente: falta });
  });
  (pacotes || []).forEach(p => {
    r.pacotes += p.price || 0; r.recebido += p.price || 0;
    r.porMetodo['pacote'] = (r.porMetodo['pacote'] || 0) + (p.price || 0);
    r.porServico['Pacotes de sessões'] = (r.porServico['Pacotes de sessões'] || 0) + (p.price || 0);
    r.linhas.push({ data: p.data, tipo: 'Pacote', descricao: `${p.patientName || ''} — ${p.name || ''}`, metodo: 'pacote', valor: p.price || 0, pendente: 0 });
  });
  (despesas || []).forEach(d => {
    r.despesas += d.amount || 0;
    const c = d.category || 'Outras'; r.porCategoria[c] = (r.porCategoria[c] || 0) + (d.amount || 0);
    r.linhas.push({ data: d.data, tipo: 'Despesa', descricao: `${d.category || ''} — ${d.description || ''}`, metodo: '', valor: -(d.amount || 0), pendente: 0 });
  });
  r.resultado = r.recebido - r.despesas;
  r.linhas.sort((a, b) => a.data - b.data);
  return r;
}

export function csvDe(linhas, titulo) {
  const cel = (v) => '"' + String(v == null ? '' : v).replace(/"/g, '""') + '"';
  const rows = [['Data', 'Tipo', 'Descrição', 'Método', 'Valor (€)', 'Por receber (€)']];
  linhas.forEach(l => rows.push([dia(l.data), l.tipo, l.descricao, METODOS[l.metodo] || l.metodo, l.valor.toFixed(2).replace('.', ','), l.pendente ? l.pendente.toFixed(2).replace('.', ',') : '']));
  return '﻿' + (titulo ? cel(titulo) + '\n' : '') + rows.map(r => r.map(cel).join(';')).join('\n');
}

function barras(obj, cor, total) {
  const ent = Object.entries(obj).filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  if (!ent.length) return '<p class="muted">Sem dados neste período.</p>';
  const max = ent[0][1] || 1;
  return ent.map(([k, v]) => `<div style="margin:6px 0;"><div class="row" style="font-size:13px;"><span>${esc(k)}</span><strong>${eur(v)}${total ? ` <span class="muted" style="font-weight:400;">· ${Math.round(v / total * 100)}%</span>` : ''}</strong></div><div style="height:8px;border-radius:6px;background:#eef2f0;"><div style="height:8px;border-radius:6px;width:${Math.max(3, v / max * 100)}%;background:${cor};"></div></div></div>`).join('');
}

// ctx: { db, tenantId, fns:{collection,getDocs,query,where,orderBy,Timestamp,addDoc,deleteDoc,doc,serverTimestamp}, toast, confirmar, hintBox, owner }
export function iniciarFinancas(ctx) {
  const { db, tenantId, fns, toast, confirmar } = ctx;
  const { collection, getDocs, query, where, Timestamp, addDoc, deleteDoc, doc, serverTimestamp } = fns;
  const estado = { modo: 'mes', ref: new Date(), ultimo: null };

  const intervalo = () => {
    const y = estado.ref.getFullYear(), m = estado.ref.getMonth();
    return estado.modo === 'ano'
      ? [new Date(y, 0, 1), new Date(y, 11, 31, 23, 59, 59, 999)]
      : [new Date(y, m, 1), new Date(y, m + 1, 0, 23, 59, 59, 999)];
  };
  const tentar = async (f) => { try { return await f(); } catch (e) { console.warn('Financeiro: leitura indisponível', e); return null; } };

  async function carregar() {
    const [ini, fim] = intervalo();
    const snapA = await getDocs(query(collection(db, 'tenants', tenantId, 'appointments'), where('startsAt', '>=', Timestamp.fromDate(ini)), where('startsAt', '<=', Timestamp.fromDate(fim))));
    const marcacoes = []; snapA.forEach(d => { const a = d.data(); if (a.startsAt && a.startsAt.toDate) marcacoes.push({ ...a, data: a.startsAt.toDate() }); });
    let despesas = [];
    if (ctx.owner) {
      const sd = await tentar(() => getDocs(collection(db, 'tenants', tenantId, 'expenses')));
      if (sd) sd.forEach(d => { const x = d.data(); const dt = x.date && x.date.toDate ? x.date.toDate() : (x.date ? new Date(x.date) : null); if (dt && dt >= ini && dt <= fim) despesas.push({ id: d.id, ...x, data: dt, amount: num(x.amount) }); });
    }
    // pacotes e dívidas: vêm das fichas dos pacientes
    const pacotes = [], devedores = [];
    const sp = await tentar(() => getDocs(collection(db, 'tenants', tenantId, 'patients')));
    if (sp) sp.forEach(d => { const p = d.data(); (p.packages || []).forEach(k => { const dt = k.purchasedAt ? new Date(k.purchasedAt) : null; if (dt && dt >= ini && dt <= fim) pacotes.push({ name: k.name, price: num(k.price), data: dt, patientName: p.fullName }); }); });
    // dívida total (todas as marcações já passadas, qualquer data)
    const sdv = await tentar(() => getDocs(query(collection(db, 'tenants', tenantId, 'appointments'), where('startsAt', '<=', Timestamp.fromDate(new Date())))));
    const por = {};
    if (sdv) sdv.forEach(d => { const a = d.data(); if (a.status === 'cancelled' || !a.price || a.paymentMethod === 'pacote') return; const f = emFalta(a); if (f > 0.004) { const k = a.patientId || a.patientName || '?'; (por[k] = por[k] || { nome: a.patientName || 'Sem nome', id: a.patientId || '', total: 0, n: 0 }); por[k].total += f; por[k].n++; } });
    Object.values(por).sort((a, b) => b.total - a.total).forEach(x => devedores.push(x));
    return { marcacoes, pacotes, despesas, devedores, ini, fim };
  }

  async function desenhar(main) {
    main.innerHTML = '<p class="muted">A carregar…</p>';
    const dados = await carregar();
    const r = calcularPeriodo(dados);
    estado.ultimo = { r, dados };
    const y = estado.ref.getFullYear(), m = estado.ref.getMonth();
    const titulo = estado.modo === 'ano' ? String(y) : `${MESES[m]} ${y}`;
    const totalDev = dados.devedores.reduce((s, x) => s + x.total, 0);
    const tab = (k, n) => `<button class="${estado.modo === k ? 'primary' : 'ghost'}" style="flex:1;" onclick="finModo('${k}')">${n}</button>`;
    const card = (v, t, c) => `<div style="background:#fff;border-radius:12px;padding:12px;text-align:center;"><div style="font-size:19px;font-weight:700;color:${c};">${v}</div><div class="muted" style="font-size:12px;">${t}</div></div>`;
    const despesasHtml = ctx.owner ? `
      <div class="card"><div class="row"><h3 style="margin:0;">🧾 Despesas</h3><button class="primary" style="padding:6px 12px;" onclick="finNovaDespesa()">+ Despesa</button></div>
        <div id="finFormDespesa"></div>
        ${dados.despesas.length ? dados.despesas.sort((a, b) => b.data - a.data).map(d => `<div class="appt-item row"><div><strong>${esc(d.description || d.category || '')}</strong><div class="muted">${dia(d.data)} · ${esc(d.category || '')}</div></div><div style="text-align:right;"><strong>${eur(d.amount)}</strong><div><button class="ghost" style="padding:2px 8px;font-size:12px;" onclick="finApagarDespesa('${d.id}')">Remover</button></div></div></div>`).join('') : '<p class="muted" style="margin-top:8px;">Sem despesas neste período. Regista renda, material, formações, software…</p>'}
      </div>` : '';
    main.innerHTML = `
      <h2>💶 Finanças</h2>
      <div class="card" style="background:#fff8ed;border:1px solid #f0d9a8;"><strong style="color:#8a5a00;">⚠️ Isto não é um documento fiscal.</strong>
        <p class="muted" style="margin-top:4px;">Registo interno de controlo. Não substitui a fatura/recibo nem a contabilidade. Os valores são brutos (antes de impostos).</p></div>
      <div class="row" style="gap:8px;margin-bottom:8px;">${tab('mes', 'Mês')}${tab('ano', 'Ano')}</div>
      <div class="row" style="margin-bottom:10px;"><button class="ghost" onclick="finMover(-1)">‹</button><strong>${titulo}</strong><button class="ghost" onclick="finMover(1)">›</button></div>
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin-bottom:12px;">
        ${card(eur(r.recebido), 'Recebido', 'var(--primary)')}
        ${card(eur(r.pendente), 'Por receber (neste período)', '#b45309')}
        ${ctx.owner ? card(eur(r.despesas), 'Despesas', '#64748b') : ''}
        ${ctx.owner ? card(eur(r.resultado), 'Resultado (recebido − despesas)', r.resultado >= 0 ? '#15803d' : '#b91c1c') : ''}
      </div>
      ${r.pacotes ? `<p class="muted" style="margin:-4px 4px 10px;">Inclui ${eur(r.pacotes)} de pacotes de sessões vendidos. As sessões gastas com pacote não são contadas outra vez.</p>` : ''}
      <div class="card"><h3 style="margin:0 0 6px;">Por método de pagamento</h3>${barras(Object.fromEntries(Object.entries(r.porMetodo).map(([k, v]) => [METODOS[k] || k, v])), 'var(--primary)', r.recebido)}</div>
      <div class="card"><h3 style="margin:0 0 6px;">Por serviço</h3>${barras(r.porServico, '#c9a24a', r.recebido)}</div>
      ${ctx.owner && r.despesas ? `<div class="card"><h3 style="margin:0 0 6px;">Despesas por categoria</h3>${barras(r.porCategoria, '#94a3b8', r.despesas)}</div>` : ''}
      ${despesasHtml}
      <div class="card"><h3 style="margin:0 0 6px;">⏳ Quem me deve ${totalDev ? `<span class="muted" style="font-weight:400;">· ${eur(totalDev)}</span>` : ''}</h3>
        ${dados.devedores.length ? dados.devedores.map(x => `<div class="appt-item row" ${x.id ? `style="cursor:pointer;" onclick="viewPatient('${esc(x.id)}')"` : ''}><div>${esc(x.nome)}<div class="muted">${x.n} sessão(ões) por pagar</div></div><strong style="color:#b45309;">${eur(x.total)}</strong></div>`).join('') : '<p class="muted">Ninguém em dívida. 🎉</p>'}
      </div>
      <div class="card"><h3 style="margin:0 0 6px;">📤 Para o contabilista</h3>
        <p class="muted" style="margin-bottom:8px;">Folha com todos os movimentos de ${titulo} (abre no Excel).</p>
        <button class="primary" style="width:100%;" onclick="finExportar()">⬇️ Descarregar ${titulo} (CSV)</button></div>`;
  }

  window.finModo = (k) => { estado.modo = k; desenhar(window.__finMain); };
  window.finMover = (d) => { const e = estado.ref; estado.ref = estado.modo === 'ano' ? new Date(e.getFullYear() + d, 0, 1) : new Date(e.getFullYear(), e.getMonth() + d, 1); desenhar(window.__finMain); };
  window.finNovaDespesa = () => {
    const hoje = new Date().toISOString().slice(0, 10);
    document.getElementById('finFormDespesa').innerHTML = `<div class="card" style="background:#f6f8f7;margin-top:8px;">
      <label>Descrição</label><input id="finDesc" placeholder="ex: Renda do espaço">
      <label>Valor (€)</label><input id="finVal" type="number" inputmode="decimal" step="0.01">
      <label>Categoria</label><select id="finCat">${CATEGORIAS_DESPESA.map(c => `<option>${esc(c)}</option>`).join('')}</select>
      <label>Data</label><input id="finData" type="date" value="${hoje}">
      <button class="primary" style="margin-top:8px;" onclick="finGuardarDespesa()">Guardar despesa</button></div>`;
  };
  window.finGuardarDespesa = async () => {
    const valor = num(document.getElementById('finVal').value), desc = document.getElementById('finDesc').value.trim(), data = document.getElementById('finData').value;
    if (valor <= 0 || !data) { toast('Indique o valor e a data.', true); return; }
    await addDoc(collection(db, 'tenants', tenantId, 'expenses'), { description: desc, amount: valor, category: document.getElementById('finCat').value, date: Timestamp.fromDate(new Date(data + 'T12:00:00')), createdAt: serverTimestamp() });
    toast('Despesa guardada.'); desenhar(window.__finMain);
  };
  window.finApagarDespesa = async (id) => {
    if (!await confirmar('Remover esta despesa?')) return;
    await deleteDoc(doc(db, 'tenants', tenantId, 'expenses', id)); desenhar(window.__finMain);
  };
  window.finExportar = () => {
    if (!estado.ultimo) return;
    const y = estado.ref.getFullYear(), m = estado.ref.getMonth();
    const nome = estado.modo === 'ano' ? `financas-${y}` : `financas-${y}-${String(m + 1).padStart(2, '0')}`;
    const blob = new Blob([csvDe(estado.ultimo.r.linhas, 'Registo interno — não é documento fiscal')], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = nome + '.csv'; document.body.appendChild(a); a.click(); a.remove();
  };

  return (main) => { window.__finMain = main; return desenhar(main); };
}
