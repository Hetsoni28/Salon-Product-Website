import React from 'react';
import { cn } from '@/lib/cn';

export interface TextProps {
  as?: 'p' | 'span' | 'div' | 'label' | 'strong' | 'em';
  size?: '2xs' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'default' | 'muted' | 'accent' | 'dark' | 'white' | 'success' | 'error';
  align?: 'left' | 'center' | 'right';
  leading?: 'tight' | 'snug' | 'normal' | 'relaxed' | 'loose';
  className?: string;
  children: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({
  as: Component = 'p',
  size = 'base',
  weight = 'normal',
  color = 'default',
  align = 'left',
  leading = 'normal',
  className,
  children,
}) => {
  const sizeStyles = {
    '2xs': 'text-[10px]',
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  const weightStyles = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorStyles = {
    default: 'text-brand-charcoal',
    muted: 'text-brand-warm-gray',
    accent: 'text-brand-gold',
    dark: 'text-brand-dark',
    white: 'text-white',
    success: 'text-emerald-700',
    error: 'text-red-600',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const leadingStyles = {
    tight: 'leading-tight',
    snug: 'leading-snug',
    normal: 'leading-normal',
    relaxed: 'leading-relaxed',
    loose: 'leading-loose',
  };

  return (
    <Component
      className={cn(
        sizeStyles[size],
        weightStyles[weight],
        colorStyles[color],
        alignStyles[align],
        leadingStyles[leading],
        className
      )}
    >
      {children}
    </Component>
  );
};

export default Text;
