// Small linear-algebra helpers used by the skill space and the vector field.

export type Vec = number[];

export const dot = (a: Vec, b: Vec) => a.reduce((s, ai, i) => s + ai * b[i], 0);
export const norm = (a: Vec) => Math.sqrt(dot(a, a));

/** cos(a, b) = a·b / (‖a‖ ‖b‖) */
export const cosine = (a: Vec, b: Vec) => {
  const d = norm(a) * norm(b);
  return d === 0 ? 0 : dot(a, b) / d;
};

/** ‖a − b‖₂ = √Σ (aᵢ − bᵢ)² */
export const euclidean = (a: Vec, b: Vec) =>
  Math.sqrt(a.reduce((s, ai, i) => s + (ai - b[i]) ** 2, 0));

/**
 * Projects row vectors onto their top two principal components
 * (power iteration with deflation on the covariance matrix).
 */
export function pca2(rows: Vec[]): [number, number][] {
  const n = rows.length;
  const d = rows[0]?.length ?? 0;
  if (n === 0 || d === 0) return [];

  const mean = Array.from({ length: d }, (_, j) => rows.reduce((s, r) => s + r[j], 0) / n);
  const X = rows.map((r) => r.map((v, j) => v - mean[j]));

  // Covariance matrix C = Xᵀ X / n
  let C = Array.from({ length: d }, (_, i) =>
    Array.from({ length: d }, (_, j) => X.reduce((s, r) => s + r[i] * r[j], 0) / n),
  );

  const components: Vec[] = [];
  for (let k = 0; k < 2; k++) {
    // Deterministic start vector so the layout never changes between renders
    let v: Vec = Array.from({ length: d }, (_, i) => 1 / (i + 1 + k));
    for (let it = 0; it < 200; it++) {
      const w = C.map((row) => dot(row, v));
      const len = norm(w) || 1;
      v = w.map((x) => x / len);
    }
    const lambda = dot(v, C.map((row) => dot(row, v)));
    components.push(v);
    // Deflate: C ← C − λ v vᵀ
    C = C.map((row, i) => row.map((c, j) => c - lambda * v[i] * v[j]));
  }

  return X.map((r) => [dot(r, components[0]), dot(r, components[1])] as [number, number]);
}
