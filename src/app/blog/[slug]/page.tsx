import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { formatDate, getPost, getPostSlugs } from "@/lib/posts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.summary };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-5 py-16">
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 font-mono text-sm text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} /> back to blog
      </Link>

      <header className="mt-8 border-b border-line pb-8">
        <p className="font-mono text-xs text-muted">
          {formatDate(post.date)} · {post.readingMinutes} min read
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{post.title}</h1>
        {post.summary && <p className="mt-3 text-lg text-muted">{post.summary}</p>}
        {post.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs text-accent/80">
            {post.tags.map((t) => (
              <li key={t}>#{t}</li>
            ))}
          </ul>
        )}
      </header>

      <div
        className="prose dark:prose-invert mt-10 max-w-none prose-headings:tracking-tight prose-a:text-accent prose-code:text-accent prose-code:before:content-none prose-code:after:content-none prose-pre:border prose-pre:border-line prose-pre:bg-surface prose-pre:text-fg"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </article>
  );
}
