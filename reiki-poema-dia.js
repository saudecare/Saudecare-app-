/* Poema do dia: a app escolhe um por dia (percorre os 125 sem repetir),
   ou a pessoa escolhe o seu. Tudo fica só neste aparelho. */
const CH_DIA = 'meiji_dia', CH_MED = 'meiji_medit';

export function hojeISO(){
  const d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}
function ler(k, def){ try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? def : v; } catch(e){ return def; } }
function gravar(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch(e){} }

/* Índice do dia: avança 37 poemas por dia; com 125 poemas passa por todos antes de repetir. */
export function indiceDoDia(n, iso){
  if (!n) return 0;
  const dias = Math.floor(Date.parse((iso || hojeISO()) + 'T00:00:00Z') / 86400000);
  const passo = (n % 37 === 0) ? 1 : 37;
  return ((dias * passo) % n + n) % n;
}

/* O poema de hoje: o que a pessoa escolheu hoje, ou o da app. */
export function escolhaDoDia(lista){
  if (!lista || !lista.length) return null;
  const e = ler(CH_DIA, null);
  if (e && e.data === hojeISO()){
    const p = lista.find(x => Number(x.numero) === Number(e.numero));
    if (p) return { poema: p, manual: true };
  }
  return { poema: lista[indiceDoDia(lista.length, hojeISO())], manual: false };
}
export function escolherHoje(numero){ gravar(CH_DIA, { data: hojeISO(), numero: Number(numero) }); }
export function voltarAoDaApp(){ try { localStorage.removeItem(CH_DIA); } catch(e){} }

/* Dias em que meditou. */
export function registarMeditacao(numero){
  const l = ler(CH_MED, []);
  if (!l.some(x => x.data === hojeISO())) l.push({ data: hojeISO(), numero: Number(numero) });
  gravar(CH_MED, l.slice(-400));
  return sequencia();
}
export function sequencia(){
  const l = ler(CH_MED, []).map(x => x.data);
  const set = new Set(l);
  const hoje = set.has(hojeISO());
  let seguidos = 0;
  const d = new Date();
  if (!hoje) d.setDate(d.getDate() - 1);   // ainda pode meditar hoje sem perder a sequência
  for (;;){
    const iso = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
    if (!set.has(iso)) break;
    seguidos++; d.setDate(d.getDate() - 1);
  }
  return { total: set.size, seguidos, hoje };
}
