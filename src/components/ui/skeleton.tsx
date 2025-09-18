// Skeleton Component for Grand Zawiyah
// Provides loading placeholders for content

import React from 'react';
import { cn } from '@/lib/utils';

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-pulse rounded-md bg-gray-200',
        className
      )}
      role="status"
      aria-label="Loading content"
    />
  );
};

export { Skeleton };