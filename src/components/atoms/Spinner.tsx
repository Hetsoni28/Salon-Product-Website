'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface SpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  color?: 'gold' | 'white' | 'dark';
  label?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'gold',
  label,
  className
}) => {
  const sizeMap = {
    xs: 12,
    sm: 16,
    md: 24,
    lg: 36
  };
  
  const colorMap = {
    gold: 'text-brand-gold',
    white: 'text-white',
    dark: 'text-brand-dark'
  };

  const currentSize = sizeMap[size];

  return (
    <div className={cn("inline-flex items-center", className)} role="status">
      <motion.svg
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        width={currentSize}
        height={currentSize}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={colorMap[color]}
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeDasharray="30 60"
          strokeLinecap="round"
          className="opacity-80"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          className="opacity-20"
        />
      </motion.svg>
      {label && <span className="sr-only">{label}</span>}
    </div>
  );
};

export default Spinner;
