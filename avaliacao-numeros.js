/* avaliacao-numeros.js — cópia dos cálculos de numerologia, Anjo, Arcano, Nodos e tabelas
   do Mapa da Alma (mapa-da-alma.html, linhas 123–1141), só funções e dados, sem ecrã nem rede.
   Serve a Avaliação Energética. Não editar à mão: se o Mapa da Alma mudar, voltar a gerar. */
const PYTH_MAP = {A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8};
const VOWELS = 'AEIOU';

function stripAccents(s){ return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,''); }
function reduceNumber(n){
  while (n > 9 && n !== 11 && n !== 22 && n !== 33){
    n = String(n).split('').reduce((a,d) => a + (parseInt(d,10)||0), 0);
  }
  return n;
}
function letterValue(ch){ return PYTH_MAP[ch.toUpperCase()] || 0; }
function nameLetters(str){ return stripAccents(str).toUpperCase().split('').filter(ch => /[A-Z]/.test(ch)); }
function sumLetters(str, filter){
  let total = 0;
  for (const ch of nameLetters(str)){
    if (filter === 'vowels' && !VOWELS.includes(ch)) continue;
    if (filter === 'consonants' && VOWELS.includes(ch)) continue;
    total += letterValue(ch);
  }
  return total;
}
function vibracaoMista(str){
  let total = 0;
  for (const ch of stripAccents(str).toUpperCase()){
    if (/[0-9]/.test(ch)) total += parseInt(ch,10);
    else if (/[A-Z]/.test(ch)) total += letterValue(ch);
  }
  return reduceNumber(total);
}
function caminhoDeVida(dateStr){
  const digits = dateStr.replace(/\D/g,'');
  const sum = digits.split('').reduce((a,d) => a + parseInt(d,10), 0);
  return reduceNumber(sum);
}
function expressao(nome){ return reduceNumber(sumLetters(nome, null)); }
function motivacao(nome){ return reduceNumber(sumLetters(nome, 'vowels')); }
function impressao(nome){ return reduceNumber(sumLetters(nome, 'consonants')); }

function licoesCarmicas(nome){
  const presentes = new Set(nameLetters(nome).map(ch => letterValue(ch)));
  const faltam = [];
  for (let n=1; n<=9; n++) if (!presentes.has(n)) faltam.push(n);
  return faltam;
}
function excessoNumerologico(nome){
  const counts = {};
  nameLetters(nome).forEach(ch => { const v = letterValue(ch); counts[v] = (counts[v]||0) + 1; });
  let max = 0, tops = [];
  Object.entries(counts).forEach(([n,c]) => {
    if (c > max){ max = c; tops = [n]; } else if (c === max) tops.push(n);
  });
  return max >= 3 ? tops.map(Number) : [];
}
function temSinaisMediunidade(cv, exp, mot){ return [cv, exp, mot].includes(11); }

/* ─── Anjo do Nascimento (72 Génios / Shem HaMephorash) ──────────────
   Tabela validada contra 4 exemplos confirmados no PDF de referência
   (Livro de São Cipriano): Ricardo/Haamiah, Natália/Iah-Hel,
   Beatriz/Achaiah, Lara/Ariel. Funciona apenas com a data — por isso
   está disponível em todos os selos de precisão, incluindo o Solar.
   Fontes: tradição cabalística clássica (Ambelain e derivados),
   parafraseadas nas nossas próprias palavras. */
const GENIOS_72 = [
  { n:1, nome:'Vehuiah', datas:["20/03","01/06","13/08","25/10","06/01"], virtude:'Ilumina em assuntos difíceis e concede capacidade de cura pelas mãos.', sombra:'Agressividade e gastos excessivos.', planeta:'Marte' },
  { n:2, nome:'Jeliel', datas:["21/03","02/06","14/08","26/10","07/01"], virtude:'Pacifica conflitos, favorece causas judiciais e a harmonia no lar.', sombra:'Desarmonia familiar e nas relações.', planeta:'Júpiter' },
  { n:3, nome:'Sitael', datas:["22/03","03/06","15/08","27/10","08/01"], virtude:'Protege contra adversidades, assaltos e acidentes; favorece magnetismo pessoal e as ciências.', sombra:'Mentira e ingratidão.', planeta:'Sol' },
  { n:4, nome:'Elemiah', datas:["23/03","04/06","16/08","28/10","09/01"], virtude:'Revela traições, alivia tormentos do espírito e favorece viagens.', sombra:'Desonestidade nos negócios.', planeta:'Mercúrio' },
  { n:5, nome:'Mahasiah', datas:["24/03","05/06","17/08","29/10","10/01"], virtude:'Traz paz nas relações; favorece artes, filosofia e profissões liberais.', sombra:'Abuso da boa-fé alheia e excessos alimentares.', planeta:'Vénus' },
  { n:6, nome:'Lelahel', datas:["25/03","06/06","18/08","30/10","11/01"], virtude:'Ilumina realizações, ajuda a curar e atrai amor e fé.', sombra:'Mau caráter e ambição descontrolada.', planeta:'Sol' },
  { n:7, nome:'Achaiah', datas:["26/03","07/06","19/08","31/10","12/01"], virtude:'Rege a paciência, a descoberta dos segredos da natureza e o rigor do trabalho. Ajuda a desmascarar falsidades e concede discernimento.', sombra:'Desleixo.', planeta:'Mercúrio' },
  { n:8, nome:'Cahethel', datas:["27/03","08/06","20/08","01/11","13/01"], virtude:'Ajuda a obter bênção, afasta energias negativas e favorece a prosperidade.', sombra:'Orgulho e corrupção.', planeta:'Saturno' },
  { n:9, nome:'Haziel', datas:["28/03","09/06","21/08","02/11","14/01"], virtude:'Favorece reconciliação, bondade, justiça e o cumprimento de promessas.', sombra:'Arrogância e conflitos coletivos.', planeta:'Lua' },
  { n:10, nome:'Aladiah', datas:["29/03","10/06","22/08","03/11","15/01"], virtude:'Auxilia a cura e a tomada de boas decisões; protege contra maldades.', sombra:'Vícios e desonestidade nos negócios.', planeta:'Júpiter' },
  { n:11, nome:'Laoviah', datas:["30/03","11/06","23/08","04/11","16/01"], virtude:'Ajuda a obter vitória, protege em relacionamentos e contra pessoas desonestas.', sombra:'Vaidade.', planeta:'Saturno' },
  { n:12, nome:'Hahahiah', datas:["31/03","12/06","24/08","05/11","17/01"], virtude:'Protege contra adversidades, revela mistérios através dos sonhos e traz equilíbrio.', sombra:'Libertinagem e violência.', planeta:'Neptuno' },
  { n:13, nome:'Yesalel', datas:["01/04","13/06","25/08","06/11","18/01"], virtude:'Rege a amizade, a reconciliação e a fidelidade conjugal.', sombra:'Discórdia e desunião familiar.', planeta:'Saturno' },
  { n:14, nome:'Mebahel', datas:["02/04","14/06","26/08","07/11","19/01"], virtude:'Favorece a justiça e protege contra a usurpação de bens.', sombra:'Falso testemunho e mentira.', planeta:'Júpiter' },
  { n:15, nome:'Hariel', datas:["03/04","15/06","27/08","08/11","20/01"], virtude:'Favorece a fé, os estudos, as descobertas e protege as artes e a ciência.', sombra:'Vaidade e presunção.', planeta:'Marte' },
  { n:16, nome:'Hekamiah', datas:["04/04","16/06","28/08","09/11","21/01"], virtude:'Ajuda a vencer inimigos, favorece a liderança e incentiva a coragem.', sombra:'Violência física e traição.', planeta:'Marte' },
  { n:17, nome:'Lauviah', datas:["05/04","17/06","29/08","10/11","22/01"], virtude:'Combate a tristeza, favorece descobertas e inspira a expressão artística.', sombra:'Descrença e depressão.', planeta:'Sol' },
  { n:18, nome:'Caliel', datas:["06/04","18/06","30/08","11/11","23/01"], virtude:'Traz socorro rápido, favorece a justiça e desmascara inimigos.', sombra:'Escândalos e inveja.', planeta:'Mercúrio' },
  { n:19, nome:'Leuviah', datas:["07/04","19/06","31/08","12/11","24/01"], virtude:'Concede graça, memória e inteligência; ajuda a superar obstáculos.', sombra:'Sarcasmo e desespero.', planeta:'Vénus' },
  { n:20, nome:'Pahaliah', datas:["08/04","20/06","01/09","13/11","25/01"], virtude:'Rege a fé, a religião e ajuda a encontrar a vocação certa.', sombra:'Orgulho, vaidade e libertinagem.', planeta:'Lua' },
  { n:21, nome:'Nelchael', datas:["09/04","21/06","02/09","14/11","26/01"], virtude:'Protege contra calúnias e feitiços; favorece matemática, geografia e astronomia.', sombra:'Ignorância e preconceito.', planeta:'Mercúrio' },
  { n:22, nome:'Ieiaiel', datas:["10/04","22/06","03/09","15/11","27/01"], virtude:'Rege fortuna, fama, comércio, viagens e a abertura de novos caminhos.', sombra:'Opressão e preconceito.', planeta:'Mercúrio' },
  { n:23, nome:'Melahel', datas:["11/04","23/06","04/09","16/11","28/01"], virtude:'Protege em viagens e favorece o conhecimento de ervas curativas.', sombra:'Charlatanismo.', planeta:'Lua' },
  { n:24, nome:'Haheuiah', datas:["12/04","24/06","05/09","17/11","29/01"], virtude:'Concede graça e misericórdia; protege presos e injustiçados.', sombra:'Tendência ao crime e à delinquência.', planeta:'Vénus' },
  { n:25, nome:'Nith-Haiah', datas:["13/04","25/06","06/09","18/11","30/01"], virtude:'Concede sabedoria e ajuda a descobrir a verdade por trás de mistérios.', sombra:'Práticas de magia negra.', planeta:'Saturno' },
  { n:26, nome:'Haaiah', datas:["14/04","26/06","07/09","19/11","31/01"], virtude:'Favorece sucesso em processos judiciais e a diplomacia; traz paz.', sombra:'Violência, desconfiança e conspirações.', planeta:'Lua' },
  { n:27, nome:'Ierathel', datas:["15/04","27/06","08/09","20/11","01/02"], virtude:'Confunde caluniadores e favorece a justiça e a verdade.', sombra:'Injustiça e intolerância.', planeta:'Saturno' },
  { n:28, nome:'Seheiah', datas:["16/04","28/06","09/09","21/11","02/02"], virtude:'Protege contra doenças e acidentes; favorece a longevidade.', sombra:'Preguiça e desleixo.', planeta:'Júpiter' },
  { n:29, nome:'Reyel', datas:["17/04","29/06","10/09","22/11","03/02"], virtude:'Protege contra inimigos visíveis e invisíveis; favorece meditação e pureza.', sombra:'Falsidade e discriminação.', planeta:'Marte' },
  { n:30, nome:'Omael', datas:["18/04","30/06","11/09","23/11","04/02"], virtude:'Traz paciência e alívio ao desespero; favorece a medicina.', sombra:'Comportamentos abusivos graves.', planeta:'Sol' },
  { n:31, nome:'Lecabel', datas:["19/04","01/07","12/09","24/11","05/02"], virtude:'Inspira soluções para problemas complexos e protege o trabalho.', sombra:'Ganância e orgulho.', planeta:'Sol' },
  { n:32, nome:'Vasariah', datas:["20/04","02/07","13/09","25/11","06/02"], virtude:'Favorece equilíbrio e justiça; protege em processos judiciais.', sombra:'Ressentimento e maldade.', planeta:'Mercúrio' },
  { n:33, nome:'Iehuiah', datas:["21/04","03/07","14/09","26/11","07/02"], virtude:'Desfaz maquinações de traidores; favorece aprendizado e franqueza.', sombra:'Revoltas e uso indevido da palavra.', planeta:'Lua' },
  { n:34, nome:'Lehahiah', datas:["22/04","04/07","15/09","27/11","08/02"], virtude:'Favorece harmonia entre líderes e liderados, paz e serenidade.', sombra:'Turbulência, possessividade e nervosismo.', planeta:'Saturno' },
  { n:35, nome:'Chavakiah', datas:["23/04","05/07","16/09","28/11","09/02"], virtude:'Favorece reconciliação familiar e resolve heranças/partilhas com paz.', sombra:'Confusão e autoritarismo.', planeta:'Mercúrio' },
  { n:36, nome:'Menadel', datas:["24/04","06/07","17/09","29/11","10/02"], virtude:'Ajuda a manter o emprego, protege contra calúnias e ajuda a reencontrar pessoas e objetos perdidos.', sombra:'Fuga de responsabilidades.', planeta:'Marte' },
  { n:37, nome:'Aniel', datas:["25/04","07/07","18/09","30/11","11/02"], virtude:'Favorece vitória, ciências, artes e a busca de iluminação interior.', sombra:'Ambição e materialismo.', planeta:'Lua' },
  { n:38, nome:'Haamiah', datas:["26/04","08/07","19/09","01/12","12/02"], virtude:'Rege a busca da verdade, a sabedoria e a proteção espiritual. Ajuda a desmascarar falsidades, concede discernimento e protege quem estuda a ciência sagrada, a filosofia e os mistérios do invisível.', sombra:'Ações contrárias aos princípios morais.', planeta:'Saturno' },
  { n:39, nome:'Rehael', datas:["27/04","09/07","20/09","02/12","13/02"], virtude:'Favorece cura, misericórdia, paz interior e amor familiar.', sombra:'Crueldade e dependências.', planeta:'Saturno' },
  { n:40, nome:'Ieiazel', datas:["28/04","10/07","21/09","03/12","14/02"], virtude:'Traz consolo, favorece literatura e comunicação, alivia angústia.', sombra:'Depressão e desânimo.', planeta:'Mercúrio' },
  { n:41, nome:'Hahahael', datas:["29/04","11/07","22/09","04/12","15/02"], virtude:'Protege contra caluniadores e favorece a dedicação espiritual.', sombra:'Falsos profetas e aproveitadores da boa-fé.', planeta:'Júpiter' },
  { n:42, nome:'Mikael', datas:["30/04","12/07","23/09","05/12","16/02"], virtude:'Favorece viagens seguras, sucesso empresarial e revela conspirações.', sombra:'Promiscuidade, traição e violência.', planeta:'Mercúrio' },
  { n:43, nome:'Veuliah', datas:["01/05","13/07","24/09","06/12","17/02"], virtude:'Ajuda a libertar de vícios e fortalece quem ocupa posições de poder.', sombra:'Discórdia em negócios.', planeta:'Marte' },
  { n:44, nome:'Yelaiah', datas:["02/05","14/07","25/09","07/12","18/02"], virtude:'Protege magistrados, favorece vitória em processos e sucesso em empreendimentos.', sombra:'Discussões e uso de substâncias.', planeta:'Mercúrio' },
  { n:45, nome:'Sealiah', datas:["03/05","15/07","26/09","08/12","19/02"], virtude:'Confunde os orgulhosos e eleva os humildes; traz paz ligada à natureza.', sombra:'Orgulho e insensibilidade.', planeta:'Sol' },
  { n:46, nome:'Ariel', datas:["04/05","16/07","27/09","09/12","20/02"], virtude:'Rege as revelações, os sonhos intuitivos e a gratidão. Associado à perceção subtil e à capacidade de receber intuições através do sentir.', sombra:'Turbulência e obsessão espiritual.', planeta:'Saturno' },
  { n:47, nome:'Asaliah', datas:["05/05","17/07","28/09","10/12","21/02"], virtude:'Favorece a elevação espiritual e a luz interior.', sombra:'Escândalos.', planeta:'Vénus' },
  { n:48, nome:'Mihael', datas:["06/05","18/07","29/09","11/12","22/02"], virtude:'Favorece a paz conjugal e a intuição sobre o que está para vir.', sombra:'Divórcio e separação.', planeta:'Vénus' },
  { n:49, nome:'Vehuel', datas:["07/05","19/07","30/09","12/12","23/02"], virtude:'Traz conforto em desgostos e exaltação espiritual.', sombra:'Egoísmo e inveja.', planeta:'Mercúrio' },
  { n:50, nome:'Daniel', datas:["08/05","20/07","01/10","13/12","24/02"], virtude:'Traz consolo, favorece a justiça e clareza em momentos de indecisão.', sombra:'Agressividade.', planeta:'Lua' },
  { n:51, nome:'Hahasiah', datas:["09/05","21/07","02/10","14/12","25/02"], virtude:'Favorece a contemplação espiritual e a descoberta da sabedoria.', sombra:'Desleixo e dependência da caridade alheia.', planeta:'Lua' },
  { n:52, nome:'Imamaiah', datas:["10/05","22/07","03/10","15/12","26/02"], virtude:'Ajuda a vencer resistências, favorece trabalho honesto e viagens seguras.', sombra:'Vaidade, má-educação e conflitos.', planeta:'Júpiter' },
  { n:53, nome:'Nanael', datas:["11/05","23/07","04/10","16/12","27/02"], virtude:'Favorece estudos avançados; protege educadores e homens da lei.', sombra:'Autodestruição e autocrítica excessiva.', planeta:'Saturno' },
  { n:54, nome:'Nithael', datas:["12/05","24/07","05/10","17/12","28/02"], virtude:'Favorece misericórdia, longevidade e protege quem está em posição de liderança.', sombra:'Agressividade, intrigas e preconceito social.', planeta:'Júpiter' },
  { n:55, nome:'Mebahiah', datas:["13/05","25/07","06/10","18/12","01/03"], virtude:'Favorece consolo, fertilidade e a proteção das crianças.', sombra:'Mentira e falsas promessas.', planeta:'Júpiter' },
  { n:56, nome:'Poiel', datas:["14/05","26/07","07/10","19/12","02/03"], virtude:'Ajuda a realizar desejos com fama e prestígio, quando as ações são para o bem.', sombra:'Agressividade, vaidade e corrupção.', planeta:'Sol' },
  { n:57, nome:'Nemamiah', datas:["15/05","27/07","08/10","20/12","03/03"], virtude:'Favorece prosperidade e boas relações profissionais.', sombra:'Crítica e inveja.', planeta:'Marte' },
  { n:58, nome:'Iealel', datas:["16/05","28/07","09/10","21/12","04/03"], virtude:'Afasta a tristeza, favorece a cura (especialmente da visão) e a paz interior.', sombra:'Vingança e sarcasmo.', planeta:'Marte' },
  { n:59, nome:'Harahel', datas:["17/05","29/07","10/10","22/12","05/03"], virtude:'Ajuda em questões de fertilidade e favorece o comércio de livros e conhecimento.', sombra:'Má gestão de bens e falsificação.', planeta:'Sol' },
  { n:60, nome:'Mitzrael', datas:["18/05","30/07","11/10","23/12","06/03"], virtude:'Conforta em opressões, favorece a cura do espírito e a fidelidade.', sombra:'Vícios, agressividade e impulsividade.', planeta:'Lua' },
  { n:61, nome:'Umabel', datas:["19/05","31/07","12/10","24/12","07/03"], virtude:'Favorece amizades e o estudo da psicologia e das ciências esotéricas.', sombra:'Isolamento e dificuldade nos relacionamentos.', planeta:'Vénus' },
  { n:62, nome:'Iah-Hel', datas:["20/05","01/08","13/10","25/12","08/03"], virtude:'Rege a sabedoria, a tranquilidade e a iluminação espiritual. Traz paz interior, moderação e harmonia — forte vibração de proteção para o lar e a estabilidade da família.', sombra:'Escândalos e inconsequência nas relações.', planeta:'Saturno' },
  { n:63, nome:'Anauel', datas:["21/05","02/08","14/10","26/12","09/03"], virtude:'Confunde inimigos, protege em acidentes e traz novas ideias.', sombra:'Comportamento de maus pagadores.', planeta:'Mercúrio' },
  { n:64, nome:'Mehiel', datas:["22/05","03/08","15/10","27/12","10/03"], virtude:'Protege nas adversidades, favorece o equilíbrio emocional.', sombra:'Vaidade e concorrência desleal.', planeta:'Mercúrio' },
  { n:65, nome:'Damabiah', datas:["23/05","04/08","16/10","28/12","11/03"], virtude:'Protege contra sortilégios e favorece sucesso em empreendimentos, comércio e viagens.', sombra:'Emoções exageradas.', planeta:'Lua' },
  { n:66, nome:'Manakel', datas:["24/05","05/08","17/10","29/12","12/03"], virtude:'Traz calma, favorece a longevidade e inspira música e poesia.', sombra:'Ingratidão e desânimo.', planeta:'Neptuno' },
  { n:67, nome:'Ayel', datas:["25/05","06/08","18/10","30/12","13/03"], virtude:'Traz consolo, sabedoria e longevidade; favorece estudos religiosos.', sombra:'Excessos e frustração.', planeta:'Saturno' },
  { n:68, nome:'Habuhiah', datas:["26/05","07/08","19/10","31/12","14/03"], virtude:'Favorece a saúde, a cura e a agricultura.', sombra:'Doenças e maus presságios.', planeta:'Lua' },
  { n:69, nome:'Rochel', datas:["27/05","08/08","20/10","01/01","15/03"], virtude:'Ajuda a encontrar objetos perdidos e favorece a fortuna.', sombra:'Impulsividade e fraude.', planeta:'Júpiter' },
  { n:70, nome:'Yabamiah', datas:["28/05","09/08","21/10","02/01","16/03"], virtude:'Favorece purificação, harmonia com a natureza e recuperação de vícios.', sombra:'Conflitos conjugais.', planeta:'Sol' },
  { n:71, nome:'Haiaiel', datas:["29/05","10/08","22/10","03/01","17/03"], virtude:'Confunde os maus, traz serenidade, vitória e força.', sombra:'Deslealdade.', planeta:'Marte' },
  { n:72, nome:'Mumiah', datas:["30/05","11/08","23/10","04/01","18/03"], virtude:'Favorece sucesso, saúde, longevidade e grandes descobertas; ligado à medicina.', sombra:'Ódio de si mesmo e revolta familiar.', planeta:'Neptuno' },
];

const COROS_ANJOS = [
  { faixa:[1,8], nome:'Serafins', regente:'Arcanjo Metatron', dominio:'Purificação, iluminação, proximidade com o Divino.' },
  { faixa:[9,16], nome:'Querubins', regente:'Arcanjo Raziel', dominio:'Conhecimento oculto, sabedoria profunda, mistérios.' },
  { faixa:[17,24], nome:'Tronos', regente:'Arcanjo Tzafquiel', dominio:'Justiça, estabilidade, firmeza de decisão.' },
  { faixa:[25,32], nome:'Dominações', regente:'Arcanjo Tzadquiel', dominio:'Ordem, liderança justa, equilíbrio de poder.' },
  { faixa:[33,40], nome:'Potências', regente:'Arcanjo Camael', dominio:'Proteção espiritual, coragem, verdade, discernimento.' },
  { faixa:[41,48], nome:'Virtudes', regente:'Arcanjo Haniel', dominio:'Graça, revelação, sonhos intuitivos, milagres.' },
  { faixa:[49,56], nome:'Principados', regente:'Arcanjo Miguel', dominio:'Proteção de grupos, família, causas coletivas.' },
  { faixa:[57,64], nome:'Arcanjos', regente:'Arcanjo Rafael', dominio:'Cura, sabedoria, tranquilidade, harmonia no lar.' },
  { faixa:[65,72], nome:'Anjos', regente:'Arcanjo Gabriel', dominio:'Mensagens, comunicação com o plano material, ação concreta.' },
];

function coroDoGenio(numero){ return COROS_ANJOS.find(c => numero >= c.faixa[0] && numero <= c.faixa[1]); }

const DIAS_GENIOS_UNIVERSAIS = {
  "05/01":"Éter — energia de síntese e transcendência.",
  "19/03":"Ar — energia de comunicação e movimento.",
  "31/05":"Fogo — energia de ação e transformação.",
  "12/08":"Terra — energia de estrutura e materialização.",
  "24/10":"Água — energia de emoção e intuição."
};
function pinaculoActivo(dateStr, hojeStr){
  const { pinaculos, idadesTransicao } = calcularPinaculosDesafios(dateStr);
  const idade = idadeAtual(dateStr, hojeStr);
  let indice = 3;
  if (idade < idadesTransicao[0]) indice = 0;
  else if (idade < idadesTransicao[1]) indice = 1;
  else if (idade < idadesTransicao[2]) indice = 2;
  const datasTransicao = calcularIdadeEDatasTransicao(dateStr, idadesTransicao);
  return { indice, idade, pinaculo: pinaculos[indice], todos: pinaculos, datasTransicao };
}

const DESAFIOS_TEXTOS = {
  0:'Um Desafio raro — não há um obstáculo fixo, mas sim a liberdade (e a exigência) de escolher o seu próprio caminho sem um padrão herdado a vencer.',
  1:'Aprender a confiar em si e a agir sozinho(a), sem depender da aprovação ou da iniciativa dos outros.',
  2:'Vencer a sensibilidade excessiva às opiniões alheias e o medo de tomar posição.',
  3:'Superar a dispersão e a tendência a esconder sentimentos verdadeiros atrás do humor ou da conversa.',
  4:'Vencer a resistência ao trabalho estruturado e a sensação de estar sempre a lutar contra limitações.',
  5:'Aprender a lidar com a mudança sem cair em excessos ou fuga constante ao compromisso.',
  6:'Superar o perfeccionismo e a tendência a assumir responsabilidades que não são suas.',
  7:'Vencer o isolamento e a desconfiança — aprender a partilhar a sabedoria em vez de a guardar sozinho(a).',
  8:'Aprender a lidar com o poder e o dinheiro sem cair no extremo do controlo ou da escassez.'
};

function calcularPinaculosDesafios(dateStr){
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  const diaR = reduceNumber(dia);
  const mesR = reduceNumber(mes);
  const anoR = reduceNumber(String(ano).split('').reduce((a,d)=>a+parseInt(d,10),0));
  const cv = caminhoDeVida(dateStr);

  const p1 = reduceNumber(mesR + diaR);
  const p2 = reduceNumber(diaR + anoR);
  const p3 = reduceNumber(p1 + p2);
  const p4 = reduceNumber(mesR + anoR);

  const reduceSimples = (n) => { n = Math.abs(n); while (n > 9){ n = String(n).split('').reduce((a,d)=>a+(parseInt(d,10)||0),0); } return n; };
  const d1 = reduceSimples(mesR - diaR);
  const d2 = reduceSimples(diaR - anoR);
  const d3 = reduceSimples(d1 - d2);
  const d4 = reduceSimples(mesR - anoR);

  const fim1 = 36 - cv;
  const fim2 = fim1 + 9;
  const fim3 = fim2 + 9;

  return {
    pinaculos: [
      { numero: p1, desafio: d1, faixa: `nascimento — ${fim1} anos` },
      { numero: p2, desafio: d2, faixa: `${fim1} — ${fim2} anos` },
      { numero: p3, desafio: d3, faixa: `${fim2} — ${fim3} anos` },
      { numero: p4, desafio: d4, faixa: `${fim3}+ anos (resto da vida)` }
    ],
    idadesTransicao: [fim1, fim2, fim3]
  };
}
function calcularIdadeEDatasTransicao(dateStr, idades){
  const nasc = new Date(dateStr + 'T12:00:00');
  return idades.map(idade => {
    const d = new Date(nasc);
    d.setFullYear(d.getFullYear() + idade);
    return d.toISOString().slice(0,10);
  });
}
function idadeAtual(dateStr, hojeStr){
  const nasc = new Date(dateStr+'T12:00:00');
  const hoje = new Date(hojeStr+'T12:00:00');
  let idade = hoje.getFullYear() - nasc.getFullYear();
  const aindaNaoFezAnos = (hoje.getMonth() < nasc.getMonth()) ||
    (hoje.getMonth() === nasc.getMonth() && hoje.getDate() < nasc.getDate());
  if (aindaNaoFezAnos) idade--;
  return idade;
}
function anoUniversal(ano){ return reduceNumber(String(ano).split('').reduce((a,d)=>a+parseInt(d,10),0)); }
function calcularCiclosPessoais(dateStr, hojeStr){
  const [, mes, dia] = dateStr.split('-').map(Number);
  const hoje = new Date(hojeStr+'T12:00:00');
  const anoAtual = hoje.getFullYear();
  const mesAtual = hoje.getMonth()+1;
  const diaAtual = hoje.getDate();
  const diaR = reduceNumber(dia);
  const mesR = reduceNumber(mes);
  const anoUniv = anoUniversal(anoAtual);
  const anoPessoal = reduceNumber(diaR + mesR + anoUniv);
  const mesPessoal = reduceNumber(anoPessoal + reduceNumber(mesAtual));
  const diaPessoal = reduceNumber(mesPessoal + reduceNumber(diaAtual));
  return { anoPessoal, mesPessoal, diaPessoal, anoUniversal: anoUniv };
}

/* ─── Mestre ascensionado (dia da semana) e chakra dominante ─── */
const DIAS_SEMANA_PT = ['domingo','segunda-feira','terça-feira','quarta-feira','quinta-feira','sexta-feira','sábado'];
const PLANETA_SIGNO = { 'Carneiro':'Marte', 'Touro':'Vénus', 'Gémeos':'Mercúrio', 'Caranguejo':'Lua', 'Leão':'Sol', 'Virgem':'Mercúrio', 'Balança':'Vénus', 'Escorpião':'Plutão', 'Sagitário':'Júpiter', 'Capricórnio':'Saturno', 'Aquário':'Úrano', 'Peixes':'Neptuno' };
const MESTRE_DIA_SEMANA = {
  0: { planeta:'Sol', raio:'1.º Raio', dons:'liderança, determinação, coragem, sentido de missão e vontade de proteger os outros', atencao:'teimosia, rigidez e querer controlar tudo', cor:'azul', mestre:'El Morya', texto:'Quem nasce num {DIA} liga-se ao 1.º Raio, o Raio Azul: o raio da vontade, do poder, da fé e da proteção. O mestre ascensionado associado é El Morya, que ajuda a ter coragem, direção e firmeza para seguir o próprio caminho. É uma cura que passa por dar força: devolve a confiança e a coragem para sair do medo e da insegurança.' },
  1: { planeta:'Lua', raio:'2.º Raio', dons:'sabedoria, serenidade, mente clara, jeito para ensinar e aconselhar e gosto por estudar e compreender', atencao:'viver demasiado na cabeça e ficar distante ou frio com as emoções', cor:'dourado', mestre:'o Mestre Lanto', texto:'Quem nasce numa {DIA} liga-se ao 2.º Raio, o Raio Dourado: o raio da sabedoria, da iluminação e do entendimento. O mestre ascensionado associado é o Mestre Lanto, que ajuda a ver as situações com clareza e a aprender com elas. É uma cura que passa pela compreensão: quando percebemos a origem do que vivemos, muita coisa deixa de pesar.' },
  2: { planeta:'Marte', raio:'3.º Raio', dons:'amor, criatividade, sensibilidade, sentido de beleza, arte e jeito para a harmonia nas relações', atencao:'dar demais, depender emocionalmente dos outros e esquecer-se de si', cor:'rosa', mestre:'Rowena', texto:'Quem nasce numa {DIA} liga-se ao 3.º Raio, o Raio Rosa: o raio do amor, da beleza e da harmonia. O mestre ascensionado associado é Paulo, o Veneziano, que ajuda a abrir o coração, a criar e a cuidar das relações. É uma cura que passa pelo amor: as feridas do coração sossegam com carinho, ternura e perdão.' },
  3: { planeta:'Mercúrio', raio:'4.º Raio', dons:'disciplina, foco, perseverança, procura de excelência e vontade de elevar a vida a um nível mais puro', atencao:'perfeccionismo e exigir demais de si', cor:'branco', mestre:'Serapis Bey', texto:'Quem nasce numa {DIA} liga-se ao 4.º Raio, o Raio Branco: o raio da pureza, da disciplina e da ascensão. O mestre ascensionado associado é Serapis Bey, que ajuda a pôr ordem, a purificar e a elevar a energia. É uma cura que passa pela purificação: limpar e pôr ordem faz o corpo e a mente voltarem a respirar.' },
  4: { planeta:'Júpiter', raio:'5.º Raio', dons:'intuição, concentração, sentido prático, procura da verdade, curiosidade e abundância', atencao:'duvidar de tudo e confiar só na lógica', cor:'verde', mestre:'Hilarião', texto:'Quem nasce numa {DIA} liga-se ao 5.º Raio, o Raio Verde: o raio da cura, da verdade e do conhecimento. O mestre ascensionado associado é Hilarião, que ajuda a curar, a encontrar a verdade e a trazer equilíbrio ao corpo e à mente. É a cura do corpo e da mente: encontrar a verdade e devolver o equilíbrio ao que estava desarrumado.' },
  5: { planeta:'Vénus', raio:'6.º Raio', dons:'dedicação, compaixão, vontade de servir, devoção e uma coragem tranquila', atencao:'sacrificar-se demais e guardar mágoa quando não se sente reconhecido', cor:'rubi', mestre:'a Mestra Nada', texto:'Quem nasce numa {DIA} liga-se ao 6.º Raio, o Raio Rubi: o raio da paz, do serviço e da devoção. O mestre ascensionado associado é a Mestra Nada, que ajuda a servir com amor e a manter a paz interior. É uma cura que passa pela paz: acalmar o coração e servir com amor alivia a alma.' },
  6: { planeta:'Saturno', raio:'7.º Raio', dons:'liberdade, criatividade, ritual e magia, justiça com misericórdia e capacidade de perdoar e recomeçar', atencao:'querer mudar tudo de uma vez ou carregar o peso dos outros', cor:'violeta', mestre:'Saint Germain', texto:'Quem nasce num {DIA} liga-se ao 7.º Raio, o Raio Violeta: o raio da transmutação, da liberdade e do perdão. O mestre ascensionado associado é Saint Germain, que ajuda a transformar o que pesa em luz e a limpar as energias densas. É uma cura que passa por transformar e libertar o que pesa.' }
};
function calcularMestreDia(dateStr){
  const d = new Date(dateStr + 'T12:00:00'); if (isNaN(d)) return null;
  const i = d.getDay();
  const base = { dia: DIAS_SEMANA_PT[i], nasceuNum: (i === 0 || i === 6 ? 'num ' : 'numa ') + DIAS_SEMANA_PT[i] };
  const m = MESTRE_DIA_SEMANA[i]; if (!m) return base;
  return Object.assign(base, m, { texto: m.texto.replace('{DIA}', DIAS_SEMANA_PT[i]) });
}

const TRI_CHAKRA_LIVRO = {
  1:{ nome:'Raiz', sans:'Muladhara', titulo:'O Realizador', cor:'vermelho', local:'base da coluna',
      luz:'é o alicerce: prático, resiliente, leal e com grande força vital, é quem constrói, provê e protege',
      sombra:'insegurança, sobretudo financeira, medo da perda, teimosia e, nos dias maus, apatia e a sensação de estar preso(a)',
      caminho:'aterrar (caminhar descalço(a) na terra), confiar na vida e praticar o desapego do que é excessivo' },
  2:{ nome:'Sacro', sans:'Svadhishthana', titulo:'O Criativo', cor:'laranja', local:'dois dedos abaixo do umbigo',
      luz:'é o artista da vida: sente fundo, cria com paixão e tem um magnetismo natural',
      sombra:'instabilidade emocional, excessos que viram vícios, culpa, vergonha e a ideia de não merecer',
      caminho:'encontrar prazer em coisas simples, trabalhar o merecimento e aceitar as emoções sem julgamento' },
  3:{ nome:'Plexo Solar', sans:'Manipura', titulo:'O Líder', cor:'amarelo', local:'acima do umbigo',
      luz:'tem força de vontade, disciplina, confiança e capacidade de transformar ideias em realidade',
      sombra:'ansiedade de desempenho, medo de falhar, a ideia de nunca ser suficiente e, em excesso, cansaço por controlar tudo',
      caminho:'aprender a ser e não só a fazer, dar-se valor independentemente dos resultados e respirar fundo para soltar o nó no estômago' },
  4:{ nome:'Coração', sans:'Anahata', titulo:'O Curador', cor:'verde ou rosa', local:'centro do peito',
      luz:'é empático(a), compassivo(a) e diplomata, e a sua vida é um exercício de amor e de ligação',
      sombra:'auto-sacrifício, mágoas guardadas, dependência emocional e medo de perder as ligações',
      caminho:'pôr limites saudáveis, praticar o perdão e fazer do amor-próprio a base' },
  5:{ nome:'Garganta', sans:'Vishuddha', titulo:'O Comunicador', cor:'azul claro', local:'base da garganta',
      luz:'vive a sua verdade: exprime-se com clareza e honestidade e alinha o que diz com o que faz',
      sombra:'medo de se expressar, dificuldade em dizer não, opiniões engolidas para evitar conflito ou, no extremo, falar demais sem ouvir',
      caminho:'comunicar com assertividade, escutar com atenção e usar a criatividade (escrever, cantar, pintar)' },
  6:{ nome:'Terceiro Olho', sans:'Ajna', titulo:'O Visionário', cor:'azul índigo', local:'centro da testa',
      luz:'tem intuição, clareza mental e capacidade de distinguir a verdade da ilusão',
      sombra:'prisão mental: pensar demais, cenários catastróficos, preocupação em círculo e dores de cabeça',
      caminho:'sair da cabeça e voltar ao corpo, com exercício, respiração e aterramento' },
  7:{ nome:'Coroa', sans:'Sahasrara', titulo:'O Espiritual', cor:'violeta ou branco-dourado', local:'topo da cabeça',
      luz:'sente uma forte ligação ao divino e ao sentido maior da vida, e vê o quadro geral',
      sombra:'fuga à realidade, sensação de desligamento do corpo e das emoções e falta de propósito',
      caminho:'trazer o céu para a terra, ativando a raiz com dança, jardinagem e tarefas práticas' },
  8:{ nome:'Estrela da Alma', sans:'Causal', titulo:'O Manifestador', cor:'branco-perolado, prateado ou magenta', local:'acima da cabeça',
      luz:'tem uma ligação forte à alma e à missão de vida, e o poder de ligar o espírito à matéria',
      sombra:'autoritarismo ou obsessão material, impaciência, sobrecarga mental e sensação de desfasamento',
      caminho:'juntar visão espiritual e ação compassiva, ter paciência com o ritmo do plano físico e aterrar' },
  9:{ nome:'Portal Estelar', sans:'Cósmico', titulo:'O Humanitário', cor:'dourado, platina ou luz branca', local:'bem acima da cabeça',
      luz:'vive em unidade com o Todo e dedica-se ao serviço incondicional dos outros',
      sombra:'sofrer demais com as dores do mundo, esgotamento, isolamento e dificuldade em viver o aqui e agora',
      caminho:'proteger o campo energético, servir de forma sustentável e fazer do autocuidado um ato sagrado' }
};
function chakraDominanteNum(dataStr){
  if (!dataStr) return null;
  let n = String(dataStr).replace(/\D/g,'').split('').reduce((a,b) => a + Number(b), 0);
  while (n > 9) n = String(n).split('').reduce((a,b) => a + Number(b), 0);
  return n >= 1 ? n : null;
}
/* ─── Imagens de apoio (planetas, mestres, arcanjos) ─── */
function miNorm(grupo, nome){
  let n = String(nome || '').replace(/^(o|a)\s+/i,'').replace(/^Mestr[ae]\s+/i,'').replace(/^Arcanjo\s+/i,'').trim();
  const alias = { 'Hilarião':'Hilarion', 'Seraphis Bey':'Serapis Bey', 'Tzadquiel':'Zadquiel', 'Mikael':'Miguel', 'Michael':'Miguel' };
  return alias[n] || n;
}
function miSrc(grupo, nome){
  const g = (window.MAPA_IMG || {})[grupo]; return g ? g[miNorm(grupo, nome)] || '' : '';
}
function miPlanetasHTML(nomes){
  const vistos = [], itens = [];
  (nomes || []).forEach(n => { if (!n || vistos.includes(n)) return; vistos.push(n); const src = miSrc('planetas', n); if (src) itens.push(`<div style="text-align:center;width:70px;"><img src="${src}" alt="${escapeHtml(n)}" style="width:62px;height:62px;object-fit:contain;"><div class="muted" style="font-size:.78rem;margin-top:2px;">${escapeHtml(n)}</div></div>`); });
  return itens.length ? `<div style="display:flex;gap:12px;flex-wrap:wrap;margin:10px 0 2px;">${itens.join('')}</div>` : '';
}
function miMestreHTML(nome){
  const src = miSrc('mestres', nome); if (!src) return '';
  return `<img src="${src}" alt="${escapeHtml(nome)}" style="float:left;width:92px;border-radius:10px;margin:2px 12px 8px 0;box-shadow:0 2px 8px rgba(0,0,0,.25);">`;
}
function miArcanjoHTML(nome){
  const src = miSrc('arcanjos', nome) || miSrc('mestres', nome); if (!src) return '';
  return `<div style="text-align:center;width:130px;margin:10px auto 0;"><img src="${src}" alt="${escapeHtml(nome)}" style="width:130px;border-radius:12px;"><div class="muted" style="font-size:.78rem;margin-top:3px;">Arcanjo regente: ${escapeHtml(miNorm('arcanjos', nome))}</div></div>`;
}
function blocoMestreChakraHTML(r, estilo){
  const md = r.mestreDia || (r.dataNascimento ? calcularMestreDia(r.dataNascimento) : null);
  const cdn = r.chakraDom || (r.dataNascimento ? chakraDominanteNum(r.dataNascimento) : null), cd = cdn && TRI_CHAKRA_LIVRO[cdn];
  const card = (inner) => estilo === 'card' ? `<div class="card">${inner}</div>` : `<div class="result-block">${inner}</div>`;
  const h = (t) => estilo === 'card' ? `<h3 style="color:var(--gold-light);">${t}</h3>` : `<h3>${t}</h3>`;
  let out = '';
  if (r.ascendente) out += card(`${h('🌅 O seu Ascendente: ' + escapeHtml(r.ascendente.signo) + ' (' + r.ascendente.graus + '°)')}
    <p class="muted" style="margin-top:6px;">${r.localNascimento ? 'Nasceu em ' + escapeHtml([r.localNascimento.cidade, r.localNascimento.pais].filter(Boolean).join(', ')) + (r.horaNascimento ? ', às ' + escapeHtml(r.horaNascimento) : '') + '. ' : ''}${escapeHtml(r.ascendente.texto)}</p>
    ${r.ascendente.aproximado ? '<p class="muted" style="margin-top:6px;font-size:.8rem;">Cálculo aproximado, feito a partir da cidade principal do país.</p>' : ''}`);
  if (r.ascendente && r.ascendente.casas) out += card(`${h('🏛️ As suas 12 Casas')}
    <p class="muted" style="margin-top:6px;">O seu Sol está na <strong>Casa ${r.ascendente.solCasa}</strong> (${escapeHtml(r.ascendente.casas[r.ascendente.solCasa-1].tema)}): é aí que a sua luz mais quer brilhar.</p>
    ${r.ascendente.casas.map(c => `<p class="muted" style="margin-top:6px;"><strong>Casa ${c.n} · ${escapeHtml(c.signo)}</strong> — ${escapeHtml(c.tema)}</p>`).join('')}`);
  if (r.ascendente && r.ascendente.anjos && r.ascendente.anjos.length) out += card(`${h('👼 Os seus três Anjos')}
    ${r.ascendente.anjos.map(j => `<p style="margin-top:10px;"><strong>${escapeHtml(j.titulo)}: ${escapeHtml(j.nome)}</strong> <span class="muted">(${escapeHtml(j.como)})</span></p><p class="muted">${escapeHtml(j.virtude)} Quando está em baixo, atenção a: ${escapeHtml(j.sombra.charAt(0).toLowerCase() + j.sombra.slice(1))}</p>`).join('')}`);
  const cvN = r.caminhoDeVida, cvI = cvN && DONS_NUMERICOS[cvN];
  const signoNome = r.signo, ps = signoNome && PLANETA_SIGNO[signoNome], pa = r.anjo && r.anjo.tipo === 'anjo' && r.anjo.planeta;
  const planetas = [md && md.planeta && `<strong>${escapeHtml(md.planeta)}</strong> (dia em que nasceu)`, ps && `<strong>${escapeHtml(ps)}</strong> (signo ${escapeHtml(signoNome)})`, pa && `<strong>${escapeHtml(pa)}</strong> (Anjo do nascimento)`].filter(Boolean);
  if (cvI) out += card(`${h('🔢 O seu Número de Vida: ' + cvN + ' — ' + escapeHtml(cvI.nome || ''))}
    <p class="muted" style="margin-top:6px;">${escapeHtml(cvI.texto || '')}</p>`);
  if (planetas.length) out += card(`${h('🪐 Os seus Planetas Regentes')}
    <p class="muted" style="margin-top:6px;">${planetas.join(' · ')}.</p>
    ${miPlanetasHTML([md && md.planeta, ps, pa])}`);
  if (md && md.mestre) out += card(`${h('🌟 O seu Mestre Ascensionado: ' + escapeHtml(md.mestre))}
    ${miMestreHTML(md.mestre)}<p class="muted" style="margin-top:6px;">Nasceu ${escapeHtml(md.nasceuNum)}. ${escapeHtml(md.texto)}</p>
    <p class="muted" style="margin-top:6px;"><strong>💎 Para além da cura, este raio traz:</strong> ${escapeHtml(md.dons)}.</p>
    <p class="muted" style="margin-top:6px;"><strong>🌑 O que merece atenção:</strong> ${escapeHtml(md.atencao)}.</p><div style="clear:both;"></div>`);
  if (cd) out += card(`${h('🌈 O seu Chakra Dominante: ' + escapeHtml(cd.nome) + ' — ' + escapeHtml(cd.titulo))}
    <p class="muted" style="margin-top:6px;">Pelo mesmo cálculo do Caminho de Vida (${r.caminhoDeVida || ''}), o seu chakra dominante é o <strong>${escapeHtml(cd.nome)}</strong> (${escapeHtml(cd.sans)}), cor ${escapeHtml(cd.cor)}, ${escapeHtml(cd.local)}.</p>
    <p class="muted" style="margin-top:6px;"><strong>💎 Na sua melhor versão:</strong> ${escapeHtml(cd.luz)}.</p>
    <p class="muted" style="margin-top:6px;"><strong>🌑 O desafio que mais se repete:</strong> ${escapeHtml(cd.sombra)}.</p>
    <p class="muted" style="margin-top:6px;"><strong>🌿 O caminho de equilíbrio:</strong> ${escapeHtml(cd.caminho)}.</p>`);
  return out;
}
/* ─── Ascendente (signo tropical) a partir de data, hora legal e local de nascimento ─── */
const ASC_RAD = Math.PI / 180;
function ascDiaJuliano(y, m, d, hUT){
  if (m <= 2){ y -= 1; m += 12; }
  const A = Math.floor(y / 100), B = 2 - A + Math.floor(A / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + d + hUT / 24 + B - 1524.5;
}
function ascOffsetFuso(tz, instanteUTC){
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle:'h23', year:'numeric', month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit', second:'2-digit' });
  const p = {}; f.formatToParts(new Date(instanteUTC)).forEach(x => { p[x.type] = x.value; });
  const local = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return local - Math.floor(instanteUTC / 1000) * 1000;
}
function ascHoraLegalParaUT(dataISO, hhmm, tz){
  const [Y, M, D] = dataISO.split('-').map(Number), [h, mi] = hhmm.split(':').map(Number);
  const alvo = Date.UTC(Y, M - 1, D, h, mi, 0);
  let utc = alvo - ascOffsetFuso(tz, alvo);
  utc = alvo - ascOffsetFuso(tz, utc);
  return new Date(utc);
}
function calcularAscendente(dataISO, hhmm, lat, lon, tz){
  const ut = ascHoraLegalParaUT(dataISO, hhmm, tz);
  const jd = ascDiaJuliano(ut.getUTCFullYear(), ut.getUTCMonth() + 1, ut.getUTCDate(), ut.getUTCHours() + ut.getUTCMinutes() / 60 + ut.getUTCSeconds() / 3600);
  const T = (jd - 2451545.0) / 36525;
  const gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - T * T * T / 38710000;
  const ramc = ((gmst + lon) % 360 + 360) % 360;
  const eps = (23.4392911 - 0.0130042 * T) * ASC_RAD;
  const r = ramc * ASC_RAD, ph = lat * ASC_RAD;
  let asc = Math.atan2(Math.cos(r), -(Math.sin(r) * Math.cos(eps) + Math.tan(ph) * Math.sin(eps))) / ASC_RAD;
  asc = (asc % 360 + 360) % 360;
  const SIG = ['Carneiro','Touro','Gémeos','Caranguejo','Leão','Virgem','Balança','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'];
  const i = Math.floor(asc / 30);
  return { grau: asc, signo: SIG[i], indice: i, graus: Math.floor(asc - i * 30) };
}

const CIDADES_PT = {
  'Aveiro':[40.64,-8.65], 'Beja':[38.02,-7.86], 'Braga':[41.55,-8.43], 'Bragança':[41.81,-6.76], 'Castelo Branco':[39.82,-7.49],
  'Coimbra':[40.21,-8.43], 'Évora':[38.57,-7.91], 'Faro':[37.02,-7.93], 'Fafe':[41.45,-8.17], 'Guarda':[40.54,-7.27], 'Guimarães':[41.44,-8.30],
  'Leiria':[39.74,-8.81], 'Lisboa':[38.72,-9.14], 'Portalegre':[39.29,-7.43], 'Porto':[41.15,-8.61], 'Santarém':[39.24,-8.69],
  'Setúbal':[38.52,-8.89], 'Viana do Castelo':[41.69,-8.83], 'Vila Nova de Famalicão':[41.41,-8.52], 'Barcelos':[41.54,-8.62],
  'Vila Real':[41.30,-7.74], 'Viseu':[40.66,-7.91], 'Funchal (Madeira)':[32.65,-16.91, 'Atlantic/Madeira'], 'Ponta Delgada (Açores)':[37.74,-25.67, 'Atlantic/Azores']
};
const PAISES_NASC = {
  'Portugal':{ tz:'Europe/Lisbon' },
  'Brasil':{ lat:-15.79, lon:-47.88, tz:'America/Sao_Paulo' }, 'Angola':{ lat:-8.84, lon:13.23, tz:'Africa/Luanda' },
  'Moçambique':{ lat:-25.97, lon:32.57, tz:'Africa/Maputo' }, 'Cabo Verde':{ lat:14.93, lon:-23.51, tz:'Atlantic/Cape_Verde' },
  'Guiné-Bissau':{ lat:11.86, lon:-15.60, tz:'Africa/Bissau' }, 'São Tomé e Príncipe':{ lat:0.34, lon:6.73, tz:'Africa/Sao_Tome' },
  'Timor-Leste':{ lat:-8.56, lon:125.57, tz:'Asia/Dili' }, 'França':{ lat:48.86, lon:2.35, tz:'Europe/Paris' },
  'Suíça':{ lat:46.95, lon:7.45, tz:'Europe/Zurich' }, 'Luxemburgo':{ lat:49.61, lon:6.13, tz:'Europe/Luxembourg' },
  'Espanha':{ lat:40.42, lon:-3.70, tz:'Europe/Madrid' }, 'Alemanha':{ lat:52.52, lon:13.40, tz:'Europe/Berlin' },
  'Reino Unido':{ lat:51.51, lon:-0.13, tz:'Europe/London' }, 'Estados Unidos':{ lat:40.71, lon:-74.01, tz:'America/New_York' },
  'Canadá':{ lat:43.65, lon:-79.38, tz:'America/Toronto' }, 'Venezuela':{ lat:10.48, lon:-66.90, tz:'America/Caracas' },
  'Itália':{ lat:41.90, lon:12.50, tz:'Europe/Rome' }
};
const ASCENDENTE_TEXTOS = {
  'Carneiro':'Ascendente em Carneiro: a primeira impressão que dá é de energia, coragem e iniciativa. Gosta de começar, de abrir caminho e de agir sem esperar muito. O desafio é ter paciência e não se queimar de tanto correr.',
  'Touro':'Ascendente em Touro: passa calma, firmeza e segurança. Aprecia o conforto, a beleza e as coisas bem feitas, e constrói devagar mas com raízes fundas. O desafio é não se agarrar demais ao que já conhece.',
  'Gémeos':'Ascendente em Gémeos: aparece curioso, comunicativo e leve. Aprende depressa, fala com todos e tem muitas ideias ao mesmo tempo. O desafio é focar-se e não dispersar a energia.',
  'Caranguejo':'Ascendente em Caranguejo: mostra-se sensível, protetor e acolhedor. Sente tudo com intensidade e cuida de quem ama como se fosse família. O desafio é não se esconder na casca quando se sente magoado.',
  'Leão':'Ascendente em Leão: tem presença e brilho próprio. Passa generosidade, calor e vontade de criar e de liderar. O desafio é não depender do reconhecimento dos outros para se sentir valioso.',
  'Virgem':'Ascendente em Virgem: parece atento, prático e cuidadoso. Repara nos detalhes, gosta de ser útil e de ajudar a pôr as coisas em ordem. O desafio é ser menos exigente consigo próprio.',
  'Balança':'Ascendente em Balança: transmite equilíbrio, simpatia e bom gosto. Procura harmonia nas relações e tem jeito para a diplomacia. O desafio é decidir sem esperar a aprovação de todos.',
  'Escorpião':'Ascendente em Escorpião: tem uma presença intensa e magnética, que parece ver o que está por baixo. Vive as emoções a fundo e é capaz de se transformar de dentro para fora. O desafio é confiar e deixar cair as defesas.',
  'Sagitário':'Ascendente em Sagitário: mostra otimismo, franqueza e sede de aventura. Procura sentido, liberdade e conhecimento, e contagia os outros com a sua fé na vida. O desafio é não prometer mais do que consegue cumprir.',
  'Capricórnio':'Ascendente em Capricórnio: passa seriedade, maturidade e responsabilidade. Constrói com paciência e persistência e chega longe. O desafio é permitir-se descansar, sentir e pedir ajuda.',
  'Aquário':'Ascendente em Aquário: aparece original, independente e à frente do seu tempo. Valoriza a liberdade, a amizade e as ideias novas. O desafio é deixar os outros aproximarem-se do seu lado mais emotivo.',
  'Peixes':'Ascendente em Peixes: tem uma presença suave, intuitiva e compassiva. Sente o que os outros sentem e vive muito do sonho e da fé. O desafio é pôr limites e manter os pés na terra.'
};
function localNascimentoResolvido(pais, cidade){
  const p = PAISES_NASC[pais]; if (!p) return null;
  if (pais === 'Portugal'){
    const c = CIDADES_PT[cidade]; if (!c) return null;
    return { pais, cidade, lat:c[0], lon:c[1], tz:c[2] || p.tz, aproximado:false };
  }
  return { pais, cidade: cidade || '', lat:p.lat, lon:p.lon, tz:p.tz, aproximado:true };
}
const CASAS_TEMAS = ['Eu, corpo e primeira impressão','Dinheiro, recursos e valores','Comunicação, irmãos e aprendizagem','Lar, raízes e família','Criatividade, amor e filhos','Saúde, rotina e trabalho diário','Parcerias e relações a dois','Transformação, partilhas e o que é profundo','Fé, estudos e viagens longas','Carreira, vocação e reconhecimento','Amizades, grupos e sonhos','Espiritualidade, recolhimento e o inconsciente'];
const SIGNOS_ORDEM = ['Carneiro','Touro','Gémeos','Caranguejo','Leão','Virgem','Balança','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'];
function longitudeSolar(dataISO, hhmm, tz){
  const ut = ascHoraLegalParaUT(dataISO, hhmm, tz);
  const jd = ascDiaJuliano(ut.getUTCFullYear(), ut.getUTCMonth()+1, ut.getUTCDate(), ut.getUTCHours()+ut.getUTCMinutes()/60);
  const n = jd - 2451545.0, L = 280.460 + 0.9856474*n, g = (357.528 + 0.9856003*n) * ASC_RAD;
  return (((L + 1.915*Math.sin(g) + 0.020*Math.sin(2*g)) % 360) + 360) % 360;
}
function anjoPorNumero(n, titulo, como){
  const g = GENIOS_72.find(x => x.n === n); if (!g) return null;
  const coro = coroDoGenio(g.n) || {};
  return { titulo, como, numero:g.n, nome:g.nome, coro:coro.nome || '', virtude:g.virtude, sombra:g.sombra, planeta:g.planeta };
}
function ascendenteDoMapa(dataISO, hhmm, loc){
  try{
    if (!loc || !hhmm || !/^\d{1,2}:\d{2}$/.test(hhmm)) return null;
    const a = calcularAscendente(dataISO, hhmm, loc.lat, loc.lon, loc.tz);
    const casas = [];
    for (let k = 0; k < 12; k++){
      const c = (a.grau + 30*k) % 360, si = Math.floor(c/30);
      casas.push({ n:k+1, signo:SIGNOS_ORDEM[si], tema:CASAS_TEMAS[k] });
    }
    const sol = longitudeSolar(dataISO, hhmm, loc.tz);
    const solCasa = Math.floor((((sol - a.grau) % 360) + 360) % 360 / 30) + 1;
    const [h, mi] = hhmm.split(':').map(Number);
    const nHora = Math.min(72, Math.floor((h*60 + mi) / 20) + 1);
    const nAsc = Math.min(72, Math.floor(a.grau / 5) + 1);
    const anjoData = calcularAnjoNascimento(dataISO);
    const anjos = [];
    if (anjoData && anjoData.tipo === 'anjo') anjos.push(anjoPorNumero(anjoData.numero, 'Anjo do Nascimento', 'pelo dia em que nasceu'));
    anjos.push(anjoPorNumero(nHora, 'Anjo da Hora', 'pela hora a que nasceu, com cada Anjo a governar 20 minutos'));
    anjos.push(anjoPorNumero(nAsc, 'Anjo do Ascendente', 'pelo grau do seu Ascendente, com cada Anjo a governar 5 graus'));
    return { signo:a.signo, graus:a.graus, texto:ASCENDENTE_TEXTOS[a.signo] || '', aproximado:!!loc.aproximado,
      casas, solCasa, solSigno:SIGNOS_ORDEM[Math.floor(sol/30)], anjos: anjos.filter(Boolean) };
  }catch(_){ return null; }
}


/* ─── Como harmonizar cada vibração (passo a passo) ─── */
const GUIA_VIB = {
  1:{ foco:'iniciativa e independência', cor:'vermelho ou laranja suave', cristal:'cornalina ou jaspe vermelho', rotina:'escolher, ao domingo, uma só coisa nova a começar nessa semana', frase:'Dou o primeiro passo com coragem e calma.' },
  2:{ foco:'paz, parceria e cooperação', cor:'branco, rosa suave ou prateado', cristal:'quartzo rosa ou pedra da lua', rotina:'jantar ou tomar um chá com alguém, sem telemóvel na mesa', frase:'Dou e recebo com equilíbrio.' },
  3:{ foco:'alegria, comunicação e criatividade', cor:'amarelo ou dourado', cristal:'citrino', rotina:'fazer uma coisa criativa por semana (cantar, escrever, cozinhar)', frase:'Exprimo-me com verdade e leveza.' },
  4:{ foco:'ordem, estabilidade e bases firmes', cor:'verde ou castanho terra', cristal:'turmalina negra ou jaspe verde', rotina:'arrumar uma gaveta ou um canto por semana', frase:'Construo com paciência e confiança.' },
  5:{ foco:'movimento, liberdade e mudança', cor:'azul turquesa ou verde água', cristal:'amazonite ou ágata azul', rotina:'mudar um pormenor da casa ou do caminho do dia a dia todas as semanas', frase:'Mudo com liberdade e com os pés na terra.' },
  6:{ foco:'amor, família e cuidado', cor:'rosa ou verde claro', cristal:'quartzo rosa ou aventurina verde', rotina:'ter uma planta viva e uma refeição em família por semana', frase:'O meu lar é um lugar de amor e paz.' },
  7:{ foco:'recolhimento, estudo e espiritualidade', cor:'violeta ou azul índigo', cristal:'ametista', rotina:'ter 10 minutos de silêncio ou oração por dia, sem ecrãs', frase:'No silêncio encontro as minhas respostas.' },
  8:{ foco:'trabalho, abundância e poder pessoal', cor:'dourado ou verde escuro', cristal:'olho de tigre ou pirite', rotina:'reservar um dia por semana para descansar sem pensar em trabalho', frase:'Mereço abundância e também descanso.' },
  9:{ foco:'entrega, compaixão e encerramento de ciclos', cor:'branco ou lilás', cristal:'quartzo transparente', rotina:'dar ou doar uma coisa que já não usa, todos os meses', frase:'Deixo ir o que terminou e abro espaço ao novo.' },
  11:{ foco:'intuição forte, sensibilidade e alta energia elétrica (o risco é a sobrecarga nervosa e a sensação de "travar" a vida)', cor:'azul claro, branco ou verde suave (nada de vermelhos fortes ou luzes frias)', cristal:'selenite, quartzo transparente ou howlita', rotina:'descarregar a energia ao fim do dia: banho com uma mão-cheia de sal grosso e 10 minutos descalço na terra ou na relva', frase:'Estou seguro e em paz. Canalizo a minha energia com calma e ordem.',
      extra:['Desligue o wi‑fi e carregue o telemóvel fora do quarto à noite.','Use luz quente e suave à noite e evite luz branca forte depois das 21h.','Evite deixar muitos aparelhos ligados juntos (televisão, rádio, computador) no mesmo espaço.'] },
  22:{ foco:'construir em grande, com visão e responsabilidade', cor:'dourado e verde escuro', cristal:'fluorite ou pirite', rotina:'escrever à segunda-feira os três passos práticos da semana', frase:'Construo com firmeza aquilo que é grande e útil.' },
  33:{ foco:'serviço, cuidado dos outros e amor incondicional', cor:'rosa e branco', cristal:'quartzo rosa', rotina:'uma tarde por semana só para si, sem cuidar de ninguém', frase:'Cuido dos outros começando por cuidar de mim.' }
};
function guiaHarmonizar(num, tipo){
  const g = GUIA_VIB[num]; if (!g) return null;
  let passos;
  if (tipo === 'morada'){
    passos = [
      'Limpe primeiro: abra todas as janelas durante 10 minutos e lave o chão com um pouco de sal grosso na água.',
      `Acrescente a cor ${g.cor} em pequenos detalhes (uma almofada, uma vela, um quadro) na sala e junto da entrada.`,
      `Coloque ${g.cristal} perto da porta de entrada, num sítio discreto.`,
      `À porta, antes de sair ou ao chegar, diga com calma: "${g.frase}"`,
      `Rotina semanal: ${g.rotina}.`
    ].concat(g.extra || []);
  } else if (tipo === 'telemovel'){
    passos = [
      'Limpe o telemóvel: apague conversas e aplicações que já não usa e arrume os contactos.',
      `Escolha um fundo de ecrã na cor ${g.cor}.`,
      `Antes de atender uma chamada importante, respire fundo e pense: "${g.frase}"`
    ];
  } else {
    passos = [
      'Mantenha o carro limpo e arrumado por dentro.',
      `Leve um pequeno objeto na cor ${g.cor} (ou ${g.cristal}) no carro.`,
      `Antes de ligar o carro, diga em voz baixa: "${g.frase}"`
    ];
  }
  return { titulo: 'Como harmonizar (foco: ' + g.foco + ')', passos };
}
function guiaVibHTML(num, tipo){
  const g = guiaHarmonizar(num, tipo); if (!g) return '';
  return `<details style="margin:6px 0 10px;"><summary style="cursor:pointer;color:var(--gold-light);font-size:.85rem;">🌿 Como harmonizar passo a passo</summary><p class="muted" style="margin-top:6px;font-size:.85rem;"><strong>${escapeHtml(g.titulo)}</strong></p><ol class="muted" style="margin:6px 0 0 18px;font-size:.85rem;line-height:1.5;">${g.passos.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ol></details>`;
}


/* ─── Abundância e proteção da família (por Caminho de Vida) ─── */
const ABUND_CV = {
  1:{ tema:'iniciativa própria: o dinheiro chega quando você começa e decide', cuidado:'decidir sozinho tudo e gastar por impulso', passo:'escrever uma meta de dinheiro por mês e dar um primeiro passo concreto esta semana' },
  2:{ tema:'cooperação: ganha mais em parceria e com paciência', cuidado:'depender dos outros ou ter dificuldade em pedir o que é justo', passo:'definir o valor do seu trabalho e dizê-lo sem pedir desculpa' },
  3:{ tema:'comunicação e criatividade: o que partilha e ensina rende', cuidado:'dispersar-se e gastar a pensar no momento', passo:'escolher uma só fonte de rendimento criativa para cuidar este mês' },
  4:{ tema:'base sólida: construir devagar, com regras e registos', cuidado:'rigidez e medo de arriscar o suficiente', passo:'ter um caderno ou folha de contas sempre em dia' },
  5:{ tema:'movimento: o dinheiro vem de variedade e adaptação', cuidado:'instabilidade, gastos impulsivos e mudar de ideias a meio', passo:'separar um valor fixo todos os meses antes de gastar o resto' },
  6:{ tema:'cuidado e família: o dinheiro serve para sustentar o lar', cuidado:'pôr os outros primeiro e esquecer-se de si', passo:'reservar um valor mensal só para si, sem culpa' },
  7:{ tema:'estudo e sabedoria: o dinheiro vem do conhecimento e da confiança', cuidado:'desligar-se da parte prática e desconfiar de tudo', passo:'escolher um dia fixo para ver as contas, mesmo que não goste' },
  8:{ tema:'poder pessoal e materialização: tem capacidade de gerir e criar abundância', cuidado:'trabalhar demais, medir o valor pelo que ganha e esquecer o descanso', passo:'ter um dia por semana sem trabalho e um dia fixo para as contas' },
  9:{ tema:'entrega e serviço: o dinheiro vem ao servir os outros com amor', cuidado:'dar mais do que pode e não cobrar o devido', passo:'cobrar sempre o que é justo e doar com medida' },
  11:{ tema:'intuição: as boas decisões chegam com calma, não com pressa', cuidado:'ansiedade e decisões tomadas sob tensão', passo:'esperar uma noite antes de qualquer decisão de dinheiro importante' },
  22:{ tema:'construir em grande: projetos com visão e base prática', cuidado:'carregar tudo às costas e começar sem preparar', passo:'dividir cada grande objetivo em passos mensais com um valor definido' },
  33:{ tema:'serviço e cuidado dos outros', cuidado:'esquecer-se das próprias contas por cuidar dos outros', passo:'tratar das suas contas primeiro, antes de ajudar' }
};
function guiaAbundancia(cv){
  const a = ABUND_CV[cv] || ABUND_CV[reduceNumber(cv || 9)] || ABUND_CV[9];
  const g = GUIA_VIB[cv] || GUIA_VIB[9];
  return {
    titulo: 'Abundância e proteção da família',
    intro: `O seu Caminho de Vida ${cv} traz o tema de ${a.tema}. O cuidado a ter: ${a.cuidado}.`,
    dinheiro: [
      'Escolha um dia fixo por semana, só 20 minutos, para ver as contas com calma.',
      'Passo prático para si: ' + a.passo + '.',
      'Separe o dinheiro da casa do dinheiro do trabalho, e guarde todos os documentos organizados.',
      'Vá guardando uma reserva para imprevistos todos os meses, mesmo que pequena.',
      `Frase ao pagar uma conta, com gratidão em vez de medo: "${g.frase}"`,
      'Para impostos e investimentos, fale com um contabilista ou um profissional da área.'
    ],
    familia: [
      'Uma refeição por semana em família, sem telemóveis na mesa.',
      'Um minuto de agradecimento juntos, ao fim do dia ou ao domingo.',
      'Copo de sal grosso com água atrás da porta de entrada, num sítio discreto: se o sal subir, renove e faça o Salmo 66 durante 7 dias.',
      `Use a cor ${g.cor} num canto da casa, e ${g.cristal} perto da porta de entrada.`,
      'Façam o Mapa da Alma de cada pessoa da família, para se conhecerem melhor.'
    ],
    aviso: 'Isto é um apoio simbólico e prático, não substitui aconselhamento financeiro profissional.'
  };
}
function guiaAbundanciaHTML(cv){
  const g = guiaAbundancia(cv); const ul = a => `<ol class="muted" style="margin:6px 0 0 18px;font-size:.88rem;line-height:1.5;">${a.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ol>`;
  return `<div class="card"><h3 style="color:var(--gold-light);">💰 ${g.titulo}</h3>
    <p class="muted" style="margin-top:6px;">${escapeHtml(g.intro)}</p>
    <p style="margin-top:10px;"><strong>Para o dinheiro</strong></p>${ul(g.dinheiro)}
    <p style="margin-top:10px;"><strong>Para a família e a casa</strong></p>${ul(g.familia)}
    <p class="muted" style="margin-top:10px;font-size:.8rem;">${escapeHtml(g.aviso)}</p></div>`;
}


/* ─── Responsabilidade pessoal e prevenção de recaídas ─── */
function guiaAutonomia(cv){
  const g = GUIA_VIB[cv] || GUIA_VIB[9];
  return {
    titulo: 'O que fazer agora: o seu caminho, com consistência',
    intro: 'Uma terapia, um Reiki ou este Mapa podem ajudar muito, mas não resolvem tudo de uma vez. O que vai manter o seu bem-estar é aquilo que você fizer todos os dias. Ninguém consegue fazer isso por si, e é por isso que o seu poder está aí. Quem deixa a rotina cair costuma voltar ao ponto onde estava.',
    pilares: [
      { nome:'⚡ Energia', passos:['Todas as noites, tome um banho com um punhado de sal grosso e agradeça o dia.','Uma vez por semana, abra as janelas e arrume a casa (a casa também carrega o que carregamos).','Evite pessoas, conversas e notícias que deixam sempre pesado o seu dia, e ponha limites com carinho.'] },
      { nome:'🙏 Espírito', passos:[`Todos os dias, 10 minutos de silêncio, oração ou meditação, sempre à mesma hora. Frase do seu número: "${g.frase}"`,`Uma vez por semana: ${g.rotina}.`,'Escreva três coisas pelas quais é grato ao fim do dia.'] },
      { nome:'🧠 Mente', passos:['Durma e coma a horas, e mexa o corpo todos os dias, nem que seja uma caminhada de 20 minutos.','Quando uma preocupação o invadir, escreva-a num papel e decida um passo pequeno para amanhã.','Aprenda a dizer "não" sem culpa.'] }
    ],
    recaida: [
      'Cansaço sem causa, sono mau, irritação, tristeza que não passa ou pensamentos que voltam sempre às mesmas coisas.',
      'Se isto aparecer, não espere piorar: volte à rotina de cima durante 7 dias seguidos e peça uma sessão de acompanhamento.',
      'Marque uma revisão (sessão ou Mapa) a cada 3 meses, mesmo que se sinta bem.'
    ],
    aviso: 'As terapias energéticas e este Mapa são um apoio e não substituem o médico ou o psicólogo. Se houver sofrimento intenso, desânimo profundo, medo constante ou ideias de se magoar, procure ajuda profissional de saúde. Em Portugal, pode ligar para o SNS 24 (808 24 24 24).'
  };
}
function guiaAutonomiaHTML(cv){
  const g = guiaAutonomia(cv); const ul = a => `<ul class="muted" style="margin:6px 0 0 18px;font-size:.88rem;line-height:1.5;">${a.map(p => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`;
  return `<div class="card"><h3 style="color:var(--gold-light);">🌱 ${g.titulo}</h3>
    <p class="muted" style="margin-top:6px;">${escapeHtml(g.intro)}</p>
    ${g.pilares.map(p => `<p style="margin-top:10px;"><strong>${p.nome}</strong></p>${ul(p.passos)}`).join('')}
    <p style="margin-top:10px;"><strong>🔔 Sinais de recaída</strong></p>${ul(g.recaida)}
    <p class="muted" style="margin-top:10px;font-size:.8rem;">${escapeHtml(g.aviso)}</p></div>`;
}

function hojeISO(){ const d = new Date(); return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }

/* ─── Nodos Lunares (Vidas Passadas / Propósito de Vida) ──────────────
   Fórmula astronómica real do Nodo Lunar Médio (Jean Meeus, Astronomical
   Algorithms) — não é uma tabela aproximada. Precisão de grau, mais do
   que suficiente ao nível do signo. Validado contra 3 trânsitos públicos
   e documentados do Nodo Norte: Carneiro (Jul/2023), Peixes (Jan/2025)
   e Aquário (meados de 2026) — os três bateram certo.
   NOTA DE HONESTIDADE: isto é leitura simbólica dentro da tradição da
   astrologia cármica, não um facto histórico verificável. A crença em
   vidas passadas não é comum a todos os astrólogos nem faz parte dos
   ensinamentos cânones da astrologia — é uma camada interpretativa. */
function paraDiaJuliano(ano, mes, dia, hora=12){
  if (mes <= 2){ ano -= 1; mes += 12; }
  const A = Math.floor(ano/100);
  const B = 2 - A + Math.floor(A/4);
  return Math.floor(365.25*(ano+4716)) + Math.floor(30.6001*(mes+1)) + dia + hora/24 + B - 1524.5;
}
function normalizar360(deg){ deg = deg % 360; return deg < 0 ? deg + 360 : deg; }
function nodoNorteLongitude(ano, mes, dia){
  const jd = paraDiaJuliano(ano, mes, dia);
  const T = (jd - 2451545.0) / 36525;
  const omega = 125.0445222 - 1934.1362608*T + 0.0020708*T*T + (T*T*T)/450000;
  return normalizar360(omega);
}
const SIGNOS_NODO = ['Carneiro','Touro','Gémeos','Caranguejo','Leão','Virgem','Balança','Escorpião','Sagitário','Capricórnio','Aquário','Peixes'];
function signoDeLongitude(long){ return SIGNOS_NODO[Math.floor(normalizar360(long) / 30)]; }
function calcularNodosLunares(dateStr){
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  const nnLong = nodoNorteLongitude(ano, mes, dia);
  const nsLong = normalizar360(nnLong + 180);
  return {
    nodoNorte: { signo: signoDeLongitude(nnLong) },
    nodoSul:   { signo: signoDeLongitude(nsLong) }
  };
}
const NODO_SUL_TEXTOS = {
  'Carneiro':'Já dominou a coragem de agir sozinho(a) e de iniciar sem esperar por ninguém. O padrão a vigiar é o egoísmo e a impaciência com quem é mais lento.',
  'Touro':'Já dominou a estabilidade material e o prazer das coisas simples. O padrão a vigiar é o apego excessivo a posses e à zona de conforto.',
  'Gémeos':'Já dominou a comunicação e a curiosidade sobre tudo um pouco. O padrão a vigiar é a dispersão e a superficialidade nos laços mais próximos.',
  'Caranguejo':'Já dominou o cuidado emocional e a protecção do lar e da família. O padrão a vigiar é o apego ao passado e a dependência afectiva.',
  'Leão':'Já dominou a criatividade e o brilho pessoal. O padrão a vigiar é o orgulho e a necessidade constante de ser reconhecido(a).',
  'Virgem':'Já dominou o serviço prático e a análise minuciosa. O padrão a vigiar é o perfeccionismo e a autocrítica que paralisa.',
  'Balança':'Já dominou a diplomacia e a arte das parcerias. O padrão a vigiar é a dependência da aprovação alheia e a indecisão crónica.',
  'Escorpião':'Já dominou a intensidade emocional e a capacidade de se transformar. O padrão a vigiar é o controlo e a desconfiança extrema.',
  'Sagitário':'Já dominou a fé e a expansão através do conhecimento e da viagem. O padrão a vigiar é o dogmatismo e a fuga a compromissos.',
  'Capricórnio':'Já dominou a disciplina e a ambição material. O padrão a vigiar é a rigidez e o medo de mostrar vulnerabilidade.',
  'Aquário':'Já dominou o pensamento independente e as causas colectivas. O padrão a vigiar é o desapego emocional e a rebeldia sem propósito.',
  'Peixes':'Já dominou a entrega espiritual e a compaixão. O padrão a vigiar é a fuga à realidade e o sacrifício excessivo de si.'
};
const NODO_NORTE_TEXTOS = {
  'Balança':'O seu caminho de crescimento é aprender a cooperar e a considerar o outro antes de agir sozinho(a).',
  'Escorpião':'O seu caminho de crescimento é soltar o apego material e mergulhar na transformação emocional profunda.',
  'Sagitário':'O seu caminho de crescimento é buscar um sentido maior, em vez de se dispersar em pequenos detalhes.',
  'Capricórnio':'O seu caminho de crescimento é assumir responsabilidade e estrutura, saindo da zona de conforto emocional.',
  'Aquário':'O seu caminho de crescimento é servir o colectivo, saindo do centro das atenções.',
  'Peixes':'O seu caminho de crescimento é confiar e entregar-se ao fluxo, largando o controlo excessivo.',
  'Carneiro':'O seu caminho de crescimento é agir por si mesmo(a), sem depender da validação do outro.',
  'Touro':'O seu caminho de crescimento é construir segurança própria e paz material, sem depender da intensidade emocional alheia.',
  'Gémeos':'O seu caminho de crescimento é ouvir e trocar ideias, sem impor uma única verdade.',
  'Caranguejo':'O seu caminho de crescimento é nutrir os laços emocionais, sem se esconder atrás do trabalho.',
  'Leão':'O seu caminho de crescimento é expressar-se com autenticidade, sem se perder dentro do grupo.',
  'Virgem':'O seu caminho de crescimento é organizar e servir com discernimento prático, sem se perder na dispersão.'
};

/* ─── Arcano Pessoal & Arcano do Ano (Tarot + Numerologia) ────────────
   Convenção fixada (nunca misturar com outras): resultado sempre entre
   1 e 22 — A Justiça = 11, A Força = 8, O Louco = 22. O Arcano do Ano
   muda no aniversário da pessoa, não a 1 de Janeiro. */
const ARCANOS_MAIORES = {
  1:{ nome:'O Mago', texto:'Iniciativa, habilidade e o poder de manifestar ideias em ação concreta.' },
  2:{ nome:'A Sacerdotisa', texto:'Intuição, mistério e sabedoria silenciosa que vem de dentro.' },
  3:{ nome:'A Imperatriz', texto:'Fertilidade, criatividade e abundância — a energia de gerar e nutrir.' },
  4:{ nome:'O Imperador', texto:'Estrutura, autoridade e a capacidade de construir com disciplina.' },
  5:{ nome:'O Papa', texto:'Tradição, aprendizagem e orientação espiritual através do estudo.' },
  6:{ nome:'Os Enamorados', texto:'Escolhas de coração, união e alinhamento entre valores e desejo.' },
  7:{ nome:'O Carro', texto:'Determinação, avanço e vitória através do controlo de forças opostas.' },
  8:{ nome:'A Força', texto:'Coragem serena, domínio de si e força que vem da compaixão, não da imposição.' },
  9:{ nome:'O Eremita', texto:'Introspecção, busca interior e sabedoria que só se encontra sozinho(a).' },
  10:{ nome:'A Roda da Fortuna', texto:'Ciclos, mudança de sorte e a aceitação do que está fora do controlo.' },
  11:{ nome:'A Justiça', texto:'Equilíbrio, verdade e as consequências justas de cada escolha.' },
  12:{ nome:'O Enforcado', texto:'Pausa, entrega e a sabedoria de ver a vida de um ângulo diferente.' },
  13:{ nome:'A Morte', texto:'Transformação profunda — o fim de um ciclo que abre espaço a outro.' },
  14:{ nome:'A Temperança', texto:'Moderação, cura e a arte de misturar opostos até encontrar equilíbrio.' },
  15:{ nome:'O Diabo', texto:'Confronto com apegos, vícios e padrões que prendem — e a libertação possível.' },
  16:{ nome:'A Torre', texto:'Ruptura súbita que derruba estruturas falsas para dar lugar à verdade.' },
  17:{ nome:'A Estrela', texto:'Esperança, inspiração e renovação depois de um período difícil.' },
  18:{ nome:'A Lua', texto:'Intuição, sonhos e o convite a navegar a incerteza sem medo.' },
  19:{ nome:'O Sol', texto:'Vitalidade, clareza e alegria — sucesso que se sente e se vê.' },
  20:{ nome:'O Julgamento', texto:'Chamado interior, renascimento e a chance de recomeçar com consciência.' },
  21:{ nome:'O Mundo', texto:'Realização, conclusão de ciclo e sensação de plenitude alcançada.' },
  22:{ nome:'O Louco', texto:'Liberdade, fé no desconhecido e coragem de dar o próximo passo sem garantias.' }
};
function reduzirParaArcano(soma){
  while (soma > 22){ soma = String(soma).split('').reduce((a,d) => a + (parseInt(d,10)||0), 0); }
  if (soma === 0) soma = 22;
  return soma;
}
function calcularArcanoPessoal(dateStr){
  const digits = dateStr.replace(/\D/g,'');
  const soma = digits.split('').reduce((a,d) => a + parseInt(d,10), 0);
  return reduzirParaArcano(soma);
}
function calcularArcanoDoAno(dateStr, hojeStr){
  const [, mesN, diaN] = dateStr.split('-').map(Number);
  const hoje = new Date(hojeStr+'T12:00:00');
  const anoAtual = hoje.getFullYear();
  const aindaNaoFezAnos = (hoje.getMonth()+1 < mesN) || (hoje.getMonth()+1 === mesN && hoje.getDate() < diaN);
  const anoBase = aindaNaoFezAnos ? anoAtual - 1 : anoAtual;
  return reduzirParaArcano(diaN + mesN + anoBase);
}

/* ─── Restantes Números Pitagóricos ────────────────────────────────── */
function pedraAngular(nome){
  const letras = nameLetters(nome);
  return letras.length ? letterValue(letras[0]) : null;
}
function numeroMaturidade(dateStr, nome){
  return reduceNumber(caminhoDeVida(dateStr) + expressao(nome));
}
function paixaoOculta(nome){
  const counts = {};
  nameLetters(nome).forEach(ch => { const v = letterValue(ch); counts[v] = (counts[v]||0) + 1; });
  let max = 0, tops = [];
  Object.entries(counts).forEach(([n,c]) => { if (c > max){ max = c; tops = [n]; } else if (c === max) tops.push(n); });
  return max >= 2 ? tops.map(Number) : [];
}
function numeroSubconsciente(nome){
  const presentes = new Set(nameLetters(nome).map(ch => letterValue(ch)));
  return presentes.size;
}
function numeroAtitude(dateStr){
  const [, mes, dia] = dateStr.split('-').map(Number);
  return reduceNumber(reduceNumber(dia) + reduceNumber(mes));
}
function numeroEquilibrio(nome){
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  let total = 0;
  for (const parte of partes){ const letras = nameLetters(parte); if (letras.length) total += letterValue(letras[0]); }
  return reduceNumber(total);
}

/* ─── Grelha de Compatibilidade Vibracional (Casal/Família) ──────────
   Baseada nos grupos de compatibilidade numerológica amplamente usados
   (independentes 1/5/7, lar 2/4/6, expressivos 3/6/9) mais números
   vizinhos e Números Mestre. É uma leitura simbólica de apoio, não uma
   previsão de sucesso ou fracasso da relação. */
const GRUPO_INDEPENDENTES = [1,5,7];
const GRUPO_LAR = [2,4,6];
const GRUPO_EXPRESSIVOS = [3,6,9];
const NUMEROS_MESTRE = [11,22,33];
function compatibilidadePar(cvA, cvB){
  if (NUMEROS_MESTRE.includes(cvA) || NUMEROS_MESTRE.includes(cvB)){
    const mestre = NUMEROS_MESTRE.includes(cvA) ? cvA : cvB;
    return `A presença de um Número Mestre (${mestre}) eleva esta relação a um propósito mais espiritual — mas também traz mais intensidade emocional a gerir.`;
  }
  if (cvA === cvB) return `Vibração espelhada (ambos ${cvA}) — entendem-se depressa, mas podem repetir um no outro os mesmos erros, por partilharem o mesmo ponto cego.`;
  if (Math.abs(cvA - cvB) === 1) return `Números vizinhos (${cvA} e ${cvB}) — combinação naturalmente complementar, cada um traz o que falta ao outro.`;
  if (GRUPO_INDEPENDENTES.includes(cvA) && GRUPO_INDEPENDENTES.includes(cvB)) return `Ambos valorizam independência e liberdade de ação (${cvA} e ${cvB}) — funciona melhor com espaço próprio bem definido para cada um.`;
  if (GRUPO_LAR.includes(cvA) && GRUPO_LAR.includes(cvB)) return `Ambos valorizam estabilidade e vida a dois (${cvA} e ${cvB}) — combinação naturalmente harmoniosa para construir uma base sólida.`;
  if (GRUPO_EXPRESSIVOS.includes(cvA) && GRUPO_EXPRESSIVOS.includes(cvB)) return `Ambos valorizam expressão e vida social (${cvA} e ${cvB}) — boa energia criativa, com atenção a não competirem pelo protagonismo.`;
  return `Combinação de aprendizagem mútua (${cvA} e ${cvB}) — os ritmos são diferentes; vale a pena investir conscientemente na comunicação sobre essas diferenças.`;
}
function calcularGrelhaCompatibilidade(membros){
  const pares = [];
  for (let i=0; i<membros.length; i++){
    for (let j=i+1; j<membros.length; j++){
      pares.push({ a: membros[i].nome, b: membros[j].nome,
        cvA: membros[i].caminhoDeVida, cvB: membros[j].caminhoDeVida,
        texto: compatibilidadePar(membros[i].caminhoDeVida, membros[j].caminhoDeVida) });
    }
  }
  return pares;
}

/* ─── Leitura Integrada (geração determinística por sementes) ────────
   Escreve UMA frase de abertura que cruza Caminho de Vida + Anjo +
   Arcano + Nodo Sul, em vez de os listar em blocos separados. Usa uma
   "semente" calculada a partir do nome+data (sem qualquer chamada a
   IA, sem custo): a mesma pessoa vê sempre a mesma leitura, mas duas
   pessoas com os mesmos números leem frases diferentes. */
function hashSemente(str){
  let h = 2166136261;
  for (let i=0; i<str.length; i++){ h ^= str.charCodeAt(i); h = Math.imul(h, 16777619); }
  return h >>> 0;
}
function mulberry32(seed){
  return function(){
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function escolherVariante(rng, arr){ return arr[Math.floor(rng() * arr.length)]; }
const ABERTURAS_CV_ANJO = [
  (cvNome, anjoNome) => `Não é por acaso que o Anjo ${anjoNome} acompanha um Caminho de Vida de ${cvNome.toLowerCase()}`,
  (cvNome, anjoNome) => `A combinação entre o Anjo ${anjoNome} e um percurso de ${cvNome.toLowerCase()} não é comum`,
  (cvNome, anjoNome) => `Há uma conversa clara entre o Anjo ${anjoNome} e a sua energia de ${cvNome.toLowerCase()}`,
  (cvNome, anjoNome) => `O Anjo ${anjoNome} reforça, de forma directa, a sua vibração de ${cvNome.toLowerCase()}`
];
const LIGACOES_ARCANO = [
  (arcanoNome) => `e o Arcano ${arcanoNome} confirma esse desenho`,
  (arcanoNome) => `e o Arcano ${arcanoNome} vem sublinhar exactamente isso`,
  (arcanoNome) => `e não é surpresa que o seu Arcano Pessoal seja ${arcanoNome}`,
  (arcanoNome) => `com o Arcano ${arcanoNome} a completar a imagem`
];
const FECHOS_NODO = [
  (nodoSigno) => `— o Nodo Sul em ${nodoSigno} mostra de onde vem essa força.`,
  (nodoSigno) => `. A raiz está no Nodo Sul em ${nodoSigno}, herdada de outras vivências.`,
  (nodoSigno) => `, e o Nodo Sul em ${nodoSigno} explica porque isto já lhe é tão natural.`,
  (nodoSigno) => `. Faz sentido: o Nodo Sul em ${nodoSigno} traz exactamente esse traço de outras vidas.`
];
function gerarLeituraIntegrada(nomeCompleto, dataStr, cvNome, anjoNome, arcanoNome, nodoSulSigno){
  if (!cvNome || !anjoNome || !arcanoNome || !nodoSulSigno) return null;
  const seed = hashSemente(nomeCompleto.trim().toLowerCase() + '|' + dataStr);
  const rng = mulberry32(seed);
  const abertura = escolherVariante(rng, ABERTURAS_CV_ANJO)(cvNome, anjoNome);
  const ligacao = escolherVariante(rng, LIGACOES_ARCANO)(arcanoNome);
  const fecho = escolherVariante(rng, FECHOS_NODO)(nodoSulSigno);
  return `${abertura}, ${ligacao}${fecho}`;
}

/* ─── Variação por sementes — extensão aos restantes blocos ──────────
   Mesmo princípio do parágrafo integrado: cada bloco usa a sua própria
   sub-semente (nome+data+"|salt"), por isso a MESMA pessoa lê sempre o
   mesmo texto em cada bloco, mas dois blocos diferentes da mesma pessoa
   não "sincronizam" a escolha, e duas pessoas com o mesmo número
   recebem frases diferentes. Zero custo, zero IA. */
function variantePara(nomeCompleto, dataStr, salt, arr, ...args){
  const seed = hashSemente(nomeCompleto.trim().toLowerCase() + '|' + dataStr + '|' + salt);
  const rng = mulberry32(seed);
  const fn = escolherVariante(rng, arr);
  return typeof fn === 'function' ? fn(...args) : fn;
}

const INTRO_PINACULO = [
  (n, faixa) => `Está a atravessar o seu ${n}º Pináculo (${faixa})`,
  (n, faixa) => `O ciclo que vive agora é o ${n}º Pináculo (${faixa})`,
  (n, faixa) => `Encontra-se dentro do ${n}º Pináculo (${faixa})`,
  (n, faixa) => `A fase actual da sua vida corresponde ao ${n}º Pináculo (${faixa})`
];
const INTRO_ANO_PESSOAL = [
  (ano, num) => `Este é um Ano Pessoal ${num} para si`,
  (ano, num) => `${ano} traz-lhe uma vibração de Ano Pessoal ${num}`,
  (ano, num) => `Está a viver um ciclo de Ano Pessoal ${num}`,
  (ano, num) => `O número que rege o seu ${ano} é o ${num}`
];
const INTRO_NODO_SUL = [
  (signo) => `O seu Nodo Sul está em ${signo}`,
  (signo) => `Encontramos o seu Nodo Sul posicionado em ${signo}`,
  (signo) => `A bagagem que traz consigo está marcada por ${signo}`,
  (signo) => `Em ${signo} está o seu Nodo Sul`
];
const INTRO_NODO_NORTE = [
  (signo) => `O Nodo Norte aponta para ${signo}`,
  (signo) => `O caminho a seguir passa por ${signo}`,
  (signo) => `${signo} é a direção do seu Nodo Norte`,
  (signo) => `O seu Nodo Norte está em ${signo}`
];
const CONECTORES_COMPAT = [
  '',
  ' Vale a pena terem isto presente no dia a dia.',
  ' É um padrão que costuma repetir-se ao longo da relação.',
  ' Reparar nisto ajuda a evitar mal-entendidos desnecessários.'
];
const ABERTURAS_TRACO_NUMERICO = [
  (traco, num) => `A sua ${traco} é o número ${num}`,
  (traco, num) => `O número ${num} rege a sua ${traco}`,
  (traco, num) => `Em ${traco}, o número que aparece é o ${num}`,
  (traco, num) => `${traco}: o ${num} marca presença`
];
const INTRO_ARCANO_PESSOAL = [
  (nome) => `A sua data de nascimento aponta para ${nome}`,
  (nome) => `O arquétipo que o(a) acompanha desde sempre é ${nome}`,
  (nome) => `${nome} é o Arcano que rege o seu Caminho de Vida`,
  (nome) => `Encontramos ${nome} como o seu Arcano Pessoal`
];
const INTRO_ARCANO_ANO = [
  (nome) => `A energia do seu ciclo actual chama-se ${nome}`,
  (nome) => `Este ano vive sob a influência de ${nome}`,
  (nome) => `${nome} é o Arcano que rege o seu ano actual`,
  (nome) => `O seu Arcano do Ano é ${nome}`
];
// Bancos das chamadas para o Diamante — para os ~9 blocos do Espelho não
// terminarem todos com a mesma frase repetida ("O Mapa Diamante revela...").
const CTA_DIAMANTE = [
  (oque) => `O Mapa Diamante revela ${oque}.`,
  (oque) => `No Diamante, esta leitura destrincha ${oque}.`,
  (oque) => `É no Mapa Diamante que se revela ${oque}.`,
  (oque) => `A leitura completa — ${oque} — está no Diamante.`,
  (oque) => `Desbloqueie o Diamante para conhecer ${oque}.`
];

function calcularAnjoNascimento(dateStr){
  const d = new Date(dateStr+'T12:00:00');
  const chave = String(d.getDate()).padStart(2,'0') + '/' + String(d.getMonth()+1).padStart(2,'0');
  if (DIAS_GENIOS_UNIVERSAIS[chave]){
    return { tipo:'universal', elemento: DIAS_GENIOS_UNIVERSAIS[chave],
      nota:'Não tem um Anjo fixo — a sua essência liga-se directamente aos Anjos Universais/Génios da Humanidade.' };
  }
  const g = GENIOS_72.find(g => g.datas.includes(chave));
  if (!g) return null;
  const coro = coroDoGenio(g.n);
  return { tipo:'anjo', numero:g.n, nome:g.nome, coro:coro.nome, arcanjoRegente:coro.regente,
    dominioDoCoro:coro.dominio, virtude:g.virtude, sombra:g.sombra, planeta:g.planeta };
}

/* ─── Selos de Precisão ──────────────────────────────────────────────
   O Método Hikari Fafe funciona sem hora de nascimento por desenho.
   Nunca assumimos 12:00 nem inventamos Ascendente: o que não puder ser
   calculado com rigor simplesmente não é mostrado. A hora é um bónus
   que abre camadas extra, nunca um requisito para ter o mapa. */
const SELOS = {
  solar: {
    id:'solar', icon:'💎', label:'Diamante Solar',
    resumo:'Calculado a partir da data e do nome — sem qualquer estimativa.',
    nota:'Este mapa foi construído para funcionar sem hora de nascimento. Nada aqui foi arredondado ou suposto.',
    camadas:['numerologia','anjoNascimento','signoSolar','regenteCosmico','arcanos','pinaculos','ciclosPessoais']
  },
  lunar: {
    id:'lunar', icon:'💎', label:'Diamante Lunar',
    resumo:'Data, nome e período do dia — permite confirmar a sua Lua.',
    nota:'O período indicado permite-nos confirmar a sua Lua em dias de passagem lunar.',
    camadas:['numerologia','anjoNascimento','signoSolar','regenteCosmico','arcanos','pinaculos','ciclosPessoais','luaConfirmada','anjoCoracaoProvavel']
  },
  astral: {
    id:'astral', icon:'💎✦', label:'Diamante Astral',
    resumo:'Data, nome e hora exacta — a leitura completa, com Ascendente.',
    nota:'Com a hora exacta conseguimos calcular o Ascendente, as casas reais e os três Anjos.',
    camadas:['numerologia','anjoNascimento','signoSolar','regenteCosmico','arcanos','pinaculos','ciclosPessoais','luaConfirmada','anjoCoracao','anjoInteligencia','ascendente','casasReais']
  }
};

const PERIODOS = {
  madrugada:{ label:'Madrugada', intervalo:'00:00 — 06:00', meio:'03:00' },
  manha:    { label:'Manhã',     intervalo:'06:00 — 12:00', meio:'09:00' },
  tarde:    { label:'Tarde',     intervalo:'12:00 — 18:00', meio:'15:00' },
  noite:    { label:'Noite',     intervalo:'18:00 — 24:00', meio:'21:00' }
};

function horaValida(h){ return /^([01]\d|2[0-3]):[0-5]\d$/.test(String(h||'')); }

function determinarSeloPrecisao(modo, hora, periodo){
  if (modo === 'exacta' && horaValida(hora)) return SELOS.astral;
  if (modo === 'periodo' && PERIODOS[periodo]) return SELOS.lunar;
  return SELOS.solar;
}

function seloTemCamada(selo, camada){ return !!selo && selo.camadas.includes(camada); }

const DONS_NUMERICOS = {
  1: { nome:'Pioneiro / Liderança', texto:'Empreendedorismo, iniciativa e coragem para abrir novos caminhos.', profissoes:'Empreendedorismo, Gestão de Projetos, Direção de Equipas, Desporto de Competição' },
  2: { nome:'Empata / Parceria', texto:'Mediação, sensibilidade e talento natural para terapia e cooperação.', profissoes:'Terapia, Mediação de Conflitos, Diplomacia, Trabalho em Parcerias/Duo' },
  3: { nome:'Mensageiro / Comunicação', texto:'Vendas, artes, vida social — o dom de expressar e encantar.', profissoes:'Artes, Comunicação Social, Marketing, Vendas, Escrita' },
  4: { nome:'Estrutura / Gestão', texto:'Segurança e organização — cuidado para não deixar a vibração pesar em bens materiais.', profissoes:'Engenharia, Contabilidade, Administração, Construção' },
  5: { nome:'Viajante / Curador', texto:'Movimento, liberdade e talento comercial.', profissoes:'Turismo, Comércio Internacional, Jornalismo, Terapias de Movimento' },
  6: { nome:'Cuidador / Amor e Cura', texto:'Saúde, estética, família — vocação natural para cuidar.', profissoes:'Saúde, Estética, Terapias Holísticas, Educação Infantil, Nutrição' },
  7: { nome:'Místico / Sabedoria', texto:'Pesquisa, ensino, exigência interior — busca incessante de verdade.', profissoes:'Psicologia, Investigação Científica, Espiritualidade, Ensino Superior' },
  8: { nome:'Alquimista da Matéria / Poder', texto:'Chefia e gestão financeira — talento para transformar esforço em resultado.', profissoes:'Gestão Financeira, Direção Executiva, Investimento, Empresariado' },
  9: { nome:'Curador Universal', texto:'Humanitarismo, causas sociais e o dom de fechar ciclos com sabedoria.', profissoes:'Ação Social, Causas Humanitárias, Medicina, Aconselhamento' },
  11: { nome:'Número Mestre — Visionário', texto:'Alta voltagem intuitiva, antena espiritual apurada. Cuidado com nervosismo e ansiedade extrema.', profissoes:'Canalização, Terapias Espirituais, Liderança Inspiracional, Arte Visionária' },
  22: { nome:'Número Mestre — Grande Construtor', texto:'Capacidade prática fora do comum. Cuidado com a sobrecarga e o peso da responsabilidade.', profissoes:'Construção de Legados, Arquitetura, Fundação de Instituições/Empresas' },
  33: { nome:'Número Mestre — Mestre do Amor', texto:'Amor incondicional em ação. Cuidado para não se sacrificar nem se esquecer de si.', profissoes:'Cura, Ensino Espiritual, Assistência Humanitária de Grande Escala' }
};

const DIA_INFO = [
  { planeta:'Sol', mestre:'El Morya', raio:'1º Raio (Azul)', chakra:'Laríngeo', cristal:'Água-marinha' },
  { planeta:'Lua', mestre:'Lanto', raio:'2º Raio (Amarelo)', chakra:'Plexo Solar', cristal:'Olho de Tigre' },
  { planeta:'Marte', mestre:'Rowena', raio:'3º Raio (Rosa)', chakra:'Cardíaco', cristal:'Quartzo Rosa' },
  { planeta:'Mercúrio', mestre:'Serapis Bey', raio:'4º Raio (Branco)', chakra:'Raiz', cristal:'Hematite' },
  { planeta:'Júpiter', mestre:'Hilarion', raio:'5º Raio (Verde)', chakra:'Cardíaco', cristal:'Quartzo Verde' },
  { planeta:'Vénus', mestre:'Nada', raio:'6º Raio (Rubi)', chakra:'Sacral', cristal:'Granada' },
  { planeta:'Saturno', mestre:'St. Germain', raio:'7º Raio (Violeta)', chakra:'Todos', cristal:'Ametista' }
];
const DIAS_NOMES = ['Domingo','Segunda-feira','Terça-feira','Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];

const CHAKRA_TEASER = {
  'Raiz':'segurança e ligação ao corpo — quando este chakra pede atenção, sente-se instabilidade.',
  'Sacral':'criatividade, prazer e emoções — quando pede atenção, sente-se bloqueio criativo ou culpa.',
  'Plexo Solar':'poder pessoal e autoestima — quando pede atenção, sente-se insegurança ou necessidade de controlar tudo.',
  'Cardíaco':'amor e capacidade de dar/receber afeto — quando pede atenção, sente-se dificuldade em perdoar ou entrega excessiva.',
  'Laríngeo':'comunicação e verdade pessoal — quando pede atenção, sente-se dificuldade em dizer o que precisa de ser dito.',
  'Todos':'um estado raro de transmutação em todos os centros ao mesmo tempo — mudança profunda em curso.'
};

const SIGNOS = [
  { nome:'Capricórnio', ini:[12,22], fim:[1,19] }, { nome:'Aquário', ini:[1,20], fim:[2,18] },
  { nome:'Peixes', ini:[2,19], fim:[3,20] }, { nome:'Carneiro', ini:[3,21], fim:[4,19] },
  { nome:'Touro', ini:[4,20], fim:[5,20] }, { nome:'Gémeos', ini:[5,21], fim:[6,20] },
  { nome:'Caranguejo', ini:[6,21], fim:[7,22] }, { nome:'Leão', ini:[7,23], fim:[8,22] },
  { nome:'Virgem', ini:[8,23], fim:[9,22] }, { nome:'Balança', ini:[9,23], fim:[10,22] },
  { nome:'Escorpião', ini:[10,23], fim:[11,21] }, { nome:'Sagitário', ini:[11,22], fim:[12,21] }
];

function getDiaSemanaInfo(dateStr){ return DIA_INFO[new Date(dateStr+'T12:00:00').getDay()]; }
function getDiaSemanaNome(dateStr){ return DIAS_NOMES[new Date(dateStr+'T12:00:00').getDay()]; }
function getSigno(dateStr){
  const d = new Date(dateStr+'T12:00:00'); const m = d.getMonth()+1, day = d.getDate();
  for (const s of SIGNOS){
    const [im,id]=s.ini, [fm,fd]=s.fim;
    if (im>fm){ if((m===im&&day>=id)||(m===fm&&day<=fd)) return s; }
    else { if((m===im&&day>=id)||(m===fm&&day<=fd)||(m>im&&m<fm)) return s; }
  }
  return SIGNOS[0];
}
function escapeHtml(s){ return String(s==null?'':s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

const TIPOS_MAPA = {
  individual: { icon:'🧍', label:'Individual', nomeLabel:'O seu nome completo', dataLabel:'A sua data de nascimento' },
  casal: { icon:'💞', label:'Casal', nomeLabel:'Nome completo (1º elemento)', dataLabel:'Data de nascimento (1º elemento)' },
  familia: { icon:'👨‍👩‍👧', label:'Família', nomeLabel:'Nome completo (titular da casa)', dataLabel:'Data de nascimento (titular)' },
  bebe: { icon:'👶', label:'Bebé/Criança', nomeLabel:'Nome em análise para o bebé', dataLabel:'Data de nascimento (ou prevista)' },
  empresa: { icon:'🏢', label:'Empresa', nomeLabel:'Nome comercial da empresa', dataLabel:'Data de abertura/registo' }
};
export { vibracaoMista, caminhoDeVida, expressao, motivacao, impressao, licoesCarmicas, excessoNumerologico,
  calcularAnjoNascimento, calcularArcanoPessoal, calcularNodosLunares, calcularCiclosPessoais, calcularMestreDia,
  getSigno, getDiaSemanaNome, getDiaSemanaInfo, ARCANOS_MAIORES, NODO_SUL_TEXTOS, NODO_NORTE_TEXTOS, DONS_NUMERICOS,
  GUIA_VIB, guiaHarmonizar, ABUND_CV, TRI_CHAKRA_LIVRO, chakraDominanteNum, reduceNumber, escapeHtml, stripAccents };
