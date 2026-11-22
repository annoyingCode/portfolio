// ─────────────────────────────────────────────────────────────
//  All portfolio content lives here. Every section of the site
//  reads from this file. See EDITING.md for how to change it.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Abdul Wahab Khan",
  initials: "AWK",
  role: "AI Graduate Student & Educator",
  // Titles the hero cycles through with a typing effect (first one shows by default).
  roles: ["Software Engineer", "Educator", "Aspiring Scientist", "Obsessed with Vectors"],
  headline:
    "MS AI student and Lab Instructor at FAST NUCES, researching computer vision, reinforcement learning and model quantization.",
  bio: "MS student in Artificial Intelligence and Lab Instructor at FAST NUCES Islamabad, with research interests in computer vision, reinforcement learning and model quantization.",
  location: "Islamabad, Pakistan",
  openToWork: false,
  email: "abdulwahab.ai.engr@gmail.com",
  // Put your resume at public/resume.pdf, then set this to "/resume.pdf".
  // Leave it "" to hide the Resume buttons.
  resumeUrl: "/resume.pdf",
  // Optional: put a photo at /public/avatar.jpg and set this to "/avatar.jpg".
  avatar: "" as string,
};

// Leave a link empty ("") to hide its icon. Fill these in when ready.
export const socials = {
  github: "https://github.com/annoyingCode",
  linkedin: "",
  x: "",
  huggingface: "",
};

export const about = {
  paragraphs: [
    "I'm an MS student in Artificial Intelligence and a Lab Instructor at FAST NUCES Islamabad. My research interests are computer vision, reinforcement learning and model quantization. Most recently I've been exploring how quantizing image classifiers changes what their Grad-CAM explanations show.",
    "Teaching is the other half of what I do. I've been a Section Leader for Stanford's Code in Place in two cohorts, a Machine Learning Teaching Assistant, and I now run lab sessions and mentor students at FAST. Explaining ideas clearly makes me a better engineer, and my long-term goal is to become a scientist who does both: research and teaching.",
  ],
  // Up to four stat boxes. Leave the list empty [] to hide them.
  highlights: [
    { value: "3.82", label: "BS CGPA" },
    { value: "Top 3", label: "BS class, 6 semesters" },
    { value: "1st", label: "3MT pitch, GIKI 2025" },
    { value: "2", label: "Code in Place cohorts led" },
  ] as { value: string; label: string }[],
};

// Projects live in src/data/projects.ts

export type Job = {
  role: string;
  /** Leave "" if there's no organization to show */
  company: string;
  period: string;
  location?: string;
  points: string[];
};

export const experience: Job[] = [
  {
    role: "Lab Instructor",
    company: "FAST NUCES",
    period: "Jan 2025 — Present",
    location: "Islamabad",
    points: [
      "Conduct lab sessions and mentor students through hands-on coursework",
      "Evaluate lab tasks, exams, presentations and course projects, giving each student feedback on their work",
      "Design problem sets and teach the ethical, responsible use of AI",
    ],
  },
  {
    role: "Section Leader",
    company: "Code in Place, Stanford Engineering",
    period: "June 2024 · April 2026",
    location: "Remote",
    points: [
      "Taught Python to small sections of 7-8 international students in each of two cohorts",
      "Strengthened my teaching practice through Stanford's section-leader workshops",
    ],
  },
  {
    role: "Machine Learning Teaching Assistant",
    company: "BUITEMS",
    period: "Sep 2023 — Dec 2024",
    location: "Quetta, Pakistan",
    points: [
      "Guided students through ML concepts, delivered lectures and conducted lab sessions",
    ],
  },
];

export const education = [
  {
    degree: "MS in Artificial Intelligence",
    school: "FAST NUCES Islamabad",
    period: "Aug 2025 — Expected 2027",
    note: "CGPA 3.7 / 4.0",
  },
  {
    degree: "BS in Software Engineering",
    school: "BUITEMS, Quetta",
    period: "Nov 2020 — July 2024",
    note: "CGPA 3.82 / 4.0",
  },
];

export const certifications = [
  "Deep Learning Specialization",
  "Machine Learning Specialization",
  "Natural Language Processing Specialization",
  "Mathematics for Machine Learning and Data Science Specialization",
  "MLOps Specialization",
];

export const awards = [
  {
    title: "3MT Winner, GIKI Emerging Tech & Freelance Innovation",
    period: "Mar 2025",
    detail: "First place in a 3-minute pitch competition for an AI-powered solution in education.",
  },
  {
    title: "Senior Design Project Prize, Pakistan Engineering Council",
    period: "Sep 2024",
    detail: "PKR 100,000 award for my final year project, a face recognition system for access control.",
  },
  {
    title: "Merit Scholarship, BUITEMS",
    period: "2021 — 2024",
    detail: "Tuition fee waiver for ranking in the top 3 students for 6 semesters.",
  },
  {
    title: "Balochistan Education Endowment Fund Scholarship",
    period: "2018 — 2023",
    detail: "Annual scholarship for academic performance, five years in a row.",
  },
];

export const skills: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["Python", "C/C++", "Java", "JavaScript", "HTML/CSS"] },
  {
    group: "AI & Research",
    items: ["Deep Learning", "Computer Vision", "NLP", "Model Quantization", "Explainable AI", "Representation Learning", "Multi-Task/Meta-Learning"],
  },
  { group: "Data", items: ["MySQL", "PostgreSQL", "Vector Databases"] },
  { group: "Tools", items: ["Docker", "Linux", "Git & GitHub", "LaTeX"] },
  {
    group: "Teaching & Mentoring",
    items: ["Lab instruction", "Assessment & feedback", "Interactive engagement", "Mentoring"],
  },
];

export const site = {
  title: `${profile.name} — ${profile.role}`,
  description: profile.headline,
  // The live address of the site (used for link previews when you share it).
  url: "https://awkhan.vercel.app",
};
