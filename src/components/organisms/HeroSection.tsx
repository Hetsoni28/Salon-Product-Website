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
  image?: Record<string, unknown>;
  badge?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  ctaLabel,
  ctaHref,
}) => {
  return (
    <section className="relative w-full min-h-screen bg-brand-cream overflow-hidden flex items-center">
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #2D2D2D 1px, transparent 0)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 items-center min-h-screen">
        {/* ── LEFT: Text Content ─────────────────────────── */}
        <div className="flex flex-col justify-center lg:pr-12">
          {/* Eyebrow badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="flex items-center gap-1.5 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-[11px] font-semibold tracking-[0.18em] uppercase px-4 py-2 rounded-full">
              <Star size={10} fill="currentColor" />
              Trusted by 10,000+ Salons Across India
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="font-serif text-brand-dark leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: "clamp(2.8rem, 5.5vw, 5rem)" }}
          >
            Professional
            <br />
            <span className="text-brand-gold">Beauty</span> Products
            <br />
            for Modern Salons
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="text-brand-warm-gray text-lg font-light leading-relaxed mb-10 max-w-md"
          >
            Premium salon-grade waxing products designed for professional
            results — crafted for beauticians who demand the best.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.55,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-5"
          >
            <Link href={ctaHref}>
              <button className="group relative flex h-14 items-center justify-center gap-3 overflow-hidden rounded-full bg-brand-gold px-9 text-sm font-semibold text-white tracking-widest uppercase transition-all hover:scale-105 hover:shadow-[0_8px_30px_rgba(200,168,130,0.45)] active:scale-95">
                <span className="relative z-10">{ctaLabel}</span>
                <ArrowRight
                  size={16}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
                <div className="absolute inset-0 z-0 bg-brand-gold-dark opacity-0 transition-opacity group-hover:opacity-100" />
              </button>
            </Link>

            <Link
              href="/about"
              className="group flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-charcoal transition-colors hover:text-brand-gold"
            >
              <span>Our Philosophy</span>
              <div className="h-px w-8 bg-brand-charcoal transition-all group-hover:w-12 group-hover:bg-brand-gold" />
            </Link>
          </motion.div>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-8 mt-14 pt-8 border-t border-brand-divider"
          >
            {[
              { value: "10K+", label: "Active Salons" },
              { value: "50+", label: "Cities Served" },
              { value: "4.9★", label: "Avg. Rating" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-serif text-2xl font-semibold text-brand-dark">
                  {stat.value}
                </p>
                <p className="text-xs text-brand-warm-gray tracking-wide mt-0.5">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── RIGHT: Product Visual ───────────────────────── */}
        <div className="relative flex items-center justify-center lg:justify-end h-full">
          {/* Decorative circle blob */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-brand-gold/8 -z-0" />
          <div className="absolute right-8 top-1/2 -translate-y-1/2 w-[420px] h-[420px] rounded-full bg-brand-cream-mid -z-0" />

          {/* Main product image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 w-full max-w-sm lg:max-w-md xl:max-w-lg"
          >
            <div className="relative aspect-[3/4] w-full rounded-t-[8rem] rounded-b-3xl overflow-hidden shadow-[0_32px_80px_rgba(44,28,14,0.18)]">
              <Image
                src="/images/hero-bg.jpg"
                alt="LUMIÈRE Premium Salon Products"
                fill
                className="object-cover"
                priority
                unoptimized
              />
              {/* soft gradient at bottom */}
              <div className="absolute inset-0 bg-linear-to-t from-brand-dark/30 via-transparent to-transparent" />
            </div>

            {/* Floating badge: Premium Salon */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl px-5 py-4 border border-brand-divider min-w-[160px]"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-brand-gold mb-1">
                Premium Salon
              </p>
              <p className="font-serif text-brand-dark text-base leading-tight">
                Environment
              </p>
              <div className="flex items-center gap-0.5 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={10}
                    className="text-brand-gold"
                    fill="#C8A882"
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating badge: top right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="absolute -top-4 -right-4 bg-brand-gold text-white rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg text-center"
            >
              <p className="font-serif text-xl font-bold leading-none">98%</p>
              <p className="text-[9px] tracking-wide leading-tight mt-0.5 font-medium uppercase">
                Salon
                <br />
                Approval
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
