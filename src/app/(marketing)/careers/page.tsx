import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { associateRole as r } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers — Zigam Associate | ZIGAM",
  description:
    "Join the Zigam workforce as an Associate in Lagos or Enugu. Professional training, structured support, flexible work and the dignity of formal work.",
};

function ApplyButton({ label = "Apply Now" }: { label?: string }) {
  return (
    <a href={site.workforceForm} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
      <i className="fas fa-user-plus" /> {label}
    </a>
  );
}

export default function Careers() {
  return (
    <>
      {/* HERO */}
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">Join the Zigam workforce</Reveal>
          <Reveal as="h1">{r.title}</Reveal>
          <Reveal as="p" style={{ fontFamily: "var(--font-serif)", fontStyle: "italic", fontSize: "1.3rem", color: "var(--gold-deep)", marginTop: "0.4rem" }}>
            {r.subtitle}
          </Reveal>
          {/* Key facts — slim inline band */}
          <Reveal className="role-facts">
            {r.keyFacts.map((f) => (
              <span key={f.value} className="fact">
                <i className={`fas ${f.icon}`} /> {f.value}
              </span>
            ))}
          </Reveal>
          <Reveal style={{ marginTop: "2rem" }}>
            <ApplyButton />
          </Reveal>
        </div>
      </section>

      {/* ABOUT ZIGAM */}
      <section className="block">
        <div className="container-narrow prose">
          <Reveal>
            <h2>About Zigam</h2>
            {r.about.map((p, i) => <p key={i}>{p}</p>)}
          </Reveal>
        </div>
      </section>

      {/* THE ROLE */}
      <section className="section-dark block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow on-dark">The role</p>
            <h2>What you&apos;ll do</h2>
            {r.roleIntro.map((p, i) => <p key={i} style={{ marginTop: i ? "0.7rem" : 0 }}>{p}</p>)}
          </Reveal>

          <div className="grid grid-2">
            {r.responsibilities.map((s, i) => (
              <Reveal key={s.title} className="card" delay={(i % 2) * 90} style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(194,161,77,0.25)" }}>
                <div className="card-icon"><i className={`fas ${s.icon}`} /></div>
                <h3 style={{ color: "var(--ivory)" }}>{s.title}</h3>
                <p style={{ color: "rgba(243,237,225,0.8)" }}>{s.lead}</p>
                <ul className="dark-list">
                  {s.items.map((it) => <li key={it}><i className="fas fa-check" /> {it}</li>)}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLIENT EXPERIENCE */}
      <section className="block">
        <div className="container-narrow">
          <Reveal className="section-head">
            <p className="eyebrow">Beyond the tasks</p>
            <h2>Client experience</h2>
            <p>Associates are expected to:</p>
          </Reveal>
          <Reveal>
            <ul className="detail-list two-up">
              {r.clientExperience.map((c) => <li key={c}><i className="fas fa-check" /> {c}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow">Required skills</p>
            <h2>What we look for</h2>
          </Reveal>
          <div className="grid grid-3">
            {r.essentialSkills.map((s, i) => (
              <Reveal key={s.t} className="card value-card" delay={(i % 3) * 70}>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="container-narrow" style={{ marginTop: "2.5rem" }}>
            <ul className="detail-list two-up">
              {r.alsoLookingFor.map((c) => <li key={c}><i className="fas fa-check" /> {c}</li>)}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ATTRIBUTES */}
      <section className="block">
        <div className="container-narrow">
          <Reveal className="section-head">
            <p className="eyebrow">Personal attributes</p>
            <h2>The ideal Zigam Associate</h2>
          </Reveal>
          <div className="attr-list">
            {r.attributes.map((a, i) => (
              <Reveal key={a.t} className="attr-row" delay={i * 50}>
                <strong>{a.t}</strong>
                <span>{a.d}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE & QUALIFICATIONS */}
      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container-narrow prose">
          <Reveal>
            <h2>Experience</h2>
            <p>Previous experience in any of the following would be advantageous:</p>
            <div className="pill-row">
              {r.experienceAdvantageous.map((e) => <span key={e} className="pill">{e}</span>)}
            </div>
            <div className="note" style={{ marginTop: "1.5rem" }}>{r.experienceNote}</div>
          </Reveal>

          <Reveal style={{ marginTop: "2.5rem" }}>
            <h2>Education &amp; qualifications</h2>
            <h3>Minimum requirements</h3>
            <ul>{r.minimumRequirements.map((m) => <li key={m}>{m}</li>)}</ul>
            <h3>Advantageous, but not mandatory</h3>
            <ul>{r.advantageousQualifications.map((m) => <li key={m}>{m}</li>)}</ul>
          </Reveal>
        </div>
      </section>

      {/* VETTING */}
      <section className="block">
        <div className="container-narrow prose">
          <Reveal>
            <h2>Safety &amp; vetting</h2>
            <p>{r.vettingIntro}</p>
            <p>This may include:</p>
            <ul className="detail-list two-up" style={{ marginTop: "0.6rem" }}>
              {r.vetting.map((v) => <li key={v}><i className="fas fa-shield-halved" /> {v}</li>)}
            </ul>
            <div className="note" style={{ marginTop: "1.5rem" }}>{r.vettingNote}</div>
          </Reveal>
        </div>
      </section>

      {/* WHAT ZIGAM OFFERS */}
      <section className="section-dark block">
        <div className="container">
          <Reveal className="section-head">
            <p className="eyebrow on-dark">What Zigam offers</p>
            <h2>More than a job</h2>
            <p>As a Zigam Associate, you&apos;ll receive professional training, supervision, and the dignity of formal work — on a schedule that respects your time.</p>
          </Reveal>
          <div className="grid grid-3">
            {r.offers.map((o, i) => (
              <Reveal key={o.t} className="card" delay={(i % 3) * 80} style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(194,161,77,0.25)" }}>
                <div className="card-icon"><i className={`fas ${o.icon}`} /></div>
                <h3 style={{ color: "var(--ivory)", fontSize: "1.35rem" }}>{o.t}</h3>
                <p style={{ color: "rgba(243,237,225,0.75)" }}>{o.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CLOSING + APPLY */}
      <section className="block founders-callout">
        <div className="container">
          <Reveal className="founders-card">
            <p className="eyebrow">Who we are looking for</p>
            <h2>Service is a profession</h2>
            <hr className="rule" />
            {r.closing.map((c, i) => (
              <p key={i} style={{ marginBottom: i === r.closing.length - 1 ? "2rem" : "0.7rem" }}>{c}</p>
            ))}
            <ApplyButton label="Apply to Join" />
            <p style={{ fontSize: "0.85rem", marginTop: "1.2rem", marginBottom: 0 }}>
              Questions? Email <a href={`mailto:${site.email}`} style={{ color: "var(--gold-deep)" }}>{site.email}</a> or call{" "}
              <a href={site.phoneHref} style={{ color: "var(--gold-deep)" }}>{site.phone}</a>.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
