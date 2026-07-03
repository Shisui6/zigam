"use client";
import { useState } from "react";

export default function Logo({ className = "", height }: { className?: string; height?: number }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="logo-wordmark">ZIGAM</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/zigam-logo.png"
      alt="ZIGAM"
      className={className}
      style={height ? { height } : undefined}
      onError={() => setFailed(true)}
    />
  );
}
