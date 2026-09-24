'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface BadgeProps {
  label: string;
  variant?: 'new' | 'sale' | 'bestseller' | 'organic' | 'limited' | 'default';
  size?: 'sm' | 'md';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  label,
  variant = 'default',
  size = 'md',
  icon,
  className,
}) => {
  const baseStyles = "inline-flex items-center gap-1 rounded-full font-semibold uppercase";

  const variantStyles = {
    new: "bg-brand-gold text-white",
    sale: "bg-red-500 text-white",
    bestseller: "bg-brand-dark text-white",
    organic: "bg-emerald-700 text-white",
    limited: "bg-amber-700 text-white",
    default: "bg-brand-cream-dark text-brand-charcoal border border-brand-border",
  };

  const sizeStyles = {
    sm: "text-[10px] px-2 py-0.5 tracking-[0.1em]",
    md: "text-[11px] px-2.5 py-1 tracking-[0.08em]",
  };

  return (
    <motion.span
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
    >
      {icon}
      {label}
    </motion.span>
  );
};

export default Badge;
