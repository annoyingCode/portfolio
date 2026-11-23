// ─────────────────────────────────────────────────────────────
//  PROJECTS
//  Each { ... } block below is one project card on the site.
//  To add a project, copy a whole block (from { to },) and edit it.
//  To hide one, delete its block.
//
//  status:  "planned"  → grey dot,  "Planned"
//           "building" → amber dot, "In progress"
//           "complete" → blue dot,  "Completed" (finished, not deployed)
//           "live"     → green dot, "Live"
//  github / demo: paste a link, or leave "" to hide the button.
// ─────────────────────────────────────────────────────────────

export type ProjectStatus = "planned" | "building" | "complete" | "live";

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
    title: "Reframe: Self-Esteem Companion",
    description:
      "A chat companion for low self-esteem and harsh self-talk. It remembers your wins, goals and struggles, and when your inner critic gets loud it helps you reframe the thought using evidence from your own life. Streaming agent with tool calls, semantic long-term memory, English/Urdu support and a crisis check before any model call.",
    status: "complete",
    tags: ["Agentic AI", "LLM", "Long-term Memory", "FastAPI", "Python"],
    github: "",
    demo: "",
  },
  {
    title: "Quantization & Model Explainability",
    description:
      "Research on how quantization changes the Grad-CAM explanations of ResNet-18, GoogLeNet and MobileNetV2 classifiers on the BloodMNIST medical imaging dataset. When a model is shrunk to fewer bits, does it still base its decisions on the same evidence?",
    status: "building",
    tags: ["Research", "Computer Vision", "Quantization", "Explainable AI", "Medical Imaging"],
    github: "https://github.com/annoyingCode/lowbit-lens",
    demo: "",
  },
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
