import React from 'react';
import { cn } from '@/lib/cn';

export interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  variant?: 'default' | 'gold' | 'dashed';
  spacing?: 'sm' | 'md' | 'lg';
  label?: string;
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  variant = 'default',
  spacing = 'md',
  label,
  className
}) => {
  const isHorizontal = orientation === 'horizontal';

  const spacingMap = {
    sm: isHorizontal ? 'my-4' : 'mx-4',
    md: isHorizontal ? 'my-6' : 'mx-6',
    lg: isHorizontal ? 'my-10' : 'mx-10',
  };

  const variantStyles = {
    default: "border-brand-border",
    gold: "divider-gold-lg border-transparent",
    dashed: "border-brand-border border-dashed",
  };

  const baseStyles = cn(
    "shrink-0",
    isHorizontal ? "w-full border-t" : "h-full border-l",
    variant === 'gold' && "h-[2px]", // Custom thickness for gold
    !label && spacingMap[spacing],
    variantStyles[variant],
    className
  );

  if (label && isHorizontal) {
    return (
      <div className={cn("flex items-center w-full", spacingMap[spacing], className)}>
        <div className={cn("flex-grow border-t", variantStyles[variant])}></div>
        <span className="px-4 text-sm text-brand-muted uppercase tracking-wider font-medium">
          {label}
        </span>
        <div className={cn("flex-grow border-t", variantStyles[variant])}></div>
      </div>
    );
  }

  return <div className={baseStyles} role="separator" aria-orientation={orientation} />;
};

export default Divider;
