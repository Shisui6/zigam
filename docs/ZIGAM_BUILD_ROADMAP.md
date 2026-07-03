# Zigam — Build Roadmap: From Static Site to Full Platform

_How we turn the current marketing site into a working product that takes bookings, collects payments, manages subscriptions, and runs associates — built as a custom app, assembled together, using managed services so we don't reinvent infrastructure._

---

## The strategy in one paragraph

We keep the design and copy we've already built, and rebuild the site as a **Next.js application** so the marketing pages and the "app" (booking, accounts, payments) live in one place. Instead of building our own servers, database, login system, and payment rails, we rent them as **managed services** — a hosted database + auth, a Nigerian payment gateway, an email/SMS service, and maps. This is the fastest way for a small team to get a real product live without a large engineering department. I can scaffold and write the code with you; you set up the service accounts and make the business decisions.

---

## Recommended technology stack

| Need | Recommended tool | Why |
|------|------------------|-----|
| App framework | **Next.js (React)** | One codebase for marketing pages + booking app; reuses our current design; great hosting support. |
| Hosting | **Vercel** (or Netlify) | Push-to-deploy, scales automatically, generous free tier to start. |
| Database + Auth + File storage | **Supabase** (Postgres) | Gives us a real database, email/password + email-verification login, and photo storage (associate profiles) in one service. Firebase is the main alternative. |
| Payments | **Paystack** (primary), Flutterwave (alternative) | Nigerian gateways that support cards, bank transfer, one-time charges, **subscriptions/plans**, reusable payment links, and refunds. |
| Email | **Resend** or SendGrid | Confirmation emails, receipts, 24-hour reminders. |
| SMS / WhatsApp | **Twilio** or the WhatsApp Business API | Reminders and confirmations where email isn't enough. |
| Maps | **Google Maps Platform** | Location pinning for Lagos and Enugu, address autocomplete. |
| Blog / content | **Sanity**, Contentful, or MDX files | Powers the Thought Leadership page without a developer editing code each time. |

> Verify current pricing and feature limits on each provider's site when you sign up — plans change, and settlement rules for Nigerian payments require a registered business (you have RC 9288075, which covers this).

---

## What you set up (accounts & business prerequisites)

These are yours to create; most are free to start:

1. A **domain name** (e.g. zigam.com / zigam.ng) and email on that domain.
2. A **Paystack business account** linked to your **corporate bank account** (needed to receive settlements; personal accounts won't do — this also matches your Terms).
3. A **Supabase** account (database/auth) and a **Vercel** account (hosting).
4. A **Google Cloud** account for the Maps API key.
5. An **email sending** account (Resend/SendGrid) and, if using WhatsApp reminders, a WhatsApp Business number.
6. Decisions still open in your own docs: the **Assurance fee amount and coverage limits**, and the **Sunday surcharge** (30% vs 40% — currently conflicting).

---

## Phased build plan

Each phase is shippable on its own. We can launch after Phase 1 and keep adding.

### Phase 0 — Foundations
- Register domain, connect hosting, create the code repository.
- Rebuild the current pages (Home, About, Services, Contact, Terms, Description of Services, Launch) inside Next.js, reusing our existing CSS/design as a shared design system.
- Set up environment/secrets management and a staging vs production environment.

### Phase 1 — Bookings + Payments _(launch-critical)_
This is the core of "make the processes possible."
- **Booking flow** with: choose location (Enugu/Lagos), choose one-time vs Ozi subscription, pick service (and priority among the four for Ozi), date/time selection, access instructions field (lockbox/key/gate), "do you have pets?" field, add-on extras, and a required **agree-to-Terms** checkbox.
- **Pricing engine** that encodes the real rules: Ozi tiers (Economy ₦52k → Luxury ₦403k), deep-cleaning price-by-bedroom (₦90k–₦250k), move-in/out, "a taste of Ozi," and the surcharge logic (off-hours +30%, Sunday, instant +40%).
- **Paystack integration**: one-time payments and recurring subscription plans for the seven Ozi tiers, the **Assurance** fee as an add-on, reusable payment links, and the 6-month-upfront 5% discount.
- **Confirmation emails** and every booking saved to the database.

### Phase 2 — Accounts & Customer Dashboard
- **Login with email verification.** To keep it "as ABC simple as possible," a user can book first, then we auto-create their account by verifying their email — no separate signup wall.
- Saved details for faster repeat bookings.
- **Subscription management**: view current plan, renew, and **pause for 1–3 weeks in a month** (with the forfeiture rules from your Terms enforced automatically).
- **Vouchers**: a page to buy plan vouchers and fixed denominations (₦50k / ₦100k / ₦150k), gift them, and **redeem a coupon at checkout**.
- Location pinning per city.

### Phase 3 — Associates & Trust
- **Associate profiles**: photo, name, number of completed jobs, recommendation %, reviews, experience, short bio.
- **Client ratings, reviews, and feedback**, displayed on the site.
- Admin tools for assignment, the every-3-months reshuffle, and tracking background-check status.

### Phase 4 — Operations, Content & Automation
- **Admin dashboard**: manage bookings, subscriptions, payments, associates, and **Assurance claims**.
- **Blog / Thought Leadership** page via a simple CMS.
- **Automated reminders** (24-hour email/SMS/WhatsApp) with confirm/reschedule.
- Basic analytics and reporting.

### Cross-cutting (throughout, not a separate phase)
- **NDPA 2023 compliance**: consent capture, a privacy policy, careful handling of NIN/addresses.
- **Associate payouts & WHT**: track earnings and withholding tax deductions.
- Security basics, database backups, and access controls.

---

## What we can start on immediately (you + me)

1. Pick and register the domain; create the Supabase, Vercel, and Paystack (test mode) accounts.
2. I scaffold the Next.js app and migrate the pages we've already built into it.
3. I model the database (customers, bookings, subscriptions, associates, reviews, vouchers, payments).
4. I build the booking flow and the pricing engine from the rules in your Services page and Terms.
5. We wire Paystack in **test mode** and run a full fake booking end-to-end before going live.

---

## How to think about sequencing

The honest framing: Phase 1 is a real build, not a weekend of edits — bookings + payments + a pricing engine is the heart of the product. Everything after it is additive. So the pragmatic path is: **keep the launch countdown page live and collecting the Founders' list now**, build Phase 1 next so you can take real bookings and money, then layer in accounts, associates, and automation. If at any point you'd rather move faster on a specific piece (say, vouchers or reviews), we can reprioritize — the phases are independent enough to reorder.
