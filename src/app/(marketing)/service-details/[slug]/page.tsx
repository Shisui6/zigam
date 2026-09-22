import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import { serviceDetails, getServiceDetail } from "@/lib/service-details";

export function generateStaticParams() {
  return serviceDetails.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const s = getServiceDetail(params.slug);
  return { title: s ? `${s.title} — ZIGAM` : "Service — ZIGAM" };
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const s = getServiceDetail(params.slug);
  if (!s) notFound();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="eyebrow">Description of Services</p>
          <h1>{s.title}</h1>
          <p>{s.summary}</p>
        </div>
      </section>

      <section className="block">
        <div className="container-narrow">
          {s.intro && (
            <Reveal as="p" className="lead" style={{ marginBottom: "1.5rem" }}>{s.intro}</Reveal>
          )}
          <Reveal className="ideal-banner">
            <strong>Ideal for:</strong> {s.idealFor}
          </Reveal>

          {s.blocks.map((b, i) => (
            <Reveal key={i} style={{ marginTop: "2.5rem" }}>
              {b.kind === "list" && (
                <>
                  {b.heading && <h2 className="detail-heading">{b.heading}</h2>}
                  <ul className="detail-list">
                    {b.items.map((it) => (
                      <li key={it}><i className="fas fa-check" /> {it}</li>
                    ))}
                  </ul>
                </>
              )}

              {b.kind === "table" && (
                <>
                  {b.heading && <h2 className="detail-heading">{b.heading}</h2>}
                  <div className="detail-table-wrap">
                    <table className="z-table detail-table">
                      <thead>
                        <tr>{b.headers.map((h) => <th key={h}>{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {b.rows.map((row, ri) => (
                          <tr key={ri}>
                            {row.map((cell, ci) => (
                              <td key={ci}>
                                {cell.split(" · ").map((part, pi) => (
                                  <span key={pi} className="cell-item">{part}</span>
                                ))}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}

              {b.kind === "note" && (
                <div className="note">
                  {b.text}
                  {b.linkHref && (
                    <>
                      {" "}
                      <Link href={b.linkHref}>{b.linkLabel ?? "Learn more"}</Link>.
                    </>
                  )}
                </div>
              )}
            </Reveal>
          ))}

          <div style={{ marginTop: "3rem", display: "flex", gap: "0.8rem", flexWrap: "wrap" }}>
            <Link href="/booking" className="btn btn-gold">Book this service</Link>
            <Link href="/service-details" className="btn btn-outline">All services</Link>
          </div>
        </div>
      </section>
    </>
  );
}
