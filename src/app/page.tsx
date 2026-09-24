import {
  HeroSection,
  LogoTicker,
  FeaturedSection,
  BenefitsSection,
  ProductBenefitsSection,
  ProUseSection,
  BrandStorySection,
  DealerCTASection,
  ContactSection,
} from "@/components";

// --- Mock Data ---
const featuredProducts = [
  {
    id: "1",
    title: "Premium Hard Wax Beans - Pearl",
    slug: "premium-hard-wax",
    price: 2400,
    badge: "Bestseller",
    image:
      "/images/product-1.jpg",
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: "2",
    title: "Pre-Wax Cleansing Gel",
    slug: "pre-wax-cleansing-gel",
    price: 1800,
    badge: "New",
    image:
      "/images/product-2.jpg",
    rating: 4.9,
    reviewCount: 84,
  },
  {
    id: "3",
    title: "Post-Wax Calming Oil",
    slug: "post-wax-calming-oil",
    price: 1200,
    image:
      "/images/product-3.jpg",
    rating: 4.9,
    reviewCount: 210,
  },
  {
    id: "4",
    title: "Professional Wax Heater",
    slug: "professional-wax-heater",
    price: 4500,
    badge: "Sale",
    image:
      "/images/product-4.jpg",
    rating: 5.0,
    reviewCount: 45,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. Hero */}
      <HeroSection
        title="Professional Salon Essentials"
        subtitle="Discover our premium range of professional waxes, pre-care, and salon supplies."
        ctaLabel="Shop Collection"
        ctaHref="/shop"
        image={{}}
      />

      <LogoTicker />

      {/* 2. Featured Products */}
      <FeaturedSection
        title="Featured Collection"
        subtitle="Our most sought-after salon essentials designed to elevate your professional services."
        products={featuredProducts}
      />

      {/* 3. Why Choose Our Products (BenefitsSection repurposed) */}
      <BenefitsSection />

      {/* 4. Product Benefits (Wax specifics) */}
      <ProductBenefitsSection />

      {/* 5. Professional / Salon Use */}
      <ProUseSection />

      {/* 6. Brand Story */}
      <BrandStorySection />

      {/* 7. Dealer CTA */}
      <DealerCTASection />

      {/* 8. Contact */}
      <ContactSection />
    </div>
  );
}

// Trigger Turbopack rebuild

