import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center">
      {/* 404 이모지 */}
      <div className="text-8xl mb-6 animate-bounce-in">🔍</div>

      {/* 제목 */}
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        페이지를 찾을 수 없어요
      </h1>

      {/* 설명 */}
      <p className="text-gray-500 mb-8 max-w-sm">
        요청하신 페이지가 존재하지 않거나 이동되었을 수 있어요.
        <br />
        다른 재미있는 테스트를 찾아보세요!
      </p>

      {/* 버튼들 */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
        <Button asChild className="flex-1">
          <Link href="/">
            <Home className="w-4 h-4 mr-2" />
            홈으로 가기
          </Link>
        </Button>
        <Button asChild variant="outline" className="flex-1">
          <Link href="/search">
            <Search className="w-4 h-4 mr-2" />
            테스트 검색
          </Link>
        </Button>
      </div>
    </div>
  );
}
