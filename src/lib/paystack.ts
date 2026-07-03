const PAYSTACK_BASE = "https://api.paystack.co";
const secret = process.env.PAYSTACK_SECRET_KEY;

export const paystackConfigured = Boolean(secret);

type InitArgs = {
  email: string;
  amountNaira: number;
  reference: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
};

export async function initializeTransaction(args: InitArgs) {
  if (!paystackConfigured) throw new Error("Paystack is not configured");
  const res = await fetch(`${PAYSTACK_BASE}/transaction/initialize`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${secret}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: args.email,
      amount: Math.round(args.amountNaira * 100), // kobo
      reference: args.reference,
      callback_url: args.callbackUrl,
      currency: "NGN",
      metadata: args.metadata ?? {},
    }),
  });
  const json = await res.json();
  if (!res.ok || !json.status) {
    throw new Error(json.message || "Failed to initialize payment");
  }
  return json.data as { authorization_url: string; access_code: string; reference: string };
}

export async function verifyTransaction(reference: string) {
  if (!paystackConfigured) throw new Error("Paystack is not configured");
  const res = await fetch(`${PAYSTACK_BASE}/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const json = await res.json();
  if (!res.ok || !json.status) {
    throw new Error(json.message || "Failed to verify payment");
  }
  return json.data as { status: string; reference: string; amount: number };
}
