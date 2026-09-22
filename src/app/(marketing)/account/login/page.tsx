"use client";
import { useState } from "react";
import Link from "next/link";
import { getBrowserClient } from "@/lib/supabase-client";

export default function Login() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function sendLink(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const supabase = getBrowserClient();
    if (!supabase) {
      setError("Accounts aren't switched on yet — Supabase keys are missing from the environment.");
      return;
    }
    setBusy(true);
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { emailRedirectTo: `${window.location.origin}/account` },
    });
    setBusy(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <section className="page-hero" style={{ minHeight: "78vh" }}>
      <div className="container-narrow">
        <p className="eyebrow">Ozi Members</p>
        <h1>Your account</h1>

        {!sent ? (
          <>
            <p style={{ maxWidth: 520, margin: "0.8rem auto 2rem" }}>
              No passwords, no forms. Enter your email and we&apos;ll send you a secure sign-in link — verifying your
              email opens your account automatically.
            </p>
            <form onSubmit={sendLink} className="login-form">
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email address"
              />
              <button type="submit" className="btn btn-gold" disabled={busy}>
                {busy ? "Sending…" : "Email me a link"}
              </button>
            </form>
            {error && <div className="form-error" style={{ maxWidth: 520, margin: "1rem auto 0" }}>{error}</div>}
            <p style={{ fontSize: "0.85rem", marginTop: "1.6rem" }}>
              Not a member yet? <Link href="/booking" style={{ color: "var(--gold-deep)", textDecoration: "underline" }}>Book the Ozi Membership</Link> — your account is created with your first booking.
            </p>
          </>
        ) : (
          <div className="founders-card" style={{ marginTop: "1.5rem" }}>
            <div style={{ fontSize: "2.4rem", color: "var(--gold-deep)", marginBottom: "0.8rem" }}>
              <i className="fas fa-envelope-circle-check" />
            </div>
            <h2 style={{ fontSize: "1.8rem" }}>Check your inbox</h2>
            <p>
              We&apos;ve sent a sign-in link to <strong>{email}</strong>. Open it on this device and you&apos;ll land
              straight in your account. The link expires after a short while.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
