"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";

export interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
  image?: Record<string, unknown>; // kept for backwards compat but ignored
  badge?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}) => {
  return (
    <section className="relative min-h-[90vh] md:min-h-screen w-full flex items-center justify-center overflow-hidden bg-brand-dark pt-20">
      {/* Cinematic Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/hero-bg.jpg"
          alt="Luxury Salon Spa"
          fill
          className="object-cover opacity-50"
          priority
          unoptimized
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-brand-charcoal via-brand-charcoal/40 to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 w-full max-w-5xl mx-auto py-20">
        {/* Editorial Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-5xl md:text-7xl lg:text-[6rem] font-serif text-white leading-[1.1] tracking-tight mb-6 drop-shadow-lg"
        >
          The Pinnacle of <br className="hidden md:block" /> Professional
          Waxing.
        </motion.h1>

        {/* Elegant Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-lg md:text-2xl text-gray-300 font-light mb-10 max-w-2xl"
        >
          {subtitle}
        </motion.p>

        {/* Premium CTA Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <Link href={ctaHref}>
            <button className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-gold px-8 text-sm font-medium text-white transition-transform hover:scale-105 active:scale-95">
              <span className="relative z-10 tracking-widest uppercase">
                {ctaLabel}
              </span>
              <ArrowRight
                size={18}
                className="relative z-10 transition-transform group-hover:translate-x-1"
              />
              <div className="absolute inset-0 z-0 bg-brand-gold-dark opacity-0 transition-opacity group-hover:opacity-100" />
            </button>
          </Link>
          <Link
            href="/about"
            className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white transition-colors hover:text-brand-gold"
          >
            <span>Our Philosophy</span>
            <div className="h-px w-8 bg-white transition-all group-hover:w-12 group-hover:bg-brand-gold" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

