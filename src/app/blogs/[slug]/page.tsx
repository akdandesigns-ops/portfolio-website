"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import blogsData from "@/data/blogs.json";
import MagneticButton from "@/components/MagneticButton";

interface Post {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  tag: string;
  image: string;
  quote: string;
  paragraphs: string[];
}

export default function BlogPostPage() {
  const containerRef = useRef<HTMLElement>(null);
  const { slug } = useParams();
  
  const post = (blogsData as Post[]).find((p) => p.slug === slug);

  useGSAP(() => {
    if (!post) return;
    gsap.from(".fade-up", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
    gsap.from(".fade-scale", {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: 0.4,
      ease: "power3.out"
    });
    gsap.from(".fade-in", {
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "power3.out"
    });
  }, { scope: containerRef, dependencies: [post] });
  
  if (!post) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-bg text-text pt-40 px-6 text-center gap-8">
        <h1 className="font-bebas text-5xl md:text-7xl uppercase tracking-wider text-accent">
          ARTICLE NOT FOUND
        </h1>
        <p className="font-sans font-light text-text/60 max-w-[500px]">
          The article you are looking for does not exist or has been removed.
        </p>
        <MagneticButton>
          <Link href="/blogs" className="px-8 py-4 bg-accent text-bg font-mono text-sm uppercase tracking-widest hover:bg-transparent hover:text-accent border border-transparent hover:border-accent transition-all duration-300">
            Back to Journal
          </Link>
        </MagneticButton>
      </div>
    );
  }

  return (
    <article ref={containerRef} className="w-full flex flex-col items-center bg-bg text-text selection:bg-accent selection:text-bg pt-40 px-6 md:px-12 pb-32">
      
      {/* Header Area */}
      <header className="max-w-[720px] w-full flex flex-col items-center text-center gap-8 mb-16">
        <div className="flex gap-4 font-mono text-[11px] text-muted tracking-[0.15em] uppercase fade-up">
          <span>{post.date}</span>
          <span>By akdandesigns</span>
          <span>{post.readTime}</span>
        </div>
        
        <h1 className="font-bebas text-5xl md:text-[80px] leading-[0.9] tracking-wide fade-up uppercase">
          {post.title}
        </h1>
      </header>

      {/* Featured Image */}
      <div className="w-full max-w-[1000px] aspect-[21/9] relative mb-20 fade-scale">
        <Image 
          src={post.image} 
          fill 
          alt={post.title} 
          className="object-cover"
          priority
        />
      </div>

      {/* Body Copy */}
      <div className="max-w-[720px] w-full flex flex-col gap-8 font-sans font-light text-[18px] leading-[1.8] text-text/85 fade-scale">
        
        {/* Render paragraphs, injecting the pull quote after the 2nd paragraph if possible */}
        {post.paragraphs.map((para, index) => (
          <div key={index} className="flex flex-col gap-8">
            <p>{para}</p>
            {index === 1 && post.quote && (
              <blockquote className="my-8 md:my-12 pl-8 py-2 border-l-4 border-accent">
                <p className="font-bebas text-4xl md:text-5xl italic text-text leading-none tracking-wide uppercase">
                  "{post.quote}"
                </p>
              </blockquote>
            )}
          </div>
        ))}
      </div>

      {/* Read More Section */}
      <div className="w-full max-w-[1200px] mt-32 pt-16 border-t border-border flex flex-col">
        <h3 className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-12 text-center md:text-left">
          More from the Blog
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          <Link href="/blogs/written-by-rivers" className="group flex flex-col gap-4">
            <div className="aspect-[3/2] relative w-full overflow-hidden">
              <Image 
                src="/blogs/written-by-rivers/hero-aerial.png" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" 
                alt="Related" 
              />
            </div>
            <h4 className="font-sans font-medium text-2xl text-text group-hover:text-accent transition-colors">
              Written by Rivers: The Brazilian Amazon's First Brand Identity
            </h4>
          </Link>
          
          <Link href="/blogs" className="group flex flex-col gap-4">
            <div className="aspect-[3/2] relative w-full overflow-hidden bg-surface flex items-center justify-center border border-border">
              <span className="font-bebas text-5xl text-muted group-hover:text-accent transition-colors">VIEW ALL</span>
            </div>
            <h4 className="font-sans font-medium text-2xl text-text group-hover:text-accent transition-colors">
              Explore More Articles in the Journal
            </h4>
          </Link>

        </div>
      </div>

    </article>
  );
}
