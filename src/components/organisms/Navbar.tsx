"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { NavLink } from "@/components/molecules";
import { useCart } from "@/lib/providers/CartProvider";
import { useWishlist } from "@/lib/providers/WishlistProvider";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { cartCount, toggleCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/shop" },
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  const isHomepage = pathname === "/";
  const isTransparent = isHomepage && !scrolled;
  const textColor = isTransparent ? "text-white" : "text-brand-charcoal";
  const hoverColor = isTransparent ? "hover:text-brand-gold" : "hover:text-brand-gold-dark";

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent ? "bg-transparent" : "bg-white/90 backdrop-blur-md shadow-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">

            {/* Hamburger — mobile only */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className={`p-2 ${textColor}`}
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>
            </div>

            {/* Logo */}
            <div className="shrink-0 flex items-center justify-center md:justify-start flex-1 md:flex-none">
              <Link href="/" className={`font-serif text-2xl tracking-wide ${textColor}`}>
                LUMIÈRE
              </Link>
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink key={link.label} href={link.href} className={`${textColor} ${hoverColor}`}>
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 md:space-x-6">
              {/* Search */}
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
                        className={`w-full bg-transparent border-b focus:outline-none text-sm py-1 ${
                          isTransparent
                            ? "border-white text-white placeholder-white/70"
                            : "border-brand-charcoal text-brand-charcoal placeholder-gray-400"
                        }`}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
                <button
                  onClick={() => setSearchOpen(!searchOpen)}
                  className={`transition-colors ${textColor} ${hoverColor}`}
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className={`relative transition-colors ${textColor} ${hoverColor}`}>
                <Heart size={20} />
                {mounted && wishlistItems.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-white text-2xs w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={toggleCart}
                className={`relative transition-colors ${textColor} ${hoverColor}`}
                aria-label="Cart"
              >
                <ShoppingBag size={20} />
                {mounted && cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-brand-charcoal text-white text-2xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu — rendered via Portal so it's NEVER clipped by <header> */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <>
                {/* Dark overlay — covers entire screen */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  style={{ zIndex: 9998 }}
                />

                {/* Drawer */}
                <motion.div
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed top-0 left-0 bottom-0 w-72 bg-[#FAF7F2] p-6 shadow-2xl"
                  style={{ zIndex: 9999 }}
                >
                  <div className="flex justify-between items-center mb-10">
                    <span className="font-serif text-xl text-brand-charcoal">LUMIÈRE</span>
                    <button
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-brand-charcoal p-1"
                      aria-label="Close menu"
                    >
                      <X size={24} />
                    </button>
                  </div>

                  <nav className="flex flex-col space-y-6">
                    {navLinks.map((link) => (
                      <Link
                        key={link.label}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-brand-charcoal text-lg font-medium hover:text-brand-gold transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>

                  {/* Bottom contact */}
                  <div className="absolute bottom-8 left-6 right-6">
                    <div className="h-px bg-brand-divider mb-6" />
                    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Contact</p>
                    <a href="tel:+919327775751" className="text-brand-gold font-semibold text-sm">
                      +91 93277 75751
                    </a>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};

export default Navbar;
