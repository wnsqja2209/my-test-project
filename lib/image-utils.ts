/**
 * 서버에서 생성된 결과 이미지를 다운로드
 * html2canvas 대신 @vercel/og API를 사용하여 lab() 색상 호환성 문제 해결
 */
export async function downloadResultImage(
  testId: string,
  resultId: string,
  filename?: string
): Promise<void> {
  try {
    // 서버 API에서 이미지 가져오기
    const response = await fetch(
      `/api/og/download?testId=${encodeURIComponent(testId)}&resultId=${encodeURIComponent(resultId)}`
    );

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`);
    }

    // Blob으로 변환
    const blob = await response.blob();

    // 다운로드 링크 생성
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename || `${testId}-${resultId}-result.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // URL 해제
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Image download error:", error);
    throw error;
  }
}

/**
 * OG 이미지 URL 생성
 */
export function generateOgImageUrl(testId: string, resultId: string): string {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://our-play.vercel.app";
  return `${baseUrl}/api/og/result?testId=${encodeURIComponent(testId)}&resultId=${encodeURIComponent(resultId)}`;
}
