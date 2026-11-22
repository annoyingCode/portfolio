// ─────────────────────────────────────────────────────────────
//  SKILL SPACE
//  Every skill is a vector: one score from 0 to 1 on each axis
//  below. The "Skill space" section computes cosine similarity
//  and Euclidean distance between these vectors, and draws them
//  on a 2-D map using PCA.
//
//  When you add a skill in site.ts, add its vector here too
//  (same spelling). Skills without a vector are still listed,
//  just not drawn on the map.
// ─────────────────────────────────────────────────────────────

export const axes = [
  "code",
  "web",
  "ML",
  "vision",
  "language",
  "research",
  "data",
  "systems",
  "teaching",
] as const;

//                                  code  web   ML    vis   lang  res   data  sys   teach
export const skillVectors: Record<string, number[]> = {
  Python:                         [1.0, 0.2, 0.8, 0.5, 0.5, 0.5, 0.6, 0.3, 0.4],
  "C/C++":                        [1.0, 0.0, 0.2, 0.2, 0.0, 0.2, 0.1, 0.8, 0.2],
  Java:                           [1.0, 0.3, 0.1, 0.0, 0.0, 0.1, 0.2, 0.6, 0.3],
  JavaScript:                     [0.9, 1.0, 0.1, 0.0, 0.0, 0.0, 0.2, 0.3, 0.2],
  "HTML/CSS":                     [0.5, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.1, 0.2],
  "Deep Learning":                [0.5, 0.0, 1.0, 0.7, 0.7, 0.8, 0.5, 0.2, 0.3],
  "Computer Vision":              [0.4, 0.0, 0.9, 1.0, 0.1, 0.8, 0.5, 0.1, 0.2],
  NLP:                            [0.4, 0.0, 0.9, 0.1, 1.0, 0.8, 0.5, 0.1, 0.2],
  "Model Quantization":           [0.5, 0.0, 0.8, 0.5, 0.3, 0.9, 0.2, 0.7, 0.1],
  "Explainable AI":               [0.3, 0.0, 0.8, 0.6, 0.4, 1.0, 0.3, 0.0, 0.4],
  "Representation Learning":      [0.3, 0.0, 1.0, 0.6, 0.6, 1.0, 0.4, 0.0, 0.1],
  "Multi-Task/Meta-Learning":     [0.3, 0.0, 1.0, 0.4, 0.4, 1.0, 0.3, 0.1, 0.1],
  MySQL:                          [0.4, 0.4, 0.0, 0.0, 0.0, 0.0, 1.0, 0.5, 0.1],
  PostgreSQL:                     [0.4, 0.3, 0.1, 0.0, 0.0, 0.0, 1.0, 0.6, 0.1],
  "Vector Databases":             [0.4, 0.2, 0.6, 0.2, 0.5, 0.3, 1.0, 0.5, 0.0],
  Docker:                         [0.4, 0.3, 0.2, 0.0, 0.0, 0.0, 0.2, 1.0, 0.1],
  Linux:                          [0.5, 0.1, 0.0, 0.0, 0.0, 0.1, 0.1, 1.0, 0.2],
  "Git & GitHub":                 [0.7, 0.3, 0.0, 0.0, 0.0, 0.2, 0.1, 0.6, 0.4],
  LaTeX:                          [0.2, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.6],
  "Lab instruction":              [0.5, 0.0, 0.3, 0.0, 0.0, 0.1, 0.0, 0.0, 1.0],
  "Assessment & feedback":        [0.0, 0.0, 0.0, 0.0, 0.0, 0.2, 0.1, 0.0, 1.0],
  "Interactive engagement":       [0.0, 0.1, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0],
  Mentoring:                      [0.3, 0.0, 0.2, 0.0, 0.0, 0.3, 0.0, 0.0, 1.0],
};

/** The skill selected when the section first loads */
export const defaultSkill = "Model Quantization";
