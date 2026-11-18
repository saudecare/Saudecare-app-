/* =========================================================================
   FORMAÇÃO DE REIKI — NÍVEL 2 (OKUDEN) · VERSÃO 2
   Hikari Fafe Escola de Reiki · Vindora
   -------------------------------------------------------------------------
   Conteúdo escrito a partir do "Manual de Usui Reiki Ryoho — Nível 2 —
   Okuden", de Mestre Ricardo Correia.
   Módulo 0 + 9 módulos + treino livre + exame final de 20 perguntas.
   Mesma estrutura do Nível 1 (ver reiki-formacao-v2-nivel1.js).
   ========================================================================= */

const T = c => ({ tipo: 'texto', conteudo: c });
const D = c => ({ tipo: 'destaque', conteudo: c });
const L = (titulo, itens) => ({ tipo: 'lista', titulo, itens });
const Q = (pergunta, opcoes, correta, feedback) => ({ pergunta, opcoes, correta, feedback });

const N2_MODULOS = [

  /* ================================================================ 0 === */
  {
    ordem: 0, titulo: 'Bem-vindo ao Okuden',
    subtitulo: 'O que muda neste nível, e a vez em que eu quase desisti',
    manual: 'Bem-vindo ao Okuden · A vez em que eu quase desisti · Hikari (cap. 1) · A nossa linhagem', duracao: '15 min',
    pdf: { titulo: 'Módulo 0 — Bem-vindo ao Okuden', ficheiro: 'n2-m00-bem-vindo.pdf' },
    aula: { url: 'videos-reiki/n2-m00.mp4', legendas: 'videos-reiki/n2-m00.vtt' },
    ler: [
      T('Okuden quer dizer «o ensinamento profundo», ou «os segundos ensinamentos». É a continuação do trabalho que começaste no Nível 1: a sensibilidade à energia, o autotratamento, a filosofia de vida através dos cinco princípios e dos poemas do imperador Meiji.'),
      L('O que muda agora', [
        'Aperfeiçoamento do canal energético',
        'Aperfeiçoamento da capacidade de tratar',
        'A actividade de cura aumenta',
        'Os símbolos e os mantras tornam a ligação à energia mais simples e eficiente',
        'Passas a poder trabalhar além do tempo e do espaço'
      ]),
      D('Há uma mudança que vem antes de todas: é a partir deste nível que podes aplicar Reiki a outras pessoas. No Nível 1 o trabalho era em ti, na família de casa e nos animais. Agora abre-se a porta ao atendimento — e com ela uma responsabilidade diferente.'),
      D('O Reiki é uma prática complementar de relaxamento e bem-estar. Não diagnostica, não trata doenças e nunca substitui acompanhamento médico ou psicológico. Nunca aconselhes ninguém a interromper medicação ou tratamento. Caminha ao lado da medicina, nunca contra ela.'),
      T('O Nível 2 traz uma ligação diferente com a energia universal. Tornas-te cada vez mais um canal — e tu próprio és parte dessa energia e dessa luz. Começas a tornar-te um praticante luminoso, um transmissor de Reiki. A isso, em japonês, chama-se hikari: luz. É de onde vem o nome desta escola.'),
      L('Com o aumento da capacidade de trabalhar a energia, costumam aparecer seis coisas', [
        'Mais pessoas te procuram para serem tratadas, se te predispuseres a isso',
        'Acesso mais profundo a informações sobre ti mesmo, e à compreensão do universo',
        'Noção mais clara dos estados emocionais',
        'Percepção mais forte dos estados mentais',
        'Visão interior mais nítida',
        'Fluxo energético maior e mais intenso'
      ]),
      T('Este é o nível em que o Mestre quase largou tudo. Não era de sentir nem de visualizar nada, e em grupo uns sentem tudo e outros nada — e quem não sente acha que o problema é consigo. Numa prática com uma colega, a trabalhar a criança interior dela, deixou-se ir, sem esperar nada, apenas com amor e compaixão. Foi como se a visse numa sala de aulas, com cinco ou seis anos, e descreveu-lhe tudo ao pormenor. Ela confirmou, e quinze dias depois trouxe-lhe uma fotografia: aquela idade, aquela roupa, aquele corte de cabelo.'),
      D('A lição não foi ter visto. Foi perceber que não basta querer ver nem querer sentir: é preciso entregar-se de alma e coração a quem está à frente. Se estás neste nível sem sentir nada, não desistas: numa prática, larga a expectativa de sentir e fica só com a pessoa.'),
      L('A nossa linhagem', [
        'Níveis 1, 2 e 3A — Reiki Tradicional · Usui Reiki Ryoho',
        'Nível 3B (Mestrado) — Reiki Essencial · Usui Shiki Ryoho',
        'O Dai Ko Myo tibetano e o Raku vêm do mestrado em Reiki Essencial e só se ensinam no Nível 3B. Dizemo-lo abertamente: a honestidade sobre a origem das coisas é o que dá valor a uma escola'
      ]),
      D('«Aprendiz! Não te esqueças de trabalhar arduamente, em vez de te apressares para o progresso.» — Imperador Meiji, poema 20')
    ],
    praticar: {
      titulo: 'Largar a expectativa',
      instrucoes: 'Hoje, durante cinco minutos, senta-te em silêncio, com as mãos em Gassho, sem querer ver nem sentir nada. Só estar. Depois escreve como foi.',
      registo: true, registoPergunta: 'Como foi estar sem expectativa?'
    },
    responder: [
      Q('O que significa «Okuden»?', ['O primeiro ensinamento', 'O ensinamento profundo, ou os segundos ensinamentos', 'O ensinamento do Mestre'], 1, 'É a continuação do Nível 1.'),
      Q('A partir de que nível podes aplicar Reiki a outras pessoas?', ['Nível 1', 'Nível 2', 'Nível 3B'], 1, 'No Nível 1 o trabalho era em ti, na família de casa e nos animais.'),
      Q('O que quer dizer «hikari»?', ['Energia', 'Luz', 'Mão'], 1, 'O praticante que se torna luminoso. Dá nome à escola.'),
      Q('Qual foi a lição do Mestre na prática com a colega?', ['Que é preciso esforçar-se para ver', 'Que é preciso entregar-se a quem está à frente, sem expectativa', 'Que só quem visualiza pode ser terapeuta'], 1, 'Não basta querer ver nem querer sentir.'),
      Q('Perante quem pede para interromper um tratamento médico, o que se diz?', ['Que pode, se sentir melhor', 'Nunca se aconselha interromper; o Reiki caminha ao lado da medicina', 'Que depende da doença'], 1, 'Nunca aconselhes ninguém a interromper medicação ou tratamento.')
    ]
  },

  /* ================================================================ 1 === */
  {
    ordem: 1, titulo: 'Rever o Nível 1 e os cinco princípios, mais fundo',
    subtitulo: 'O chão sobre o qual continua a assentar tudo',
    manual: 'Capítulos 2 e 3', duracao: '20 min',
    pdf: { titulo: 'Módulo 1 — Rever e os cinco princípios', ficheiro: 'n2-m01-rever-e-principios.pdf' },
    aula: { url: 'videos-reiki/n2-m01.mp4', legendas: 'videos-reiki/n2-m01.vtt' },
    ler: [
      T('O Reiki é sempre um estudo contínuo, mesmo nas matérias que já julgas sabidas — porque vais ver com outros olhos tudo o que já fizeste. Relê o teu manual de Shoden e traz as dúvidas.'),
      L('Matérias a rever do Nível 1', [
        'O que é o Reiki',
        'A história do Reiki e os ensinamentos do Mestre Usui',
        'Os cinco princípios e os poemas do imperador Meiji',
        'O corpo energético e os chakras',
        'O autotratamento, com as treze posições',
        'O alinhamento rápido, sentado',
        'As técnicas: Hatsurei Ho, Kenyoku Ho, Byosen, enraizamento, chuva de Reiki',
        'A crise de cura e o que dizer a quem recebeu'
      ]),
      L('A prática que devia já vir de trás', [
        'Hatsurei Ho e meditação Gassho, para desenvolvimento pessoal',
        'Reflexão nos cinco princípios, aplicados à tua prática e ao teu dia',
        'A sabedoria que a reflexão com os poemas do imperador te foi trazendo'
      ]),
      T('Apesar de neste nível nos focarmos muito nos símbolos e na sua aplicação, não te podes esquecer do que é fundamental no Reiki: os seus princípios. O Mestre Usui não os criou por capricho nem para servirem de decoração. São o fundamento do método, e são eles que te vão levar pelo caminho.'),
      L('Os cinco princípios — de manhã e à noite, em Gassho', ['Só por hoje', 'Sou calmo', 'Confio', 'Sou grato', 'Trabalho honestamente', 'Sou bondoso']),
      D('«A missão do Usui Reiki Ryoho é guiar para uma vida pacífica e feliz, curar os outros, melhorar a sua felicidade e a nossa.» — Mikao Usui'),
      L('Como trabalhá-los neste nível', [
        'Aplica os princípios às tuas questões de vida. Observa que bloqueios tens e como os podes resolver com eles',
        'Observa as outras pessoas e a forma como interagem contigo. Vê como podes mudar o teu comportamento perante elas, com os princípios',
        'Observa o mundo e vê de que forma ele poderá mudar com os cinco princípios — e qual é o teu papel nessa mudança'
      ]),
      D('Medita todos os dias. Dez a quinze minutos por dia chegam, e podem ser de Joshin Kokyu Ho, a técnica da respiração. É o que faz a consciência crescer — e é o que distingue quem pratica Reiki de quem só aprendeu técnicas.')
    ],
    praticar: {
      titulo: 'Os princípios na tua vida',
      instrucoes: 'Escolhe uma situação difícil da tua vida actual e aplica-lhe os cinco princípios, um a um. Escreve o que cada princípio te diz sobre essa situação. Faz também dez minutos de Joshin Kokyu Ho.',
      registo: true, registoPergunta: 'Que situação escolheste e o que descobriste?'
    },
    responder: [
      Q('Quanto tempo de meditação diária se aconselha?', ['Um minuto', 'Dez a quinze minutos', 'Duas horas'], 1, 'Pode ser de Joshin Kokyu Ho, a técnica da respiração.'),
      Q('O que distingue quem pratica Reiki de quem só aprendeu técnicas?', ['Ter muitos símbolos', 'A meditação diária e os princípios', 'Ter um certificado'], 1, 'É o que faz a consciência crescer.'),
      Q('Qual é a primeira forma de trabalhar os princípios neste nível?', ['Aplicá-los às tuas questões de vida', 'Decorá-los em japonês', 'Recitá-los só uma vez por mês'], 0, 'Observa que bloqueios tens e como os podes resolver com eles.'),
      Q('Os princípios, neste nível, são…', ['Decoração', 'O fundamento do método, que te leva pelo caminho', 'Opcionais'], 1, 'O Mestre Usui não os criou por capricho.'),
      Q('Qual a missão do Usui Reiki Ryoho?', ['Curar doenças', 'Guiar para uma vida pacífica e feliz, curar os outros e melhorar a felicidade de todos', 'Ensinar símbolos'], 1, 'É a missão que Usui deixou dita.')
    ]
  },

  /* ================================================================ 2 === */
  {
    ordem: 2, titulo: 'Os símbolos: o que são e como se activam',
    subtitulo: 'Desenho, mantra e sintonização',
    manual: 'Capítulo 4', duracao: '20 min',
    pdf: { titulo: 'Módulo 2 — Os símbolos', ficheiro: 'n2-m02-os-simbolos.pdf' },
    aula: { url: 'videos-reiki/n2-m02.mp4', legendas: 'videos-reiki/n2-m02.vtt' },
    ler: [
      T('Neste nível recebes três símbolos, cada um com o seu significado e a sua utilidade. O uso inicial dos símbolos não era para a cura, mas para a iluminação interior. Os budistas acreditam que a única cura verdadeira é a que nos liberta da roda das reencarnações. Por isso a transmissão de energia não se deve limitar a tirar dores: contribui também para o crescimento espiritual de cada um.'),
      T('Nos 21 dias que se seguem à tua sintonização, os símbolos vão trabalhar sobretudo a parte emocional e mental.'),
      L('Desenhar ou visualizar', [
        'As duas formas funcionam, e as duas devem ser praticadas',
        'Se só visualizares, quando tentares desenhar vai sair estranho. Se só desenhares, perdes o lado criativo do símbolo',
        'Desenha sempre bem o símbolo: ele tem um objectivo muito concreto. Se escreveres mal uma palavra, será que ela mantém o significado?',
        'Quando já tiveres intimidade com o símbolo poderás deixar de o desenhar, mas treina de vez em quando: mais tarde vais precisar de o saber desenhar',
        'Quando desenhas com a mão, a energia do símbolo vem do chakra da tua mão. Podes desenhar com o dedo, mas é na palma que o símbolo está'
      ]),
      L('Kotodama, jumon ou mantra', [
        'Kotodama — japonês: palavra sagrada, ou a alma da palavra',
        'Jumon — budismo esotérico japonês: encantamento',
        'Mantra — sânscrito, da Índia: palavra sagrada; o termo mais usado em Portugal'
      ]),
      T('Nos sistemas japoneses — como a Usui Reiki Ryoho Gakkai ou o Gendai Reiki de Hiroshi Doi — não se diz o nome dos símbolos, que são sagrados: diz-se apenas «símbolo 1, símbolo 2, símbolo 3». É uma prática natural em muitas tradições: os cristãos têm o sinal da cruz, os taoistas têm os seus símbolos e palavras. No Reiki usamos os mantras para activar os símbolos.'),
      L('Um símbolo assenta em três coisas', [
        'Primeira: o praticante ter sido sintonizado',
        'Segunda: o desenho do símbolo',
        'Terceira: a entoação do mantra'
      ]),
      D('Falta uma das três e o símbolo não passa de um desenho bonito.')
    ],
    praticar: {
      titulo: 'Desenhar e visualizar',
      instrucoes: 'Hoje desenha o Cho Ku Rei três vezes em papel, devagar. Depois fecha os olhos e visualiza-o três vezes. Repara na diferença entre desenhar e visualizar.',
      registo: true, registoPergunta: 'Que diferença notaste entre desenhar e visualizar?'
    },
    responder: [
      Q('Quantos símbolos recebes no Nível 2?', ['Um', 'Três', 'Cinco'], 1, 'Cho Ku Rei, Sei He Ki e Hon Sha Ze Sho Nen.'),
      Q('De onde vem a energia do símbolo quando o desenhas com a mão?', ['Da testa', 'Do chakra da palma da mão', 'Do chakra raiz'], 1, 'Podes desenhar com o dedo, mas é na palma que o símbolo está.'),
      Q('Em quais três coisas assenta um símbolo?', ['Sintonização, desenho e mantra', 'Fé, cor e distância', 'Livro, caderno e caixa'], 0, 'Falta uma e é só um desenho bonito.'),
      Q('O que é o «kotodama»?', ['Uma técnica de sopro', 'A palavra sagrada, a alma da palavra', 'Um chakra'], 1, 'É o nome japonês do mantra.'),
      Q('Deves só visualizar e nunca desenhar?', ['Sim', 'Não — as duas formas devem ser praticadas', 'Só desenhar'], 1, 'Se só visualizares, quando tentares desenhar vai sair estranho.')
    ]
  },

  /* ================================================================ 3 === */
  {
    ordem: 3, titulo: 'Cho Ku Rei — o símbolo do poder',
    subtitulo: 'O interruptor: potenciar, enraizar, limpar',
    manual: 'Capítulo 5', duracao: '25 min',
    pdf: { titulo: 'Módulo 3 — Cho Ku Rei', ficheiro: 'n2-m03-cho-ku-rei.pdf' },
    aula: { url: 'videos-reiki/n2-m03.mp4', legendas: 'videos-reiki/n2-m03.vtt' },
    ler: [
      T('Um chokurei é um édito imperial: uma ordem, um mandamento, um decreto, uma lei. Já o conheces do Nível 1, onde é ensinado com os seus usos por ser uma ferramenta poderosa para os dias de hoje — aqui passas a trabalhá-lo a sério.'),
      L('As três sílabas', ['Cho — conecta, liga', 'Ku — poder, energia', 'Rei — espírito, universo']),
      L('Para que serve', [
        'Aumenta a potência e a intensidade da energia',
        'Serve para iniciar o Reiki, ligar-te à energia, ou fazê-la fluir por ti. Por isso lhe chamamos o interruptor',
        'Ao visualizá-lo, multiplicas a tua capacidade de acesso à energia'
      ]),
      T('Como se activa: pronuncia de forma cadenciada, separando bem as sílabas: CHO-KU-REI. Podes dizer o mantra enquanto desenhas, ou dizê-lo três vezes depois de o desenhares ou visualizares. Desenha sobre a mão esquerda com a mão direita — há quem goste de desenhar em ambas. No Reiki não usamos cor, mas se quiseres podes visualizar o símbolo numa cor brilhante: dourado, violeta, branco, o que sentires.'),
      L('Aplicações práticas', [
        'Enraizamento — faz o símbolo sobre os dois pés, dizendo o mantra três vezes em cada pé; visualiza-o a agarrar o corpo ao chão, a fortalecer as raízes vermelhas que descem ao centro da terra',
        'Enraizar o carro — um grande Cho Ku Rei por baixo e depois um em cada lado: frente, trás, direita, esquerda, cima e baixo',
        'Potenciar e limpar — desenha o símbolo a descer pelo chakra da coroa até aos pés, empilhando símbolos até todo o corpo estar cheio de Cho Ku Rei. Antes de te sentares, desenha-o sobre a cadeira',
        'Alimentos, água e medicamentos — aumenta a qualidade energética do alimento. Nos medicamentos, potencia os efeitos desejáveis e reduz os indesejáveis, sem nunca substituir a toma nem alterar o que o médico indicou',
        'Pensamentos negativos — traça imediatamente o Cho Ku Rei com a intenção de mudar o padrão de energia e de pensamento; a seguir, se quiseres, faz o Nentatsu',
        'No tratamento — coloca o símbolo na palma da mão antes de iniciares um autotratamento ou um tratamento, e reforça em cada posição se o sentires (pode ser só visualizado)',
        'Potenciar os chakras — um Cho Ku Rei em cada centro, da raiz à coroa; se quiseres, visualiza também a cor de cada um'
      ]),
      T('Protecção com o Cho Ku Rei: visualiza um Cho Ku Rei à frente, atrás, à direita, à esquerda, em cima e em baixo — seis ao todo, do tamanho do corpo que vão proteger. Não precisa de ser por esta ordem: o que importa é a intenção e o saber desenhar o símbolo com força. Antes, medita um pouco sobre o símbolo e sente a sua energia: quanto mais potenciada está a aura, mais protegido te encontras.'),
      D('Não vivas com medo do exterior. A tua luz interior é a protecção mais eficaz que existe. Protecção não é blindagem contra um mundo hostil: é estares inteiro. Quem anda a proteger-se de tudo, o que está mesmo a fazer é a alimentar o medo.')
    ],
    praticar: {
      titulo: 'Cho Ku Rei no dia a dia',
      instrucoes: 'Hoje usa o Cho Ku Rei em três situações: nos pés (enraizamento), num copo de água antes de beber, e na cadeira antes de te sentares. Escreve o que notaste.',
      registo: true, registoPergunta: 'O que notaste em cada uma das três situações?'
    },
    responder: [
      Q('O que significa «Ku» no Cho Ku Rei?', ['Espírito', 'Poder, energia', 'Liga'], 1, 'Cho: conecta, liga. Ku: poder, energia. Rei: espírito, universo.'),
      Q('Porque se lhe chama «o interruptor»?', ['Porque desliga a energia', 'Porque serve para iniciar o Reiki, ligar-te à energia e fazê-la fluir', 'Porque é eléctrico'], 1, 'Também aumenta a potência e a intensidade da energia.'),
      Q('Quantos Cho Ku Rei se visualizam na protecção?', ['Dois', 'Seis: frente, trás, direita, esquerda, cima e baixo', 'Doze'], 1, 'Do tamanho do corpo que vão proteger.'),
      Q('O que fazer com o símbolo nos medicamentos?', ['Substituir a toma', 'Potenciar os efeitos desejáveis e reduzir os indesejáveis, sem alterar o que o médico indicou', 'Alterar a dose'], 1, 'Nunca substituir a toma.'),
      Q('Qual é a protecção mais eficaz, segundo o manual?', ['Desenhar muitos símbolos', 'A tua luz interior — estares inteiro', 'Evitar pessoas'], 1, 'Quem anda a proteger-se de tudo, está a alimentar o medo.')
    ]
  },

  /* ================================================================ 4 === */
  {
    ordem: 4, titulo: 'Sei He Ki — o símbolo da harmonia',
    subtitulo: 'Emoções, subconsciente e hábitos',
    manual: 'Capítulo 6', duracao: '25 min',
    pdf: { titulo: 'Módulo 4 — Sei He Ki', ficheiro: 'n2-m04-sei-he-ki.pdf' },
    aula: { url: 'videos-reiki/n2-m04.mp4', legendas: 'videos-reiki/n2-m04.vtt' },
    ler: [
      T('Seiheki significa os atributos emocionais e intelectuais que formam uma pessoa. Lembra-te do conceito japonês de kokoro: mente e coração estão unidos, e não dissociados como no ocidente. O Sei He Ki trabalha os aspectos mentais e emocionais, promovendo harmonia e purificação.'),
      T('Outras traduções que vais encontrar: «chave do universo», «homem e Deus fazem-se uno». Não sabemos de onde vêm — possivelmente do sistema de Reiki Essencial. Quando pensares no Sei He Ki, pensa em harmonia.'),
      T('A origem do símbolo: tem origem numa palavra-semente (bija) que representa um aspecto de Buda: Hrih, que em japonês se traduz para Kiriku. Representa Avalokiteshvara, o buda da compaixão, mais conhecido entre nós como Kuan Yin, a bodisatva da compaixão.'),
      L('Para que serve', [
        'Alinhar os chakras superiores, elevando a consciência',
        'Harmonizar os planos mental, emocional e espiritual',
        'Soltar e desbloquear emoções — quem não chora, não ri, ou não consegue falar de si próprio tende a desbloquear',
        'Aceder ao inconsciente da pessoa',
        'Melhorar a comunicação entre pessoas',
        'Limpeza de espaços e de energia'
      ]),
      T('Actua no corpo emocional e no subconsciente, e equilibra os dois hemisférios — o racional e lógico, e o criativo. Por isso ajuda também a mudar maus hábitos, vícios e compulsões.'),
      D('Um mito que convém desfazer: dizia-se que o Sei He Ki não podia ser usado sozinho, por ser muito forte. O melhor conselho: experimenta. Não coloques intenções negativas nem medos na prática. Respeita-te e respeita o outro — assim nada é prejudicial. Se sentires que a energia dele é necessária mas forte de mais para a pessoa, usa-o com o Cho Ku Rei: é como usar a Terra e o Céu, harmoniosamente.'),
      T('Como se activa: como o Cho Ku Rei, também tem o seu kotodama. No Japão chamam-lhe símbolo 2, e a palavra sagrada só é proferida na utilização prática. Diz o mantra três vezes: SEI-HE-KI, SEI-HE-KI, SEI-HE-KI.'),
      L('Aplicações', [
        'No autotratamento — em situações de medo ou de traumas antigos, seguido de uma afirmação (por exemplo: «a energia harmoniza e purifica-me»), visualizando-o em simultâneo',
        'Um dia só com Sei He Ki — desenha-o uma vez na mão, diz o mantra e inicia; ou desenha ao início e depois visualiza-o nas mãos em cada posição',
        'Purificação — usa o Sei He Ki na terceira visão, juntamente com o Cho Ku Rei; a seguir aplica o Hesso Chiryo Ho ou o Gedoku Chiryo Ho',
        'Empilhamento — manda símbolos para dentro do corpo, a entrar pelo chakra da coroa, preenchendo dos pés à ponta da cabeça',
        'Limpar a casa — um Sei He Ki em todos os cantos, por cima das janelas e das portas; ou, em cada divisão, um em cada canto superior e depois um Cho Ku Rei ao centro (a harmonia vem para o espaço e o Cho Ku Rei envia a energia mais densa para a terra)'
      ])
    ],
    praticar: {
      titulo: 'Um dia com Sei He Ki',
      instrucoes: 'Faz hoje o autotratamento usando só o Sei He Ki: desenha-o uma vez na mão, diz o mantra três vezes e percorre as posições. Se houver um medo ou uma memória antiga a pedir atenção, acrescenta uma afirmação curta.',
      registo: true, registoPergunta: 'O que notaste ao usar só o Sei He Ki?'
    },
    responder: [
      Q('Que aspecto de Buda está na origem do Sei He Ki?', ['O da sabedoria', 'Avalokiteshvara, o buda da compaixão (Kuan Yin)', 'O da cura'], 1, 'A palavra-semente Hrih, em japonês Kiriku.'),
      Q('No que actua principalmente o Sei He Ki?', ['No corpo físico', 'No corpo emocional e no subconsciente', 'Apenas no espaço'], 1, 'E equilibra os dois hemisférios.'),
      Q('O que diz o manual sobre o «mito» de o Sei He Ki ser forte de mais para usar sozinho?', ['É verdade e é perigoso', 'Convém experimentar, sem intenções negativas nem medos; e pode usar-se com o Cho Ku Rei', 'Nunca se usa sozinho'], 1, 'É como usar a Terra e o Céu, harmoniosamente.'),
      Q('Qual o mantra do Sei He Ki?', ['CHO-KU-REI', 'SEI-HE-KI, três vezes', 'HON-SHA-ZE'], 1, 'No Japão chamam-lhe símbolo 2.'),
      Q('Para que serve o Sei He Ki na casa?', ['Para a decorar', 'Para limpeza de espaços e de energia', 'Para a proteger de pessoas'], 1, 'Em cada canto, por cima das janelas e das portas.')
    ]
  },

  /* ================================================================ 5 === */
  {
    ordem: 5, titulo: 'Hon Sha Ze Sho Nen e a síntese dos três símbolos',
    subtitulo: 'A ponte, o pensamento correcto e quando usar cada um',
    manual: 'Capítulos 7 e 8', duracao: '25 min',
    pdf: { titulo: 'Módulo 5 — Hon Sha Ze Sho Nen e síntese', ficheiro: 'n2-m05-hon-sha-ze-sho-nen.pdf' },
    aula: { url: 'videos-reiki/n2-m05.mp4', legendas: 'videos-reiki/n2-m05.vtt' },
    ler: [
      T('Tipicamente considera-se este o símbolo da distância, mas o seu uso vai muito além disso. Não sabemos porque é que o Mestre Usui escolheu esta combinação de kanji. Mas convém saberes que, ao contrário da caligrafia ocidental, a chinesa e a japonesa são uma escrita inspirada pelo Céu, pelos kami — logo, sagrada. Quando um mestre calígrafo trabalha, eleva primeiro o pincel ao céu, como que a trazer a energia de um kami para a sua arte. É uma lição interessante para um praticante de Reiki.'),
      T('O que quer dizer: ao longo do tempo foi tendo várias interpretações, desde «sem passado, sem presente, sem futuro» até à leitura mais correcta e contemporânea: «pensamento correcto é a essência do Ser». Ou ainda, kanji a kanji: «esta (Hon) pessoa (Sha) justamente (Ze) corrige (Sho) os pensamentos (Nen)».'),
      L('Os cinco kanji', [
        'Hon — raiz, origem, essência, base, verdadeiro, real, livro',
        'Sha — alguém, pessoa',
        'Ze — isto, justamente, próprio',
        'Sho — correcto, justo, certo, exacto',
        'Nen — atenção plena, sentido, ideia, pensamento, sentimento, desejo'
      ]),
      T('Para que serve: nas correntes japonesas mais tradicionais é o terceiro símbolo, e serve para iniciar o envio de Reiki à distância. Mas, olhando a tradução, percebe-se que há muito mais nele: atitude correcta, mudança de pensamento, atenção plena, conexão, unidade.'),
      L('Aplicações', [
        'Dores nas costas — aplica o símbolo ao longo de todas as costas; podes aplicá-lo na tua cama, como um colchão de energia',
        'À distância, durante uma sessão — desenha ou visualiza no chakra da terceira visão os três símbolos, por esta ordem: Hon Sha Ze Sho Nen, Sei He Ki, Cho Ku Rei; ou desenha-os nas palmas e faz Gassho, ou deixa as mãos separadas a enviar',
        'Tratamento dos chakras — faz o alinhamento rápido como aprendeste no Nível 1, desenhando ou visualizando nas mãos o Sei He Ki e o Cho Ku Rei em cada posição; se quiseres, acrescenta o Hon Sha Ze Sho Nen'
      ]),
      D('Repara na ordem: do terceiro para o primeiro. Abre-se a ponte, harmoniza-se, e só depois se dá força. É assim em quase tudo o que vais fazer neste nível.'),
      L('Síntese dos três símbolos', [
        'Cho Ku Rei — coloca aqui toda a força do universo: intensifica a energia, enraíza, potencia a aura, liga-nos ao Reiki. É o interruptor',
        'Sei He Ki — que o humano e o divino se encontrem: purifica, harmoniza, trabalha as questões emocionais e o subconsciente, muda hábitos',
        'Hon Sha Ze Sho Nen — pensamento correcto é a essência do Ser: estabelece a ponte, é uma porta. Usa-se sempre nos tratamentos à distância; trata os processos mentais, transforma atitudes, trata o passado'
      ]),
      L('Quando usar qual', [
        'Falta de energia, cansaço, abrir ou fechar: Cho Ku Rei',
        'Emoção, memória, hábito, agitação mental: Sei He Ki',
        'Pessoa distante, passado, futuro, uma situação: Hon Sha Ze Sho Nen',
        'Não sabes por onde pegar: os três, do terceiro para o primeiro'
      ])
    ],
    praticar: {
      titulo: 'Os três, por ordem',
      instrucoes: 'Desenha os três símbolos na palma de cada mão, do terceiro para o primeiro, dizendo o mantra três vezes em cada. Depois faz Gassho e fica dois minutos. Escreve como te sentiste.',
      registo: true, registoPergunta: 'O que sentiste ao fazer os três por ordem?'
    },
    responder: [
      Q('Em que ordem se desenham os três símbolos?', ['Do primeiro para o terceiro', 'Do terceiro para o primeiro', 'Sem ordem'], 1, 'Abre-se a ponte, harmoniza-se, e só depois se dá força.'),
      Q('Qual a leitura mais correcta e contemporânea do Hon Sha Ze Sho Nen?', ['Sem passado, sem presente, sem futuro', 'Pensamento correcto é a essência do Ser', 'A força do universo'], 1, 'A primeira é uma interpretação antiga.'),
      Q('Que símbolo se usa sempre nos tratamentos à distância?', ['Cho Ku Rei', 'Sei He Ki', 'Hon Sha Ze Sho Nen'], 2, 'Estabelece a ponte — é uma porta.'),
      Q('Quando usar o Sei He Ki?', ['Falta de energia', 'Emoção, memória, hábito, agitação mental', 'Para uma pessoa distante'], 1, 'O Cho Ku Rei é para falta de energia, cansaço, abrir ou fechar.'),
      Q('Não sabes por onde pegar. O que fazes?', ['Nada', 'Usas os três, do terceiro para o primeiro', 'Só o Cho Ku Rei'], 1, 'É a síntese do módulo.')
    ]
  },

  /* ================================================================ 6 === */
  {
    ordem: 6, titulo: 'Enkaku Chiryo — o tratamento à distância',
    subtitulo: 'Fotografia, caderno, caixa e as perguntas mais comuns',
    manual: 'Capítulos 9, 10 e 11', duracao: '35 min',
    pdf: { titulo: 'Módulo 6 — Tratamento à distância', ficheiro: 'n2-m06-tratamento-a-distancia.pdf' },
    aula: { url: 'videos-reiki/n2-m06.mp4', legendas: 'videos-reiki/n2-m06.vtt' },
    ler: [
      T('Enkaku quer dizer distância e chiryo tratamento. Também lhe chamam Sashin Chiryo, de sashin, fotografia. Consiste em enviar Reiki usando apenas o nome ou a fotografia de quem recebe, formando uma ponte de luz até um ponto previamente determinado. Possivelmente vais perceber que, de alguma forma, sempre enviaste energia às pessoas e às situações. Agora podes fazê-lo como técnica, de forma sistemática.'),
      L('A forma simples', [
        'Usa uma fotografia, ou um papel com o nome de quem vai receber',
        'Coloca a foto ou o papel na mão e desenha por cima o Hon Sha Ze Sho Nen, seguido do Sei He Ki',
        'Em cada símbolo diz o mantra três vezes — pode ser interiormente',
        'Fica com o papel ou a fotografia entre as mãos, dez a quinze minutos'
      ]),
      L('Quando não conheces a pessoa', [
        'Escreve o nome e a morada num papel (não é obrigatório; há quem se sinta melhor assim)',
        'Desenha os símbolos pela ordem indicada',
        'Dobra o papel e coloca-o entre as mãos, dez a quinze minutos',
        'Acaba visualizando a pessoa envolta em luz dourada, de saúde redobrada, com boa disposição, alegre e feliz'
      ]),
      T('O envio completo, em quatro fases. É uma exemplificação do que pode ser feito, não uma obrigação: sê flexível, podes trocar a ordem de alguns passos.'),
      L('1 · Limpeza', ['Liga-te à energia', 'Prepara o quarto ou a sala, protegendo o espaço com os símbolos', 'Enraizamento', 'Banho seco', 'Chuva de Reiki']),
      L('2 · Preparação', ['Meditação Gassho e Joshin Kokyu Ho, para manter a energia vital e esvaziar a mente', 'Reflecte sobre o envio que vais fazer', 'Pede que seja para o Bem Supremo de todos os envolvidos. Coloca a intenção']),
      L('3 · Envio', [
        'Desenha ou visualiza os símbolos, do último para o primeiro',
        'Se for uma pessoa, podes fazer o Byosen',
        'Visualiza a pessoa ou a situação e deixa fluir a energia',
        'Sempre que for necessário, ou se o sentires, desenha um símbolo',
        'Quando quiseres terminar, visualiza a pessoa ou a situação e todos os envolvidos a ficarem bem, felizes, e a desvanecer'
      ]),
      L('4 · Finalizar', [
        'Sente como está a situação, e como estás tu',
        'Gassho, e agradece pela possibilidade de tratar aquilo',
        'Indica que vais terminar — algo como «termino o envio de Reiki»',
        'Faz outra vez banho seco e chuva de Reiki',
        'Verifica se está tudo bem, se não houve qualquer afectação da energia',
        'Lava as mãos e movimenta-as, para dissipar energia densa ou bloqueada',
        'Se vires que é necessário, faz o autotratamento'
      ]),
      L('O caderno de Reiki', [
        'Arranja um caderno só para isto',
        'Escreve a lápis o nome de cada pessoa a quem queres enviar. A fotografia é opcional',
        'Desenha os símbolos, do terceiro para o primeiro, e fecha o caderno',
        'Cada vez que quiseres enviar: desenha outra vez os símbolos e põe as mãos sobre o caderno, desejando que a cura vá para o Bem Supremo de todos'
      ]),
      L('A caixa de Reiki', [
        'Coloca os símbolos no fundo da caixa, se quiseres',
        'Escreve cada pedido num papel: basta o nome da pessoa e a intenção',
        'Deixa fluir Reiki para o papel e coloca-o na caixa',
        'Sempre que quiseres, envia Reiki à caixa: ela distribui a energia por todos os pedidos',
        'Quando um pedido estiver cumprido, queima o papel'
      ]),
      L('Conceitos a guardar', [
        'O Reiki é uma energia passiva e vital',
        'A energia deve resultar para o Bem Supremo de uma situação ou pessoa — nunca para um desejo ou proveito pessoal',
        'Pode tratar-se uma situação do passado, do presente ou do futuro: não tem tempo nem espaço',
        'Podem tratar-se várias pessoas ao mesmo tempo'
      ]),
      L('Perguntas sobre o envio', [
        'Preciso de nome, morada, data de nascimento e telefone? Não necessariamente: a ligação energética estabelece-se mesmo que não conheças a pessoa',
        'Posso enviar a várias pessoas? Podes, pelo caderno, pela caixa, por fotografia ou mentalização. Em casos que exijam mais atenção, faz o envio individualmente',
        'É preciso autorização? Na maior parte dos casos é conveniente. Se não for possível pedir, pede ao Eu Superior da pessoa que, caso ela aceite, a energia flua para ela',
        'Posso enviar para conseguir um trabalho que quero? Envia antes para o Bem Supremo da situação — nem sempre o que queremos é o melhor para nós — e faz o autotratamento para ires harmonizado'
      ]),
      D('Antes de qualquer envio: desenha os símbolos 3, 2 e 1, faz o teu banho seco e a chuva de Reiki. O praticante deve ter os mesmos cuidados antes, durante e depois, exactamente como se estivesse a tratar alguém presencialmente.')
    ],
    praticar: {
      titulo: 'O teu primeiro envio',
      instrucoes: 'Escolhe uma pessoa que te tenha dado autorização (ou, na falta de uma resposta, pede ao Eu Superior dela). Faz o envio simples com um papel com o nome: Hon Sha Ze Sho Nen, Sei He Ki, mantras três vezes, dez a quinze minutos. Fecha com banho seco e lava as mãos.',
      registo: true, registoPergunta: 'Como correu o envio e o que sentiste?'
    },
    responder: [
      Q('O que quer dizer «Sashin Chiryo»?', ['Tratamento por fotografia', 'Tratamento por sopro', 'Tratamento do veneno'], 0, 'Sashin é fotografia.'),
      Q('Qual o tempo do envio na forma simples?', ['Um minuto', 'Dez a quinze minutos', 'Uma hora'], 1, 'Com o papel ou a fotografia entre as mãos.'),
      Q('Para que deve resultar a energia enviada?', ['Para o desejo de quem envia', 'Para o Bem Supremo da pessoa ou da situação', 'Para o que pedirem'], 1, 'Nunca para um desejo ou proveito pessoal.'),
      Q('Não é possível pedir autorização à pessoa. O que se faz?', ['Envia-se na mesma, sem nada dizer', 'Pede-se ao Eu Superior da pessoa que, caso aceite, a energia flua', 'Não se faz nada'], 1, 'Algo como «peço que a energia flua para o Bem Supremo da pessoa».'),
      Q('Para que serve a caixa de Reiki?', ['Para guardar símbolos', 'Para guardar pedidos; ao enviar à caixa, ela distribui a energia por todos', 'Para aquecer as mãos'], 1, 'Quando o pedido estiver cumprido, queima-se o papel.')
    ]
  },

  /* ================================================================ 7 === */
  {
    ordem: 7, titulo: 'Técnicas tradicionais do Okuden',
    subtitulo: 'Hatsurei Ho, Koki Ho, Gyoshi Ho, Tanden, Hesso e Nentatsu',
    manual: 'Capítulo 12', duracao: '35 min',
    pdf: { titulo: 'Módulo 7 — Técnicas tradicionais', ficheiro: 'n2-m07-tecnicas-tradicionais.pdf' },
    aula: { url: 'videos-reiki/n2-m07.mp4', legendas: 'videos-reiki/n2-m07.vtt' },
    ler: [
      T('Seis técnicas com nome japonês. Em cada uma o nome diz quase sempre o que a técnica faz.'),
      L('Os nomes e a tradução', [
        'Hatsurei Ho — emanar a energia universal: auto-purificação e elevação do padrão vibratório',
        'Seikaku Kaizen Ho — melhorar o carácter: atingir o subconsciente (Nentatsu)',
        'Tanden Chiryo Ho — tratamento abaixo do umbigo: limpeza e fortalecimento do Tanden',
        'Gedoku Chiryo Ho — tratamento do veneno: desintoxicação',
        'Hesso Chiryo Ho — tratamento do umbigo: limpar emoções',
        'Gyoshi Ho — fixar o olhar: tratamento pelos olhos',
        'Koki Ho — soprar: tratamento pelo sopro'
      ]),
      T('Hatsurei Ho — é o conjunto das técnicas Kenyoku, Joshin Kokyu Ho, Gassho e Reiji-Ho. Visa a auto-purificação e elevar o padrão vibratório do praticante. São oito passos.'),
      L('Os oito passos do Hatsurei Ho', [
        '1 · Kihon Shisei — postura-base. Sentado confortavelmente; a original é em seiza, sentado sobre os pés. Mãos nas pernas, palmas para baixo, costas direitas, ombros relaxados, atenção no Tanden',
        '2 · Mokunen — pensamento silencioso. Coloca-te no aqui e agora, esvazia a mente. Se quiseres: «agora inicio o Hatsurei Ho»',
        '3 · Kenyoku Ho — banho seco. Limpa primeiro o peito e depois os braços; em cada expiração, se quiseres, o som «haaaa»',
        '4 · Ligação ao Reiki — como sentires melhor; podes levantar as mãos acima da cabeça e imaginar que tocas no Reiki',
        '5 · Joshin Kokyu Ho — palmas para cima, atenção no Tanden; ao inspirar, preenche-o; ao expirar, espalha-se por todo o corpo até sair pela pele. Vários minutos',
        '6 · Gassho — mãos juntas à altura do peito',
        '7 · Sei Shin Toitsu — atenção plena. Esvazia o espaço que a mente ocupa, como se fosse uma sala; não te apegues aos pensamentos',
        '8 · Mokunen — fechar. Sente como estás física, mental e emocionalmente e avalia a diferença. Se quiseres: «terminei o Hatsurei Ho»'
      ]),
      T('Variante do sétimo passo: em Gassho, com a atenção no Tanden, concentra a respiração nas mãos, como se o ar e a energia entrassem pelos dedos; ao inspirar, o Reiki desce ao Tanden e preenche-o como um pote; ao expirar, flui para todo o corpo e sai pelas mãos. No fim regressa devagar: mexe as mãos, os ombros, a cabeça, espreguiça-te e esfrega braços, mãos, joelhos, pernas e rins.'),
      L('Koki Ho — a técnica do sopro (efeito calmante)', [
        'Liga-te ao Reiki e coloca a intenção',
        'Ao inspirar, visualiza a energia a descer do chakra da coroa até ao Tanden',
        'Prende a respiração e, se quiseres, visualiza um Cho Ku Rei dentro da boca, dizendo o mantra três vezes',
        'Quando sentires a energia do símbolo na boca, sopra o ar sobre a zona a tratar, de preferência ar fresco',
        'Repete as vezes que quiseres. Também se aplica sobre uma fotografia, à distância'
      ]),
      L('Gyoshi Ho — a técnica do olhar', [
        'Limpa os pensamentos, faz meditação Gassho e recita os cinco princípios',
        'Depois de sentires as áreas afectadas pelo Byosen, verifica o fluxo de energia em ti',
        'Olha para a área a tratar, com os olhos relaxados, sem focar a imagem nem fixar com força',
        'Deixa a energia fluir suavemente dos olhos para a área; se precisares, usa também as mãos',
        'Se houver dificuldade, não forces'
      ]),
      D('Cuidado com os olhos: se começarem a picar, pára, limpa-os e lava-os. Esta técnica não se faz com esforço nenhum — se estás a fazer força, estás a fazê-la mal.'),
      L('Tanden Chiryo Ho e Gedoku Chiryo Ho', [
        'Começa com uma variação do Nentatsu, um a dois minutos: uma mão no chakra frontal e a outra no Tanden',
        'Mãos ao lado das ancas, olhos fechados, atenção no hara; sente esse centro de gravidade, em silêncio, a observar a respiração',
        'Sente a energia Reiki em união contigo — és uma parte dela',
        'Mãos em Gassho e coloca uma intenção para o tratamento',
        'Coloca-te do lado esquerdo da pessoa: mão esquerda sobre o Tanden e direita nas costas, na mesma direcção',
        'Ao longo do tratamento visualiza a energia mais densa e as toxinas a saírem gentilmente, e a pessoa a preencher-se com Reiki'
      ]),
      L('Hesso Chiryo Ho — o tratamento pelo umbigo', [
        'Dedo médio da mão dominante dentro do umbigo, pressionando levemente alguns minutos, até sentires a pulsação, o relaxamento e o equilíbrio — a pressão tem de ser suave',
        'Fecha os olhos e sente a energia a sair pelo dedo médio e a espalhar-se por todo o corpo. No mínimo três minutos',
        'Forma alternativa: mão a cerca de cinco centímetros acima do umbigo, a focalizar a emissão para dentro do corpo',
        'Usa-se sobretudo em relaxamento e auto-aplicação: a sede das emoções está no estômago, ao lado, e essas emoções respondem por grande parte da nossa desarmonia'
      ]),
      L('Seikaku Kaizen Ho (Nentatsu) — melhorar o carácter', [
        'Uma mão no chakra frontal e a outra na nuca, enviando Reiki ao subconsciente',
        'Usa pensamentos para enviar mensagens silenciosas, ou afirmações em voz alta, visando a meta',
        'Recomenda-se aplicar em qualquer tratamento, um a dois minutos. Usa a intuição',
        'No fim, retira a mão do chakra frontal e aplica Reiki apenas na parte superior da cabeça — nesta fase final não se transmite mensagem nenhuma'
      ]),
      D('A regra de ouro: ao aplicar o Nentatsu noutra pessoa, tem a certeza de que a mensagem que envias é exactamente o que ela deseja — não o que tu achas que ela devia querer. É a diferença entre ajudar e impor. Mensagens curtas, em várias aplicações, funcionam melhor do que uma mensagem longa.')
    ],
    praticar: {
      titulo: 'Hatsurei Ho completo',
      instrucoes: 'Faz hoje o Hatsurei Ho completo, nos oito passos, sentado em postura-base. No fim, avalia a diferença entre o início e o fim, física, mental e emocionalmente.',
      registo: true, registoPergunta: 'Que diferença notaste entre o início e o fim?'
    },
    responder: [
      Q('Quantos passos tem o Hatsurei Ho neste nível?', ['Quatro', 'Oito', 'Treze'], 1, 'Da postura-base ao Mokunen final.'),
      Q('O que significa «Gedoku»?', ['Olhar', 'Veneno ou toxina', 'Umbigo'], 1, 'Daí o nome da variante de desintoxicação.'),
      Q('No Gyoshi Ho, os olhos começam a picar. O que fazes?', ['Aguento', 'Páro, limpo e lavo os olhos', 'Faço mais força'], 1, 'Se estás a fazer força, estás a fazê-la mal.'),
      Q('Qual a regra de ouro do Nentatsu noutra pessoa?', ['Dizer o que ela devia querer', 'Garantir que a mensagem é exactamente o que ela deseja', 'Mensagens longas'], 1, 'É a diferença entre ajudar e impor.'),
      Q('Como se aplica o Hesso Chiryo Ho?', ['Com pressão forte no umbigo', 'Com o dedo médio no umbigo, pressão suave, no mínimo três minutos', 'Com o sopro'], 1, 'Também se pode fazer com a mão a cerca de cinco centímetros acima do umbigo.')
    ]
  },

  /* ================================================================ 8 === */
  {
    ordem: 8, titulo: 'Autotratamento com símbolos e tratamento a outros',
    subtitulo: 'A sessão completa, passo a passo',
    manual: 'Capítulos 13 e 14', duracao: '40 min',
    pdf: { titulo: 'Módulo 8 — Autotratamento e tratamento a outros', ficheiro: 'n2-m08-autotratamento-e-tratamento.pdf' },
    aula: { url: 'videos-reiki/n2-m08.mp4', legendas: 'videos-reiki/n2-m08.vtt' },
    ler: [
      T('O autotratamento implica sempre os três pilares: Gassho, a ligação à fonte; Reiji-Ho, a intenção e o agradecimento; Chiryo, o tratamento. O que muda agora é que passas a ter símbolos para colocar lá dentro. Continuas a usar as treze posições do Nível 1 — não as substituas, acrescenta.'),
      L('Três formas de o fazer', [
        'Simples — a energia dos símbolos é desenhada no início e flui sempre que for necessária: Gassho; desenhar os três símbolos do terceiro para o primeiro; Reiji-Ho; Chiryo em todas as posições',
        'Um símbolo por dia — um símbolo por dia (ou séries de dois, três ou cinco dias por símbolo). Ajuda a perceber o efeito de cada um em cada posição',
        'Centrado em cada posição — os símbolos desenhados no início e repetidos em cada posição, mentalizando e dizendo o mantra três vezes. Podes imaginá-los a serem desenhados na palma da mão e a irem para a posição. Simplifica'
      ]),
      D('Com o Okuden trabalhamos a transformação emocional e mental. É um processo de elevação da consciência e de transformação da tua energia pessoal. É o nível mais exigente, pela quantidade de ferramentas e de possibilidades que traz. Encara-o com seriedade e respeito, aplica-o com discernimento e muito amor incondicional.'),
      T('Tratamento a outros: antes de começares, coloca os símbolos na palma das mãos para os activar — desenha do último para o primeiro e diz sempre o mantra, e desenha-os outra vez sempre que sentires necessidade. A prática de Reiki não é mecânica: deves sentir o que a energia te pede.'),
      L('As posições de frente (pessoa deitada de barriga para cima)', ['1 Cabeça', '2 Laríngeo', '3 Cardíaco', '4 Plexo solar', '5 Esplénico', '6 Raiz', '7 Joelhos', '8 Tornozelos', '9 Pés']),
      L('As posições de costas (pessoa de barriga para baixo)', ['1 Cabeça', '2 Laríngeo', '3 Cardíaco', '4 Plexo solar', '5 Esplénico', '6 Raiz', '7 Joelhos', '8 Pés']),
      T('Três a cinco minutos por posição, e mais onde o Byosen pedir. Mãos pousadas, ou ligeiramente afastadas do corpo.'),
      L('A sessão completa — antes de a pessoa chegar', [
        'Limpa e protege o espaço com os símbolos',
        'Enraizamento e banho seco',
        'Lava as mãos. Acalma-te — cinco minutos de silêncio valem a pena',
        'Formula a intenção da sessão'
      ]),
      L('No início', [
        'Ouve a pessoa, sem interrogatório. Deixa-a dizer o que quiser dizer',
        'Explica o que vai acontecer, sobretudo se for a primeira vez, e pede autorização para tocar',
        'Gassho e Reiji-Ho',
        'Desenha os símbolos nas palmas, do terceiro para o primeiro'
      ]),
      L('Durante', [
        'Percorre as posições, sem pressa. Onde sentires resistência ou vazio, reforça com Cho Ku Rei',
        'Se o tema for emocional, aplica Sei He Ki sobre a cabeça e o peito',
        'Se for útil, um a dois minutos de Nentatsu — mas só com uma mensagem que seja mesmo a que a pessoa deseja',
        'Fala pouco. O silêncio faz parte do tratamento'
      ]),
      L('No fim', [
        'Alisa o campo com movimentos suaves, da cabeça aos pés',
        'Sela com Cho Ku Rei. Gassho e agradecimento',
        'Dá água à pessoa e deixa-a levantar-se devagar',
        'Banho seco e chuva de Reiki em ti. Lava as mãos em água corrente'
      ]),
      D('O que dizer no fim: nunca faças diagnósticos nem digas «senti um bloqueio no teu fígado». Descreve o que sentiste em linguagem simples e devolve a interpretação à pessoa: «na zona do peito senti mais calor e demorei-me mais — fez-te algum sentido?» E avisa sempre da crise de cura: uma pessoa que não esteja avisada passa uma noite pior e conclui que o Reiki lhe fez mal.')
    ],
    praticar: {
      titulo: 'Autotratamento com os três símbolos',
      instrucoes: 'Faz hoje um autotratamento completo na forma «simples»: Gassho, os três símbolos do terceiro para o primeiro, Reiji-Ho e as treze posições. Dá um número de 0 a 10 ao teu desconforto antes e depois.',
      registo: true, registoPergunta: 'Números antes e depois, e o que notaste:'
    },
    responder: [
      Q('Substituis as treze posições do Nível 1 neste nível?', ['Sim', 'Não — acrescentas os símbolos', 'Só nos outros'], 1, 'Não as substituas, acrescenta.'),
      Q('Quantas posições de frente tem o tratamento a outros?', ['Sete', 'Nove', 'Treze'], 1, 'Cabeça, laríngeo, cardíaco, plexo solar, esplénico, raiz, joelhos, tornozelos e pés.'),
      Q('O que se faz antes de tocar na pessoa?', ['Nada', 'Explicar o que vai acontecer e pedir autorização para tocar', 'Perguntar o diagnóstico'], 1, 'Sobretudo na primeira vez.'),
      Q('O que se deve avisar no fim da sessão?', ['O valor da próxima', 'A possibilidade de crise de cura', 'Que a pessoa vai curar'], 1, 'Quem não está avisado passa uma noite pior e conclui que o Reiki lhe fez mal.'),
      Q('Quando aplicas Sei He Ki numa sessão?', ['Sempre no início', 'Se o tema for emocional, sobre a cabeça e o peito', 'Nunca'], 1, 'Onde há resistência ou vazio, reforça com Cho Ku Rei.')
    ]
  },

  /* ================================================================ 9 === */
  {
    ordem: 9, titulo: 'Os 21 dias, ética, perguntas e compromisso',
    subtitulo: 'Plano de estudo, glossário e exercícios deste nível',
    manual: 'Capítulos 15 a 20 e Compromisso do Aluno', duracao: '35 min',
    pdf: { titulo: 'Módulo 9 — 21 dias, ética e compromisso', ficheiro: 'n2-m09-21-dias-etica-compromisso.pdf' },
    aula: { url: 'videos-reiki/n2-m09.mp4', legendas: 'videos-reiki/n2-m09.vtt' },
    ler: [
      T('Depois da sintonização de Nível 2 há outra vez um período de ajuste de vinte e um dias — e este costuma mexer mais do que o primeiro, porque agora o trabalho é emocional e mental. O compromisso é o mesmo: autotratamento todos os dias, agora com símbolos. Vinte minutos chegam. Se falhares um dia, retomas no seguinte, sem drama e sem recomeçar a contagem.'),
      L('O que podes sentir', [
        'Emoções antigas a virem ao de cima, por vezes sem ligação aparente ao presente',
        'Sonhos muito vivos, ou memórias da infância',
        'Vontade de arrumar, de cortar, de mudar hábitos',
        'Mais sensibilidade às pessoas e aos ambientes',
        'Mais clareza a seguir a dias confusos',
        'Ou nada de especial — o que também é normal'
      ]),
      D('Um conselho: se houver um dia em que sintas que isto está a mexer de mais, não pares: reduz. Faz a versão curta do autotratamento, só com Cho Ku Rei. E fala com o Mestre. Se o que vier for grande de mais — trauma antigo, sofrimento sério — procura também acompanhamento profissional. O Reiki acompanha muito bem esse processo. Não o faz sozinho.'),
      L('Ética, limites e bom senso', [
        'Reiki é complementar. Nunca substitui medicina. Di-lo com clareza',
        'Não diagnosticas. Não tens formação para isso',
        'Não prometes resultados. Nem cura, nem prazos, nem garantias',
        'Não mandas parar medicação. Nunca, em circunstância nenhuma',
        'Não tocas sem autorização. Explica sempre onde vais pôr as mãos e, em zonas sensíveis, trabalha com as mãos afastadas do corpo',
        'Pedes permissão para enviar à distância',
        'Guardas segredo. O que se diz na marquesa fica na marquesa',
        'Não aproveitas a fragilidade de ninguém. Nem emocional, nem financeira',
        'Não crias dependência. Se alguém precisa de ti todas as semanas para funcionar, alguma coisa está errada na relação',
        'Sabes dizer que não. Reconhecê-lo é maturidade, não incompetência'
      ]),
      L('Os teus limites', [
        'Quadros psiquiátricos em fase aguda',
        'Pessoas que te procuram em vez de procurarem médico',
        'Quem espera de ti previsões, milagres ou respostas definitivas',
        'Quem te procura para ter companhia, e não para receber Reiki'
      ]),
      D('Uma frase para guardar: «Posso acompanhar-te com Reiki, e ao mesmo tempo acho importante que fales com o teu médico sobre isso.» Cobrar pelo teu trabalho é legítimo; o que não é legítimo é aproveitar o desespero de alguém. Define o teu preço, mantém-no, e guarda espaço no teu horário para quem não pode pagar.'),
      L('Perguntas que me fazem sempre', [
        'Tenho de desenhar sempre os símbolos, ou basta visualizar? As duas formas funcionam; treina o desenho de vez em quando',
        'Esqueci-me de um símbolo. É grave? Não: relê, treina, volta ao papel. A sintonização não se apaga',
        'Continuo sem sentir nada. Devo desistir? Não: larga a expectativa e fica com a pessoa',
        'Posso dar Reiki a animais e a plantas? Sim; respeita sempre a resposta deles',
        'E a grávidas, crianças ou idosos? Sim, com toques suaves e sessões mais curtas; nas crianças, dez minutos costumam chegar',
        'E se a pessoa chorar? Fica em silêncio, mantém as mãos, não perguntes nada',
        'Quanto tempo até ao Nível 3? Não há prazo: o ritmo é teu'
      ]),
      L('Plano de estudo sugerido', [
        'Primeiras semanas — os 21 dias, desenho diário dos três símbolos, recitar os princípios; nenhum trabalho nos outros. Este tempo é só teu',
        'A seguir — autotratamento com símbolos; tratamento a colegas, com os símbolos na palma',
        'Depois — Hatsurei Ho regular, experimentar as técnicas tradicionais uma a uma; Enkaku Chiryo com registo',
        'Mais adiante — reflexão nos cinco princípios aplicados à tua vida; sessões completas, com registo de cada uma'
      ]),
      L('O que tens de saber no fim deste nível', [
        'O que é o Okuden, e os cinco princípios',
        'Os três símbolos: desenhar, activar e aplicar',
        'A aplicação dos símbolos no autotratamento e no tratamento a outros, e o tratamento dos chakras',
        'O tratamento à distância: por fotografia, por visualização, pelo caderno e pela caixa',
        'Tratamento no tempo e no espaço — passado, presente e futuro; a utilização das cores',
        'As técnicas tradicionais: Hatsurei Ho, Nentatsu, Tanden Chiryo Ho, Hesso Chiryo Ho, Gyoshi Ho, Koki Ho, Enkaku Chiryo'
      ]),
      L('Exercícios do Nível 2', [
        'Os 30 dias dos símbolos — desenha os três símbolos à mão, uma vez por dia, durante um mês',
        'Um símbolo por dia — nove dias, três com cada um; escreve o que notaste de diferente',
        'O envio cego — combina com um colega enviar-lhe Reiki a uma hora certa, sem lhe dizeres qual; no dia seguinte comparem notas',
        'Antes e depois — número de 0 a 10 ao desconforto de quem recebe, antes e depois; ao fim de vinte sessões tens dados teus',
        'O caderno — monta o teu caderno de Reiki e mantém-no durante 21 dias seguidos'
      ]),
      D('Compromisso do Aluno: «Ao receber a sintonização de Nível 2 — Okuden, comprometo-me a praticar com honestidade, a respeitar quem me procura, a pedir autorização antes de tratar ou de enviar, a não prometer aquilo que não posso dar, e a lembrar-me sempre de que o Reiki acompanha mas nunca substitui o cuidado de saúde de quem está à minha frente.» Este é o nível mais exigente, e é também aquele em que mais gente desiste. Se te apetecer largar, lembra-te de que o Mestre também quis — e do que aconteceu a seguir.')
    ],
    praticar: {
      titulo: 'O teu compromisso',
      instrucoes: 'Lê o Compromisso do Aluno no manual. Escreve com as tuas palavras o que ele significa para ti neste nível, e que limite vais respeitar com mais cuidado. Escolhe também um dos exercícios do Nível 2 para começar esta semana.',
      registo: true, registoPergunta: 'O meu compromisso e o exercício que escolhi:'
    },
    responder: [
      Q('Sentes que o ajuste está a mexer de mais. O que fazes?', ['Páro por completo', 'Reduzes: versão curta só com Cho Ku Rei, e falas com o Mestre', 'Aumentas o tempo'], 1, 'Se for grande de mais, procura também acompanhamento profissional.'),
      Q('Qual destas situações é um limite teu?', ['Pessoas com stress', 'Quadros psiquiátricos em fase aguda', 'Quem quer relaxar'], 1, 'E ainda: quem te procura em vez de procurar médico, quem espera milagres, quem só quer companhia.'),
      Q('Esqueceste-te de um símbolo. O que significa?', ['Que perdeste a sintonização', 'Nada de grave: relês, treinas, e volta ao papel', 'Que tens de repetir o nível'], 1, 'A sintonização não se apaga por teres esquecido o desenho.'),
      Q('O que fazes se a pessoa chorar na sessão?', ['Pergunto porquê', 'Fico em silêncio e mantenho as mãos', 'Paro a sessão'], 1, 'Chorar costuma ser sinal de que correu bem.'),
      Q('Para enviar à distância, o que pedes à pessoa?', ['Permissão', 'Dinheiro adiantado', 'Nada'], 0, 'Pedes permissão para enviar à distância.')
    ]
  }
];

/* =========================================================================
   TREINO LIVRE — perguntas DIFERENTES das do módulo (podem repetir-se)
   ========================================================================= */
const N2_TREINO = {
  0: [
    Q('Qual o primeiro ponto de mudança que vem «antes de todas»?', ['Os símbolos', 'Podes aplicar Reiki a outras pessoas', 'O exame'], 1, 'Com a responsabilidade diferente que isso traz.'),
    Q('Quando o Mestre viu a colega em criança, o que fez ela quinze dias depois?', ['Negou', 'Trouxe uma fotografia que confirmava os pormenores', 'Não disse nada'], 1, 'Aquela idade, aquela roupa, aquele corte de cabelo.'),
    Q('Que tratamento têm o Dai Ko Myo e o Raku na linhagem?', ['São do Nível 2', 'Vêm do mestrado em Reiki Essencial e são só do 3B', 'São do Nível 1'], 1, 'Dizê-lo abertamente dá valor a uma escola.'),
    Q('Qual das seis coisas que costumam aparecer neste nível?', ['Fluxo energético maior e mais intenso', 'Perda total de sensibilidade', 'Fim dos princípios'], 0, 'Também: visão interior mais nítida e noção mais clara dos estados emocionais.')
  ],
  1: [
    Q('Qual das matérias NÃO é uma a rever?', ['O alinhamento rápido, sentado', 'A crise de cura', 'A caixa de Reiki'], 2, 'A caixa de Reiki é nova neste nível.'),
    Q('Que técnica de meditação se aconselha diariamente?', ['Joshin Kokyu Ho', 'Gyoshi Ho', 'Koki Ho'], 0, 'Dez a quinze minutos.'),
    Q('Quando se recitam os princípios?', ['De manhã e à noite, em Gassho', 'Só ao deitar', 'Só no Nível 1'], 0, 'Continuam a ser o fundamento.'),
    Q('Observar o mundo com os cinco princípios serve para…', ['Perceber o teu papel na mudança do mundo', 'Julgar os outros', 'Fugir dele'], 0, 'É a terceira forma de os trabalhar.')
  ],
  2: [
    Q('Qual era o uso inicial dos símbolos?', ['A cura', 'A iluminação interior', 'A protecção'], 1, 'Por isso a transmissão de energia contribui também para o crescimento espiritual.'),
    Q('O que fazer com um símbolo desenhado mal?', ['Nada', 'Desenhá-lo bem: tem um objectivo muito concreto', 'Esconder'], 1, 'Se escreveres mal uma palavra, será que mantém o significado?'),
    Q('O termo «mantra» tem origem…', ['No sânscrito, da Índia', 'No japonês', 'No grego'], 0, 'É o mais usado em Portugal.'),
    Q('Nos sistemas japoneses mais tradicionais, como se chamam os símbolos?', ['Pelo nome em voz alta', 'Símbolo 1, 2 e 3', 'Com cores'], 1, 'Os nomes são sagrados.')
  ],
  3: [
    Q('O que é um «chokurei»?', ['Um édito imperial: uma ordem, um decreto', 'Um chakra', 'Uma técnica'], 0, 'Já o conheces do Nível 1.'),
    Q('Em qual mão se desenha o símbolo, tipicamente?', ['Sobre a mão esquerda, com a direita', 'Nos pés', 'Na testa'], 0, 'Há quem goste de desenhar em ambas.'),
    Q('O que se faz antes de te sentares numa cadeira?', ['Cho Ku Rei por cima, para transmutar a energia', 'Nada', 'Sei He Ki'], 0, 'O mesmo vale para qualquer coisa que queiras limpar ou energizar.'),
    Q('Como se enraíza um carro?', ['Um grande Cho Ku Rei por baixo e depois nos lados, frente e trás, cima e baixo', 'Com um colar', 'Não se enraíza'], 0, 'Visualizando a energia vermelha a subir e a prender-se ao carro.')
  ],
  4: [
    Q('Que palavra japonesa traduz «mente e coração unidos»?', ['Hara', 'Kokoro', 'Kami'], 1, 'Não dissociados como no ocidente.'),
    Q('O Sei He Ki ajuda a mudar…', ['Maus hábitos, vícios e compulsões', 'O peso', 'O tempo'], 0, 'Actua no subconsciente.'),
    Q('Quem é Kuan Yin?', ['A bodisatva da compaixão', 'Uma mestra de Reiki', 'Um símbolo'], 0, 'É Avalokiteshvara.'),
    Q('Como se limpa uma divisão com Sei He Ki e Cho Ku Rei?', ['Sei He Ki em cada canto superior e Cho Ku Rei ao centro', 'Só um Cho Ku Rei', 'Não se limpa'], 0, 'A harmonia vem para o espaço e o Cho Ku Rei envia a energia mais densa para a terra.')
  ],
  5: [
    Q('Que significa «Nen» no Hon Sha Ze Sho Nen?', ['Atenção plena, pensamento', 'Pessoa', 'Raiz'], 0, 'Também sentido, ideia, sentimento, desejo.'),
    Q('Como se aplica o Hon Sha Ze Sho Nen nas costas?', ['Ao longo de todas as costas; também na cama como colchão de energia', 'Só nos pés', 'Na testa'], 0, 'Para dores nas costas.'),
    Q('Quando usar o Cho Ku Rei?', ['Falta de energia, cansaço, abrir ou fechar', 'Memória e hábito', 'Passado'], 0, 'É o interruptor.'),
    Q('Nos três símbolos, qual «trata o passado»?', ['Cho Ku Rei', 'Sei He Ki', 'Hon Sha Ze Sho Nen'], 2, 'Também transforma atitudes.')
  ],
  6: [
    Q('Quanto tempo se fica com a fotografia entre as mãos?', ['Dez a quinze minutos', 'Um segundo', 'Duas horas'], 0, 'Na forma simples.'),
    Q('O que fazes quando acabas o envio?', ['Nada', 'Dizes que terminas, banho seco, chuva de Reiki e lavas as mãos', 'Dormes logo'], 1, 'Verifica se está tudo bem.'),
    Q('Podes enviar Reiki a uma situação do passado?', ['Sim — o Reiki não tem tempo nem espaço', 'Não', 'Só ao futuro'], 0, 'Passado, presente ou futuro.'),
    Q('Para o caderno de Reiki, escreves os nomes…', ['A lápis', 'A caneta permanente', 'No telemóvel'], 0, 'É um registo que podes manter e reler.')
  ],
  7: [
    Q('O que é a postura «seiza»?', ['Sentado sobre os pés', 'De pé', 'Deitado'], 0, 'É a postura original do Hatsurei Ho.'),
    Q('Em que técnica se sopra sobre a zona a tratar?', ['Gyoshi Ho', 'Koki Ho', 'Hesso Chiryo Ho'], 1, 'De preferência ar fresco, com o Cho Ku Rei.'),
    Q('O que se faz no fim do Nentatsu?', ['Aplica-se Reiki só na parte superior da cabeça, sem mensagem', 'Repete-se a mensagem', 'Nada'], 0, 'Nesta fase final não se transmite mensagem nenhuma.'),
    Q('Onde ficas ao fazer o Tanden Chiryo Ho a outra pessoa?', ['Do lado esquerdo', 'Atrás', 'À frente'], 0, 'Mão esquerda sobre o Tanden e direita nas costas.')
  ],
  8: [
    Q('Quantos minutos por posição no tratamento a outros?', ['Três a cinco, e mais onde o Byosen pedir', 'Trinta', 'Um'], 0, 'Mãos pousadas ou ligeiramente afastadas.'),
    Q('Na sessão, o que fazes onde sentes resistência ou vazio?', ['Reforças com Cho Ku Rei', 'Ignoras', 'Páras'], 0, 'E se o tema é emocional, Sei He Ki sobre a cabeça e o peito.'),
    Q('Como deve ser o ambiente durante a sessão?', ['Com muita conversa', 'Pouca fala: o silêncio faz parte do tratamento', 'Com música alta'], 1, 'Ouve sem interrogatório no início.'),
    Q('O que se oferece à pessoa no fim?', ['Água, e que se levante devagar', 'Café', 'Nada'], 0, 'E faz-se o teu banho seco e a chuva de Reiki.')
  ],
  9: [
    Q('Quanto dura o ajuste após a sintonização do Nível 2?', ['Sete dias', 'Vinte e um dias', 'Três meses'], 1, 'Costuma mexer mais do que o primeiro.'),
    Q('Podes prometer resultados?', ['Não: nem cura, nem prazos, nem garantias', 'Sim', 'Só em casos leves'], 0, 'É uma regra de ética.'),
    Q('O envio cego consiste em…', ['Enviar a um colega a uma hora certa, sem lhe dizer qual, e compararem notas', 'Enviar de olhos abertos', 'Enviar a desconhecidos'], 0, 'É o exercício 3 do nível.'),
    Q('O que o Mestre diz sobre cobrar?', ['É legítimo; guarda espaço para quem não pode pagar', 'É proibido', 'É obrigatório cobrar muito'], 0, 'Também só receber por doação não estava certo.')
  ]
};
N2_MODULOS.forEach(m => { m.treino = N2_TREINO[m.ordem] || []; });

/* =========================================================================
   EXAME FINAL — 20 perguntas · mínimo 60% (12 certas)
   ========================================================================= */
const N2_EXAME = {
  titulo: 'Exame final — Nível 2 (Okuden)', nivel: '2', modulo: 0, notaMinima: 60,
  perguntas: [
    { texto: 'O que quer dizer «Okuden»?', opcoes: ['O ensinamento profundo', 'O ensinamento secreto', 'O ensinamento final'], correta: 0 },
    { texto: 'A partir de que nível se aplica Reiki a outras pessoas?', opcoes: ['Nível 1', 'Nível 2', 'Só no 3B'], correta: 1 },
    { texto: 'O que quer dizer «hikari»?', opcoes: ['Mão', 'Luz', 'Energia'], correta: 1 },
    { texto: 'Em que três coisas assenta um símbolo?', opcoes: ['Sintonização, desenho e mantra', 'Livro, cor e fé', 'Mestre, aluno e certificado'], correta: 0 },
    { texto: 'De onde vem a energia do símbolo quando o desenhas com a mão?', opcoes: ['Do chakra da palma da mão', 'Da testa', 'Do coração'], correta: 0 },
    { texto: 'Qual dos símbolos é «o interruptor»?', opcoes: ['Sei He Ki', 'Cho Ku Rei', 'Hon Sha Ze Sho Nen'], correta: 1 },
    { texto: 'Quantos Cho Ku Rei se visualizam na protecção?', opcoes: ['Dois', 'Seis', 'Doze'], correta: 1 },
    { texto: 'Qual é a protecção mais eficaz, segundo o manual?', opcoes: ['A tua luz interior', 'Muitos símbolos', 'Evitar pessoas'], correta: 0 },
    { texto: 'Sei He Ki actua principalmente no…', opcoes: ['Corpo físico', 'Corpo emocional e subconsciente', 'Espaço'], correta: 1 },
    { texto: 'Qual o símbolo que se usa sempre nos tratamentos à distância?', opcoes: ['Hon Sha Ze Sho Nen', 'Cho Ku Rei', 'Sei He Ki'], correta: 0 },
    { texto: 'Em que ordem se desenham os três símbolos?', opcoes: ['Do primeiro para o terceiro', 'Do terceiro para o primeiro', 'Sem ordem'], correta: 1 },
    { texto: 'Quando usar o Sei He Ki?', opcoes: ['Emoção, memória, hábito, agitação mental', 'Falta de energia', 'Distância'], correta: 0 },
    { texto: 'O que quer dizer «Sashin Chiryo»?', opcoes: ['Tratamento por fotografia', 'Tratamento por sopro', 'Tratamento do veneno'], correta: 0 },
    { texto: 'Para que deve resultar a energia enviada à distância?', opcoes: ['Para o desejo de quem envia', 'Para o Bem Supremo', 'Para o que pedirem'], correta: 1 },
    { texto: 'Quantos passos tem o Hatsurei Ho neste nível?', opcoes: ['Quatro', 'Oito', 'Treze'], correta: 1 },
    { texto: 'Em que técnica se sopra sobre a zona a tratar?', opcoes: ['Koki Ho', 'Gyoshi Ho', 'Hesso Chiryo Ho'], correta: 0 },
    { texto: 'Qual a regra de ouro do Nentatsu noutra pessoa?', opcoes: ['Dizer o que ela devia querer', 'A mensagem ser exactamente o que ela deseja', 'Mensagens longas'], correta: 1 },
    { texto: 'O que se avisa sempre no fim de uma sessão?', opcoes: ['A crise de cura', 'O valor da próxima', 'Que a pessoa está curada'], correta: 0 },
    { texto: 'Durante os 21 dias do Nível 2, se sentires que o processo está a mexer de mais…', opcoes: ['Páras tudo', 'Reduzes (só com Cho Ku Rei) e falas com o Mestre', 'Aumentas a dose'], correta: 1 },
    { texto: 'Uma pessoa quer deixar a medicação por causa do Reiki. O que fazes?', opcoes: ['Concordo', 'Nunca aconselho a parar; o Reiki caminha ao lado da medicina', 'Deixo à pessoa decidir sem dizer nada'], correta: 1 }
  ]
};

window.FORMACAO_V2 = window.FORMACAO_V2 || {};
window.FORMACAO_V2['2'] = {
  nivel: '2',
  manual: { titulo: 'Manual completo do Nível 2 — Okuden', ficheiro: 'Manual-Reiki-Nivel-2-Okuden-Hikari-Fafe.pdf' },
  modulos: N2_MODULOS,
  exame: N2_EXAME
};
