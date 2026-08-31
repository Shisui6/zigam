// Thought Leadership / Journal content.
// Placeholder posts for now — replace or extend as real articles are written.
// Each post's "cover" is drawn with CSS (no stock photos): pick a variant + motif.

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readMins: number;
  author: string;
  cover: { variant: "dark" | "gold" | "cream"; icon: string };
  featured?: boolean;
  body: { h?: string; p: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "the-quiet-luxury-of-a-kept-home",
    title: "The Quiet Luxury of a Kept Home",
    excerpt:
      "True luxury isn't louder — it's lighter. On why a consistently kept home is the most underrated upgrade to modern living.",
    category: "Modern Living",
    date: "2026-08-01",
    readMins: 5,
    author: "The Zigam Journal",
    cover: { variant: "dark", icon: "fa-house-chimney" },
    featured: true,
    body: [
      {
        p: "There is a particular feeling that greets you in a well-kept home. The air feels lighter. Surfaces hold their line. Nothing calls for your attention, and so your attention is finally yours again.",
      },
      {
        p: "We tend to think of luxury as addition — more space, more things, more finish. But the households that feel most luxurious are usually practising subtraction: fewer undone tasks, fewer small frictions, fewer moments where the home asks something of you.",
      },
      {
        h: "The cost of the undone",
        p: "Every unmade bed, every pile that needs sorting, every errand deferred is a small open loop. Individually they are trivial. Together they form a quiet tax on your focus — one you pay every time you walk past them.",
      },
      {
        p: "This is the real case for professional home support. Not appearance, but bandwidth. When the keeping of the home is handled — reliably, discreetly, to a standard — the people in it are free to live at their best.",
      },
      {
        h: "A state of perpetual readiness",
        p: "At Zigam we call this a state of perpetual readiness: a home that is always ready to host, to rest, to work, to begin. It is what our Associates are trained to create, and what our clients describe most often — not that the house is clean, but that life feels easier inside it.",
      },
    ],
  },
  {
    slug: "mise-en-place-for-your-life",
    title: "Mise en Place, for Your Life",
    excerpt:
      "Chefs never start cooking until everything is in its place. The same principle, applied to a household, changes everything.",
    category: "Productivity",
    date: "2026-07-24",
    readMins: 4,
    author: "The Zigam Journal",
    cover: { variant: "gold", icon: "fa-utensils" },
    body: [
      {
        p: "In a professional kitchen, no one begins service until the mise en place is complete. Ingredients washed, cut, portioned; tools laid out; stations wiped. The discipline looks like preparation, but it is really a philosophy: decide once, so you never have to decide under pressure.",
      },
      {
        h: "Households run on the same physics",
        p: "A home where the pantry is organised, the wardrobe is sorted, and the week's essentials are already in place runs differently. Mornings shorten. Evenings soften. The dozens of micro-decisions that usually fragment a day simply don't arise.",
      },
      {
        p: "This is why Kitchen Operations is one of the four pillars of the Ozi Experience. Our Associates apply the mise en place standard to private kitchens — prepping ingredients, organising pantries, restoring order after use — so that cooking becomes the enjoyable part, not the recovery from chaos.",
      },
      {
        h: "Start with one station",
        p: "You don't need a full brigade to feel the difference. Pick one station — the pantry, the wardrobe, the entryway — and bring it to complete readiness. Then protect it. The calm is contagious.",
      },
    ],
  },
  {
    slug: "what-your-time-is-actually-worth",
    title: "What Your Time Is Actually Worth",
    excerpt:
      "Eight hours of household work is not free just because you did it yourself. A practical way to think about outsourcing.",
    category: "Time",
    date: "2026-07-15",
    readMins: 6,
    author: "The Zigam Journal",
    cover: { variant: "cream", icon: "fa-hourglass-half" },
    body: [
      {
        p: "Most people price their time at zero when they spend it on housework — and at a premium when they spend it on anything else. The arithmetic rarely gets examined, because the cost is invisible: it's paid in evenings, weekends, and energy.",
      },
      {
        h: "The honest calculation",
        p: "Take the hours your household consumes in a week — cleaning, laundry, errands, kitchen work. For many busy professionals and families it lands between ten and twenty hours. Now ask what those hours would be worth invested in your work, your family, your health, or simply your rest.",
      },
      {
        p: "Outsourcing is often framed as an indulgence. Framed honestly, it is a trade: money for time, at an exchange rate that strongly favours anyone whose time compounds — builders, parents, professionals, founders.",
      },
      {
        h: "Design the trade deliberately",
        p: "The key is structure. Ad-hoc help saves hours; a system returns them predictably. One booking, one trained Associate, four essential services, eight hours — that predictability is what turns bought time into a genuine upgrade in how a week feels.",
      },
    ],
  },
  {
    slug: "the-dignity-of-service",
    title: "The Dignity of Service",
    excerpt:
      "Service work is skilled work. Inside Zigam's conviction that professionalising homemaking elevates everyone it touches.",
    category: "Our Philosophy",
    date: "2026-07-05",
    readMins: 5,
    author: "The Zigam Journal",
    cover: { variant: "dark", icon: "fa-award" },
    body: [
      {
        p: "Somewhere along the way, service work was miscategorised as unskilled. Anyone who has watched a true professional reset a room, press a garment, or run a kitchen knows better. Excellence in service is technique, judgement, and care — practised until it looks effortless.",
      },
      {
        h: "We don't just hire; we curate",
        p: "Every Zigam Associate is rigorously vetted and trained in collaboration with leading hospitality institutions. They arrive with the highest standard of technical skill and domestic expertise — and with something rarer: pride in the profession.",
      },
      {
        p: "That pride changes the experience on both sides of the door. Clients receive service delivered with distinction and discretion. Associates receive structure, supervision, fair opportunity, and the dignity of formal work.",
      },
      {
        h: "An ecosystem, not a marketplace",
        p: "This is what we mean when we call Zigam an ecosystem. Not a place where tasks meet hands at the lowest price, but a standard — one that raises the value of service for the homes that receive it and the professionals who deliver it.",
      },
    ],
  },
  {
    slug: "hosting-without-the-scramble",
    title: "Hosting Without the Scramble",
    excerpt:
      "The secret to gracious hosting isn't effort on the day — it's the systems running quietly the week before.",
    category: "Modern Living",
    date: "2026-06-20",
    readMins: 4,
    author: "The Zigam Journal",
    cover: { variant: "gold", icon: "fa-champagne-glasses" },
    body: [
      {
        p: "Everyone knows the pre-guest scramble: the frantic hour where cushions are punched, surfaces are swept, and the oven becomes storage. It works, barely — but it costs the host the very ease they hope to offer their guests.",
      },
      {
        h: "Gracious homes are maintained, not rescued",
        p: "The households that host beautifully are rarely doing anything heroic on the day. Their linen is pressed because it is always pressed. The kitchen is ready because readiness is its resting state. Hospitality becomes a matter of opening the door.",
      },
      {
        p: "A weekly rhythm of professional support — cleaning and care, wardrobe and laundry, kitchen operations — is what makes that resting state possible. It converts hosting from an event into an extension of how the home already runs.",
      },
      {
        h: "The one-day version",
        p: "Expecting guests and starting from behind? A single eight-hour reset — A Taste of Ozi — takes a home from lived-in to guest-ready while you attend to everything else a host actually needs to do.",
      },
    ],
  },
  {
    slug: "a-week-with-an-ozi-associate",
    title: "A Week with an Ozi Associate",
    excerpt:
      "What actually happens across five days of the Ozi Experience — hour by hour, room by room.",
    category: "The Ozi Experience",
    date: "2026-06-08",
    readMins: 7,
    author: "The Zigam Journal",
    cover: { variant: "cream", icon: "fa-calendar-week" },
    body: [
      {
        p: "The Ozi Experience is easiest to understand not as a list of services but as a week. Here is how one unfolds for a Business-tier member in Lekki — five days, one Associate, four disciplines.",
      },
      {
        h: "Monday: the reset",
        p: "The week opens with a full clean and spatial reset. Surfaces, floors, bathrooms, the weekend's traces removed. The home returns to its baseline — the state every other day will maintain rather than chase.",
      },
      {
        h: "Tuesday and Wednesday: wardrobe and kitchen",
        p: "Laundry cycles run while wardrobes are sorted and pressed pieces return to their places. In the kitchen: mise en place. Vegetables washed and prepped, proteins portioned, the pantry brought back to order, everything positioned for the evening's cooking.",
      },
      {
        h: "Thursday: the concierge day",
        p: "Errands leave the household's list and join the Associate's. Market runs, collections, deliveries, the small logistics that otherwise leak into evenings. The client's only involvement is the list itself.",
      },
      {
        h: "Friday: readiness",
        p: "A lighter clean, linen refreshed, the home brought to full readiness for the weekend — for guests, for rest, for nothing at all. That, in the end, is the product: a week that ends the way it began, without the household ever falling behind.",
      },
    ],
  },
];

export const getPost = (slug: string) => blogPosts.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Date(iso + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
