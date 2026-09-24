import React from 'react';
import { cn } from '@/lib/cn';

export interface RatingProps {
  value: number;
  maxStars?: number;
  showCount?: boolean;
  count?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  maxStars = 5,
  showCount = false,
  count = 0,
  size = 'sm',
  className,
}) => {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  const renderStar = (index: number) => {
    const isFilled = value >= index + 1;
    const isHalf = value > index && value < index + 1;

    if (isFilled) {
      return (
        <svg
          key={index}
          className={cn(sizes[size], 'text-brand-gold')}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else if (isHalf) {
      return (
        <svg
          key={index}
          className={cn(sizes[size], 'text-brand-gold')}
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id={`halfGradient-${index}`}>
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill={`url(#halfGradient-${index})`} d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      return (
        <svg
          key={index}
          className={cn(sizes[size], 'text-gray-200')}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  };

  return (
    <div className={cn('flex items-center space-x-1', className)}>
      <div className="flex">
        {Array.from({ length: maxStars }).map((_, i) => renderStar(i))}
      </div>
      {showCount && (
        <span className="text-sm text-gray-500 ml-2">({count})</span>
      )}
    </div>
  );
};

export default Rating;
