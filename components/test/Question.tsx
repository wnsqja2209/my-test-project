"use client";

import { useState } from "react";
import Image from "next/image";
import { FileQuestion } from "lucide-react";
import type { Question as QuestionType } from "@/types/test";

interface QuestionProps {
  question: QuestionType;
}

const Question = ({ question }: QuestionProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="space-y-4">
      {/* 질문 이미지 (있는 경우) */}
      {question.imageUrl && (
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/30 rounded-xl overflow-hidden">
          {!imageError ? (
            <Image
              src={question.imageUrl}
              alt="질문 이미지"
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FileQuestion className="w-12 h-12 text-primary/40" />
            </div>
          )}
        </div>
      )}

      {/* 질문 텍스트 */}
      <h2 className="text-xl font-bold text-gray-900 text-center leading-relaxed">
        {question.content}
      </h2>
    </div>
  );
};

export default Question;
