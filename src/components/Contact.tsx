import { Mail } from "lucide-react";
import { profile } from "@/data/site";
import SectionHeading from "./SectionHeading";
import SocialLinks from "./SocialLinks";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <Reveal className="relative overflow-hidden rounded-2xl border border-line bg-surface px-6 py-14 text-center sm:px-12">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-[600px] -translate-x-1/2 rounded-full bg-accent-2/15 blur-[100px]"
          />
          <div className="relative">
            <div className="flex justify-center">
              <SectionHeading index="05" label="contact" title="Let's build something" />
            </div>
            <p className="mx-auto -mt-4 max-w-xl text-muted">
              I&apos;m open to full-time roles, consulting, and interesting collaborations in AI. The
              fastest way to reach me is email.
            </p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-8 inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-medium text-background transition hover:brightness-110"
            >
              <Mail size={18} /> {profile.email}
            </a>
            <div className="mt-6 flex justify-center">
              <SocialLinks size={20} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
