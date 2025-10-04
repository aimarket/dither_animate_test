import { cn } from '@/lib/utils/cn';

interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

export function Loading({ size = 'md', className, text }: LoadingProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4',
  };

  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-solid border-blue-500 border-t-transparent',
          sizeClasses[size]
        )}
      />
      {text && <p className="text-sm text-gray-400">{text}</p>}
    </div>
  );
}

export function LoadingSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('animate-pulse bg-white/10 rounded', className)} />
  );
}

export function PageLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <Loading size="lg" text="Loading..." />
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white/5 backdrop-blur rounded-lg border border-white/10 p-6 space-y-4">
      <LoadingSkeleton className="h-6 w-1/3" />
      <LoadingSkeleton className="h-4 w-2/3" />
      <LoadingSkeleton className="h-4 w-1/2" />
      <div className="flex gap-2">
        <LoadingSkeleton className="h-8 w-20" />
        <LoadingSkeleton className="h-8 w-20" />
      </div>
    </div>
  );
}
