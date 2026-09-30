/**
 * Case studies.
 *
 * Real, named, local clients with live URLs are the most valuable content on
 * this site for local search. Every competitor ranking for "web design surrey
 * quays" currently shows either no portfolio or clients from elsewhere in the
 * country — naming a business on Lower Road is proof they cannot copy.
 *
 * Keep `results` honest. If a number cannot be substantiated, describe what was
 * built instead. Invented metrics are not worth the risk.
 */

export interface CaseStudy {
  slug: string;
  name: string;
  /** Where the business trades. Appears above the name, as in the original. */
  where: string;
  /** Slug from areas.ts, so case studies can be surfaced on the right area page. */
  areaSlug: string;
  /** Short description, used on the homepage. */
  summary: string;
  /** Longer description for the work page. */
  detail: string[];
  /** What we did, shown as tags. */
  tags: string[];
  /** Live site, where there is one to show. */
  url?: string;
  /** Shown instead of a link when the work cannot be made public. */
  note?: string;
  /** 'browser' renders a desktop frame, 'phone' a handset frame. */
  device: 'browser' | 'phone';
  /** Text shown in the fake browser address bar. */
  chrome: string;
  /** What the client can now do that they could not before. */
  outcomes: string[];
}

export const caseStudies: CaseStudy[] = [
  {
    slug: 'surrey-quays-photo-studio',
    name: 'Surrey Quays Photo Studio',
    where: 'Photo studio on Lower Road, SE16',
    areaSlug: 'surrey-quays',
    summary:
      'A walk-in studio that now takes bookings, print orders and photo gift orders online, with every service page built for local search.',
    detail: [
      'Surrey Quays Photo Studio is a walk-in studio on Lower Road — passports and visa photos, portraits, prints and photo gifts. Before the rebuild, everything went through the counter or the phone, which meant the studio was only taking bookings while somebody was standing in it.',
      'We built a website with a separate, properly optimised page for each service, because "passport photos near me" and "family portrait studio" are different searches made by different people with different intentions. Each one now has a page written to answer it, with online booking and payment attached.',
      'The Google Business Profile was rebuilt alongside it: correct primary and secondary categories, every service listed, real photographs of the studio instead of stock, and a review flow that asks customers at the point they are happiest.',
    ],
    tags: ['Website Build', 'Local SEO', 'Google Business Profile'],
    url: 'https://surreyquaysphotostudio.com',
    device: 'browser',
    chrome: 'surreyquaysphotostudio.com',
    outcomes: [
      'Bookings and payments taken online, outside opening hours',
      'A dedicated, searchable page for every service the studio offers',
      'Print and photo-gift orders placed and paid for without a counter visit',
      'One Google Business Profile that matches the website exactly',
    ],
  },

  {
    slug: 'alterique',
    name: 'Alterique',
    where: 'Tailoring and alterations in Walthamstow, E17',
    areaSlug: 'walthamstow',
    summary:
      'A mobile-first website where customers send photos of their garment for a quote, or call and WhatsApp the studio in one tap.',
    detail: [
      'Alterique is a tailoring and alterations studio in Walthamstow. The problem was wasted journeys in both directions: customers travelling in to ask what a repair would cost, and the studio spending its day quoting instead of sewing.',
      'The site we built inverts that. A customer photographs the garment, describes what they want doing, and sends it through the website. The quote comes back without either side leaving the building. Call and WhatsApp are one tap from every page, because for a business like this the phone is still the main channel and pretending otherwise loses work.',
      'Everything is designed for a phone held in one hand, because that is where the photographs are taken and where the whole interaction happens.',
    ],
    tags: ['Website Build', 'Local SEO'],
    url: 'https://www.alterique.co.uk',
    device: 'phone',
    chrome: 'alterique.co.uk',
    outcomes: [
      'Quotes requested from a photograph, with no visit needed',
      'Call and WhatsApp one tap away on every page',
      'Enquiries captured outside opening hours',
      'Found in local search for alterations across E17',
    ],
  },

  {
    slug: 'sq-management',
    name: 'SQ Management',
    where: 'Custom system for Surrey Quays Photo Studio',
    areaSlug: 'surrey-quays',
    summary:
      'Runs the studio day to day: orders and staff jobs, Stripe payment links, invoices, and private client galleries with print sales.',
    detail: [
      'SQ Management is the system that runs Surrey Quays Photo Studio behind the scenes, and it exists because off-the-shelf software did not fit how a walk-in studio actually works.',
      'It handles orders and the jobs queue for staff, generates Stripe payment links and invoices, and hosts private client galleries where customers view their own photographs and order prints directly.',
      'We include it here because it is the honest answer to "can you build more than a website". When a business has a process that does not fit existing tools, we build the tool.',
    ],
    tags: ['Custom software', 'Online payments'],
    note: 'Shown with sample data. Real customer details never leave the system.',
    device: 'browser',
    chrome: 'SQ Management',
    outcomes: [
      'Orders and staff jobs tracked in one place',
      'Stripe payment links and invoices generated on the spot',
      'Private client galleries with print sales built in',
      'No monthly per-seat fee for software that half fits',
    ],
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return caseStudies.find((c) => c.slug === slug);
}

/** Case studies relevant to an area — its own first, then the rest. */
export function caseStudiesForArea(areaSlug: string): CaseStudy[] {
  return [...caseStudies].sort((a, b) => {
    const aMatch = a.areaSlug === areaSlug ? 0 : 1;
    const bMatch = b.areaSlug === areaSlug ? 0 : 1;
    return aMatch - bMatch;
  });
}
