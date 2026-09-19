/* =========================================================================
   PERCURSO INTERATIVO — REIKI NÍVEIS 2, 3A e 3B
   Hikari Fafe Escola de Reiki · Vindora
   -------------------------------------------------------------------------
   Seis módulos por nível, construídos a partir dos manuais. Cada um segue
   a mesma estrutura do Nível 1: ler um bocado, praticar com registo,
   responder a perguntas com comentário que ensina mesmo quando se acerta.

     Nível 2  — Okuden      · os três símbolos e o envio à distância
     Nível 3A — Shinpiden   · o Dai Ko Myo e o trabalho interior
     Nível 3B — Gokukaiden  · sintonizar e ensinar

   COMO USAR
   1. Guarda este ficheiro na raiz do repositório.
   2. Já está ligado no fim do saudecare-core.html.
   3. No separador Percurso, carrega no botão de cada nível. Uma vez só —
      cada seed cancela sozinho se já houver módulos desse nível.
   ========================================================================= */

import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, where }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const app = getApps().length ? getApp() : initializeApp(window.firebaseConfig || {});
const db = getFirestore(app);
const REIKI_TENANT = 'hikari-terapias';

/* Uma só função de gravação, partilhada pelos três níveis. */
async function gravarModulos(nivel, modulos){
  try {
    const existentes = await getDocs(query(
      collection(db, 'tenants', REIKI_TENANT, 'reikiModules'),
      where('nivel', '==', nivel)
    ));
    if (!existentes.empty){
      alert('O Nível ' + nivel + ' já tem ' + existentes.size + ' módulos. Seed cancelado para não duplicar.');
      return;
    }
    let n = 0;
    for (const m of modulos){
      await addDoc(collection(db, 'tenants', REIKI_TENANT, 'reikiModules'), {
        nivel, ordem: m.ordem, titulo: m.titulo,
        subtitulo: m.subtitulo || '', manual: m.manual || '', duracao: m.duracao || '',
        ler: m.ler || [], praticar: m.praticar || null, responder: m.responder || [],
        publicado: false,
        criadoEm: new Date().toISOString(), actualizadoEm: new Date().toISOString()
      });
      n++;
    }
    alert('Nível ' + nivel + ' criado: ' + n + ' módulos.\n\nEstão todos como NÃO PUBLICADOS. Revê-os e publica quando estiverem a teu gosto.');
  } catch(err){
    console.error('[Reiki ' + nivel + '] Erro:', err);
    alert('Erro ao criar os módulos do Nível ' + nivel + ': ' + err.message);
  }
}

/* ═══ NÍVEL 2 — OKUDEN ═══════════════════════════════════════════ */
const MODULOS_NIVEL_2 = [
  /* ─────────────────────────────────────────────────────────── 1 ─── */
  {
    ordem: 1,
    titulo: 'Bem-vindo ao Okuden',
    subtitulo: 'O que muda agora — e o que continua igual',
    manual: 'Capítulos 1 e 2',
    duracao: '20 min',
    ler: [
      { tipo: 'texto', conteudo: 'Okuden quer dizer «o ensinamento profundo», ou «os segundos ensinamentos». É a continuação do trabalho que começaste no Nível 1: a sensibilidade à energia, o autotratamento, a filosofia de vida através dos cinco princípios.' },
      { tipo: 'lista', titulo: 'O que muda neste nível', itens: [
        'Aperfeiçoamento do canal energético e da capacidade de tratar',
        'A actividade de cura aumenta',
        'Os símbolos e os mantras tornam a ligação à energia mais simples e eficiente',
        'Passas a poder trabalhar além do tempo e do espaço'
      ]},
      { tipo: 'destaque', conteudo: 'E há uma mudança que vem antes de todas: é a partir deste nível que podes aplicar Reiki a outras pessoas. No Nível 1 o trabalho era em ti, na família de casa e nos animais. Agora abre-se a porta ao atendimento — e com ela uma responsabilidade diferente.' },
      { tipo: 'texto', conteudo: 'O Nível 2 traz também uma ligação diferente com a energia universal. Tornas-te cada vez mais um canal, e tu próprio és parte dessa luz. A isso, em japonês, chama-se hikari: luz. É de onde vem o nome desta escola.' },
      { tipo: 'lista', titulo: 'Seis coisas que costumam aparecer', itens: [
        'Mais pessoas te procuram para serem tratadas',
        'Acesso mais profundo a informações sobre ti mesmo',
        'Noção mais clara dos estados emocionais',
        'Percepção mais forte dos estados mentais',
        'Visão interior mais nítida',
        'Fluxo energético maior e mais intenso'
      ]}
    ],
    praticar: {
      titulo: 'Rever o que trazes de trás',
      instrucoes: 'Relê o teu manual de Shoden de fio a pavio, sem pressa. Vais encontrar coisas que parece que não tinhas lido — é normal, quer dizer que tens outra consciência. Anota as passagens que agora leste de outra maneira.',
      registo: true,
      registoPergunta: 'O que é que leste de forma diferente desta vez? E que dúvida trazes para a próxima aula?'
    },
    responder: [
      { pergunta: 'O que é que o Nível 2 te permite, que o Nível 1 não permitia?',
        opcoes: ['Aplicar Reiki a outras pessoas, incluindo à distância', 'Sintonizar alunos', 'Apresentar-me como terapeuta profissional'],
        correta: 0,
        feedback: 'É a mudança que vem antes de todas. Sintonizar é do 3B; trabalhar como terapeuta é do 3A. Cada degrau abre uma porta e só uma.' },
      { pergunta: 'O que quer dizer hikari?',
        opcoes: ['Energia', 'Luz', 'Mestre'],
        correta: 1,
        feedback: 'Luz. E é o que este nível te pede: tornares-te um praticante luminoso, um transmissor. Dá nome a esta escola, e é por isso que o nome não é por acaso.' },
      { pergunta: 'Sentes mais emoções e mais sensibilidade desde a sintonização. O que é?',
        opcoes: ['Sinal de que alguma coisa correu mal', 'Uma das seis coisas que costumam aparecer neste nível', 'Preciso de uma nova sintonização'],
        correta: 1,
        feedback: 'É esperado. Com o Okuden trabalhamos a transformação emocional e mental — é o nível mais exigente, e é o que mexe mais. Se pesar de mais, reduz em vez de parares, e fala comigo.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 2 ─── */
  {
    ordem: 2,
    titulo: 'Os princípios mais fundo, e o que é um símbolo',
    subtitulo: 'Kotodama, jumon, mantra — e os três pressupostos',
    manual: 'Capítulos 3 e 4',
    duracao: '25 min',
    ler: [
      { tipo: 'texto', conteudo: 'Apesar de neste nível nos focarmos muito nos símbolos, não te podes esquecer do que é fundamental no Reiki: os seus princípios. Sem eles, o Reiki perde o significado e passa a ser mais uma terapia energética entre tantas.' },
      { tipo: 'lista', titulo: 'De manhã e à noite, de mãos em Gassho', itens: [
        'Só por hoje', 'Sou calmo', 'Confio', 'Sou grato', 'Trabalho honestamente', 'Sou bondoso'
      ]},
      { tipo: 'texto', conteudo: 'Um símbolo de Reiki não tem poder por si. Não é um feitiço nem um amuleto. Pensa nele como o nome de uma frequência: ao desenhá-lo e ao dizer o seu mantra, sintonizas-te com uma qualidade específica da energia, tal como marcas um número para falar com determinada pessoa.' },
      { tipo: 'texto', conteudo: 'Nos sistemas japoneses não se diz o nome dos símbolos, que são sagrados: diz-se apenas «símbolo 1, símbolo 2, símbolo 3». Kotodama é a alma da palavra; jumon é encantamento, no budismo esotérico japonês; mantra é o termo sânscrito, o mais usado entre nós.' },
      { tipo: 'destaque', conteudo: 'Um símbolo assenta em três coisas. Primeira: o praticante ter sido sintonizado. Segunda: o desenho do símbolo. Terceira: a entoação do mantra. Falta uma das três e o símbolo não passa de um desenho bonito.' },
      { tipo: 'texto', conteudo: 'Desenhar e visualizar funcionam, e ambas devem ser praticadas. Se só visualizares, quando tentares desenhar vai sair estranho. Se só desenhares, perdes o lado criativo. Quando desenhas com a mão, a energia vem do chakra da palma — podes usar o dedo, mas é na palma que o símbolo está.' }
    ],
    praticar: {
      titulo: 'Um princípio por semana, com caderno',
      instrucoes: 'Escolhe um princípio e vive com ele uma semana inteira. Ao fim de cada dia escreve duas linhas sobre onde ele te apanhou desprevenido. Não escrevas o que devias ter feito — escreve o que aconteceu.',
      registo: true,
      registoPergunta: 'Que princípio escolheste, e onde é que ele te apanhou esta semana?'
    },
    responder: [
      { pergunta: 'Um símbolo funciona porque…',
        opcoes: ['O desenho está perfeito', 'Foste sintonizado, desenhaste e entoaste o mantra', 'Repetiste o nome muitas vezes'],
        correta: 1,
        feedback: 'São três coisas juntas, e falta uma delas e o símbolo não é mais do que um desenho. É por isso que ver um símbolo num livro não serve de nada a quem não foi sintonizado.' },
      { pergunta: 'Kotodama, jumon e mantra querem dizer…',
        opcoes: ['Três símbolos diferentes', 'Praticamente o mesmo, em tradições diferentes', 'Três níveis de Reiki'],
        correta: 1,
        feedback: 'Kotodama é japonês — a alma da palavra. Jumon vem do budismo esotérico japonês. Mantra é sânscrito. Usamos mantra em Portugal porque é o que toda a gente entende.' },
      { pergunta: 'Já sei os símbolos de cor. Preciso de continuar a desenhá-los em papel?',
        opcoes: ['Não, a visualização basta', 'Sim, de vez em quando — um dia vais precisar de os saber desenhar', 'Só se for para ensinar'],
        correta: 1,
        feedback: 'Com o tempo poderás deixar de desenhar, mas treina de vez em quando. E se um dia chegares ao mestrado, vais ter de os desenhar no ar sobre as mãos de alguém.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 3 ─── */
  {
    ordem: 3,
    titulo: 'Cho Ku Rei — o símbolo do poder',
    subtitulo: 'O interruptor, e tudo o que ele faz',
    manual: 'Capítulo 5',
    duracao: '30 min',
    ler: [
      { tipo: 'texto', conteudo: 'Um chokurei é um édito imperial: uma ordem, um mandamento, um decreto. Cho liga; Ku é poder, energia; Rei é espírito, universo. Já o conheces do Nível 1 — aqui passas a trabalhá-lo a sério.' },
      { tipo: 'lista', titulo: 'Para que serve', itens: [
        'Aumenta a potência e a intensidade da energia',
        'Serve para iniciar o Reiki e para te ligares a ele — por isso lhe chamamos o interruptor',
        'Ao visualizá-lo, multiplicas a tua capacidade de acesso à energia'
      ]},
      { tipo: 'texto', conteudo: 'Pronuncia de forma cadenciada, separando bem as sílabas: CHO-KU-REI. Podes dizer o mantra enquanto desenhas, ou três vezes depois. Desenha sobre a mão esquerda com a direita — há quem goste de desenhar em ambas.' },
      { tipo: 'lista', titulo: 'Aplicações que vais usar todas as semanas', itens: [
        'Enraizamento: o símbolo nas plantas dos pés, a agarrar o corpo ao chão',
        'No carro: um grande Cho Ku Rei por baixo, e depois um de cada lado, seis ao todo',
        'Empilhamento: do coronário aos pés, até o corpo inteiro estar cheio',
        'Na cadeira antes de te sentares, para transmutar a energia',
        'Na água, na comida e nos medicamentos — nunca em substituição da toma',
        'Num pensamento negativo, no momento em que ele aparece',
        'Nas palmas antes de qualquer tratamento, e a reforçar onde sentires',
        'Nos chakras, da raiz à coroa'
      ]},
      { tipo: 'destaque', conteudo: 'Protecção nas seis direcções: à frente, atrás, à direita, à esquerda, em cima e em baixo. O símbolo deve ter o tamanho do corpo que vai proteger. Mas não vivas com medo do exterior — a tua luz interior é a protecção mais eficaz que existe. Quem anda a proteger-se de tudo, o que está a fazer é a alimentar o medo.' }
    ],
    praticar: {
      titulo: 'Os 30 dias do traço',
      instrucoes: 'Desenha o Cho Ku Rei à mão, em papel, uma vez por dia durante um mês. A partir da segunda semana, sem copiar de lado nenhum. E escolhe uma aplicação nova por semana — o carro, a água, os chakras, a protecção.',
      registo: true,
      registoPergunta: 'Que aplicação experimentaste esta semana, e o que notaste?'
    },
    responder: [
      { pergunta: 'Porque é que lhe chamamos o interruptor?',
        opcoes: ['Porque é o mais fácil de desenhar', 'Porque serve para ligar a energia e para a intensificar', 'Porque é o primeiro que se aprende'],
        correta: 1,
        feedback: 'Não é subtil como os outros: aumenta, concentra, protege e limpa. É o que usas para abrir e para fechar.' },
      { pergunta: 'Podes usar o Cho Ku Rei nos medicamentos de alguém?',
        opcoes: ['Sim, para potenciar os efeitos desejáveis e reduzir os indesejáveis', 'Não, nunca', 'Só se a pessoa deixar de os tomar'],
        correta: 0,
        feedback: 'Podes — e nunca, em circunstância nenhuma, em substituição da toma ou a alterar o que o médico indicou. Esta é a linha que não se atravessa em nenhum nível.' },
      { pergunta: 'Uma aluna usa a protecção das seis direcções várias vezes ao dia, sempre que sai de casa. O que lhe dizes?',
        opcoes: ['Muito bem, quanto mais melhor', 'Que a protecção não é blindagem contra um mundo hostil, e que quem se protege de tudo alimenta o medo', 'Que está a gastar energia do símbolo'],
        correta: 1,
        feedback: 'Protecção pressupõe medo de alguma coisa, e o que o Reiki ensina é o contrário: confiança. Usa-a quando for preciso — não como armadura permanente.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 4 ─── */
  {
    ordem: 4,
    titulo: 'Sei He Ki — o símbolo da harmonia',
    subtitulo: 'Onde as mãos não chegam',
    manual: 'Capítulo 6',
    duracao: '25 min',
    ler: [
      { tipo: 'texto', conteudo: 'Seiheki significa os atributos emocionais e intelectuais que formam uma pessoa. Lembra-te do conceito japonês de kokoro: mente e coração estão unidos, e não dissociados como no ocidente. Quando pensares no Sei He Ki, pensa em harmonia.' },
      { tipo: 'texto', conteudo: 'Tem origem numa palavra-semente que representa um aspecto de Buda: Hrih, que em japonês se traduz para Kiriku. Representa Avalokiteshvara, o buda da compaixão, mais conhecido entre nós como Kuan Yin.' },
      { tipo: 'lista', titulo: 'Para que serve', itens: [
        'Alinhar os chakras superiores, elevando a consciência',
        'Harmonizar os planos mental, emocional e espiritual',
        'Soltar e desbloquear emoções — quem não chora, não ri, ou não fala de si',
        'Aceder ao inconsciente da pessoa',
        'Melhorar a comunicação entre pessoas',
        'Limpeza de espaços e de energia'
      ]},
      { tipo: 'destaque', conteudo: 'Um mito que convém desfazer: dizia-se que o Sei He Ki não podia ser usado sozinho, por ser muito forte. O melhor conselho que te dou é experimentares. Se sentires que a energia dele é necessária mas forte de mais para a pessoa, usa-o com o Cho Ku Rei — é como usar a Terra e o Céu, harmoniosamente.' },
      { tipo: 'texto', conteudo: 'Para limpar a casa: um Sei He Ki em cada canto, por cima das janelas e das portas. Ou, em cada divisão, um Sei He Ki em cada canto superior e um Cho Ku Rei ao centro — a harmonia vem para o espaço e o Cho Ku Rei envia a energia mais densa para a terra.' }
    ],
    praticar: {
      titulo: 'Um dia inteiro só com o Sei He Ki',
      instrucoes: 'Faz o autotratamento usando apenas este símbolo. Desenha-o uma vez na mão, diz o mantra, e percorre as posições. Se tiveres um medo antigo ou uma situação que te aperta, acrescenta uma afirmação curta e directa enquanto as mãos estão pousadas.',
      registo: true,
      registoPergunta: 'Em que posição sentiste mais diferença com este símbolo, comparado com o Cho Ku Rei?'
    },
    responder: [
      { pergunta: 'O que é o kokoro?',
        opcoes: ['O nome japonês do coração físico', 'Mente e coração unidos, e não separados como no ocidente', 'Uma técnica de respiração'],
        correta: 1,
        feedback: 'É a chave para perceberes este símbolo: ele não trabalha a emoção de um lado e o pensamento do outro, porque na tradição japonesa isso é a mesma coisa.' },
      { pergunta: 'Uma pessoa começa a chorar durante uma sessão em que usaste Sei He Ki. O que fazes?',
        opcoes: ['Paro imediatamente', 'Fico em silêncio, mantenho as mãos, e não pergunto nada', 'Pergunto-lhe o que está a ver'],
        correta: 1,
        feedback: 'Chorar não é sinal de que correu mal — costuma ser sinal de que correu. Exige de ti presença e silêncio, não curiosidade. Se ela quiser contar, contará.' },
      { pergunta: 'Alguém te diz que o Sei He Ki nunca se usa sozinho. Está certo?',
        opcoes: ['Sim, é perigoso', 'É um mito — experimenta, e se for forte de mais para a pessoa junta o Cho Ku Rei', 'Só se usa sozinho no autotratamento'],
        correta: 1,
        feedback: 'Não coloques intenções negativas nem medos na prática. Respeita-te e respeita o outro, e nada é prejudicial.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 5 ─── */
  {
    ordem: 5,
    titulo: 'Hon Sha Ze Sho Nen e o envio à distância',
    subtitulo: 'A ponte, o caderno e a caixa',
    manual: 'Capítulos 7 a 11',
    duracao: '35 min',
    ler: [
      { tipo: 'texto', conteudo: 'Tipicamente considera-se este o símbolo da distância, mas o seu uso vai muito além disso. A leitura mais correcta e contemporânea é: «pensamento correcto é a essência do Ser». Ou, kanji a kanji: esta (Hon) pessoa (Sha) justamente (Ze) corrige (Sho) os pensamentos (Nen).' },
      { tipo: 'texto', conteudo: 'A caligrafia japonesa é uma escrita inspirada pelo Céu, pelos kami — logo, sagrada. Um mestre calígrafo eleva primeiro o pincel ao céu, e deve ele próprio estar cheio de ki e em equilíbrio, porque a energia reflecte-se no que faz. É uma lição interessante para um praticante de Reiki.' },
      { tipo: 'lista', titulo: 'O envio simples, passo a passo', itens: [
        'Uma fotografia, ou um papel com o nome de quem vai receber',
        'Desenha por cima o Hon Sha Ze Sho Nen, seguido do Sei He Ki',
        'Em cada símbolo, o mantra três vezes',
        'Fica com o papel entre as mãos, dez a quinze minutos',
        'Fecha, agradece, e desliga conscientemente a ligação'
      ]},
      { tipo: 'destaque', conteudo: 'O erro mais comum é não fechar. Alguns alunos ficam cansados depois de enviar, e quase sempre a causa é a mesma: ficaram ligados. Fechar é tão importante como abrir. Diz mesmo em voz alta: «está terminado».' },
      { tipo: 'texto', conteudo: 'O caderno de Reiki: um caderno só para isto, com o nome de cada pessoa escrito a lápis. Desenhas os símbolos, do terceiro para o primeiro, e fechas. Sempre que quiseres enviar, desenhas outra vez e pões as mãos sobre o caderno. Poupa tempo, dá histórico, e obriga-te a fechar cada caso.' },
      { tipo: 'texto', conteudo: 'A caixa de Reiki: cada pedido num papel, com o nome e a intenção. Deixas fluir Reiki para o papel e pões na caixa. Envias Reiki à caixa e ela distribui por todos. Quando um pedido estiver cumprido, queimas o papel.' },
      { tipo: 'lista', titulo: 'Conceitos a guardar', itens: [
        'A energia deve resultar para o Bem Supremo — nunca para um desejo ou proveito pessoal',
        'Pode tratar-se uma situação do passado, do presente ou do futuro',
        'Podem tratar-se várias pessoas ao mesmo tempo',
        'Pede sempre permissão; se não for possível, pede ao Eu Superior da pessoa'
      ]}
    ],
    praticar: {
      titulo: 'O envio cego',
      instrucoes: 'Combina com um colega de turma enviar-lhe Reiki a uma hora certa, sem lhe dizeres qual. No dia seguinte comparem notas. Monta também o teu caderno de Reiki e mantém-no 21 dias seguidos.',
      registo: true,
      registoPergunta: 'O que combinaste, e o que é que o teu colega relatou? Bateu certo com a hora?'
    },
    responder: [
      { pergunta: 'Queres um trabalho em concreto. Como envias?',
        opcoes: ['Peço aquele trabalho especificamente', 'Peço que a energia flua para que consiga um bom trabalho, para o meu Bem Supremo e o de todos', 'Envio ao patrão para ele me escolher'],
        correta: 1,
        feedback: 'Nem sempre o que queremos é o melhor para nós — por vezes desejamos muito algo que nos traria infelicidade. E trata também a tua predisposição para a entrevista: o teu aspecto e a emanação da tua aura contam.' },
      { pergunta: 'Ficaste cansado depois de um envio. Qual é a causa mais provável?',
        opcoes: ['Dei energia a mais', 'Não fechei — fiquei ligado', 'O símbolo estava mal desenhado'],
        correta: 1,
        feedback: 'É quase sempre isso. Fechar é tão importante como abrir: desenha o Cho Ku Rei para selar, desliga conscientemente, e lava as mãos.' },
      { pergunta: 'Não consegues pedir autorização a alguém para lhe enviar. O que fazes?',
        opcoes: ['Envio na mesma, a intenção é boa', 'Peço ao Eu Superior da pessoa que, caso ela aceite, a energia flua para ela', 'Não envio de todo'],
        correta: 1,
        feedback: 'Respeita-se sempre o livre-arbítrio. A fórmula que uso: «peço que a energia flua para o Bem Supremo da pessoa, para a altura que lhe seja mais conveniente».' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 6 ─── */
  {
    ordem: 6,
    titulo: 'Tratar outros, as técnicas e os limites',
    subtitulo: 'O que muda quando há alguém na marquesa',
    manual: 'Capítulos 12 a 16',
    duracao: '35 min',
    ler: [
      { tipo: 'texto', conteudo: 'Antes de começares, coloca os símbolos na palma das mãos para os activar: desenha do último para o primeiro e diz sempre o mantra. A prática de Reiki não é mecânica — deves sentir o que a energia te pede.' },
      { tipo: 'lista', titulo: 'As técnicas do Okuden, pelo nome', itens: [
        'Hatsurei Ho — emanar a energia universal, os oito passos',
        'Kenyoku Ho — o banho seco',
        'Joshin Kokyu Ho — a respiração que purifica',
        'Koki Ho — o tratamento pelo sopro',
        'Gyoshi Ho — o tratamento pelo olhar',
        'Hesso Chiryo Ho — o tratamento pelo umbigo',
        'Tanden Chiryo Ho e Gedoku Chiryo Ho — limpeza e desintoxicação',
        'Seikaku Kaizen Ho (Nentatsu) — melhorar o carácter, mensagem ao subconsciente'
      ]},
      { tipo: 'destaque', conteudo: 'A regra de ouro do Nentatsu: ao aplicá-lo noutra pessoa, tem a certeza de que a mensagem que envias é exactamente o que ela deseja — não o que tu achas que ela devia querer. É a diferença entre ajudar e impor.' },
      { tipo: 'lista', titulo: 'Os teus limites', itens: [
        'Quadros psiquiátricos em fase aguda',
        'Pessoas que te procuram em vez de procurarem médico',
        'Quem espera de ti previsões, milagres ou respostas definitivas',
        'Quem te procura para ter companhia, e não para receber Reiki'
      ]},
      { tipo: 'texto', conteudo: 'No fim, nunca faças diagnósticos nem digas «senti um bloqueio no teu fígado». Descreve o que sentiste em linguagem simples e devolve a interpretação à pessoa: «na zona do peito senti mais calor e demorei-me mais — fez-te algum sentido?» E avisa sempre da crise de cura.' },
      { tipo: 'destaque', conteudo: 'Uma frase para guardar: «Posso acompanhar-te com Reiki, e ao mesmo tempo acho importante que fales com o teu médico sobre isso.» Esta frase não te tira autoridade nenhuma. Dá-ta.' }
    ],
    praticar: {
      titulo: 'Antes e depois, em vinte sessões',
      instrucoes: 'Antes de cada sessão que deres, pede à pessoa um número de 0 a 10 para o seu desconforto. No fim, pede outra vez. Anota os dois. Ao fim de vinte sessões tens dados teus, e isso vale mais do que qualquer teoria.',
      registo: true,
      registoPergunta: 'Regista a sessão de hoje: números antes e depois, o que sentiste nas mãos, e o que a pessoa relatou. Sem interpretações.'
    },
    responder: [
      { pergunta: 'Achas que uma paciente devia deixar o marido, e ocorre-te usar o Nentatsu para isso.',
        opcoes: ['Faço, é para o bem dela', 'Não faço — a mensagem tem de ser o que ela deseja, não o que eu acho', 'Faço, mas aviso-a depois'],
        correta: 1,
        feedback: 'É a diferença entre ajudar e impor. O Nentatsu envia mensagens ao subconsciente de alguém — usá-lo para a tua opinião é uma violação, por muito bem-intencionada que seja.' },
      { pergunta: 'Uma pessoa diz-te que vai deixar a medicação porque o Reiki está a resultar.',
        opcoes: ['Fico contente pelo progresso', 'Digo-lhe com clareza que o Reiki não substitui medicina e encaminho-a ao médico', 'Não me compete opinar'],
        correta: 1,
        feedback: 'Compete-te, sim. Nunca aconselhes ninguém a interromper medicação, e quando alguém o disser por iniciativa própria, corrige. Um paciente teu que deixe a medicação é uma falha tua.' },
      { pergunta: 'Alguém quer marcar contigo todas as semanas porque diz que sem isso não funciona.',
        opcoes: ['É sinal de que o meu trabalho resulta', 'Não crio dependência — se alguém precisa de mim para funcionar, alguma coisa está errada', 'Aumento a frequência'],
        correta: 1,
        feedback: 'A dependência é um sinal de alarme na relação, não um elogio. Vale agora e vale para sempre, em qualquer nível.' }
    ]
  }
];

/* ═══ NÍVEL 3A — SHINPIDEN ═══════════════════════════════════════ */
const MODULOS_NIVEL_3A = [
  /* ─────────────────────────────────────────────────────────── 1 ─── */
  {
    ordem: 1,
    titulo: 'O que é o Shinpiden',
    subtitulo: 'Mistério e realização — e o que este nível vai mexer',
    manual: 'Capítulos 1 e 2',
    duracao: '20 min',
    ler: [
      { tipo: 'texto', conteudo: 'Shinpiden significa «mistérios» e «realização». O mistério não é um segredo escondido — é o que só se conhece vivendo. Podes ler o manual todo numa tarde e não teres aprendido nada. O 3A aprende-se com o tempo, e o tempo aqui não se acelera.' },
      { tipo: 'texto', conteudo: 'Muita gente confunde 3A com ser Mestre. Não é — e essa confusão faz mal a quem a tem, porque leva pessoas a ensinarem sem estarem preparadas. O 3A é o aprofundamento; o 3B é o mestrado.' },
      { tipo: 'lista', titulo: 'O que muda na prática', itens: [
        'O teu trabalho pessoal passa à frente do trabalho nos outros',
        'A meditação deixa de ser opcional e passa a ser o centro',
        'Começas a olhar para aquilo que costumas evitar olhar',
        'As sessões que dás mudam de qualidade, sem que mudes a técnica'
      ]},
      { tipo: 'texto', conteudo: 'É também neste nível que ficas habilitado a trabalhar como terapeuta de Reiki — a atender com regularidade, a cobrar, a assumir isto como ofício. É por isso que este nível insiste tanto no trabalho interior: quem atende muita gente precisa de estar inteiro.' },
      { tipo: 'destaque', conteudo: 'Um aviso honesto: este nível costuma mexer com as pessoas. Meses de maior agitação interior, decisões adiadas que vêm à tona, relações que se reajustam. Não é o Reiki a estragar nada — é aquilo que já lá estava a pedir atenção. Se te sentires em dificuldade, fala comigo, e se for preciso procura acompanhamento profissional. Não há mérito nenhum em sofrer sozinho.' }
    ],
    praticar: {
      titulo: 'O que é hoje o Reiki para ti',
      instrucoes: 'Escreve meia página. Sem consultar nada, sem citar ninguém, sem tentar acertar. Guarda o que escreveste e volta a lê-lo no fim deste nível.',
      registo: true,
      registoPergunta: 'O que é hoje o Reiki para ti? Escreve como te sai.'
    },
    responder: [
      { pergunta: 'Já posso chamar-me Mestre de Reiki?',
        opcoes: ['Sim, o 3A é o nível de Mestre', 'Não — posso dizer que tenho o Nível 3A; o título de Mestre é do 3B', 'Sim, se não sintonizar ninguém'],
        correta: 1,
        feedback: 'Dizer o contrário é enganar quem te procura. E leva pessoas a ensinarem sem preparação, que é o problema real por trás desta confusão.' },
      { pergunta: 'Ando mais sensível e mais irritadiço desde a sintonização.',
        opcoes: ['Correu alguma coisa mal', 'É frequente nos primeiros meses — mantenho a prática, durmo o que preciso, e falo com o meu Mestre', 'Devo parar a prática até passar'],
        correta: 1,
        feedback: 'É o que já lá estava a pedir atenção. Parar é o contrário do que ajuda. Se se prolongar ou pesar a sério, procura também acompanhamento profissional.' },
      { pergunta: 'O que é que o 3A te habilita a fazer, que o 3A não fazia antes?',
        opcoes: ['Sintonizar alunos', 'Trabalhar como terapeuta de Reiki', 'Dar formação'],
        correta: 1,
        feedback: 'Terapeuta, sim. Sintonizar e dar formação são do 3B — e não se faz nem para experimentar, nem à família, nem de graça.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 2 ─── */
  {
    ordem: 2,
    titulo: 'Os princípios, o Kensho e os símbolos mais além',
    subtitulo: 'A stupa, os cinco elementos e a história das alterações',
    manual: 'Capítulos 3 a 5',
    duracao: '30 min',
    ler: [
      { tipo: 'texto', conteudo: 'Neste nível aplicas os cinco princípios às tuas questões de vida, observas como as pessoas interagem contigo e como podes mudar o teu comportamento perante elas — e observas o mundo, e qual é o teu papel na mudança dele.' },
      { tipo: 'texto', conteudo: 'Trabalha também com os poemas do imperador Meiji e observa a tua verdadeira transformação da consciência: é a isso que se chama kensho, «ver a própria natureza».' },
      { tipo: 'lista', titulo: 'Os símbolos e os cinco elementos, na estrutura da stupa', itens: [
        'Vazio/Éter — o Absoluto, a nova consciência — o Reiki',
        'Vento/Ar — Nirvana, os cinco sentidos, corpo espiritual — Dai Ko Myo',
        'Fogo — iluminação, mente, corpo mental — Hon Sha Ze Sho Nen',
        'Água — prática, sensações, corpo emocional — Sei He Ki',
        'Terra — despertar, a consciência armazenada, físico — Cho Ku Rei'
      ]},
      { tipo: 'texto', conteudo: 'Não se sabe exactamente quando surgiram os símbolos. Mestres posteriores consideraram que mais chaves eram necessárias, modificaram alguns e inventaram outros. Assim surgiram sistemas com dezenas de símbolos que, como sempre, têm capacidade para curar tudo.' },
      { tipo: 'destaque', conteudo: 'O risco deste nível é começar a usar os quatro símbolos em tudo, sempre, por rotina. Isso não é aprofundar — é enfeitar. Pergunta-te antes de cada um: para quê? Se não souberes responder, não o uses.' },
      { tipo: 'destaque', conteudo: 'Podemos ter símbolos para tudo, chaves para todas as questões. Mas se não soubermos praticar cinco princípios, só por hoje, então poderemos não compreender a totalidade da arte secreta de convidar a felicidade.' }
    ],
    praticar: {
      titulo: 'Quinze minutos por dia',
      instrucoes: 'Cria uma rotina meditativa. Bastam quinze minutos de Joshin Kokyu Ho, a técnica da respiração. Se só conseguires cinco, faz cinco — mas faz todos os dias.',
      registo: true,
      registoPergunta: 'Há quantos dias seguidos estás a meditar, e o que mudou desde que começaste?'
    },
    responder: [
      { pergunta: 'O que é o kensho?',
        opcoes: ['Um símbolo', 'A transformação da consciência — ver a própria natureza', 'Uma técnica de respiração'],
        correta: 1,
        feedback: 'É o que os poemas do imperador servem para observar em ti. Não é um estado que se alcança de uma vez: é uma transformação que se vai notando.' },
      { pergunta: 'Um praticante usa sempre os quatro símbolos em todas as sessões.',
        opcoes: ['Está a aprofundar', 'Está a enfeitar — deve perguntar-se, antes de cada um, para quê', 'Está certo, quanto mais melhor'],
        correta: 1,
        feedback: 'Há sessões em que só usas um. O critério não é a fórmula — é o que a pessoa à tua frente precisa naquele dia.' },
      { pergunta: 'Alguém te diz que o seu sistema tem trinta símbolos e cura tudo.',
        opcoes: ['Deve ser melhor do que o nosso', 'Respeito, e mantenho os símbolos tradicionais se pratico Usui Reiki Ryoho', 'Digo-lhe que está errado'],
        correta: 1,
        feedback: 'Se alguém quiser criar outros métodos de cura, tem todo o espaço para o fazer — só não é preciso colocá-lo dentro do Usui Reiki Ryoho. E não fales mal de outras escolas: diferente não é errado.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 3 ─── */
  {
    ordem: 3,
    titulo: 'Dai Ko Myo — a grande luz brilhante',
    subtitulo: 'Origem, traço e mantra',
    manual: 'Capítulos 6 a 8',
    duracao: '30 min',
    ler: [
      { tipo: 'texto', conteudo: 'O nome costuma traduzir-se por «grande luz brilhante». Dai é o que é grande — divindade, sabedoria da cabeça, luz de um iluminado. Koo é o brilho, a luz do Sol. Myo são o Sol e a Lua juntos: a eterna luz.' },
      { tipo: 'texto', conteudo: 'Parece estar ligado à divindade Fudo Myo, guardião da luz, que usa um medalhão que significa «chave para a luz». E também a Dainichi Nyorai, o grande buda da iluminação universal, que representa o universo na sua totalidade.' },
      { tipo: 'destaque', conteudo: 'Mas tudo isto serve apenas para compreenderes a origem. No Reiki, o Mestre Usui não fala em religião nem em espiritualidade — por isso compreende o Dai Ko Myo unicamente como energia. Se tens uma crença, traz-a. Se não tens, também está bem.' },
      { tipo: 'lista', titulo: 'Para que serve', itens: [
        'Quando queres iluminação para ti',
        'Enviar luz espiritual a outros',
        'Protecção',
        'Clareza de mente e de espírito',
        'Meditação no caminho interior, à procura do teu próprio Eu'
      ]},
      { tipo: 'texto', conteudo: 'São três caracteres japoneses uns por baixo dos outros, dezassete traços ao todo. De cima para baixo, e dentro de cada carácter da esquerda para a direita. Horizontais antes de verticais, exterior antes de interior, e a base fecha-se no fim.' },
      { tipo: 'texto', conteudo: 'Há vários Dai Ko Myo: o tradicional, que recebes aqui; o tibetano, criado por Arthur Robertson e divulgado por William Rand, que só se ensina no 3B; e derivações rodadas à direita, muito usadas no sistema Essencial. Nenhum é melhor — mas não são a mesma coisa, e não devem ser apresentados como se fossem.' }
    ],
    praticar: {
      titulo: 'As quatro semanas do desenho',
      instrucoes: 'Uma semana para o dai, uma para o ko, duas para o myo, que é o mais trabalhoso. Desenha à mão, em papel, todos os dias. Na quinta semana faz o símbolo inteiro de uma assentada e repara como já não pensas nos traços.',
      registo: true,
      registoPergunta: 'Em que carácter vais, e o que está a custar mais no traço?'
    },
    responder: [
      { pergunta: 'Um aluno pergunta se o Dai Ko Myo é budista.',
        opcoes: ['Sim, é preciso ser budista para o usar', 'Tem raízes ligadas a figuras budistas, mas no Reiki compreende-se unicamente como energia', 'Não tem origem nenhuma conhecida'],
        correta: 1,
        feedback: 'A prática não te pede que mudes de fé nem que adoptes nenhuma. É assim que o Mestre Usui o ensinava, e é assim que o ensinamos.' },
      { pergunta: 'Viste noutra escola um Dai Ko Myo diferente do teu. Qual é o certo?',
        opcoes: ['O meu', 'O deles', 'Os dois existem e funcionam para quem foi sintonizado com eles'],
        correta: 2,
        feedback: 'O que recebes aqui é o tradicional, dos três kanji. O tibetano e as suas derivações vêm de outra linha. Na caligrafia oriental a escrita correcta importa — mas isso não invalida os novos, apenas não são a mesma coisa.' },
      { pergunta: 'Não consegues visualizar o símbolo.',
        opcoes: ['Então não posso usá-lo', 'Desenho-o num papel e olho para ele, ou limito-me ao mantra e ao sentir', 'Tenho de treinar até conseguir visualizar'],
        correta: 1,
        feedback: 'Muita gente não visualiza, e não é defeito nenhum. A intenção é que conta, não a nitidez da imagem.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 4 ─── */
  {
    ordem: 4,
    titulo: 'Aplicar o Dai Ko Myo',
    subtitulo: 'Na sessão, na meditação e no dia a dia',
    manual: 'Capítulos 9 e 10',
    duracao: '30 min',
    ler: [
      { tipo: 'lista', titulo: 'A ordem dos símbolos, conforme o caso', itens: [
        'Problemas físicos: Dai Ko Myo, depois Cho Ku Rei',
        'Problemas emocionais: Dai Ko Myo, Sei He Ki, Cho Ku Rei',
        'Processos mentais, passado ou futuro: Dai Ko Myo, Hon Sha Ze Sho Nen, Sei He Ki, Cho Ku Rei'
      ]},
      { tipo: 'destaque', conteudo: 'Sendo um símbolo que trabalha no campo espiritual, nem sempre é recomendado aplicá-lo logo na primeira ou segunda sessão a alguém. Tem sempre em atenção a capacidade de integração de quem recebe.' },
      { tipo: 'texto', conteudo: 'A meditação com o Dai Ko Myo é a prática central deste nível. Vinte minutos, de preferência de manhã: Gassho, cinco minutos de respiração, o símbolo grande acima da cabeça, mantra três vezes, e ficas a olhar para ele sem esforço. Quando se desfizer — e vai desfazer-se — refá-lo sem te censurares. É isso o exercício.' },
      { tipo: 'texto', conteudo: 'No fim, deixa o símbolo dissolver-se numa luz acima da cabeça, deixa essa luz descer pelo corpo até aos pés, e leva a atenção ao tanden alguns minutos. É aqui que se arruma a energia que sobra — não a deixes na cabeça.' },
      { tipo: 'destaque', conteudo: 'Depois de um trabalho com este símbolo a pessoa pode ficar com sensação de tontura. Enraíza-a sempre: mãos nos pés, ou a prática de enraizamento do Nível 1. Não deixes ninguém levantar-se da marquesa com a cabeça no ar.' },
      { tipo: 'texto', conteudo: 'No dia a dia: ao levantares-te, banho seco e chuva de Reiki, liga-te ao Reiki, recita os princípios, e desenha um grande Dai Ko Myo à tua frente com o mantra três vezes. Sente a vibração e pede-lhe o que precisares para o dia — orientação, compaixão, calma, sabedoria.' }
    ],
    praticar: {
      titulo: 'Os 21 dias com o Dai Ko Myo',
      instrucoes: 'Autotratamento e meditação com o Dai Ko Myo, todos os dias, durante vinte e um dias. Escreve uma palavra por dia. Se um dia falhares, retomas no seguinte sem recomeçar a contagem.',
      registo: true,
      registoPergunta: 'Em que dia vais, e qual é a palavra de hoje?'
    },
    responder: [
      { pergunta: 'Primeira sessão com uma pessoa nova. Usas logo o Dai Ko Myo?',
        opcoes: ['Sim, é o símbolo mais forte', 'Tenho em atenção a capacidade de integração dela — nem sempre é recomendado logo na primeira ou segunda', 'Nunca o uso nos outros'],
        correta: 1,
        feedback: 'Trabalha no campo mais elevado da pessoa. Ir logo a fundo com alguém que ainda não te conhece nem conhece o Reiki pode ser de mais.' },
      { pergunta: 'Uma pessoa levanta-se da marquesa com tonturas depois de um trabalho com o Dai Ko Myo.',
        opcoes: ['É normal, vai passar', 'Enraízo-a: mãos nos pés, ou a prática de enraizamento', 'Dou-lhe mais Reiki na cabeça'],
        correta: 1,
        feedback: 'Não deixes ninguém sair com a cabeça no ar. Enraizar é a outra metade do trabalho — e mais Reiki na cabeça só piorava.' },
      { pergunta: 'Na meditação, o símbolo desfaz-se ao fim de poucos segundos.',
        opcoes: ['Estou a fazer mal', 'Refaço-o com calma, sem me censurar — é isso o exercício', 'Devo usar um papel em vez de visualizar'],
        correta: 1,
        feedback: 'O exercício não é manter a imagem perfeita: é voltar a trazê-la sem drama. É a mesma lição do Gassho do Nível 1.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 5 ─── */
  {
    ordem: 5,
    titulo: 'Traumas, técnicas e limpeza profunda',
    subtitulo: 'Os princípios como ferramenta de cura, o Jaki Kiri e o Antahkarana',
    manual: 'Capítulos 11 a 14',
    duracao: '35 min',
    ler: [
      { tipo: 'texto', conteudo: 'A partir deste nível vais notar que muitas situações começam a surgir em ti — bloqueios, traumas, lembranças dolorosas. Não é porque estejas a fazer algo errado: é a tua prática a levar-te a conhecer-te melhor.' },
      { tipo: 'lista', titulo: 'Os cinco princípios aplicados a um trauma', itens: [
        'Só por hoje — preciso de estar no presente para encarar e reflectir. Já não estou no passado.',
        'Sou calmo — se a minha mente for um lago sereno onde se espelha a lua, de que forma este trauma o perturba?',
        'Confio — tenho força em mim para observar e ultrapassar a situação?',
        'Sou grato — consigo compreender o ensinamento que este trauma trouxe, e de que forma não o farei a outros?',
        'Trabalho honestamente — de que forma me vou aplicar na resolução positiva disto?',
        'Sou bondoso — queremos justiça, mas esse sentimento leva-nos por vezes à exaustão. A justiça terá de começar em nós, assim como a bondade.'
      ]},
      { tipo: 'destaque', conteudo: 'Aplicar a filosofia de vida a uma questão traumática ajuda-nos a desenvolver uma essência firme como uma montanha e, ao mesmo tempo, flexível como um bambu.' },
      { tipo: 'destaque', conteudo: 'Onde está o limite, e isto é sério: esta é uma prática de acolhimento, não é psicoterapia. Nem quando a fazes em ti, nem quando a conduzes noutra pessoa. Se o que vier for grande de mais, ou te deixar em sofrimento sério, procura acompanhamento profissional. O Reiki acompanha muito bem esse processo. Não o faz sozinho.' },
      { tipo: 'texto', conteudo: 'Jaki Kiri Joka Ho: jaki é energia negativa, kiri cortar, joka limpeza. Gassho e Reiji-Ho, pegas no objecto, respiração profunda, energia no tanden, e — com a respiração presa — três golpes rápidos por cima, de dentro para fora, a dois ou cinco centímetros. O terceiro termina em cima do objecto. Só então soltas o ar, e energizas com Cho Ku Rei.' },
      { tipo: 'destaque', conteudo: 'Prende mesmo a respiração. Segundo o Mestre Aoki, se não o fizeres ao longo dos três cortes, corres o risco de contaminação com a energia que estás a transmutar. É o pormenor mais pequeno e o mais importante desta técnica.' },
      { tipo: 'texto', conteudo: 'O Antahkarana é de origem tibetana e não faz parte dos ensinamentos originais do Usui Reiki Ryoho. Ensino-o porque é útil e porque faz parte do meu percurso — mas não o confundas com os quatro símbolos. Ao contrário deles, trabalha pela simples presença: basta estar no espaço.' }
    ],
    praticar: {
      titulo: 'A carta que não se envia',
      instrucoes: 'Escreve a alguém com quem tenhas uma questão por resolver. Diz tudo, sem filtro. Depois dá Reiki à carta com os quatro símbolos, e queima-a ou guarda-a — mas não a envies. Faz a seguir a prática de reconciliação: mãos no peito, Dai Ko Myo, Sei He Ki, e fica sem tentar resolver nada.',
      registo: true,
      registoPergunta: 'Duas ou três linhas sobre o que aconteceu durante a prática. Uma palavra já serve.'
    },
    responder: [
      { pergunta: 'Uma paciente traz-te um trauma antigo e grave, e começa a desmoronar-se.',
        opcoes: ['Continuo, o Reiki resolve', 'Acolho, fico presente, e encaminho para acompanhamento profissional', 'Interrompo e mando-a embora'],
        correta: 1,
        feedback: 'Isto é uma prática de acolhimento, não é psicoterapia. Saber encaminhar é uma competência, não uma falha — e o Reiki acompanha muito bem esse processo, ao lado de quem é da área.' },
      { pergunta: 'No Jaki Kiri Joka Ho, qual é o pormenor que não se pode falhar?',
        opcoes: ['Os três golpes serem rápidos', 'Manter a respiração presa ao longo dos três cortes', 'O objecto estar na mão esquerda'],
        correta: 1,
        feedback: 'É o que impede a contaminação com a energia que estás a transmutar. Depois energizas com Cho Ku Rei, para substituir o que retiraste.' },
      { pergunta: 'Um aluno teu diz que o Antahkarana é um símbolo do Reiki tradicional.',
        opcoes: ['Confirmo', 'Corrijo com clareza: é tibetano, não faz parte do Usui Reiki Ryoho', 'Não digo nada para não o desiludir'],
        correta: 1,
        feedback: 'Há escolas que o apresentam como Reiki tradicional, e não é. Dizer a verdade sobre a origem das coisas não lhes tira valor nenhum — dá-lhes.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 6 ─── */
  {
    ordem: 6,
    titulo: 'A sessão, o trabalho interior e a ética',
    subtitulo: 'O que muda em ti, e o que ainda não podes fazer',
    manual: 'Capítulos 15 a 19',
    duracao: '30 min',
    ler: [
      { tipo: 'texto', conteudo: 'A técnica não muda muito em relação ao Nível 2. O que muda és tu — e nota-se na qualidade do silêncio que consegues sustentar. Fala menos do que falavas. Confia mais no silêncio.' },
      { tipo: 'destaque', conteudo: 'Alunos deste nível dizem-me muitas vezes a mesma coisa: «faço exactamente o mesmo e as pessoas saem de lá diferentes». É isso. O que mudou não foi a técnica — foi quem está a segurar as mãos.' },
      { tipo: 'texto', conteudo: 'O trabalho interior é a parte que não se ensina com técnicas. Toda a gente tem zonas que não visita: a mágoa antiga, a decisão adiada, a relação que se arrasta. No 3A, essas zonas costumam começar a fazer barulho. A prática é simples de descrever e difícil de fazer: em vez de arranjares explicação, ficas.' },
      { tipo: 'texto', conteudo: 'O lado sombra é o trabalho dos meses seguintes: olhar para aquilo em ti que não gostas de admitir. A inveja que sentiste, a vontade de que alguém falhasse, o orgulho, a preguiça. Não para te castigares — para deixares de gastar energia a esconder.' },
      { tipo: 'destaque', conteudo: 'Um terapeuta que não conhece a própria sombra projecta-a nos pacientes. É por isso que este trabalho vem antes do mestrado, e não depois.' },
      { tipo: 'lista', titulo: 'Ética de quem se aproxima do mestrado', itens: [
        'És terapeuta, não és Mestre — dizer o contrário é enganar quem te procura',
        'Não sintonizes ninguém. Nem para experimentar, nem a família, nem de graça',
        'Não uses o nível como argumento de venda',
        'Reconhece o que não é para ti — saber encaminhar é competência',
        'Cuida de ti primeiro: um terapeuta esgotado acaba por dar do que não tem',
        'Respeita outras escolas'
      ]}
    ],
    praticar: {
      titulo: 'Vinte sessões registadas',
      instrucoes: 'Regista vinte sessões: data, duração, o que sentiste, o que a pessoa relatou. Sem interpretações. Ao fim das vinte, relê tudo de seguida — e repara no que se repete.',
      registo: true,
      registoPergunta: 'Regista a sessão de hoje: o que sentiste, não o que concluíste.'
    },
    responder: [
      { pergunta: 'Um amigo pede-te para o sintonizares no Nível 1, só para experimentar.',
        opcoes: ['Faço, é só uma experiência', 'Não faço — não tenho os símbolos nem a preparação, e isso é do 3B', 'Faço se ele não contar a ninguém'],
        correta: 1,
        feedback: 'Nem para experimentar, nem à família, nem de graça. Abrir o canal de alguém fica com essa pessoa para o resto da vida — não é coisa que se faça por simpatia.' },
      { pergunta: 'Porque é que o trabalho sobre o lado sombra vem antes do mestrado?',
        opcoes: ['Para o aluno sofrer menos depois', 'Porque um terapeuta que não conhece a própria sombra projecta-a nos pacientes', 'É indiferente, pode ser depois'],
        correta: 1,
        feedback: 'É a razão de ser deste nível inteiro. Quem vai ensinar e sintonizar tem de ter feito este trabalho primeiro — senão leva-o para dentro da sala de aula.' },
      { pergunta: 'Porque é que queres o 3B?',
        opcoes: ['Pelo estatuto e pelo preço das formações', 'Para partilhar aquilo que me fez bem', 'Para ter mais um certificado'],
        correta: 1,
        feedback: 'Se a resposta tiver a ver com estatuto, preço ou certificados, vale a pena esperar. Se tiver a ver com partilhar, estás no caminho. É a pergunta que vale a pena fazeres-te mais do que uma vez.' }
    ]
  }
];

/* ═══ NÍVEL 3B — GOKUKAIDEN ══════════════════════════════════════ */
const MODULOS_NIVEL_3B = [
  /* ─────────────────────────────────────────────────────────── 1 ─── */
  {
    ordem: 1,
    titulo: 'O que é ser Mestre',
    subtitulo: 'E os seis símbolos com que passas a trabalhar',
    manual: 'Capítulos 1 e 4',
    duracao: '25 min',
    ler: [
      { tipo: 'texto', conteudo: 'A palavra assusta e devia assustar. Em português, «Mestre» soa a quem sabe tudo. No Reiki quer dizer outra coisa: quem está habilitado a transmitir. Nada mais, e já é muito.' },
      { tipo: 'texto', conteudo: 'Não passas a ser melhor pessoa por teres o 3B. Não deixas de ter dias maus, dúvidas ou zangas. O que ganhas é a capacidade de abrir em alguém aquilo que um dia abriram em ti — e a obrigação de o fazer com cuidado.' },
      { tipo: 'lista', titulo: 'O que este nível te permite', itens: [
        'Sintonizar alunos nos níveis 1, 2, 3A e 3B',
        'Dar formação e emitir certificados em nome da escola',
        'Usar os seis símbolos',
        'Continuar a atender como terapeuta, agora com mais ferramentas'
      ]},
      { tipo: 'destaque', conteudo: 'O que não te obriga: ter o 3B não te obriga a ensinar. Há mestres excelentes que nunca deram uma formação e trabalham só como terapeutas. Se sentires que ainda não é o momento, não é. A pressa de ensinar costuma vir do sítio errado.' },
      { tipo: 'lista', titulo: 'Os seis símbolos, e a ordem de elevar um espaço', itens: [
        'Raku — fixar, separar, enraizar (3B)',
        'Dai Ko Myo tibetano — sintonizações, sopro violeta (3B)',
        'Dai Ko Myo Usui — plano espiritual (3A)',
        'Hon Sha Ze Sho Nen — distância, passado e futuro (2)',
        'Sei He Ki — emoção e harmonia (2)',
        'Cho Ku Rei — força, limpeza, selo (1)'
      ]},
      { tipo: 'destaque', conteudo: 'O que os alunos vão aprender contigo: muito menos do que dizes, e muito mais do que fazes. Vão aprender pela forma como recebes, pelo cuidado com que preparas a sala, pela paciência com que repetes o que já explicaste três vezes. A técnica é a parte fácil.' }
    ],
    praticar: {
      titulo: 'Elevar o espaço, três dias seguidos',
      instrucoes: 'Escolhe a divisão onde darás formação ou atenderás. Durante três dias, uma vez por dia, eleva o padrão do espaço com os seis símbolos pela ordem do mais subtil ao mais denso, cada um do teu tamanho, com o mantra três vezes.',
      registo: true,
      registoPergunta: 'Que diferença notaste no espaço do primeiro para o terceiro dia?'
    },
    responder: [
      { pergunta: 'No Reiki, Mestre quer dizer…',
        opcoes: ['Quem sabe tudo sobre Reiki', 'Quem está habilitado a transmitir', 'Quem tem mais anos de prática'],
        correta: 1,
        feedback: 'Nada mais — e já é muito. Não passas a ser melhor pessoa, nem deixas de ter dias maus. Ganhas a capacidade de abrir em alguém o que abriram em ti.' },
      { pergunta: 'Tens o 3B mas não te sentes preparado para dar formação.',
        opcoes: ['Tenho de dar na mesma, senão o nível perde-se', 'Não sou obrigado a ensinar — há mestres que só atendem', 'Devo devolver o certificado'],
        correta: 1,
        feedback: 'Se sentires que ainda não é o momento, não é. A pressa de ensinar costuma vir do sítio errado — ego, dinheiro, ou medo de parecer que não se avança.' },
      { pergunta: 'Qual é a ordem de elevar um espaço?',
        opcoes: ['Do Cho Ku Rei para o Raku', 'Do Raku para o Cho Ku Rei — do mais subtil ao mais denso', 'A ordem é indiferente'],
        correta: 1,
        feedback: 'Raku, Dai Ko Myo tibetano, Dai Ko Myo Usui, Hon Sha Ze Sho Nen, Sei He Ki, Cho Ku Rei. Abre-se em cima e fecha-se em baixo.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 2 ─── */
  {
    ordem: 2,
    titulo: 'Dai Ko Myo tibetano e Raku',
    subtitulo: 'Os dois símbolos que só existem neste nível',
    manual: 'Capítulos 2 e 3',
    duracao: '25 min',
    ler: [
      { tipo: 'texto', conteudo: 'Estes dois vêm do mestrado em Reiki Essencial e não pertencem ao núcleo original do Usui Reiki Ryoho. Diz isto aos teus alunos com naturalidade: escolas que apresentam acrescentos como se fossem tradição perdem credibilidade quando alguém descobre — e alguém descobre sempre.' },
      { tipo: 'texto', conteudo: 'O Dai Ko Myo tibetano é outro desenho, com o mesmo nome do que recebeste no 3A, que entrou pela via ocidental e tibetana. São duas versões e ambas funcionam, desde que tenhas sido sintonizado com elas. A tibetana é mais simples de memorizar, e é a que se usa no momento da sintonização — vai no sopro violeta.' },
      { tipo: 'texto', conteudo: 'O Raku é o símbolo que fecha. Representa a serpente adormecida enrolada na base da coluna: as curvas correspondem aos centros energéticos, e a espiral à base corresponde ao primeiro. Também lhe chamamos serpente de fogo, e nos apontamentos aparece abreviado como SF.' },
      { tipo: 'lista', titulo: 'Para que serve o Raku', itens: [
        'Fixar a energia no aluno, no fim da sintonização — é a sua função principal',
        'Separar o campo do Mestre do campo do aluno',
        'Enraizar quem está desligado da realidade, disperso ou em choque',
        'Limpar o canal ao longo da coluna e desbloquear o topo da cabeça'
      ]},
      { tipo: 'texto', conteudo: 'No budismo tibetano este símbolo usa-se de baixo para cima. No Reiki usa-se de cima para baixo — do topo da cabeça em direcção aos pés — porque o que queremos é trazer a energia universal para dentro do corpo e ancorá-la.' },
      { tipo: 'destaque', conteudo: 'Não te esqueças do Raku. É o erro mais comum de quem começa a sintonizar: fazer tudo bem e esquecer o fecho. O aluno fica ligado ao Mestre e ambos saem de lá estranhos. O Raku é o ponto final da frase.' }
    ],
    praticar: {
      titulo: 'O traço dos dois símbolos',
      instrucoes: 'Desenha o Dai Ko Myo tibetano e o Raku à mão, em papel, todos os dias durante duas semanas. No Raku, presta atenção ao sentido: horizontal sobre a cabeça, ondulada a descer ao longo da coluna, espiral a enrolar na base.',
      registo: true,
      registoPergunta: 'Qual dos dois te está a sair mais natural, e porquê?'
    },
    responder: [
      { pergunta: 'Um aluno pergunta de onde vêm estes dois símbolos.',
        opcoes: ['Digo que são do Mestre Usui', 'Digo com naturalidade que vêm do Reiki Essencial e não do núcleo original', 'Mudo de assunto'],
        correta: 1,
        feedback: 'O que é Usui é Usui; o que veio depois, veio depois. Uma escola que explica as suas opções não tem nada a esconder.' },
      { pergunta: 'Fizeste a sintonização toda bem e esqueceste-te do Raku no fim.',
        opcoes: ['Não faz mal, o essencial já foi feito', 'O aluno fica ligado a mim — tenho de fazer o fecho', 'Faço na próxima vez'],
        correta: 1,
        feedback: 'É o erro mais comum de quem começa. O objectivo é ligar o aluno directamente à fonte, e não a ti. Sem o Raku, ambos saem de lá estranhos.' },
      { pergunta: 'Em que sentido se traça o Raku no Reiki?',
        opcoes: ['De baixo para cima, como no budismo tibetano', 'De cima para baixo, do topo da cabeça em direcção aos pés', 'Da esquerda para a direita'],
        correta: 1,
        feedback: 'Porque o que queremos é trazer a energia universal para dentro do corpo e ancorá-la. O sentido não é um detalhe: muda o que a técnica faz.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 3 ─── */
  {
    ordem: 3,
    titulo: 'A postura e a anatomia de uma sintonização',
    subtitulo: 'Hui Yin, língua, respiração violeta — e as quatro partes',
    manual: 'Capítulos 5 a 7',
    duracao: '30 min',
    ler: [
      { tipo: 'texto', conteudo: 'Durante uma sintonização a energia tem de circular em circuito fechado no teu corpo, sem se dispersar. Três gestos garantem isso, e mantêm-se do princípio ao fim: o Hui Yin contraído, a língua no palato, e a respiração violeta.' },
      { tipo: 'texto', conteudo: 'O Hui Yin é o ponto do períneo. Contrai-o suavemente, como quem segura a urina, e mantém — é uma contracção leve e sustentada, não um aperto. Se te cansares e soltares, volta a contrair sem drama. A língua pousa no céu da boca, atrás dos dentes de cima. Juntos, fecham o circuito entre os canais da frente e das costas.' },
      { tipo: 'lista', titulo: 'A respiração violeta, passo a passo', itens: [
        'Com o Hui Yin contraído e a língua no palato, inspira pelo nariz',
        'Luz branca a entrar pelo topo da cabeça e a descer até ao tanden',
        'Aí, deixa essa luz tornar-se violeta e expandir-se',
        'Faz subir a luz violeta pelas costas até ao topo da cabeça',
        'Desenha mentalmente o Dai Ko Myo tibetano dentro dessa luz',
        'Quando soprares no aluno, é esta luz com o símbolo que sai'
      ]},
      { tipo: 'lista', titulo: 'As quatro partes de qualquer sintonização', itens: [
        'I · Abertura — abre-se o coronário e faz-se descer a energia',
        'II · Transmissão — os símbolos são colocados nas mãos e no corpo',
        'III · Fecho — sela-se e separa-se o aluno do Mestre',
        'IV · Bênção — liberta-se a energia residual sobre o aluno'
      ]},
      { tipo: 'destaque', conteudo: 'O que faz a diferença entre níveis é só uma coisa: quais os símbolos que colocas nas mãos do aluno. Todo o resto do procedimento é igual. Guarda isto e metade da tua insegurança desaparece.' },
      { tipo: 'destaque', conteudo: 'Treina antes de precisares. Pratica a respiração violeta sozinho, em casa, durante semanas. No dia em que tiveres um aluno à tua frente não queres estar a pensar em nada disto.' }
    ],
    praticar: {
      titulo: 'A postura, todos os dias',
      instrucoes: 'Hui Yin contraído e língua no palato, cinco minutos por dia, durante duas semanas, até deixar de exigir atenção. Depois acrescenta a respiração violeta: dez minutos por dia, durante um mês.',
      registo: true,
      registoPergunta: 'Já consegues manter a postura sem pensar nela? E a luz já se torna violeta com facilidade no tanden?'
    },
    responder: [
      { pergunta: 'A meio de uma sintonização soltas o Hui Yin sem querer.',
        opcoes: ['Interrompo tudo e recomeço', 'Volto a contrair, sem drama, e continuo', 'Termino sem ele'],
        correta: 1,
        feedback: 'Com a prática deixa de exigir atenção. Enquanto não chega lá, corrige e segue — o que não pode faltar é a intenção.' },
      { pergunta: 'O que muda o procedimento de um nível para outro?',
        opcoes: ['Quase tudo', 'Só os símbolos que colocas nas mãos do aluno', 'A ordem das quatro partes'],
        correta: 1,
        feedback: 'Mais dois pormenores: no Nível 1 tocam-se também os pés, para ancorar; e no 3B dizes ao aluno, com todas as letras, que passa a poder sintonizar.' },
      { pergunta: 'Para que serve a língua no palato?',
        opcoes: ['Para não falares durante o processo', 'Com o Hui Yin, fecha o circuito entre os canais da frente e das costas', 'Para acalmar a respiração'],
        correta: 1,
        feedback: 'São os dois gestos juntos que impedem a energia de se perder. Um sem o outro não fecha o circuito.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 4 ─── */
  {
    ordem: 4,
    titulo: 'A sintonização presencial, passo a passo',
    subtitulo: 'As quatro partes, em detalhe',
    manual: 'Capítulos 8 a 12',
    duracao: '40 min',
    ler: [
      { tipo: 'texto', conteudo: 'Prepara a sala arejada e em silêncio, eleva o espaço com os seis símbolos, e explica ao aluno o que vai acontecer: que vai sentir toques na cabeça, nos ombros, nas mãos e nos pés, e que não tem de fazer nada. Ele senta-se de costas direitas, mãos em prece ao peito, olhos fechados, sem sapatos.' },
      { tipo: 'lista', titulo: 'Parte I — Abertura, por trás do aluno', itens: [
        'Invoca a protecção em que acreditas e afirma o nível que vais transmitir',
        'Dai Ko Myo e Cho Ku Rei nas tuas palmas, com os mantras',
        'Um Dai Ko Myo do teu tamanho à tua frente, e um Cho Ku Rei também',
        'Cho Ku Rei em cada um dos teus sete chakras, de baixo para cima',
        'Raku nas costas do aluno, do topo da cabeça à base da coluna',
        'Mãos no topo da cabeça dele até sentires harmonia',
        'Respiração violeta e sopro violeta sobre o coronário',
        'Acompanha o símbolo a descer até à base do cérebro, com a mão dominante',
        'Repete com o Dai Ko Myo tradicional, o Sei He Ki e o Hon Sha Ze Sho Nen',
        'Leva as mãos dele, em prece, ao topo da cabeça, e desenha aí o símbolo do nível'
      ]},
      { tipo: 'lista', titulo: 'Parte II — Transmissão, pela frente', itens: [
        'Segura-lhe as mãos abertas como um livro, à altura do cardíaco',
        'Desenha o símbolo do nível sobre as palmas, com o mantra',
        'Toca três vezes, suavemente, as palmas dele',
        'Fecha-lhe as mãos e sopra, conduzindo ao plexo, à testa, ao topo, e de volta às mãos',
        'Só no Nível 1: toca também os pés, para ancorar'
      ]},
      { tipo: 'lista', titulo: 'Parte III — Fecho, por trás', itens: [
        'Mãos nos ombros; olha para baixo através do coronário até ao chakra básico',
        'Visualiza a energia a formar uma bola de fogo vermelha na base da coluna',
        'Afirmação positiva três vezes, dirigida a ele pelo nome',
        'Polegares na base do crânio; visualiza uma porta a abrir',
        'Cho Ku Rei lá dentro, mantra três vezes, e a porta a fechar e a soldar',
        'Sela dizendo o teu nome e o nível que acabaste de transmitir',
        'Raku entre ti e o aluno, para separar os campos — não saltes este passo'
      ]},
      { tipo: 'lista', titulo: 'Parte IV — Bênção, pela frente', itens: [
        'Mãos à altura da cintura, palmas viradas para ele',
        'Solta o Hui Yin e a língua, e expira devagar libertando a energia residual',
        'Pede-lhe que respire devagar e abra os olhos quando estiver pronto',
        'Dá-lhe água e alguns minutos de silêncio antes de falarem'
      ]},
      { tipo: 'destaque', conteudo: 'Adapta sempre a afirmação do fecho ao nível que estás mesmo a transmitir. Parece óbvio e é o erro mais comum de quem começa: repetir «Nível 1» numa sintonização de Nível 2, por estar a seguir o manual à letra.' }
    ],
    praticar: {
      titulo: 'O ensaio completo, dez vezes',
      instrucoes: 'Faz o procedimento das quatro partes com uma almofada ou um boneco sentado numa cadeira, do princípio ao fim, cinco vezes com o manual ao lado e depois cinco sem ele. Sem pressa e sem vergonha. Depois faz a um familiar que já tenha o nível, sem transmitir nada, só para treinares com uma pessoa à frente.',
      registo: true,
      registoPergunta: 'Quantos ensaios já fizeste, e em que passo é que ainda hesitas?'
    },
    responder: [
      { pergunta: 'Enganaste-te num gesto a meio da sintonização.',
        opcoes: ['Está estragada, tenho de repetir noutro dia', 'Retomo de onde estava, ou repito a parte inteira — a intenção sustenta o processo', 'Continuo e não digo nada'],
        correta: 1,
        feedback: 'Não é grave. O que não pode faltar é a intenção clara do nível que estás a transmitir. Os Guias do Reiki sabem o que fazer.' },
      { pergunta: 'Estás a sintonizar quatro pessoas ao mesmo tempo. Como organizas?',
        opcoes: ['Faço as quatro partes numa pessoa, depois passo à seguinte', 'Repito cada parte em todos antes de passar à parte seguinte', 'Tanto faz'],
        correta: 1,
        feedback: 'Parte I em todos, depois Parte II em todos, e assim por diante. E quatro a seis pessoas é o número em que ainda consegues dar atenção a cada uma.' },
      { pergunta: 'Qual é o único nível em que se tocam também os pés?',
        opcoes: ['O 3B', 'O Nível 1', 'Todos'],
        correta: 1,
        feedback: 'Para ancorar quem está a abrir o canal pela primeira vez. É um dos dois pormenores que mudam entre níveis.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 5 ─── */
  {
    ordem: 5,
    titulo: 'À distância e online',
    subtitulo: 'As três formas, a meditação guiada e as duas metodologias',
    manual: 'Capítulos 13 a 14C',
    duracao: '35 min',
    ler: [
      { tipo: 'texto', conteudo: 'Muita gente é contra a sintonização à distância. Eu também era. O que me fez mudar foi isto: se aceitamos que se envia Reiki a alguém do outro lado do país — e aceitamos, porque o praticamos desde o Nível 2 — não há razão coerente para recusar o mesmo numa sintonização. Dizer que é possível enviar tratamentos mas não iniciações seria limitar a acção do Reiki por uma regra que inventámos nós.' },
      { tipo: 'lista', titulo: 'As três formas de o fazer à distância', itens: [
        'Videochamada — o aluno na câmara, tu a guiar por voz enquanto sintonizas',
        'Chamada de voz — o mesmo, sem imagem',
        'Hora marcada sem chamada — ele senta-se e pede a ligação; tu fazes do teu lado'
      ]},
      { tipo: 'texto', conteudo: 'Nas duas primeiras há uma coisa que a terceira não tem: vais guiando o aluno enquanto sintonizas. É uma meditação conduzida por ti, ao mesmo tempo que fazes o procedimento — pô-lo no sítio, o enraizamento, dizer onde estás em cada parte, a afirmação pelo nome em voz alta, e o silêncio no fim antes de desligar.' },
      { tipo: 'destaque', conteudo: 'Guiar não é encher de palavras. Fala pouco e devagar. O aluno precisa de saber que não está sozinho e em que ponto vai o processo — não de um comentário contínuo. O silêncio entre as tuas frases é onde ele sente.' },
      { tipo: 'lista', titulo: 'Do teu lado: duas técnicas, ambas válidas', itens: [
        'Do substituto — uma almofada ou boneco sentado numa cadeira, programado para representar o aluno',
        'Da visualização — formas a imagem mental e vês todo o procedimento. É a que uso'
      ]},
      { tipo: 'texto', conteudo: 'Quando formares um Mestre, divide o ensino em duas metodologias: o ritual físico, presencial, e a projecção à distância. São o mesmo processo em dois contextos, e é mais fácil de aprender assim. O foco deve estar em três coisas: intenção firme, visualização clara e respeito pelo campo energético do aluno.' },
      { tipo: 'destaque', conteudo: 'A formação online não é a mesma coisa que a sintonização à distância. A sintonização é o momento energético; a formação é todo o resto — o ensino, o acompanhamento, a avaliação. E online não é mais fácil: exige mais de ti, porque não vês a cara do aluno todos os dias.' }
    ],
    praticar: {
      titulo: 'O ensaio à distância',
      instrucoes: 'Combina com um colega já sintonizado no nível que vais treinar e faz-lhe o procedimento completo à distância, sem transmitir nada — só para treinares a ligação, a hora marcada, a condução por voz e o fecho. Comparem notas depois.',
      registo: true,
      registoPergunta: 'Como correu a ligação? O que é que o teu colega sentiu, e em que momento?'
    },
    responder: [
      { pergunta: 'Um aluno vai receber a sintonização por videochamada. O que muda no procedimento?',
        opcoes: ['Toco nele através do ecrã', 'Nada — uso o substituto ou a visualização, como em qualquer sintonização à distância', 'Faço uma versão mais curta'],
        correta: 1,
        feedback: 'O que a câmara te dá é outra coisa: vês se ele está sentado como pediste, vês quando relaxa, e podes guiá-lo pela voz. Não tentes tocar através do ecrã.' },
      { pergunta: 'Alguém te diz que sintonização à distância não funciona.',
        opcoes: ['Concordo, é melhor não fazer', 'Explico que a energia não tem limites, e que recusar isso seria limitar o Reiki por uma regra nossa', 'Discuto até convencer'],
        correta: 1,
        feedback: 'Eu também era contra. O melhor argumento não é teórico: é que os animais respondem ao Reiki à distância, e eles não têm expectativa nenhuma — não há sugestão possível.' },
      { pergunta: 'Vais sintonizar à distância alguém que nunca viste.',
        opcoes: ['Faço, basta a intenção', 'Certifico-me primeiro de que houve formação a sério: manual lido, dúvidas esclarecidas, trabalho entregue', 'Não faço nunca'],
        correta: 1,
        feedback: 'Sintonizar quem não estudou nada é vender um certificado, não é ensinar. A sintonização é o momento energético — a formação é todo o resto, e tem de existir.' }
    ]
  },

  /* ─────────────────────────────────────────────────────────── 6 ─── */
  {
    ordem: 6,
    titulo: 'Formar, avaliar e responder por isso',
    subtitulo: 'A sala, o aluno que quer desistir, e a ética do Mestre',
    manual: 'Capítulos 15 a 20',
    duracao: '35 min',
    ler: [
      { tipo: 'lista', titulo: 'No dia da formação', itens: [
        'Chega cedo. Areja, arruma, prepara a água',
        'Recebe cada aluno pelo nome',
        'Ronda de apresentações: quem são e o que os trouxe aqui',
        'Explica o programa, incluindo a hora da sintonização',
        'Alterna teoria com prática — ninguém aguenta duas horas a ouvir',
        'Sintoniza com a sala já em silêncio, e dá tempo depois',
        'Fecha com uma ronda de partilha, sem obrigar ninguém a falar',
        'Explica os 21 dias com muita clareza e entrega os certificados'
      ]},
      { tipo: 'texto', conteudo: 'Não há um número de meses entre níveis. O ritmo é do aluno, e o que conta é o trabalho que entrega: testes, exercícios, respostas a situações, simulações de atendimento, registos de autotratamento, limpezas de espaço relatadas.' },
      { tipo: 'destaque', conteudo: 'Vale mais a intenção com que o aluno se entrega — com amor, gratidão e compaixão — do que ter as técnicas na ponta da língua. Um aluno que trocou dois nomes mas praticou todos os dias e cuidou de quem lhe apareceu está pronto. Um que decorou tudo e nunca pôs as mãos, não está.' },
      { tipo: 'texto', conteudo: 'Vais ter alunos que querem desistir. Na maior parte das vezes não é por falta de vontade: é por não sentirem nada enquanto o colega do lado sente tudo. Não respondas «é normal» e passes à frente. Senta-te com ele, pergunta-lhe o que está à espera de sentir, e conta-lhe uma vez em que tu próprio duvidaste.' },
      { tipo: 'lista', titulo: 'Ética do Mestre', itens: [
        'Não sintonizes quem não está preparado — nem por insistência, nem por amizade, nem porque paga',
        'Não aceleres ninguém: quatro níveis em três meses enche a carteira e esvazia o método',
        'Diz a verdade sobre a origem do que ensinas',
        'Não cries discípulos: o teu trabalho é tornar o aluno independente de ti',
        'Não fales mal de outras escolas',
        'Cobra com clareza, sem extras a meio nem pressões para o nível seguinte',
        'Ensina os limites com a mesma energia com que ensinas a técnica',
        'Continua a ser aluno'
      ]},
      { tipo: 'destaque', conteudo: 'A pergunta que te deve acompanhar, antes de cada formação: estou a fazer isto por quem vai receber, ou por mim? Nenhuma das respostas é vergonhosa — todos precisamos de viver. Mas só uma delas pode estar à frente.' }
    ],
    praticar: {
      titulo: 'A tua primeira aula',
      instrucoes: 'Prepara e dá uma aula de quarenta minutos sobre os cinco princípios, a alguém que não saiba nada de Reiki. Depois pergunta a essa pessoa o que é que ficou a perceber. É a melhor avaliação que vais ter.',
      registo: true,
      registoPergunta: 'O que é que a pessoa ficou a perceber — e o que é que tu percebeste ao ouvi-la?'
    },
    responder: [
      { pergunta: 'Um aluno teu insiste em fazer o nível seguinte, mas não entregou trabalho nenhum.',
        opcoes: ['Sintonizo, é ele que sabe de si', 'Digo-lhe a sós, com respeito, o que falta — e deixo a porta aberta', 'Corto relações'],
        correta: 1,
        feedback: 'Não é castigo, é cuidado — por ele e por quem ele vier a atender. A maior parte volta mais preparada.' },
      { pergunta: 'Um aluno diz-te que não sente nada e que vai desistir.',
        opcoes: ['Digo-lhe que é normal e passo à frente', 'Sento-me com ele, pergunto o que espera sentir, e conto-lhe uma vez em que duvidei', 'Dou-lhe outra sintonização'],
        correta: 1,
        feedback: 'Muita gente desiste à espera de fogo de artifício, quando o que estava a acontecer era o resto. Dito à pressa, «é normal» soa a despacho.' },
      { pergunta: 'Alguém te oferece o dobro para fazer os quatro níveis em três meses.',
        opcoes: ['Aceito, é a escolha dele', 'Recuso — não se acelera ninguém', 'Aceito mas dou menos matéria'],
        correta: 1,
        feedback: 'Enche a carteira e esvazia o método. E entre um nível e o seguinte deve aguardar-se seis meses a um ano, mesmo tendo o conhecimento sido passado.' }
    ]
  }
];

window.seedReikiNivel2  = () => gravarModulos('2',  MODULOS_NIVEL_2);
window.seedReikiNivel3A = () => gravarModulos('3A', MODULOS_NIVEL_3A);
window.seedReikiNivel3B = () => gravarModulos('3B', MODULOS_NIVEL_3B);

window.MODULOS_NIVEL_2  = MODULOS_NIVEL_2;
window.MODULOS_NIVEL_3A = MODULOS_NIVEL_3A;
window.MODULOS_NIVEL_3B = MODULOS_NIVEL_3B;
