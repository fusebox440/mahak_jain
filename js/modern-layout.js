(function () {
  const routes = [
    { href: "index.html", label: "Home", key: "home" },
    { href: "valentine-week.html", label: "Valentine Week", key: "week" },
    { href: "memories.html", label: "Memories", key: "memories" },
    { href: "letters.html", label: "Letters", key: "letters" },
    { href: "playlist.html", label: "Playlist", key: "playlist" },
    { href: "promises.html", label: "Promises", key: "promises" },
    { href: "travels.html", label: "Travels", key: "travels" },
    { href: "photobooth.html", label: "Steal a smile 📸", key: "photobooth" }
  ];

  function buildHeader(active) {
    const links = routes
      .map((route) => `<a href="${route.href}" class="nav-link text-sm font-medium ${active === route.key ? "active text-rose-700" : "text-slate-700 hover:text-rose-700"}">${route.label}</a>`)
      .join("");

    return `
      <header class="site-header sticky top-0 z-40">
        <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
          <a href="index.html" id="siteLogo" class="text-xl font-semibold tracking-wide text-rose-800">For Mahak</a>
          <button id="mobileMenuBtn" class="rounded-lg border border-rose-200 px-3 py-2 text-sm text-rose-700 md:hidden">Menu</button>
          <nav id="desktopNav" class="hidden items-center gap-5 md:flex">${links}</nav>
        </div>
        <nav id="mobileNav" class="mx-4 mb-3 hidden flex-col gap-3 rounded-xl border border-rose-100 bg-white/80 p-4 md:hidden">${links}</nav>
      </header>
    `;
  }

  function buildFooter() {
    return `
      <footer class="mt-16 border-t border-rose-100 bg-white/70 py-8 text-center text-sm text-slate-600">
        <p>Made with love by Lakshya · Designed as a memory, not a template.</p>
      </footer>
    `;
  }

  window.renderModernLayout = function renderModernLayout(activeKey) {
    const headerMount = document.getElementById("headerMount");
    const footerMount = document.getElementById("footerMount");

    if (headerMount) headerMount.innerHTML = buildHeader(activeKey);
    if (footerMount) footerMount.innerHTML = buildFooter();

    const mobileBtn = document.getElementById("mobileMenuBtn");
    const mobileNav = document.getElementById("mobileNav");

    if (mobileBtn && mobileNav) {
      mobileBtn.addEventListener("click", function () {
        mobileNav.classList.toggle("hidden");
      });
    }

    const logo = document.getElementById("siteLogo");
    if (logo) {
      let taps = 0;
      let timer = null;
      logo.addEventListener("click", function () {
        taps += 1;
        clearTimeout(timer);
        timer = setTimeout(() => { taps = 0; }, 2400);
        if (taps >= 5) {
          taps = 0;
          window.location.href = "secret.html";
        }
      });
    }
  };
})();
