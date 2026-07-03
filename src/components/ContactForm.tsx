"use client";
import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Website enquiry from ${f.get("name")}`);
    const body = encodeURIComponent(
      `Name: ${f.get("name")}\nPhone: ${f.get("phone")}\nEmail: ${f.get("email")}\nAddress: ${f.get("address")}\n\n${f.get("message")}`
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="name">Name</label>
        <input id="name" name="name" required />
      </div>
      <div className="field">
        <label htmlFor="phone">Phone number</label>
        <input id="phone" name="phone" type="tel" placeholder="+234" required />
      </div>
      <div className="field">
        <label htmlFor="email">Email address</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="address">Address</label>
        <input id="address" name="address" />
      </div>
      <div className="field">
        <label htmlFor="message">How can we help?</label>
        <textarea id="message" name="message" rows={4} />
      </div>
      <button type="submit" className="btn btn-gold">Send message</button>
      {sent && (
        <p style={{ marginTop: "1rem", color: "var(--gold-deep)" }}>
          Opening your email app… if nothing happens, email us at {site.email}.
        </p>
      )}
    </form>
  );
}
