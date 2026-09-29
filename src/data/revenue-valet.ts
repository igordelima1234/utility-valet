// Revenue Valet (formerly RVP) copy, taken from utilityvalet.io/rvp.
// The live page set most of this inside images; it's transcribed here verbatim.

export type Offering = { title: string; body: string; stats?: { value: string; label: string }[] }

export const offerings = {
  instanet: {
    title: "Instanet",
    body: "High speed internet with the nation’s best providers for your residents, saving them money and making you ancillary income.",
  },
  insurance: {
    title: "Renter's Insurance & Tenant Liability",
    body: "Full service beyond the industry standard to include greater coverage for your resident and white glove service for your operators.",
  },
  pest: {
    title: "On-Demand Pest Control",
    body: "Resident response within five minutes and scheduled service within three business days, all without your team having to coordinate.",
    stats: [
      { value: "5 min", label: "Resident response" },
      { value: "3 days", label: "Scheduled service" },
    ],
  },
  filters: {
    title: "Air Filter Delivery",
    body: "Lower HVAC maintenance costs by 40% and allow residents to save 15% on heating/cooling bills with multiple shipping options.",
    stats: [
      { value: "40%", label: "Lower HVAC maintenance" },
      { value: "15%", label: "Resident energy savings" },
    ],
  },
  rewards: {
    title: "Rewards Program",
    body: "Reward your residents for doing their part and convert on-time rent payments into points, prizes, deals, and more.",
  },
  credit: {
    title: "Credit Reporting",
    body: "Give your residents a financial boost and incentive for paying rent on-time; attract and cultivate higher quality resident behavior.",
  },
  deals: {
    title: "Exclusive Deals",
    body: "Drive resident experience by allowing your residents to save on everyday items from groceries to automotive and everything in between.",
  },
  valet: {
    title: "Utility Valet",
    body: "Walk your new residents through a painful chore with our white glove service that leads to a five-star first impression (and reviews) at move-in.",
  },
  coming: {
    title: "Other Services Coming",
    body: "Exciting new property technologies designed to drive NOI through cost savings, insurance innovations, human capital solutions, and more.",
  },
} satisfies Record<string, Offering>

export const pillars = [
  {
    title: "Broad Offerings",
    body: "A suite of industry-leading services and products, thoughtfully designed so you can bundle or fully customize them to fit your needs.",
  },
  {
    title: "Better Pricing",
    body: "We’ve done the hard work of negotiating so you can offer more value to your residents and make more money.",
  },
  {
    title: "Better Service",
    body: "With our white glove approach at Utility Valet, we’ve built a better service model—and since we’re not the big fish, we push harder.",
  },
]

// `valet` is the team member each resident is praising.
export const valetReviews = [
  {
    valet: "Eric",
    quote:
      "Eric was fantastic! He walked me through everything with clear explanations and answered all of my questions without rushing. Exceptional service like his is rare to find, and he exceeded my expectations.",
  },
  {
    valet: "Haden",
    quote:
      "Haden was absolutely wonderful! Very helpful and explained things well. I was very impressed with the quality of service he provided. He is awesome!",
  },
  {
    valet: "Luke",
    quote:
      "Luke was very polite and informative! Really enjoyed working with him and the process is quick, convenient, and easy. Wish I could give more stars!!",
  },
  {
    valet: "Skylar",
    quote:
      "This was so helpful, and I really appreciate the convenience of a one-stop-shop service. Skylar was patient and helpful answering all my questions and addressing my concerns.",
  },
  {
    valet: "Lena",
    quote:
      "Lena was amazing! She got everything we needed fast, as we moved in 3 days! She was very quick to respond with all the questions we had!",
  },
  {
    valet: "Skyler",
    quote:
      "I ended up needing to call back and work through something, and Skyler was fantastic! What a great guy to work with. He was so patient and got everything done for us quickly.",
  },
  {
    valet: "Lena",
    quote:
      "Lena made the whole experience so smooth and easy to do I was able to handle it while doing my job at work! Appreciate y'all hiring such a good person!",
  },
]

/*
 * Service subpages (/revenue-valet/<slug>). Overview copy is built only from
 * existing site copy: the card text above, the pillars, the Instanet nav line
 * ("Bulk internet. Zero CapEx. Higher NOI.") and the homepage. No new figures.
 */
export type ServiceKey = Exclude<keyof typeof offerings, "coming">

export type ServicePage = {
  key: ServiceKey
  slug: string
  headline: string
  overview: { heading: string; paragraphs: string[]; points: { title: string; body: string }[] }
}

export const servicePages: ServicePage[] = [
  {
    key: "instanet",
    slug: "instanet",
    headline: "High speed internet, built into the lease",
    overview: {
      heading: "Bulk internet. Zero CapEx. Higher NOI.",
      paragraphs: [
        "Instanet brings high speed internet from the nation’s best providers to every resident in your community.",
        "Residents save money on a service they need from day one, and your property earns ancillary income from every connection.",
      ],
      points: [
        { title: "Residents save", body: "High speed internet from the nation’s best providers that saves them money." },
        { title: "You earn", body: "A new ancillary income stream that raises NOI, with zero CapEx." },
        { title: "Bundle or stand alone", body: "Run Instanet by itself or pair it with any other Revenue Valet service." },
      ],
    },
  },
  {
    key: "insurance",
    slug: "renters-insurance",
    headline: "Coverage that goes beyond the industry standard",
    overview: {
      heading: "Better coverage for residents. Better service for operators.",
      paragraphs: [
        "Our renter’s insurance and tenant liability program goes beyond the industry standard, with greater coverage for your residents.",
        "Your operators get white glove service from the same team residents already rave about at Utility Valet.",
      ],
      points: [
        { title: "Greater coverage", body: "Full service beyond the industry standard to better protect your residents." },
        { title: "White glove service", body: "Your operators get the same white glove approach Utility Valet is known for." },
        { title: "Better pricing", body: "We’ve done the hard work of negotiating so you can offer more value to your residents." },
      ],
    },
  },
  {
    key: "pest",
    slug: "pest-control",
    headline: "Pest control on demand, with nothing for your team to coordinate",
    overview: {
      heading: "Fast response for residents. Zero coordination for your team.",
      paragraphs: [
        "When a resident reports a pest problem, we respond within five minutes and schedule service within three business days.",
        "Your team never has to play middleman between residents and vendors.",
      ],
      points: [
        { title: "5-minute response", body: "Residents hear back within five minutes of reaching out." },
        { title: "Service in 3 business days", body: "Treatment is scheduled within three business days." },
        { title: "Hands-off for your team", body: "We handle the back-and-forth so your staff can focus elsewhere." },
      ],
    },
  },
  {
    key: "filters",
    slug: "air-filter-delivery",
    headline: "Fresh air filters, delivered to every door",
    overview: {
      heading: "Lower maintenance costs. Lower energy bills.",
      paragraphs: [
        "Regular air filter delivery keeps HVAC systems running clean, lowering maintenance costs by 40%.",
        "Residents save 15% on heating and cooling bills, and choose from multiple shipping options.",
      ],
      points: [
        { title: "40% lower HVAC maintenance", body: "Clean filters mean fewer service calls and longer-lasting equipment." },
        { title: "15% resident savings", body: "Residents spend less on heating and cooling." },
        { title: "Multiple shipping options", body: "Filters arrive on a schedule that fits each resident." },
      ],
    },
  },
  {
    key: "rewards",
    slug: "rewards-program",
    headline: "Reward residents for paying on time",
    overview: {
      heading: "Turn on-time rent into points, prizes and deals.",
      paragraphs: [
        "Our rewards program recognizes residents for doing their part.",
        "Every on-time rent payment converts into points they can use for prizes, deals and more.",
      ],
      points: [
        { title: "Points for on-time rent", body: "Residents earn with every payment they make on time." },
        { title: "Prizes, deals and more", body: "Points turn into rewards residents actually want." },
        { title: "A reason to pay on time", body: "A simple, positive incentive built into the resident experience." },
      ],
    },
  },
  {
    key: "credit",
    slug: "credit-reporting",
    headline: "Help residents build credit with every on-time payment",
    overview: {
      heading: "A financial boost for residents. Better behavior for your community.",
      paragraphs: [
        "Credit reporting gives residents a financial boost and a real incentive to pay rent on time.",
        "The result: you attract and cultivate higher quality resident behavior.",
      ],
      points: [
        { title: "A financial boost", body: "On-time rent helps residents build their credit." },
        { title: "An incentive to pay on time", body: "Residents have a clear reason to stay current." },
        { title: "Higher quality residents", body: "Attract and cultivate better resident behavior across your portfolio." },
      ],
    },
  },
  {
    key: "deals",
    slug: "exclusive-deals",
    headline: "Everyday savings for your residents",
    overview: {
      heading: "Savings from groceries to automotive and everything in between.",
      paragraphs: [
        "Exclusive deals let residents save on the things they buy every week.",
        "It’s an easy way to make living at your property feel like a better deal.",
      ],
      points: [
        { title: "Groceries", body: "Savings on the everyday essentials." },
        { title: "Automotive", body: "Deals that help residents keep their cars running." },
        { title: "Everything in between", body: "Savings across everyday categories that drive a better resident experience." },
      ],
    },
  },
  {
    key: "valet",
    slug: "utility-valet",
    headline: "A five-star first impression at move-in",
    overview: {
      heading: "We set up utilities so residents arrive to a home that’s ready.",
      paragraphs: [
        "Moving is stressful, and setting up utilities is one of the most painful chores.",
        "Our valets walk every new resident through electricity, water, internet and more before move-in. The result is a five-star first impression (and reviews).",
      ],
      points: [
        { title: "Make life easier for residents", body: "Dedicated service that helps residents feel supported from day one." },
        { title: "Save time for your staff", body: "We handle every utility setup, freeing your team for higher-priority work." },
        { title: "Earn through revenue sharing", body: "A hassle-free revenue stream for your property on every move-in." },
      ],
    },
  },
]

export const servicePageFor = (key: ServiceKey) => servicePages.find((p) => p.key === key)!
