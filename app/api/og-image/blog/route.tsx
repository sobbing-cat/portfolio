import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import SiteData from "@/content/site-data.json";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const title = searchParams.get("title");
  const imageUrl = searchParams.get("imageUrl");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          position: "relative",
          color: "white",
          backgroundImage: imageUrl
            ? `url(${imageUrl})`
            : "linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))",
          backgroundColor: "#1a202c",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 40%, transparent 80%)",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "40px",
            left: "60px",
            display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            color: "#f3f4f6",
            padding: "8px 20px",
            borderRadius: "9999px",
            fontSize: "24px",
            fontWeight: 600,
            zIndex: 1,
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          BLOG
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            zIndex: 1,
            padding: "60px",
            position: "absolute",
            bottom: 0,
            left: 0,
            alignItems: "flex-start",
            boxSizing: "border-box",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img
              width="80"
              height="80"
              src={SiteData.author.image.url}
              style={{ borderRadius: "50%", border: "4px solid white" }}
            />
            <div
              style={{
                marginLeft: "20px",
                fontSize: "38px",
                fontWeight: 500,
                whiteSpace: "nowrap",
              }}
            >
              {SiteData.author.name}
            </div>
          </div>

          <h1
            style={{
              fontSize: "68px",
              fontWeight: 800,
              lineHeight: 1.1,
              paddingBottom: "10px",
              letterSpacing: "-0.02em",
              margin: 0,
              marginTop: "24px",
              textAlign: "left",
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              overflowY: "visible",
              textOverflow: "ellipsis",
            }}
          >
            {title ? title : `A Blog Post by ${SiteData.author.name}`}
          </h1>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
