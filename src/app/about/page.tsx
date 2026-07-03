import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "About — ZIGAM" };

const values = [
  { t: "Mastery", d: "Good is not enough. We strive for mastery in our training and perfection in our service delivery." },
  { t: "Integrity", d: "We do what is right, even when no one is watching — with total transparency and honesty." },
  { t: "Empathy", d: "We serve with care, respect, and genuine understanding of our clients' needs." },
  { t: "Ownership & Proactivity", d: "We take initiative, act responsibly, and follow through on our commitments." },
  { t: "Dependability", d: "We deliver consistently and honor every commitment." },
  { t: "Precision", d: "We value the details. Our service is measured by the accuracy and quality of our execution." },
  { t: "Discretion", d: "We respect the privacy of the environments we enter — felt, not heard." },
];

export default function About() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="h1">Meet Zigam</Reveal>
          <Reveal as="p" delay={100}>
            We are redefining modern living by empowering our clients to achieve their highest level of productivity.
          </Reveal>
        </div>
      </section>

      <section className="block">
        <div className="container two-col">
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2>Bridging a critical gap</h2>
            <hr className="rule" />
            <p style={{ color: "var(--muted)", marginBottom: "1rem" }}>
              Zigam was created to bridge a critical gap between the increasing demand for reliable home and workplace
              support and the immense potential of Nigeria&apos;s dynamic workforce.
            </p>
            <p style={{ color: "var(--muted)" }}>
              We are redefining homemaking through technology, world-class training, and trusted service — giving our
              clients the freedom to focus on what matters most, while creating dignified, flexible, and rewarding
              opportunities for our service professionals.
            </p>
          </Reveal>
          <Reveal className="quote-card" delay={120}>
            <p>&ldquo;We create more than clean and organised spaces — we create time, comfort, and peace of mind.&rdquo;</p>
            <cite>— The Zigam promise</cite>
          </Reveal>
        </div>
      </section>

      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <div className="grid grid-3">
            <Reveal className="card">
              <h3 style={{ color: "var(--gold-deep)" }}>Vision</h3>
              <p>To set the global standard for excellent home and workplace support — connecting discerning households and businesses with elite service professionals who operate with distinction, mastery, and purpose.</p>
            </Reveal>
            <Reveal className="card" delay={100}>
              <h3 style={{ color: "var(--gold-deep)" }}>Mission</h3>
              <p>To be Africa&apos;s most trusted support services ecosystem, redefining modern living by giving homes and businesses seamless access to exceptional support while elevating the dignity and value of service.</p>
            </Reveal>
            <Reveal className="card" delay={200}>
              <h3 style={{ color: "var(--gold-deep)" }}>Our model</h3>
              <p>Our associates are independent contractors — skilled professionals we vet and train — serving clients across homes and businesses anywhere you have a household.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">What we stand for</p>
            <h2>Our values</h2>
          </Reveal>
          <div className="grid grid-3">
            {values.map((v, i) => (
              <Reveal key={v.t} className="card value-card" delay={(i % 3) * 80}>
                <h3>{v.t}</h3>
                <p>{v.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block cta-band" id="careers">
        <div className="container">
          <Reveal>
            <h2>Join the Zigam workforce</h2>
            <p>We&apos;re hiring young adults in Enugu and Lagos. Receive professional training, supervision, and the dignity of formal work — on a schedule that respects your time.</p>
            <a href={site.workforceForm} target="_blank" rel="noopener noreferrer" className="btn btn-dark">
              <i className="fas fa-user-plus" /> Apply to Join
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
