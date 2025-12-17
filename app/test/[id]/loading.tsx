import LoadingSpinner from "@/components/shared/LoadingSpinner";

export default function TestLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <LoadingSpinner size="lg" text="테스트 불러오는 중..." />
    </div>
  );
}
