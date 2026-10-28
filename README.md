# swastikc.github.io — editorial edition (Oct 2026)

Live at **https://swastikc.github.io**

## What's on the site

- 📰 **Editorial design**: warm paper background, Playfair Display + Manrope, photo-led hero, label/content column layout; dark mode via the toggle
- 📊 **CV-matched content** (Oct 2026): 14 refereed papers (8 first-author), 7 submitted or in prep; telescope programs (VLT/SPHERE, ALMA, JWST, HCT, VLT/ERIS) in the hero
- 🔬 **Research Highlights** with the published figures from six papers (WISPIT 2 Hα spectrum, LkCa 15 SPHERE images, …), each with ADS/arXiv links and BibTeX
- 🔭 Observations, talks & visits, funding, news, mentorship, live GitHub repos, contact form and Cal.com booking
- 🔎 **SEO**: ProfilePage + Person + ScholarlyArticle structured data, image sitemap, favicons, `llms.txt`, Lighthouse 99/100/100/100

## ⚠️ One setup step still pending

The contact form falls back to mailto by default. To use Formspree (5 min, free):

1. Go to https://formspree.io, sign up, create a new form
2. Copy the URL (`https://formspree.io/f/abcd1234`)
3. In `index.html`, find `data-endpoint="https://formspree.io/f/YOUR_FORMSPREE_ID"` and replace with your URL
4. Commit

## File map

```
index.html            · single-page site
cv.pdf                · downloadable CV (latest version); CV_Swastik.pdf is a copy for old links
sitemap.xml           · sitemap, including the research figures for Google Images
robots.txt            · crawler config
llms.txt              · plain-text summary for AI search assistants
404.html              · "Lost in space" not-found page
favicon.ico/.svg, apple-touch-icon.png, site.webmanifest · icons
about.html, research.html, projects.html, contact.html, website/
                      · redirects preserving old URLs

css/style.css         · all styles
js/script.js          · theme, progress bar, nav, reveals, BibTeX, GitHub repos, contact form, booking
images/
  swastik.jpg         · portrait
  research/*.webp     · figures used in Research Highlights
  og-image.png        · share image (1200×630); og-image.svg is its source
  favicon-*.png       · icon sizes for the web manifest
```

**After editing `css/style.css` or `js/script.js`, bump the `?v=` value** on their links in `index.html` so returning visitors get the new files.

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

### Add a research highlight
Copy an `<article class="highlight">` block in the `#highlights` section, put the figure in `images/research/` (WebP), and add it to `sitemap.xml`.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```
