"use client";

import { useEffect, useState } from "react";

/** Types out each role, pauses, deletes it, and moves to the next. */
export default function TypingRole({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(roles[0] ?? "");
  const [deleting, setDeleting] = useState(false);
  const [animate, setAnimate] = useState(false);

  // Start animating only on the client, and only if motion is allowed.
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!reduce && roles.length > 1) {
      setAnimate(true);
    }
  }, [roles.length]);

  useEffect(() => {
    if (!animate) return;
    const current = roles[index];
    let delay = deleting ? 35 : 75;

    if (!deleting && text === current) delay = 1800; // hold the full word

    const t = setTimeout(() => {
      if (!deleting && text === current) {
        setDeleting(true);
      } else if (deleting && text.length === 0) {
        setDeleting(false);
        setIndex((i) => (i + 1) % roles.length);
      } else if (deleting) {
        setText(current.slice(0, text.length - 1));
      } else {
        setText(current.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(t);
  }, [animate, deleting, index, roles, text]);

  return (
    <span aria-label={roles.join(", ")}>
      <span aria-hidden className="text-gradient">
        {text}
      </span>
      <span aria-hidden className="cursor ml-0.5 font-light text-accent">
        |
      </span>
    </span>
  );
}
