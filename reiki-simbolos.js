/* =========================================================================
   SÍMBOLOS DO REIKI — traços vetoriais e ordem de desenho
   Hikari Fafe Escola de Reiki · Vindora
   -------------------------------------------------------------------------
   Os 6 símbolos que a escola ensina, desenhados em vetor e com a ordem dos
   traços da folha "Traçado dos Símbolos do Reiki Usui Tibetano".

     Nível 1  · Cho Ku Rei
     Nível 2  · Sei He Ki, Hon Sha Ze Sho Nen
     Nível 3A · Dai Ko Myo
     Nível 3B · Dai Ko Myo tibetano, Raku (Serpente de Fogo)

   Os caracteres do Dai Ko Myo (大 光 明) usam os traços do KanjiVG
   (Ulrich Apel, http://kanjivg.tagaini.net, licença CC BY-SA 3.0).

   Cada traço: { d: caminho SVG, t: [dx, dy] opcional }. Um símbolo só é
   mostrado ao aluno quando o nível em estudo é igual ou superior ao seu.
   ========================================================================= */

export const ORDEM_NIVEIS = ['1', '2', '3A', '3B'];

/* Espiral: pontos de um caminho SVG. dir = +1 sentido horário no ecrã. */
function espiral(cx, cy, r0, r1, th0, voltas, dir, passo){
  const n = Math.round(voltas * (passo || 36));
  const pts = [];
  for (let i = 0; i <= n; i++){
    const u = i / n;
    const a = (th0 + dir * u * voltas * 360) * Math.PI / 180;
    const r = r0 + (r1 - r0) * u;
    pts.push((cx + r * Math.cos(a)).toFixed(1) + ',' + (cy + r * Math.sin(a)).toFixed(1));
  }
  return pts;
}

const cho = 'M106,345 L' + espiral(118, 256, 88, 8, 90, 3.05, -1).join(' L');
const dkmt = 'M' + espiral(588, 275, 4, 98, -50, 3.85, 1).join(' L') + ' C620,168 655,170 680,182';

export const SIMBOLOS = {
  'cho-ku-rei': {
    nome: 'Cho Ku Rei', nivel: '1', vb: [10, 120, 210, 245],
    strokes: [
      { d: 'M22,142 L106,142' },
      { d: 'M106,142 L106,345' },
      { d: cho }
    ],
    dica: 'Linha da esquerda para a direita, desce a vertical e abre a espiral para a direita, a rodar contra os ponteiros do relógio até ao centro.'
  },
  'sei-he-ki': {
    nome: 'Sei He Ki', nivel: '2', vb: [280, 95, 175, 275],
    strokes: [
      { d: 'M313,108 C310,135 300,165 297,185 L333,172 C325,190 308,200 297,213 L296,228 C312,224 332,218 347,232 C355,262 345,292 322,312 C312,324 300,330 293,335' },
      { d: 'M297,126 C320,115 345,105 365,112 C385,125 397,160 402,200 C405,260 405,300 397,340 L392,358' },
      { d: 'M398,143 C418,135 432,150 424,168 C420,175 410,178 403,176' },
      { d: 'M408,204 C430,196 442,225 426,245 C420,251 412,252 407,250' }
    ],
    dica: 'Primeiro o traço da esquerda, de cima para baixo. Depois o grande arco. Por fim, as duas pequenas curvas verdes da direita.'
  },
  'hon-sha-ze-sho-nen': {
    nome: 'Hon Sha Ze Sho Nen', nivel: '2', vb: [10, 425, 215, 475],
    strokes: [
      { d: 'M35,461 C70,457 110,457 136,457' },
      { d: 'M79,436 L78,520' },
      { d: 'M72,468 C60,485 45,495 32,503' },
      { d: 'M82,478 C100,495 120,503 141,505' },
      { d: 'M60,511 L106,511' },
      { d: 'M30,534 C70,538 110,538 142,538' },
      { d: 'M136,521 C122,536 108,546 96,553' },
      { d: 'M64,574 L62,615' },
      { d: 'M35,598 C50,586 62,575 80,572 C100,569 120,568 141,568' },
      { d: 'M141,569 C146,585 149,600 150,612' },
      { d: 'M94,583 C102,585 112,587 120,590' },
      { d: 'M62,613 C95,613 130,613 156,613' },
      { d: 'M105,622 L104,690' },
      { d: 'M104,648 C115,650 126,653 136,656' },
      { d: 'M80,656 L80,690' },
      { d: 'M97,696 C85,718 55,745 22,762' },
      { d: 'M97,696 C112,720 135,745 170,770' },
      { d: 'M78,748 C90,748 100,750 110,754' },
      { d: 'M64,768 C85,768 105,768 120,772 C118,790 90,815 55,838 C45,845 33,849 26,851' },
      { d: 'M96,846 C105,862 125,878 150,880 C175,880 195,862 203,845' },
      { d: 'M136,806 C124,812 120,826 128,840' },
      { d: 'M164,806 C172,815 170,830 158,839' }
    ],
    dica: 'Do alto para baixo: a árvore vermelha, a parte roxa, a pequena parte rosa, o telhado verde e, por fim, a parte azul com as duas curvas.'
  },
  'dai-ko-myo': {
    nome: 'Dai Ko Myo', nivel: '3A', vb: [10, 10, 90, 262],
    strokes: [{"d":"M19.38,48.25c1.49,0.51,5.03,0.89,7.6,0.49C41.12,46.5,63,43,77.19,42.44c2.7-0.11,4.87-0.06,7.31,0.33","t":[0,0]},{"d":"M49.5,18c0.88,2.12,1.03,4.16,0.99,6.32C50,57,37.75,81.12,18,91.75","t":[0,0]},{"d":"M49.5,46c9,10.5,28.5,36.25,37.49,43.28c3.06,2.39,5.62,3.75,7.01,3.97","t":[0,0]},{"d":"M51.72,15.37c1.14,1.14,1.93,3.06,1.93,5.27c0,6.12,0.05,20.6-0.03,26.62","t":[0,88]},{"d":"M26.5,26.25c4.01,2.63,10.36,10.84,11.37,14.94","t":[0,88]},{"d":"M77.5,20.5c0.06,0.86,0.01,1.7-0.21,2.54c-1.08,4.25-5.38,12.46-11.17,17.59","t":[0,88]},{"d":"M16.13,51.48c2.19,0.54,5,0.65,8.38,0.29c15.8-1.67,41.61-4.89,58.84-5.73c3.64-0.18,5.83,0.26,7.65,0.53","t":[0,88]},{"d":"M45.5,53.5c0.25,1.25,0.23,2.35-0.13,3.62C42.38,67.62,37.75,81.25,22,91.75","t":[0,88]},{"d":"M58.74,51.37c0.68,1.19,1.21,2.59,1.25,4.43c0.11,4.82-0.02,13.81-0.02,21.2c0,13,1.28,14.53,17.78,14.53c14.5,0,15.89-2.03,15.89-8.62","t":[0,88]},{"d":"M16.75,25.22c0.89,0.89,1.32,2.29,1.32,3.66c0,1.11,0.07,27.44,0,37.63c-0.02,2.32-0.02,3.78-0.02,3.91","t":[0,176]},{"d":"M19.29,27.75c5.66-0.81,19.54-2.59,21.22-2.75c1.76-0.17,2.89,1.89,2.75,2.91c-0.23,1.7-0.45,27.34-0.52,36.6c-0.01,1.9-0.02,3.11-0.02,3.29","t":[0,176]},{"d":"M19.16,46.97C23.5,46.5,37,45.12,41.77,44.76","t":[0,176]},{"d":"M19,66.59c8.5-0.97,14.37-1.59,22.49-2.11","t":[0,176]},{"d":"M57.55,16c0.95,1.25,1.09,2.48,1.11,3.5c1.09,49.25-4.41,64.75-17.41,75.75","t":[0,176]},{"d":"M59.5,17.98c6.56-1.04,21.76-3.51,23.07-3.73c2.97-0.5,5.21,0.62,5.21,4.5c0,1.49,0.19,50.25,0.19,70.5c0,11.88-7.22,3.5-8.3,2.5","t":[0,176]},{"d":"M59.77,39c7.85-1,19.73-2.25,26.95-2.75","t":[0,176]},{"d":"M59.25,57.75c6.62-0.62,20-1.5,27.36-2","t":[0,176]}],
    dica: 'Três caracteres, de cima para baixo: 大, 光 e 明. Em cada um, de cima para baixo e da esquerda para a direita.'
  },
  'dai-ko-myo-tibetano': {
    nome: 'Dai Ko Myo tibetano', nivel: '3B', vb: [490, 90, 200, 275],
    strokes: [
      { d: dkmt },
      { d: 'M547,186 C550,150 575,120 610,110 C640,104 665,104 678,120' },
      { d: 'M678,142 C668,148 660,152 652,150 C646,140 642,138 636,144 C632,152 626,154 622,148 C616,140 610,144 604,150 C598,152 590,148 576,152' }
    ],
    dica: 'A espiral nasce no centro e abre para fora, a rodar no sentido dos ponteiros do relógio. Depois o arco azul e, por fim, o traço verde, da direita para a esquerda.'
  },
  'raku': {
    nome: 'Raku (Serpente de Fogo)', nivel: '3B', vb: [490, 425, 200, 245],
    strokes: [
      { d: 'M500,447 C530,441 600,434 640,436 C662,438 674,446 680,458' },
      { d: 'M548,448 L548,462 C600,462 640,458 652,474 C655,490 620,492 570,502 C530,510 515,516 520,527 C530,540 580,532 625,538 C655,543 655,555 640,562 C620,570 570,570 560,582 C555,595 600,595 620,596 C640,598 632,612 620,616 C600,620 575,614 568,625 C562,636 570,646 585,650 C600,656 618,650 618,636 C618,622 602,618 592,626 C583,634 590,645 598,644' }
    ],
    dica: 'Primeiro o traço de cima, da esquerda para a direita. Depois a serpente, de cima para baixo, até à pequena espiral.'
  }
};

export function simbolosDoNivel(nivelEmEstudo){
  const r = ORDEM_NIVEIS.indexOf(String(nivelEmEstudo));
  if (r < 0) return [];
  return Object.keys(SIMBOLOS).filter(id => ORDEM_NIVEIS.indexOf(SIMBOLOS[id].nivel) <= r);
}

/* Módulos que ensinam símbolos (o Mestre pode juntar `simbolos: [...]` a
   uma lição para mudar isto). */
const DO_MODULO = {
  '1-5': ['cho-ku-rei'],
  '2-3': ['cho-ku-rei'],
  '2-4': ['sei-he-ki'],
  '2-5': ['hon-sha-ze-sho-nen'],
  '3A-3': ['dai-ko-myo'],
  '3A-4': ['dai-ko-myo'],
  '3B-2': ['dai-ko-myo-tibetano', 'raku']
};
export function simbolosDoModulo(m){
  if (m && Array.isArray(m.simbolos) && m.simbolos.length) return m.simbolos.filter(id => SIMBOLOS[id]);
  return (m && DO_MODULO[m.id]) || [];
}

/* Imagens antigas (PNG) que passam a ser desenhadas em vetor. */
export function simboloDeUrl(url){
  const m = String(url || '').match(/reiki-img\/([a-z-]+)\.png/i);
  return m && SIMBOLOS[m[1]] ? m[1] : null;
}

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function inicio(d){
  const m = String(d).match(/M\s*(-?[\d.]+)[ ,]\s*(-?[\d.]+)/);
  return m ? [Number(m[1]), Number(m[2])] : [0, 0];
}

/* Caixa de visualização com margem (a mesma no SVG e na tela de desenho). */
export function vbSimbolo(id){
  const [x, y, w, h] = SIMBOLOS[id].vb;
  const pad = Math.max(w, h) * 0.07;
  return [x - pad, y - pad, w + 2 * pad, h + 2 * pad];
}

/* SVG do símbolo.
   opcoes: numeros (bolinha com o nº de cada traço), cor, espessura,
   so (índice do único traço a mostrar forte), feitos (nº de traços já
   feitos), fraco (opacidade dos traços por fazer), id (para JS). */
export function svgSimbolo(id, opcoes){
  const s = SIMBOLOS[id];
  if (!s) return '';
  const o = Object.assign({ numeros: true, cor: '#3b2f1e', espessura: 0, fraco: 1, feitos: -1, atual: -1 }, opcoes || {});
  const [x0, y0, w0, h0] = s.vb;
  const vb = vbSimbolo(id);
  const esp = o.espessura || Math.max(w0, h0) * 0.028;
  const r = Math.max(w0, h0) * (s.strokes.length > 12 ? 0.03 : 0.036);
  let tracos = '', bolas = '';
  s.strokes.forEach((t, i) => {
    const tr = t.t ? ' transform="translate(' + t.t[0] + ',' + t.t[1] + ')"' : '';
    let cor = o.cor, op = 1;
    if (o.feitos >= 0){
      if (i < o.feitos){ cor = '#5d7a4a'; }
      else if (i === o.atual){ cor = '#b8893b'; }
      else { op = o.fraco; cor = '#9b8e78'; }
    }
    tracos += '<path class="tr" data-i="' + i + '" d="' + esc(t.d) + '"' + tr + ' fill="none" stroke="' + cor
      + '" stroke-width="' + esp + '" stroke-linecap="round" stroke-linejoin="round" opacity="' + op + '"/>';
    if (o.numeros){
      const p = inicio(t.d);
      const px = p[0] + (t.t ? t.t[0] : 0), py = p[1] + (t.t ? t.t[1] : 0);
      bolas += '<g class="bola"><circle cx="' + px + '" cy="' + py + '" r="' + r + '" fill="#fffdf9" stroke="#b8893b" stroke-width="' + (r * 0.14) + '"/>'
        + '<text x="' + px + '" y="' + (py + r * 0.36) + '" text-anchor="middle" font-family="sans-serif" font-weight="700" font-size="' + (r * (i + 1 > 9 ? 1.05 : 1.3)) + '" fill="#8a5d1c">' + (i + 1) + '</text></g>';
    }
  });
  return '<svg class="simbolo" data-id="' + esc(id) + '" viewBox="' + vb.map(n => +n.toFixed(1)).join(' ') + '" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="' + esc(s.nome) + '" style="width:100%;height:auto;max-height:100%;">'
    + tracos + bolas + '</svg>';
}

/* Anima o desenho traço a traço dentro de um elemento que contém o SVG. */
export function animar(el, ms){
  const paths = Array.from(el.querySelectorAll('path.tr'));
  const bolas = Array.from(el.querySelectorAll('g.bola'));
  paths.forEach(p => { p.setAttribute('pathLength', '1'); p.style.strokeDasharray = '1'; p.style.strokeDashoffset = '1'; p.style.transition = 'none'; });
  bolas.forEach(b => { b.style.opacity = '0'; });
  const por = ms || 900;
  let i = 0, cancelado = false;
  function passo(){
    if (cancelado || i >= paths.length) return;
    const p = paths[i];
    if (bolas[i]) bolas[i].style.opacity = '1';
    p.getBoundingClientRect();
    p.style.transition = 'stroke-dashoffset ' + por + 'ms ease-in-out';
    p.style.strokeDashoffset = '0';
    i++;
    setTimeout(passo, por + 180);
  }
  setTimeout(passo, 200);
  return () => { cancelado = true; };
}
