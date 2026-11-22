import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

// The preview card shown when the site link is shared (LinkedIn, WhatsApp, X…).
export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #07090d 0%, #0d1424 60%, #1a1533 100%)",
          color: "#e6edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 30, color: "#60a5fa", fontFamily: "monospace" }}>
          {"> hello, world. I'm"}
        </div>
        <div style={{ fontSize: 88, fontWeight: 700, marginTop: 16, letterSpacing: -2 }}>{profile.name}</div>
        <div
          style={{
            fontSize: 44,
            marginTop: 12,
            backgroundImage: "linear-gradient(90deg, #60a5fa, #a78bfa)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          {profile.roles.join(" · ")}
        </div>
        <div style={{ fontSize: 28, marginTop: 36, color: "#8b98a9", maxWidth: 900 }}>{profile.headline}</div>
        <div style={{ fontSize: 24, marginTop: "auto", color: "#8b98a9" }}>{profile.location}</div>
      </div>
    ),
    size,
  );
}
