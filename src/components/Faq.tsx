"use client";
import { useRef, useState } from "react";

export type FaqEntry = { q: string; a: React.ReactNode };

export default function Faq({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            <span>{item.q}</span>
            <i className="fas fa-plus" />
          </button>
          <div
            className="faq-a"
            ref={(el) => {
              refs.current[i] = el;
            }}
            style={{ maxHeight: open === i ? `${refs.current[i]?.scrollHeight ?? 1000}px` : "0px" }}
          >
            <p>{item.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
