/* =========================================================================
   FORMAÇÃO DE REIKI — NÍVEL 3A (SHINPIDEN) · VERSÃO 2
   Hikari Fafe Escola de Reiki · Vindora
   -------------------------------------------------------------------------
   Conteúdo escrito a partir do "Manual de Usui Reiki Ryoho — Nível 3A —
   Shinpiden — O Mestre Interior", de Mestre Ricardo Correia.
   Módulo 0 + 8 módulos + treino livre + exame final de 20 perguntas.
   Mesma estrutura dos Níveis 1, 2 e 3B.
   ========================================================================= */

const T = c => ({ tipo: 'texto', conteudo: c });
const D = c => ({ tipo: 'destaque', conteudo: c });
const L = (titulo, itens) => ({ tipo: 'lista', titulo, itens });
const Q = (pergunta, opcoes, correta, feedback) => ({ pergunta, opcoes, correta, feedback });

const N3A_MODULOS = [

  /* ================================================================ 0 === */
  {
    ordem: 0, titulo: 'Shinpiden: os ensinamentos misteriosos',
    subtitulo: 'O que é o 3A, o que o separa do 3B, e um aviso honesto',
    manual: 'Shinpiden · O que este nível me mexeu · A nossa linhagem · Capítulo 1', duracao: '15 min',
    pdf: { titulo: 'Módulo 0 — Shinpiden', ficheiro: 'n3a-m00-shinpiden.pdf' },
    aula: { url: 'videos-reiki/n3a-m00.mp4', legendas: 'videos-reiki/n3a-m00.vtt' },
    ler: [
      T('Parabéns pelo teu trabalho no despertar e na tua transformação interior. Se aqui chegaste é porque de alguma forma fizeste esse trabalho, e vais começar a trilhar a realização.'),
      T('Shinpiden significa «mistérios» e «realização». O mistério não é um segredo escondido: é o que só se conhece vivendo. Podes ler o manual do princípio ao fim numa tarde e não teres aprendido nada. O 3A aprende-se com o tempo, e o tempo aqui não se acelera.'),
      D('«Ser Mestre é, antes de tudo, ser mestre de si próprio.» Muitos consideram este o nível de Mestre, e isso quer dizer que é o momento do teu trabalho interior como Mestre de ti mesmo.'),
      T('Neste nível trabalhas com o Dai Ko Myo, a grande luz brilhante, que traz uma dimensão espiritual à tua vivência com o Reiki. Espiritual não tem a ver com espiritismo, mas com a tua essência e a ligação dela ao Reiki e ao universo.'),
      D('O Reiki é uma prática complementar de bem-estar. Não diagnostica, não trata doenças e nunca substitui acompanhamento médico ou psicológico. Neste nível, em que se mexe em zonas mais fundas, esta fronteira é ainda mais importante.'),
      L('O terceiro nível divide-se em duas partes', [
        '3A — o aprofundamento: recebes o símbolo do Mestre (Dai Ko Myo tradicional) e trabalhas nele, em ti. Foco: o teu próprio caminho. Permite trabalhar como terapeuta de Reiki',
        '3B — o mestrado propriamente dito: mais dois símbolos, o Dai Ko Myo tibetano e o Raku. Foco: transmitir a outros. Permite dar formação e sintonizar novos alunos'
      ]),
      T('Muita gente confunde as duas coisas e acha que chegar ao 3A já é ser mestre. Não é, e essa confusão faz mal a quem a tem, porque leva pessoas a ensinarem sem estarem preparadas.'),
      L('O que muda na prática', [
        'O teu trabalho pessoal passa à frente do trabalho nos outros',
        'A meditação deixa de ser opcional e passa a ser o centro',
        'Começas a olhar para aquilo que costumas evitar olhar',
        'As sessões que dás mudam de qualidade, sem que mudes a técnica'
      ]),
      D('Um aviso honesto: este nível costuma mexer com as pessoas. Não é raro haver meses de maior agitação interior, decisões adiadas que vêm à tona, relações que se reajustam. Não é o Reiki a estragar nada, é aquilo que já lá estava a pedir atenção. Se te sentires em dificuldade, fala com o Mestre e, se for preciso, procura também acompanhamento profissional. Não há mérito nenhum em sofrer sozinho.'),
      T('O Mestre conta que o 3A é o nível onde é mais fácil parar sem dar por isso, e que ele próprio parou: ficou um tempo desleixado e fez outras formações. Quanto mais estudava, mais percebia que nada sabia. O que o trouxe de volta foi uma paciente. Ele não lhe diagnosticou nada: descreveu o que sentiu e devolveu-lhe a interpretação, e foi ela que ligou as pontas.'),
      D('Neste nível vais começar a ver e a sentir mais. É precisamente por isso que a linha entre descrever e diagnosticar tem de ficar mais firme, não mais frouxa.'),
      L('A nossa linhagem', [
        'Níveis 1, 2 e 3A — Reiki Tradicional · Usui Reiki Ryoho',
        'Nível 3B (Mestrado) — Reiki Essencial · Usui Shiki Ryoho',
        'O Dai Ko Myo tibetano e o Raku não fazem parte do núcleo original do Usui Reiki Ryoho e só se ensinam no 3B'
      ])
    ],
    praticar: {
      titulo: 'O que é hoje o Reiki para ti',
      instrucoes: 'Escreve meia página, sem consultar nada e sem citar ninguém: o que é hoje o Reiki para ti. Guarda o que escreveste e volta a lê-lo no fim deste nível.',
      registo: true, registoPergunta: 'O que é hoje o Reiki para mim:'
    },
    responder: [
      Q('O que significa Shinpiden?', ['Símbolo e mantra', '«Mistérios» e «realização»', 'Primeiros ensinamentos'], 1, 'O mistério é o que só se conhece vivendo.'),
      Q('O que permite o 3A?', ['Sintonizar alunos', 'Trabalhar como terapeuta de Reiki', 'Dar formação'], 1, 'Sintonizar e dar formação é do 3B.'),
      Q('Chegar ao 3A já é ser Mestre?', ['Sim', 'Não — o mestrado é o 3B', 'Só em Portugal'], 1, 'Essa confusão leva pessoas a ensinarem sem estarem preparadas.'),
      Q('Quando começas a ver e a sentir mais, o que deve ficar mais firme?', ['A linha entre descrever e diagnosticar', 'O preço', 'O horário'], 0, 'Descreves o que sentes e devolves a interpretação à pessoa.'),
      Q('Se o nível te mexer muito por dentro, o que fazes?', ['Aguentas sozinho', 'Falas com o Mestre e, se for preciso, procuras acompanhamento profissional', 'Largas o Reiki'], 1, 'Não há mérito nenhum em sofrer sozinho.')
    ]
  },

  /* ================================================================ 1 === */
  {
    ordem: 1, titulo: 'Rever, praticar e os cinco princípios no Kensho',
    subtitulo: 'Seis meses de trabalho, meditação diária e a transformação da consciência',
    manual: 'Capítulos 2 e 3', duracao: '25 min',
    pdf: { titulo: 'Módulo 1 — Rever, praticar e Kensho', ficheiro: 'n3a-m01-rever-e-kensho.pdf' },
    aula: { url: 'videos-reiki/n3a-m01.mp4', legendas: 'videos-reiki/n3a-m01.vtt' },
    ler: [
      T('No Nível 3 deves continuar a rever e a praticar o que aprendeste nos níveis 1 e 2. Relê os manuais: vais encontrar coisas que parece que não terás lido. É normal, quer dizer que tens outra consciência. Lembra-te da missão que o Mestre Usui indicou para o Usui Reiki Ryoho: guiar para uma vida pacífica e feliz.'),
      L('Incide sobretudo nestes temas', [
        'Os cinco princípios e os poemas do imperador Meiji',
        'O corpo energético e os chakras',
        'O autotratamento',
        'As técnicas de Reiki',
        'O guia de cura Usui'
      ]),
      L('O que praticar ao longo dos seis meses', [
        'Início — aplicação e desenho sistemáticos: autotratamento, compreensão do Dai Ko Myo, meditação',
        'Mês 1 — desenvolvimento pessoal: revisão das técnicas, compreensão do Dai Ko Myo',
        'Mês 2 — o que é verdadeiramente o Reiki; o Dai Ko Myo no envio à distância',
        'Mês 3 — prática terapêutica: a cura da criança interior; aplicação a colegas, usando o Dai Ko Myo',
        'Mês 4 — a cura do lado sombra, meditação; aplicação a colegas, usando todos os símbolos',
        'Mês 5 — a cura do lado sombra, meditação; aprofundamento do tratamento de questões específicas',
        'Mês 6 — desenvolvimento pessoal: o significado do propósito de vida e o tratamento aos bloqueios na vida; preparação para a profissionalização'
      ]),
      L('Os cinco princípios, de uma forma mais profunda', [
        'Aplica os cinco princípios às tuas questões de vida. Observa que bloqueios tens e como os podes resolver com eles',
        'Observa as outras pessoas e de que forma interagem contigo. Verifica como podes mudar o teu comportamento perante elas, com os cinco princípios',
        'Observa o mundo e vê de que forma poderá mudar com os cinco princípios, e qual é o teu papel nessa mudança'
      ]),
      T('Kensho quer dizer «ver a própria natureza»: a transformação da consciência. Trabalha com os poemas do imperador Meiji para reflectires nas tuas questões. São cento e vinte e cinco poemas, e cada um serve de espelho. Não é para decorares nenhum: é para te sentares com um deles e veres o que te devolve.'),
      D('A meditação deixa de ser opcional. Cria uma rotina meditativa: bastam quinze minutos por dia de Joshin Kokyu Ho, a técnica da respiração. Se só conseguires cinco minutos, faz cinco. Mas faz.')
    ],
    praticar: {
      titulo: 'Uma semana de meditação diária',
      instrucoes: 'Durante sete dias, faz Joshin Kokyu Ho todos os dias (quinze minutos, ou cinco se for o que consegues). No fim de cada dia escreve uma palavra. Escolhe também um poema do imperador Meiji para te sentares com ele.',
      registo: true, registoPergunta: 'As sete palavras e o que o poema me devolveu:'
    },
    responder: [
      Q('O que significa Kensho?', ['Cortar a energia negativa', 'Ver a própria natureza: a transformação da consciência', 'Luz brilhante'], 1, 'Trabalha-se com os poemas do imperador Meiji.'),
      Q('Quantos poemas do imperador Meiji há?', ['Doze', 'Cento e vinte e cinco', 'Mil'], 1, 'Não é para decorar: é para te sentares com um e veres o que te devolve.'),
      Q('Que técnica é usada na rotina meditativa diária?', ['Hatsurei Ho', 'Joshin Kokyu Ho', 'Jaki Kiri Joka Ho'], 1, 'Quinze minutos por dia; se só conseguires cinco, faz cinco.'),
      Q('Ao reler os manuais dos níveis anteriores encontras coisas que parece que não leste. O que significa?', ['Que o manual mudou', 'Que tens outra consciência', 'Que erraste'], 1, 'É normal.'),
      Q('Qual é a missão que o Mestre Usui indicou para o Usui Reiki Ryoho?', ['Ganhar discípulos', 'Guiar para uma vida pacífica e feliz', 'Curar doenças'], 1, 'É o que deves ter presente ao rever tudo.')
    ]
  },

  /* ================================================================ 2 === */
  {
    ordem: 2, titulo: 'Os símbolos um pouco mais além',
    subtitulo: 'Elementos, corpos subtis e a prática dos símbolos',
    manual: 'Capítulos 4 e 5', duracao: '25 min',
    pdf: { titulo: 'Módulo 2 — Os símbolos mais além', ficheiro: 'n3a-m02-os-simbolos-mais-alem.pdf' },
    aula: { url: 'videos-reiki/n3a-m02.mp4', legendas: 'videos-reiki/n3a-m02.vtt' },
    ler: [
      T('Se observares, os símbolos têm uma correspondência com os elementos e com os corpos subtis. Representam também frequências na nossa consciência. Na tradição existe a stupa, um relicário cuja estrutura designa os cinco elementos: terra, água, fogo, vento e vazio. É um mapa útil para perceberes onde é que cada símbolo trabalha.'),
      L('Elementos, corpos e símbolos', [
        'Vazio / Éter — o Absoluto, a nova consciência, iluminação — Reiki',
        'Vento / Ar — Nirvana, os cinco sentidos — corpo espiritual — Dai Ko Myo',
        'Fogo — iluminação, mente — corpo mental — Hon Sha Ze Sho Nen',
        'Água — prática, sensações — corpo emocional — Sei He Ki',
        'Terra — despertar, a consciência armazenada — corpo físico e etérico — Cho Ku Rei'
      ]),
      L('Para trabalhar mais profundamente com os símbolos', [
        'Desenvolve cada vez mais o trabalho intuitivo, para sentires onde devem ser aplicados, sem seguir fórmulas',
        'Descobre a aplicação de cada símbolo em cada um dos teus corpos: físico, mental, emocional e espiritual',
        'Observa, novamente, o que agora cada um destes símbolos faz em ti'
      ]),
      D('O risco deste nível: chegar aqui e começar a usar os quatro símbolos em tudo, sempre, por rotina. Isso não é aprofundar, é enfeitar. Pergunta-te antes de cada um: para quê? Se não souberes responder, não o uses.'),
      T('Os símbolos são como chaves. A energia universal pode alcançar todas as frequências, mas a mente humana precisa sempre de determinadas chaves para a solução dos seus problemas. Foi por isso que o Mestre Usui colocou os quatro símbolos. Mestres posteriores consideraram que eram necessárias mais chaves, modificaram alguns e inventaram outros, e assim surgiram sistemas com dezenas e dezenas de símbolos.'),
      T('Se praticamos o Usui Reiki Ryoho, faz sentido mantermos os símbolos tradicionais. Quem quiser criar outros métodos de cura tem todo o espaço para o fazer: não é preciso colocá-los dentro do Usui Reiki Ryoho.'),
      T('E se eu não praticar os símbolos? Eles estão em ti, mas, se não os praticares, talvez não os sintas de forma óbvia. Se fores persistente e escutares o que os símbolos te dizem, crescerás enormemente: não porque eles o fizeram, mas porque soubeste escutar com sabedoria e praticar com compaixão.'),
      D('Acima de tudo, os princípios. Podemos ter símbolos para tudo, mas se não soubermos praticar os cinco princípios, só por hoje, poderemos não compreender a totalidade da arte secreta de convidar a felicidade.'),
      L('Experimenta sempre', [
        'Desenhar com regularidade os quatro símbolos, com papel e caneta',
        'Meditar com cada símbolo individualmente',
        'Sentir como os símbolos trabalham em conjunto, uns com os outros',
        'Realizar a técnica de envio à distância com disciplina, para te habituares à prática dos símbolos'
      ])
    ],
    praticar: {
      titulo: 'Para quê?',
      instrucoes: 'Numa das tuas próximas sessões ou autotratamentos, antes de usares cada símbolo, pergunta-te: para quê? Só usa o que souberes responder. Depois desenha os quatro símbolos em papel e medita com cada um.',
      registo: true, registoPergunta: 'Que símbolo usei e para quê? O que mudou?'
    },
    responder: [
      Q('Que símbolo corresponde ao corpo emocional (elemento água)?', ['Cho Ku Rei', 'Sei He Ki', 'Dai Ko Myo'], 1, 'Água, prática, sensações.'),
      Q('Que símbolo corresponde ao corpo espiritual (vento)?', ['Dai Ko Myo', 'Hon Sha Ze Sho Nen', 'Cho Ku Rei'], 0, 'É o símbolo do plano mais subtil.'),
      Q('Usar os quatro símbolos em tudo, por rotina, é…', ['Aprofundar', 'Enfeitar', 'Obrigatório'], 1, 'Pergunta-te antes de cada um: para quê?'),
      Q('Para que é a stupa neste manual?', ['Para decoração', 'Um mapa dos cinco elementos que ajuda a perceber onde trabalha cada símbolo', 'Para tratar'], 1, 'Terra, água, fogo, vento e vazio.'),
      Q('O que vem acima de todos os símbolos?', ['O certificado', 'Os cinco princípios', 'A técnica'], 1, 'A arte secreta de convidar a felicidade.')
    ]
  },

  /* ================================================================ 3 === */
  {
    ordem: 3, titulo: 'Dai Ko Myo: a grande luz brilhante',
    subtitulo: 'Origem, significado, versões e para que serve',
    manual: 'Capítulos 6 e 8', duracao: '25 min',
    pdf: { titulo: 'Módulo 3 — Dai Ko Myo', ficheiro: 'n3a-m03-dai-ko-myo.pdf' },
    aula: { url: 'videos-reiki/n3a-m03.mp4', legendas: 'videos-reiki/n3a-m03.vtt' },
    ler: [
      T('Este é o símbolo do Mestre, e é o que recebes neste nível. O nome costuma traduzir-se por «grande luz brilhante». A Mestre Takata usava uma fórmula mais longa: «louvada seja a grande luz universal de sabedoria transcendental».'),
      L('Os três caracteres', [
        'Dai — divindade; sabedoria da cabeça; luz radiante de um iluminado',
        'Koo — brilho, ou luz do Sol',
        'Myo — Sol (à esquerda) e Lua (à direita); eterna luz'
      ]),
      T('A origem: o Dai Ko Myo parece estar ligado à divindade Fudo Myo, uma divindade irada e guerreira que faz parte de um conjunto de cinco myos, aspectos de Buda. Fudo Myo é o guardião da luz e usa um medalhão que significa «chave para a luz». Parece estar também relacionado com Dainichi Nyorai, o Buda Mahavairocana, o grande buda da iluminação universal.'),
      D('Mas entende-o como energia. Tudo isto serve apenas para compreenderes a origem. No Reiki, o Mestre Usui não fala em religião nem em espiritualidade: por isso compreende o Dai Ko Myo unicamente como ENERGIA, um símbolo que nos liga ao que há de mais elevado. Se tens uma crença, traz-a. Se não tens, também está bem.'),
      L('Para que serve', [
        'Quando queremos iluminação para nós',
        'Enviar luz espiritual a outros',
        'Protecção',
        'Clareza de mente e de espírito',
        'Meditação no caminho interior, à procura do nosso próprio Eu'
      ]),
      T('É o símbolo que trabalha no plano mais subtil, aquele de onde, segundo a tradição, decorrem os outros. Se o Cho Ku Rei é força, o Sei He Ki harmonia e o Hon Sha Ze Sho Nen ponte, o Dai Ko Myo é ligação: liga-te ao que há de mais elevado e liga entre si tudo o que já aprendeste.'),
      L('O tradicional e o tibetano', [
        'No 3A recebes a versão tradicional, de três caracteres japoneses; no 3B aprendes a versão tibetana. São dois desenhos do mesmo símbolo e ambos funcionam, desde que tenhas sido sintonizado com eles',
        'O tradicional é japonês, ligado a Fudo Myo e a Dainichi Nyorai. O tibetano entrou no Reiki pela via ocidental e tibetana e não faz parte do núcleo original do Usui Reiki Ryoho',
        'A regra simples: nas sintonizações, a tibetana; no teu trabalho pessoal e terapêutico, a que te for mais natural'
      ]),
      L('Os vários tipos de Dai Ko Myo', [
        'Tradicional (Usui) — os três kanji japoneses. É o que recebes neste nível',
        'Tibetano — criado por Arthur Robertson, no Reiki Tibetano, e amplamente divulgado por William Rand. Só se ensina no 3B',
        'Derivação do tibetano — rodada à direita, muito usada no Sistema Essencial e nos que derivam dele',
        'Outras derivações — não correspondem à verdadeira escrita do kanji, apesar de muito similares'
      ]),
      T('Na caligrafia oriental é muito importante uma escrita correcta. Isso não invalida os novos Dai Ko Myo criados: apenas não são a mesma coisa, e não devem ser apresentados como se fossem. Cada um tem a sua energia, o seu significado e o seu propósito.'),
      D('Uma pergunta que fica em aberto, para meditares: para que serve o raio que está no fim do símbolo tibetano? O Mestre não dá a resposta. Senta-te com ela.')
    ],
    praticar: {
      titulo: 'Sentar com a pergunta',
      instrucoes: 'Medita dez minutos com a pergunta que o Mestre deixa em aberto: para que serve o raio no fim do símbolo tibetano? Não procures a resposta — fica com a pergunta.',
      registo: true, registoPergunta: 'O que me veio, ou o que não veio:'
    },
    responder: [
      Q('O que quer dizer «Dai Ko Myo»?', ['Cortar e purificar', 'Grande luz brilhante', 'Ver a própria natureza'], 1, 'A Mestre Takata usava uma fórmula mais longa.'),
      Q('Com que divindade parece estar ligado o Dai Ko Myo?', ['Fudo Myo', 'Kannon', 'Zeus'], 0, 'O guardião da luz, com um medalhão que significa «chave para a luz».'),
      Q('No Reiki, como se entende o Dai Ko Myo?', ['Como religião', 'Unicamente como energia', 'Como um segredo'], 1, 'Se tens uma crença, traz-a; se não tens, também está bem.'),
      Q('Que versão do Dai Ko Myo recebes no 3A?', ['A tibetana', 'A tradicional, de três kanji', 'Nenhuma'], 1, 'A tibetana é ensinada no 3B.'),
      Q('Quem criou o Dai Ko Myo tibetano, segundo o manual?', ['Mikao Usui', 'Arthur Robertson, divulgado depois por William Rand', 'Hayashi'], 1, 'Só se ensina no 3B.')
    ]
  },

  /* ================================================================ 4 === */
  {
    ordem: 4, titulo: 'Desenhar e activar o Dai Ko Myo, e a meditação',
    subtitulo: 'As quatro semanas do desenho e a meditação de vinte minutos',
    manual: 'Capítulo 7 e meditação do capítulo 9', duracao: '30 min',
    pdf: { titulo: 'Módulo 4 — Desenhar e meditar', ficheiro: 'n3a-m04-desenhar-e-meditar.pdf' },
    aula: { url: 'videos-reiki/n3a-m04.mp4', legendas: 'videos-reiki/n3a-m04.vtt' },
    ler: [
      T('O Dai Ko Myo tradicional são três caracteres japoneses escritos uns por baixo dos outros, numa coluna: dai, ko, myo. São dezassete traços ao todo.'),
      T('A regra é a mesma da escrita japonesa: de cima para baixo e, dentro de cada carácter, da esquerda para a direita. Horizontais antes de verticais, exterior antes de interior, e a base fecha-se no fim. Segue os números da imagem do manual: é essa a referência que manda.'),
      L('Os três caracteres', [
        'Dai — o carácter de cima. Começa pelo traço horizontal e depois as duas pernas que descem, primeiro a da esquerda',
        'Ko — o do meio. Os traços pequenos de cima primeiro, depois a horizontal larga, depois o que fica por baixo dela',
        'Myo — o de baixo, formado por duas partes lado a lado: primeiro a da esquerda, inteira, e só depois a da direita'
      ]),
      D('Activar: desenha com a mão aberta, dedos juntos, ou visualiza. Ao desenhares, activa a sua energia dizendo o mantra três vezes, audível ou interiormente: Dai Ko Myo, Dai Ko Myo, Dai Ko Myo.'),
      L('Prática das quatro semanas', [
        'Uma semana para o dai, uma para o ko, duas para o myo, que é o mais trabalhoso',
        'Desenha à mão, em papel, todos os dias',
        'Na quinta semana faz o símbolo inteiro de uma assentada e repara como já não pensas nos traços'
      ]),
      T('Se não consegues visualizar, e muita gente não visualiza, não é defeito nenhum: desenha o símbolo num papel e olha para ele de olhos abertos. Ou limita-te a repetir o mantra e a sentir. A intenção é que conta, não a nitidez da imagem.'),
      L('Meditação com o Dai Ko Myo (vinte minutos, de preferência de manhã)', [
        'Senta-te confortavelmente, mãos nas pernas, palmas para cima. Gassho',
        'Cinco minutos de Joshin Kokyu Ho, até a respiração assentar',
        'Visualiza um grande Dai Ko Myo no ar, por cima da tua cabeça. Entoa o mantra três vezes',
        'Mantém a imagem suspensa. Olha para ela sem esforço. Quando se desfizer, refá-la com calma, sem te censurares. É isso o exercício',
        'Imagina que em cada posição das mãos estás a puxar a energia do Dai Ko Myo desde o chakra da coroa, como se fluísse em cascata',
        'Sente que o Dai Ko Myo é a grande luz universal, a representação do Reiki em si',
        'Ao fim de dez minutos, deixa o símbolo subir e dissolver-se numa luz acima da tua cabeça, e essa luz descer pelo teu corpo, devagar, do topo da cabeça até aos pés',
        'Leva a atenção ao tanden e fica aí alguns minutos: é aqui que se arruma a energia que sobra, não a deixes na cabeça',
        'Respira fundo três vezes, abre os olhos devagar. Gassho'
      ]),
      L('Se tiveres um problema concreto', [
        'Visualiza o símbolo no topo da cabeça',
        'Preenche todo o corpo com a energia',
        'Projecta o problema à tua frente',
        'Envia energia Dai Ko Myo para o problema, levando Reiki até ele, até toda a escuridão ser substituída pela luz'
      ])
    ],
    praticar: {
      titulo: 'Os 21 dias e as quatro semanas',
      instrucoes: 'Durante vinte e um dias, faz autotratamento e meditação com o Dai Ko Myo, todos os dias, e escreve uma palavra por dia. Em paralelo, desenha à mão o símbolo, como nas quatro semanas: uma semana o dai, uma o ko, duas o myo.',
      registo: true, registoPergunta: 'As minhas palavras dos 21 dias:'
    },
    responder: [
      Q('Quantos traços tem, ao todo, o Dai Ko Myo tradicional?', ['Nove', 'Dezassete', 'Trinta'], 1, 'Dai, ko e myo, escritos numa coluna.'),
      Q('Em que sentido se escreve o símbolo?', ['De baixo para cima', 'De cima para baixo e, dentro de cada carácter, da esquerda para a direita', 'Sempre da direita para a esquerda'], 1, 'É a regra da escrita japonesa.'),
      Q('Quantas vezes se diz o mantra ao activar o símbolo?', ['Uma', 'Três', 'Sete'], 1, 'Audível ou interiormente.'),
      Q('Não consegues visualizar o símbolo. O que fazes?', ['Desistes', 'Desenhas num papel e olhas de olhos abertos, ou repetes o mantra e sentes', 'Pedes a outra pessoa'], 1, 'A intenção é que conta, não a nitidez da imagem.'),
      Q('Onde se arruma a energia que sobra no fim da meditação?', ['Na cabeça', 'No tanden', 'Nas mãos'], 1, 'Não a deixes na cabeça.')
    ]
  },

  /* ================================================================ 5 === */
  {
    ordem: 5, titulo: 'Aplicar o Dai Ko Myo e usá-lo no dia-a-dia',
    subtitulo: 'A ordem dos símbolos, os cuidados e a vida quotidiana',
    manual: 'Capítulos 9 e 10', duracao: '25 min',
    pdf: { titulo: 'Módulo 5 — Aplicar o Dai Ko Myo', ficheiro: 'n3a-m05-aplicar-o-dai-ko-myo.pdf' },
    aula: { url: 'videos-reiki/n3a-m05.mp4', legendas: 'videos-reiki/n3a-m05.vtt' },
    ler: [
      T('Este manual é um referencial, e os livros são complementos de outras perspectivas. O crescimento alcança-se quando praticamos, connosco e com os outros.'),
      L('A ordem dos símbolos, conforme o caso', [
        'Problemas físicos — Dai Ko Myo, depois Cho Ku Rei',
        'Problemas emocionais — Dai Ko Myo, Sei He Ki, Cho Ku Rei',
        'Processos mentais, passado ou futuro — Dai Ko Myo, Hon Sha Ze Sho Nen, Sei He Ki, Cho Ku Rei'
      ]),
      L('No tratamento a outros', [
        'O Dai Ko Myo trabalha bastante no campo espiritual, ou no mais elevado energeticamente da pessoa, por isso nem sempre é recomendado aplicá-lo logo na primeira ou segunda sessão. Tem sempre em atenção a capacidade de integração de quem recebe',
        'O uso segue a mesma lógica praticada no autotratamento',
        'É também eficaz na remoção de energias espirituais de frequência mais baixa. Pode ser aplicado com o envio do símbolo, ou pelo sopro: desenha o símbolo no interior da tua terceira visão e sopra com força na direcção do local, e também na terceira visão da pessoa'
      ]),
      D('Enraíza sempre a seguir. Depois de um trabalho destes a pessoa pode ficar com sensação de tontura. Enraíza-a: mãos nos pés, ou a prática de enraizamento que aprendeste no Nível 1. Não deixes ninguém levantar-se da marquesa com a cabeça no ar.'),
      L('O Dai Ko Myo na vida quotidiana (ao levantares-te ou depois do banho)', [
        'Faz o banho seco e a chuva de Reiki',
        'Liga-te ao Reiki e recita os cinco princípios',
        'Desenha ou visualiza um grande Dai Ko Myo mesmo à tua frente, dizendo o mantra três vezes',
        'Sente a vibração e pede para que o símbolo te... e aqui colocas a tua intenção'
      ]),
      T('A intenção é muito importante, porque é a forma como a energia vai trabalhar. Podes pedir para te orientar no dia-a-dia, para que sejas compassivo, ou calmo, ou sábio. Medita sobre o símbolo: vais ver que te dá outra proximidade com ele.'),
      T('Na meditação, mesmo sem ser meditação de Reiki, podes desenhar o Dai Ko Myo e visualizá-lo a cobrir-te totalmente com a sua luz. Serve para te proteger e para te colocar em maior sintonia com a energia da meditação.'),
      T('Se durante uma meditação tiveste uma visão interior e a queres compreender melhor: desenha o Dai Ko Myo, imagina que te cobre de luz, e depois visualiza a situação de que te consegues lembrar. Acrescenta o Hon Sha Ze Sho Nen, o Sei He Ki e o Cho Ku Rei e, com todos os símbolos a vibrar, recomeça a meditação.'),
      L('Outras situações para experimentares', [
        'Quando precisas de encontrar respostas para as tuas questões',
        'Para iluminação',
        'Purificação de toda a tua energia',
        'Tranquilidade',
        'Tomada de decisões',
        'Ligação à energia, à Fonte mais pura',
        'Em agradecimento'
      ]),
      D('«O mundo está seguro se tomares o caminho certo.» — Imperador Meiji')
    ],
    praticar: {
      titulo: 'Uma intenção por dia',
      instrucoes: 'Durante uma semana, ao levantares-te ou depois do banho, faz a rotina: banho seco, chuva de Reiki, cinco princípios e um grande Dai Ko Myo à tua frente, com o mantra três vezes. Cada dia coloca uma intenção diferente.',
      registo: true, registoPergunta: 'As intenções que pedi e o que notei:'
    },
    responder: [
      Q('Para um problema emocional, qual a ordem dos símbolos?', ['Cho Ku Rei, Sei He Ki', 'Dai Ko Myo, Sei He Ki, Cho Ku Rei', 'Só Dai Ko Myo'], 1, 'Para problemas físicos, Dai Ko Myo e depois Cho Ku Rei.'),
      Q('Porque é que nem sempre se aplica o Dai Ko Myo na primeira ou segunda sessão?', ['É proibido', 'Trabalha no campo mais elevado: tem-se em atenção a capacidade de integração de quem recebe', 'Porque é caro'], 1, 'O uso deve respeitar a pessoa.'),
      Q('O que se faz depois de um trabalho com o Dai Ko Myo, se a pessoa ficar tonta?', ['Nada', 'Enraíza-se: mãos nos pés, ou a prática de enraizamento do Nível 1', 'Manda-se embora'], 1, 'Não deixes ninguém levantar-se da marquesa com a cabeça no ar.'),
      Q('Porque é que a intenção é importante na rotina do dia-a-dia?', ['É a forma como a energia vai trabalhar', 'Não é importante', 'Só serve para decorar'], 0, 'Podes pedir para seres compassivo, calmo ou sábio.'),
      Q('Onde se desenha o símbolo para soprar na remoção de energias de frequência mais baixa?', ['No interior da tua terceira visão', 'No chão', 'No joelho'], 0, 'E sopras com força na direcção do local e na terceira visão da pessoa.')
    ]
  },

  /* ================================================================ 6 === */
  {
    ordem: 6, titulo: 'Traumas, técnicas e limpeza com o Jaki Kiri Joka Ho',
    subtitulo: 'Tratar o que surge, com os cinco princípios, e as técnicas deste nível',
    manual: 'Capítulos 11, 12 e 13', duracao: '40 min',
    pdf: { titulo: 'Módulo 6 — Traumas e técnicas', ficheiro: 'n3a-m06-traumas-e-tecnicas.pdf' },
    aula: { url: 'videos-reiki/n3a-m06.mp4', legendas: 'videos-reiki/n3a-m06.vtt' },
    ler: [
      T('A partir do terceiro nível podes encontrar-te com mais experiência e saber para te tornares um terapeuta. Compreendendo a viagem profunda deste nível, percebes que muitas situações começarão a surgir em ti: bloqueios, traumas, lembranças dolorosas. Isso não surge porque estejas a fazer algo errado, mas pela tua prática, que te leva a conhecer-te melhor.'),
      L('Os cinco princípios como ferramenta de cura', [
        'Só por hoje — lembra-nos que precisamos de estar no momento presente para encarar e reflectir. Já não estamos no passado',
        'Sou calmo — se a minha mente for um lago sereno onde se pode espelhar a lua, de que forma este trauma o perturba?',
        'Confio — tenho capacidade para sentir força em mim próprio para observar e ultrapassar a situação?',
        'Sou grato — consigo compreender o ensinamento que este trauma trouxe à minha vida, e de que forma não o farei a outros?',
        'Trabalho honestamente — de que forma me vou aplicar na resolução positiva deste trauma?',
        'Sou bondoso — não procurar retribuição nem sempre é fácil. A justiça terá de começar em nós, assim como a bondade'
      ]),
      T('Aplicar a filosofia de vida a uma questão traumática ajuda-nos a desenvolver uma essência firme como uma montanha e, ao mesmo tempo, flexível como um bambu.'),
      L('Uma prática de reconciliação (vinte minutos, num dia em que tenhas espaço)', [
        'Gassho e respiração, até estares assente',
        'Traz à memória a situação. Sem detalhes, sem reconstruir a história toda. Basta a sensação',
        'Pousa as mãos no peito. Dai Ko Myo, mantra três vezes',
        'Acrescenta o Sei He Ki, para a carga emocional',
        'Fica. Não tentes perdoar, nem compreender, nem concluir nada. Se vierem lágrimas, deixa vir',
        'Ao fim de dez a quinze minutos, sela com Cho Ku Rei',
        'Escreve duas ou três linhas sobre o que aconteceu. Uma palavra já serve'
      ]),
      D('Onde está o limite, e isto é sério: é uma prática de acolhimento, não é psicoterapia. Nem quando a fazes em ti, nem quando a conduzes noutra pessoa. Se o que vier for grande de mais, trauma antigo, ou algo que te deixe em sofrimento sério, procura acompanhamento profissional. O Reiki acompanha muito bem esse processo. Não o faz sozinho.'),
      L('O que trata cada símbolo', [
        'Dai Ko Myo — a essência da pessoa',
        'Hon Sha Ze Sho Nen — mudança de pensamento e de sentimento; o passado',
        'Sei He Ki — harmonização; as emoções',
        'Cho Ku Rei — ligação à energia, equilíbrio dos chakras, potenciar'
      ]),
      L('As técnicas neste nível', [
        'Considera fazer uma limpeza à pessoa com o Sei He Ki, e elevar o tratamento ao campo energético emocional e mental',
        'A prática de Nentatsu pode ser importante para o desenvolvimento de um pensamento positivo e optimista',
        'As técnicas de desintoxicação — Tanden Chiryo Ho e Gedoku Chiryo Ho — ajudam a libertar emoções',
        'Trabalha sempre todo o corpo energético, para que o equilíbrio seja homogéneo nos vários corpos',
        'Continua a praticar o Hatsurei Ho, que aprendeste no Nível 2, para avaliares o teu crescimento energético e de consciência'
      ]),
      T('Jaki Kiri Joka Ho: jaki significa energia negativa do corpo, kiri cortar, joka limpeza e ho técnica. Usa-se para retirar energia negativa ou miasmas, cortar ondas negativas fixadas há muito tempo, purificar ou harmonizar alguma coisa.'),
      L('Como se faz o Jaki Kiri Joka Ho', [
        'Faz uma meditação Gassho por alguns momentos, seguida de uma oração Reiji-Ho',
        'Pega no objecto que vais tratar. Se for pequeno, coloca-o numa das palmas. Se for grande, fica de pé à sua frente',
        'Faz uma respiração profunda, concentra a energia no tanden e, enquanto seguras a respiração, dá três golpes sobre o objecto, de dentro para fora, com movimentos rápidos, a dois a cinco centímetros acima dele. Só então soltas o ar. O terceiro golpe deve terminar em cima do objecto',
        'A seguir energiza-o, aplicando Reiki com o Cho Ku Rei: neutralizas a energia negativa e substituis por energia Reiki'
      ]),
      D('Prende mesmo a respiração. De acordo com o Mestre Aoki, se não se prender a respiração ao longo dos três cortes, corre-se o risco de contaminação com a energia negativa que se está a transmutar. É um pormenor pequeno e é o mais importante desta técnica. Em objectos muito grandes, como casas, usa o Dai Ko Myo e o Hon Sha Ze Sho Nen, imagina os cortes acima do objecto e depois energiza à distância.'),
      L('Respiração com o Cho Ku Rei, chakra a chakra (sentado, sem pressa)', [
        'Costas direitas, olhos fechados. Alguns minutos em silêncio, a sentir o ritmo respiratório',
        'Inala e exala com calma pelo nariz. Quando o ar entra, a barriga sai; quando o ar sai, a barriga entra',
        'Visualiza à tua frente o Cho Ku Rei, à altura do chakra básico. Ao inspirar, sente o chakra a respirar e o símbolo a ser absorvido por ele',
        'Ao expirar, visualiza todas as emoções negativas a serem expelidas do chakra, como uma nuvem escura de fumo a sair',
        'Visualiza o Cho Ku Rei a pulsar no local, como um grande coração dourado',
        'Repete a operação com os outros seis chakras principais',
        'No coronário, visualiza um imenso Cho Ku Rei sobre a cabeça. Depois visualiza-o a entrar pelo coronário e a descer até à planta dos pés, onde sai e é absorvido pela terra'
      ])
    ],
    praticar: {
      titulo: 'Reconciliação e limpeza',
      instrucoes: 'Faz a prática de reconciliação com uma mágoa antiga que peça atenção, e escreve duas ou três linhas. Noutro dia, faz o Jaki Kiri Joka Ho num objecto pequeno, prendendo a respiração nos três golpes, e a respiração chakra a chakra com o Cho Ku Rei.',
      registo: true, registoPergunta: 'O que aconteceu na reconciliação e na limpeza:'
    },
    responder: [
      Q('A prática de reconciliação é…', ['Psicoterapia', 'Uma prática de acolhimento, não é psicoterapia', 'Uma técnica de diagnóstico'], 1, 'Se for grande de mais, procura acompanhamento profissional.'),
      Q('Na prática de reconciliação, o que fazes com o perdão?', ['Forças-te a perdoar', 'Não tentas perdoar, nem compreender, nem concluir nada', 'Escreves uma carta ao outro'], 1, 'Se vierem lágrimas, deixa vir.'),
      Q('No Jaki Kiri Joka Ho, o que fazes durante os três golpes?', ['Falas', 'Seguras a respiração', 'Cantas'], 1, 'Segundo o Mestre Aoki, evita a contaminação com a energia negativa.'),
      Q('Com que símbolo se energiza o objecto no fim do Jaki Kiri Joka Ho?', ['Dai Ko Myo', 'Cho Ku Rei', 'Sei He Ki'], 1, 'Neutralizas a energia negativa e substituis por energia Reiki.'),
      Q('Que símbolo trata a essência da pessoa?', ['Cho Ku Rei', 'Sei He Ki', 'Dai Ko Myo'], 2, 'O Hon Sha Ze Sho Nen trata o pensamento, o sentimento e o passado.')
    ]
  },

  /* ================================================================ 7 === */
  {
    ordem: 7, titulo: 'Antahkarana e a sessão de Nível 3A',
    subtitulo: 'Um símbolo de fora da linha de Usui, e o silêncio na sessão',
    manual: 'Capítulos 14 e 15', duracao: '25 min',
    pdf: { titulo: 'Módulo 7 — Antahkarana e a sessão', ficheiro: 'n3a-m07-antahkarana-e-a-sessao.pdf' },
    aula: { url: 'videos-reiki/n3a-m07.mp4', legendas: 'videos-reiki/n3a-m07.vtt' },
    ler: [
      T('O Antahkarana é um símbolo muito antigo, de origem tibetana, que chegou ao Reiki por fora da linha do Mestre Usui. Convém dizê-lo com clareza logo de início: não faz parte dos ensinamentos originais do Usui Reiki Ryoho. O Mestre ensina-o porque é uma ferramenta útil e porque faz parte do seu percurso, mas não o confundas com os quatro símbolos do sistema.'),
      T('O nome vem do sânscrito e aponta para a ideia de instrumento de acesso ao interior: a ponte entre a mente do dia a dia e aquilo que em nós é mais vasto. Ao contrário dos símbolos do Reiki, que se desenham e se activam, este trabalha pela simples presença: basta estar no espaço para produzir efeito.'),
      L('Como usar o Antahkarana', [
        'Na sala de tratamento: pendurado na parede ou colocado por baixo da marquesa, a aprofundar o que ali se faz',
        'Na meditação: olha para o centro da figura, de forma suave e sem fixar com força, durante alguns minutos',
        'Em ti: desenhado ou impresso num papel, encostado ao corpo com a face desenhada virada para a zona que precisa',
        'Para limpar objectos: coloca o objecto entre dois desenhos do símbolo, frente a frente, e deixa algumas horas'
      ]),
      L('Meditação com o Antahkarana', [
        'Coloca o símbolo à altura dos olhos, a cerca de um metro',
        'Senta-te, Gassho, cinco minutos de respiração',
        'Olha para o centro da figura. Não fixes com esforço: deixa o olhar pousar',
        'Ao fim de alguns minutos vais reparar que a figura parece mover-se ou mudar de profundidade. É esperado. Não persigas o efeito',
        'Fecha os olhos e fica com a imagem que ficou',
        'Recolhe a atenção ao tanden e termina com Gassho'
      ]),
      D('Sê honesto com os teus alunos. Quando ensinares isto, um dia, diz de onde vem. Há escolas que apresentam o Antahkarana como se fosse Reiki tradicional, e não é. Dizer a verdade sobre a origem das coisas não lhes tira valor nenhum: dá-lhes.'),
      T('A sessão de Nível 3A: a técnica não muda muito em relação ao Nível 2. O que muda és tu, e nota-se na qualidade do silêncio que consegues sustentar.'),
      L('Antes', [
        'Faz a tua respiração antes de a pessoa chegar. Cinco minutos',
        'Limpa o espaço. Neste nível o Mestre costuma começar pelo Dai Ko Myo e fechar com o Cho Ku Rei',
        'Não atendas com a cabeça noutro sítio. Se o dia está impossível, remarca'
      ]),
      L('Durante', [
        'Gassho e Reiji-Ho, como sempre',
        'Dai Ko Myo nas palmas, antes de pousares as mãos',
        'Segue a sequência habitual das posições',
        'Onde a mão pedir, acrescenta o símbolo que fizer sentido, e só esse',
        'Fala menos do que no Nível 2. Confia mais no silêncio'
      ]),
      L('Depois', [
        'Alisa o campo, sela com Cho Ku Rei, Gassho',
        'Dá água e tempo à pessoa. Enraíza-a, se for preciso',
        'Lava as mãos',
        'Escreve duas linhas no teu registo: o que sentiste, não o que concluíste'
      ]),
      D('Alunos deste nível dizem muitas vezes a mesma coisa: «faço exactamente o mesmo e as pessoas saem de lá diferentes». O que mudou não foi a técnica: foi quem está a segurar as mãos.')
    ],
    praticar: {
      titulo: 'Vinte sessões registadas',
      instrucoes: 'Começa o teu registo de vinte sessões: data, duração, o que sentiste e o que a pessoa relatou. Sem interpretações. Ao fim das vinte, relê tudo de seguida. Faz também a meditação com o Antahkarana uma vez, se tiveres o desenho.',
      registo: true, registoPergunta: 'As primeiras sessões do meu registo:'
    },
    responder: [
      Q('O Antahkarana faz parte dos ensinamentos originais do Usui Reiki Ryoho?', ['Sim', 'Não — chegou por fora da linha do Mestre Usui', 'Só no 3B'], 1, 'Não o confundas com os quatro símbolos do sistema.'),
      Q('Como trabalha o Antahkarana?', ['Desenha-se e activa-se', 'Pela simples presença', 'Só com mantra'], 1, 'Basta estar no espaço para produzir efeito.'),
      Q('Quando ensinares o Antahkarana, o que deves dizer?', ['Que é Reiki tradicional', 'De onde vem', 'Nada'], 1, 'A verdade sobre a origem não lhe tira valor: dá-lho.'),
      Q('O que muda na sessão de Nível 3A em relação ao Nível 2?', ['A técnica', 'A qualidade do silêncio e de quem segura as mãos', 'O preço'], 1, 'A técnica não muda muito.'),
      Q('O que escreves no registo depois da sessão?', ['O que concluíste', 'O que sentiste, não o que concluíste', 'Um diagnóstico'], 1, 'Duas linhas.')
    ]
  },

  /* ================================================================ 8 === */
  {
    ordem: 8, titulo: 'Trabalho interior, ética e o caminho para o mestrado',
    subtitulo: 'Criança interior, sombra, Reiki Tradicional e Essencial, Gokukaiden',
    manual: 'Capítulos 16 a 22 e Compromisso do Aluno', duracao: '40 min',
    pdf: { titulo: 'Módulo 8 — Trabalho interior e ética', ficheiro: 'n3a-m08-trabalho-interior-e-etica.pdf' },
    aula: { url: 'videos-reiki/n3a-m08.mp4', legendas: 'videos-reiki/n3a-m08.vtt' },
    ler: [
      T('O trabalho interior é a parte deste nível que não se ensina com técnicas. Vai acontecendo, e o que te compete é não fugir dela.'),
      T('Olhar para o que evitas: toda a gente tem zonas que não visita, como a mágoa antiga, a decisão adiada, a relação que se arrasta. No 3A, essas zonas costumam começar a fazer barulho. A prática é simples de descrever e difícil de fazer: em vez de arranjares explicação, ficas. Sentas-te, pões as mãos, e ficas com aquilo sem tentar resolver nada durante alguns minutos.'),
      L('A criança interior', [
        'Não vais «buscar memórias»: vais estar presente com a parte de ti que ficou pequena nalgum momento',
        'Gassho, respiração e enraizamento',
        'Dai Ko Myo e Sei He Ki nas palmas',
        'Mãos no peito. Formula a intenção de estares disponível para a criança que foste, sem lhe exigir nada',
        'Fica. Se vier uma imagem, uma idade, uma cena, deixa vir e não a persigas. Se não vier nada, também está certo',
        'Sela com Cho Ku Rei e escreve depois duas ou três linhas'
      ]),
      D('O lado sombra: é o trabalho dos meses seguintes, olhar para aquilo em ti que não gostas de admitir (a inveja, o orgulho, a preguiça) não para te castigares, mas para deixar de gastar energia a esconder. Um terapeuta que não conhece a própria sombra projecta-a nos pacientes. É por isso que este trabalho vem antes do mestrado, e não depois.'),
      T('A carta que não se envia: escreve a alguém com quem tenhas uma questão por resolver. Diz tudo, sem filtro. Depois dá Reiki à carta com os quatro símbolos, e queima-a ou guarda-a, mas não a envies.'),
      T('Reiki Tradicional e Reiki Essencial: são os sistemas que definem as diferenças no ensino do Reiki. O Reiki Essencial ganhou forma sobretudo através da Mestre Diane Stein e da publicação do seu livro. O sistema tradicional japonês não é mais do que o Usui Reiki Ryoho: a tentativa de ensinar, aprender e praticar segundo os ensinamentos do Mestre Usui, seguindo também o racional do Mestre Hayashi e da Mestre Takata.'),
      L('As diferenças fundamentais', [
        'Tradicional: foco na história do Mestre Usui, seguindo a tradução do memorial e os testemunhos de alunos. Essencial: foca a parte contada pela Mestre Takata',
        'Tradicional: 21 técnicas sistematizadas. Essencial: técnicas não sistematizadas',
        'Tradicional: uso de termos japoneses. Essencial: perderam-se os termos japoneses',
        'Tradicional: prática sistematizada em três pilares. Essencial: prática mais intuitiva',
        'Tradicional: curso em quatro etapas. Essencial: em três etapas'
      ]),
      D('Isto não é para julgar ninguém. Todos os praticantes devem muito à Mestre Diane Stein, porque graças a ela o Reiki se tornou mais conhecido no ocidente, e muito respeito à Mestre Takata. A nossa preocupação é a união e a amizade, promover felicidade e paz, não tanto procurar quem tem razão.'),
      L('Quando se faz o Gokukaiden (o 3B, o mestrado)', [
        'Dependendo da condição do praticante, os conhecimentos de Gokukaiden podem ser transmitidos quando se está a sintonizar o Shinpiden',
        'Entre um nível e o seguinte, mesmo tendo sido passado o conhecimento, deve aguardar-se o espaço de seis meses a um ano',
        'Um Mestre deve conhecer exaustivamente a prática e perceber todos os pormenores dos símbolos que vai passar aos alunos',
        'O conhecimento do Dai Ko Myo envolve transformações espirituais profundas, que podem demorar entre meses e anos'
      ]),
      T('Por isso, tranquilidade. O passar do tempo apenas nos traz sabedoria. Como se costuma dizer: quando o aluno está pronto, o mestre aparece.'),
      L('A ética de quem se aproxima do mestrado', [
        'És terapeuta, não és Mestre. O 3A não te dá o título de Mestre nem te permite sintonizar ou dar formação. Dizer o contrário é enganar quem te procura',
        'Não sintonizes ninguém. Nem para experimentar, nem a família, nem de graça',
        'Não uses o nível como argumento de venda. O que vale é o teu trabalho, não o degrau em que estás',
        'Reconhece o que não é para ti. Saber encaminhar é uma competência, não uma falha',
        'Cuida de ti primeiro. Um terapeuta esgotado acaba por dar do que não tem',
        'Respeita outras escolas. Diferente não é errado'
      ]),
      D('A pergunta que vale a pena fazeres-te: porque é que eu quero o 3B? Se a resposta tiver a ver com estatuto, com preço de formações ou com ter mais um certificado, vale a pena esperar. Se tiver a ver com partilhar aquilo que te fez bem, então estás no caminho.'),
      L('Perguntas que me fazem sempre', [
        'Já posso sintonizar alguém? Não. O 3A é trabalho interior. Sintonizar exige o 3B',
        'Já posso chamar-me Mestre de Reiki? Não. Podes dizer que tens o Nível 3A, ou Shinpiden de aprofundamento',
        'Ando mais sensível e irritadiço desde a sintonização. É normal? É frequente, sobretudo nos primeiros meses. Mantém a prática, dorme o que precisares e fala com o Mestre',
        'Posso ensinar o que aprendi a um amigo? Podes falar do que é o Reiki. Não podes ensinar o método nem passar os símbolos',
        'E se eu não sentir diferença? Acontece a bastante gente. A diferença deste nível aparece devagar, e vê-se mais no modo como reages às coisas do que em sensações'
      ]),
      D('Compromisso do Aluno: «Ao receber a sintonização de Nível 3A — Shinpiden, comprometo-me a aprofundar a minha prática com honestidade, a não me apresentar como Mestre nem sintonizar ninguém antes de estar habilitado para isso, e a lembrar-me sempre de que o Reiki acompanha mas nunca substitui o cuidado de saúde de quem está à minha frente.» Este nível não se acaba: assenta. Dá-lhe o tempo que ele pedir.')
    ],
    praticar: {
      titulo: 'A criança interior e a carta',
      instrucoes: 'Faz a prática da criança interior, com cuidado, e escreve duas ou três linhas. Escreve depois a carta que não se envia, dá-lhe Reiki com os quatro símbolos e queima-a ou guarda-a. Responde à pergunta: porque é que eu quero o 3B?',
      registo: true, registoPergunta: 'O que aconteceu, e porque quero (ou não) o 3B:'
    },
    responder: [
      Q('O 3A permite-te sintonizar alguém?', ['Sim', 'Não — isso é do 3B', 'Só a família'], 1, 'Nem para experimentar, nem a família, nem de graça.'),
      Q('Podes chamar-te «Mestre de Reiki» com o 3A?', ['Sim', 'Não: podes dizer que tens o Nível 3A', 'Só se te pedirem'], 1, 'Dizer o contrário é enganar quem te procura.'),
      Q('Porque é que o trabalho com a sombra vem antes do mestrado?', ['Porque é mais fácil', 'Um terapeuta que não conhece a própria sombra projecta-a nos pacientes', 'Por tradição'], 1, 'Não é para te castigares, é para deixar de gastar energia a esconder.'),
      Q('O que fazes à carta que não se envia?', ['Envias', 'Dás-lhe Reiki com os quatro símbolos e queimas ou guardas', 'Publicas'], 1, 'Mas não a envias.'),
      Q('Quanto tempo se deve esperar entre um nível e o seguinte?', ['Nada', 'Entre seis meses e um ano', 'Dez anos'], 1, 'Mesmo tendo sido passado o conhecimento.')
    ]
  }
];

/* =========================================================================
   TREINO LIVRE — perguntas DIFERENTES das do módulo
   ========================================================================= */
const N3A_TREINO = {
  0: [
    Q('O que é o foco do 3A?', ['O teu próprio caminho', 'Transmitir a outros', 'Vender'], 0, 'O foco do 3B é transmitir a outros.'),
    Q('Que símbolo é novo no 3A?', ['Cho Ku Rei', 'Dai Ko Myo (Usui)', 'Raku'], 1, 'O Raku é do 3B.'),
    Q('O que passa a ser o centro do teu trabalho no 3A?', ['A meditação', 'A publicidade', 'O preço'], 0, 'Deixa de ser opcional.'),
    Q('A linhagem dos níveis 1, 2 e 3A é…', ['Reiki Tradicional · Usui Reiki Ryoho', 'Reiki Essencial', 'Reiki Tibetano'], 0, 'O 3B corresponde ao Reiki Essencial · Usui Shiki Ryoho.')
  ],
  1: [
    Q('Quantos meses de prática o manual propõe para o 3A?', ['Um', 'Seis', 'Vinte e quatro'], 1, 'Com prática, desenvolvimento pessoal e preparação para a profissionalização.'),
    Q('Qual é o foco do mês 3?', ['A cura da criança interior', 'A sintonização', 'O exame'], 0, 'Com aplicação a colegas, usando o Dai Ko Myo.'),
    Q('Quanto tempo bastam por dia de Joshin Kokyu Ho?', ['Quinze minutos', 'Cinco horas', 'Um segundo'], 0, 'Se só conseguires cinco minutos, faz cinco.'),
    Q('Para que serve o poema do imperador Meiji?', ['Para decorar', 'Para te sentares com ele e veres o que te devolve', 'Para recitar aos alunos'], 1, 'Cada um serve de espelho.')
  ],
  2: [
    Q('Que elemento corresponde ao Cho Ku Rei?', ['Terra', 'Fogo', 'Água'], 0, 'Corpo físico e etérico.'),
    Q('Que símbolo corresponde ao corpo mental (fogo)?', ['Hon Sha Ze Sho Nen', 'Sei He Ki', 'Dai Ko Myo'], 0, 'É o da mente.'),
    Q('Porque é que os símbolos são como chaves?', ['A mente humana precisa de determinadas chaves para a solução dos seus problemas', 'Abrem portas', 'São de metal'], 0, 'A energia universal alcança todas as frequências.'),
    Q('Se praticamos o Usui Reiki Ryoho, faz sentido…', ['Manter os símbolos tradicionais', 'Inventar sempre novos', 'Usar todos'], 0, 'Quem quiser criar outros métodos tem espaço para o fazer.')
  ],
  3: [
    Q('A Mestre Takata usava para o Dai Ko Myo…', ['Uma fórmula mais longa', 'Nenhuma fórmula', 'Só o mantra'], 0, '«Louvada seja a grande luz universal de sabedoria transcendental.»'),
    Q('O que significa «Myo»?', ['Sol e Lua: eterna luz', 'Cortar', 'Técnica'], 0, 'Sol à esquerda e Lua à direita.'),
    Q('Quando se usa o Dai Ko Myo tibetano?', ['Nas sintonizações', 'Nunca', 'Só à distância'], 0, 'No trabalho pessoal e terapêutico, a que te for mais natural.'),
    Q('Apresentar um Dai Ko Myo criado depois como se fosse o original é…', ['Correcto', 'Errado: não são a mesma coisa', 'Obrigatório'], 1, 'Cada um tem a sua energia, o seu significado e o seu propósito.')
  ],
  4: [
    Q('Quantas semanas se dedica ao «myo» nas quatro semanas do desenho?', ['Uma', 'Duas', 'Quatro'], 1, 'É o mais trabalhoso.'),
    Q('Como se activa o símbolo ao desenhar?', ['Com o mantra, três vezes', 'Sem fazer nada', 'Com um som agudo'], 0, 'Audível ou interiormente.'),
    Q('O que se faz com o símbolo na meditação quando a imagem se desfaz?', ['Desiste-se', 'Refaz-se com calma, sem te censurares', 'Apaga-se'], 1, 'É isso o exercício.'),
    Q('Qual é a duração da meditação com o Dai Ko Myo?', ['Cinco minutos', 'Vinte minutos', 'Duas horas'], 1, 'De preferência de manhã, mas a hora certa é a que consegues manter.')
  ],
  5: [
    Q('Para problemas físicos, a ordem é…', ['Dai Ko Myo, depois Cho Ku Rei', 'Só Sei He Ki', 'Hon Sha Ze Sho Nen'], 0, 'Para emocionais, Dai Ko Myo, Sei He Ki e Cho Ku Rei.'),
    Q('Para passado ou futuro, a ordem é…', ['Dai Ko Myo, Hon Sha Ze Sho Nen, Sei He Ki, Cho Ku Rei', 'Só Cho Ku Rei', 'Sei He Ki, Dai Ko Myo'], 0, 'Processos mentais, passado ou futuro.'),
    Q('Na rotina da manhã, o que se faz antes de desenhar o Dai Ko Myo?', ['Banho seco, chuva de Reiki e cinco princípios', 'Nada', 'Meditação de uma hora'], 0, 'Depois pede-se a intenção.'),
    Q('O que fazer quando tens uma visão interior numa meditação e a queres compreender?', ['Esquecê-la', 'Desenhar o Dai Ko Myo, cobrir-te de luz, visualizar a situação e acrescentar os outros símbolos', 'Contá-la a todos'], 1, 'E recomeçar a meditação.')
  ],
  6: [
    Q('O que quer dizer «kiri»?', ['Cortar', 'Limpar', 'Técnica'], 0, 'Jaki é energia negativa, joka limpeza.'),
    Q('A que distância do objecto se dão os golpes no Jaki Kiri Joka Ho?', ['Dois a cinco centímetros acima', 'Um metro', 'Em cima, a tocar'], 0, 'O terceiro golpe termina em cima do objecto.'),
    Q('Que técnica ajuda a desenvolver um pensamento positivo e optimista?', ['Nentatsu', 'Gedoku', 'Hatsurei'], 0, 'Tanden Chiryo Ho e Gedoku Chiryo Ho ajudam a libertar emoções.'),
    Q('Na respiração com o Cho Ku Rei, o que se visualiza a sair do chakra ao expirar?', ['Uma nuvem escura de fumo', 'Água', 'Luz dourada'], 0, 'As emoções negativas.')
  ],
  7: [
    Q('O Antahkarana tem origem…', ['Tibetana', 'Japonesa, de Usui', 'Cristã'], 0, 'Chegou ao Reiki por fora da linha do Mestre Usui.'),
    Q('O que se espera ver ao olhar para o Antahkarana?', ['Que a figura pareça mover-se ou mudar de profundidade', 'Nada', 'Um relâmpago'], 0, 'É esperado. Não persigas o efeito.'),
    Q('Com que símbolo se começa a limpar o espaço no 3A?', ['Dai Ko Myo, fechando com o Cho Ku Rei', 'Raku', 'Sei He Ki'], 0, 'Antes de a pessoa chegar.'),
    Q('Se o dia está impossível, o que fazes?', ['Atendes na mesma', 'Remarcas', 'Cancelas tudo'], 1, 'Não atendas com a cabeça noutro sítio.')
  ],
  8: [
    Q('Quem deu mais a conhecer o Reiki ao ocidente, segundo o manual?', ['Diane Stein', 'Ninguém', 'Hayashi'], 0, 'Todos os praticantes lhe devem muito.'),
    Q('O Reiki Tradicional tem quantas técnicas sistematizadas?', ['21', '3', '100'], 0, 'No Essencial não são sistematizadas.'),
    Q('Podes usar o nível como argumento de venda?', ['Sim', 'Não: o que vale é o teu trabalho', 'Só o 3B'], 1, 'Não é o degrau em que estás.'),
    Q('Um terapeuta esgotado…', ['Dá mais', 'Acaba por dar do que não tem', 'Cura mais'], 1, 'Cuida de ti primeiro.')
  ]
};
N3A_MODULOS.forEach(m => { m.treino = N3A_TREINO[m.ordem] || []; });

/* =========================================================================
   EXAME FINAL — 20 perguntas · mínimo 60% (12 certas)
   ========================================================================= */
const N3A_EXAME = {
  titulo: 'Exame final — Nível 3A (Shinpiden)', nivel: '3A', modulo: 0, notaMinima: 60,
  perguntas: [
    { texto: 'O que significa Shinpiden?', opcoes: ['«Mistérios» e «realização»', 'Primeiros ensinamentos', 'Símbolo e mantra'], correta: 0 },
    { texto: 'O que permite o 3A?', opcoes: ['Sintonizar alunos', 'Trabalhar como terapeuta de Reiki', 'Dar formação'], correta: 1 },
    { texto: 'Com o 3A já podes chamar-te Mestre de Reiki?', opcoes: ['Sim', 'Não: o título corresponde ao 3B', 'Só em Portugal'], correta: 1 },
    { texto: 'Que símbolo recebes no 3A?', opcoes: ['Raku', 'Dai Ko Myo (Usui, tradicional)', 'Dai Ko Myo tibetano'], correta: 1 },
    { texto: 'O que significa Kensho?', opcoes: ['Ver a própria natureza', 'Cortar a energia negativa', 'Luz brilhante'], correta: 0 },
    { texto: 'Que técnica se usa na rotina de meditação diária?', opcoes: ['Joshin Kokyu Ho', 'Jaki Kiri Joka Ho', 'Gedoku Chiryo Ho'], correta: 0 },
    { texto: 'Usar os quatro símbolos em tudo, por rotina, é…', opcoes: ['Aprofundar', 'Enfeitar', 'Obrigatório'], correta: 1 },
    { texto: 'Que símbolo corresponde ao corpo emocional?', opcoes: ['Sei He Ki', 'Cho Ku Rei', 'Dai Ko Myo'], correta: 0 },
    { texto: 'Com que divindade parece estar ligado o Dai Ko Myo?', opcoes: ['Fudo Myo', 'Zeus', 'Nenhuma'], correta: 0 },
    { texto: 'No Reiki, como se compreende o Dai Ko Myo?', opcoes: ['Como religião', 'Unicamente como energia', 'Como segredo'], correta: 1 },
    { texto: 'Quantos traços tem o Dai Ko Myo tradicional?', opcoes: ['Nove', 'Dezassete', 'Trinta'], correta: 1 },
    { texto: 'Na prática das quatro semanas, quantas se dedicam ao «myo»?', opcoes: ['Uma', 'Duas', 'Quatro'], correta: 1 },
    { texto: 'Qual a ordem dos símbolos para problemas emocionais?', opcoes: ['Dai Ko Myo, Sei He Ki, Cho Ku Rei', 'Cho Ku Rei, Sei He Ki', 'Só Dai Ko Myo'], correta: 0 },
    { texto: 'Depois de um trabalho com o Dai Ko Myo, se a pessoa ficar tonta, o que se faz?', opcoes: ['Nada', 'Enraíza-se', 'Manda-se embora'], correta: 1 },
    { texto: 'A prática de reconciliação é…', opcoes: ['Psicoterapia', 'Uma prática de acolhimento, não psicoterapia', 'Diagnóstico'], correta: 1 },
    { texto: 'No Jaki Kiri Joka Ho, durante os três golpes…', opcoes: ['Seguras a respiração', 'Cantas', 'Falas'], correta: 0 },
    { texto: 'O Antahkarana faz parte dos ensinamentos originais do Usui Reiki Ryoho?', opcoes: ['Sim', 'Não', 'Só no 3A'], correta: 1 },
    { texto: 'Podes sintonizar alguém com o 3A?', opcoes: ['Sim, a família', 'Não: isso é do 3B', 'Só de graça'], correta: 1 },
    { texto: 'Porque é que o trabalho com a sombra vem antes do mestrado?', opcoes: ['Um terapeuta que não conhece a própria sombra projecta-a nos pacientes', 'Por tradição', 'É mais fácil'], correta: 0 },
    { texto: 'Quando um nível já foi passado, quanto tempo se deve esperar até ao seguinte?', opcoes: ['Nada', 'Entre seis meses e um ano', 'Dez anos'], correta: 1 }
  ]
};

window.FORMACAO_V2 = window.FORMACAO_V2 || {};
window.FORMACAO_V2['3A'] = {
  nivel: '3A',
  manual: { titulo: 'Manual completo do Nível 3A — Shinpiden', ficheiro: 'Manual-Reiki-Nivel-3A-Shinpiden-Hikari-Fafe.pdf' },
  modulos: N3A_MODULOS,
  exame: N3A_EXAME
};
