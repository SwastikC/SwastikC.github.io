# Getting Your Site Into Google Search — Action Plan

**Goal:** Make `swastikc.github.io` show up when someone Googles "Swastik Chowbay" within 1–2 weeks.

**Why it doesn't show up now:** Google has to discover, crawl, and index a new site before showing it. For a site with no backlinks, this can take months by default. We need to actively push it.

---

## ⚡ TODAY (30 minutes) — the essential steps

### 1. Google Search Console (5 min) — biggest impact

The site is already verified with Google: the file `googlebc43f718f2b599a0.html` is in the repo, so no meta tag is needed.

1. Open https://search.google.com/search-console and pick `https://swastikc.github.io/`
2. **Sitemaps** → enter `sitemap.xml` → Submit. Resubmit it after big updates; it now lists the research figures for Google Images.
3. **URL Inspection** → paste `https://swastikc.github.io/` → **Request Indexing**
4. Optional: **Rich results test** (https://search.google.com/test/rich-results) on the homepage should show the *Profile page* result.

### 2. Bing Webmaster Tools (5 min)

1. Open https://www.bing.com/webmasters
2. Add site `https://swastikc.github.io/`
3. The easiest verification: import from Google Search Console (one click after step 1)
4. Submit your sitemap
5. Bing indexes within hours and powers DuckDuckGo, Yahoo, ChatGPT search.

### 3. ORCID profile (5 min)

1. Login at https://orcid.org/0000-0003-1371-8890
2. Edit your record → Websites & Social Links
3. Add: `Personal website · https://swastikc.github.io/`
4. ORCID is a high-trust domain Google crawls daily.

### 4. UniMi profile (5 min) — HIGHEST-VALUE backlink

1. Login to your UniMi profile (https://www.unimi.it/it/ugov/person/swastik-chowbay)
2. Find "personal website" / "homepage" field
3. Add `https://swastikc.github.io/`
4. A `.it` university domain pointing to your site is worth a LOT in Google's eyes.

### 5. GitHub bio (1 min)

1. https://github.com/SwastikC → Edit profile
2. Set "Website" to `https://swastikc.github.io/`

---

## 📅 THIS WEEK

### 6. Google Scholar (2 min)

1. Login: https://scholar.google.com/citations?user=uVngnhsAAAAJ
2. Edit profile → add homepage URL

### 7. Tell people the site exists (drives early traffic + fresh backlinks)

Do at least ONE:
- **LinkedIn post** announcing the site
- **Bluesky / Twitter** post tagging #astronomy #exoplanets
- **Email signature** — add `swastikc.github.io` below your name
- **Department mailing list** if you have one

### 8. NASA ADS author profile

NASA ADS auto-generates author pages from papers. You can claim and customize yours:
https://ui.adsabs.harvard.edu/user/orcid — link your ORCID and homepage.

---

## 📊 What to expect

| Day 1–2 | Site appears for `site:swastikc.github.io` |
| Day 3–7 | Appears for `Swastik Chowbay github.io` |
| Week 2–3 | Appears for `Swastik Chowbay` (competing with IIA / Scholar) |
| Month 2 | May rank top-3 for `Swastik Chowbay astrophysicist` |
| Month 3+ | Long-tail keywords (paper themes) start showing |

---

## 🔬 Already done in the site (Oct 2026 pass)

- ✅ Title and description lead with your name, including "C. Swastik", the name you publish under
- ✅ Schema.org **ProfilePage** + **Person** (ORCID, Scholar, UniMi, GitHub, affiliations, alma maters, ASI membership, awards, research topics) + **ScholarlyArticle** for 7 first-author papers
- ✅ `sitemap.xml` with image entries; `robots.txt` allows everything and points to the sitemap
- ✅ Open Graph + Twitter Card with a designed share image
- ✅ Real favicon files (Google shows these next to your result), apple-touch icon, web manifest
- ✅ `llms.txt` summary for AI search assistants (ChatGPT, Perplexity, etc.)
- ✅ Old duplicate site (`/website/`) replaced by a redirect; old CV copies now point to the current CV
- ✅ Lighthouse: Performance 99 · Accessibility 100 · Best Practices 100 · SEO 100 (fonts load without blocking, WebP figures)
- ✅ Canonical URL, custom 404 page, `rel="me"` links to ORCID/Scholar/GitHub

The technical SEO is complete. From here, visibility comes from **links to the site** (steps 3–8 above): every profile and page that links to `swastikc.github.io` helps.

---

## ⚠️ Mistakes to avoid

- ❌ Don't use SEO "boost" services — they're scams
- ❌ Don't keyword-stuff
- ❌ Don't pay for backlinks
- ❌ Don't expect day-1 ranking — your IIA profile and arXiv author page have years of crawl history; your new site needs weeks to catch up

---

## 🆘 If 2 weeks pass and you're still not indexed

In Search Console → **Coverage**. Common issues:
1. No backlinks at all (do steps 3–5)
2. Site too new — re-click "Request Indexing"
3. `robots.txt` blocking (check `https://swastikc.github.io/robots.txt` shows `Allow: /`)
