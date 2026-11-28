/* Avaliação Energética — mapa para fazer ANTES de qualquer terapia.
   Reúne, num só relatório pessoal: o perfil energético da pessoa (luz e sombra), a casa, o carro e o
   negócio (se trabalhar por conta própria), a compatibilidade de tudo com a energia da pessoa, o tipo de
   trabalho com mais afinidade, o passado e o presente, e os pontos a ter em atenção no atendimento,
   ajustados à terapia marcada (Reiki, pêndulo, reflexologia, outras).
   Não mexe em Firebase nem em rede: recebe dados, devolve o modelo para o relatório bonito
   (relatorio-bonito.js). Escrito em nome do terapeuta; nunca fala de IA. */
import {
  vibracaoMista, caminhoDeVida, expressao, motivacao, impressao, licoesCarmicas, excessoNumerologico,
  calcularAnjoNascimento, calcularArcanoPessoal, calcularNodosLunares, calcularCiclosPessoais, calcularMestreDia,
  getSigno, getDiaSemanaNome, ARCANOS_MAIORES, DONS_NUMERICOS, GUIA_VIB
} from './avaliacao-numeros.js';

export const AVALIACAO_VERSAO = '2026-11-28-1';

const BASE = n => (n === 11 ? 2 : n === 22 ? 4 : n === 33 ? 6 : n);

/* ─── Tabelas de texto (informal, português de Portugal, sem palavras que assustem) ─── */
const PESSOA = {
  1: { tit: 'Iniciativa', luz: 'coragem, independência e vontade de abrir caminho', sombra: 'impaciência, teimosia e querer fazer tudo à tua maneira' },
  2: { tit: 'Sensibilidade e parceria', luz: 'escuta, empatia e jeito para unir as pessoas', sombra: 'dar demais, ceder para evitar conflitos e duvidar de ti' },
  3: { tit: 'Expressão e alegria', luz: 'comunicação, criatividade e boa disposição', sombra: 'dispersares-te e esconder tristezas atrás de um sorriso' },
  4: { tit: 'Base e ordem', luz: 'responsabilidade, método e constância', sombra: 'rigidez, medo de arriscar e preocupação em excesso' },
  5: { tit: 'Liberdade e mudança', luz: 'curiosidade, adaptação e coragem para mudar', sombra: 'inquietação, pressa e dificuldade em assentar' },
  6: { tit: 'Amor e cuidado', luz: 'carinho, família e sentido de proteção', sombra: 'cuidar de todos e esqueceres-te de ti, com dificuldade em dizer não' },
  7: { tit: 'Silêncio e sabedoria', luz: 'profundidade, intuição e vida interior', sombra: 'isolares-te, desconfiar e fechares-te' },
  8: { tit: 'Força e realização', luz: 'capacidade de trabalho, liderança e de concretizar o que sonhas', sombra: 'trabalhar demais, medir o teu valor pelo que fazes ou ganhas, e querer controlar tudo' },
  9: { tit: 'Compaixão e entrega', luz: 'generosidade, visão ampla e vontade de ajudar', sombra: 'sofreres com as dores dos outros e dares mais do que tens' },
  11: { tit: 'Intuição elevada', luz: 'sensibilidade, inspiração e uma antena fina para o que não se vê', sombra: 'nervosismo e cansaço por absorveres o que está à tua volta' },
  22: { tit: 'Construção em grande', luz: 'visão com os pés na terra e capacidade de realizar coisas grandes', sombra: 'carregares tudo às costas e sentires o peso da responsabilidade' },
  33: { tit: 'Cuidado de almas', luz: 'amor em ação e entrega aos outros', sombra: 'sacrificares-te e esqueceres as tuas próprias necessidades' }
};
const ALMA = { 1: 'ser livre e decidir o teu caminho', 2: 'paz, ligação e ser compreendido(a)', 3: 'exprimir-te e viver com alegria', 4: 'segurança e coisas bem construídas', 5: 'liberdade e experiências novas', 6: 'amor, família e um lar tranquilo', 7: 'silêncio, sentido e verdade interior', 8: 'realizar, ter autonomia e ser reconhecido(a)', 9: 'servir e deixar o mundo um pouco melhor', 11: 'inspirar e seguir a tua intuição', 22: 'construir algo grande e útil', 33: 'amar e cuidar sem condições' };
const LICAO = { 1: 'confiar em ti e tomar a iniciativa', 2: 'pedir ajuda e cooperar', 3: 'exprimir o que sentes', 4: 'criar rotinas e ter paciência', 5: 'aceitar a mudança com confiança', 6: 'pedir e receber carinho, sem carregar tudo', 7: 'ter momentos de silêncio e confiar na tua intuição', 8: 'dar valor ao teu trabalho, ao dinheiro e ao descanso', 9: 'deixar ir o que já terminou' };
const ANO = {
  1: 'um ano de recomeços: bom para dar o primeiro passo naquilo que adiaste.',
  2: 'um ano de paciência e de relações: as coisas amadurecem devagar.',
  3: 'um ano de expressão e alegria: bom para criar, falar e conviver.',
  4: 'um ano de construir bases: arrumar a vida, as contas e as rotinas.',
  5: 'um ano de mudança e movimento: nada fica igual, e isso é bom.',
  6: 'um ano de casa, família e cuidado: o lar ganha destaque.',
  7: 'um ano de recolhimento e de olhar para dentro.',
  8: 'um ano de realização: de colher resultados e organizar o dinheiro.',
  9: 'um ano de fechar ciclos: de soltar o que já não faz sentido.',
  11: 'um ano de intuição forte e sensibilidade em alta: de ouvir sinais, descansar mais e decidir com calma.',
  22: 'um ano de grandes passos práticos: de construir com paciência.'
};
const CASA = {
  1: 'casa de recomeços e de independência; pode ficar um pouco “sozinha” se não entrar vida nela',
  2: 'casa de paz e de partilha; pede cuidado para não se calarem coisas que precisam de ser ditas',
  3: 'casa alegre e sociável, com visitas e conversa; pede atenção à desarrumação',
  4: 'casa de estabilidade e segurança; pede cuidado para não ficar pesada ou demasiado rígida',
  5: 'casa de movimento, visitas e mudanças; pode dar a sensação de “casa de passagem”',
  6: 'casa de família, amor e cuidado, a mais “lar” de todas; pede atenção a quem cuida de tudo para não ficar sobrecarregado(a)',
  7: 'casa de silêncio e recolhimento, boa para estudar e meditar; pode isolar',
  8: 'casa de trabalho e de concretização; pede limites entre casa e trabalho, e descanso',
  9: 'casa de acolhimento e de fecho de ciclos; passa muita gente por ela e convém proteger a energia',
  11: 'casa muito sensível, de intuição forte; pode tornar-se nervosa, pede calma e luz suave',
  22: 'casa de grandes projetos; pede organização para não pesar',
  33: 'casa de serviço, que acolhe os outros; pede cuidado para não estar sempre “de portas abertas”'
};
const CARRO = {
  1: 'carro de independência e iniciativa; atenção à pressa',
  2: 'carro de partilha, bom para viajar acompanhado(a); tende a absorver o humor de quem vai lá dentro',
  3: 'carro sociável, uma “sala de conversa”; atenção às distrações (telemóvel, música alta)',
  4: 'carro de segurança e de trabalho; pede revisões em dia',
  5: 'carro de movimento e de liberdade, o número da estrada; combina com fases de mudança e pede calma ao volante, sem pressas nem distrações',
  6: 'carro de família e de cuidado, que leva quem amas; pede ordem e limpeza',
  7: 'carro de recolhimento, bom para pensar; atenção à cabeça “na lua”',
  8: 'carro de trabalho e de estatuto; atenção ao stress e à pressa',
  9: 'carro de longas viagens e de ajudar os outros',
  11: 'carro muito sensível ao estado de espírito de quem o conduz; pede calma e luz suave por dentro',
  22: 'carro de grandes percursos e responsabilidades; pede manutenção cuidada',
  33: 'carro de quem leva os outros; pede que também cuides do teu descanso'
};
const NEGOCIO = {
  1: 'negócio de iniciativa própria, que depende muito de ti; pede cuidado para não fazeres tudo sozinho(a)',
  2: 'negócio de parcerias e de atendimento próximo; vive de confiança e de boa relação',
  3: 'negócio de comunicação e de criatividade; pede foco para não te dispersares',
  4: 'negócio de estrutura e de método; pede flexibilidade',
  5: 'negócio de movimento, variedade e vendas; pede constância',
  6: 'negócio de cuidado e de serviço às pessoas; pede limites para não dares tudo',
  7: 'negócio de conhecimento e de especialização; pede que aprendas a mostrar-te',
  8: 'negócio de resultados e de crescimento; pede equilíbrio entre trabalho e descanso',
  9: 'negócio de entrega e de ajuda; pede que cobres o que é justo',
  11: 'negócio de inspiração e de intuição; pede organização prática',
  22: 'negócio de grande alcance; pede passos pequenos e firmes',
  33: 'negócio de serviço e de cura; pede que cuides de ti primeiro'
};
// Centros de energia a ter em atenção, por número (nomes simples, sem termos que assustem)
const FOCO = {
  1: ['Raiz', 'Plexo Solar'], 2: ['Coração', 'Plexo Solar'], 3: ['Garganta', 'Sacro'], 4: ['Raiz', 'Plexo Solar'],
  5: ['Garganta', 'Sacro'], 6: ['Coração', 'Raiz'], 7: ['Terceiro Olho', 'Coroa'], 8: ['Raiz', 'Plexo Solar'],
  9: ['Coração', 'Coroa'], 11: ['Terceiro Olho', 'Coroa'], 22: ['Raiz', 'Plexo Solar'], 33: ['Coração', 'Garganta']
};
const CENTRO_PARA = {
  'Raiz': 'a sensação de segurança e de chão debaixo dos pés',
  'Plexo Solar': 'a força de vontade e o cansaço de quereres tudo bem feito',
  'Coração': 'os afetos, o cuidar dos outros e o cuidares-te a ti',
  'Garganta': 'dizeres o que sentes sem engolir',
  'Sacro': 'as emoções e o prazer das coisas simples',
  'Terceiro Olho': 'a cabeça, a intuição e o pensar demais',
  'Coroa': 'a calma e a ligação ao que é maior do que tu'
};


// Textos em "tu" (as tabelas do Mapa da Alma tratam por "você"; aqui o relatório fala sempre por tu)
const DOM_TU = {
  1: 'Tens jeito para começar coisas, liderar e abrir caminhos.',
  2: 'Tens sensibilidade e jeito para ouvir, mediar e trabalhar em parceria.',
  3: 'Tens o dom de comunicar, criar e animar quem está à tua volta.',
  4: 'Tens método, constância e talento para organizar e construir com segurança.',
  5: 'Tens energia de movimento, de adaptação e talento para o contacto com as pessoas.',
  6: 'Tens vocação natural para cuidar, ensinar e acolher.',
  7: 'Tens profundidade, gosto de estudar e uma procura sincera da verdade.',
  8: 'Tens talento para organizar, liderar e transformar esforço em resultados.',
  9: 'Tens o dom de ajudar, de ver o quadro maior e de fechar ciclos com sabedoria.',
  11: 'Tens uma intuição muito apurada, que pede descanso e calma para não te sobrecarregar.',
  22: 'Tens uma capacidade prática fora do comum para construir coisas grandes.',
  33: 'Tens amor em ação e uma entrega natural aos outros, que pede que também cuides de ti.'
};
const DINHEIRO_TU = {
  1: 'Com o dinheiro, ganhas quando começas e decides. Define uma meta por mês e dá o primeiro passo. Cuidado com decidires tudo sozinho(a) e gastares por impulso.',
  2: 'Com o dinheiro, ganhas mais em parceria e com paciência. Define o valor do teu trabalho e diz esse valor sem medo. Cuidado com dependeres dos outros.',
  3: 'Com o dinheiro, rende o que partilhas e ensinas. Escolhe uma fonte criativa de cada vez. Cuidado com gastares a pensar só no momento.',
  4: 'Com o dinheiro, constróis devagar, com regras e registos. Mantém um caderno de contas em dia. Cuidado com a rigidez e o medo de arriscar.',
  5: 'Com o dinheiro, ganhas com variedade e adaptação. Separa um valor fixo todos os meses antes de gastar. Cuidado com os gastos por impulso.',
  6: 'Com o dinheiro, sustentas o lar. Reserva todos os meses um valor só para ti, sem culpa. Cuidado com pores os outros sempre primeiro.',
  7: 'Com o dinheiro, ganhas com conhecimento e confiança. Escolhe um dia fixo para ver as contas. Cuidado com desligares-te da parte prática.',
  8: 'Com o dinheiro, tens capacidade para gerir e criar abundância. Tira um dia por semana sem trabalho e tem um dia fixo para as contas. Cuidado com trabalhares demais e medires o teu valor pelo que ganhas.',
  9: 'Com o dinheiro, ganhas ao servir os outros com amor. Cobra sempre o que é justo e dá com medida. Cuidado com dares mais do que podes.',
  11: 'Com o dinheiro, as boas decisões chegam com calma, não com pressa. Espera uma noite antes de qualquer decisão importante.',
  22: 'Com o dinheiro, constróis em grande, com base prática. Divide cada grande objetivo em passos mensais.',
  33: 'Com o dinheiro, cuida primeiro das tuas contas e só depois ajuda os outros.'
};
const NODO_SUL_TU = {
  'Carneiro': 'Trazes experiência de agir sozinho(a) e de começar sem esperar por ninguém. O que convém vigiar é a impaciência com quem tem outro ritmo.',
  'Touro': 'Trazes experiência de estabilidade e do prazer das coisas simples. O que convém vigiar é o apego às posses e à zona de conforto.',
  'Gémeos': 'Trazes experiência de comunicação e de curiosidade por tudo um pouco. O que convém vigiar é a dispersão nos laços mais próximos.',
  'Caranguejo': 'Trazes experiência de cuidar do lar e da família. O que convém vigiar é o apego ao passado e a dependência afetiva.',
  'Leão': 'Trazes experiência de criatividade e de brilho pessoal. O que convém vigiar é a necessidade constante de reconhecimento.',
  'Virgem': 'Trazes experiência de serviço prático e de atenção ao detalhe. O que convém vigiar é o perfeccionismo e a autocrítica que paralisa.',
  'Balança': 'Trazes experiência de diplomacia e de parcerias. O que convém vigiar é depender da aprovação dos outros e a indecisão.',
  'Escorpião': 'Trazes experiência de intensidade emocional e de transformação. O que convém vigiar é o controlo e a desconfiança.',
  'Sagitário': 'Trazes experiência de fé e de procura através de viagens e estudo. O que convém vigiar é fugir a compromissos.',
  'Capricórnio': 'Trazes experiência de disciplina e de ambição. O que convém vigiar é a rigidez e o medo de mostrar vulnerabilidade.',
  'Aquário': 'Trazes experiência de pensar por ti e de causas coletivas. O que convém vigiar é o desapego emocional.',
  'Peixes': 'Trazes experiência de entrega espiritual e de compaixão. O que convém vigiar é fugir da realidade e sacrificares-te demais.'
};
const NODO_NORTE_TU = {
  'Balança': 'aprender a cooperar e a ter o outro em conta antes de agir sozinho(a).',
  'Escorpião': 'largar o apego ao material e mergulhar na transformação emocional.',
  'Sagitário': 'procurar um sentido maior, em vez de te perderes em pequenos detalhes.',
  'Capricórnio': 'assumir responsabilidade e estrutura, saindo da zona de conforto emocional.',
  'Aquário': 'servir o coletivo, saindo do centro das atenções.',
  'Peixes': 'confiar e entregar-te ao fluxo da vida, largando o controlo em excesso.',
  'Carneiro': 'agires por ti, sem depender da validação dos outros.',
  'Touro': 'construir a tua própria segurança e paz material.',
  'Gémeos': 'ouvir e trocar ideias, sem impor uma única verdade.',
  'Caranguejo': 'cuidar dos laços emocionais, sem te esconderes atrás do trabalho.',
  'Leão': 'exprimires-te com autenticidade, sem te perderes dentro do grupo.',
  'Virgem': 'organizar e servir com discernimento prático, sem te dispersares.'
};
function passosCasa(num) {
  const g = GUIA_VIB[num]; if (!g) return '';
  return `Abre todas as janelas durante 10 minutos e lava o chão com um pouco de sal grosso na água. Põe a cor ${g.cor} em pequenos detalhes (uma almofada, uma vela, um quadro) na sala e junto da entrada. Coloca ${g.cristal} perto da porta de entrada, num sítio discreto. Ao chegares, diz com calma: “${g.frase}” Rotina da semana: ${g.rotina}.`;
}
function passosCarro(num) {
  const g = GUIA_VIB[num]; if (!g) return '';
  return `Mantém o carro limpo e arrumado por dentro. Leva um pequeno objeto de cor ${g.cor} (ou ${g.cristal}). Antes de ligares o carro, diz em voz baixa: “${g.frase}”`;
}

const TERAPIAS = {
  reiki: { nome: 'Reiki' }, pendulo: { nome: 'Pêndulo' }, reflexologia: { nome: 'Reflexologia podal' },
  biomicrohertz: { nome: 'Terapia marcada' }, outra: { nome: 'Terapia marcada' }
};

function afinidade(numPessoa, numItem) {
  const a = BASE(numPessoa), b = BASE(numItem);
  const grupos = [[1, 5, 7], [2, 4, 6, 8], [3, 6, 9]];
  if (a === b) return { nivel: 'ok', rotulo: '💚 Muito afinado' };
  if (Math.abs(a - b) === 1 || grupos.some(g => g.includes(a) && g.includes(b))) return { nivel: 'ok', rotulo: '💚 Combina bem contigo' };
  return { nivel: 'atencao', rotulo: '🟡 Pede um pouco de atenção' };
}
const lista = a => a.filter(Boolean);
const nomeCurto = n => String(n || '').trim().split(/\s+/)[0] || '';
const formataData = iso => { const [y, m, d] = String(iso).split('-'); return `${d}/${m}/${y}`; };

/* ─── Cálculo ─── */
export function calcularAvaliacao(d) {
  const nome = (d.nome || '').trim();
  const nasc = d.nascimento; // AAAA-MM-DD
  const hoje = d.hoje || new Date().toISOString().slice(0, 10);
  const cv = caminhoDeVida(nasc), exp = expressao(nome), mot = motivacao(nome), imp = impressao(nome);
  const r = {
    nome, nasc, hoje, cv, exp, mot, imp,
    signo: getSigno(nasc).nome, dia: getDiaSemanaNome(nasc),
    anjo: calcularAnjoNascimento(nasc), arcano: calcularArcanoPessoal(nasc), nodos: calcularNodosLunares(nasc),
    ciclos: calcularCiclosPessoais(nasc, hoje), mestre: calcularMestreDia(nasc),
    carmicas: licoesCarmicas(nome), excesso: excessoNumerologico(nome)
  };
  r.casa = d.casaNumero ? { texto: String(d.casaNumero), num: vibracaoMista(String(d.casaNumero)) } : null;
  r.carro = d.matricula ? { texto: d.matricula, num: vibracaoMista(d.matricula) } : null;
  r.negocio = d.negocioNome ? { texto: d.negocioNome, num: expressao(d.negocioNome) } : null;
  return r;
}

/* ─── Modelo do relatório ─── */
export function montarModeloAvaliacao(d) {
  const r = calcularAvaliacao(d);
  const n1 = d.tratamento || nomeCurto(d.nome);
  const T = TERAPIAS[d.terapia] || TERAPIAS.outra;
  const terapiaNome = d.terapiaNome || T.nome;
  const P = PESSOA, B = [];
  const foco = [...new Set([...(FOCO[r.cv] || []), ...(FOCO[r.mot] || [])])].slice(0, 4);
  const arcano = ARCANOS_MAIORES[r.arcano];
  const dom = DONS_NUMERICOS[r.cv], domMot = DONS_NUMERICOS[r.mot];

  B.push({ tipo: 'texto', icone: '🌟', titulo: `Olá, ${n1}`, paras: [
    `Antes da tua sessão de ${terapiaNome}, quis conhecer-te melhor: como é a tua energia, a da tua casa${r.carro ? ', a do teu carro' : ''}${r.negocio ? ' e a do teu negócio' : ''}, e se tudo isso anda em sintonia contigo. 🤍`,
    'Está escrito de forma simples, para leres com calma. Vai ler-se como uma conversa, e no fim peço-te que me digas se faz sentido, porque quem te conhece melhor és tu.'
  ] });

  B.push({ tipo: 'destaque', icone: '🧭', titulo: 'Os teus números-chave', chips: lista([
    { rotulo: 'Caminho de vida', valor: String(r.cv) }, { rotulo: 'O que a tua alma quer', valor: String(r.mot) },
    { rotulo: 'Como te mostras', valor: String(r.exp) }, { rotulo: 'Como os outros te veem', valor: String(r.imp) },
    { rotulo: 'Signo', valor: r.signo }, { rotulo: 'Ano pessoal ' + r.hoje.slice(0, 4), valor: String(r.ciclos.anoPessoal) }
  ]), paras: [] });

  B.push({ tipo: 'numeros', icone: '🔢', titulo: 'O que cada número diz de ti', itens: [
    { valor: r.cv, rotulo: `Caminho de vida · ${P[r.cv].tit}`, texto: `É o caminho que vieste aprender. O teu dom é ${P[r.cv].luz}.\n${DOM_TU[r.cv] || ''}` },
    { valor: r.mot, rotulo: `O que a tua alma quer · ${P[r.mot].tit}`, texto: `No fundo, o que mais procuras é ${ALMA[r.mot]}. ${r.mot === 11 ? 'É um número mestre: uma sensibilidade e uma intuição acima da média, que também cansam, por isso pede descanso e silêncio.' : ''}` },
    { valor: r.exp, rotulo: `Como te mostras · ${P[r.exp].tit}`, texto: `É a energia que usas no dia a dia e que os outros sentem em ti: ${P[r.exp].luz}.` },
    { valor: r.imp, rotulo: `Como os outros te veem · ${P[r.imp].tit}`, texto: `A primeira impressão que passas: ${P[r.imp].luz}.` }
  ] });

  const ang = r.anjo;
  B.push({ tipo: 'texto', icone: '🕊️', titulo: 'O teu Anjo, o teu Arcano e o teu dia', paras: lista([
    ang && `O teu Anjo da guarda é ${ang.nome} (coro das ${ang.coro}), regido pelo ${ang.arcanjoRegente}. Ajuda sobretudo em: ${String(ang.dominioDoCoro).toLowerCase().replace(/\.$/, '')}. ${ang.virtude}`,
    arcano && `O teu Arcano pessoal é ${arcano.nome}: ${arcano.texto}`,
    r.mestre && `Nasceste ${r.mestre.nasceuNum}. ${r.mestre.texto}`
  ]) });

  B.push({ tipo: 'texto', icone: '☀️', titulo: 'A tua luz', paras: lista([
    `A tua luz está em ${P[r.cv].luz}. ${DOM_TU[r.cv] || ''}`,
    r.mot !== r.cv && `Por dentro, ${P[r.mot].luz}.`,
    r.mestre && `Do teu dia de nascimento trazes ${r.mestre.dons}.`
  ]) });
  B.push({ tipo: 'texto', icone: '🌙', titulo: 'A tua sombra', paras: lista([
    'A sombra não é um defeito: é o sítio onde tens mais para crescer, e todos temos a nossa. Costuma aparecer quando estás cansado(a) ou sob pressão.',
    `No teu caminho, pode traduzir-se em ${P[r.cv].sombra}.`,
    r.mot !== r.cv && `Na tua parte mais sensível: ${P[r.mot].sombra}.`,
    r.mestre && `Do teu dia de nascimento, atenção a ${r.mestre.atencao}.`,
    r.carmicas.length && `Falta-te, no nome, o número ${r.carmicas.join(' e ')}, o que costuma pedir que aprendas a ${r.carmicas.map(c => LICAO[c]).filter(Boolean).join(' e a ')}.`,
    r.excesso.length && `Há também muita energia do número ${r.excesso.join(' e ')} no teu nome: ${r.excesso.map(e => PESSOA[e] ? PESSOA[e].luz : '').filter(Boolean).join('; ')}. Em excesso, isto pode pesar.`
  ]) });

  if (d.imagens && d.imagens.length) B.push({ tipo: 'figuras', icone: '🪐', titulo: 'As energias que te acompanham', itens: d.imagens });

  // Passado e presente
  const ns = NODO_SUL_TU[r.nodos.nodoSul.signo], nn = NODO_NORTE_TU[r.nodos.nodoNorte.signo];
  B.push({ tipo: 'texto', icone: '⏳', titulo: 'O que podes ter vivido no passado e o que vives agora', paras: lista([
    ns && `Do passado (e talvez de outras vidas, se acreditares nisso): ${ns[0].toLowerCase()}${ns.slice(1)}`,
    nn && `O que a vida te convida a fazer agora é ${nn}`,
    `Neste momento estás num ano pessoal ${r.ciclos.anoPessoal}: ${ANO[r.ciclos.anoPessoal] || 'um tempo de atenção ao que é importante.'}`,
    (d.momento || []).length && `Contaste-me que ${(d.momento || []).join(' e que ')}. Isto também pesa na energia do momento, e é normal sentires mais cansaço ou mais emoção nesta fase.`
  ]) });

  // Casa, carro, negócio
  const linhas = [];
  const caso = (rot, o, TAB) => {
    if (!o) return;
    const af = afinidade(r.cv, o.num);
    linhas.push([rot, `${o.num}`, TAB[o.num] || '', af.rotulo]);
  };
  caso('Casa nº ' + (r.casa ? r.casa.texto : ''), r.casa, CASA);
  caso('Carro ' + (r.carro ? r.carro.texto : ''), r.carro, CARRO);
  caso('Negócio ' + (r.negocio ? r.negocio.texto : ''), r.negocio, NEGOCIO);
  if (linhas.length) B.push({ tipo: 'lista', icone: '🏡', titulo: 'A energia de tudo o que te rodeia', marca: '•', itens: [
    `Comparei cada número com o teu caminho de vida (${r.cv}). 💚 quer dizer que apoia a tua energia; 🟡 quer dizer que é diferente da tua e que vale a pena dar-lhe um pouco de atenção.`,
    ...linhas.map(l => `${l[3]} · ${l[0]} (número ${l[1]}): ${l[2]}.`)
  ] });
  if (!r.negocio) B.push({ tipo: 'texto', icone: '💼', titulo: 'Trabalho por conta própria', paras: ['Se trabalhas por conta própria ou tens um negócio, diz-me o nome e a atividade e eu junto a leitura dele a esta avaliação.'] });

  // Harmonizar
  const cor = (GUIA_VIB[r.cv] || {}).cor || 'tons suaves';
  const passos = lista([
    r.casa && `Casa ${r.casa.texto} (número ${r.casa.num}): ` + passosCasa(r.casa.num),
    d.casaAVenda && 'Com a casa à venda: abre as janelas todos os dias, deixa entrar luz, tira o que está a mais e põe um pormenor com cheiro agradável (flores ou um ramo de alecrim). Uma casa leve e arrumada recebe melhor quem a visita e também te faz bem a ti.',
    d.emCasaDeFamiliar && `Onde estás agora: escolhe um cantinho só teu (uma mesinha com uma vela, uma planta ou uma fotografia, em tons de ${cor}) para teres onde te recolheres e respirar.`,
    r.carro && `Carro ${r.carro.texto} (número ${r.carro.num}): ` + passosCarro(r.carro.num)
  ]);
  if (passos.length) B.push({ tipo: 'orientacoes', icone: '🌿', titulo: 'Como harmonizar, passo a passo', intro: 'Pequenos gestos, sem custo, para a energia de cada sítio ficar mais afinada contigo:', itens: passos });

  // Trabalho com afinidade (Espelho)
  const numsAfin = [...new Set([r.cv, r.mot, r.exp])];
  B.push({ tipo: 'texto', icone: '💼', titulo: 'O tipo de trabalho que mais combina contigo', paras: [
    ...numsAfin.filter(n => DONS_NUMERICOS[n]).map(n => `${DOM_TU[n]} Áreas com afinidade: ${DONS_NUMERICOS[n].profissoes}.`),
    DINHEIRO_TU[r.cv] || ''
  ] });

  // Atenção no atendimento
  const nomesFoco = foco.map(f => `${f} (${CENTRO_PARA[f]})`);
  const aten = lista([
    `Na tua sessão vamos dar mais atenção a: ${nomesFoco.join('; ')}.`,
    d.terapia === 'reiki' && 'Começamos com uns minutos de conversa e de respiração para chegares com calma. As mãos passam pelos centros de energia com um ritmo suave, e podes pedir uma pausa sempre que quiseres. É normal sentires calor, formigueiro, sono ou vontade de chorar: passa.',
    d.terapia === 'pendulo' && 'Na pesquisa com o pêndulo vamos ver com mais cuidado estas áreas e perceber o que vale a pena limpar primeiro.',
    d.terapia === 'reflexologia' && 'Na reflexologia podal vamos escolher um ritmo calmo, com mais atenção às zonas ligadas ao relaxamento e ao descanso.',
    (d.terapia !== 'reiki' && d.terapia !== 'pendulo' && d.terapia !== 'reflexologia') && 'Vou adaptar o ritmo do atendimento ao que sentires no dia.',
    [2, 6, 8, 9, 11, 33].includes(r.cv) || r.mot === 11 ? 'Como tens tendência a dar muito de ti aos outros, durante a sessão não tens de fazer nada: só receber.' : '',
    ...(d.casaAVenda ? ['Com a casa à venda e uma fase de mudança, vamos reforçar a sensação de segurança e de chão debaixo dos pés (o centro da Raiz).'] : [])
  ]);
  B.push({ tipo: 'lista', icone: '🎯', titulo: 'O que vamos ter em atenção no atendimento', marca: '•', itens: aten });

  // Faz sentido?
  const href = 'https://wa.me/351928122918?text=' + encodeURIComponent(`Olá Ricardo! Li a minha avaliação energética.\nO que mais faz sentido para mim: \nO que não faz sentido: \nO que gostava de te contar: `);
  B.push({ tipo: 'texto', icone: '💭', titulo: 'Agora quero saber de ti', paras: [
    'Isto é um retrato feito a partir de números e da tradição, e quem te conhece melhor és tu. Diz-me:',
    '• O que é que faz mesmo sentido para ti?\n• O que é que não bate certo?\n• O que é que estás a viver agora, ou viveste no passado, que gostasses de me contar?',
    'As tuas respostas ajudam-me a afinar a sessão e a tratar aquilo que realmente te importa.'
  ] });
  B.push({ tipo: 'botao', icone: '💬', titulo: '', paras: [], href, rotulo: '💬 Dizer ao Ricardo se faz sentido' });

  const modelo = {
    tema: 'alma', emoji: '🔮', titulo: 'A tua Avaliação Energética', subtitulo: `Antes da tua sessão de ${terapiaNome}`,
    nome: d.nome, nome1: n1, data: formataData(r.hoje), assinatura: d.assinatura || 'Ricardo Correia · Hikari Fafe',
    blocos: B, mensagem: d.mensagem || 'Obrigado por confiares em mim. Vamos fazer este caminho com calma e ao teu ritmo.',
    aviso: 'Este é um trabalho energético e complementar. Não substitui o acompanhamento médico ou psicológico. As decisões são sempre tuas.'
  };
  return generoNoModelo(modelo, d.genero);
}

// Ajusta as terminações "(a)" ao género da pessoa: 'f' ou 'm'; sem género, mantém "(a)".
function generoNoModelo(m, genero) {
  if (genero !== 'f' && genero !== 'm') return m;
  const f = genero === 'f';
  const troca = t => t.replace(/(\p{L}+)\(a\)/gu, (_, w) => w.replace(/o$/, f ? 'a' : 'o').replace(/ado$/, f ? 'ada' : 'ado'));
  const anda = v => typeof v === 'string' ? troca(v) : Array.isArray(v) ? v.map(anda) : (v && typeof v === 'object' && !v.src) ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, anda(x)])) : v;
  return anda(m);
}
