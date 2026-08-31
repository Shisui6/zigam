import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { blogPosts, getPost, formatDate } from "@/lib/blog";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = getPost(params.slug);
  return {
    title: p ? `${p.title} — The Zigam Journal` : "The Zigam Journal",
    description: p?.excerpt,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const others = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <>
      <article>
        <header className="post-hero">
          <div className="container-narrow">
            <Reveal as="p" className="post-meta" style={{ justifyContent: "center" }}>
              <span className="post-cat">{post.category}</span>
              {formatDate(post.date)} · {post.readMins} min read
            </Reveal>
            <Reveal as="h1" delay={80}>{post.title}</Reveal>
            <Reveal as="p" delay={140} className="post-standfirst">{post.excerpt}</Reveal>
            <Reveal delay={180}><hr className="rule" /></Reveal>
          </div>
        </header>

        <div className={`post-banner cover-${post.cover.variant}`}>
          <i className={`fas ${post.cover.icon}`} />
        </div>

        <div className="container-narrow post-body">
          {post.body.map((b, i) => (
            <Reveal key={i}>
              {b.h && <h2>{b.h}</h2>}
              <p className={i === 0 ? "dropcap" : undefined}>{b.p}</p>
            </Reveal>
          ))}

          <Reveal className="post-signoff">
            <span className="rule" style={{ margin: 0 }} />
            <p>{post.author}</p>
          </Reveal>
        </div>
      </article>

      {/* Continue reading */}
      <section className="block" style={{ background: "var(--cream-2)" }}>
        <div className="container">
          <Reveal className="section-head" style={{ marginBottom: "2rem" }}>
            <p className="eyebrow">Continue reading</p>
            <h2 style={{ fontSize: "2rem" }}>More from the Journal</h2>
          </Reveal>
          <div className="grid grid-3">
            {others.map((p, i) => (
              <Reveal key={p.slug} delay={(i % 3) * 80}>
                <Link href={`/blog/${p.slug}`} className="post-card">
                  <div className={`post-cover sm cover-${p.cover.variant}`}>
                    <i className={`fas ${p.cover.icon}`} />
                  </div>
                  <div className="post-card-body">
                    <p className="post-meta"><span className="post-cat">{p.category}</span>{p.readMins} min read</p>
                    <h3>{p.title}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
