"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { oziTiers, deepCleaning } from "@/lib/site";
import {
  computePrice,
  formatNaira,
  oneTimeServices,
  type BookingType,
  type Location,
  type OneTimeService,
  type TimeSlot,
} from "@/lib/pricing";

const STEPS = ["Service", "Details", "Contact & Pay"];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  // selections
  const [type, setType] = useState<BookingType | "">("");
  const [location, setLocation] = useState<Location | "">("");
  const [service, setService] = useState<OneTimeService | "">("");
  const [bedrooms, setBedrooms] = useState("");
  const [oziPlan, setOziPlan] = useState("");
  const [upfront6Months, setUpfront6Months] = useState(false);
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot>("standard");
  const [assurance, setAssurance] = useState(false);
  const [hasPets, setHasPets] = useState(false);
  const [address, setAddress] = useState("");
  const [accessInstructions, setAccess] = useState("");
  const [notes, setNotes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [terms, setTerms] = useState(false);

  const needsBedrooms = service === "deep_cleaning" || service === "move_in_out";

  const price = useMemo(
    () =>
      computePrice({
        type: (type || "one_time") as BookingType,
        oziPlan,
        service: (service || undefined) as OneTimeService | undefined,
        bedrooms,
        timeSlot,
        date,
        assurance,
        upfront6Months,
      }),
    [type, oziPlan, service, bedrooms, timeSlot, date, assurance, upfront6Months]
  );

  function canProceed() {
    if (step === 0) {
      if (!type || !location) return false;
      if (type === "subscription") return Boolean(oziPlan);
      if (!service) return false;
      if (needsBedrooms && !bedrooms) return false;
      return true;
    }
    return true;
  }

  async function submit() {
    setError(null);
    if (!name || !email) return setError("Please enter your name and email.");
    if (!terms) return setError("Please accept the Terms of Use to continue.");
    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: type || "one_time",
          location,
          service: service || undefined,
          oziPlan: oziPlan || undefined,
          bedrooms: bedrooms || undefined,
          date: date || undefined,
          timeSlot,
          assurance,
          upfront6Months,
          hasPets,
          address,
          accessInstructions,
          notes,
          name,
          email,
          phone,
          termsAccepted: terms,
          addOns: assurance ? ["assurance"] : [],
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
      } else if (data.authorizationUrl) {
        window.location.href = data.authorizationUrl; // to Paystack
      } else if (data.quote) {
        setDone("quote");
      } else if (data.configured === false) {
        setDone("unconfigured");
      } else {
        setDone("ok");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <section className="page-hero" style={{ minHeight: "70vh" }}>
        <div className="container-narrow">
          <h1>{done === "quote" ? "Request received" : "Almost there"}</h1>
          <p>
            {done === "quote"
              ? "Thank you — we've received your request and will send you a tailored quote shortly."
              : done === "unconfigured"
              ? "Your booking details were captured. Online payment isn't switched on yet — our team will reach out with a secure payment link."
              : "Your booking has been recorded. We'll be in touch to confirm."}
          </p>
          <p style={{ marginTop: "1.5rem" }}>
            <Link href="/" className="btn btn-gold">Back to Home</Link>
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: "2rem" }}>
        <div className="container">
          <h1>Book a Service</h1>
          <p>Choose your plan, tell us the details, and pay securely — all in a few steps.</p>
        </div>
      </section>

      <section className="block" style={{ paddingTop: "2rem" }}>
        <div className="container booking-wrap">
          <div>
            {/* Steps */}
            <div className="steps">
              {STEPS.map((s, i) => (
                <div key={s} className={`step${i === step ? " active" : ""}${i < step ? " done" : ""}`}>
                  <span className="dot">{i < step ? <i className="fas fa-check" /> : i + 1}</span>
                  {s}
                </div>
              ))}
            </div>

            {/* STEP 0 — Service */}
            {step === 0 && (
              <div>
                <h3 style={{ marginBottom: "0.8rem" }}>What do you need?</h3>
                <div className="choice-grid">
                  <button className={`choice${type === "subscription" ? " selected" : ""}`} onClick={() => setType("subscription")}>
                    <span className="c-title">Ozi Subscription</span>
                    <span className="c-sub">All four services, monthly plan</span>
                  </button>
                  <button className={`choice${type === "one_time" ? " selected" : ""}`} onClick={() => setType("one_time")}>
                    <span className="c-title">One-time Service</span>
                    <span className="c-sub">Deep cleaning & specialty</span>
                  </button>
                </div>

                <h3 style={{ margin: "1.6rem 0 0.8rem" }}>Location</h3>
                <div className="choice-grid">
                  {(["enugu", "lagos"] as Location[]).map((loc) => (
                    <button key={loc} className={`choice${location === loc ? " selected" : ""}`} onClick={() => setLocation(loc)}>
                      <span className="c-title" style={{ textTransform: "capitalize" }}>{loc}</span>
                    </button>
                  ))}
                </div>

                {type === "subscription" && (
                  <>
                    <h3 style={{ margin: "1.6rem 0 0.8rem" }}>Choose your Ozi plan</h3>
                    <div className="choice-grid">
                      {oziTiers.map((t) => (
                        <button key={t.plan} className={`choice${oziPlan === t.plan ? " selected" : ""}`} onClick={() => setOziPlan(t.plan)}>
                          <span className="c-title">{t.plan}</span>
                          <span className="c-sub">{t.freq}</span>
                          <span className="c-price">{formatNaira(Number(t.price.replace(/,/g, "")))}/mo</span>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {type === "one_time" && (
                  <>
                    <h3 style={{ margin: "1.6rem 0 0.8rem" }}>Choose a service</h3>
                    <div className="choice-grid">
                      {oneTimeServices.map((s) => (
                        <button key={s.id} className={`choice${service === s.id ? " selected" : ""}`} onClick={() => setService(s.id)}>
                          <span className="c-title">{s.label}</span>
                          <span className="c-sub">{s.quote ? "Custom quote" : "Priced by home size"}</span>
                        </button>
                      ))}
                    </div>
                    {needsBedrooms && (
                      <>
                        <h3 style={{ margin: "1.6rem 0 0.8rem" }}>Home size</h3>
                        <div className="choice-grid">
                          {deepCleaning.map((d) => (
                            <button key={d.rooms} className={`choice${bedrooms === d.rooms ? " selected" : ""}`} onClick={() => setBedrooms(d.rooms)}>
                              <span className="c-title">{d.rooms}</span>
                              <span className="c-price">{formatNaira(Number(d.price.replace(/,/g, "")))}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                )}
              </div>
            )}

            {/* STEP 1 — Details */}
            {step === 1 && (
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Schedule & access</h3>
                <div className="field">
                  <label htmlFor="date">Preferred date</label>
                  <input id="date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="field">
                  <label>Time slot</label>
                  <div className="choice-grid">
                    <button className={`choice${timeSlot === "standard" ? " selected" : ""}`} onClick={() => setTimeSlot("standard")}>
                      <span className="c-title">Standard</span><span className="c-sub">9am – 5pm</span>
                    </button>
                    <button className={`choice${timeSlot === "off_hours" ? " selected" : ""}`} onClick={() => setTimeSlot("off_hours")}>
                      <span className="c-title">Outside 9–5</span><span className="c-sub">+30% surcharge</span>
                    </button>
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="address">Service address</label>
                  <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, area, city" />
                </div>
                <div className="field">
                  <label htmlFor="access">How should our team access the property?</label>
                  <textarea id="access" rows={2} value={accessInstructions} onChange={(e) => setAccess(e.target.value)} placeholder="e.g. lockbox code, hidden key location, gate entry instructions" />
                </div>
                <div className="check-row">
                  <input id="pets" type="checkbox" checked={hasPets} onChange={(e) => setHasPets(e.target.checked)} />
                  <label htmlFor="pets">I have pets at the property</label>
                </div>
                <div className="check-row">
                  <input id="assurance" type="checkbox" checked={assurance} onChange={(e) => setAssurance(e.target.checked)} />
                  <label htmlFor="assurance">Add the <strong>Assurance</strong> — protection against theft or damage by an associate ({formatNaira(price.assurance || 5000)}).</label>
                </div>
                {type === "subscription" && (
                  <div className="check-row">
                    <input id="upfront" type="checkbox" checked={upfront6Months} onChange={(e) => setUpfront6Months(e.target.checked)} />
                    <label htmlFor="upfront">Pay 6 months upfront and save 5%</label>
                  </div>
                )}
              </div>
            )}

            {/* STEP 2 — Contact & Pay */}
            {step === 2 && (
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Your details</h3>
                <div className="field"><label htmlFor="name">Full name</label><input id="name" value={name} onChange={(e) => setName(e.target.value)} required /></div>
                <div className="field"><label htmlFor="email">Email address</label><input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></div>
                <div className="field"><label htmlFor="phone">Phone number</label><input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234" /></div>
                <div className="field"><label htmlFor="notes">Anything else we should know?</label><textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
                <div className="check-row">
                  <input id="terms" type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                  <label htmlFor="terms">I agree to the <Link href="/terms" style={{ color: "var(--gold-deep)", textDecoration: "underline" }}>Terms of Use</Link>.</label>
                </div>
              </div>
            )}

            {error && <div className="form-error">{error}</div>}

            <div className="wizard-nav">
              {step > 0 ? (
                <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>Back</button>
              ) : <span />}
              {step < STEPS.length - 1 ? (
                <button className="btn btn-gold" disabled={!canProceed()} onClick={() => setStep((s) => s + 1)}>Continue</button>
              ) : (
                <button className="btn btn-gold" disabled={submitting} onClick={submit}>
                  {submitting ? "Processing…" : price.isQuote ? "Request Quote" : `Pay ${formatNaira(price.total)}`}
                </button>
              )}
            </div>
          </div>

          {/* Summary */}
          <aside className="summary-card">
            <h3>Summary</h3>
            <div className="summary-row"><span>Type</span><span>{type === "subscription" ? "Ozi Subscription" : type === "one_time" ? "One-time" : "—"}</span></div>
            <div className="summary-row"><span>Location</span><span style={{ textTransform: "capitalize" }}>{location || "—"}</span></div>
            {type === "subscription" && <div className="summary-row"><span>Plan</span><span>{oziPlan || "—"}</span></div>}
            {type === "one_time" && <div className="summary-row"><span>Service</span><span>{oneTimeServices.find((s) => s.id === service)?.label || "—"}</span></div>}
            {needsBedrooms && <div className="summary-row"><span>Home size</span><span>{bedrooms || "—"}</span></div>}
            {!price.isQuote && price.base > 0 && (
              <>
                <div className="summary-row"><span>Base</span><span>{formatNaira(price.base)}{type === "subscription" && upfront6Months ? " × 6" : ""}</span></div>
                {price.surcharges.map((s) => (
                  <div className="summary-row" key={s.label}><span>{s.label}</span><span>{formatNaira(s.amount)}</span></div>
                ))}
                {price.assurance > 0 && <div className="summary-row"><span>Assurance</span><span>{formatNaira(price.assurance)}</span></div>}
                {price.discount > 0 && <div className="summary-row"><span>Upfront discount</span><span>−{formatNaira(price.discount)}</span></div>}
              </>
            )}
            {price.isQuote ? (
              <p className="summary-note">This service is custom-priced. Submit your request and we&apos;ll send a quote.</p>
            ) : (
              <div className="summary-total"><span>Total</span><span>{formatNaira(price.total)}</span></div>
            )}
            {price.note && <p className="summary-note">{price.note}</p>}
          </aside>
        </div>
      </section>
    </>
  );
}
