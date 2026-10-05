/**
 * Single source of truth for business identity, NAP (name / address / phone)
 * and everything that feeds structured data.
 *
 * NAP consistency is a local-ranking factor: the values here must match the
 * Google Business Profile, Companies House record and every directory listing
 * character for character. Change them in one place only.
 */

/**
 * Canonical origin, no trailing slash. Must match the deployed domain exactly
 * (including the www / non-www choice) or canonicals and sitemap URLs will be
 * wrong. Also set as `site` in astro.config.mjs.
 */
export const SITE_URL = 'https://sqcreativemedialondon.co.uk';

export const site = {
  /** Trading name, used in titles and schema. */
  name: 'SQ Creative Media London',
  /** Full name used on first mention and in the organisation schema. */
  fullName: 'SQ Creative Media London',
  legalName: 'Surrey Quays Photo Studio Ltd',
  companyNumber: '16218366',
  tagline: 'Build. Grow. Elevate.',

  /**
   * Default meta description for the homepage. Every other page sets its own.
   * Kept under 160 characters so it is not truncated in results.
   */
  description:
    'Web design, digital marketing and photography from a studio in Surrey Quays, SE16. One local team for your website, local SEO and content. Call 07367 293944.',

  /** Registered office and the address shown to customers. */
  address: {
    street: '142 Lower Road',
    locality: 'London',
    region: 'Greater London',
    postcode: 'SE16 2UG',
    country: 'GB',
    countryName: 'United Kingdom',
  },

  /**
   * Coordinates for 142 Lower Road, SE16 2UG, taken from Google Maps' pin for
   * the address (October 2026). The previous value was about 100 m away.
   * Schema geo should agree with the Google Business Profile, so re-check this
   * against the agency's own profile pin once that profile is live.
   */
  geo: { lat: 51.4928, lng: -0.0468 },

  /** E.164 for `tel:` links and schema; display form for humans. */
  phone: '+447367293944',
  phoneDisplay: '07367 293944',
  email: 'support@sqcreativemedialondon.co.uk',

  instagram: 'https://www.instagram.com/sqcreativemedialondon/',
  instagramHandle: '@sqcreativemedialondon',

  /** Sister business — a real, walk-in premises at the same address. */
  sister: {
    name: 'Surrey Quays Photo Studio',
    url: 'https://surreyquaysphotostudio.com',
  },

  /**
   * Opening hours in schema.org format. Update if the studio hours change.
   */
  openingHours: [
    { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '18:00' },
    { days: ['Saturday'], opens: '10:00', closes: '17:30' },
  ],

  /** Shown in schema as `priceRange`; keep in step with /pricing. */
  priceRange: '££',

  /** Year the trading name started, for "serving X since" copy. */
  founded: '2025',
} as const;

/** Primary navigation, reused by header, mobile menu and footer. */
export const nav = [
  { label: 'Services', href: '/services/' },
  { label: 'Work', href: '/work/' },
  { label: 'Areas', href: '/areas/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
] as const;

/** Absolute URL for a site-relative path. Used for canonicals and schema. */
export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).href;
}
