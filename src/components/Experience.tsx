import { Award, GraduationCap } from "lucide-react";
import { certifications, education, experience, skills } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading index="03" label="experience" title="Experience & skills" />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          {/* Timeline */}
          <ol className="relative space-y-10 border-l border-line pl-8">
            {experience.map((job, i) => (
              <li key={`${job.company}-${job.role}`} className="relative">
                <Reveal delay={i * 80}>
                <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                <p className="font-mono text-xs text-accent">{job.period}</p>
                <h3 className="mt-1 text-lg font-semibold">
                  {job.role} <span className="text-muted">@ {job.company}</span>
                </h3>
                {job.location && <p className="text-sm text-muted">{job.location}</p>}
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  {job.points.map((pt) => (
                    <li key={pt} className="flex gap-2">
                      <span className="mt-0.5 text-accent">›</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                </Reveal>
              </li>
            ))}
          </ol>

          <Reveal delay={120} className="space-y-8">
            {/* Skills */}
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="font-mono text-sm text-fg">skills.json</h3>
              <div className="mt-5 space-y-5">
                {skills.map((g) => (
                  <div key={g.group}>
                    <p className="text-xs uppercase tracking-wider text-muted">{g.group}</p>
                    <ul className="mt-2 flex flex-wrap gap-1.5">
                      {g.items.map((s) => (
                        <li
                          key={s}
                          className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-xs text-fg/90"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <GraduationCap size={16} className="text-accent" /> Education
              </h3>
              <ul className="mt-4 space-y-3">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-sm font-medium">{e.degree}</p>
                    <p className="text-sm text-muted">
                      {e.school} · <span className="font-mono text-xs">{e.period}</span>
                    </p>
                  </li>
                ))}
              </ul>

              {certifications.length > 0 && (
                <>
                  <h3 className="mt-6 flex items-center gap-2 text-sm font-semibold">
                    <Award size={16} className="text-accent" /> Certifications
                  </h3>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted">
                    {certifications.map((c) => (
                      <li key={c}>{c}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
