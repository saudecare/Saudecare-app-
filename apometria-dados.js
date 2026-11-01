/* Pesquisa Integrada (pêndulo + apometria) — dados de base. Ferramenta exclusiva da Hikari Fafe.
   Texto escrito de raiz, em português de Portugal. São ideias gerais de trabalho energético e espiritual,
   que complementam (nunca substituem) o acompanhamento médico e psicológico. */

export const NIVEIS = [
  { v: 0, rotulo: 'Equilibrado', carinha: '😊', cor: '#16a34a' },
  { v: 1, rotulo: 'Ligeiro', carinha: '🙂', cor: '#ca8a04' },
  { v: 2, rotulo: 'Moderado', carinha: '😟', cor: '#ea580c' },
  { v: 3, rotulo: 'Forte', carinha: '😣', cor: '#dc2626' }
];

/* Os 7 corpos: o que cada um representa e como se nota quando está em desequilíbrio. */
export const CORPOS = [
  { id: 'fisico', n: 1, emoji: '🧍', nome: 'Corpo físico', sobre: 'O corpo que se vê e se toca.', sinais: 'Dores, cansaço, doenças repetidas, tensão no corpo.' },
  { id: 'etereo', n: 2, emoji: '⚡', nome: 'Corpo etérico (vitalidade)', sobre: 'A energia vital que alimenta o corpo físico e que o Bovis ajuda a medir.', sinais: 'Falta de energia, sono que não repõe, sensação de estar «em baixo» sem causa.' },
  { id: 'astral', n: 3, emoji: '🌊', nome: 'Corpo astral (emoções)', sobre: 'O corpo das emoções e dos desejos.', sinais: 'Medo, tristeza, raiva ou ansiedade que sobem sem motivo claro; sonhos pesados.' },
  { id: 'mental-inf', n: 4, emoji: '💭', nome: 'Mental inferior (pensamentos)', sobre: 'Os pensamentos do dia a dia, as ideias fixas e as crenças.', sinais: 'Pensamentos repetitivos, autocrítica, crenças limitantes, mente que não pára.' },
  { id: 'mental-sup', n: 5, emoji: '🔭', nome: 'Mental superior (propósito)', sobre: 'A intuição, o sentido de vida e a visão de conjunto.', sinais: 'Sensação de estar perdido/a, falta de sentido, de direção ou de propósito.' },
  { id: 'budico', n: 6, emoji: '💗', nome: 'Corpo búdico (amor e compaixão)', sobre: 'O amor sem condições, a compaixão e a união com os outros.', sinais: 'Fechamento do coração, dificuldade em perdoar ou em confiar.' },
  { id: 'atmico', n: 7, emoji: '✨', nome: 'Corpo átmico (essência)', sobre: 'A essência, a centelha divina de cada pessoa.', sinais: 'Desligação da fé, sensação de vazio espiritual.' }
];

/* Chakras (9, como no teu método). */
export const CHAKRAS = ['Raiz', 'Sacro', 'Plexo Solar', 'Coração', 'Garganta', 'Terceiro Olho', 'Coroa', 'Estrela da Alma', 'Portal Estelar'];

/* Sinais de alerta: se algum estiver assinalado, o desdobramento NÃO é sugerido e aparece o aviso. */
export const ALERTAS = [
  { id: 'psi', texto: 'Tem diagnóstico psiquiátrico ativo, ouve vozes ou tem ideias de que o controlam', grave: true },
  { id: 'suic', texto: 'Falou em desistir de viver ou em fazer mal a si própria/o', grave: true, urgente: true },
  { id: 'epi', texto: 'Tem epilepsia ou crises convulsivas', grave: true },
  { id: 'menor', texto: 'É menor de idade (é preciso autorização de quem a/o representa)', grave: false },
  { id: 'gravida', texto: 'Está grávida', grave: false },
  { id: 'sens', texto: 'É muito sensível ou emotiva/o, ou está muito frágil neste momento', grave: false },
  { id: 'medo', texto: 'Tem muito medo deste tipo de trabalho', grave: false }
];

/* Interferências e causas que se podem encontrar na pesquisa. */
export const ACHADOS = [
  { id: 'miasma', nome: 'Energias densas (miasma)', simples: 'Uma espécie de «poeira» energética acumulada por doença, ambientes pesados ou convivências difíceis.', corpos: ['etereo', 'astral'], tecnicas: ['limpeza', 'etiquetas', 'banho', 'reiki'] },
  { id: 'olho', nome: 'Olho gordo / inveja', simples: 'Energia pesada que chegou por inveja ou admiração excessiva de alguém.', corpos: ['etereo', 'astral'], tecnicas: ['limpeza', 'etiquetas', 'oracao', 'protecao'] },
  { id: 'magia', nome: 'Magia ou trabalho feito', simples: 'Algo feito de propósito, ou sem querer, para prejudicar a pessoa.', corpos: ['etereo', 'astral', 'mental-inf'], tecnicas: ['antimagia', 'limpeza', 'etiquetas', 'oracao', 'selar'], subs: ['Consciente (feito de propósito)', 'Inconsciente (raiva ou desejo forte de alguém)', 'Que voltou para a própria pessoa'] },
  { id: 'magia-vp', nome: 'Memória de trabalhos de outras vidas', simples: 'Ligações e compromissos antigos que ainda «pesam» e se repetem na vida de hoje.', corpos: ['astral', 'mental-sup'], tecnicas: ['vidas', 'antimagia', 'oracao', 'selar'] },
  { id: 'presenca', nome: 'Presença espiritual ligada', simples: 'Uma presença perturbada que acompanha a pessoa e reforça padrões negativos.', corpos: ['astral', 'mental-inf'], tecnicas: ['acolher', 'desdobra', 'limpeza', 'oracao', 'protecao'], subs: ['Uma só presença', 'Várias presenças', 'Ligada a magia', 'Ligação de mágoa mútua com alguém', 'Chegou através de uma pessoa próxima', 'Alimentada pelos próprios pensamentos (auto-obsessão)'] },
  { id: 'larva', nome: 'Larva astral / forma-pensamento', simples: 'Uma forma densa criada por emoções ou pensamentos intensos, que se «agarra» ao campo.', corpos: ['astral', 'mental-inf'], tecnicas: ['limpeza', 'etiquetas', 'reiki'] },
  { id: 'implante', nome: 'Implante ou chip energético', simples: 'Algo que se sente «instalado» no campo e que prende, drena ou condiciona.', corpos: ['etereo', 'astral', 'mental-inf'], tecnicas: ['implantes', 'desdobra', 'limpeza', 'selar'], subs: ['Junto ao pescoço ou à coluna', 'De vigilância ou monitorização', 'De drenagem de energia', 'Parasita', 'Em forma de cristal ou de figura geométrica', 'De ilusão ou de memórias falsas', 'Ligado à fertilidade ou ao ventre'] },
  { id: 'cordoes', nome: 'Cordões e laços energéticos', simples: 'Ligações a pessoas ou situações que drenam energia.', corpos: ['etereo', 'astral', 'budico'], tecnicas: ['cordoes', 'reiki', 'etiquetas'] },
  { id: 'heranca', nome: 'Herança familiar e padrões repetidos', simples: 'Dores, medos e ciclos que passam de geração em geração.', corpos: ['astral', 'mental-inf', 'mental-sup'], tecnicas: ['vidas', 'etiquetas', 'oracao', 'casa'] },
  { id: 'vidas', nome: 'Votos e memórias de vidas passadas', simples: 'Promessas ou feridas de outras vidas que ainda condicionam a vida de hoje.', corpos: ['mental-sup', 'astral', 'atmico'], tecnicas: ['vidas', 'oracao', 'meditacao'] },
  { id: 'trauma', nome: 'Trauma e emoções reprimidas', simples: 'O que ficou guardado no corpo e nas emoções e ainda dói.', corpos: ['astral', 'mental-inf', 'fisico'], tecnicas: ['reiki', 'chakras', 'meditacao', 'casa'] },
  { id: 'ambiente', nome: 'Ambiente pesado (casa, trabalho, campo eletromagnético, geopatia)', simples: 'O espaço onde a pessoa vive ou trabalha está a pesar-lhe.', corpos: ['etereo', 'fisico'], tecnicas: ['espaco', 'etiquetas', 'casa'] },
  { id: 'fragmenta', nome: 'Desligação ou fragmentação da essência', simples: 'Sensação de «não estar inteiro/a», de estar desligado/a de si e da fé.', corpos: ['atmico', 'budico', 'mental-sup'], tecnicas: ['chakras', 'meditacao', 'oracao', 'reiki'] },
  { id: 'cansaco', nome: 'Cansaço de energia sem causa física', simples: 'Falta de energia que os exames não explicam.', corpos: ['etereo', 'fisico'], tecnicas: ['reiki', 'chakras', 'limpeza', 'casa'] }
];

/* Técnicas de tratamento. «peso» ajuda a decidir a ordem; «forte» marca as mais intensas. */
export const TECNICAS = [
  { id: 'preparar', fixa: 'inicio', nome: '🕯️ Preparar e proteger', dur: '5 min', passos: ['Lava as mãos, respira fundo e fica com intenção clara: «só para o bem da pessoa».', 'Explica à pessoa o que vais fazer e pede o consentimento dela (e confirma com o pêndulo).', 'Protege-te a ti e ao espaço com a tua oração ou invocação (por exemplo, a do Arcanjo Miguel).', 'Combina um sinal para a pessoa te avisar se algo a incomodar (levantar a mão).'] },
  { id: 'sintonizar', fixa: 'inicio', nome: '🔗 Sintonizar com a pessoa', dur: '3 min', passos: ['Com o nome completo da pessoa, sintoniza a tua atenção com o campo dela.', 'Pergunta ao pêndulo se pode trabalhar hoje e o que é prioritário.'] },
  { id: 'pesquisa', nome: '🔮 Pesquisa numerada com o pêndulo', dur: '15 min', passos: ['Mentaliza cada número da tua lista e observa a resposta do pêndulo.', 'Regista o que sai e o nível de cada achado.'] },
  { id: 'etiquetas', nome: '🔤 Etiquetas hebraicas', dur: '20 min', limite: 'Na 1.ª consulta usa no máximo 10 etiquetas; da 2.ª em diante só as que saíram na pesquisa.', passos: ['Escolhe as etiquetas adequadas ao que saiu.', 'Aplica uma a uma, com intenção e atenção ao pêndulo.', 'Mede o Bovis só no fim, depois de aplicar todas.'] },
  { id: 'limpeza', nome: '🧹 Varredura e limpeza do campo', dur: '10 min', passos: ['Com as mãos em concha, a poucos centímetros do corpo, desce da cabeça aos pés, como quem recolhe o que pesa.', 'Imagina que o que recolhes é transformado numa luz violeta ou numa chama que purifica.', 'Lava ou sacode as mãos entre cada passagem.'] },
  { id: 'cordoes', nome: '✂️ Corte de cordões e laços', dur: '10 min', passos: ['Pergunta à pessoa de que relação ou situação quer libertar-se.', 'Visualiza o laço e corta-o com amor, sem ódio, com uma lâmina de luz.', 'Pede que o que for dela volte a ela e o que for do outro volte ao outro.'] },
  { id: 'antimagia', nome: '🛡️ Tratamento anti-magia', dur: '15 min', passos: ['Protege primeiro o espaço e a pessoa.', 'Pede que o que foi feito contra ela seja desfeito e devolvido à luz, sem desejar mal a ninguém.', 'Limpa o campo e sela com a oração escolhida.'] },
  { id: 'implantes', forte: true, nome: '🧲 Libertação de implantes e chips (visualização guiada)', dur: '15 min', passos: ['Pede permissão e proteção.', 'Localiza com o pêndulo onde sentes algo instalado no campo.', 'Em visualização, pede que seja removido e dissolvido na luz, e que o campo seja reparado e preenchido de luz dourada.', 'Confirma com o pêndulo que ficou limpo.'] },
  { id: 'acolher', forte: true, nome: '🕊️ Acolher e encaminhar presenças', dur: '15 min', nota: 'Só se tiveres formação e à vontade neste trabalho. Fala sempre com respeito e compaixão.', passos: ['Protege-te e pede o apoio da tua equipa espiritual e dos teus guias.', 'Fala com a presença com calma e respeito, sem confrontos.', 'Encaminha-a para a luz e fecha o campo da pessoa.'] },
  { id: 'desdobra', forte: true, nome: '🌀 Desdobramento guiado dos corpos subtis', dur: '25 min', nota: 'Não usar se houver sinais de alerta (psiquiátrico, epilepsia, ideias de desistir de viver), menor sem autorização, ou grande medo. Convém ter experiência.', passos: ['Pede consentimento claro e explica o que vai acontecer, com palavras simples.', 'Relaxa a pessoa (respiração lenta, olhos fechados).', 'Guia, com suavidade, os corpos subtis (astral, emocional e mental) a «afastarem-se» do corpo físico para um lugar imaginado de luz e de cura.', 'Trabalha o que a pesquisa indicou nesse espaço (limpeza, libertação, reparação).', 'Traz os corpos de volta, com cuidado, um a um, de volta ao corpo físico («acoplamento»).', 'Aterra a pessoa: pés no chão, respirar fundo, mexer mãos e pés, beber água. Só termina quando ela estiver bem presente.'] },
  { id: 'vidas', nome: '⏳ Libertar votos e memórias de vidas passadas', dur: '15 min', passos: ['Com consentimento, pergunta ao pêndulo que voto ou memória está a pesar.', 'Pede que seja revogado e libertado com amor.', 'Fecha com uma oração e com uma frase de libertação dita pela própria pessoa.'] },
  { id: 'chakras', nome: '🌈 Harmonização dos chakras', dur: '15 min', passos: ['Começa pelos chakras mais fechados na pesquisa.', 'Usa a técnica que dominas (Reiki, pêndulo, cristais, som).', 'Termina pelo coração e pela coroa.'] },
  { id: 'reiki', nome: '🤲 Reiki', dur: '20 min', passos: ['Aplica Reiki nos pontos que a pesquisa indicou.', 'Podes dar mais tempo ao corpo que saiu mais fraco.'] },
  { id: 'oracao', nome: '🙏 Oração ou salmo', dur: '5 min', passos: ['Escolhe a oração certa na ferramenta «Orações e Salmos» (Arcanjo Miguel, Salmo 91, Salmo 51…).', 'Reza com a pessoa ou pede-lhe que a faça em casa com o link dela.'] },
  { id: 'protecao', nome: '🔵 Escudo de proteção', dur: '5 min', passos: ['Pede à pessoa que imagine um escudo de luz à sua volta.', 'Reforça com a tua intenção e sela.'] },
  { id: 'meditacao', nome: '🎧 Meditação guiada', dur: '15 min', passos: ['Escolhe a meditação mais adequada ao tema.', 'Podes enviá-la para ouvir em casa nos dias seguintes.'] },
  { id: 'banho', nome: '🛁 Banho de purificação (em casa)', dur: 'em casa', passos: ['Banho morno, com a intenção de lavar o que pesa.', 'Opcional: sal grosso ou ervas da tua tradição.'] },
  { id: 'espaco', nome: '🏠 Limpeza do espaço (casa ou trabalho)', dur: 'em casa', passos: ['Abrir as janelas e arrumar um canto adiado.', 'Limpar com sal, som ou fumo, conforme a tradição da pessoa.', 'Fechar com uma oração de proteção.'] },
  { id: 'casa', nome: '🏡 Plano em casa', dur: 'em casa', passos: ['Define 2 ou 3 práticas simples para os dias seguintes (oração, meditação, banho, escrita).', 'Envia pelo WhatsApp com o link da oração dela.'] },
  { id: 'selar', fixa: 'fim', nome: '🔒 Selar e agradecer', dur: '5 min', passos: ['Sela o campo da pessoa com luz e agradece a quem ajudou.', 'Aterra a pessoa (pés no chão, água, respirar fundo).', 'Mede o Bovis final, regista e marca a próxima sessão (pelo menos 7 dias depois).'] }
];

export const TEXTO_PACIENTE = {
  intro: 'Esta sessão foi uma pesquisa e um trabalho energético e espiritual feito com cuidado, a pensar em ti. Complementa, e nunca substitui, o acompanhamento médico e psicológico.',
  fim: 'Descansa, bebe água e sê gentil contigo nos próximos dias. Qualquer dúvida, fala comigo.'
};
