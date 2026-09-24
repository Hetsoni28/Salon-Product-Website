'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/cn';

export interface HeadingProps {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'light' | 'regular' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  serif?: boolean;
  eyebrow?: string;
  gradient?: boolean;
  animate?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Heading: React.FC<HeadingProps> = ({
  as: Component = 'h2',
  size = 'md',
  weight = 'regular',
  align = 'left',
  serif = true,
  eyebrow,
  gradient = false,
  animate = false,
  className,
  children
}) => {
  const sizeMap = {
    xs: 'text-lg',
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl',
    '2xl': 'text-5xl',
    '3xl': 'text-6xl',
    '4xl': 'text-7xl'
  };

  const weightMap = {
    light: 'font-light',
    regular: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold'
  };

  const alignMap = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const headingClasses = cn(
    sizeMap[size],
    weightMap[weight],
    alignMap[align],
    serif && 'font-serif',
    gradient && 'text-gradient-gold',
    !gradient && 'text-brand-charcoal',
    'leading-tight',
    className
  );

  const content = (
    <div className={cn("flex flex-col", alignMap[align], className && !gradient ? className : "")}>
      {eyebrow && (
        <span className="eyebrow block text-xs tracking-[0.2em] uppercase text-brand-gold mb-2 font-medium">
          {eyebrow}
        </span>
      )}
      <Component className={headingClasses}>
        {children}
      </Component>
    </div>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

export default Heading;
