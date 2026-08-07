"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import AnimatedHeading from "./AnimatedHeading";

const cards = [
  {
    title: "FMCG & Food Brands",
    desc: "Identity systems designed to work across packaging, shelves, social media, and digital campaigns.",
    color: "#FF8709"
  },
  {
    title: "Sports & Fitness Brands",
    desc: "Bold visual systems built for energy, performance, community, and merchandise.",
    color: "#3b82f6"
  },
  {
    title: "Fashion & Lifestyle Brands",
    desc: "Premium identity direction for brands that need style, consistency, and emotional recall.",
    color: "#FFA6FA"
  },
  {
    title: "Consumer Product Startups",
    desc: "Launch-ready branding for products entering competitive markets.",
    color: "#0AE448"
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
              <div key={i} className="d2c-card min-h-[320px]">
                <div className="group h-full perspective-[1500px] cursor-pointer">
                  <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                    
                    {/* ── FRONT ── */}
                    <div 
                      className="absolute inset-0 flex flex-col items-center justify-center p-8 rounded-3xl overflow-hidden shadow-2xl bg-[#0a0a0a] border border-white/10 [backface-visibility:hidden]"
                    >
                      <h3 
                        className="font-bebas text-3xl md:text-4xl lg:text-5xl tracking-wide uppercase text-center"
                        style={{ color: card.color }}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* ── BACK ── */}
                    <div 
                      className="absolute inset-0 flex flex-col p-8 rounded-3xl overflow-hidden shadow-2xl bg-[#F9F9F4] [transform:rotateY(180deg)] [backface-visibility:hidden]"
                    >
                      {/* Grain Texture */}
                      <div 
                        className="absolute inset-0 opacity-[0.5] pointer-events-none mix-blend-multiply"
                        style={{
                          backgroundImage: `url('data:image/svg+xml;utf8,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')`
                        }}
                      />
                      
                      <div className="relative z-10 flex flex-col h-full gap-4">
                        <div className="font-mono text-xs uppercase tracking-widest text-black/40 font-bold">
                          0{i + 1}
                        </div>
                        
                        <p className="font-sans font-medium text-[16px] md:text-[18px] leading-[1.6] text-black text-center my-auto">
                          {card.desc}
                        </p>
                      </div>
                    </div>

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
