import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import VoucherGiftButton from "@/components/VoucherGiftButton";
import { site, oziTiers, deepCleaning } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gift Vouchers — ZIGAM",
  description:
    "Give the gift of time. Zigam gift vouchers for the Ozi Membership, deep cleaning, move-in and move-out cleaning — or a value of your choosing.",
};

const denominations = [
  { amount: "₦15,000", note: "A Taste of Ozi", icon: "fa-mug-hot" },
  { amount: "₦50,000", note: "A generous gesture", icon: "fa-gift" },
  { amount: "₦100,000", note: "A serious upgrade", icon: "fa-gem" },
  { amount: "₦150,000", note: "The grand gesture", icon: "fa-crown" },
  { amount: "₦200,000", note: "A lasting impression", icon: "fa-star" },
  { amount: "₦500,000", note: "The ultimate gift", icon: "fa-award" },
];

export default function Vouchers() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">Give the gift of time</Reveal>
          <Reveal as="h1">Zigam Gift Vouchers</Reveal>
          <Reveal as="p" delay={100}>
            The rarest gift is a lighter week. Send a loved one — or a deserving colleague — the Zigam experience,
            redeemable against any of our services.
          </Reveal>
        </div>
      </section>

      {/* Denomination cards — the "gift card" moment */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Choose a value</p>
            <h2>Gift cards</h2>
            <p>A Zigam balance they can put toward anything — a membership, a deep clean, a one-time service or A Taste of Ozi.</p>
          </Reveal>
          <Reveal style={{ maxWidth: 560, margin: "0 auto 2.2rem" }}>
            <label htmlFor="voucher-note" style={{ display: "block", fontWeight: 600, marginBottom: "0.4rem" }}>
              Add a note for the receiving party (optional)
            </label>
            <textarea
              id="voucher-note"
              rows={2}
              placeholder="e.g. Happy anniversary! Enjoy a lighter week on us."
              style={{ width: "100%" }}
            />
            <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginTop: "0.4rem" }}>
              Your note is included automatically when you choose a voucher below.
            </p>
          </Reveal>
          <div className="grid grid-3">
            {denominations.map((d, i) => (
              <Reveal key={d.amount} delay={i * 100}>
                <div className="gift-card">
                  <div className="gift-card-top">
                    <Logo height={30} />
                    <i className={`fas ${d.icon}`} />
                  </div>
                  <div className="gift-card-amount">{d.amount}</div>
                  <div className="gift-card-note">{d.note}</div>
                  <div className="gift-card-foot">
                    <span>ZIGAM GIFT VOUCHER</span>
                    <span>Enugu · Lagos</span>
                  </div>
                </div>
                <div style={{ textAlign: "center", marginTop: "1.1rem" }}>
                  <VoucherGiftButton subject={`${d.amount} gift card`} email={site.email} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Membership vouchers */}
      <section className="block section-dark">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow on-dark">The signature gift</p>
            <h2>Ozi Membership vouchers</h2>
            <p>Gift a full month of the Ozi Experience — all four services, one trained Associate, delivered on the cadence you choose.</p>
          </Reveal>
          <div className="grid grid-4">
            {oziTiers.map((t, i) => (
              <Reveal key={t.plan} className="voucher-tier" delay={(i % 4) * 70}>
                <p className="vt-name">{t.plan}</p>
                <p className="vt-freq">{t.freq}</p>
                <p className="vt-price">₦{t.price}</p>
                <VoucherGiftButton subject={`Ozi ${t.plan} Membership`} email={site.email} outline={false} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Cleaning vouchers */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">For fresh starts</p>
            <h2>Cleaning vouchers</h2>
            <p>Deep cleaning, move-in and move-out cleaning — priced by home size, perfect for new homes and new chapters.</p>
          </Reveal>
          <Reveal>
            <table className="z-table">
              <thead><tr><th>Home size</th><th>Voucher value (₦)</th><th></th></tr></thead>
              <tbody>
                {deepCleaning.map((d) => (
                  <tr key={d.rooms}>
                    <td>{d.rooms}</td>
                    <td>{d.price}</td>
                    <td style={{ textAlign: "right" }}>
                      <VoucherGiftButton subject={`${d.rooms} cleaning voucher`} email={site.email} outline={false} label="Gift" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal as="p" style={{ textAlign: "center", color: "var(--muted)", fontSize: "0.9rem", marginTop: "1.2rem" }}>
            Applies to Deep Cleaning, Move-in and Move-out Cleaning.
          </Reveal>
        </div>
      </section>

      {/* How it works */}
      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container-narrow">
          <Reveal className="section-head">
            <p className="eyebrow">How it works</p>
            <h2>Three steps to a lighter week</h2>
          </Reveal>
          <div className="steps-flow">
            {[
              { n: "1", t: "Choose", d: "Pick a gift card value, a membership tier, or a cleaning voucher." },
              { n: "2", t: "Personalise", d: "Tell us who it's for and add a message. We prepare an elegant digital voucher with a unique code." },
              { n: "3", t: "They redeem", d: "Your recipient applies the code as a coupon at checkout when booking — no account needed." },
            ].map((s, i) => (
              <Reveal key={s.n} className="step-flow-item" delay={i * 100}>
                <span className="sf-num">{s.n}</span>
                <div>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>{s.t}</h3>
                  <p style={{ color: "var(--muted)" }}>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal as="p" style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.9rem", color: "var(--muted)" }}>
            Vouchers are valid for 3 months from the date of purchase. You can check a voucher&apos;s status —
            Pending or Redeemed — at any time by contacting our team.
          </Reveal>
          <Reveal as="p" style={{ textAlign: "center", marginTop: "0.8rem", fontSize: "0.9rem", color: "var(--muted)" }}>
            Online voucher checkout is coming soon. For now, request any voucher and our team will arrange it personally
            within one business day — email <a href={`mailto:${site.email}`} style={{ color: "var(--gold-deep)" }}>{site.email}</a> or
            call <a href={site.phoneHref} style={{ color: "var(--gold-deep)" }}>{site.phone}</a>.
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="block cta-band">
        <div className="container">
          <Reveal>
            <h2>Prefer to book for yourself?</h2>
            <p>Explore the Ozi Membership and our one-time services.</p>
            <Link href="/booking" className="btn btn-dark">Book a Service</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
