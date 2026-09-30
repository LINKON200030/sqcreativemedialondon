/**
 * Static image registry.
 *
 * astro:assets needs a real ESM import to know an image's dimensions and to
 * generate optimised variants at build time, so images cannot be looked up from
 * a string path at runtime. Importing them once here lets the data files stay
 * plain data while components still get full `ImageMetadata`.
 */

import type { ImageMetadata } from 'astro';

import serviceWebsiteBuild from '../assets/service-website-build.webp';
import serviceDigitalMarketing from '../assets/service-digital-marketing.webp';
import serviceCreatives from '../assets/service-creatives.webp';
import caseSurreyQuaysPhotoStudio from '../assets/case-surrey-quays-photo-studio.webp';
import caseAlterique from '../assets/case-alterique.webp';
import caseSqManagement from '../assets/case-sq-management.webp';
import heroQDark from '../assets/hero-q-dark.webp';
import heroQLight from '../assets/hero-q-light.jpg';

/** Keyed by the service slug in src/data/services.ts. */
export const serviceImages: Record<string, ImageMetadata> = {
  'website-design': serviceWebsiteBuild,
  'digital-marketing': serviceDigitalMarketing,
  'photography-video': serviceCreatives,
};

/** Keyed by the case-study slug in src/data/work.ts. */
export const caseImages: Record<string, ImageMetadata> = {
  'surrey-quays-photo-studio': caseSurreyQuaysPhotoStudio,
  alterique: caseAlterique,
  'sq-management': caseSqManagement,
};

export const heroImages = { dark: heroQDark, light: heroQLight };
