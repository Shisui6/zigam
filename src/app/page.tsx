import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site, oziServices } from "@/lib/site";

const iconMap: Record<string, string> = {
  broom: "fa-broom",
  shirt: "fa-shirt",
  utensils: "fa-utensils",
  bag: "fa-bag-shopping",
};

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="container">
          <div>
            <Reveal as="p" className="eyebrow">Africa&apos;s premier homemaking ecosystem</Reveal>
            <Reveal as="h1" delay={80}>
              Your Home, <span className="accent">Our Willing Hands.</span>
            </Reveal>
            <Reveal as="p" className="lead" delay={160}>
              We are building the largest ecosystem of homemaking professionals and the people who need them —
              connecting discerning homes and businesses with elite, trusted service professionals.
            </Reveal>
            <Reveal className="hero-ctas" delay={240}>
              <Link href="/booking" className="btn btn-gold">Book a Service</Link>
              <Link href="/about#careers" className="btn btn-outline">Join Our Team</Link>
            </Reveal>
          </div>
          <Reveal className="hero-figure" delay={200}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/hero-image.png" alt="A professional associate in a beautifully kept home" />
            <div className="badge">
              <strong>Ozi</strong>
              <span>Four services, one experience</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* OZI EXPERIENCE */}
      <section className="block" id="ozi">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Our signature solution</p>
            <h2>The Ozi Experience</h2>
            <p>
              A signature four-in-one support solution designed for modern homes and businesses. One booking or
              subscription, one trained associate, four essential services, delivered across an eight-hour day.
            </p>
          </Reveal>

          <Reveal className="ozi-umbrella">
            <span className="ozi-chip">OZI</span>
            <p className="ozi-chip-sub">The all-in-one plan</p>
            <div className="ozi-arrow"><i className="fas fa-angle-down" /></div>
          </Reveal>

          <div className="grid grid-4">
            {oziServices.map((s, i) => (
              <Reveal key={s.title} className="card" delay={i * 80}>
                <div className="card-icon"><i className={`fas ${iconMap[s.icon]}`} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STAT BAND */}
      <section className="section-dark block">
        <div className="container">
          <div className="stat-band">
            <Reveal className="stat"><span className="big">1</span><span className="cap">Booking / Subscription</span></Reveal>
            <Reveal className="stat" delay={80}><span className="big">1</span><span className="cap">Trained Associate</span></Reveal>
            <Reveal className="stat" delay={160}><span className="big">4</span><span className="cap">Essential Services</span></Reveal>
            <Reveal className="stat" delay={240}><span className="big">8</span><span className="cap">Hours of Endless Possibilities</span></Reveal>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="block">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Why choose Zigam</p>
            <h2>You are assured</h2>
            <hr className="rule" />
            <ul className="assured-list" style={{ marginTop: "1rem" }}>
              {[
                "Affordability",
                "Professionally trained, highly skilled associates",
                "Thorough background checks & due diligence",
                "Efficient supervision & performance monitoring",
                "Flexible scheduling",
                "Quality guaranteed",
                "Insured services",
              ].map((f) => (
                <li key={f}><i className="fas fa-check" /> {f}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal className="quote-card" delay={120}>
            <p>&ldquo;Zigam has transformed how I manage my home. Their associates are professional, courteous, and deliver quality every time.&rdquo;</p>
            <cite>— Mrs. Adebayo, Lagos</cite>
          </Reveal>
        </div>
      </section>

      {/* PRICING */}
      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Our pricing</p>
            <h2>Simple, transparent plans</h2>
          </Reveal>
          <div className="grid grid-3">
            <Reveal className="card price-card feature">
              <h3>Ozi Plan</h3>
              <div className="amount">₦52,000<span style={{ fontSize: "0.9rem" }}>/mo</span></div>
              <p>All four services in one plan — from ₦13,000 per day.</p>
            </Reveal>
            <Reveal className="card price-card" delay={100}>
              <h3>Deep Cleaning</h3>
              <div className="amount">₦90,000<span style={{ fontSize: "0.9rem" }}>+</span></div>
              <p>A thorough, in-depth clean for every area of your space.</p>
            </Reveal>
            <Reveal className="card price-card" delay={200}>
              <h3>Specialty</h3>
              <div className="amount">Custom</div>
              <p>Move-in/out, post-construction, upholstery and more.</p>
            </Reveal>
          </div>
          <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
            <Link href="/services" className="btn btn-dark">See all pricing</Link>
          </div>
        </div>
      </section>

      {/* FOUNDERS */}
      <section className="block founders-callout">
        <div className="container">
          <Reveal className="founders-card">
            <p className="eyebrow">By invitation</p>
            <h2>Request Founder&apos;s Access</h2>
            <hr className="rule" />
            <p>Join the private launch list reserved for those who want first access to Zigam.</p>
            <a href={site.foundersForm} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <i className="fas fa-key" /> Request Founder&apos;s Access
            </a>
          </Reveal>
        </div>
      </section>

      {/* CAREERS CTA */}
      <section className="block cta-band" id="careers">
        <div className="container">
          <Reveal>
            <h2>Looking for flexible, meaningful work?</h2>
            <p>Join the Zigam workforce. We offer professional training, supervision, and the dignity of formal work — on a schedule that respects your time.</p>
            <a href={site.workforceForm} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <i className="fas fa-user-plus" /> Apply to Join
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
