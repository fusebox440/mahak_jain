(function () {
  const PASSWORD = 'mahakjain15';

  function getHeroImage() {
    const gallery = (window.SITE_CONFIG && window.SITE_CONFIG.gallery) || {};
    const all = [];
    Object.keys(gallery).forEach((folder) => {
      (gallery[folder] || []).forEach((file) => {
        if (/\.(jpg|jpeg|png|webp)$/i.test(file)) {
          all.push(`assets/images/${folder}/${file}`);
        }
      });
    });
    if (!all.length) return '';
    return all[Math.floor(Math.random() * all.length)];
  }

  async function tryPlayMusic(audio, toggleBtn) {
    try {
      await audio.play();
      toggleBtn.textContent = '❚❚';
    } catch (e) {
      toggleBtn.textContent = '♫';
    }
  }

  document.addEventListener('DOMContentLoaded', function () {
    const intro = document.getElementById('cinematicIntro');
    const introLine = document.querySelector('.intro-line');
    const openBtn = document.getElementById('openHeartBtn');
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    const gate = document.getElementById('passwordGate');
    const passInput = document.getElementById('passwordInput');
    const unlockBtn = document.getElementById('unlockBtn');
    const passError = document.getElementById('passError');
    const site = document.getElementById('siteWrap');
    const heroImg = document.getElementById('heroImage');

    if (heroImg) heroImg.src = getHeroImage();

    if (window.gsap) {
      gsap.to(introLine, { opacity: 1, duration: 2, ease: 'power2.out', delay: 0.7 });
      gsap.to(openBtn, { opacity: 1, duration: 1.2, ease: 'power2.out', delay: 2.1 });
    } else {
      introLine.style.opacity = '1';
      openBtn.style.opacity = '1';
    }

    openBtn.addEventListener('click', async function () {
      await tryPlayMusic(bgMusic, musicToggle);
      intro.style.opacity = '0';
      setTimeout(() => { intro.style.display = 'none'; }, 1000);
      passInput.focus();
    });

    musicToggle.addEventListener('click', async function () {
      if (bgMusic.paused) {
        await tryPlayMusic(bgMusic, musicToggle);
      } else {
        bgMusic.pause();
        musicToggle.textContent = '♫';
      }
    });

    function unlock() {
      if (passInput.value === PASSWORD) {
        passError.classList.add('hidden');
        gate.classList.add('hidden');
        site.classList.remove('hidden');
      } else {
        passError.classList.remove('hidden');
      }
    }

    unlockBtn.addEventListener('click', unlock);
    passInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') unlock();
    });
  });
})();
