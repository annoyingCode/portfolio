// ─────────────────────────────────────────────────────────────
//  PROJECTS
//  Each { ... } block below is one project card on the site.
//  To add a project, copy a whole block (from { to },) and edit it.
//  To hide one, delete its block.
//
//  status:  "planned"  → grey dot,  "Planned"
//           "building" → amber dot, "In progress"
//           "live"     → green dot, "Live"
//  github / demo: paste a link, or leave "" to hide the button.
// ─────────────────────────────────────────────────────────────

export type ProjectStatus = "planned" | "building" | "live";

export type Project = {
  title: string;
  description: string;
  status: ProjectStatus;
  tags: string[];
  github: string;
  demo: string;
};

export const projects: Project[] = [
  {
    title: "AI Study Companion",
    description:
      "Upload lecture notes or slides and get practice quizzes, flashcards and explanations, with every answer linked back to the source material. Built for my own students.",
    status: "planned",
    tags: ["AI", "RAG", "Education", "Full-stack"],
    github: "",
    demo: "",
  },
  {
    title: "Paper Reproduction",
    description:
      "Reimplementing a well-known machine learning paper from scratch, running its experiments, and writing up what matched the original results and what didn't.",
    status: "planned",
    tags: ["Research", "Machine Learning", "Python"],
    github: "",
    demo: "",
  },
];
