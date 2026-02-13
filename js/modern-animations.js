(function () {
  function petals() {
    setInterval(function () {
      const petal = document.createElement("span");
      petal.className = "float-petal";
      petal.textContent = ["🌸", "✨", "💮"][Math.floor(Math.random() * 3)];
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${8 + Math.random() * 6}s`;
      petal.style.fontSize = `${16 + Math.random() * 12}px`;
      document.body.appendChild(petal);
      setTimeout(() => petal.remove(), 15000);
    }, 1400);
  }

  function heroReveal() {
    const revealEls = document.querySelectorAll(".hero-fade");
    if (!revealEls.length) return;

    if (window.gsap) {
      gsap.to(revealEls, {
        opacity: 1,
        y: 0,
        duration: 1.1,
        stagger: 0.18,
        ease: "power2.out"
      });
    } else {
      revealEls.forEach((el) => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    petals();
    heroReveal();
  });
})();
