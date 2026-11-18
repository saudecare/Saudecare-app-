/* =========================================================================
   FORMAÇÃO DE REIKI — NÍVEL 3B (MESTRADO) · VERSÃO 2
   Hikari Fafe Escola de Reiki · Vindora
   -------------------------------------------------------------------------
   Conteúdo escrito a partir do "Manual de Usui Reiki Ryoho — Nível 3B —
   Mestrado", de Mestre Ricardo Correia. O procedimento da sintonização
   presencial e da distância está copiado do manual, passo a passo.

   ATENÇÃO — A REVER PELO MESTRE: no módulo 6, o bloco «Outras formas de
   sintonizar» (grupo, videochamada, chamada de voz, hora marcada) foi
   escrito como ADAPTAÇÃO dos capítulos 7, 9 e 10 do manual. Não vem do
   manual palavra por palavra. Deve ser lido e corrigido pelo Mestre, e
   depois acrescentado também ao manual em PDF do Nível 3B.
   ========================================================================= */

const T = c => ({ tipo: 'texto', conteudo: c });
const D = c => ({ tipo: 'destaque', conteudo: c });
const L = (titulo, itens) => ({ tipo: 'lista', titulo, itens });
const Q = (pergunta, opcoes, correta, feedback) => ({ pergunta, opcoes, correta, feedback });

const N3B_MODULOS = [

  /* ================================================================ 0 === */
  {
    ordem: 0, titulo: 'Antes de começares: o que é ser Mestre',
    subtitulo: 'Quem está habilitado a transmitir — e a responsabilidade que isso traz',
    manual: 'Antes de começares · A nossa linhagem · Capítulo 1', duracao: '15 min',
    pdf: { titulo: 'Módulo 0 — O que é ser Mestre', ficheiro: 'n3b-m00-o-que-e-ser-mestre.pdf' },
    aula: { url: 'videos-reiki/n3b-m00.mp4', legendas: 'videos-reiki/n3b-m00.vtt' },
    ler: [
      T('Este manual é diferente de todos os outros que recebeste. Os anteriores ensinavam-te a receber e a trabalhar. Este ensina-te a dar.'),
      T('A partir daqui não estás só a cuidar de quem te procura. Estás a abrir o canal de outra pessoa, e isso fica com ela para o resto da vida. É uma responsabilidade de outra ordem, e é por isso que o mestrado não se dá a quem apenas cumpriu os degraus anteriores: dá-se a quem está pronto.'),
      D('O Reiki é uma prática complementar de bem-estar. Não diagnostica, não trata doenças e nunca substitui acompanhamento médico ou psicológico. A partir de agora tens de ensinar isto aos teus alunos, com a mesma clareza com que o ouviste.'),
      T('A palavra «Mestre» assusta e devia assustar. Em português soa a quem sabe tudo. No Reiki quer dizer outra coisa: quem está habilitado a transmitir. Nada mais, e já é muito. Não passas a ser melhor pessoa por teres o 3B. Não deixas de ter dias maus, dúvidas ou zangas. O que ganhas é a capacidade de abrir em alguém aquilo que um dia abriram em ti — e a obrigação de o fazer com cuidado.'),
      L('O que este nível te permite', [
        'Sintonizar alunos nos níveis 1, 2, 3A e 3B',
        'Dar formação e emitir certificados em nome da escola',
        'Usar os seis símbolos',
        'Continuar a atender como terapeuta, agora com mais ferramentas'
      ]),
      T('Ter o 3B não te obriga a ensinar. Há mestres excelentes que nunca deram uma formação e trabalham só como terapeutas. Se sentires que ainda não é o momento, não é. A pressa de ensinar costuma vir do sítio errado.'),
      D('O que os alunos vão aprender contigo: muito menos do que dizes, e muito mais do que fazes. Vão aprender pela forma como recebes, pelo cuidado com que preparas a sala, pela paciência com que repetes o que já explicaste três vezes. A técnica é a parte fácil.'),
      L('A nossa linhagem', [
        'Níveis 1, 2 e 3A — Reiki Tradicional · Usui Reiki Ryoho',
        'Nível 3B (Mestrado) — Reiki Essencial · Usui Shiki Ryoho',
        'O Dai Ko Myo tibetano e o Raku vêm do mestrado em Reiki Essencial e só se ensinam neste nível'
      ]),
      T('Saber de onde vem aquilo que transmites passa a ser obrigação tua, porque vais ter de o explicar aos teus alunos. Diz a verdade sobre a origem: as escolas que apresentam como original aquilo que não é perdem credibilidade quando alguém descobre — e alguém descobre sempre.'),
      D('«Este não é o fim do teu caminho no Reiki. É o princípio do caminho de quem ensina.»')
    ],
    praticar: {
      titulo: 'Porque queres ensinar?',
      instrucoes: 'Escreve com honestidade: porque queres ser Mestre, e o que sentirias se nunca chegasses a dar uma formação. Não há resposta certa — é para ti.',
      registo: true, registoPergunta: 'A minha razão para ser Mestre:'
    },
    responder: [
      Q('O que quer dizer «Mestre» no Reiki?', ['Quem sabe tudo', 'Quem está habilitado a transmitir', 'Quem não tem dúvidas'], 1, 'Nada mais, e já é muito.'),
      Q('Ter o 3B obriga-te a ensinar?', ['Sim', 'Não — há mestres que trabalham só como terapeutas', 'Só se tiveres alunos'], 1, 'A pressa de ensinar costuma vir do sítio errado.'),
      Q('Quando sintonizas alguém, o que abres?', ['Um certificado', 'O canal da pessoa, que fica com ela para o resto da vida', 'Uma sala'], 1, 'É uma responsabilidade de outra ordem.'),
      Q('Com que se aprende mais do Mestre?', ['Com o que diz', 'Com o que faz: como recebe, como prepara a sala, a paciência', 'Com o certificado'], 1, 'A técnica é a parte fácil.'),
      Q('O que acontece às escolas que apresentam como original o que não é?', ['Ganham prestígio', 'Perdem credibilidade quando alguém descobre', 'Nada'], 1, 'E alguém descobre sempre.')
    ]
  },

  /* ================================================================ 1 === */
  {
    ordem: 1, titulo: 'Dai Ko Myo tibetano e Raku',
    subtitulo: 'Os dois símbolos próprios do mestrado',
    manual: 'Capítulos 2 e 3', duracao: '25 min',
    pdf: { titulo: 'Módulo 1 — Dai Ko Myo tibetano e Raku', ficheiro: 'n3b-m01-dai-ko-myo-e-raku.pdf' },
    aula: { url: 'videos-reiki/n3b-m01.mp4', legendas: 'videos-reiki/n3b-m01.vtt' },
    simbolos: ['dai-ko-myo-tibetano', 'raku'],
    ler: [
      { tipo: 'imagem', url: 'reiki-img/dai-ko-myo-tibetano.png' },
      { tipo: 'imagem', url: 'reiki-img/raku.png' },
      T('Já conheces o Dai Ko Myo tradicional, dos três caracteres japoneses, que recebeste no 3A. Este é outro desenho, com o mesmo nome, que entrou no Reiki pela via ocidental e tibetana. São duas versões do mesmo símbolo e ambas funcionam, desde que tenhas sido sintonizado com elas. A tibetana é bastante mais simples de memorizar, e é a que se usa no momento da sintonização.'),
      L('Tradicional (3A)', [
        'Origem japonesa. Três kanji: Dai, Koo e Myo («grande luz brilhante»). Ligada a Fudo Myo e a Dainichi Nyorai',
        'Serve para iluminação para nós, enviar luz espiritual a outros, protecção, clareza de mente e de espírito, meditação no caminho interior',
        'Usa-se no teu trabalho pessoal e terapêutico, se for a que te for mais natural'
      ]),
      L('Tibetano (3B)', [
        'Entrou no Reiki pela via ocidental e tibetana. Não faz parte do núcleo original do Usui Reiki Ryoho',
        'É o símbolo das sintonizações. Vai no sopro violeta',
        'Amplia e potencia os outros símbolos. Trabalha na raiz dos desequilíbrios, no plano mais profundo',
        'Abre a ligação a frequências mais altas e limpa os canais energéticos',
        'Usa-se nas sintonizações. No trabalho terapêutico, a que te for mais natural'
      ]),
      D('A regra simples: nas sintonizações, a tibetana; no teu trabalho pessoal e terapêutico, a que te for mais natural. Alguns alunos usam as duas em conjunto e sentem-se bem com isso. Experimenta e decide com a prática, não com a teoria.'),
      T('O Raku é o símbolo que fecha. Vem de práticas tibetanas e representa a serpente adormecida enrolada na base da coluna — a energia que sobe ao longo do eixo do corpo. As curvas da serpente correspondem aos centros energéticos, e a espiral à base corresponde ao primeiro.'),
      L('Para que serve o Raku', [
        'Fixar a energia no aluno, no fim da sintonização. É esta a sua função principal e é por isso que existe neste nível',
        'Separar o campo do Mestre do campo do aluno, terminada a transmissão',
        'Enraizar quem está desligado da realidade, disperso ou em choque',
        'Limpar o canal ao longo da coluna e desbloquear o centro do topo da cabeça'
      ]),
      T('O sentido importa: no budismo tibetano este símbolo é usado de baixo para cima. No Reiki usa-se de cima para baixo — do topo da cabeça em direcção aos pés — porque o que queremos é trazer a energia universal para dentro do corpo e ancorá-la. Traça-o com a linha horizontal sobre a cabeça, a linha ondulada a descer ao longo da coluna, e a espiral a enrolar na base.'),
      D('Não te esqueças do Raku. É o erro mais comum de quem começa a sintonizar: fazer tudo bem e esquecer o fecho. O aluno fica ligado ao Mestre e ambos saem de lá estranhos. O Raku é o ponto final da frase.')
    ],
    praticar: {
      titulo: 'Desenhar o Raku',
      instrucoes: 'Desenha o Raku dez vezes em papel, de cima para baixo: linha horizontal, linha ondulada a descer, espiral a enrolar na base. Depois desenha-o no ar, à tua frente, com a mão dominante, três vezes.',
      registo: true, registoPergunta: 'O que notaste ao desenhar o Raku de cima para baixo?'
    },
    responder: [
      Q('Qual versão do Dai Ko Myo se usa no momento da sintonização?', ['A tradicional', 'A tibetana', 'Qualquer uma, sem regra'], 1, 'Nas sintonizações, a tibetana.'),
      Q('Qual é a função principal do Raku?', ['Iluminação', 'Fixar a energia no aluno, no fim da sintonização', 'Enviar à distância'], 1, 'É por isso que existe neste nível.'),
      Q('Em que sentido se traça o Raku no Reiki?', ['De baixo para cima', 'De cima para baixo, do topo da cabeça aos pés', 'Da esquerda para a direita'], 1, 'No budismo tibetano usa-se de baixo para cima; no Reiki, de cima para baixo, para ancorar.'),
      Q('O que representa o Raku?', ['O sol', 'A serpente adormecida na base da coluna', 'Um templo'], 1, 'As curvas correspondem aos centros energéticos.'),
      Q('Qual o erro mais comum de quem começa a sintonizar?', ['Falar demais', 'Esquecer o Raku, o fecho', 'Chegar atrasado'], 1, 'O aluno fica ligado ao Mestre e ambos saem de lá estranhos.')
    ]
  },

  /* ================================================================ 2 === */
  {
    ordem: 2, titulo: 'Os seis símbolos e a elevação do espaço',
    subtitulo: 'O conjunto arrumado e a ordem do mais subtil ao mais denso',
    manual: 'Capítulo 4', duracao: '20 min',
    pdf: { titulo: 'Módulo 2 — Os seis símbolos', ficheiro: 'n3b-m02-os-seis-simbolos.pdf' },
    aula: { url: 'videos-reiki/n3b-m02.mp4', legendas: 'videos-reiki/n3b-m02.vtt' },
    simbolos: ['cho-ku-rei', 'sei-he-ki', 'hon-sha-ze-sho-nen', 'dai-ko-myo', 'dai-ko-myo-tibetano', 'raku'],
    ler: [
      { tipo: 'imagem', url: 'reiki-img/cho-ku-rei.png' },
      { tipo: 'imagem', url: 'reiki-img/sei-he-ki.png' },
      { tipo: 'imagem', url: 'reiki-img/hon-sha-ze-sho-nen.png' },
      { tipo: 'imagem', url: 'reiki-img/dai-ko-myo.png' },
      { tipo: 'imagem', url: 'reiki-img/dai-ko-myo-tibetano.png' },
      { tipo: 'imagem', url: 'reiki-img/raku.png' },
      T('A partir de agora trabalhas com seis símbolos. Vale a pena teres o conjunto arrumado na cabeça.'),
      L('Os seis símbolos', [
        'Cho Ku Rei — Nível 2 — força, concentração, limpeza, selo',
        'Sei He Ki — Nível 2 — emoção, memória, harmonia interior',
        'Hon Sha Ze Sho Nen — Nível 2 — distância, passado e futuro',
        'Dai Ko Myo (Usui) — Nível 3A — plano espiritual, amplia os anteriores',
        'Dai Ko Myo (tibetano) — Nível 3B — sintonizações, sopro violeta',
        'Raku — Nível 3B — fixar, separar, enraizar'
      ]),
      D('A ordem de elevação de um espaço: quando preparas uma sala para uma formação ou uma sintonização, a ordem que ensino é do mais subtil para o mais denso: Raku, Dai Ko Myo tibetano, Dai Ko Myo Usui, Hon Sha Ze Sho Nen, Sei He Ki, Cho Ku Rei.'),
      T('Desenha cada um à tua frente, do teu tamanho, com o mantra três vezes, com a intenção de preencher o espaço. O Mestre costuma fazer isto nos três dias que antecedem uma formação, uma vez por dia. Quando os alunos entram, a sala já os recebe.')
    ],
    praticar: {
      titulo: 'Elevar uma sala',
      instrucoes: 'Escolhe uma divisão da tua casa. Desenha os seis símbolos, pela ordem do mais subtil ao mais denso, do teu tamanho, com o mantra três vezes cada um. Repete durante três dias, uma vez por dia.',
      registo: true, registoPergunta: 'Que diferença notaste no espaço ao longo dos três dias?'
    },
    responder: [
      Q('Quantos símbolos usa o Mestre?', ['Três', 'Seis', 'Sete'], 1, 'Quatro anteriores, mais o Dai Ko Myo tibetano e o Raku.'),
      Q('Qual o primeiro símbolo na ordem de elevação de um espaço?', ['Cho Ku Rei', 'Raku', 'Sei He Ki'], 1, 'Raku, Dai Ko Myo tibetano, Dai Ko Myo Usui, Hon Sha Ze Sho Nen, Sei He Ki, Cho Ku Rei.'),
      Q('E o último?', ['Cho Ku Rei', 'Raku', 'Hon Sha Ze Sho Nen'], 0, 'Do mais subtil para o mais denso.'),
      Q('Com que antecedência se eleva o espaço para uma formação?', ['Nunca', 'Nos três dias anteriores, uma vez por dia', 'Só no dia'], 1, 'Quando os alunos entram, a sala já os recebe.'),
      Q('Qual o tamanho com que se desenha cada símbolo na elevação do espaço?', ['Pequeno, na mão', 'Do teu tamanho, à tua frente', 'Do tamanho de um papel'], 1, 'Com o mantra três vezes e a intenção de preencher o espaço.')
    ]
  },

  /* ================================================================ 3 === */
  {
    ordem: 3, titulo: 'A postura: Hui Yin, língua e respiração violeta',
    subtitulo: 'Manter a energia em circuito fechado',
    manual: 'Capítulo 5', duracao: '20 min',
    pdf: { titulo: 'Módulo 3 — A postura do Mestre', ficheiro: 'n3b-m03-a-postura.pdf' },
    aula: { url: 'videos-reiki/n3b-m03.mp4', legendas: 'videos-reiki/n3b-m03.vtt' },
    ler: [
      T('Durante uma sintonização, a energia tem de circular em circuito fechado no teu corpo, sem se dispersar. Três gestos garantem isso, e mantêm-se do princípio ao fim do processo.'),
      L('A contracção do Hui Yin', [
        'O Hui Yin é o ponto do períneo, entre os órgãos genitais e o ânus. Contrai-o suavemente, como quem segura a urina, e mantém',
        'Não faças força a mais. É uma contracção leve e sustentada, não um aperto',
        'Se te cansares e soltares, volta a contrair sem drama',
        'Com a prática deixa de exigir atenção'
      ]),
      T('A língua no palato: pousa a ponta da língua no céu da boca, logo atrás dos dentes de cima. Estes dois gestos juntos fecham o circuito entre os canais da frente e das costas do corpo, e é isso que impede a energia de se perder.'),
      L('A respiração violeta', [
        'Com o Hui Yin contraído e a língua no palato, inspira pelo nariz',
        'Visualiza uma luz branca a entrar pelo topo da cabeça e a descer até ao tanden, abaixo do umbigo',
        'Aí, deixa essa luz tornar-se violeta e expandir-se',
        'Faz subir a luz violeta pelas costas até ao topo da cabeça',
        'Desenha mentalmente o Dai Ko Myo tibetano dentro dessa luz',
        'Quando soprares no aluno, é esta luz com o símbolo que sai — o sopro violeta'
      ]),
      D('Treina antes de precisares. Pratica a respiração violeta sozinho, em casa, durante semanas, antes da tua primeira sintonização. No dia em que tiveres um aluno à tua frente não queres estar a pensar em nada disto.')
    ],
    praticar: {
      titulo: 'A postura e a respiração violeta',
      instrucoes: 'Cinco minutos de Hui Yin contraído e língua no palato. Depois dez minutos de respiração violeta, como no manual. Faz isto todos os dias durante uma semana.',
      registo: true, registoPergunta: 'Como te sentiste, e quanto tempo até deixar de exigir atenção?'
    },
    responder: [
      Q('Onde fica o Hui Yin?', ['No topo da cabeça', 'No períneo', 'No umbigo'], 1, 'Entre os órgãos genitais e o ânus.'),
      Q('Como deve ser a contracção do Hui Yin?', ['Forte', 'Leve e sustentada, sem apertar', 'Só no início'], 1, 'Se te cansares, volta a contrair sem drama.'),
      Q('Onde se pousa a ponta da língua?', ['Nos dentes de baixo', 'No céu da boca, logo atrás dos dentes de cima', 'Na garganta'], 1, 'Fecha o circuito entre os canais da frente e das costas.'),
      Q('Que cor tem a luz depois de chegar ao tanden?', ['Branca', 'Violeta', 'Dourada'], 1, 'Depois sobe pelas costas até ao topo da cabeça.'),
      Q('Quando se deve treinar a respiração violeta?', ['No dia da primeira sintonização', 'Durante semanas, sozinho, antes da primeira sintonização', 'Nunca'], 1, 'No dia não queres estar a pensar em nada disto.')
    ]
  },

  /* ================================================================ 4 === */
  {
    ordem: 4, titulo: 'Anatomia de uma sintonização e diferenças entre níveis',
    subtitulo: 'Quatro momentos, e só uma coisa muda de nível para nível',
    manual: 'Capítulos 6 e 8', duracao: '25 min',
    pdf: { titulo: 'Módulo 4 — Anatomia da sintonização', ficheiro: 'n3b-m04-anatomia-da-sintonizacao.pdf' },
    aula: { url: 'videos-reiki/n3b-m04.mp4', legendas: 'videos-reiki/n3b-m04.vtt' },
    ler: [
      T('Antes do passo a passo, percebe a estrutura. Todas as sintonizações, de qualquer nível, têm quatro momentos. Se perceberes para que serve cada um, nunca ficas perdido, mesmo que te falhe um pormenor.'),
      L('Os quatro momentos', [
        'I · Abertura — abre-se o centro do topo da cabeça e faz-se descer a energia. Para preparar o canal para receber',
        'II · Transmissão — os símbolos são colocados nas mãos e no corpo do aluno. É aqui que se dá a sintonização propriamente dita',
        'III · Fecho — sela-se o processo e separa-se o aluno do Mestre. Para ligar o aluno directamente à fonte, e não a ti',
        'IV · Bênção — liberta-se a energia residual sobre o aluno. Para terminar em suavidade e agradecimento'
      ]),
      D('O que faz a diferença entre níveis: só uma coisa — quais os símbolos que colocas nas mãos do aluno. Todo o resto do procedimento é igual. Guarda isto e metade da tua insegurança desaparece.'),
      D('A intenção manda. Antes de começares, afirma mentalmente com clareza que nível vais transmitir. Se te enganares num gesto ou te esqueceres de um passo, não é grave: a intenção e os Guias do Reiki sustentam o processo. O que não pode faltar é a intenção.'),
      L('Os símbolos de cada nível, nas mãos do aluno', [
        'Nível 1 — Shoden: Cho Ku Rei',
        'Nível 2 — Okuden: Cho Ku Rei, Sei He Ki e Hon Sha Ze Sho Nen',
        'Nível 3A — Shinpiden: os três do Nível 2 + Dai Ko Myo (Usui)',
        'Nível 3B — Mestrado: os quatro do 3A + Dai Ko Myo tibetano + Raku'
      ]),
      L('Outras diferenças menores', [
        'Nível 1: é o único em que também se tocam os pés, para ancorar quem está a abrir o canal pela primeira vez',
        'Nível 3B: é a única sintonização que habilita o aluno a sintonizar outros. Diz-lho com todas as letras no fim'
      ]),
      D('Antes da tua primeira sintonização: faz o procedimento completo sozinho, com uma almofada sentada numa cadeira, do princípio ao fim, umas quantas vezes, sem pressa, com o manual ao lado. Depois faz a um familiar que já tenha o nível — sem transmitir nada, só para treinares os gestos com uma pessoa real à frente.')
    ],
    praticar: {
      titulo: 'Os quatro momentos',
      instrucoes: 'Sem consultar o manual, escreve os quatro momentos de uma sintonização e, para cada um, para que serve. Depois confere com o módulo.',
      registo: true, registoPergunta: 'Os quatro momentos e o que cada um faz:'
    },
    responder: [
      Q('Quantos momentos tem uma sintonização?', ['Dois', 'Quatro', 'Sete'], 1, 'Abertura, Transmissão, Fecho e Bênção.'),
      Q('Qual é o momento em que se dá a sintonização propriamente dita?', ['Abertura', 'Transmissão', 'Bênção'], 1, 'Os símbolos são colocados nas mãos e no corpo do aluno.'),
      Q('O que muda entre níveis?', ['Todo o procedimento', 'Apenas os símbolos que colocas nas mãos do aluno', 'A duração'], 1, 'Todo o resto do procedimento é igual.'),
      Q('Em que nível também se tocam os pés do aluno?', ['Nível 1', 'Nível 3A', 'Nível 3B'], 0, 'Para ancorar quem abre o canal pela primeira vez.'),
      Q('Esqueceste-te de um passo. O que sustenta o processo?', ['Nada, tens de repetir tudo', 'A intenção clara do nível que estás a transmitir', 'O certificado'], 1, 'Não é grave: a intenção e os Guias do Reiki sustentam o processo.')
    ]
  },

  /* ================================================================ 5 === */
  {
    ordem: 5, titulo: 'Sintonização presencial, passo a passo',
    subtitulo: 'O procedimento completo, das quatro partes',
    manual: 'Capítulo 7', duracao: '40 min',
    pdf: { titulo: 'Módulo 5 — Sintonização presencial', ficheiro: 'n3b-m05-sintonizacao-presencial.pdf' },
    aula: { url: 'videos-reiki/n3b-m05.mp4', legendas: 'videos-reiki/n3b-m05.vtt' },
    ensaios: { total: 10, titulo: 'Caderno de ensaios — presencial', nota: 'Faz o procedimento completo com uma almofada sentada numa cadeira (cinco vezes com o manual, cinco sem ele) e depois com um familiar que já tenha o nível, sem transmitir nada. Regista cada ensaio.', tipos: ['Com almofada, com o manual', 'Com almofada, sem o manual', 'Com um familiar (sem transmitir)'] },
    ler: [
      T('Este é o procedimento completo. Está escrito para o Nível 1; o módulo anterior diz o que muda nos outros níveis.'),
      L('Preparação', [
        'Prepara a sala: arejada, arrumada, luz suave, silêncio. Cadeiras em fila ou em círculo, com espaço à frente e atrás para circulares',
        'Eleva o padrão do espaço com os seis símbolos, pela ordem do módulo 2',
        'Explica ao aluno o que vai acontecer: que vai sentir toques na cabeça, nos ombros, nas mãos e nos pés, e que não tem de fazer nada',
        'Pede-lhe que se sente com as costas direitas, mãos em prece à altura do peito, olhos fechados, sem sapatos',
        'Contrai o Hui Yin e põe a língua no palato. Mantém até ao fim'
      ]),
      L('Parte I — Abertura', [
        'Coloca-te atrás do aluno',
        'Invoca, à tua maneira, a protecção e orientação em que acreditas, e afirma qual o nível que vais transmitir',
        'Desenha o Dai Ko Myo e o Cho Ku Rei nas tuas palmas, com os mantras',
        'Desenha um Dai Ko Myo do tamanho do teu corpo à tua frente, e atravessa-o',
        'Desenha o Raku nas costas do aluno, do topo da cabeça até à base da coluna',
        'Pousa as duas mãos no topo da cabeça dele e fecha os olhos, até sentires que estão em sintonia',
        'Faz a respiração violeta. Afasta as mãos e sopra sobre o topo da cabeça, deixando sair o Dai Ko Myo tibetano com o sopro',
        'Acompanha mentalmente o símbolo a descer até à base do cérebro, conduzindo com a mão dominante: topo da cabeça, têmpora, base do crânio. Recita o mantra'
      ]),
      L('Parte II — Transmissão', [
        'Leva com suavidade as mãos do aluno, ainda em prece, até ao topo da cabeça',
        'Desenha sobre as mãos dele o símbolo do nível — no Nível 1, o Cho Ku Rei — com o mantra, e conduz a energia até à base do cérebro',
        'Volta a pousar as mãos dele à altura do peito',
        'Passa para a frente do aluno. Segura-lhe as mãos abertas como um livro',
        'Desenha outra vez o símbolo do nível sobre as palmas, com o mantra, e toca três vezes, suavemente, as palmas dele',
        'Fecha-lhe as mãos e sopra sobre elas, conduzindo a energia até ao plexo solar, subindo à testa e ao topo da cabeça, e descendo de volta às mãos',
        'Só no Nível 1: toca também os pés, para ancorar'
      ]),
      L('Parte III — Fecho', [
        'Volta para trás do aluno e pousa-lhe as mãos nos ombros',
        'Faz uma afirmação positiva, três vezes, dirigida a ele pelo nome — que é um canal de Reiki de confiança e que a energia o guiará',
        'Junta as mãos com os polegares na base do crânio. Visualiza uma porta a abrir, coloca lá dentro o Cho Ku Rei com o mantra três vezes, e fecha a porta',
        'Sela em voz alta ou mentalmente, dizendo o teu nome e o nível que acabaste de transmitir',
        'Desenha o Raku entre ti e o aluno, para separar os campos. Não saltes este passo'
      ]),
      L('Parte IV — Bênção', [
        'Vai para a frente do aluno, mãos à altura da cintura, palmas viradas para ele',
        'Respira fundo, solta o Hui Yin e a língua, e expira devagar, libertando sobre ele toda a energia que sobrou, como bênção',
        'Agradece a quem invocaste no princípio',
        'Pede ao aluno que respire devagar e abra os olhos quando estiver pronto',
        'Dá-lhe água e alguns minutos de silêncio antes de falarem'
      ]),
      D('Com vários alunos, repete cada parte em todos antes de passares à parte seguinte.')
    ],
    praticar: {
      titulo: 'O ensaio com a almofada',
      instrucoes: 'Senta uma almofada numa cadeira e faz o procedimento completo das quatro partes, com o manual ao lado, do princípio ao fim. Repete cinco vezes. Depois faz mais cinco sem o manual.',
      registo: true, registoPergunta: 'Que passo te custou mais a fixar?'
    },
    responder: [
      Q('Onde fica o Mestre na Abertura?', ['À frente do aluno', 'Atrás do aluno', 'Ao lado'], 1, 'Na Transmissão passa para a frente.'),
      Q('Com que símbolo se desenha nas costas do aluno na Abertura?', ['Cho Ku Rei', 'Raku, do topo da cabeça até à base da coluna', 'Sei He Ki'], 1, 'Depois pousas as mãos no topo da cabeça.'),
      Q('Qual o passo que nunca se salta no Fecho?', ['O Raku entre ti e o aluno, para separar os campos', 'A conversa', 'O certificado'], 0, 'É o ponto final da frase.'),
      Q('Como se seguram as mãos do aluno na Transmissão?', ['Fechadas', 'Abertas como um livro', 'Juntas atrás'], 1, 'E tocam-se três vezes as palmas, suavemente.'),
      Q('O que se faz ao aluno no fim da sintonização?', ['Falar de imediato', 'Dar-lhe água e alguns minutos de silêncio', 'Pedir-lhe pagamento'], 1, 'Antes de falarem.')
    ]
  },

  /* ================================================================ 6 === */
  {
    ordem: 6, titulo: 'Sintonização à distância e outras formas de sintonizar',
    subtitulo: 'Individual, em grupo, por videochamada, por chamada de voz e à hora marcada',
    manual: 'Capítulo 9 (e adaptações dos capítulos 7 e 10)', duracao: '40 min',
    pdf: { titulo: 'Módulo 6 — Sintonização à distância', ficheiro: 'n3b-m06-sintonizacao-a-distancia.pdf' },
    aula: { url: 'videos-reiki/n3b-m06.mp4', legendas: 'videos-reiki/n3b-m06.vtt' },
    ensaios: { total: 5, titulo: 'Caderno de ensaios — à distância', nota: 'Ensaia a sintonização à distância com um substituto (almofada ou boneco) e, quando puderes, a videochamada e a chamada de voz com alguém que já tenha o nível, sem transmitir nada. Regista cada ensaio.', tipos: ['À distância, individual', 'À distância, em grupo', 'Videochamada', 'Chamada de voz', 'À hora marcada'] },
    ler: [
      T('A energia não reconhece distância. Se aceitas que se envia Reiki a alguém do outro lado do país, não há razão para não aceitares o mesmo numa sintonização. Milhares de praticantes foram sintonizados assim.'),
      D('O que é preciso é apenas isto: a tua intenção de dar e a intenção do aluno de receber. Sem uma delas, não funciona — e é por isso que se combina hora e se pede confirmação.'),
      L('Combinar com o aluno', [
        'Certifica-te de que ele leu o manual do nível e que não ficaram dúvidas por esclarecer',
        'Pede-lhe autorização expressa. Respeita sempre o livre-arbítrio',
        'Combinem uma hora certa',
        'Explica-lhe o que deve fazer: sentar-se sem sapatos, com pouca luz, sem ser interrompido, e pedir mentalmente a ligação a ti à hora marcada',
        'Pede-lhe o nome completo e a localidade onde vai estar'
      ]),
      L('Do teu lado, passo a passo', [
        'Escolhe o teu substituto: uma almofada ou um boneco sentado numa cadeira, que representa o aluno. Em alternativa, faz tudo por visualização',
        'Programa o substituto: declara que aquilo representa o aluno, nomeando-o',
        'Prepara e eleva o espaço como farias numa formação presencial',
        'Cria o escudo do ambiente com a afirmação que usares',
        'Desenha o Hon Sha Ze Sho Nen com o mantra e afirma que estás a abrir a ligação com o aluno, dizendo o nome completo e a localidade',
        'Com um grupo, desenha primeiro o Dai Ko Myo e depois o Hon Sha Ze Sho Nen, e nomeia todos, um a um',
        'Sente a ligação estabelecer-se. Espera por isso, não avances a correr',
        'A partir daqui, faz exactamente o mesmo procedimento das quatro partes, como se ele estivesse à tua frente',
        'Com um grupo, visualiza-os sentados em fila e repete cada parte em cada um',
        'Fecha com o Raku, agradece, e desfaz conscientemente a ligação',
        'Manda mensagem ao aluno a confirmar que terminaste, e pergunta como correu'
      ]),
      D('Uma sintonização demora poucos minutos: três a cinco minutos por pessoa. Isso não a torna menos séria. É uma cerimónia, marca o fim de um ciclo e o princípio de outro — trata-a como tal, presencial ou à distância.'),
      T('Outras formas de sintonizar. O procedimento das quatro partes e os símbolos do nível são sempre os mesmos. O que muda é a forma como te ligas ao aluno e como confirmas que correu bem. As formas seguintes são adaptações dos módulos anteriores, para o Mestre adequar a cada situação.'),
      L('Presencial individual', [
        'Um aluno à tua frente, no mesmo espaço, com o procedimento completo do módulo 5',
        'Podes tocar, como o procedimento indica; pede sempre autorização antes'
      ]),
      L('Presencial em grupo', [
        'Cadeiras em fila ou em círculo, com espaço à frente e atrás para circulares',
        'Quatro a seis pessoas é o número em que consegues dar atenção a cada uma',
        'Repete cada parte em todos os alunos antes de passares à parte seguinte'
      ]),
      L('À distância, individual (hora marcada, sem ligação em directo)', [
        'Combinar: manual lido, autorização expressa, hora certa, nome completo e localidade',
        'O aluno senta-se sem sapatos, com pouca luz e sem ser interrompido, e pede mentalmente a ligação à hora marcada',
        'Tu usas o substituto (ou visualização) e fazes as quatro partes, fechando com o Raku e desfazendo a ligação',
        'Depois mandas mensagem a confirmar e perguntas como correu'
      ]),
      L('À distância, em grupo', [
        'Todos os alunos combinados para a mesma hora, cada um com o seu nome completo e localidade',
        'Desenha primeiro o Dai Ko Myo e depois o Hon Sha Ze Sho Nen, e nomeia todos, um a um',
        'Visualiza-os sentados em fila e repete cada parte em cada um',
        'No fim, confirmas com cada um separadamente'
      ]),
      L('Por videochamada', [
        'É a forma mais completa à distância: vês o aluno, ele vê-te, e tiram-se dúvidas no momento',
        'Combina hora, confirma que o aluno está num sítio sossegado, sem sapatos, com pouca luz e sem interrupções, e que pode estar na câmara ou só ligado, conforme preferir',
        'Os toques do procedimento são feitos no substituto ou por visualização; a câmara serve para o acompanhares e para ele te ouvir e ver',
        'No fim, ainda na chamada, dá-lhe água, alguns minutos de silêncio e pergunta como correu'
      ]),
      L('Por chamada de voz', [
        'O aluno está ligado só por voz, sem imagem. Combina bem as instruções antes de começar: postura, olhos fechados, sem sapatos, sem interrupções',
        'Durante o procedimento, podes dizer em voz baixa em que parte vais, para o aluno acompanhar, ou ficar em silêncio, se ele preferir',
        'No fim, fecha com o Raku, desfaz a ligação e pergunta como correu, ainda na chamada'
      ]),
      L('À hora marcada, com confirmação depois', [
        'Combinam a hora e o aluno prepara-se sozinho, sem estar em chamada nem em contacto contigo',
        'Fazes o procedimento à hora combinada, e mandas mensagem a confirmar que terminaste',
        'É a mais simples, e por isso exige mais cuidado: sem a tua presença, é a autorização expressa e a intenção do aluno que sustentam tudo'
      ]),
      D('Seja qual for a forma, vale a regra do manual: podes sintonizar à distância alguém que nunca viste, mas certifica-te de que houve formação a sério antes — manual lido, dúvidas esclarecidas, trabalho entregue. Sintonizar quem não estudou nada é vender um certificado, não é ensinar.')
    ],
    praticar: {
      titulo: 'Ensaio à distância',
      instrucoes: 'Escolhe uma almofada ou boneco e programa-o como substituto de um aluno imaginário, com nome completo e localidade. Faz o procedimento completo à distância, da combinação à mensagem final. Escreve o que correu bem e o que mudavas.',
      registo: true, registoPergunta: 'O que correu bem e o que mudavas?'
    },
    responder: [
      Q('O que é preciso para a sintonização à distância funcionar?', ['Estar no mesmo país', 'A intenção de dar e a intenção do aluno de receber', 'Um certificado prévio'], 1, 'Sem uma delas, não funciona.'),
      Q('Qual o símbolo desenhado para abrir a ligação com o aluno?', ['Raku', 'Hon Sha Ze Sho Nen', 'Cho Ku Rei'], 1, 'Com o nome completo e a localidade. Com um grupo, primeiro o Dai Ko Myo.'),
      Q('Quanto tempo demora uma sintonização por pessoa?', ['Duas horas', 'Três a cinco minutos', 'Um segundo'], 1, 'Isso não a torna menos séria: é uma cerimónia.'),
      Q('O que fazes com a ligação no final?', ['Deixo-a aberta', 'Fecho com o Raku e desfaço-a conscientemente', 'Esqueço-a'], 1, 'E mandas mensagem ao aluno a confirmar.'),
      Q('Podes sintonizar à distância alguém que nunca viste?', ['Nunca', 'Sim, desde que tenha havido formação a sério antes', 'Sim, sem condições'], 1, 'Sintonizar quem não estudou nada é vender um certificado.')
    ]
  },

  /* ================================================================ 7 === */
  {
    ordem: 7, titulo: 'Formação online, preparar e conduzir uma formação',
    subtitulo: 'Antes, durante e depois — presencial e online',
    manual: 'Capítulos 10 e 11', duracao: '35 min',
    pdf: { titulo: 'Módulo 7 — Dar formação', ficheiro: 'n3b-m07-dar-formacao.pdf' },
    aula: { url: 'videos-reiki/n3b-m07.mp4', legendas: 'videos-reiki/n3b-m07.vtt' },
    ler: [
      T('A formação online não é a mesma coisa que a sintonização à distância, embora muita gente confunda. A sintonização é o momento energético. A formação é todo o resto: o ensino, o acompanhamento, a avaliação. Numa formação online tens videochamada, e isso muda tudo para melhor: vês o aluno, ele vê-te, tiram-se dúvidas no momento.'),
      L('Como organizar uma formação online', [
        'Envia o manual do nível com antecedência, e pede que seja lido antes do primeiro encontro',
        'Primeiro encontro: matéria, dúvidas, prática guiada. O aluno pratica contigo a ver',
        'Período de trabalho: exercícios, registos, situações para resolver, tudo entregue por escrito ou em vídeo',
        'Encontro de sintonização: em hora marcada, com o aluno na câmara ou só ligado à distância, conforme preferir',
        'Acompanhamento dos 21 dias, com contacto regular',
        'Encontro final: revisão, avaliação e entrega do certificado'
      ]),
      L('O que não podes deixar cair', [
        'Que o aluno leia mesmo o manual. Sem isso, o resto é vazio',
        'Que faça o autotratamento. Pede-lhe o registo',
        'Que possa falar contigo quando tiver dúvidas, e não só nos encontros marcados',
        'Que perceba com clareza os limites do Reiki e a fronteira com a medicina'
      ]),
      D('Online não é mais fácil. É mais cómodo e mais acessível a quem mora longe — e por isso é bom que exista. Mas exige mais de ti em acompanhamento, porque não vês a cara do aluno todos os dias. Compensa com presença: uma mensagem a saber como vão os 21 dias vale mais do que uma aula extra.'),
      L('Nos dias antes de uma formação', [
        'Eleva o espaço com os seis símbolos, uma vez por dia, nos três dias anteriores',
        'Confirma presenças e envia indicações práticas: roupa confortável, comer leve, trazer caderno',
        'Prepara os manuais e os certificados',
        'Faz o teu autotratamento e a tua meditação. Não chegues a uma formação em dívida contigo'
      ]),
      L('No dia', [
        'Chega cedo. Areja, arruma, prepara a água',
        'Recebe cada aluno pelo nome',
        'Começa com uma ronda de apresentações: quem são e o que os trouxe aqui',
        'Explica o programa do dia, incluindo a que horas será a sintonização',
        'Ensina a matéria. Alterna teoria com prática: ninguém aguenta duas horas seguidas a ouvir',
        'Faz a sintonização com a sala já em silêncio',
        'Dá tempo depois. Não marques nada logo a seguir',
        'Fecha com uma ronda de partilha, sem obrigar ninguém a falar',
        'Explica os 21 dias com muita clareza e entrega os certificados'
      ]),
      L('Depois', [
        'Contacta cada aluno nos primeiros dias',
        'Regista quem sintonizaste, em que nível e em que data',
        'Escreve para ti duas linhas sobre o que correu bem e o que mudavas'
      ]),
      D('Grupos pequenos: quatro a seis pessoas é o número em que consegues dar atenção a cada uma. Acima disso a formação ganha em receita e perde em qualidade, e nota-se meses depois.')
    ],
    praticar: {
      titulo: 'A tua primeira aula',
      instrucoes: 'Prepara e dá uma aula de quarenta minutos sobre os cinco princípios, a alguém que não saiba nada de Reiki. Depois pergunta a essa pessoa o que é que ficou a perceber. É a melhor avaliação que vais ter.',
      registo: true, registoPergunta: 'O que ficou a pessoa a perceber, e o que mudarias?'
    },
    responder: [
      Q('Qual a diferença entre formação online e sintonização à distância?', ['São a mesma coisa', 'A sintonização é o momento energético; a formação é o ensino, o acompanhamento e a avaliação', 'A formação é só a sintonização'], 1, 'Muita gente confunde.'),
      Q('Quando se envia o manual aos alunos online?', ['No fim', 'Com antecedência, para ser lido antes do primeiro encontro', 'Nunca'], 1, 'Sem a leitura, o resto é vazio.'),
      Q('Qual é o número ideal de alunos por formação?', ['Vinte', 'Quatro a seis', 'Um'], 1, 'Acima disso a formação ganha em receita e perde em qualidade.'),
      Q('O que se faz nos três dias antes da formação?', ['Nada', 'Eleva-se o espaço com os seis símbolos, uma vez por dia', 'Só se envia o certificado'], 1, 'Faz também o teu autotratamento e a tua meditação.'),
      Q('O que se faz logo a seguir à sintonização?', ['Marcar tarefas', 'Dar tempo, sem marcar nada logo a seguir', 'Terminar a formação'], 1, 'Depois, uma ronda de partilha, sem obrigar ninguém a falar.')
    ]
  },

  /* ================================================================ 8 === */
  {
    ordem: 8, titulo: 'Ensinar, avaliar, registar e a ética do Mestre',
    subtitulo: 'O que ensinar em cada nível, certificados, dados pessoais e compromisso',
    manual: 'Capítulos 12 a 17 e Compromisso do Mestre', duracao: '40 min',
    pdf: { titulo: 'Módulo 8 — Avaliar, registar e ética do Mestre', ficheiro: 'n3b-m08-avaliar-e-etica.pdf' },
    aula: { url: 'videos-reiki/n3b-m08.mp4', legendas: 'videos-reiki/n3b-m08.vtt' },
    ler: [
      T('Cada mestre organiza o seu método à sua maneira, e é assim que deve ser. O que não pode faltar, em nenhum nível, é isto:'),
      L('O que não pode faltar em nenhum nível', [
        'Os cinco princípios e a sua prática diária',
        'Os três pilares: Gassho, Reiji-Ho e Chiryo',
        'Noções de anatomia energética e meditação',
        'Os símbolos do nível, quando os há',
        'As posições das mãos, em si próprio e — do Nível 2 em diante — nos outros',
        'O autotratamento dos 21 dias após a sintonização',
        'Os limites éticos e a fronteira clara com a medicina'
      ]),
      L('O que cada nível habilita', ['Nível 1 — Shoden: aplicar Reiki a si próprio. Uso pessoal', 'Nível 3A — Shinpiden: trabalhar como terapeuta de Reiki', 'Nível 3B — Mestrado: dar formação e sintonizar novos alunos']),
      D('Diz isto a cada aluno com todas as letras, no fim da formação. Muita confusão no meio do Reiki nasce de gente que saiu de um curso sem perceber o que podia e o que não podia fazer.'),
      T('Não há um número de meses entre níveis. O ritmo é do aluno, e o que conta é o tempo que dedica e o trabalho que entrega.'),
      L('O que conta para a avaliação', [
        'Testes e exercícios escritos',
        'Respostas a situações propostas',
        'Simulações de atendimento',
        'Registos de autotratamento e de práticas',
        'Tutoriais acompanhados e exemplos resolvidos',
        'Limpezas de espaço e outras práticas relatadas'
      ]),
      D('O critério que vem antes de todos: vale mais a intenção com que o aluno se entrega a cada momento — com amor, gratidão e compaixão — do que ter as técnicas todas na ponta da língua. Isto não quer dizer aprovar toda a gente: avalias a pessoa inteira e não a memória dela. Um aluno que trocou dois nomes mas que praticou todos os dias e cuidou de quem lhe apareceu está pronto. Um que decorou tudo e nunca pôs as mãos, não está.'),
      T('Quando um aluno não está pronto, diz-lho a sós, com respeito, e explica exactamente o que falta. Não é castigo, é cuidado — por ele e por quem ele vier a atender. E deixa a porta aberta: a maior parte volta mais preparada.'),
      T('O certificado: cada aluno recebe um certificado com o seu nome completo, o nível, a data da sintonização e o nome do Mestre que sintonizou. É um documento de formação e deve ser tratado como tal — nome correcto, acentos certos, data verdadeira.'),
      L('Registos a manter', ['Quem sintonizaste, em que nível e em que data', 'Contactos dos alunos, para acompanhamento', 'O trabalho entregue por cada um, que sustenta a avaliação']),
      T('Dados pessoais: guardas nomes, contactos e por vezes informação sensível sobre a vida das pessoas. Isso obriga-te: guarda só o que precisas, guarda em sítio seguro, não partilhes com ninguém, e apaga quando deixar de ser necessário. Se um aluno pedir para ser apagado, apaga.'),
      T('A tua actividade: se ensinas e recebes por isso, tens obrigações fiscais como qualquer outra actividade. Informa-te e cumpre — é parte de trabalhar com honestidade, que é um dos cinco princípios. Vale a pena também informares-te sobre seguro de responsabilidade civil e sobre o enquadramento legal das terapias complementares em Portugal, que vai mudando.'),
      L('A ética do Mestre', [
        'Não sintonizes quem não está preparado. Nem por insistência, nem por amizade, nem porque a pessoa paga',
        'Não aceleres ninguém. Dar os quatro níveis em três meses enche a carteira e esvazia o método',
        'Diz a verdade sobre a origem do que ensinas. O que é Usui é Usui; o que veio depois, veio depois',
        'Não crias discípulos. O teu trabalho é tornar o aluno independente de ti, não o contrário',
        'Não fales mal de outras escolas. Diferente não é errado',
        'Cobra com clareza. Preço dito à partida, sem extras a meio, sem pressões para o nível seguinte',
        'Ensina os limites com a mesma energia com que ensinas a técnica. Um aluno teu que diga a alguém para deixar a medicação é uma falha tua',
        'Continua a ser aluno. O dia em que achares que já sabes tudo é o dia em que paraste'
      ]),
      D('A pergunta que te deve acompanhar, antes de cada formação: estou a fazer isto por quem vai receber, ou por mim? Nenhuma das respostas é vergonhosa — todos precisamos de viver. Mas só uma delas pode estar à frente.'),
      L('Perguntas que me fazem sempre', [
        'E se me enganar a meio? Não é grave: retoma de onde estavas, ou repete a parte inteira. O que não pode faltar é a intenção clara do nível',
        'Tenho de sentir alguma coisa para saber que resultou? Não. O sinal costuma vir do aluno, nos dias seguintes',
        'Posso sintonizar familiares directos? Podes, mas faz a sério, como farias com qualquer aluno',
        'Posso sintonizar alguém que só quer o nível para si? Claro: a maioria dos alunos de Nível 1 é assim',
        'Quantas pessoas de cada vez? Não há limite técnico, mas há limite humano: quatro a seis',
        'Tenho de usar exactamente este procedimento? Tens de usar um que respeite a estrutura das quatro partes e os símbolos certos; usa este até o teres bem assente, antes de o adaptares',
        'E se um aluno tiver uma reacção forte? Fica com ele, em calma, sem dramatizar; dá água; se te preocupar a sério, encaminha para ajuda médica sem hesitar'
      ]),
      L('Exercícios do Nível 3B', [
        'A postura — Hui Yin contraído e língua no palato, cinco minutos por dia, durante duas semanas',
        'A respiração violeta — dez minutos por dia, durante um mês, antes da primeira sintonização',
        'O ensaio completo — as quatro partes com um substituto, cinco vezes com o manual e cinco sem',
        'A tua primeira aula — quarenta minutos sobre os cinco princípios a alguém que não saiba nada de Reiki'
      ]),
      D('Compromisso do Mestre: «Ao receber a sintonização de Nível 3B — Shinpiden, comprometo-me a transmitir este método com honestidade e cuidado, a não sintonizar quem não esteja preparado, a dizer a verdade sobre a origem daquilo que ensino, a tornar os meus alunos independentes de mim, e a ensinar-lhes com a mesma clareza a técnica e os seus limites — lembrando sempre que o Reiki acompanha mas nunca substitui o cuidado de saúde de quem está à nossa frente.» A tua aprendizagem não acaba aqui. Começa outra vez, do outro lado.')
    ],
    praticar: {
      titulo: 'O compromisso do Mestre',
      instrucoes: 'Lê o Compromisso do Mestre no manual. Escreve com as tuas palavras o que significa para ti e que regra da ética do Mestre vais cuidar com mais atenção. Escolhe também um dos quatro exercícios do nível para fazer esta semana.',
      registo: true, registoPergunta: 'O meu compromisso e o exercício que escolhi:'
    },
    responder: [
      Q('Um amigo insiste e paga para ser sintonizado, mas não está preparado. O que fazes?', ['Sintonizo', 'Não sintonizas quem não está preparado: nem por insistência, amizade ou pagamento', 'Sintonizo no nível mais baixo'], 1, 'É a primeira regra da ética do Mestre.'),
      Q('Um aluno não está pronto. O que fazes?', ['Dou o certificado na mesma', 'Digo-lho a sós, com respeito, explico o que falta e deixo a porta aberta', 'Esqueço o assunto'], 1, 'Não é castigo, é cuidado.'),
      Q('Que dados de um aluno se devem guardar?', ['Todos', 'Só o que precisas, em sítio seguro, e apagar a pedido', 'Nenhum'], 1, 'Se um aluno pedir para ser apagado, apaga.'),
      Q('O que fica a faltar a um aluno que decorou tudo e nunca pôs as mãos?', ['Nada', 'Não está pronto', 'Mais testes'], 1, 'Avalias a pessoa inteira e não a memória dela.'),
      Q('Qual é o objectivo de ensinar, segundo a ética do Mestre?', ['Criar discípulos', 'Tornar o aluno independente de ti', 'Cobrar mais'], 1, 'O contrário é criar dependência.')
    ]
  }
];

/* =========================================================================
   TREINO LIVRE — perguntas DIFERENTES das do módulo
   ========================================================================= */
const N3B_TREINO = {
  0: [
    Q('A quem se dá o mestrado?', ['A quem cumpriu os degraus', 'A quem está pronto', 'A quem pede'], 1, 'Não se dá a quem apenas cumpriu os degraus anteriores.'),
    Q('Ter o 3B faz de ti melhor pessoa?', ['Sim', 'Não — continuas a ter dias maus, dúvidas e zangas', 'Depende'], 1, 'O que ganhas é a capacidade de abrir em alguém aquilo que um dia abriram em ti.'),
    Q('Qual das actividades NÃO é permitida pelo 3B?', ['Sintonizar até ao 3B', 'Emitir certificados em nome da escola', 'Substituir a medicina'], 2, 'O Reiki é complementar.'),
    Q('Na linhagem, o 3B corresponde a…', ['Reiki Essencial · Usui Shiki Ryoho', 'Reiki Tradicional apenas', 'Nenhuma'], 0, 'Os níveis 1, 2 e 3A são Reiki Tradicional.')
  ],
  1: [
    Q('Quantos kanji tem o Dai Ko Myo tradicional?', ['Três', 'Cinco', 'Sete'], 0, 'Dai, Koo e Myo, «grande luz brilhante».'),
    Q('O Dai Ko Myo tibetano vai em que sopro?', ['Branco', 'Violeta', 'Dourado'], 1, 'É o símbolo das sintonizações.'),
    Q('O Raku serve também para…', ['Enraizar quem está desligado da realidade, disperso ou em choque', 'Enviar à distância', 'Abrir o canal'], 0, 'E para limpar o canal ao longo da coluna.'),
    Q('O Raku separa o campo de quem?', ['Do aluno e do Mestre', 'Do Mestre e da sala', 'Do aluno e da família'], 0, 'Terminada a transmissão.')
  ],
  2: [
    Q('Em que nível se recebe o Dai Ko Myo (Usui)?', ['2', '3A', '3B'], 1, 'O tibetano e o Raku são do 3B.'),
    Q('Qual o símbolo para distância, passado e futuro?', ['Cho Ku Rei', 'Sei He Ki', 'Hon Sha Ze Sho Nen'], 2, 'É do Nível 2.'),
    Q('Para quê desenhar os símbolos do teu tamanho na elevação do espaço?', ['Com a intenção de preencher o espaço', 'Para decorar', 'Para economizar tempo'], 0, 'Com o mantra três vezes.'),
    Q('A ordem de elevação do espaço vai…', ['Do mais subtil para o mais denso', 'Do mais denso para o mais subtil', 'Sem ordem'], 0, 'Raku primeiro, Cho Ku Rei no fim.')
  ],
  3: [
    Q('Qual o primeiro gesto da postura?', ['Língua no palato', 'Contracção suave do Hui Yin', 'Respiração violeta'], 1, 'Os três gestos mantêm-se do princípio ao fim.'),
    Q('Para que servem o Hui Yin e a língua no palato juntos?', ['Fecham o circuito entre os canais da frente e das costas', 'Para falar', 'Para relaxar'], 0, 'Impedem que a energia se perca.'),
    Q('Que símbolo se desenha mentalmente dentro da luz violeta?', ['Raku', 'Dai Ko Myo tibetano', 'Cho Ku Rei'], 1, 'É esta luz com o símbolo que sai no sopro.'),
    Q('Por onde se inspira na respiração violeta?', ['Pela boca', 'Pelo nariz', 'Pelas mãos'], 1, 'Com o Hui Yin contraído e a língua no palato.')
  ],
  4: [
    Q('Qual momento serve para ligar o aluno directamente à fonte, e não a ti?', ['Abertura', 'Fecho', 'Bênção'], 1, 'Sela-se e separa-se o aluno do Mestre.'),
    Q('Que símbolos se colocam nas mãos do aluno no Nível 1?', ['Cho Ku Rei', 'Raku', 'Dai Ko Myo'], 0, 'No 3A juntam-se Sei He Ki, Hon Sha Ze Sho Nen e Dai Ko Myo (Usui).'),
    Q('Qual sintonização habilita o aluno a sintonizar outros?', ['Nível 2', 'Nível 3A', 'Nível 3B'], 2, 'Diz-lho com todas as letras no fim.'),
    Q('O que fazer antes da primeira sintonização real?', ['Nada', 'Ensaiar sozinho com uma almofada e depois com um familiar que já tenha o nível', 'Esperar um sinal'], 1, 'Sem transmitir nada, só para treinar os gestos.')
  ],
  5: [
    Q('O que explicas ao aluno antes de começar?', ['Que vai sentir toques na cabeça, ombros, mãos e pés, e não tem de fazer nada', 'Nada', 'Que deve cantar'], 0, 'Pede-lhe também costas direitas, mãos em prece e olhos fechados, sem sapatos.'),
    Q('Que símbolo se coloca atrás da cabeça no Fecho, na «porta» na base do crânio?', ['Cho Ku Rei', 'Raku', 'Sei He Ki'], 0, 'Três vezes com o mantra; depois fecha-se a porta.'),
    Q('O que se faz com o Hui Yin e a língua na Bênção?', ['Solta-se', 'Mantém-se', 'Reforça-se'], 0, 'Expira-se devagar, libertando a energia residual como bênção.'),
    Q('Quantas vezes se tocam as palmas do aluno na Transmissão?', ['Uma', 'Três', 'Sete'], 1, 'Suavemente, depois de desenhar o símbolo do nível.')
  ],
  6: [
    Q('O que se pede ao aluno antes da sintonização à distância?', ['Nome completo e localidade onde vai estar', 'Dinheiro', 'Nada'], 0, 'E autorização expressa.'),
    Q('O que é o «substituto»?', ['Uma almofada ou boneco que representa o aluno', 'Outro Mestre', 'Um símbolo'], 0, 'Declaras que representa o aluno, nomeando-o.'),
    Q('Na forma «à hora marcada, com confirmação depois», o que sustenta tudo?', ['A autorização expressa e a intenção do aluno', 'A distância', 'O certificado'], 0, 'Sem a tua presença, exige mais cuidado.'),
    Q('Na videochamada, os toques do procedimento são feitos…', ['No substituto ou por visualização', 'No aluno, através do ecrã', 'Não se fazem'], 0, 'A câmara serve para acompanhar o aluno e para ele te ouvir e ver.')
  ],
  7: [
    Q('Qual é a ordem de um encontro final de formação online?', ['Revisão, avaliação e entrega do certificado', 'Só a sintonização', 'Só dúvidas'], 0, 'É o último passo da organização.'),
    Q('Qual o primeiro passo no dia da formação?', ['Chegar cedo, arejar, arrumar e preparar a água', 'Começar logo a sintonizar', 'Entregar certificados'], 0, 'Depois recebe cada aluno pelo nome.'),
    Q('O que compensa a falta de presença na formação online?', ['Contacto regular, como uma mensagem a saber como vão os 21 dias', 'Mais aulas', 'Menos exigência'], 0, 'Vale mais do que uma aula extra.'),
    Q('O que escreves para ti depois da formação?', ['Duas linhas: o que correu bem e o que mudavas', 'Um relatório de dez páginas', 'Nada'], 0, 'Regista também quem sintonizaste, em que nível e em que data.')
  ],
  8: [
    Q('Que dados leva um certificado?', ['Nome completo, nível, data da sintonização e nome do Mestre', 'Só o nome', 'Só a data'], 0, 'Nome correcto, acentos certos, data verdadeira.'),
    Q('Dar os quatro níveis em três meses…', ['Enche a carteira e esvazia o método', 'É o ideal', 'É obrigatório'], 0, 'Não aceleres ninguém.'),
    Q('Como se diz a verdade sobre a origem do que se ensina?', ['O que é Usui é Usui; o que veio depois, veio depois', 'Tudo é Usui', 'Não se diz'], 0, 'É regra da ética do Mestre.'),
    Q('Um aluno teu diz a alguém para deixar a medicação. De quem é a falha?', ['Do aluno', 'Tua, como Mestre', 'De ninguém'], 1, 'Ensina os limites com a mesma energia com que ensinas a técnica.')
  ]
};
N3B_MODULOS.forEach(m => { m.treino = N3B_TREINO[m.ordem] || []; });

/* =========================================================================
   EXAME FINAL — 20 perguntas · mínimo 60% (12 certas)
   ========================================================================= */
const N3B_EXAME = {
  titulo: 'Exame final — Nível 3B (Mestrado)', nivel: '3B', modulo: 0, notaMinima: 60,
  perguntas: [
    { texto: 'O que quer dizer «Mestre» no Reiki?', opcoes: ['Quem sabe tudo', 'Quem está habilitado a transmitir', 'Quem nunca duvida'], correta: 1 },
    { texto: 'Acabaste uma sintonização e o aluno fica ligado a ti e sai de lá estranho. Que passo esqueceste?', opcoes: ["Falar com ele", "Desenhar o Raku entre ti e o aluno, para separar os campos", "Entregar o certificado"], correta: 1 },
    { texto: 'Qual a versão do Dai Ko Myo usada na sintonização?', opcoes: ['Tradicional', 'Tibetana', 'Nenhuma'], correta: 1 },
    { texto: 'Qual é a função principal do Raku?', opcoes: ['Fixar a energia no aluno no fim da sintonização', 'Abrir o canal', 'Enviar à distância'], correta: 0 },
    { texto: 'Em que sentido se usa o Raku no Reiki?', opcoes: ['De baixo para cima', 'De cima para baixo', 'Da esquerda para a direita'], correta: 1 },
    { texto: 'Um aluno que fez só o Nível 1 pede-te o 3B por ter pressa e pagar o curso. O que fazes?', opcoes: ["Sintonizo, ele pagou", "Não sintonizas quem não está preparado, mesmo que pague", "Sintonizo só no 3A"], correta: 1 },
    { texto: 'Qual o primeiro símbolo na ordem de elevação de um espaço?', opcoes: ['Raku', 'Cho Ku Rei', 'Sei He Ki'], correta: 0 },
    { texto: 'Durante a sintonização sentes que a energia se dispersa. O que manténs do princípio ao fim?', opcoes: ["Hui Yin contraído e língua no palato", "Respiração só pela boca", "Falar sem parar"], correta: 0 },
    { texto: 'Onde se pousa a ponta da língua durante a sintonização?', opcoes: ['No céu da boca, atrás dos dentes de cima', 'Nos dentes de baixo', 'Para fora'], correta: 0 },
    { texto: 'Que cor tem a luz depois de chegar ao tanden na respiração violeta?', opcoes: ['Branca', 'Violeta', 'Verde'], correta: 1 },
    { texto: 'Quantos momentos tem uma sintonização?', opcoes: ['Dois', 'Quatro', 'Seis'], correta: 1 },
    { texto: 'Qual o momento em que os símbolos são colocados nas mãos e no corpo do aluno?', opcoes: ['Abertura', 'Transmissão', 'Bênção'], correta: 1 },
    { texto: 'O que muda entre níveis numa sintonização?', opcoes: ['Os símbolos colocados nas mãos do aluno', 'Todo o procedimento', 'A duração'], correta: 0 },
    { texto: 'Qual a sintonização que habilita o aluno a sintonizar outros?', opcoes: ['Nível 2', 'Nível 3A', 'Nível 3B'], correta: 2 },
    { texto: 'Qual o passo que não se salta no Fecho?', opcoes: ['Desenhar o Raku entre ti e o aluno', 'Pedir feedback', 'Entregar o certificado'], correta: 0 },
    { texto: 'Um aluno à distância nunca fez a formação e quer só o certificado. O que fazes?', opcoes: ["Sintonizo", "Só depois de haver formação a sério: manual lido, dúvidas esclarecidas, trabalho entregue", "Sintonizo mais barato"], correta: 1 },
    { texto: 'Vinte pessoas pedem formação no mesmo dia. O que fazes?', opcoes: ["Dou a todas de uma vez", "Grupos pequenos, de quatro a seis, para dares atenção a cada uma", "Dou só a metade"], correta: 1 },
    { texto: 'Qual a diferença entre formação online e sintonização à distância?', opcoes: ['A sintonização é o momento energético; a formação é o ensino, acompanhamento e avaliação', 'São iguais', 'A formação é só a sintonização'], correta: 0 },
    { texto: 'Um aluno não está pronto. O que fazes?', opcoes: ['Dou o certificado na mesma', 'Digo-lho a sós, com respeito, explico o que falta e deixo a porta aberta', 'Ignoro'], correta: 1 },
    { texto: 'Um aluno teu diz a alguém para deixar a medicação. De quem é a falha?', opcoes: ['Do aluno', 'Tua, como Mestre', 'Da pessoa'], correta: 1 }
  ]
};

window.FORMACAO_V2 = window.FORMACAO_V2 || {};
window.FORMACAO_V2['3B'] = {
  nivel: '3B',
  manual: { titulo: 'Manual completo do Nível 3B — Mestrado', ficheiro: 'Manual-Reiki-Nivel-3B-Mestrado-Hikari-Fafe.pdf' },
  modulos: N3B_MODULOS,
  exame: N3B_EXAME
};
