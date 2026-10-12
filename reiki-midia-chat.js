/* =========================================================================
   Conversas da Escola de Reiki: fotos e links de materiais
   -------------------------------------------------------------------------
   - comprimirImagem(ficheiro): reduz a foto no próprio telemóvel (máx. 900 px,
     JPEG) e devolve um endereço de dados pequeno, que vai na própria mensagem.
   - corpoMensagem(x): HTML (já seguro) com a foto e o texto, com os links
     transformados em botões clicáveis.
   Não usa armazenamento de ficheiros: nada para pagar nem para moderar à parte.
   ========================================================================= */

const esc = s => String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const LIMITE_IMAGEM = 380000; // caracteres do endereço de dados

export function comprimirImagem(ficheiro){
  return new Promise((resolve, reject) => {
    if (!ficheiro || !/^image\//.test(ficheiro.type)){ reject(new Error('Escolhe uma imagem.')); return; }
    const url = URL.createObjectURL(ficheiro);
    const img = new Image();
    img.onload = () => {
      try {
        let lado = 900, q = 0.72, saida = '';
        for (let t = 0; t < 4; t++){
          const k = Math.min(1, lado / Math.max(img.width, img.height));
          const c = document.createElement('canvas');
          c.width = Math.max(1, Math.round(img.width * k)); c.height = Math.max(1, Math.round(img.height * k));
          const g = c.getContext('2d');
          g.fillStyle = '#fff'; g.fillRect(0, 0, c.width, c.height);
          g.drawImage(img, 0, 0, c.width, c.height);
          saida = c.toDataURL('image/jpeg', q);
          if (saida.length <= LIMITE_IMAGEM) break;
          lado = Math.round(lado * 0.78); q = Math.max(0.5, q - 0.08);
        }
        URL.revokeObjectURL(url);
        if (saida.length > LIMITE_IMAGEM) reject(new Error('A imagem é demasiado pesada.')); else resolve(saida);
      } catch(e){ reject(e); }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('Não consegui abrir a imagem.')); };
    img.src = url;
  });
}

function textoComLinks(texto){
  const partes = String(texto || '').split(/(https?:\/\/[^\s<]+)/g);
  return partes.map((p, i) => {
    if (i % 2 === 0) return esc(p);
    const limpo = p.replace(/[.,;:!?)]+$/, ''), resto = p.slice(limpo.length);
    if (!/^https:\/\//i.test(limpo)) return esc(p);
    const material = /drive\.google\.com|docs\.google\.com|youtu\.be|youtube\.com|chat\.whatsapp\.com|meet\.jit\.si/i.test(limpo);
    const rotulo = /meet\.jit\.si/i.test(limpo) ? '🎥 Entrar na aula'
      : /chat\.whatsapp\.com/i.test(limpo) ? '💬 Abrir o grupo'
      : material ? '📎 Abrir material' : '🔗 ' + limpo.replace(/^https?:\/\//, '').slice(0, 34);
    return '<a href="' + esc(limpo) + '" target="_blank" rel="noopener" style="display:inline-block;margin:3px 0;padding:6px 11px;border-radius:9px;background:rgba(255,255,255,.75);color:#7a4a10;text-decoration:none;border:1px solid rgba(0,0,0,.12);word-break:break-all;">'
      + esc(rotulo) + '</a>' + esc(resto);
  }).join('');
}

export function corpoMensagem(x){
  let h = '';
  if (x && typeof x.imagem === 'string' && /^data:image\/(jpeg|png|webp);base64,/.test(x.imagem)){
    h += '<img src="' + esc(x.imagem) + '" alt="foto" onclick="window.__verFotoChat(this.src)" style="display:block;max-width:100%;max-height:240px;border-radius:10px;cursor:zoom-in;margin-bottom:4px;">';
  }
  const t = (x && x.texto) || '';
  if (!(x && x.imagem && t === '📷 Foto')) h += textoComLinks(t);
  return h;
}

window.__verFotoChat = function(src){
  const d = document.createElement('div');
  d.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;padding:12px;cursor:zoom-out;';
  d.innerHTML = '<img src="' + esc(src) + '" style="max-width:100%;max-height:100%;border-radius:8px;">';
  d.onclick = () => d.remove();
  document.body.appendChild(d);
};

/* Abre o seletor de fotos e devolve a foto já reduzida (ou null). */
export function escolherFoto(){
  return new Promise(resolve => {
    const i = document.createElement('input');
    i.type = 'file'; i.accept = 'image/*';
    i.onchange = async () => {
      const f = i.files && i.files[0];
      if (!f){ resolve(null); return; }
      try { resolve(await comprimirImagem(f)); }
      catch(e){ alert(e.message || 'Não consegui usar essa foto.'); resolve(null); }
    };
    i.click();
  });
}
