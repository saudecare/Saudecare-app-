// Fusos horários. As horas que o terapeuta define (ex.: 09:00–18:00) são
// sempre as do fuso dele; quem marca pode estar noutro país.
export const FUSO_PADRAO = 'Europe/Lisbon';

export function fusoValido(tz){
  try { new Intl.DateTimeFormat('pt-PT', { timeZone: tz }); return !!tz; } catch(_) { return false; }
}

export function fusoDe(profile){
  const tz = profile?.availability?.timezone;
  return fusoValido(tz) ? tz : FUSO_PADRAO;
}

function desvioMs(ts, tz){
  const f = new Intl.DateTimeFormat('en-US', { timeZone: tz, hourCycle: 'h23',
    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const p = {};
  f.formatToParts(new Date(ts)).forEach(x => { p[x.type] = x.value; });
  return Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second) - ts;
}

// "2026-10-05" + "10:00" no fuso tz -> instante real (Date).
export function dataNoFuso(dataStr, horaStr, tz){
  const [y, m, d] = dataStr.split('-').map(Number);
  const [hh, mm] = (horaStr || '09:00').split(':').map(Number);
  const alvo = Date.UTC(y, m - 1, d, hh, mm);
  let ts = alvo - desvioMs(alvo, tz);
  ts = alvo - desvioMs(ts, tz);
  return new Date(ts);
}

export function formatarNoFuso(date, tz, opcoes){
  return new Intl.DateTimeFormat('pt-PT', Object.assign({ timeZone: tz, weekday: 'short', day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }, opcoes || {})).format(date);
}

export function fusoDoDispositivo(){
  try { return Intl.DateTimeFormat().resolvedOptions().timeZone || FUSO_PADRAO; } catch(_) { return FUSO_PADRAO; }
}

// Chave "AAAA-MM-DD" de uma data local, sem passar por UTC.
export function chaveData(d){
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

// Quantas semanas passaram desde a segunda-feira de referência (só por datas,
// sem horas, para a mudança de hora não estragar a conta).
export function semanasDesde(refStr, d){
  const [y, m, dd] = refStr.split('-').map(Number);
  const ref = Date.UTC(y, m - 1, dd);
  const hoje = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());
  return Math.floor((hoje - ref) / (7 * 86400000));
}
