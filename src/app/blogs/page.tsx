"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";
import AnimatedHeading from "@/components/AnimatedHeading";

const posts = [
  {
    slug: "the-death-of-the-landing-page",
    title: "The Death of the Landing Page: Why Storytelling is the Only Metric Left",
    date: "APR 04, 2024",
    readTime: "8 MIN READ",
    tag: "Brand Strategy",
    image: "https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=1600",
  },
  {
    slug: "design-system-efficiency",
    title: "Why Modular Design Systems Fail Without Architecture",
    date: "MAR 12, 2024",
    readTime: "4 MIN READ",
    tag: "Design Theory",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800",
  },
  {
    slug: "silence-in-design",
    title: "Silence as a Differentiator in Saturated Markets",
    date: "FEB 24, 2024",
    readTime: "6 MIN READ",
    tag: "Brand Strategy",
    image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800",
  },
  {
    slug: "typography-first",
    title: "Rethinking Hierarchy: The Case for Typography-First Web",
    date: "JAN 18, 2024",
    readTime: "5 MIN READ",
    tag: "Web Design",
    image: "https://images.unsplash.com/photo-1510413009623-2895f36e89af?q=80&w=800",
  },
];

export default function BlogsIndex() {
  return (
    <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-32 min-h-screen flex flex-col pt-40">
      
      {/* Header */}
      <div className="mb-20">
        <AnimatedHeading 
          text="BLOGS"
          className="font-bebas text-6xl md:text-9xl text-text leading-none tracking-wide"
        />
        <p className="font-mono text-[13px] md:text-[15px] text-muted tracking-widest uppercase mt-4">
          Thoughts on brand, design, and culture
        </p>
      </div>

      {/* Featured Post */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex-col flex gap-8 mb-24 border-b border-border pb-24"
      >
        <Link href="/blogs/written-by-rivers" className="group flex flex-col gap-6">
          <div className="relative w-full aspect-[2/1] bg-surface overflow-hidden">
            <Image 
              src="/blogs/written-by-rivers/hero-aerial.png" 
              fill 
              alt="Featured" 
              className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
              priority
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 font-mono text-[11px] text-accent tracking-[0.1em] uppercase">
              <span>APR 16, 2026</span>
              <span>—</span>
              <span>10 MIN READ</span>
              <span>—</span>
              <span className="border border-accent px-2 py-[2px] rounded-sm">Featured</span>
            </div>
            <h2 className="font-sans font-medium text-3xl md:text-5xl text-text group-hover:text-accent transition-colors duration-300 w-full max-w-[800px]">
              Written by Rivers: The Brazilian Amazon's First Brand Identity
            </h2>
          </div>
        </Link>
      </motion.div>

      {/* Post List */}
      <div className="flex flex-col gap-8 w-full">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
          >
            <Link 
              href={`/blogs/${post.slug}`}
              className="group flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-12 py-8 border-b border-border hover:bg-surface transition-colors duration-300 w-full"
            >
              <div className="relative w-[120px] h-[80px] shrink-0 overflow-hidden bg-surface hidden md:block">
                <Image 
                  src={post.image} 
                  fill 
                  alt={post.title} 
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <h3 className="font-sans font-medium text-xl md:text-2xl text-text group-hover:text-accent transition-colors duration-300">
                  {post.title}
                </h3>
                <div className="flex flex-wrap gap-4 font-mono text-[11px] text-muted tracking-[0.1em] uppercase">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                  <span className="text-text/50">{post.tag}</span>
                </div>
              </div>

              <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono text-accent text-sm">
                READ →
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
