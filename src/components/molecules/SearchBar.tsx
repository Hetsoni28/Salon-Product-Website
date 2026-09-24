'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

export interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  onSearch,
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
    inputRef.current?.focus();
  };

  return (
    <motion.form
      initial={false}
      animate={{ width: isFocused ? '100%' : '100%', maxWidth: isFocused ? '400px' : '300px' }}
      className={`relative flex items-center ${className}`}
      onSubmit={handleSubmit}
    >
      <div className="absolute left-3 text-gray-400">
        <Search size={18} />
      </div>
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full rounded-full border border-gray-200 bg-gray-50 py-2 pl-10 pr-10 text-sm outline-none transition-colors focus:border-brand-gold focus:bg-white"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-3 text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      )}
    </motion.form>
  );
};

export default SearchBar;
