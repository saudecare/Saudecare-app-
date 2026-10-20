// Carrega o método "Pesquisa Emocional" do servidor (só com licença válida) e
// dá uma forma simples de chamar as funções protegidas. Não contém o método.
const BASE = 'https://europe-west1-saudecare-app.cloudfunctions.net/';

window.peChamar = async function (nome, dados) {
  const u = window.firebase && window.firebase.auth().currentUser;
  if (!u) throw new Error('Sem sessão iniciada.');
  const token = await u.getIdToken();
  const r = await fetch(BASE + nome, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    body: JSON.stringify({ data: dados || {} })
  });
  let j = null;
  try { j = await r.json(); } catch (_) {}
  if (!r.ok || !j || j.error) {
    const e = new Error((j && j.error && j.error.message) || 'Falha na ligação ao servidor.');
    e.code = (j && j.error && j.error.status) || String(r.status);
    throw e;
  }
  return j.result;
};

let _a = null;
window.carregarPE = function () {
  if (window.renderPesquisaEmocional) return Promise.resolve();
  if (_a) return _a;
  _a = (async () => {
    try {
      const r = await window.peChamar('peModulo', {});
      const url = URL.createObjectURL(new Blob([r.codigo], { type: 'text/javascript' }));
      await import(url);
      URL.revokeObjectURL(url);
    } catch (e) {
      if (e && (e.code === 'PERMISSION_DENIED' || e.code === 'UNAUTHENTICATED')) { _a = null; throw e; }
      // Funções ainda não publicadas: usa a cópia local enquanto a mudança não está completa.
      await import('./pesquisa_emocional_bloco.js');
    }
  })().catch((e) => { _a = null; throw e; });
  return _a;
};
