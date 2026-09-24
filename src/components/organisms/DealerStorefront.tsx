"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Phone,
  Mail,
  Star,
  Users,
  Award,
  Share2,
  ExternalLink,
  MessageCircle,
} from "lucide-react";
import { ProductCard } from "@/components/molecules";
import { SanityImage, Button } from "@/components/atoms";
import { useDealerAttribution } from "@/lib/providers/DealerAttributionProvider";

interface SanityImageSource {
  asset?: { _ref?: string; url?: string };
  [key: string]: unknown;
}

interface ProductItem {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  image?: SanityImageSource | string;
  rating?: number;
  reviewCount?: number;
  badge?: string;
}

interface Dealer {
  id: string;
  name: string;
  slug: string;
  dealerCode?: string;
  photo?: SanityImageSource;
  tagline?: string;
  bio?: string;
  phone?: string;
  email?: string;
  city?: string;
  state?: string;
  yearsExperience?: number;
  clientsServed?: number;
  rating?: number;
  instagramUrl?: string;
  facebookUrl?: string;
  whatsappNumber?: string;
}

interface StatItem {
  label: string;
  value: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

interface DealerStorefrontProps {
  dealer: Dealer;
  products: ProductItem[];
}

export const DealerStorefront: React.FC<DealerStorefrontProps> = ({
  dealer,
  products,
}) => {
  const { setAttribution } = useDealerAttribution();

  // Capture dealer attribution the moment customer lands on this page.
  // This persists silently through Homepage → Cart → Checkout.
  // Prices are NEVER affected — this is attribution only.
  useEffect(() => {
    setAttribution({
      slug: dealer.slug,
      code: dealer.dealerCode || dealer.slug,
      name: dealer.name,
      capturedAt: new Date().toISOString(),
    });
  }, [dealer.slug, dealer.dealerCode, dealer.name, setAttribution]);

  const whatsappHref = dealer.whatsappNumber
    ? `https://wa.me/${dealer.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(`Hi ${dealer.name}, I found you on Lumière and I'm interested in your products.`)}`
    : null;

  const stats = [
    dealer.yearsExperience && {
      label: "Years Experience",
      value: `${dealer.yearsExperience}+`,
      icon: Award,
    },
    dealer.clientsServed && {
      label: "Clients Served",
      value: `${dealer.clientsServed}+`,
      icon: Users,
    },
    dealer.rating && {
      label: "Rating",
      value: `${dealer.rating}/5`,
      icon: Star,
    },
  ].filter(Boolean) as StatItem[];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero / Dealer Profile Header */}
      <section className="relative bg-brand-dark text-white pt-32 pb-20 overflow-hidden">
        {/* Subtle Gold Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, #C8A882 0%, transparent 50%), radial-gradient(circle at 80% 50%, #C8A882 0%, transparent 50%)",
          }}
        />

        <div className="container-luxury max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-10">
            {/* Photo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative shrink-0"
            >
              <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-brand-gold shadow-2xl">
                {dealer.photo ? (
                  <SanityImage
                    image={dealer.photo}
                    alt={dealer.name}
                    width={192}
                    height={192}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-brand-gold/20 flex items-center justify-center">
                    <span className="font-serif text-5xl text-brand-gold">
                      {dealer.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              {/* Verified Badge */}
              <div className="absolute -bottom-2 -right-2 bg-brand-gold rounded-full px-3 py-1 flex items-center gap-1 shadow-lg">
                <Award size={12} className="text-white" />
                <span className="text-white text-[10px] font-bold uppercase tracking-wider">
                  Verified
                </span>
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-center md:text-left"
            >
              <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-2">
                Authorized Lumière Dealer
              </p>
              <h1 className="font-serif text-4xl md:text-5xl text-white mb-3">
                {dealer.name}
              </h1>
              {dealer.tagline && (
                <p className="text-white/70 text-lg font-light mb-4 italic">
                  &ldquo;{dealer.tagline}&rdquo;
                </p>
              )}
              {(dealer.city || dealer.state) && (
                <p className="flex items-center justify-center md:justify-start gap-1.5 text-white/60 text-sm mb-6">
                  <MapPin size={14} className="text-brand-gold" />
                  {[dealer.city, dealer.state].filter(Boolean).join(", ")}
                </p>
              )}
              {dealer.bio && (
                <p className="text-white/70 font-light max-w-xl leading-relaxed mb-6">
                  {dealer.bio}
                </p>
              )}

              {/* Social / Contact links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors shadow-md"
                  >
                    <MessageCircle size={16} />
                    WhatsApp
                  </a>
                )}
                {dealer.phone && (
                  <a
                    href={`tel:${dealer.phone}`}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-5 py-2.5 rounded-full transition-colors border border-white/20"
                  >
                    <Phone size={16} />
                    Call
                  </a>
                )}
                {dealer.email && (
                  <a
                    href={`mailto:${dealer.email}`}
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-5 py-2.5 rounded-full transition-colors border border-white/20"
                  >
                    <Mail size={16} />
                    Email
                  </a>
                )}
                {dealer.instagramUrl && (
                  <a
                    href={dealer.instagramUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-full transition-colors border border-white/20"
                  >
                    <Share2 size={16} />
                  </a>
                )}
                {dealer.facebookUrl && (
                  <a
                    href={dealer.facebookUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-sm px-4 py-2.5 rounded-full transition-colors border border-white/20"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>

          {/* Stats Bar */}
          {stats.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4"
            >
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm"
                >
                  <stat.icon
                    size={20}
                    className="text-brand-gold mx-auto mb-2"
                  />
                  <p className="font-serif text-3xl text-white mb-1">
                    {stat.value}
                  </p>
                  <p className="text-white/50 text-xs uppercase tracking-widest">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container-luxury max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-4">
              Curated by {dealer.name}
            </p>
            <h2 className="font-serif text-4xl md:text-5xl text-brand-dark mb-4">
              Available Products
            </h2>
            <p className="text-gray-500 font-light text-lg max-w-xl mx-auto">
              Order directly through {dealer.name} for personalized service and
              expert advice.
            </p>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product: any) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="font-serif text-2xl mb-2">No products listed yet</p>
              <p className="font-light">Check back soon.</p>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA — Contact Dealer */}
      <section className="bg-brand-dark text-white py-20">
        <div className="container-luxury max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">
            Order from {dealer.name}
          </h2>
          <p className="text-white/60 font-light text-lg mb-10">
            Get personalized recommendations, bulk pricing, and expert support
            directly from your local authorized Lumière dealer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {whatsappHref && (
              <a href={whatsappHref} target="_blank" rel="noreferrer">
                <Button
                  variant="primary"
                  size="lg"
                  className="h-14 px-10 rounded-full uppercase tracking-widest text-sm gap-2"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </Button>
              </a>
            )}
            {dealer.phone && (
              <a href={`tel:${dealer.phone}`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-10 rounded-full uppercase tracking-widest text-sm border-white/30 text-white hover:bg-white hover:text-brand-dark gap-2"
                >
                  <Phone size={18} />
                  Call Now
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer note */}
      <div className="bg-brand-dark border-t border-white/5 py-6 text-center">
        <p className="text-white/30 text-xs">
          This is an authorized Lumière dealer page. Products and prices are
          managed by Lumière Professional.
        </p>
      </div>
    </div>
  );
};
