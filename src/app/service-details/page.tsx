import type { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = { title: "Description of Services — ZIGAM" };

const services = [
  { icon: "fa-bag-shopping", t: "Errand Concierge", d: "Let Zigam handle the tasks that keep life moving — outsourcing routine tasks and daily responsibilities.", ideal: "Busy professionals, families, elderly clients, and anyone seeking more time." },
  { icon: "fa-utensils", t: "Food Processing & Kitchen Assistance", d: "We handle the time-consuming groundwork so you can focus on the final cooking, following our “Zigam Clean & Safe” hygiene protocols.", ideal: "Busy households, businesses, working professionals, large families, and event prep." },
  { icon: "fa-shirt", t: "Laundry", d: "Thoughtful wardrobe and linen care, delivered with attention to detail.", ideal: "Anyone who values their time." },
  { icon: "fa-boxes-stacked", t: "Decluttering & Organising", d: "Create order, maximise space, and improve the efficiency of your home or workspace.", ideal: "Individuals and businesses seeking a more organised lifestyle." },
  { icon: "fa-broom", t: "General & Office Cleaning", d: "Everyday cleaning for homes and offices — sweeping, mopping, dusting, and surface sanitisation.", ideal: "Homes and workplaces." },
  { icon: "fa-house-chimney-window", t: "Airbnb / Short-let Cleaning", d: "Turnover-ready cleaning to keep your short-let space guest-ready.", ideal: "Hosts and hospitality operators." },
  { icon: "fa-truck-ramp-box", t: "Move-in Cleaning", d: "A thorough cleaning of your new home in preparation for you to move in.", ideal: "Anyone relocating." },
  { icon: "fa-spray-can-sparkles", t: "Deep Cleaning", d: "A more thorough approach than standard cleaning: moving furniture, interior windows, inside cabinets, fridge/oven, balcony and fans.", ideal: "Periodic resets and neglected spaces." },
  { icon: "fa-hard-hat", t: "Post-Construction Cleaning", d: "Dust, debris, and detailing for newly built or renovated spaces.", ideal: "After building or renovation." },
  { icon: "fa-couch", t: "Couch & Rug Cleaning", d: "Sofa, cushion, upholstery and rug detailing.", ideal: "Refreshing soft furnishings." },
  { icon: "fa-hand-holding-heart", t: "Elderly Care & Companionship", d: "Compassionate light caregiving, companionship, and daily support.", ideal: "Families with elderly loved ones." },
  { icon: "fa-child", t: "Childcare", d: "Attentive childminding support. A parent or guardian must remain on the premises for the full booking.", ideal: "Parents needing a hand." },
];

export default function ServiceDetails() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Description of Services</h1>
          <p>At Zigam, we create more than clean and organised spaces — we create time, comfort, and peace of mind.</p>
        </div>
      </section>

      <section className="block">
        <div className="container">
          <div className="grid grid-3">
            {services.map((s, i) => (
              <Reveal key={s.t} className="card" delay={(i % 3) * 70}>
                <div className="card-icon"><i className={`fas ${s.icon}`} /></div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <p style={{ marginTop: "0.7rem", fontSize: "0.85rem", color: "var(--gold-deep)", fontWeight: 600 }}>Ideal for: {s.ideal}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container-narrow prose">
          <h2>What we expect</h2>
          <p>Our services can only be carried out if you have running or adequately stored water within the premises.</p>
          <div className="note">
            <strong>Recommended products:</strong> for our subscription service and &ldquo;a taste of Ozi&rdquo;, your Associate uses the cleaning and laundry products you provide — broom, mop &amp; bucket, dustbin &amp; bags, scrubbing brush, rags, bleach, floor &amp; toilet cleaner, dish soap &amp; sponges, glass cleaner, duster, air freshener, laundry detergent, and similar basics. These are recommendations, not hard requirements.
          </div>
          <p>For some one-off services, Zigam provides the materials needed. This is communicated in writing before confirmation.</p>
          <p style={{ marginTop: "2rem" }}>
            <a href="/booking" className="btn btn-gold" style={{ textDecoration: "none", marginRight: "0.8rem" }}>Book a Service</a>
            <a href="/terms" className="btn btn-outline" style={{ textDecoration: "none" }}>Read our Terms</a>
          </p>
        </div>
      </section>
    </>
  );
}
