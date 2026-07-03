"use client";
import { useState } from "react";

export type FaqEntry = { q: string; a: React.ReactNode };

export default function Faq({ items }: { items: FaqEntry[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i} className={`faq-item${open === i ? " open" : ""}`}>
          <button className="faq-q" onClick={() => setOpen(open === i ? null : i)} aria-expanded={open === i}>
            {item.q}
            <i className="fas fa-plus" />
          </button>
          <div className="faq-a"><p>{item.a}</p></div>
        </div>
      ))}
    </div>
  );
}
