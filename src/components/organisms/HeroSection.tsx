"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

export interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  image?: Record<string, unknown>;
  badge?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  ctaLabel = "Shop Products",
  ctaHref = "/shop",
}) => {
  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center bg-brand-dark">
      {/* ── FULL BACKGROUND HERO IMAGE ──────────────────────────── */}
      <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Premium Salon Environment"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-center scale-105"
        />
        {/* Cinematic atmospheric overlays:
            - Left-to-right gradient ensures crystal-clear readability for typography
            - Top & bottom vignettes blend smoothly with navbar & next sections */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/75 to-black/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40" />
      </div>

      {/* ── HERO CONTENT GRID ───────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-32 pb-16 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          {/* ── LEFT: Typography & CTAs (col-span-7) ─────────────── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Eyebrow Pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="flex items-center gap-2 bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[11px] font-semibold tracking-[0.2em] uppercase px-4 py-2 rounded-full backdrop-blur-md">
                <Sparkles size={12} className="text-brand-gold" />
                Salon Grade Waxing Essentials
              </span>
            </motion.div>

            {/* Editorial Headline from Mockup */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: 0.2,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="font-serif text-white uppercase text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-[1.08] mb-6 drop-shadow-md"
            >
              Professional Beauty
              <br />
              Products For
              <br />
              <span className="text-brand-gold font-normal">Modern Salons</span>
            </motion.h1>

            {/* Subtitle from Mockup */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="text-white/85 text-lg sm:text-xl font-light leading-relaxed mb-8 max-w-xl"
            >
              Premium salon-use products designed for professional results.
              Formulated for beauticians who demand smooth, flawless, and
              painless client sessions.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.55,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex flex-wrap items-center gap-4 sm:gap-6"
            >
              <Link href={ctaHref}>
                <button className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-gold px-9 text-sm font-semibold text-white tracking-widest uppercase transition-all hover:scale-105 hover:bg-brand-gold-dark hover:shadow-[0_8px_30px_rgba(200,168,130,0.5)] active:scale-95">
                  <span className="relative z-10">{ctaLabel}</span>
                  <ArrowRight
                    size={18}
                    className="relative z-10 transition-transform group-hover:translate-x-1"
                  />
                </button>
              </Link>

              <Link
                href="/about"
                className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-white/90 transition-colors hover:text-brand-gold"
              >
                <span>Our Philosophy</span>
                <div className="h-px w-8 bg-white/70 transition-all group-hover:w-12 group-hover:bg-brand-gold" />
              </Link>
            </motion.div>
          </div>

          {/* ── RIGHT: Product Feature & Premium Environment Card (col-span-5) ── */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative">
            {/* Featured Product Floating Card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                delay: 0.35,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="relative w-full max-w-sm rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 p-6 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden group hover:border-brand-gold/60 transition-all duration-500"
            >
              {/* Product Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="bg-brand-gold text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm">
                  Featured Product
                </span>
                <span className="text-white/70 text-xs font-mono uppercase tracking-wider flex items-center gap-1">
                  <ShieldCheck size={14} className="text-brand-gold" /> Pro
                  Exclusive
                </span>
              </div>

              {/* Product Image Window */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden mb-5 bg-white/5 border border-white/10">
                <Image
                  src="/images/product-1.jpg"
                  alt="Premium Hard Wax Beans"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* Product Details */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl text-white font-medium mb-1">
                    Premium Hard Wax Beans
                  </h3>
                  <p className="text-white/60 text-xs tracking-wide">
                    Pearl Formula • 1kg Professional Bag
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-serif text-2xl text-brand-gold font-semibold">
                    ₹2,400
                  </p>
                  <p className="text-[10px] text-white/50 line-through">
                    ₹3,000
                  </p>
                </div>
              </div>

              {/* Quick Link */}
              <Link
                href="/shop"
                className="mt-5 w-full flex items-center justify-center gap-2 py-3 rounded-full bg-white/15 hover:bg-brand-gold text-white text-xs font-semibold uppercase tracking-widest transition-colors duration-300"
              >
                <span>View Salon Range</span>
                <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
