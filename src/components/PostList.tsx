import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate, type PostMeta } from "@/lib/posts";

export default function PostList({ posts }: { posts: PostMeta[] }) {
  if (posts.length === 0) {
    return <p className="text-muted">No posts yet — check back soon.</p>;
  }
  return (
    <ul className="divide-y divide-line overflow-hidden rounded-xl border border-line bg-surface">
      {posts.map((post) => (
        <li key={post.slug}>
          <Link
            href={`/blog/${post.slug}`}
            className="group flex flex-col gap-2 p-6 transition-colors hover:bg-surface-2 sm:flex-row sm:items-start sm:justify-between sm:gap-8"
          >
            <div>
              <h3 className="text-lg font-semibold tracking-tight transition-colors group-hover:text-accent">
                {post.title}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{post.summary}</p>
              {post.tags.length > 0 && (
                <ul className="mt-3 flex flex-wrap gap-2 font-mono text-[11px] text-accent/80">
                  {post.tags.map((t) => (
                    <li key={t}>#{t}</li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-muted">
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingMinutes} min</span>
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
