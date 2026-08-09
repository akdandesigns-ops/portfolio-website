"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";
import Image from "next/image";

const categories = [
  {
    title: "FMCG & Food",
    desc: "Identity systems designed to work across packaging, shelves, social media, and digital campaigns.",
    image: "/categories/fmcg.png?v=2",
    color: "#FF8709"
  },
  {
    title: "Sports & Fitness",
    desc: "High-energy branding that captures movement, intensity, and a relentless drive.",
    image: "/categories/sports.png?v=2",
    color: "#00BAE2"
  },
  {
    title: "Fashion & Lifestyle",
    desc: "Premium identity direction for brands that need style, consistency, and emotional recall.",
    image: "/categories/fashion.png?v=2",
    color: "#FFA6FA"
  },
  {
    title: "Consumer Startups",
    desc: "Launch-ready branding for products entering competitive markets.",
    image: "/categories/tech.png",
    color: "#0AE448"
  }
];

export function HomeD2CFocus() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(0); // Default to first item expanded

  useGSAP(() => {
    gsap.fromTo(".d2c-accordion-item", 
      { 
        y: 60, 
        opacity: 0 
      },
      {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
        },
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out"
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex justify-center py-24 md:py-32 px-6 md:px-12 max-w-[2000px] mx-auto z-10 relative bg-bg">
      <div className="w-full flex flex-col gap-16 md:gap-24">
        
        <div className="w-full border-b border-border pb-8 max-w-4xl">
          <h2 className="font-sans font-light text-xl md:text-3xl text-text/80 leading-[1.4] max-w-2xl">
            I work with D2C businesses that need more than a good-looking logo. From FMCG and sports to fashion and lifestyle, I help brands create identities that feel clear, premium, trustworthy, and ready for the market.
          </h2>
        </div>

        <div>
          <AnimatedHeading 
            text="Built for brands that sell directly to people." 
            className="font-bebas text-5xl md:text-7xl tracking-wide uppercase text-text mb-12 max-w-3xl"
          />
          
          <div ref={cardsRef} className="w-full flex flex-col lg:flex-row h-auto lg:h-[600px] gap-2 lg:gap-4 overflow-hidden rounded-3xl">
            {categories.map((cat, i) => {
              const isHovered = hoveredIdx === i;
              
              return (
                <div 
                  key={i} 
                  className={`d2c-accordion-item relative flex flex-col justify-end overflow-hidden rounded-2xl transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] cursor-pointer ${
                    isHovered ? "lg:flex-[3] h-[300px] lg:h-full" : "lg:flex-[1] h-[100px] lg:h-full"
                  }`}
                  onMouseEnter={() => setHoveredIdx(i)}
                  onFocus={() => setHoveredIdx(i)}
                  tabIndex={0}
                >
                  {/* Background Image */}
                  <Image 
                    src={cat.image} 
                    alt={cat.title}
                    fill
                    className={`object-cover transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isHovered ? 'scale-100 opacity-100' : 'scale-110 opacity-40 grayscale brightness-75'}`}
                  />
                  
                  {/* Gradient Overlay for Text Readability */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-1000 ${isHovered ? 'opacity-100' : 'opacity-60'}`} />

                  {/* Content Container */}
                  <div className="relative z-10 p-6 md:p-8 flex flex-col gap-2 transition-opacity duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]">
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-white/50 tracking-widest hidden md:block transition-colors duration-1000">0{i + 1}</span>
                      <h3 className="font-bebas text-3xl md:text-5xl uppercase tracking-wide transition-colors duration-[1200ms] ease-out line-clamp-1 text-white">
                        {cat.title}
                      </h3>
                    </div>
                    
                    <div 
                      className={`grid transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isHovered ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0 mt-0"
                      }`}
                    >
                      <p className="font-sans font-light text-base md:text-lg text-white/90 overflow-hidden max-w-md leading-relaxed">
                        {cat.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
