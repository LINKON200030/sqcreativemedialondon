/**
 * Post-build audit. Not part of the site — a throwaway check that the built
 * output is structurally sound: unique titles and descriptions, one H1 per
 * page, valid JSON-LD, and no broken internal links.
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const DIST = 'dist';
/**
 * Paths the host serves itself, so they are never in dist/ and must not be
 * reported as broken links. /_vercel/ is Vercel's Web Analytics script.
 */
const HOST_PROVIDED = ['/_vercel/'];
const pages = [];
(function walk(dir) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p);
    else if (e.endsWith('.html')) pages.push(p);
  }
})(DIST);

const rows = [];
const titles = new Map();
const descs = new Map();
const canons = new Map();
const allLinks = new Set();

for (const file of pages) {
  const html = readFileSync(file, 'utf8');
  const route = '/' + relative(DIST, file).split(sep).join('/').replace(/index\.html$/, '');
  const get = (re) => (html.match(re) || [])[1];

  const title = get(/<title>([^<]*)<\/title>/) ?? '';
  const desc = get(/<meta name="description" content="([^"]*)"/) ?? '';
  const canon = get(/<link rel="canonical" href="([^"]*)"/) ?? '';
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => m[1].replace(/<[^>]*>/g, '').trim());
  const ld = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  const noindex = /content="noindex/.test(html);

  const ldTypes = [];
  for (const m of ld) {
    try {
      for (const e of JSON.parse(m[1])['@graph']) {
        ldTypes.push(Array.isArray(e['@type']) ? e['@type'][0] : e['@type']);
      }
    } catch {
      ldTypes.push('INVALID-JSON');
    }
  }

  for (const m of html.matchAll(/(?:href|src)="(\/[^"#?]*)"/g)) {
    if (!HOST_PROVIDED.some((prefix) => m[1].startsWith(prefix))) allLinks.add(m[1]);
  }

  rows.push({ route, title, desc, h1s, ldTypes, noindex, bytes: Buffer.byteLength(html) });
  if (!noindex) {
    titles.set(title, [...(titles.get(title) ?? []), route]);
    descs.set(desc, [...(descs.get(desc) ?? []), route]);
    canons.set(canon, [...(canons.get(canon) ?? []), route]);
  }
}

console.log(`PAGES: ${rows.length}\n`);
console.log('route'.padEnd(34) + 'H1' + 'kB'.padStart(7) + '   title/desc   schema');
console.log('-'.repeat(112));
for (const r of rows.sort((a, b) => a.route.localeCompare(b.route))) {
  console.log(
    r.route.padEnd(34) +
      (r.h1s.length === 1 ? ' ✓' : ` ${r.h1s.length}!`) +
      (r.bytes / 1024).toFixed(1).padStart(7) +
      '   ' +
      String(r.title.length).padStart(3) +
      '/' +
      String(r.desc.length).padStart(3) +
      (r.noindex ? ' [noidx]' : '        ') +
      '  ' +
      [...new Set(r.ldTypes)].join(','),
  );
}

let problems = 0;
const warn = [];
const dup = (map, what) => {
  for (const [val, routes] of map) {
    if (routes.length > 1) {
      console.log(`\n✗ DUPLICATE ${what} across ${routes.length} pages: "${val.slice(0, 70)}"`);
      routes.forEach((r) => console.log('    ' + r));
      problems++;
    }
  }
};

console.log('\n' + '='.repeat(70));
dup(titles, 'TITLE');
dup(descs, 'DESCRIPTION');
dup(canons, 'CANONICAL');

for (const r of rows) {
  if (r.h1s.length !== 1) {
    console.log(`✗ ${r.route} has ${r.h1s.length} <h1> tags`);
    problems++;
  }
  if (r.ldTypes.includes('INVALID-JSON')) {
    console.log(`✗ ${r.route} has invalid JSON-LD`);
    problems++;
  }
  if (r.title.length > 65) warn.push(`⚠ title ${r.title.length} chars — ${r.route}: ${r.title}`);
  if (r.desc.length > 160) warn.push(`⚠ description ${r.desc.length} chars — ${r.route}`);
  if (r.desc.length < 70 && !r.noindex) warn.push(`⚠ description only ${r.desc.length} chars — ${r.route}`);
}

const broken = [];
for (const link of [...allLinks].sort()) {
  if (!existsSync(join(DIST, link)) && !existsSync(join(DIST, link, 'index.html'))) broken.push(link);
}

console.log('');
if (broken.length) {
  console.log(`✗ ${broken.length} BROKEN INTERNAL LINKS:`);
  broken.forEach((b) => console.log('    ' + b));
  problems += broken.length;
} else {
  console.log(`✓ all ${allLinks.size} internal link targets resolve`);
}

if (warn.length) {
  console.log('\nWARNINGS (length only, not errors):');
  warn.forEach((w) => console.log('  ' + w));
}

console.log('\n' + (problems ? `✗ ${problems} structural problems` : '✓ no structural problems'));
