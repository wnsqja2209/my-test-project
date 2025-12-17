"use client";

import { useState } from "react";
import Image from "next/image";
import { FileQuestion } from "lucide-react";
import type { Result } from "@/types/test";

interface ResultCardProps {
  result: Result;
  testTitle: string;
}

const ResultCard = ({ result, testTitle }: ResultCardProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg animate-bounce-in">
      {/* 결과 이미지 */}
      <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-primary/40">
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
            <FileQuestion className="w-16 h-16 text-primary/40" />
          </div>
        )}
      </div>

      {/* 결과 내용 */}
      <div className="p-6 text-center">
        {/* 테스트 제목 */}
        <p className="text-sm text-gray-500 mb-2">{testTitle}</p>

        {/* 결과 타입 */}
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-full mb-3">
          <span className="text-sm font-medium text-primary">{result.type}</span>
        </div>

        {/* 결과 제목 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">{result.title}</h2>

        {/* 결과 설명 */}
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {result.description}
        </p>
      </div>
    </div>
  );
};

export default ResultCard;
