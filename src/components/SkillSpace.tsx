"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { skills } from "@/data/site";
import { axes, defaultSkill, skillVectors } from "@/data/skillSpace";
import { cosine, euclidean, pca2 } from "@/lib/vectors";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

type Metric = "cosine" | "euclidean";
type Mode = "wide" | "tall";

type Point = { name: string; group: number; vec: number[] };
type Placed = Point & { x: number; y: number; w: number };

const K = 4; // neighbours to show
const groupColor = (g: number) => `var(--g${g % 5})`;

// Every skill from site.ts that has a vector in skillSpace.ts
const points: Point[] = skills.flatMap((g, gi) =>
  g.items.filter((name) => skillVectors[name]).map((name) => ({ name, group: gi, vec: skillVectors[name] })),
);
const projection = pca2(points.map((p) => p.vec));

const LAYOUT = {
  wide: { W: 1000, H: 560, font: 14, charW: 7.6, padL: 30, padR: 250, padY: 40 },
  tall: { W: 600, H: 900, font: 19, charW: 10.2, padL: 24, padR: 300, padY: 40 },
};

/** Scale the PCA coordinates into the SVG box, then nudge labels apart so none overlap. */
function layout(mode: Mode): Placed[] {
  const L = LAYOUT[mode];
  const coords = projection.map(([a, b]) => (mode === "wide" ? [a, b] : [b, a]));
  const xs = coords.map((c) => c[0]);
  const ys = coords.map((c) => c[1]);
  const [xMin, xMax, yMin, yMax] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const sx = (L.W - L.padL - L.padR) / (xMax - xMin || 1);
  const sy = (L.H - 2 * L.padY) / (yMax - yMin || 1);

  const placed: Placed[] = points.map((p, i) => ({
    ...p,
    x: L.padL + (coords[i][0] - xMin) * sx,
    y: L.padY + (coords[i][1] - yMin) * sy,
    w: p.name.length * L.charW + 16,
  }));

  const half = L.font * 0.85;
  for (let it = 0; it < 500; it++) {
    let moved = false;
    for (let i = 0; i < placed.length; i++) {
      for (let j = i + 1; j < placed.length; j++) {
        const a = placed[i];
        const b = placed[j];
        const ox = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x - 8, b.x - 8);
        const oy = Math.min(a.y + half, b.y + half) - Math.max(a.y - half, b.y - half);
        if (ox > 0 && oy > 0) {
          const dir = a.y < b.y || (a.y === b.y && i < j) ? -1 : 1;
          const push = oy / 2 + 0.5;
          a.y += dir * push;
          b.y -= dir * push;
          moved = true;
        }
      }
    }
    for (const p of placed) p.y = Math.max(L.padY / 2, Math.min(L.H - L.padY / 2, p.y));
    if (!moved) break;
  }
  return placed;
}

function neighbours(of: Point, metric: Metric) {
  return points
    .filter((p) => p.name !== of.name)
    .map((p) => ({
      name: p.name,
      value: metric === "cosine" ? cosine(of.vec, p.vec) : euclidean(of.vec, p.vec),
    }))
    .sort((a, b) => (metric === "cosine" ? b.value - a.value : a.value - b.value))
    .slice(0, K);
}

export default function SkillSpace({ index }: { index: number }) {
  const [metric, setMetric] = useState<Metric>("cosine");
  const [selected, setSelected] = useState(
    points.some((p) => p.name === defaultSkill) ? defaultSkill : (points[0]?.name ?? ""),
  );
  const [hovered, setHovered] = useState<string | null>(null);
  const [mode, setMode] = useState<Mode>("wide");
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setMode(e.contentRect.width < 560 ? "tall" : "wide"));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const placed = useMemo(() => layout(mode), [mode]);
  const L = LAYOUT[mode];
  const activeName = hovered ?? selected;
  const active = points.find((p) => p.name === activeName);
  const near = useMemo(() => (active ? neighbours(active, metric) : []), [active, metric]);
  const nearSet = new Set(near.map((n) => n.name));
  const pos = (name: string) => placed.find((p) => p.name === name)!;

  if (points.length < 3) return null;
  const a = active && pos(active.name);

  return (
    <section id="skills" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          index={index}
          name="skills"
          shape={`(${points.length}, ${axes.length})`}
          title="Skill space"
          subtitle={`Each skill is a vector in ℝ${toSuperscript(axes.length)}. Pick one to find its nearest neighbours, by cosine similarity or by Euclidean distance.`}
        />

        <Reveal className="grid gap-6 lg:grid-cols-[1fr_300px]">
          {/* Map */}
          <div ref={boxRef} className="rounded-xl border border-line bg-surface/80 p-3 backdrop-blur-sm sm:p-4">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-3 px-1">
              <p className="font-mono text-[11px] text-muted">PCA projection · ℝ{toSuperscript(axes.length)} → ℝ²</p>
              <div role="group" aria-label="Similarity metric" className="inline-flex rounded-md border border-line bg-surface-2 p-0.5 font-mono text-[11px]">
                {(["cosine", "euclidean"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    aria-pressed={metric === m}
                    onClick={() => setMetric(m)}
                    className={`rounded px-2.5 py-1 transition-colors ${
                      metric === m ? "bg-accent text-background" : "text-muted hover:text-fg"
                    }`}
                  >
                    {m === "cosine" ? "cos(a, b)" : "‖a − b‖₂"}
                  </button>
                ))}
              </div>
            </div>

            <svg viewBox={`0 0 ${L.W} ${L.H}`} className="h-auto w-full" style={{ fontSize: L.font }}>
              {/* axes through the centre, for a coordinate-plane feel */}
              <line x1={0} y1={L.H / 2} x2={L.W} y2={L.H / 2} stroke="var(--line)" strokeDasharray="4 6" />
              <line x1={L.W / 2} y1={0} x2={L.W / 2} y2={L.H} stroke="var(--line)" strokeDasharray="4 6" />

              {/* neighbour edges */}
              {a &&
                near.map((n) => {
                  const b = pos(n.name);
                  return (
                    <line
                      key={n.name}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke="var(--accent)"
                      strokeOpacity={0.7}
                      strokeWidth={1.5}
                    />
                  );
                })}

              {/* points */}
              {placed.map((p) => {
                const isActive = p.name === activeName;
                const isNear = nearSet.has(p.name);
                const dim = !isActive && !isNear;
                return (
                  <g
                    key={p.name}
                    role="button"
                    tabIndex={0}
                    aria-pressed={p.name === selected}
                    aria-label={`${p.name}: show nearest neighbours`}
                    onClick={() => setSelected(p.name)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelected(p.name);
                      }
                    }}
                    onMouseEnter={() => setHovered(p.name)}
                    onMouseLeave={() => setHovered(null)}
                    onFocus={() => setHovered(p.name)}
                    onBlur={() => setHovered(null)}
                    className="cursor-pointer outline-none"
                    style={{ opacity: dim ? 0.45 : 1, transition: "opacity 200ms" }}
                  >
                    {/* larger invisible hit area */}
                    <rect x={p.x - 10} y={p.y - L.font} width={p.w + 10} height={L.font * 2} fill="transparent" />
                    {isActive && <circle cx={p.x} cy={p.y} r={L.font * 0.9} fill="none" stroke="var(--accent)" strokeWidth={2} />}
                    <circle cx={p.x} cy={p.y} r={isActive ? L.font * 0.45 : L.font * 0.35} fill={groupColor(p.group)} />
                    <text
                      x={p.x + L.font * 0.8}
                      y={p.y + L.font * 0.35}
                      fill={isActive || isNear ? "var(--fg)" : "var(--muted)"}
                      fontWeight={isActive ? 600 : 400}
                    >
                      {p.name}
                      {isNear && (
                        <tspan className="font-mono" fill="var(--accent)" dx={L.font * 0.5} style={{ fontSize: L.font * 0.85 }}>
                          {near.find((n) => n.name === p.name)!.value.toFixed(2)}
                        </tspan>
                      )}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Panel: the active vector and its neighbours */}
          <aside className="rounded-xl border border-line bg-surface/80 p-5 backdrop-blur-sm" aria-live="polite">
            {active && (
              <>
                <p className="font-mono text-[11px] text-muted">selected vector</p>
                <h3 className="mt-1 flex items-center gap-2 text-lg font-semibold">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: groupColor(active.group) }} />
                  {active.name}
                </h3>

                <ul className="mt-4 space-y-1.5">
                  {axes.map((axis, i) => (
                    <li key={axis} className="grid grid-cols-[64px_1fr_28px] items-center gap-2 font-mono text-[11px]">
                      <span className="text-muted">{axis}</span>
                      <span className="h-1.5 overflow-hidden rounded-full bg-surface-2">
                        <span
                          className="block h-full rounded-full bg-accent transition-all duration-300"
                          style={{ width: `${active.vec[i] * 100}%` }}
                        />
                      </span>
                      <span className="text-right text-fg/80">{active.vec[i].toFixed(1)}</span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 font-mono text-[11px] text-muted">
                  {metric === "cosine" ? "most similar · cos(a, b) = a·b / ‖a‖‖b‖" : "closest · ‖a − b‖₂ = √Σ(aᵢ − bᵢ)²"}
                </p>
                <ol className="mt-2 space-y-1">
                  {near.map((n) => (
                    <li key={n.name}>
                      <button
                        type="button"
                        onClick={() => setSelected(n.name)}
                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-sm transition-colors hover:bg-surface-2"
                      >
                        <span>{n.name}</span>
                        <span className="font-mono text-xs text-accent">{n.value.toFixed(3)}</span>
                      </button>
                    </li>
                  ))}
                </ol>
              </>
            )}
          </aside>
        </Reveal>

        {/* Legend doubling as the plain skills list */}
        <Reveal className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {skills.map((g, gi) => (
            <div key={g.group}>
              <p className="flex items-center gap-2 text-xs uppercase tracking-wider text-muted">
                <span className="h-2 w-2 rounded-full" style={{ background: groupColor(gi) }} />
                {g.group}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {g.items.map((s) => {
                  const onMap = Boolean(skillVectors[s]);
                  return (
                    <li key={s}>
                      <button
                        type="button"
                        disabled={!onMap}
                        onClick={() => setSelected(s)}
                        className={`rounded-md border px-2 py-0.5 text-xs transition-colors ${
                          s === selected
                            ? "border-accent bg-accent/10 text-fg"
                            : "border-line bg-surface-2 text-fg/85 enabled:hover:border-accent/50"
                        }`}
                      >
                        {s}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </Reveal>

        <p className="mt-6 max-w-3xl text-xs leading-relaxed text-muted">
          How this works: I scored each skill from 0 to 1 on {axes.length} axes ({axes.join(", ")}). Similarities
          are computed in all {axes.length} dimensions; the map is a 2-D PCA projection of those vectors,
          nudged slightly so labels don&apos;t overlap.
        </p>
      </div>
    </section>
  );
}

function toSuperscript(n: number) {
  const sup = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  return String(n)
    .split("")
    .map((d) => sup[Number(d)])
    .join("");
}
