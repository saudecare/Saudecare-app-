/* Músicas da Hikari Fafe (playlist do YouTube) — cartão que só carrega o leitor quando se carrega em "Ouvir". */
export const PLAYLIST_ID = 'PLumrDpswIebz3EEcyuMCyOO8xg07LHuvq';
export const PLAYLIST_URL = 'https://www.youtube.com/playlist?list=' + PLAYLIST_ID;

window.tocarMusicaEscola = function(btn){
  const cx = btn.closest('[data-musica]');
  const alvo = cx && cx.querySelector('.musicaPalco');
  if (!alvo) return;
  alvo.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=' + PLAYLIST_ID +
    '&rel=0" title="Músicas" width="100%" height="315" style="border:0;border-radius:10px;" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe>' +
    '<p style="margin:6px 0 0;font-size:.8rem;opacity:.75;">Mantém o ecrã ligado para a música continuar. <a href="' + PLAYLIST_URL + '" target="_blank" rel="noopener">Abrir no YouTube</a></p>';
  btn.style.display = 'none';
};

export function cartaoMusicaHtml(titulo, texto){
  return '<div data-musica style="text-align:center;margin:16px auto;max-width:560px;padding:14px;border-radius:14px;border:1px solid rgba(128,128,128,.25);background:rgba(255,255,255,.55);">' +
    '<strong>🎵 ' + (titulo || 'Música para meditar e praticar') + '</strong>' +
    '<p style="margin:6px 0 10px;font-size:.9rem;opacity:.85;">' + (texto || 'Os Cinco Princípios, o Eu Sou e outras canções de Reiki e espiritualidade.') + '</p>' +
    '<div class="musicaPalco"></div>' +
    '<button type="button" onclick="tocarMusicaEscola(this)" style="padding:10px 18px;border-radius:10px;border:0;background:#2f7f6f;color:#fff;font-weight:600;cursor:pointer;">▶ Ouvir</button></div>';
}
