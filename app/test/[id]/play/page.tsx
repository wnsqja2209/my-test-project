"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import ProgressBar from "@/components/test/ProgressBar";
import Question from "@/components/test/Question";
import OptionButton from "@/components/test/OptionButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import {
  getTestById,
  createTestProgress,
  updateProgressWithAnswer,
  calculateResult,
} from "@/lib/test-utils";
import type { Test, TestProgress } from "@/types/test";

export default function TestPlayPage() {
  const router = useRouter();
  const params = useParams();
  const testId = params.id as string;

  const [test, setTest] = useState<Test | null>(null);
  const [progress, setProgress] = useState<TestProgress | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 테스트 데이터 로드
  useEffect(() => {
    const testData = getTestById(testId);
    if (!testData) {
      router.replace("/");
      return;
    }
    setTest(testData);
    setProgress(createTestProgress(testId));
  }, [testId, router]);

  if (!test || !progress) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">로딩 중...</div>
      </div>
    );
  }

  const currentQuestion = test.questions[progress.currentQuestionIndex];
  const isLastQuestion =
    progress.currentQuestionIndex === test.questions.length - 1;

  // 옵션 선택 핸들러 - 선택 후 자동으로 다음으로 이동
  const handleOptionSelect = (optionId: string) => {
    if (isTransitioning) return;
    setSelectedOption(optionId);
    setIsTransitioning(true);

    // 강조 효과 후 다음으로 이동 (500ms 딜레이)
    setTimeout(() => {
      // 진행 상태 업데이트
      const updatedProgress = updateProgressWithAnswer(
        progress,
        currentQuestion.id,
        optionId
      );

      if (isLastQuestion) {
        // 결과 계산 후 결과 페이지로 이동
        const result = calculateResult(updatedProgress);

        // 결과를 sessionStorage에 저장
        sessionStorage.setItem(
          `test-result-${testId}`,
          JSON.stringify(result)
        );

        // 결과 페이지로 이동 (URL에 resultId 포함)
        router.push(`/test/${testId}/result?r=${result.resultId}`);
      } else {
        // 다음 질문으로
        setProgress({
          ...updatedProgress,
          currentQuestionIndex: updatedProgress.currentQuestionIndex + 1,
        });
        setSelectedOption(null);
        setIsTransitioning(false);
      }
    }, 100);
  };

  // 이전 질문으로 이동
  const handlePrevious = () => {
    if (progress.currentQuestionIndex === 0 || isTransitioning) {
      router.back();
      return;
    }

    setProgress({
      ...progress,
      currentQuestionIndex: progress.currentQuestionIndex - 1,
    });

    // 이전 질문의 선택된 옵션 복원
    const prevQuestion = test.questions[progress.currentQuestionIndex - 1];
    const prevAnswer = progress.answers[prevQuestion.id];
    setSelectedOption(prevAnswer || null);
  };

  return (
    <>
      <ScrollToTop />
      <div className="h-[100dvh] bg-white flex flex-col overflow-hidden">
        {/* 헤더 - 진행률 바 */}
        <header className="flex-shrink-0 bg-white border-b border-gray-100">
        <div className="flex items-center h-14 px-4">
          <button
            type="button"
            onClick={handlePrevious}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="뒤로"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex-1 px-4">
            <ProgressBar
              current={progress.currentQuestionIndex + 1}
              total={test.questions.length}
            />
          </div>
        </div>
      </header>

      {/* 질문 영역 */}
      <div className="flex-1 flex flex-col px-4 py-2 min-h-0">
        <div className="flex-1 flex items-center justify-center max-h-[490px]">
          <Question question={currentQuestion} />
        </div>

        {/* 선택지 영역 */}
        <div className="space-y-3 pb-4 mt-auto flex-shrink-0">
          {currentQuestion.options.map((option) => (
            <OptionButton
              key={option.id}
              option={option}
              isSelected={selectedOption === option.id}
              onSelect={handleOptionSelect}
            />
          ))}
        </div>

      </div>
    </div>
    </>
  );
}
