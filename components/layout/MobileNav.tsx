"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X, Home, Sparkles, Heart, BookMarked, Info } from "lucide-react";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { href: "/", label: "홈", icon: Home },
  { href: "/?category=popular", label: "인기 테스트", icon: Sparkles },
  { href: "/?category=love", label: "연애 테스트", icon: Heart },
  { href: "/bookmarks", label: "북마크", icon: BookMarked },
  { href: "/about", label: "서비스 소개", icon: Info },
];

const MobileNav = ({ isOpen, onClose }: MobileNavProps) => {
  // ESC 키로 닫기
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* 오버레이 */}
      <div
        className="fixed inset-0 z-50 bg-black/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* 사이드 패널 */}
      <nav
        className="fixed top-0 left-0 z-50 w-72 h-full bg-white shadow-xl transform transition-transform duration-300 ease-out"
        role="dialog"
        aria-modal="true"
        aria-label="메인 메뉴"
      >
        {/* 헤더 */}
        <div className="flex items-center justify-between h-14 px-4 border-b border-gray-100">
          <span className="text-xl font-bold text-primary">MOAB</span>
          <button
            type="button"
            onClick={onClose}
            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="메뉴 닫기"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 메뉴 리스트 */}
        <ul className="py-2">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors"
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        {/* 푸터 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 text-center">
            © 2024 MOAB. All rights reserved.
          </p>
        </div>
      </nav>
    </>
  );
};

export default MobileNav;
