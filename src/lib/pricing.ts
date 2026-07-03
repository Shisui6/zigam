// ============================================================
// Zigam pricing engine — single source of truth for money.
// All amounts in Naira (₦). Convert to kobo (×100) only at Paystack.
// ============================================================

import { oziTiers, deepCleaning } from "./site";

// ---- Configurable rates (confirm with business before go-live) ----
export const RATES = {
  offHoursSurcharge: 0.3, // +30% for time slots outside 9am–5pm
  sundaySurcharge: 0.4, // +40% for Sunday bookings (source lists 30% vs 40% — confirm)
  assuranceFee: 5000, // ₦ flat Assurance add-on — PLACEHOLDER, confirm amount/limits
  upfront6MonthDiscount: 0.05, // 5% off six months upfront (subscriptions)
};

export type BookingType = "one_time" | "subscription";
export type Location = "enugu" | "lagos";
export type TimeSlot = "standard" | "off_hours"; // standard = 9am–5pm

export type OneTimeService =
  | "deep_cleaning"
  | "move_in_out"
  | "general_cleaning"
  | "post_construction"
  | "airbnb"
  | "couch_rug"
  | "decluttering"
  | "care";

export const oneTimeServices: { id: OneTimeService; label: string; quote?: boolean }[] = [
  { id: "deep_cleaning", label: "Deep Cleaning" },
  { id: "move_in_out", label: "Move-in / Move-out" },
  { id: "general_cleaning", label: "General / Office Cleaning", quote: true },
  { id: "post_construction", label: "Post-Construction Clean", quote: true },
  { id: "airbnb", label: "Airbnb / Short-let Cleaning", quote: true },
  { id: "couch_rug", label: "Couch & Rug Cleaning", quote: true },
  { id: "decluttering", label: "Decluttering & Organising", quote: true },
  { id: "care", label: "Elderly Care & Childcare", quote: true },
];

export type PriceInput = {
  type: BookingType;
  oziPlan?: string; // plan name for subscription
  service?: OneTimeService; // for one_time
  bedrooms?: string; // for deep_cleaning / move_in_out (matches deepCleaning.rooms)
  timeSlot?: TimeSlot;
  date?: string; // ISO date (yyyy-mm-dd)
  assurance?: boolean;
  upfront6Months?: boolean; // subscription only
};

export type PriceBreakdown = {
  base: number;
  surcharges: { label: string; amount: number }[];
  assurance: number;
  discount: number;
  total: number;
  isQuote: boolean; // true = "contact for quote", no instant price
  note?: string;
};

const naira = (n: number) => Math.round(n);

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
    } else if (svc.id === "deep_cleaning" || svc.id === "move_in_out") {
      const row = deepCleaning.find((d) => d.rooms === input.bedrooms);
      base = row ? Number(row.price.replace(/,/g, "")) : 0;
      if (!row) note = "Select your home size to see the price.";
    } else if (svc.quote) {
      isQuote = true;
      note = "This service is custom-priced — we'll send you a quote.";
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

  const assurance = input.assurance && !isQuote ? RATES.assuranceFee : 0;

  const surchargeTotal = surcharges.reduce((s, x) => s + x.amount, 0);
  let discount = 0;
  if (input.type === "subscription" && input.upfront6Months && base > 0) {
    // 6 months upfront, 5% off the 6-month total
    const sixMonths = base * 6;
    discount = naira(sixMonths * RATES.upfront6MonthDiscount);
  }

  const total = isQuote
    ? 0
    : input.type === "subscription" && input.upfront6Months
    ? naira(base * 6 + assurance - discount)
    : naira(base + surchargeTotal + assurance);

  return { base, surcharges, assurance, discount, total, isQuote, note };
}

export const formatNaira = (n: number) =>
  "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });
