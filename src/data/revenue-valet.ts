// Revenue Valet (formerly RVP) copy, taken from utilityvalet.io/rvp.
// The live page set most of this inside images; it's transcribed here verbatim.

/*
 * The service copy (card text and the /revenue-valet/<slug> subpages) is edited
 * in Sanity; see src/lib/sanity.ts. `ServiceKey` picks each service's icon and
 * illustration and must match the "Icon & illustration" options in the Studio.
 */
export type ServiceKey = "instanet" | "insurance" | "pest" | "filters" | "rewards" | "credit" | "deals" | "valet"

// Teaser at the end of the offer grid. It has no subpage, so it stays in code.
export const comingSoon = {
  title: "Other Services Coming",
  body: "Exciting new property technologies designed to drive NOI through cost savings, insurance innovations, human capital solutions, and more.",
}

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
