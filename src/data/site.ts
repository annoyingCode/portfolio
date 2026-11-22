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
  // Put your resume at /public/resume.pdf, or point this at a hosted file.
  resumeUrl: "/resume.pdf",
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
  highlights: [
    { value: "3+", label: "Years in ML" },
    { value: "12", label: "Models shipped" },
    { value: "40%", label: "Avg. latency cut" },
    { value: "5k+", label: "OSS stars" },
  ],
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
    role: "Machine Learning Engineer",
    company: "Company Name",
    period: "2024 — Present",
    location: "Remote",
    points: [
      "Led development of an LLM-powered support assistant handling 10k+ queries per week.",
      "Built an offline/online evaluation pipeline that cut regressions reaching production by 60%.",
      "Reduced inference cost 35% through caching, batching, and model routing.",
    ],
  },
  {
    role: "Data Scientist",
    company: "Previous Company",
    period: "2022 — 2024",
    location: "City, Country",
    points: [
      "Shipped forecasting and classification models used across three business units.",
      "Designed feature pipelines in Airflow and introduced MLflow for experiment tracking.",
    ],
  },
  {
    role: "AI Research Intern",
    company: "University Lab / Startup",
    period: "2021 — 2022",
    points: [
      "Researched efficient transformer variants; co-authored a workshop paper.",
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
  "Certification Name — Issuer",
  "Another Certification — Issuer",
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
  url: "https://your-domain.com",
};
