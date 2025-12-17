/** 선택지 */
export interface Option {
  id: string;
  content: string;
  imageUrl?: string;
  /** 결과 유형별 점수 (resultId: score) */
  scores: Record<string, number>;
}

/** 질문 */
export interface Question {
  id: string;
  content: string;
  imageUrl?: string;
  options: Option[];
}

/** 테스트 결과 */
export interface Result {
  id: string;
  type: string;
  title: string;
  description: string;
  imageUrl: string;
  minScore?: number;
  maxScore?: number;
}

/** 테스트 카테고리 */
export type TestCategory = "personality" | "love" | "fun" | "mbti" | "etc";

/** 테스트 */
export interface Test {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  coverImageUrl: string;
  /** 예상 소요시간 (분) */
  estimatedTime: number;
  playCount: number;
  likeCount: number;
  bookmarkCount: number;
  recommendCount: number;
  category: TestCategory;
  tags: string[];
  questions: Question[];
  results: Result[];
  createdAt: string;
}

/** 테스트 목록용 요약 정보 */
export interface TestSummary {
  id: string;
  title: string;
  thumbnailUrl: string;
  playCount: number;
  likeCount: number;
  category: TestCategory;
}

/** 테스트 진행 상태 */
export interface TestProgress {
  testId: string;
  currentQuestionIndex: number;
  answers: Record<string, string>; // questionId: optionId
  scores: Record<string, number>; // resultId: totalScore
}

/** 테스트 결과 상태 */
export interface TestResultState {
  testId: string;
  resultId: string;
  scores: Record<string, number>;
}
