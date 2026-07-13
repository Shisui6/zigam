import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Logo from "@/components/Logo";
import Portrait from "@/components/Portrait";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "ZIGAM — Coming Soon",
  description: "Africa's premier ecosystem of homemaking professionals. Request Founder's Access.",
};

const oziBits = [
  { icon: "fa-broom", t: "Cleaning & Care", d: "Home and workplace cleaning that creates clean, refreshed spaces." },
  { icon: "fa-shirt", t: "Wardrobe & Laundry", d: "Thoughtful care for your garments and household linens." },
  { icon: "fa-bag-shopping", t: "Errand Concierge", d: "Everyday tasks and personal errands, managed with ease." },
  { icon: "fa-utensils", t: "Kitchen Operations", d: "A professional mise en place — prep, pantry, and upkeep." },
];

export default function Launch() {
  return (
    <>
      {/* Minimal top bar — logo only, no navigation */}
      <header className="launch-topbar">
        <Logo height={96} />
        <span className="launch-rc">{site.rc}</span>
      </header>

      <section className="launch-hero">
        <div className="container-narrow">
          <Reveal as="p" className="eyebrow">We are making the art of effortless living possible</Reveal>
          <Reveal as="p" className="coming-soon" delay={80}>Coming Soon</Reveal>
          <Reveal as="h1" delay={120}>
            Africa&apos;s premier ecosystem of <span className="accent">homemaking professionals</span>
          </Reveal>
          <Reveal as="p" className="lead" delay={180} >
            <span style={{ display: "block", maxWidth: 620, margin: "1rem auto 0" }}>
              Connecting discerning homes and businesses with elite, trusted service professionals — built on mastery, dignity, and trust.
            </span>
          </Reveal>
          <Reveal delay={220}>
            <p className="launching-line">Launching <span>2026</span></p>
          </Reveal>
          <Reveal as="p" delay={260} className="lead" >
            <span style={{ fontSize: "0.95rem", letterSpacing: "0.14em", textTransform: "uppercase" }}>Enugu &amp; Lagos</span>
          </Reveal>
          <Reveal className="hero-ctas" delay={300} >
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
              <a href={site.foundersForm} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                <i className="fas fa-key" /> Request Founder&apos;s Access
              </a>
              <a href="#ozi" className="btn btn-outline">Discover the Ozi Experience</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-dark block" id="ozi">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow on-dark">Our signature solution</p>
            <h2>The Ozi Experience</h2>
            <p>A signature four-in-one support solution designed for modern homes and businesses. The seamless eight-hour lifestyle service covering your cleaning, laundry, errands and kitchen needs, all in one booking or subscription.</p>
          </Reveal>
          <div className="grid grid-4">
            {oziBits.map((s, i) => (
              <Reveal key={s.t} className="card" delay={i * 80} style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(194,161,77,0.25)" }}>
                <div className="card-icon"><i className={`fas ${s.icon}`} /></div>
                <h3 style={{ color: "var(--ivory)" }}>{s.t}</h3>
                <p style={{ color: "rgba(243,237,225,0.72)" }}>{s.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="stat-band" style={{ marginTop: "3rem", borderTop: "1px solid rgba(194,161,77,0.3)", paddingTop: "3rem" }}>
            <div className="stat"><span className="big">1</span><span className="cap">Booking / Subscription</span></div>
            <div className="stat"><span className="big">1</span><span className="cap">Trained Associate</span></div>
            <div className="stat"><span className="big">4</span><span className="cap">Essential Services</span></div>
            <div className="stat"><span className="big">8</span><span className="cap">Hours of Endless Possibilities</span></div>
          </div>
        </div>
      </section>

      {/* Meet the Founder */}
      <section className="block founder-section">
        <div className="container">
          <Reveal className="founder-wrap">
            <Portrait src="/images/founder-kaeto.jpeg" alt="Kaetochukwu Udeh, Founder of Zigam" initials="KU" />
            <div className="founder-copy">
              <p className="eyebrow">Meet the Founder</p>
              <h2>Kaetochukwu Udeh <span className="founder-short">(Kaeto)</span></h2>
              <p className="founder-title">Founder</p>
              <hr className="rule" />
              <p>
                Zigam was born from a simple conviction: that exceptional home and workplace support should be
                effortless, dignified, and built on trust. Kaeto leads that vision — pairing world-class training with
                genuine care to redefine modern living across Africa.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="block founders-callout">
        <div className="container">
          <Reveal className="founders-card">
            <p className="eyebrow">By invitation</p>
            <h2>Request Founder&apos;s Access</h2>
            <hr className="rule" />
            <p>Join the private launch list reserved for those who want first access to Zigam.</p>
            <a href={site.foundersForm} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
              <i className="fas fa-arrow-right" /> Join the Launch List
            </a>
          </Reveal>
        </div>
      </section>

      {/* Join the workforce */}
      <section className="block cta-band">
        <div className="container">
          <Reveal>
            <p className="eyebrow" style={{ color: "var(--white)", fontWeight: 700 }}>JOIN THE ZIGAM WORKFORCE</p>
            <h2 style={{ color: "var(--white)" }}>Meaningful work that fits your life</h2>
            <p style={{ maxWidth: 680, margin: "0.6rem auto 0.4rem" }}>
              Looking for meaningful work that fits into your lifestyle, routine and schedule? We&apos;re hiring young adults in Enugu and Lagos.
            </p>
            <p style={{ maxWidth: 680, margin: "0 auto 1.8rem" }}>
              As a Zigam Associate, you&apos;ll receive professional training, supervision, and the dignity of formal work — on a schedule that respects your time.
            </p>
            <div className="open-positions">
              <p className="op-label">Open Positions</p>
              <div className="op-card">
                <span className="op-role">Associate</span>
                <span className="op-loc">Enugu &amp; Lagos</span>
              </div>
            </div>
            <a href={site.workforceForm} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <i className="fas fa-user-plus" /> Apply to Join
            </a>
          </Reveal>
        </div>
      </section>

      {/* Slim launch footer — contact only, no site navigation */}
      <footer className="launch-footer">
        <div className="container">
          <p>
            <a href={site.phoneHref}><i className="fas fa-phone" /> {site.phone}</a>
            <span className="sep">·</span>
            <a href={`mailto:${site.email}`}><i className="fas fa-envelope" /> {site.email}</a>
          </p>
          <div className="launch-socials">
            <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
            <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
            <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
          </div>
          <p className="launch-copy">© {new Date().getFullYear()} Zigam · {site.rc} · Enugu &amp; Lagos</p>
        </div>
      </footer>
    </>
  );
}
