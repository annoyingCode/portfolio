import { skills } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

/**
 * Skills written as a matrix: square brackets around the block, one row per
 * area, with the row index on the right. Rows have different lengths, so the
 * shape lists them: (rows, [length of each row]).
 */
export default function SkillMatrix({ index }: { index: number }) {
  const total = skills.reduce((n, g) => n + g.items.length, 0);
  const key = (group: string) => group.toLowerCase();

  return (
    <section id="skills" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          index={index}
          name="skills"
          shape={`(${skills.length}, [${skills.map((g) => g.items.length).join(", ")}])`}
          title="Skills"
          subtitle={`${total} skills across ${skills.length} areas: one row per area.`}
        />

        <Reveal className="rounded-xl border border-line bg-surface/80 p-5 backdrop-blur-sm sm:p-8">
          <div className="grid items-center gap-4 md:grid-cols-[auto_1fr]">
            <p className="font-mono text-sm text-muted">
              skills <span className="text-accent">=</span>
            </p>

            {/* the matrix: brackets are the left/right borders with short top/bottom serifs */}
            <div className="relative px-5 py-2 sm:px-7">
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-2.5 rounded-l-sm border-y-2 border-l-2 border-accent/70"
              />
              <span
                aria-hidden
                className="absolute inset-y-0 right-0 w-2.5 rounded-r-sm border-y-2 border-r-2 border-accent/70"
              />

              <ol className="divide-y divide-dashed divide-line">
                {skills.map((g, i) => (
                  <li
                    key={g.group}
                    className="flex flex-col gap-2 py-3.5 first:pt-1 last:pb-1 sm:flex-row-reverse sm:items-center sm:justify-between sm:gap-6"
                  >
                    <p className="shrink-0 font-mono text-xs text-muted sm:w-44 sm:text-right">
                      <span className="text-accent">[{i}]</span> {key(g.group)}
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((s) => (
                        <li
                          key={s}
                          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm text-fg/90 transition-colors hover:border-accent/50 hover:text-fg"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
