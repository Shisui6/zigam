# Phase 1 setup — Bookings & Payments

Everything is built and wired to environment variables. Follow these steps to switch it on.

## 1. Create the database tables (Supabase)
1. Open your Supabase project → **SQL Editor**.
2. Paste the contents of `supabase/schema.sql` and run it.
3. This creates `customers` and `bookings` with Row Level Security on (the app writes via the server-only service-role key).

## 2. Add your keys
1. Copy `.env.example` to `.env.local` (this file is git-ignored — never commit it).
2. Fill in the values:
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` — from Supabase → Project Settings → API.
   - `PAYSTACK_SECRET_KEY`, `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY` — from Paystack → Settings → API Keys & Webhooks. **Use the test keys first.**
   - `NEXT_PUBLIC_SITE_URL` — `http://localhost:3000` locally; your real domain in production.

## 3. Run it
```bash
npm install
npm run dev      # http://localhost:3000/booking
```
Make a test booking. With Paystack **test** keys, use their test card (e.g. `4084 0840 8408 4081`, any future expiry, any CVV) to complete a payment. You'll be redirected back to `/booking/success` and the booking row in Supabase flips to `paid`.

## 4. How the flow works
- The booking wizard (`/booking`) collects the request and shows a live price.
- On submit it POSTs to `/api/bookings`, which **recomputes the price server-side** (never trusts the browser), saves the booking, and initializes a Paystack transaction.
- The customer is redirected to Paystack to pay, then back to `/api/paystack/verify`, which verifies the charge and updates the booking status.
- Custom-priced ("quote") services skip payment and are saved as `quote_requested`.

## 5. Before go-live — confirm these business values
Edit `src/lib/pricing.ts` → `RATES`:
- **`assuranceFee`** — currently a ₦5,000 placeholder. Set the real Assurance amount/limits.
- **`sundaySurcharge`** — set to 40% (your docs also mention 30% — confirm which is correct).
- **`offHoursSurcharge`** — 30%.

## 6. Recommended follow-ups (Phase 2)
- **Recurring billing:** subscriptions currently charge the first month (or 6 months upfront). True auto-renew uses Paystack **Plans** — create plan codes in your dashboard and pass them at initialization.
- **Webhook:** add a `/api/paystack/webhook` endpoint (verify the `x-paystack-signature`) so payment status updates even if the customer closes the tab before redirect.
- **Customer accounts:** Supabase Auth (book-then-verify-email), a customer dashboard, subscription pause, and vouchers.

## Note on "coming soon" mode
Set `NEXT_PUBLIC_COMING_SOON=true` in `.env.local` to redirect all visitors to `/launch` until the launch date in `src/middleware.ts`. Set it to `false` (default) to open the full site.
