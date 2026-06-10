"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/gsap/SplitText";
// import { HeroRobot } from "./HeroRobot";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, useGSAP);
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Top Left Label
    gsap.from(".hero-label", { opacity: 0, duration: 1, delay: 1 });
    
    // SplitText on Heading
    const split = new SplitText(".hero-heading > div", { type: "chars, words" });
    
    gsap.from(split.chars, {
      yPercent: 120,
      opacity: 0,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.02,
      delay: 0.5,
    });

    // Descriptor
    gsap.from(".hero-desc", { opacity: 0, y: 20, duration: 1, delay: 1.2, ease: "power2.out" });

    // Scroll Indicator
    gsap.from(".hero-scroll", { opacity: 0, y: 20, duration: 1, delay: 1.4, ease: "power2.out" });

    gsap.to(".hero-scroll-line", {
      yPercent: 300,
      duration: 1.5,
      repeat: -1,
      ease: "linear",
    });

    return () => split.revert();
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative w-full min-h-[100vh] flex flex-col justify-between px-6 md:px-12 max-w-[2000px] mx-auto py-12">
      
      {/* Spacer to push content down */}
      <div className="flex-1 min-h-[60px]" />

      {/* Hero Content Block */}
      <div className="w-full flex items-center max-w-[2000px] mx-auto z-10">
        
        {/* Left Column: Typography */}
        <div className="flex flex-col items-start gap-2 md:gap-3 w-full">
          {/* Top Left Label */}
          <div className="hero-label font-mono text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-muted pl-1 md:pl-2">
            Independent Designer — Est. 2024
          </div>

          {/* Center Huge Text */}
          <h1 className="hero-heading font-bebas text-[clamp(64px,14vw,180px)] leading-[0.85] tracking-[0.04em] text-text flex flex-col uppercase">
            <div className="overflow-hidden pb-2 lg:pb-4 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2">
              <span>I</span> <span>DESIGN</span>
            </div>
            <div className="overflow-hidden pb-2 lg:pb-4 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2">
              <span>BRANDS</span> <span>THAT</span>
            </div>
            <div className="overflow-hidden pb-2 lg:pb-4 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 text-accent">
              <span>DEFY</span> <span>GRAVITY.</span>
            </div>
          </h1>

          {/* Descriptor */}
          <p className="hero-desc font-sans font-light text-[14px] md:text-[17px] leading-[1.6] max-w-[420px] text-text/80 mt-6 md:mt-10 pl-1 md:pl-2">
            akdandesigns crafts identities that rise above the ordinary — strategic, precise, and impossible to ignore.
          </p>
        </div>

        {/* Right Column: Wall-E Robot (Hidden on Mobile) */}
        {/* <div className="hidden lg:flex w-full h-full items-center justify-center">
          <HeroRobot />
        </div> */}
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[40px]" />

      {/* Scroll Indicator */}
      <div className="hero-scroll flex flex-col items-center gap-4 self-center pb-4">
        <span className="font-mono text-[11px] tracking-[0.12em] text-text uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-[60px] bg-border relative overflow-hidden">
          <div className="hero-scroll-line absolute top-[-100%] left-0 w-full h-[30px] bg-accent" />
        </div>
      </div>
    </section>
  );
}
