"use client";

import { useRef, useState } from "react";
import TestCard from "./TestCard";
import type { TestSummary } from "@/types/test";

interface TestSectionProps {
  title: string;
  emoji?: string;
  tests: TestSummary[];
}

const TestSection = ({ title, emoji, tests }: TestSectionProps) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [hasMoved, setHasMoved] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (tests.length === 0) return null;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDown(true);
    setHasMoved(false);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !sliderRef.current) return;
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = x - startX;

    // 5px 이상 움직였을 때만 드래그로 인식
    if (Math.abs(walk) > 5) {
      setHasMoved(true);
      e.preventDefault();
      sliderRef.current.scrollLeft = scrollLeft - walk * 1.5;
    }
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  return (
    <section className="py-4">
      {/* 섹션 헤더 */}
      <div className="px-4 mb-3">
        <h2 className="text-lg font-bold text-gray-900">
          {emoji && <span className="mr-1">{emoji}</span>}
          {title}
        </h2>
      </div>

      {/* 가로 슬라이드 */}
      <div
        ref={sliderRef}
        className={`flex gap-3 px-4 overflow-x-auto scrollbar-hide select-none ${
          isDown && hasMoved ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        {tests.map((test) => (
          <div
            key={test.id}
            className="flex-shrink-0 w-[calc(40%-6px)]"
            style={{ pointerEvents: hasMoved ? "none" : "auto" }}
          >
            <TestCard test={test} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TestSection;
