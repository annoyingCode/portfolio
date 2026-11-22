import { Award, GraduationCap, Trophy } from "lucide-react";
import { awards, certifications, education, experience } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function Experience({ index }: { index: number }) {
  return (
    <section id="experience" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          index={index}
          name="experience"
          shape={`(${experience.length},)`}
          title="Experience & education"
        />

        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr]">
          <div className="space-y-14">
            {/* Timeline */}
            <ol className="relative space-y-10 border-l border-line pl-8">
              {experience.map((job, i) => (
                <li key={`${job.company}-${job.role}`} className="relative">
                  <Reveal delay={i * 80}>
                    <span className="absolute -left-[37px] top-1.5 h-3 w-3 rounded-full border-2 border-accent bg-background" />
                    <p className="font-mono text-xs text-accent">{job.period}</p>
                    <h3 className="mt-1 text-lg font-semibold">
                      {job.role}
                      {job.company && <span className="text-muted"> @ {job.company}</span>}
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

            {/* Awards */}
            {awards.length > 0 && (
              <Reveal>
                <h3 className="flex items-center gap-2 text-sm font-semibold">
                  <Trophy size={16} className="text-accent" /> Awards & scholarships
                </h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {awards.map((a) => (
                    <li key={a.title} className="rounded-xl border border-line bg-surface p-4">
                      <p className="font-mono text-xs text-accent">{a.period}</p>
                      <p className="mt-1 text-sm font-medium">{a.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted">{a.detail}</p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </div>

          <Reveal delay={120} className="space-y-8">
            {/* Education */}
            <div className="rounded-xl border border-line bg-surface p-6">
              <h3 className="flex items-center gap-2 text-sm font-semibold">
                <GraduationCap size={16} className="text-accent" /> Education
              </h3>
              <ul className="mt-4 space-y-4">
                {education.map((e) => (
                  <li key={e.degree}>
                    <p className="text-sm font-medium">{e.degree}</p>
                    <p className="text-sm text-muted">{e.school}</p>
                    <p className="mt-0.5 font-mono text-xs text-muted">
                      {e.period}
                      {e.note && <span className="text-accent"> · {e.note}</span>}
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
