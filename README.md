# swastikc.github.io

Personal site → live at **https://swastikc.github.io**

## How this works (so you don't forget again 🙂)

This is a **GitHub Pages** site. Any files in this repo's main branch get
served at the URL above. There is no build step — the browser loads
`index.html`, `style.css`, and `script.js` directly.

## Updating the site

### Easiest: edit on github.com
1. Go to <https://github.com/SwastikC/swastikc.github.io>
2. Click any file → pencil icon → make changes → **Commit changes**
3. Wait ~1 minute, refresh your live site

### Better: clone and edit locally
```bash
git clone https://github.com/SwastikC/swastikc.github.io.git
cd swastikc.github.io
# edit files in any code editor
git add .
git commit -m "Describe your change"
git push
```

To preview locally before pushing:
```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## File map

| File         | Purpose                                                    |
|--------------|------------------------------------------------------------|
| `index.html` | The whole site (single-page, all sections)                 |
| `style.css`  | Cosmic dark theme, typography, layout                      |
| `script.js`  | Star field animation, GitHub repo fetcher, scroll spy      |
| `hero.png`   | Hero background image                                      |
| `cv.pdf`     | Downloadable CV (linked from the hero)                     |

## What changed from the old site

- **Single page** instead of 5 separate pages (Home/About/Research/etc. now
  sections of one scrolling page, anchored by `#about`, `#research`, …)
- **Dark cosmic theme** with animated star field and aurora glow
- **Live GitHub repos** — fetched on page load from
  `api.github.com/users/SwastikC/repos` (no auth, public endpoint)
- **Custom typography** — Fraunces (display) + IBM Plex Sans (body) +
  JetBrains Mono (accents), loaded from Google Fonts
- **Smooth scroll** with section highlighting in the nav
- **Reveal-on-scroll** animations (respects `prefers-reduced-motion`)

## Tweaks you might want

- **Change name in repo cards**: in `script.js`, search for `SwastikC`
  in the `fetch(...)` URL.
- **Add publication**: in `index.html`, find `<div class="papers">` and
  copy any `<article class="paper">` block.
- **Change colours**: top of `style.css`, the `:root` block has every
  colour as a CSS variable.
- **Add Google Analytics / Plausible**: paste the snippet just before
  `</head>` in `index.html`.

## Old multi-page files

If your repo still contains `about.html`, `research.html`, `projects.html`,
and `contact.html` from the previous version, you can either:
- Delete them (the new `index.html` covers everything via anchor links), or
- Keep them — they'll still work as stand-alone pages.

The footer of the old pages links back to `index.html`, so nothing breaks.
