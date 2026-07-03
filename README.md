# Zigam

Africa's premier ecosystem of homemaking professionals — marketing site and (soon) booking platform.

Built with **Next.js 14 (App Router) + TypeScript**, styled with a custom design system (no CSS framework) in the Zigam premium gold/charcoal/cream language.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts:

```bash
npm run build    # production build
npm run start    # serve the production build
```

## Structure

```
src/
  app/
    layout.tsx            # root layout, fonts, header/footer
    globals.css           # design system (tokens, components, animations)
    page.tsx              # Home
    about/  services/  contact/  booking/  terms/  service-details/  launch/
  components/             # Header, Footer, Logo, Reveal, Faq, Countdown, ContactForm
  lib/site.ts             # central config: contact info, form links, pricing tiers, launch date
public/images/            # logo, hero, team, favicon
docs/                     # ZIGAM_UPDATE_PLAN.md, ZIGAM_BUILD_ROADMAP.md
legacy/                   # the previous static HTML site (archived for reference)
```

## Editing common things

- **Contact details, social links, form URLs, pricing, launch date** -> `src/lib/site.ts`
- **Colours / typography / spacing** -> `:root` and component classes in `src/app/globals.css`
- **Logo** -> `public/images/zigam-logo.png` (falls back to a text wordmark if missing)

## Next steps (see docs/ZIGAM_BUILD_ROADMAP.md)

Phase 1 is the booking + payments engine (Supabase + Paystack). The current `/booking` page is an interim placeholder pointing to the Founder's form, phone, and email until that is built.
