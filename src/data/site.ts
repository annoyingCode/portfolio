// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Replace the placeholders
//  with your own details — every section reads from this file.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Abdul Wahab Khan",
  initials: "AWK",
  role: "Software Engineer & Educator",
  // Titles the hero cycles through with a typing effect (first one shows by default).
  roles: ["Software Engineer", "Educator", "Aspiring Scientist"],
  headline: "I build software, teach what I learn, and I'm working toward a life in science.",
  bio: "Software engineer and educator from Islamabad, building practical software, helping others learn to do the same, and working toward a career in scientific research.",
  location: "Islamabad, Pakistan",
  openToWork: true,
  email: "abdulwahab.ai.engr@gmail.com",
  // Put your resume at public/resume.pdf, then set this to "/resume.pdf".
  // Leave it "" to hide the Resume buttons.
  resumeUrl: "",
  // Optional: put a photo at /public/avatar.jpg and set this to "/avatar.jpg".
  avatar: "" as string,
};

// Leave a link empty ("") to hide its icon. Fill these in when ready.
export const socials = {
  github: "",
  linkedin: "",
  x: "",
  huggingface: "",
};

export const about = {
  paragraphs: [
    "I'm a software engineer and educator based in Islamabad, Pakistan. I enjoy building practical software, and just as much, helping others understand how it works. Teaching has made me a clearer thinker and a better engineer: if I can't explain something simply, I don't understand it well enough yet.",
    "My long-term goal is to become a scientist. I'm drawn to the questions behind the code, especially in artificial intelligence, and I'm working toward research that expands what's possible, not just what's shippable. This site is where I share what I build, what I teach, and what I'm learning along the way.",
  ],
  // Up to four stat boxes, e.g. { value: "200+", label: "Students taught" }.
  // Leave the list empty [] to hide the boxes.
  highlights: [] as { value: string; label: string }[],
};

// Projects live in src/data/projects.ts

export type Job = {
  role: string;
  company: string;
  period: string;
  location?: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Computer Science Instructor",
    company: "FAST NUCES",
    period: "2025 — Present",
    location: "Islamabad",
    points: [
      "Guide students through practical lab sessions",
      "Design state-of-the-art problem sets",
      "Teach ethical and responsible use of AI",
    ],
  },
];

export const education = [
  {
    degree: "M.S. in Artificial Intelligence",
    school: "FAST NUCES Islamabad",
    period: "2025 - Present",
  },
  {
    degree: "B.S. in Software Engineering",
    school: "BUITEMS",
    period: "2020 - 2024",
  },
];

export const certifications = [
  "Machine Learning Specialization",
  "Deep Learning Specialization",
  "Natural Language Specialization",
  "Mathematics for Machine Learning and Data Science Specialization",
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "SQL", "C++", "JavaScript"] },
  {
    group: "ML / Deep Learning",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Hugging Face"],
  },
  {
    group: "LLMs & Agents",
    items: ["RAG", "Fine-tuning", "LangChain", "LlamaIndex", "Prompt eval"],
  },
  {
    group: "Data & MLOps",
    items: ["Airflow", "MLflow", "Docker", "Kubernetes", "Weights & Biases"],
  },
  {
    group: "Cloud & Infra",
    items: ["FastAPI", "Postgres / pgvector"],
  },
];

export const site = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.headline,
  // The live address of the site (used for link previews when you share it).
  url: "https://portfolio-sigma-gules-63.vercel.app",
};
