'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';


export interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
  className?: string;
}

export const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  value,
  min = 1,
  max = 99,
  onChange,
  className = '',
}) => {
  const handleDecrement = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      if (val >= min && val <= max) {
        onChange(val);
      } else if (val > max) {
        onChange(max);
      } else if (val < min) {
        onChange(min);
      }
    }
  };

  return (
    <div className={`inline-flex items-center rounded-md border border-gray-200 bg-white ${className}`}>
      <button
        type="button"
        onClick={handleDecrement}
        disabled={value <= min}
        className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50"
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      
      <input type="number" min={min} max={max} value={value} onChange={handleInputChange} className="h-10 w-14 border-0 p-0 text-center text-sm font-medium focus:ring-0 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" />
      
      <button
        type="button"
        onClick={handleIncrement}
        disabled={value >= max}
        className="flex h-10 w-10 items-center justify-center text-gray-500 transition-colors hover:bg-gray-50 hover:text-gray-900 disabled:opacity-50"
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
};

export default QuantitySelector;

