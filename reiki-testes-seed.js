/* =========================================================================
   TESTE FINAL DE CADA NÍVEL — Reiki 1, 2, 3A e 3B
   Hikari Fafe Escola de Reiki

   As perguntas vêm das mesmas que já treinaram no percurso de cada nível
   — por isso o teste final não traz nada de surpresa: é o que já
   estudaram, tudo junto numa só entrega.

   O teste não decide sozinho. A avaliação continua a ser tua — o que
   pesa mais é a entrega e a prática de cada aluno, como já dizes no
   separador Testes.

   COMO USAR
   1. Guarda este ficheiro na raiz do repositório.
   2. Já está ligado no fim do saudecare-core.html.
   3. No separador Testes, carrega no botão de cada nível.
   ========================================================================= */

import { initializeApp, getApps, getApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs, query, where }
  from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

const app = getApps().length ? getApp() : initializeApp(window.firebaseConfig || {});
const db = getFirestore(app);
const REIKI_TENANT = 'hikari-terapias';

const PERGUNTAS_1 = [
    { texto: 'Um amigo diz-te que não pode fazer Reiki porque não é religioso. O que respondes?', opcoes: ['Que o Reiki não é religião e se pratica com qualquer fé, ou com nenhuma', 'Que precisa pelo menos de acreditar em energia para funcionar', 'Que terá de adoptar as crenças budistas do método'], correta: 0 },
    { texto: 'Alguém com uma doença prolongada procura-te. Qual é o enquadramento correcto?', opcoes: ['O Reiki pode substituir o tratamento se a pessoa preferir', 'O Reiki acompanha, sempre a par do tratamento médico, e nunca o substitui', 'Só se deve dar Reiki depois de a pessoa ter alta'], correta: 1 },
    { texto: 'Encontras uma escola que ensina os símbolos por outra ordem. O que fazes?', opcoes: ['Corrijo-os, porque a minha versão é a correcta', 'Aprendo bem a minha, pratico-a com honestidade e respeito quem aprendeu outra', 'Deixo de praticar até perceber qual é a verdadeira'], correta: 1 },
    { texto: 'Porque é que os cinco princípios começam por «só por hoje»?', opcoes: ['Porque só se praticam durante a formação', 'Porque torna o compromisso possível: hoje dá para tentar, e amanhã recomeça-se', 'Porque cada princípio corresponde a um dia da semana'], correta: 1 },
    { texto: 'Estás prestes a começar uma sessão. Pela ordem dos três pilares, o que vem primeiro?', opcoes: ['Chiryo — pousar as mãos e começar', 'Gassho, depois Reiji-Ho, e só então Chiryo', 'Reiji-Ho, e Gassho só no fim'], correta: 1 },
    { texto: 'Durante o Gassho a tua mente foge para a lista de compras. O que fazes?', opcoes: ['Recomeço do zero, porque o exercício ficou estragado', 'Trago a atenção de volta ao ponto onde os dedos se tocam, sem me censurar', 'Forço-me a esvaziar a mente até não haver pensamento nenhum'], correta: 1 },
    { texto: 'Acabas uma prática exausto. Qual é a causa mais provável?', opcoes: ['Dei energia a mais e fiquei sem a minha', 'Envolvi-me emocionalmente no problema, porque a energia atravessa-me e não sai de mim', 'A minha sintonização está a enfraquecer'], correta: 1 },
    { texto: 'A tua mão sente repulsa numa zona, como se quisesse afastar-se. O que fazes?', opcoes: ['Forço a mão a ficar até a sensação passar', 'Respeito e volto mais tarde', 'Dou por terminada a prática'], correta: 1 },
    { texto: 'Não sentes nada nas mãos, semana após semana. Isso quer dizer que...', opcoes: ['O Reiki não está a funcionar em ti', 'Nada — o Reiki não depende de sentires, e há praticantes excelentes que sentem pouco', 'Precisas de nova sintonização'], correta: 1 },
    { texto: 'Falhaste o dia 9 do ciclo dos 21 dias. O que fazes?', opcoes: ['Recomeço a contagem no dia 1', 'Retomo no dia seguinte, sem drama e sem recomeçar a contagem', 'Faço dois autotratamentos no dia seguinte'], correta: 1 },
    { texto: 'Depois da sintonização não sentiste absolutamente nada de especial. Isso significa...', opcoes: ['Que a sintonização não resultou', 'Nada de mau — é perfeitamente normal, e muita gente sente apenas calma', 'Que devo pedir uma segunda sintonização'], correta: 1 },
    { texto: 'A sintonização perde-se se estiveres muito tempo sem praticar?', opcoes: ['Sim, ao fim de um ano tem de ser renovada', 'Não se perde — fica adormecida, e a facilidade diminui como em tudo o que não se treina', 'Perde-se apenas o símbolo, não o canal'], correta: 1 },
    { texto: 'Desenhaste a espiral com três voltas em vez de três e meia. O símbolo funciona?', opcoes: ['Não, o traço tem de estar exacto', 'Sim — a força está na intenção e na sintonização, não no rigor do traço', 'Só se repetir o mantra mais vezes para compensar'], correta: 1 },
    { texto: 'Hoje não te apetece nada fazer o autotratamento. O que fazes?', opcoes: ['Salto e recupero amanhã com uma sessão maior', 'Faço a versão curta de cinco minutos, sem negociar comigo', 'Avalio primeiro se está a resultar, e decido a partir daí'], correta: 1 },
    { texto: 'Porque é que nesta escola o Cho Ku Rei se ensina logo no Nível 1?', opcoes: ['Porque é o símbolo mais fácil de desenhar', 'Porque a energia de hoje está mais densa e o aluno deve ter logo uma ferramenta que funcione', 'Porque os outros símbolos só existem a partir do 3A'], correta: 1 },
    { texto: 'Uma vizinha fica a saber que andas nisto e pede-te uma sessão. O que fazes?', opcoes: ['Faço, é só uma vez', 'Digo com tranquilidade que estou no primeiro nível, que aqui trato de mim, da família de casa e dos animais, e que terei todo o gosto quando avançar', 'Faço, mas sem lhe dizer que ainda não estou habilitado'], correta: 1 },
    { texto: 'Sentiste calor prolongado sobre o fígado de alguém durante uma prática. Podes dizer-lhe que tem um problema no fígado?', opcoes: ['Sim, é informação útil para a pessoa', 'Não — não diagnosticas, não tens formação para isso e não é o teu papel', 'Só se ela já andar a fazer exames'], correta: 1 },
    { texto: 'Uma pessoa quer marcar contigo todas as semanas porque diz que sem isso não funciona. O que te diz o manual?', opcoes: ['É sinal de que o trabalho está a resultar', 'Não crias dependência — se alguém precisa de ti para funcionar, alguma coisa correu mal', 'Devo aumentar a frequência das sessões'], correta: 1 },
];

const PERGUNTAS_2 = [
    { texto: 'O que é que o Nível 2 te permite, que o Nível 1 não permitia?', opcoes: ['Aplicar Reiki a outras pessoas, incluindo à distância', 'Sintonizar alunos', 'Apresentar-me como terapeuta profissional'], correta: 0 },
    { texto: 'O que quer dizer hikari?', opcoes: ['Energia', 'Luz', 'Mestre'], correta: 1 },
    { texto: 'Sentes mais emoções e mais sensibilidade desde a sintonização. O que é?', opcoes: ['Sinal de que alguma coisa correu mal', 'Uma das seis coisas que costumam aparecer neste nível', 'Preciso de uma nova sintonização'], correta: 1 },
    { texto: 'Um símbolo funciona porque…', opcoes: ['O desenho está perfeito', 'Foste sintonizado, desenhaste e entoaste o mantra', 'Repetiste o nome muitas vezes'], correta: 1 },
    { texto: 'Kotodama, jumon e mantra querem dizer…', opcoes: ['Três símbolos diferentes', 'Praticamente o mesmo, em tradições diferentes', 'Três níveis de Reiki'], correta: 1 },
    { texto: 'Já sei os símbolos de cor. Preciso de continuar a desenhá-los em papel?', opcoes: ['Não, a visualização basta', 'Sim, de vez em quando — um dia vais precisar de os saber desenhar', 'Só se for para ensinar'], correta: 1 },
    { texto: 'Porque é que lhe chamamos o interruptor?', opcoes: ['Porque é o mais fácil de desenhar', 'Porque serve para ligar a energia e para a intensificar', 'Porque é o primeiro que se aprende'], correta: 1 },
    { texto: 'Podes usar o Cho Ku Rei nos medicamentos de alguém?', opcoes: ['Sim, para potenciar os efeitos desejáveis e reduzir os indesejáveis', 'Não, nunca', 'Só se a pessoa deixar de os tomar'], correta: 0 },
    { texto: 'Uma aluna usa a protecção das seis direcções várias vezes ao dia, sempre que sai de casa. O que lhe dizes?', opcoes: ['Muito bem, quanto mais melhor', 'Que a protecção não é blindagem contra um mundo hostil, e que quem se protege de tudo alimenta o medo', 'Que está a gastar energia do símbolo'], correta: 1 },
    { texto: 'O que é o kokoro?', opcoes: ['O nome japonês do coração físico', 'Mente e coração unidos, e não separados como no ocidente', 'Uma técnica de respiração'], correta: 1 },
    { texto: 'Uma pessoa começa a chorar durante uma sessão em que usaste Sei He Ki. O que fazes?', opcoes: ['Paro imediatamente', 'Fico em silêncio, mantenho as mãos, e não pergunto nada', 'Pergunto-lhe o que está a ver'], correta: 1 },
    { texto: 'Alguém te diz que o Sei He Ki nunca se usa sozinho. Está certo?', opcoes: ['Sim, é perigoso', 'É um mito — experimenta, e se for forte de mais para a pessoa junta o Cho Ku Rei', 'Só se usa sozinho no autotratamento'], correta: 1 },
    { texto: 'Queres um trabalho em concreto. Como envias?', opcoes: ['Peço aquele trabalho especificamente', 'Peço que a energia flua para que consiga um bom trabalho, para o meu Bem Supremo e o de todos', 'Envio ao patrão para ele me escolher'], correta: 1 },
    { texto: 'Ficaste cansado depois de um envio. Qual é a causa mais provável?', opcoes: ['Dei energia a mais', 'Não fechei — fiquei ligado', 'O símbolo estava mal desenhado'], correta: 1 },
    { texto: 'Não consegues pedir autorização a alguém para lhe enviar. O que fazes?', opcoes: ['Envio na mesma, a intenção é boa', 'Peço ao Eu Superior da pessoa que, caso ela aceite, a energia flua para ela', 'Não envio de todo'], correta: 1 },
    { texto: 'Achas que uma paciente devia deixar o marido, e ocorre-te usar o Nentatsu para isso.', opcoes: ['Faço, é para o bem dela', 'Não faço — a mensagem tem de ser o que ela deseja, não o que eu acho', 'Faço, mas aviso-a depois'], correta: 1 },
    { texto: 'Uma pessoa diz-te que vai deixar a medicação porque o Reiki está a resultar.', opcoes: ['Fico contente pelo progresso', 'Digo-lhe com clareza que o Reiki não substitui medicina e encaminho-a ao médico', 'Não me compete opinar'], correta: 1 },
    { texto: 'Alguém quer marcar contigo todas as semanas porque diz que sem isso não funciona.', opcoes: ['É sinal de que o meu trabalho resulta', 'Não crio dependência — se alguém precisa de mim para funcionar, alguma coisa está errada', 'Aumento a frequência'], correta: 1 },
];

const PERGUNTAS_3A = [
    { texto: 'Já posso chamar-me Mestre de Reiki?', opcoes: ['Sim, o 3A é o nível de Mestre', 'Não — posso dizer que tenho o Nível 3A; o título de Mestre é do 3B', 'Sim, se não sintonizar ninguém'], correta: 1 },
    { texto: 'Ando mais sensível e mais irritadiço desde a sintonização.', opcoes: ['Correu alguma coisa mal', 'É frequente nos primeiros meses — mantenho a prática, durmo o que preciso, e falo com o meu Mestre', 'Devo parar a prática até passar'], correta: 1 },
    { texto: 'O que é que o 3A te habilita a fazer, que o 3A não fazia antes?', opcoes: ['Sintonizar alunos', 'Trabalhar como terapeuta de Reiki', 'Dar formação'], correta: 1 },
    { texto: 'O que é o kensho?', opcoes: ['Um símbolo', 'A transformação da consciência — ver a própria natureza', 'Uma técnica de respiração'], correta: 1 },
    { texto: 'Um praticante usa sempre os quatro símbolos em todas as sessões.', opcoes: ['Está a aprofundar', 'Está a enfeitar — deve perguntar-se, antes de cada um, para quê', 'Está certo, quanto mais melhor'], correta: 1 },
    { texto: 'Alguém te diz que o seu sistema tem trinta símbolos e cura tudo.', opcoes: ['Deve ser melhor do que o nosso', 'Respeito, e mantenho os símbolos tradicionais se pratico Usui Reiki Ryoho', 'Digo-lhe que está errado'], correta: 1 },
    { texto: 'Um aluno pergunta se o Dai Ko Myo é budista.', opcoes: ['Sim, é preciso ser budista para o usar', 'Tem raízes ligadas a figuras budistas, mas no Reiki compreende-se unicamente como energia', 'Não tem origem nenhuma conhecida'], correta: 1 },
    { texto: 'Viste noutra escola um Dai Ko Myo diferente do teu. Qual é o certo?', opcoes: ['O meu', 'O deles', 'Os dois existem e funcionam para quem foi sintonizado com eles'], correta: 2 },
    { texto: 'Não consegues visualizar o símbolo.', opcoes: ['Então não posso usá-lo', 'Desenho-o num papel e olho para ele, ou limito-me ao mantra e ao sentir', 'Tenho de treinar até conseguir visualizar'], correta: 1 },
    { texto: 'Primeira sessão com uma pessoa nova. Usas logo o Dai Ko Myo?', opcoes: ['Sim, é o símbolo mais forte', 'Tenho em atenção a capacidade de integração dela — nem sempre é recomendado logo na primeira ou segunda', 'Nunca o uso nos outros'], correta: 1 },
    { texto: 'Uma pessoa levanta-se da marquesa com tonturas depois de um trabalho com o Dai Ko Myo.', opcoes: ['É normal, vai passar', 'Enraízo-a: mãos nos pés, ou a prática de enraizamento', 'Dou-lhe mais Reiki na cabeça'], correta: 1 },
    { texto: 'Na meditação, o símbolo desfaz-se ao fim de poucos segundos.', opcoes: ['Estou a fazer mal', 'Refaço-o com calma, sem me censurar — é isso o exercício', 'Devo usar um papel em vez de visualizar'], correta: 1 },
    { texto: 'Uma paciente traz-te um trauma antigo e grave, e começa a desmoronar-se.', opcoes: ['Continuo, o Reiki resolve', 'Acolho, fico presente, e encaminho para acompanhamento profissional', 'Interrompo e mando-a embora'], correta: 1 },
    { texto: 'No Jaki Kiri Joka Ho, qual é o pormenor que não se pode falhar?', opcoes: ['Os três golpes serem rápidos', 'Manter a respiração presa ao longo dos três cortes', 'O objecto estar na mão esquerda'], correta: 1 },
    { texto: 'Um aluno teu diz que o Antahkarana é um símbolo do Reiki tradicional.', opcoes: ['Confirmo', 'Corrijo com clareza: é tibetano, não faz parte do Usui Reiki Ryoho', 'Não digo nada para não o desiludir'], correta: 1 },
    { texto: 'Um amigo pede-te para o sintonizares no Nível 1, só para experimentar.', opcoes: ['Faço, é só uma experiência', 'Não faço — não tenho os símbolos nem a preparação, e isso é do 3B', 'Faço se ele não contar a ninguém'], correta: 1 },
    { texto: 'Porque é que o trabalho sobre o lado sombra vem antes do mestrado?', opcoes: ['Para o aluno sofrer menos depois', 'Porque um terapeuta que não conhece a própria sombra projecta-a nos pacientes', 'É indiferente, pode ser depois'], correta: 1 },
    { texto: 'Porque é que queres o 3B?', opcoes: ['Pelo estatuto e pelo preço das formações', 'Para partilhar aquilo que me fez bem', 'Para ter mais um certificado'], correta: 1 },
];

const PERGUNTAS_3B = [
    { texto: 'No Reiki, Mestre quer dizer…', opcoes: ['Quem sabe tudo sobre Reiki', 'Quem está habilitado a transmitir', 'Quem tem mais anos de prática'], correta: 1 },
    { texto: 'Tens o 3B mas não te sentes preparado para dar formação.', opcoes: ['Tenho de dar na mesma, senão o nível perde-se', 'Não sou obrigado a ensinar — há mestres que só atendem', 'Devo devolver o certificado'], correta: 1 },
    { texto: 'Qual é a ordem de elevar um espaço?', opcoes: ['Do Cho Ku Rei para o Raku', 'Do Raku para o Cho Ku Rei — do mais subtil ao mais denso', 'A ordem é indiferente'], correta: 1 },
    { texto: 'Um aluno pergunta de onde vêm estes dois símbolos.', opcoes: ['Digo que são do Mestre Usui', 'Digo com naturalidade que vêm do Reiki Essencial e não do núcleo original', 'Mudo de assunto'], correta: 1 },
    { texto: 'Fizeste a sintonização toda bem e esqueceste-te do Raku no fim.', opcoes: ['Não faz mal, o essencial já foi feito', 'O aluno fica ligado a mim — tenho de fazer o fecho', 'Faço na próxima vez'], correta: 1 },
    { texto: 'Em que sentido se traça o Raku no Reiki?', opcoes: ['De baixo para cima, como no budismo tibetano', 'De cima para baixo, do topo da cabeça em direcção aos pés', 'Da esquerda para a direita'], correta: 1 },
    { texto: 'A meio de uma sintonização soltas o Hui Yin sem querer.', opcoes: ['Interrompo tudo e recomeço', 'Volto a contrair, sem drama, e continuo', 'Termino sem ele'], correta: 1 },
    { texto: 'O que muda o procedimento de um nível para outro?', opcoes: ['Quase tudo', 'Só os símbolos que colocas nas mãos do aluno', 'A ordem das quatro partes'], correta: 1 },
    { texto: 'Para que serve a língua no palato?', opcoes: ['Para não falares durante o processo', 'Com o Hui Yin, fecha o circuito entre os canais da frente e das costas', 'Para acalmar a respiração'], correta: 1 },
    { texto: 'Enganaste-te num gesto a meio da sintonização.', opcoes: ['Está estragada, tenho de repetir noutro dia', 'Retomo de onde estava, ou repito a parte inteira — a intenção sustenta o processo', 'Continuo e não digo nada'], correta: 1 },
    { texto: 'Estás a sintonizar quatro pessoas ao mesmo tempo. Como organizas?', opcoes: ['Faço as quatro partes numa pessoa, depois passo à seguinte', 'Repito cada parte em todos antes de passar à parte seguinte', 'Tanto faz'], correta: 1 },
    { texto: 'Qual é o único nível em que se tocam também os pés?', opcoes: ['O 3B', 'O Nível 1', 'Todos'], correta: 1 },
    { texto: 'Um aluno vai receber a sintonização por videochamada. O que muda no procedimento?', opcoes: ['Toco nele através do ecrã', 'Nada — uso o substituto ou a visualização, como em qualquer sintonização à distância', 'Faço uma versão mais curta'], correta: 1 },
    { texto: 'Alguém te diz que sintonização à distância não funciona.', opcoes: ['Concordo, é melhor não fazer', 'Explico que a energia não tem limites, e que recusar isso seria limitar o Reiki por uma regra nossa', 'Discuto até convencer'], correta: 1 },
    { texto: 'Vais sintonizar à distância alguém que nunca viste.', opcoes: ['Faço, basta a intenção', 'Certifico-me primeiro de que houve formação a sério: manual lido, dúvidas esclarecidas, trabalho entregue', 'Não faço nunca'], correta: 1 },
    { texto: 'Um aluno teu insiste em fazer o nível seguinte, mas não entregou trabalho nenhum.', opcoes: ['Sintonizo, é ele que sabe de si', 'Digo-lhe a sós, com respeito, o que falta — e deixo a porta aberta', 'Corto relações'], correta: 1 },
    { texto: 'Um aluno diz-te que não sente nada e que vai desistir.', opcoes: ['Digo-lhe que é normal e passo à frente', 'Sento-me com ele, pergunto o que espera sentir, e conto-lhe uma vez em que duvidei', 'Dou-lhe outra sintonização'], correta: 1 },
    { texto: 'Alguém te oferece o dobro para fazer os quatro níveis em três meses.', opcoes: ['Aceito, é a escolha dele', 'Recuso — não se acelera ninguém', 'Aceito mas dou menos matéria'], correta: 1 },
];


const TITULOS = {'1': 'Nível 1 — Shoden', '2': 'Nível 2 — Okuden', '3A': 'Nível 3A — Shinpiden', '3B': 'Nível 3B — Gokukaiden'};
const PERGUNTAS = { '1': PERGUNTAS_1, '2': PERGUNTAS_2, '3A': PERGUNTAS_3A, '3B': PERGUNTAS_3B };

async function gravarTeste(nivel){
  const existentes = await getDocs(query(
    collection(db, 'tenants', REIKI_TENANT, 'reikiQuizzes'),
    where('nivel', '==', nivel)
  ));
  if (!existentes.empty){
    alert('O Nível ' + nivel + ' já tem ' + existentes.size + ' teste(s). Seed cancelado para não duplicar.');
    return;
  }
  await addDoc(collection(db, 'tenants', REIKI_TENANT, 'reikiQuizzes'), {
    titulo: 'Teste final — ' + TITULOS[nivel],
    nivel, notaMinima: 70, perguntas: PERGUNTAS[nivel],
    criadoEm: new Date().toISOString()
  });
  alert('Teste final do ' + TITULOS[nivel] + ' criado, com ' + PERGUNTAS[nivel].length + ' perguntas.');
}

window.seedReikiTeste1  = () => gravarTeste('1');
window.seedReikiTeste2  = () => gravarTeste('2');
window.seedReikiTeste3A = () => gravarTeste('3A');
window.seedReikiTeste3B = () => gravarTeste('3B');
