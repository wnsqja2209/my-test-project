"use client";

import { useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import SearchBar from "@/components/home/SearchBar";
import AdSense from "@/components/shared/AdSense";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="flex items-center justify-center h-14 px-4 max-w-lg mx-auto relative">
          {/* 로고 */}
          <Link
            href="/"
            className="text-base font-bold logo-gradient absolute"
            style={{ fontFamily: "var(--font-press-start)" }}
          >
            MOAB
          </Link>

          {/* 검색 버튼 */}
          <button
            type="button"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="p-2 -mr-2 text-gray-600 hover:text-gray-900 transition-colors absolute right-4"
            aria-label="검색"
          >
            {isSearchOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Search className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* 검색 바 */}
        {isSearchOpen && (
          <div className="px-4 pb-3 border-t border-gray-100 bg-white">
            <div className="mt-3">
              <SearchBar autoFocus />
            </div>
          </div>
        )}
      </header>

      {/* 작은 배너 광고 */}
      <div className="w-full flex justify-center py-2">
        <div className="w-full max-w-lg px-4">
          <AdSense
            adFormat="horizontal"
            className="w-full"
            style={{
              minHeight: "50px",
              display: "block",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default Header;
