"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AdSense from "./AdSense";

/**
 * @file AdSenseModal.tsx
 * @description Google AdSense 광고를 모달 다이얼로그로 표시하는 컴포넌트
 *
 * 이 컴포넌트는 페이지 로드 시 자동으로 모달을 열어 광고를 표시합니다.
 * 사용자가 X 버튼을 클릭하여 모달을 닫을 수 있습니다.
 *
 * @dependencies
 * - @/components/ui/dialog: Dialog 컴포넌트
 * - @/components/shared/AdSense: AdSense 광고 컴포넌트
 */
export default function AdSenseModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 자동으로 모달 열기
    setOpen(true);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-lg p-0 overflow-hidden">
        <DialogHeader className="px-6 pt-6 pb-4">
          <DialogTitle className="text-sm font-medium text-gray-500">
            광고
          </DialogTitle>
        </DialogHeader>
        <div className="px-6 pb-6">
          <AdSense
            adFormat="auto"
            className="w-full"
            style={{ minHeight: "250px", display: "block" }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

