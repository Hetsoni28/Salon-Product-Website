"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import { NavLink } from '@/components/molecules';
import { useCart } from '@/lib/providers/CartProvider';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();
  
  const { cartCount, toggleCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/shop' },
    { label: 'About', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="text-brand-charcoal p-2"
              aria-label="Open menu"
            >
              <Menu size={24} />
            </button>
          </div>

          <div className="shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
            <Link href="/" className="font-serif text-2xl text-brand-charcoal tracking-wide">
              LUMIÈRE
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink key={link.label} href={link.href}>{link.label}</NavLink>
            ))}
          </nav>

          <div className="flex items-center space-x-4 md:space-x-6">
            <div className="relative flex items-center">
              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 150, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="overflow-hidden absolute right-8"
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={handleSearch}
                      autoFocus
                      className="w-full bg-transparent border-b border-brand-charcoal focus:outline-none text-sm py-1"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="text-brand-charcoal hover:text-gray-600 transition-colors"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
            </div>
            
            <Link href="/wishlist" className="text-brand-charcoal hover:text-gray-600 transition-colors">
              <Heart size={20} />
            </Link>
            
            <button onClick={toggleCart} className="text-brand-charcoal hover:text-gray-600 transition-colors relative" aria-label="Cart">
              <ShoppingBag size={20} />
              {mounted && cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-brand-charcoal text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/20 z-50 md:hidden backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-64 bg-[#FAF7F2] z-50 p-6 md:hidden shadow-xl"
            >
              <div className="flex justify-between items-center mb-8">
                <span className="font-serif text-xl text-brand-charcoal">LUMIÈRE</span>
                <button onClick={() => setMobileMenuOpen(false)} className="text-brand-charcoal">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-brand-charcoal text-lg font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
export default Navbar;
