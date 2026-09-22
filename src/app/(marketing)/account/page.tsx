"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Session } from "@supabase/supabase-js";
import { getBrowserClient } from "@/lib/supabase-client";
import { site } from "@/lib/site";
import { formatNaira } from "@/lib/pricing";

type Booking = {
  id: string;
  booking_type: "one_time" | "subscription";
  location: string;
  service: string | null;
  ozi_plan: string | null;
  priority_service: string | null;
  service_date: string | null;
  status: string;
  total_amount: number;
  assigned_associate: string | null;
  created_at: string;
};

type Pause = { id: string; booking_id: string; start_date: string; end_date: string; status: string };
type Rating = { booking_id: string; stars: number };

const serviceLabels: Record<string, string> = {
  taste_of_ozi: "A Taste of Ozi",
  deep_cleaning: "Deep Cleaning",
  move_in_out: "Move-in / Move-out",
  post_construction: "Post-Construction Clean",
  airbnb: "Airbnb / Shortlet",
  office_cleaning: "Office Cleaning and Care",
  couch_rug: "Couch & Rug Cleaning",
  decluttering: "Decluttering and Organising",
  private_chef: "Hire a Private Chef",
  care: "Elderly Care and Child Care",
  gardening: "Gardening and Landscaping",
  fumigation: "Fumigation",
};

const statusLabel: Record<string, string> = {
  pending: "Awaiting payment",
  paid: "Active",
  quote_requested: "Quote requested",
  failed: "Payment failed",
  cancelled: "Cancelled",
};

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso + (iso.length <= 10 ? "T12:00:00" : "")).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—";

export default function Account() {
  const supabase = useMemo(() => getBrowserClient(), []);
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [pauses, setPauses] = useState<Pause[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [autoRenew, setAutoRenew] = useState<boolean | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // pause form state
  const [pauseFor, setPauseFor] = useState<string | null>(null);
  const [pauseStart, setPauseStart] = useState("");
  const [pauseEnd, setPauseEnd] = useState("");
  // rating form state
  const [rateFor, setRateFor] = useState<string | null>(null);
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState("");

  const loadData = useCallback(async () => {
    if (!supabase) return;
    const [{ data: b }, { data: p }, { data: r }] = await Promise.all([
      supabase.from("bookings").select("id,booking_type,location,service,ozi_plan,priority_service,service_date,status,total_amount,assigned_associate,created_at").order("created_at", { ascending: false }),
      supabase.from("subscription_pauses").select("id,booking_id,start_date,end_date,status").order("start_date", { ascending: false }),
      supabase.from("service_ratings").select("booking_id,stars"),
    ]);
    setBookings((b as Booking[]) ?? []);
    setPauses((p as Pause[]) ?? []);
    setRatings((r as Rating[]) ?? []);
  }, [supabase]);

  useEffect(() => {
    if (!supabase) { setReady(true); return; }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, [supabase]);

  useEffect(() => {
    if (!supabase || !session) return;
    loadData();
    supabase.from("member_preferences").select("auto_renew").maybeSingle()
      .then(({ data }) => setAutoRenew(data ? data.auto_renew : true));
  }, [supabase, session, loadData]);

  async function requestPause(bookingId: string) {
    if (!supabase || !session) return;
    setError(null); setNotice(null);
    const days = (new Date(pauseEnd).getTime() - new Date(pauseStart).getTime()) / 86400000;
    if (!pauseStart || !pauseEnd || isNaN(days)) return setError("Choose a start and end date for the pause.");
    if (days < 7 || days > 21) return setError("Pauses can last one to three weeks (7–21 days).");
    const { error } = await supabase.from("subscription_pauses").insert({
      booking_id: bookingId,
      email: session.user.email,
      start_date: pauseStart,
      end_date: pauseEnd,
    });
    if (error) setError(error.message);
    else {
      setNotice("Pause requested — we'll confirm shortly and your schedule will resume automatically afterwards.");
      setPauseFor(null); setPauseStart(""); setPauseEnd("");
      loadData();
    }
  }

  async function submitRating(bookingId: string) {
    if (!supabase || !session) return;
    setError(null); setNotice(null);
    const { error } = await supabase.from("service_ratings").insert({
      booking_id: bookingId, email: session.user.email, stars, comment: comment || null,
    });
    if (error) setError(error.message);
    else { setNotice("Thank you — your rating helps us keep the standard high."); setRateFor(null); setComment(""); loadData(); }
  }

  async function toggleAutoRenew() {
    if (!supabase || !session || autoRenew === null) return;
    const next = !autoRenew;
    setAutoRenew(next);
    await supabase.from("member_preferences").upsert({ email: session.user.email, auto_renew: next, updated_at: new Date().toISOString() });
  }

  async function signOut() {
    await supabase?.auth.signOut();
    setSession(null);
  }

  // ---------- render ----------
  if (!ready) return <section className="page-hero" style={{ minHeight: "70vh" }}><div className="container"><p>Loading…</p></div></section>;

  if (!supabase) {
    return (
      <section className="page-hero" style={{ minHeight: "70vh" }}>
        <div className="container-narrow">
          <h1>Accounts coming soon</h1>
          <p>Member accounts aren&apos;t switched on in this environment yet.</p>
        </div>
      </section>
    );
  }

  if (!session) {
    return (
      <section className="page-hero" style={{ minHeight: "70vh" }}>
        <div className="container-narrow">
          <p className="eyebrow">Ozi Members</p>
          <h1>Sign in to your account</h1>
          <p style={{ margin: "0.8rem 0 1.8rem" }}>Manage your membership, pause your schedule, see your Associate and rate your service.</p>
          <Link href="/account/login" className="btn btn-gold">Sign in with email</Link>
        </div>
      </section>
    );
  }

  const memberships = bookings.filter((b) => b.booking_type === "subscription");
  const oneTimes = bookings.filter((b) => b.booking_type === "one_time");
  const firstName = session.user.email?.split("@")[0];

  return (
    <>
      <section className="page-hero" style={{ paddingBottom: "2.5rem" }}>
        <div className="container">
          <p className="eyebrow">Member account</p>
          <h1 style={{ fontSize: "clamp(2rem, 4.5vw, 3.2rem)" }}>Welcome back</h1>
          <p>{session.user.email}</p>
          <div style={{ marginTop: "1.2rem", display: "flex", gap: "0.8rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/booking" className="btn btn-gold">New booking</Link>
            <button onClick={signOut} className="btn btn-outline">Sign out</button>
          </div>
        </div>
      </section>

      <section className="block" style={{ paddingTop: "2rem" }}>
        <div className="container" style={{ maxWidth: 920 }}>
          {(notice || error) && (
            <div className={error ? "form-error" : "acct-notice"} style={{ marginBottom: "1.5rem" }}>{error || notice}</div>
          )}

          {/* MEMBERSHIPS */}
          <h2 style={{ fontSize: "1.7rem", marginBottom: "1rem" }}>Your Ozi Membership</h2>
          {memberships.length === 0 && (
            <div className="card" style={{ marginBottom: "2.5rem" }}>
              <p>No membership yet, {firstName}. The Ozi Experience — all four services, one trained Associate — starts from ₦52,000/month.</p>
              <Link href="/booking" className="btn btn-gold" style={{ marginTop: "1rem" }}>Explore memberships</Link>
            </div>
          )}
          {memberships.map((m) => {
            const myPauses = pauses.filter((p) => p.booking_id === m.id);
            return (
              <div key={m.id} className="member-card">
                <div className="member-card-head">
                  <div>
                    <span className="mc-tier">{m.ozi_plan ?? "Ozi"} Membership</span>
                    <span className={`mc-status s-${m.status}`}>{statusLabel[m.status] ?? m.status}</span>
                  </div>
                  <span className="mc-price">{formatNaira(m.total_amount)}/mo</span>
                </div>
                <div className="mc-grid">
                  <div><span className="mc-label">Location</span><span style={{ textTransform: "capitalize" }}>{m.location}</span></div>
                  <div><span className="mc-label">Priority service</span><span>{m.priority_service ?? "—"}</span></div>
                  <div><span className="mc-label">Your Associate</span><span>{m.assigned_associate ?? "Being assigned"}</span></div>
                  <div><span className="mc-label">Member since</span><span>{fmtDate(m.created_at.slice(0, 10))}</span></div>
                </div>

                {myPauses.length > 0 && (
                  <div className="mc-pauses">
                    {myPauses.map((p) => (
                      <p key={p.id}><i className="fas fa-circle-pause" /> Pause {fmtDate(p.start_date)} → {fmtDate(p.end_date)} · <em>{p.status}</em></p>
                    ))}
                  </div>
                )}

                <div className="mc-actions">
                  {pauseFor === m.id ? (
                    <div className="pause-form">
                      <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "0.6rem" }}>
                        Pause for one to three weeks. Please give us at least two days&apos; notice.
                      </p>
                      <div className="pause-dates">
                        <label>From <input type="date" value={pauseStart} onChange={(e) => setPauseStart(e.target.value)} /></label>
                        <label>To <input type="date" value={pauseEnd} onChange={(e) => setPauseEnd(e.target.value)} /></label>
                      </div>
                      <div style={{ display: "flex", gap: "0.6rem", marginTop: "0.8rem" }}>
                        <button className="btn btn-gold" onClick={() => requestPause(m.id)}>Request pause</button>
                        <button className="btn btn-outline" onClick={() => setPauseFor(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <button className="btn btn-outline" onClick={() => setPauseFor(m.id)}>
                        <i className="fas fa-circle-pause" /> Pause subscription
                      </button>
                      <a className="btn btn-outline" href={`mailto:${site.email}?subject=${encodeURIComponent(`Change membership tier (booking ${m.id.slice(0, 8)})`)}`}>
                        <i className="fas fa-arrows-rotate" /> Change tier
                      </a>
                    </>
                  )}
                </div>
              </div>
            );
          })}

          {memberships.length > 0 && autoRenew !== null && (
            <label className="renew-row">
              <input type="checkbox" checked={autoRenew} onChange={toggleAutoRenew} />
              <span><strong>Auto-renew my membership.</strong> We&apos;ll keep your schedule running month to month. Turn off anytime.</span>
            </label>
          )}

          {/* BOOKING HISTORY */}
          <h2 style={{ fontSize: "1.7rem", margin: "3rem 0 1rem" }}>Your bookings</h2>
          {oneTimes.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>No one-time bookings yet.</p>
          ) : (
            <div className="detail-table-wrap">
              <table className="z-table">
                <thead><tr><th>Service</th><th>Date</th><th>Status</th><th>Total</th><th>Rating</th></tr></thead>
                <tbody>
                  {oneTimes.map((b) => {
                    const rated = ratings.find((r) => r.booking_id === b.id);
                    return (
                      <tr key={b.id}>
                        <td>{serviceLabels[b.service ?? ""] ?? b.service ?? "—"}</td>
                        <td>{fmtDate(b.service_date)}</td>
                        <td>{statusLabel[b.status] ?? b.status}</td>
                        <td>{b.total_amount ? formatNaira(b.total_amount) : "Quote"}</td>
                        <td>
                          {rated ? (
                            <span className="stars-static">{"★".repeat(rated.stars)}{"☆".repeat(5 - rated.stars)}</span>
                          ) : rateFor === b.id ? (
                            <div className="rate-form">
                              <div className="stars-input">
                                {[1, 2, 3, 4, 5].map((n) => (
                                  <button key={n} onClick={() => setStars(n)} className={n <= stars ? "on" : ""} aria-label={`${n} stars`}>★</button>
                                ))}
                              </div>
                              <input placeholder="A short comment (optional)" value={comment} onChange={(e) => setComment(e.target.value)} />
                              <div style={{ display: "flex", gap: "0.4rem" }}>
                                <button className="btn btn-gold btn-sm" onClick={() => submitRating(b.id)}>Submit</button>
                                <button className="btn btn-outline btn-sm" onClick={() => setRateFor(null)}>Cancel</button>
                              </div>
                            </div>
                          ) : (
                            <button className="vt-link" style={{ color: "var(--gold-deep)", background: "none", border: 0, cursor: "pointer" }} onClick={() => { setRateFor(b.id); setStars(5); }}>
                              Rate service
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          <p style={{ marginTop: "2.5rem", fontSize: "0.88rem", color: "var(--muted)" }}>
            Need anything else? Your relationship manager is at <a href={site.phoneHref} style={{ color: "var(--gold-deep)" }}>{site.phone}</a> or{" "}
            <a href={`mailto:${site.email}`} style={{ color: "var(--gold-deep)" }}>{site.email}</a>.
          </p>
        </div>
      </section>
    </>
  );
}
