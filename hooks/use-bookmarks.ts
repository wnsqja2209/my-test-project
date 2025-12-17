"use client";

import { useCallback } from "react";
import { useLocalStorageSet } from "./use-local-storage";

const BOOKMARKS_STORAGE_KEY = "test-bookmarks";

/**
 * 북마크 관리 훅
 * localStorage를 사용하여 북마크한 테스트 ID 목록 관리
 */
export function useBookmarks() {
  const { items, has, toggle } = useLocalStorageSet(BOOKMARKS_STORAGE_KEY);

  const isBookmarked = useCallback((testId: string) => has(testId), [has]);

  const toggleBookmark = useCallback(
    (testId: string): boolean => {
      return toggle(testId);
    },
    [toggle]
  );

  const bookmarkedTests = items;

  return {
    isBookmarked,
    toggleBookmark,
    bookmarkedTests,
  };
}
