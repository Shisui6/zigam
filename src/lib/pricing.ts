// ============================================================
// Zigam pricing engine — single source of truth for money.
// All amounts in Naira (₦). Convert to kobo (×100) only at Paystack.
// ============================================================

import { oziTiers, deepCleaning } from "./site";

// ---- Configurable rates ----
export const RATES = {
  offHoursSurcharge: 0.3, // +30% for time slots outside 9am–5pm
  sundaySurcharge: 0.4, // +40% for Sunday bookings (source lists 30% vs 40% — confirm)
  upfront6MonthDiscount: 0.05, // 5% off six months upfront (memberships)
  tasteOfOziPrice: 15000, // A Taste of Ozi — one day experience
};

// ---- The Assurance ----------------------------------------------------
// Fee is either a flat amount or a percentage of the service price.
// Coverage is what the client is protected up to.
export const ASSURANCE = {
  membership: { type: "flat" as const, fee: 5000, coverage: 50000, note: "One-time fee" },
  tasteOfOzi: { type: "flat" as const, fee: 1000, coverage: 10000, note: "Per booking" },
  // Deep cleaning, move-in and move-out: 5% of service price, covers 10% of it.
  percentage: { type: "percent" as const, feeRate: 0.05, coverageRate: 0.1, note: "Per booking" },
};

export type BookingType = "one_time" | "subscription";
export type Location = "enugu" | "lagos";
export type TimeSlot = "standard" | "off_hours"; // standard = 9am–5pm

export type OneTimeService =
  | "taste_of_ozi"
  | "deep_cleaning"
  | "move_in_out"
  | "post_construction"
  | "airbnb"
  | "office_cleaning"
  | "couch_rug"
  | "decluttering"
  | "private_chef"
  | "care"
  | "gardening"
  | "fumigation";

/**
 * One-time services in the exact order they should appear when booking.
 * `quote` = custom-priced (no instant total).
 * `bedrooms` = show the 1–7 bedroom selector.
 */
export const oneTimeServices: {
  id: OneTimeService;
  label: string;
  quote?: boolean;
  bedrooms?: boolean;
  fixedPrice?: number;
}[] = [
  { id: "taste_of_ozi", label: "A Taste of Ozi", fixedPrice: RATES.tasteOfOziPrice },
  { id: "deep_cleaning", label: "Deep Cleaning", bedrooms: true },
  { id: "move_in_out", label: "Move-in / Move-out", bedrooms: true },
  { id: "post_construction", label: "Post-Construction Clean", quote: true, bedrooms: true },
  { id: "airbnb", label: "Airbnb / Shortlet", quote: true, bedrooms: true },
  { id: "office_cleaning", label: "Office Cleaning and Care", quote: true, bedrooms: true },
  { id: "couch_rug", label: "Couch & Rug Cleaning", quote: true },
  { id: "decluttering", label: "Decluttering and Organising", quote: true },
  { id: "private_chef", label: "Hire a Private Chef", quote: true },
  { id: "care", label: "Elderly Care and Child Care", quote: true },
  { id: "gardening", label: "Gardening and Landscaping", quote: true },
  { id: "fumigation", label: "Fumigation", quote: true },
];

export type PriceInput = {
  type: BookingType;
  oziPlan?: string; // membership tier name
  service?: OneTimeService; // for one_time
  bedrooms?: string; // matches deepCleaning[].rooms
  timeSlot?: TimeSlot;
  date?: string; // ISO date (yyyy-mm-dd)
  assurance?: boolean;
  upfront6Months?: boolean; // membership only
};

export type PriceBreakdown = {
  base: number;
  surcharges: { label: string; amount: number }[];
  assurance: number;
  assuranceCoverage: number;
  discount: number;
  total: number;
  isQuote: boolean; // true = "contact for quote", no instant price
  note?: string;
};

const naira = (n: number) => Math.round(n);

/** What the Assurance costs (and covers) for a given selection. */
export function assuranceFor(input: PriceInput, base: number) {
  if (input.type === "subscription") {
    return { fee: ASSURANCE.membership.fee, coverage: ASSURANCE.membership.coverage };
  }
  if (input.service === "taste_of_ozi") {
    return { fee: ASSURANCE.tasteOfOzi.fee, coverage: ASSURANCE.tasteOfOzi.coverage };
  }
  if (input.service === "deep_cleaning" || input.service === "move_in_out") {
    return {
      fee: naira(base * ASSURANCE.percentage.feeRate),
      coverage: naira(base * ASSURANCE.percentage.coverageRate),
    };
  }
  return { fee: 0, coverage: 0 };
}

export function computePrice(input: PriceInput): PriceBreakdown {
  const surcharges: { label: string; amount: number }[] = [];
  let base = 0;
  let isQuote = false;
  let note: string | undefined;

  if (input.type === "subscription") {
    const tier = oziTiers.find((t) => t.plan === input.oziPlan);
    base = tier ? Number(tier.price.replace(/,/g, "")) : 0;
  } else {
    const svc = oneTimeServices.find((s) => s.id === input.service);
    if (!svc) {
      base = 0;
    } else if (svc.fixedPrice) {
      base = svc.fixedPrice;
    } else if (svc.quote) {
      isQuote = true;
      note = "This service is custom-priced — we'll send you a quote.";
    } else if (svc.bedrooms) {
      const row = deepCleaning.find((d) => d.rooms === input.bedrooms);
      base = row ? Number(row.price.replace(/,/g, "")) : 0;
      if (!row) note = "Select your home size to see the price.";
    }
  }

  // Surcharges only apply to priced (non-quote) bookings
  if (!isQuote && base > 0) {
    if (input.timeSlot === "off_hours") {
      surcharges.push({ label: "Outside 9am–5pm (+30%)", amount: naira(base * RATES.offHoursSurcharge) });
    }
    if (input.date) {
      const day = new Date(input.date + "T12:00:00").getDay();
      if (day === 0) {
        surcharges.push({ label: "Sunday booking (+40%)", amount: naira(base * RATES.sundaySurcharge) });
      }
    }
  }

  // Assurance is calculated on the service price (before surcharges)
  const cover = assuranceFor(input, base);
  const assurance = input.assurance && !isQuote ? cover.fee : 0;
  const assuranceCoverage = input.assurance && !isQuote ? cover.coverage : 0;

  const surchargeTotal = surcharges.reduce((s, x) => s + x.amount, 0);
  let discount = 0;
  if (input.type === "subscription" && input.upfront6Months && base > 0) {
    discount = naira(base * 6 * RATES.upfront6MonthDiscount);
  }

  const total = isQuote
    ? 0
    : input.type === "subscription" && input.upfront6Months
    ? naira(base * 6 + assurance - discount)
    : naira(base + surchargeTotal + assurance);

  return { base, surcharges, assurance, assuranceCoverage, discount, total, isQuote, note };
}

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });
