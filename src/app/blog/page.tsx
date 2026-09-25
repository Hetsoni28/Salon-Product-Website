import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Editorial & Blog | LUMIÈRE",
  description:
    "Techniques, business insights, and news for professional salons by LUMIÈRE.",
};

export default function BlogPage() {
  const mockPosts = [
    {
      id: "1",
      title: "The Science of Low-Temperature Waxing",
      category: "Technique",
      date: "Sep 12, 2026",
      excerpt:
        "How modern polymer blends in hard wax are virtually eliminating client burns and redness during sensitive treatments.",
      image: "/images/hero-bg.jpg",
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Maximizing Salon Revenue with Premium Services",
      category: "Business",
      date: "Aug 28, 2026",
      excerpt:
        "Transitioning your salon menu from basic waxing to premium hair removal experiences that command higher price points.",
      image: "/images/product-1.jpg",
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Pre and Post Care: The Overlooked Essentials",
      category: "Education",
      date: "Aug 10, 2026",
      excerpt:
        "Why cleansing and soothing treatments are just as important as the wax itself for ensuring client retention.",
      image: "/images/product-2.jpg",
      readTime: "4 min read",
    },
    {
      id: "4",
      title: "Hygiene Standards in High-Volume Salons",
      category: "Best Practices",
      date: "Jul 22, 2026",
      excerpt:
        "Maintaining impeccable hygiene without slowing down your service turnover rate during peak hours.",
      image: "/images/hero-bg.jpg",
      readTime: "6 min read",
    },
    {
      id: "5",
      title: "Introducing the Pearl Collection",
      category: "Product News",
      date: "Jul 05, 2026",
      excerpt:
        "An inside look at the formulation of our flagship hard wax beans and why top estheticians are making the switch.",
      image: "/images/product-1.jpg",
      readTime: "3 min read",
    },
    {
      id: "6",
      title: "Building a Loyal Client Base",
      category: "Business",
      date: "Jun 18, 2026",
      excerpt:
        "Strategies for turning first-time walk-ins into lifelong regular clients through superior service and trust.",
      image: "/images/product-2.jpg",
      readTime: "8 min read",
    },
  ];

  const featuredPost = mockPosts[0];
  const regularPosts = mockPosts.slice(1);

  return (
    <div className="min-h-screen bg-brand-cream pt-32 pb-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-gold uppercase tracking-[0.3em] text-sm font-semibold mb-4">
            The Editorial
          </p>
          <h1 className="font-serif text-5xl md:text-6xl text-brand-dark mb-6">
            Insights & Techniques
          </h1>
          <p className="text-gray-500 font-light max-w-2xl mx-auto">
            Expert education, business strategies, and industry news crafted
            specifically for salon owners and professional estheticians.
          </p>
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 bg-white flex flex-col lg:flex-row h-auto lg:h-[28rem]">
            <div className="w-full lg:w-3/5 h-[300px] lg:h-full relative overflow-hidden">
              <Image
                src={featuredPost.image}
                alt={featuredPost.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-semibold tracking-widest uppercase text-brand-gold">
                  {featuredPost.category}
                </span>
                <div className="h-4 w-px bg-gray-300" />
                <span className="text-sm text-gray-400 font-light">
                  {featuredPost.date}
                </span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-brand-dark mb-6 group-hover:text-brand-gold transition-colors">
                {featuredPost.title}
              </h2>
              <p className="text-gray-500 font-light leading-relaxed mb-8">
                {featuredPost.excerpt}
              </p>
              <Link
                href="#"
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors mt-auto"
              >
                Read Article <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Grid Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <div
              key={post.id}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-brand-divider"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-brand-charcoal">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4 text-sm text-gray-400 font-light">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-serif text-xl text-brand-dark mb-4 group-hover:text-brand-gold transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-500 font-light text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.excerpt}
                </p>
                <Link
                  href="#"
                  className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-brand-charcoal hover:text-brand-gold transition-colors mt-auto"
                >
                  Read More <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <button className="h-12 px-8 rounded-full border border-brand-charcoal text-brand-charcoal text-sm font-semibold uppercase tracking-widest hover:bg-brand-charcoal hover:text-white transition-colors">
            Load More Articles
          </button>
        </div>
      </div>
    </div>
  );
}
