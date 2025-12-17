"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import TestCard from "@/components/home/TestCard";
import type { TestSummary } from "@/types/test";

interface RelatedTestsProps {
  tests: TestSummary[];
  title?: string;
  emoji?: string;
  showMoreLink?: boolean;
  moreHref?: string;
}

const RelatedTests = ({
  tests,
  title = "비슷한 테스트",
  emoji = "🎯",
  showMoreLink = true,
  moreHref = "/",
}: RelatedTestsProps) => {
  if (tests.length === 0) {
    return null;
  }

  return (
    <section className="bg-white">
      <div className="p-4">
        {/* 헤더 */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">
            {title} {emoji}
          </h2>
          {showMoreLink && (
            <Link
              href={moreHref}
              className="flex items-center text-sm text-primary font-medium hover:opacity-80 transition-opacity"
            >
              더보기
              <ChevronRight className="w-4 h-4" />
            </Link>
          )}
        </div>

        {/* 테스트 카드 그리드 */}
        <div className="grid grid-cols-2 gap-3">
          {tests.map((test) => (
            <TestCard key={test.id} test={test} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTests;
