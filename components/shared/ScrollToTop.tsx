"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * @file ScrollToTop.tsx
 * @description 페이지 전환 시 스크롤을 맨 위로 초기화하는 컴포넌트
 *
 * 이 컴포넌트는 Next.js의 usePathname 훅을 사용하여 경로 변경을 감지하고,
 * 경로가 변경될 때마다 스크롤 위치를 맨 위로 초기화합니다.
 *
 * 주요 기능:
 * - 경로 변경 감지 (usePathname)
 * - 스크롤 즉시 초기화 (window.scrollTo)
 * - UI 렌더링 없음 (null 반환)
 *
 * @dependencies
 * - next/navigation: usePathname 훅
 * - react: useEffect 훅
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    // 페이지 전환 시 스크롤을 맨 위로 즉시 이동
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

