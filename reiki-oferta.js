/* Oferta da Hikari Fafe Escola de Reiki: workshop gratuito e reservas da formação.
   Exclusivo do tenant hikari-terapias. Os valores e datas mudam só aqui.
   Usado pelas páginas públicas (reiki-workshop.html, reiki-formacao.html)
   e pelo painel do Mestre (separador "Inscrições"). */

export const TENANT_ESCOLA = 'hikari-terapias';

/* Link do grupo de WhatsApp do workshop (https://chat.whatsapp.com/…).
   Enquanto estiver vazio, o botão do grupo não aparece. */
export const GRUPO_WHATSAPP = 'https://chat.whatsapp.com/EoLc2tBj63nGnnYTj8rAYs';
export const GRUPO_NOME = 'Workshop Reiki Hikari Fafe';

/* Dados para o sinal. Enquanto estiverem vazios, a página diz que os dados
   seguem por WhatsApp. */
export const PAGAMENTO = { mbway: '', iban: '', titular: '' };

export const WORKSHOP = {
  hora: '21h00',
  fim: '22h30',
  noites: [
    { n: 1, curto: 'Sex 23/10', dia: 'Sexta-feira, 23 de outubro',
      titulo: 'O Reiki e a tua energia',
      texto: 'A história do Reiki, os 5 princípios, os poemas do Imperador Meiji e duas práticas (banho seco e chuva de Reiki) para sentires logo na primeira noite.',
      inicioUTC: '2026-10-23T20:00:00Z', fimUTC: '2026-10-23T21:30:00Z' },
    { n: 2, curto: 'Sáb 24/10', dia: 'Sábado, 24 de outubro',
      titulo: 'Chakras, aura e o teu chakra dominante',
      texto: 'O que é a energia, os chakras e as 7 camadas da aura. Descobres o teu chakra dominante, o lado luz e o lado sombra, e fazes uma meditação de Reiki só para ti.',
      inicioUTC: '2026-10-24T20:00:00Z', fimUTC: '2026-10-24T21:30:00Z' },
    { n: 3, curto: 'Dom 25/10', dia: 'Domingo, 25 de outubro',
      titulo: 'O teu caminho no Reiki',
      texto: 'Os símbolos e quando se recebem, os níveis de formação, a formação de Nível 1 e a app com os manuais. Podes reservar o teu lugar nesta noite.',
      inicioUTC: '2026-10-25T21:00:00Z', fimUTC: '2026-10-25T22:30:00Z' }
  ]
};

/* Promoção de lançamento: vale para quem reservar com o sinal pago até esta hora
   (27/10 às 23h59, hora de Portugal, que nessa data é igual a UTC). */
export const PRAZO_LANCAMENTO = '2026-10-27T23:59:00Z';
export const PRAZO_TEXTO = 'terça-feira, 27 de outubro, até às 23h59';

export const SINAL = 50;

export const NIVEIS = [
  { id: '1',  nome: 'Nível 1 · Shoden',          preco: 180, lanc: 160, manuais: 1 },
  { id: '2',  nome: 'Nível 2 · Okuden',          preco: 200, nota: 'Para quem já concluiu o Nível 1' },
  { id: '3A', nome: 'Nível 3A · Shinpiden',      preco: 260, nota: 'Para quem já concluiu o Nível 2' },
  { id: '3B', nome: 'Nível 3B · Mestre',         preco: 300, nota: 'Para quem já concluiu o Nível 3A' },
  { id: '1+2', nome: 'Pacote Nível 1 + Nível 2', preco: 360, lanc: 340, manuais: 2 }
];

/* Turmas da formação de Nível 1 */
export const TURMAS = {
  inicioOnline: '2 de novembro',
  online:     { rotulo: 'Online · segunda-feira, 20h30 às 22h00', vagas: 15 },
  onlineQua:  { rotulo: 'Online · quarta-feira, 20h30 às 22h00 (abre quando a de segunda estiver cheia)', vagas: 15 },
  presencial: { rotulo: 'Presencial · sábado à tarde, em pequeno grupo', vagas: 6 }
};

export function nivelPorId(id){ return NIVEIS.find(n => n.id === id) || null; }
export function dentroDoPrazo(agora){ return (agora || new Date()).getTime() <= Date.parse(PRAZO_LANCAMENTO); }
export function temPromo(n, agora){ return !!(n && n.lanc && dentroDoPrazo(agora)); }
export function precoDe(n, agora){ return temPromo(n, agora) ? n.lanc : n.preco; }

const arred = v => Math.round(v * 100) / 100;

/* Pagamento total: sinal + restante até à 1.ª aula.
   Faseado: sinal + duas prestações iguais (na 1.ª e na 3.ª aula).
   Se o preço for menor que o sinal, o sinal passa a ser o preço todo. */
export function planoPagamento(preco, modo){
  const total = arred(Number(preco) || 0);
  const sinal = Math.min(SINAL, total);
  const resto = arred(total - sinal);
  let partes;
  if (modo === 'faseado'){
    const a = arred(resto / 2);
    partes = [
      { k: 'sinal', rotulo: 'Sinal (na reserva)', valor: sinal },
      { k: 'p2', rotulo: '2.ª prestação (na 1.ª aula)', valor: a },
      { k: 'p3', rotulo: '3.ª prestação (na 3.ª aula)', valor: arred(resto - a) }
    ];
  } else {
    partes = [
      { k: 'sinal', rotulo: 'Sinal (na reserva)', valor: sinal },
      { k: 'resto', rotulo: 'Restante (até à 1.ª aula)', valor: resto }
    ];
  }
  return partes.filter(x => x.k === 'sinal' || x.valor > 0);
}

/* Datas de início das aulas (AAAA-MM-DD). Servem para calcular quando vence
   cada prestação e quem está em atraso. Muda aqui se a data mudar.
   Presencial vazio = ainda sem data (as prestações ficam "sem data"). */
export const INICIO = { online: { seg: '2026-11-02', qua: '2026-11-04' }, presencial: '' };

const somaDias = (iso, n) => { const d = new Date(iso + 'T00:00:00Z'); d.setUTCDate(d.getUTCDate() + n); return d.toISOString().slice(0, 10); };

/* Quando vence cada parte do pagamento de uma reserva. */
export function vencimentos(r){
  const ini = r.modalidade === 'presencial' ? (INICIO.presencial || '') : (INICIO.online[r.diaPref === 'qua' ? 'qua' : 'seg'] || '');
  return {
    sinal: r.lancamento ? PRAZO_LANCAMENTO.slice(0, 10) : null,
    resto: ini || null,
    p2: ini || null,
    p3: ini ? somaDias(ini, 14) : null
  };
}
export { somaDias };

export function euros(v){
  const n = Number(v) || 0;
  return (Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',')) + '€';
}

export const CONDICOES = 'O que foi pago não tem devolução. Se desistires, podes entrar noutra turma, em qualquer altura, ou fazer a formação ao teu ritmo na app.';

export const AVISO_COMPLEMENTAR = 'O Reiki é uma prática complementar e não substitui acompanhamento médico ou psicológico.';

/* Ficheiro de calendário (.ics) com as 3 noites do workshop, em UTC. */
export function icsWorkshop(){
  const f = s => s.replace(/[-:]/g, '').replace(/\.\d+/, '');
  const agora = f(new Date().toISOString());
  const linhas = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Hikari Fafe Escola de Reiki//PT', 'CALSCALE:GREGORIAN'];
  WORKSHOP.noites.forEach(n => {
    linhas.push(
      'BEGIN:VEVENT',
      'UID:workshop-reiki-' + n.n + '-2026@hikarifafe',
      'DTSTAMP:' + agora,
      'DTSTART:' + f(n.inicioUTC),
      'DTEND:' + f(n.fimUTC),
      'SUMMARY:Workshop de Reiki · Noite ' + n.n + ': ' + n.titulo,
      'DESCRIPTION:Hikari Fafe Escola de Reiki. O link da sala chega pelo grupo de WhatsApp.',
      'BEGIN:VALARM', 'ACTION:DISPLAY', 'DESCRIPTION:Workshop de Reiki daqui a 1 hora', 'TRIGGER:-PT1H', 'END:VALARM',
      'END:VEVENT');
  });
  linhas.push('END:VCALENDAR');
  return linhas.join('\r\n');
}
