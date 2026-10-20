// Cópia de segurança diária de toda a base de dados (Firestore) para o Storage privado.
// Ficheiros: backups/AAAA-MM-DD/<conta>.json.gz e backups/AAAA-MM-DD/_<colecao>.json.gz
// Guarda 14 dias. Nunca copia tenant_secrets (palavras-passe e chaves).
const { getFirestore, Timestamp, GeoPoint, DocumentReference } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const zlib = require('zlib');
const db = getFirestore();

const IGNORAR = new Set(['tenant_secrets']);
const DIAS = 14;

function ser(v) {
  if (v instanceof Timestamp) return { __ts: v.toDate().toISOString() };
  if (v instanceof GeoPoint) return { __geo: [v.latitude, v.longitude] };
  if (v instanceof DocumentReference) return { __ref: v.path };
  if (Buffer.isBuffer(v)) return { __bytes: v.toString('base64') };
  if (Array.isArray(v)) return v.map(ser);
  if (v && typeof v === 'object') { const o = {}; for (const k of Object.keys(v)) o[k] = ser(v[k]); return o; }
  return v;
}

async function dumpDoc(ref, snap) {
  const out = { id: ref.id, data: ser(snap.data() || {}), sub: {} };
  const cols = await ref.listCollections();
  for (const c of cols) out.sub[c.id] = await dumpCol(c);
  return out;
}
async function dumpCol(col) {
  const refs = await col.listDocuments();
  const docs = [];
  for (let i = 0; i < refs.length; i += 50) {
    const lote = refs.slice(i, i + 50);
    const snaps = await db.getAll(...lote);
    for (let j = 0; j < lote.length; j++) {
      docs.push(await dumpDoc(lote[j], snaps[j]));
    }
  }
  return docs;
}
const gz = (obj) => zlib.gzipSync(Buffer.from(JSON.stringify(obj)));

exports.backupDiario = onSchedule({ schedule: 'every day 03:30', timeZone: 'Europe/Lisbon', timeoutSeconds: 540, memory: '1GiB' }, async () => {
  const bucket = getStorage().bucket();
  const dia = new Date().toISOString().slice(0, 10);
  const pasta = `backups/${dia}/`;
  const cols = await db.listCollections();
  let ficheiros = 0, erros = 0;
  for (const col of cols) {
    if (IGNORAR.has(col.id)) continue;
    try {
      if (col.id === 'tenants') {
        for (const ref of await col.listDocuments()) {
          const snap = await ref.get();
          await bucket.file(`${pasta}${ref.id}.json.gz`).save(gz(await dumpDoc(ref, snap)), { contentType: 'application/gzip' });
          ficheiros++;
        }
      } else {
        await bucket.file(`${pasta}_${col.id}.json.gz`).save(gz(await dumpCol(col)), { contentType: 'application/gzip' });
        ficheiros++;
      }
    } catch (e) { erros++; console.error('backup falhou em', col.id, e); }
  }
  await db.collection('platform_backups').doc(dia).set({ dia, ficheiros, erros, criadoEm: new Date().toISOString() });
  // Apaga cópias com mais de 14 dias
  const limite = Date.now() - DIAS * 86400000;
  const [antigos] = await bucket.getFiles({ prefix: 'backups/' });
  for (const f of antigos) {
    const m = f.name.match(/^backups\/(\d{4}-\d{2}-\d{2})\//);
    if (m && new Date(m[1]).getTime() < limite) await f.delete().catch(() => {});
  }
  console.log('backup', dia, ficheiros, 'ficheiros', erros, 'erros');
});
