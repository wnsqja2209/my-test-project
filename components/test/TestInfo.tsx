"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, Eye, FileQuestion } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/test-utils";
import type { Test } from "@/types/test";

interface TestInfoProps {
  test: Test;
}

const TestInfo = ({ test }: TestInfoProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white">
      {/* 커버 이미지 */}
      <div className="relative aspect-[4/3] bg-gray-50">
        {!imageError ? (
          <Image
            src={test.coverImageUrl}
            alt={test.title}
            fill
            className="object-contain"
            priority
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-20 h-20 text-primary/40" />
          </div>
        )}
      </div>

      {/* 테스트 정보 */}
      <div className="p-4 space-y-4">
        {/* 제목 */}
        <h1 className="text-2xl font-bold text-gray-900">{test.title}</h1>

        {/* 설명 */}
        <p className="text-gray-600 leading-relaxed">{test.description}</p>

        {/* 통계 정보 */}
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            예상 {test.estimatedTime}분
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {formatNumber(test.playCount)}회 참여
          </span>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {test.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 테스트 시작 버튼 */}
        <Link href={`/test/${test.id}/play`} className="block pt-2">
          <Button className="w-full h-12 text-base font-semibold">
            테스트 시작하기
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TestInfo;
