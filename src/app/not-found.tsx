import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-5 py-32 text-center">
      <p className="font-mono text-sm text-accent">error 404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Page not found</h1>
      <p className="mt-3 text-muted">That route returned no results — even with a re-ranker.</p>
      <Link
        href="/"
        className="mt-8 rounded-md border border-line bg-surface px-5 py-2.5 text-sm transition-colors hover:border-accent/50"
      >
        ← Back home
      </Link>
    </div>
  );
}
