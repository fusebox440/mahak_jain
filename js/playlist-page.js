(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('playlistRoot');
    const config = window.PLAYLIST_CONFIG || {};
    if (!root || !config.playlists || !config.songs) return;

    config.playlists.forEach((playlist) => {
      const section = document.createElement('section');
      section.className = 'glass-card rounded-3xl p-6';
      section.innerHTML = `<h2 class="font-['Playfair_Display'] text-3xl text-midnight">${playlist.title}</h2><p class="mt-2 text-slate-600">${playlist.description}</p>`;

      const grid = document.createElement('div');
      grid.className = 'mt-6 grid gap-4 md:grid-cols-2';

      playlist.songs.forEach((songIndex) => {
        const song = config.songs[songIndex];
        if (!song) return;
        const card = document.createElement('article');
        card.className = 'rounded-2xl border border-rose-100 bg-white/70 p-5';
        card.innerHTML = `
          <h3 class="text-xl font-semibold text-midnight">${song.name}</h3>
          <p class="mt-1 text-sm text-slate-600">${song.artist}</p>
          <p class="mt-3 text-sm text-slate-500">${song.description || ''}</p>
          <a href="${song.spotifyUrl}" target="_blank" class="mt-4 inline-flex rounded-full bg-rose-600 px-4 py-2 text-sm font-medium text-white hover:bg-rose-700">Play on Spotify</a>
        `;
        grid.appendChild(card);
      });

      section.appendChild(grid);
      root.appendChild(section);
    });
  });
})();
