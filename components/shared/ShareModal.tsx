"use client";

import { useState, useEffect } from "react";
import { Check, Copy, Link2, MessageCircle, Download, Loader2 } from "lucide-react";
import { generateOgImageUrl } from "@/lib/image-utils";

declare global {
  interface Window {
    Kakao: {
      init: (key: string) => void;
      isInitialized: () => boolean;
      Share: {
        sendDefault: (options: {
          objectType: string;
          content: {
            title: string;
            description: string;
            imageUrl: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          };
          buttons?: Array<{
            title: string;
            link: {
              mobileWebUrl: string;
              webUrl: string;
            };
          }>;
        }) => void;
      };
    };
  }
}

// 카카오 SDK 스크립트 로드 함수
const loadKakaoSDK = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    // 이미 로드되어 있으면 바로 resolve
    if (typeof window !== "undefined" && window.Kakao) {
      resolve();
      return;
    }

    // 이미 스크립트가 있는지 확인
    const existingScript = document.querySelector(
      'script[src*="kakao_js_sdk"]'
    );
    if (existingScript) {
      // 스크립트가 이미 로드되었는지 확인
      if (window.Kakao) {
        resolve();
      } else {
        existingScript.addEventListener("load", () => resolve());
      }
      return;
    }

    // 새 스크립트 생성
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Kakao SDK"));
    document.head.appendChild(script);
  });
};
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  url?: string;
  testId?: string;
  resultId?: string;
  onDownloadImage?: () => Promise<void>;
}

// 스레드(Threads) 공식 아이콘 - @ 모양
const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 192 192"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M141.537 88.9883C140.71 88.5919 139.87 88.2104 139.019 87.8451C137.537 60.5382 122.616 44.905 97.5619 44.745C97.4484 44.7443 97.3355 44.7443 97.222 44.7443C82.2364 44.7443 69.7731 51.1409 62.102 62.7807L75.881 72.2328C81.6116 63.5383 90.6052 61.6848 97.2286 61.6848C97.3051 61.6848 97.3819 61.6848 97.4576 61.6855C105.707 61.7381 111.932 64.1366 115.961 68.814C118.893 72.2193 120.854 76.925 121.825 82.8638C114.511 81.6207 106.601 81.2385 98.145 81.7233C74.3247 83.0954 59.0111 96.9879 60.0396 116.292C60.5615 126.084 65.4397 134.508 73.775 140.011C80.8224 144.663 89.899 146.938 99.3323 146.423C111.79 145.74 121.563 140.987 128.381 132.296C133.559 125.696 136.834 117.143 138.28 106.366C144.217 109.949 148.617 114.664 151.047 120.332C155.179 129.967 155.42 145.8 142.501 158.708C131.182 170.016 117.576 174.908 97.0135 175.059C74.2042 174.89 56.9538 167.575 45.7381 153.317C35.2355 139.966 29.8077 120.682 29.6052 96C29.8077 71.3178 35.2355 52.0336 45.7381 38.6827C56.9538 24.4249 74.2039 17.11 97.0132 16.9405C120.004 17.1119 137.48 24.4614 149.011 38.788C154.614 45.8136 158.794 54.6488 161.56 65.2227L177.248 60.8382C173.823 47.7306 168.377 36.4133 160.895 27.0166C146.166 8.85183 124.959 -0.143942 97.0695 0.000528181C96.3889 0.00418311 95.7113 0.00773456 95.0373 0.0113174C65.8112 0.278572 43.8413 11.1686 29.4257 29.3913C16.4289 45.804 9.78453 67.6284 9.60547 95.9613L9.60596 96.0387C9.78453 124.372 16.4289 146.196 29.4257 162.609C43.8413 180.831 65.8112 191.722 95.0373 191.989C95.7113 191.992 96.3889 191.996 97.0695 192C124.959 192.144 146.166 183.148 160.895 164.984C180.6 140.329 178.614 108.917 162.833 91.6151C155.294 83.3462 144.929 77.9224 131.631 75.7259C131.631 75.7259 131.631 75.726 131.631 75.726L141.537 88.9883ZM99.4325 129.507C88.4272 130.131 77.8169 125.463 77.1361 115.071C76.6217 107.413 82.2728 99.0076 98.5529 98.0026C101.125 97.8526 103.632 97.7835 106.076 97.7835C111.492 97.7835 116.602 98.248 121.348 99.1487C119.256 123.167 108.393 128.999 99.4325 129.507Z"
    />
  </svg>
);

// 카카오톡 아이콘
const KakaoIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 3C6.477 3 2 6.463 2 10.691c0 2.65 1.734 4.974 4.38 6.323-.142.518-.913 3.333-.941 3.548 0 0-.019.157.083.217.101.06.22.013.22.013.293-.042 3.395-2.235 3.929-2.617.75.112 1.534.17 2.329.17 5.523 0 10-3.463 10-7.654S17.523 3 12 3" />
  </svg>
);

// 페이스북 아이콘
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

// 인스타그램 아이콘
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
  </svg>
);

const ShareModal = ({
  isOpen,
  onClose,
  title,
  description,
  url,
  testId,
  resultId,
  onDownloadImage,
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = description || title;

  // 동적 OG 이미지 URL 생성
  const ogImageUrl =
    testId && resultId
      ? generateOgImageUrl(testId, resultId)
      : "https://our-play.vercel.app/logo-1.png";

  // 카카오 SDK 로드 및 초기화
  useEffect(() => {
    const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
    if (!kakaoKey) {
      console.error("NEXT_PUBLIC_KAKAO_JS_KEY is not set");
      return;
    }

    const initKakao = async () => {
      try {
        await loadKakaoSDK();
        if (window.Kakao && !window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey);
        }
        setKakaoReady(true);
      } catch (error) {
        console.error("Failed to initialize Kakao SDK:", error);
      }
    };

    initKakao();
  }, []);

  // 링크 복사
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
    }
  };

  // 카카오톡 공유 - Kakao SDK 사용
  const handleKakaoShare = async () => {
    if (typeof window === "undefined") return;

    // SDK가 준비되지 않았으면 로드 시도
    if (!kakaoReady || !window.Kakao) {
      try {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (!kakaoKey) {
          alert("카카오 키가 설정되지 않았습니다.");
          return;
        }
        await loadKakaoSDK();
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey);
        }
      } catch {
        alert("카카오 SDK 로드에 실패했습니다. 페이지를 새로고침 해주세요.");
        return;
      }
    }

    // 카카오톡으로 공유 (동적 OG 이미지 사용)
    window.Kakao.Share.sendDefault({
      objectType: "feed",
      content: {
        title: title,
        description: shareText,
        imageUrl: ogImageUrl,
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
      buttons: [
        {
          title: "테스트 하러가기",
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      ],
    });
  };

  // 이미지 다운로드 핸들러
  const handleDownloadImage = async () => {
    if (!onDownloadImage) return;

    setIsDownloading(true);
    try {
      await onDownloadImage();
    } finally {
      setIsDownloading(false);
    }
  };

  // 스레드(Threads) 공유
  const handleThreadsShare = () => {
    const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`;
    window.open(threadsUrl, "_blank", "width=600,height=600");
  };

  // 페이스북 공유
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
  };

  // 인스타그램 공유 - 인스타그램 웹사이트로 연결
  const handleInstagramShare = () => {
    // 인스타그램은 직접 공유 API가 없어서 인스타그램 웹사이트로 이동
    window.open("https://www.instagram.com/", "_blank", "width=600,height=600");
  };

  // 기본 공유 (Web Share API)
  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
        onClose();
      } catch (error) {
        // 사용자가 취소한 경우
        console.log("Share cancelled:", error);
      }
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-lg w-[calc(100%-2rem)] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-center">공유하기</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 overflow-hidden w-full">
          {/* SNS 공유 버튼들 */}
          <div className="flex justify-center gap-4">
            {/* 카카오톡 */}
            <button
              type="button"
              onClick={handleKakaoShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FEE500]">
                <KakaoIcon className="w-6 h-6 text-[#191919]" />
              </div>
              <span className="text-xs text-gray-600">카카오톡</span>
            </button>

            {/* 스레드(Threads) */}
            <button
              type="button"
              onClick={handleThreadsShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black">
                <ThreadsIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">스레드</span>
            </button>

            {/* 페이스북 */}
            <button
              type="button"
              onClick={handleFacebookShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2]">
                <FacebookIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">페이스북</span>
            </button>

            {/* 인스타그램 */}
            <button
              type="button"
              onClick={handleInstagramShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-tr from-[#FFDC80] via-[#F56040] to-[#C13584]">
                <InstagramIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600">인스타그램</span>
            </button>

            {/* 기타 (Web Share API) */}
            {typeof navigator !== "undefined" && navigator.share && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                  <MessageCircle className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-xs text-gray-600">더보기</span>
              </button>
            )}
          </div>

          {/* 링크 복사 */}
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg overflow-hidden w-full box-border">
            <Link2 className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-600 truncate overflow-hidden flex-1 min-w-0 max-w-[calc(100%-100px)]">
              {shareUrl}
            </span>
            <Button
              size="sm"
              variant={copied ? "default" : "outline"}
              onClick={handleCopyLink}
              className="flex-shrink-0 ml-auto"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  복사됨
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 mr-1" />
                  복사
                </>
              )}
            </Button>
          </div>

          {/* 이미지 다운로드 버튼 */}
          {onDownloadImage && (
            <div className="border-t pt-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleDownloadImage}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    이미지 생성 중...
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 mr-2" />
                    결과 이미지 저장
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
