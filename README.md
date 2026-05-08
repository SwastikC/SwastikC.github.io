# swastikc.github.io — v3 (cosmic edition)

Live at **https://swastikc.github.io**

## What's new in this version

- 🌌 **Three.js 3D cosmic hero** — real WebGL star field, orbiting planet, parallax
- 🎨 **Light/dark mode toggle** — top-right of nav, remembered across visits
- 📊 **Interactive exoplanet visualization** — scatter plot in the Highlights section, toggle metallicity ↔ age
- 🖼️ **Research highlights** — visual cards summarizing your 4 main findings with custom SVG figures
- 📋 **BibTeX copy buttons** — one-click citation copying for each first-author paper
- 🛠️ **"How I work" section** — your tooling and methodology
- 📖 **Reading progress bar** — top of viewport, gradient fills as you scroll
- 📤 **Better form** — uses Formspree if configured, falls back to mailto otherwise
- 🖼️ **Custom OG share image** — designed 1200×630 image for LinkedIn/Twitter previews
- ⚡ **Scroll-driven reveal animations** — sections fade in with stagger as they enter view

## ⚠️ One setup step: Working contact form (optional)

The contact form currently falls back to `mailto:` (opens email client). To make it
actually submit messages directly:

1. Go to https://formspree.io and sign up (free, no credit card)
2. Click **+ New Form**, name it "Personal site", set email to `swastik.chowbay@iiap.res.in`
3. Copy the form's URL — looks like `https://formspree.io/f/abcd1234`
4. Open `index.html`, find this line:
   ```html
   <form id="contact-form" ... data-endpoint="https://formspree.io/f/YOUR_FORMSPREE_ID">
   ```
5. Replace `YOUR_FORMSPREE_ID` with your actual ID
6. Commit. Done — form now works in-page.

(If you skip this, the form still works — it just opens the user's email client.)

## File map

```
index.html         · single-page site
cv.pdf             · downloadable CV
sitemap.xml        · search engine sitemap
robots.txt         · crawler config
about.html, research.html, projects.html, contact.html
                   · redirect pages preserving old URLs
css/
  style.css        · all styles (dark + light themes)
js/
  script.js        · Three.js, viz, theme, progress, repo fetch
images/
  hero.png         · original hero image (kept, no longer used as bg)
  og-image.png     · designed share image (1200×630)
  og-image.svg     · source SVG for the share image
SEO-ACTION-PLAN.md · what to do for search ranking
```

## How to update common things

### Add a news item
In `index.html`, find `<ol class="news">` and add at the top:
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
In `index.html`, find `<ol class="pubs">` and copy any existing `<li class="pub">` block.

### Change the colour palette
Top of `css/style.css` — the `:root` block has every colour as a CSS variable.
Theme-light overrides are in the `html.theme-light` block further down.

### Update the OG share image
Edit `images/og-image.svg`, then regenerate the PNG with any SVG-to-PNG tool
(or send me the SVG and I'll regenerate).

## Local preview
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Phase 2 — Done! What I integrated

I extracted the real numerical data from your **Swastik et al. 2021** paper
(AJ 161, 114) Table 1 — all 22 directly-imaged planet host stars with their
[Fe/H], planet mass, age, and Teff values from your paper.

What's now using real data:
- **Interactive scatter plot** — every dot is a real star from your sample
  (HR 8799, Beta Pic, 51 Eri, PDS 70, LkCa 15, etc.). Hover and you see
  the actual star name and the actual published values.
- **Metallicity-mass scatter** in the highlights card — real points from
  your Table 1 (22 systems plotted at their published [Fe/H] and M_p).
- **Stats** in the highlight cards — mean [Fe/H] of −0.04±0.27 dex matches
  your paper's published value exactly (verified my extraction: −0.037).

What's still placeholder (would need files from you):
- The **LkCa 15 disk image** in the polarimetric highlight card — currently
  a stylized SVG. To use the real reduced image, send me the FITS or
  high-res PNG from your paper.
- The **GAIA DR3 paper** highlight card uses an illustrative galactic-disk
  scatter rather than your actual 2023 dataset, since I don't have access
  to that paper's table. Send me the paper's data table (or the AJ figure)
  and I'll wire it in.

## What I CAN'T do without you sending files

- Use real reduced images (LkCa 15, PDS 70 from your imaging papers)
- Pull data from papers I don't have access to (your 2023 GAIA paper's
  full table isn't in arxiv text; I'd need a CSV or the figure file)
- Add a personal photo to the About section
