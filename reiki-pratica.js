/* =========================================================================
   PRÁTICA DE AUTOAPLICAÇÃO — Escola de Reiki · Hikari Fafe
   -------------------------------------------------------------------------
   Um passo especial do percurso de cada nível: o autotratamento diário
   durante vários dias (21 por defeito), com calendário, plano por semana
   e, se o Mestre os juntar, áudios de meditação guiada.

   Nível 1: entra a seguir ao módulo 5 (Autotratamento e Cho Ku Rei), com
   espaço para 7 meditações guiadas.
   Níveis 2, 3A e 3B: desafio de autoaplicação obrigatório, sem áudios.

   O Mestre pode editar tudo na app (Conteúdo → Módulos → Prática de
   autoaplicação). O que ele guardar fica em reikiModules/{nivel}-pratica
   e ganha sobre estes textos de origem.
   ========================================================================= */

export function praticaId(nivel){ return String(nivel) + '-pratica'; }

const SEMANAS_N1 = [
  { titulo: 'Semana 1 · Guiada',
    texto: 'Um áudio por dia, pela ordem: no dia 1 ouves a meditação 1, no dia 2 a meditação 2, e assim até ao dia 7. Deixa-te levar. O objetivo desta semana é criar o hábito e aprender o caminho das mãos.' },
  { titulo: 'Semana 2 · Meio guiada',
    texto: 'Escolhe as meditações de que mais gostaste e usa-as em três ou quatro dias. Nos outros dias faz o autotratamento sozinho, começando a ouvir o que as tuas mãos pedem.' },
  { titulo: 'Semana 3 · Por intuição',
    texto: 'Faz o autotratamento sem áudio, seguindo a tua intuição: pousa as mãos onde sentires que é preciso e fica o tempo que te parecer certo. Se um dia te sentires perdido, volta a uma das meditações.' }
];

const SEMANAS_OUTROS = [
  { titulo: 'Semana 1 · Rotina',
    texto: 'Escolhe a hora que consegues manter e faz o autotratamento todos os dias, com o que já sabes. Mesmo cinco minutos contam.' },
  { titulo: 'Semana 2 · Aprofundar',
    texto: 'Acrescenta o que fores aprendendo nos módulos deste nível. Repara no que muda em ti de um dia para o outro e escreve uma palavra.' },
  { titulo: 'Semana 3 · Por intuição',
    texto: 'Faz sem esquemas, seguindo a tua intuição: onde pousar as mãos, quanto tempo ficar, como terminar. A prática passa a ser tua.' }
];

const INTRO = {
  '1': 'Chegaste ao coração da prática. O Reiki aprende-se com as mãos, e as mãos aprendem a repetir. Durante 21 dias vais tratar-te todos os dias, o tempo que tiveres, mesmo que sejam só 5 minutos. Neste passo tens meditações guiadas para te acompanharem no início.',
  '2': 'A autoaplicação é obrigatória em todos os níveis, e é ela que dá raízes a tudo o que aprendes. Durante 21 dias, trata-te todos os dias, usando os símbolos à medida que os fores aprendendo.',
  '3A': 'Neste nível a prática diária aprofunda o teu trabalho interior. Durante 21 dias, trata-te todos os dias e leva para ela o que fores descobrindo nos módulos.',
  '3B': 'Antes de sintonizares outras pessoas, a tua própria prática tem de estar firme. Durante 21 dias, trata-te todos os dias, com a atenção e a presença de quem vai ensinar.'
};

const NOTA_N1 = 'O mais importante: assim que te sintas preparado, faz por ti e segue a tua intuição. Os áudios são um apoio para o início, não uma muleta. Se falhares um dia, retomas no seguinte, sem recomeçar a contagem.';
const NOTA_OUTROS = 'Se falhares um dia, retomas no seguinte, sem recomeçar a contagem. O que conta é a regularidade, não a perfeição.';

export function praticaPadrao(nivel){
  const n = String(nivel);
  const n1 = n === '1';
  return {
    id: praticaId(n), nivel: n, tipo: 'pratica', publicado: true, obrigatoria: true,
    titulo: n1 ? 'Os 21 dias de autotratamento' : 'Desafio de autoaplicação · 21 dias',
    subtitulo: n1 ? 'A prática que dá raízes ao Reiki' : 'Obrigatório em todos os níveis',
    dias: 21,
    depoisDe: n1 ? 5 : 1,
    intro: INTRO[n] || INTRO['2'],
    nota: n1 ? NOTA_N1 : NOTA_OUTROS,
    semanas: (n1 ? SEMANAS_N1 : SEMANAS_OUTROS).map(s => Object.assign({}, s)),
    audios: n1 ? Array.from({ length: 7 }, (_, i) => ({ titulo: 'Meditação guiada ' + (i + 1), url: '' })) : [],
    capa: '', video: ''
  };
}

/* Junta o que o Mestre guardou com os textos de origem. */
export function mesclarPratica(nivel, d){
  const base = praticaPadrao(nivel);
  if (!d) return base;
  const p = Object.assign({}, base, d, { id: praticaId(nivel), nivel: String(nivel), tipo: 'pratica' });
  p.dias = Math.max(1, Math.min(90, Number(p.dias) || 21));
  p.depoisDe = Number.isFinite(Number(p.depoisDe)) ? Number(p.depoisDe) : base.depoisDe;
  p.obrigatoria = p.obrigatoria !== false;
  p.publicado = p.publicado !== false;
  p.audios = (Array.isArray(p.audios) ? p.audios : base.audios)
    .map(a => ({ titulo: String((a && a.titulo) || ''), url: String((a && a.url) || '') }));
  p.semanas = (Array.isArray(p.semanas) && p.semanas.length ? p.semanas : base.semanas)
    .map(s => ({ titulo: String((s && s.titulo) || ''), texto: String((s && s.texto) || '') }));
  return p;
}

export function semanaDe(dia){ return Math.max(1, Math.ceil(Number(dia) / 7)); }

/* Áudio sugerido para um dia: na 1.ª semana, o do próprio dia (se existir). */
export function audioDoDia(p, dia){
  if (!p || !Array.isArray(p.audios) || semanaDe(dia) !== 1) return null;
  const a = p.audios[dia - 1];
  return a && a.url ? a : null;
}

export function hojeISO(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

/* ─── Vídeo e áudio ─────────────────────────────────────────────────── */

const MIDIA_DIRETA = /\.(mp3|m4a|wav|ogg|aac|mp4|webm)(\?|#|$)/i;

function esc(s){
  return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* Devolve o link "incorporável" do Drive ou do YouTube, ou '' se não for nenhum. */
export function urlEmbed(u){
  u = String(u || '').trim();
  let m = u.match(/drive\.google\.com\/file\/d\/([^/?#]+)/);
  if (m) return 'https://drive.google.com/file/d/' + m[1] + '/preview';
  m = u.match(/[?&]id=([^&#]+)/);
  if (m && /drive\.google\.com/.test(u)) return 'https://drive.google.com/file/d/' + m[1] + '/preview';
  m = u.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([A-Za-z0-9_-]{6,})/);
  if (m) return 'https://www.youtube-nocookie.com/embed/' + m[1];
  return '';
}

/* HTML do leitor. tipo: 'video' | 'audio'. */
export function midiaHtml(url, tipo){
  url = String(url || '').trim();
  if (!url) return '';
  const abrir = '<p class="nota" style="margin-top:6px;"><a href="' + esc(url) + '" target="_blank" rel="noopener">Abrir noutra janela</a> se não carregar aqui.</p>';
  if (MIDIA_DIRETA.test(url)){
    return tipo === 'audio'
      ? '<audio controls preload="none" src="' + esc(url) + '" style="width:100%;margin-top:8px;"></audio>' + abrir
      : '<video controls playsinline preload="metadata" src="' + esc(url) + '" style="width:100%;margin-top:8px;border-radius:10px;background:#000;"></video>' + abrir;
  }
  const emb = urlEmbed(url);
  if (!emb) return '<p style="margin-top:8px;"><a class="leve" style="display:inline-block;text-decoration:none;" href="' + esc(url) + '" target="_blank" rel="noopener">' + (tipo === 'audio' ? '🎧 Ouvir' : '▶️ Ver o vídeo') + '</a></p>';
  if (tipo === 'audio'){
    return '<iframe src="' + esc(emb) + '" allow="autoplay" style="width:100%;height:150px;border:0;border-radius:10px;margin-top:8px;background:#f3ece0;"></iframe>' + abrir;
  }
  return '<div style="position:relative;padding-top:56.25%;margin-top:8px;"><iframe src="' + esc(emb)
    + '" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;inset:0;width:100%;height:100%;border:0;border-radius:10px;background:#000;"></iframe></div>' + abrir;
}
