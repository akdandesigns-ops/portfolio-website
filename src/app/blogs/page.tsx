"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Link from "next/link";
import AnimatedHeading from "@/components/AnimatedHeading";

import blogsData from "@/data/blogs.json";

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
}

export default function BlogsIndex() {
  const posts = blogsData as Post[];
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    
    gsap.from(".fade-in", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.utils.toArray<HTMLElement>(".blog-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        opacity: 0,
        x: -20,
        duration: 0.6,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef, dependencies: [posts] });

  return (
    <div ref={containerRef} className="w-full max-w-[1200px] mx-auto px-6 md:px-12 py-32 min-h-screen flex flex-col pt-40">
      
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
      <div 
        className="fade-in w-full flex-col flex gap-8 mb-24 border-b border-border pb-24"
      >
        <Link href="/blogs/written-by-rivers" className="group flex flex-col gap-6">
          <div className="relative w-full aspect-[2/1] bg-surface overflow-hidden">
            <Image 
              src="/blogs/written-by-rivers/hero-aerial.avif" 
              fill 
              alt="Featured" 
              className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
              priority
            />
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.1em] uppercase">
              <div className="brand-text-gradient flex items-center gap-4">
                <span>APR 16, 2026</span>
                <span>—</span>
                <span>10 MIN READ</span>
                <span>—</span>
              </div>
              <div className="border brand-border-gradient px-2 py-[2px] rounded-sm">
                <span className="brand-text-gradient">Featured</span>
              </div>
            </div>
            <h2 className="font-sans font-medium text-3xl md:text-5xl text-text group-hover:brand-text-gradient transition-colors duration-300 w-full max-w-[800px]">
              Written by Rivers: The Brazilian Amazon's First Brand Identity
            </h2>
          </div>
        </Link>
      </div>

      {/* Post List */}
      <div className="flex flex-col gap-8 w-full">
        {posts.length === 0 ? (
          <div className="font-mono text-muted text-sm uppercase tracking-widest py-10">
            No articles found.
          </div>
        ) : (
          posts.map((post, i) => (
            <div
              key={post.slug}
              className="blog-card"
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
                  <h3 className="font-sans font-medium text-xl md:text-2xl text-text group-hover:brand-text-gradient transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 font-mono text-[11px] text-muted tracking-[0.1em] uppercase">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                    <span className="text-text/50">{post.tag}</span>
                  </div>
                </div>

                <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-mono brand-text-gradient text-sm">
                  READ →
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

    </div>
  );
}
