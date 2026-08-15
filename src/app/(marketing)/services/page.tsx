import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import Faq, { FaqEntry } from "@/components/Faq";
import { site, oziTiers, deepCleaning, oziPlus } from "@/lib/site";
import { formatNaira, RATES } from "@/lib/pricing";

export const metadata: Metadata = { title: "Services — ZIGAM" };

const faqs: FaqEntry[] = [
  {
    q: "What is the Ozi Membership?",
    a: "With the Ozi Membership, you're granted effortless access to four premium home and business services — Cleaning and Care, Wardrobe and Laundry, Errand Concierge, and Kitchen Operation. Our devoted, trained Associates are at your service from 9am to 5pm, with a brief one-hour break, ensuring your home or business receives the utmost care and attention.",
  },
  {
    q: "How are Zigam Associates trained?",
    a: "Reliability is the foundation of the Zigam experience. We don't just hire; we curate. Every Zigam Associate is rigorously vetted, and the training and professional certification of our associates are in collaboration with the best catering schools and hospitality institutions in the country, who form part of our Network of Strategic Partners and act as practical, technical instructors to our associates. When a Zigam Associate enters your home, they arrive with the highest standard of technical skill and domestic expertise in Nigeria.",
  },
  {
    q: "What is Kitchen Operations?",
    a: "Kitchen Operations is our professional mise en place service — a French culinary principle meaning “everything in its place.” Your Zigam Associate prepares ingredients, organises your pantry and workspace, and keeps your kitchen clean and ready, creating the perfect environment for cooking. It's ideal for busy households, private chefs, food bloggers, and content creators who value an organised, efficient kitchen. While Associates support meal readiness, they do not replace a professional chef or provide specialised catering services.",
  },
  {
    q: "How do I make payment?",
    a: "You can make a payment easily through the booking link provided to you. We also accept bank transfers and mobile payments. For regular customers, we offer convenient monthly billing options.",
  },
  {
    q: "How do I schedule a service with Zigam?",
    a: "Simply use the booking page on our website or give us a call. We will work with you to determine the best service for your needs and schedule a convenient time for our team to come to you.",
  },
  {
    q: "Can I customise my cleaning service?",
    a: (
      <>
        Yes. Every home or business is unique, and we are happy to customise our services to meet your specific
        requirements. Just let us know what you need. Send an email today to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </>
    ),
  },
  {
    q: "What is the Assurance?",
    a: "The Assurance is a form of insurance against theft and damage caused by an associate. To access the Assurance, simply make a one-time payment during the booking process.",
  },
  {
    q: "Who is a Professional Organiser?",
    a: "A Professional Organiser is someone who helps you overcome clutter and disorganisation to make your life less stressful and your space more efficient and simple.",
  },
  { q: "What areas do you serve?", a: "We are starting with Enugu and Lagos." },
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

      {/* OZI MEMBERSHIP */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">All four services, one membership</p>
            <h2>The Ozi Membership</h2>
            <p>
              With our Ozi Service, you&apos;re granted effortless access to four premium home and business services —
              Cleaning and Care, Wardrobe and Laundry, Errand Concierge, and Kitchen Operation — crafted to elevate the
              comfort and rhythm of your daily living. Associates are at your service from 9am to 5pm, with a brief
              one-hour break.
            </p>
          </Reveal>
          <Reveal as="p" style={{ textAlign: "center", fontWeight: 600, marginBottom: "1.6rem" }}>
            Join the Ozi Membership tier that fits your lifestyle cadence; payment is monthly.
          </Reveal>
          <Reveal>
            <table className="z-table">
              <thead>
                <tr><th>Membership</th><th>Cadence</th><th>Price (₦)</th></tr>
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
            <p>
              Get a taste of Ozi for a day — book a private one-day experience from{" "}
              <strong>{formatNaira(RATES.tasteOfOziPrice)}</strong>. Time range: 9am–5pm or 12pm–6pm.
            </p>
          </Reveal>
          <div style={{ textAlign: "center", marginTop: "2rem" }}>
            <Link href="/booking" className="btn btn-gold">Join the Ozi Membership</Link>
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

      {/* OZI PLUS */}
      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Custom quotes available</p>
            <h2>Ozi Plus</h2>
            <p>Specialist services, delivered to the same standard — for the moments that ask for more.</p>
          </Reveal>
          <div className="grid grid-3">
            {oziPlus.map((s, i) => (
              <Reveal key={s.title} className="card" delay={(i % 3) * 80}>
                <div className="card-icon"><i className={`fas ${s.icon}`} /></div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
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
            <p style={{ marginBottom: "1rem", color: "var(--muted)" }}>Need help choosing or booking?</p>
            <Link href="/contact" className="btn btn-outline">Book a free consultation</Link>
          </div>
        </div>
      </section>
    </>
  );
}
