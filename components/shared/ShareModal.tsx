"use client";

import { useState, useEffect, useRef } from "react";
import { Check, Copy, Link2, MessageCircle } from "lucide-react";
import { toast } from "sonner";
import { generateOgImageUrl } from "@/lib/image-utils";
import { getTestById } from "@/lib/test-utils";

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

    // 이미 스크립트가 있는지 확인 - 셀렉터 수정
    const existingScript = document.querySelector(
      'script[src*="kakao.com/sdk/js/kakao"]',
    );
    if (existingScript) {
      // 스크립트가 이미 로드되었는지 확인
      if (window.Kakao) {
        resolve();
      } else {
        // 스크립트가 로드 중이면 이벤트 리스너 추가
        existingScript.addEventListener("load", () => {
          // 약간의 지연을 두고 확인 (SDK 초기화 시간 확보)
          setTimeout(() => {
            if (window.Kakao) {
              resolve();
            } else {
              reject(new Error("Kakao SDK loaded but not available"));
            }
          }, 50);
        });
        existingScript.addEventListener("error", () => {
          reject(new Error("Failed to load existing Kakao SDK script"));
        });
      }
      return;
    }

    // 새 스크립트 생성
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
    script.async = true;
    script.onload = () => {
      // SDK가 완전히 준비될 때까지 약간의 지연
      setTimeout(() => {
        if (window.Kakao) {
          resolve();
        } else {
          reject(new Error("Kakao SDK loaded but not available"));
        }
      }, 50);
    };
    script.onerror = () => reject(new Error("Failed to load Kakao SDK"));
    document.head.appendChild(script);
  });
};
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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

const ShareModal = ({
  isOpen,
  onClose,
  title,
  description,
  url,
  testId,
  resultId,
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const [kakaoReady, setKakaoReady] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);
  const shareUrl =
    url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = description || title;

  // 카카오톡 공유 버튼용 URL (결과 페이지인 경우 테스트 페이지로)
  const buttonUrl = (() => {
    // 결과 페이지에서 카카오톡 공유 시 버튼은 테스트 페이지로
    if (testId && resultId && typeof window !== "undefined") {
      return `${window.location.origin}/test/${testId}`;
    }
    // 그 외의 경우는 shareUrl 사용
    return shareUrl;
  })();

  // 동적 OG 이미지 URL 생성
  const ogImageUrl = (() => {
    // 결과 페이지: resultId가 있으면 동적 OG 이미지 사용
    if (testId && resultId) {
      const url = generateOgImageUrl(testId, resultId);
      if (process.env.NODE_ENV === "development") {
        console.log("[ShareModal] 결과 페이지 OG 이미지 URL:", url);
      }
      return url;
    }

    // 테스트 페이지: testId만 있으면 cover 이미지 사용
    if (testId) {
      const test = getTestById(testId);
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[ShareModal] 테스트 정보:",
          test
            ? {
                id: test.id,
                title: test.title,
                coverImageUrl: test.coverImageUrl,
              }
            : "null",
        );
      }
      if (test?.coverImageUrl && typeof window !== "undefined") {
        // 상대 경로를 절대 경로로 변환
        const finalUrl = test.coverImageUrl.startsWith("http")
          ? test.coverImageUrl
          : `${window.location.origin}${test.coverImageUrl}`;
        if (process.env.NODE_ENV === "development") {
          console.log("[ShareModal] 테스트 페이지 OG 이미지 URL:", finalUrl);
        }
        return finalUrl;
      }
    }

    // 기본 로고 이미지
    if (process.env.NODE_ENV === "development") {
      console.log("[ShareModal] 기본 로고 이미지 사용");
    }
    if (typeof window !== "undefined") {
      return `${window.location.origin}/logo-1.png`;
    }
    // SSR fallback (실제로는 클라이언트 컴포넌트이므로 도달하지 않음)
    return "/logo-1.png";
  })();

  // 컴포넌트 마운트 상태 관리 및 cleanup
  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

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
    if (!kakaoReady || !window.Kakao || !window.Kakao.isInitialized()) {
      try {
        const kakaoKey = process.env.NEXT_PUBLIC_KAKAO_JS_KEY;
        if (!kakaoKey) {
          toast.error("카카오 키가 설정되지 않았습니다.");
          return;
        }
        await loadKakaoSDK();
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(kakaoKey);
        }
        // 상태 업데이트 추가
        setKakaoReady(true);
      } catch (error) {
        console.error("Kakao SDK initialization error:", error);
        toast.error(
          "카카오 SDK 로드에 실패했습니다. 페이지를 새로고침 해주세요.",
        );
        return;
      }
    }

    // 최종 확인
    if (!window.Kakao || !window.Kakao.isInitialized()) {
      toast.error(
        "카카오 SDK가 초기화되지 않았습니다. 페이지를 새로고침 해주세요.",
      );
      return;
    }

    try {
      if (process.env.NODE_ENV === "development") {
        console.log("[ShareModal] 카카오톡 공유 시작");
        console.log("[ShareModal] testId:", testId, "resultId:", resultId);
        console.log("[ShareModal] OG 이미지 URL:", ogImageUrl);
        console.log("[ShareModal] 공유 URL:", shareUrl);
        console.log("[ShareModal] 카카오톡 공유 API 호출:", {
          title,
          imageUrl: ogImageUrl,
          shareUrl,
        });
      }

      // 카카오톡으로 공유 (동적 OG 이미지 사용)
      window.Kakao.Share.sendDefault({
        objectType: "feed",
        content: {
          title: title,
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
              mobileWebUrl: buttonUrl,
              webUrl: buttonUrl,
            },
          },
        ],
      });

      if (process.env.NODE_ENV === "development") {
        console.log("[ShareModal] 카카오톡 공유 API 호출 완료");
      }
    } catch (error) {
      console.error("Kakao share error:", error);
      toast.error("공유하기에 실패했습니다. 다시 시도해주세요.");
    }
  };

  // 스레드(Threads) 공유
  const handleThreadsShare = () => {
    const threadsUrl = `https://www.threads.net/intent/post?text=${encodeURIComponent(shareText + "\n" + shareUrl)}`;
    window.open(threadsUrl, "_blank");
  };

  // 페이스북 공유
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank");
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
          <DialogDescription className="sr-only">
            테스트 결과를 다양한 소셜 미디어로 공유할 수 있습니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4 overflow-hidden w-full">
          {/* SNS 공유 버튼들 - 가로 스크롤 가능하도록 변경 */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4">
            {/* 카카오톡 */}
            <button
              type="button"
              onClick={handleKakaoShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#FEE500]">
                <KakaoIcon className="w-6 h-6 text-[#191919]" />
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                카카오톡
              </span>
            </button>

            {/* 스레드(Threads) */}
            <button
              type="button"
              onClick={handleThreadsShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black">
                <ThreadsIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                스레드
              </span>
            </button>

            {/* 페이스북 */}
            <button
              type="button"
              onClick={handleFacebookShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1877F2]">
                <FacebookIcon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs text-gray-600 whitespace-nowrap">
                페이스북
              </span>
            </button>

            {/* 기타 (Web Share API) */}
            {typeof navigator !== "undefined" && navigator.share && (
              <button
                type="button"
                onClick={handleNativeShare}
                className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors flex-shrink-0"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200">
                  <MessageCircle className="w-6 h-6 text-gray-600" />
                </div>
                <span className="text-xs text-gray-600 whitespace-nowrap">
                  더보기
                </span>
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;
