import { ArrowRight, Download, MapPin } from "lucide-react";
import { profile, skills } from "@/data/site";
import SocialLinks from "./SocialLinks";
import TypingRole from "./TypingRole";
import Reveal from "./Reveal";

export default function Hero() {
  const stack = skills.flatMap((s) => s.items).slice(0, 6);

  return (
    <section className="relative overflow-hidden">
      {/* soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 pb-20 pt-16 sm:pt-24 lg:grid-cols-[1.25fr_1fr] lg:pb-28">
        <div>
          {profile.openToWork && (
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 text-xs text-muted">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Open to new opportunities
            </p>
          )}

          <p className="mt-6 font-mono text-sm text-accent">&gt; hello, world. I&apos;m</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">{profile.name}</h1>
          <p className="mt-3 min-h-[1.5em] text-xl font-medium sm:text-2xl">
            <TypingRole roles={profile.roles} />
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">{profile.headline}</p>

          <p className="mt-4 inline-flex items-center gap-1.5 text-sm text-muted">
            <MapPin size={14} /> {profile.location}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-background transition hover:brightness-110"
            >
              View projects
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-md border border-line bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/50"
            >
              <Download size={16} /> Resume
            </a>
          </div>

          <div className="mt-6 -ml-2">
            <SocialLinks />
          </div>
        </div>

        {/* Terminal card — always dark, even in light mode */}
        <Reveal delay={150}>
        <div className="force-dark rounded-xl border border-line bg-surface text-fg shadow-2xl shadow-black/30">

          <div className="flex items-center gap-2 border-b border-line px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-muted">~/about.py</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-6">
            <code>
              <span className="text-accent-2">class</span> <span className="text-accent">Engineer</span>:{"\n"}
              {"  "}name = <span className="text-string">&quot;{profile.name}&quot;</span>{"\n"}
              {"  "}role = <span className="text-string">&quot;{profile.role}&quot;</span>{"\n"}
              {"  "}stack = [{"\n"}
              {stack.map((s, i) => (
                <span key={s}>
                  {"    "}
                  <span className="text-string">&quot;{s}&quot;</span>
                  {i < stack.length - 1 ? "," : ""}
                  {"\n"}
                </span>
              ))}
              {"  "}]{"\n\n"}
              {"  "}<span className="text-accent-2">def</span> <span className="text-accent">focus</span>(self):{"\n"}
              {"    "}<span className="text-accent-2">return</span>{" "}
              <span className="text-string">&quot;build, teach, discover&quot;</span>
              {"\n\n"}
              <span className="text-muted">&gt;&gt;&gt;</span> <span className="cursor text-accent">▍</span>
            </code>
          </pre>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
