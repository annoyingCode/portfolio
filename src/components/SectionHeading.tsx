import Reveal from "./Reveal";

/**
 * Section title with a tensor-style label, e.g.
 *   portfolio[3] · skills.shape = (23, 9)
 */
export default function SectionHeading({
  index,
  name,
  shape,
  title,
  subtitle,
}: {
  index: number;
  name: string;
  shape?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-10">
      <p className="font-mono text-xs tracking-wide text-accent">
        portfolio[{index}] <span className="text-muted">·</span>{" "}
        {/* keep "name.shape = (…)" in one piece so narrow screens wrap before it, not inside it */}
        <span className="inline-block whitespace-nowrap">
          {name}
          {shape && <span className="text-muted">.shape = {shape}</span>}
        </span>
      </p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
    </Reveal>
  );
}
