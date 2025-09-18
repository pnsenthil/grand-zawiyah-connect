// Loading States Components for Grand Zawiyah
// Provides various loading state components for different use cases

import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Skeleton Components
export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <Card className={cn('w-full', className)}>
    <CardHeader>
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-3 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-5/6 mb-2" />
      <Skeleton className="h-3 w-4/6" />
    </CardContent>
  </Card>
);

export const SkeletonList: React.FC<{ 
  count?: number; 
  className?: string;
  showAvatar?: boolean;
}> = ({ count = 3, className, showAvatar = false }) => (
  <div className={cn('space-y-4', className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="flex items-center space-x-4">
        {showAvatar && <Skeleton className="h-12 w-12 rounded-full" />}
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
    ))}
  </div>
);

export const SkeletonTable: React.FC<{ 
  rows?: number; 
  columns?: number;
  className?: string;
}> = ({ rows = 5, columns = 4, className }) => (
  <div className={cn('space-y-3', className)}>
    {/* Header */}
    <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
      {Array.from({ length: columns }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-full" />
      ))}
    </div>
    {/* Rows */}
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton key={colIndex} className="h-3 w-full" />
        ))}
      </div>
    ))}
  </div>
);

export const SkeletonForm: React.FC<{ 
  fields?: number;
  className?: string;
}> = ({ fields = 4, className }) => (
  <div className={cn('space-y-6', className)}>
    {Array.from({ length: fields }).map((_, i) => (
      <div key={i} className="space-y-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-10 w-full" />
      </div>
    ))}
    <div className="flex gap-3">
      <Skeleton className="h-10 w-24" />
      <Skeleton className="h-10 w-24" />
    </div>
  </div>
);

// Loading Overlay
interface LoadingOverlayProps {
  isLoading: boolean;
  children: React.ReactNode;
  text?: string;
  className?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isLoading, 
  children, 
  text = 'Loading...',
  className 
}) => {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={cn('relative', className)}>
      {children}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2" />
          <p className="text-sm text-gray-600">{text}</p>
        </div>
      </div>
    </div>
  );
};

// Loading Button
interface LoadingButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
  loadingText?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export const LoadingButton: React.FC<LoadingButtonProps> = ({ 
  isLoading, 
  children, 
  loadingText = 'Loading...',
  className,
  disabled,
  onClick 
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors',
        'bg-primary text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      disabled={isLoading || disabled}
      onClick={onClick}
    >
      {isLoading ? (
        <>
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

// Loading Spinner with different sizes and styles
interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'white' | 'gray';
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ 
  size = 'md', 
  color = 'primary',
  className 
}) => {
  const sizeClasses = {
    xs: 'h-3 w-3',
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12'
  };

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    white: 'border-white',
    gray: 'border-gray-400'
  };

  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-transparent',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
};

// Pulse Loading Animation
export const PulseLoader: React.FC<{ 
  className?: string;
  count?: number;
}> = ({ className, count = 3 }) => (
  <div className={cn('flex space-x-1', className)}>
    {Array.from({ length: count }).map((_, i) => (
      <div
        key={i}
        className="h-2 w-2 bg-primary rounded-full animate-pulse"
        style={{ animationDelay: `${i * 0.2}s` }}
      />
    ))}
  </div>
);

// Shimmer Effect
export const Shimmer: React.FC<{ 
  className?: string;
  children?: React.ReactNode;
}> = ({ className, children }) => (
  <div className={cn('relative overflow-hidden', className)}>
    {children}
    <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  </div>
);

// Loading States for specific components
export const DonationCardSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-20 w-full mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </CardContent>
  </Card>
);

export const UserProfileSkeleton: React.FC = () => (
  <div className="space-y-6">
    <div className="flex items-center space-x-4">
      <Skeleton className="h-16 w-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-48" />
      </div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i}>
          <CardContent className="p-4">
            <Skeleton className="h-4 w-20 mb-2" />
            <Skeleton className="h-6 w-16" />
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export const EventCardSkeleton: React.FC = () => (
  <Card>
    <Skeleton className="h-48 w-full rounded-t-lg" />
    <CardContent className="p-4">
      <Skeleton className="h-5 w-3/4 mb-2" />
      <Skeleton className="h-4 w-1/2 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-8 w-20" />
      </div>
    </CardContent>
  </Card>
);

export const LessonCardSkeleton: React.FC = () => (
  <Card>
    <CardHeader>
      <div className="flex items-center justify-between">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-4 w-1/2" />
    </CardHeader>
    <CardContent>
      <Skeleton className="h-3 w-full mb-2" />
      <Skeleton className="h-3 w-5/6 mb-4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-8 w-24" />
      </div>
    </CardContent>
  </Card>
);

// Loading wrapper for async operations
interface AsyncWrapperProps<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  children: (data: T) => React.ReactNode;
  loadingComponent?: React.ReactNode;
  errorComponent?: (error: string) => React.ReactNode;
  emptyComponent?: React.ReactNode;
  isEmpty?: (data: T) => boolean;
}

export function AsyncWrapper<T>({
  data,
  loading,
  error,
  children,
  loadingComponent,
  errorComponent,
  emptyComponent,
  isEmpty
}: AsyncWrapperProps<T>) {
  if (loading) {
    return <>{loadingComponent || <LoadingState />}</>;
  }

  if (error) {
    return <>{errorComponent ? errorComponent(error) : <ErrorDisplay error={error} />}</>;
  }

  if (!data || (isEmpty && isEmpty(data))) {
    return <>{emptyComponent || <EmptyState title="No data available" />}</>;
  }

  return <>{children(data)}</>;
}

// Re-export commonly used components
export { LoadingSpinner, ErrorDisplay, EmptyState, LoadingState } from './Toast';
