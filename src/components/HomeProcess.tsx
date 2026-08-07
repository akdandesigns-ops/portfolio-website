"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

const steps = [
  {
    num: "01",
    title: "Understand the Product",
    desc: "Study the product, category, audience, competitors, and buying behavior."
  },
  {
    num: "02",
    title: "Define the Brand Direction",
    desc: "Clarify positioning, tone, personality, and visual opportunity."
  },
  {
    num: "03",
    title: "Build the Identity",
    desc: "Design logo, colors, typography, layout style, and visual language."
  },
  {
    num: "04",
    title: "Systemize the Brand",
    desc: "Create a flexible identity system that works across packaging, social media, websites, and campaigns."
  },
  {
    num: "05",
    title: "Prepare for Launch",
    desc: "Deliver usable brand assets, guidelines, and direction for real-world execution."
  }
];

export function HomeProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".process-step", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      x: -30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        scrub: 1,
        start: "top 50%",
        end: "bottom 20%",
      }
    });

    tl.to("#pin-windmill-svg", {
      rotation: 900,
      transformOrigin: "center center",
      ease: "none"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex justify-center py-24 md:py-32 px-6 md:px-12 max-w-[2000px] mx-auto z-10 relative bg-bg">
      <div className="w-full flex flex-col md:flex-row gap-16 md:gap-24 items-start">
        
        {/* Left Column: Sticky Heading */}
        <div className="w-full md:w-1/3 md:sticky md:top-32 flex flex-col gap-6">
          <AnimatedHeading 
            text="My process is built around consumer perception." 
            className="font-bebas text-5xl md:text-7xl tracking-wide uppercase text-text"
          />
          <div className="hidden md:flex mt-8 w-full justify-start items-center">
            <div id="pin-windmill-svg" className="w-[140px] h-[140px] origin-center">
              <svg 
                width="140" 
                height="140" 
                viewBox="0 0 100 100" 
              >
                <defs>
                  <linearGradient id="windmill-grad" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#15803d" /> {/* Dark Green */}
                    <stop offset="100%" stopColor="#4ade80" /> {/* Light Green */}
                  </linearGradient>
                  <filter id="grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
                    <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.2 0" />
                    <feComposite in2="SourceGraphic" operator="in" />
                    <feBlend in2="SourceGraphic" mode="overlay" />
                  </filter>
                </defs>
                <g fill="url(#windmill-grad)" filter="url(#grain)">
                  {/* Top Left */}
                  <path d="M 6 6 A 42 42 0 0 1 48 48 A 42 42 0 0 1 6 6 Z" />
                  {/* Top Right */}
                  <path d="M 94 6 A 42 42 0 0 0 52 48 A 42 42 0 0 0 94 6 Z" />
                  {/* Bottom Right */}
                  <path d="M 94 94 A 42 42 0 0 1 52 52 A 42 42 0 0 1 94 94 Z" />
                  {/* Bottom Left */}
                  <path d="M 6 94 A 42 42 0 0 0 48 52 A 42 42 0 0 0 6 94 Z" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Process Steps */}
        <div className="w-full md:w-2/3 flex flex-col gap-12 md:gap-16">
          {steps.map((step, i) => (
            <div 
              key={i} 
              className="process-step group flex flex-col sm:flex-row items-start gap-6 sm:gap-12 relative"
            >
              {/* Number */}
              <div className="font-mono text-xl md:text-2xl text-muted group-hover:text-text transition-colors duration-300 min-w-[3rem]">
                {step.num}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-3 pb-8 sm:pb-12 border-b border-border/40 w-full group-hover:border-text/30 transition-colors duration-300">
                <h3 className="font-bebas text-3xl md:text-4xl tracking-wide uppercase text-text group-hover:text-accent transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="font-sans font-light text-[15px] md:text-[17px] leading-[1.6] text-text/70">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
