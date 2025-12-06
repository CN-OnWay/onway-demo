import { Skeleton } from '@/components/ui/skeleton';
import classnames from 'classnames';

interface SkeletonCardProps {
  className?: string;
  styles?: React.CSSProperties;
}

export function SkeletonCard({ className, styles }: SkeletonCardProps) {
  return (
    <div
      className={classnames(
        'p-4 rounded-xl shadow-sm flex flex-col gap-2',
        className,
      )}
      style={styles}
    >
      <Skeleton className="rounded-xl h-full w-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  );
}
