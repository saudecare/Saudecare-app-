/* =========================================================================
   PERCURSO INTERATIVO — REIKI NÍVEL 1 (SHODEN)
   Hikari Fafe Escola de Reiki · Vindora
   -------------------------------------------------------------------------
   Conteúdo construído a partir do "Manual de Usui Reiki Ryoho — Nível 1
   (Shoden) · O Despertar", de Mestre Ricardo Correia.
   Os 17 capítulos do manual estão agrupados em 6 módulos.

   COMO USAR
   1. Guarda este ficheiro na raiz do repositório (saudecare/Saudecare-app),
      ao lado do saudecare-core.html
   2. No saudecare-core.html, a seguir ao teu <script type="module">
      principal, acrescenta:
         <script type="module" src="./reiki-percurso-nivel1.js"></script>
   3. Abre a app, autentica-te, e na consola corre:  seedReikiNivel1()
   4. Corre uma vez só. Se já existirem módulos do Nível 1, cancela sozinho.

   Os módulos ficam criados como NÃO PUBLICADOS, para os reveres antes de
   os alunos os verem.
   ========================================================================= */

import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getFirestore, collection, addDoc, getDocs, query, where
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

/* Reutiliza a app Firebase já iniciada pelo saudecare-core.html. */
const app = getApps().length ? getApp() : initializeApp(window.firebaseConfig || {});
const db = getFirestore(app);

const REIKI_TENANT = 'hikari-terapias';
const REIKI_NIVEL = '1';

/* =========================================================================
   OS 6 MÓDULOS DO NÍVEL 1
   ---------------------------------------------------------------------
   ler      → blocos curtos. tipo: 'texto' | 'destaque' | 'lista' | 'tabela'
   praticar → um exercício, com espaço de registo do aluno
   responder→ perguntas de treino, com feedback que ensina mesmo quando
              o aluno acerta
   ========================================================================= */

const MODULOS_NIVEL_1 = [

  /* ================================================================ 1 === */
  {
    ordem: 1,
    titulo: 'O que é, afinal, o Reiki',
    subtitulo: 'A energia, a linhagem e o lugar desta prática',
    manual: 'Capítulos 1 a 4',
    duracao: '20 min',
    ler: [
      {
        tipo: 'texto',
        conteudo: 'A palavra junta duas ideias japonesas: rei, aquilo que é universal e nos ultrapassa, e ki, a energia vital que anima tudo o que está vivo. Juntas, dizem algo como «energia vital universal». O ki não é invenção do Reiki — os chineses chamam-lhe chi, os indianos prana.'
      },
      {
        tipo: 'texto',
        conteudo: 'O que o Usui Reiki Ryoho faz é simples de descrever: através da imposição das mãos, o praticante torna-se canal dessa energia, que flui para onde é precisa. Tu não a produzes. Não a diriges com a força do pensamento. Disponibilizas-te, e ela passa.'
      },
      {
        tipo: 'lista',
        titulo: 'O que o Reiki não é',
        itens: [
          'Não é religião — pratica-se com qualquer fé, ou com nenhuma',
          'Não é magnetismo nem a tua energia pessoal, por isso não te esgotas',
          'Não é sugestão — funciona em bebés, animais e pessoas a dormir',
          'Não é medicina. É acompanhamento, e essa distinção tem de ser clara desde o primeiro dia'
        ]
      },
      {
        tipo: 'texto',
        conteudo: 'Mikao Usui nasceu no Japão em 1865. Abre a sua escola em Tóquio em 1922; no ano seguinte, o grande terramoto de Kanto leva-o a tratar feridos em grande número. Morre em 1926. Chujiro Hayashi, médico da marinha, organiza o ensino; é ele que forma Hawayo Takata, que leva o Reiki para o ocidente.'
      },
      {
        tipo: 'destaque',
        conteudo: 'Há uma ordem no método que não é por acaso: aprende-se primeiro a aplicar em si próprio, e só depois nos outros. Quem não conheceu os seus próprios limites dificilmente respeita os dos outros.'
      }
    ],
    praticar: {
      titulo: 'Onde é que isto me toca',
      instrucoes: 'O manual abre com «chegaste aqui por alguma razão». Senta-te cinco minutos em silêncio, sem telemóvel, e deixa vir a tua razão. Pode ser curiosidade, uma fase difícil, ou alguém que te falou disto. Nenhuma é melhor do que outra.',
      registo: true,
      registoPergunta: 'O que te trouxe ao Reiki? Escreve em poucas linhas, para releres no fim do nível.'
    },
    responder: [
      {
        pergunta: 'Um amigo diz-te que não pode fazer Reiki porque não é religioso. O que respondes?',
        opcoes: [
          'Que o Reiki não é religião e se pratica com qualquer fé, ou com nenhuma',
          'Que precisa pelo menos de acreditar em energia para funcionar',
          'Que terá de adoptar as crenças budistas do método'
        ],
        correta: 0,
        feedback: 'Não tem deuses, dogmas nem obrigação de acreditar em coisa nenhuma. E nem sequer é preciso acreditar para funcionar: funciona em bebés e em animais, que não fazem ideia do que está a acontecer.'
      },
      {
        pergunta: 'Alguém com uma doença prolongada procura-te. Qual é o enquadramento correcto?',
        opcoes: [
          'O Reiki pode substituir o tratamento se a pessoa preferir',
          'O Reiki acompanha, sempre a par do tratamento médico, e nunca o substitui',
          'Só se deve dar Reiki depois de a pessoa ter alta'
        ],
        correta: 1,
        feedback: 'Complementar quer dizer que acompanha, que anda a par, que acrescenta — nunca que substitui. A pessoa continua a ver o médico, a tomar a medicação e a fazer os exames.'
      },
      {
        pergunta: 'Encontras uma escola que ensina os símbolos por outra ordem. O que fazes?',
        opcoes: [
          'Corrijo-os, porque a minha versão é a correcta',
          'Aprendo bem a minha, pratico-a com honestidade e respeito quem aprendeu outra',
          'Deixo de praticar até perceber qual é a verdadeira'
        ],
        correta: 1,
        feedback: 'O método passou décadas de boca em boca e de mãos para mãos, sem manuais. Cada mestre ensinou como aprendeu e como entendeu. Daí as diferenças — e não vale a pena perder tempo a discutir qual é a correcta.'
      }
    ]
  },

  /* ================================================================ 2 === */
  {
    ordem: 2,
    titulo: 'Os cinco princípios e os três pilares',
    subtitulo: 'O chão sobre o qual assenta tudo o resto',
    manual: 'Capítulos 5 a 7',
    duracao: '25 min',
    ler: [
      {
        tipo: 'lista',
        titulo: 'Os cinco princípios — para repetir de manhã e à noite, de mãos juntas',
        itens: [
          'Só por hoje',
          'Sou calmo',
          'Confio',
          'Sou grato',
          'Trabalho honestamente',
          'Sou bondoso'
        ]
      },
      {
        tipo: 'destaque',
        conteudo: 'Repara no «só por hoje». É o que torna isto possível. Ninguém promete nunca mais se zangar. Mas hoje, só hoje, dá para tentar. E amanhã recomeça-se.'
      },
      {
        tipo: 'texto',
        conteudo: 'Sou calmo: a raiva não se proíbe, observa-se — muitas vezes o que está por baixo é medo ou cansaço. Confio: pergunta-te se há alguma coisa que possas fazer agora; se há, faz; se não há, pousa e confia. Sou grato: não é positividade forçada, é treinar o olhar. Trabalho honestamente: serve para o Reiki e serve para varrer a casa. Sou bondoso: para com todos os seres, o que te inclui a ti.'
      },
      {
        tipo: 'lista',
        titulo: 'Os três pilares',
        itens: [
          'Gassho — mãos juntas ao peito, atenção no ponto onde os dedos médios se tocam. É como se abre e se fecha tudo',
          'Reiji-Ho — pedir e escutar; colocas-te ao serviço e deixas que a energia indique o caminho',
          'Chiryo — tratar, com as mãos pousadas'
        ]
      },
      {
        tipo: 'texto',
        conteudo: 'A ordem importa: Gassho para entrar, Reiji-Ho para te alinhares, Chiryo para trabalhar, e Gassho outra vez para fechar. Quem salta o princípio e o fim acaba por dar sessões apressadas, e nota-se.'
      },
      {
        tipo: 'destaque',
        conteudo: 'Não há um número de meses fixo entre níveis. O ritmo é teu, e conta o trabalho que vais entregando. Vale mais a intenção com que te entregas a cada momento — com amor, gratidão e compaixão — do que teres todas as técnicas na ponta da língua.'
      }
    ],
    praticar: {
      titulo: 'Um princípio por semana',
      instrucoes: 'Escolhe um princípio e vive com ele uma semana. Ao fim de cada dia, escreve duas linhas sobre onde ele te apanhou desprevenido. Não escrevas o que devias ter feito — escreve o que aconteceu.',
      registo: true,
      registoPergunta: 'Que princípio escolheste, e onde é que ele te apanhou desprevenido durante a semana?'
    },
    responder: [
      {
        pergunta: 'Porque é que os cinco princípios começam por «só por hoje»?',
        opcoes: [
          'Porque só se praticam durante a formação',
          'Porque torna o compromisso possível: hoje dá para tentar, e amanhã recomeça-se',
          'Porque cada princípio corresponde a um dia da semana'
        ],
        correta: 1,
        feedback: 'É a parte mais inteligente da frase. Ninguém consegue prometer nunca mais se zangar — mas hoje, só hoje, é possível.'
      },
      {
        pergunta: 'Estás prestes a começar uma sessão. Pela ordem dos três pilares, o que vem primeiro?',
        opcoes: [
          'Chiryo — pousar as mãos e começar',
          'Gassho, depois Reiji-Ho, e só então Chiryo',
          'Reiji-Ho, e Gassho só no fim'
        ],
        correta: 1,
        feedback: 'Gassho para entrar, Reiji-Ho para te alinhares, Chiryo para trabalhar, e Gassho outra vez para fechar. Quem salta o princípio e o fim dá sessões apressadas.'
      },
      {
        pergunta: 'Durante o Gassho a tua mente foge para a lista de compras. O que fazes?',
        opcoes: [
          'Recomeço do zero, porque o exercício ficou estragado',
          'Trago a atenção de volta ao ponto onde os dedos se tocam, sem me censurar',
          'Forço-me a esvaziar a mente até não haver pensamento nenhum'
        ],
        correta: 1,
        feedback: 'A mente vai fugir — faz parte, e é literalmente isso o exercício. Trazer de volta sem censura é a prática inteira.'
      }
    ]
  },

  /* ================================================================ 3 === */
  {
    ordem: 3,
    titulo: 'O corpo energético e o Byosen',
    subtitulo: 'Chakras, o circuito da energia, e aprender a sentir',
    manual: 'Capítulos 8 a 10',
    duracao: '25 min',
    ler: [
      {
        tipo: 'texto',
        conteudo: 'Além do corpo físico, a tradição descreve camadas mais subtis à sua volta — a aura. E ao longo do eixo do corpo, sete centros principais de energia, os chakras. Não precisas de acreditar nisto como se fosse anatomia: usa como mapa, porque é assim que a tradição organiza aquilo que se sente.'
      },
      {
        tipo: 'lista',
        titulo: 'Os sete chakras',
        itens: [
          '1 · Raiz, base da coluna — segurança e presença; em desequilíbrio, medo e agitação',
          '2 · Sacro, baixo ventre — prazer e criatividade; em desequilíbrio, culpa e rigidez',
          '3 · Plexo solar, boca do estômago — vontade e confiança; em desequilíbrio, controlo e raiva contida',
          '4 · Cardíaco, centro do peito — amor e abertura; em desequilíbrio, mágoa e isolamento',
          '5 · Laríngeo, garganta — expressão e verdade; em desequilíbrio, calar o que se sente',
          '6 · Frontal, entre as sobrancelhas — clareza e intuição; em desequilíbrio, dúvida constante',
          '7 · Coronário, topo da cabeça — ligação e sentido; em desequilíbrio, vazio e desorientação'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Como flui a energia',
        itens: [
          'Captação — entra pelo teu chakra coronário',
          'Passagem — desce pelo eixo do corpo e distribui-se pelos braços',
          'Saída — chega às palmas, onde há centros activados na sintonização',
          'Recepção — quem recebe absorve na medida da sua necessidade'
        ]
      },
      {
        tipo: 'destaque',
        conteudo: 'Ser canal, não bomba. A imagem que ajuda é a de uma mangueira: a tua função é estar aberto e limpo, não empurrar a água. Quando um aluno se esforça por «mandar energia», o que costuma conseguir é uma dor de cabeça.'
      },
      {
        tipo: 'lista',
        titulo: 'Byosen — o que as mãos costumam dizer',
        itens: [
          'Calor — a mais comum; zona a receber e a trabalhar',
          'Frio ou vazio — falta de energia naquela zona; demora-te mais',
          'Formigueiro — movimento energético, circulação a retomar',
          'Pulsação — ritmo próprio da zona, muitas vezes forte',
          'Peso ou atracção — a mão parece colar; fica',
          'Repulsa — a mão quer afastar-se; respeita e volta mais tarde',
          'Nada — também é informação, e é muito frequente no início'
        ]
      }
    ],
    praticar: {
      titulo: 'A bola de energia',
      instrucoes: 'Esfrega as palmas uma na outra durante vinte segundos. Afasta-as cerca de trinta centímetros, palmas frente a frente. Aproxima-as muito devagar, até quase se tocarem, e afasta outra vez. Repete dez vezes, de olhos fechados, sem esperar nada em concreto. Faz isto uma vez por dia durante uma semana.',
      registo: true,
      registoPergunta: 'O que sentiste? Uma palavra chega. Se foi "nada", escreve "nada" — é uma resposta válida e muito frequente.'
    },
    responder: [
      {
        pergunta: 'Acabas uma prática exausto. Qual é a causa mais provável?',
        opcoes: [
          'Dei energia a mais e fiquei sem a minha',
          'Envolvi-me emocionalmente no problema, porque a energia atravessa-me e não sai de mim',
          'A minha sintonização está a enfraquecer'
        ],
        correta: 1,
        feedback: 'A energia atravessa-te, não sai de ti. Se acabas exausto, quase sempre é envolvimento emocional — não é energia a mais gasta. E repara: enquanto dás, também recebes.'
      },
      {
        pergunta: 'A tua mão sente repulsa numa zona, como se quisesse afastar-se. O que fazes?',
        opcoes: [
          'Forço a mão a ficar até a sensação passar',
          'Respeito e volto mais tarde',
          'Dou por terminada a prática'
        ],
        correta: 1,
        feedback: 'A repulsa é uma das sensações do Byosen e lê-se como as outras: respeita e volta mais tarde. Forçar é o contrário de escutar.'
      },
      {
        pergunta: 'Não sentes nada nas mãos, semana após semana. Isso quer dizer que...',
        opcoes: [
          'O Reiki não está a funcionar em ti',
          'Nada — o Reiki não depende de sentires, e há praticantes excelentes que sentem pouco',
          'Precisas de nova sintonização'
        ],
        correta: 1,
        feedback: 'Não corras atrás disto. A sensibilidade afina-se com o tempo, e "nada" é também informação. O que conta é estares disponível, não sentires.'
      }
    ]
  },

  /* ================================================================ 4 === */
  {
    ordem: 4,
    titulo: 'A sintonização e os 21 dias',
    subtitulo: 'O canal abre-se — e o que vem a seguir',
    manual: 'Capítulo 11',
    duracao: '15 min + 21 dias',
    ler: [
      {
        tipo: 'texto',
        conteudo: 'A sintonização é o momento em que o Mestre abre o teu canal. É um processo breve, tranquilo, e não exige nada de ti a não ser estares disponível. Não tens de sentir nada de espectacular — muita gente sente apenas calma. Fica contigo para o resto da vida, sem precisares de a renovar.'
      },
      {
        tipo: 'lista',
        titulo: 'O que podes sentir nos dias seguintes',
        itens: [
          'Mais sono, ou sonhos mais vivos',
          'Emoções mais à flor da pele, sem razão aparente',
          'Vontade de mudar hábitos: comer de outra forma, beber mais água, deitar-te mais cedo',
          'Cansaço nos primeiros dias, seguido de mais clareza',
          'Ou nada de especial — também é perfeitamente normal'
        ]
      },
      {
        tipo: 'destaque',
        conteudo: 'O compromisso dos 21 dias: autotratamento todos os dias, durante vinte e um dias. Vinte minutos chegam. Se falhares um dia, retoma no seguinte — sem drama e sem recomeçar a contagem. Bebe mais água do que o costume nesta fase.'
      },
      {
        tipo: 'texto',
        conteudo: 'O número não tem nada de mágico: é o tempo que costuma bastar para o corpo se habituar à frequência nova. Marca cada dia e escreve uma palavra sobre como te sentiste.'
      }
    ],
    praticar: {
      titulo: 'O registo dos 21 dias',
      instrucoes: 'Autotratamento diário durante vinte e um dias, com uma palavra escrita por dia. Se falhares, retomas no dia seguinte e continuas a contagem de onde estava.',
      registo: true,
      registoPergunta: 'Escreve a tua palavra de hoje, e o número do dia em que vais. No fim dos 21, relê tudo de seguida.'
    },
    responder: [
      {
        pergunta: 'Falhaste o dia 9 do ciclo dos 21 dias. O que fazes?',
        opcoes: [
          'Recomeço a contagem no dia 1',
          'Retomo no dia seguinte, sem drama e sem recomeçar a contagem',
          'Faço dois autotratamentos no dia seguinte'
        ],
        correta: 1,
        feedback: 'Sem drama e sem recomeçar. Isto não é prova de resistência: é criar um hábito, e hábitos constroem-se com perdão pelo meio.'
      },
      {
        pergunta: 'Depois da sintonização não sentiste absolutamente nada de especial. Isso significa...',
        opcoes: [
          'Que a sintonização não resultou',
          'Nada de mau — é perfeitamente normal, e muita gente sente apenas calma',
          'Que devo pedir uma segunda sintonização'
        ],
        correta: 1,
        feedback: 'Não tens de sentir nada de espectacular. A sintonização não exige nada de ti a não ser estares disponível.'
      },
      {
        pergunta: 'A sintonização perde-se se estiveres muito tempo sem praticar?',
        opcoes: [
          'Sim, ao fim de um ano tem de ser renovada',
          'Não se perde — fica adormecida, e a facilidade diminui como em tudo o que não se treina',
          'Perde-se apenas o símbolo, não o canal'
        ],
        correta: 1,
        feedback: 'Não se perde. Recomeça devagar, e a facilidade volta. É como qualquer coisa que não se treina.'
      }
    ]
  },

  /* ================================================================ 5 === */
  {
    ordem: 5,
    titulo: 'Autotratamento e Cho Ku Rei',
    subtitulo: 'A prática diária e o teu primeiro símbolo',
    manual: 'Capítulos 12 e 12B',
    duracao: '35 min',
    ler: [
      {
        tipo: 'texto',
        conteudo: 'O autotratamento é a prática mais importante que tens, e é a primeira que os alunos abandonam. Faz-se sentado ou deitado, de manhã ou à noite — a hora que conseguires manter é a hora certa.'
      },
      {
        tipo: 'lista',
        titulo: 'Versão completa — 20 a 30 minutos',
        itens: [
          'Desliga o telemóvel. Gassho: mãos juntas ao peito, dois minutos de respiração lenta',
          'Reiji-Ho: pede que a energia flua para o teu bem-estar',
          '1 olhos · 2 têmporas · 3 nuca · 4 garganta (sem apertar)',
          '5 peito · 6 plexo solar · 7 abdómen · 8 baixo ventre',
          'Três a cinco minutos em cada posição; onde houver dor ou tensão, demora-te lá',
          'Gassho outra vez e agradece'
        ]
      },
      {
        tipo: 'destaque',
        conteudo: 'Versão curta — 5 minutos, para os dias sem tempo: mãos no peito e no abdómen, respiração lenta. Feito vale infinitamente mais do que adiado. E são precisamente os dias em que não te apetece nada que mais contam: põe as mãos e respira, sem negociares contigo.'
      },
      {
        tipo: 'texto',
        conteudo: 'Sobre o Cho Ku Rei: há escolas que só dão símbolos no segundo nível. Aqui damos-to já no primeiro, e a razão é simples — a energia do mundo em que vivemos está muito mais densa do que estava há cem anos. Faz pouco sentido mandar alguém para a rua com as mãos vazias durante meses quando podemos dar-lhe já uma ferramenta que funciona.'
      },
      {
        tipo: 'texto',
        conteudo: 'Um símbolo não é um feitiço nem um amuleto. Pensa nele como o nome de uma frequência: ao desenhá-lo e ao dizer o mantra, sintonizas-te com uma qualidade específica da energia, tal como marcas um número para falar com determinada pessoa. Costuma traduzir-se por «coloca aqui toda a força do universo» — não é subtil, é um interruptor.'
      },
      {
        tipo: 'lista',
        titulo: 'Como se desenha — três traços',
        itens: [
          'Um traço horizontal no topo, da esquerda para a direita',
          'A partir da ponta direita, desce a direito, uma vertical firme',
          'Da base da vertical, abre a espiral no sentido contrário ao dos ponteiros do relógio, enrolando para dentro, até cerca de três voltas e meia'
        ]
      },
      {
        tipo: 'destaque',
        conteudo: 'A força não está no traço bem feito. Está na tua intenção e na sintonização que recebeste. Um símbolo desenhado torto por mãos sinceras funciona melhor do que um símbolo perfeito desenhado por distracção.'
      },
      {
        tipo: 'lista',
        titulo: 'Para que o usas neste nível',
        itens: [
          'Nas tuas palmas, antes do autotratamento',
          'Numa zona do teu corpo onde sintas que falta energia',
          'Para abrir e fechar a tua prática diária',
          'Para limpar o teu espaço: o quarto, a mesa de trabalho',
          'Para energizar a água, a comida, um objecto teu',
          'Como protecção, antes de entrares num ambiente pesado'
        ]
      }
    ],
    praticar: {
      titulo: 'A prática dos 30 dias',
      instrucoes: 'Desenha o Cho Ku Rei à mão, em papel, uma vez por dia durante um mês. Sem pressa, e a partir da segunda semana sem o copiar de lado nenhum. Junta-lhe o autotratamento completo sempre que tiveres tempo, e a versão curta nos dias que não tiveres.',
      registo: true,
      registoPergunta: 'Em que semana vais, e o que mudou no teu traço desde o primeiro dia? No fim do mês vais reparar que já não desenhas o símbolo — o símbolo aparece.'
    },
    responder: [
      {
        pergunta: 'Desenhaste a espiral com três voltas em vez de três e meia. O símbolo funciona?',
        opcoes: [
          'Não, o traço tem de estar exacto',
          'Sim — a força está na intenção e na sintonização, não no rigor do traço',
          'Só se repetir o mantra mais vezes para compensar'
        ],
        correta: 1,
        feedback: 'Um símbolo desenhado torto por mãos sinceras funciona melhor do que um símbolo perfeito desenhado por distracção. Treina o traço para o teres arrumado e o poderes esquecer — não para o exibires.'
      },
      {
        pergunta: 'Hoje não te apetece nada fazer o autotratamento. O que fazes?',
        opcoes: [
          'Salto e recupero amanhã com uma sessão maior',
          'Faço a versão curta de cinco minutos, sem negociar comigo',
          'Avalio primeiro se está a resultar, e decido a partir daí'
        ],
        correta: 1,
        feedback: 'São precisamente esses os dias que mais contam. Cinco minutos feitos valem infinitamente mais do que trinta adiados. Põe as mãos e respira.'
      },
      {
        pergunta: 'Porque é que nesta escola o Cho Ku Rei se ensina logo no Nível 1?',
        opcoes: [
          'Porque é o símbolo mais fácil de desenhar',
          'Porque a energia de hoje está mais densa e o aluno deve ter logo uma ferramenta que funcione',
          'Porque os outros símbolos só existem a partir do 3A'
        ],
        correta: 1,
        feedback: 'Faz pouco sentido mandar alguém para a rua com as mãos vazias durante meses quando podemos dar-lhe já uma ferramenta que funciona. É uma opção desta escola, e diz-se abertamente que o é.'
      }
    ]
  },

  /* ================================================================ 6 === */
  {
    ordem: 6,
    titulo: 'Uso próprio, limites e ética',
    subtitulo: 'O que já podes fazer, o que fica para o Nível 2',
    manual: 'Capítulos 13 a 17',
    duracao: '25 min',
    ler: [
      {
        tipo: 'texto',
        conteudo: 'A pergunta que toda a gente faz nesta altura: posso aplicar a outras pessoas? A resposta da nossa escola é clara — o Nível 1 é para uso próprio, com uma excepção: a família de casa e os animais. Atender pessoas de fora, marcar sessões e cobrar é do Nível 2 em diante. Não é regra burocrática nem forma de te obrigar a pagar mais formação: é uma questão de ordem.'
      },
      {
        tipo: 'lista',
        titulo: 'O que já podes fazer',
        itens: [
          'Autotratamento diário, que é o essencial deste nível',
          'Aplicar à família de casa e aos animais — foi com a Preta que tudo começou para mim',
          'Usar o Cho Ku Rei em ti, no teu espaço e nas tuas coisas',
          'Energizar a tua água, a tua comida, os teus objectos',
          'Reiki a plantas e a animais de casa',
          'Praticar a percepção nas mãos e afinar a tua sensibilidade'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'O que fica para o Nível 2',
        itens: [
          'Sessões a outras pessoas, com a sequência completa de posições',
          'Mais dois símbolos e o trabalho no plano emocional e mental',
          'O envio à distância'
        ]
      },
      {
        tipo: 'lista',
        titulo: 'Ética, limites e bom senso',
        itens: [
          'Reiki é complementar. Nunca substitui medicina — di-lo com clareza',
          'Não diagnosticas. Não tens formação para isso e não é o teu papel',
          'Não prometes resultados: nem cura, nem prazos, nem garantias',
          'Não mandas parar medicação. Nunca, em circunstância nenhuma',
          'Guardas segredo. O que se diz na marquesa fica na marquesa',
          'Não aproveitas a fragilidade de ninguém, nem emocional nem financeira',
          'Não crias dependência',
          'Sabes dizer que não — reconhecer que uma situação não é para ti é maturidade'
        ]
      },
      {
        tipo: 'destaque',
        conteudo: 'Uma frase para guardar: «Posso acompanhar-te com Reiki, e ao mesmo tempo acho importante que fales com o teu médico sobre isso.» Esta frase não te tira autoridade nenhuma. Dá-ta.'
      },
      {
        tipo: 'texto',
        conteudo: 'Sobre cobrar: cobrar pelo teu trabalho é legítimo e não tira pureza nenhuma ao Reiki. O que não é legítimo é aproveitar o desespero de alguém. Define o teu preço, mantém-no, e guarda espaço para quem realmente não pode pagar.'
      }
    ],
    praticar: {
      titulo: 'Antes e depois, durante um mês',
      instrucoes: 'Antes de cada autotratamento, dá um número de 0 a 10 ao teu desconforto ou ao teu cansaço. No fim, dá outro. Anota os dois, todos os dias, durante um mês. No fim tens dados teus — e isso vale mais do que qualquer teoria.',
      registo: true,
      registoPergunta: 'Regista os números de hoje (antes / depois) e, ao fim do mês, o que vês quando olhas para a série toda.'
    },
    responder: [
      {
        pergunta: 'Uma vizinha fica a saber que andas nisto e pede-te uma sessão. O que fazes?',
        opcoes: [
          'Faço, é só uma vez',
          'Digo com tranquilidade que estou no primeiro nível, que aqui trato de mim, da família de casa e dos animais, e que terei todo o gosto quando avançar',
          'Faço, mas sem lhe dizer que ainda não estou habilitado'
        ],
        correta: 1,
        feedback: 'A excepção que abro é família de casa e animais — foi com a minha cadela que tudo começou para mim. O que fica de fora é atender pessoas de fora, marcar, cobrar e apresentares-te como terapeuta. Isso é do Nível 2 em diante.'
      },
      {
        pergunta: 'Sentiste calor prolongado sobre o fígado de alguém durante uma prática. Podes dizer-lhe que tem um problema no fígado?',
        opcoes: [
          'Sim, é informação útil para a pessoa',
          'Não — não diagnosticas, não tens formação para isso e não é o teu papel',
          'Só se ela já andar a fazer exames'
        ],
        correta: 1,
        feedback: 'Esta é a linha que não se atravessa em nenhum nível. E há outro erro comum a evitar: nunca digas a alguém que a doença dele vem de uma mágoa antiga. Não sabes, não te compete, e faz muito mal a quem está doente.'
      },
      {
        pergunta: 'Uma pessoa quer marcar contigo todas as semanas porque diz que sem isso não funciona. O que te diz o manual?',
        opcoes: [
          'É sinal de que o trabalho está a resultar',
          'Não crias dependência — se alguém precisa de ti para funcionar, alguma coisa correu mal',
          'Devo aumentar a frequência das sessões'
        ],
        correta: 1,
        feedback: 'A dependência é um sinal de alarme na relação terapêutica, não um elogio ao teu trabalho. Vale para agora e vale para quando fores terapeuta.'
      }
    ]
  }
];

/* =========================================================================
   SEED
   ========================================================================= */

async function seedReikiNivel1() {
  try {
    const existentes = await getDocs(query(
      collection(db, 'tenants', REIKI_TENANT, 'reikiModules'),
      where('nivel', '==', REIKI_NIVEL)
    ));

    if (!existentes.empty) {
      alert('O Nível ' + REIKI_NIVEL + ' já tem ' + existentes.size + ' módulos criados. Seed cancelado para não duplicar.');
      return;
    }

    let criados = 0;
    for (const m of MODULOS_NIVEL_1) {
      await addDoc(collection(db, 'tenants', REIKI_TENANT, 'reikiModules'), {
        nivel: REIKI_NIVEL,
        ordem: m.ordem,
        titulo: m.titulo,
        subtitulo: m.subtitulo || '',
        manual: m.manual || '',
        duracao: m.duracao || '',
        ler: m.ler || [],
        praticar: m.praticar || null,
        responder: m.responder || [],
        publicado: false,
        criadoEm: new Date().toISOString(),
        actualizadoEm: new Date().toISOString()
      });
      criados++;
    }

    alert('Nível ' + REIKI_NIVEL + ' criado: ' + criados + ' módulos.\n\nEstão todos como NÃO PUBLICADOS. Revê-os e publica quando estiverem a teu gosto.');
  } catch (err) {
    console.error('[Reiki] Erro no seed:', err);
    alert('Erro ao criar os módulos: ' + err.message + '\n\nVê a consola para o detalhe.');
  }
}

/* Módulo ES — sem isto, uma chamada a partir de um onclick do HTML não faz
   absolutamente nada e não dá erro nenhum. */
window.seedReikiNivel1 = seedReikiNivel1;
window.MODULOS_NIVEL_1 = MODULOS_NIVEL_1;
