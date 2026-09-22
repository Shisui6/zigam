import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { serviceDetails } from "@/lib/service-details";

export const metadata: Metadata = { title: "Description of Services — ZIGAM" };

export default function ServiceDetailsIndex() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Description of Services</h1>
          <p>At Zigam, we create more than clean and organised spaces — we create time, comfort, convenience, consistency and peace of mind, allowing our clients to focus on living and performing at their best.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <Reveal as="p" style={{ textAlign: "center", color: "var(--muted)", maxWidth: 760, margin: "0 auto 2.5rem" }}>
            Below are our services and what to expect — for both our one-time services and the Ozi Membership.
            Select any service to see everything it covers.
          </Reveal>
          <div className="grid grid-3">
            {serviceDetails.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 70}>
                <Link href={`/service-details/${s.slug}`} className="card detail-card">
                  <div className="card-icon"><i className={`fas ${s.icon}`} /></div>
                  <h3>{s.title}</h3>
                  <p>{s.summary}</p>
                  <p className="ideal-for">Ideal for: {s.idealFor}</p>
                  <span className="detail-link">View full details <i className="fas fa-arrow-right" /></span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container-narrow prose">
          <h2>What we expect</h2>
          <p>Our services can only be carried out if you have running or adequately stored water within the premises.</p>
          <p>Our services will only be fulfilled if you have all the essential cleaning materials.</p>
          <div className="note">
            <strong>Recommended products:</strong> for our membership service and A Taste of Ozi, your Associate will
            use the cleaning and laundry products you provide. These are basic recommendations, not hard requirements:
            broom, mop and mopping bucket, packer, dustbin and bags, scrubbing brush, rags, buckets and bowls, bleach,
            floor cleaner or soap, toilet cleaner, cleaning chemicals, dish soap and sponges, scouring powder,
            deep-action stain remover, glass cleaner, cobweb broom, duster, air freshener, and laundry detergent and
            conditioner.
          </div>
          <p>For some of our one-off services, Zigam will provide the materials needed. This is communicated in writing before confirmation of such service.</p>
          <p style={{ marginTop: "2rem" }}>
            <Link href="/booking" className="btn btn-gold" style={{ textDecoration: "none", marginRight: "0.8rem" }}>Book a Service</Link>
            <Link href="/terms" className="btn btn-outline" style={{ textDecoration: "none" }}>Read our Terms</Link>
          </p>
        </div>
      </section>
    </>
  );
}
