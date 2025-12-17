import type {
  Test,
  TestSummary,
  TestProgress,
  TestResultState,
  Result,
} from "@/types/test";
import testsData from "@/data/tests";

/** 모든 테스트 목록 가져오기 */
export function getAllTests(): Test[] {
  // testsData가 배열인 경우 그대로 반환
  if (Array.isArray(testsData)) {
    return testsData;
  }

  // testsData가 객체인 경우
  if (testsData && typeof testsData === "object") {
    // 1. testsData.tests가 배열인 경우 (기존 tests.json 구조)
    if (Array.isArray((testsData as any).tests)) {
      return (testsData as any).tests;
    }

    // 2. testsData.default가 배열인 경우
    if (Array.isArray((testsData as any).default)) {
      return (testsData as any).default;
    }

    // 3. testsData 자체가 배열처럼 보이는 경우
    if ("length" in testsData) {
      const arrayLike = testsData as any;
      if (typeof arrayLike.length === "number" && arrayLike.length > 0) {
        try {
          return Array.from(arrayLike) as Test[];
        } catch (e) {
          // Array.from 실패 시 계속 진행
        }
      }
    }
  }

  // 그 외의 경우 빈 배열 반환
  console.error(
    "Tests data is not loaded correctly. Expected array, got:",
    typeof testsData,
    Array.isArray(testsData),
    (testsData as any)?.constructor?.name,
    "keys:",
    Object.keys(testsData || {}),
    "testsData:",
    testsData,
  );
  return [];
}

/** 테스트 ID로 테스트 가져오기 */
export function getTestById(id: string): Test | undefined {
  return getAllTests().find((test) => test.id === id);
}

/** 테스트 요약 목록 가져오기 (홈 화면용) */
export function getTestSummaries(): TestSummary[] {
  return getAllTests().map((test) => ({
    id: test.id,
    title: test.title,
    thumbnailUrl: test.thumbnailUrl,
    playCount: test.playCount,
    likeCount: test.likeCount,
    category: test.category,
  }));
}

/** 카테고리별 테스트 가져오기 */
export function getTestsByCategory(category: string): Test[] {
  return getAllTests().filter((test) => test.category === category);
}

/** 인기 테스트 가져오기 (playCount 기준) */
export function getPopularTests(limit: number = 10): Test[] {
  return [...getAllTests()]
    .sort((a, b) => b.playCount - a.playCount)
    .slice(0, limit);
}

/** 최신 테스트 가져오기 */
export function getLatestTests(limit: number = 10): Test[] {
  return [...getAllTests()]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, limit);
}

/** 관련 테스트 가져오기 (같은 카테고리 또는 태그) */
export function getRelatedTests(testId: string, limit: number = 5): Test[] {
  const currentTest = getTestById(testId);
  if (!currentTest) return [];

  return getAllTests()
    .filter((test) => {
      if (test.id === testId) return false;
      if (test.category === currentTest.category) return true;
      return test.tags.some((tag) => currentTest.tags.includes(tag));
    })
    .slice(0, limit);
}

/** 테스트 검색 */
export function searchTests(query: string): Test[] {
  const lowerQuery = query.toLowerCase();
  return getAllTests().filter(
    (test) =>
      test.title.toLowerCase().includes(lowerQuery) ||
      test.description.toLowerCase().includes(lowerQuery) ||
      test.tags.some((tag) => tag.toLowerCase().includes(lowerQuery)),
  );
}

/** 초기 테스트 진행 상태 생성 */
export function createTestProgress(testId: string): TestProgress {
  const test = getTestById(testId);
  if (!test) {
    throw new Error(`Test not found: ${testId}`);
  }

  // 결과 유형별 초기 점수 0으로 설정
  const initialScores: Record<string, number> = {};
  test.results.forEach((result) => {
    initialScores[result.id] = 0;
  });

  return {
    testId,
    currentQuestionIndex: 0,
    answers: {},
    scores: initialScores,
  };
}

/** 답변 선택 시 점수 업데이트 */
export function updateProgressWithAnswer(
  progress: TestProgress,
  questionId: string,
  optionId: string,
): TestProgress {
  const test = getTestById(progress.testId);
  if (!test) return progress;

  const question = test.questions.find((q) => q.id === questionId);
  if (!question) return progress;

  const option = question.options.find((o) => o.id === optionId);
  if (!option) return progress;

  // 기존 답변이 있으면 해당 점수 제거
  const previousOptionId = progress.answers[questionId];
  const newScores = { ...progress.scores };

  if (previousOptionId) {
    const previousOption = question.options.find(
      (o) => o.id === previousOptionId,
    );
    if (previousOption) {
      Object.entries(previousOption.scores).forEach(([key, value]) => {
        newScores[key] = (newScores[key] || 0) - value;
      });
    }
  }

  // 새 답변 점수 추가
  Object.entries(option.scores).forEach(([key, value]) => {
    newScores[key] = (newScores[key] || 0) + value;
  });

  return {
    ...progress,
    answers: {
      ...progress.answers,
      [questionId]: optionId,
    },
    scores: newScores,
  };
}

/** 테스트 결과 계산 */
export function calculateResult(progress: TestProgress): TestResultState {
  const test = getTestById(progress.testId);
  if (!test) {
    throw new Error(`Test not found: ${progress.testId}`);
  }

  // MBTI 테스트인 경우 특별 처리
  if (test.id === "mbti-simple-test") {
    const mbtiResult = calculateMBTIResult(progress.scores);
    return {
      testId: progress.testId,
      resultId: mbtiResult,
      scores: progress.scores,
    };
  }

  // 혈액형 테스트인 경우 특별 처리
  if (test.id === "blood-type-test") {
    const bloodResult = calculateBloodTypeResult(progress.scores);
    return {
      testId: progress.testId,
      resultId: `type-${bloodResult}`,
      scores: progress.scores,
    };
  }

  // 일반적인 점수 기반 결과 계산
  // 가장 높은 점수를 가진 결과 찾기
  let maxScore = -Infinity;
  let resultId = test.results[0]?.id || "";

  // 먼저 minScore/maxScore 범위가 있는 결과 확인
  const totalScore = Object.values(progress.scores).reduce(
    (sum, score) => sum + score,
    0,
  );

  for (const result of test.results) {
    if (result.minScore !== undefined || result.maxScore !== undefined) {
      const min = result.minScore ?? -Infinity;
      const max = result.maxScore ?? Infinity;
      if (totalScore >= min && totalScore <= max) {
        resultId = result.id;
        break;
      }
    }
  }

  // 범위 기반이 아니면 가장 높은 점수 카테고리로
  if (
    !test.results.some(
      (r) => r.minScore !== undefined || r.maxScore !== undefined,
    )
  ) {
    Object.entries(progress.scores).forEach(([key, score]) => {
      if (score > maxScore) {
        maxScore = score;
        // 결과 ID가 점수 키와 일치하는지 확인
        const matchingResult = test.results.find(
          (r) => r.id === key || r.type === key,
        );
        if (matchingResult) {
          resultId = matchingResult.id;
        }
      }
    });
  }

  return {
    testId: progress.testId,
    resultId,
    scores: progress.scores,
  };
}

/** MBTI 결과 계산 */
function calculateMBTIResult(scores: Record<string, number>): string {
  const e_i = (scores["E"] || 0) > (scores["I"] || 0) ? "E" : "I";
  const s_n = (scores["S"] || 0) > (scores["N"] || 0) ? "S" : "N";
  const t_f = (scores["T"] || 0) > (scores["F"] || 0) ? "T" : "F";
  const j_p = (scores["J"] || 0) > (scores["P"] || 0) ? "J" : "P";

  return `${e_i}${s_n}${t_f}${j_p}`;
}

/** 혈액형 결과 계산 */
function calculateBloodTypeResult(scores: Record<string, number>): string {
  const types = ["A", "B", "O", "AB"];
  let maxType = "A";
  let maxScore = scores["A"] || 0;

  types.forEach((type) => {
    if ((scores[type] || 0) > maxScore) {
      maxScore = scores[type] || 0;
      maxType = type;
    }
  });

  return maxType;
}

/** 결과 정보 가져오기 */
export function getResultById(
  testId: string,
  resultId: string,
): Result | undefined {
  const test = getTestById(testId);
  if (!test) return undefined;

  return test.results.find((r) => r.id === resultId);
}

/** 숫자 포맷팅 (1000 -> 1K, 1000000 -> 1M) */
export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toLocaleString();
}

/** 진행률 계산 (퍼센트) */
export function calculateProgress(
  currentIndex: number,
  totalQuestions: number,
): number {
  if (totalQuestions === 0) return 0;
  return Math.round((currentIndex / totalQuestions) * 100);
}
