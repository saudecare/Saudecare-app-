// Sorteio automático da Hikari Fafe: à hora marcada, escolhe ao acaso o vencedor e dois suplentes
// entre as participações válidas (aleatoriedade do servidor, sem ninguém a mexer) e publica o resultado.
const { getFirestore, FieldValue, Timestamp } = require('firebase-admin/firestore');
const { onSchedule } = require('firebase-functions/v2/scheduler');
const crypto = require('crypto');
const db = getFirestore();

const abrev = (n) => { const p = String(n || '').trim().split(/\s+/).filter(Boolean); return p.length > 1 ? p[0] + ' ' + p[p.length - 1][0].toUpperCase() + '.' : (p[0] || ''); };

async function realizarSorteio(ref, modo) {
  const partSnap = await ref.collection('participantes').get();
  const todos = partSnap.docs.filter((d) => !d.data().excluido);
  await db.runTransaction(async (tx) => {
    const cur = await tx.get(ref);
    if (!cur.exists || cur.data().estado !== 'aberto') return;
    if (!todos.length) { tx.update(ref, { estado: 'sorteado', semVencedor: true, total: 0, sorteadoEm: FieldValue.serverTimestamp(), modo }); return; }
    const a = todos.slice();
    for (let i = a.length - 1; i > 0; i--) { const j = crypto.randomInt(i + 1); [a[i], a[j]] = [a[j], a[i]]; }
    const venc = a[0];
    a.slice(0, 3).forEach((d, i) => tx.update(d.ref, i === 0 ? { vencedor: true } : { suplente: i }));
    tx.update(ref, { estado: 'sorteado', total: todos.length, vencedorNome: abrev(venc.data().nome), vencedorCodigo: venc.data().codigo, sorteadoEm: FieldValue.serverTimestamp(), modo });
  });
}

exports.sorteioAutomatico = onSchedule({ schedule: 'every 15 minutes', timeZone: 'Europe/Lisbon', timeoutSeconds: 120, memory: '256MiB' }, async () => {
  const agora = Timestamp.now().toMillis();
  const q = await db.collection('public_sorteios').where('estado', '==', 'aberto').get();
  for (const d of q.docs) {
    const t = d.data().sorteioTs;
    if (t && t.toMillis && t.toMillis() <= agora) { try { await realizarSorteio(d.ref, 'automatico'); } catch (e) { console.error('sorteio', d.id, e); } }
  }
});
