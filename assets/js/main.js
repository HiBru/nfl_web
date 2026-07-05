/* ============================================================
   Sebastian Hinz — Portfolio interaction
   Theme · Language · Scroll reveal · Nav · Counters
   ============================================================ */
(function () {
  "use strict";

  const root = document.documentElement;
  const STORE = { theme: "sh_theme", lang: "sh_lang" };

  /* ---------- Theme ---------- */
  const themeToggle = document.getElementById("themeToggle");

  function initTheme() {
    let theme = localStorage.getItem(STORE.theme);
    if (!theme) {
      theme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    root.setAttribute("data-theme", theme);
  }

  themeToggle.addEventListener("click", function () {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem(STORE.theme, next);
  });

  /* ---------- Language ---------- */
  const langToggle = document.getElementById("langToggle");
  const langOpts = langToggle.querySelectorAll(".lang-toggle__opt");

  function applyLang(lang) {
    const dict = window.I18N[lang];
    if (!dict) return;
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      const key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });
    root.setAttribute("lang", lang);
    langOpts.forEach(function (o) {
      o.classList.toggle("is-active", o.getAttribute("data-lang") === lang);
    });
    localStorage.setItem(STORE.lang, lang);
    document.title = lang === "en"
      ? "Sebastian Hinz — Senior Android & Kotlin Multiplatform Developer"
      : "Sebastian Hinz — Senior Android & Kotlin Multiplatform Developer";
  }

  function initLang() {
    let lang = localStorage.getItem(STORE.lang);
    if (!lang) {
      lang = (navigator.language || "de").toLowerCase().startsWith("en") ? "en" : "de";
    }
    applyLang(lang);
  }

  langToggle.addEventListener("click", function () {
    const current = root.getAttribute("lang") === "en" ? "en" : "de";
    applyLang(current === "de" ? "en" : "de");
  });

  /* ---------- Scroll reveal (Apple-style fade-up) ---------- */
  function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
          if (entry.target.classList.contains("count-host")) animateCount(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -8% 0px" });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Nav: scrolled state, active link, progress ---------- */
  const nav = document.getElementById("nav");
  const progress = document.querySelector(".scroll-progress span");
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navLinks = Array.from(document.querySelectorAll(".nav__links a"));

  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle("scrolled", y > 24);

    const docH = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";

    let currentId = "";
    for (const sec of sections) {
      if (sec.getBoundingClientRect().top <= window.innerHeight * 0.4) currentId = sec.id;
    }
    navLinks.forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("href") === "#" + currentId);
    });
  }

  /* ---------- Counters ---------- */
  function animateCount(host) {
    host.querySelectorAll(".count").forEach(function (el) {
      const target = parseInt(el.getAttribute("data-count"), 10) || 0;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { el.textContent = target; return; }
      const dur = 1100; const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased);
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const menu = document.querySelector(".nav__links");
  burger.addEventListener("click", function () {
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
  navLinks.forEach(function (a) {
    a.addEventListener("click", function () {
      menu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Init ---------- */
  initTheme();
  initLang();
  initReveal();

  // Animate the hero stats once on load (they're visible immediately)
  const heroStats = document.querySelector(".hero__stats");
  if (heroStats) {
    heroStats.classList.add("count-host");
    animateCount(heroStats);
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
})();
