/* Poema do dia: a app escolhe um por dia (percorre os 125 sem repetir),
   ou a pessoa escolhe o seu. Tudo fica só neste aparelho. */
const CH_DIA = 'meiji_dia', CH_MED = 'meiji_medit', CH_MODO = 'meiji_modo', CH_SORT = 'meiji_sorteio';

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

/* Modo do poema de cada dia: 'dia' = a app avança um poema por dia (sem repetir até passar por todos);
   'sorteio' = a app sorteia ao acaso, e o sorteado fica o mesmo durante o dia. */
export function modoPoema(){ return ler(CH_MODO, 'dia') === 'sorteio' ? 'sorteio' : 'dia'; }
export function definirModo(m){ gravar(CH_MODO, m === 'sorteio' ? 'sorteio' : 'dia'); }

/* Sorteia um poema ao acaso (diferente do que está agora, se possível) e guarda-o para hoje. */
export function sortearHoje(lista){
  if (!lista || !lista.length) return null;
  const antes = ler(CH_SORT, null);
  let p = lista[Math.floor(Math.random() * lista.length)];
  for (let i = 0; i < 20 && lista.length > 1 && antes && Number(p.numero) === Number(antes.numero); i++){
    p = lista[Math.floor(Math.random() * lista.length)];
  }
  gravar(CH_SORT, { data: hojeISO(), numero: Number(p.numero) });
  return p;
}

/* O poema de hoje: o que a pessoa escolheu hoje; senão o sorteado (modo sorteio) ou o da app. */
export function escolhaDoDia(lista){
  if (!lista || !lista.length) return null;
  const e = ler(CH_DIA, null);
  if (e && e.data === hojeISO()){
    const p = lista.find(x => Number(x.numero) === Number(e.numero));
    if (p) return { poema: p, manual: true };
  }
  if (modoPoema() === 'sorteio'){
    const s = ler(CH_SORT, null);
    let p = s && s.data === hojeISO() ? lista.find(x => Number(x.numero) === Number(s.numero)) : null;
    if (!p) p = sortearHoje(lista);
    return { poema: p, manual: false, sorteado: true };
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
