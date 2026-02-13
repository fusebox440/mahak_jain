(function () {
  const lines = [
    'You accidentally became my favorite person.',
    'You made ordinary evenings feel like poetry.',
    'I still smile at my phone when your name appears.',
    'You taught me that softness can be strength.',
    'I did not just fall for you, I grew into you.',
    'Even silence feels warm when it belongs to us.'
  ];

  document.addEventListener('DOMContentLoaded', function () {
    const root = document.getElementById('letterStream');
    if (!root) return;

    lines.forEach((text) => {
      const p = document.createElement('p');
      p.className = 'letter-line border-l-2 border-rose-200 pl-4 text-slate-700';
      p.textContent = text;
      root.appendChild(p);
    });

    const items = Array.from(root.querySelectorAll('.letter-line'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = items.indexOf(entry.target);
        items.slice(index).forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 260);
        });
        io.disconnect();
      });
    }, { threshold: 0.4 });

    io.observe(root);
  });
})();
