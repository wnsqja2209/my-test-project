"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";

interface BannerItem {
  id: string;
  imageUrl: string;
  link: string;
  alt: string;
}

const banners: BannerItem[] = [
  {
    id: "1",
    imageUrl: "/banner/year-review-test.png",
    link: "/test/year-review-test",
    alt: "연말에 체크해 보는, 나는 MBTI가 변했을까?",
  },
  {
    id: "2",
    imageUrl: "/banner/dubai-cookie-test.png",
    link: "/test/dubai-cookie-test",
    alt: "내가 만약 두바이 쫀득 쿠키라면?",
  },
  {
    id: "3",
    imageUrl: "/banner/ghibli-character-test.png",
    link: "/test/ghibli-character-test",
    alt: "나는 에겐일까 테토일까?",
  },
  {
    id: "4",
    imageUrl: "/banner/mbti-simple-test.png",
    link: "/test/mbti-simple-test",
    alt: "간단 MBTI 성격 유형 테스트",
  },
  {
    id: "5",
    imageUrl: "/banner/empathy-test.png",
    link: "/test/empathy-test",
    alt: "나의 공감능력 테스트",
  },
  {
    id: "6",
    imageUrl: "/banner/fantasy-job-test.png",
    link: "/test/fantasy-job-test",
    alt: "판타지 세계에 소환된다면, 당신의 직업은?",
  },
];

export default function BannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    // 5초 후 자동 재생 재개
    setTimeout(() => setIsAutoPlaying(true), 5000);
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, goToNext]);

  // 터치 스와이프 지원
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
    if (isRightSwipe) {
      goToPrev();
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 5000);
    }
  };

  return (
    <div className="relative w-full overflow-hidden bg-gray-100">
      {/* 슬라이드 컨테이너 */}
      <div
        className="relative aspect-[2/1] w-full"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {banners.map((banner, index) => (
          <Link
            key={banner.id}
            href={banner.link}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <Image
              src={banner.imageUrl}
              alt={banner.alt}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </Link>
        ))}
      </div>

      {/* 인디케이터 */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex
                ? "bg-white w-6"
                : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`배너 ${index + 1}로 이동`}
          />
        ))}
      </div>
    </div>
  );
}
