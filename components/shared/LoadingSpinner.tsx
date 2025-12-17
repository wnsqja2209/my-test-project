interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-8 h-8",
  lg: "w-12 h-12",
};

const LoadingSpinner = ({
  size = "md",
  text,
  className = "",
}: LoadingSpinnerProps) => {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={`${sizeClasses[size]} border-2 border-gray-200 border-t-primary rounded-full animate-spin`}
      />
      {text && <p className="text-sm text-gray-500 animate-pulse">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
