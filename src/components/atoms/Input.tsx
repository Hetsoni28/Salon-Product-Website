import React from 'react';
import { cn } from '@/lib/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  hint?: string;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'underline';
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  hint,
  icon,
  rightIcon,
  size = 'md',
  variant = 'default',
  className,
  id,
  ...props
}, ref) => {
  const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  
  const baseStyles = "block w-full transition-all duration-200 focus:outline-none focus:ring-0 focus-visible:shadow-[0_0_0_3px_rgba(200,168,130,0.15)] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = {
    default: "border border-brand-border rounded-md bg-white focus:border-brand-gold",
    filled: "bg-brand-cream-dark border-transparent rounded-md focus:border-brand-gold",
    underline: "border-b border-brand-border rounded-none bg-transparent focus:border-brand-gold px-0"
  };
  
  const sizeStyles = {
    sm: "py-2 px-3 text-sm",
    md: "py-3 px-4 text-sm",
    lg: "py-3.5 px-4 text-base"
  };

  // Adjust padding if icons are present
  const iconPaddingLeft = icon ? (size === 'sm' ? 'pl-9' : size === 'lg' ? 'pl-12' : 'pl-10') : '';
  const iconPaddingRight = rightIcon ? (size === 'sm' ? 'pr-9' : size === 'lg' ? 'pr-12' : 'pr-10') : '';

  return (
    <div className={cn("w-full relative flex flex-col gap-1.5", className)}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="text-sm font-medium text-brand-charcoal"
        >
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted flex items-center justify-center">
            {icon}
          </div>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            iconPaddingLeft,
            iconPaddingRight,
            error && "border-red-500 focus:border-red-500 focus-visible:shadow-[0_0_0_3px_rgba(239,68,68,0.15)]"
          )}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted flex items-center justify-center">
            {rightIcon}
          </div>
        )}
      </div>

      {(error || hint) && (
        <p className={cn("text-xs", error ? "text-red-500" : "text-brand-muted")}>
          {error || hint}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";
export default Input;
