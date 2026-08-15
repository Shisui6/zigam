// Central site configuration — edit values here to update across the app.

export const site = {
  name: "ZIGAM",
  tagline: "Your Home, Our Willing Hands.",
  rc: "RC No. 9288075",
  phone: "+234 705 372 8258",
  phoneHref: "tel:+2347053728258",
  email: "Zigam2026@gmail.com",
  // Google Forms
  foundersForm: "https://forms.gle/ZKiv88SXvTrNgeNM8", // launch list / Founder's Access
  workforceForm: "https://forms.gle/jZR4aMegDtSm29XKA", // job application
  // Launch countdown target (West Africa Time, UTC+1)
  launchDate: "2026-07-15T09:00:00+01:00",
  socials: {
    instagram: "https://www.instagram.com/zigamozi/",
    facebook: "https://web.facebook.com/profile.php?id=61591459292455",
    linkedin: "https://www.linkedin.com/company/zigam/",
  },
  offices: {
    enugu: { label: "Enugu", lines: ["Number 4 Ridge Way Road,", "GRA, Enugu."] },
    lagos: { label: "Lagos", lines: ["Bayview Estate,", "Lekki, Lagos State."] },
  },
};

export const founder = {
  fullName: "Kaetochukwu Udeh",
  shortName: "Kaeto",
  title: "Founder",
  photo: "/images/founder-kaeto.jpeg",
  initials: "KU",
  bio:
    "Zigam was born from a simple conviction: that exceptional home and workplace support should be effortless, dignified, and built on trust. Kaeto leads that vision — pairing world-class training with genuine care to redefine modern living across Africa.",
};

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Book", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

// ---- The Ozi Experience: four services, always in this order, full names ----
export const oziServices = [
  {
    icon: "broom",
    title: "Cleaning and Care",
    desc: "Home and workplace cleaning that creates clean, beautifully maintained, and refreshed spaces.",
  },
  {
    icon: "shirt",
    title: "Wardrobe and Laundry",
    desc: "Thoughtful care for your garments and household linens, handled with precision.",
  },
  {
    icon: "bag",
    title: "Errand Concierge",
    desc: "Managing everyday tasks and your personal errands with ease, so you focus on what matters.",
  },
  {
    icon: "utensils",
    title: "Kitchen Operation",
    desc: "A professional “mise en place” — ingredient prep, pantry organisation, and kitchen upkeep.",
  },
];

// ---- Ozi Membership tiers (monthly) ----
export const oziTiers = [
  { plan: "Economy", freq: "1 day / week · 4 days / month", price: "52,000" },
  { plan: "Essential", freq: "2 days / week · 8 days / month", price: "104,000" },
  { plan: "Standard", freq: "3 days / week · 12 days / month", price: "156,000" },
  { plan: "Premium", freq: "4 days / week · 16 days / month", price: "208,000" },
  { plan: "Business", freq: "5 days / week · 20 days / month", price: "260,000" },
  { plan: "Executive", freq: "6 days / week · 24 days / month", price: "312,000" },
  { plan: "Luxury", freq: "7 days / week · all days of the month", price: "364,000" },
];

export const deepCleaning = [
  { rooms: "1 Bedroom", price: "90,000" },
  { rooms: "2 Bedroom", price: "100,000" },
  { rooms: "3 Bedroom", price: "150,000" },
  { rooms: "4 Bedroom", price: "180,000" },
  { rooms: "5 Bedroom", price: "200,000" },
  { rooms: "6 Bedroom", price: "230,000" },
  { rooms: "7 Bedroom", price: "250,000" },
];

// ---- Ozi Plus (formerly "Specialty Services") — display order matters ----
export const oziPlus = [
  { icon: "fa-truck-ramp-box", title: "Move-in / Move-out", desc: "A thorough clean when moving in or out — priced within the deep cleaning range." },
  { icon: "fa-hard-hat", title: "Post-Construction Clean", desc: "Dust, debris, and window polish for newly built or renovated spaces." },
  { icon: "fa-house-chimney-window", title: "Airbnb / Shortlet", desc: "Turnover-ready cleaning for short-let and hospitality spaces." },
  { icon: "fa-building", title: "Office Cleaning and Care", desc: "Considered, discreet cleaning and upkeep for workplaces of every size." },
  { icon: "fa-couch", title: "Couch & Rug Cleaning", desc: "Sofa, cushion, upholstery and rug detailing." },
  { icon: "fa-boxes-stacked", title: "Decluttering and Organising", desc: "Sorting, boxing, and organising for a calmer, more efficient environment." },
  { icon: "fa-utensils", title: "Hire a Private Chef", desc: "A professional chef for your table — everyday dining or a occasion worth marking." },
  { icon: "fa-hand-holding-heart", title: "Elderly Care and Child Care", desc: "Light caregiving, companionship, and attentive activity support." },
  { icon: "fa-seedling", title: "Gardening and Landscaping", desc: "Lawn care, flower beds, and general yard upkeep." },
  { icon: "fa-shield-virus", title: "Fumigation", desc: "Professional pest control, delivered in partnership with specialists." },
];

// ---- Workforce FAQ (shown on the Home page) ----
export const workforceFaq = [
  { q: "Do I need prior experience?", a: "No. We provide full onboarding and training." },
  { q: "What's the pay?", a: "Pay depends on services provided and hours committed. All compensation is fair and transparent." },
  { q: "Is this full-time work?", a: "We offer flexible part-time work that fits your work, school or family life." },
  { q: "What qualifications do I need?", a: "We value honesty and a willingness to learn. You should be at least 18 years old with basic communication skills and a positive attitude." },
  { q: "How do I get started?", a: "Click the “Apply Now” button above to fill out our application form. Our team will contact you within 3–5 business days." },
];
