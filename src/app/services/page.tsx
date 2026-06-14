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
    description: "I create complete identity systems for D2C brands that need to look clear, premium, and trustworthy across packaging, social media, websites, and campaigns.",
  },
  {
    title: "Visual Identity",
    description: "I define the color, typography, layout style, and visual language that help a consumer brand become recognizable.",
  },
  {
    title: "Logo Design",
    description: "I design simple, memorable, and scalable logos that work across packaging, product labels, social media, merchandise, and digital platforms.",
  },
  {
    title: "AI Product Photography",
    description: "I create premium AI-assisted product visuals for D2C brands that need high-quality imagery for launches, campaigns, websites, and social media.",
  },
  {
    title: "Landing Page Design",
    description: "I design clean and responsive landing pages for D2C brands that need to explain their product, build trust, and guide visitors toward action.",
  },
  {
    title: "Branding",
    description: "I help shape how a consumer brand is perceived — from positioning and identity to visual storytelling and launch presentation.",
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
          text="OUR SERVICES"
          className="font-bebas text-[clamp(64px,10vw,180px)] leading-[0.85] tracking-[0.02em] w-full"
        />
        <p className="font-mono text-[13px] md:text-[15px] text-muted tracking-widest mt-8 uppercase max-w-[600px]">
          I strip away ornamentation until nothing is left but the absolute essence of your identity.
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
              <Link href={`/contact?service=${encodeURIComponent(service.title)}`} className="self-start group/quote">
                <MagneticButton>
                  <div className="relative font-mono text-[12px] uppercase brand-text-gradient tracking-[0.1em] pb-1 flex items-center gap-2 transition-opacity hover:opacity-80">
                    <span>Get Your Free Quote</span>
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
