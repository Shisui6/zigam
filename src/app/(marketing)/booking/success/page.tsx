import Link from "next/link";

export const dynamic = "force-dynamic";

const messages: Record<string, { title: string; body: string; icon: string }> = {
  paid: { title: "Payment successful", body: "Thank you! Your booking is confirmed and a receipt is on its way to your inbox.", icon: "fa-circle-check" },
  failed: { title: "Payment not completed", body: "Your payment didn't go through. No charge was made — please try again or contact us.", icon: "fa-circle-xmark" },
  error: { title: "Something went wrong", body: "We couldn't confirm your payment. If you were charged, contact us and we'll sort it out right away.", icon: "fa-triangle-exclamation" },
  unconfigured: { title: "Booking received", body: "Online payment isn't switched on yet — our team will reach out with a secure payment link.", icon: "fa-circle-info" },
};

export default function Success({ searchParams }: { searchParams: { status?: string; ref?: string } }) {
  const status = searchParams.status || "error";
  const m = messages[status] || messages.error;
  return (
    <section className="page-hero" style={{ minHeight: "70vh" }}>
      <div className="container-narrow">
        <div style={{ fontSize: "3rem", color: status === "paid" ? "var(--success-color, #2e9e6b)" : "var(--gold-deep)", marginBottom: "1rem" }}>
          <i className={`fas ${m.icon}`} />
        </div>
        <h1>{m.title}</h1>
        <p>{m.body}</p>
        {searchParams.ref && <p style={{ fontSize: "0.85rem", marginTop: "0.5rem" }}>Reference: {searchParams.ref}</p>}
        <p style={{ marginTop: "1.8rem" }}>
          <Link href="/" className="btn btn-gold" style={{ marginRight: "0.6rem" }}>Back to Home</Link>
          {status !== "paid" && <Link href="/booking" className="btn btn-outline">Try again</Link>}
        </p>
      </div>
    </section>
  );
}
