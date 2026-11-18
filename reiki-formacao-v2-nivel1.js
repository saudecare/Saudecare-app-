/* =========================================================================
   FORMAÇÃO DE REIKI — NÍVEL 1 (SHODEN) · VERSÃO 2
   Hikari Fafe Escola de Reiki · Vindora
   -------------------------------------------------------------------------
   Conteúdo escrito a partir do "Manual de Usui Reiki Ryoho — Nível 1
   (Shoden) · O Despertar", de Mestre Ricardo Correia.
   12 módulos + Módulo 0 (Antes de começares) + exame final de 20 perguntas.

   Estrutura de cada módulo (compatível com o motor do percurso):
     ler       → blocos: texto | destaque | lista
     praticar  → exercício com registo do aluno
     responder → perguntas curtas (com feedback que ensina)
     pdf       → material de estudo do módulo (ficheiro em /material-reiki/)
     aula      → vídeo narrado: url (mp4, p.ex. Cloudinary) e legendas (.vtt);
                 enquanto url estiver vazio, o aluno estuda pela leitura

   Nota: este ficheiro NÃO substitui o percurso antigo. Só é usado quando a
   formação v2 está ligada (ver reiki-formacao-v2.js).
   ========================================================================= */

const T = c => ({ tipo: 'texto', conteudo: c });
const D = c => ({ tipo: 'destaque', conteudo: c });
const L = (titulo, itens) => ({ tipo: 'lista', titulo, itens });
const Q = (pergunta, opcoes, correta, feedback) => ({ pergunta, opcoes, correta, feedback });

const N1_MODULOS = [

  /* ================================================================ 0 === */
  {
    ordem: 0, titulo: 'Antes de começares',
    subtitulo: 'Como funciona esta formação e o que vais levar dela',
    manual: 'Introdução e "O que vais encontrar aqui"', duracao: '10 min',
    pdf: { titulo: 'Como funciona a formação', ficheiro: 'n1-m00-antes-de-comecares.pdf' },
    aula: { url: "videos-reiki/n1-m00.mp4", legendas: "videos-reiki/n1-m00.vtt" },
    ler: [
      T('Esta formação segue o manual do Nível 1, capítulo a capítulo, em módulos curtos. Cada módulo tem: o vídeo narrado, o material de estudo em PDF, uma pequena prática e perguntas para fixares. O módulo seguinte só abre quando terminas o anterior.'),
      L('Como se avança em cada módulo', [
        'Ver o vídeo até ao fim (não dá para avançar a imagem) — ou, se preferires não ouvir, estudar pela leitura e pelo PDF',
        'Fazer a prática do módulo',
        'Responder às perguntas — é preciso responder a todas para concluir',
        'No fim de todos os módulos: exame final de 20 perguntas, com um mínimo de 60% (12 certas), e depois o certificado'
      ]),
      L('O manual completo', [
        'No início do nível tens o manual completo em PDF: podes lê-lo aqui na aplicação ou descarregá-lo e imprimi-lo',
        'Cada módulo indica os capítulos do manual que cobre'
      ]),
      D('Vale mais a intenção com que te entregas a cada momento — com amor, gratidão e compaixão — do que teres todas as técnicas na ponta da língua. Saber os nomes em japonês não faz de ninguém bom terapeuta.'),
      T('O Nível 1 é o nível do uso próprio: aprendes a usar o Reiki em ti, no teu espaço e nas tuas coisas. Aplicar a outras pessoas faz parte do Nível 2.')
    ],
    praticar: {
      titulo: 'O teu ponto de partida',
      instrucoes: 'Antes de começares, escreve com as tuas palavras: porque quiseste aprender Reiki, e o que esperas encontrar. Não há respostas certas. No fim da formação voltas a ler isto.',
      registo: true, registoPergunta: 'Porque estás aqui, e o que esperas encontrar?'
    },
    responder: [
      Q('Quando abre o módulo seguinte?', ['Quando eu quiser', 'Quando concluo o módulo anterior', 'Passado um número fixo de dias'], 1, 'Os módulos abrem em sequência: só depois de concluíres o anterior. É assim que o conhecimento vai assentando.'),
      Q('Quanto é preciso acertar no exame final para passar?', ['50%', '60%', '80%'], 1, 'Mínimo de 60%, ou seja, 12 respostas certas em 20.'),
      Q('Neste nível, o Reiki aprende-se a aplicar em quem?', ['Em qualquer pessoa', 'Em ti, no teu espaço e nas tuas coisas', 'Só em animais'], 1, 'O Nível 1 é o nível do uso próprio. Aplicar a outras pessoas faz parte do Nível 2.'),
      Q('Se preferires não ouvir o vídeo, o que podes fazer?', ['Saltar o módulo', 'Estudar pela leitura e pelo PDF e responder às perguntas', 'Esperar que o Mestre abra o módulo'], 1, 'O conteúdo é o mesmo: podes estudar pelo material e depois responder às perguntas.')
    ]
  },

  /* ================================================================ 1 === */
  {
    ordem: 1, titulo: 'O que é o Reiki e a visão holística',
    subtitulo: 'Energia vital, o que o Reiki não é e a pessoa como um todo',
    manual: 'Capítulos 1, 2 e 3', duracao: '20 min',
    pdf: { titulo: 'Módulo 1 — O que é o Reiki', ficheiro: 'n1-m01-o-que-e-o-reiki.pdf' },
    aula: { url: "videos-reiki/n1-m01.mp4", legendas: "videos-reiki/n1-m01.vtt" },
    desafio: 'Fala hoje com alguém sobre o que é realmente o Reiki, sem usares a palavra «energia». Repara nas palavras que encontras.',
    ler: [
      T('A palavra junta duas ideias japonesas: rei, aquilo que é universal e nos ultrapassa, e ki, a energia vital que anima tudo o que está vivo. Juntas, dizem algo como «energia vital universal».'),
      T('O ki não é invenção do Reiki. Os chineses chamam-lhe chi, os indianos prana. É a mesma observação feita em sítios diferentes: há nas pessoas qualquer coisa que sobe e desce, que se gasta e se recupera, e que não se explica só pelas calorias que comemos.'),
      T('O que o Usui Reiki Ryoho faz é simples de descrever: através da imposição das mãos, o praticante torna-se canal dessa energia, que flui para onde é precisa. Tu não a produzes. Não a diriges com a força do pensamento. Disponibilizas-te, e ela passa.'),
      L('O que o Reiki não é', [
        'Não é religião — não tem deuses, dogmas nem obrigação de acreditar. Pratica-se com qualquer fé, ou com nenhuma',
        'Não é magnetismo nem a tua energia pessoal — por isso não te esgotas; também recebes enquanto dás',
        'Não é sugestão — funciona em bebés, em animais e em pessoas a dormir',
        'Não é medicina — é acompanhamento, e essa distinção tem de ser clara desde o primeiro dia'
      ]),
      D('O que a prática costuma trazer: relaxamento profundo e melhor sono, alívio da tensão e da ansiedade, mais clareza e equilíbrio emocional. Nada disto é uma promessa de cura — é o que as pessoas relatam, e é o que podes honestamente dizer.'),
      T('O Reiki pertence à família das terapias complementares. Complementar quer dizer que acompanha, que anda a par, que acrescenta — nunca que substitui. A pessoa continua a ver o médico, a tomar a medicação e a fazer os exames.'),
      L('Onde o Reiki costuma encaixar bem', [
        'Acompanhamento em fases de stress, luto ou grande cansaço',
        'Apoio ao descanso de quem tem dificuldade em desligar',
        'Conforto em contextos de doença prolongada, sempre a par do tratamento médico',
        'Cuidado pessoal regular, como quem faz exercício ou medita'
      ]),
      T('Há uma ordem no método: aprende-se primeiro a aplicar em si próprio, e só depois nos outros. Quem não conheceu os seus próprios limites dificilmente respeita os dos outros. Por isso o autotratamento não é um aquecimento: é o coração da prática, e continua a sê-lo quando fores Mestre.'),
      T('Holístico vem do grego holos, que quer dizer inteiro. Uma pessoa não é um conjunto de peças avariadas que se arranjam uma a uma: é um todo, onde aquilo que se passa num plano se reflecte nos outros.'),
      L('Os quatro planos', [
        'Físico — corpo, órgãos, sintomas. Dá sinal por dor, tensão, cansaço, insónia',
        'Emocional — sentimentos e reacções. Irritação, medo, tristeza, apatia',
        'Mental — pensamentos e crenças. Ruminação, autocrítica, confusão',
        'Espiritual — sentido e ligação. Vazio, desorientação, falta de propósito'
      ]),
      D('Atenção a um erro comum: ver tudo como «emocional» é tão redutor como ver tudo como «físico». Não digas a ninguém que a doença dele vem de uma mágoa antiga. Não sabes, não te compete, e essa frase faz muito mal a quem está doente.')
    ],
    praticar: {
      titulo: 'Explica-o com as tuas palavras',
      instrucoes: 'Escreve, em quatro ou cinco linhas e sem a palavra «energia», o que é o Reiki e o que ele não é. Imagina que estás a explicá-lo a um amigo curioso.',
      registo: true, registoPergunta: 'A tua explicação:'
    },
    responder: [
      Q('O que quer dizer «Reiki»?', ['Mão que cura', 'Energia vital universal (rei = universal, ki = energia vital)', 'Método de relaxamento japonês'], 1, 'Rei é aquilo que é universal e nos ultrapassa; ki é a energia vital que anima tudo o que está vivo.'),
      Q('Porque é que o Reiki não pode ser «sugestão»?', ['Porque só funciona com fé', 'Porque funciona em bebés, animais e pessoas a dormir, que não sabem o que se passa', 'Porque é sempre gratuito'], 1, 'Se fosse sugestão, só funcionaria em quem sabe o que está a acontecer.'),
      Q('Uma pessoa com doença prolongada procura-te. Qual é o enquadramento correcto?', ['O Reiki pode substituir o tratamento', 'O Reiki acompanha, a par do tratamento médico, e nunca o substitui', 'Só se dá Reiki depois de a pessoa ter alta'], 1, 'Complementar quer dizer que acompanha, que anda a par — nunca que substitui.'),
      Q('Porque se aprende primeiro a aplicar em si próprio?', ['Para poupar tempo', 'Porque quem não conheceu os seus limites dificilmente respeita os dos outros', 'Porque é mais fácil'], 1, 'O autotratamento é o coração da prática e continua a sê-lo quando fores Mestre.'),
      Q('Alguém te conta que está doente. Qual destas frases deves evitar?', ['«Posso acompanhar-te com Reiki, e acho importante que fales com o teu médico.»', '«A tua doença vem de uma mágoa antiga.»', '«Como te sentes hoje?»'], 1, 'Não sabes, não te compete, e essa frase faz muito mal a quem está doente.')
    ]
  },

  /* ================================================================ 2 === */
  {
    ordem: 2, titulo: 'História, Kurama e os poemas Meiji',
    subtitulo: 'De Mikao Usui até às tuas mãos',
    manual: 'Capítulos 4 e 4B e «A nossa linhagem»', duracao: '25 min',
    pdf: { titulo: 'Módulo 2 — História e linhagem', ficheiro: 'n1-m02-historia-e-linhagem.pdf' },
    aula: { url: "videos-reiki/n1-m02.mp4", legendas: "videos-reiki/n1-m02.vtt" },
    ler: [
      T('Mikao Usui nasceu no Japão, a 15 de Agosto de 1865, na aldeia de Taniai. Foi sempre um estudante acima da média, e a vontade de saber mais levou-o a viajar por vários países a estudar os métodos de cura que ia encontrando. Homem de estudo e de procura, terá passado por várias disciplinas espirituais antes de, já em adulto, se retirar para um período de jejum e meditação no monte Kurama.'),
      T('Em 1922 abre em Tóquio a sua escola. No ano seguinte, o grande terramoto de Kanto leva-o a tratar feridos em grande número, e o método ganha notoriedade. Usui morre em 1926, tendo formado alguns mestres.'),
      L('Como o Reiki chegou até nós', [
        '1. Mikao Usui abre a escola em Tóquio em 1922 e ensina até morrer, em 1926. Forma alguns mestres',
        '2. Chujiro Hayashi, um dos principais discípulos, médico reformado da marinha imperial japonesa, organiza o ensino de forma mais sistemática e abre uma clínica',
        '3. Hawayo Takata, nipo-americana, vai a essa clínica para se tratar e acaba por ficar como auxiliar e aluna de Hayashi',
        '4. Takata leva o método para o Havai, e é lá que Hayashi lhe confere o título de Mestre de Reiki',
        '5. Dessa pequena ilha o Reiki passa à América continental, e da América chega à Europa',
        '6. Da Europa chega a Portugal, e de mãos para mãos até ao teu Mestre — e agora a ti'
      ]),
      D('Repara em quem foi a ponte: uma mulher, que chegou ao Reiki como doente, não como aluna. Quem trouxe o Reiki até nós também começou por estar do outro lado das mãos.'),
      T('Porque há tantas versões? Porque o método passou, durante décadas, de boca em boca e de mãos para mãos, sem manuais. Cada mestre ensinou como aprendeu e como entendeu. Daí as diferenças entre escolas: na ordem dos símbolos, no número de níveis, nos rituais. Não percas tempo a discutir qual é a versão correcta. Aprende bem a tua, pratica-a com honestidade, e respeita quem aprendeu outra.'),
      L('A nossa linhagem', [
        'Níveis 1, 2 e 3A — Reiki Tradicional · Usui Reiki Ryoho',
        'Nível 3B (Mestrado) — Reiki Essencial · Usui Shiki Ryoho',
        'Do mestrado em Reiki Essencial vêm dois símbolos que não fazem parte do núcleo original do Usui Reiki Ryoho: o Dai Ko Myo tibetano e o Raku, ensinados apenas no Nível 3B'
      ]),
      D('«A missão do Usui Reiki Ryoho é guiar para uma vida pacífica e feliz: curar os outros e melhorar a felicidade dos outros e de nós mesmos.» — Mikao Usui'),
      T('O monte Kurama (Kurama-yama) fica a norte de Quioto, e é um monte com longa tradição espiritual no Japão. É lá que, segundo a tradição do método, Usui se retira para um período de jejum, meditação e silêncio — vinte e um dias — no fim do qual tem a experiência a que se chama o despertar do Reiki. Repara no número: vinte e um é o mesmo do ciclo que vais fazer depois da tua sintonização.'),
      T('Honestidade sobre o que se sabe: grande parte da história de Usui chegou-nos por via oral, e há detalhes que variam de escola para escola. O que está documentado com segurança é a pedra memorial erguida em sua honra pelos seus alunos, no templo Saihoji, em Tóquio. Conta esta história como ela é: uma tradição respeitável, não um documento de arquivo.'),
      T('O imperador Meiji (1852–1912) governou o Japão no tempo de Usui, e era também poeta. Escreveu muitos milhares de waka — poemas curtos, de cinco versos — que em contexto imperial se chamam gyosei. Usui admirava-os e dava-os aos alunos para meditarem, como quem dá um espelho: não eram regras nem doutrina, eram um convite a olhar para dentro. A tradição fala de cerca de cento e vinte e cinco poemas escolhidos por ele.'),
      D('Um exemplo, o poema 19 — Bola de cristal: «Mesmo a bola de cristal sem riscos pode perder brilho com o pó. Ninguém é perfeito.»'),
      T('Uma frase curta, repetida com atenção durante um dia inteiro, faz mais trabalho do que um tratado lido de uma assentada. É assim que se praticam os cinco princípios, e é assim que Usui ensinava.')
    ],
    praticar: {
      titulo: 'Abre um poema à sorte',
      instrucoes: 'Na Biblioteca da app, abre um poema do imperador Meiji à sorte, quando tiveres uma questão em mãos. Lê-o devagar, duas vezes, e escreve o que ele te devolveu.',
      registo: true, registoPergunta: 'Que poema abriste e o que te disse?'
    },
    responder: [
      Q('Quem foi a «ponte» que levou o Reiki para fora do Japão?', ['Mikao Usui', 'Hawayo Takata, que chegou ao Reiki como doente', 'O imperador Meiji'], 1, 'Takata foi tratar-se à clínica de Hayashi, ficou como auxiliar e aluna, e levou o método para o Havai.'),
      Q('Quantos dias durou o retiro de Usui no monte Kurama, segundo a tradição?', ['7', '21', '40'], 1, 'Vinte e um — a mesma medida do ciclo depois da sintonização.'),
      Q('O que está documentado com segurança sobre Usui?', ['Cada pormenor da vida dele', 'A pedra memorial no templo Saihoji, em Tóquio', 'Os manuais que ele escreveu'], 1, 'Grande parte da história chegou por via oral. Conta-a como tradição respeitável, não como documento de arquivo.'),
      Q('Para que servia a poesia do imperador Meiji no ensino de Usui?', ['Eram regras a cumprir', 'Eram um convite a olhar para dentro, como um espelho', 'Eram orações obrigatórias'], 1, 'Não eram regras nem doutrina.'),
      Q('Perante uma escola que ensina a ordem dos símbolos de outra forma, o que fazes?', ['Corrijo-os', 'Aprendo bem a minha, pratico-a com honestidade e respeito quem aprendeu outra', 'Deixo de praticar'], 1, 'Cada mestre ensinou como aprendeu e entendeu. Não vale a pena discutir qual é a correcta.')
    ]
  },

  /* ================================================================ 3 === */
  {
    ordem: 3, titulo: 'Os cinco princípios e os três pilares',
    subtitulo: 'O chão sobre o qual assenta tudo o resto',
    manual: 'Capítulos 5 e 6', duracao: '25 min',
    pdf: { titulo: 'Módulo 3 — Princípios e pilares', ficheiro: 'n1-m03-principios-e-pilares.pdf' },
    aula: { url: "videos-reiki/n1-m03.mp4", legendas: "videos-reiki/n1-m03.vtt" },
    desafio: 'Escolhe um dos cinco princípios e escreve-o num papel que vejas todos os dias esta semana.',
    ler: [
      T('Usui deixou cinco frases para repetir de manhã e à noite, de mãos juntas. São a base ética e espiritual de tudo o resto — e, com o tempo, percebes que são mais exigentes do que qualquer técnica.'),
      L('Os cinco princípios', ['Só por hoje', 'Sou calmo', 'Confio', 'Sou grato', 'Trabalho honestamente', 'Sou bondoso']),
      D('Repara no «só por hoje». É o que torna isto possível. Ninguém promete nunca mais se zangar. Mas hoje, só hoje, dá para tentar. E amanhã recomeça-se.'),
      T('Esta é a forma que ensino, e é a que está escrita no memorial. Vais encontrar escolas que usam a forma negativa — «não te zangues, não te preocupes». Diz o mesmo por outro caminho: uma pede-te uma abstenção, a nossa pede-te uma afirmação. Nenhuma está errada.'),
      L('O que cada princípio pede', [
        'Sou calmo — a raiva não se proíbe, observa-se. Repara no que a acendeu antes de reagires; muitas vezes por baixo está medo ou cansaço',
        'Confio — a preocupação é imaginação a trabalhar contra ti. Há alguma coisa que possas fazer agora? Se há, faz. Se não há, pousa e confia',
        'Sou grato — não é positividade forçada: é treinar o olhar para o que está bem',
        'Trabalho honestamente — fazer bem o que tens para fazer, sem atalhos. Serve para o Reiki e para varrer a casa',
        'Sou bondoso — para com todos os seres, o que te inclui a ti'
      ]),
      T('Usui indicava recitá-los pelo menos duas vezes por dia, de mãos juntas, guardando-os no coração e dizendo-os com a boca. Experimenta recitá-los também nos momentos exigentes: quando estás prestes a responder mal, ou não consegues dormir de preocupação.'),
      L('As três coisas que Usui indicou', [
        'A Arte Secreta de Convidar a Felicidade — o método em si, e a missão que ele lhe deu',
        'A Melhoria do Corpo e da Mente — o resultado da prática',
        'Os cinco princípios — a filosofia de vida que sustenta tudo'
      ]),
      T('Os preceitos foram escritos pela mão dele em papel de amoreira, comprado pela Monja Suzuki, uma das suas ajudantes. Sem os princípios, o Reiki perde o significado e passa a ser mais uma terapia energética entre tantas.'),
      T('Toda a prática do Reiki assenta em três gestos. São simples e é precisamente por isso que se desvalorizam.'),
      L('Gassho — «mãos juntas». É como se abre e se fecha tudo', [
        'Senta-te com as costas direitas, sem rigidez',
        'Junta as palmas à frente do peito, dedos apontados para cima',
        'Fecha os olhos e leva a atenção ao ponto onde os dedos médios se tocam',
        'Respira devagar. Fica dois a cinco minutos',
        'Quando a mente fugir, traz a atenção de volta a esse ponto, sem te censurares'
      ]),
      L('Reiji-Ho — «indicação do espírito», pedir e escutar', [
        'A partir do Gassho, formula o pedido: que esta energia flua para o bem-estar desta pessoa (ou o teu)',
        'Leva as mãos juntas à altura da testa',
        'Pede orientação: que as mãos saibam onde pousar',
        'Fica alguns segundos em silêncio, sem procurar resposta nenhuma',
        'Baixa as mãos e começa. Se sentires impulso de ir a uma zona fora da sequência, segue-o'
      ]),
      T('Chiryo — «tratamento»: é a aplicação propriamente dita, com as mãos pousadas.'),
      D('A ordem importa: Gassho para entrar, Reiji-Ho para te alinhares, Chiryo para trabalhar, e Gassho outra vez para fechar. Quem salta o princípio e o fim acaba por dar sessões apressadas, e nota-se.')
    ],
    praticar: {
      titulo: 'Um princípio por semana',
      instrucoes: 'Escolhe um princípio por semana. Ao fim do dia, escreve duas linhas sobre onde ele te apanhou desprevenido. Não escrevas o que devias ter feito — escreve o que aconteceu. Hoje, faz também o Gassho durante dois minutos.',
      registo: true, registoPergunta: 'Que princípio escolheste e onde é que ele te apanhou desprevenido?'
    },
    responder: [
      Q('Qual é a forma dos cinco princípios que se ensina nesta escola?', ['A forma negativa («não te zangues…»)', 'A forma afirmativa («Só por hoje, sou calmo…»)', 'Só em japonês'], 1, 'É a que está escrita no memorial. A forma negativa diz o mesmo por outro caminho — nenhuma está errada.'),
      Q('O que torna possível viver os princípios, segundo o manual?', ['A força de vontade', 'O «só por hoje» — hoje dá para tentar, e amanhã recomeça-se', 'Fazê-los uma vez por semana'], 1, 'Ninguém promete nunca mais se zangar. Só por hoje.'),
      Q('Quantas vezes por dia indicava Usui recitar os princípios?', ['Uma', 'Pelo menos duas — de manhã e à noite', 'Só quando se está zangado'], 1, 'De manhã e à noite, de mãos juntas.'),
      Q('Qual é a ordem dos três pilares numa sessão?', ['Chiryo, Gassho, Reiji-Ho', 'Gassho, Reiji-Ho, Chiryo, e Gassho para fechar', 'Reiji-Ho, Chiryo, Gassho'], 1, 'Gassho para entrar, Reiji-Ho para te alinhares, Chiryo para trabalhar, e Gassho outra vez para fechar.'),
      Q('Onde fica a atenção durante o Gassho?', ['Na testa', 'No ponto onde os dedos médios se tocam', 'Na respiração do abdómen'], 1, 'É esse o ponto de atenção; quando a mente fugir, trazes de volta sem te censurares.')
    ]
  },

  /* ================================================================ 4 === */
  {
    ordem: 4, titulo: 'Hatsurei Ho e os níveis do sistema',
    subtitulo: 'A prática diária japonesa e o caminho por degraus',
    manual: 'Capítulos 6B e 7', duracao: '25 min',
    pdf: { titulo: 'Módulo 4 — Hatsurei Ho e níveis', ficheiro: 'n1-m04-hatsurei-ho-e-niveis.pdf' },
    aula: { url: "videos-reiki/n1-m04.mp4", legendas: "videos-reiki/n1-m04.vtt" },
    ler: [
      T('Hatsurei Ho quer dizer, à letra, algo como «método para gerar mais energia espiritual». É a prática que os alunos japoneses faziam todos os dias, e é a melhor forma de limpar o canal e afinar as mãos antes de qualquer trabalho. São quatro partes seguidas, e demora dez a quinze minutos. Faz de manhã, se puderes.'),
      L('1 · Kenyoku Ho — o banho seco (cortar e sacudir o que não é teu)', [
        'Mão direita sobre o ombro esquerdo, junto ao pescoço. Desce na diagonal, com firmeza, até à anca direita, expirando',
        'Mão esquerda sobre o ombro direito, desce até à anca esquerda, a expirar',
        'Repete a primeira: direita no ombro esquerdo, desce até à anca direita',
        'Mão direita no topo do ombro esquerdo, desce pelo braço esquerdo esticado até à ponta dos dedos, a expirar',
        'O mesmo do outro lado: mão esquerda ao longo do braço direito',
        'E outra vez o primeiro braço. São três cortes no tronco e três nos braços'
      ]),
      T('Faz-se sempre no princípio, e também no fim de uma sessão, ou quando saíres de um ambiente pesado. Faz os movimentos com intenção, não a correr. Há quem visualize as mãos como lâminas de luz azul — usa se te ajudar.'),
      L('2 · Joshin Kokyu Ho — a respiração que purifica o espírito (cinco minutos)', [
        'Mãos nas pernas, palmas para cima. Costas direitas',
        'Inspira pelo nariz, imaginando a luz a entrar pelo topo da cabeça',
        'Deixa-a descer pelo eixo do corpo até ao tanden — dois dedos abaixo do umbigo',
        'Retém um instante, sem esforço, e sente esse ponto a aquecer',
        'Expira devagar, deixando a luz espalhar-se por todo o corpo e sair pelas mãos e pelos pés'
      ]),
      L('3 · Seishin Toitsu — unificar a mente (cinco minutos)', [
        'Junta as mãos em Gassho, à frente do peito',
        'Inspira imaginando que a energia entra pelas mãos e desce ao tanden',
        'Expira deixando-a sair outra vez pelas mãos',
        'As mãos tornam-se o sítio por onde tudo entra e sai'
      ]),
      T('4 · Gassho Meiso — a meditação de mãos juntas: mantém o Gassho e leva a atenção ao ponto onde os dedos médios se tocam. Fica dois a cinco minutos, sem fazer nada. Quando a mente fugir, traz de volta sem censura. Fecha com um agradecimento.'),
      D('Se só conseguires uma parte, faz o Kenyoku Ho. São trinta segundos, faz-se em qualquer sítio, e é a parte que mais depressa se nota — sobretudo nos dias em que chegas a casa com o dia dos outros em cima de ti.'),
      L('Os níveis do sistema', [
        'Nível 1 · Shoden — uso próprio',
        'Nível 2 · Okuden — mais dois símbolos; uso próprio e aplicação a outras pessoas, incluindo à distância',
        'Nível 3A · Shinpiden — o símbolo do Mestre; habilita a trabalhar como terapeuta de Reiki',
        'Nível 3B · Shinpiden — Mestre de Reiki: habilitado a dar formação e a sintonizar; dois símbolos adicionais'
      ]),
      T('Não há um número de meses fixo entre níveis. O ritmo é teu, e o que conta é o tempo que dedicas e o trabalho que vais entregando: os exercícios, os testes, as situações propostas, os registos da tua prática. Tudo isso conta para a tua avaliação.'),
      D('Não colecciones níveis. Quem pratica um nível com dedicação vale mais do que quem subiu quatro degraus e não pratica nenhum.')
    ],
    praticar: {
      titulo: 'O teu primeiro Hatsurei Ho',
      instrucoes: 'Faz hoje o Hatsurei Ho completo, com calma: banho seco, respiração Joshin Kokyu Ho, Seishin Toitsu e Gassho Meiso. Se tiveres pouco tempo, faz só o banho seco.',
      registo: true, registoPergunta: 'Qual das quatro partes sentiste mais, e como?'
    },
    responder: [
      Q('Quantos cortes se fazem no banho seco (Kenyoku Ho)?', ['Dois no tronco', 'Três no tronco e três nos braços', 'Sete no total'], 1, 'Três cortes no tronco e três nos braços, sempre a expirar.'),
      Q('Onde fica o tanden?', ['No peito', 'Dois dedos abaixo do umbigo', 'Entre as sobrancelhas'], 1, 'É o centro onde se arruma a energia.'),
      Q('Se só tiveres tempo para uma parte do Hatsurei Ho, qual deves fazer?', ['Gassho Meiso', 'Kenyoku Ho (banho seco)', 'Nenhuma — fica para outro dia'], 1, 'Trinta segundos, em qualquer sítio, e é a que mais depressa se nota.'),
      Q('Qual nível habilita a dar formação e a sintonizar?', ['Nível 2', 'Nível 3A', 'Nível 3B'], 2, 'O 3B é o de Mestre. O 3A habilita a trabalhar como terapeuta de Reiki.'),
      Q('Quanto tempo deve passar entre níveis?', ['Exactamente 6 meses', 'Não há prazo fixo: conta o tempo que dedicas e o trabalho entregue', 'Um ano'], 1, 'O ritmo é teu. Vale mais praticar um nível com dedicação do que coleccionar níveis.')
    ]
  },

  /* ================================================================ 5 === */
  {
    ordem: 5, titulo: 'Corpo energético, chakras, cor e fluxo',
    subtitulo: 'O mapa que a tradição usa e como a energia circula',
    manual: 'Capítulos 8, 8B e 9', duracao: '30 min',
    pdf: { titulo: 'Módulo 5 — Chakras, cor e fluxo', ficheiro: 'n1-m05-chakras-cor-fluxo.pdf' },
    aula: { url: "videos-reiki/n1-m05.mp4", legendas: "videos-reiki/n1-m05.vtt" },
    ler: [
      T('Além do corpo físico, a tradição descreve camadas mais subtis à sua volta — o que se costuma chamar aura. E ao longo do eixo do corpo, sete centros principais de energia, os chakras, que funcionam como pontos de troca entre esses planos. Não precisas de acreditar nisto como se fosse anatomia: usa como mapa.'),
      L('Os sete chakras — onde ficam e o que mostram', [
        '1 · Raiz — base da coluna. Equilibrado: segurança, presença. Em desequilíbrio: medo, insegurança, agitação',
        '2 · Sacro — baixo ventre. Prazer, criatividade, fluidez. Desequilíbrio: culpa, bloqueio criativo, rigidez',
        '3 · Plexo solar — boca do estômago. Vontade, confiança, iniciativa. Desequilíbrio: insegurança, controlo, raiva contida',
        '4 · Cardíaco — centro do peito. Amor, compaixão, abertura. Desequilíbrio: mágoa, isolamento, dificuldade em perdoar',
        '5 · Laríngeo — garganta. Expressão, verdade, escuta. Desequilíbrio: calar o que se sente',
        '6 · Frontal — entre as sobrancelhas. Clareza, intuição, discernimento. Desequilíbrio: confusão, dúvida constante',
        '7 · Coronário — topo da cabeça. Ligação, sentido, serenidade. Desequilíbrio: vazio, desorientação, desligamento'
      ]),
      L('Cor, elemento, glândula e mantra', [
        'Raiz — vermelho · Terra · suprarrenais · LAM',
        'Sacro — laranja · Água · gónadas · VAM',
        'Plexo solar — amarelo · Fogo · pâncreas · RAM',
        'Cardíaco — verde ou rosa · Ar · timo · YAM',
        'Laríngeo — azul · Éter · tiróide · HAM',
        'Frontal — índigo · Luz · hipófise · OM',
        'Coronário — violeta ou branco · Espaço · pineal · HA'
      ]),
      T('Não é garantido que no tempo do Mestre Usui se usasse esta correspondência. Usamo-la hoje porque nos ajuda a orientar na prática energética — como mapa útil, não como dogma.'),
      T('A cromoterapia usa as cores para harmonizar. Enquanto as mãos estão pousadas, visualizas a cor do centro que estás a tratar a envolver a pessoa, ou a sair das tuas mãos e a entrar nesse centro. Se quiseres, recita o mantra.'),
      L('As cores', [
        'Vermelho — revigorante e estimulante. Frio, anemia, fadiga, desânimo',
        'Laranja — relaxante e alegre. Stress, ansiedade, culpa, inibição',
        'Amarelo — estimulante e optimista. Raciocínio, memória, imunidade, digestão',
        'Verde — calmante e curativo. Serve a qualquer questão, física ou emocional',
        'Azul — tranquilizante. Acalmar emoções, favorecer a fala e a respiração',
        'Índigo — profundo. Intuição, meditação, clareza interior',
        'Violeta — elevação. Ligação espiritual, transmutação, serenidade'
      ]),
      D('A cor acompanha, não trata. Continua a valer tudo o que já sabes: não diagnosticas, não prometes, e não substituis a medicina por uma visualização.'),
      L('Como flui a energia — quatro fases', [
        'A energia Reiki entra pelo chakra coronário, no topo da cabeça',
        'Desce até ao chakra cardíaco',
        'Percorre todo o corpo até aos pés',
        'A partir do cardíaco vai para as mãos, e sai pelos chakras das palmas'
      ]),
      T('Repara que passa pelo coração antes de chegar às mãos. Não é um pormenor técnico: é a razão de o Reiki não funcionar bem quando estamos a atender com a cabeça noutro sítio.'),
      T('O chakra da raiz e o da coroa têm um único cone e vêem-se como complementares: a raiz liga à energia da Terra, a coroa à do Céu. Todos os outros têm ligação à frente e atrás. Um chakra saudável pode ter entre dez e quinze centímetros de diâmetro. Cada centro funciona como receptor e emissor.'),
      L('Três consequências práticas', [
        'Não te esgotas. A energia atravessa-te, não sai de ti. Se acabas exausto, quase sempre é porque te envolveste emocionalmente no problema da pessoa',
        'Também recebes. Enquanto dás, passas pelo teu próprio corpo aquilo que flui',
        'Não decides a dose. Quem recebe é que regula. Não vale a pena fazer força com o pensamento'
      ]),
      D('Ser canal, não bomba. A imagem que ajuda é a de uma mangueira: a tua função é estar aberto e limpo, não empurrar a água. Quando um aluno se esforça por «mandar energia», costuma conseguir uma dor de cabeça.')
    ],
    praticar: {
      titulo: 'O caminho da energia',
      instrucoes: 'Sentado, de olhos fechados, percorre as quatro fases do fluxo: entra pelo topo da cabeça, desce ao coração, espalha-se pelo corpo até aos pés, e sai pelas palmas. Três minutos, sem esforço.',
      registo: true, registoPergunta: 'Onde sentiste mais o percurso? E o que notaste nas mãos?'
    },
    responder: [
      Q('Por onde entra a energia Reiki?', ['Pelas mãos', 'Pelo chakra coronário, no topo da cabeça', 'Pelo plexo solar'], 1, 'Entra pelo coronário, desce ao cardíaco, percorre o corpo e sai pelas palmas.'),
      Q('Qual a cor do chakra cardíaco?', ['Amarelo', 'Verde ou rosa', 'Azul'], 1, 'Cardíaco: verde ou rosa, elemento Ar, glândula timo, mantra YAM.'),
      Q('Porque é que não te esgotas a dar Reiki?', ['Porque dás pouco', 'Porque a energia atravessa-te, não sai de ti', 'Porque descansas entre posições'], 1, 'Se acabas exausto, quase sempre foi por te envolveres emocionalmente no problema da pessoa.'),
      Q('Quem decide a «dose» de energia?', ['O praticante, com a intenção', 'Quem recebe', 'A duração da sessão'], 1, 'Não vale a pena fazer força com o pensamento: serves de canal, como uma mangueira.'),
      Q('A cromoterapia no Reiki serve para…', ['Tratar doenças', 'Acompanhar e potenciar, sem tratar nem substituir a medicina', 'Diagnosticar o chakra'], 1, 'A cor acompanha, não trata.')
    ]
  },

  /* ================================================================ 6 === */
  {
    ordem: 6, titulo: 'Byosen — aprender a sentir',
    subtitulo: 'O que as mãos te dizem',
    manual: 'Capítulo 10', duracao: '20 min',
    pdf: { titulo: 'Módulo 6 — Byosen', ficheiro: 'n1-m06-byosen.pdf' },
    aula: { url: "videos-reiki/n1-m06.mp4", legendas: "videos-reiki/n1-m06.vtt" },
    ler: [
      T('Byosen é o nome que se dá às sensações que surgem nas mãos quando passam por uma zona que pede atenção. É a forma mais simples de o corpo te dizer onde te deves demorar. À letra, é uma acumulação de energia que cria bloqueios, e é de onde a doença pode vir a surgir. Depois da sintonização ganhas sensibilidade nas mãos, e passas a detectar essas zonas — em ti e nos outros.'),
      D('Não corras atrás disto. A sensibilidade afina-se com o tempo, e há praticantes excelentes que sentem muito pouco. Se não sentires nada, continua na mesma: o Reiki não depende de tu sentires.'),
      L('O que as mãos podem sentir', [
        'Calor / febre — calor ligeiramente acima da temperatura do corpo. Zona rígida, a receber energia. É a mais comum',
        'Calor intenso — calor que não se confunde com o normal. A zona precisa de muita energia: demora-te lá',
        'Formigueiro — nas palmas e nas pontas dos dedos. Tensão e rigidez mais sérias: há desarmonia',
        'Pulso / eco — uma pulsação sob as mãos. A energia está a estimular a circulação; zona cheia, a precisar de circular',
        'Dor — nas mãos, pode subir aos pulsos, cotovelos e ombros. Byosen em estado crítico; quanto mais grave, mais dor',
        'Frio — frio ou sensação de vazio. Bloqueio do chakra, consciente ou não, por vezes ligado a um trauma',
        'Nada — também é informação, e é muito frequente no início'
      ]),
      D('Dor nas mãos não é energia negativa. Se sentires dor nas mãos, não estás a absorver nada de mau da pessoa — isso não acontece no Reiki. É apenas a leitura de um Byosen intenso. Sacode as mãos, lava-as, e segue.'),
      T('No Ocidente é comum ensinar-se uma sequência fixa de doze ou mais posições, usadas quer a zona precise quer não. Aprende a sequência — mas aprende também a escutar as mãos, que é o que o Byosen te ensina.'),
      L('Exercício para afinar as mãos', [
        'Esfrega as palmas uma na outra durante vinte segundos',
        'Afasta-as cerca de trinta centímetros, palmas frente a frente',
        'Aproxima-as muito devagar, até quase se tocarem, e afasta outra vez',
        'Repete dez vezes, de olhos fechados, sem esperar nada em concreto',
        'Escreve depois o que sentiste. Uma palavra chega'
      ]),
      T('Faz este exercício uma vez por dia durante uma semana. É assim que se calibra. É também o Exercício 1 do capítulo 17 — a bola de energia.')
    ],
    praticar: {
      titulo: 'A bola de energia',
      instrucoes: 'Faz o exercício das mãos agora (vinte segundos a esfregar, trinta centímetros, dez aproximações de olhos fechados). Repete uma vez por dia durante a primeira semana.',
      registo: true, registoPergunta: 'Uma palavra sobre o que sentiste:'
    },
    responder: [
      Q('O que significa sentir «frio» ou «vazio» nas mãos?', ['Que absorveste energia negativa', 'Possível bloqueio do chakra, por vezes ligado a um trauma', 'Que estás a fazer mal'], 1, 'Frio ou vazio é leitura de um bloqueio — não é energia negativa a passar para ti.'),
      Q('Sentes dor nas mãos durante a sessão. O que fazes?', ['Paro de vez e nunca mais pratico', 'Percebo que é um Byosen intenso, sacudo as mãos, lavo-as e sigo', 'Interpreto como energia negativa da pessoa'], 1, 'Não estás a absorver nada de mau: é apenas a leitura de um Byosen intenso.'),
      Q('Não sentes nada nas mãos. O que significa?', ['Que não funciona', 'Que também é informação, e o Reiki não depende de sentires', 'Que não foste bem sintonizado'], 1, 'É muito frequente no início. Há praticantes excelentes que sentem muito pouco.'),
      Q('O que indica o calor intenso?', ['Que a zona precisa de muita energia — demora-te lá', 'Que a pessoa tem febre', 'Que a sessão acabou'], 0, 'Calor intenso: a zona precisa de muita energia.'),
      Q('Qual o significado do pulso / eco?', ['Dor crítica', 'A energia estimula a circulação; zona cheia, a precisar de circular', 'Ausência de energia'], 1, 'Uma pulsação sob as mãos é sinal de zona cheia a precisar de circular.')
    ]
  },

  /* ================================================================ 7 === */
  {
    ordem: 7, titulo: 'A sintonização e os 21 dias',
    subtitulo: 'O que é estar sintonizado e como assentar',
    manual: 'Capítulo 11', duracao: '20 min',
    pdf: { titulo: 'Módulo 7 — Sintonização e 21 dias', ficheiro: 'n1-m07-sintonizacao-21-dias.pdf' },
    aula: { url: "videos-reiki/n1-m07.mp4", legendas: "videos-reiki/n1-m07.vtt" },
    ler: [
      T('A sintonização é o momento em que o Mestre abre o teu canal. É um processo breve, tranquilo, e não exige nada de ti a não ser estares disponível. Não tens de sentir nada de espectacular — muita gente sente apenas calma.'),
      T('A sintonização é o processo que te liga à energia, e só pode ser transmitida por um Mestre que a tenha também recebido. A imagem que costumo usar é a do íman: é como se te fossem colocados ímanes nas mãos, para que a energia flua pelo teu corpo e saia por ali.'),
      T('Cada nível tem a sua sintonização própria, porque te habilita a trabalhar com aspectos diferentes da energia. E, a partir do momento em que a recebes, estás sintonizado para sempre. O que a prática te dá não é a ligação — é sentires a ligação. Se um dia quiseres receber uma nova sintonização, não há problema nenhum; é puramente opcional.'),
      T('Depois vem o período de ajuste, que por tradição se conta em vinte e um dias. O número não tem nada de mágico: é o tempo que costuma bastar para o corpo se habituar à frequência nova. Se falhares um dia não é problema — por vezes até convém parar para observar as mudanças.'),
      L('O que fazer depois da sintonização', [
        'Pratica o autotratamento durante 21 dias',
        'Medita e vive os cinco princípios',
        'Pratica a postura de uma mente serena, pela concentração e pela meditação',
        'Pratica as técnicas ensinadas nas aulas e neste manual',
        'Observa as mudanças que vais tendo em ti — e escreve-as',
        'Vem às aulas. Traz as dúvidas, mesmo as que te pareçam óbvias',
        'E depois dos 21 dias? Continua a tratar-te'
      ]),
      L('O que podes sentir nestes dias', [
        'Mais sono, ou sonhos mais vivos',
        'Emoções mais à flor da pele, sem razão aparente',
        'Vontade de mudar hábitos: comer de outra forma, beber mais água, deitar-te mais cedo',
        'Cansaço nos primeiros dias, seguido de mais clareza',
        'Ou nada de especial. Também é perfeitamente normal'
      ]),
      D('O compromisso dos 21 dias: autotratamento todos os dias, durante vinte e um dias. Vinte minutos chegam. Se falhares um dia, retoma no seguinte — sem drama e sem recomeçar a contagem. Bebe mais água do que o costume nesta fase.'),
      T('No manual tens a tabela «Registo dos 21 dias»: em cada dia, uma palavra sobre como te sentiste. Imprime-a ou copia-a para um caderno.')
    ],
    praticar: {
      titulo: 'Começa o teu registo',
      instrucoes: 'Abre o «Registo dos 21 dias» no manual e preenche o primeiro dia (ou o de hoje, se já estás a meio). Uma palavra chega.',
      registo: true, registoPergunta: 'Uma palavra sobre como te sentes hoje:'
    },
    responder: [
      Q('O que é a sintonização?', ['Um curso teórico', 'O momento em que o Mestre abre o teu canal', 'Um exame'], 1, 'É breve, tranquila, e só exige que estejas disponível.'),
      Q('Perde-se a sintonização se estiveres muito tempo sem praticar?', ['Sim, é preciso repetir', 'Não — fica adormecida e a facilidade diminui; recomeça devagar', 'Só se faltares mais de 21 dias'], 1, 'Estás sintonizado para sempre: o que se treina é a facilidade em sentir a ligação.'),
      Q('Porque se contam 21 dias?', ['Por magia do número', 'É o tempo que costuma bastar para o corpo se habituar à frequência nova', 'Por lei'], 1, 'O número não tem nada de mágico.'),
      Q('Falhaste um dia do autotratamento. O que fazes?', ['Recomeço a contagem', 'Retomo no dia seguinte, sem drama e sem recomeçar', 'Desisto'], 1, 'Sem drama e sem recomeçar a contagem.'),
      Q('Quem pode transmitir a sintonização?', ['Qualquer pessoa', 'Um Mestre que a tenha também recebido', 'Um aluno de Nível 2'], 1, 'Só um Mestre que a tenha também recebido.')
    ]
  },

  /* ================================================================ 8 === */
  {
    ordem: 8, titulo: 'Autotratamento completo — as 13 posições',
    subtitulo: 'A prática mais importante, e a primeira que se abandona',
    manual: 'Capítulo 12', duracao: '30 min',
    pdf: { titulo: 'Módulo 8 — Autotratamento', ficheiro: 'n1-m08-autotratamento.pdf' },
    aula: { url: "videos-reiki/n1-m08.mp4", legendas: "videos-reiki/n1-m08.vtt" },
    ler: [
      T('É a prática mais importante que tens, e é a primeira que os alunos abandonam. Faz-se sentado ou deitado, de manhã ou à noite — a hora que conseguires manter é a hora certa. Vinte a trinta minutos na versão completa. São treze posições; fica três a cinco minutos em cada uma, ou até sentires a mão acalmar. Se numa delas o Byosen for forte, demora-te mais.'),
      L('Antes de pousar as mãos', [
        'Desliga o telemóvel. Senta-te ou deita-te confortavelmente, sem cruzar pernas nem braços',
        'Banho seco, se vieres da rua ou de um dia pesado',
        'Gassho: mãos juntas ao peito, dois minutos de respiração lenta',
        'Reiji-Ho: pede que a energia flua para o teu bem-estar, e leva as mãos juntas à altura da testa, ao sexto chakra, alguns segundos',
        'Desenha o Cho Ku Rei nas palmas, com o mantra três vezes'
      ]),
      T('Sobre as mãos: pousadas, relaxadas, sem fazer força. Dedos juntos e esticados — não abertos, para a energia não se dispersar; a palma é o centro por onde sai. Podes tocar, ou trabalhar a poucos centímetros do corpo. Em zonas sensíveis, trabalha sempre sem tocar.'),
      L('As treze posições (1 a 7)', [
        '1 · Olhos — palmas em concha a cobrir os olhos, sem carregar. Acalma o pensamento; dores de cabeça e cansaço visual',
        '2 · Têmporas — uma mão de cada lado da cabeça, acima das orelhas. Tensão, enxaqueca, ranger de dentes',
        '3 · Nuca — mãos sobrepostas na base do crânio. É onde se acumula o que carregamos sem dar por isso',
        '4 · Garganta — mãos leves à frente, ou uma de cada lado do pescoço, nunca a apertar. Expressão, o que ficou por dizer, tiróide',
        '5 · Cardíaco — mãos sobrepostas ao centro do peito. Emoções, luto, ansiedade, mágoa antiga',
        '6 · Plexo solar — na boca do estômago. Medo, poder pessoal, digestão',
        '7 · Abdómen — à volta do umbigo. Digestão, intestinos, o «sentir no estômago»'
      ]),
      L('As treze posições (8 a 13)', [
        '8 · Baixo ventre — mãos em triângulo. Vitalidade, criatividade, questões hormonais',
        '9 · Bacia e raiz — mãos sobre as virilhas ou a base da coluna. Segurança, enraizamento',
        '10 · Joelho direito — mãos em concha à volta do joelho',
        '11 · Joelho esquerdo — o mesmo do outro lado. Os joelhos carregam a nossa relação com avançar e recuar',
        '12 · Calcanhares — uma mão em cada calcanhar, ou um de cada vez',
        '13 · Pés — mãos nas plantas dos pés. É aqui que se fecha e se ancora: não saltes esta'
      ]),
      T('Se não chegares aos joelhos, calcanhares e pés — por dor, por rigidez, por gravidez — trabalha-os com as mãos no ar sobre eles, ou com a intenção. Funciona.'),
      L('Para fechar', [
        'Alisa o campo com as mãos, da cabeça aos pés, sem tocar, três vezes',
        'Sela com o Cho Ku Rei sobre o peito',
        'Mãos no baixo ventre, alguns minutos, para arrumar a energia em baixo e não ficares com a cabeça leve',
        'Gassho e agradece',
        'Bebe água. Lava as mãos em água corrente'
      ]),
      D('Versão curta — 5 minutos: mãos no peito e no abdómen, Cho Ku Rei, respiração lenta. Feito vale infinitamente mais do que adiado. Nos dias em que não te apetece nada: faz a versão curta, não negoceies contigo. Põe as mãos e respira.')
    ],
    praticar: {
      titulo: 'Autotratamento — de ponta a ponta',
      instrucoes: 'Faz hoje o autotratamento completo, com as treze posições. Antes de começar, dá um número de 0 a 10 ao teu desconforto ou cansaço; no fim, dá outro. Anota os dois.',
      registo: true, registoPergunta: 'Número antes, número depois, e o que notaste:'
    },
    responder: [
      Q('Quantas posições tem o autotratamento completo?', ['7', '13', '21'], 1, 'Treze posições, três a cinco minutos em cada.'),
      Q('Como devem estar os dedos das mãos?', ['Abertos, para a energia se espalhar', 'Juntos e esticados, para a energia não se dispersar', 'Fechados em punho'], 1, 'A palma é o centro por onde sai a energia.'),
      Q('Qual é a última posição, a que fecha e ancora?', ['Joelhos', 'Pés', 'Baixo ventre'], 1, 'Os pés: é aqui que se fecha e se ancora — não saltes esta.'),
      Q('Não chegas aos pés por rigidez. O que fazes?', ['Salto a posição', 'Trabalho com as mãos no ar sobre eles, ou com a intenção', 'Desisto do autotratamento'], 1, 'Funciona na mesma.'),
      Q('É um dia em que não te apetece nada. O que fazes?', ['Não faço nada', 'A versão curta de cinco minutos', 'Compenso amanhã com o dobro'], 1, 'Não negoceies contigo. Feito vale infinitamente mais do que adiado.')
    ]
  },

  /* ================================================================ 9 === */
  {
    ordem: 9, titulo: 'Cho Ku Rei e as técnicas com nome',
    subtitulo: 'O teu primeiro símbolo e o vocabulário do Reiki',
    manual: 'Capítulos 12B e 12C', duracao: '30 min',
    pdf: { titulo: 'Módulo 9 — Cho Ku Rei e técnicas', ficheiro: 'n1-m09-cho-ku-rei-e-tecnicas.pdf' },
    aula: { url: "videos-reiki/n1-m09.mp4", legendas: "videos-reiki/n1-m09.vtt" },
    ler: [
      T('Nesta escola o Cho Ku Rei ensina-se já no Nível 1, juntamente com os seus usos. É uma decisão do Mestre, e tem uma razão: a energia do mundo em que vivemos hoje não é a mesma de quando o Reiki foi descoberto — está muito mais densa. O que um aluno enfrenta hoje, no trabalho, na rua, nos ambientes por onde passa, não é o que enfrentava no Japão de 1922. Faz sentido dar-te já uma ferramenta poderosa: que concentra energia onde falta, que limpa o espaço onde dormes, que te protege antes de entrares num ambiente pesado.'),
      T('O Nível 1 continua a ser o nível do uso próprio — mas um uso próprio com uma chave na mão. Por honestidade, fica dito que muitas escolas ensinam os símbolos só no Nível 2, e que quem aprendeu assim não aprendeu menos: aprendeu por outra ordem. Quando falares com praticantes de outras escolas, di-lo com naturalidade, sem os corrigir. E se um dia ensinares, decide tu e explica a ordem aos teus alunos com a mesma clareza.'),
      T('O que é um símbolo? Não é um feitiço nem um amuleto. Pensa nele como o nome de uma frequência: ao desenhá-lo e ao dizer o seu mantra, sintonizas-te com uma qualidade específica da energia, tal como marcas um número para falar com determinada pessoa. A força não está no traço bem feito: está na tua intenção e na sintonização que recebeste. E ver um símbolo não é o mesmo que o receber — o que abre porta é a sintonização.'),
      T('Cho Ku Rei costuma traduzir-se por «coloca aqui toda a força do universo». É o mais directo dos símbolos do Reiki: não é subtil, é um interruptor. Aumenta, concentra, protege e limpa.'),
      L('Como se desenha — três traços', [
        'Um traço horizontal no topo, da esquerda para a direita',
        'A partir da ponta direita, desce a direito, uma vertical firme',
        'Da base da vertical, abre a espiral no sentido contrário ao dos ponteiros do relógio, enrolando para dentro, até cerca de três voltas e meia. A espiral cruza a vertical a cada volta'
      ]),
      T('Como se activa: desenha com a mão aberta e os dedos juntos, ou visualiza, ou traça com a ponta da língua no céu da boca. Em qualquer dos casos repete o mantra três vezes: Cho Ku Rei, Cho Ku Rei, Cho Ku Rei — em voz alta se estiveres sozinho, mentalmente se estiveres acompanhado.'),
      L('Para que usas o Cho Ku Rei neste nível', [
        'Nas tuas palmas, antes do autotratamento',
        'Numa zona do teu corpo onde sintas que falta energia',
        'Para abrir e para fechar a tua prática diária',
        'Para limpar o teu espaço, o quarto, a mesa de trabalho',
        'Para energizar a água, a comida, um objecto teu',
        'Como protecção, antes de entrares num ambiente pesado'
      ]),
      D('Em todos estes usos, quem recebe és tu, o teu espaço ou as tuas coisas. O símbolo não altera a regra do nível: aplicar Reiki a outras pessoas continua a ser do Nível 2.'),
      T('Guarda o manual num sítio teu. Não publiques o símbolo nas redes sociais nem o partilhes com quem não foi sintonizado — não por medo, mas por consideração por quem investiu tempo para o receber devidamente.'),
      L('Os nomes japoneses do Nível 1', [
        'Gassho — mãos juntas · Reiji-Ho — indicação do espírito · Chiryo — tratamento',
        'Hatsurei Ho — método de gerar energia espiritual (Kenyoku Ho, Joshin Kokyu Ho, Seishin Toitsu, Gassho Meiso)',
        'Tanden — centro dois dedos abaixo do umbigo',
        'Byosen — acumulação que precede a doença · Byosen Reikan Ho — método de sentir a acumulação',
        'Jakikiri Joka Ho — cortar a energia estagnada e purificar (objectos, cristais, jóias)',
        'Gokai — os cinco princípios · Gyosei — poemas do imperador · Kensho — ver a própria natureza',
        'Cho Ku Rei — coloca aqui toda a força do universo'
      ]),
      L('Jakikiri Joka Ho — limpar um objecto', [
        'Pousa o objecto à tua frente, ou segura-o na mão esquerda',
        'Mão direita aberta sobre ele, dedos juntos, a uns vinte centímetros',
        'Corta o ar na horizontal, com firmeza, três vezes, expirando a cada corte',
        'À terceira, mantém a mão parada sobre o objecto',
        'Fica um ou dois minutos, com a intenção de o preencher com energia limpa',
        'Agradece e lava as mãos'
      ]),
      T('Os cinco princípios em japonês: Kyo dake wa · Ikaru na · Shinpai suna · Kansha shite · Gyo o hageme · Hito ni shinsetsu ni. Se o japonês não te disser nada, di-los em português — a intenção é a mesma, e é o que conta.'),
      D('As técnicas marcadas para os Níveis 2 e 3 (Sei He Ki, Hon Sha Ze Sho Nen, Enkaku Chiryo, Dai Ko Myo, Raku…) não são para usares agora: ficam para saberes que existem e para onde vais a seguir.')
    ],
    praticar: {
      titulo: 'O traço de cada dia',
      instrucoes: 'Desenha o Cho Ku Rei à mão, em papel, uma vez por dia durante trinta dias. Sem pressa, e a partir da segunda semana sem o copiar de lado nenhum. Hoje faz o primeiro. Guarda as folhas por ordem.',
      registo: true, registoPergunta: 'Como saiu o primeiro traço? O que reparaste?'
    },
    responder: [
      Q('Porque se ensina o Cho Ku Rei já no Nível 1 nesta escola?', ['Por ser o símbolo mais fácil', 'Porque as energias de hoje não são as de quando o Reiki foi descoberto, e é uma ferramenta poderosa para o uso próprio', 'Porque o Nível 2 não o ensina'], 1, 'É uma decisão do Mestre: o mundo de hoje está mais denso, e o símbolo concentra, limpa e protege.'),
      Q('O que significa Cho Ku Rei?', ['Cura à distância', '«Coloca aqui toda a força do universo»', 'O Buda em mim saúda o Buda em ti'], 1, 'É o símbolo da força: aumenta, concentra, protege e limpa.'),
      Q('Quantas vezes se repete o mantra para activar o símbolo?', ['Uma', 'Três', 'Sete'], 1, 'Cho Ku Rei, Cho Ku Rei, Cho Ku Rei.'),
      Q('Podes usar o Cho Ku Rei para tratar outra pessoa no Nível 1?', ['Sim', 'Não — neste nível quem recebe és tu, o teu espaço ou as tuas coisas', 'Só se for da família'], 1, 'O símbolo não altera a regra: aplicar Reiki a outras pessoas é do Nível 2.'),
      Q('Ver um símbolo na internet equivale a recebê-lo?', ['Sim', 'Não — o que abre porta é a sintonização', 'Depende do desenho'], 1, 'A força está na intenção e na sintonização, não no traço.')
    ]
  },

  /* ================================================================ 10 === */
  {
    ordem: 10, titulo: 'Enraizamento, banho, chuva e limpeza',
    subtitulo: 'Práticas curtas que vais usar mais do que julgas',
    manual: 'Capítulos 12D e 12E', duracao: '25 min',
    pdf: { titulo: 'Módulo 10 — Enraizamento e limpeza', ficheiro: 'n1-m10-enraizamento-e-limpeza.pdf' },
    aula: { url: "videos-reiki/n1-m10.mp4", legendas: "videos-reiki/n1-m10.vtt" },
    ler: [
      T('Três práticas curtas. Nenhuma precisa de símbolo, de sala preparada, nem de ninguém à frente.'),
      L('Enraizamento', [
        'De pé, pés afastados à largura das ancas, joelhos soltos, não trancados',
        'Respira devagar três vezes, a soltar os ombros',
        'Imagina raízes a sair das plantas dos pés e a descer pela terra, fundo, até encontrarem rocha',
        'Inspira e sente a terra a subir por essas raízes: pelas pernas, pelas ancas, até ao baixo ventre',
        'Expira e deixa descer o que não precisas, pelas mesmas raízes',
        'Cinco minutos. Acaba com as mãos no baixo ventre, alguns segundos'
      ]),
      T('Faz-se antes de qualquer trabalho, e sempre que andares com a cabeça longe do corpo — depois de um dia de ecrãs, de uma discussão, de uma noite mal dormida. Não descartes esta prática por ser a mais simples de todas.'),
      L('Chuva de Reiki (dois a três minutos)', [
        'De pé ou sentado, Gassho, três respirações lentas',
        'Levanta as mãos acima da cabeça, palmas viradas para baixo, e afasta-as um pouco',
        'Formula a intenção: que a energia caia sobre ti como chuva, e leve o que não é teu',
        'Deixa as mãos descer devagar, pela frente do corpo, da cabeça aos pés, sem tocar',
        'Repete três vezes. À última, sacode as mãos para o lado',
        'Fecha com Gassho e agradece'
      ]),
      L('Banho de Reiki (vinte minutos)', [
        'Deita-te confortavelmente, tapado se for preciso',
        'Gassho e Joshin Kokyu Ho, cinco minutos, até a respiração assentar',
        'Desenha o Cho Ku Rei nas palmas, com o mantra três vezes',
        'Formula a intenção de te deixares envolver por completo, como quem entra na água',
        'Pousa as mãos no peito e fica. Hoje não é um autotratamento, é um banho',
        'Se o sono vier, deixa vir',
        'Ao acabar, mãos no baixo ventre alguns minutos. Gassho e agradece'
      ]),
      D('Qual usar? Enraizamento quando andas com a cabeça longe do corpo. Chuva de Reiki quando trazes o dia dos outros em cima de ti. Banho de Reiki quando estás esgotado a sério e precisas de te recompor por dentro.'),
      T('Convém falar da palavra «protecção», porque não é a melhor. Protecção pressupõe medo de alguma coisa, e o que o Reiki nos ensina é o contrário: confiança. Em ti, na vida, no universo. Essa força vem de dentro — manifesta-se no plexo solar, com o reforço do chakra esplénico.'),
      T('Posso apanhar as energias da pessoa? Não. O Reiki é canalização num só sentido: entra pelo topo e sai pelas mãos, directamente para quem recebe, sem retorno para ti. Dito isto, o contacto entre a tua aura e a da outra pessoa pode receber impressões. Não é motivo para medo, é motivo para higiene.'),
      L('A rotina de limpeza', [
        'Antes: banho seco, enraizamento, e a consciência da tua ligação',
        'Durante: mantém o enraizamento, ou retoma-o quando sentires falta',
        'Depois: banho seco outra vez, chuva de Reiki, e lava as mãos em água corrente — até aos cotovelos, se sentires necessidade. Em alternativa, álcool, canforado ou normal, dos cotovelos até às mãos',
        'E bebe água. Tu também'
      ]),
      D('Faz isto mesmo quando achares que não foi preciso. A rotina vale precisamente por ser rotina — no dia em que fizer falta, já está montada.')
    ],
    praticar: {
      titulo: 'Escolhe a prática do dia',
      instrucoes: 'Hoje faz o Enraizamento (cinco minutos) e, à noite, a Chuva de Reiki. Repara na diferença entre as duas.',
      registo: true, registoPergunta: 'O que notaste em cada uma?'
    },
    responder: [
      Q('Em que dia usas a Chuva de Reiki?', ['Quando andas com a cabeça longe do corpo', 'Quando trazes o dia dos outros em cima de ti', 'Só aos domingos'], 1, 'Enraizamento: cabeça longe do corpo. Chuva: o dia dos outros em cima de ti. Banho: esgotamento a sério.'),
      Q('Podes «apanhar» as energias da pessoa através do Reiki?', ['Sim, sempre', 'Não — o Reiki é canalização num só sentido, sem retorno para ti', 'Só se fores sensível'], 1, 'Já o contacto entre auras pode deixar impressões — por isso se faz higiene, sem medo.'),
      Q('Porque o manual não gosta da palavra «protecção»?', ['Porque não funciona', 'Porque pressupõe medo, e o Reiki ensina confiança', 'Porque é antiga'], 1, 'Essa força vem de dentro: plexo solar, com reforço do chakra esplénico.'),
      Q('O que se faz DEPOIS de uma sessão?', ['Nada', 'Banho seco, chuva de Reiki, lavar as mãos e beber água', 'Só rezar'], 1, 'A rotina vale por ser rotina.'),
      Q('Como termina o Enraizamento?', ['De olhos abertos a correr', 'Com as mãos no baixo ventre, alguns segundos', 'Com Cho Ku Rei no tecto'], 1, 'Cinco minutos e depois as mãos no baixo ventre.')
    ]
  },

  /* ================================================================ 11 === */
  {
    ordem: 11, titulo: 'Uso próprio, alinhamento sentado e práticas',
    subtitulo: 'O que já podes fazer, e as receitas do dia a dia',
    manual: 'Capítulos 13, 13B e 14', duracao: '30 min',
    pdf: { titulo: 'Módulo 11 — Uso próprio e práticas', ficheiro: 'n1-m11-uso-proprio-e-praticas.pdf' },
    aula: { url: "videos-reiki/n1-m11.mp4", legendas: "videos-reiki/n1-m11.vtt" },
    ler: [
      T('É a pergunta que toda a gente faz: «e aplicar a outras pessoas?» A resposta da nossa escola é clara: o Nível 1 é para uso próprio. Aplicar Reiki a outras pessoas faz parte do Nível 2. Não é burocracia nem forma de obrigar a pagar mais formação: é uma questão de ordem. Quem ainda não se conhece a si próprio nas mãos dificilmente reconhece os limites dos outros.'),
      L('O que já podes fazer', [
        'Autotratamento diário, que é o essencial deste nível',
        'Usar o Cho Ku Rei em ti, no teu espaço e nas tuas coisas',
        'Energizar a tua água, a tua comida, os teus objectos',
        'Reiki a plantas e a animais de casa',
        'Praticar a percepção nas mãos e afinar a tua sensibilidade'
      ]),
      L('O que fica para o Nível 2', [
        'Sessões a outras pessoas, com a sequência completa de posições',
        'Mais dois símbolos e o trabalho no plano emocional e mental',
        'O envio à distância'
      ]),
      D('A excepção que abro: família de casa e animais. O que fica de fora é o atendimento — não atendes pessoas de fora, não marcas sessões, não cobras, e não te apresentas como terapeuta. Isso é do Nível 2 em diante.'),
      T('Alinhamento rápido, sentado: a forma para quando não há marquesa nem tempo. A pessoa sentada numa cadeira, vinte minutos. Serve para a família de casa, e vai ser a base do teu trabalho no Nível 2. A pessoa senta-se com as costas direitas, pés bem assentes no chão, mãos pousadas nas pernas. Tu ficas atrás, e passas à frente quando indicado.'),
      L('Alinhamento rápido — passo a passo', [
        'Prepara-te: banho seco, enraizamento, Gassho e Reiji-Ho. Explica à pessoa o que vai acontecer e pede-lhe autorização para tocar',
        'Ombros — por trás, mãos pousadas, até sentires a respiração dela assentar',
        'Crânio e testa — uma mão na testa, outra na base do crânio',
        'Cervical e garganta — uma mão na nuca, outra à frente sem apertar',
        'Esterno e costas — uma mão no centro do peito, outra nas costas; o cardíaco fica entre as tuas mãos',
        'Plexo solar e costas — o mesmo, mais abaixo',
        'Abaixo do estômago — uma mão abaixo do umbigo, outra nas costas',
        'Joelhos — uma mão em cada joelho, de frente',
        'Pés — plantas ou peito dos pés: ancora-se tudo o que foi movido',
        'Fecha — mãos nos ombros, alisa o campo três vezes, sela com Cho Ku Rei, Gassho e agradece',
        'Depois — dá água, deixa a pessoa levantar-se devagar, e faz em ti banho seco, chuva de Reiki e lava as mãos'
      ]),
      D('O que dizer no fim: nunca faças diagnósticos, nem digas «senti um bloqueio no teu fígado». Descreve o que sentiste em linguagem simples e devolve a interpretação à pessoa: «na zona do peito senti mais calor e demorei-me mais — fez-te algum sentido?» Se a pessoa chorar, fica em silêncio e mantém as mãos. Não perguntes o que ela está a sentir.'),
      L('Receitas do dia a dia', [
        'Varrer o campo — mãos abertas a uns vinte centímetros do corpo, de cima a baixo, três a cinco vezes; sacode no fim e pousa as mãos nos ombros',
        'Energizar água ou comida — mãos em concha, Cho Ku Rei e mantra três vezes, um a três minutos; agradece antes de beber ou comer',
        'Limpar o teu espaço — abre uma janela; ao centro, Cho Ku Rei virado para cada parede, tecto e chão; palmas para fora, roda sobre ti; agradece e lava as mãos',
        'Reiki antes de dormir — mãos no peito, inspira contando até quatro e expira até seis; depois mãos no abdómen e deixa-te adormecer',
        'Reiki a uma planta — mãos em concha à volta do vaso, sem tocar nas folhas; cinco minutos. Experiência: duas plantas iguais, uma com Reiki, compara ao fim de um mês',
        'Reiki a um animal — senta-te à distância, mãos nos joelhos, palmas para cima; deixa-o escolher. Se se afastar, a recusa é uma resposta. Cinco a quinze minutos. Um animal doente precisa de veterinário',
        'Pequenos desconfortos — pousa a mão no sítio e deixa ficar. Dor de cabeça: testa e nuca. Estômago apertado: boca do estômago. Nervosismo: peito e abdómen. Se a dor é nova, forte ou persistente, vai ao médico'
      ])
    ],
    praticar: {
      titulo: 'Uma receita à tua escolha',
      instrucoes: 'Escolhe uma das receitas (água, espaço, antes de dormir, planta ou animal) e faz hoje. Se escolheres a planta, começa a experiência das duas plantas.',
      registo: true, registoPergunta: 'Que receita fizeste e como correu?'
    },
    responder: [
      Q('Podes marcar sessões e cobrar a pessoas de fora com o Nível 1?', ['Sim', 'Não — isso é do Nível 2 em diante', 'Só a amigos'], 1, 'A excepção são a família de casa e os animais. O atendimento fica para o Nível 2.'),
      Q('No fim de uma sessão a outra pessoa, o que deves dizer?', ['Qual o órgão que está doente', 'O que sentiste em linguagem simples, devolvendo a interpretação à pessoa', 'Nada, nunca'], 1, 'Nunca diagnosticas. Pergunta: «fez-te algum sentido?»'),
      Q('A pessoa chora durante a sessão. O que fazes?', ['Paro e pergunto o que sente', 'Fico em silêncio e mantenho as mãos', 'Mudo de assunto'], 1, 'Chorar costuma ser sinal de que correu bem.'),
      Q('O animal afasta-se durante o Reiki. O que significa?', ['Que está doente', 'Que a recusa é uma resposta; trabalho à distância se quiser', 'Que tenho de o agarrar'], 1, 'Deixa-o escolher. E um animal doente precisa de veterinário.'),
      Q('Em que posição está a pessoa no alinhamento rápido?', ['Deitada', 'Sentada numa cadeira, costas direitas, pés no chão', 'De pé'], 1, 'Vinte minutos, sem marquesa.')
    ]
  },

  /* ================================================================ 12 === */
  {
    ordem: 12, titulo: 'Ética, perguntas e compromisso do aluno',
    subtitulo: 'O que separa um praticante sério de alguém que faz mal sem querer',
    manual: 'Capítulos 15, 16 e 17 e Compromisso do Aluno', duracao: '30 min',
    pdf: { titulo: 'Módulo 12 — Ética e compromisso', ficheiro: 'n1-m12-etica-e-compromisso.pdf' },
    aula: { url: "videos-reiki/n1-m12.mp4", legendas: "videos-reiki/n1-m12.vtt" },
    ler: [
      L('Ética, limites e bom senso', [
        'Reiki é complementar. Nunca substitui medicina. Di-lo com clareza',
        'Não diagnosticas. Não tens formação para isso e não é o teu papel',
        'Não prometes resultados. Nem cura, nem prazos, nem garantias',
        'Não mandas parar medicação. Nunca, em circunstância nenhuma',
        'Não tocas sem autorização. No Nível 2: explica onde vais pôr as mãos e evita zonas íntimas — aí trabalha-se com as mãos afastadas do corpo',
        'Guardas segredo. O que se diz na marquesa fica na marquesa',
        'Não aproveitas a fragilidade de ninguém. Nem emocional, nem financeira',
        'Não crias dependência. Se alguém precisa de ti para funcionar, alguma coisa correu mal',
        'Sabes dizer que não. Reconhecê-lo é maturidade, não incompetência'
      ]),
      D('Uma frase para guardar: «Posso acompanhar-te com Reiki, e ao mesmo tempo acho importante que fales com o teu médico sobre isso.» Esta frase não te tira autoridade nenhuma. Dá-ta.'),
      T('Cobrar pelo teu trabalho é legítimo e não tira pureza nenhuma ao Reiki. O que não é legítimo é aproveitar o desespero de alguém. Define o teu preço, mantém-no, e guarda espaço para quem realmente não pode pagar.'),
      L('Perguntas que me fazem sempre', [
        'Não sinto nada nas mãos. Estou a fazer mal? Não. A sensibilidade varia e afina-se com a prática; o Reiki não depende de sentires',
        'No manual de um amigo o Cho Ku Rei é do Nível 2. Quem está certo? Os dois: nesta escola damo-lo já no Nível 1, porque as energias de hoje não são as de antigamente e é uma ferramenta poderosa. Diz isso com naturalidade',
        'Já tenho um símbolo. Posso usá-lo nos outros? Usa-o em ti, no teu espaço e nas tuas coisas. Aplicar a outros continua a ser do Nível 2',
        'Preciso de acreditar para funcionar? Não, nem tu nem quem recebe',
        'Posso apanhar a doença ou as energias da pessoa? A energia atravessa-te, não fica. O que acontece é envolveres-te emocionalmente; fecha bem as sessões e lava as mãos',
        'A sintonização perde-se se estiver muito tempo sem praticar? Não: fica adormecida. Recomeça devagar',
        'Quando posso aplicar a outras pessoas? A partir do Nível 2',
        'E a grávidas, crianças ou idosos? No Nível 2, com toques suaves e sessões curtas; nas crianças, dez minutos costumam chegar; sempre a par do acompanhamento de saúde',
        'Posso dar Reiki a alguém sem essa pessoa saber? Pede sempre permissão: o consentimento faz parte do respeito'
      ]),
      L('Exercícios e registo do Nível 1', [
        'A bola de energia — uma vez por dia durante a primeira semana',
        'Antes e depois — número de 0 a 10 ao desconforto antes e depois de cada autotratamento, durante um mês',
        'As mãos às cegas — passa as mãos a uns vinte centímetros do corpo, de olhos fechados, e anota onde abrandaram sozinhas',
        'Uma semana de gratidão — três coisas do dia, todas as noites',
        'O traço de cada dia — Cho Ku Rei à mão, trinta dias'
      ]),
      D('Compromisso do Aluno: «…a honestidade, a respeitar quem me procura, a não prometer aquilo que não posso dar, e a lembrar-me sempre de que o Reiki acompanha mas nunca substitui o cuidado de saúde de quem está à minha frente.» Este manual acaba aqui, mas o teu caminho começa agora. Põe as mãos.')
    ],
    praticar: {
      titulo: 'Compromisso do Aluno',
      instrucoes: 'Lê o Compromisso do Aluno no manual. Escreve com as tuas palavras o que ele significa para ti e o que vais fazer para o cumprir. Podes também voltar ao texto que escreveste no Módulo 0.',
      registo: true, registoPergunta: 'O meu compromisso, por palavras minhas:'
    },
    responder: [
      Q('Um cliente diz que quer deixar a medicação porque faz Reiki. O que fazes?', ['Concordo', 'Nunca mando parar medicação; incentivo a falar com o médico', 'Peço-lhe que decida sozinho'], 1, 'Reiki acompanha, nunca substitui.'),
      Q('Cobrar pelo Reiki é…', ['Proibido', 'Legítimo, desde que não se aproveite o desespero de ninguém', 'Obrigatório'], 1, 'Define o teu preço, mantém-no, e guarda espaço para quem não pode pagar.'),
      Q('Podes prometer um resultado a quem te procura?', ['Sim, se tiveres experiência', 'Não: nem cura, nem prazos, nem garantias', 'Só em casos leves'], 1, 'É uma das regras de ética do nível.'),
      Q('Se alguém precisa de ti para funcionar, o que indica?', ['Que o teu trabalho é excelente', 'Que alguma coisa correu mal: não se criam dependências', 'Que deves cobrar mais'], 1, 'A dependência é um sinal de alarme.'),
      Q('Podes dar Reiki a alguém sem essa pessoa saber?', ['Sim, é inofensivo', 'Pede sempre permissão: o consentimento faz parte do respeito', 'Só a familiares'], 1, 'Como princípio geral, pede sempre permissão.')
    ]
  }
];

/* =========================================================================
   EXAME FINAL — 20 perguntas · mínimo 60% (12 certas)
   Cobre todos os módulos. A ordem das respostas é baralhada pela app.
   ========================================================================= */
const N1_EXAME = {
  titulo: 'Exame final — Nível 1 (Shoden)', nivel: '1', modulo: 0, notaMinima: 60,
  perguntas: [
    { texto: 'O que significa «Reiki»?', opcoes: ['Mão que cura', 'Energia vital universal', 'Método de relaxamento'], correta: 1 },
    { texto: 'O Reiki funciona em bebés e animais. Isto mostra que…', opcoes: ['É sugestão', 'Não é sugestão', 'Só funciona em adultos'], correta: 1 },
    { texto: 'Qual é o enquadramento correcto do Reiki?', opcoes: ['Substitui a medicina', 'É complementar: acompanha, nunca substitui', 'Só serve para doenças graves'], correta: 1 },
    { texto: 'Quem levou o Reiki para o Havai e foi feita Mestre por Hayashi?', opcoes: ['Mikao Usui', 'Hawayo Takata', 'Imperador Meiji'], correta: 1 },
    { texto: 'Quantos dias durou o retiro de Usui no monte Kurama, segundo a tradição?', opcoes: ['7', '21', '40'], correta: 1 },
    { texto: 'Qual a forma dos cinco princípios ensinada nesta escola?', opcoes: ['Negativa («não te zangues»)', 'Afirmativa («só por hoje, sou calmo»)', 'Só em japonês'], correta: 1 },
    { texto: 'Qual a ordem dos três pilares numa sessão?', opcoes: ['Chiryo, Gassho, Reiji-Ho', 'Gassho, Reiji-Ho, Chiryo (e Gassho para fechar)', 'Reiji-Ho, Chiryo, Gassho'], correta: 1 },
    { texto: 'Quantos cortes tem o banho seco (Kenyoku Ho)?', opcoes: ['Três no tronco e três nos braços', 'Dois no tronco', 'Sete'], correta: 0 },
    { texto: 'Onde fica o tanden?', opcoes: ['No peito', 'Dois dedos abaixo do umbigo', 'Na testa'], correta: 1 },
    { texto: 'Qual nível habilita a dar formação e a sintonizar?', opcoes: ['Nível 2', 'Nível 3A', 'Nível 3B'], correta: 2 },
    { texto: 'Por onde entra a energia Reiki?', opcoes: ['Pelas mãos', 'Pelo chakra coronário', 'Pelos pés'], correta: 1 },
    { texto: 'Qual a cor do chakra cardíaco?', opcoes: ['Amarelo', 'Verde ou rosa', 'Violeta'], correta: 1 },
    { texto: 'Sentes dor nas mãos durante o tratamento. O que é?', opcoes: ['Energia negativa da pessoa', 'A leitura de um Byosen intenso', 'Sinal de que fizeste mal'], correta: 1 },
    { texto: 'Não sentes nada nas mãos. O que fazes?', opcoes: ['Desisto', 'Continuo: o Reiki não depende de sentires', 'Repito a sintonização'], correta: 1 },
    { texto: 'Por tradição, quantos dias dura o período de ajuste após a sintonização?', opcoes: ['7', '21', '90'], correta: 1 },
    { texto: 'Quantas posições tem o autotratamento completo?', opcoes: ['7', '13', '21'], correta: 1 },
    { texto: 'Quantos traços tem o desenho do Cho Ku Rei descrito no manual?', opcoes: ['Três', 'Cinco', 'Doze'], correta: 0 },
    { texto: 'Podes aplicar Reiki a pessoas de fora e cobrar com o Nível 1?', opcoes: ['Sim', 'Não — é do Nível 2 em diante', 'Só em casa'], correta: 1 },
    { texto: 'Qual a prática para quando trazes o dia dos outros em cima de ti?', opcoes: ['Chuva de Reiki', 'Enraizamento', 'Gassho Meiso'], correta: 0 },
    { texto: 'Uma pessoa quer deixar a medicação por causa do Reiki. O que fazes?', opcoes: ['Concordo', 'Nunca mando parar medicação; incentivo a falar com o médico', 'Aconselho um dos dois'], correta: 1 }
  ]
};

/* =========================================================================
   TREINO LIVRE — perguntas DIFERENTES das do módulo (podem repetir-se à vontade)
   ========================================================================= */
const N1_TREINO = {
  0: [
    Q('O que contém cada módulo desta formação?', ['Só o vídeo', 'Vídeo, material em PDF, prática e perguntas', 'Só perguntas'], 1, 'Vídeo narrado, material de estudo em PDF, uma prática e perguntas para fixares.'),
    Q('O manual completo do Nível 1 pode ser…', ['Só lido na app', 'Lido na app ou descarregado e impresso', 'Só pedido ao Mestre'], 1, 'Está no início do nível, em PDF.'),
    Q('Para que serve o Nível 1?', ['Atender pessoas de fora', 'Uso próprio', 'Formar outros'], 1, 'Aprendes a usar o Reiki em ti, no teu espaço e nas tuas coisas.'),
    Q('O que vale mais, segundo o manual?', ['Saber os nomes em japonês', 'A intenção com que te entregas: amor, gratidão e compaixão', 'Ter muitos níveis'], 1, 'Saber os nomes em japonês não faz de ninguém bom terapeuta.')
  ],
  1: [
    Q('Como chamam os indianos ao ki?', ['Chi', 'Prana', 'Tanden'], 1, 'Os chineses chamam-lhe chi, os indianos prana.'),
    Q('Quem produz a energia no Reiki?', ['O praticante, com a força do pensamento', 'Ninguém «produz»: o praticante disponibiliza-se e ela passa', 'A pessoa que recebe'], 1, 'Tu não a produzes nem a diriges com a força do pensamento.'),
    Q('«Holístico» vem do grego holos, que quer dizer…', ['Energia', 'Inteiro', 'Cura'], 1, 'A pessoa é um todo, onde o que se passa num plano se reflecte nos outros.'),
    Q('Qual destes NÃO é um dos quatro planos?', ['Emocional', 'Financeiro', 'Espiritual'], 1, 'Os quatro planos são físico, emocional, mental e espiritual.'),
    Q('O que costuma o Reiki trazer, segundo o manual?', ['Cura garantida', 'Relaxamento, melhor sono e mais serenidade — sem promessa de cura', 'Diagnóstico'], 1, 'É o que as pessoas relatam, e é o que podes honestamente dizer.')
  ],
  2: [
    Q('Em que ano abriu Usui a sua escola em Tóquio?', ['1865', '1922', '1926'], 1, 'Em 1922. O terramoto de Kanto foi no ano seguinte e Usui morreu em 1926.'),
    Q('Quem era Chujiro Hayashi?', ['Discípulo de Usui, médico reformado da marinha imperial', 'O imperador', 'A primeira mestra no Havai'], 0, 'Organizou o ensino de forma mais sistemática e abriu uma clínica.'),
    Q('O que é um waka?', ['Um símbolo', 'Um poema curto de cinco versos', 'Uma técnica de respiração'], 1, 'Em contexto imperial chamam-se gyosei.'),
    Q('Quais os símbolos que vêm do mestrado em Reiki Essencial e só se ensinam no 3B?', ['Cho Ku Rei e Sei He Ki', 'Dai Ko Myo tibetano e Raku', 'Hon Sha Ze Sho Nen e Raku'], 1, 'Não fazem parte do núcleo original do Usui Reiki Ryoho.'),
    Q('Como se deve contar a história de Usui?', ['Como documento de arquivo, com todos os pormenores', 'Como tradição respeitável, com honestidade sobre o que se sabe', 'Sem falar de dúvidas'], 1, 'Uma escola séria não precisa de inventar certezas.')
  ],
  3: [
    Q('Qual é o primeiro dos cinco princípios?', ['Sou calmo', 'Só por hoje', 'Confio'], 1, 'O «só por hoje» é o que torna tudo possível.'),
    Q('O que se faz com a raiva, no princípio «Sou calmo»?', ['Proíbe-se', 'Observa-se, reparando no que a acendeu', 'Esconde-se'], 1, 'Muitas vezes o que está por baixo é medo ou cansaço.'),
    Q('Em que postura se recitam os princípios?', ['Deitado', 'De mãos juntas (Gassho)', 'De pé, de braços abertos'], 1, 'De manhã e à noite, de mãos juntas.'),
    Q('O que é o Reiji-Ho?', ['O tratamento com as mãos', 'Pedir e escutar: deixar que a energia indique o caminho', 'A meditação final'], 1, '«Indicação do espírito». Fazem-se alguns segundos de silêncio, sem procurar resposta.'),
    Q('Em que papel escreveu Usui os preceitos?', ['Papel de arroz', 'Papel de amoreira', 'Pergaminho'], 1, 'Comprado pela Monja Suzuki, uma das suas ajudantes.')
  ],
  4: [
    Q('Quanto tempo demora o Hatsurei Ho completo?', ['Cinco minutos', 'Dez a quinze minutos', 'Uma hora'], 1, 'Faz-se de manhã, se puderes.'),
    Q('Em que parte da prática a luz entra pelo topo da cabeça e desce ao tanden?', ['Kenyoku Ho', 'Joshin Kokyu Ho', 'Gassho Meiso'], 1, 'É a respiração que purifica o espírito, cinco minutos.'),
    Q('Quando se faz o banho seco, além do início da prática?', ['Nunca', 'No fim de uma sessão ou ao sair de um ambiente pesado', 'Só aos domingos'], 1, 'Serve para cortar e sacudir o que não é teu.'),
    Q('Que nível habilita a trabalhar como terapeuta de Reiki?', ['Nível 2', 'Nível 3A', 'Nível 3B'], 1, 'O 3B é o de Mestre, que forma e sintoniza.'),
    Q('«Não colecciones níveis» quer dizer…', ['Que não se deve subir de nível', 'Que praticar um nível com dedicação vale mais do que subir quatro sem praticar', 'Que só há três níveis'], 1, 'O que conta é a prática.')
  ],
  5: [
    Q('Qual a cor do chakra raiz?', ['Vermelho', 'Azul', 'Violeta'], 0, 'Raiz: vermelho, elemento Terra, mantra LAM.'),
    Q('Onde fica o chakra do plexo solar?', ['Centro do peito', 'Boca do estômago', 'Garganta'], 1, 'Terceiro chakra: amarelo, elemento Fogo, mantra RAM.'),
    Q('Que cor se associa à elevação e ligação espiritual?', ['Laranja', 'Violeta', 'Verde'], 1, 'O violeta serve a elevação, a transmutação e a serenidade.'),
    Q('Por onde passa a energia antes de chegar às mãos?', ['Pelos pés', 'Pelo coração (chakra cardíaco)', 'Pelo plexo solar'], 1, 'Por isso o Reiki não funciona bem quando atendemos com a cabeça noutro sítio.'),
    Q('Que imagem ajuda a perceber o papel do praticante?', ['Uma bomba', 'Uma mangueira: aberto e limpo, sem empurrar a água', 'Uma bateria'], 1, 'Quem se esforça por «mandar energia» costuma conseguir uma dor de cabeça.')
  ],
  6: [
    Q('O que significa Byosen, à letra?', ['Calor nas mãos', 'Uma acumulação de energia que cria bloqueios', 'O símbolo da distância'], 1, 'É de onde a doença pode vir a surgir.'),
    Q('Sentes formigueiro nas palmas e pontas dos dedos. Indica…', ['Zona perfeita', 'Tensão e rigidez mais sérias: há desarmonia', 'Que acabaste a sessão'], 1, 'Formigueiro = desarmonia.'),
    Q('O calor ligeiramente acima da temperatura do corpo é…', ['O mais comum: zona rígida, a receber energia', 'Muito raro', 'Perigoso'], 0, 'É a leitura mais comum do Byosen.'),
    Q('Quantas vezes se aproximam e afastam as mãos no exercício da bola de energia?', ['Três', 'Dez', 'Vinte e uma'], 1, 'Dez vezes, de olhos fechados, sem esperar nada em concreto.'),
    Q('Quanto tempo se esfregam as palmas no início do exercício?', ['Vinte segundos', 'Cinco minutos', 'Dois segundos'], 0, 'Depois afastam-se cerca de trinta centímetros.')
  ],
  7: [
    Q('Que imagem se usa para explicar a sintonização?', ['Uma chave', 'Ímanes colocados nas mãos', 'Uma lâmpada'], 1, 'Para que a energia flua pelo teu corpo e saia por ali.'),
    Q('Cada nível tem a sua própria sintonização?', ['Não, é sempre a mesma', 'Sim, porque habilita a trabalhar com aspectos diferentes da energia', 'Só o 3B'], 1, 'E quem a recebeu está sintonizado para sempre.'),
    Q('Quanto tempo de autotratamento diário se aconselha nos 21 dias?', ['Cinco minutos', 'Vinte minutos', 'Duas horas'], 1, 'Vinte minutos chegam.'),
    Q('Qual destas é uma reacção normal nestes dias?', ['Sonhos mais vivos', 'Perder a sintonização', 'Ficar doente obrigatoriamente'], 0, 'Ou nada de especial — também é perfeitamente normal.'),
    Q('O que fazer depois dos 21 dias?', ['Parar', 'Continuar a tratar-te', 'Repetir a sintonização'], 1, 'O autotratamento é o coração da prática.')
  ],
  8: [
    Q('Quanto tempo se fica em cada posição?', ['Trinta segundos', 'Três a cinco minutos, ou até a mão acalmar', 'Uma hora'], 1, 'Se o Byosen for forte, demora-te mais.'),
    Q('Qual é a posição que acalma o pensamento e ajuda nas dores de cabeça?', ['Nuca', 'Olhos', 'Joelhos'], 1, 'Palmas em concha a cobrir os olhos, sem carregar nas pálpebras.'),
    Q('O que se faz antes de pousar as mãos?', ['Nada', 'Desligar o telemóvel, Gassho, Reiji-Ho e Cho Ku Rei nas palmas', 'Beber café'], 1, 'E banho seco, se vieres da rua ou de um dia pesado.'),
    Q('Para que servem as mãos no baixo ventre no fim?', ['Para arrumar a energia em baixo e não ficar com a cabeça leve', 'Para despertar', 'Para fazer diagnóstico'], 0, 'Depois, Gassho, água e lavar as mãos.'),
    Q('Em zonas sensíveis do corpo, como se trabalha?', ['Com muita pressão', 'Sem tocar', 'Com os dedos abertos'], 1, 'Podes tocar ou trabalhar a poucos centímetros do corpo.')
  ],
  9: [
    Q('Quantas voltas dá, aproximadamente, a espiral do Cho Ku Rei?', ['Uma', 'Três e meia', 'Sete'], 1, 'Enrola para dentro, no sentido contrário ao dos ponteiros do relógio.'),
    Q('Para que NÃO se usa o Cho Ku Rei no Nível 1?', ['Energizar a água', 'Tratar outras pessoas', 'Limpar o teu espaço'], 1, 'Quem recebe és tu, o teu espaço ou as tuas coisas.'),
    Q('O Jakikiri Joka Ho serve para…', ['Limpar objectos, cristais e jóias', 'Sintonizar', 'Enviar à distância'], 0, 'Cortar a energia estagnada e purificar.'),
    Q('Podes partilhar o símbolo nas redes sociais?', ['Sim', 'Não — por consideração por quem investiu tempo para o receber', 'Só em privado'], 1, 'Não é por medo, é por consideração.'),
    Q('O que se faz na «Prática dos 30 dias»?', ['Repetir sem pensar', 'Desenhar o símbolo à mão diariamente até ele «aparecer»', 'Copiá-lo sempre do livro'], 1, 'A partir da segunda semana, sem copiar de lado nenhum.')
  ],
  10: [
    Q('O que se imagina no Enraizamento?', ['Asas', 'Raízes a sair das plantas dos pés até encontrarem rocha', 'Uma esfera de luz'], 1, 'Sobe a terra pelas raízes e desce o que não precisas.'),
    Q('Quanto tempo dura a Chuva de Reiki?', ['Dois a três minutos', 'Vinte minutos', 'Uma hora'], 0, 'O Banho de Reiki é que dura vinte minutos.'),
    Q('No Banho de Reiki, o que se faz com as mãos?', ['Percorrem-se posições', 'Pousam-se no peito e fica-se', 'Fazem-se cortes no ar'], 1, 'Hoje não é um autotratamento, é um banho.'),
    Q('Onde se manifesta a força interior, segundo o manual?', ['No plexo solar, com o reforço do chakra esplénico', 'Na testa', 'Nas mãos'], 0, 'Essa força vem de dentro.'),
    Q('Para lavar as mãos depois da sessão…', ['Só com um pano', 'Em água corrente, até aos cotovelos se necessário', 'Não é preciso'], 1, 'Em alternativa, álcool dos cotovelos até às mãos.')
  ],
  11: [
    Q('Quanto tempo dura o alinhamento rápido sentado?', ['Cinco minutos', 'Vinte minutos', 'Duas horas'], 1, 'Serve para a família de casa e é a base do Nível 2.'),
    Q('Onde fica o praticante no início do alinhamento sentado?', ['À frente', 'Atrás, pousando as mãos nos ombros', 'Do lado'], 1, 'Passa à frente quando indicado.'),
    Q('Quanto tempo dura uma sessão a um animal?', ['Uma hora', 'Cinco a quinze minutos', 'Um minuto'], 1, 'E um animal doente precisa de veterinário.'),
    Q('Na experiência com plantas…', ['Dás Reiki às duas', 'Dás a uma e não à outra, e comparas ao fim de um mês', 'Só regas com água benta'], 1, 'Duas plantas iguais, só uma com Reiki.'),
    Q('Na receita para dormir, como se respira?', ['Inspira em quatro, expira em seis', 'Inspira em dez, expira em dois', 'Prende o ar'], 0, 'Mãos no peito e depois no abdómen.')
  ],
  12: [
    Q('O que dizer no fim de uma sessão?', ['O nome da doença', 'O que sentiste em linguagem simples, devolvendo a interpretação à pessoa', 'Nada de nada'], 1, 'Por exemplo: «na zona do peito senti mais calor — fez-te algum sentido?»'),
    Q('Podes mandar alguém parar a medicação?', ['Sim, se for leve', 'Nunca, em circunstância nenhuma', 'Só se pedir'], 1, 'Reiki é complementar.'),
    Q('Cobrar pelo Reiki…', ['É proibido', 'É legítimo; o que não é legítimo é aproveitar o desespero de alguém', 'Obriga a descontar'], 1, 'Guarda espaço para quem não pode pagar.'),
    Q('«O que se diz na marquesa…»', ['Pode contar-se a amigos', 'Fica na marquesa', 'Publica-se com autorização'], 1, 'Guardas segredo.'),
    Q('Perante uma situação que não é para ti, o que fazes?', ['Insistes', 'Sabes dizer que não: é maturidade, não incompetência', 'Escondes'], 1, 'Reconhecê-lo é maturidade.')
  ]
};
N1_MODULOS.forEach(m => { m.treino = N1_TREINO[m.ordem] || []; });

window.FORMACAO_V2 = window.FORMACAO_V2 || {};
window.FORMACAO_V2['1'] = {
  nivel: '1',
  manual: { titulo: 'Manual completo do Nível 1 — Shoden', ficheiro: 'Manual-Reiki-Nivel-1-Shoden-Hikari-Fafe.pdf' },
  modulos: N1_MODULOS,
  exame: N1_EXAME
};
