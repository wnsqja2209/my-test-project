"use client";

import { useState } from "react";
import Image from "next/image";
import { FileQuestion } from "lucide-react";
import type { Option } from "@/types/test";

interface OptionButtonProps {
  option: Option;
  isSelected: boolean;
  onSelect: (optionId: string) => void;
}

const OptionButton = ({ option, isSelected, onSelect }: OptionButtonProps) => {
  const [imageError, setImageError] = useState(false);

  return (
    <button
      type="button"
      onClick={() => onSelect(option.id)}
      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 option-select ${
        isSelected
          ? "border-primary bg-primary/5 shadow-md scale-[1.02]"
          : "border-gray-200 bg-white hover:border-primary/50 hover:shadow-sm"
      }`}
    >
      {/* 옵션 이미지 (있는 경우) */}
      {option.imageUrl && (
        <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/30 rounded-lg overflow-hidden mb-3">
          {!imageError ? (
            <Image
              src={option.imageUrl}
              alt={option.content}
              fill
              className="object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <FileQuestion className="w-8 h-8 text-primary/40" />
            </div>
          )}
        </div>
      )}

      {/* 옵션 텍스트 */}
      <span
        className={`font-medium ${
          isSelected ? "text-primary" : "text-gray-700"
        }`}
      >
        {option.content}
      </span>
    </button>
  );
};

export default OptionButton;
