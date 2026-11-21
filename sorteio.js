// Sorteios da Hikari Fafe (só conta hikari-terapias): cria o sorteio com regulamento, mostra-o na página pública,
// recebe as participações, sorteia (à mão ou sozinho, na hora marcada) e prepara as publicações para as redes sociais.
const TENANT = 'hikari-terapias';
const LINK = 'https://vindora.pt/hikari.html#sorteio';

export function renderSorteio(main, ctx) {
  const { db, fs, escapeHtml: esc, toast } = ctx;
  const $ = (id) => document.getElementById(id);
  let lista = [], atual = null, parts = [];

  if (ctx.tenantId !== TENANT) { main.innerHTML = '<div class="card"><h2>🔒 Ferramenta indisponível</h2><p class="muted">Esta ferramenta é exclusiva de uma conta específica.</p></div>'; return; }

  const pad = (n) => String(n).padStart(2, '0');
  const paraInput = (d) => { d = new Date(d); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`; };
  const dePt = (t) => new Date(ms(t)).toLocaleString('pt-PT', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  const ms = (t) => (t && t.toMillis ? t.toMillis() : (t ? new Date(t).getTime() : 0));
  const abrev = (n) => { const p = String(n || '').trim().split(/\s+/).filter(Boolean); return p.length > 1 ? p[0] + ' ' + p[p.length - 1][0].toUpperCase() + '.' : (p[0] || ''); };
  const aleatorio = (n) => { const b = new Uint32Array(1), lim = Math.floor(4294967296 / n) * n; let x; do { crypto.getRandomValues(b); x = b[0]; } while (x >= lim); return x % n; };

  /* ───── regulamento (modelo editável) ───── */
  function regulamento(s) {
    const org = s.organizador || 'Ricardo Correia (Hikari Fafe)';
    const cont = s.contacto ? ` Contacto: ${s.contacto}.` : '';
    const nR = Number(s.lugaresReflexologia) || 0, nT = Number(s.lugaresTriagem) || 0;
    const part = s.semCompra !== false
      ? 'A participação é gratuita e não depende da compra de qualquer produto ou serviço.'
      : 'Participam as pessoas que reservarem uma das cortesias (gratuitas) ou que fizerem uma marcação de triagem energética ou de reflexologia podal durante o período de participação. A organização regista cada marcação como uma participação.';
    const ofertas = (nR || nT) ? `\nCortesias da campanha (gratuitas, por ordem de reserva, até esgotarem):\n${nR ? '• Sessões de reflexologia podal de 20 minutos, presenciais.\n' : ''}${nT ? '• Triagens energéticas com pêndulo hebraico, online ou à distância.\n' : ''}O número de lugares disponíveis está indicado nesta página e pode ser reforçado conforme a disponibilidade dos terapeutas. São trabalhos de bem-estar e autoconhecimento, não substituem acompanhamento médico ou psicológico nem fazem diagnósticos.\n` : '';
    return `REGULAMENTO — ${s.titulo || 'Sorteio'}

1. Organização
O sorteio é organizado por ${org}.${cont}

2. Prémio
${s.premio || '(descreva o prémio)'}${s.descricao ? '\n' + s.descricao : ''}
O prémio é pessoal e intransmissível e não pode ser trocado por dinheiro. ${s.validadePremio ? 'Deve ser usado até ' + s.validadePremio + '.' : ''}
${ofertas}
3. Período de participação
De ${dePt(s.inicioTs || s.inicio || Date.now())} até ${dePt(s.fimTs || s.fim || Date.now())} (hora de Portugal continental).

4. Quem pode participar
Pessoas com 18 ou mais anos, com um e-mail ou telemóvel válido. Não podem participar o organizador nem familiares diretos.

5. Como participar
Reservar o seu lugar no formulário desta página, com o nome e um contacto, e aceitar este regulamento. ${part} Cada pessoa tem uma só participação (um contacto, uma participação). No fim, recebe um código de participação.

6. Sorteio
Realiza-se a ${dePt(s.sorteioTs || s.sorteioEm || Date.now())}. O sistema escolhe ao acaso, de forma automática, 1 vencedor e 2 suplentes entre todas as participações válidas. O resultado (nome abreviado, código e número de participações) é publicado nesta página.

7. Comunicação e entrega do prémio
O vencedor é contactado pelo contacto que indicou e tem 5 dias para responder. Sem resposta, passa-se ao primeiro suplente, e assim por diante. O prémio é entregue nos termos combinados com o vencedor.

8. Dados pessoais
Os dados (nome e contacto) são usados apenas para gerir este sorteio e contactar o vencedor, e são apagados até 90 dias depois do sorteio. Pode pedir o acesso, a correção ou o apagamento dos seus dados a qualquer momento, pelo contacto do organizador.

9. Redes sociais
Este sorteio não é patrocinado, apoiado nem administrado por Instagram, Facebook, TikTok ou outra rede social, e não tem qualquer ligação a estas.

10. Exclusão e alterações
São excluídas participações com dados falsos ou repetidos, ou obtidas por fraude. O organizador pode cancelar ou alterar o sorteio por motivo justificado, informando nesta página.

11. Lei aplicável
Este regulamento rege-se pela lei portuguesa. Livro de Reclamações disponível nos termos da lei.`;
  }

  /* ───── publicações para redes sociais ───── */
  function publicacoes(s) {
    const fim = dePt(s.fimTs || s.fim || Date.now()), res = dePt(s.sorteioTs || s.sorteioEm || Date.now());
    const tags = '#hikarifafe #sorteio #mapadaalma #autoconhecimento #bemestar #espiritualidade #fafe #portugal';
    const pr = s.premio || 'o prémio';
    const gratis = s.semCompra !== false ? 'Participação gratuita.' : '';
    const nR = s.lugaresReflexologia || 0, nT = s.lugaresTriagem || 0;
    const of = (nR || nT) ? `\n🎁 ${nR ? nR + ' cortesias de reflexologia podal (20 min, presencial) ' : ''}${nR && nT ? 'e ' : ''}${nT ? nT + ' triagens energéticas com pêndulo hebraico (online ou à distância) ' : ''}— grátis, por ordem de reserva! Reservas por WhatsApp: reflexologia com a Natália (934 744 633), triagem com o Ricardo (928 122 918).\n🦶 Reflexologia: massagem nos pés para relaxar e perceber onde o corpo anda sensível.\n🔮 Triagem: pesquisa com o pêndulo das energias que pesam, dos teus chakras e dos teus caminhos, com relatório pessoal.\n` : '';
    const sort = 'Quem marcar triagem ou reflexologia entra ainda no sorteio de um Mapa da Alma Diamante! 💎';
    return [
      ['📸 Instagram / Facebook — lançamento', `🖤 BLACK FRIDAY · ${s.titulo || ''}\n${of}\n${sort}\n\nComo reservar:\n1️⃣ Entra no link da bio (ou ${LINK})\n2️⃣ Escolhe a oferta e deixa o teu nome e contacto\n3️⃣ Aceita o regulamento\n\n${gratis} Reservas até ${fim}.\nO resultado sai ${res}, sorteado automaticamente na página. ✨\n\nMarca alguém que também ia adorar! 👇\n\n${tags}`],
      ['📱 Stories (texto curto)', `🖤 BLACK FRIDAY\n${nR ? nR + ' reflexologias grátis · ' : ''}${nT ? nT + ' triagens grátis · ' : ''}+ sorteio de um Mapa Diamante\n\nReserva no link 👆\nAté ${fim}\n${gratis}`],
      ['💬 WhatsApp (clientes)', `Olá! 😊 Black Friday na Hikari Fafe: ${nR ? nR + ' cortesias de reflexologia podal (20 min) ' : ''}${nT ? 'e ' + nT + ' triagens energéticas com pêndulo ' : ''}grátis, e sorteio de um Mapa da Alma Diamante para quem marcar.\nReserva aqui (ou por WhatsApp: reflexologia 934 744 633 · triagem 928 122 918) e deixar o teu nome e contacto: ${LINK}\nParticipa até ${fim}. Partilha com quem gostas! 💛`],
      ['⏰ Último dia', `⏰ HOJE É O ÚLTIMO DIA!\n\nAinda a tempo de participar no sorteio de ${pr}. ${gratis}\nFecha ${fim}.\n👉 ${LINK}\n\n${tags}`],
      ['🎉 Anúncio do vencedor', s.estado === 'sorteado' && !s.semVencedor
        ? `🎉 Já temos vencedor(a) do sorteio!\n\nParabéns, ${s.vencedorNome}! (participação n.º ${s.vencedorCodigo}, entre ${s.total} participações)\nO sorteio foi feito automaticamente e o resultado está na página: ${LINK}\n\nObrigado a todos por participarem! 💛\n\n${tags}`
        : `🎉 (depois do sorteio, este texto fica preenchido com o nome do vencedor)`]
    ];
  }

  /* ───── dados ───── */
  async function carregarLista() {
    const snap = await fs.getDocs(fs.query(fs.collection(db, 'public_sorteios'), fs.where('tenantId', '==', TENANT)));
    lista = []; snap.forEach((d) => lista.push(Object.assign({ id: d.id }, d.data())));
    lista.sort((a, b) => ms(b.criadoTs) - ms(a.criadoTs));
  }
  async function carregarParts() {
    parts = [];
    if (!atual || !atual.id) return;
    const snap = await fs.getDocs(fs.collection(db, 'public_sorteios', atual.id, 'participantes'));
    snap.forEach((d) => parts.push(Object.assign({ id: d.id }, d.data())));
    parts.sort((a, b) => ms(a.criadoEm) - ms(b.criadoEm));
  }

  /* ───── ecrãs ───── */
  async function ecraLista() {
    atual = null;
    main.innerHTML = '<div class="card"><p class="muted">A carregar…</p></div>';
    try { await carregarLista(); } catch (e) { main.innerHTML = `<div class="card"><h2>🎁 Sorteios</h2><p class="muted">Não consegui abrir os sorteios: ${esc(e.message || e)}. Se acabou de atualizar, confirme que as regras do Firestore já foram publicadas.</p></div>`; return; }
    const est = { rascunho: '📝 Rascunho', aberto: '🟢 Aberto', sorteado: '🏆 Sorteado', fechado: '⛔ Fechado' };
    main.innerHTML = `<div class="card"><h2>🎁 Sorteios da Hikari Fafe</h2>
      <p class="muted">Crie um sorteio, abra-o e ele aparece sozinho na página pública. À hora marcada, o sorteio é feito automaticamente.</p>
      <div style="background:#fff8e6;border:1px solid #e6c97a;border-radius:12px;padding:10px 12px;margin:10px 0;font-size:13.5px;">⚖️ <b>Antes de lançar:</b> em Portugal, alguns sorteios e passatempos precisam de autorização da Câmara Municipal (sobretudo os ligados a compras). Confirme na Câmara de Fafe se o seu caso precisa. Participação gratuita e sem compra é o caminho mais simples.</div>
      <button class="primary" onclick="soNovo()">➕ Novo sorteio</button></div>
      ${lista.map((s) => `<div class="card" style="cursor:pointer" onclick="soAbrir('${s.id}')"><b>${esc(s.titulo || 'Sorteio')}</b> <span class="muted">${est[s.estado] || s.estado}</span><br><span class="muted">${esc(s.premio || '')}</span></div>`).join('') || '<p class="muted" style="text-align:center">Ainda não criou nenhum sorteio.</p>'}`;
  }

  function novoVazio() {
    const fim = new Date(2026, 10, 30, 23, 59), res = new Date(2026, 11, 1, 12, 0);
    return { id: null, estado: 'rascunho', titulo: 'Black Friday Hikari Fafe', premio: 'Sorteio de um Mapa da Alma versão Diamante', descricao: 'Para quem fizer marcação de triagem energética ou de reflexologia podal.', lugaresReflexologia: 5, lugaresTriagem: 5,
      inicio: paraInput(Date.now()), fim: paraInput(fim), sorteioEm: paraInput(res), semCompra: false, organizador: 'Ricardo Correia (Hikari Fafe)', contacto: '', validadePremio: '', regulamento: '' };
  }

  function ecraEditor() {
    const s = atual, novo = !s.id, ro = s.estado === 'sorteado';
    if (!s.inicio && s.inicioTs) s.inicio = paraInput(ms(s.inicioTs));
    if (!s.fim && s.fimTs) s.fim = paraInput(ms(s.fimTs));
    if (!s.sorteioEm && s.sorteioTs) s.sorteioEm = paraInput(ms(s.sorteioTs));
    const inp = (id, label, v, tipo) => `<label style="display:block;margin-top:8px;font-size:13px;color:#6d6477">${label}<input id="${id}" type="${tipo || 'text'}" value="${esc(v || '')}" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:10px;font-size:15px" ${ro ? 'disabled' : ''}></label>`;
    main.innerHTML = `<button class="ghost" onclick="soLista()">← Sorteios</button>
      <div class="card"><h2>🎁 ${novo ? 'Novo sorteio' : esc(s.titulo)}</h2>
        ${inp('soTitulo', 'Título', s.titulo)}${inp('soPremio', 'Prémio', s.premio)}${inp('soDesc', 'Descrição curta (opcional)', s.descricao)}
        ${inp('soInicio', 'Começa', s.inicio, 'datetime-local')}${inp('soFim', 'Participações até', s.fim, 'datetime-local')}${inp('soSorteioEm', 'Sorteio automático em', s.sorteioEm, 'datetime-local')}
        ${inp('soLugR', 'Cortesias de reflexologia podal (20 min) — lugares', s.lugaresReflexologia != null ? s.lugaresReflexologia : 5, 'number')}${inp('soLugT', 'Triagens energéticas com pêndulo — lugares', s.lugaresTriagem != null ? s.lugaresTriagem : 5, 'number')}${inp('soOrg', 'Organizador', s.organizador)}${inp('soContacto', 'Contacto para dúvidas (e-mail ou telemóvel)', s.contacto)}${inp('soValidade', 'Prémio válido até (opcional)', s.validadePremio)}
        <label style="display:flex;gap:8px;margin-top:10px;font-size:14px"><input type="checkbox" id="soSemCompra" ${s.semCompra !== false ? 'checked' : ''} ${ro ? 'disabled' : ''}> Participação gratuita, sem obrigação de compra (desligue se o sorteio for para quem marca)</label>
        <label style="display:block;margin-top:10px;font-size:13px;color:#6d6477">Regulamento (pode editar)<textarea id="soReg" rows="14" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:10px;font-size:13.5px" ${ro ? 'disabled' : ''}>${esc(s.regulamento || '')}</textarea></label>
        ${ro ? '' : `<div class="row" style="gap:8px;flex-wrap:wrap;margin-top:10px"><button class="ghost" onclick="soGerarReg()">📜 Gerar regulamento</button><button class="primary" onclick="soGuardar()">💾 Guardar</button></div>`}
        <p class="muted" style="margin-top:8px">Estado: <b>${esc(s.estado)}</b>${s.id && s.estado === 'rascunho' ? ' · Guarde e depois abra para aparecer na página.' : ''}</p>
        ${s.id && s.estado === 'rascunho' ? `<button class="primary" style="width:100%" onclick="soEstado('aberto')">🟢 Abrir (publicar na página)</button>` : ''}
        ${s.id && s.estado === 'aberto' ? `<div class="row" style="gap:8px;flex-wrap:wrap"><button class="ghost" onclick="soEstado('rascunho')">⏸️ Tirar da página</button><a class="ghost" href="${LINK}" target="_blank" style="padding:10px 14px;text-decoration:none">👁️ Ver na página</a></div>` : ''}
      </div>
      <div id="soResto"></div>`;
    if (s.id) { carregarParts().then(desenharResto); }
  }

  function desenharResto() {
    const s = atual, alvo = $('soResto'); if (!alvo) return;
    const validos = parts.filter((p) => !p.excluido);
    const vencs = parts.filter((p) => p.vencedor || p.suplente).sort((a, b) => (a.vencedor ? 0 : a.suplente) - (b.vencedor ? 0 : b.suplente));
    alvo.innerHTML = `<div class="card"><h3>👥 Participações: ${validos.length}</h3><p class="muted">Cortesias reservadas: 🦶 ${parts.filter((x) => (x.servicos || []).includes('reflexologia')).length}/${s.lugaresReflexologia || 0} · 🔮 ${parts.filter((x) => (x.servicos || []).includes('triagem')).length}/${s.lugaresTriagem || 0}. Quem marcar fora das cortesias: use "➕ Marcação / manual".</p>${s.estado === 'aberto' ? `<div class="row" style="gap:6px;flex-wrap:wrap;margin:6px 0"><button class="ghost" onclick="soMaisVaga('reflexologia')">➕ +1 vaga reflexologia</button><button class="ghost" onclick="soMaisVaga('triagem')">➕ +1 vaga triagem</button></div>` : ''}
      ${s.estado === 'sorteado' ? '' : `<div class="row" style="gap:6px;flex-wrap:wrap;margin:8px 0"><input id="soPNome" placeholder="Nome" style="flex:1;min-width:120px;padding:9px;border:1px solid #ddd;border-radius:10px"><input id="soPCont" placeholder="Contacto" style="flex:1;min-width:120px;padding:9px;border:1px solid #ddd;border-radius:10px"><button class="ghost" onclick="soAddPart()">➕ Marcação / manual</button></div>`}
      <div style="max-height:220px;overflow:auto;font-size:13.5px">${validos.map((p) => `<div style="display:flex;justify-content:space-between;gap:8px;padding:5px 0;border-top:1px solid #eee"><span>${esc(p.nome)} <span class="muted">· ${esc(p.contacto)}${p.origem && p.origem !== 'site' ? ' · ' + esc(p.origem) : ''}${(p.servicos || []).length ? ' · ' + p.servicos.map((k) => k === 'reflexologia' ? '🦶' : '🔮').join('') : ''}</span></span><span class="muted">${esc(p.codigo)}${s.estado === 'sorteado' ? '' : ` <a href="#" onclick="soExcluir('${p.id}');return false" title="Excluir">🗑️</a>`}</span></div>`).join('') || '<p class="muted">Ainda ninguém participou.</p>'}</div>
      ${s.estado === 'aberto' || s.estado === 'fechado' ? `<button class="primary" style="width:100%;margin-top:10px" onclick="soSortear()" ${validos.length ? '' : 'disabled'}>🎲 Sortear agora</button><p class="muted">Se não clicar, o sorteio faz-se sozinho à hora marcada (depende da função do servidor estar publicada).</p>` : ''}
    </div>
    ${s.estado === 'sorteado' ? `<div class="card"><h3>🏆 Resultado</h3>${s.semVencedor ? '<p>Sem participações válidas.</p>' : vencs.map((p) => `<div style="padding:6px 0;border-top:1px solid #eee"><b>${p.vencedor ? '🥇 Vencedor' : '🥈 Suplente ' + p.suplente}</b>: ${esc(p.nome)} · ${esc(p.contacto)} · código ${esc(p.codigo)}</div>`).join('')}<p class="muted">Sorteio feito ${s.modo === 'automatico' ? 'automaticamente' : 'à mão, na app'}. Contacte o vencedor e o prémio fica combinado.</p></div>` : ''}
    <div class="card"><h3>📣 Divulgar nas redes sociais</h3>
      <p class="muted">Link do sorteio: <b>${LINK}</b></p>
      <div class="row" style="gap:6px;flex-wrap:wrap;margin-bottom:8px"><button class="ghost" onclick="soCopiarLink()">🔗 Copiar link</button><button class="ghost" onclick="soPartilharLink()">📲 Partilhar</button></div>
      ${publicacoes(s).map((p, i) => `<details style="margin:6px 0"><summary><b>${p[0]}</b></summary><textarea id="soPub${i}" rows="8" style="width:100%;padding:10px;border:1px solid #ddd;border-radius:10px;font-size:13.5px">${esc(p[1])}</textarea><button class="ghost" onclick="soCopiarPub(${i})">📋 Copiar texto</button></details>`).join('')}
      <p class="muted" style="margin-top:8px"><b>Plano de publicações:</b> lançamento (dia de abertura) · stories todos os dias · WhatsApp aos clientes · "Último dia" na véspera do fim · anúncio do vencedor logo após o sorteio.</p>
      <p class="muted">Dica: ponha o link na bio do Instagram e nos stories com o autocolante de link.</p></div>`;
  }

  /* ───── ações ───── */
  const ler = () => {
    const v = (id) => ($(id) ? $(id).value.trim() : '');
    return { titulo: v('soTitulo'), premio: v('soPremio'), descricao: v('soDesc'), inicio: v('soInicio'), fim: v('soFim'), sorteioEm: v('soSorteioEm'), organizador: v('soOrg'), contacto: v('soContacto'), validadePremio: v('soValidade'), semCompra: $('soSemCompra').checked, lugaresReflexologia: Math.max(0, Math.min(50, parseInt(v('soLugR'), 10) || 0)), lugaresTriagem: Math.max(0, Math.min(50, parseInt(v('soLugT'), 10) || 0)), regulamento: $('soReg').value };
  };
  window.soLista = () => ecraLista();
  window.soNovo = () => { atual = novoVazio(); atual.regulamento = regulamento(Object.assign({}, atual, { inicioTs: atual.inicio, fimTs: atual.fim, sorteioTs: atual.sorteioEm })); ecraEditor(); };
  window.soAbrir = async (id) => { atual = lista.find((x) => x.id === id); if (!atual) return; atual = Object.assign({}, atual, { inicio: paraInput(ms(atual.inicioTs)), fim: paraInput(ms(atual.fimTs)), sorteioEm: paraInput(ms(atual.sorteioTs)) }); ecraEditor(); };
  window.soGerarReg = () => { const d = ler(); $('soReg').value = regulamento(Object.assign({}, d, { inicioTs: d.inicio, fimTs: d.fim, sorteioTs: d.sorteioEm })); toast('Regulamento gerado. Pode editar.'); };
  window.soGuardar = async () => {
    const d = ler();
    if (!d.titulo || !d.premio) { toast('Preencha o título e o prémio.', true); return; }
    const ini = new Date(d.inicio), fim = new Date(d.fim), sor = new Date(d.sorteioEm);
    if (isNaN(fim) || isNaN(sor) || isNaN(ini)) { toast('Confirme as datas.', true); return; }
    if (fim <= ini || sor < fim) { toast('A ordem tem de ser: começa, depois fim das participações, depois sorteio.', true); return; }
    const dados = { tenantId: TENANT, titulo: d.titulo, premio: d.premio, descricao: d.descricao, organizador: d.organizador, contacto: d.contacto, validadePremio: d.validadePremio, semCompra: d.semCompra, lugaresReflexologia: d.lugaresReflexologia, lugaresTriagem: d.lugaresTriagem,
      regulamento: d.regulamento || regulamento(Object.assign({}, d, { inicioTs: d.inicio, fimTs: d.fim, sorteioTs: d.sorteioEm })), inicioTs: fs.Timestamp.fromDate(ini), fimTs: fs.Timestamp.fromDate(fim), sorteioTs: fs.Timestamp.fromDate(sor) };
    try {
      if (!atual.id) { const ref = fs.doc(fs.collection(db, 'public_sorteios')); await fs.setDoc(ref, Object.assign(dados, { estado: 'rascunho', criadoTs: fs.serverTimestamp() })); atual.id = ref.id; atual.estado = 'rascunho'; }
      else await fs.updateDoc(fs.doc(db, 'public_sorteios', atual.id), dados);
      Object.assign(atual, d); toast('Sorteio guardado.'); await carregarLista(); ecraEditor();
    } catch (e) { toast('Não consegui guardar: ' + (e.message || e), true); }
  };
  window.soEstado = async (est) => {
    try { await fs.updateDoc(fs.doc(db, 'public_sorteios', atual.id), { estado: est }); atual.estado = est; toast(est === 'aberto' ? 'Sorteio aberto. Já aparece na página.' : 'Sorteio tirado da página.'); await carregarLista(); ecraEditor(); }
    catch (e) { toast('Não consegui: ' + (e.message || e), true); }
  };
  window.soAddPart = async () => {
    const nome = $('soPNome').value.trim(), cont = $('soPCont').value.trim();
    if (nome.length < 2 || cont.length < 5) { toast('Preencha o nome e o contacto.', true); return; }
    const codigo = Array.from(crypto.getRandomValues(new Uint8Array(6))).map((x) => 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'[x % 32]).join('');
    try { await fs.addDoc(fs.collection(db, 'public_sorteios', atual.id, 'participantes'), { nome, contacto: cont, aceitou: true, codigo, criadoEm: fs.serverTimestamp(), origem: 'marcação' }); await carregarParts(); desenharResto(); toast('Participação adicionada.'); }
    catch (e) { toast('Não consegui: ' + (e.message || e), true); }
  };
  window.soExcluir = async (pid) => {
    if (!confirm('Excluir esta participação do sorteio? A vaga que ocupava fica livre outra vez.')) return;
    try {
      const p = parts.find((x) => x.id === pid);
      await fs.updateDoc(fs.doc(db, 'public_sorteios', atual.id, 'participantes', pid), { excluido: true });
      if (p && p.codigo) {
        const l = await fs.getDocs(fs.collection(db, 'public_sorteios', atual.id, 'lugares'));
        for (const d of l.docs) if (d.data().codigo === p.codigo) await fs.deleteDoc(d.ref || fs.doc(db, 'public_sorteios', atual.id, 'lugares', d.id));
      }
      await carregarParts(); desenharResto(); toast('Participação excluída e vaga libertada.');
    } catch (e) { toast('Não consegui: ' + (e.message || e), true); }
  };
  window.soMaisVaga = async (tipo) => {
    const campo = tipo === 'reflexologia' ? 'lugaresReflexologia' : 'lugaresTriagem';
    const novo = Math.min(50, (Number(atual[campo]) || 0) + 1);
    try { await fs.updateDoc(fs.doc(db, 'public_sorteios', atual.id), { [campo]: novo }); atual[campo] = novo; toast('Vaga aberta. Agora são ' + novo + '.'); ecraEditor(); }
    catch (e) { toast('Não consegui: ' + (e.message || e), true); }
  };
  window.soSortear = async () => {
    await carregarParts();
    const validos = parts.filter((p) => !p.excluido);
    if (!validos.length) { toast('Não há participações.', true); return; }
    if (!confirm(`Sortear agora entre ${validos.length} participações? Esta ação não se pode desfazer.`)) return;
    const a = validos.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = aleatorio(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    try {
      const cur = await fs.getDoc(fs.doc(db, 'public_sorteios', atual.id));
      if (cur.data().estado === 'sorteado') { toast('Este sorteio já foi realizado.', true); await carregarLista(); atual = lista.find((x) => x.id === atual.id); ecraEditor(); return; }
      for (let i = 0; i < Math.min(3, a.length); i++) await fs.updateDoc(fs.doc(db, 'public_sorteios', atual.id, 'participantes', a[i].id), i === 0 ? { vencedor: true } : { suplente: i });
      await fs.updateDoc(fs.doc(db, 'public_sorteios', atual.id), { estado: 'sorteado', total: validos.length, vencedorNome: abrev(a[0].nome), vencedorCodigo: a[0].codigo, sorteadoEm: fs.serverTimestamp(), modo: 'manual' });
      toast('Sorteio realizado!'); await carregarLista(); atual = lista.find((x) => x.id === atual.id); ecraEditor();
    } catch (e) { toast('Não consegui sortear: ' + (e.message || e), true); }
  };
  const copiar = async (t) => { try { await navigator.clipboard.writeText(t); toast('Copiado.'); } catch (_) { toast('Não consegui copiar.', true); } };
  window.soCopiarLink = () => copiar(LINK);
  window.soPartilharLink = async () => { try { if (navigator.share) { await navigator.share({ title: atual.titulo, text: atual.titulo, url: LINK }); return; } } catch (_) { return; } copiar(LINK); };
  window.soCopiarPub = (i) => copiar($('soPub' + i).value);

  ecraLista();
}
