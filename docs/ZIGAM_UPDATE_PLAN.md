# Zigam Website Update Plan

_Prepared 25 June 2026. Covers the launch countdown page (built now) and the full Phase-Two site update (to follow)._

---

## 1. What's done now: the launch countdown page

A standalone, self-contained page — `launch.html` — has been added to the project root. It is designed to be the page visitors see while the full site is being finished.

- Premium gold + charcoal on cream theme, matching the new logo and the upmarket "elite / mastery / distinction" positioning in the new copy.
- Live countdown timer to **mid-July 2026**. The target is a single editable line near the bottom of the file: `const LAUNCH_DATE = "2026-07-15T09:00:00+01:00";` (West Africa Time). Change that date and the timer and the "Launching…" label both update automatically.
- Hero tagline, the full **Ozi Experience** section (4 services + the "1 booking / 1 associate / 4 services / 8 hours" stats), a **Request Founders Access** card, and a **Join the Zigam Workforce** section.
- Three calls-to-action (Founders Access, Join the Launch List, Apply to Join) all link to your Google Form: `https://forms.gle/Vz3sJi5TgAceiSSW7`.
- Footer with the corrected details: phone **+234 705 372 8258**, email **Zigam2026@gmail.com**, the new Enugu and Lagos office addresses, and RC No. 9288075.

### Two things you need to do
1. **Add the logo.** Drop the new logo PNG into the `images/` folder named **`zigam-logo.png`**. The page already points to it; until the file is there, a styled "ZIGAM" wordmark shows automatically as a fallback.
2. **Decide the live page.** To make the countdown the page people first see, either rename the current `index.html` and rename `launch.html` to `index.html`, or set your host to serve `launch.html` as the entry page. (Leaving both lets you keep working on the main site privately.)

---

## 2. Brand & global changes (apply across every page)

These come up repeatedly in the new documents and should be treated as site-wide rules:

- **Reposition the brand** from "affordable youth labour" to **premium, trusted ecosystem**: "Africa's premier and most trusted ecosystem of homemaking professionals." Adopt the gold/charcoal/cream theme used on the launch page.
- **New hero/intro line:** _"We are building the largest ecosystem of homemaking professionals and the people who need them."_
- **Contact details everywhere:** phone **+2347053728258** only (remove all other numbers); email **Zigam2026@gmail.com**.
- **Office addresses everywhere** — Enugu: Number 4 Ridge Way Road, GRA, Enugu. Lagos: Block 4, House 7, Bayview Estate, Dupe Oguntade Street, Ikate, Lekki, Lagos State.
- **Language:** "Domestic" → **"Home and Workplace"**; "employee/employer" → **"Independent Contractor / Client"**; "Home cleaning" → **"Cleaning"** (offices are served too).
- **RC No. 9288075** in header/footer.
- Add a **Terms of Use** page and a **Description of Services** page (full content already supplied in the two docs) and link them in the footer.

---

## 3. Page-by-page content updates

### Home (`index.html`)
- Replace subheadline with the new ecosystem line (above).
- Restructure the four core services (Cleaning, Laundry, Kitchen Operations, Errands) under one umbrella plan called **Ozi**, shown at the top with the four services branching beneath it.
- "Cleaning" (not "Home Cleaning"). Kitchen Operations description: professional "mise en place" — prepped, sanitized, ready-to-use kitchen.
- Pricing snapshot: **Ozi Plan from ₦52,000 (₦13,000/day)**; **Deep Cleaning from ₦90,000**.
- Expand "Why Choose Zigam" to: Affordability; Professionally trained & highly skilled associates; Thorough background checks & due diligence; Efficient supervision & continuous performance monitoring; Flexible scheduling; Quality guaranteed; Insured services.
- Add a **private launch list** block: "Join the private launch list reserved for those who want first access to Zigam… Request Founders Access."

### About (`about.html`)
- New intro: _"We are redefining modern living by empowering our clients to achieve their highest level of productivity."_
- Replace the "bridge a crucial gap" paragraph with the new "critical gap… technology, world-class training, and trusted service…" paragraph.
- **Vision** (new): _"To set the global standard for excellent home and workplace support, connecting discerning households and businesses with elite service professionals who operate with distinction, mastery, and purpose."_ Add "Businesses anywhere you have a household." Remove "Employment" language (associates are independent contractors).
- **Mission** (new): _"To be Africa's most trusted support services ecosystem, redefining modern living by giving homes and businesses seamless access to exceptional support while elevating the dignity and value of service."_
- **Values:** Mastery (replaces Diligence), Integrity, Empathy, Ownership & Proactivity, Dependability, Precision, Discretion (descriptions supplied in doc).
- Careers blurb: "Home and Workplace" support, safe/respected/rewarding for all.

### Services (`services.html`)
- Bold **Ozi short description** (supplied): four premium services, 9am–5pm with a one-hour break, etc.
- **FAQ rewrites:** payment (no cash — booking link, bank transfer, mobile payment, monthly billing for regulars); What is the Ozi Plan; How to schedule; Customising service; What is the Assurance; Who is a Professional Organiser. (Full answers in the doc.)
- "Need help choosing the right service **or booking**" → add a simple **contact form** (name, phone, email, address).
- Pull in the full **Description of Services** content (errands, kitchen, laundry, decluttering, general/office/Airbnb/move-in/deep/post-construction/couch & rug cleaning, elderly care, childcare) plus "What we expect" and recommended-products list.

### Booking (`booking.html`) — biggest change, see Section 4
- Deep cleaning price table by bedrooms (1BR ₦90k → 7BR ₦250k).
- Ozi subscription tiers (Economy → Luxury, ₦52k–₦403k) and "a taste of Ozi" one-off.
- Add **Assurance** (insurance) as part of total payment; access instructions; lockbox/key access field; pets field; terms agreement; location (Enugu/Lagos); one-time vs subscription choice; add-on extras; vouchers (50k/100k/150k + plan vouchers + coupon at checkout); move-in/move-out under specialty.

### Contact (`contact.html`)
- "Need help booking a service" → **"Book a free consultation."**
- Remove all numbers except +2347053728258.

### New pages
- **Associates** — associate profiles (photo, name, completed jobs, recommendation %, reviews, experience, short bio) + client rating/review. _Needs a backend._
- **Blog / Thought Leadership.**
- **Terms of Use** and **Description of Services** (content ready).
- **Vouchers** purchase page.

---

## 4. Features that need a backend / developer (not possible on a static site)

The current site is plain HTML/CSS/JS with no server or database. The following items from the Phase-Two doc require real application infrastructure (a backend, database, auth, and a payment processor such as Paystack/Flutterwave). These should be scoped as a build project, not content edits:

- **User accounts** — create/login, store details for repeat bookings, "verify email to auto-open an account after booking."
- **Subscriptions & billing** — the seven Ozi monthly tiers, recurring/automatic payments, upfront-payment discount (5% for 6 months), and the **pause subscription (1–3 weeks/month)** rule from the customer dashboard.
- **Booking engine** — service/priority selection, frequency selection, time-slot logic with surcharges (30% off-hours, 40% Sundays/instant bookings), confirmation emails, 24-hour reminders.
- **Payments** — card/bank transfer/mobile, reusable payment links, coupons/vouchers at checkout, the Assurance fee.
- **Associate profiles & reviews** — public profiles, client ratings/feedback.
- **Maps** — pinning service locations across Lagos and Enugu.

**Recommendation:** for launch, keep bookings flowing through the Google Form + WhatsApp/phone + manual invoicing, and present the pricing/plans as informational pages. Build the full booking/account/payment platform as a dedicated phase (likely a framework like Next.js or a no-code/low-code stack with Paystack), since it's a multi-week engineering effort rather than a content update.

---

## 5. Suggested sequence

1. **Now:** ship `launch.html` (done) — add logo, set it live, start collecting the launch list.
2. **Week 1–2:** content refresh of the existing static pages (Home, About, Services, Contact) to the new brand, copy, pricing, and addresses; add Terms of Use + Description of Services pages.
3. **Week 2–3:** vouchers/blog informational pages; consultation/contact forms (can use Google Forms or a form service to start).
4. **Phase Two (separate build):** accounts, booking engine, subscriptions, payments, associate profiles & reviews, maps.

---

## 6. Legal/policy notes worth confirming before launch
- Terms doc lists Sunday surcharge as both **30% and 40%** in one line — confirm which is correct.
- One email in the Terms is mistyped as `zigam2026@gmai.com` — should be `Zigam2026@gmail.com`.
- Decide and state the **Assurance fee amount and coverage limits** (the table is referenced but the numbers are left blank in the doc).
