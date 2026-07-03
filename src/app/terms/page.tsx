import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use — ZIGAM" };

export default function Terms() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Terms of Use</h1>
          <p>Last updated: January 1st, 2026</p>
        </div>
      </section>

      <section className="block">
        <div className="container-narrow prose">
          <p>Welcome to Zigam. By accessing our website, booking/subscribing for a service, or applying to be an Associate, you agree to be bound by these Terms of Use. These Terms govern the relationship between Zigam (the &ldquo;Company&rdquo;), Clients, and Associates (the &ldquo;Contractors&rdquo;).</p>

          <h2>1. The Zigam Platform (Intermediary Status)</h2>
          <p>Zigam operates as a technology platform that facilitates the booking and subscription of home-making services. You acknowledge that Zigam is a facilitator: while we vet and train Associates, the actual service contract for a job is between the Client and the Independent Contractor. This agreement does not create an employer-employee relationship, partnership, or joint venture between Zigam and the Associates.</p>
          <h3>Independent Contractors</h3>
          <p>Associates are Independent Contractors, responsible for their own taxes and statutory filings. Zigam will deduct Withholding Tax (WHT) as required by Nigerian law and remit it to the FIRS/SIRS. Associates consent to continuous background checks, including NIN verification, criminal record checks, and physical address verification. A non-compete applies for 12 months after engagement.</p>

          <h2>2. Terms for Clients</h2>
          <h3>Subscription &amp; Pausing</h3>
          <p>Notify us at least two days before unavailability, with the start and end dates via your dashboard. We&apos;ll pause your service for at most one to three weeks in a month. Once a subscription plan expires, no service will be delivered. If a pause exceeds a month, the subscription is forfeited and the customer must pay for services to resume. If the apartment was abandoned for this period, a deep cleaning must be done before services resume.</p>
          <h3>Bookings &amp; Access</h3>
          <p>By booking, you grant the Associate permission to enter your premises; secure pets, weapons, and valuables. Associates wait at least 40 minutes; if not attended to, they are reassigned. For one-time services we remind you 24 hours before; cancellation/rescheduling needs written notice up to 24 hours before start time. A cancellation on visit attracts a 20% fee plus the total billing value.</p>
          <div className="note">Please confirm: the source lists the Sunday surcharge as both 30% and 40%. Off-hours (outside 9am–5pm) attract +30%; instant bookings attract +40%.</div>
          <h3>Non-Solicitation</h3>
          <p>Clients are prohibited from hiring Zigam Associates directly outside the platform. Circumvention results in a permanent ban and a &ldquo;Finder&apos;s Fee&rdquo; penalty of NGN 1,000,000.</p>

          <h2>3. Payment Terms</h2>
          <p>Prices follow the valid price list on our website. We may change prices with 30 days&apos; written notice. By accepting this agreement you authorise Zigam (or a third-party processor) to charge your payment method on a one-time or recurring basis. Payment links may be reusable for the same service type and plan. Six months of upfront payment attracts up to a 5% discount. We will never ask you to pay into a personal bank account. Fees are net of applicable tax (7.5% if applicable); prices include VAT per Nigerian law.</p>

          <h2>4. Limitation of Liability</h2>
          <p>To the maximum extent permitted by Nigerian law (including the FCCPA 2018), Zigam is not liable for indirect or consequential damages. In the event of property damage or loss, Zigam&apos;s total liability shall not exceed the total fee paid for the specific service giving rise to the claim.</p>

          <h2>5. Data Protection (NDPA 2023)</h2>
          <p>We collect data (NIN, addresses, phone numbers) solely for service fulfilment and security. By using the site, you consent to processing of your data per our Privacy Policy and the Nigeria Data Protection Act 2023.</p>

          <h2>6. Assurance (Theft &amp; Damages)</h2>
          <p>Clients may pay an Assurance fee as protection against theft and damage caused by an associate during work, up to stated limits.</p>
          <div className="note">Please confirm the Assurance fee amount and coverage limits — referenced in the source document but left blank.</div>
          <p>Claims must be made within two weeks; the booking and associate must have originated and been paid for on our platform; and losses due to theft require a valid police report indicating the associate&apos;s involvement. Contact your relationship manager on {site.phone} and email <a href={`mailto:${site.email}`}>{site.email}</a>.</p>

          <h2>7. Harassment, Associates &amp; Governing Law</h2>
          <p>Zigam provides a work environment free from harassment; customers must treat Associates with respect. Associates are assigned per booking and may be reshuffled every 3 months for quality assurance. For child-minding, a parent or guardian must be present for the full duration. These Terms are governed by the laws of the Federal Republic of Nigeria; disputes are resolved by good-faith negotiation, then arbitration in Lagos/Abuja.</p>

          <p style={{ marginTop: "2rem" }}><a href="/service-details" style={{ textDecoration: "none" }} className="btn btn-outline">Read the Description of Services</a></p>
        </div>
      </section>
    </>
  );
}
