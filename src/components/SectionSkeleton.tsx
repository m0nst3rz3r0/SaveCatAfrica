type SectionSkeletonProps = {
  className?: string;
};

export function SectionSkeleton({ className = "" }: SectionSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-border-theme/40 rounded-2xl h-64 ${className}`}
      aria-hidden="true"
    />
  );
}
