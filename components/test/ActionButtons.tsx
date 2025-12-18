"use client";

import { useState, useEffect } from "react";
import { Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatNumber } from "@/lib/test-utils";
import { useLikes } from "@/hooks/use-likes";
import ShareModal from "@/components/shared/ShareModal";

interface ActionButtonsProps {
  testId: string;
  testTitle: string;
  initialLikeCount: number;
}

const ActionButtons = ({
  testId,
  testTitle,
  initialLikeCount,
}: ActionButtonsProps) => {
  const { isLiked: checkIsLiked, toggleLike } = useLikes();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // localStorage에서 상태 동기화
  useEffect(() => {
    setLiked(checkIsLiked(testId));
  }, [testId, checkIsLiked]);

  const handleLike = () => {
    const newLiked = toggleLike(testId);
    setLiked(newLiked);
    setLikeCount((prev) => (newLiked ? prev + 1 : prev - 1));
  };

  const handleShare = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="bg-white border-t border-gray-100">
      <div className="p-4 space-y-3">
        {/* 상단 버튼 그룹: 좋아요, 공유 */}
        <div className="flex items-center justify-center gap-2">
          <Button
            variant={liked ? "default" : "outline"}
            size="sm"
            onClick={handleLike}
            className="flex-1 gap-1.5"
          >
            <Heart
              className={`w-4 h-4 ${liked ? "fill-current" : ""}`}
            />
            <span>좋아요</span>
            <span className="text-xs opacity-70">{formatNumber(likeCount)}</span>
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            className="flex-1 gap-1.5"
          >
            <Share2 className="w-4 h-4" />
            <span>공유</span>
          </Button>
        </div>
      </div>

      {/* 공유 모달 */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title={testTitle}
        description={`${testTitle} 테스트를 해보세요!`}
      />
    </div>
  );
};

export default ActionButtons;
