(function () {
  function shuffle(items) {
    for (let i = items.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    return items;
  }

  function initSecretLogoTap() {
    const logos = document.querySelectorAll(".logo");
    if (!logos.length) return;

    let taps = 0;
    let tapTimer = null;

    logos.forEach((logo) => {
      logo.addEventListener("click", function () {
        taps += 1;
        clearTimeout(tapTimer);

        tapTimer = setTimeout(() => {
          taps = 0;
        }, 2400);

        if (taps >= 5) {
          taps = 0;
          window.location.href = "secret.html";
        }
      });
    });
  }

  function initWall() {
    const galleryMap = (window.SITE_CONFIG && window.SITE_CONFIG.gallery) || {};
    const wall = document.getElementById("memoriesFolders");
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxCaption = document.getElementById("lightbox-caption");
    const lightboxClose = document.getElementById("lightbox-close");
    const lightboxPrev = document.getElementById("lightbox-prev");
    const lightboxNext = document.getElementById("lightbox-next");

    if (!wall || !lightbox || !lightboxImg || !lightboxCaption || !lightboxClose || !lightboxPrev || !lightboxNext) return;

    const images = [];
    Object.keys(galleryMap).forEach((folder) => {
      (galleryMap[folder] || []).forEach((fileName) => {
        if (/\.(jpg|jpeg|png|webp)$/i.test(fileName)) {
          images.push({
            src: `assets/images/${folder}/${fileName}`,
            alt: fileName.replace(/[-_]/g, " ").replace(/\.[^.]+$/, "").replace("Copy", "").trim()
          });
        }
      });
    });

    shuffle(images);

    let currentIndex = 0;

    images.forEach((image, idx) => {
      const figure = document.createElement("figure");
      figure.className = "polaroid-item";
      const tilt = (Math.random() * 8 - 4).toFixed(2);
      figure.style.setProperty("--tilt", `${tilt}deg`);

      figure.innerHTML = `
        <img src="${image.src}" alt="${image.alt}">
        <figcaption>${image.alt}</figcaption>
      `;

      figure.addEventListener("click", function () {
        currentIndex = idx;
        showCurrent();
        lightbox.style.display = "flex";
        if (window.gsap) {
          gsap.fromTo(lightboxImg, { opacity: 0.5, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" });
        }
      });

      wall.appendChild(figure);
    });

    function showCurrent() {
      const current = images[currentIndex];
      if (!current) return;
      lightboxImg.src = current.src;
      lightboxCaption.textContent = current.alt;
    }

    function closeLightbox() {
      lightbox.style.display = "none";
    }

    lightboxClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) closeLightbox();
    });

    lightboxPrev.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showCurrent();
    });

    lightboxNext.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showCurrent();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSecretLogoTap();
    initWall();
  });
})();
