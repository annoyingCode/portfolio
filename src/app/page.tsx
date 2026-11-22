import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  // The blog section only appears once there is at least one post in content/blog/.
  const hasPosts = getAllPosts().length > 0;
  return (
    <>
      <Hero />
      <About />
      <Projects />
      <Experience />
      {hasPosts && <BlogPreview />}
      <Contact index={hasPosts ? "05" : "04"} />
    </>
  );
}
