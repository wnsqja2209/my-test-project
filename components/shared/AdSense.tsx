"use client";

import { useEffect, useRef } from "react";

interface AdSenseProps {
  adSlot?: string;
  adFormat?: "auto" | "rectangle" | "vertical" | "horizontal";
  style?: React.CSSProperties;
  className?: string;
  layout?: string;
  layoutKey?: string;
}

/**
 * @file AdSense.tsx
 * @description Google AdSense 광고 컴포넌트
 *
 * 이 컴포넌트는 Google AdSense 광고 단위를 렌더링합니다.
 * 스크립트는 app/layout.tsx에서 한 번만 로드되므로,
 * 이 컴포넌트는 ins 태그와 광고 초기화만 담당합니다.
 *
 * @dependencies
 * - NEXT_PUBLIC_ADSENSE_CLIENT_ID 환경 변수 필요
 */
export default function AdSense({
  adSlot,
  adFormat = "auto",
  style = { display: "block" },
  className = "",
  layout,
  layoutKey,
}: AdSenseProps) {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
  const adInitialized = useRef(false);
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!adClient || adInitialized.current) return;

    // 스크립트가 로드되었는지 확인
    if (typeof window === "undefined" || !(window as any).adsbygoogle) {
      return;
    }

    // ins 요소가 DOM에 있는지 확인
    if (!insRef.current) {
      return;
    }

    try {
      // 이미 광고가 있는지 확인
      if (insRef.current.hasAttribute("data-adsbygoogle-status")) {
        adInitialized.current = true;
        return;
      }

      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push(
        {},
      );
      adInitialized.current = true;
    } catch (err) {
      console.error("AdSense error:", err);
    }
  }, [adClient]);

  if (!adClient) {
    return null;
  }

  return (
    <ins
      ref={insRef}
      className={`adsbygoogle ${className}`}
      style={style}
      data-ad-client={adClient}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
      data-layout={layout}
      data-layout-key={layoutKey}
    />
  );
}
