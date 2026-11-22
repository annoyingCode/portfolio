import type { Metadata } from "next";
import { getAllPosts } from "@/lib/posts";
import PostList from "@/components/PostList";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on building with LLMs, ML engineering, and lessons from production.",
};

export default function BlogIndex() {
  const posts = getAllPosts();
  return (
    <div className="mx-auto max-w-4xl px-5 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        ~/blog <span className="text-muted">//</span> {posts.length} posts
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">Writing</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Notes on building with LLMs, ML engineering, and lessons from production.
      </p>
      <div className="mt-10">
        <PostList posts={posts} />
      </div>
    </div>
  );
}
