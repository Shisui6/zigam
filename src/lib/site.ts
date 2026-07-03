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
  workforceForm: "https://forms.gle/Vz3sJi5TgAceiSSW7", // job application
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

export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Book", href: "/booking" },
  { label: "Contact", href: "/contact" },
];

export const oziTiers = [
  { plan: "Economy", freq: "1 day / week · 4 days / month", price: "52,000" },
  { plan: "Essential", freq: "2 days / week · 8 days / month", price: "104,000" },
  { plan: "Standard", freq: "3 days / week · 12 days / month", price: "156,000" },
  { plan: "Premium", freq: "4 days / week · 16 days / month", price: "208,000" },
  { plan: "Business", freq: "5 days / week · 20 days / month", price: "260,000" },
  { plan: "Executive", freq: "6 days / week · 24 days / month", price: "312,000" },
  { plan: "Luxury", freq: "7 days / week · all days of the month", price: "403,000" },
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

export const oziServices = [
  { icon: "broom", title: "Cleaning", desc: "Home and office cleaning that creates clean, beautifully maintained, and refreshed spaces." },
  { icon: "shirt", title: "Laundry", desc: "Thoughtful wardrobe and linen care — washed, dried, and folded with attention to detail." },
  { icon: "utensils", title: "Kitchen Operations", desc: "A professional “mise en place” — your kitchen prepped, sanitized, and ready to use." },
  { icon: "bag", title: "Errands", desc: "We handle everyday tasks and personal errands, so you focus on what matters most." },
];
