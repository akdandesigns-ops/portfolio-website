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
