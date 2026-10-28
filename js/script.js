/* =============================================================
   Swastik Chowbay — Personal site
   Theme · Reading progress · Nav · Reveals · Citations · GitHub · Contact · Booking
   ============================================================= */

(() => {
  'use strict';

  /* ---------- 1. THEME TOGGLE ---------- */

  const root = document.documentElement;
  const themeBtn = document.getElementById('theme-toggle');

  const saved = localStorage.getItem('theme');
  // Paper (light) is the default look; dark is opt-in
  if (saved !== 'dark') root.classList.add('theme-light');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isLight = root.classList.toggle('theme-light');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      themeBtn.setAttribute('aria-pressed', isLight);
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

  const sectionIds = ['about', 'research', 'highlights', 'publications', 'observations', 'talks', 'funding', 'news', 'mentorship', 'code', 'contact'];
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

  const revealTargets = document.querySelectorAll('[data-reveal], .section__head, .about, .themes, .pubs, .talks, .news, .projects, .mentees, .service, .repos, .contact, .highlights__grid, .funding');
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
        const color = langColors[lang] || '#5fe1ff';
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
        window.location.href = `mailto:swastik.chowbay@unimi.it?subject=${subject}&body=${body}`;
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

  /* ---------- 10. BOOKING MODAL (Cal.com) ---------- */

  const bookFab = document.getElementById('book-fab');
  const bookModal = document.getElementById('book-modal');
  const calEmbed = document.getElementById('cal-embed');

  if (bookFab && bookModal && calEmbed) {
    const calLink = calEmbed.dataset.calLink;
    let embedLoaded = false;

    function openModal() {
      bookModal.classList.add('is-open');
      bookModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      // Lazy-load the Cal.com embed only when first opened
      if (!embedLoaded && calLink && !calLink.includes('YOUR_CALCOM')) {
        // Cal.com inline embed — no JS library needed.
        // Theme parameter matches the site's current theme.
        const isLight = document.documentElement.classList.contains('theme-light');
        const theme = isLight ? 'light' : 'dark';
        calEmbed.innerHTML = `<iframe
          src="https://cal.com/${calLink}?embed=true&theme=${theme}"
          loading="lazy"
          title="Book a meeting with Dr. Swastik via Cal.com"
          referrerpolicy="strict-origin-when-cross-origin"
          allow="payment; clipboard-write"
        ></iframe>`;
        embedLoaded = true;
      }
    }

    function closeModal() {
      bookModal.classList.remove('is-open');
      bookModal.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
    }

    bookFab.addEventListener('click', openModal);

    // Any element with data-close-modal closes (backdrop + close button)
    bookModal.querySelectorAll('[data-close-modal]').forEach(el => {
      el.addEventListener('click', closeModal);
    });

    // ESC key to close
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookModal.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Re-load embed if theme changes while modal is open (rare but nice)
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        if (embedLoaded && bookModal.classList.contains('is-open')) {
          embedLoaded = false;
          // Reset to fallback then re-load with new theme
          calEmbed.innerHTML = `<div class="book-modal__fallback"><p>Reloading…</p></div>`;
          setTimeout(openModal, 100);
        }
      });
    }
  }

})();
