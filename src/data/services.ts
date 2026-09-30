/**
 * The three service lines, and the content that drives both the service pages
 * and the service cards reused across the site.
 *
 * `keywords` is not for a meta keywords tag (that has been ignored by search
 * engines for twenty years). It records the search intents each page is written
 * to answer, so that whoever edits the copy next knows what the page is for and
 * does not accidentally optimise it away.
 */

export interface Service {
  slug: string;
  /** Short label for cards, nav and chips. Matches the original design. */
  name: string;
  /** Longer, keyword-bearing name for page H1s and schema. */
  longName: string;
  /** One line, used on cards and in the services hub. */
  summary: string;
  /** Meta description for the service page. Under 160 characters. */
  metaDescription: string;
  /** Opening paragraphs of the service page. */
  intro: string[];
  /** Bullet list shown on the card — kept identical to the original design. */
  bullets: string[];
  /** Deeper breakdown for the service page. */
  detail: { heading: string; body: string }[];
  /** Search intents this page targets. Documentation, not a meta tag. */
  keywords: string[];
  /** Image in src/assets, imported by the component. */
  image: string;
  faqs: { q: string; a: string }[];
}

export const services: Service[] = [
  {
    slug: 'website-design',
    name: 'Website Build',
    longName: 'Website design and development',
    summary:
      'Fast, mobile-first websites built around what your customers came to do: book, buy, call or find you.',
    metaDescription:
      'Website design and development in Surrey Quays, SE16. Fast, mobile-first sites with booking, payments and SEO built in. Fixed quotes from £299.',
    intro: [
      'A small business website has one job: turn someone who is already looking for what you sell into a booking, an order or a phone call. Most of the sites we replace fail at that for dull reasons — they take five seconds to load on a phone, the phone number is an image, the booking form is three clicks deep, or the whole thing was built for a desktop screen nobody uses any more.',
      'We build every site mobile-first and pre-rendered, which means the page arrives as finished HTML rather than being assembled in the browser. It loads in about a second on mobile data. That is not a vanity metric: page speed is a confirmed Google ranking signal, and it is the difference between a customer waiting and a customer tapping the next result.',
    ],
    bullets: ['Design and development', 'Online booking and payments', 'SEO set-up', 'Hosting and care'],
    detail: [
      {
        heading: 'Designed for your business, not dropped into a theme',
        body: 'We design the site around what you actually sell and how customers actually decide. That usually means fewer pages than you expect, each one doing a clear job, with the booking or the phone number never more than a tap away.',
      },
      {
        heading: 'Booking, payments and orders that work',
        body: 'Online booking, Stripe payments, deposits, order forms and quote requests. We built the full booking, print-order and gift-order system that runs Surrey Quays Photo Studio, plus the photo-to-quote flow for Alterique in Walthamstow, so this is well-trodden ground rather than an experiment.',
      },
      {
        heading: 'SEO built in from the first page',
        body: 'Correct heading structure, clean URLs, meta titles and descriptions written per page, structured data for your business and services, a sitemap, and Google Search Console connected before launch. Retrofitting this later costs more and works less well.',
      },
      {
        heading: 'Hosting, care and someone to call',
        body: 'We host, monitor, back up and keep the site current, and you get one number to ring when something needs changing. No dashboards to learn and no plugin updates to worry about.',
      },
    ],
    keywords: [
      'web design surrey quays',
      'website design se16',
      'web designer rotherhithe',
      'small business website london',
      'website development canada water',
      'ecommerce website south east london',
    ],
    image: 'service-website-build.webp',
    faqs: [
      {
        q: 'How long does a website take?',
        a: 'A focused small-business site is usually three to five weeks from the first conversation to going live. Larger builds with booking systems, payments or a lot of pages run six to ten weeks. You get a timeline with the quote, before any work starts.',
      },
      {
        q: 'What does a website cost?',
        a: 'A one-page site is £299. Most small-business sites are £499 or £799, depending on how many pages you need and whether you want booking or payments. Online shops and custom systems are quoted individually. Full detail is on the pricing page.',
      },
      {
        q: 'Do I own the website?',
        a: 'Yes. You own the design, the content and the domain, and you can take the site elsewhere whenever you like. We do not hold anything hostage.',
      },
      {
        q: 'Can you redesign the site I already have?',
        a: 'Usually, yes — and if the existing site has search rankings we are careful to keep them, with redirects mapped before launch rather than after. Send us the address and we will tell you honestly whether it is worth rebuilding or repairing.',
      },
      {
        q: 'Will it work on a phone?',
        a: 'It is designed on a phone first, because that is where most of your customers are. We test on real devices on mobile data, not just a narrow browser window.',
      },
    ],
  },

  {
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    longName: 'Digital marketing and local SEO',
    summary:
      'We get you found by people already searching for what you sell, then keep them coming back.',
    metaDescription:
      'Local SEO and digital marketing for Surrey Quays, Rotherhithe and south east London. Google Business Profile, local search, social and ads, run by a local team.',
    intro: [
      'Local marketing is mostly unglamorous. Before anyone runs an advert for you, the free things need to be right: your Google Business Profile complete and correctly categorised, your name, address and phone number identical everywhere they appear, real photographs instead of stock, and a steady trickle of genuine reviews. Most businesses we look at are losing customers to a competitor who simply filled in their listing properly.',
      'We do that groundwork first because it is where the return is, then build on it with local search pages, social content and paid ads only where they earn their cost. If ads are the wrong answer for your business, we will say so — it is cheaper for you and it saves us both a difficult conversation in month four.',
    ],
    bullets: ['Local SEO', 'Google Business Profile', 'Social media management', 'Instagram and Google Ads'],
    detail: [
      {
        heading: 'Local SEO that targets your actual catchment',
        body: 'We work out which areas realistically send you customers — for an SE16 business that is usually Surrey Quays, Canada Water, Rotherhithe, Bermondsey and Deptford rather than "London" — then build and optimise pages that answer what people in those places are searching for.',
      },
      {
        heading: 'Google Business Profile, properly finished',
        body: 'Categories, services, opening hours, service areas, products, photographs, questions, posts and review responses. This is the single highest-return thing most local businesses can fix, and it costs nothing but attention.',
      },
      {
        heading: 'Reviews you do not have to chase',
        body: 'We set up a simple, compliant way to ask every satisfied customer for a review at the right moment, and we help you reply to all of them. Review count and recency both feed local ranking, and both compound.',
      },
      {
        heading: 'Social media and paid ads, when they make sense',
        body: 'Instagram and Facebook management with content we shoot ourselves, plus Google and Meta ads where the numbers work. We report on enquiries and calls, not impressions.',
      },
      {
        heading: 'Reporting you can actually read',
        body: 'A monthly plain-English summary: where you rank, how many people called, clicked or filled the form, what we changed, and what we are doing next. No forty-page PDF of graphs.',
      },
    ],
    keywords: [
      'local seo surrey quays',
      'seo agency se16',
      'digital marketing rotherhithe',
      'google business profile management london',
      'social media management south east london',
      'google ads canada water',
    ],
    image: 'service-digital-marketing.webp',
    faqs: [
      {
        q: 'How long until I see results from SEO?',
        a: 'Google Business Profile work often shows movement within two to four weeks. Ranking a website for competitive local terms usually takes three to six months of consistent work. Anyone promising page one in a fortnight is either lucky or lying.',
      },
      {
        q: 'Do I need to sign a long contract?',
        a: 'No. Marketing runs month to month with thirty days notice. We would rather keep you because the work is producing results than because of a twelve-month tie-in.',
      },
      {
        q: 'Can you guarantee first place on Google?',
        a: 'No, and nobody can — Google does not sell or promise positions. What we can do is make sure every signal within your control is stronger than your competitors, and show you the ranking movement each month.',
      },
      {
        q: 'Is local SEO worth it if I only serve a few streets?',
        a: 'Often it is worth more, not less. A tight catchment means less competition for the searches that matter, and a properly optimised Google Business Profile can dominate a small area quickly.',
      },
      {
        q: 'What if I already have someone doing my marketing?',
        a: 'Then we will happily give you a second opinion for free. We will look at your profile, your site and your rankings and tell you what we would change — whether or not you hire us.',
      },
    ],
  },

  {
    slug: 'photography-video',
    name: 'Creatives',
    longName: 'Photography, video and brand design',
    summary: 'Photography, video and design that give your brand a look people remember.',
    metaDescription:
      'Business photography, video and brand design in Surrey Quays, SE16. Studio and on-location shoots, reels, logos and print, from a walk-in studio on Lower Road.',
    intro: [
      'The quickest way to tell whether a local business is any good is to look at its pictures. Stock photography of a generic office tells a customer nothing; six honest photographs of your actual premises, your actual team and your actual work tell them everything. Pictures are also the part of your marketing that gets reused most — website, Google listing, Instagram, printed menus, signage — so they are usually the best value thing you can commission.',
      'We run a walk-in photo studio at the same address, which means we are not booking a freelancer and adding a margin. We shoot in the studio on Lower Road or at your premises, and the pictures are shot to fit the website we are building rather than cropped to fit it afterwards.',
    ],
    bullets: ['Photo and video shoots', 'Reels and social content', 'Logos and brand identity', 'Print and signage'],
    detail: [
      {
        heading: 'Photography for business',
        body: 'Premises, team headshots, products, food and interiors, shot in our studio on Lower Road or at your place. You get edited, correctly sized files for web, print and social, not a folder of raw images.',
      },
      {
        heading: 'Video and social content',
        body: 'Short vertical video for Instagram and TikTok, walkthroughs of your premises, and simple explainer clips. Filmed and edited in batches so you have weeks of content from one visit.',
      },
      {
        heading: 'Logos and brand identity',
        body: 'A logo, a colour palette, typefaces and simple rules for using them, supplied in every format you will actually need. Enough structure to look consistent, not a sixty-page brand bible you will never open.',
      },
      {
        heading: 'Print and signage',
        body: 'Menus, price lists, leaflets, business cards, shopfront vinyl and window graphics, designed to match the website so the online and offline versions of your business look like the same company.',
      },
    ],
    keywords: [
      'business photographer surrey quays',
      'photo studio se16',
      'commercial photography rotherhithe',
      'product photography south east london',
      'logo design surrey quays',
      'video content london',
    ],
    image: 'service-creatives.webp',
    faqs: [
      {
        q: 'Do we come to you or do you come to us?',
        a: 'Either. We have a walk-in studio at 142 Lower Road, SE16 2UG for headshots, products and anything that needs controlled lighting, and we shoot on location when the point is to show your actual premises.',
      },
      {
        q: 'How long does a shoot take?',
        a: 'A small business shoot is typically two to three hours and produces enough material for the website and a couple of months of social posts. Product shoots depend on the number of items — tell us how many and we will be precise.',
      },
      {
        q: 'Do we get to use the photographs anywhere we like?',
        a: 'Yes. You get a full commercial licence to use them across your website, advertising, social media and print. There are no per-use fees and no expiry.',
      },
      {
        q: 'Can you just do photography without the website?',
        a: 'Of course. The three services work well together but none of them requires the others.',
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
