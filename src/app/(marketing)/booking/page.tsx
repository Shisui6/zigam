"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { oziTiers, deepCleaning, oziServices } from "@/lib/site";
import {
  computePrice,
  assuranceFor,
  formatNaira,
  minBookableDate,
  oneTimeServices,
  WEEKDAYS,
  type BookingType,
  type Location,
  type OneTimeService,
  type TimeSlot,
} from "@/lib/pricing";

const STEPS = ["Service", "Details", "Contact & Pay"];

export default function Booking() {
  const [step, setStep] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [attempted, setAttempted] = useState<Record<number, boolean>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  // selections
  const [type, setType] = useState<BookingType | "">("");
  const [location, setLocation] = useState<Location | "">("");
  const [service, setService] = useState<OneTimeService | "">("");
  const [bedrooms, setBedrooms] = useState("");
  const [oziPlan, setOziPlan] = useState("");
  const [priority, setPriority] = useState("");
  const [preferredDays, setPreferredDays] = useState<string[]>([]);
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

  const needsBedrooms = Boolean(oneTimeServices.find((s) => s.id === service)?.bedrooms);
  const selectedTier = oziTiers.find((t) => t.plan === oziPlan);
  const minDate = useMemo(() => minBookableDate(), []);

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

  // What the Assurance would cost/cover for the current selection (shown on the checkbox)
  const assuranceQuote = useMemo(
    () =>
      assuranceFor(
        {
          type: (type || "one_time") as BookingType,
          service: (service || undefined) as OneTimeService | undefined,
        },
        price.base
      ),
    [type, service, price.base]
  );

  /** Required fields per step. Returns a list of what's still missing. */
  function missingFor(s: number): string[] {
    const missing: string[] = [];
    if (s === 0) {
      if (!type) missing.push("what you need");
      if (!location) missing.push("a location");
      if (type === "subscription" && !oziPlan) missing.push("an Ozi Membership tier");
      if (type === "subscription" && !priority) missing.push("your priority service");
      if (type === "subscription" && selectedTier && preferredDays.length !== selectedTier.daysPerWeek)
        missing.push(`${selectedTier.daysPerWeek} preferred day${selectedTier.daysPerWeek > 1 ? "s" : ""} of the week`);
      if (type === "one_time" && !service) missing.push("a service");
      if (needsBedrooms && !bedrooms) missing.push("your home size");
    }
    if (s === 1) {
      if (!date) missing.push(type === "subscription" ? "a start date" : "a preferred date");
      if (!address.trim()) missing.push("the service address");
      if (!accessInstructions.trim()) missing.push("access instructions");
    }
    if (s === 2) {
      if (!name.trim()) missing.push("your full name");
      if (!email.trim()) missing.push("your email address");
      if (!phone.trim()) missing.push("your phone number");
      if (!terms) missing.push("agreement to the Terms of Use");
    }
    return missing;
  }

  const canProceed = () => missingFor(step).length === 0;
  const missing = missingFor(step);
  const bad = (label: string) => attempted[step] && missing.includes(label);
  const badAny = (labels: string[]) => attempted[step] && labels.some((l) => missing.includes(l));

  function toggleDay(day: string) {
    setPreferredDays((prev) => {
      if (prev.includes(day)) return prev.filter((d) => d !== day);
      const max = selectedTier?.daysPerWeek ?? 7;
      if (prev.length >= max) return prev; // restricted to tier's allowance
      return [...prev, day];
    });
  }

  function goNext() {
    const m = missingFor(step);
    if (m.length) {
      setAttempted((a) => ({ ...a, [step]: true }));
      setError(`Please provide ${m.join(", ")}.`);
      return;
    }
    setError(null);
    setStep((s) => s + 1);
  }

  async function submit() {
    const m = missingFor(2);
    if (m.length) {
      setAttempted((a) => ({ ...a, 2: true }));
      return setError(`Please provide ${m.join(", ")}.`);
    }
    setError(null);
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
          priority: priority || undefined,
          preferredDays: type === "subscription" ? preferredDays : undefined,
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
          <p>Choose your membership or service, tell us the details, and pay securely — all in a few steps.</p>
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
                <h3 className={bad("what you need") ? "invalid-label" : ""} style={{ marginBottom: "0.8rem" }}>What do you need?</h3>
                <div className="choice-grid">
                  <button className={`choice${type === "subscription" ? " selected" : ""}`} onClick={() => setType("subscription")}>
                    <span className="c-title">Ozi Membership</span>
                    <span className="c-sub">All four services, monthly membership</span>
                  </button>
                  <button className={`choice${type === "taste_of_ozi" ? " selected" : ""}`} onClick={() => setType("taste_of_ozi")}>
                    <span className="c-title">A Taste of Ozi</span>
                    <span className="c-sub">Get a taste of Ozi for a day — book a private one-day experience</span>
                  </button>
                  <button className={`choice${type === "one_time" ? " selected" : ""}`} onClick={() => setType("one_time")}>
                    <span className="c-title">One-time Service</span>
                    <span className="c-sub">Deep Cleaning, decluttering and organising, private chef, gardening, fumigation and more.</span>
                  </button>
                </div>
                {bad("what you need") && <p className="required-hint">Please select what you need.</p>}

                <h3 className={bad("a location") ? "invalid-label" : ""} style={{ margin: "1.6rem 0 0.8rem" }}>Location</h3>
                <div className="choice-grid">
                  {(["enugu", "lagos"] as Location[]).map((loc) => (
                    <button key={loc} className={`choice${location === loc ? " selected" : ""}`} onClick={() => setLocation(loc)}>
                      <span className="c-title" style={{ textTransform: "capitalize" }}>{loc}</span>
                    </button>
                  ))}
                </div>
                {bad("a location") && <p className="required-hint">Please choose Enugu or Lagos.</p>}

                {type === "taste_of_ozi" && (
                  <p className="summary-note" style={{ marginTop: "1.2rem" }}>
                    A fixed price of {formatNaira(15000)} — not priced by home size. Time range: 9am–5pm.
                  </p>
                )}

                {type === "subscription" && (
                  <>
                    <h3 className={bad("an Ozi Membership tier") ? "invalid-label" : ""} style={{ margin: "1.6rem 0 0.8rem" }}>Choose your Ozi Membership</h3>
                    <div className="choice-grid">
                      {oziTiers.map((t) => (
                        <button
                          key={t.plan}
                          className={`choice${oziPlan === t.plan ? " selected" : ""}`}
                          onClick={() => {
                            setOziPlan(t.plan);
                            setPreferredDays([]);
                          }}
                        >
                          <span className="c-title">{t.plan}</span>
                          <span className="c-sub">{t.freq}</span>
                          <span className="c-price">{formatNaira(Number(t.price.replace(/,/g, "")))}/mo</span>
                        </button>
                      ))}
                    </div>
                    {bad("an Ozi Membership tier") && <p className="required-hint">Please choose a membership tier.</p>}

                    <h3 className={bad("your priority service") ? "invalid-label" : ""} style={{ margin: "1.6rem 0 0.4rem" }}>Which service is your priority?</h3>
                    <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                      The Ozi Membership is all-in-one — your Associate covers all four. Tell us which matters most so we
                      brief them accordingly.
                    </p>
                    <div className="choice-grid">
                      {oziServices.map((s) => (
                        <button key={s.title} className={`choice${priority === s.title ? " selected" : ""}`} onClick={() => setPriority(s.title)}>
                          <span className="c-title">{s.title}</span>
                        </button>
                      ))}
                    </div>
                    {bad("your priority service") && <p className="required-hint">Please choose your priority service.</p>}

                    {oziPlan && selectedTier && (
                      <>
                        <h3
                          className={badAny([`${selectedTier.daysPerWeek} preferred day${selectedTier.daysPerWeek > 1 ? "s" : ""} of the week`]) ? "invalid-label" : ""}
                          style={{ margin: "1.6rem 0 0.4rem" }}
                        >
                          Preferred day{selectedTier.daysPerWeek > 1 ? "s" : ""} of the week
                        </h3>
                        <p style={{ color: "var(--muted)", fontSize: "0.9rem", marginBottom: "0.8rem" }}>
                          {selectedTier.plan} includes {selectedTier.daysPerWeek} day{selectedTier.daysPerWeek > 1 ? "s" : ""} a
                          week — choose exactly {selectedTier.daysPerWeek}.
                        </p>
                        <div className="choice-grid choice-grid-days">
                          {WEEKDAYS.map((d) => (
                            <button
                              key={d}
                              className={`choice choice-sm${preferredDays.includes(d) ? " selected" : ""}`}
                              onClick={() => toggleDay(d)}
                              disabled={!preferredDays.includes(d) && preferredDays.length >= selectedTier.daysPerWeek}
                            >
                              <span className="c-title">{d}</span>
                            </button>
                          ))}
                        </div>
                        {badAny([`${selectedTier.daysPerWeek} preferred day${selectedTier.daysPerWeek > 1 ? "s" : ""} of the week`]) && (
                          <p className="required-hint">
                            Please choose exactly {selectedTier.daysPerWeek} day{selectedTier.daysPerWeek > 1 ? "s" : ""}.
                          </p>
                        )}
                      </>
                    )}
                  </>
                )}

                {type === "one_time" && (
                  <>
                    <h3 className={bad("a service") ? "invalid-label" : ""} style={{ margin: "1.6rem 0 0.8rem" }}>Choose a service</h3>
                    <div className="choice-grid">
                      {oneTimeServices.map((s) => (
                        <button key={s.id} className={`choice${service === s.id ? " selected" : ""}`} onClick={() => setService(s.id)}>
                          <span className="c-title">{s.label}</span>
                          <span className="c-sub">{s.quote ? "Custom quote" : "Priced by home size"}</span>
                        </button>
                      ))}
                    </div>
                    {bad("a service") && <p className="required-hint">Please choose a service.</p>}
                    {needsBedrooms && (
                      <>
                        <h3 className={bad("your home size") ? "invalid-label" : ""} style={{ margin: "1.6rem 0 0.8rem" }}>Home size</h3>
                        <div className="choice-grid">
                          {deepCleaning.map((d) => (
                            <button key={d.rooms} className={`choice${bedrooms === d.rooms ? " selected" : ""}`} onClick={() => setBedrooms(d.rooms)}>
                              <span className="c-title">{d.rooms}</span>
                              <span className="c-price">{formatNaira(Number(d.price.replace(/,/g, "")))}</span>
                            </button>
                          ))}
                        </div>
                        {bad("your home size") && <p className="required-hint">Please choose your home size.</p>}
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
                <div className={`field${badAny(["a start date", "a preferred date"]) ? " invalid" : ""}`}>
                  <label htmlFor="date">{type === "subscription" ? "Start date" : "Preferred date"}</label>
                  <input id="date" type="date" min={minDate} value={date} onChange={(e) => setDate(e.target.value)} />
                  <p style={{ color: "var(--muted)", fontSize: "0.82rem", marginTop: "0.3rem" }}>
                    We require at least 24 hours&apos; notice — same-day bookings aren&apos;t available, and requests
                    made after 5pm need an extra day.
                  </p>
                  {badAny(["a start date", "a preferred date"]) && (
                    <p className="required-hint">Please choose a date.</p>
                  )}
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
                <div className={`field${bad("the service address") ? " invalid" : ""}`}>
                  <label htmlFor="address">Service address</label>
                  <input id="address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, area, city" />
                  {bad("the service address") && <p className="required-hint">Please provide the service address.</p>}
                </div>
                <div className={`field${bad("access instructions") ? " invalid" : ""}`}>
                  <label htmlFor="access">How should our team access the property?</label>
                  <textarea id="access" rows={2} value={accessInstructions} onChange={(e) => setAccess(e.target.value)} placeholder="e.g. lockbox code, hidden key location, gate entry instructions" />
                  {bad("access instructions") && <p className="required-hint">Please let us know how to access the property.</p>}
                </div>
                <div className="check-row">
                  <input id="pets" type="checkbox" checked={hasPets} onChange={(e) => setHasPets(e.target.checked)} />
                  <label htmlFor="pets">I have pets at the property</label>
                </div>
                <div className="check-row">
                  <input id="assurance" type="checkbox" checked={assurance} onChange={(e) => setAssurance(e.target.checked)} />
                  <label htmlFor="assurance">
                    Add the <strong>Assurance</strong> — protection against theft or damage by an associate
                    {assuranceQuote.fee > 0 && (
                      <> ({formatNaira(assuranceQuote.fee)}, covers up to {formatNaira(assuranceQuote.coverage)})</>
                    )}.
                  </label>
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
                <div className={`field${bad("your full name") ? " invalid" : ""}`}>
                  <label htmlFor="name">Full name</label>
                  <input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  {bad("your full name") && <p className="required-hint">Please tell us your full name.</p>}
                </div>
                <div className={`field${bad("your email address") ? " invalid" : ""}`}>
                  <label htmlFor="email">Email address</label>
                  <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  {bad("your email address") && <p className="required-hint">Please provide your email address.</p>}
                </div>
                <div className={`field${bad("your phone number") ? " invalid" : ""}`}>
                  <label htmlFor="phone">Phone number</label>
                  <input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+234" />
                  {bad("your phone number") && <p className="required-hint">Please provide your phone number.</p>}
                </div>
                <div className="field"><label htmlFor="notes">Anything else we should know?</label><textarea id="notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} /></div>
                <div className={`check-row${bad("agreement to the Terms of Use") ? " invalid" : ""}`}>
                  <input id="terms" type="checkbox" checked={terms} onChange={(e) => setTerms(e.target.checked)} />
                  <label htmlFor="terms">I agree to the <Link href="/terms" style={{ color: "var(--gold-deep)", textDecoration: "underline" }}>Terms of Use</Link>.</label>
                </div>
                {bad("agreement to the Terms of Use") && <p className="required-hint">Please accept the Terms of Use.</p>}
              </div>
            )}

            {error && <div className="form-error">{error}</div>}

            <div className="wizard-nav">
              {step > 0 ? (
                <button className="btn btn-outline" onClick={() => setStep((s) => s - 1)}>Back</button>
              ) : <span />}
              {step < STEPS.length - 1 ? (
                <button className="btn btn-gold" onClick={goNext}>Continue</button>
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
            <div className="summary-row">
              <span>Type</span>
              <span>{type === "subscription" ? "Ozi Membership" : type === "taste_of_ozi" ? "A Taste of Ozi" : type === "one_time" ? "One-time" : "—"}</span>
            </div>
            <div className="summary-row"><span>Location</span><span style={{ textTransform: "capitalize" }}>{location || "—"}</span></div>
            {type === "subscription" && <div className="summary-row"><span>Membership</span><span>{oziPlan || "—"}</span></div>}
            {type === "subscription" && <div className="summary-row"><span>Priority</span><span>{priority || "—"}</span></div>}
            {type === "subscription" && preferredDays.length > 0 && (
              <div className="summary-row"><span>Days</span><span>{preferredDays.join(", ")}</span></div>
            )}
            {type === "one_time" && <div className="summary-row"><span>Service</span><span>{oneTimeServices.find((s) => s.id === service)?.label || "—"}</span></div>}
            {needsBedrooms && <div className="summary-row"><span>Home size</span><span>{bedrooms || "—"}</span></div>}
            {!price.isQuote && price.base > 0 && (
              <>
                <div className="summary-row"><span>Base</span><span>{formatNaira(price.base)}{type === "subscription" && upfront6Months ? " × 6" : ""}</span></div>
                {price.surcharges.map((s) => (
                  <div className="summary-row" key={s.label}><span>{s.label}</span><span>{formatNaira(s.amount)}</span></div>
                ))}
                {price.assurance > 0 && (
                  <div className="summary-row">
                    <span>Assurance <small style={{ opacity: 0.75 }}>(covers {formatNaira(price.assuranceCoverage)})</small></span>
                    <span>{formatNaira(price.assurance)}</span>
                  </div>
                )}
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
