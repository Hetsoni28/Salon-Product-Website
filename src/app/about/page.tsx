import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Leaf, Sparkles, Award } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us | LUMIÈRE',
  description: 'Learn about LUMIÈRE Professional, the standard for premium salon waxing products across India.',
};

export default function AboutPage() {
  const stats = [
    { label: 'Salons Across India', value: '10,000+' },
    { label: 'Years of Excellence', value: '15+' },
    { label: 'Professional Products', value: '50+' },
    { label: 'Client Satisfaction', value: '99.9%' },
  ];

  return (
    <div className="min-h-screen bg-brand-cream">
      {/* Hero Section */}
      <section className="relative w-full h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <Image
          src="/images/hero-bg.jpg"
          alt="LUMIÈRE Professional Environment"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-6">Our Story</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">The LUMIÈRE Standard</h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Elevating the art of hair removal. We provide India's most prestigious salons with the tools they need to deliver flawless, pain-free experiences.
          </p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 px-4 container-luxury">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="w-full lg:w-1/2">
            <h2 className="font-serif text-4xl text-brand-dark mb-6">Born from a passion for perfection.</h2>
            <p className="text-gray-600 font-light leading-relaxed mb-6">
              Founded by industry veterans, LUMIÈRE was created to bridge the gap between traditional waxing methods and modern skincare science. We understood that a salon's reputation hinges on client comfort and results.
            </p>
            <p className="text-gray-600 font-light leading-relaxed">
              Today, our signature Pearl Hard Wax and comprehensive pre/post care range are the backbone of thousands of high-end salon operations. We don't just sell wax; we partner with professionals to elevate their entire service standard.
            </p>
          </div>
          <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-brand-charcoal/5" />
              <Image src="/images/product-1.jpg" alt="Lumiere Wax" fill className="object-cover" />
            </div>
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mt-12">
              <div className="absolute inset-0 bg-brand-charcoal/5" />
              <Image src="/images/product-2.jpg" alt="Lumiere Gel" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-brand-dark text-white">
        <div className="container-luxury grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className="text-4xl md:text-5xl font-serif text-brand-gold mb-4">{stat.value}</div>
              <div className="text-sm uppercase tracking-widest text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality Pillars */}
      <section className="py-24 px-4 bg-white">
        <div className="container-luxury">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl text-brand-dark mb-4">Our Quality Pillars</h2>
            <p className="text-gray-500 font-light">The foundational principles behind every LUMIÈRE product.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold mb-6">
                <ShieldCheck size={28} />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-4">Dermatologist Tested</h3>
              <p className="text-gray-500 font-light leading-relaxed">Rigorous clinical testing ensures our formulas are safe and gentle, even on the most sensitive client profiles.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold mb-6">
                <Sparkles size={28} />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-4">Low-Temperature Melt</h3>
              <p className="text-gray-500 font-light leading-relaxed">Our advanced polymers melt at significantly lower temperatures, virtually eliminating the risk of burns and discomfort.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-brand-cream flex items-center justify-center text-brand-gold mb-6">
                <Leaf size={28} />
              </div>
              <h3 className="font-serif text-2xl text-brand-dark mb-4">Ethical Sourcing</h3>
              <p className="text-gray-500 font-light leading-relaxed">We source premium rosins and soothing botanical extracts responsibly, ensuring high performance without compromise.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
