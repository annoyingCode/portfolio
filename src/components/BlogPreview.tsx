import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import SectionHeading from "./SectionHeading";
import PostList from "./PostList";
import Reveal from "./Reveal";

export default function BlogPreview() {
  const posts = getAllPosts().slice(0, 3);
  return (
    <section id="blog" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-6xl px-5 py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            index="04"
            label="writing"
            title="Latest from the blog"
            subtitle="Notes on building with LLMs, ML engineering, and lessons from production."
          />
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:underline"
          >
            all posts <ArrowRight size={14} />
          </Link>
        </div>
        <Reveal>
          <PostList posts={posts} />
        </Reveal>
      </div>
    </section>
  );
}
