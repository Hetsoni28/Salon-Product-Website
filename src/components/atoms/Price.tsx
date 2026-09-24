import React from 'react';
import { cn } from '@/lib/cn';

export interface PriceProps {
  amount: number;
  originalAmount?: number;
  currency?: string;
  showSaving?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Price: React.FC<PriceProps> = ({
  amount,
  originalAmount,
  currency = '₹',
  showSaving = true,
  size = 'md',
  className,
}) => {
  const hasDiscount = originalAmount !== undefined && originalAmount > amount;
  
  const sizeStyles = {
    sm: {
      main: 'text-base font-semibold',
      original: 'text-sm',
      saving: 'text-[10px] px-1.5 py-0.5'
    },
    md: {
      main: 'text-lg font-semibold',
      original: 'text-base',
      saving: 'text-xs px-1.5 py-0.5'
    },
    lg: {
      main: 'text-2xl font-bold',
      original: 'text-lg',
      saving: 'text-sm px-2 py-0.5'
    }
  };

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value).replace('₹', currency);
  };

  return (
    <div className={cn("flex items-center gap-2 flex-wrap", className)}>
      <span className={cn("text-brand-dark", sizeStyles[size].main)}>
        {formatPrice(amount)}
      </span>
      
      {hasDiscount && (
        <>
          <span className={cn("line-through text-brand-muted", sizeStyles[size].original)}>
            {formatPrice(originalAmount)}
          </span>
          
          {showSaving && (
            <span className={cn(
              "rounded-full bg-red-50 text-red-600 font-medium whitespace-nowrap",
              sizeStyles[size].saving
            )}>
              Save {formatPrice(originalAmount - amount)}
            </span>
          )}
        </>
      )}
    </div>
  );
};

export default Price;
