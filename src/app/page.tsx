import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import SkillSpace from "@/components/SkillSpace";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import TensorMinimap from "@/components/TensorMinimap";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  // The blog section only appears once there is at least one post in content/blog/.
  const hasPosts = getAllPosts().length > 0;

  // Section order. Each gets an index: portfolio[0], portfolio[1], …
  const sections = [
    { id: "about", name: "about" },
    { id: "projects", name: "projects" },
    { id: "experience", name: "experience" },
    { id: "skills", name: "skills" },
    ...(hasPosts ? [{ id: "blog", name: "blog" }] : []),
    { id: "contact", name: "contact" },
  ];
  const idx = (id: string) => sections.findIndex((s) => s.id === id);

  return (
    <>
      <Hero />
      <About index={idx("about")} />
      <Projects index={idx("projects")} />
      <Experience index={idx("experience")} />
      <SkillSpace index={idx("skills")} />
      {hasPosts && <BlogPreview index={idx("blog")} />}
      <Contact index={idx("contact")} />
      <TensorMinimap sections={sections} />
    </>
  );
}
