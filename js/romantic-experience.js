(function () {
  const valentineDays = [
    {
      day: "Day 01",
      title: "Rose Day",
      message: "A rose for every time you made an ordinary day feel beautiful.",
      secret: "I never said this enough: your softness healed parts of me I thought were permanent."
    },
    {
      day: "Day 02",
      title: "Propose Day",
      message: "If I could ask for one forever, I would ask for all my tomorrows with you.",
      secret: "I still get nervous around you, because you still matter that much."
    },
    {
      day: "Day 03",
      title: "Chocolate Day",
      message: "Sweet things remind me of you, but none are as addictive as your laugh.",
      secret: "I replay your voice in my head on difficult nights."
    },
    {
      day: "Day 04",
      title: "Teddy Day",
      message: "Some hugs are places. Yours is home.",
      secret: "I miss you most in tiny moments, not just big ones."
    },
    {
      day: "Day 05",
      title: "Promise Day",
      message: "I promise to choose patience, honesty, and us — even on hard days.",
      secret: "My biggest fear is not distance, it is ever making you feel alone."
    },
    {
      day: "Day 06",
      title: "Hug Day",
      message: "If I could pause time, I’d pause it in your arms.",
      secret: "You are the safest place my heart has ever known."
    },
    {
      day: "Day 07",
      title: "Kiss Day",
      message: "Every kiss with you feels like a quiet promise I never want to break.",
      secret: "I still close my eyes and smile when I remember the first one."
    },
    {
      day: "Day 08",
      title: "Valentine’s Day",
      message: "Not one day. Not one week. You are my favorite season.",
      secret: "I fell for you slowly, then all at once, then forever."
    }
  ];

  const neverSaidLines = [
    "You became my favorite habit.",
    "I pretend to be okay, but I miss you in every quiet hour.",
    "You taught me that tenderness is strength.",
    "Even silence feels warm when it belongs to us.",
    "If love has a handwriting, it looks like your name in my mind."
  ];

  function getGalleryImageByIndex(index) {
    const gallery = (window.SITE_CONFIG && window.SITE_CONFIG.gallery) || {};
    const folders = Object.keys(gallery);
    if (!folders.length) return "";

    const folder = folders[index % folders.length];
    const firstImage = (gallery[folder] || []).find((fileName) => /\.(jpg|jpeg|png|webp)$/i.test(fileName));
    return firstImage ? `assets/images/${folder}/${firstImage}` : "";
  }

  function initCinematicIntro() {
    const intro = document.getElementById("cinematicIntro");
    const line = document.getElementById("cinematicLine");
    const openBtn = document.getElementById("openHeartBtn");
    const bgMusic = document.getElementById("bgMusic");
    const musicToggle = document.getElementById("musicToggleFloating");

    if (!intro || !line || !openBtn || !bgMusic || !musicToggle) return;

    if (window.gsap) {
      gsap.to(line, { opacity: 1, duration: 2.2, ease: "power2.out", delay: 0.8 });
      gsap.to(openBtn, { opacity: 1, y: 0, duration: 1.2, ease: "power2.out", delay: 2.2 });
    } else {
      line.style.opacity = "1";
      openBtn.style.opacity = "1";
      openBtn.style.transform = "translateY(0)";
    }

    const setMusicState = () => {
      if (bgMusic.paused) {
        musicToggle.classList.add("muted");
        musicToggle.textContent = "♫";
      } else {
        musicToggle.classList.remove("muted");
        musicToggle.textContent = "❚❚";
      }
    };

    const tryPlay = async () => {
      try {
        await bgMusic.play();
      } catch (e) {
        musicToggle.classList.add("muted");
      }
      setMusicState();
    };

    tryPlay();

    musicToggle.addEventListener("click", async function () {
      if (bgMusic.paused) {
        await tryPlay();
      } else {
        bgMusic.pause();
      }
      setMusicState();
    });

    openBtn.addEventListener("click", async function () {
      await tryPlay();
      intro.classList.add("hidden");
      setTimeout(() => {
        intro.style.display = "none";
      }, 1200);

      const passwordInput = document.getElementById("password-input");
      if (passwordInput) passwordInput.focus();
    });

    setMusicState();
  }

  function initValentineWeek() {
    const wrap = document.getElementById("valentineWeekCards");
    const modal = document.getElementById("valentineModal");
    const modalCard = document.getElementById("valentineModalCard");
    const closeBtn = document.getElementById("valentineModalClose");
    const dayEl = document.getElementById("vDay");
    const titleEl = document.getElementById("vTitle");
    const messageEl = document.getElementById("vMessage");
    const photoEl = document.getElementById("vPhoto");
    const secretBtn = document.getElementById("revealSecretBtn");
    const secretEl = document.getElementById("vSecret");

    if (!wrap || !modal || !modalCard) return;

    valentineDays.forEach((item, index) => {
      const card = document.createElement("article");
      card.className = "valentine-card";
      card.innerHTML = `
        <div class="vk-day">${item.day}</div>
        <h3>${item.title}</h3>
      `;

      card.addEventListener("click", () => {
        if (dayEl) dayEl.textContent = item.day;
        if (titleEl) titleEl.textContent = item.title;
        if (messageEl) messageEl.textContent = item.message;
        if (secretEl) {
          secretEl.classList.remove("open");
          secretEl.textContent = item.secret;
        }

        if (photoEl) {
          const src = getGalleryImageByIndex(index);
          photoEl.src = src || "";
          photoEl.style.display = src ? "block" : "none";
        }

        modal.classList.add("open");
        if (window.gsap) {
          gsap.fromTo(modalCard, { y: 24, opacity: 0.5, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 0.65, ease: "power2.out" });
        }
      });

      wrap.appendChild(card);
    });

    if (secretBtn && secretEl) {
      secretBtn.addEventListener("click", function () {
        secretEl.classList.add("open");
        if (window.gsap) {
          gsap.fromTo(secretEl, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.6, ease: "power1.out" });
        }
      });
    }

    const closeModal = () => modal.classList.remove("open");
    if (closeBtn) closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) closeModal();
    });
  }

  function initHandwrittenLetter() {
    const linesWrap = document.getElementById("letterLines");
    if (!linesWrap) return;

    neverSaidLines.forEach((line) => {
      const p = document.createElement("p");
      p.className = "letter-line";
      p.textContent = line;
      linesWrap.appendChild(p);
    });

    const lines = Array.from(linesWrap.querySelectorAll(".letter-line"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const targetIndex = lines.indexOf(entry.target);
            lines.slice(targetIndex).forEach((lineEl, index) => {
              setTimeout(() => {
                lineEl.style.opacity = "1";
                lineEl.style.transform = "translateY(0)";
                lineEl.style.transition = "opacity 1.1s ease, transform 1.1s ease";
              }, index * 260);
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(linesWrap);
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

  function initParallax() {
    const sections = document.querySelectorAll(".section");
    if (!sections.length) return;

    window.addEventListener("scroll", () => {
      const offset = window.scrollY;
      sections.forEach((section, index) => {
        if (index % 2 === 0) {
          section.style.backgroundPositionY = `${offset * 0.03}px`;
        }
      });
    }, { passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initCinematicIntro();
    initValentineWeek();
    initHandwrittenLetter();
    initSecretLogoTap();
    initParallax();
  });
})();
