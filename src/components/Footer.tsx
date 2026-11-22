import { profile } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 font-mono text-xs text-muted sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>
          built with <span className="text-accent">Next.js</span> + <span className="text-accent">Tailwind</span>
        </p>
      </div>
    </footer>
  );
}
