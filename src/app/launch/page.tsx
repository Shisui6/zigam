import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import Countdown from "@/components/Countdown";
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
          <Reveal delay={220}><Countdown date={site.launchDate} /></Reveal>
          <Reveal as="p" delay={260} className="lead" >
            <span style={{ fontSize: "0.95rem" }}>Launching mid-July 2026 · Enugu &amp; Lagos</span>
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
    </>
  );
}
