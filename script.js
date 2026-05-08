/* =============================================================
   Swastik Chowbay — Personal site
   Starfield · GitHub fetch · Scroll spy · Reveal · Contact form
   ============================================================= */

(() => {
  'use strict';

  /* ---------- 1. Animated star field ---------- */

  const canvas = document.getElementById('starfield');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];
    let shootingStars = [];
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.scale(dpr, dpr);

      // Density scales with screen
      const count = Math.floor((window.innerWidth * window.innerHeight) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 1.2 + 0.2,
        a: Math.random() * 0.6 + 0.2,
        twinkleSpeed: Math.random() * 0.015 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
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

      // Static stars
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

        // Trail
        for (let j = 0; j < ss.trail.length; j++) {
          const p = ss.trail[j];
          const a = (j / ss.trail.length) * ss.life * 0.8;
          ctx.fillStyle = `rgba(183, 148, 255, ${a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
        // Head
        ctx.fillStyle = `rgba(255, 255, 255, ${ss.life})`;
        ctx.beginPath();
        ctx.arc(ss.x, ss.y, 1.6, 0, Math.PI * 2);
        ctx.fill();

        if (ss.life <= 0 || ss.x > window.innerWidth + 50 || ss.y > window.innerHeight + 50) {
          shootingStars.splice(i, 1);
        }
      }

      // Occasional shooting stars
      if (Math.random() < 0.003 && shootingStars.length < 2) spawnShootingStar();

      frame++;
      requestAnimationFrame(draw);
    }

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resize();
    if (!reduceMotion) {
      draw();
    } else {
      // Render a single static frame
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

  /* ---------- 2. Nav: scroll-state + mobile toggle + active link ---------- */

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

  // Scroll-spy: highlight current section in nav
  const sections = ['about', 'research', 'projects', 'code', 'contact']
    .map(id => document.getElementById(id))
    .filter(Boolean);

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

  /* ---------- 3. Reveal-on-scroll ---------- */

  const revealTargets = document.querySelectorAll(
    '.about, .papers, .projects, .mentees, .repos, .contact, .section__head'
  );
  revealTargets.forEach(el => el.classList.add('reveal'));

  if ('IntersectionObserver' in window) {
    const revealer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -80px 0px' });
    revealTargets.forEach(el => revealer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add('is-visible'));
  }

  /* ---------- 4. GitHub repo fetch ---------- */

  // Languages → colours roughly matching GitHub's palette
  const langColors = {
    'Python': '#3572A5',
    'Jupyter Notebook': '#DA5B0B',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Shell': '#89e051',
    'C': '#555555',
    'C++': '#f34b7d',
    'Java': '#b07219',
    'IDL': '#a3522f',
    'R': '#198CE7',
    'Fortran': '#4d41b1',
    'TeX': '#3D6117'
  };

  const reposEl = document.getElementById('repos');

  async function loadRepos() {
    if (!reposEl) return;
    try {
      const res = await fetch('https://api.github.com/users/SwastikC/repos?sort=updated&per_page=100');
      if (!res.ok) throw new Error('HTTP ' + res.status);
      let repos = await res.json();
      // Filter forks and the site repo itself if present
      repos = repos
        .filter(r => !r.fork)
        .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
        .slice(0, 8);

      if (repos.length === 0) {
        reposEl.innerHTML = `<div class="repos__empty"><p>No public repositories yet — check back soon.</p></div>`;
        return;
      }

      reposEl.innerHTML = repos.map(repo => {
        const lang = repo.language || 'Other';
        const color = langColors[lang] || '#b794ff';
        const desc = repo.description
          ? escapeHtml(repo.description)
          : '<em style="opacity:0.6">No description provided.</em>';
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
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
  function escapeAttr(s) { return escapeHtml(s); }

  loadRepos();

  /* ---------- 5. Contact form → mailto ---------- */

  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const subject = encodeURIComponent(`Website contact from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:swastik.chowbay@iiap.res.in?subject=${subject}&body=${body}`;
    });
  }

})();
