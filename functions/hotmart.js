// Ligação à Hotmart: ativa ou suspende a conta do subscritor sozinha quando o pagamento muda.
// O "hottok" (chave secreta da Hotmart) fica só no servidor, em tenant_secrets/_hotmart (sem acesso do cliente).
const { getFirestore, FieldValue } = require('firebase-admin/firestore');
const { onRequest } = require('firebase-functions/v2/https');

// Publicada automaticamente pelo GitHub quando este ficheiro muda (Node 22).
const db = getFirestore();

const ATIVAR = new Set(['PURCHASE_APPROVED', 'PURCHASE_COMPLETE']);
const SUSPENDER = new Set(['PURCHASE_REFUNDED', 'PURCHASE_CHARGEBACK', 'SUBSCRIPTION_CANCELLATION']);

const maisUmMes = (de) => {
  const d = de ? new Date(de + 'T12:00:00Z') : new Date();
  const base = isNaN(d) || d < new Date() ? new Date() : d;
  base.setUTCMonth(base.getUTCMonth() + 1);
  return base.toISOString().slice(0, 10);
};

exports.hotmartWebhook = onRequest({ cors: false }, async (req, res) => {
  try {
    if (req.method !== 'POST') return res.status(405).send('Método não permitido');

    const seg = (await db.doc('tenant_secrets/_hotmart').get()).data() || {};
    const esperado = String(seg.hottok || '');
    const recebido = String(req.get('X-HOTMART-HOTTOK') || req.body?.hottok || '');
    if (!esperado || recebido !== esperado) return res.status(401).send('Não autorizado');

    const evento = String(req.body?.event || '');
    const dados = req.body?.data || {};
    const email = String(dados?.buyer?.email || '').trim().toLowerCase();
    const transacao = String(dados?.purchase?.transaction || '');

    // Registo de todos os eventos (para conferir à mão na consola do Firebase).
    const ref = db.collection('hotmart_eventos').doc();
    const registo = { evento, email, transacao, recebidoEm: FieldValue.serverTimestamp(), resultado: 'ignorado' };

    if (!ATIVAR.has(evento) && !SUSPENDER.has(evento)) {
      await ref.set(registo);
      return res.status(200).send('ok');
    }

    // 1.º pelo identificador que o botão da app junta ao link (sck); 2.º pelo email do comprador.
    const sck = String(dados?.purchase?.origin?.sck || dados?.purchase?.sck || '').trim();
    let q = null;
    if (sck && /^[A-Za-z0-9_-]{6,128}$/.test(sck)) {
      const porId = await db.doc(`tenants/${sck}`).get();
      if (porId.exists) q = { size: 1, empty: false, docs: [porId] };
    }
    if (!q && email) q = await db.collection('tenants').where('ownerEmail', '==', email).limit(2).get();
    if (!q || q.size !== 1) {
      registo.resultado = (!q || q.empty) ? 'sem_conta_com_este_email' : 'varias_contas_com_este_email';
      await ref.set(registo);
      return res.status(200).send('ok');
    }

    const t = q.docs[0];
    registo.tenantId = t.id;
    if (ATIVAR.has(evento)) {
      await t.ref.update({
        status: 'active',
        nextPaymentDue: maisUmMes(t.data().nextPaymentDue),
        statusChangedAt: FieldValue.serverTimestamp(),
        pagamentoPor: 'hotmart'
      });
      registo.resultado = 'ativada';
    } else {
      await t.ref.update({ status: 'suspended', statusChangedAt: FieldValue.serverTimestamp(), pagamentoPor: 'hotmart' });
      registo.resultado = 'suspensa';
    }
    await ref.set(registo);
    return res.status(200).send('ok');
  } catch (e) {
    console.error('hotmartWebhook', e);
    return res.status(500).send('erro');
  }
});
