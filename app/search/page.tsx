"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ArrowLeft } from "lucide-react";
import Link from "next/link";
import SearchBar from "@/components/home/SearchBar";
import TestCard from "@/components/home/TestCard";
import { searchTests } from "@/lib/test-utils";
import type { TestSummary } from "@/types/test";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<TestSummary[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (query) {
      setIsLoading(true);
      // 검색 실행
      const searchResults = searchTests(query).map((test) => ({
        id: test.id,
        title: test.title,
        thumbnailUrl: test.thumbnailUrl,
        playCount: test.playCount,
        likeCount: test.likeCount,
        category: test.category,
      }));
      setResults(searchResults);
      setIsLoading(false);
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center gap-3 h-14 px-4 max-w-lg mx-auto">
          {/* 뒤로가기 버튼 */}
          <Link
            href="/"
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link>

          {/* 검색 바 */}
          <div className="flex-1">
            <SearchBar initialQuery={query} autoFocus={!query} />
          </div>
        </div>
      </header>

      {/* 검색 결과 */}
      <main className="p-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-pulse text-gray-500">검색 중...</div>
          </div>
        ) : query ? (
          <>
            {/* 검색 결과 수 */}
            <div className="mb-4">
              <p className="text-sm text-gray-600">
                <span className="font-semibold text-primary">&quot;{query}&quot;</span>
                {" "}검색 결과{" "}
                <span className="font-semibold">{results.length}</span>개
              </p>
            </div>

            {results.length > 0 ? (
              <div className="grid grid-cols-2 gap-3">
                {results.map((test) => (
                  <TestCard key={test.id} test={test} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <Search className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 mb-2">검색 결과가 없습니다</p>
                <p className="text-sm text-gray-400">
                  다른 키워드로 검색해보세요
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Search className="w-12 h-12 text-gray-300 mb-4" />
            <p className="text-gray-500 mb-2">검색어를 입력해주세요</p>
            <p className="text-sm text-gray-400">
              테스트 제목, 설명, 태그로 검색할 수 있어요
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-gray-500">로딩 중...</div>
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
