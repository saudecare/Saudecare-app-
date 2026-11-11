/* ✨ Motor do assistente de Casos e Alvos — exclusivo da Hikari Fafe.
   Lê o que escreves (ex.: "durmo mal, acordo de noite para urinar, quero emagrecer"),
   reconhece os temas e monta a pesquisa com o pêndulo, as interferências externas,
   as etiquetas sugeridas, os chakras e os sinais para levar ao médico.
   Funciona só com regras e listas escritas de raiz: não usa IA nem envia nada para fora. */

const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\s+/g, ' ');

export const EXEMPLOS = [
  'Quero emagrecer e tratar a apneia do sono',
  'Durmo mal, acordo muitas vezes de noite para urinar e quero perder peso',
  'Quero vender a casa e não aparece ninguém',
  'O meu negócio está parado, sem clientes',
  'Tenho um processo em tribunal que não anda',
  'Quero deixar de fumar'
];

const EXTERNAS = [
  '🌐 Geopatia no local onde dorme ou passa mais tempo (correntes de água, falhas, cruzamentos)',
  '🌐 Campo eletromagnético (telemóvel, wi-fi, relógio digital ou carregadores perto da cama)',
  '🌐 Presença ou entidade no quarto ou na casa',
  '🌐 Trabalho feito, olho gordo ou inveja dirigidos à pessoa',
  '🌐 Objeto trazido para casa ou herdado com carga energética',
  '🌐 Cordões a pessoas ou situações que “não largam”'
];

const COMUNS = ['Miasma (resíduo energético denso)', 'Cargas e memórias antigas'];

/* Cada tema: re = expressões (sobre o texto sem acentos), area = tipo de caso, causas = pesquisa,
   chakras, etq = pedaços do nome das etiquetas a sugerir, medico = sinais para avaliação médica,
   dicas = passos práticos simples. */
const TEMAS = [
  { id: 'sono', e: '😴', nome: 'Sono', area: 'saude', ext: true,
    re: [/durm\w* mal/, /insoni/, /nao consigo dormir/, /nao durmo/, /acord\w*( \w+){0,3} (de )?noite/, /pesadel/, /sono (leve|agitado|mau|ma)/, /dormir mal/],
    causas: ['Mente em alerta (preocupações e pensamentos repetidos à noite)', 'Larva astral ou obsessor mais ativos à noite', 'Cargas na cama ou no quarto', 'Ritmo do corpo desregulado', 'Medos ou memórias que voltam ao deitar'],
    chakras: ['Coroa', 'Terceiro Olho'], etq: ['estado de sonho', 'paz interna', 'pensamentos negativos', 'protecao contra inveja'],
    medico: ['Insónia que dura semanas ou afeta o dia a dia merece avaliação médica.'],
    dicas: ['Tirar o telemóvel, o relógio digital e os carregadores da cabeceira, ou pôr o telemóvel em modo de avião.', 'Experimentar mudar a posição da cama durante uns dias e comparar o sono.'] },
  { id: 'nicturia', e: '🚽', nome: 'Acordar para urinar', area: 'saude', ext: false,
    re: [/urinar/, /xixi/, /bexiga/, /casa de banho (de noite|a noite)/],
    causas: ['Medo e insegurança retidos (bexiga, sacro e raiz)', 'Tensão emocional que se solta à noite', 'Stress do dia que não foi descarregado'],
    chakras: ['Raiz', 'Sacro'], etq: ['libertar medos', 'seguranca', 'forca vital'],
    medico: ['Acordar várias vezes para urinar pode ter causa médica (apneia do sono, diabetes, próstata, infeção urinária, medicação): convém avaliação médica.'],
    dicas: ['Reduzir os líquidos nas 2 a 3 horas antes de deitar, se o médico não indicar o contrário.'] },
  { id: 'apneia', e: '😮‍💨', nome: 'Apneia do sono e ronco', area: 'saude', ext: true,
    re: [/apneia/, /ressonar/, /ronc/, /parar de respirar/],
    causas: ['Bloqueio da garganta (palavras e emoções retidas)', 'Tensão no pescoço e nos ombros', 'Peso ou pressão sobre o peito à noite (presença ou carga)', 'Excesso de peso e retenção'],
    chakras: ['Garganta', 'Coração'], etq: ['cura o corpo', 'libertacao', 'desbloqueio', 'regeneracao celular'],
    medico: ['Ronco forte com pausas na respiração: pedir estudo do sono (médico ou otorrino). A apneia sem tratamento pesa no coração e na tensão.'],
    dicas: ['Dormir de lado pode ajudar; combinar com o médico o tratamento adequado.'] },
  { id: 'peso', e: '⚖️', nome: 'Peso', area: 'saude', ext: true,
    re: [/emagrec/, /perder peso/, /perda de peso/, /obesid/, /gordur/, /barriga/, /excesso de peso/, /engord/, /compuls/, /dieta/],
    causas: ['Retenção emocional (proteção, medo, perdas)', 'Compulsão ou ansiedade ligada à comida', 'Bloqueio do plexo solar e do sacro', 'Larva astral de vício (açúcar, comida)', 'Hábitos e crenças herdados da família sobre a comida', 'Desequilíbrio da tiroide ou do metabolismo (confirmar com análises)'],
    chakras: ['Plexo Solar', 'Sacro', 'Garganta'], etq: ['retirar o peso da vida', 'desintoxicacao', 'libertar-se dos vicios', 'auto-estima'],
    medico: ['Perda ou aumento de peso rápido ou sem razão, sede ou cansaço excessivos: pedir análises (tiroide, açúcar no sangue).'],
    dicas: ['Registar quando surge a fome emocional e o que aconteceu antes.', 'O plano alimentar deve ser feito com médico ou nutricionista.'] },
  { id: 'ansiedade', e: '😰', nome: 'Ansiedade e stress', area: 'saude', ext: true,
    re: [/ansied/, /stress/, /estress/, /nervos/, /angust/, /panico/, /preocup/],
    causas: ['Medo antecipado (mente no futuro)', 'Sobrecarga e falta de limites', 'Larva astral ou obsessor que alimenta a ansiedade', 'Cordões a pessoas que drenam energia'],
    chakras: ['Plexo Solar', 'Coração'], etq: ['paz interna', 'libertar medos', 'eliminar fobias', 'coragem'],
    medico: ['Ataques de pânico frequentes ou ansiedade que limita o dia a dia: avaliação médica ou psicológica.'],
    dicas: ['Respiração lenta de 5 minutos, de manhã e à noite.'] },
  { id: 'humor', e: '🌧️', nome: 'Tristeza e desânimo', area: 'saude', ext: true,
    re: [/deprim/, /tristez/, /desanim/, /sem vontade/, /vazio/],
    causas: ['Perdas e lutos não resolvidos', 'Pesos emocionais acumulados', 'Presença ou entidade que baixa o ânimo', 'Bloqueio do coração e da coroa'],
    chakras: ['Coração', 'Coroa'], etq: ['depressao', 'alegria', 'libertar memorias dolorosas'],
    medico: ['Tristeza que não passa, ou pensamentos de se magoar: procurar apoio médico ou psicológico sem demora.'],
    dicas: ['Luz natural pela manhã e uma caminhada curta todos os dias.'] },
  { id: 'cansaco', e: '🪫', nome: 'Cansaço e falta de energia', area: 'saude', ext: true,
    re: [/cansa/, /fadiga/, /sem energia/, /exaust/, /esgot/],
    causas: ['Perda de energia por cordões ou vampirismo energético', 'Miasma acumulado', 'Bloqueio do chakra raiz e do plexo solar', 'Sobrecarga emocional'],
    chakras: ['Raiz', 'Plexo Solar'], etq: ['forca vital', 'resgate da centelha', 'rejuvenescimento'],
    medico: ['Cansaço persistente: pedir análises (ferro, tiroide, vitaminas).'], dicas: [] },
  { id: 'dor', e: '🩹', nome: 'Dor', area: 'saude', ext: true,
    re: [/\bdor(es)?\b/, /costas/, /cabeca/, /enxaqueca/, /articula/, /joelho/, /pescoco/, /ombro/, /lombar/],
    causas: ['Emoção retida na zona da dor', 'Tensão e cargas acumuladas no corpo', 'Peso de responsabilidades que não são suas', 'Cordões ou ligações à zona afetada'],
    chakras: [], etq: ['cura o corpo', 'regeneracao de orgaos', 'desbloqueio', 'limpeza emocional'],
    medico: ['Dor intensa, súbita ou que não passa: avaliação médica.'], dicas: [] },
  { id: 'digestao', e: '🍽️', nome: 'Digestão e intestino', area: 'saude', ext: false,
    re: [/digest/, /intestin/, /azia/, /refluxo/, /estomago/, /gastr/, /prisao de ventre/, /colite/],
    causas: ['Emoções mal “digeridas”', 'Bloqueio do plexo solar', 'Stress que se descarrega na barriga'],
    chakras: ['Plexo Solar'], etq: ['desintoxicacao', 'limpeza emocional', 'regeneracao celular'],
    medico: ['Sangue nas fezes, dor persistente ou perda de peso sem razão: avaliação médica.'], dicas: [] },
  { id: 'vicios', e: '🚭', nome: 'Vícios e dependências', area: 'saude', ext: true,
    re: [/vicio/, /fumar/, /tabaco/, /alcool/, /jogo/, /droga/, /acucar/, /dependenc/],
    causas: ['Larva astral do vício', 'Vazio emocional que o vício tenta preencher', 'Obsessor ou entidade que alimenta o vício', 'Hábitos e ligações a pessoas ou lugares do vício'],
    chakras: ['Plexo Solar', 'Terceiro Olho'], etq: ['libertar-se dos vicios', 'libertacao', 'vontade', 'desintoxicacao'],
    medico: ['Dependências fortes podem precisar de acompanhamento médico.'], dicas: [] },
  { id: 'fertilidade', e: '🌱', nome: 'Fertilidade e novo ciclo', area: 'saude', ext: true,
    re: [/engravid/, /fertil/, /gravidez/],
    causas: ['Medos ligados à maternidade ou à paternidade', 'Bloqueios de criatividade', 'Cargas e memórias do ventre', 'Cordões a antigas relações'],
    chakras: ['Sacro', 'Raiz'], etq: ['fertilidade', 'rejuvenescimento'],
    medico: ['O trabalho energético só favorece o novo ciclo. O acompanhamento médico mantém-se.'], dicas: [] },
  { id: 'metabolico', e: '🫀', nome: 'Tensão, açúcar e colesterol', area: 'saude', ext: false,
    re: [/tensao alta/, /pressao arterial/, /coracao/, /colesterol/, /diabet/],
    causas: ['Stress e pressão acumulados', 'Emoções contidas no coração', 'Hábitos familiares herdados'],
    chakras: ['Coração'], etq: ['cura o corpo', 'regeneracao celular'],
    medico: ['Tensão, açúcar e colesterol precisam de acompanhamento médico e a medicação mantém-se.'], dicas: [] },

  { id: 'casa', e: '🏠', nome: 'Casa', area: 'casa', ext: false,
    re: [/\bcasa\b/, /apartamento/, /moradia/, /vender a casa/, /vendo a casa/, /barulh/, /assombr/, /mudar de casa/],
    causas: ['Geopatia (correntes de água, falhas, cruzamentos)', 'Campo eletromagnético (quadro elétrico, wi-fi, aparelhos)', 'Cargas de antigos moradores', 'Presenças ou entidades no local', 'Bloqueio na entrada de energia e prosperidade', 'Objeto ou trabalho colocado na casa'],
    chakras: [], etq: ['purificar os lugares', 'purificacao espiritual', 'limpar toda negatividade', 'agua - removendo'],
    medico: [], dicas: ['Arejar todos os espaços e arrumar o que está parado antes da sessão.'] },
  { id: 'terreno', e: '🌳', nome: 'Terreno', area: 'terreno', ext: false,
    re: [/terreno/, /herdade/, /\bquinta\b/, /\blote\b/],
    causas: ['Geopatia (correntes de água, falhas)', 'Memórias do terreno (acontecimentos, conflitos, perdas)', 'Presenças ou guardiões do lugar', 'Trabalho enterrado ou colocado', 'Bloqueio à venda, uso ou construção', 'Cargas familiares de heranças e partilhas'],
    chakras: [], etq: ['purificacao espiritual', 'purificar os lugares', 'limpar toda negatividade'],
    medico: [], dicas: [] },
  { id: 'dinheiro', e: '💰', nome: 'Dinheiro e trabalho', area: 'dinheiro', ext: false,
    re: [/dinheiro/, /divida/, /salario/, /rendimento/, /financ/, /poupar/, /pobreza/, /escassez/, /emprego/, /desempreg/, /despedi/, /carreira/, /promocao/],
    causas: ['Bloqueio de abundância', 'Crenças e padrões de escassez', 'Dívidas energéticas ou herdadas', 'Inveja ou olho gordo sobre o dinheiro', 'Cordões a antigos sócios, patrões ou credores', 'Fugas de energia (perdas e gastos repetidos sem razão)'],
    chakras: ['Raiz', 'Plexo Solar'], etq: ['prosperidade', 'abundancia', 'bloqueios psiquicos do sucesso', 'atraindo prosperidade'],
    medico: [], dicas: ['Trabalho energético de apoio: não substitui o contabilista nem o aconselhamento financeiro.'] },
  { id: 'negocio', e: '🏢', nome: 'Negócios e empresas', area: 'negocio', ext: false,
    re: [/negocio/, /empresa/, /\bloja\b/, /clientes/, /vendas/, /contrato/, /\bsocio/, /restaurante/, /projeto parado/],
    causas: ['Bloqueio de clientes e vendas', 'Negócio, contrato ou venda parados sem razão', 'Inveja ou trabalho feito pela concorrência', 'Cordões a sócios, fornecedores ou antigos donos', 'Padrões do dono (medo, culpa, autossabotagem)', 'Cargas no espaço físico da empresa'],
    chakras: ['Plexo Solar', 'Raiz'], etq: ['desbloqueio', 'prosperidade', 'bloqueios psiquicos do sucesso', 'certeza e autoconfianca'],
    medico: [], dicas: ['Trabalho energético de apoio: não substitui o contabilista, o advogado nem a gestão do negócio.'] },
  { id: 'tribunal', e: '⚖️', nome: 'Tribunal e processos', area: 'tribunal', ext: false,
    re: [/tribunal/, /processo/, /advogad/, /heranca/, /partilha/, /divorcio/, /guarda dos filhos/, /judicial/, /coima/, /\bmulta\b/],
    causas: ['Bloqueio do processo (atrasos sem razão)', 'Cordões com a outra parte', 'Magia ou inimizade contra o caso', 'Medo e ansiedade de quem vai a tribunal', 'Cargas emocionais do conflito (raiva, culpa, sensação de injustiça)', 'Confusão ou falta de clareza nos documentos'],
    chakras: ['Plexo Solar', 'Garganta'], etq: ['falar e ouvir a verdade', 'revelando o oculto', 'amenizando julgamentos', 'retirar as sementes de culpa', 'dissipando a raiva'],
    medico: [], dicas: ['Trabalho energético de apoio: não substitui o advogado. Pedir sempre o mais justo, sem interferir na vontade de terceiros.'] },
  { id: 'amor', e: '💞', nome: 'Amor e relações', area: 'amor', ext: false,
    re: [/\bamor\b/, /namor/, /casamento/, /\bex\b/, /separa/, /ciume/, /solidao/, /alma gemea/, /marido/, /relacao/, /reconcili/],
    causas: ['Cordões a ex-parceiros ou a terceiros', 'Amarração ou trabalho de magia', 'Feridas emocionais e padrões repetidos', 'Bloqueio da abertura do coração', 'Cargas no quarto ou na casa', 'Ciúme, mágoa ou rancor retidos'],
    chakras: ['Coração', 'Sacro'], etq: ['perdoar', 'reconciliacao', 'alma gemea', 'amor incondicional', 'libertar magoas'],
    medico: [], dicas: ['Pedir sempre sem interferir na vontade da outra pessoa.'] },
  { id: 'familia', e: '👪', nome: 'Família e conflitos', area: 'amor', ext: false,
    re: [/famil/, /\bfilh[oa]s?\b/, /\bpais\b/, /\bmae\b/, /\bpai\b/, /irmao/, /conflito/, /discuss/],
    causas: ['Mágoas antigas entre familiares', 'Padrões e crenças herdados da família', 'Cordões familiares que pesam', 'Papéis trocados (quem cuida de quem)'],
    chakras: ['Coração', 'Raiz'], etq: ['pais - mestres', 'reconciliacao', 'perdoar', 'respeito', 'compaixao'],
    medico: [], dicas: [] },
  { id: 'protecao', e: '🛡️', nome: 'Proteção e inveja', area: 'pessoa', ext: true,
    re: [/inveja/, /olho gordo/, /\bazar\b/, /mau olhado/, /magia/, /feitico/, /trabalho feito/, /protec/],
    causas: ['Olho gordo ou inveja ativos', 'Magia consciente ou inconsciente', 'Trabalho feito ou enviado', 'Fragilidade do campo energético'],
    chakras: [], etq: ['protecao contra inveja', 'limpar toda negatividade', 'afastar a negatividade', 'forca interior'],
    medico: [], dicas: [] },
  { id: 'medos', e: '🕊️', nome: 'Medos e bloqueios', area: 'pessoa', ext: false,
    re: [/\bmedo/, /fobia/, /bloque/, /\bculpa\b/, /trauma/],
    causas: ['Medos herdados ou de vidas passadas', 'Trauma ou memória dolorosa ativa', 'Culpa retida', 'Padrões que repetem o mesmo bloqueio'],
    chakras: ['Plexo Solar', 'Raiz'], etq: ['libertar medos', 'eliminar fobias', 'coragem', 'retirar as sementes de culpa', 'libertar memorias dolorosas'],
    medico: [], dicas: [] },
  { id: 'escuro', e: '🖤', nome: 'Energia escura, pesada ou enegrecida', area: 'pessoa', ext: true,
    re: [/enegrec/, /escurec/, /energia (escura|negra|pesada|densa|carregada)/, /aura (escura|negra|pesada)/, /campo (escuro|negro|pesado)/, /pesad[oa]/, /dens[oa]/, /carregad[oa]/, /sombri/, /negatividade/, /ambiente (pesado|escuro)/],
    causas: ['Campo energético escurecido (acumulação de energia densa)', 'Miasma (resíduo energético denso)', 'Larva astral ou obsessor a alimentar-se da energia', 'Trabalho feito, olho gordo ou inveja dirigidos à pessoa', 'Cargas e memórias antigas retidas', 'Objeto ou local com carga energética', 'Cordões a pessoas ou situações que drenam energia'],
    chakras: ['Raiz', 'Plexo Solar', 'Coroa'], etq: ['purificar', 'limpeza de impurezas', 'desintoxicacao', 'protec', 'desfazer', 'limpar karma'],
    medico: ['Cansaço, tristeza ou peso que duram semanas merecem avaliação médica: o trabalho energético é complementar.'],
    dicas: ['Arejar bem a casa e deixar entrar luz natural.', 'Banho de sal grosso ou de água com sal ao fim do dia.', 'Beber água e descansar nos dias a seguir à limpeza.'] },
  { id: 'bloqueado', e: '🧱', nome: 'Vida parada ou bloqueada', area: 'pessoa', ext: true,
    re: [/bloquead/, /trancad/, /parad[oa] (na vida|no tempo)/, /nada (anda|avanca|corre bem|resulta)/, /azar/, /ma sorte/, /mal sorte/, /sem saida/, /tudo (me )?corre mal/],
    causas: ['Bloqueio energético que impede as coisas de fluir', 'Trabalho feito, olho gordo ou inveja dirigidos à pessoa', 'Padrões e crenças herdados da família', 'Cargas e memórias antigas retidas', 'Cordões a pessoas ou situações que “não largam”', 'Medo de avançar ou do sucesso'],
    chakras: ['Raiz', 'Plexo Solar', 'Garganta'], etq: ['desbloqueio', 'libertacao', 'prosperidade', 'clareza', 'protec'],
    medico: [],
    dicas: ['Escrever o que sente parado e o que mudaria primeiro, mesmo que seja pequeno.'] },
  { id: 'veiculo', e: '🏍️', nome: 'Mota ou veículo', area: 'mota', ext: false,
    re: [/\bmota\b/, /\bmoto\b/, /\bcarro\b/, /veiculo/, /acidente/, /camiao/],
    causas: ['Cargas de donos anteriores', 'Objeto ou trabalho colocado no veículo', 'Energia de acidentes ou perdas', 'Proteção do condutor fragilizada'],
    chakras: [], etq: ['purificacao espiritual', 'atraia anjos de luz', 'limpar toda negatividade'],
    medico: [], dicas: [] }
];

const SESSOES = 'Sessão 1: triagem e limpeza, com até 10 etiquetas. Verificação ao fim de 7 dias ou mais. Depois, o número de sessões que o pêndulo indicar.';

/* Devolve o protocolo para o texto escrito. `etiquetas` = lista {codigo, pt} da app. */
export function analisar(texto, etiquetas) {
  const t = norm(texto);
  if (t.trim().length < 3) return { vazio: true };
  const achados = TEMAS.map(tm => ({ tm, n: tm.re.reduce((a, r) => a + (r.test(t) ? 1 : 0), 0) })).filter(x => x.n > 0).sort((a, b) => b.n - a.n);
  const temas = achados.map(x => x.tm);
  const unico = arr => arr.filter((x, i) => arr.indexOf(x) === i);

  if (!temas.length) {
    return { vazio: false, semTema: true, temas: [], tipo: 'pessoa', pesquisa: COMUNS.concat(EXTERNAS), chakras: [], sugeridas: [], medico: [], dicas: [], plano: SESSOES };
  }
  const saude = temas.some(x => x.area === 'saude');
  const tipo = (saude ? temas.find(x => x.area === 'saude') : temas[0]).area;
  let causas = [];
  temas.forEach(x => { causas = causas.concat(x.causas); });
  causas = unico(causas).slice(0, 22);
  const externas = temas.some(x => x.ext) ? EXTERNAS : [];
  const pesquisa = unico(COMUNS.concat(causas, externas));
  const chakras = unico([].concat(...temas.map(x => x.chakras)));
  const medico = unico([].concat(...temas.map(x => x.medico)));
  if (saude) medico.push('Não suspender medicação nem tratamento médico. O trabalho energético é complementar.');
  const dicas = unico([].concat(...temas.map(x => x.dicas)));

  const sug = [];
  const lista = Array.isArray(etiquetas) ? etiquetas : [];
  const rondas = Math.max(...temas.map(x => x.etq.length));
  for (let i = 0; i < rondas && sug.length < 10; i++) {
    temas.forEach(tm => {
      const k = tm.etq[i]; if (!k || sug.length >= 10) return;
      const it = lista.find(e => norm(e.pt).indexOf(k) >= 0 && sug.indexOf(e.codigo) < 0);
      if (it) sug.push(it.codigo);
    });
  }
  return { vazio: false, semTema: false, temas: temas.map(x => ({ id: x.id, e: x.e, nome: x.nome })), tipo, pesquisa, chakras, sugeridas: sug, medico, dicas, plano: SESSOES };
}

/* Liga cada causa pesquisada num caso aos números da lista de 40 pontos do Pêndulo Hebraico,
   para a app escolher as etiquetas pelo mesmo caminho (fases do protocolo). */
const MAPA_40 = [
  [/miasma/, [1]], [/olho gordo|inveja/, [2]], [/magia consciente/, [3]], [/magia/, [3, 4]],
  [/trabalho (feito|colocado|enterrado|enviado)|objeto ou trabalho|objeto trabalhado|carregado/, [5]], [/amarracao/, [16, 5]],
  [/obsessor|entidade|presenc|guardi|possess/, [7]], [/larva/, [9]], [/ataque psiquico/, [10]], [/implante/, [11]],
  [/eletromagnetic/, [13]], [/geopatia/, [14]], [/cordo|cordao|ligacao|ligacoes/, [15, 17]],
  [/heranc|herdad|familia|geracion/, [18, 20]], [/cargas|memorias antigas|donos anteriores|moradores|memorias do/, [1, 18]],
  [/karma|karmic|vidas passadas/, [21]], [/trauma|memoria dolorosa|memorias que voltam|passado/, [27]],
  [/padro|crenca|autossabot|sabotagem/, [28]], [/culpa/, [29]], [/medo|inseguranca|fobia/, [30]], [/ansiedade|stress|preocupac|mente em alerta|pressao/, [31]],
  [/cansaco|vitalidade|perda de energia|fugas de energia|drena|vampir/, [37]], [/corpo|dor\b|tensao|metabolismo|chakra|tiroide|zona afetada|ritmo/, [37]],
  [/abundancia|escassez|pobreza|dividas|clientes|vendas|parados|bloqueio (na|do|de|a)/, [38]], [/sucesso|medo do sucesso/, [39]],
  [/fertilidade|criatividade|maternidade|paternidade|ventre/, [40]], [/vicio|compuls|dependenc/, [9, 25]],
  [/ciume|magoa|rancor|ferida|emocional|emocoes|luto|perdas|tristeza|coracao|raiva|injustica|retencao/, [26]],
  [/sonhos|pesadelo/, [35]], [/empatia/, [36]], [/egregora|coletivo/, [33]]
];
export function causasParaNumeros(causas) {
  const out = [];
  (causas || []).forEach(c => { const t = norm(c); MAPA_40.forEach(([re, ns]) => { if (re.test(t)) ns.forEach(n => { if (out.indexOf(n) < 0) out.push(n); }); }); });
  return out.sort((a, b) => a - b);
}
