"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MediaItem from "./MediaItem";

gsap.registerPlugin(ScrollTrigger);

interface CaseStudyHeroProps {
  title: string;
  category: string;
  year: string;
  heroImage?: string;
  heroVideo?: string;
  bannerImage?: string;
  hideBannerImage?: boolean;
  imageFit?: "cover" | "contain";
  bannerBackgroundColor?: string;
}

export default function CaseStudyHero({
  title,
  category,
  year,
  heroImage,
  heroVideo,
  bannerImage,
  hideBannerImage,
  imageFit,
  bannerBackgroundColor,
}: CaseStudyHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current) return;
    
    // Animate title in
    gsap.from(".hero-title-line", {
      yPercent: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: "power4.out",
      delay: 0.2
    });

    gsap.from(".hero-meta", {
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 0.6
    });
    
    // Subtle parallax and scale out on scroll
    if (imageRef.current) {
      gsap.to(imageRef.current, {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: "15%",
        scale: 1.05,
        ease: "none",
      });
    }
  }, { scope: containerRef });

  const imageSrc = bannerImage || heroVideo || heroImage || "";

  return (
    <div ref={containerRef} className="w-full flex flex-col pt-32 pb-0">
      <div className="px-6 md:px-16 lg:px-24 mb-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
        <div className="md:col-span-8 overflow-hidden">
          <h1 className="font-bebas text-[60px] sm:text-[90px] md:text-[140px] lg:text-[180px] leading-[0.85] tracking-wider uppercase text-text/90">
             <span className="inline-block hero-title-line">{title}</span>
          </h1>
        </div>
        <div className="md:col-span-4 flex flex-col justify-end hero-meta">
          <div className="flex flex-col gap-2 border-l border-text/20 pl-6 mb-4">
             <span className="font-mono text-[10px] md:text-[11px] text-text/40 tracking-[0.2em] uppercase">Category</span>
             <span className="font-sans text-[14px] md:text-[16px] text-text/80">{category}</span>
          </div>
          <div className="flex flex-col gap-2 border-l border-text/20 pl-6">
             <span className="font-mono text-[10px] md:text-[11px] text-text/40 tracking-[0.2em] uppercase">Year</span>
             <span className="font-sans text-[14px] md:text-[16px] text-text/80">{year}</span>
          </div>
        </div>
      </div>
      
      {!hideBannerImage && (
        <div 
          className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden"
          style={bannerBackgroundColor ? { backgroundColor: bannerBackgroundColor } : {}}
        >
          <div ref={imageRef} className="absolute inset-0 w-full h-full transform-gpu origin-center">
            <MediaItem
              allowUnmute
              src={imageSrc}
              alt={title}
              fill
              priority
              quality={90}
              className={`${imageFit === 'contain' ? 'object-contain p-8 md:p-16' : 'object-cover'}`}
              sizes="(max-width: 768px) 100vw, 100vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
