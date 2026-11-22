"use client";

import { useEffect, useRef } from "react";

/**
 * Full-page background: a grid of arrows sampling a slowly drifting flow field.
 * Near the cursor each arrow is pulled toward it, weighted by a Gaussian of the
 * Euclidean distance:  w = exp(−‖x − c‖² / 2σ²).
 */
export default function VectorField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SIGMA = 170;

    let width = 0;
    let height = 0;
    let spacing = 34;
    let color = "96,165,250";
    let raf = 0;

    // Cursor position (eased) and how strongly it currently pulls (fades in/out).
    const target = { x: -9999, y: -9999, active: 0 };
    const cursor = { x: -9999, y: -9999, strength: 0 };

    const readColor = () => {
      const hex = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
      const m = /^#?([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(hex);
      if (m) color = `${parseInt(m[1], 16)},${parseInt(m[2], 16)},${parseInt(m[3], 16)}`;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spacing = width < 640 ? 42 : 34;
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, width, height);
      const twoSigma2 = 2 * SIGMA * SIGMA;

      for (let y = spacing / 2; y < height; y += spacing) {
        for (let x = spacing / 2; x < width; x += spacing) {
          // Base flow field: smooth, slowly drifting angles
          const a0 =
            Math.sin(x * 0.0042 + t * 0.00018) * 1.3 + Math.cos(y * 0.0051 - t * 0.00014) * 1.3;

          // Pull toward the cursor, weighted by Euclidean distance
          const dx = cursor.x - x;
          const dy = cursor.y - y;
          const w = Math.exp(-(dx * dx + dy * dy) / twoSigma2) * cursor.strength;
          const ac = Math.atan2(dy, dx);

          const vx = (1 - w) * Math.cos(a0) + w * Math.cos(ac);
          const vy = (1 - w) * Math.sin(a0) + w * Math.sin(ac);
          const angle = Math.atan2(vy, vx);

          const len = 6 + 8 * w;
          const alpha = 0.15 + 0.3 * w;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          const x0 = x - (cos * len) / 2;
          const y0 = y - (sin * len) / 2;
          const x1 = x + (cos * len) / 2;
          const y1 = y + (sin * len) / 2;
          const head = 2.5 + 2 * w;

          ctx.strokeStyle = `rgba(${color},${alpha})`;
          ctx.lineWidth = 1 + w * 0.6;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - head * Math.cos(angle - 0.5), y1 - head * Math.sin(angle - 0.5));
          ctx.moveTo(x1, y1);
          ctx.lineTo(x1 - head * Math.cos(angle + 0.5), y1 - head * Math.sin(angle + 0.5));
          ctx.stroke();
        }
      }
    };

    const loop = (t: number) => {
      // Ease toward the pointer so the field glides instead of snapping
      cursor.x += (target.x - cursor.x) * 0.15;
      cursor.y += (target.y - cursor.y) * 0.15;
      cursor.strength += (target.active - cursor.strength) * 0.06;
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: PointerEvent) => {
      if (cursor.strength < 0.01) {
        cursor.x = e.clientX;
        cursor.y = e.clientY;
      }
      target.x = e.clientX;
      target.y = e.clientY;
      target.active = 1;
    };
    const onLeave = () => {
      target.active = 0;
    };
    const onVisibility = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && !reduceMotion) raf = requestAnimationFrame(loop);
    };

    readColor();
    resize();

    // Redraw in the new accent color when the theme changes
    const themeObserver = new MutationObserver(() => {
      readColor();
      if (reduceMotion) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    const onResize = () => {
      resize();
      if (reduceMotion) draw(0);
    };
    window.addEventListener("resize", onResize);

    if (reduceMotion) {
      draw(0); // static field, no animation or cursor tracking
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      window.addEventListener("blur", onLeave);
      document.addEventListener("visibilitychange", onVisibility);
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      themeObserver.disconnect();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 -z-10" />;
}
