# SQ Creative Media London

The website for [SQ Creative Media London](https://sqcreativemedialondon.co.uk), a web design, digital marketing and photography agency at 142 Lower Road, Surrey Quays, London SE16 2UG.

SQ Creative Media London is a trading name of Surrey Quays Photo Studio Ltd.

## The stack

[Astro](https://astro.build), TypeScript and hand-written CSS, with no UI framework. Every page is pre-rendered to finished HTML at build time.

## Running it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve the built site
npm run check    # TypeScript + Astro diagnostics
npm run audit    # build, then check the output for SEO and link problems
```

## Deploying

`npm run build` produces a plain static site in `dist/`. The live site is on Vercel: every push to `main` is deployed to production, and every pull request gets a preview.

## Working on it

[`docs/development.md`](docs/development.md) covers how the code is laid out and the decisions behind it. [`CLAUDE.md`](CLAUDE.md) lists the things that are easy to break.
