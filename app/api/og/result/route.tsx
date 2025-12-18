import { ImageResponse } from "@vercel/og";
import { getTestById, getResultById } from "@/lib/test-utils";

export const runtime = "edge";

// Satori가 지원하는 색상만 사용 (hex, rgb, rgba만 지원, lab 미지원)
const COLORS = {
  primary: "#667eea",
  primaryLight: "#8b9cf5",
  gradientStart: "#667eea",
  gradientEnd: "#764ba2",
  white: "#ffffff",
  gray900: "#1f2937",
  gray500: "#6b7280",
  badgeBg: "#e8ebfd",
};

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const testId = searchParams.get("testId");
    const resultId = searchParams.get("resultId");

    if (!testId || !resultId) {
      return new Response("Missing testId or resultId", { status: 400 });
    }

    const test = getTestById(testId);
    const result = getResultById(testId, resultId);

    if (!test || !result) {
      return new Response("Test or result not found", { status: 404 });
    }

    // 한글 폰트 로드 (선택적)
    let fontData: ArrayBuffer | null = null;
    try {
      const fontResponse = await fetch(
        "https://cdn.jsdelivr.net/gh/niceplugin/NanumSquareRound@main/NanumSquareRoundB.ttf"
      );
      if (fontResponse.ok) {
        fontData = await fontResponse.arrayBuffer();
      }
    } catch {
      console.warn("Font loading failed, using system font");
    }

    // 결과 설명 2줄로 제한
    const shortDescription =
      result.description.length > 80
        ? result.description.slice(0, 80) + "..."
        : result.description;

    // 이미지 URL 절대 경로로 변환
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://our-play.vercel.app";
    const imageUrl = result.imageUrl.startsWith("http")
      ? result.imageUrl
      : `${baseUrl}${result.imageUrl}`;

    // 이미지 존재 여부 확인
    let hasImage = false;
    try {
      const imgResponse = await fetch(imageUrl, { method: "HEAD" });
      hasImage = imgResponse.ok && imgResponse.headers.get("content-type")?.startsWith("image/");
    } catch {
      hasImage = false;
    }

    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
            padding: "48px",
            fontFamily: fontData ? "NanumSquareRound" : "sans-serif",
          }}
        >
          {/* 상단: 테스트 제목 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <span
              style={{
                color: COLORS.white,
                fontSize: "32px",
              }}
            >
              {test.title}
            </span>
          </div>

          {/* 중앙: 결과 이미지 또는 플레이스홀더 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            {hasImage ? (
              <div
                style={{
                  width: "480px",
                  height: "480px",
                  borderRadius: "24px",
                  overflow: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                  display: "flex",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageUrl}
                  alt={result.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  width: "480px",
                  height: "480px",
                  borderRadius: "24px",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              >
                <span
                  style={{
                    fontSize: "180px",
                  }}
                >
                  🎯
                </span>
              </div>
            )}
          </div>

          {/* 하단: 결과 카드 */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              background: COLORS.white,
              borderRadius: "24px",
              padding: "32px 48px",
              marginTop: "24px",
            }}
          >
            {/* 결과 타입 배지 */}
            <div
              style={{
                display: "flex",
                background: COLORS.badgeBg,
                borderRadius: "9999px",
                padding: "8px 20px",
                marginBottom: "12px",
              }}
            >
              <span
                style={{
                  color: COLORS.primary,
                  fontSize: "20px",
                  fontWeight: 600,
                }}
              >
                {result.type}
              </span>
            </div>

            {/* 결과 제목 */}
            <span
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: COLORS.gray900,
                marginBottom: "12px",
                textAlign: "center",
              }}
            >
              {result.title}
            </span>

            {/* 결과 설명 */}
            <span
              style={{
                fontSize: "20px",
                color: COLORS.gray500,
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              {shortDescription}
            </span>
          </div>

          {/* 브랜딩 */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <span
              style={{
                color: COLORS.white,
                fontSize: "20px",
              }}
            >
              MOAB - our-play.vercel.app
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 1200,
        ...(fontData && {
          fonts: [
            {
              name: "NanumSquareRound",
              data: fontData,
              style: "normal" as const,
              weight: 400,
            },
          ],
        }),
      }
    );
  } catch (error) {
    console.error("OG Image generation error:", error);
    return new Response(
      `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 }
    );
  }
}
