# swastikc.github.io — v4 (animated cosmic edition)

Live at **https://swastikc.github.io**

## What's new in this version

- 🌌 **Animated cosmic hero scene** — purple ringed planet drifts, rings rotate slowly, moon orbits, stars twinkle, aurora glows pulse. Built in pure SVG/CSS (no Three.js — lightweight and elegant).
- 🏆 **ERC UNVEIL badge** in the hero
- 📊 **Updated CV** — 11 publications, 6 first-author, 6 in preparation
- 🔭 **New Observations section** with VLT/SPHERE, JWST, HCT programs
- 🎙️ **Talks split** into "Invited seminars/visits" (MIT/Sara Seager featured) and "Conference talks"
- 💰 **Funding section** highlighting the ERC grant + other awards
- 📧 **Email updated** to swastik.chowbay@unimi.it (primary)
- 🎓 **Thesis title** in About timeline
- ❓ **New intro**: "Every star tells a story. I read them in their chemistry."
- 📋 **BibTeX copy buttons** on highlight cards
- 🌓 **Light/dark theme toggle** with localStorage memory

## ⚠️ One setup step still pending

The contact form falls back to mailto by default. To use Formspree (5 min, free):

1. Go to https://formspree.io, sign up, create a new form
2. Copy the URL (`https://formspree.io/f/abcd1234`)
3. In `index.html`, find `data-endpoint="https://formspree.io/f/YOUR_FORMSPREE_ID"` and replace with your URL
4. Commit

## File map

```
index.html       · single-page site
cv.pdf           · downloadable CV (latest version)
sitemap.xml      · search engine sitemap
robots.txt       · crawler config
about.html, research.html, projects.html, contact.html
                 · redirect pages preserving old URLs

css/style.css    · all styles
js/script.js     · viz, theme, progress, repo fetch, contact form
images/
  og-image.png   · designed share image (1200×630)
  og-image.svg   · source SVG for the share image
  hero.png       · legacy hero (now unused — kept just in case)
```

## How to update common things

### Add a news item
In `index.html`, find `<ol class="news">` and add at top:
```html
<li class="news-item">
  <time class="news-item__date" datetime="2026-09">Sep 2026</time>
  <div class="news-item__body">
    <h3>Headline</h3>
    <p>One or two sentences.</p>
  </div>
</li>
```

### Add a paper
In `index.html`, find `<h3 class="subhead">First-author</h3>` (or "Co-author" / "In preparation") and copy any `<li class="pub">` block.

### Add a talk or invited visit
In `index.html`, find the appropriate `<ol class="talks">` and copy an existing `<li class="talk">` block.

### Change the cosmic scene
The hero SVG is inline in `index.html`. Look for `<svg class="cosmic-scene"`.
CSS animations are at the bottom of `style.css` under "PHASE 3: animated cosmic scene".

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
