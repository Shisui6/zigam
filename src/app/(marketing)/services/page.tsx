import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Faq, { FaqEntry } from "@/components/Faq";
import { site, oziTiers, deepCleaning } from "@/lib/site";

export const metadata: Metadata = { title: "Services — ZIGAM" };

const faqs: FaqEntry[] = [
  { q: "What is the Ozi Plan?", a: "With our Ozi Service, you're granted effortless access to four premium home and business services — General Cleaning, Laundry, Errands, and Kitchen Operations. Our devoted, trained Associates are at your service from 9am to 5pm, with a brief one-hour break." },
  { q: "How do I make payment?", a: "You can pay easily through the booking link provided to you. We also accept bank transfers and mobile payments. For regular customers, we offer convenient monthly billing options." },
  { q: "How do I schedule a service?", a: "Simply use the booking page on our website or give us a call. We'll determine the best plan for your needs and schedule a convenient time for our team to come to you." },
  { q: "Can I customise my service?", a: <>Yes. Every home or business is unique, and we're happy to customise. Just let us know what you need. Email <a href={`mailto:${site.email}`}>{site.email}</a>.</> },
  { q: "What is the Assurance?", a: "The Assurance is a form of insurance against theft and damage caused by an associate. To access it, simply make a one-time payment during the booking process." },
  { q: "Who is a Professional Organiser?", a: "Someone who helps you overcome clutter and disorganisation to make your life less stressful and your space more efficient." },
  { q: "What areas do you serve?", a: "We are starting with Enugu and Lagos." },
];

const specialty = [
  { icon: "fa-truck-ramp-box", t: "Move-in / Move-out", d: "A thorough clean when moving in or out — priced within the deep cleaning range." },
  { icon: "fa-boxes-stacked", t: "Decluttering & Organising", d: "Sorting, boxing, and organising for a calmer, more efficient environment." },
  { icon: "fa-hard-hat", t: "Post-Construction Clean", d: "Dust, debris, and window polish for newly built or renovated spaces." },
  { icon: "fa-house-chimney-window", t: "Airbnb / Short-let", d: "Turnover-ready cleaning for short-let and hospitality spaces." },
  { icon: "fa-hand-holding-heart", t: "Elderly Care & Childcare", d: "Light caregiving, companionship, and activity support." },
  { icon: "fa-couch", t: "Couch & Rug Cleaning", d: "Sofa, cushion, upholstery and rug detailing." },
];

export default function Services() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="h1">Our Services</Reveal>
          <Reveal as="p" delay={100}>Home and workplace support — priced fairly, delivered professionally.</Reveal>
        </div>
      </section>

      {/* OZI */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">All four services, one plan</p>
            <h2>The Ozi Plan</h2>
            <p>
              With our Ozi Service, you&apos;re granted effortless access to four premium services — General Cleaning,
              Laundry, Errands, and Kitchen Operations. Associates serve you from 9am to 5pm, with a brief one-hour break.
              Subscribe to any plan that suits your lifestyle; payment is monthly.
            </p>
          </Reveal>
          <Reveal>
            <table className="z-table">
              <thead>
                <tr><th>Plan</th><th>Frequency</th><th>Price (₦)</th></tr>
              </thead>
              <tbody>
                {oziTiers.map((t) => (
                  <tr key={t.plan}><td>{t.plan}</td><td>{t.freq}</td><td>{t.price}</td></tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal className="card" delay={80} style={{ marginTop: "1.5rem" }}>
            <h3 style={{ fontSize: "1.4rem" }}>A Taste of Ozi</h3>
            <p>Get a taste of Ozi for a day — book a private one-day experience. Time range: 9am–5pm or 12pm–6pm.</p>
          </Reveal>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/booking" className="btn btn-gold">Subscribe to Ozi</Link>
          </div>
        </div>
      </section>

      {/* DEEP CLEANING */}
      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">One-time service</p>
            <h2>Deep Cleaning</h2>
            <p>A comprehensive floor-to-ceiling clean: moving furniture for access, interior windows, shelves, inside cabinets, fridge/freezer, oven, balcony and fans — from ₦90,000.</p>
          </Reveal>
          <Reveal>
            <table className="z-table">
              <thead><tr><th>Home size</th><th>Price (₦)</th></tr></thead>
              <tbody>
                {deepCleaning.map((d) => (
                  <tr key={d.rooms}><td>{d.rooms}</td><td>{d.price}</td></tr>
                ))}
              </tbody>
            </table>
          </Reveal>
        </div>
      </section>

      {/* SPECIALTY */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Custom quotes available</p>
            <h2>Specialty Services</h2>
          </Reveal>
          <div className="grid grid-3">
            {specialty.map((s, i) => (
              <Reveal key={s.t} className="card" delay={(i % 3) * 80}>
                <div className="card-icon"><i className={`fas ${s.icon}`} /></div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container-narrow">
          <Reveal className="section-head">
            <p className="eyebrow">Good to know</p>
            <h2>Frequently asked questions</h2>
          </Reveal>
          <Reveal><Faq items={faqs} /></Reveal>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/contact" className="btn btn-outline">Need help choosing or booking?</Link>
          </div>
        </div>
      </section>
    </>
  );
}
