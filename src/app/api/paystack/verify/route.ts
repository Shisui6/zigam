import { NextResponse } from "next/server";
import { getServiceClient } from "@/lib/supabase";
import { verifyTransaction, paystackConfigured } from "@/lib/paystack";

export const dynamic = "force-dynamic";

// Paystack redirects the customer here after payment with ?reference=...
export async function GET(req: Request) {
  const { searchParams, origin } = new URL(req.url);
  const reference = searchParams.get("reference") || searchParams.get("trxref");
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || origin;

  if (!reference) {
    return NextResponse.redirect(`${siteUrl}/booking/success?status=error`);
  }

  if (!paystackConfigured) {
    return NextResponse.redirect(`${siteUrl}/booking/success?status=unconfigured`);
  }

  try {
    const data = await verifyTransaction(reference);
    const paid = data.status === "success";

    const supabase = getServiceClient();
    if (supabase) {
      await supabase
        .from("bookings")
        .update({ status: paid ? "paid" : "failed" })
        .eq("paystack_reference", reference);
    }

    return NextResponse.redirect(
      `${siteUrl}/booking/success?status=${paid ? "paid" : "failed"}&ref=${reference}`
    );
  } catch {
    return NextResponse.redirect(`${siteUrl}/booking/success?status=error`);
  }
}
