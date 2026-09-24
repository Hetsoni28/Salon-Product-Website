"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms";

export const Footer = () => {
  return (
    <footer className="bg-brand-charcoal text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="font-serif text-2xl mb-4 tracking-wide text-brand-gold">
              LUMIÈRE
            </h3>
            <p className="text-brand-cream-dark mb-6 text-sm">
              Premium salon supplies and professional waxing products.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="hover:scale-110 hover:opacity-90 transition-all"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <defs>
                    <linearGradient
                      id="ig-grad"
                      x1="0%"
                      y1="100%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="#f09433" />
                      <stop offset="25%" stopColor="#e6683c" />
                      <stop offset="50%" stopColor="#dc2743" />
                      <stop offset="75%" stopColor="#cc2366" />
                      <stop offset="100%" stopColor="#bc1888" />
                    </linearGradient>
                  </defs>
                  <path
                    fill="url(#ig-grad)"
                    d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                  />
                </svg>
              </a>
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="hover:scale-110 hover:opacity-90 transition-all"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6 text-brand-gold">
              Quick Links
            </h4>
            <ul className="space-y-4 text-sm text-brand-cream-dark">
              <li>
                <Link
                  href="/"
                  className="hover:text-brand-gold transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/shop"
                  className="hover:text-brand-gold transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-brand-gold transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-brand-gold transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-brand-gold transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6 text-brand-gold">Help</h4>
            <ul className="space-y-4 text-sm text-brand-cream-dark">
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-brand-gold transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-brand-gold transition-colors"
                >
                  Returns
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-brand-gold transition-colors"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="hover:text-brand-gold transition-colors"
                >
                  Track Order
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-lg mb-6 text-brand-gold">
              Newsletter
            </h4>
            <p className="text-brand-cream-dark text-sm mb-4">
              Subscribe to receive updates, access to exclusive deals, and more.
            </p>
            <form
              className="flex flex-col space-y-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full bg-brand-charcoal border border-brand-warm-gray rounded-md px-4 py-2 text-sm text-white focus:outline-none focus:border-brand-gold transition-colors"
                required
              />
              <Button variant="primary" className="w-full">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-brand-warm-gray pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-brand-cream-dark opacity-70">
          <p>
            &copy; {new Date().getFullYear()} Lumière Skincare. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
