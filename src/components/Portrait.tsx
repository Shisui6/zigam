"use client";
import { useState } from "react";

export default function Portrait({
  src,
  alt,
  initials,
}: {
  src: string;
  alt: string;
  initials: string;
}) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return (
      <div className="portrait portrait-fallback" aria-label={alt}>
        <span>{initials}</span>
      </div>
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="portrait" src={src} alt={alt} onError={() => setFailed(true)} />
  );
}
