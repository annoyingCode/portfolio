import Reveal from "./Reveal";

export default function SectionHeading({
  index,
  label,
  title,
  subtitle,
}: {
  index: string;
  label: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        {index} <span className="text-muted">//</span> {label}
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </Reveal>
  );
}
