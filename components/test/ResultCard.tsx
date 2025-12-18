"use client";

import { useState } from "react";
import Image from "next/image";
import { FileQuestion } from "lucide-react";
import type { Result } from "@/types/test";

interface ResultCardProps {
  result: Result;
  testTitle: string;
}

// 명시적 hex 색상 사용
const COLORS = {
  primary: "#6366f1",
  primaryLight: "rgba(99, 102, 241, 0.1)",
  primaryGradientStart: "rgba(99, 102, 241, 0.2)",
  primaryGradientEnd: "rgba(99, 102, 241, 0.4)",
  gray500: "#6b7280",
  gray600: "#4b5563",
  gray900: "#111827",
  white: "#ffffff",
};

const ResultCard = ({ result, testTitle }: ResultCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg animate-bounce-in"
      style={{ backgroundColor: COLORS.white }}
    >
      {/* 결과 이미지 */}
      <div
        className="relative aspect-square"
        style={{
          background: `linear-gradient(to bottom right, ${COLORS.primaryGradientStart}, ${COLORS.primaryGradientEnd})`,
        }}
      >
        {!imageError ? (
          <Image
            src={result.imageUrl}
            alt={result.title}
            fill
            className="object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <FileQuestion
              className="w-16 h-16"
              style={{ color: COLORS.primaryGradientEnd }}
            />
          </div>
        )}
      </div>

      {/* 결과 내용 */}
      <div className="p-6 text-center">
        {/* 테스트 제목 */}
        <p className="text-sm mb-2" style={{ color: COLORS.gray500 }}>
          {testTitle}
        </p>

        {/* 결과 타입 */}
        <div
          className="inline-block px-3 py-1 rounded-full mb-3"
          style={{ backgroundColor: COLORS.primaryLight }}
        >
          <span
            className="text-sm font-medium"
            style={{ color: COLORS.primary }}
          >
            {result.type}
          </span>
        </div>

        {/* 결과 제목 */}
        <h2
          className="text-2xl font-bold mb-4"
          style={{ color: COLORS.gray900 }}
        >
          {result.title}
        </h2>

        {/* 결과 설명 */}
        <p
          className="leading-relaxed whitespace-pre-line"
          style={{ color: COLORS.gray600 }}
        >
          {result.description}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
