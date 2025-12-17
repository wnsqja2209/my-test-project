"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * localStorage를 사용하는 커스텀 훅
 * SSR 환경에서도 안전하게 작동
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // 초기값 가져오기 (SSR 안전)
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [isInitialized, setIsInitialized] = useState(false);

  // 클라이언트에서 localStorage 값 로드
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
    }
    setIsInitialized(true);
  }, [key]);

  // 값 설정 함수
  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.warn(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

/**
 * localStorage에 Set을 저장하는 커스텀 훅
 * 좋아요, 북마크 등 ID 목록 관리에 유용
 */
export function useLocalStorageSet(
  key: string
): {
  items: Set<string>;
  has: (id: string) => boolean;
  add: (id: string) => void;
  remove: (id: string) => void;
  toggle: (id: string) => boolean;
  clear: () => void;
} {
  const [items, setItems] = useLocalStorage<string[]>(key, []);

  const itemSet = new Set(items);

  const has = useCallback((id: string) => itemSet.has(id), [itemSet]);

  const add = useCallback(
    (id: string) => {
      if (!itemSet.has(id)) {
        setItems([...items, id]);
      }
    },
    [items, itemSet, setItems]
  );

  const remove = useCallback(
    (id: string) => {
      setItems(items.filter((item) => item !== id));
    },
    [items, setItems]
  );

  const toggle = useCallback(
    (id: string): boolean => {
      if (itemSet.has(id)) {
        remove(id);
        return false;
      } else {
        add(id);
        return true;
      }
    },
    [itemSet, add, remove]
  );

  const clear = useCallback(() => {
    setItems([]);
  }, [setItems]);

  return {
    items: itemSet,
    has,
    add,
    remove,
    toggle,
    clear,
  };
}
