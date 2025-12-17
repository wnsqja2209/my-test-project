"use client";

import { useState } from "react";
import { Check, Copy, Link2, MessageCircle } from "lucide-react";
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
}

// X (Twitter) 아이콘
const XIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
}: ShareModalProps) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = description || title;

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

  // 카카오톡 공유
  const handleKakaoShare = () => {
    // 카카오톡 SDK가 없으면 모바일 앱 링크로 이동
    const kakaoUrl = `https://story.kakao.com/share?url=${encodeURIComponent(shareUrl)}`;
    window.open(kakaoUrl, "_blank", "width=600,height=400");
  };

  // X (Twitter) 공유
  const handleXShare = () => {
    const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(xUrl, "_blank", "width=600,height=400");
  };

  // 페이스북 공유
  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(facebookUrl, "_blank", "width=600,height=400");
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">공유하기</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
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

            {/* X (Twitter) */}
            <button
              type="button"
              onClick={handleXShare}
              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black">
                <XIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xs text-gray-600">X</span>
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
          <div className="flex items-center gap-2 p-3 bg-gray-100 rounded-lg overflow-hidden max-w-full">
            <Link2 className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="flex-1 min-w-0 text-sm text-gray-600 truncate break-all overflow-hidden">
              {shareUrl}
            </span>
            <Button
              size="sm"
              variant={copied ? "default" : "outline"}
              onClick={handleCopyLink}
              className="shrink-0"
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
