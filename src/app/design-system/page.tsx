"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, Heart, ArrowRight, Check } from "lucide-react";

import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { Input } from "@/components/atoms/Input";
import { Divider } from "@/components/atoms/Divider";
import { Rating } from "@/components/atoms/Rating";
import { Price } from "@/components/atoms/Price";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function DesignSystemPage() {
  return (
    <div className="bg-cream min-h-screen pb-32">
      {/* Header */}
      <div className="container-luxury pt-20 pb-10 border-b border-gold/10">
        <h1 className="display-1 text-dark mb-4">Design System</h1>
        <p className="text-xl text-muted max-w-2xl">
          A comprehensive showcase of the LUMIÈRE component library and design
          tokens.
        </p>
      </div>

      <div className="container-luxury">
        {/* SECTION 1: Brand Identity */}
        <motion.section
          id="brand"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">01 / Tokens</span>
          <h2 className="text-3xl font-serif text-dark mb-12">
            Brand Identity
          </h2>

          <div className="mb-12">
            <div className="font-serif text-4xl text-dark mb-2 tracking-wide uppercase">
              LUMIÈRE
            </div>
            <div className="text-muted tracking-widest text-sm uppercase">
              Illuminating natural beauty
            </div>
          </div>

          <h3 className="text-xl font-serif mb-6">Colors</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
            {[
              { name: "Gold", hex: "#C8A882", bg: "bg-[#C8A882]" },
              { name: "Gold Dark", hex: "#A8845E", bg: "bg-[#A8845E]" },
              { name: "Gold Subtle", hex: "#F5EDE3", bg: "bg-[#F5EDE3]" },
              { name: "Dark", hex: "#1A1A1A", bg: "bg-[#1A1A1A]" },
              { name: "Charcoal", hex: "#2D2D2D", bg: "bg-[#2D2D2D]" },
              { name: "Warm Gray", hex: "#6B6B6B", bg: "bg-[#6B6B6B]" },
              { name: "Muted", hex: "#9C9C9C", bg: "bg-[#9C9C9C]" },
              {
                name: "Cream",
                hex: "#FAF7F2",
                bg: "bg-[#FAF7F2]",
                border: true,
              },
              {
                name: "Cream Mid",
                hex: "#F5EFE6",
                bg: "bg-[#F5EFE6]",
                border: true,
              },
              {
                name: "Cream Dark",
                hex: "#EDE4D8",
                bg: "bg-[#EDE4D8]",
                border: true,
              },
              {
                name: "White",
                hex: "#FFFFFF",
                bg: "bg-[#FFFFFF]",
                border: true,
              },
              { name: "Success", hex: "#3D7A5F", bg: "bg-[#3D7A5F]" },
              { name: "Error", hex: "#C0392B", bg: "bg-[#C0392B]" },
              { name: "Warning", hex: "#B8860B", bg: "bg-[#B8860B]" },
              { name: "Info", hex: "#2471A3", bg: "bg-[#2471A3]" },
            ].map((c) => (
              <div key={c.name} className="flex flex-col items-center">
                <div
                  className={`w-16 h-16 rounded-full mb-3 shadow-sm ${c.bg} ${c.border ? "border border-gray-200" : ""}`}
                />
                <span className="text-sm font-medium text-dark">{c.name}</span>
                <span className="text-xs text-muted">{c.hex}</span>
              </div>
            ))}
          </div>

          <h3 className="text-xl font-serif mb-6">Gradients</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-24 rounded-lg gradient-gold flex items-center justify-center text-white font-medium shadow-md">
              Gradient Gold
            </div>
            <div className="h-24 rounded-lg bg-linear-to-r from-cream-mid to-cream-subtle border border-gold/10 flex items-center justify-center text-dark font-medium shadow-sm">
              Gradient Subtle
            </div>
            <div className="h-24 rounded-lg bg-linear-to-r from-dark to-charcoal flex items-center justify-center text-white font-medium shadow-md">
              Gradient Dark
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 2: Typography */}
        <motion.section
          id="typography"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">02 / Core</span>
          <h2 className="text-3xl font-serif text-dark mb-12">Typography</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Headings
              </h3>
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">
                    Display 1
                  </span>
                  <div className="display-1">The Art of Natural Skincare</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">
                    Display 2
                  </span>
                  <div className="display-2">The Art of Natural Skincare</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">H1</span>
                  <h1 className="text-4xl md:text-5xl font-serif">
                    The Art of Natural Skincare
                  </h1>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">H2</span>
                  <h2 className="text-3xl md:text-4xl font-serif">
                    The Art of Natural Skincare
                  </h2>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">H3</span>
                  <h3 className="text-2xl md:text-3xl font-serif">
                    The Art of Natural Skincare
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">H4</span>
                  <h4 className="text-xl md:text-2xl font-serif">
                    The Art of Natural Skincare
                  </h4>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">H5</span>
                  <h5 className="text-lg md:text-xl font-serif">
                    The Art of Natural Skincare
                  </h5>
                </div>
                <div className="flex flex-col md:flex-row md:items-baseline gap-4">
                  <span className="w-24 text-sm text-muted shrink-0">H6</span>
                  <h6 className="text-base md:text-lg font-serif">
                    The Art of Natural Skincare
                  </h6>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Special Text
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm text-muted">Eyebrow</span>
                  <span className="eyebrow">Natural Ingredients</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm text-muted">Gradient</span>
                  <h3 className="text-3xl font-serif text-gradient-gold">
                    Golden Hour Glow
                  </h3>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Body Text
              </h3>
              <div className="space-y-4">
                <p className="font-sans">
                  <strong>Sans (Primary):</strong> Lorem ipsum dolor sit amet,
                  consectetur adipiscing elit. Sed do eiusmod tempor incididunt
                  ut labore et dolore magna aliqua.
                </p>
                <p className="font-serif">
                  <strong>Serif (Secondary):</strong> Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Sed do eiusmod tempor
                  incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Type Scale
              </h3>
              <div className="space-y-4 font-sans">
                {[
                  "text-7xl",
                  "text-6xl",
                  "text-5xl",
                  "text-4xl",
                  "text-3xl",
                  "text-2xl",
                  "text-xl",
                  "text-lg",
                  "text-base",
                  "text-sm",
                  "text-xs",
                  "text-[10px]",
                ].map((size) => {
                  const className = size.includes("[10px]")
                    ? "text-[10px]"
                    : size;
                  const label = size.includes("[10px]")
                    ? "text-[10px] (2xs)"
                    : size;
                  return (
                    <div key={size} className="flex items-center gap-4">
                      <span className="w-32 text-sm text-muted shrink-0">
                        {label}
                      </span>
                      <span className={className}>LUMIÈRE</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-xl text-muted mb-6 border-b pb-2">
                  Font Weights
                </h3>
                <div className="space-y-4">
                  <div className="font-light">Light (300)</div>
                  <div className="font-normal">Regular (400)</div>
                  <div className="font-medium">Medium (500)</div>
                  <div className="font-semibold">Semibold (600)</div>
                  <div className="font-bold">Bold (700)</div>
                </div>
              </div>
              <div>
                <h3 className="text-xl text-muted mb-6 border-b pb-2">
                  Letter Spacing
                </h3>
                <div className="space-y-4 uppercase">
                  <div className="tracking-normal">Normal spacing</div>
                  <div className="tracking-wide">Wide spacing</div>
                  <div className="tracking-wider">Wider spacing</div>
                  <div className="tracking-widest">Widest spacing</div>
                  <div className="tracking-ultra">Ultra spacing</div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 3: Buttons */}
        <motion.section
          id="buttons"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">03 / Actions</span>
          <h2 className="text-3xl font-serif text-dark mb-12">Buttons</h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-xl border border-gray-100">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="link">Link Button</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-xl border border-gray-100">
                <Button size="xs">X-Small</Button>
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">X-Large</Button>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                States & Icons
              </h3>
              <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-xl border border-gray-100">
                <Button disabled>Disabled</Button>
                <Button isLoading>Loading</Button>
                <Button leftIcon={<Search size={18} />}>Search</Button>
                <Button rightIcon={<ArrowRight size={18} />}>Checkout</Button>
                <Button
                  leftIcon={<Heart size={18} />}
                  rightIcon={<ArrowRight size={18} />}
                >
                  Wishlist
                </Button>
                <Button
                  variant="outline"
                  className="rounded-full w-12 h-12 p-0 flex items-center justify-center"
                >
                  <Heart size={20} />
                </Button>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 4: Badges */}
        <motion.section
          id="badges"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">04 / Indicators</span>
          <h2 className="text-3xl font-serif text-dark mb-12">Badges</h2>

          <div className="space-y-8">
            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Variants
              </h3>
              <div className="flex flex-wrap gap-4 bg-white p-6 rounded-xl border border-gray-100">
                <Badge label="Default" variant="default" />
                <Badge label="New Arrival" variant="new" />
                <Badge label="Sale -20%" variant="sale" />
                <Badge label="Bestseller" variant="bestseller" />
                <Badge label="100% Organic" variant="organic" />
                <Badge label="Limited Edition" variant="limited" />
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">Sizes</h3>
              <div className="flex flex-wrap gap-4 items-center bg-white p-6 rounded-xl border border-gray-100">
                <Badge size="sm" variant="new" label="Small Badge" />
                <Badge size="md" variant="new" label="Medium Badge" />
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 5: Inputs */}
        <motion.section
          id="inputs"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">05 / Forms</span>
          <h2 className="text-3xl font-serif text-dark mb-12">Inputs</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl border border-gray-100">
            <div className="space-y-6">
              <Input label="Default Input" placeholder="Enter your text..." />
              <Input
                label="Filled Variant"
                variant="filled"
                placeholder="Filled input..."
              />
              <Input
                label="Underline Variant"
                variant="underline"
                placeholder="Underlined input..."
              />
              <Input
                label="With Left Icon"
                icon={<Search size={18} />}
                placeholder="Search products..."
              />
            </div>
            <div className="space-y-6">
              <Input
                label="With Right Icon"
                rightIcon={<Check size={18} className="text-success" />}
                placeholder="Valid input..."
              />
              <Input
                label="With Hint Text"
                hint="Password must be at least 8 characters"
                type="password"
                placeholder="••••••••"
              />
              <Input
                label="Error State"
                error="This field is required"
                placeholder="Error input..."
              />
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-dark">
                  Textarea
                </label>
                <textarea
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gold focus:border-gold placeholder:text-muted min-h-25"
                  placeholder="Write your review..."
                ></textarea>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 6: Cards & Surfaces */}
        <motion.section
          id="cards"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">06 / Surfaces</span>
          <h2 className="text-3xl font-serif text-dark mb-12">
            Cards & Surfaces
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 min-h-62.5 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl mb-2">.card Standard</h3>
                <p className="text-muted text-sm">
                  Default card surface with subtle shadow and border radius.
                </p>
              </div>
              <Button variant="outline" className="w-full">
                Action
              </Button>
            </div>

            <div className="card-glass p-6 min-h-62.5 flex flex-col justify-between bg-white/40 backdrop-blur-md">
              <div>
                <h3 className="font-serif text-xl mb-2">.card-glass</h3>
                <p className="text-dark/70 text-sm">
                  Glassmorphism effect for overlaid content on imagery.
                </p>
              </div>
              <Button variant="primary" className="w-full">
                Action
              </Button>
            </div>

            <div className="card p-6 min-h-62.5">
              <h3 className="font-serif text-xl mb-4">Skeleton Loading</h3>
              <div className="space-y-4">
                <div className="skeleton h-32 w-full rounded-md"></div>
                <div className="skeleton h-4 w-3/4 rounded"></div>
                <div className="skeleton h-4 w-1/2 rounded"></div>
                <div className="skeleton h-4 w-full rounded"></div>
              </div>
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-3">
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Product Card Example
              </h3>
              <div className="max-w-xs">
                <div className="card group overflow-hidden cursor-pointer">
                  <div className="relative aspect-4/5 bg-cream-mid overflow-hidden">
                    <Badge
                      label="New"
                      variant="new"
                      className="absolute top-3 left-3 z-10"
                    />
                    <button className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center text-dark hover:bg-white transition-colors">
                      <Heart size={16} />
                    </button>
                    <div className="absolute inset-0 flex items-center justify-center text-muted font-serif">
                      Image Placeholder
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className="font-serif text-lg group-hover:text-gold transition-colors">
                        Rose Hip Face Serum
                      </h4>
                      <Price amount={1299} />
                    </div>
                    <div className="flex items-center gap-1">
                      <Rating value={4.5} size="sm" />
                      <span className="text-xs text-muted">(128)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 7: Spacing & Layout */}
        <motion.section
          id="spacing"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">07 / Structure</span>
          <h2 className="text-3xl font-serif text-dark mb-12">
            Spacing & Layout
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Spacing Scale
              </h3>
              <div className="space-y-2 bg-white p-6 rounded-xl border border-gray-100">
                {[1, 2, 3, 4, 6, 8, 12, 16, 20].map((space) => (
                  <div key={space} className="flex items-center gap-4">
                    <span className="w-16 text-sm text-muted">sp-{space}</span>
                    <div
                      className="bg-gold/30 h-6 rounded-sm"
                      style={{ width: `${space * 0.25}rem` }}
                    ></div>
                    <span className="text-xs text-muted">{space * 4}px</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Container Widths
              </h3>
              <div className="space-y-4">
                <div className="bg-white border border-gray-200 p-2 text-center text-sm text-muted rounded max-w-3xl mx-auto">
                  max-w-3xl (768px)
                </div>
                <div className="bg-white border border-gray-200 p-2 text-center text-sm text-muted rounded max-w-5xl mx-auto">
                  max-w-5xl (1024px)
                </div>
                <div className="bg-white border border-gray-200 p-2 text-center text-sm text-muted rounded max-w-7xl mx-auto">
                  max-w-7xl (1280px)
                </div>
                <div className="bg-white border border-gold/30 p-2 text-center text-sm font-medium text-gold rounded container-luxury">
                  .container-luxury (1440px + px-6)
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Product Grid (.grid-products)
              </h3>
              <div className="grid-products grid grid-cols-2 md:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="bg-cream-mid aspect-4/5 rounded-xl flex items-center justify-center text-muted text-sm border border-gold/10"
                  >
                    Product {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 8: Shadows */}
        <motion.section
          id="shadows"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">08 / Depth</span>
          <h2 className="text-3xl font-serif text-dark mb-12">Shadows</h2>

          <div className="flex flex-wrap gap-8">
            <div className="w-32 h-32 bg-white rounded-xl shadow-xs flex items-center justify-center text-sm text-muted">
              shadow-xs
            </div>
            <div className="w-32 h-32 bg-white rounded-xl shadow-sm flex items-center justify-center text-sm text-muted">
              shadow-sm
            </div>
            <div className="w-32 h-32 bg-white rounded-xl shadow flex items-center justify-center text-sm text-muted">
              shadow
            </div>
            <div className="w-32 h-32 bg-white rounded-xl shadow-md flex items-center justify-center text-sm text-muted">
              shadow-md
            </div>
            <div className="w-32 h-32 bg-white rounded-xl shadow-lg flex items-center justify-center text-sm text-muted">
              shadow-lg
            </div>
            <div className="w-32 h-32 bg-white rounded-xl shadow-xl flex items-center justify-center text-sm text-muted">
              shadow-xl
            </div>
            <div className="w-32 h-32 bg-white rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex items-center justify-center text-sm text-gold font-medium border border-gold/10">
              shadow-card
            </div>
            <div className="w-32 h-32 bg-white rounded-xl shadow-[0_8px_30px_rgba(200,168,130,0.15)] flex items-center justify-center text-sm text-gold font-medium border border-gold/20">
              shadow-gold
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 9: Dividers */}
        <motion.section
          id="dividers"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">09 / Separators</span>
          <h2 className="text-3xl font-serif text-dark mb-12">Dividers</h2>

          <div className="bg-white p-12 rounded-xl border border-gray-100 space-y-12">
            <div>
              <p className="text-sm text-muted mb-4">Default Divider</p>
              <Divider />
            </div>

            <div>
              <p className="text-sm text-muted mb-4">
                Gold Divider (.divider-gold)
              </p>
              <div className="divider-gold h-px w-full"></div>
            </div>

            <div>
              <p className="text-sm text-muted mb-4">With Label</p>
              <Divider label="OR" />
            </div>

            <div>
              <p className="text-sm text-muted mb-4">Dashed Divider</p>
              <Divider variant="dashed" />
            </div>

            <div className="h-32 flex items-center justify-center gap-12">
              <span className="text-sm text-muted">Vertical</span>
              <Divider orientation="vertical" />
              <span className="text-sm text-muted">Dividers</span>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 10: Rating & Price */}
        <motion.section
          id="rating"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">10 / Components</span>
          <h2 className="text-3xl font-serif text-dark mb-12">
            Rating & Price
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-xl border border-gray-100">
            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">Ratings</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm text-muted">1.0</span>
                  <Rating value={1} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm text-muted">2.5</span>
                  <Rating value={2.5} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm text-muted">3.5</span>
                  <Rating value={3.5} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm text-muted">4.5</span>
                  <Rating value={4.5} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-12 text-sm text-muted">5.0</span>
                  <Rating value={5} />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">Prices</h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm text-muted">Regular</span>
                  <Price amount={4500} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm text-muted">With Discount</span>
                  <Price amount={4500} originalAmount={6000} />
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-24 text-sm text-muted">Large Size</span>
                  <Price amount={12900} size="lg" />
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 11: Motion & Animations */}
        <motion.section
          id="motion"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">11 / Experience</span>
          <h2 className="text-3xl font-serif text-dark mb-12">
            Motion & Animations
          </h2>

          <div className="space-y-12">
            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Hover Effects (Framer Motion)
              </h3>
              <div className="flex gap-6">
                <motion.div
                  whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.08)",
                  }}
                  className="w-48 h-64 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center p-4 cursor-pointer"
                >
                  <span className="text-sm font-medium mb-2">
                    Lift on Hover
                  </span>
                  <span className="text-xs text-muted text-center">
                    whileHover={"{ y: -8 }"}
                  </span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-48 h-64 bg-gold rounded-xl shadow-sm flex flex-col items-center justify-center p-4 cursor-pointer text-white"
                >
                  <span className="text-sm font-medium mb-2">
                    Scale on Hover/Tap
                  </span>
                  <span className="text-xs text-white/80 text-center">
                    whileHover={"{ scale: 1.05 }"}
                  </span>
                </motion.div>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Utility Classes
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center text-sm text-muted animate-fade-in border border-gray-100">
                  animate-fade-in
                </div>
                <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center text-sm text-muted animate-fade-up border border-gray-100">
                  animate-fade-up
                </div>
                <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center text-sm text-muted animate-pulse border border-gray-100">
                  animate-pulse
                </div>
                <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center text-sm text-muted animate-bounce border border-gray-100">
                  animate-bounce
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl text-muted mb-6 border-b pb-2">
                Transition Speeds
              </h3>
              <div className="space-y-4">
                <div className="group flex items-center gap-4 cursor-pointer">
                  <span className="w-24 text-sm text-muted">Duration 75</span>
                  <div className="h-8 bg-gold w-16 group-hover:w-full transition-all duration-75 rounded"></div>
                </div>
                <div className="group flex items-center gap-4 cursor-pointer">
                  <span className="w-24 text-sm text-muted">Duration 150</span>
                  <div className="h-8 bg-gold w-16 group-hover:w-full transition-all duration-150 rounded"></div>
                </div>
                <div className="group flex items-center gap-4 cursor-pointer">
                  <span className="w-24 text-sm text-muted">Duration 300</span>
                  <div className="h-8 bg-gold w-16 group-hover:w-full transition-all duration-300 rounded"></div>
                </div>
                <div className="group flex items-center gap-4 cursor-pointer">
                  <span className="w-24 text-sm text-muted">Duration 500</span>
                  <div className="h-8 bg-gold w-16 group-hover:w-full transition-all duration-500 rounded"></div>
                </div>
                <div className="group flex items-center gap-4 cursor-pointer">
                  <span className="w-24 text-sm text-muted">Duration 700</span>
                  <div className="h-8 bg-gold w-16 group-hover:w-full transition-all duration-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <Divider />

        {/* SECTION 12: Responsive Breakpoints */}
        <motion.section
          id="responsive"
          className="section-py-lg scroll-mt-20"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
        >
          <span className="eyebrow text-gold mb-2 block">12 / Environment</span>
          <h2 className="text-3xl font-serif text-dark mb-12">
            Responsive Breakpoints
          </h2>

          <div className="space-y-8">
            <div className="w-full h-12 flex rounded-lg overflow-hidden text-xs font-medium text-white shadow-sm">
              <div className="bg-charcoal flex-1 flex items-center justify-center border-r border-white/20">
                Mobile &lt; 640px
              </div>
              <div className="bg-gold-dark hidden sm:flex flex-1 items-center justify-center border-r border-white/20">
                Tablet 640px+
              </div>
              <div className="bg-gold hidden lg:flex flex-1 items-center justify-center border-r border-white/20">
                Laptop 1024px+
              </div>
              <div className="bg-success hidden xl:flex flex-1 items-center justify-center border-r border-white/20">
                Desktop 1280px+
              </div>
              <div className="bg-info hidden 2xl:flex flex-1 items-center justify-center">
                Large 1536px+
              </div>
            </div>

            <p className="text-sm text-muted text-center mt-4">
              Resize your browser window to see the responsive layout adapt
              above and below.
            </p>

            <div className="p-6 bg-white border border-gray-200 rounded-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="h-24 bg-cream-mid rounded flex items-center justify-center text-sm font-medium">
                  1
                </div>
                <div className="h-24 bg-cream-mid rounded flex items-center justify-center text-sm font-medium">
                  2
                </div>
                <div className="h-24 bg-cream-mid rounded hidden sm:flex items-center justify-center text-sm font-medium">
                  3
                </div>
                <div className="h-24 bg-cream-mid rounded hidden lg:flex items-center justify-center text-sm font-medium">
                  4
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
