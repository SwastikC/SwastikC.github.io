/* =============================================================
   Swastik Chowbay — Personal site
   Three.js cosmos · Theme · Reading progress · Citations · GitHub
   ============================================================= */

(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. THEME TOGGLE ---------- */

  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');

  const saved = localStorage.getItem('theme');
  if (saved === 'light') root.classList.add('theme-light');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = root.classList.toggle('theme-light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.setAttribute('aria-pressed', isLight);
    });
  }

  /* ---------- 2. STAR FIELD BACKGROUND (canvas, elegant) ---------- */

  // We use the canvas star field — Three.js with planets felt too cartoony.
  // Canvas stars + aurora glow is more atmospheric.
  initCanvasStarfield();

  function initCanvasStarfield() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const count = Math.floor((window.innerWidth * window.innerHeight) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        // 15% of stars get a colored tint
        hue: Math.random() < 0.15 ? (Math.random() < 0.5 ? 280 : 330) : 0
      }));
    }

    function spawnShootingStar() {
      const startSide = Math.random();
      let x, y, vx, vy;
      if (startSide < 0.5) {
        x = Math.random() * window.innerWidth;
        y = -20;
        vx = (Math.random() - 0.5) * 4;
        vy = Math.random() * 4 + 4;
      } else {
        x = -20;
        y = Math.random() * window.innerHeight * 0.6;
        vx = Math.random() * 4 + 4;
        vy = Math.random() * 2 + 1;
      }
      shootingStars.push({ x, y, vx, vy, life: 1, trail: [] });
    }

    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const t = frame * 0.01;

      for (const s of stars) {
        const alpha = s.a + Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset) * 0.3;
        const a = Math.max(0.05, Math.min(1, alpha));
        if (s.hue) {
          ctx.fillStyle = `hsla(${s.hue}, 80%, 75%, ${a})`;
        } else {
          ctx.fillStyle = `rgba(232, 230, 255, ${a})`;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.trail.push({ x: ss.x, y: ss.y });
        if (ss.trail.length > 12) ss.trail.shift();
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= 0.012;

        for (let j = 0; j < ss.trail.length; j++) {
          const p = ss.trail[j];
          const a = (j / ss.trail.length) * ss.life * 0.8;
          ctx.fillStyle = `rgba(183, 148, 255, ${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.life})`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (ss.life <= 0 || ss.x > window.innerWidth + 50 || ss.y > window.innerHeight + 50) {
          shootingStars.splice(i, 1);
        }
      }

      // Occasional shooting stars (rare so they feel special)
      if (Math.random() < 0.003 && shootingStars.length < 2) spawnShootingStar();

      frame++;
      requestAnimationFrame(draw);
    }

    resize();
    if (!reduceMotion) {
      draw();
    } else {
      // Render a single static frame for reduced-motion users
      for (const s of stars) {
        ctx.fillStyle = `rgba(232, 230, 255, ${s.a})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resize, 200);
    });
  }

  /* ---------- 3. READING PROGRESS BAR ---------- */

  const progress = document.getElementById('progress-bar');
  if (progress) {
    window.addEventListener('scroll', () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const pct = Math.min(100, Math.max(0, (window.scrollY / docH) * 100));
      progress.style.transform = `scaleX(${pct / 100})`;
    }, { passive: true });
  }

  /* ---------- 4. NAV: scroll state, mobile toggle, scroll spy ---------- */

  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('[data-link]');
  const navToggle = document.querySelector('.nav__toggle');
  const navMenu = document.querySelector('.nav__links');

  window.addEventListener('scroll', () => {
    if (!nav) return;
    nav.classList.toggle('is-scrolled', window.scrollY > 24);
  }, { passive: true });

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const open = navMenu.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', open);
    });
    navMenu.addEventListener('click', (e) => {
      if (e.target.tagName === 'A') {
        navMenu.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const sectionIds = ['about', 'research', 'highlights', 'publications', 'talks', 'news', 'projects', 'methodology', 'code', 'contact'];
  const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(a => {
            a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- 5. SCROLL-DRIVEN REVEALS (more dramatic) ---------- */

  const revealTargets = document.querySelectorAll('[data-reveal], .section__head, .about, .themes, .pubs, .talks, .news, .projects, .mentees, .repos, .contact, .highlights__grid, .methodology__grid, .viz');
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealTargets.forEach(el => revealer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 6. CITATION COPY (BibTeX) ---------- */

  document.querySelectorAll('[data-cite]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const bibtex = btn.dataset.cite;
      try {
        await navigator.clipboard.writeText(bibtex);
        const orig = btn.textContent;
        btn.textContent = '✓ Copied';
        btn.classList.add('is-copied');
        setTimeout(() => {
          btn.textContent = orig;
          btn.classList.remove('is-copied');
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
        btn.textContent = 'Copy failed';
      }
    });
  });

  /* ---------- 7. EXOPLANET DATA VISUALIZATION ---------- */

  const vizCanvas = document.getElementById('viz-canvas');
  if (vizCanvas) initExoplanetViz(vizCanvas);

  function initExoplanetViz(canvas) {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const tooltip = document.getElementById('viz-tooltip');

    // === REAL DATA from Swastik et al. 2021, AJ 161, 114, Table 1 ===
    // Directly imaged planet host stars: 22 systems, [Fe/H] from this paper
    // (group 1: 18 stars analyzed, group 2: 4 stars with lit. values)
    const data = [
      { name: "HD 106906",   feh: 0.04,  mass: 11,    age: 0.013 },
      { name: "AB Pic",      feh: 0.04,  mass: 13.5,  age: 0.0175 },
      { name: "GJ 504",      feh: 0.27,  mass: 4.0,   age: 0.16 },
      { name: "HN Peg",      feh: 0.00,  mass: 22.0,  age: 0.237 },
      { name: "51 Eri",      feh: 0.13,  mass: 2.0,   age: 0.020 },
      { name: "HR 2562",     feh: 0.21,  mass: 30,    age: 0.6 },
      { name: "Fomalhaut",   feh: 0.13,  mass: 2.6,   age: 0.44 },
      { name: "HR 8799",     feh: -0.65, mass: 7,     age: 0.030 },
      { name: "HD 203030",   feh: 0.30,  mass: 24.1,  age: 0.22 },
      { name: "HD 95086",    feh: 0.14,  mass: 5,     age: 0.017 },
      { name: "Beta Pic",    feh: -0.21, mass: 11,    age: 0.0125 },
      { name: "HIP 78530",   feh: -0.50, mass: 23,    age: 0.011 },
      { name: "LkCa 15",     feh: 0.26,  mass: 8,     age: 0.001 },
      { name: "PDS 70",      feh: -0.11, mass: 8,     age: 0.005 },
      { name: "CT Cha",      feh: -0.56, mass: 17,    age: 0.002 },
      { name: "GQ Lup",      feh: -0.35, mass: 20,    age: 0.001 },
      { name: "ROXs 12",     feh: 0.14,  mass: 16,    age: 0.006 },
      { name: "GSC 06214",   feh: -0.06, mass: 16,    age: 0.011 },
      { name: "HIP 65426",   feh: -0.03, mass: 9.0,   age: 0.014 },
      { name: "Kappa And",   feh: -0.36, mass: 13.6,  age: 0.22 },
      { name: "GU Psc",      feh: 0.10,  mass: 11.3,  age: 0.10 },
      { name: "Ross 458",    feh: 0.25,  mass: 6.3,   age: 0.475 }
    ];

    // Categorize by mass
    data.forEach(d => {
      if (d.mass < 5) d.category = 'jupiter';        // 1-5 MJ: Jupiters
      else if (d.mass <= 13) d.category = 'super';   // 5-13 MJ: super-Jupiters
      else d.category = 'bd';                         // 13+ MJ: brown dwarfs
    });

    let view = { mode: 'metallicity' };
    let hovered = null;

    function resize() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      draw();
    }

    const colors = {
      jupiter: '#6be1ff',     // 1-5 MJ — Jupiters (low mass DIPs)
      super:   '#ff6aa6',     // 5-13 MJ — super-Jupiters
      bd:      '#ffd166'      // 13+ MJ — brown dwarfs
    };

    const labels = {
      jupiter: 'JUPITER',
      super:   'SUPER-JUPITER',
      bd:      'BROWN DWARF'
    };

    function getColor(d) {
      return colors[d.category] || '#b794ff';
    }

    function getStyles() {
      const isLight = document.documentElement.classList.contains('theme-light');
      return {
        ink: isLight ? '#1a1148' : '#e8e6ff',
        inkMute: isLight ? '#5d4d8a' : '#9a93c4',
        inkDim: isLight ? '#928bb5' : '#6b6493',
        line: isLight ? 'rgba(26, 17, 72, 0.15)' : 'rgba(183, 148, 255, 0.18)',
        gridLine: isLight ? 'rgba(26, 17, 72, 0.06)' : 'rgba(183, 148, 255, 0.08)'
      };
    }

    function draw() {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const styles = getStyles();
      const padL = 60, padR = 20, padT = 30, padB = 50;
      const plotW = w - padL - padR;
      const plotH = h - padT - padB;

      ctx.clearRect(0, 0, w, h);

      // Axis ranges (real Swastik 2021 data: -0.65 < [Fe/H] < 0.30, 0.001 < age < 0.6 Gyr, 2 < M < 30 MJ)
      const xMin = view.mode === 'metallicity' ? -0.75 : -3.2;
      const xMax = view.mode === 'metallicity' ? 0.45 : 0.0;
      const yMin = 0.1;   // log MJ
      const yMax = 1.6;

      const x2px = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
      const y2px = (logM) => padT + plotH - ((logM - yMin) / (yMax - yMin)) * plotH;

      // Grid lines
      ctx.strokeStyle = styles.gridLine;
      ctx.lineWidth = 1;
      const xTicks = view.mode === 'metallicity'
        ? [-0.6, -0.4, -0.2, 0, 0.2, 0.4]
        : [-3, -2.5, -2, -1.5, -1, -0.5, 0];   // log Gyr
      xTicks.forEach(t => {
        const px = x2px(t);
        ctx.beginPath();
        ctx.moveTo(px, padT);
        ctx.lineTo(px, padT + plotH);
        ctx.stroke();
      });
      const yTicks = [0.3, 0.7, 1.0, 1.3];   // ~ 2, 5, 10, 20 MJ
      yTicks.forEach(t => {
        const py = y2px(t);
        ctx.beginPath();
        ctx.moveTo(padL, py);
        ctx.lineTo(padL + plotW, py);
        ctx.stroke();
      });

      // Axes
      ctx.strokeStyle = styles.line;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(padL, padT);
      ctx.lineTo(padL, padT + plotH);
      ctx.lineTo(padL + plotW, padT + plotH);
      ctx.stroke();

      // Tick labels
      ctx.fillStyle = styles.inkDim;
      ctx.font = '11px "JetBrains Mono", monospace';
      ctx.textAlign = 'center';
      xTicks.forEach(t => {
        let lbl;
        if (view.mode === 'metallicity') {
          lbl = (t > 0 ? '+' : '') + t.toFixed(1);
        } else {
          // Convert log10(Gyr) to readable Myr
          const gyr = Math.pow(10, t);
          const myr = gyr * 1000;
          lbl = myr < 10 ? myr.toFixed(0) + ' Myr' : myr < 1000 ? myr.toFixed(0) + ' Myr' : (gyr).toFixed(1) + ' Gyr';
        }
        ctx.fillText(lbl, x2px(t), padT + plotH + 16);
      });
      ctx.textAlign = 'right';
      yTicks.forEach(t => {
        const m = Math.pow(10, t);
        ctx.fillText(m.toFixed(m < 10 ? 1 : 0), padL - 8, y2px(t) + 4);
      });

      // Axis labels
      ctx.fillStyle = styles.inkMute;
      ctx.font = '12px "IBM Plex Sans", sans-serif';
      ctx.textAlign = 'center';
      const xLabel = view.mode === 'metallicity'
        ? 'Stellar metallicity [Fe/H] (dex)'
        : 'Stellar age (log scale)';
      ctx.fillText(xLabel, padL + plotW / 2, h - 12);
      ctx.save();
      ctx.translate(15, padT + plotH / 2);
      ctx.rotate(-Math.PI / 2);
      ctx.fillText('Planet mass (M_Jup)', 0, 0);
      ctx.restore();

      // Plot points
      data.forEach((d, i) => {
        const xVal = view.mode === 'metallicity' ? d.feh : Math.log10(d.age);
        const px = x2px(xVal);
        const py = y2px(Math.log10(d.mass));
        const r = hovered === d ? 9 : 6;
        ctx.fillStyle = getColor(d);
        ctx.globalAlpha = hovered === d ? 1 : 0.85;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
        // Subtle outline always
        ctx.strokeStyle = hovered === d ? styles.ink : 'rgba(255,255,255,0.3)';
        ctx.lineWidth = hovered === d ? 1.8 : 1;
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    resize();
    window.addEventListener('resize', resize);

    // Hit detection
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      const padL = 60, padR = 20, padT = 30, padB = 50;
      const plotW = w - padL - padR;
      const plotH = h - padT - padB;
      const xMin = view.mode === 'metallicity' ? -0.75 : -3.2;
      const xMax = view.mode === 'metallicity' ? 0.45 : 0.0;
      const yMin = 0.1, yMax = 1.6;
      const x2px = (x) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
      const y2px = (logM) => padT + plotH - ((logM - yMin) / (yMax - yMin)) * plotH;

      let nearest = null, nearestDist = 12;
      data.forEach(d => {
        const xVal = view.mode === 'metallicity' ? d.feh : Math.log10(d.age);
        const px = x2px(xVal);
        const py = y2px(Math.log10(d.mass));
        const dist = Math.hypot(mx - px, my - py);
        if (dist < nearestDist) { nearest = d; nearestDist = dist; }
      });

      if (nearest !== hovered) {
        hovered = nearest;
        draw();
        if (hovered && tooltip) {
          tooltip.style.display = 'block';
          tooltip.style.left = (mx + 12) + 'px';
          tooltip.style.top = (my + 12) + 'px';
          const mass = hovered.mass < 10 ? hovered.mass.toFixed(1) : hovered.mass.toFixed(0);
          const ageStr = hovered.age < 0.01
            ? (hovered.age * 1000).toFixed(0) + ' Myr'
            : hovered.age < 1
              ? (hovered.age * 1000).toFixed(0) + ' Myr'
              : hovered.age.toFixed(2) + ' Gyr';
          const fehStr = (hovered.feh > 0 ? '+' : '') + hovered.feh.toFixed(2);
          tooltip.innerHTML = `
            <div class="viz-tt__name">${hovered.name}</div>
            <div class="viz-tt__cat" style="color:${getColor(hovered)}">${labels[hovered.category]}</div>
            <div><strong>${mass}</strong> M<sub>Jup</sub></div>
            <div>[Fe/H] = ${fehStr}</div>
            <div>Age = ${ageStr}</div>
          `;
        } else if (tooltip) {
          tooltip.style.display = 'none';
        }
      } else if (hovered && tooltip) {
        tooltip.style.left = (mx + 12) + 'px';
        tooltip.style.top = (my + 12) + 'px';
      }
    });

    canvas.addEventListener('mouseleave', () => {
      hovered = null;
      if (tooltip) tooltip.style.display = 'none';
      draw();
    });

    // View toggle buttons
    document.querySelectorAll('[data-viz-mode]').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('[data-viz-mode]').forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        view.mode = btn.dataset.vizMode;
        draw();
      });
    });

    // Re-draw on theme change
    if (themeBtn) {
      themeBtn.addEventListener('click', () => setTimeout(draw, 50));
    }
  }

  /* ---------- 8. GITHUB REPO FETCH ---------- */

  const langColors = {
    'Python': '#3572A5', 'Jupyter Notebook': '#DA5B0B', 'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6', 'HTML': '#e34c26', 'CSS': '#563d7c', 'Shell': '#89e051',
    'C': '#555555', 'C++': '#f34b7d', 'Java': '#b07219', 'IDL': '#a3522f',
    'R': '#198CE7', 'Fortran': '#4d41b1', 'TeX': '#3D6117'
  };

  const reposEl = document.getElementById('repos');

  async function loadRepos() {
    if (!reposEl) return;
    try {
      const res = await fetch('https://api.github.com/users/SwastikC/repos?sort=updated&per_page=100');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      let repos = await res.json();
      repos = repos.filter(r => !r.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 8);

      if (repos.length === 0) {
        reposEl.innerHTML = `<div class="repos__empty"><p>No public repositories yet — check back soon.</p></div>`;
        return;
      }

      reposEl.innerHTML = repos.map(repo => {
        const lang = repo.language || 'Other';
        const color = langColors[lang] || '#b794ff';
        const desc = repo.description ? escapeHtml(repo.description) : '<em style="opacity:0.6">No description provided.</em>';
        return `
          <a class="repo" href="${escapeAttr(repo.html_url)}" target="_blank" rel="noopener">
            <div class="repo__name">
              <svg class="repo__icon" viewBox="0 0 16 16" aria-hidden="true">
                <path d="M2 2.5A2.5 2.5 0 0 1 4.5 0h8.75a.75.75 0 0 1 .75.75v12.5a.75.75 0 0 1-.75.75h-2.5a.75.75 0 0 1 0-1.5h1.75v-2h-8a1 1 0 0 0-.714 1.7.75.75 0 1 1-1.072 1.05A2.495 2.495 0 0 1 2 11.5Zm10.5-1h-8a1 1 0 0 0-1 1v6.708A2.486 2.486 0 0 1 4.5 9h8ZM5 12.25a.25.25 0 0 1 .25-.25h3.5a.25.25 0 0 1 .25.25v3.25a.25.25 0 0 1-.4.2l-1.45-1.087a.249.249 0 0 0-.3 0L5.4 15.7a.25.25 0 0 1-.4-.2Z"/>
              </svg>
              ${escapeHtml(repo.name)}
            </div>
            <p class="repo__desc">${desc}</p>
            <div class="repo__meta">
              <span class="repo__lang">
                <span class="repo__lang-dot" style="background:${color}"></span>
                ${escapeHtml(lang)}
              </span>
              <span class="repo__stat">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.75.75 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z"/></svg>
                ${repo.stargazers_count}
              </span>
              <span class="repo__stat">
                <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z"/></svg>
                ${repo.forks_count}
              </span>
            </div>
          </a>
        `;
      }).join('');
    } catch (err) {
      reposEl.innerHTML = `
        <div class="repos__error">
          <p>Couldn't load live repos right now.</p>
          <p><a href="https://github.com/SwastikC" target="_blank" rel="noopener">Browse them on GitHub →</a></p>
        </div>`;
      console.warn('GitHub fetch failed:', err);
    }
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function escapeAttr(s) { return escapeHtml(s); }

  loadRepos();

  /* ---------- 9. CONTACT FORM (Formspree) ---------- */

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('form-status');
      const submitBtn = form.querySelector('button[type=submit]');
      const formData = new FormData(form);

      // Formspree endpoint — REPLACE THIS URL with your own
      // (See SEO-ACTION-PLAN.md or README.md for setup steps)
      const endpoint = form.dataset.endpoint;

      if (!endpoint || endpoint.includes('YOUR_FORMSPREE_ID')) {
        // Fallback to mailto if Formspree isn't configured yet
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        const subject = encodeURIComponent(`Website contact from ${name}`);
        const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
        window.location.href = `mailto:swastik.chowbay@iiap.res.in?subject=${subject}&body=${body}`;
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          body: formData,
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          status.textContent = 'Thanks — message sent!';
          status.className = 'form-status form-status--ok';
          form.reset();
        } else {
          throw new Error('Failed');
        }
      } catch (err) {
        status.textContent = 'Hmm, something went wrong. Please email directly.';
        status.className = 'form-status form-status--err';
      } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Send message <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14m0 0l-6-6m6 6l-6 6"/></svg>';
      }
    });
  }

})();
