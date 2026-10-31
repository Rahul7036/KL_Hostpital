import { ImageResponse } from "next/og";

export const alt = "KL Skin & Children's Hospital, Jadcherla: Dermatology & Paediatrics";
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
          padding: 72,
          background: "linear-gradient(135deg, #052422 0%, #0e4744 60%, #18756e 100%)",
          color: "#fdfcf9",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: "#cfae73",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#052422",
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            KL
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700 }}>KL Skin &amp; Children&apos;s Hospital</div>
            <div style={{ fontSize: 20, color: "#a7d3c2", letterSpacing: 3 }}>JADCHERLA · TELANGANA</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Expert Care.</div>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Healthier Lives.</div>
          <div style={{ fontSize: 78, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#cfae73" }}>
            Happier Families.
          </div>
        </div>
        <div style={{ fontSize: 26, color: "#cbe5da" }}>Dermatology · Hair &amp; Scalp · Paediatrics</div>
      </div>
    ),
    size,
  );
}
