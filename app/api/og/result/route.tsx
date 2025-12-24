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
        "https://cdn.jsdelivr.net/gh/niceplugin/NanumSquareRound@main/NanumSquareRoundB.ttf",
      );
      if (fontResponse.ok) {
        fontData = await fontResponse.arrayBuffer();
      }
    } catch {
      console.warn("Font loading failed, using system font");
    }

    // 이미지 URL 절대 경로로 변환
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "https://our-play-main.vercel.app/";
    const imageUrl = result.imageUrl.startsWith("http")
      ? result.imageUrl
      : `${baseUrl}${result.imageUrl}`;

    // 이미지 존재 여부 확인
    let hasImage = false;
    try {
      const imgResponse = await fetch(imageUrl, { method: "HEAD" });
      hasImage =
        imgResponse.ok &&
        imgResponse.headers.get("content-type")?.startsWith("image/");
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
            position: "relative",
          }}
        >
          {hasImage ? (
            // 결과 이미지가 있으면 전체 화면에 표시
            <img
              src={imageUrl}
              alt={result.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          ) : (
            // 결과 이미지가 없으면 기본 배경 표시
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: `linear-gradient(135deg, ${COLORS.gradientStart} 0%, ${COLORS.gradientEnd} 100%)`,
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
      },
    );
  } catch (error) {
    console.error("OG Image generation error:", error);
    return new Response(
      `Failed to generate image: ${error instanceof Error ? error.message : "Unknown error"}`,
      { status: 500 },
    );
  }
}