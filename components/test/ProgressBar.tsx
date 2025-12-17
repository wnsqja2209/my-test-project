interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className="w-full">
      {/* 진행 상태 텍스트 */}
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-gray-600">
          질문 <span className="font-semibold text-primary">{current}</span> / {total}
        </span>
        <span className="text-gray-500">{percentage}%</span>
      </div>

      {/* 프로그레스 바 */}
      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
