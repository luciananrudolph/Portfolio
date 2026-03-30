/* =============================================================
   PORTFOLIO SCRIPT OVERVIEW
   ─────────────────────────
   Features
     1. Translations (I18N) — multi-language text via [data-i18n]
     2. Language Switcher   — persisted to localStorage
     3. Reveal Animations   — char/line/image entrance effects
     4. Keyhole Scroll      — clip-path "window" on project pages
     5. Preloader           — poster + counter intro (homepage)
     6. Bootstrap           — DOMContentLoaded entry point

   Dependencies (all optional CDN)
     • GSAP 3 core          — animations
     • GSAP Flip            — preloader poster morph
     • GSAP SplitText       — text-reveal masks
     • GSAP ScrollTrigger   — scroll-driven keyhole + reveals

   Fallback behaviour
     If any GSAP library fails to load the site remains fully
     usable: hidden images are force-shown, the preloader is
     removed, and text renders without animation.
   ============================================================= */


/* =================================================
   1. TRANSLATIONS
   Dictionaries for all supported languages.
   Project / about pages extend these via Object.assign().
   ================================================= */

var I18N = {
  en: {
    p1_title: "Project 1", p1_sub: "Short descriptor",
    p2_title: "Project 2", p2_sub: "Short descriptor",
    p3_title: "Project 3", p3_sub: "Short descriptor",
    p4_title: "Project 4", p4_sub: "Short descriptor"
  },
  de: {
    p1_title: "Projekt 1", p1_sub: "Kurzbeschreibung",
    p2_title: "Projekt 2", p2_sub: "Kurzbeschreibung",
    p3_title: "Projekt 3", p3_sub: "Kurzbeschreibung",
    p4_title: "Projekt 4", p4_sub: "Kurzbeschreibung"
  },
  pt: {
    p1_title: "Projeto 1", p1_sub: "Descrição curta",
    p2_title: "Projeto 2", p2_sub: "Descrição curta",
    p3_title: "Projeto 3", p3_sub: "Descrição curta",
    p4_title: "Projeto 4", p4_sub: "Descrição curta"
  },
  es: {
    p1_title: "Proyecto 1", p1_sub: "Descripción breve",
    p2_title: "Proyecto 2", p2_sub: "Descripción breve",
    p3_title: "Proyecto 3", p3_sub: "Descripción breve",
    p4_title: "Proyecto 4", p4_sub: "Descripción breve"
  },
  it: {
    p1_title: "Progetto 1", p1_sub: "Descrizione breve",
    p2_title: "Progetto 2", p2_sub: "Descrizione breve",
    p3_title: "Progetto 3", p3_sub: "Descrizione breve",
    p4_title: "Progetto 4", p4_sub: "Descrizione breve"
  },
  nl: {
    p1_title: "Project 1", p1_sub: "Korte beschrijving",
    p2_title: "Project 2", p2_sub: "Korte beschrijving",
    p3_title: "Project 3", p3_sub: "Korte beschrijving",
    p4_title: "Project 4", p4_sub: "Korte beschrijving"
  }
};


/* =================================================
   2. LANGUAGE SWITCHER
   Applies translations to [data-i18n] elements
   and highlights the active language button.
   Persists choice in localStorage.
   ================================================= */

function setLanguage(lang) {
  var dict = I18N[lang] || I18N.en;
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach(function (el) {
    var key = el.getAttribute("data-i18n");
    if (dict[key]) el.textContent = dict[key];
  });

  document.querySelectorAll(".lang").forEach(function (btn) {
    var isActive = btn.dataset.lang === lang;
    btn.style.opacity = isActive ? "1" : "0.7";
    btn.setAttribute("aria-pressed", isActive);
  });

  /* Update dropdown trigger label if present */
  var activeLabel = document.getElementById("lang-active");
  if (activeLabel) activeLabel.textContent = lang.toUpperCase();

  localStorage.setItem("lang", lang);
}


/* =================================================
   3. REVEAL ANIMATIONS
   Titles  → char-by-char with mask (SplitText)
   Paragraphs → line-by-line with mask (SplitText)
   Images  → fade-up with stagger
   Called after preloader (homepage) or on load.
   Gracefully skipped when GSAP is missing.
   ================================================= */

function initReveals() {
  /* Fallback: if GSAP is missing, force-show hidden images */
  if (typeof gsap === "undefined") {
    document.querySelectorAll('[data-reveal="image"]').forEach(function (img) {
      img.style.visibility = "visible";
    });
    return;
  }

  var hasScroll  = typeof ScrollTrigger !== "undefined";
  var hasSplit   = typeof SplitText !== "undefined";
  var isSubpage  = !document.getElementById("preloader");
  var useScroll  = hasScroll && isSubpage;

  if (hasScroll) gsap.registerPlugin(ScrollTrigger);
  if (hasSplit)  gsap.registerPlugin(SplitText);

  /* Titles – char by char (requires SplitText) */
  if (hasSplit) {
    document.querySelectorAll('[data-reveal="title"]').forEach(function (el) {
      new SplitText(el, {
        type: "words, chars",
        autoSplit: true,
        mask: "chars",
        charsClass: "char",
        onSplit: function (self) {
          return gsap.from(self.chars, {
            duration: 1,
            yPercent: -120,
            scale: 1.2,
            stagger: 0.01,
            ease: "expo.out",
            scrollTrigger: useScroll
              ? { trigger: el, start: "top 90%" }
              : undefined,
          });
        },
      });
    });

    /* Paragraphs – line by line (requires SplitText) */
    document.querySelectorAll('[data-reveal="paragraph"]').forEach(function (el) {
      new SplitText(el, {
        type: "lines, words",
        autoSplit: true,
        mask: "lines",
        linesClass: "line",
        onSplit: function (self) {
          return gsap.from(self.lines, {
            duration: 0.9,
            yPercent: 105,
            stagger: 0.04,
            ease: "expo.out",
            scrollTrigger: useScroll
              ? { trigger: el, start: "top 90%" }
              : undefined,
          });
        },
      });
    });
  }

  /* Images – fade up with stagger */
  var images = document.querySelectorAll('[data-reveal="image"]');
  if (images.length) {
    gsap.fromTo(
      images,
      { yPercent: 100, autoAlpha: 0 },
      {
        yPercent: 0,
        autoAlpha: 1,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
      }
    );
  }

  /* Keyhole (project pages only) */
  initKeyhole();
}


/* =================================================
   4. KEYHOLE SCROLL EFFECT (project pages)
   Blue frame with a clip-path hole that opens up
   as you scroll through the hero section.
   Hidden completely once you scroll past the hero.
   Requires GSAP + ScrollTrigger.
   ================================================= */

function initKeyhole() {
  var keyhole = document.querySelector(".keyhole");
  var hero    = document.querySelector(".section--hero");

  if (!keyhole || !hero || typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") return;

  /* Frame with hole → fully open (no frame) */
  gsap.fromTo(
    keyhole,
    {
      clipPath:
        "polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%)",
    },
    {
      clipPath:
        "polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 100%, 100% 100%, 100% 0%)",
      scrollTrigger: {
        trigger: hero,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onLeave: function () {
          gsap.set(keyhole, { autoAlpha: 0 });
        },
        onEnterBack: function () {
          gsap.set(keyhole, { autoAlpha: 1 });
        },
      },
    }
  );

  /* Arrow fades out on scroll start */
  gsap.to(".scroll-arrow", {
    opacity: 0,
    scrollTrigger: {
      trigger: hero,
      start: "top top",
      end: "+=200",
      scrub: true,
    },
  });
}


/* =================================================
   5. PRELOADER (homepage only)
   Plays on load/reload, skipped when navigating
   back from a subpage. Counter 0 → 100 in 14 steps,
   then poster shrinks into .name and bg clips away.
   Returns true if preloader ran (reveals deferred).
   Requires GSAP + Flip plugin.
   ================================================= */

function initPreloader() {
  var preloader = document.getElementById("preloader");
  if (!preloader) return false;

  /* Fallback: remove preloader if GSAP or Flip is missing */
  if (typeof gsap === "undefined" || typeof Flip === "undefined") {
    preloader.remove();
    return false;
  }

  /* Skip when navigating back from a subpage */
  var navEntry = performance.getEntriesByType("navigation")[0];
  var cameFromSubpage =
    document.referrer.includes(location.origin) &&
    navEntry &&
    navEntry.type === "navigate";

  if (cameFromSubpage) {
    preloader.remove();
    return false;
  }

  gsap.registerPlugin(Flip);

  var background = document.getElementById("preloader-bg");
  var numberEl   = document.getElementById("preloader-number");
  var poster     = document.getElementById("preloader-poster");
  var nameEl     = document.querySelector(".name");
  var progress   = { value: 0 };

  var tl = gsap.timeline({
    onComplete: function () {
      preloader.classList.add("--done");
      poster.remove();
      initReveals();
    },
  });

  /* Counter 0 → 100 in 14 chunky steps (3 s) */
  tl.to(progress, {
    duration: 3,
    ease: "steps(14)",
    value: 100,
    onUpdate: function () {
      numberEl.textContent = Math.round(progress.value);
    },
  });

  /* Poster shrinks into .name and fades out */
  tl.add(function () {
    var r = nameEl.getBoundingClientRect();
    gsap.to(poster, {
      top: r.top,
      left: r.left,
      width: r.width,
      height: r.height,
      opacity: 0,
      duration: 1,
      ease: "expo.inOut",
    });
    gsap.to(numberEl, { opacity: 0, duration: 0.4, ease: "power2.out" });
  });

  /* Background clips away (runs in parallel with poster shrink) */
  tl.fromTo(
    background,
    { clipPath: "inset(0 0 0 0)" },
    { clipPath: "inset(100% 0 0 0)", duration: 1, ease: "expo.inOut" },
    "<"
  );

  return true;
}


/* =================================================
   6. PAGE TRANSITIONS (Flip-based)
   Homepage name link → CV page title (and reverse).
   ================================================= */

function initTransitions() {
  if (typeof gsap === "undefined" || typeof Flip === "undefined") return;
  gsap.registerPlugin(Flip);

  var cvTitle  = document.getElementById("cv-title");
  var nameLink = document.getElementById("cv-name-link");
  var isCV     = !!cvTitle;
  var isHome   = !!document.getElementById("preloader");

  /* ── Homepage: intercept name link click ── */
  if (isHome) {
    var homeNameLink = document.querySelector('.name[href="pages/about.html"]');
    if (homeNameLink) {
      homeNameLink.addEventListener("click", function (e) {
        e.preventDefault();
        var rect = homeNameLink.getBoundingClientRect();
        sessionStorage.setItem("flipState", JSON.stringify({
          top: rect.top, left: rect.left,
          width: rect.width, height: rect.height,
          fontSize: getComputedStyle(homeNameLink).fontSize,
          letterSpacing: getComputedStyle(homeNameLink).letterSpacing
        }));
        gsap.to([".stage", ".langs"], {
          opacity: 0, duration: 0.3, ease: "power2.in",
          onComplete: function () { window.location.href = homeNameLink.href; }
        });
      });
    }
  }

  /* ── CV page: Flip in + reveal sections ── */
  if (isCV) {
    var sections = document.querySelectorAll("[data-cv-reveal]");
    var raw = sessionStorage.getItem("flipState");

    function revealCV() {
      /* Each section reveals on scroll */
      var revealObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          var el = entry.target;
          if (entry.isIntersecting) {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: "expo.out" });

            el.querySelectorAll(".cv-lang-fill").forEach(function (bar, i) {
              var level = bar.getAttribute("data-level") || 0;
              gsap.to(bar, { width: level + "%", duration: 1, delay: i * 0.06, ease: "power3.out" });
            });

            el.querySelectorAll(".cv-skill-fill").forEach(function (fill, i) {
              var level = fill.getAttribute("data-skill") || 0;
              gsap.to(fill, { width: level + "%", duration: 1, delay: i * 0.06, ease: "power3.out" });
            });
          } else {
            gsap.set(el, { opacity: 0, y: 30 });

            el.querySelectorAll(".cv-lang-fill").forEach(function (bar) {
              gsap.set(bar, { width: "0%" });
            });

            el.querySelectorAll(".cv-skill-fill").forEach(function (fill) {
              gsap.set(fill, { width: "0%" });
            });
          }
        });
      }, { threshold: 0.15 });

      sections.forEach(function (s) { revealObs.observe(s); });

      /* Experience entries: reveal one by one on scroll */
      var entryObs = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("--visible");
          } else {
            entry.target.classList.remove("--visible");
          }
        });
      }, { threshold: 0.2 });

      document.querySelectorAll(".cv-entry").forEach(function (el) {
        entryObs.observe(el);
      });

      /* Experience section title also hidden until scroll */
      var expTitle = document.querySelector(".cv-experience .cv-section-title");
      if (expTitle) {
        expTitle.style.opacity = "0";
        expTitle.style.transform = "translateY(20px)";
        expTitle.style.transition = "opacity 0.4s ease, transform 0.4s ease";
        var titleObs = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            titleObs.disconnect();
          });
        }, { threshold: 0.2 });
        titleObs.observe(expTitle);
      }
    }

    /* ── Outside the Studio: toggle cards on tap (mobile) ── */
    document.querySelectorAll("[data-outside-card]").forEach(function (card) {
      card.addEventListener("click", function () {
        var isOpen = card.getAttribute("aria-expanded") === "true";
        /* Close all other cards */
        document.querySelectorAll("[data-outside-card]").forEach(function (c) {
          c.setAttribute("aria-expanded", "false");
        });
        /* Toggle clicked card */
        if (!isOpen) card.setAttribute("aria-expanded", "true");
      });
    });

    if (raw && nameLink) {
      sessionStorage.removeItem("flipState");
      var prev = JSON.parse(raw);

      /* Hide real title, position name link at old spot */
      gsap.set(cvTitle, { visibility: "hidden" });
      gsap.set(nameLink, {
        position: "fixed", top: prev.top, left: prev.left,
        width: prev.width, fontSize: prev.fontSize,
        letterSpacing: prev.letterSpacing, zIndex: 100
      });

      var flipState = Flip.getState(nameLink);

      /* Move name link to title position */
      var titleRect = cvTitle.getBoundingClientRect();
      var titleStyle = getComputedStyle(cvTitle);
      gsap.set(nameLink, {
        position: "fixed", top: titleRect.top, left: titleRect.left,
        width: titleRect.width, fontSize: titleStyle.fontSize,
        letterSpacing: titleStyle.letterSpacing
      });

      Flip.from(flipState, {
        duration: 0.9, ease: "expo.inOut",
        onComplete: function () {
          gsap.set(cvTitle, { visibility: "visible" });
          nameLink.removeAttribute("style");
          revealCV();
        }
      });
    } else {
      /* Direct visit — show everything */
      gsap.set(cvTitle, { visibility: "visible" });
      revealCV();
    }

    /* ── Leaving CV: reverse the Flip ── */
    function handleLeave(e, link) {
      e.preventDefault();
      gsap.to(sections, {
        opacity: 0, y: -20, duration: 0.3, ease: "power2.in"
      });
      if (nameLink) {
        var state = Flip.getState(cvTitle);
        var nameRect = nameLink.getBoundingClientRect();
        gsap.set(cvTitle, {
          position: "fixed", top: nameRect.top, left: nameRect.left,
          width: nameRect.width,
          fontSize: getComputedStyle(nameLink).fontSize,
          letterSpacing: getComputedStyle(nameLink).letterSpacing,
          zIndex: 100
        });
        gsap.set(nameLink, { opacity: 0 });
        Flip.from(state, {
          duration: 0.7, ease: "expo.inOut",
          onComplete: function () { window.location.href = link.href; }
        });
      } else {
        window.location.href = link.href;
      }
    }

    var backLink = document.querySelector('.back[href="../index.html"]');
    if (backLink) {
      backLink.addEventListener("click", function (e) { handleLeave(e, backLink); });
    }
    if (nameLink) {
      nameLink.addEventListener("click", function (e) { handleLeave(e, nameLink); });
    }
  }
}


/* =================================================
   7. BOOTSTRAP
   Language → preloader OR reveals → transitions.
   ================================================= */

/* =================================================
   HEADER COLOR AUTO-DETECT
   Samples the element behind the header and toggles
   .--inverted when the background is coloured/dark.
   ================================================= */

function initHeaderColorDetect() {
  var header = document.querySelector(".top");
  if (!header) return;

  function isLight(r, g, b) {
    /* Perceived brightness (ITU-R BT.709) */
    return (r * 0.299 + g * 0.587 + b * 0.114) > 186;
  }

  function isNearWhite(r, g, b) {
    return r > 230 && g > 230 && b > 230;
  }

  function check() {
    var rect = header.getBoundingClientRect();
    var x = rect.left + rect.width / 2;
    var y = rect.top + rect.height / 2;

    header.style.pointerEvents = "none";
    header.style.visibility = "hidden";
    var el = document.elementFromPoint(x, y);
    header.style.visibility = "";
    header.style.pointerEvents = "";

    if (!el) return;

    var bg = getComputedStyle(el).backgroundColor;
    var m = bg.match(/\d+/g);
    if (!m || m.length < 3) return;

    var r = +m[0], g = +m[1], b = +m[2];
    var a = m.length > 3 ? +m[3] : 1;

    if (el.closest(".block--intro") || el.classList.contains("block--intro__image") || el.classList.contains("block--intro__overlay")) {
      header.classList.add("--inverted");
    } else if (a < 0.1 || isNearWhite(r, g, b)) {
      header.classList.remove("--inverted");
    } else {
      header.classList.add("--inverted");
    }
  }

  check();
  window.addEventListener("scroll", function () {
    requestAnimationFrame(check);
  }, { passive: true });
  window.addEventListener("resize", check);
}


document.addEventListener("DOMContentLoaded", function () {
  /* Apply saved language (default: English) */
  setLanguage(localStorage.getItem("lang") || "en");

  /* Hook language buttons */
  document.querySelectorAll(".lang").forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLanguage(btn.dataset.lang);
    });
  });

  /* Preloader defers reveals until it finishes;
     otherwise start reveals immediately. */
  if (!initPreloader()) {
    initReveals();
  }

  /* Page transitions */
  initTransitions();

  /* Custom cursor */
  initCursor();

  /* Auto-detect header colour */
  initHeaderColorDetect();
});


/* =================================================
   8. CUSTOM CURSOR
   Filled blue circle → outline on clickable elements.
   ================================================= */

function initCursor() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  var cursor = document.createElement("div");
  cursor.className = "cursor";
  document.body.appendChild(cursor);

  var mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener("mousemove", function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  function tick() {
    cx += (mx - cx) * 0.35;
    cy += (my - cy) * 0.35;
    cursor.style.left = cx + "px";
    cursor.style.top = cy + "px";
    requestAnimationFrame(tick);
  }
  tick();

  var clickables = "a, button, input, textarea, select, [role='button'], label";

  document.addEventListener("mouseover", function (e) {
    if (e.target.closest(clickables)) {
      cursor.classList.add("--clickable");
    }
  });

  document.addEventListener("mouseout", function (e) {
    if (e.target.closest(clickables)) {
      cursor.classList.remove("--clickable");
    }
  });
}
