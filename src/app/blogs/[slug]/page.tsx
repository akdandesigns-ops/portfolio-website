"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import MagneticButton from "@/components/MagneticButton";

export default function BlogPostPage() {
  // In a real app we'd fetch data with the slug.
  
  return (
    <article className="w-full flex flex-col items-center bg-bg text-text selection:bg-accent selection:text-bg pt-40 px-6 md:px-12 pb-32">
      
      {/* Header Area */}
      <header className="max-w-[720px] w-full flex flex-col items-center text-center gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 font-mono text-[11px] text-muted tracking-[0.15em] uppercase"
        >
          <span>APR 04, 2024</span>
          <span>By akdandesigns</span>
          <span>8 MIN READ</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="font-bebas text-5xl md:text-[80px] leading-[0.9] tracking-wide"
        >
          THE DEATH OF THE LANDING PAGE
        </motion.h1>
      </header>

      {/* Featured Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="w-full max-w-[1000px] aspect-[21/9] relative mb-20"
      >
        <Image 
          src="https://images.unsplash.com/photo-1502224562085-639556652f33?q=80&w=2000" 
          fill 
          alt="Featured" 
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Body Copy */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="max-w-[720px] w-full flex flex-col gap-8 font-sans font-light text-[18px] leading-[1.8] text-text/85"
      >
        <p>
          We have entered the era of the endless scroll, the ubiquitous component library, and the templated aesthetic. Finding a SaaS layout that doesn’t employ a standard left-aligned h1, two buttons, and a massive dashboard dashboard mockup on the right is increasingly rare.
        </p>

        <p>
          But visual noise has an endpoint. When every brand shouts at the exact same frequency, total silence is the only sound that commands attention. In a saturated market, restraint is a luxury.
        </p>

        {/* Pull Quote */}
        <blockquote className="my-12 pl-8 py-2 border-l-4 border-accent">
          <p className="font-bebas text-4xl md:text-5xl italic text-text leading-none tracking-wide">
            "When every brand shouts at the exact same frequency, total silence is the only sound that commands attention."
          </p>
        </blockquote>

        <p>
          Moving forward, brands will be defined not by how much information they can compress into an above-the-fold viewport, but by the confidence they exude through negative space. It's the difference between desperation and authority. To design authentically in this space, one must prioritize tension over mere balance. Structural rigidity, extreme grid awareness, and the exact placement of single elements against an infinite canvas.
        </p>
      </motion.div>

      {/* Read More Section */}
      <div className="w-full max-w-[1200px] mt-32 pt-16 border-t border-border flex flex-col">
        <h3 className="font-mono text-[11px] text-muted tracking-[0.2em] uppercase mb-12 text-center md:text-left">
          More from the Blog
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
          
          <Link href="/blogs/silence-in-design" className="group flex flex-col gap-4">
            <div className="aspect-[3/2] relative w-full overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" 
                alt="Related" 
              />
            </div>
            <h4 className="font-sans font-medium text-2xl text-text group-hover:text-accent transition-colors">
              Silence as a Differentiator in Saturated Markets
            </h4>
          </Link>
          
          <Link href="/blogs/typography-first" className="group flex flex-col gap-4">
            <div className="aspect-[3/2] relative w-full overflow-hidden">
              <Image 
                src="https://images.unsplash.com/photo-1510413009623-2895f36e89af?q=80&w=800" 
                fill 
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-105" 
                alt="Related 2" 
              />
            </div>
            <h4 className="font-sans font-medium text-2xl text-text group-hover:text-accent transition-colors">
              Rethinking Hierarchy: The Case for Typography-First Web
            </h4>
          </Link>

        </div>
      </div>

    </article>
  );
}
