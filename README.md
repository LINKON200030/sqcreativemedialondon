# SQ Creative Media London

The website for SQ Creative Media London — web design, digital marketing and photography, from a studio at 142 Lower Road, Surrey Quays, SE16.

Rebuilt from a single 1.1 MB `index.html` into a 25-page static site built for local search.

---

## Before you launch — do these

Four of these are load-bearing. The site will go live without them, but the local SEO will not work.

| | What | Where |
|---|---|---|
| ✓ | **Prices are set** — the owner's launch packages, September 2026. If they change, change every copy of them. | `src/pages/pricing.astro`, the FAQs in `src/pages/index.astro` and `src/data/services.ts`, meta descriptions — grep for `£` |
| 2 | **Connect the enquiry form.** Until you do, it validates and then shows your phone number instead of sending. | Copy `.env.example` to `.env`, set `PUBLIC_FORM_ENDPOINT` |
| 3 | **Name your form provider in the privacy notice.** It receives everything typed into the form, so it has to be disclosed. | `src/pages/privacy.astro`, "Who we share it with" |
| 4 | **Confirm the domain.** Every canonical URL, the sitemap and the structured data are built from one constant. | `SITE_URL` in `src/data/site.ts` |
| 5 | Check the studio hours and the map pin coordinates against your Google Business Profile. | `site.openingHours`, `site.geo` in `src/data/site.ts` |

Then, off the site — this is where most local ranking actually comes from:

- **Google Business Profile.** Claim it, set the primary category (*Website designer*) and secondary categories (*Marketing agency*, *Photographer*), list every service, set the service areas to match `src/data/areas.ts`, and upload real photographs of the studio. This does more for local ranking than anything in this repository.
- **Search Console.** Add the property, submit `https://sqcreativemedialondon.co.uk/sitemap-index.xml`.
- **NAP consistency.** The name, address and phone number in `src/data/site.ts` must match the Google profile and every directory listing character for character. Inconsistent NAP is the most common local SEO problem there is.
- **Reviews.** Ask every happy customer. Review count and recency both feed local ranking, and both compound.

---

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built site
npm run check    # TypeScript + Astro diagnostics
npm run audit    # build, then check the output for SEO and link problems
```

`npm run audit` is worth running before every deploy. It checks for duplicate titles and
descriptions, missing or duplicated `<h1>`s, invalid JSON-LD, broken internal links and
over-length meta descriptions.

### Deploying

`npm run build` produces a plain static site in `dist/`. It needs no server and no Node
runtime — Cloudflare Pages, Netlify, Vercel or any static host will serve it. Build
command `npm run build`, publish directory `dist`.

`dist/404.html` is picked up automatically by all of the above.

---

## The stack, and why

**[Astro 7](https://astro.build), TypeScript, hand-written CSS. No UI framework.**

Every page is pre-rendered to finished HTML at build time. There is no client-side
framework, no hydration and no database — the browser receives a complete document and
paints it. For a local business site that matters twice over: page speed is a confirmed
Google ranking signal, and the visitor deciding between you and the shop up the road is
on a phone, on mobile data, in a hurry.

What the browser actually downloads on a first visit to the homepage:

| | raw | brotli |
|---|---|---|
| HTML | 46 kB | 9 kB |
| CSS (whole site, one file) | 25 kB | 5 kB |
| JavaScript | 2.4 kB | 0.9 kB |
| Both fonts (self-hosted, preloaded) | 73 kB | 73 kB |
| **Total before images** | **147 kB** | **88 kB** |

The 2.4 kB of JavaScript is the theme toggle, the mobile menu and Astro's link
prefetcher. That is the entire runtime.

**Why not Next.js or WordPress.** Next.js ships a React runtime to render pages that
never change between builds. WordPress adds a database query, a plugin stack and a
maintenance burden to the same job. Neither buys anything a brochure-and-landing-page
site needs, and both cost page speed, which is the one technical thing that actually
moves local rankings.

**Why the CSS is hand-written.** The original design was already a clean, well-organised
token system with light and dark themes. Porting it to Tailwind would have risked the
design for no gain. `src/styles/tokens.css`, `base-core.css`, `components.css` and
`responsive.css` are lifted from the original build unchanged; `pages.css` adds the new
page types using the same tokens.

### What changed from the original

| | Before | After |
|---|---|---|
| Pages | 2 | 25 |
| Homepage HTML | 1,124 kB | 46 kB |
| Fonts | base64 inside the stylesheet, blocking first paint | real `.woff2` files, preloaded and cached |
| Images | base64 inside the HTML, uncacheable | real files, optimised and resized at build time |
| Three.js | 468 kB inline, loaded on every visit | deferred, conditional, cached separately |
| Enquiry form | a demo that told you to send an email | a real submission, working without JavaScript |
| Structured data | none | `ProfessionalService`, `WebSite`, `WebPage`, `Service`, `BreadcrumbList`, `FAQPage` |
| Canonicals, OG, sitemap, robots | none | all present |

The original files are kept verbatim in `reference/` as the design's source of truth.

---

## How it is laid out

```
src/
  data/           content lives here, not in the templates
    site.ts       business identity, NAP, hours — the single source of truth
    areas.ts      the 13 local landing pages
    services.ts   the 3 service pages
    work.ts       case studies
  lib/
    schema.ts     JSON-LD, emitted as one linked @graph per page
    images.ts     static image registry (astro:assets needs real imports)
  components/     Header, Footer, BaseHead, and the reusable page sections
  layouts/
    Base.astro    the HTML shell — head, header, slot, footer, scripts
  pages/          routes; [slug].astro files generate from the data above
  styles/         main.css imports the rest in order
public/
  q3d.js          pre-bundled Three.js + the hero scene (see below)
  fonts/          self-hosted variable fonts
reference/        the original single-file build, for comparison
scripts/
  audit-seo.mjs   post-build checks — npm run audit
```

Content is data, not markup. To change a service page, edit `src/data/services.ts`. To add
an area, add an entry to `src/data/areas.ts` and the page, the sitemap entry, the schema,
the footer link and the internal links all follow.

### The 3D logo

`public/q3d.js` is the Three.js bundle and hero scene lifted verbatim from the original
build, so the model is pixel-identical. It is loaded by `src/components/HeroStage.astro`
only when all of these hold: the hero is on screen, the browser is idle, the viewport is
at least 700 px wide, reduced motion is off, and Save-Data is off. Otherwise the
pre-rendered still stays in place — which is also what happens if WebGL is unavailable.

It is deliberately not an npm dependency. Nothing in `src/` imports Three.js, so adding
the package would only invite someone to bundle it into the critical path by accident.

---

## The SEO approach

Search "web design surrey quays" today and the results are national agencies running one
boilerplate template per postcode — roughly 900 words with the place name swapped in, no
local detail, no local clients. They rank on domain authority, not on merit.

This site does not try to out-publish them. It does the things they structurally cannot:

1. **Be actually local.** A real address in SE16, a walk-in studio, named local clients
   with live URLs. Stated plainly on the homepage, the about page and every area page.
2. **Write each area page about that area.** Real stations, streets, landmarks and an
   honest description of trading there. See `src/data/areas.ts` — every field exists to
   make the pages genuinely different rather than templated.
3. **Be fast.** 88 kB to first paint against a WordPress competitor's multiple megabytes.
4. **Mark it up properly.** A linked `@graph` per page, with the business entity carrying
   the address, geo, opening hours and all 13 served areas.
5. **Publish prices.** "How much does a website cost" is a high-volume commercial query
   and most agencies refuse to answer it.

### Which page targets what

Keeping this split clear is what stops the pages competing with each other.

| Page | Targets |
|---|---|
| `/` | `web design surrey quays`, brand searches |
| `/services/website-design/` | `website design se16`, `small business website london` |
| `/services/digital-marketing/` | `local seo surrey quays`, `seo agency se16` |
| `/services/photography-video/` | `business photographer surrey quays`, `photo studio se16` |
| `/areas/<area>/` | `web design <area>`, `web designer <area>`, `<postcode>` |
| `/pricing/` | `how much does a website cost`, `web design prices london` |

Each service entry in `src/data/services.ts` records its target intents in a `keywords`
field. That is documentation for whoever edits the copy next — it is not a meta tag, and
meta keywords have been ignored by search engines for twenty years.

### Adding an area

Add an entry to `src/data/areas.ts` and fill in **every** field with real detail. A thin
page dilutes the whole set, and a set of near-identical pages is what Google calls a
doorway and demotes accordingly. If you cannot write something genuine about the place,
leave it out.

---

## Accessibility and privacy

Landmarks and heading order are correct, the FAQ uses native `<details>` so it works
without JavaScript, focus styles are preserved throughout, and `prefers-reduced-motion`
disables every transition and stops the 3D model loading.

No analytics, no trackers, no cookies. Fonts and images are served from this domain, so a
visitor's browser never contacts Google. The only browser storage is the light/dark
preference in `localStorage`. All of this is described in `src/pages/privacy.astro` —
if you add analytics later, update that page.
