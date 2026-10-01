# CLAUDE.md

Astro 7 static site for SQ Creative Media London — a web design, marketing and
photography agency at 142 Lower Road, Surrey Quays, SE16. Built for local search.

Read `README.md` first; it covers the stack, the layout and the SEO strategy. This file
covers the things that are easy to break.

## Commands

```bash
npm run dev      # astro dev — use `astro dev --background` for a long-running server
npm run build    # static output to dist/
npm run check    # TypeScript + Astro diagnostics; must stay at 0 errors
npm run audit    # build, then scripts/audit-seo.mjs — run before every deploy
```

## Rules that matter

**Content is data.** Page content lives in `src/data/*.ts`, not in the templates. To
change a service page edit `services.ts`; to add an area edit `areas.ts`. The routes,
sitemap, schema, footer links and internal linking all derive from those files.

**NAP is sacred.** The name, address and phone number in `src/data/site.ts` must match the
Google Business Profile exactly, character for character. Inconsistent NAP costs local
ranking. Never hardcode the phone number, email or address in a template — import from
`site.ts`.

**One domain constant.** `SITE_URL` in `src/data/site.ts` feeds `astro.config.mjs`, every
canonical, the sitemap and all structured data. Change it in one place only.

**Structured data must describe what the page shows.** `faqPage()` in `src/lib/schema.ts`
must be passed the same array the `<Faq>` component renders. Marking up text the visitor
cannot see is a guidelines violation.

**Area pages must be genuinely different.** Every field in an `Area` entry exists to make
its page unlike the others — real stations, streets, landmarks, local character, its own
FAQs. A set of templated near-identical local pages is a doorway and gets demoted. If you
cannot write something true about a place, do not add it.

**Keep the meta description under ~155 characters** or Google truncates it. `npm run
audit` will tell you.

**Prices live in more than one place.** The packages in `src/pages/pricing.astro` are the
owner's launch prices (September 2026). The same figures are quoted in the FAQs in
`src/pages/index.astro` and `src/data/services.ts` and in meta descriptions — grep for
`£` across `src/` and change them together.

**framer-motion stays on the vanilla entry.** The motion layer is `src/scripts/motion.ts`,
built on `framer-motion/dom` and `framer-motion/dom/mini` — never on `framer-motion` itself.
The root entry is the React one, and importing it would pull a UI framework into a site that
does not have one. `motion.ts` is dynamically imported from `Base.astro` so it builds as its
own chunk (~12 kB gzipped) and the main bundle stays at ~1.3 kB. To check, run `npm run
build` and look at `dist/_astro/`: if framer-motion has landed in the Base script chunk,
something is importing it statically.

The mini animator hands keyframes to the Web Animations API, so it takes real CSS properties
— whole `transform` strings, not `y` or `rotateX`. It also keeps filling after it finishes
*and* writes its last keyframe to inline style, and both of those outrank every CSS rule
however specific. That is why `reveal()` cancels the animation and clears the inline styles
when it is done. Without it, a card that has been revealed can never tilt.

**Motion is opt-in, and the page is complete without it.** The inline guard in `Base.astro`
sets `data-motion="on"` before first paint, and only if the visitor has not asked for reduced
motion and is not on Save-Data. Every rule in the "motion and depth" block of `pages.css` is
gated on that attribute, and the guard takes it back off if the chunk has not arrived within
2.5 seconds — so a hidden first frame can never become permanently hidden content. Reveals
are only given to elements measured as below the fold, which is what keeps the hero out of
it. Keep all three of those properties if you change this.

**Never import Three.js.** The hero model is `public/q3d.js`, a pre-bundled copy loaded on
demand by `src/components/HeroStage.astro`. It is deliberately not an npm dependency so it
cannot end up in the critical path. If you rewrite the scene, keep it out of the main
bundle and keep the loading conditions in `HeroStage.astro`.

**Astro 7 specifics.** `compressHTML: true` is set in `astro.config.mjs` on purpose —
the v7 default (`'jsx'`) strips whitespace between inline elements and silently eats the
space in markup like `<strong>a</strong> <em>b</em>`. The v7 Rust compiler also rejects
unclosed tags and invalid nesting that older versions tolerated.

**`trailingSlash: 'always'`.** Every internal link ends in `/`. Links without it will
redirect, which wastes crawl budget and splits signals.

## CSS

`src/styles/main.css` imports the rest in a deliberate order. `tokens.css`, `base-core.css`,
`components.css` and `responsive.css` are ported verbatim from the original single-file
build — keep them that way, and put changes to those components in `pages.css` under a
comment saying why, so the port stays traceable.

Everything is built from the tokens in `tokens.css`, so light and dark themes come free.
Do not introduce raw colour values.

Grid tracks use `minmax(min(Npx, 100%), 1fr)` rather than `minmax(Npx, 1fr)` — the plain
form keeps its minimum even when the container is narrower and overflows a 320 px phone.

## Placeholders still in the repo

- **`site.geo`** is an approximation of 142 Lower Road; it should match the Google
  Business Profile pin.
- **`PUBLIC_FORM_ENDPOINT`** is unset, so the enquiry form falls back to showing the phone
  number. Whichever provider is chosen must be named in `src/pages/privacy.astro`.
