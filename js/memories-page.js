(function () {
  function getImages() {
    const gallery = (window.SITE_CONFIG && window.SITE_CONFIG.gallery) || {};
    const all = [];
    Object.keys(gallery).forEach((folder) => {
      (gallery[folder] || []).forEach((name) => {
        if (/\.(jpg|jpeg|png|webp)$/i.test(name)) {
          all.push({
            src: `assets/images/${folder}/${name}`,
            alt: name.replace(/[-_]/g, ' ').replace(/\.[^.]+$/, '').replace('Copy', '').trim()
          });
        }
      });
    });
    for (let i = all.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [all[i], all[j]] = [all[j], all[i]];
    }
    return all;
  }

  document.addEventListener('DOMContentLoaded', function () {
    const wall = document.getElementById('memoriesWall');
    const lightbox = document.getElementById('lightbox');
    const close = document.getElementById('lightboxClose');
    const prev = document.getElementById('lightboxPrev');
    const next = document.getElementById('lightboxNext');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    const images = getImages();
    let idx = 0;

    images.forEach((item, index) => {
      const fig = document.createElement('figure');
      fig.className = 'polaroid-item';
      fig.style.setProperty('--tilt', `${(Math.random() * 8 - 4).toFixed(2)}deg`);
      fig.innerHTML = `<img src="${item.src}" alt="${item.alt}" /><figcaption class="mt-2 text-center text-sm text-slate-600">${item.alt}</figcaption>`;
      fig.addEventListener('click', () => {
        idx = index;
        render();
        lightbox.classList.add('open');
      });
      wall.appendChild(fig);
    });

    function render() {
      const current = images[idx];
      if (!current) return;
      img.src = current.src;
      caption.textContent = current.alt;
    }

    function closeLb() {
      lightbox.classList.remove('open');
    }

    close.addEventListener('click', closeLb);
    prev.addEventListener('click', () => { idx = (idx - 1 + images.length) % images.length; render(); });
    next.addEventListener('click', () => { idx = (idx + 1) % images.length; render(); });
    lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLb(); });
  });
})();
