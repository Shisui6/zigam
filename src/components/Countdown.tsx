"use client";
import { useEffect, useState } from "react";

function calc(target: number) {
  let diff = target - Date.now();
  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  return { d, h, m, s, done: false };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({ date }: { date: string }) {
  const target = new Date(date).getTime();
  const [t, setT] = useState(() => calc(target));

  useEffect(() => {
    const id = setInterval(() => setT(calc(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = [
    { n: t.d, l: "Days" },
    { n: t.h, l: "Hours" },
    { n: t.m, l: "Minutes" },
    { n: t.s, l: "Seconds" },
  ];

  return (
    <div className="countdown">
      {units.map((u) => (
        <div className="count-box" key={u.l}>
          <span className="num">{pad(u.n)}</span>
          <span className="cap">{u.l}</span>
        </div>
      ))}
    </div>
  );
}
