"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Home, RotateCcw, Share2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ResultCard from "@/components/test/ResultCard";
import RelatedTests from "@/components/test/RelatedTests";
import ShareModal from "@/components/shared/ShareModal";
import {
  getTestById,
  getResultById,
  getRelatedTests,
} from "@/lib/test-utils";
import type { Test, Result, TestResultState, TestSummary } from "@/types/test";

export default function TestResultPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.id as string;

  const [test, setTest] = useState<Test | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [relatedTests, setRelatedTests] = useState<TestSummary[]>([]);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // 결과 데이터 로드
  useEffect(() => {
    const testData = getTestById(testId);
    if (!testData) {
      router.replace("/");
      return;
    }
    setTest(testData);

    // sessionStorage에서 결과 가져오기
    const resultStateJson = sessionStorage.getItem(`test-result-${testId}`);
    if (!resultStateJson) {
      // 결과가 없으면 테스트 페이지로 이동
      router.replace(`/test/${testId}`);
      return;
    }

    const resultState: TestResultState = JSON.parse(resultStateJson);
    const resultData = getResultById(testId, resultState.resultId);

    if (!resultData) {
      router.replace(`/test/${testId}`);
      return;
    }

    setResult(resultData);

    // 관련 테스트 로드
    const related = getRelatedTests(testId, 4).map((t) => ({
      id: t.id,
      title: t.title,
      thumbnailUrl: t.thumbnailUrl,
      playCount: t.playCount,
      likeCount: t.likeCount,
      category: t.category,
    }));
    setRelatedTests(related);
  }, [testId, router]);

  // 공유하기
  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  // 다시 하기
  const handleRetry = () => {
    sessionStorage.removeItem(`test-result-${testId}`);
    router.push(`/test/${testId}/play`);
  };

  if (!test || !result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 결과 카드 */}
      <div className="p-4">
        <ResultCard result={result} testTitle={test.title} />
      </div>

      {/* 액션 버튼들 */}
      <div className="px-4 py-6 space-y-3">
        {/* 공유하기 버튼 */}
        <Button
          onClick={handleShare}
          className="w-full h-12 text-base font-semibold"
        >
          <Share2 className="w-5 h-5 mr-2" />
          결과 공유하기
        </Button>

        {/* 다시하기 & 홈으로 버튼 */}
        <div className="flex gap-3">
          <Button
            onClick={handleRetry}
            variant="outline"
            className="flex-1 h-12 text-base font-medium"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            다시 하기
          </Button>
          <Button
            asChild
            variant="outline"
            className="flex-1 h-12 text-base font-medium"
          >
            <Link href="/">
              <Home className="w-5 h-5 mr-2" />
              홈으로
            </Link>
          </Button>
        </div>
      </div>

      {/* 관련 테스트 */}
      <RelatedTests
        tests={relatedTests}
        title="비슷한 테스트"
        emoji="🎯"
        showMoreLink={true}
        moreHref="/"
      />

      {/* 하단 여백 */}
      <div className="h-8" />

      {/* 공유 모달 */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={`${test.title} 결과: ${result.title}`}
        description={`나의 ${test.title} 결과는 "${result.title}"입니다!`}
      />
    </div>
  );
}
