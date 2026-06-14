"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

const cards = [
  {
    title: "FMCG & Food Brands",
    desc: "Identity systems designed to work across packaging, shelves, social media, and digital campaigns."
  },
  {
    title: "Sports & Fitness Brands",
    desc: "Bold visual systems built for energy, performance, community, and merchandise."
  },
  {
    title: "Fashion & Lifestyle Brands",
    desc: "Premium identity direction for brands that need style, consistency, and emotional recall."
  },
  {
    title: "Consumer Product Startups",
    desc: "Launch-ready branding for products entering competitive markets."
  }
];

export function HomeD2CFocus() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".d2c-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out"
    });
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {cards.map((card, i) => (
              <div 
                key={i}
                className="d2c-card group flex flex-col gap-6 p-8 border border-border bg-surface hover:border-text transition-colors duration-500 rounded-sm relative overflow-hidden"
              >
                <div className="font-mono text-xs uppercase tracking-widest text-muted group-hover:text-text transition-colors duration-500">
                  0{i + 1}
                </div>
                
                <h3 className="font-bebas text-3xl md:text-4xl tracking-wide uppercase text-text">
                  {card.title}
                </h3>
                
                <p className="font-sans font-light text-[15px] leading-[1.6] text-text/70 group-hover:text-text/90 transition-colors duration-500 mt-auto pt-8">
                  {card.desc}
                </p>
                
                {/* Subtle highlight line at bottom */}
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-border scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-700 ease-out brand-bg-gradient" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
