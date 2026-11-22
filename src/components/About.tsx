import { about, profile } from "@/data/site";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function About({ index }: { index: number }) {
  return (
    <section id="about" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <SectionHeading index={index} name="about" shape={`(${about.paragraphs.length},)`} title="A bit about me" />

        <Reveal className="grid gap-12 lg:grid-cols-[auto_1fr]">
          <div className="flex justify-center lg:block">
            {profile.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar}
                alt={profile.name}
                className="h-48 w-48 rounded-2xl border border-line object-cover"
              />
            ) : (
              <div className="flex h-48 w-48 items-center justify-center rounded-2xl border border-line bg-gradient-to-br from-accent/20 via-surface to-accent-2/20 font-mono text-5xl font-semibold text-fg/90">
                {profile.initials}
              </div>
            )}
          </div>

          <div>
            <div className="space-y-4 text-lg leading-relaxed text-muted">
              {about.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            {about.highlights.length > 0 && (
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
              {about.highlights.map((h) => (
                <div key={h.label} className="bg-surface p-5">
                  <dt className="text-xs uppercase tracking-wider text-muted">{h.label}</dt>
                  <dd className="mt-1 font-mono text-3xl font-semibold text-fg">{h.value}</dd>
                </div>
              ))}
            </dl>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
