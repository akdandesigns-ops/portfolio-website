"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

const cards = [
  {
    title: "FMCG & Food Brands",
    desc: "Identity systems designed to work across packaging, shelves, social media, and digital campaigns.",
    color: "from-[#FF8709] via-[#ea580c] to-[#9a3412]"
  },
  {
    title: "Sports & Fitness Brands",
    desc: "Bold visual systems built for energy, performance, community, and merchandise.",
    color: "from-[#3b82f6] via-[#2563eb] to-[#1d4ed8]"
  },
  {
    title: "Fashion & Lifestyle Brands",
    desc: "Premium identity direction for brands that need style, consistency, and emotional recall.",
    color: "from-[#FFA6FA] via-[#db2777] to-[#9d174d]"
  },
  {
    title: "Consumer Product Startups",
    desc: "Launch-ready branding for products entering competitive markets.",
    color: "from-[#0AE448] via-[#10b981] to-[#047857]"
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
      y: 60,
      rotationY: 90,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "back.out(1.2)",
      transformOrigin: "center center"
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8" style={{ perspective: "1500px" }}>
            {cards.map((card, i) => (
              <div key={i} className="d2c-card h-full">
                <div 
                  className="flex flex-col p-8 rounded-3xl relative overflow-hidden shadow-2xl h-full border border-transparent hover:scale-[1.02] transition-transform duration-500"
                >
                  {/* Base Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${card.color} pointer-events-none`} />
                  
                  {/* Noise Texture */}
                  <div 
                    className="absolute inset-0 opacity-[0.35] pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`
                    }}
                  />

                  <div className="relative z-10 flex flex-col h-full gap-6">
                    <div className="font-mono text-xs uppercase tracking-widest text-white/80 font-bold">
                      0{i + 1}
                    </div>
                    
                    <h3 className="font-bebas text-3xl md:text-4xl tracking-wide uppercase text-white">
                      {card.title}
                    </h3>
                    
                    <p className="font-sans font-medium text-[15px] leading-[1.6] text-white mt-auto pt-8">
                      {card.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
