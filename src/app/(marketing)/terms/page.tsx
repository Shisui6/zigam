import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Terms of Use — ZIGAM" };

const sections = [
  { id: "platform", n: "1", t: "The Zigam Platform (Intermediary Status)" },
  { id: "clients", n: "2", t: "Terms for Clients" },
  { id: "reminders", n: "3", t: "Reminders" },
  { id: "description", n: "4", t: "Description of Services" },
  { id: "payment", n: "5", t: "Payment Terms" },
  { id: "liability", n: "6", t: "Indemnity / Limitation of Liability" },
  { id: "data", n: "7", t: "Data Protection (NDPA 2023)" },
  { id: "prohibited", n: "8", t: "Prohibited Activities" },
  { id: "disputes", n: "9", t: "Dispute Resolution and Governing Law" },
  { id: "associates", n: "10", t: "Associates" },
  { id: "assurance", n: "11", t: "Theft & Damages — The Assurance" },
  { id: "harassment", n: "12", t: "Harassment" },
  { id: "changes", n: "13", t: "Changes to the Membership or Terms" },
  { id: "reliance", n: "14", t: "No Reliance" },
  { id: "disclaimer", n: "15", t: "Disclaimer" },
  { id: "insurance", n: "16", t: "Insurance and Limitation of Liability" },
];

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
        <div className="container legal-layout">
          {/* Table of contents */}
          <aside className="legal-toc">
            <p className="toc-title">Contents</p>
            <ol>
              {sections.map((s) => (
                <li key={s.id}><a href={`#${s.id}`}>{s.t}</a></li>
              ))}
            </ol>
          </aside>

          <div className="prose legal-body">
            <p>
              Welcome to Zigam. By accessing our website, booking or subscribing for a service, or applying to be an
              Associate, you agree to be bound by these Terms of Use (&ldquo;Terms&rdquo;). These Terms govern the
              relationship between Zigam (the &ldquo;Company&rdquo;), Clients (the &ldquo;User/Customer/Client&rdquo;),
              and Associates (the &ldquo;Contractors&rdquo;).
            </p>

            {/* 1 */}
            <h2 id="platform">1. The Zigam Platform (Intermediary Status)</h2>
            <p>Zigam operates as a technology platform that facilitates the booking and subscription of home-making services (Cleaning, Errands, Laundry, Kitchen Operation, etc.).</p>
            <p><strong>Intermediary Role:</strong> You acknowledge that Zigam is a facilitator. While we vet and train Associates, the actual service contract for a &ldquo;Job&rdquo; is between the Client and the Independent Contractor (Associate).</p>
            <p><strong>No Employment:</strong> This agreement does not create an employer-employee relationship, partnership, or joint venture between Zigam and the Associates.</p>

            <h3>Independent Contractors — A. Status and Compliance</h3>
            <ul>
              <li><strong>Independent Contractor:</strong> You are an Independent Contractor. You are responsible for your own taxes (Personal Income Tax) and statutory filings.</li>
              <li><strong>WHT:</strong> Zigam will deduct Withholding Tax (WHT) from your payments as and if required by Nigerian law and remit it to the FIRS/SIRS on your behalf.</li>
              <li><strong>Background Checks:</strong> You consent to continuous background checks, including NIN verification, criminal record checks, and physical address verification.</li>
            </ul>
            <h3>B. Conduct and Liability</h3>
            <ul>
              <li><strong>Non-Compete:</strong> During your engagement and for 12 months thereafter, you shall not solicit or provide services to any Client introduced to you via Zigam.</li>
              <li><strong>Indemnity:</strong> You agree to indemnify Zigam against any claims, losses, or damages resulting from your gross negligence, theft, or misconduct at a Client&apos;s site.</li>
            </ul>

            {/* 2 */}
            <h2 id="clients">2. Terms for Clients</h2>
            <h3>A. Membership</h3>
            <p><strong>Paused membership:</strong> It is anticipated that you may need to be away for travel or other reasons. We&apos;d love to be notified at least two days before unavailability, with the following information:</p>
            <ul>
              <li>Start date of the pause period (this can be done via your customer dashboard)</li>
              <li>End date of the pause period (this can be done via your customer dashboard)</li>
            </ul>
            <p>We&apos;d confirm your message and have your service paused for at most a period of one (1) to three (3) weeks in a month, and upon notification of availability, the work schedule would resume as normal.</p>
            <div className="note">
              <p><strong>Please note:</strong></p>
              <ul style={{ marginBottom: 0 }}>
                <li>Once a membership expires, no service will be delivered.</li>
                <li>Customers are allowed to pause their membership for one (1) to three (3) weeks. If it exceeds a month, that membership is forfeited and the customer has to pay for services to be resumed.</li>
                <li>If the apartment was abandoned for this period of time, a deep cleaning has to be done before we can resume services.</li>
              </ul>
            </div>

            <h3>B. Bookings and Access</h3>
            <p><strong>Access:</strong> By booking, you grant the Associate permission to enter your premises. It is your responsibility to secure pets, weapons, and sensitive valuables (jewellery, cash, small electronics).</p>
            <p><strong>Environment:</strong> Clients must provide a safe working environment. Zigam reserves the right to cancel services immediately if an Associate reports harassment, unsafe conditions, or illegal activity.</p>
            <p><strong>Booking and appointment:</strong> We&apos;d ensure that Associates get to the client&apos;s home on time. We expect that at the point of booking, the customer must specify if they&apos;ll be at home or if there&apos;s a doorman to let the Associates in. Associates are expected to wait for at least 40 minutes. In a case where the Associates are not attended to after 40 minutes, they will be assigned to another service. Please note that all customers are required to put away valuable items before appointments.</p>
            <p><strong>Rescheduling:</strong> For one-time services, we will kindly remind you of your service schedule twenty-four (24) hours before the day via email or text message. On this notice, you can confirm the schedule or make changes as you see fit. No response from you indicates confirmation, and your service will occur as scheduled.</p>
            <p>Please note that for one-time services, customers are entitled to cancel or reschedule the service by giving written notice of up to twenty-four (24) hours before the service start time. No processing fee will be charged upon receipt of a valid prior written notice for cancellation. In the event of a cancellation made upon visit, a processing fee of 20% shall be further charged, plus the total billing value.</p>
            <p>For the Zigam Ozi service package, upon visit for the scheduled appointment, if the customer fails to let the Associates in on time, the session will be forfeited.</p>

            <h3>Cancellation and Refund Policies</h3>
            <p>Zigam is designed to allow flexibility. As a company that prioritises customer satisfaction, our goal is to promote a consistent experience for our customers and give value in return. We understand that plans can change quickly, and not providing appropriate notice causes professionals to lose valuable work. We have created this policy guideline to ensure that all losses are mitigated properly by all parties involved — the Customer and Zigam.</p>

            <h3>Booking Slots for One-time Service and the Ozi Membership</h3>
            <ul>
              <li>At Zigam, work usually takes place between 9am and 5pm. Any selected time slot outside 9am–5pm will attract an extra service charge of thirty per cent (30%).</li>
              <li>Booking a one-time service on a Sunday attracts an extra charge of forty per cent (40%).</li>
              <li><strong>Instant bookings:</strong> these can happen at any time of the day until 1pm, and attract a 40% surge on that service request. The latest time for an instant service on the same day is 5pm. Please note: a booking that happens after 5pm for a service the following day is considered an instant booking too, and the fee applies.</li>
            </ul>
            <p><strong>Lockout Policy:</strong> We know you lead a busy lifestyle and your schedule can change on a dime, but for our one-time service, if the associate or team is unable to carry out the booking, they end up losing valuable work and spending time and money on transportation. In the circumstance that our associate is delayed, sent away or locked out from your home between these hours, you will be charged 20% of the booking fee, plus the full booking fee. However, we will make every effort to work within the time frames requested.</p>

            <h3>C. Non-Solicitation (Anti-Poaching)</h3>
            <p>Clients are strictly prohibited from hiring Zigam Associates directly outside the platform. Any attempt to circumvent the platform will result in a permanent ban and a &ldquo;Finder&apos;s Fee&rdquo; penalty of NGN 1,000,000 (One Million Naira).</p>

            {/* 3 */}
            <h2 id="reminders">3. Reminders</h2>
            <p>All service reminders must be acknowledged. Failure to do so means the service will still go on as booked and planned, and the associate will be sent. If the associate is not allowed in and the service needs to be rescheduled, a 30% penalty fee will be collected for our one-time service. If it is a membership package like Ozi, payment will be forfeited.</p>

            {/* 4 */}
            <h2 id="description">4. Description of Services</h2>
            <p>For a detailed description of our services, what to expect and what we expect, please refer to the <Link href="/service-details">Description of Services</Link> page on our website.</p>

            {/* 5 */}
            <h2 id="payment">5. Payment Terms</h2>
            <h3>a. Service Fee</h3>
            <p>The prices of the services are in accordance with the valid price list as listed on the Company website, unless otherwise agreed in the specific terms between the Customer and the Company. If it appears that the Customer&apos;s data, on which the calculation of the fee is based, is in some way incorrect (for example, the incorrect details of the size and state of the housing or premises have been stated), the fee will be adjusted by mutual agreement between the Company and the Customer in accordance with the applicable price list for services with equivalent scope.</p>
            <p>Furthermore, the Company reserves the right to change prices. Any change in the price list will be notified to the Customer in writing 30 days before the introduction of new prices.</p>
            <h3>b. Automatic Renewal</h3>
            <p>We advise that booking payments be made using the card payment option. By accepting this Agreement, you are giving Zigam (or a third-party payment processor on Zigam&apos;s behalf) permission to charge your on-file credit card, debit card, or other approved methods of payment for fees that you owe Zigam. Depending on the transaction you selected or services requested, Zigam may charge you on a one-time or recurring basis.</p>
            <p>You agree to pay all charges incurred by users of your credit card, debit card, or other payment method used in connection with a purchase, transaction or other monetary interaction with Zigam, at the prices in effect when such charges are incurred. In the event that you&apos;d like to stop the automatic payment, kindly reach out to our Relationship Management team.</p>
            <h3>c. Reusable Payment Links</h3>
            <p>Payment links sent to customers to make payment for a service may be reusable as long as the service is the same type and membership.</p>
            <h3>d. Upfront Payment for Membership</h3>
            <p>Customers can pay upfront before the monthly membership for our services begins. This ensures uninterrupted service delivery. Six (6) months of upfront payment attracts up to a 5% discount.</p>
            <h3>e. Bank Account</h3>
            <p>We will never tell you to pay into a personal bank account. You are required to pay via the website, or an official invoice will be shared with our official bank account details for payments of all service types.</p>
            <h3>f. Taxes</h3>
            <p>Nigeria: the Company&apos;s fees are net of any applicable Sales Tax. The approved tax for goods and services is 7.5% if applicable. The prices include value-added tax in accordance with the current VAT rate, according to the financial laws in Nigeria.</p>
            <h3>g. Tips</h3>
            <p>Customers may decide to tip an associate they respect for their professionalism and quality of service. An Associate may decide not to cover out-of-scope services and projects. All service requests and projects must come through the customer&apos;s relationship manager or contact touch points.</p>

            {/* 6 */}
            <h2 id="liability">6. Indemnity / Limitation of Liability (The Shield)</h2>
            <p>To the maximum extent permitted by Nigerian law (including the FCCPA 2018):</p>
            <ul>
              <li><strong>No Indirect Damages:</strong> Zigam shall not be liable for any indirect, incidental, or consequential damages (loss of profit, loss of data).</li>
              <li><strong>Liability Cap:</strong> In the event of property damage or loss, Zigam&apos;s total liability shall not exceed the total fee paid for the specific service that gave rise to the claim.</li>
              <li><strong>Third Parties:</strong> Zigam is not responsible for the acts or omissions of any third-party payment gateways (e.g. Paystack/Flutterwave).</li>
            </ul>
            <p>The customer agrees to indemnify and hold harmless Zigam, its employees, contractors, and the Associates from any claims, damages, or expenses arising during the booking.</p>
            <p><strong>Acceptance of Terms:</strong> By submitting an application and checking the acceptance box online, the client confirms that they have read, understood, and agreed to be bound by these Terms and Conditions when engaging any Independent Contractor/Associate introduced by Zigam.</p>
            <p>The client acknowledges the risks associated with having an Associate in their home, and agrees that Zigam&apos;s responsibility is limited to providing the service, not ensuring the safety of the client&apos;s home or family 24/7.</p>

            {/* 7 */}
            <h2 id="data">7. Data Protection (NDPA 2023)</h2>
            <ul>
              <li><strong>Privacy:</strong> We collect data (NIN, addresses, phone numbers) solely for service fulfilment and security.</li>
              <li><strong>Consent:</strong> By using the site, you consent to the processing of your data in accordance with our Privacy Policy and the Nigeria Data Protection Act 2023.</li>
              <li><strong>Security:</strong> While we use high-level encryption, Zigam is not liable for data breaches caused by factors beyond our reasonable control (e.g. national grid failure or global ISP outages).</li>
            </ul>

            {/* 8 */}
            <h2 id="prohibited">8. Prohibited Activities</h2>
            <p>Users (Clients and Associates) shall not:</p>
            <ul>
              <li>Use the platform for money laundering or fraudulent bookings.</li>
              <li>Scrape, hack, or use &ldquo;bots&rdquo; to access Zigam&apos;s database.</li>
              <li>Post harmful content or disinformation on the platform (subject to the NCC Internet Code 2025).</li>
            </ul>

            {/* 9 */}
            <h2 id="disputes">9. Dispute Resolution and Governing Law</h2>
            <p><strong>Governing Law:</strong> These Terms are governed by the laws of the Federal Republic of Nigeria.</p>
            <p><strong>Arbitration:</strong> Any dispute shall first be settled via good-faith negotiation. If unresolved within 30 days, the dispute shall be referred to arbitration in Lagos/Abuja, Nigeria, under the Arbitration and Mediation Act.</p>

            {/* 10 */}
            <h2 id="associates">10. Associates</h2>
            <p className="uppercase-clause">a) By using an Independent Contractor who is offering their services through the website or software, you agree and understand that such Independent Contractor is an Independent Contractor. The fact that such Independent Contractor offers their service through the website or the software does not in any way create, establish or set up any agency, partnership or employment relationship between the Company and such service provider.</p>
            <p>b) The Website and Software are a communications platform (&ldquo;Platform&rdquo;) for enabling the connection between individuals seeking to obtain services (such as home cleaning, outdoor cleaning, childcare, caregiving, heavy lifting, office cleaning, live-in domestic, but not limited to) and/or individuals seeking to provide services. The Company checks the backgrounds of Independent Contractors via third-party background check services; however, the Company does not guarantee or warrant, and makes no representations regarding, the reliability, quality or suitability of such Independent Contractor. When interacting with an Independent Contractor, you should exercise caution and common sense to protect your personal safety and property, just as you would when interacting with other persons whom you don&apos;t know. By using the Services, you agree to hold the Company free from responsibility for any liability or damage that might arise out of the transaction involved. Neither the Company nor its affiliates or licensors is responsible for the conduct, whether online or offline, of any user of the Services. The Company and its affiliates and licensors will not be liable for any claim, injury or damage arising in connection with your use of the Services.</p>
            <p>c) In the clauses above, you take on certain risks, liabilities and responsibilities, and certain risks, liabilities and responsibilities of the Company are excluded. You are responsible for taking all security measures when engaging with an Associate/Independent Contractor service.</p>
            <p>d) We are very keen on safety and trust, so we put in place a system that scrutinises our associates, ensuring that you are made comfortable with us sanitising your facility without an iota of distrust. They&apos;re all assigned based on bookings. Customers are allowed to prefer certain Associates; however, every Associate may be reshuffled every 3 months for quality assurance purposes. All customers are required to put away valuable items before the associates come to your home and start rendering service, and ensure everything else looks good and in place before our associates leave the premises.</p>
            <p>e) For our Ozi Membership, customers are entitled to one Associate. If a customer requires more than one associate, please contact us via <a href={`mailto:${site.email}`}>{site.email}</a> and we will provide an extra hand at an additional cost.</p>
            <p><strong>Please note:</strong> customers are required to treat every associate with the utmost respect.</p>

            <h3>f) Specifically for child-minding / babysitting / nanny activities</h3>
            <p><strong>Parental presence requirement:</strong></p>
            <ul>
              <li>One parent or guardian must be present on the premises for the entire duration of the booking.</li>
              <li>The caregiver should not be left alone on the property with the child or children at any time.</li>
            </ul>
            <p><strong>Reference checks and experience:</strong></p>
            <ul>
              <li>All Child Minders undergo reference checks, ensuring their experience and suitability for the role.</li>
              <li>However, Zigam does not verify the authenticity of additional credentials (e.g. CPR certification or childcare courses) that workers display on their profiles.</li>
              <li>While Zigam has a high degree of trust that our workers have been honest about their credentials, customers are encouraged to request proof of any required credentials directly from the Associate.</li>
              <li>Zigam assumes no liability for any inaccuracies regarding these credentials.</li>
            </ul>

            {/* 11 */}
            <h2 id="assurance">11. Theft &amp; Damages — The Assurance</h2>
            <p>Unfortunately, unforeseen situations may occur in our line of work, and Zigam is determined to give you an optimum experience even in those trying times. Clients are required to pay an insurance fee (the Assurance), which serves as a form of insurance against theft and damage caused by an associate.</p>

            <h3>Fees and coverage</h3>
            <div className="detail-table-wrap">
              <table className="z-table">
                <thead>
                  <tr><th>Service</th><th>Assurance fee</th><th>Coverage for damage &amp; theft</th><th>Commentary</th></tr>
                </thead>
                <tbody>
                  <tr><td>Ozi Membership</td><td>₦5,000</td><td>₦50,000</td><td>One-time fee</td></tr>
                  <tr><td>A Taste of Ozi</td><td>₦1,000</td><td>₦10,000</td><td>Payment for every booking</td></tr>
                  <tr><td>Deep Cleaning</td><td>5% of total payment</td><td>10% of total payment</td><td>Payment for every booking</td></tr>
                  <tr><td>Move-in Cleaning</td><td>5% of total payment</td><td>10% of total payment</td><td>Payment for every booking</td></tr>
                  <tr><td>Move-out Cleaning</td><td>5% of total payment</td><td>10% of total payment</td><td>Payment for every booking</td></tr>
                </tbody>
              </table>
            </div>

            <h3>What the Assurance covers</h3>
            <ul>
              <li>Damage to household items caused by an associate in the process of work, up to the stated limits.</li>
              <li>Theft of money or items located in the assigned work location by an associate in the process of work.</li>
              <li>Any other claims aside from those stated are not covered by the Assurance.</li>
            </ul>

            <h3>Terms and conditions</h3>
            <p>To be eligible for payment under Zigam&apos;s Assurance, clients must comply with the following:</p>
            <ul>
              <li>You must have paid the Assurance cost as part of your booking or membership.</li>
              <li>The service giving rise to the claim must adhere to our Terms of Service (ensure all valuable properties are kept in a secure place during work).</li>
              <li>The booking and associate must have originated, been paid for and been assigned from our platform.</li>
              <li>You must put in a request for the claim within two weeks of the service that gave rise to the claim.</li>
              <li>You must not have violated our Terms of Service.</li>
              <li>Your account must not owe any debt to Zigam.</li>
            </ul>
            <p>To make a claim, kindly contact your relationship manager via our support line <a href={site.phoneHref}>{site.phone}</a> and send an email to <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
            <p>As part of our assessment process, once a claim is made, the following might be required of you:</p>
            <ul>
              <li>Protect the damaged property that is the basis of the claim from further damage.</li>
              <li>Assist or allow Zigam agents to make photographs, copies or recordings of anything related to the claim.</li>
              <li>Allow Zigam or its insurers to inspect anything relating to the claim.</li>
              <li>Accept repairs from Zigam first.</li>
              <li>Submit requested materials as outlined by our support and resolution teams.</li>
            </ul>
            <p>An investigation will be carried out, and upon completion, if Associates are proven to be guilty, a refund will be processed up to the stated limit for damages and theft. Repairs will be considered first for damages before replacement, unless not applicable.</p>
            <p><strong>N.B.</strong> Losses due to theft without a valid police report indicating the associate&apos;s definite involvement will not be acknowledged.</p>

            {/* 12 */}
            <h2 id="harassment">12. Sexual Harassment and All Other Forms of Harassment</h2>
            <p>Zigam provides a work environment that is free from sexual harassment. This policy extends to Zigam&apos;s customers&apos; locations for services, and is in accordance with Nigerian laws.</p>
            <p>All customers are expected to treat Zigam&apos;s Associates with respect. This includes refraining from any form of sexual harassment, whether verbal, physical, or visual. Examples of sexual harassment towards the person of our Associate may include, but are not limited to, the following:</p>
            <ul>
              <li>Unwelcome sexual advances, requests for sexual favours, or other verbal or physical conduct of a sexual nature.</li>
              <li>Making offensive comments or jokes of a sexual nature.</li>
              <li>Sharing sexually explicit images or messages.</li>
              <li>Touching, grabbing, or otherwise making physical contact of a sexual nature.</li>
              <li>Stalking or threatening behaviour, especially of a sexual nature.</li>
            </ul>

            {/* 13 */}
            <h2 id="changes">13. Changes to the Membership or Terms</h2>
            <p>Zigam reserves the right to modify or discontinue features of the Membership at any time, with reasonable notice. We may amend these Terms from time to time. The latest version will always be available on our website and will take effect immediately upon publication.</p>

            {/* 14 */}
            <h2 id="reliance">14. No Reliance</h2>
            <p>The content on our Platform is provided for general information only and is not intended to amount to advice on which you should rely. Although we make reasonable efforts to update the information on our site, we make no representation or guarantee, whether express or implied, that the content on our website or application is complete or up to date, and you acknowledge that any reliance on such information will be at your own risk.</p>

            {/* 15 */}
            <h2 id="disclaimer">15. Disclaimer</h2>
            <p>The Services are provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo;. Zigam disclaims all representations and warranties, express, implied or statutory, not expressly set out in these Terms. Zigam makes no representation of employment on behalf of any of the Associates. In addition, Zigam makes no representation, warranty, or guarantee that the Services and Platform will be uninterrupted or error-free. Zigam certifies that all Associates are trained and thoroughly vetted; however, Users agree that the entire risk arising out of their use of the Services and Platform remains solely with the User, to the maximum extent permitted under applicable law.</p>

            {/* 16 */}
            <h2 id="insurance">16. Insurance and Limitation of Liability</h2>
            <p><strong>1. Obligation to maintain insurance.</strong> Each party (the Associate and the Client) acknowledges that Zigam is a technology platform and not an insurance provider. To the maximum extent permitted by law:</p>
            <ul>
              <li>The Associate is responsible for procuring and maintaining adequate insurance coverage for themselves, including but not limited to death, personal injury, property damage, and professional liability.</li>
              <li>The Client is responsible for maintaining adequate insurance coverage for their property and premises, including coverage for theft, accidental damage, and personal injury occurring on their premises.</li>
              <li>The Associate and the Client shall ensure that their respective insurance policies cover incidents arising from or related to the services provided, including (where applicable and available) risks such as personal injury, property damage, and incidents of misconduct or abuse.</li>
            </ul>
            <p><strong>2. Disclaimer of liability.</strong> Zigam shall not be held liable, under any circumstances, for any claims, demands, damages, or losses (whether direct, indirect, incidental, or consequential) arising from or related to:</p>
            <ul>
              <li><strong>Death or personal injury:</strong> any physical harm or death suffered by the Associate or the Client during the provision of services.</li>
              <li><strong>Property damage:</strong> any loss, theft, or damage to the Client&apos;s property or the Associate&apos;s personal effects.</li>
              <li><strong>Misconduct or abuse:</strong> any incident of sexual abuse, harassment, assault, or any other form of criminal misconduct or personal violation perpetrated by one party against the other.</li>
            </ul>
            <p><strong>3. Release and indemnity.</strong> By using the Zigam platform, the Client and the Associate expressly release and forever discharge Zigam, its affiliates, directors, and employees from any and all liability or claims arising from the categories listed above. The Associate and the Client agree to indemnify and hold Zigam harmless against any such claims brought by them or on their behalf.</p>

            <p style={{ marginTop: "2.5rem" }}>
              <Link href="/service-details" className="btn btn-outline" style={{ textDecoration: "none" }}>Read the Description of Services</Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
