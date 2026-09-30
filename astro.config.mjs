// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE_URL } from './src/data/site.ts';

// https://astro.build/config
export default defineConfig({
  /**
   * Required for canonical URLs, Open Graph tags and sitemap generation.
   * Sourced from src/data/site.ts so the domain is defined exactly once.
   */
  site: SITE_URL,

  /**
   * Every internal link in this project ends in a slash. Enforcing it here
   * means /areas/surrey-quays and /areas/surrey-quays/ cannot both be reachable,
   * which would otherwise split ranking signals between two URLs.
   */
  trailingSlash: 'always',

  /**
   * Astro 7 defaults to 'jsx', which strips whitespace between inline elements
   * following JSX rules — that silently removes the space in markup like
   * `<strong>a</strong> <em>b</em>`. HTML rules are what this design expects.
   */
  compressHTML: true,

  /** Prefetch on link hover. ~1.6 kB, and makes navigation feel instant. */
  prefetch: {
    defaultStrategy: 'hover',
  },

  integrations: [
    sitemap({
      /**
       * Search engines should not be pointed at the thank-you page or the 404.
       * Everything else is indexable.
       */
      filter: (page) => !page.includes('/thank-you/'),
      changefreq: 'monthly',
      lastmod: new Date(),
      serialize(item) {
        // Homepage first, then services and areas, then everything else.
        // Priority is a weak hint at best, but it costs nothing to be accurate.
        // changefreq is set once at the integration level above — overriding it
        // per item needs the sitemap package's enum rather than a string.
        const path = new URL(item.url).pathname;
        if (path === '/') return { ...item, priority: 1.0 };
        if (path.startsWith('/services/')) return { ...item, priority: 0.9 };
        if (path.startsWith('/areas/')) return { ...item, priority: 0.8 };
        if (path === '/privacy/') return { ...item, priority: 0.2 };
        return { ...item, priority: 0.6 };
      },
    }),
  ],

  build: {
    // One stylesheet for the whole site rather than a <style> tag per page.
    inlineStylesheets: 'auto',
  },
});
