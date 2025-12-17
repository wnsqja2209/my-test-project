"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Eye, Heart, FileQuestion } from "lucide-react";
import { formatNumber } from "@/lib/test-utils";
import type { TestSummary } from "@/types/test";

interface TestCardProps {
  test: TestSummary;
}

const TestCard = ({ test }: TestCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={`/test/${test.id}`}
      className="group block bg-white rounded-xl overflow-hidden shadow-sm card-hover select-none"
      draggable={false}
    >
      {/* 썸네일 이미지 */}
      <div className="relative aspect-[3/4] bg-gradient-to-br from-primary/10 to-primary/30 overflow-hidden">
        {!imageError ? (
          <Image
            src={test.thumbnailUrl}
            alt={test.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 pointer-events-none"
            sizes="(max-width: 640px) 50vw, 200px"
            onError={() => setImageError(true)}
            draggable={false}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion className="w-12 h-12 text-primary/40" />
          </div>
        )}
      </div>

      {/* 카드 정보 */}
      <div className="p-3">
        {/* 제목 (2줄 제한) */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2 leading-tight min-h-[2.5rem]">
          {test.title}
        </h3>

        {/* 통계 */}
        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5" />
            {formatNumber(test.playCount)}
          </span>
          <span className="flex items-center gap-1">
            <Heart className="w-3.5 h-3.5" />
            {formatNumber(test.likeCount)}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TestCard;
