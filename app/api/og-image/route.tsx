import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import SiteData from "@/content/site-data.json";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
        }}
      >
        {/* Author Image */}
        <img
          width="120"
          height="120"
          src={SiteData.author.image.url}
          style={{ borderRadius: "50%", border: "4px solid white" }}
          alt={SiteData.author.image.alt}
        />

        {/* Site Title */}
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            margin: 0,
            marginTop: "40px",
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {SiteData.site.title}
        </h1>

        {/* Site Description */}
        <p
          style={{
            fontSize: "36px",
            fontWeight: 400,
            lineHeight: 1.4,
            margin: 0,
            marginTop: "20px",
            textAlign: "center",
            color: "#d1d5db",
            maxWidth: "75%",
          }}
        >
          {SiteData.site.description}
        </p>

        {/* Site URL at the bottom */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            fontSize: "24px",
            fontWeight: 500,
            color: "#9ca3af",
          }}
        >
          {SiteData.site.baseUrl}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
