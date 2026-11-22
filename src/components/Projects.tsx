import { ExternalLink, Github } from "lucide-react";
import { projects, type ProjectStatus } from "@/data/projects";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const statusStyle: Record<ProjectStatus, { label: string; dot: string }> = {
  planned: { label: "Planned", dot: "bg-slate-400" },
  building: { label: "In progress", dot: "bg-amber-400" },
  live: { label: "Live", dot: "bg-emerald-400" },
};

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading
          index="02"
          label="projects"
          title="What I'm building"
          subtitle="Projects I'm working on right now. Each one goes live here, with its code on GitHub, as it ships."
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => {
            const s = statusStyle[p.status];
            return (
              <Reveal key={p.title} delay={(i % 2) * 90}>
                <article className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-lg font-semibold tracking-tight">{p.title}</h3>
                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-0.5 font-mono text-[11px] text-muted">
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <li key={t} className="rounded border border-line bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                        {t}
                      </li>
                    ))}
                  </ul>
                  {(p.github || p.demo) && (
                    <div className="mt-5 flex gap-4 border-t border-line pt-4 text-sm">
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent">
                          <Github size={15} /> Code
                        </a>
                      )}
                      {p.demo && (
                        <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted hover:text-accent">
                          <ExternalLink size={15} /> Live demo
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
