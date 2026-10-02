// Número de telefone -> só dígitos com indicativo, pronto para wa.me ou sms.
// "+351 912 345 678" e "00351912345678" funcionam; um número de 9 dígitos que
// comece por 9 ou 2 assume-se português; os restantes (ex.: espanhol a 6 ou 7)
// ficam como foram escritos.
export function telefoneParaDigitos(raw){
  const s = String(raw || '').trim();
  const d = s.replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('00')) return d.slice(2);
  if (s.startsWith('+')) return d;
  if (d.length === 9 && /^[29]/.test(d)) return '351' + d;
  return d;
}
