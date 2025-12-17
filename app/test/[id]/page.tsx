import { notFound } from "next/navigation";
import { Metadata } from "next";
import TestInfo from "@/components/test/TestInfo";
import ActionButtons from "@/components/test/ActionButtons";
import RelatedTests from "@/components/test/RelatedTests";
import { getTestById, getRelatedTests } from "@/lib/test-utils";
import type { TestSummary } from "@/types/test";

interface TestDetailPageProps {
  params: Promise<{ id: string }>;
}

// 동적 메타데이터 생성
export async function generateMetadata({
  params,
}: TestDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const test = getTestById(id);

  if (!test) {
    return {
      title: "테스트를 찾을 수 없습니다",
    };
  }

  return {
    title: `${test.title} - MOAB`,
    description: test.description,
    openGraph: {
      title: test.title,
      description: test.description,
      images: [test.coverImageUrl],
    },
  };
}

export default async function TestDetailPage({ params }: TestDetailPageProps) {
  const { id } = await params;
  const test = getTestById(id);

  if (!test) {
    notFound();
  }

  // 관련 테스트 가져오기
  const relatedTests = getRelatedTests(id, 4);
  const relatedTestSummaries: TestSummary[] = relatedTests.map((t) => ({
    id: t.id,
    title: t.title,
    thumbnailUrl: t.thumbnailUrl,
    playCount: t.playCount,
    likeCount: t.likeCount,
    category: t.category,
  }));

  return (
    <div className="pb-8">
      {/* 테스트 정보 */}
      <TestInfo test={test} />

      {/* 액션 버튼 */}
      <ActionButtons
        testId={test.id}
        testTitle={test.title}
        initialLikeCount={test.likeCount}
      />

      {/* 비슷한 테스트 추천 */}
      <div className="mt-6">
        <RelatedTests
          tests={relatedTestSummaries}
          title="비슷한 테스트"
          emoji="✨"
          showMoreLink={false}
        />
      </div>
    </div>
  );
}
