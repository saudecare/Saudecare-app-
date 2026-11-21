// Pesquisa por escudos e sistemas — escudo emocional mais ativo -> chakras -> glândulas e órgãos (pontos) -> corpos -> tratamento -> relatório editável.
// Leitura orientativa e complementar. Não é diagnóstico médico.
(function(){
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[m]));

  const CORPOS = { fisico:'Corpo físico', etereo:'Corpo etérico (vitalidade)', astral:'Corpo astral (emoções)', 'mental-inf':'Mental inferior (pensamentos)', 'mental-sup':'Mental superior (propósito)', budico:'Corpo búdico (amor e compaixão)', atmico:'Corpo átmico (essência)' };

  const ESCUDOS = {
    'Desproteção': { emoji:'🛡️', sentido:'Preciso de estar sempre alerta para não ser apanhado(a) de surpresa.', funcao:'Mantém a pessoa em vigilância para se sentir segura.',
      frases:['«Já sei como isto vai acabar.»','«Se relaxo, corre mal.»','«Não posso depender de ninguém.»'], corpos:['etereo','astral'], chakras:['Raiz','Plexo Solar'],
      lente:'aparece como vigilância constante, dificuldade em relaxar e em confiar',
      perguntas:['Em que situações sente que tem de estar sempre alerta?','Quando foi a última vez que se sentiu verdadeiramente em segurança?','Houve algum momento em que foi apanhado(a) de surpresa e isso o(a) marcou?'],
      exemplo:'Pessoa que verifica tudo várias vezes, antecipa o pior e tem dificuldade em descansar, mesmo quando está tudo bem.',
      temas:['Segurança','Proteção','Confiança'], salmos:'Salmo 91 e Salmo 121 (proteção)', afi:'Decido transformar as vezes em que me senti sem proteção em força interior e segurança. Permito que a minha sensação de amparo e bem-estar volte e se fortaleça.' },
    'Desvalorização': { emoji:'💔', sentido:'Não sou suficiente.', funcao:'Antecipa a rejeição através da autocrítica.',
      frases:['«Acho que não estou a fazer bem.»','«Os outros fazem melhor do que eu.»','«A culpa é sempre minha.»'], corpos:['mental-inf','astral'], chakras:['Plexo Solar','Coração'],
      lente:'aparece como autocrítica, perfeccionismo e medo de ser julgado(a)',
      perguntas:['Com quem se compara mais e como se sente nessa comparação?','O que faria se não tivesse medo de falhar?','De quem era a voz que dizia que não era suficiente?'],
      exemplo:'Pessoa que pede desculpa por tudo, cumpre sempre mais do que o necessário e tem dificuldade em aceitar um elogio.',
      temas:['Auto-estima','Poder pessoal','Aceitação'], salmos:'Salmo 139 (valor de cada pessoa)', afi:'Decido transformar as vezes em que me senti menos valioso(a) em força e confiança. Permito que a minha autoestima volte e se fortaleça.' },
    'Impotência': { emoji:'⛓️', sentido:'Eu não posso, não consigo, não adianta.', funcao:'Evita a frustração e o colapso emocional.',
      frases:['«Já tentei tudo.»','«Comigo é diferente, não tem jeito.»','«Não vejo saída.»'], corpos:['mental-inf','etereo','fisico'], chakras:['Sacro','Raiz'],
      lente:'aparece como bloqueio, desânimo e sensação de estar preso(a) sem saída',
      perguntas:['Em que área da vida sente que já não adianta tentar?','O que seria um primeiro passo, mesmo pequeno?','Quando foi a última vez que sentiu que conseguia?'],
      exemplo:'Pessoa que começa e desiste, adia decisões e sente o corpo pesado e sem força para mudar.',
      temas:['Força interior','Coragem','Poder pessoal'], salmos:'Salmo 46 (força e refúgio)', afi:'Deixo ir, com suavidade, as vezes em que me senti incapaz. Permito que em mim cresçam força, confiança e autonomia.' },
    'Sobrevivência': { emoji:'🧱', sentido:'Tenho de resistir para não perder tudo.', funcao:'Mantém a pessoa em esforço constante para garantir o essencial.',
      frases:['«Tenho de aguentar.»','«Não posso falhar, não há margem.»','«Se paro, perco tudo.»'], corpos:['fisico','etereo'], chakras:['Raiz','Plexo Solar'],
      lente:'aparece como cansaço, preocupação com dinheiro e segurança, e dificuldade em parar',
      perguntas:['O que teme perder se abrandar?','Já passou por uma fase de escassez? Como foi?','Quem poderia ajudá-lo(a) a carregar este peso?'],
      exemplo:'Pessoa que trabalha sem parar, preocupa-se muito com o futuro material e tem dificuldade em descansar sem culpa.',
      temas:['Segurança','Abundância','Prosperidade'], salmos:'Salmo 23 e Salmo 37 (sustento e confiança)', afi:'Decido transformar o medo e a insegurança de não conseguir sobreviver em força e resiliência. Permito que a minha sensação de segurança e de sustento volte e se fortaleça.' },
    'Perda': { emoji:'🥀', sentido:'Se me apego, perco.', funcao:'Evita vínculos profundos para não reviver a dor.',
      frases:['«Todos vão embora no fim.»','«Prefiro não criar expectativas.»','«Fico melhor sozinho(a).»'], corpos:['astral','budico'], chakras:['Coração','Garganta'],
      lente:'aparece como distância emocional, medo de se apegar e dificuldade com despedidas',
      perguntas:['Que perda ou separação ainda pesa em si?','O que o(a) impede de se aproximar das pessoas?','O que gostaria de dizer a quem perdeu e não disse?'],
      exemplo:'Pessoa que se afasta quando a relação fica séria, evita falar de afetos e se sente só mesmo acompanhada.',
      temas:['Libertar mágoas','Perdoar','Aceitação','Compaixão'], salmos:'Salmo 23 e Salmo 34 (consolo na dor)', afi:'Deixo ir, com suavidade, a dor, a tristeza e a sensação de perda. Permito que em mim entrem paz, amor e aceitação.' }
  };
  const ESCUDO_NOMES = Object.keys(ESCUDOS);
  // Energias (das 40 da Triagem) a pesquisar primeiro com cada escudo. É só uma sugestão de partida para poupar tempo.
  const ESCUDO_CAUSAS = {
    'Desproteção': [10, 2, 30, 31, 33, 36],
    'Desvalorização': [28, 29, 39, 4, 17, 26],
    'Impotência': [28, 25, 16, 22, 37, 20],
    'Sobrevivência': [22, 38, 18, 30, 14, 37],
    'Perda': [15, 27, 26, 23, 34, 21]
  };
  const causaNome = n => (window.__causaNome && window.__causaNome(n)) || ('Energia ' + n);
  const causaPerg = n => (window.CAUSA_FICHA && window.CAUSA_FICHA[n] && window.CAUSA_FICHA[n].pergunta) || '';

  const CHAKRAS = [
    { nome:'Raiz', emoji:'🔴', corpos:['fisico','etereo'] },
    { nome:'Sacro', emoji:'🟠', corpos:['etereo','astral'] },
    { nome:'Plexo Solar', emoji:'🟡', corpos:['astral','mental-inf'] },
    { nome:'Coração', emoji:'💚', corpos:['astral','budico'] },
    { nome:'Garganta', emoji:'🔵', corpos:['mental-inf','astral'] },
    { nome:'Terceiro Olho', emoji:'🟣', corpos:['mental-sup','mental-inf'] },
    { nome:'Coroa', emoji:'⚪', corpos:['atmico','mental-sup'] }
  ];

  // Pontos: glândulas e órgãos de cada chakra, por sistema.
  const P = (id, chakra, sist, nome, funcao, tema, pergunta) => ({ id, chakra, sist, nome, funcao, tema, pergunta });
  const PONTOS = [
    P('R1','Raiz','Endócrino','Glândulas suprarrenais','Produzem as hormonas do stress (cortisol e adrenalina).','alerta, sobrevivência e esgotamento','Sente que vive em modo de alerta ou de esforço constante?'),
    P('R2','Raiz','Digestivo','Intestino grosso e reto','Eliminam o que o corpo já não precisa.','largar o que já não serve','O que é que ainda guarda e já devia ter largado?'),
    P('R3','Raiz','Músculo-esquelético','Ossos e base da coluna','Sustentam o corpo.','apoio, estrutura e sentir-se sustentado(a)','Sente que tem apoio na vida (família, trabalho, casa)?'),
    P('R4','Raiz','Músculo-esquelético','Pernas e pés','Permitem avançar e estar assente.','direção, avançar e estar presente','Sente que sabe para onde vai, ou que não consegue avançar?'),
    P('S1','Sacro','Endócrino','Gónadas (ovários e testículos)','Produzem as hormonas sexuais.','criatividade, vitalidade e identidade','Sente-se criativo(a) e com vitalidade?'),
    P('S2','Sacro','Reprodutor','Útero e próstata','Órgãos da criação e da linhagem.','criar, acolher e a ligação à família','Como está a sua relação com a família e com o que herdou?'),
    P('S3','Sacro','Urinário','Rins','Filtram e equilibram os líquidos do corpo.','medo e insegurança profunda','Há algum medo que carrega há muito tempo?'),
    P('S4','Sacro','Urinário','Bexiga','Armazena e liberta a urina.','reter ou deixar ir emoções','O que lhe custa deixar ir?'),
    P('P1','Plexo Solar','Digestivo','Estômago','Recebe e começa a digerir os alimentos.','digerir situações e aceitar o que acontece','Que situação sente que não consegue «digerir»?'),
    P('P2','Plexo Solar','Digestivo','Fígado','Filtra e transforma o que entra no corpo.','raiva e frustração guardadas','Há raiva ou ressentimento que não expressou?'),
    P('P3','Plexo Solar','Digestivo','Vesícula biliar','Armazena a bílis, que ajuda a digerir.','decisões, amargura e coragem de agir','Há alguma decisão que está a adiar?'),
    P('P4','Plexo Solar','Endócrino','Pâncreas','Regula o açúcar no sangue e ajuda a digestão.','a doçura da vida, o prazer e a autoestima','Tem permitido momentos de prazer e descanso?'),
    P('P5','Plexo Solar','Linfático e imunitário','Baço','Filtra o sangue e apoia as defesas.','preocupação excessiva e ruminação','Quanto tempo por dia passa a preocupar-se?'),
    P('P6','Plexo Solar','Digestivo','Intestino delgado e duodeno','Absorvem os nutrientes.','absorver o que nutre e discernir','Sente que absorve o que lhe faz bem e deixa passar o que não?'),
    P('C1','Coração','Imunitário','Timo','Treina as defesas do corpo.','autodefesa, amor-próprio e sentir-se atacado(a)','Sente-se protegido(a) por si próprio(a)?'),
    P('C2','Coração','Cardiovascular','Coração','Bombeia o sangue por todo o corpo.','amor, alegria e relações','Quem ou o que lhe aquece o coração hoje?'),
    P('C3','Coração','Respiratório','Pulmões e brônquios','Fazem a troca de oxigénio.','tristeza, luto e o dar e receber','Há uma perda ou tristeza que ainda pesa no peito?'),
    P('C4','Coração','Circulatório e linfático','Vasos linfáticos, artérias e veias','Transportam sangue e linfa.','o fluxo da vida e a alegria a circular','Sente que a vida flui, ou que está estagnada?'),
    P('C5','Coração','Endócrino','Glândulas mamárias','Ligadas a nutrir e a cuidar.','cuidar e ser cuidado(a)','Dá mais aos outros do que a si?'),
    P('G1','Garganta','Endócrino','Tiroide','Regula o metabolismo e o ritmo do corpo.','expressão e ritmo de vida','Sente que a vida corre depressa demais, ou que está parado(a)?'),
    P('G2','Garganta','Endócrino','Paratiroides','Regulam o cálcio no corpo.','firmeza, limites e suporte','Consegue pôr limites sem culpa?'),
    P('G3','Garganta','Respiratório e imunitário','Amígdalas e garganta','Primeira linha de defesa das vias respiratórias.','engolir palavras e medo de falar','O que gostaria de dizer e não disse?'),
    P('G4','Garganta','Digestivo','Esófago','Leva os alimentos até ao estômago.','aceitar e «engolir» situações','O que teve de «engolir» sem querer?'),
    P('G5','Garganta','Endócrino','Glândulas salivares e lacrimais','Produzem saliva e lágrimas.','a emoção que sai, como o choro','Permite-se chorar e expressar o que sente?'),
    P('T1','Terceiro Olho','Endócrino','Hipófise','Comanda outras glândulas do corpo.','controlo e equilíbrio global','Sente que perdeu o controlo de alguma área da vida?'),
    P('T2','Terceiro Olho','Endócrino e nervoso','Hipotálamo','Regula o sono, o apetite e a temperatura.','medo, controlo e ritmos de vida','Como estão o seu sono e o seu apetite?'),
    P('T3','Terceiro Olho','Sentidos','Olhos, nariz e seios nasais','Dão-nos a perceção do mundo.','ver a realidade e o que não quer ver','Há algo que não quer ver?'),
    P('T4','Terceiro Olho','Nervoso','Cérebro (sistema nervoso)','Centro do pensamento e do controlo do corpo.','pensamento excessivo e falta de clareza','Consegue desligar a mente ao fim do dia?'),
    P('K1','Coroa','Endócrino','Epífise (glândula pineal)','Regula os ciclos de sono e vigília.','ritmo, sono e sentido de vida','O que dá sentido aos seus dias?'),
    P('K2','Coroa','Nervoso','Córtex cerebral e sistema nervoso central','Integra o pensamento e a perceção.','ligação, propósito e fé','Sente ligação a algo maior do que si?')
  ];
  // Apometria: técnicas (da ferramenta de apometria) sugeridas por escudo. Sem as mais intensas por defeito.
  const TEC = {
    preparar:['🕯️ Preparar e proteger','5 min','Pede consentimento à pessoa, confirma com o pêndulo e protege-te a ti e ao espaço.'],
    protecao:['🔵 Escudo de proteção','5 min','A pessoa imagina um escudo de luz à sua volta; reforça com a tua intenção e sela.'],
    limpeza:['🧹 Varredura e limpeza do campo','10 min','Com as mãos em concha, desce da cabeça aos pés, transformando o que recolhes em luz violeta.'],
    cordoes:['✂️ Corte de cordões e laços','10 min','Pergunta de que relação quer libertar-se e corta o laço com amor, devolvendo a cada um o que é seu.'],
    vidas:['⏳ Libertar votos e memórias antigas','15 min','Com consentimento, pergunta ao pêndulo que voto ou memória pesa e pede que seja libertado com amor.'],
    chakras:['🌈 Harmonização dos chakras','15 min','Começa pelos mais fechados e termina pelo coração e pela coroa.'],
    reiki:['🤲 Reiki','20 min','Aplica nos pontos indicados pela pesquisa.'],
    oracao:['🙏 Oração ou salmo','5 min','Escolhe na ferramenta «Orações e Salmos» e reza com a pessoa ou envia o link.'],
    meditacao:['🎧 Meditação guiada','15 min','Escolhe a mais adequada ao tema; pode ser ouvida em casa.'],
    espaco:['🏠 Limpeza do espaço','em casa','Arrumar um canto adiado, limpar com sal, som ou fumo e fechar com oração.'],
    casa:['🏡 Plano em casa','em casa','2 ou 3 práticas simples para os dias seguintes.'],
    selar:['🔒 Selar e agradecer','5 min','Sela o campo com luz, aterra a pessoa (pés no chão, água) e marca a próxima sessão.']
  };
  const APO_POR_ESCUDO = {
    'Desproteção':['protecao','limpeza','chakras','oracao'], 'Desvalorização':['limpeza','chakras','reiki','meditacao'], 'Impotência':['limpeza','cordoes','chakras','meditacao'],
    'Sobrevivência':['limpeza','chakras','espaco','casa'], 'Perda':['cordoes','vidas','chakras','oracao','meditacao']
  };
  const NIVEIS = [['ok','Normal','#16a34a'],['alt','Alterado','#d97706'],['mui','Muito alterado','#dc2626']];
  const EPOCAS = ['Gestação','Infância','Adolescência','Idade adulta','Transgeracional (da família)'];
  const NOTA_RECAIDAS = 'Uma nota importante sobre o seu caminho\nSentir-se melhor não quer dizer que nunca mais vai sentir ansiedade, tristeza ou cansaço. É normal que, entre consultas ou depois da alta, alguns momentos voltem, sobretudo em dias de mais stress. Isso não significa que o trabalho falhou, nem que voltou ao início.\nAs emoções fazem parte da vida, e um escudo pode voltar a ativar-se perante situações parecidas com as que o criaram. A consulta abre o caminho e dá-lhe ferramentas. É no dia a dia que vai aprendendo a usá-las: reconhecer o que sente, respirar, dar nome à emoção, pedir ajuda e voltar ao que trabalhámos juntos. Cada recaída é uma oportunidade de se conhecer melhor, e cada vez recupera mais depressa.\nEste acompanhamento é complementar e não substitui o seu médico ou psicólogo.';
  const AVISO = 'Leitura orientativa e complementar, com base na pesquisa feita. Não é um diagnóstico.';

  let S = null;
  const $ = id => document.getElementById(id);
  const hoje = () => new Date().toLocaleDateString('pt-PT');
  const nomeCorpos = ids => (ids || []).map(i => CORPOS[i]).filter(Boolean);

  function corpoOverlay(){
    let o = $('psOverlay');
    if (!o){
      o = document.createElement('div'); o.className = 'patientOverlay'; o.id = 'psOverlay'; o.style.zIndex = 2100;
      o.innerHTML = '<div class="patientOverlayHeader"><strong id="psTitulo"></strong><button onclick="psFechar()">✕</button></div><div class="patientOverlayBody" id="psCorpo"></div>';
      document.body.appendChild(o);
    }
    return o;
  }
  window.psFechar = function(){ $('psOverlay')?.remove(); S = null; };

  window.psAbrir = function(patientId, nome){
    S = { patientId, nome, passo:1, escudo:'', idade:'', epoca:'', vivencia:'', queixas:'', notas:'', notasNoRel:false, pontos:{}, chakras:[], apo:{ on:false, seguro:false }, formato:'unica', secoes:null, extraTrat:'' };
    corpoOverlay(); render();
    if (!window.__psApo) import('./apometria-dados.js?v=2').then(m => { window.__psApo = m; }).catch(() => {});
  };
  const barra = () => `<div style="display:flex;gap:4px;margin-bottom:12px;">${[1,2,3,4,5].map(i => `<div style="flex:1;height:5px;border-radius:3px;background:${i <= S.passo ? 'var(--primary,#2f6f5e)' : '#e5e5e5'};"></div>`).join('')}</div>`;
  const nav = (voltar, seguinte, txt) => `<div class="row" style="margin-top:14px;gap:8px;">${voltar ? '<button class="ghost" onclick="psIr(-1)">← Anterior</button>' : ''}${seguinte ? `<button class="primary" onclick="psIr(1)">${txt || 'Seguinte →'}</button>` : ''}</div>`;

  function render(){
    if (!S) return;
    $('psTitulo').textContent = 'Pesquisa por escudos — ' + S.nome;
    const c = $('psCorpo');
    const f = [p1, p2, p3, p4, p5][S.passo - 1];
    c.innerHTML = barra() + f();
    c.scrollTop = 0;
  }
  window.psIr = function(d){
    if (S.passo === 1 && d > 0){ lerP1(); if (!S.escudo){ toast('Escolhe o escudo mais ativo.', true); return; } if (!S.chakras.length) S.chakras = ESCUDOS[S.escudo].chakras.slice(); }
    if (S.passo === 3) lerP3();
    if (S.passo === 4) lerP4();
    S.passo = Math.max(1, Math.min(5, S.passo + d));
    if (S.passo === 5 && d > 0) S.secoes = gerarSecoes();
    render();
  };

  // PASSO 1 — escudo, idade e época
  function lerP1(){ S.idade = $('psIdade')?.value ?? S.idade; S.epoca = $('psEpoca')?.value ?? S.epoca; S.vivencia = $('psViv')?.value ?? S.vivencia; }
  function p1(){
    const botoes = ESCUDO_NOMES.map(n => { const e = ESCUDOS[n]; const on = S.escudo === n; return `<button class="${on ? 'primary' : 'ghost'}" style="width:100%;text-align:left;margin-top:8px;padding:10px;" onclick="psEscudo('${n}')"><b>${e.emoji} Escudo da ${n === 'Perda' ? 'Perda' : n}</b><br><span style="font-size:.85em;opacity:.85;">${esc(e.sentido)}</span></button>`; }).join('');
    const e = S.escudo ? ESCUDOS[S.escudo] : null;
    return `<div class="card"><h3 style="margin-top:0;">1. Escudo emocional mais ativo</h3>
      <p class="muted">Pesquisa com o pêndulo qual dos 5 escudos está mais ativo agora.</p>${botoes}
      ${e ? `<div style="margin-top:10px;background:#f1f7f4;border-left:3px solid var(--primary,#2f6f5e);padding:8px 10px;border-radius:6px;font-size:.88rem;"><b>Função do escudo:</b> ${esc(e.funcao)}<br><b>Frases típicas:</b> ${e.frases.map(esc).join(' · ')}<br><b>Chakras habitualmente ligados:</b> ${e.chakras.join(', ')}</div>` : ''}
      ${e ? `<div style="margin-top:10px;background:#faf5ff;border-left:3px solid #7c3aed;padding:8px 10px;border-radius:6px;font-size:.86rem;"><b>🔎 Energias a pesquisar primeiro (das 40)</b><br><span class="muted">Sugestão para poupar tempo. Confirma sempre com o pêndulo; na Triagem tens a lista completa.</span>${(ESCUDO_CAUSAS[S.escudo] || []).map(n => `<div style="margin-top:5px;"><b>${n}. ${esc(causaNome(n))}</b>${causaPerg(n) ? `<br><span style="font-style:italic;">${esc(causaPerg(n))}</span>` : ''}</div>`).join('')}</div>` : ''}
      <label style="margin-top:12px;">Com que idade este escudo se ativou? (anos)</label>
      <input id="psIdade" type="number" min="0" max="120" inputmode="numeric" value="${esc(S.idade)}" placeholder="ex: 7">
      <label>Em que época?</label>
      <select id="psEpoca"><option value="">—</option>${EPOCAS.map(x => `<option ${S.epoca === x ? 'selected' : ''}>${x}</option>`).join('')}</select>
      <label>O que estava a viver nessa altura? (com as palavras da pessoa)</label>
      <textarea id="psViv" rows="3" placeholder="ex: A separação dos pais, a mudança de escola…">${esc(S.vivencia)}</textarea>
    </div>${nav(false, true)}`;
  }
  window.psEscudo = function(n){ lerP1(); S.escudo = n; S.chakras = ESCUDOS[n].chakras.slice(); render(); };

  // PASSO 2 — chakras e pontos
  window.psChakra = function(nome){ const i = S.chakras.indexOf(nome); if (i >= 0) S.chakras.splice(i, 1); else S.chakras.push(nome); render(); };
  window.psPonto = function(id, v){ S.pontos[id] = v; const g = $('pg-' + id); if (g) g.querySelectorAll('button').forEach(b => { const on = b.dataset.v === v; b.style.background = on ? b.dataset.c : '#fff'; b.style.color = on ? '#fff' : '#444'; }); };
  function p2(){
    const e = ESCUDOS[S.escudo];
    const chips = CHAKRAS.map(c => `<button class="${S.chakras.includes(c.nome) ? 'primary' : 'ghost'}" style="width:auto;padding:6px 12px;font-size:.85rem;" onclick="psChakra('${c.nome}')">${c.emoji} ${c.nome}${e.chakras.includes(c.nome) ? ' ★' : ''}</button>`).join('');
    const blocos = CHAKRAS.filter(c => S.chakras.includes(c.nome)).map(c => {
      const pts = PONTOS.filter(p => p.chakra === c.nome);
      return `<div class="card" style="margin-top:10px;"><h3 style="margin:0 0 4px;">${c.emoji} Chakra ${c.nome}</h3><div class="muted" style="font-size:.8rem;margin-bottom:6px;">Corpos ligados: ${nomeCorpos(c.corpos).join(' · ')}</div>
        ${pts.map(p => `<div style="padding:8px 0;border-top:1px solid #eee;"><div style="font-weight:600;">${esc(p.nome)} <span class="muted" style="font-weight:400;font-size:.78rem;">· ${esc(p.sist)}</span></div>
          <div id="pg-${p.id}" style="display:flex;gap:6px;margin-top:4px;">${NIVEIS.map(([v, t, cor]) => { const on = (S.pontos[p.id] || 'ok') === v; return `<button type="button" data-v="${v}" data-c="${cor}" onclick="psPonto('${p.id}','${v}')" style="flex:1;padding:7px 4px;border-radius:8px;border:2px solid ${cor};background:${on ? cor : '#fff'};color:${on ? '#fff' : '#444'};font-weight:600;font-size:.8rem;">${t}</button>`; }).join('')}</div></div>`).join('')}</div>`;
    }).join('');
    return `<div class="card"><h3 style="margin-top:0;">2. Chakras, glândulas e órgãos</h3>
      <p class="muted">★ = chakras habitualmente ligados ao escudo escolhido. Marca os que vais pesquisar com o pêndulo. Deixa em «Normal» o que não estiver alterado.</p>
      <div style="display:flex;flex-wrap:wrap;gap:6px;">${chips}</div></div>${blocos}${nav(true, true)}`;
  }

  const alterados = () => PONTOS.filter(p => S.chakras.includes(p.chakra) && (S.pontos[p.id] === 'alt' || S.pontos[p.id] === 'mui'));

  // PASSO 3 — cruzar com queixas
  function lerP3(){ S.queixas = $('psQueixas')?.value ?? S.queixas; S.notas = $('psNotas')?.value ?? S.notas; S.notasNoRel = !!$('psNotasRel')?.checked; }
  function p3(){
    const al = alterados(); const e = ESCUDOS[S.escudo];
    const lista = al.length ? al.map(p => `<div style="padding:8px 0;border-top:1px solid #eee;"><b>${esc(p.nome)}</b> <span style="color:${p_cor(p)};font-weight:700;">· ${S.pontos[p.id] === 'mui' ? 'muito alterado' : 'alterado'}</span><div style="font-size:.85rem;">Representa: ${esc(p.tema)}. Com o escudo da ${S.escudo} ${esc(e.lente)}.</div><div style="font-size:.85rem;font-style:italic;">Pergunta: ${esc(p.pergunta)}</div></div>`).join('') : '<p class="muted">Não marcaste nenhum ponto como alterado. Volta atrás para pesquisar, ou segue só com o escudo.</p>';
    return `<div class="card"><h3 style="margin-top:0;">3. Cruzar pontos com o escudo</h3>
      <p class="muted">Um ponto sozinho é uma pista. O escudo mostra o tom emocional; a história da pessoa confirma.</p>${lista}
      <label style="margin-top:12px;">Queixas (com as palavras da pessoa)</label><textarea id="psQueixas" rows="3" placeholder="ex: Não durmo bem, sinto o peito apertado…">${esc(S.queixas)}</textarea>
      <label>Notas e observações (privadas)</label><textarea id="psNotas" rows="3">${esc(S.notas)}</textarea>
      <label style="display:flex;gap:8px;align-items:center;font-weight:400;"><input id="psNotasRel" type="checkbox" style="width:auto;" ${S.notasNoRel ? 'checked' : ''}> Incluir as notas no relatório do paciente</label></div>${nav(true, true)}`;
  }
  const p_cor = p => S.pontos[p.id] === 'mui' ? '#dc2626' : '#d97706';

  // PASSO 4 — tratamento
  function lerP4(){ S.extraTrat = $('psExtra')?.value ?? S.extraTrat; }
  window.psFormato = function(v){ S.formato = v; render(); };
  function ordemTratamento(){
    const sel = CHAKRAS.filter(c => S.chakras.includes(c.nome) && alterados().some(p => p.chakra === c.nome));
    // do mais baixo para o mais alto; termina no coração e na coroa quando presentes
    const ordem = sel.filter(c => c.nome !== 'Coração' && c.nome !== 'Coroa').concat(sel.filter(c => c.nome === 'Coração'), sel.filter(c => c.nome === 'Coroa'));
    return ordem;
  }
  function etiquetas(){ try { return window.psEtiquetas ? window.psEtiquetas(ESCUDOS[S.escudo].temas, 4) : []; } catch (_) { return []; } }
  window.psApo = function(k, v){ lerP4(); S.apo[k] = v; render(); };
  const corposApometria = () => { const ids = new Set(ESCUDOS[S.escudo].corpos); ordemTratamento().forEach(c => c.corpos.forEach(i => ids.add(i))); return Array.from(ids); };
  const tecnicasApometria = () => ['preparar'].concat(APO_POR_ESCUDO[S.escudo], ['selar']);
  function blocoApometria(){
    const a = S.apo;
    let h = `<h4 style="margin:14px 0 4px;">Apometria (opcional)</h4><label style="display:flex;gap:8px;align-items:center;font-weight:400;"><input type="checkbox" style="width:auto;" ${a.on ? 'checked' : ''} onchange="psApo('on',this.checked)"> Incluir técnicas de apometria no tratamento</label>`;
    if (!a.on) return h + '<p class="muted" style="font-size:.8rem;margin:4px 0 0;">Junta ao pêndulo o trabalho nos corpos subtis ligados ao escudo e aos chakras encontrados.</p>';
    h += `<div style="background:#fff7e6;border:1px solid #f0d9a8;border-radius:8px;padding:8px 10px;margin:8px 0;font-size:.85rem;">⚠️ Não usar com sinais de alerta (doença psiquiátrica, epilepsia, ideias de desistir de viver), menor sem autorização ou grande medo. Pede sempre o consentimento da pessoa.</div>
      <label style="display:flex;gap:8px;align-items:center;font-weight:400;"><input type="checkbox" style="width:auto;" ${a.seguro ? 'checked' : ''} onchange="psApo('seguro',this.checked)"> Confirmo que não há nenhum destes sinais de alerta</label>`;
    if (!a.seguro) return h;
    h += `<p style="margin:8px 0 2px;"><b>Corpos a trabalhar:</b></p><ul style="margin:0 0 0 18px;">${nomeCorpos(corposApometria()).map(c => `<li>${esc(c)}</li>`).join('')}</ul>
      <p style="margin:8px 0 2px;"><b>Técnicas, por ordem:</b></p><ol style="margin:0 0 0 18px;">${tecnicasApometria().map(id => `<li><b>${esc(TEC[id][0])}</b> <span class="muted">(${TEC[id][1]})</span><div class="muted" style="font-size:.82rem;">${esc(TEC[id][2])}</div></li>`).join('')}</ol>`;
    return h;
  }
  function p4(){
    const e = ESCUDOS[S.escudo]; const ord = ordemTratamento(); const et = etiquetas();
    return `<div class="card"><h3 style="margin-top:0;">4. Tratamento com o pêndulo</h3>
      <label>Formato</label>
      <div class="row" style="gap:8px;"><button class="${S.formato === 'unica' ? 'primary' : 'ghost'}" onclick="psFormato('unica')">Consulta única / inicial</button><button class="${S.formato === 'pack4' ? 'primary' : 'ghost'}" onclick="psFormato('pack4')">Pack de 4 consultas</button></div>
      ${S.formato === 'pack4' ? '<p class="muted" style="font-size:.85rem;">1.ª consulta: avaliação. Consultas 2 a 4: tratamento a partir desta avaliação, com reavaliação no fim.</p>' : ''}
      <h4 style="margin:14px 0 4px;">Chakras a tratar, por ordem</h4>
      ${ord.length ? `<ol style="margin:0 0 0 18px;">${ord.map(c => `<li><b>${c.emoji} ${c.nome}</b> — ${alterados().filter(p => p.chakra === c.nome).map(p => esc(p.nome)).join(', ')}<div class="muted" style="font-size:.8rem;">Corpos: ${nomeCorpos(c.corpos).join(' · ')}</div></li>`).join('')}</ol><p class="muted" style="font-size:.8rem;">Trata com o pêndulo em cada chakra, para os órgãos e pontos indicados. Termina no coração e na coroa.</p>` : '<p class="muted">Sem chakras com pontos alterados.</p>'}
      <h4 style="margin:14px 0 4px;">Etiquetas sugeridas</h4>
      ${et.length ? `<ul style="margin:0 0 0 18px;">${et.map(r => `<li>${r.item.heb ? `<span dir="rtl" lang="he" style="font-size:1.1em;">${esc(r.item.heb)}</span> — ` : ''}${esc(r.item.pt)}${r.item.numero ? ' (nome ' + r.item.numero + ')' : ''}</li>`).join('')}</ul>` : '<p class="muted">Sem sugestões automáticas. Escreve abaixo as que vais usar.</p>'}
      <h4 style="margin:14px 0 4px;">Salmos e orações sugeridos</h4><p style="margin:0;">${esc(e.salmos)}</p>
      <h4 style="margin:14px 0 4px;">Afirmação</h4><p style="margin:0;font-style:italic;">«${esc(e.afi)}»</p>
      ${blocoApometria()}
      <label style="margin-top:12px;">Outros (orações, etiquetas, indicações para casa…)</label><textarea id="psExtra" rows="3">${esc(S.extraTrat)}</textarea></div>${nav(true, true, 'Gerar relatório →')}`;
  }

  // PASSO 5 — relatório editável
  function gerarSecoes(){
    const e = ESCUDOS[S.escudo]; const al = alterados(); const sec = [];
    sec.push({ id:'escudo', titulo:'O seu escudo emocional mais ativo', texto:
      `Escudo da ${S.escudo}: «${e.sentido}»\nO que faz: ${e.funcao}\n` + (S.idade || S.epoca ? `Parece ter-se ativado ${S.idade ? 'por volta dos ' + S.idade + ' anos' : ''}${S.epoca ? ' (' + S.epoca.toLowerCase() + ')' : ''}.\n` : '') + (S.vivencia ? `O que a pessoa recorda dessa altura: ${S.vivencia}\n` : '') + `Frases que costumam acompanhar este escudo: ${e.frases.join(' ')}` });
    const porCh = CHAKRAS.filter(c => al.some(p => p.chakra === c.nome));
    sec.push({ id:'pesquisa', titulo:'O que a pesquisa encontrou', texto: porCh.length ? porCh.map(c => `${c.emoji} Chakra ${c.nome} (${nomeCorpos(c.corpos).join(', ')})\n` + al.filter(p => p.chakra === c.nome).map(p => `• ${p.nome} (${p.sist.toLowerCase()}): ${p.funcao} Costuma estar ligado a ${p.tema}.`).join('\n')).join('\n\n') + `\n\nCom o escudo da ${S.escudo}, estes temas ${e.lente}.` : 'Não foram encontrados pontos alterados nesta pesquisa.' });
    sec.push({ id:'perguntas', titulo:'Perguntas para refletir', texto: Array.from(new Set(al.map(p => p.pergunta).concat(e.perguntas))).slice(0, 8).map(q => '• ' + q).join('\n') });
    sec.push({ id:'agora', titulo:'O que pode estar a viver neste momento', texto: (S.queixas ? `O que nos contou: ${S.queixas}\n\n` : '') + `Num escudo da ${S.escudo}, é comum: ${e.exemplo}\nSe se reconhece nisto, não está sozinho(a): é uma forma de o corpo e a mente se protegerem, e pode ir sendo trabalhada.` });
    const ord = ordemTratamento(); const et = etiquetas();
    sec.push({ id:'plano', titulo:'Plano de tratamento', texto: (S.formato === 'pack4' ? 'Formato: pack de 4 consultas (avaliação e três consultas de tratamento).\n' : 'Formato: consulta única / inicial.\n') + (ord.length ? 'Chakras a harmonizar, por ordem: ' + ord.map(c => c.nome).join(' → ') + '.\n' : '') + (et.length ? 'Etiquetas: ' + et.map(r => (r.item.heb ? r.item.heb + ' (' : '') + r.item.pt + (r.item.heb ? ')' : '')).join('; ') + '.\n' : '') + (S.apo.on && S.apo.seguro ? `Trabalho nos corpos subtis (apometria): ${nomeCorpos(corposApometria()).join(', ')}.\nTécnicas: ${tecnicasApometria().map(id => TEC[id][0].replace(/^\S+\s/, '')).join(' → ')}.\n` : '') + `Salmos e orações: ${e.salmos}.\nAfirmação: «${e.afi}»` + (S.extraTrat ? `\n${S.extraTrat}` : '') });
    const A = window.__psApo; if (A && A.DICAS_VIBRACAO){ const dc = A.DICAS_VIBRACAO; const ls = corposApometria().map(i => dc.corpos[i]).filter(Boolean); if (ls.length) sec.push({ id:'casa', titulo:'O que pode fazer em casa', texto: ls.join('\n') + '\n' + (dc.fecho || '') }); }
    if (S.notasNoRel && S.notas.trim()) sec.push({ id:'notas', titulo:'Notas da consulta', texto: S.notas.trim() });
    sec.push({ id:'nota', titulo:'Uma nota importante sobre o seu caminho', texto: NOTA_RECAIDAS.split('\n').slice(1).join('\n') });
    return sec;
  }
  function p5(){
    return `<div class="card"><h3 style="margin-top:0;">5. Relatório (editável)</h3><p class="muted">Podes alterar qualquer texto antes de guardar.</p>
      ${S.secoes.map((s, i) => `<label style="margin-top:10px;font-weight:700;">${esc(s.titulo)}</label><textarea id="psS${i}" rows="${Math.min(12, 3 + Math.floor(s.texto.length / 70))}">${esc(s.texto)}</textarea>`).join('')}
      <p class="muted" style="font-size:.78rem;margin-top:10px;">⚠️ ${AVISO}</p></div>
      <div class="row" style="margin-top:12px;gap:8px;flex-wrap:wrap;"><button class="ghost" onclick="psIr(-1)">← Anterior</button><button class="ghost" onclick="psCopiar()">📋 Copiar</button><button class="primary" onclick="psGuardar()">💾 Guardar na ficha</button></div>`;
  }
  const textoFinal = () => {
    S.secoes.forEach((s, i) => { const t = $('psS' + i); if (t) s.texto = t.value; });
    return `RELATÓRIO — PESQUISA POR ESCUDOS E SISTEMAS\n${S.nome} · ${hoje()}\n\n` + S.secoes.map(s => s.titulo.toUpperCase() + '\n' + s.texto).join('\n\n') + `\n\n${AVISO}`;
  };
  window.psCopiar = function(){ try { navigator.clipboard.writeText(textoFinal()); toast('Relatório copiado.'); } catch (_) { toast('Não foi possível copiar.', true); } };
  window.psGuardar = async function(){
    const texto = textoFinal();
    const dados = { escudo:S.escudo, idade:S.idade, epoca:S.epoca, formato:S.formato, chakras:S.chakras, pontosAlterados: alterados().map(p => ({ id:p.id, nome:p.nome, nivel:S.pontos[p.id] })), data: hoje() };
    const ok = window.guardarNaFicha ? await window.guardarNaFicha(S.patientId, { tipo:'pesquisa_sistemas', titulo:'Pesquisa por escudos e sistemas — ' + hoje(), texto, dados }) : false;
    if (ok && window.anexarNotasClinicas) await window.anexarNotasClinicas(S.patientId, 'Pesquisa por escudos e sistemas', [{ rotulo:'Queixas', valor:S.queixas }, { rotulo:'Notas clínicas', valor:S.notas }]);
    toast(ok ? 'Guardado na ficha do paciente.' : 'Não foi possível guardar.', !ok);
  };
})();
