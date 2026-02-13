(function () {
  const items = [
    { day: 'Day 01', title: 'Rose Day', msg: 'A rose for every time you made my day softer.', secret: 'You are still my calm after every chaos.' },
    { day: 'Day 02', title: 'Propose Day', msg: 'I still choose you, in every version of life.', secret: 'I pray for your happiness before my own.' },
    { day: 'Day 03', title: 'Chocolate Day', msg: 'Sweet things remind me of you.', secret: 'Your laugh fixes my worst days.' },
    { day: 'Day 04', title: 'Teddy Day', msg: 'Your hugs are my definition of home.', secret: 'I miss your warmth in silent nights.' },
    { day: 'Day 05', title: 'Promise Day', msg: 'I promise effort over ego, always.', secret: 'I am still learning to love you better.' },
    { day: 'Day 06', title: 'Hug Day', msg: 'If I could freeze one moment, it would be your embrace.', secret: 'You are my safest place.' },
    { day: 'Day 07', title: 'Kiss Day', msg: 'Every kiss is my favorite memory replayed.', secret: 'I still blush remembering the first one.' },
    { day: 'Day 08', title: 'Valentine\'s Day', msg: 'Not one day, you are my season.', secret: 'I fell slowly, then forever.' }
  ];

  function imageFor(index) {
    const gallery = (window.SITE_CONFIG && window.SITE_CONFIG.gallery) || {};
    const folders = Object.keys(gallery);
    if (!folders.length) return '';
    const folder = folders[index % folders.length];
    const file = (gallery[folder] || []).find((name) => /\.(jpg|jpeg|png|webp)$/i.test(name));
    return file ? `assets/images/${folder}/${file}` : '';
  }

  document.addEventListener('DOMContentLoaded', function () {
    const grid = document.getElementById('weekGrid');
    const modal = document.getElementById('weekModal');
    const closeBtn = document.getElementById('closeWeekModal');
    const day = document.getElementById('weekDay');
    const title = document.getElementById('weekTitle');
    const message = document.getElementById('weekMessage');
    const photo = document.getElementById('weekPhoto');
    const reveal = document.getElementById('revealLine');
    const hidden = document.getElementById('hiddenLine');

    items.forEach((item, idx) => {
      const card = document.createElement('article');
      card.className = 'timeline-card glass-card rounded-2xl p-5';
      card.innerHTML = `<p class="text-xs uppercase tracking-[0.15em] text-rose-500">${item.day}</p><h3 class="mt-2 font-['Playfair_Display'] text-2xl text-midnight">${item.title}</h3>`;
      card.addEventListener('click', function () {
        day.textContent = item.day;
        title.textContent = item.title;
        message.textContent = item.msg;
        hidden.textContent = item.secret;
        hidden.classList.add('hidden');
        photo.src = imageFor(idx);
        modal.classList.add('open');
        if (window.gsap) {
          gsap.fromTo('.lightbox > div', { opacity: 0.5, y: 18, scale: 0.98 }, { opacity: 1, y: 0, scale: 1, duration: 0.6, ease: 'power2.out' });
        }
      });
      grid.appendChild(card);
    });

    reveal.addEventListener('click', () => hidden.classList.remove('hidden'));
    closeBtn.addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', (event) => { if (event.target === modal) modal.classList.remove('open'); });
  });
})();
