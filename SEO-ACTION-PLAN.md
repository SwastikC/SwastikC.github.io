# SEO Action Plan for swastikc.github.io

The site is now technically optimized. **What follows is the human work** —
the part that actually moves search rankings. Estimated total time: 2–3 hours
spread over a weekend.

The list is ordered by impact. Do them top to bottom.

---

## ⭐ Step 1 — Submit to Google Search Console (15 min)

Without this, Google may take weeks to discover you. With it: hours.

1. Go to https://search.google.com/search-console
2. Click **Add property** → **URL prefix** → `https://swastikc.github.io/`
3. Verify with the **HTML tag** method:
   - Google gives you `<meta name="google-site-verification" content="abc123..." />`
   - Add it inside `<head>` of `index.html` (just below the existing `<meta>` tags)
   - Commit, wait 1 minute for GitHub Pages to redeploy, click Verify
4. Once verified:
   - Sidebar → **Sitemaps** → enter `sitemap.xml` → Submit
   - Sidebar → **URL Inspection** → paste your URL → click "Request Indexing"

Repeat the same property-add for **Bing Webmaster Tools**:
https://www.bing.com/webmasters (also feeds DuckDuckGo, Yahoo, ChatGPT search).

---

## ⭐ Step 2 — Add backlinks from your authority profiles (30 min)

These are the highest-authority sites that can vouch for you. Each link adds
serious SEO weight.

### ORCID — https://orcid.org/0000-0003-1371-8890
1. Sign in
2. Edit your "Websites & Social Links" section
3. Add: `https://swastikc.github.io/`
4. Set visibility to **Everyone**

### Google Scholar — https://scholar.google.com/citations?user=uVngnhsAAAAJ
1. Sign in to your profile
2. Click the pencil ✏️ next to your name to edit
3. Add `https://swastikc.github.io/` as the **Homepage** field
4. Save

### NASA ADS
1. Log in at https://ui.adsabs.harvard.edu
2. Go to your author profile
3. There's usually a homepage / website field — add the URL there

### GitHub
1. Go to https://github.com/SwastikC
2. Click **Edit profile**
3. In the "Website" field, add `https://swastikc.github.io/`
4. Save

### Università degli Studi di Milano page
You said you don't have edit rights. Email your department admin or whoever
manages unimi.it pages and ask them to add `https://swastikc.github.io/` as
your personal/research homepage. This is the highest-authority backlink
you can get for academic SEO — well worth the email.

---

## ⭐ Step 3 — Tell ResearchGate, LinkedIn, Twitter (15 min)

If you have any of these, add the URL.

- **ResearchGate**: profile → about → contact → website
- **LinkedIn**: profile → contact info → website
- **X / Twitter / Bluesky**: bio link
- **Mastodon (Astrodon.social is popular for astronomers)**: bio link

These are lower authority than ORCID/Scholar but still help.

---

## ⭐ Step 4 — Make sure your name is "owned" (one-time, 20 min)

Search `Swastik Chowbay` on Google right now and see what comes up. The goal
is that within 1–3 months, the top results are: (1) your personal site,
(2) your Scholar profile, (3) your ORCID, (4) your unimi.it page.

If anything embarrassing or wrong appears, that's fixable too. Ping me.

To accelerate "name ownership":
- Make sure all of your published papers list you as **C. Swastik** consistently
  (your CV uses this — good)
- Add ORCID iD to the author block of any future paper you submit (most
  journals support this and it links the paper to you in Google's eyes)

---

## ⭐ Step 5 — Update your News section every 1–2 months (ongoing)

Search engines like fresh content. The News section I added to your site is
how you signal "this site is alive." Even one update per quarter helps.

To add a news item, edit `index.html`, find the `<ol class="news">` block,
and copy this template at the top:

```html
<li class="news-item">
  <time class="news-item__date" datetime="2026-09">Sep 2026</time>
  <div class="news-item__body">
    <h3>Your headline here</h3>
    <p>One or two sentences of detail.</p>
  </div>
</li>
```

Things worth posting:
- Paper accepted / published
- Telescope time awarded
- Conference talk delivered
- New collaborator / student
- Outreach event you ran

---

## ⭐ Step 6 — Reasonable, real-world citations (slow burn)

Every place a paper of yours is cited in a reputable place, your "academic
graph" gets stronger. You don't control this, but you can:

- Tweet/post about your papers when they come out (with the URL to your site)
- Submit to research blogs that cover exoplanets (e.g. astrobites)
- If your paper gets press coverage (you have at least one Ministry of I&B
  press release per the CV), make sure the journalist has your site URL

---

## 🛠️ What was already done for you (technical SEO)

These don't need any action — they're baked into the code:

- ✅ Page title, description, keywords meta tags
- ✅ Open Graph + Twitter card tags (rich previews on social media)
- ✅ Canonical URL
- ✅ Schema.org structured data:
  - `Person` with ORCID, Scholar, UniMi, GitHub linked via `sameAs`
  - `ScholarlyArticle` for each first-author paper
- ✅ `sitemap.xml` and `robots.txt`
- ✅ Old multi-page URLs (`about.html`, `research.html`, etc.) now redirect
  to the new single-page anchors so any existing backlinks consolidate
- ✅ Semantic HTML5 landmarks (`<main>`, `<section>` with `aria-labelledby`)
- ✅ Mobile-friendly responsive layout
- ✅ Fast load (no frameworks, no build step, fonts preconnected)
- ✅ Accessible navigation, alt text on the hero image, reduced-motion respect

---

## 🔍 How to check it's working

**This week:**
- Search Console will show "Page indexed" for your URL within 1–7 days
- Search `site:swastikc.github.io` on Google — should show your site

**In 2–4 weeks:**
- Search `Swastik Chowbay` (no quotes) — your site should appear in the top 5
- Search `Swastik Chowbay astrophysicist` — should be #1 or #2

**In 2–3 months:**
- Topical searches like `exoplanet host star ages` — your papers from your
  site should start appearing for very-long-tail queries

If you hit a snag with any step, just ask.
