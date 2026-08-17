import { ImageResponse } from "next/og";

import { siteContent } from "@focar/content";

export const alt = `${siteContent.brand.name} — ${siteContent.brand.tagline}`;
export const contentType = "image/png";
export const size = {
  height: 630,
  width: 1200,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#f5f5f5",
          color: "#0b0b0d",
          display: "flex",
          fontFamily: "Helvetica Neue, Arial, sans-serif",
          height: "100%",
          padding: "56px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(11,11,13,0.12)",
            display: "flex",
            flex: 1,
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "56px",
            }}
          >
            <div
              style={{
                color: "#b31d1d",
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              {siteContent.brand.category}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                maxWidth: "620px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 78,
                  fontWeight: 800,
                  letterSpacing: "-0.06em",
                  lineHeight: 0.92,
                }}
              >
                {siteContent.brand.tagline}
              </div>
              <div
                style={{
                  color: "#2b2b2f",
                  display: "flex",
                  fontSize: 28,
                  lineHeight: 1.35,
                }}
              >
                {siteContent.brand.description}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 26,
                fontWeight: 700,
              }}
            >
              focarforadacaixa.com.br
            </div>
          </div>

          <div
            style={{
              background: "#ff3231",
              color: "#0b0b0d",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "48px",
              width: "320px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 22,
                fontWeight: 700,
              }}
            >
              01
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 46,
                fontWeight: 800,
                letterSpacing: "-0.05em",
                lineHeight: 0.94,
              }}
            >
              {siteContent.brand.belief}
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                fontWeight: 700,
                letterSpacing: "0.04em",
                textTransform: "uppercase",
              }}
            >
              FOCAR
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
