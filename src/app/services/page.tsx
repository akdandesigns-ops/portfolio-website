"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "@/components/AnimatedHeading";
import MagneticButton from "@/components/MagneticButton";
import { FinalCTA } from "@/components/FinalCTA";

const servicesList = [
  {
    title: "Brand Identity",
    description: "The complete foundation: logo system, color palette, typography, visual language, and brand guidelines — built specifically for how your brand will actually be used, from packaging to social media to campaigns.",
    includes: [
      "Logo system (primary + variations)",
      "Color palette & typography system",
      "Visual language & art direction",
      "Brand guidelines document",
      "Social media application direction"
    ]
  },
  {
    title: "Brand Extension",
    description: "For brands with an existing or newly built identity that need it carried into the real world — packaging, product photography, and campaign visuals that look premium and stay on-system.",
    includes: [
      "Packaging & label visual direction",
      "AI-assisted product photography",
      "Campaign image direction",
      "Shelf & marketplace visual thinking"
    ]
  },
  {
    title: "Digital Presence",
    description: "A landing page or website that expresses your brand identity digitally — clean, responsive, and built to build trust and drive enquiries.",
    includes: [
      "Landing page structure & UI direction",
      "Copy hierarchy",
      "Responsive design",
      "Conversion-focused CTA placement"
    ]
  }
];

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 90%",
        },
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power3.out",
      });
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="w-full flex flex-col bg-bg text-text pt-28 md:pt-40 px-4 sm:px-6 md:px-12 pb-24 md:pb-32 max-w-[2000px] mx-auto min-h-screen">
      
      {/* Header */}
      <div className="w-full mb-16 md:mb-32">
        <AnimatedHeading 
          text="SERVICES"
          className="font-bebas text-[clamp(64px,10vw,180px)] leading-[0.85] tracking-[0.02em] w-full"
        />
        <p className="font-mono text-[13px] md:text-[15px] text-muted tracking-widest mt-8 uppercase max-w-[800px] leading-[1.6]">
          I strip away ornamentation until nothing is left but the absolute essence of your identity. <br className="hidden md:block" /> Every engagement starts with brand identity. From there, I extend the system into whatever your brand needs next — packaging, product visuals, or a digital presence.
        </p>
      </div>

      {/* Services List */}
      <div className="w-full flex flex-col mb-40 border-t border-border">
        {servicesList.map((service, i) => (
          <div
            key={service.title}
            className="service-card w-full flex flex-col md:flex-row gap-6 md:gap-12 py-12 md:py-20 border-b border-border items-start md:items-center justify-between group transition-colors px-6 rounded-sm hover:bg-surface"
          >
            <h2 className="font-bebas text-3xl sm:text-5xl md:text-7xl uppercase transition-colors w-full md:w-1/2 text-text group-hover:brand-text-gradient">
              {service.title}
            </h2>
            <div className="flex flex-col gap-8 w-full md:w-1/2">
              <p className="font-sans font-light text-[15px] md:text-[18px] text-text/70 leading-[1.6]">
                {service.description}
              </p>
              
              <div className="flex flex-col gap-3">
                <span className="font-mono text-[11px] uppercase tracking-widest text-text">Includes:</span>
                <ul className="flex flex-col gap-2">
                  {service.includes.map((item, idx) => (
                    <li key={idx} className="font-sans font-light text-[14px] text-muted flex items-start gap-3">
                      <span className="text-accent mt-[6px] text-[10px]">✦</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="self-start group/quote mt-4">
                <MagneticButton>
                  <div className="relative font-mono text-[12px] uppercase brand-text-gradient tracking-[0.1em] pb-1 flex items-center gap-2 transition-opacity hover:opacity-80">
                    <span>Start a Project</span>
                    <span className="group-hover/quote:translate-x-2 transition-transform duration-300">→</span>
                    <div className="absolute bottom-0 left-0 w-full h-[1px] brand-bg-gradient" />
                  </div>
                </MagneticButton>
              </Link>
            </div>
          </div>
        ))}
      </div>

      <FinalCTA />

    </div>
  );
}
