import { ImageResponse } from "next/og";

// Dynamic Open Graph image — auto-wired into <meta og:image> by Next.
export const alt = "AK Énergies Confort — Chauffagiste à Strasbourg";
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
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(circle at 22% 28%, #3a1206, transparent 55%), radial-gradient(circle at 78% 72%, #06304a, transparent 55%), #0a0a0f",
          color: "#f4f4f5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
              fontWeight: 800,
              color: "#0a0a0f",
              background:
                "linear-gradient(135deg,#ff4d2e,#ffb347 50%,#38bdf8)",
            }}
          >
            AK
          </div>
          <span style={{ fontSize: 26, letterSpacing: 6, color: "#a1a1aa" }}>
            ÉNERGIES CONFORT
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 800, lineHeight: 1.05 }}>
            Le confort thermique,
          </div>
          <div
            style={{
              fontSize: 84,
              fontWeight: 800,
              lineHeight: 1.05,
              background: "linear-gradient(135deg,#ff4d2e,#ffb347 50%,#38bdf8)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            réinventé à Strasbourg.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 28,
            color: "#a1a1aa",
          }}
        >
          <span>Chauffage · Climatisation · Traitement d&apos;air</span>
          <span style={{ color: "#f4f4f5", fontWeight: 700 }}>
            06 30 26 93 08
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
