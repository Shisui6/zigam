import Link from "next/link";
import { site, nav } from "@/lib/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo height={66} />
            <p className="footer-tag">Your Home, Our Willing Hands.</p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="footer-links-list">
              {nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
              <li><Link href="/terms">Terms of Use</Link></li>
              <li><Link href="/service-details">Service Details</Link></li>
            </ul>
          </div>

          <div>
            <h4>Offices</h4>
            <p><strong style={{ color: "var(--gold-soft)" }}>{site.offices.enugu.label}</strong><br />{site.offices.enugu.lines.join(" ")}</p>
            <p style={{ marginTop: "0.8rem" }}><strong style={{ color: "var(--gold-soft)" }}>{site.offices.lagos.label}</strong><br />{site.offices.lagos.lines.join(" ")}</p>
          </div>

          <div>
            <h4>Contact</h4>
            <p><i className="fas fa-phone" style={{ color: "var(--gold-soft)" }} /> <a href={site.phoneHref}>{site.phone}</a></p>
            <p><i className="fas fa-envelope" style={{ color: "var(--gold-soft)" }} /> <a href={`mailto:${site.email}`}>{site.email}</a></p>
            <div className="socials">
              <a href={site.socials.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fab fa-instagram" /></a>
              <a href={site.socials.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f" /></a>
              <a href={site.socials.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><i className="fab fa-linkedin-in" /></a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Zigam · {site.rc} · All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
