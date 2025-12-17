"use client";

import { useCallback } from "react";
import { useLocalStorageSet } from "./use-local-storage";

const LIKES_STORAGE_KEY = "test-likes";

/**
 * 좋아요 관리 훅
 * localStorage를 사용하여 좋아요한 테스트 ID 목록 관리
 */
export function useLikes() {
  const { items, has, toggle } = useLocalStorageSet(LIKES_STORAGE_KEY);

  const isLiked = useCallback((testId: string) => has(testId), [has]);

  const toggleLike = useCallback(
    (testId: string): boolean => {
      return toggle(testId);
    },
    [toggle]
  );

  const likedTests = items;

  return {
    isLiked,
    toggleLike,
    likedTests,
  };
}
