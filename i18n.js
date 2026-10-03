// Traduções das páginas públicas (paciente). Idioma: ?lang=xx > escolha guardada > idioma do dispositivo > português.
// Texto livre escrito pelo profissional (nomes de serviços, descrições, etc.) NÃO é traduzido.
export const IDIOMAS = [['pt','Português'],['en','English'],['es','Español'],['fr','Français'],['de','Deutsch'],['it','Italiano']];
const DICT = {};
export function registar(pagina, dic){ DICT[pagina] = dic; }

let atual = 'pt';
export function idioma(){ return atual; }
export function iniciarIdioma(){
  let l = '';
  try{ l = new URLSearchParams(location.search).get('lang') || ''; }catch(e){}
  if (!l){ try{ l = localStorage.getItem('vindora_lang') || ''; }catch(e){} }
  if (!l){ l = (navigator.language || 'pt').slice(0,2).toLowerCase(); }
  atual = IDIOMAS.some(x => x[0] === l) ? l : 'pt';
  document.documentElement.lang = atual;
  return atual;
}
export function definirIdioma(l){
  if (!IDIOMAS.some(x => x[0] === l)) return;
  atual = l;
  try{ localStorage.setItem('vindora_lang', l); }catch(e){}
  document.documentElement.lang = l;
}
export function t(pagina, chave, vars){
  const d = DICT[pagina] || {};
  let s = (d[chave] && (d[chave][atual] || d[chave].pt)) || chave;
  if (vars) for (const k in vars) s = s.split('{' + k + '}').join(vars[k]);
  return s;
}
export function seletorIdiomaHtml(){
  return `<select id="vdLang" aria-label="Language" style="position:absolute;top:10px;right:10px;width:auto;padding:5px 8px;font-size:12px;border-radius:8px;border:1px solid rgba(255,255,255,.5);background:rgba(255,255,255,.15);color:#fff;">${IDIOMAS.map(([k,n]) => `<option value="${k}" ${k===atual?'selected':''} style="color:#000">${n}</option>`).join('')}</select>`;
}
