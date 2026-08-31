import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { blogPosts, formatDate } from "@/lib/blog";

export const metadata: Metadata = {
  title: "The Journal — ZIGAM",
  description:
    "Thought leadership from Zigam on modern living, productivity, time, and the art of exceptional home and workplace support.",
};

export default function Blog() {
  const featured = blogPosts.find((p) => p.featured) ?? blogPosts[0];
  const rest = blogPosts.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <Reveal as="p" className="eyebrow">Thought leadership</Reveal>
          <Reveal as="h1">The Zigam Journal</Reveal>
          <Reveal as="p" delay={100}>
            Notes on modern living — convenience, productivity, time, and the craft of exceptional service.
          </Reveal>
        </div>
      </section>

      {/* Featured */}
      <section className="block" style={{ paddingBottom: "2.5rem" }}>
        <div className="container">
          <Reveal>
            <Link href={`/blog/${featured.slug}`} className="feature-post">
              <div className={`post-cover cover-${featured.cover.variant}`}>
                <i className={`fas ${featured.cover.icon}`} />
              </div>
              <div className="feature-post-body">
                <p className="post-meta">
                  <span className="post-cat">{featured.category}</span>
                  {formatDate(featured.date)} · {featured.readMins} min read
                </p>
                <h2>{featured.title}</h2>
                <p className="post-excerpt">{featured.excerpt}</p>
                <span className="detail-link">Read the essay <i className="fas fa-arrow-right" /></span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Grid */}
      <section className="block" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="grid grid-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link href={`/blog/${p.slug}`} className="post-card">
                  <div className={`post-cover sm cover-${p.cover.variant}`}>
                    <i className={`fas ${p.cover.icon}`} />
                  </div>
                  <div className="post-card-body">
                    <p className="post-meta">
                      <span className="post-cat">{p.category}</span>
                      {p.readMins} min read
                    </p>
                    <h3>{p.title}</h3>
                    <p className="post-excerpt">{p.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="block cta-band">
        <div className="container">
          <Reveal>
            <h2>Live the subject, not just the reading</h2>
            <p>Experience what a professionally supported week feels like.</p>
            <Link href="/booking" className="btn btn-dark">Book a Service</Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
