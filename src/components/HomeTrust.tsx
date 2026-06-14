"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

const points = [
  "Helps the product look premium",
  "Creates consumer trust faster",
  "Improves recall across social media and packaging",
  "Builds consistency across every touchpoint",
  "Supports better launch and marketing communication"
];

export function HomeTrust() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".trust-item", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      },
      y: 30,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex justify-center py-24 md:py-32 px-6 md:px-12 max-w-[2000px] mx-auto z-10 relative bg-bg">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-16 md:gap-24 items-center">
        
        {/* Left Column */}
        <div className="w-full md:w-1/2 flex flex-col gap-6">
          <AnimatedHeading 
            text="Why D2C brands need more than a logo." 
            className="font-bebas text-5xl md:text-7xl tracking-wide uppercase text-text"
          />
          <p className="font-sans font-light text-[16px] md:text-[18px] leading-[1.6] text-text/80">
            In D2C, people often judge the brand before they try the product. A strong identity helps your product feel trustworthy, desirable, and different in a crowded market.
          </p>
        </div>

        {/* Right Column: List */}
        <div className="w-full md:w-1/2">
          <ul className="flex flex-col gap-4">
            {points.map((point, i) => (
              <li 
                key={i} 
                className="trust-item flex items-center gap-4 py-4 border-b border-border/50 group"
              >
                <div className="w-2 h-2 rounded-full brand-bg-gradient group-hover:scale-150 transition-transform duration-300" />
                <span className="font-mono text-[12px] md:text-[14px] uppercase tracking-widest text-text/90 group-hover:text-text transition-colors duration-300">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </section>
  );
}
