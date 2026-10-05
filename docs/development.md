# Development notes

Notes for whoever works on this site next: the launch checklist, the stack and why it was
chosen, how the code is laid out, and the SEO approach. `CLAUDE.md` in the repository root
covers the things that are easy to break. The commands are in `README.md`.

---

## Launch checklist

Four of these are load-bearing. The site will go live without them, but the local SEO will not work.

| | What | Where |
|---|---|---|
| ✓ | **Prices are set** — the owner's launch packages, September 2026. If they change, change every copy of them. | `src/pages/pricing.astro`, the FAQs in `src/pages/index.astro` and `src/data/services.ts`, meta descriptions — grep for `£` |
| 2 | **Connect the enquiry form.** Until you do, it validates and then shows your phone number instead of sending. | Copy `.env.example` to `.env`, set `PUBLIC_FORM_ENDPOINT` |
| 3 | **Name your form provider in the privacy notice.** It receives everything typed into the form, so it has to be disclosed. | `src/pages/privacy.astro`, "Who we share it with" |
| 4 | **Confirm the domain.** Every canonical URL, the sitemap and the structured data are built from one constant. | `SITE_URL` in `src/data/site.ts` |
| ✓ | **Studio hours and map pin are set** (October 2026): the photo studio's hours, because it is the same door, and Google Maps' pin for the address. Check both again when the agency has its own Google Business Profile. | `site.openingHours`, `site.geo` in `src/data/site.ts` |

Then, off the site — this is where most local ranking actually comes from:

- **Google Business Profile.** Claim it, set the primary category (*Website designer*) and the secondary category (*Marketing agency*), list every service, set the service areas to match `src/data/areas.ts`, and upload real photographs of the studio. Leave *Photographer* off: the photo studio at the same address already has that ground, and Google only keeps two profiles at one address when they are clearly different businesses. This does more for local ranking than anything in this repository.
- **Search Console.** Add the property, submit `https://sqcreativemedialondon.co.uk/sitemap-index.xml`.
- **NAP consistency.** The name, address and phone number in `src/data/site.ts` must match the Google profile and every directory listing character for character. Inconsistent NAP is the most common local SEO problem there is.
- **Reviews.** Ask every happy customer. Review count and recency both feed local ranking, and both compound.

---

## Deploying

`npm run build` produces a plain static site in `dist/`. It needs no server and no Node
runtime.

The live site is on Vercel: every push to `main` is deployed to production, and every pull
request gets a preview. `dist/404.html` is picked up automatically.

Visits are counted with Vercel Web Analytics. The tag is in `src/layouts/Base.astro` and
only does anything on Vercel, with Web Analytics switched on for the project. If the site
ever moves to another host, take the tag out and update the privacy notice.

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
| JavaScript | 2.5 kB | 1.0 kB |
| Both fonts (self-hosted, preloaded) | 73 kB | 73 kB |
| **Total before images** | **147 kB** | **88 kB** |

The 2.5 kB of JavaScript is the theme toggle, the mobile menu, Astro's link prefetcher and
the few lines that decide whether this visitor gets motion. That is the entire critical
path.

Three things load after it. The 3D "Q" in the hero (`public/q3d.js`) waits for the stage
to scroll into view and for the browser to go idle. The motion layer
(`src/scripts/motion.ts`, 11 kB brotli) is a separate chunk that is only fetched for a
visitor who has not asked for reduced motion and is not on Save-Data — it adds the scroll
reveals, the cards that tilt towards the pointer and the depth in the hero. The visit
counter is a small deferred script that Vercel serves from this domain. The page is
finished and readable before any of them arrives, and correct if none ever does.

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
docs/
  development.md  these notes
```

Content is data, not markup. To change a service page, edit `src/data/services.ts`. To add
an area, add an entry to `src/data/areas.ts` and the page, the sitemap entry, the schema,
the footer link and the internal links all follow.

`npm run audit` is worth running before every deploy. It checks for duplicate titles and
descriptions, missing or duplicated `<h1>`s, invalid JSON-LD, broken internal links and
over-length meta descriptions.

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

The homepage `<h1>` carries a one-line description of the business above the slogan. Its
wording is kept different from the Surrey Quays area page's `<h1>` for the same reason.

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

No advertising trackers and no cookies. Visits are counted with Vercel Web Analytics, which
is cookie-free and served from this domain. Fonts and images are served from this domain
too, so a visitor's browser never contacts Google. The only browser storage is the
light/dark preference in `localStorage`. All of this is described in
`src/pages/privacy.astro` — if you change how visits are counted, update that page.
