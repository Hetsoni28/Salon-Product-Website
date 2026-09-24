'use client';

import React from 'react';
import { motion } from 'framer-motion';

export interface FilterChipProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  className?: string;
}

export const FilterChip: React.FC<FilterChipProps> = ({
  label,
  isActive,
  onClick,
  className = '',
}) => {
  return (
    <motion.button
      layout
      onClick={onClick}
      className={`relative rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
        isActive
          ? 'bg-brand-gold text-white shadow-sm'
          : 'border border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
      } ${className}`}
    >
      {label}
    </motion.button>
  );
};

export default FilterChip;
