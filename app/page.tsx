import TestSection from "@/components/home/TestSection";
import {
  getPopularTests,
  getLatestTests,
  getTestsByCategory,
} from "@/lib/test-utils";
import type { TestSummary } from "@/types/test";

// 테스트를 TestSummary 형태로 변환
function toSummary(tests: ReturnType<typeof getPopularTests>): TestSummary[] {
  return tests.map((test) => ({
    id: test.id,
    title: test.title,
    thumbnailUrl: test.thumbnailUrl,
    playCount: test.playCount,
    likeCount: test.likeCount,
    category: test.category,
  }));
}

export default function Home() {
  const popularTests = toSummary(getPopularTests(4));
  const latestTests = toSummary(getLatestTests(4));
  const personalityTests = toSummary(
    getTestsByCategory("personality").slice(0, 4),
  );
  const funTests = toSummary(getTestsByCategory("fun").slice(0, 4));
  const mbtiTests = toSummary(getTestsByCategory("mbti").slice(0, 4));

  return (
    <div className="pb-8">
      {/* 인기 테스트 */}
      <TestSection title="인기 테스트" emoji="🔥" tests={popularTests} />

      {/* 최신 테스트 */}
      <TestSection title="최신 테스트" emoji="🆕" tests={latestTests} />

      {/* 성격 테스트 */}
      <TestSection title="성격 테스트" emoji="🧠" tests={personalityTests} />

      {/* MBTI 테스트 */}
      <TestSection title="MBTI 테스트" emoji="💫" tests={mbtiTests} />

      {/* 재미 테스트 */}
      <TestSection title="재미 테스트" emoji="🎮" tests={funTests} />
    </div>
  );
}
