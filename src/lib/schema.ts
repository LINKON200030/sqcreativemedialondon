/**
 * JSON-LD structured data.
 *
 * Everything is emitted as a single `@graph` per page so that entities can
 * reference each other by `@id` instead of being repeated. That keeps the
 * payload small and lets Google resolve, for example, the `provider` of a
 * Service to the same business entity described on every other page.
 *
 * Stable @ids — do not change these casually, they are how the graph links up:
 *   {SITE_URL}/#organization   the business
 *   {SITE_URL}/#website        the site
 *   {pageUrl}#webpage          the current page
 *   {SITE_URL}/#place-{slug}   a served area
 */

import { site, SITE_URL } from '../data/site';
import { areas, type Area } from '../data/areas';
import type { Service } from '../data/services';

const ORG_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

type Json = Record<string, unknown>;

/** Maps our opening-hours shape onto schema.org OpeningHoursSpecification. */
function openingHours(): Json[] {
  return site.openingHours.map((slot) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: slot.days.map((d) => `https://schema.org/${d}`),
    opens: slot.opens,
    closes: slot.closes,
  }));
}

/** Every area we serve, as a Place. Referenced by `areaServed`. */
function servedPlaces(): Json[] {
  return areas.map((area) => ({
    '@type': 'Place',
    '@id': `${SITE_URL}/#place-${area.slug}`,
    name: area.name,
    address: {
      '@type': 'PostalAddress',
      addressLocality: area.name,
      addressRegion: 'Greater London',
      postalCode: area.postcodes[0],
      addressCountry: 'GB',
    },
  }));
}

/**
 * The business itself. This is the entity that local search cares about, so the
 * name, address and phone here must match the Google Business Profile exactly.
 */
export function organization(): Json {
  return {
    '@type': 'ProfessionalService',
    '@id': ORG_ID,
    name: site.name,
    legalName: site.legalName,
    alternateName: 'SQ Creative Media',
    url: `${SITE_URL}/`,
    /**
     * `logo` should be the mark itself — Google wants something square-ish and
     * at least 112px. The wide Open Graph card goes in `image` instead, which
     * is what gets used as the general-purpose picture of the business.
     */
    logo: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#logo`,
      url: `${SITE_URL}/favicon-512.png`,
      width: 512,
      height: 512,
      caption: site.name,
    },
    image: {
      '@type': 'ImageObject',
      '@id': `${SITE_URL}/#primaryimage`,
      url: `${SITE_URL}/og-image.png`,
      width: 1200,
      height: 630,
    },
    description: site.description,
    slogan: site.tagline,
    telephone: site.phone,
    email: site.email,
    priceRange: site.priceRange,
    currenciesAccepted: 'GBP',
    foundingDate: site.founded,

    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      addressLocality: site.address.locality,
      addressRegion: site.address.region,
      postalCode: site.address.postcode,
      addressCountry: site.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },

    /** Companies House number — a strong, verifiable identity signal. */
    identifier: {
      '@type': 'PropertyValue',
      name: 'Company number',
      value: site.companyNumber,
    },

    openingHoursSpecification: openingHours(),
    areaServed: servedPlaces(),

    /**
     * Radius around the studio that we serve without travel charges. Helps
     * Google understand this is a local service business, not a national one.
     */
    serviceArea: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: site.geo.lat,
        longitude: site.geo.lng,
      },
      geoRadius: '12000',
    },

    knowsAbout: [
      'Web design',
      'Website development',
      'Local SEO',
      'Search engine optimisation',
      'Google Business Profile optimisation',
      'Social media management',
      'Google Ads',
      'Commercial photography',
      'Video production',
      'Brand identity design',
    ],

    sameAs: [site.instagram, site.sister.url],

    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: [
        { slug: 'website-design', name: 'Website design and development' },
        { slug: 'digital-marketing', name: 'Digital marketing and local SEO' },
        { slug: 'photography-video', name: 'Photography, video and brand design' },
      ].map((s) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          '@id': `${SITE_URL}/services/${s.slug}/#service`,
          name: s.name,
        },
      })),
    },
  };
}

/** The site as an entity, published by the organisation. */
export function website(): Json {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: `${SITE_URL}/`,
    name: site.name,
    description: site.description,
    publisher: { '@id': ORG_ID },
    inLanguage: 'en-GB',
  };
}

/** The current page. `isPartOf` ties it back to the site. */
export function webPage(url: string, name: string, description: string): Json {
  return {
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name,
    description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': ORG_ID },
    inLanguage: 'en-GB',
  };
}

export interface Crumb {
  name: string;
  /** Absolute URL. Omit on the final crumb — the current page. */
  url?: string;
}

/**
 * Breadcrumbs. Google uses these to replace the URL in the result snippet with
 * a readable trail, which measurably improves click-through on deep pages.
 */
export function breadcrumbs(crumbs: Crumb[]): Json {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      ...(crumb.url ? { item: crumb.url } : {}),
    })),
  };
}

/** A service page's Service entity, provided by the organisation. */
export function serviceSchema(service: Service): Json {
  return {
    '@type': 'Service',
    '@id': `${SITE_URL}/services/${service.slug}/#service`,
    name: service.longName,
    description: service.summary,
    serviceType: service.longName,
    provider: { '@id': ORG_ID },
    areaServed: areas.map((a) => ({ '@id': `${SITE_URL}/#place-${a.slug}` })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.longName,
      itemListElement: service.bullets.map((b) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: b },
      })),
    },
  };
}

/**
 * FAQPage. Rich results for FAQs are now limited to authoritative sites, but
 * the markup still helps Google understand the page and can surface in other
 * features, so it stays. Answers must match the visible text exactly — marking
 * up content the user cannot see is a guidelines violation.
 */
export function faqPage(faqs: { q: string; a: string }[]): Json {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** An area page, describing where we work rather than what we sell. */
export function areaSchema(area: Area, url: string): Json {
  return {
    '@type': 'Service',
    '@id': `${url}#service`,
    name: `Web design and digital marketing in ${area.name}`,
    description: area.character,
    serviceType: 'Web design, digital marketing and photography',
    provider: { '@id': ORG_ID },
    areaServed: {
      '@type': 'Place',
      '@id': `${SITE_URL}/#place-${area.slug}`,
      name: area.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: `London Borough of ${area.borough}`,
      },
    },
  };
}

/**
 * Wraps a set of entities into one @graph document.
 * Escapes `<` so the JSON can never terminate the surrounding <script> tag.
 */
export function graph(...entities: Json[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': entities,
  }).replace(/</g, '\\u003c');
}
