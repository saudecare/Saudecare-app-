// Aplica a cor da marca do subscritor: define a cor principal e uma
// versão mais escura (usada em menus, títulos e fundos).
export function aplicarCorMarca(hex){
  if (typeof hex !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(hex)) return;
  const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
  const f = 0.62;
  const h = v => Math.round(v * f).toString(16).padStart(2,'0');
  const root = document.documentElement.style;
  root.setProperty('--primary', hex);
  root.setProperty('--primary-dark', '#' + h(r) + h(g) + h(b));
}
