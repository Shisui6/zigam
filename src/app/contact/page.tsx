import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Contact — ZIGAM" };

export default function Contact() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="h1">Contact Us</Reveal>
          <Reveal as="p" delay={100}>Book a free consultation, or reach out with any question — we&apos;re here to help.</Reveal>
        </div>
      </section>

      <section className="block">
        <div className="container contact-grid">
          <Reveal>
            <p className="eyebrow">Get in touch</p>
            <h2>We&apos;d love to hear from you</h2>
            <hr className="rule" />
            <div style={{ marginTop: "1.5rem" }}>
              <div className="contact-item">
                <i className="fas fa-phone" />
                <div><strong>Phone</strong><br /><a href={site.phoneHref}>{site.phone}</a></div>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope" />
                <div><strong>Email</strong><br /><a href={`mailto:${site.email}`}>{site.email}</a></div>
              </div>
              <div className="contact-item">
                <i className="fas fa-location-dot" />
                <div><strong>Enugu</strong><br />{site.offices.enugu.lines.join(" ")}</div>
              </div>
              <div className="contact-item">
                <i className="fas fa-location-dot" />
                <div><strong>Lagos</strong><br />{site.offices.lagos.lines.join(" ")}</div>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock" />
                <div><strong>Hours</strong><br />Monday–Saturday, 9am–6pm</div>
              </div>
            </div>
          </Reveal>

          <Reveal className="card" delay={120}>
            <h3 style={{ marginBottom: "1.2rem" }}>Send us a message</h3>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
