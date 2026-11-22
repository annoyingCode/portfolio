"use client";

import { useEffect, useState } from "react";

type Section = { id: string; name: string };

const SW = 46; // slice width
const SH = 30; // slice height
const SKEW = 14; // horizontal skew of each slice
const STEP = 7; // offset between stacked slices

/**
 * A small 3-D tensor in the corner: one slice per section, stacked in depth.
 * The slice for the section on screen lights up; click a slice to jump to it.
 */
export default function TensorMinimap({ sections }: { sections: Section[] }) {
  const [active, setActive] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(sections.findIndex((s) => s.id === e.target.id));
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));

    const onScroll = () => {
      if (window.scrollY < 200) setActive(null);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [sections]);

  const n = sections.length;
  const W = SW + SKEW + STEP * (n - 1) + 4;
  const H = SH + STEP * (n - 1) + 4;
  const shown = hover ?? active;

  const slice = (i: number) => {
    const x = 2 + i * STEP;
    const y = 2 + (n - 1 - i) * STEP;
    return { x, y, points: `${x + SKEW},${y} ${x + SKEW + SW},${y} ${x + SW},${y + SH} ${x},${y + SH}` };
  };

  const go = (i: number) => {
    document.getElementById(sections[i].id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav
      aria-label="Section minimap"
      className="fixed bottom-5 right-4 z-40 hidden select-none rounded-xl border border-line bg-surface/80 p-2.5 shadow-lg shadow-black/20 backdrop-blur-md min-[1440px]:block"
    >
      <svg width={W * 1.15} height={H * 1.15} viewBox={`0 0 ${W} ${H}`} className="mx-auto">
        <title>Section minimap</title>
        {/* draw back slices first so the front ones overlap them */}
        {sections
          .map((s, i) => ({ s, i }))
          .reverse()
          .map(({ s, i }) => {
            const { x, y, points } = slice(i);
            const isOn = i === shown;
            return (
              <g
                key={s.id}
                role="link"
                tabIndex={0}
                aria-label={`portfolio[${i}] ${s.name}`}
                aria-current={i === active ? "true" : undefined}
                onClick={() => go(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    go(i);
                  }
                }}
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover(null)}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                className="cursor-pointer outline-none"
              >
                <polygon
                  points={points}
                  fill={isOn ? "var(--accent)" : "var(--surface-2)"}
                  fillOpacity={isOn ? 0.35 : 0.92}
                  stroke={isOn ? "var(--accent)" : "var(--muted)"}
                  strokeOpacity={isOn ? 1 : 0.45}
                  strokeWidth={0.8}
                  style={{ transition: "fill 200ms, fill-opacity 200ms, stroke 200ms" }}
                />
                {/* faint inner grid so each slice reads as a matrix */}
                {[1, 2].map((k) => (
                  <line
                    key={`v${k}`}
                    x1={x + SKEW + (SW * k) / 3}
                    y1={y}
                    x2={x + (SW * k) / 3}
                    y2={y + SH}
                    stroke={isOn ? "var(--accent)" : "var(--muted)"}
                    strokeOpacity={isOn ? 0.7 : 0.18}
                    strokeWidth={0.5}
                  />
                ))}
                {[1, 2].map((k) => (
                  <line
                    key={`h${k}`}
                    x1={x + SKEW - (SKEW * k) / 3}
                    y1={y + (SH * k) / 3}
                    x2={x + SKEW + SW - (SKEW * k) / 3}
                    y2={y + (SH * k) / 3}
                    stroke={isOn ? "var(--accent)" : "var(--muted)"}
                    strokeOpacity={isOn ? 0.7 : 0.18}
                    strokeWidth={0.5}
                  />
                ))}
              </g>
            );
          })}
      </svg>
      <p className="mt-1.5 w-full text-center font-mono text-[10px] text-muted">
        {shown === null ? (
          <span className="text-accent">[:]</span>
        ) : (
          <>
            <span className="text-accent">[{shown}]</span> {sections[shown].name}
          </>
        )}
      </p>
    </nav>
  );
}
