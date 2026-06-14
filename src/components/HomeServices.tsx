"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";
import Link from "next/link";
import MagneticButton from "./MagneticButton";

const services = [
  {
    title: "D2C Brand Identity",
    desc: "For consumer brands that need a complete identity system before entering or growing in the market.",
    includes: [
      "Logo system",
      "Color palette",
      "Typography system",
      "Visual language",
      "Brand guidelines",
      "Social media direction"
    ]
  },
  {
    title: "Packaging & Product Visual Direction",
    desc: "For FMCG, fashion, sports, and lifestyle brands that need their product to look premium and trustworthy.",
    includes: [
      "Packaging visual direction",
      "Product presentation style",
      "Label / surface design direction",
      "Campaign image direction",
      "Shelf and marketplace visual thinking"
    ]
  },
  {
    title: "Landing Page & Digital Brand Presence",
    desc: "For D2C brands that need a clean digital presence to explain the product, build trust, and drive enquiries or sales.",
    includes: [
      "Landing page structure",
      "UI direction",
      "Copy hierarchy",
      "Product-focused layout",
      "Responsive design",
      "Conversion-focused CTA placement"
    ]
  }
];

export function HomeServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".service-card", {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full flex justify-center py-24 md:py-32 px-6 md:px-12 max-w-[2000px] mx-auto z-10 relative bg-bg">
      <div className="w-full flex flex-col gap-16 md:gap-24">
        
        <div className="w-full border-b border-border pb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <AnimatedHeading 
            text="Brand identity services for D2C growth." 
            className="font-bebas text-5xl md:text-7xl tracking-wide uppercase text-text max-w-4xl"
          />
          <p className="font-mono text-[10px] md:text-xs uppercase tracking-widest text-muted max-w-[250px] md:text-right">
            Custom brand systems can be created based on product category, launch stage, and business goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, i) => (
            <div 
              key={i}
              className="service-card flex flex-col gap-8 p-8 md:p-10 border border-border bg-surface relative overflow-hidden group"
            >
              <div className="flex flex-col gap-4">
                <h3 className="font-bebas text-3xl md:text-4xl tracking-wide uppercase text-text">
                  {service.title}
                </h3>
                <p className="font-sans font-light text-[15px] leading-[1.6] text-text/70">
                  {service.desc}
                </p>
              </div>

              <div className="flex flex-col gap-3 mt-auto pt-8 border-t border-border/50">
                <span className="font-mono text-[11px] uppercase tracking-widest text-text">Includes:</span>
                <ul className="flex flex-col gap-2">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="font-sans font-light text-[14px] text-muted flex items-start gap-3">
                      <span className="text-accent mt-[4px] text-[10px]">✦</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover effect highlight */}
              <div className="absolute top-0 left-0 w-[2px] h-full bg-border scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-700 ease-out brand-bg-gradient" />
            </div>
          ))}
        </div>

        <div className="w-full flex justify-center mt-4">
          <MagneticButton>
            <Link 
              href="/contact" 
              className="group px-10 py-5 brand-bg-gradient hover:brand-border-gradient border border-transparent transition-all duration-300 flex items-center justify-center min-w-[200px]"
            >
              <span className="font-mono text-sm uppercase tracking-widest text-bg group-hover:brand-text-gradient font-bold">
                Start a Project
              </span>
            </Link>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
}
