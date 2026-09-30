/**
 * Local landing-page dataset.
 *
 * Every field here exists to make each area page genuinely different from the
 * others. Agencies that rank for "web design <area>" today mostly publish one
 * boilerplate template with the place name swapped in — Google treats that as a
 * doorway page and it converts badly. So each entry carries real detail:
 * stations, streets, landmarks, and the kinds of business actually trading
 * there. If you add an area, fill in every field properly or leave it out.
 *
 * `tier` drives ordering and how strongly we claim presence:
 *   1 — SE16 home turf, walking distance from the studio on Lower Road
 *   2 — neighbouring areas, a short hop by Overground / Jubilee / DLR
 *   3 — wider London, where we already have clients
 */

export interface Area {
  slug: string;
  /** Place name as locals write it. Used in H1s, titles and schema. */
  name: string;
  /**
   * Meta description for this area's page, written by hand. Google truncates
   * around 155 characters, so keep it under that and put the area name first.
   */
  metaDescription: string;
  /** Postcode district(s), e.g. "SE16". Shown in titles — people search them. */
  postcodes: string[];
  /** London borough, for the schema `containedInPlace` and trust copy. */
  borough: string;
  tier: 1 | 2 | 3;
  /** Approximate centre, for the area page's geo schema. */
  geo: { lat: number; lng: number };
  /** How we get there from the studio. Concrete proximity beats claims. */
  travel: string;
  /** Rail / tube / DLR stations, most useful first. */
  stations: string[];
  /** Main commercial streets — where the shopfronts are. */
  highStreets: string[];
  /** Recognisable places. Signals to a reader that a local wrote this. */
  landmarks: string[];
  /**
   * Opening paragraph. Unique per area, mentions real local geography, and
   * says something true about trading there.
   */
  intro: string;
  /** What the local business mix looks like — drives the "who we help" list. */
  businessTypes: string[];
  /** One sentence on the local commercial character, used mid-page. */
  character: string;
  /** Neighbouring area slugs, for internal linking. */
  neighbours: string[];
  /** Area-specific FAQs. Feed FAQPage schema, so keep answers genuine. */
  faqs: { q: string; a: string }[];
}

export const areas: Area[] = [
  {
    slug: 'surrey-quays',
    name: 'Surrey Quays',
    metaDescription:
      "Web design, local SEO and photography for Surrey Quays businesses, from a studio on Lower Road, SE16. Walk in and meet us. Call 07367 293944.",
    postcodes: ['SE16'],
    borough: 'Southwark',
    tier: 1,
    geo: { lat: 51.4934, lng: -0.0479 },
    travel: 'This is home. Our studio is at 142 Lower Road, a few minutes from Surrey Quays station.',
    stations: ['Surrey Quays', 'Canada Water', 'Rotherhithe'],
    highStreets: ['Lower Road', 'Redriff Road', 'Surrey Quays Road'],
    landmarks: [
      'Surrey Quays Shopping Centre',
      'Greenland Dock',
      'South Dock Marina',
      'Canada Water Dock',
      'Russia Dock Woodland',
      'Southwark Park',
    ],
    intro:
      'Surrey Quays is where we are based. Our studio sits on Lower Road, between Surrey Quays station and the shopping centre, so most of the businesses we work with here are a walk away rather than a video call. We have spent years watching which shopfronts on Lower Road get found online and which ones do not, and the pattern is almost always the same: the ones that show up have a fast website, a properly filled-in Google Business Profile and real photographs.',
    businessTypes: [
      'Salons, barbers and beauty studios',
      'Cafés, takeaways and independent food',
      'Trades and home services',
      'Dentists, clinics and therapists',
      'Marina and waterside businesses',
      'Estate and letting agents',
    ],
    character:
      'Surrey Quays trades on a mix of shopping-centre footfall and a fast-growing residential population around the old docks, which means local search is where new customers actually start.',
    neighbours: ['canada-water', 'rotherhithe', 'bermondsey', 'deptford'],
    faqs: [
      {
        q: 'Are you actually based in Surrey Quays?',
        a: 'Yes. Our studio is at 142 Lower Road, SE16 2UG, a few minutes from Surrey Quays Overground station. SQ Creative Media is the agency side of Surrey Quays Photo Studio Ltd, the walk-in studio at the same address, so you can come and see us in person.',
      },
      {
        q: 'Can we meet face to face before committing to anything?',
        a: 'That is usually how it starts. Call 07367 293944 and we will arrange a time at the studio on Lower Road, or come to you if your premises are nearby. The first conversation is free and you get a written plan and a fixed quote before any work begins.',
      },
      {
        q: 'Do you photograph the business as well as building the website?',
        a: 'We do, and for Surrey Quays businesses that is often the biggest single improvement. Being a few streets away means we can shoot your premises, team and products, then use the same pictures across the website, the Google Business Profile and social media.',
      },
    ],
  },

  {
    slug: 'canada-water',
    name: 'Canada Water',
    metaDescription:
      "Web design, local SEO and photography for Canada Water businesses, SE16. Ten minutes from our Lower Road studio. Opening a new unit? Call 07367 293944.",
    postcodes: ['SE16'],
    borough: 'Southwark',
    tier: 1,
    geo: { lat: 51.4982, lng: -0.0502 },
    travel: 'A ten-minute walk from the studio, or one stop on the Overground from Surrey Quays.',
    stations: ['Canada Water', 'Surrey Quays', 'Rotherhithe'],
    highStreets: ['Surrey Quays Road', 'Lower Road', 'Deal Porters Way'],
    landmarks: [
      'Canada Water Library',
      'Canada Water Dock',
      'the Canada Water regeneration masterplan',
      'Deal Porters Way',
      'Southwark Park',
      'Russia Dock Woodland',
    ],
    intro:
      'Canada Water is the busiest doorway into SE16: a single interchange where the Jubilee line meets the Windrush line Overground, which puts Canary Wharf three minutes away and London Bridge two stops in the other direction. It is also the biggest building site in the borough, and the new ground-floor units arriving with the masterplan are opening into an area where thousands of residents are looking for a dentist, a gym, a barber or a coffee shop for the first time.',
    businessTypes: [
      'New ground-floor retail and food units',
      'Gyms, studios and personal trainers',
      'Dental and healthcare practices',
      'Coffee shops and casual dining',
      'Professional services and consultancies',
      'Childcare, tutoring and clubs',
    ],
    character:
      'Canada Water is full of new residents with no established habits yet, so the business that turns up first in local search is often the one they stay with.',
    neighbours: ['surrey-quays', 'rotherhithe', 'bermondsey', 'canary-wharf'],
    faqs: [
      {
        q: 'We are opening a new unit in Canada Water. When should the website be live?',
        a: 'Before you open, not after. A new unit has no word of mouth yet, so search and your Google Business Profile do the work in the first few months. Give us four to six weeks before opening day and we can have the website, the profile and a set of photographs of the finished premises ready to go live together.',
      },
      {
        q: 'How close are you to Canada Water?',
        a: 'About a ten-minute walk. Our studio is on Lower Road, SE16 2UG, between Canada Water and Surrey Quays stations, so site visits and shoots are straightforward.',
      },
      {
        q: 'Can you help us reach Canary Wharf customers as well?',
        a: 'Yes, and Canada Water businesses are unusually well placed for it — one Jubilee stop each way. We build that into how we target local SEO and ads, so you appear for people searching from both sides of the river rather than only your own postcode.',
      },
    ],
  },

  {
    slug: 'rotherhithe',
    name: 'Rotherhithe',
    metaDescription:
      "Web design, local SEO and photography for Rotherhithe businesses, SE16, from a studio ten minutes down Lower Road. Call 07367 293944 to talk it through.",
    postcodes: ['SE16'],
    borough: 'Southwark',
    tier: 1,
    geo: { lat: 51.5011, lng: -0.0525 },
    travel: 'Ten minutes up Lower Road from the studio, or one stop on the Overground.',
    stations: ['Rotherhithe', 'Canada Water', 'Bermondsey'],
    highStreets: ['Albion Street', 'Rotherhithe Street', 'Jamaica Road'],
    landmarks: [
      'the Brunel Museum and Thames Tunnel shaft',
      'The Mayflower',
      'St Mary the Virgin, Rotherhithe',
      'Surrey Docks Farm',
      'Stave Hill Ecological Park',
      'the Thames Path',
    ],
    intro:
      'Rotherhithe still behaves like a village inside London: a bend in the river, a church, a pub claiming to be the oldest on the Thames, and a run of small independents along Albion Street that survive on regulars. That is a good position to trade from and a difficult one to grow from, because the passing trade is limited and most new customers arrive having searched for you first. The businesses doing well here are the ones whose website and Google listing look as characterful as the street does.',
    businessTypes: [
      'Riverside pubs, restaurants and cafés',
      'Independent shops on Albion Street',
      'Creative studios in converted warehouses',
      'Trades, builders and marine services',
      'Nurseries, clubs and community groups',
      'Holiday lets and guest accommodation',
    ],
    character:
      'Rotherhithe rewards businesses with genuine character, provided that character survives the trip onto a phone screen.',
    neighbours: ['canada-water', 'surrey-quays', 'bermondsey', 'london-bridge'],
    faqs: [
      {
        q: 'Our website is old but we do not want to lose the character of the place.',
        a: 'That is the right instinct and it is mostly a photography problem, not a code problem. We usually start by shooting the premises properly, then build a fast, simple site around those pictures. Rebuilding does not mean looking like everyone else.',
      },
      {
        q: 'Do you take bookings and orders online?',
        a: 'Yes. Booking, payments and order forms are a standard part of a website build. We did exactly that for Surrey Quays Photo Studio on Lower Road, which now takes studio bookings, print orders and gift orders online instead of over the counter.',
      },
      {
        q: 'How do we get found by people walking the Thames Path?',
        a: 'Through your Google Business Profile far more than your website. Visitors search on a phone, in the moment, for a pub or a coffee near them. We get the profile complete, categorised correctly and stocked with real photographs, then make sure the website backs up what it claims.',
      },
    ],
  },

  {
    slug: 'bermondsey',
    name: 'Bermondsey',
    metaDescription:
      "Web design, local SEO and photography for Bermondsey businesses in SE1 and SE16. One Jubilee stop from our studio. Call 07367 293944.",
    postcodes: ['SE1', 'SE16'],
    borough: 'Southwark',
    tier: 2,
    geo: { lat: 51.4979, lng: -0.0637 },
    travel: 'One stop on the Jubilee line from Canada Water, or fifteen minutes along Jamaica Road.',
    stations: ['Bermondsey', 'South Bermondsey', 'London Bridge'],
    highStreets: ['Bermondsey Street', 'Tower Bridge Road', 'Southwark Park Road', 'Jamaica Road'],
    landmarks: [
      'Bermondsey Street',
      'Maltby Street Market',
      'Spa Terminus',
      'the Bermondsey Beer Mile',
      'White Cube Bermondsey',
      'the Fashion and Textile Museum',
    ],
    intro:
      'Bermondsey has the highest design expectations of anywhere near us. Between Bermondsey Street, Maltby Street and the railway arches at Spa Terminus, you are trading alongside galleries, architects, breweries and restaurants that all take their own branding seriously, and a cheap website shows immediately. The upside is that customers here will pay for quality when they can see it — which makes photography and a properly designed site a commercial decision rather than a vanity one.',
    businessTypes: [
      'Restaurants, bars and breweries',
      'Design, architecture and creative studios',
      'Galleries and makers',
      'Coffee roasters and food producers',
      'Boutiques and independent retail',
      'Clinics, dentists and wellbeing',
    ],
    character:
      'Bermondsey is a design-literate market: the bar for how a business looks online is set by the neighbours, not by the industry average.',
    neighbours: ['london-bridge', 'surrey-quays', 'rotherhithe', 'walworth'],
    faqs: [
      {
        q: 'We need something better designed than a template. Can you do that?',
        a: 'Yes — everything we build is designed for the business rather than dropped into a theme. Have a look at the work page and judge it against the Bermondsey standard before you get in touch.',
      },
      {
        q: 'Can you shoot food and interiors as well as build the site?',
        a: 'That is the combination most Bermondsey clients want. Photography, video and the website come from the same team, so the pictures are shot to fit the design instead of being cropped to fit afterwards.',
      },
      {
        q: 'How far are you from Bermondsey Street?',
        a: 'Close. The studio is on Lower Road in SE16, one Jubilee stop from Bermondsey station, so a site visit or a shoot is a short trip rather than a day out.',
      },
    ],
  },

  {
    slug: 'deptford',
    name: 'Deptford',
    metaDescription:
      "Web design, local SEO and photography for Deptford high street businesses, SE8. Ten minutes from our Surrey Quays studio. Call 07367 293944.",
    postcodes: ['SE8'],
    borough: 'Lewisham',
    tier: 2,
    geo: { lat: 51.4779, lng: -0.0265 },
    travel: 'Ten minutes by road from the studio, or two stops on the Overground from Surrey Quays.',
    stations: ['Deptford', 'Deptford Bridge', 'New Cross', 'Elverson Road'],
    highStreets: ['Deptford High Street', 'Deptford Broadway', 'Evelyn Street', 'Creekside'],
    landmarks: [
      'Deptford High Street',
      'Deptford Market',
      'Deptford Market Yard',
      'the Albany',
      'Trinity Laban at Creekside',
      'St Nicholas Church',
    ],
    intro:
      'Deptford High Street is one of the last genuinely busy independent high streets in south-east London: a market three days a week, fishmongers and butchers next to Vietnamese kitchens and record shops, and a level of footfall that most areas lost years ago. That footfall hides a problem, though. Plenty of Deptford traders have never needed a website, so when someone two miles away searches for what they sell, a chain gets the click instead. Fixing that is usually cheap and fast.',
    businessTypes: [
      'Market traders and independent retail',
      'Restaurants, cafés and takeaways',
      'Barbers, salons and nail bars',
      'Artists, makers and studios',
      'Music, performance and venues',
      'Trades and vehicle services',
    ],
    character:
      'Deptford has the footfall but often not the online presence, which makes it one of the easiest places locally to win search visibility quickly.',
    neighbours: ['new-cross', 'greenwich', 'surrey-quays', 'peckham'],
    faqs: [
      {
        q: 'We have never had a website. Where do we start?',
        a: 'With the Google Business Profile, usually — it is free, it is what people actually see when they search nearby, and it can be working within a week. Then a small website behind it to take bookings or orders. You do not need to spend a lot to go from invisible to findable.',
      },
      {
        q: 'Do you work with market traders and small shops?',
        a: 'Yes, and we price for it. Not every business needs a large build. Tell us what you sell and what you want more of, and we will quote the smallest thing that gets you there.',
      },
      {
        q: 'How quickly can we be showing up in local search?',
        a: 'Profile work shows movement in weeks. Ranking a website for competitive terms takes longer — usually three to six months of consistent work. We tell you which of the two you are buying before you commit.',
      },
    ],
  },

  {
    slug: 'new-cross',
    name: 'New Cross',
    metaDescription:
      "Web design, local SEO and photography for New Cross businesses, SE14. Mobile-first sites for a market that decides before leaving the house. 07367 293944.",
    postcodes: ['SE14'],
    borough: 'Lewisham',
    tier: 2,
    geo: { lat: 51.4757, lng: -0.0324 },
    travel: 'Two stops on the Overground from Surrey Quays, or fifteen minutes by road.',
    stations: ['New Cross', 'New Cross Gate', 'Deptford'],
    highStreets: ['New Cross Road', 'Lewisham Way', 'Deptford Broadway'],
    landmarks: [
      'Goldsmiths, University of London',
      'New Cross Road',
      'Fordham Park',
      'the Amersham Arms',
      'Deptford Town Hall',
      'Telegraph Hill Park',
    ],
    intro:
      'New Cross runs on Goldsmiths. Term time fills the cafés, print shops, barbers and takeaways along New Cross Road, and the summer empties them, which makes the trading year here unusually lumpy. It also means a large share of your customers are students who will not phone, will not walk in speculatively, and will judge you entirely on a phone screen before they leave the house — so mobile speed and honest photographs matter more here than almost anywhere.',
    businessTypes: [
      'Cafés, bars and late-night food',
      'Barbers, salons and tattoo studios',
      'Print, framing and repair shops',
      'Music venues and rehearsal spaces',
      'Student housing and letting agents',
      'Tutors, courses and studios',
    ],
    character:
      'New Cross is a young, mobile-first, term-time market that decides online before it ever walks through the door.',
    neighbours: ['deptford', 'peckham', 'greenwich', 'surrey-quays'],
    faqs: [
      {
        q: 'Our trade collapses outside term time. Can marketing help?',
        a: 'It can smooth it. The usual approach is to build a second audience that is not students — local residents and workers — and to run seasonal campaigns into the quiet months rather than spending evenly all year. We plan the year with you rather than selling a flat monthly retainer and hoping.',
      },
      {
        q: 'Most of our customers are on their phones. Does that change the build?',
        a: 'It changes everything about it. We build mobile-first as standard, on a stack that loads fast on a mid-range phone on mobile data, because that is what your customers are actually using.',
      },
      {
        q: 'Can you handle social media as well?',
        a: 'Yes. For New Cross businesses Instagram usually does more than search, so we often shoot content and run the account alongside the website rather than treating them separately.',
      },
    ],
  },

  {
    slug: 'peckham',
    name: 'Peckham',
    metaDescription:
      "Web design, local SEO and photography for Peckham businesses, SE15. Ranking on Rye Lane takes reviews, speed and real pictures. Call 07367 293944.",
    postcodes: ['SE15'],
    borough: 'Southwark',
    tier: 2,
    geo: { lat: 51.4739, lng: -0.0691 },
    travel: 'Fifteen minutes by road from the studio, or Overground via Queens Road Peckham.',
    stations: ['Peckham Rye', 'Queens Road Peckham', 'Nunhead'],
    highStreets: ['Rye Lane', 'Peckham High Street', 'Bellenden Road', 'Queens Road'],
    landmarks: [
      'Rye Lane',
      'Peckham Levels',
      'Copeland Park and the Bussey Building',
      'Peckham Rye Park',
      'Peckham Library',
      'Bellenden Road',
    ],
    intro:
      'Peckham is the most competitive local market on this list. Rye Lane, Peckham Levels and Copeland Park hold a density of bars, studios, galleries and independent food that would be unusual in central London, and the audience is design-aware and quick to move on. Ranking here is genuinely hard, and it is won on the details: real reviews, complete listings, fast pages, and photography that looks like Peckham rather than stock.',
    businessTypes: [
      'Bars, restaurants and street food',
      'Studios, galleries and makers',
      'Independent retail on Rye Lane',
      'Music, events and venues',
      'Barbers, salons and beauty',
      'Fitness, yoga and wellbeing',
    ],
    character:
      'Peckham is a crowded, design-aware market where local SEO is won on reviews, speed and honest photography rather than keyword stuffing.',
    neighbours: ['new-cross', 'deptford', 'walworth', 'surrey-quays'],
    faqs: [
      {
        q: 'There are twenty businesses like ours in Peckham. How do we get found?',
        a: 'By being unambiguously better on the signals Google can actually read: a complete and correctly categorised Google Business Profile, a steady flow of real reviews, a site that loads in a second on mobile, and pages that answer the specific thing people search for. There is no shortcut, but most of your competitors are not doing these properly.',
      },
      {
        q: 'Do you do photography that suits Peckham?',
        a: 'Yes, and we shoot on location rather than in a studio when that is what the brand needs. The point is that your pictures should look like your actual room, your actual food and your actual team.',
      },
      {
        q: 'Is Google Ads worth it here?',
        a: 'Sometimes, for high-value services and while your organic ranking is still building. For a £4 coffee it rarely pays. We will tell you when ads are the wrong answer.',
      },
    ],
  },

  {
    slug: 'greenwich',
    name: 'Greenwich',
    metaDescription:
      "Web design, local SEO and photography for Greenwich businesses, SE10. Visitor trade and residents need different targeting. Call 07367 293944.",
    postcodes: ['SE10'],
    borough: 'Greenwich',
    tier: 2,
    geo: { lat: 51.4826, lng: -0.0077 },
    travel: 'Fifteen minutes by road through the Rotherhithe tunnel, or DLR from Canary Wharf.',
    stations: ['Cutty Sark', 'Greenwich', 'North Greenwich', 'Maze Hill'],
    highStreets: ['Greenwich Church Street', 'Nelson Road', 'Trafalgar Road', 'Greenwich High Road'],
    landmarks: [
      'Greenwich Market',
      'the Cutty Sark',
      'the Royal Observatory',
      'the Old Royal Naval College',
      'Greenwich Park',
      'Greenwich Peninsula and the Design District',
    ],
    intro:
      'Greenwich has two economies that barely touch. Around the market, the Cutty Sark and the park you are selling to visitors who searched ten minutes ago on a phone and will never come back. Out along Trafalgar Road and up on the Peninsula you are selling to residents and workers who buy repeatedly. They need different websites and different marketing, and the common mistake is building one and hoping it covers both.',
    businessTypes: [
      'Hospitality, pubs and restaurants',
      'Market traders and gift retail',
      'Wedding and event venues',
      'Tour, activity and leisure operators',
      'Clinics, dentists and therapists',
      'Creative studios on the Peninsula',
    ],
    character:
      'Greenwich mixes high-intent visitor search with a steady residential market, and the two need to be targeted separately.',
    neighbours: ['deptford', 'canary-wharf', 'new-cross', 'surrey-quays'],
    faqs: [
      {
        q: 'Most of our customers are tourists. What matters most?',
        a: 'Your Google Business Profile, your reviews and your photographs — in that order. Visitor searches happen on a phone, within a few hundred metres, and are decided in seconds. The website matters for booking, but the listing is what wins the click.',
      },
      {
        q: 'We take bookings for events. Can the site handle that?',
        a: 'Yes. Enquiry forms, availability, deposits and Stripe payments are all standard. We built a full booking and order system for Surrey Quays Photo Studio, so nothing about events is new ground.',
      },
      {
        q: 'Do you cover the Greenwich Peninsula as well as the town centre?',
        a: 'Yes, both — though we would usually treat them as two different audiences in the marketing plan rather than one Greenwich campaign.',
      },
    ],
  },

  {
    slug: 'canary-wharf',
    name: 'Canary Wharf',
    metaDescription:
      "Web design, local SEO and photography for Canary Wharf businesses, E14. Three minutes from our studio on the Jubilee line. Call 07367 293944.",
    postcodes: ['E14'],
    borough: 'Tower Hamlets',
    tier: 2,
    geo: { lat: 51.5054, lng: -0.0235 },
    travel: 'One stop on the Jubilee line from Canada Water — about three minutes.',
    stations: ['Canary Wharf', 'Heron Quays', 'West India Quay', 'Canada Water'],
    highStreets: ['Cabot Place', 'Jubilee Place', 'Churchill Place', 'Westferry Road'],
    landmarks: [
      'One Canada Square',
      'the Canary Wharf estate',
      'Crossrail Place Roof Garden',
      'West India Docks',
      'Wood Wharf',
      'Billingsgate',
    ],
    intro:
      'Canary Wharf is one Jubilee stop from Canada Water, which makes it our nearest large commercial district — closer in practice than most of Southwark. The businesses we help here are rarely the banks. They are the consultancies, clinics, recruiters, studios and restaurants that sell to the people who work in the towers, and who are competing for attention against organisations with enormous marketing budgets. Precision beats volume in that fight: narrow targeting, fast pages, and a site that looks as credible as the postcode implies.',
    businessTypes: [
      'Consultancies and professional services',
      'Recruitment and training',
      'Clinics, dentists and physiotherapy',
      'Restaurants and corporate catering',
      'Fitness studios and personal trainers',
      'Fintech and B2B services',
    ],
    character:
      'Canary Wharf is a B2B and high-value services market where credibility and page speed carry more weight than breadth of keywords.',
    neighbours: ['canada-water', 'greenwich', 'surrey-quays', 'london-bridge'],
    faqs: [
      {
        q: 'We sell B2B, not to local walk-ins. Is local SEO still relevant?',
        a: 'Partly. "Near me" searches matter less, but searches that name the area — accountants in Canary Wharf, physiotherapist E14 — are high intent and worth owning. Beyond that we would focus on service pages, credibility and conversion rather than local signals alone.',
      },
      {
        q: 'How quickly can you get to us?',
        a: 'Three minutes on the Jubilee line from Canada Water, so same-day site visits and shoots are realistic. That is closer than most agencies pitching for E14 work.',
      },
      {
        q: 'Our brand needs to look credible to corporate clients. Can you handle that?',
        a: 'Yes. That means restraint, real photography of real people, fast load times and clear proof — not animation. Judge it from the work page.',
      },
    ],
  },

  {
    slug: 'london-bridge',
    name: 'London Bridge',
    metaDescription:
      "Web design, local SEO and photography for London Bridge and Borough businesses, SE1. Fast sites that win the walk-in decision. Call 07367 293944.",
    postcodes: ['SE1'],
    borough: 'Southwark',
    tier: 2,
    geo: { lat: 51.5049, lng: -0.0863 },
    travel: 'Two stops on the Jubilee line from Canada Water.',
    stations: ['London Bridge', 'Borough', 'Bermondsey', 'Tower Hill'],
    highStreets: ['Borough High Street', 'Tooley Street', 'Shad Thames', 'Bermondsey Street'],
    landmarks: [
      'Borough Market',
      'the Shard',
      'Southwark Cathedral',
      "Guy's Hospital",
      'Hay’s Galleria',
      'Shad Thames',
    ],
    intro:
      'London Bridge is a commuter and visitor funnel: tens of thousands of people pass through the station every morning, Borough Market pulls in weekend crowds, and the offices around More London and the Shard empty out at six. If you trade here your customer is almost always in a hurry and on a phone, deciding between you and three alternatives within a two-minute walk. Websites that take four seconds to load lose that decision before they finish rendering.',
    businessTypes: [
      'Restaurants, bars and food halls',
      'Professional and financial services',
      'Clinics and private healthcare',
      'Hotels and serviced apartments',
      'Retail and speciality food',
      'Events and venue hire',
    ],
    character:
      'London Bridge is a high-footfall, high-competition district where speed and clarity decide who gets the booking.',
    neighbours: ['bermondsey', 'rotherhithe', 'elephant-and-castle', 'canary-wharf'],
    faqs: [
      {
        q: 'Why does site speed matter so much around London Bridge?',
        a: 'Because your customer is walking, on mobile data, choosing between you and whoever else is nearby. Every second of load time loses a share of them. We build static, pre-rendered pages for exactly this reason — there is no database to wait for.',
      },
      {
        q: 'Do you work with restaurants and bars?',
        a: 'Yes, and photography usually does more for them than copy. We shoot the room and the food, then build a site that gets people to the booking in one tap.',
      },
      {
        q: 'Can you help us compete with big chains in local search?',
        a: 'On local search, often yes — chains are frequently poor at maintaining individual location profiles, and that is an opening. On paid search against a national ad budget, we will tell you honestly when it is not winnable.',
      },
    ],
  },

  {
    slug: 'elephant-and-castle',
    name: 'Elephant and Castle',
    metaDescription:
      "Web design, local SEO and photography for Elephant and Castle businesses, SE1 and SE17. Moved during the rebuild? We will get you found again.",
    postcodes: ['SE1', 'SE17'],
    borough: 'Southwark',
    tier: 3,
    geo: { lat: 51.4946, lng: -0.1005 },
    travel: 'Twenty minutes by road, or Jubilee to London Bridge then the Northern line.',
    stations: ['Elephant & Castle', 'Kennington', 'Lambeth North'],
    highStreets: ['Walworth Road', 'New Kent Road', 'London Road'],
    landmarks: [
      'Elephant Park',
      'London College of Communication',
      'Mercato Metropolitano',
      'Castle Square',
      'Walworth Road',
      'Burgess Park',
    ],
    intro:
      'Elephant and Castle has been rebuilt around its traders rather than for them. The old shopping centre is gone, a lot of long-standing businesses moved to Castle Square or further down Walworth Road, and customers who knew exactly where to find them no longer do. That is a search problem before it is anything else: if someone has to look you up to find where you went, you need to be findable.',
    businessTypes: [
      'Relocated independent traders',
      'Latin American food and retail',
      'Barbers, salons and beauty',
      'Student-facing services',
      'Cafés and takeaways',
      'Trades and repairs',
    ],
    character:
      'Elephant and Castle is an area mid-rebuild, where being findable matters more than usual because customers have lost their bearings.',
    neighbours: ['walworth', 'london-bridge', 'bermondsey', 'peckham'],
    faqs: [
      {
        q: 'We moved premises during the redevelopment and lost customers. Can you help?',
        a: 'Yes, and it is one of the most fixable problems there is. Update the Google Business Profile properly so the new address and map pin are right, get the old listing pointing at the new one, and put a clear page on the website saying where you are now. Regulars find you again quickly once the map is correct.',
      },
      {
        q: 'Do you build websites in other languages?',
        a: 'We can build bilingual sites, which is worth considering along Walworth Road where a lot of trade is Spanish and Portuguese speaking. Tell us who your customers are and we will advise honestly on whether it will earn its cost.',
      },
      {
        q: 'Is it worth it for a small shop?',
        a: 'Often the free half is. Getting the Google listing right costs you nothing but time and does most of the work for a small shop. We will say so rather than selling you a build you do not need.',
      },
    ],
  },

  {
    slug: 'walworth',
    name: 'Walworth',
    metaDescription:
      "Web design, local SEO and photography for Walworth Road and East Street businesses, SE17. Start small and get found. Call 07367 293944.",
    postcodes: ['SE17'],
    borough: 'Southwark',
    tier: 3,
    geo: { lat: 51.4871, lng: -0.0938 },
    travel: 'Twenty minutes by road from the studio.',
    stations: ['Elephant & Castle', 'Kennington', 'Oval'],
    highStreets: ['Walworth Road', 'East Street', 'Camberwell Road'],
    landmarks: [
      'East Street Market',
      'Walworth Road',
      'Pullens Yards',
      'Burgess Park',
      'Walworth Town Hall',
      'Faraday Gardens',
    ],
    intro:
      'Walworth Road and East Street Market make up one of the densest runs of independent trade in south London — hundreds of small businesses, most of them family run, many with no website at all. The market has been there since the nineteenth century and it still works, which is precisely why so few traders have felt the need to be online. The ones who do get found by a whole second audience: people three postcodes away who would never walk down East Street by accident.',
    businessTypes: [
      'Market traders and grocers',
      'Barbers, salons and nail bars',
      'Tailors, alterations and repairs',
      'Takeaways and cafés',
      'Artists and makers at Pullens Yards',
      'Trades and building services',
    ],
    character:
      'Walworth is a market economy with almost no digital competition, which makes even basic local SEO unusually effective here.',
    neighbours: ['elephant-and-castle', 'peckham', 'bermondsey', 'london-bridge'],
    faqs: [
      {
        q: 'Do we need a website if our trade is all from the market?',
        a: 'Not necessarily a big one. But a Google Business Profile and a single good page will put you in front of people who are searching from home rather than walking past, and that is usually a new audience rather than the same one. Start small.',
      },
      {
        q: 'We do alterations and repairs. Does that work online?',
        a: 'It does — we built exactly that for Alterique, a tailoring and alterations business, where customers photograph the garment and send it in for a quote. It saves everyone a trip and it captures enquiries out of hours.',
      },
      {
        q: 'What is the cheapest thing that would actually help?',
        a: 'Getting your Google listing complete and correct, with real photographs and the right categories. It is free, and for most Walworth businesses it is the single biggest available gain. Ask us and we will tell you what to fix.',
      },
    ],
  },

  {
    slug: 'walthamstow',
    name: 'Walthamstow',
    metaDescription:
      "Web design, local SEO and photography for Walthamstow businesses, E17 — we already work here. See the Alterique case study. Call 07367 293944.",
    postcodes: ['E17'],
    borough: 'Waltham Forest',
    tier: 3,
    geo: { lat: 51.5829, lng: -0.0197 },
    travel: 'Across town, and we already work here — Alterique on Hoe Street is a client.',
    stations: ['Walthamstow Central', 'Blackhorse Road', 'Wood Street', 'St James Street'],
    highStreets: ['Hoe Street', 'High Street', 'Wood Street', 'Blackhorse Lane'],
    landmarks: [
      'Walthamstow Market',
      'the William Morris Gallery',
      "God's Own Junkyard",
      'Lloyd Park',
      'Walthamstow Wetlands',
      'Blackhorse Lane',
    ],
    intro:
      'Walthamstow is the one area on this list that is nowhere near SE16, and we are on it because we already work here. Alterique, a tailoring and alterations studio in E17, came to us for a website that could take quotes from photographs of a garment. E17 has a particular mix — a very long street market, a strong maker and brewery scene around Blackhorse Lane, and a lot of family businesses that have been on Hoe Street for decades — and it rewards the same things SE16 does: real pictures, a fast site, and a listing that is actually filled in.',
    businessTypes: [
      'Tailors, alterations and dry cleaning',
      'Makers, breweries and studios',
      'Barbers, salons and beauty',
      'Cafés, bakeries and delis',
      'Family shops on Hoe Street',
      'Trades and home services',
    ],
    character:
      'Walthamstow is a maker-and-market economy with strong local loyalty, where being easy to contact matters as much as being easy to find.',
    neighbours: ['surrey-quays', 'canary-wharf', 'london-bridge'],
    faqs: [
      {
        q: 'You are in SE16. Can you really look after a business in E17?',
        a: 'We already do. Alterique is in Walthamstow and the website, the local SEO and the photography all came from us. Shoots need scheduling rather than a drop-in, and everything else works exactly the same.',
      },
      {
        q: 'Can customers get a quote without coming in?',
        a: 'Yes — that is what we built for Alterique. The customer photographs the garment, sends it through the site, and gets a quote back, with call and WhatsApp one tap away. It cuts out wasted visits on both sides.',
      },
      {
        q: 'Do you charge more for working further away?',
        a: 'No. Design, development and marketing are priced the same wherever you are. We only factor in travel if a job needs repeat on-site shoots.',
      },
    ],
  },
];

/** Areas sorted for display: home turf first, then alphabetically inside each tier. */
export const areasByTier = [1, 2, 3].map((tier) => ({
  tier: tier as 1 | 2 | 3,
  label: { 1: 'Our own postcode — SE16', 2: 'Neighbouring areas', 3: 'Further afield' }[tier as 1 | 2 | 3],
  areas: areas.filter((a) => a.tier === tier).sort((a, b) => a.name.localeCompare(b.name)),
}));

export function getArea(slug: string): Area | undefined {
  return areas.find((a) => a.slug === slug);
}

/** Every place name we serve, for the `areaServed` property in schema. */
export const areaNames = areas.map((a) => a.name);
