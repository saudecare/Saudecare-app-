/* =========================================================================
   ESTRUTURA DA BIBLIOTECA — Reiki Níveis 1, 2, 3A e 3B
   Hikari Fafe Escola de Reiki

   Dois tipos de item:
   - Vídeo, PDF, imagem: título e categoria já prontos, SEM link — ficam
     à espera que coles o link do Drive, no botão "Colar o link".
   - "Guia de estudo": vem com o TEXTO já escrito. O aluno lê-o
     directamente na app, sem precisar de nenhum link.

   Um item sem link e sem texto nunca aparece ao aluno. Podes criar tudo
   de uma vez e ir completando os vídeos aos poucos.

   COMO USAR
   1. Guarda este ficheiro na raiz do repositório.
   2. Já está ligado no fim do saudecare-core.html.
   3. No separador Biblioteca, carrega no botão de cada nível.
   ========================================================================= */

import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, where }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const app = getApps().length ? getApp() : initializeApp(window.firebaseConfig || {});
const db = getFirestore(app);
const REIKI_TENANT = 'hikari-terapias';

/* categoria, título, tipo — por esta ordem em cada linha */
const ESTRUTURA = {
  '1': [
    ['Guias de estudo', 'Cho Ku Rei — ficha rápida', 'estudo', 'Isto é o resumo do teu primeiro símbolo. Consulta sempre que precisares, sem teres de reler o manual todo.\n\nO que é\n- Um chokurei é um édito imperial: uma ordem, um decreto. É o símbolo da força.\n- Aumenta a energia, concentra-a, protege e limpa. É o interruptor que liga tudo.\n\nComo se desenha\n- Um traço horizontal, da esquerda para a direita.\n- Desce a direito, uma vertical firme.\n- Da base, abre a espiral para dentro, cerca de três voltas e meia.\n\nComo se activa\n- Diz o mantra de forma cadenciada, separando as sílabas: CHO-KU-REI, três vezes.\n- Podes dizê-lo enquanto desenhas, ou depois de desenhares ou visualizares.\n\nPara que o usas neste nível\n- Nas tuas palmas, antes do autotratamento.\n- Para abrir e para fechar a tua prática diária.\n- Para limpar o teu espaço, o quarto, a mesa de trabalho.\n- Para energizar a água, a comida, um objecto teu.\n\nA força não está no traço perfeito — está na tua intenção e na sintonização que recebeste. Um símbolo torto desenhado com sinceridade funciona melhor do que um perfeito desenhado por distracção.', 'cho-ku-rei'],
    ['Vídeos de introdução', 'Introdução e história do Reiki', 'video'],
    ['Vídeos de introdução', 'O imperador Meiji e os seus poemas', 'video'],
    ['Vídeos de introdução', 'Cho Ku Rei — a chave do poder', 'video'],
    ['Vídeos de introdução', 'Os sete chakras', 'video'],
    ['Vídeos de introdução', 'Preparação e limpeza do espaço', 'video'],
    ['Vídeos de introdução', 'Introdução ao autotratamento', 'video'],
    ['Símbolos do nível', 'Cho Ku Rei — imagem do símbolo', 'documento'],
    ['Técnicas na prática', 'Banho seco — na prática', 'video'],
    ['Técnicas na prática', 'Banho seco — técnica detalhada', 'video'],
    ['Técnicas na prática', 'Enraizamento — na prática', 'video'],
    ['Técnicas na prática', 'Enraizamento — técnica detalhada', 'video'],
    ['Técnicas na prática', 'Chuva de Reiki — na prática', 'video'],
    ['Técnicas na prática', 'Chuva de Reiki — técnica detalhada', 'video'],
    ['21 dias de autotratamento', 'Meditação guiada — semana 1', 'audio'],
    ['21 dias de autotratamento', 'Meditação guiada — semana 2', 'audio'],
    ['21 dias de autotratamento', 'Semana 3 — seguindo a tua intuição', 'audio'],
    ['Manuais e materiais', 'Manual do Nível 1 — Shoden', 'manual'],
    ['Manuais e materiais', 'Localização dos chakras', 'documento'],
    ['Manuais e materiais', 'Bónus — limpeza energética', 'documento'],
  ],
  '2': [
    ['Guias de estudo', 'Os três símbolos — ficha rápida', 'estudo', 'Isto é o resumo dos três símbolos deste nível. Serve para consultares antes de uma sessão, sem teres de abrir o manual todo.\n\nCho Ku Rei — o símbolo do poder\n- Já o conheces do Nível 1. Aumenta, concentra, protege e limpa.\n- Mantra: CHO-KU-REI, dito de forma cadenciada, três vezes.\n- Usa-o para abrir e fechar qualquer prática, e para reforçar onde sentires falta de energia.\n\nSei He Ki — o símbolo da harmonia\n- Trabalha o emocional e o mental. Pensa nele como harmonia.\n- Mantra: SEI-HE-KI, três vezes.\n- Usa-o em medos, traumas antigos, hábitos difíceis de mudar, e para limpar espaços.\n- Não há problema em usá-lo sozinho — experimenta, e junta o Cho Ku Rei se sentires que é forte de mais para a pessoa.\n\nHon Sha Ze Sho Nen — o símbolo da distância\n- Traduz-se por «pensamento correcto é a essência do Ser».\n- É o símbolo que abre a ponte para o envio à distância, e também trata processos mentais, passado e futuro.\n- Mantra: dizer o nome completo, HON-SHA-ZE-SHO-NEN.\n\nA ordem que uso, do terceiro para o primeiro\n- Problema físico: Dai Ko Myo (3A) + Cho Ku Rei.\n- Problema emocional: + Sei He Ki.\n- Processo mental, passado ou futuro: + Hon Sha Ze Sho Nen no início de tudo.\n\nRegra de ouro: um símbolo assenta em três coisas — teres sido sintonizado, desenhá-lo, e dizer o mantra. Falta uma, e é só um desenho bonito.', 'simbolos-n2'],
    ['Guias de estudo', 'Reiki à distância — passo a passo', 'estudo', 'O envio à distância usa o nome ou a fotografia de alguém para abrir uma ponte de luz. Aqui vai a versão rápida.\n\nAntes de mais: pede sempre autorização. Se não puderes pedir directamente, pede ao Eu Superior da pessoa — «que a energia flua para o seu Bem Supremo, se ela aceitar».\n\nO envio simples\n- Usa uma fotografia ou um papel com o nome.\n- Desenha por cima o Hon Sha Ze Sho Nen, depois o Sei He Ki. Mantra três vezes em cada.\n- Fica com o papel entre as mãos dez a quinze minutos.\n- Fecha sempre. Dizer em voz alta «está terminado» evita ficares ligado e cansado depois.\n\nO caderno de Reiki\n- Um caderno só para isto. Nome de cada pessoa a lápis.\n- Desenhas os símbolos, do terceiro para o primeiro, e fechas o caderno.\n- Sempre que quiseres enviar: reabres, desenhas outra vez, pousas as mãos no caderno.\n\nA caixa de Reiki\n- Um papel por pedido, com nome e intenção.\n- Envias Reiki à caixa e ela distribui por todos os pedidos lá dentro.\n- Quando um pedido se cumprir, queima o papel.\n\nNunca peças um resultado concreto — pede sempre pelo Bem Supremo da pessoa e de todos os envolvidos. Nem sempre o que queremos é o que nos faz bem.'],
    ['Guias de estudo', 'Reiki presencial — família e amigos', 'estudo', 'A partir deste nível já podes tratar outras pessoas. Aqui vai o essencial para a primeira sessão.\n\nAntes de começar\n- Explica o que vai acontecer. Pede autorização para tocar.\n- A pessoa deitada, tu com as mãos pousadas ou a poucos centímetros do corpo.\n- Activa os símbolos nas tuas palmas antes de começar: desenha do último para o primeiro, com o mantra.\n\nDe frente\n- Cabeça, garganta, cardíaco, plexo solar, esplénico, raiz, joelhos, tornozelos, pés.\n\nDe costas\n- As mesmas zonas principais, ao longo da coluna.\n\nTrês a cinco minutos por posição, mais onde sentires que é preciso.\n\nNo fim\n- Nunca digas «senti um bloqueio no teu fígado». Descreve o que sentiste em palavras simples e devolve a interpretação: «senti mais calor aqui — fez-te sentido?»\n- Avisa sempre da crise de cura: pode haver cansaço, sede, sonhos vivos ou emoções à flor da pele nas horas seguintes. É o processo, não um efeito secundário.\n- Dá água, deixa a pessoa levantar-se devagar.\n\nNunca prometas cura. Nunca aconselhes a parar medicação. O Reiki acompanha — nunca substitui.', 'corpo-tratamento'],
    ['Guias de estudo', 'Técnicas do Okuden — glossário rápido', 'estudo', 'Quatro técnicas novas deste nível, resumidas ao essencial.\n\nHatsurei Ho — emanar a energia universal\n- O conjunto de Kenyoku (banho seco), Joshin Kokyu Ho (respiração), Gassho e Reiji-Ho.\n- Faz-se sentado, uns dez minutos. É a tua rotina diária de purificação.\n\nNentatsu (Seikaku Kaizen Ho) — melhorar o carácter\n- Uma mão no chakra frontal, outra na nuca.\n- Envia uma mensagem curta e positiva — mas tem de ser o que a PESSOA deseja, nunca o que tu achas que ela devia querer.\n\nGyoshi Ho — tratamento pelo olhar\n- Olhar relaxado, sem fixar com força, sobre a zona a tratar.\n- Se os olhos começarem a picar, pára — não se faz com esforço.\n\nKoki Ho — tratamento pelo sopro\n- Inspiras, visualizas o símbolo na boca, sopras sobre a zona.\n- Efeito calmante. Funciona também sobre uma fotografia, à distância.\n\nUsa-as com naturalidade, uma de cada vez. Não precisas de saber todas de cor para começar — precisas de saber que existem e para que servem.'],
    ['Guias de estudo', 'Os 21 dias com símbolos — guia rápido', 'estudo', 'Depois da sintonização de Nível 2, o período de ajuste costuma mexer mais do que o do Nível 1 — porque agora o trabalho é emocional e mental, não só físico.\n\nO compromisso\n- Autotratamento todos os dias, agora com os três símbolos.\n- Vinte minutos chegam. Um dia falhado não estraga nada — retomas no seguinte.\n\nO que podes sentir\n- Emoções antigas sem ligação aparente ao presente.\n- Sonhos muito vivos, memórias da infância.\n- Vontade de arrumar, cortar, mudar hábitos.\n- Ou nada de especial — também é normal.\n\nSe sentires que está a mexer de mais\n- Reduz para a versão curta, só com Cho Ku Rei.\n- Fala com o teu Mestre.\n- Se for algo grande — trauma antigo, sofrimento sério — procura também acompanhamento profissional. O Reiki acompanha esse processo; não o faz sozinho.\n\nRegista uma palavra por dia. Não é para mostrares a ninguém — é para releres daqui a um ano e veres o caminho que fizeste.'],
    ['Vídeos de introdução', 'Boas-vindas ao Okuden', 'video'],
    ['Vídeos de introdução', 'Os cinco princípios, mais fundo', 'video'],
    ['Vídeos de introdução', 'O que é um símbolo — kotodama e mantra', 'video'],
    ['Símbolos do nível', 'Sei He Ki — imagem do símbolo', 'documento'],
    ['Símbolos do nível', 'Hon Sha Ze Sho Nen — imagem do símbolo', 'documento'],
    ['Reiki à distância', 'Como fazer o envio à distância', 'video'],
    ['Reiki à distância', 'O caderno de Reiki', 'video'],
    ['Reiki à distância', 'A caixa de Reiki', 'video'],
    ['Reiki presencial — família e amigos', 'Preparar a sessão', 'video'],
    ['Reiki presencial — família e amigos', 'Posições de tratamento — de frente', 'video'],
    ['Reiki presencial — família e amigos', 'Posições de tratamento — de costas', 'video'],
    ['Técnicas do Okuden', 'Hatsurei Ho', 'video'],
    ['Técnicas do Okuden', 'Nentatsu — mensagem ao subconsciente', 'video'],
    ['Técnicas do Okuden', 'Gyoshi Ho e Koki Ho', 'video'],
    ['21 dias com símbolos', 'Meditação guiada — semana 1', 'audio'],
    ['21 dias com símbolos', 'Meditação guiada — semana 2', 'audio'],
    ['21 dias com símbolos', 'Meditação guiada — semana 3', 'audio'],
    ['Manuais e materiais', 'Manual do Nível 2 — Okuden', 'manual'],
  ],
  '3A': [
    ['Guias de estudo', 'O Dai Ko Myo — ficha rápida', 'estudo', 'O símbolo do Mestre, que recebes neste nível.\n\nO que é\n- «Grande luz brilhante». Liga-te ao que há de mais elevado.\n- No Reiki, entende-se unicamente como energia — não precisas de mudar de crença nenhuma para o usar.\n\nComo se desenha\n- Três caracteres japoneses um por baixo do outro: dai, ko, myo.\n- De cima para baixo. Dentro de cada carácter, da esquerda para a direita.\n\nComo se activa\n- Desenha ou visualiza, e diz o mantra três vezes: Dai Ko Myo, Dai Ko Myo, Dai Ko Myo.\n- Se não visualizares bem, não é defeito — desenha num papel e olha para ele, ou fica só com o mantra e a intenção.\n\nQuando usar\n- Problemas físicos: Dai Ko Myo + Cho Ku Rei.\n- Emocionais: + Sei He Ki.\n- Mentais, passado ou futuro: + Hon Sha Ze Sho Nen no início.\n\nUm cuidado: nem sempre é recomendado logo na primeira sessão com alguém novo — trabalha no campo espiritual, e nem toda a gente está pronto para tanto de uma vez. E enraíza sempre a pessoa depois — mãos nos pés — porque pode ficar com sensação de tontura.', 'dai-ko-myo'],
    ['Guias de estudo', 'Trabalho interior — guia rápido', 'estudo', 'Este nível pede um trabalho que não se ensina só com técnicas: olhar para o que costumas evitar.\n\nA criança interior\n- Gassho, respiração, enraizamento.\n- Dai Ko Myo e Sei He Ki nas palmas, mãos no peito.\n- Formula a intenção de estares disponível para a criança que foste, sem exigir nada.\n- Se vier uma imagem ou uma idade, deixa vir. Se não vier nada, também está certo.\n\nO lado sombra\n- É olhar para o que não gostas de admitir em ti — inveja, orgulho, preguiça, vontade de que alguém falhasse.\n- Não é para te castigares. É para deixares de gastar energia a esconder.\n- Um terapeuta que não conhece a própria sombra projecta-a nos pacientes. É por isso que este trabalho vem antes do mestrado.\n\nA carta que não se envia\n- Escreve a alguém com quem tens uma questão por resolver. Diz tudo, sem filtro.\n- Dá Reiki à carta com os quatro símbolos. Queima-a ou guarda-a — nunca a envies.\n\nSe o que vier for grande de mais para tratares sozinho, isto não é psicoterapia — é acolhimento. Procura também apoio profissional.'],
    ['Guias de estudo', 'Técnicas do 3A — glossário rápido', 'estudo', 'Três técnicas próprias deste nível.\n\nJaki Kiri Joka Ho — cortar e purificar\n- Serve para limpar objectos, cristais, jóias, ou energia estagnada.\n- Respiração profunda, energia no tanden, e — com a respiração PRESA — três golpes rápidos por cima do objecto, de dentro para fora.\n- Só depois soltas o ar. Este pormenor evita contaminares-te com o que estás a transmutar.\n- Fecha com Cho Ku Rei, para energizar o que limpaste.\n\nRespiração com o Cho Ku Rei\n- Sentado, olhos fechados. Visualiza o símbolo à frente, à altura de cada chakra.\n- Inspiras e sentes o símbolo a ser absorvido; expiras e vês as emoções negativas a sair como fumo escuro.\n- Percorres os sete centros, um a um, até ao coronário.\n\nO Antahkarana\n- É tibetano — não faz parte do Usui Reiki Ryoho original. Uso-o porque é útil, mas digo sempre a origem.\n- Ao contrário dos símbolos do Reiki, funciona pela simples presença — não precisa de mantra nem de desenho.\n- Serve na sala de tratamento, na meditação, ou para limpar objectos colocados entre dois desenhos do símbolo.'],
    ['Guias de estudo', 'Sessão e ética do 3A — o que muda', 'estudo', 'A técnica de tratamento não muda muito em relação ao Nível 2. O que muda és tu.\n\nNa sessão\n- Fala menos. Confia mais no silêncio.\n- Acrescenta o símbolo que fizer sentido, e só esse — não uses os quatro por rotina.\n- Se sentires que não é para aplicar Dai Ko Myo logo na primeira sessão com alguém, confia nesse sentido.\n\nÉtica própria deste nível\n- És terapeuta, não és Mestre. Não sintonizes ninguém — nem para experimentar, nem à família, nem de graça.\n- Não uses o nível como argumento de venda.\n- Reconhece o que não é para ti: saber encaminhar para outro profissional é competência, não falha.\n- Cuida de ti primeiro — um terapeuta esgotado acaba por dar do que não tem.\n\nUma pergunta para te fazeres antes de avançares para o mestrado: quero o 3B para partilhar o que me fez bem, ou por estatuto e certificados? Só a primeira resposta está pronta para ensinar.'],
    ['Vídeos de introdução', 'O que é o Shinpiden', 'video'],
    ['Vídeos de introdução', 'Kensho e os poemas do imperador', 'video'],
    ['Vídeos de introdução', 'Os símbolos e os cinco elementos', 'video'],
    ['Símbolos do nível', 'Dai Ko Myo — imagem do símbolo', 'documento'],
    ['Meditação e trabalho interior', 'Meditação com o Dai Ko Myo', 'audio'],
    ['Meditação e trabalho interior', 'O trabalho da criança interior', 'video'],
    ['Meditação e trabalho interior', 'O trabalho do lado sombra', 'video'],
    ['Técnicas do 3A', 'Jaki Kiri Joka Ho', 'video'],
    ['Técnicas do 3A', 'Respiração com o Cho Ku Rei', 'video'],
    ['Técnicas do 3A', 'O Antahkarana', 'video'],
    ['21 dias com o Dai Ko Myo', 'Meditação guiada — semana 1', 'audio'],
    ['21 dias com o Dai Ko Myo', 'Meditação guiada — semana 2', 'audio'],
    ['21 dias com o Dai Ko Myo', 'Meditação guiada — semana 3', 'audio'],
    ['Manuais e materiais', 'Manual do Nível 3A — Shinpiden', 'manual'],
  ],
  '3B': [
    ['Guias de estudo', 'Dai Ko Myo tibetano e Raku — ficha rápida', 'estudo', 'Os dois símbolos que só existem no mestrado.\n\nDai Ko Myo tibetano\n- Outro desenho do mesmo símbolo que já conheces do 3A — mais simples de memorizar.\n- É o que se usa no momento da sintonização, dentro do sopro violeta.\n- Não substitui o tradicional: usa a tibetana para sintonizar, e a que preferires no teu trabalho pessoal.\n\nRaku — a serpente de fogo\n- Representa a serpente enrolada na base da coluna, a subir pelos centros energéticos.\n- No Reiki traça-se de cima para baixo — ao contrário do budismo tibetano — porque o que queremos é ancorar a energia no corpo.\n- Serve para fixar a energia no aluno, separar o teu campo do dele, e enraizar quem ficou disperso.\n\nO erro mais comum: fazer a sintonização toda bem e esquecer o Raku no fim. Sem ele o aluno fica ligado a ti, não à fonte. É o ponto final da frase — nunca saltes.', 'raku-tibetano'],
    ['Guias de estudo', 'A sintonização em 4 partes — guia de bolso', 'estudo', 'Para consultares antes de sintonizares alguém, sem teres de reler o manual todo.\n\nAntes de tudo: Hui Yin contraído, língua no palato — mantém os dois do princípio ao fim.\n\nI · Abertura (por trás do aluno)\n- Invoca a tua protecção, afirma o nível a transmitir.\n- Símbolos nas tuas palmas e à tua frente. Raku nas costas dele.\n- Mãos no topo da cabeça, respiração violeta, sopro violeta com o Dai Ko Myo tibetano.\n- Repete com os símbolos seguintes, do 3A para baixo, conforme o nível.\n\nII · Transmissão (pela frente)\n- Mãos dele abertas como um livro. Desenha o símbolo do nível nas palmas, toca três vezes.\n- Sopra das mãos ao plexo, à testa, ao topo, e de volta às mãos.\n- Só no Nível 1: toca também os pés.\n\nIII · Fecho (por trás)\n- Visualiza a bola de fogo vermelha no chakra básico.\n- Afirmação positiva, três vezes, pelo nome dele.\n- Cho Ku Rei atrás de uma porta que se sela como uma solda.\n- Raku entre vocês, para separar os campos. Nunca saltes este passo.\n\nIV · Bênção (pela frente)\n- Solta a postura, liberta a energia residual sobre ele ao expirar.\n- Água e silêncio antes de falarem.\n\nEnganaste-te num gesto? Não é grave — retoma ou repete a parte. O que não pode faltar é a intenção clara do nível que estás a transmitir.', 'sintonizacao-4partes'],
    ['Guias de estudo', 'Sintonização à distância e online — guia rápido', 'estudo', 'Três formas de sintonizar sem estar na mesma sala.\n\nVideochamada ou chamada de voz\n- Guias o aluno em tempo real: postura, enraizamento, e vais dizendo por onde vais — «vou abrir o teu coronário», sem descreveres os símbolos.\n- Fala pouco e devagar. É no silêncio entre as frases que ele sente.\n- Deixa-o em silêncio um ou dois minutos no fim, antes de desligar.\n\nHora marcada, sem chamada\n- Combinam uma hora exacta. Ele senta-se e pede a ligação; tu fazes o procedimento completo do teu lado.\n\nDo teu lado, duas técnicas\n- Substituto: uma almofada ou boneco, programado para representar o aluno.\n- Visualização: formas a imagem mental e fazes tudo como se ele estivesse à tua frente.\n\nA formação online não é o mesmo que a sintonização à distância — a sintonização é só o momento energético. A formação é todo o resto: manual lido, dúvidas esclarecidas, trabalho entregue, antes de sintonizares. Sem isso é vender um certificado, não ensinar.'],
    ['Guias de estudo', 'Formar e avaliar alunos — guia rápido', 'estudo', 'O que conta antes de um aluno avançar de nível.\n\nNão há prazo fixo — o que conta é o trabalho entregue\n- Testes, exercícios, respostas a situações, registos de autotratamento.\n- Vale mais a intenção com que o aluno se entrega do que decorar técnicas.\n\nNo dia da formação\n- Chega cedo, recebe cada aluno pelo nome.\n- Alterna teoria com prática — ninguém aguenta duas horas só a ouvir.\n- Sintoniza com a sala em silêncio, e dá tempo depois — não marques nada logo a seguir.\n\nQuando um aluno quer desistir\n- Raramente é falta de vontade — é não sentir nada enquanto o colega do lado sente tudo.\n- Senta-te com ele a sós. Pergunta o que espera sentir. Conta uma vez em que tu duvidaste.\n\nÉtica que não se negoceia\n- Não sintonizes quem não está preparado, nem por insistência, nem porque paga.\n- Não aceleres níveis. Diz sempre a verdade sobre a origem do que ensinas.\n- O teu trabalho é tornar o aluno independente de ti — não criar discípulos.'],
    ['Vídeos de introdução', 'O que é ser Mestre', 'video'],
    ['Vídeos de introdução', 'Os seis símbolos', 'video'],
    ['Símbolos do nível', 'Dai Ko Myo tibetano — imagem do símbolo', 'documento'],
    ['Símbolos do nível', 'Raku — imagem do símbolo', 'documento'],
    ['A sintonização passo a passo', 'A postura — Hui Yin, língua, respiração violeta', 'video'],
    ['A sintonização passo a passo', 'Parte I — Abertura', 'video'],
    ['A sintonização passo a passo', 'Parte II — Transmissão', 'video'],
    ['A sintonização passo a passo', 'Parte III — Fecho', 'video'],
    ['A sintonização passo a passo', 'Parte IV — Bênção', 'video'],
    ['Sintonização à distância e online', 'As três formas de sintonizar à distância', 'video'],
    ['Sintonização à distância e online', 'Como conduzir uma formação online', 'video'],
    ['Formar e avaliar', 'Preparar e conduzir uma formação', 'video'],
    ['Formar e avaliar', 'Avaliar um aluno', 'video'],
    ['Manuais e materiais', 'Manual do Nível 3B — Gokukaiden', 'manual'],
  ],
};

async function gravarNivel(nivel){
  const existentes = await getDocs(query(
    collection(db, 'tenants', REIKI_TENANT, 'reikiLibrary'),
    where('nivel', '==', nivel)
  ));
  if (!existentes.empty){
    alert('O Nível ' + nivel + ' já tem ' + existentes.size + ' recursos na biblioteca. Seed cancelado.');
    return;
  }
  let n = 0;
  for (const linha of ESTRUTURA[nivel]){
    const [categoria, titulo, tipo, conteudo, ilustracao] = linha;
    await addDoc(collection(db, 'tenants', REIKI_TENANT, 'reikiLibrary'), {
      nivel, categoria, titulo, tipo,
      url: '', conteudo: conteudo || '', ilustracao: ilustracao || '',
      pago: false, descricao: '',
      criadoEm: new Date().toISOString()
    });
    n++;
  }
  alert('Nível ' + nivel + ': ' + n + ' títulos criados na biblioteca.\n\nAgora cola o link de cada um, à medida que subires os ficheiros ao Drive.');
}

window.seedReikiBiblioteca1  = () => gravarNivel('1');
window.seedReikiBiblioteca2  = () => gravarNivel('2');
window.seedReikiBiblioteca3A = () => gravarNivel('3A');
window.seedReikiBiblioteca3B = () => gravarNivel('3B');
