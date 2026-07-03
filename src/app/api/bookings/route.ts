import { NextResponse } from "next/server";
import { getServiceClient, supabaseConfigured } from "@/lib/supabase";
import { paystackConfigured, initializeTransaction } from "@/lib/paystack";
import { computePrice, PriceInput, Location } from "@/lib/pricing";

export const dynamic = "force-dynamic";

type Payload = PriceInput & {
  location: Location;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  accessInstructions?: string;
  hasPets?: boolean;
  addOns?: string[];
  termsAccepted: boolean;
  notes?: string;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // ---- Validation ----
  if (!body.name || !body.email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }
  if (!body.termsAccepted) {
    return NextResponse.json({ error: "You must accept the Terms of Use." }, { status: 400 });
  }

  // ---- Recompute price server-side (never trust the client) ----
  const price = computePrice(body);

  const reference = `zigam_${crypto.randomUUID()}`;
  const status = price.isQuote ? "quote_requested" : "pending";

  // ---- Persist booking ----
  const supabase = getServiceClient();
  let bookingId: string | null = null;

  if (supabase) {
    // upsert customer
    const { data: customer } = await supabase
      .from("customers")
      .upsert({ name: body.name, email: body.email, phone: body.phone }, { onConflict: "email" })
      .select("id")
      .single();

    const { data: booking, error } = await supabase
      .from("bookings")
      .insert({
        customer_id: customer?.id ?? null,
        name: body.name,
        email: body.email,
        phone: body.phone,
        booking_type: body.type,
        location: body.location,
        service: body.service ?? null,
        ozi_plan: body.oziPlan ?? null,
        bedrooms: body.bedrooms ?? null,
        service_date: body.date ?? null,
        time_slot: body.timeSlot ?? null,
        address: body.address ?? null,
        access_instructions: body.accessInstructions ?? null,
        has_pets: body.hasPets ?? false,
        add_ons: body.addOns ?? [],
        assurance: body.assurance ?? false,
        upfront_6_months: body.upfront6Months ?? false,
        terms_accepted: body.termsAccepted,
        notes: body.notes ?? null,
        base_amount: price.base,
        surcharge_amount: price.surcharges.reduce((s, x) => s + x.amount, 0),
        assurance_amount: price.assurance,
        discount_amount: price.discount,
        total_amount: price.total,
        is_quote: price.isQuote,
        status,
        paystack_reference: price.isQuote ? null : reference,
      })
      .select("id")
      .single();

    if (error) {
      return NextResponse.json({ error: "Could not save booking: " + error.message }, { status: 500 });
    }
    bookingId = booking?.id ?? null;
  }

  // ---- Quote path: no payment ----
  if (price.isQuote) {
    return NextResponse.json({
      quote: true,
      bookingId,
      message: "Thank you — we've received your request and will send a quote shortly.",
      saved: Boolean(supabase),
    });
  }

  // ---- Payment path ----
  if (!paystackConfigured) {
    return NextResponse.json({
      configured: false,
      bookingId,
      total: price.total,
      message:
        "Payments are not configured yet. Add PAYSTACK_SECRET_KEY to .env.local to enable checkout.",
    });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || new URL(req.url).origin;
  try {
    const tx = await initializeTransaction({
      email: body.email,
      amountNaira: price.total,
      reference,
      callbackUrl: `${siteUrl}/api/paystack/verify`,
      metadata: { bookingId, name: body.name, type: body.type },
    });
    return NextResponse.json({ authorizationUrl: tx.authorization_url, reference, total: price.total });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Payment initialization failed." },
      { status: 502 }
    );
  }
}

// Helpful message on GET
export async function GET() {
  return NextResponse.json({
    ok: true,
    supabaseConfigured,
    paystackConfigured,
    hint: "POST a booking payload to create a booking and start checkout.",
  });
}
