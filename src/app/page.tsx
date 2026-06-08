"use client";

import { useRef } from "react";
import { Hero } from "@/components/Hero";
import { HomeProjects } from "@/components/HomeProjects";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Home() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.to(marqueeRef.current, {
      xPercent: -50,
      ease: "none",
      duration: 25,
      repeat: -1,
    });
  });

  return (
    <div className="w-full flex-1 flex flex-col items-center justify-center">
      <Hero />
      <HomeProjects />

      {/* Footer / Running Strip */}
      <section className="w-full py-16 md:py-24 lg:py-32 flex flex-col items-center justify-center overflow-hidden border-t border-border mt-16 md:mt-32 relative">
        <div className="relative w-full flex whitespace-nowrap overflow-hidden py-4 md:py-6 group">
          <div
            ref={marqueeRef}
            className="flex font-sans font-bold text-3xl sm:text-5xl md:text-8xl uppercase tracking-wider text-text/90 gap-8 md:gap-12 min-w-max mix-blend-difference"
          >
            {Array(10)
              .fill("DESIGN IS EVERYWHERE")
              .map((text, i) => (
                <span key={i} className="px-4">
                  {text}  —
                </span>
              ))}
          </div>
        </div>

        <Link href="/contact" className="mt-16 md:mt-24 group/call">
          <h4 className="font-mono text-[12px] md:text-[14px] uppercase tracking-[0.2em] text-accent border-b border-accent pb-1 group-hover/call:opacity-80 transition-opacity flex items-center gap-2">
            Book a Call <span className="group-hover/call:translate-x-2 transition-transform duration-300">→</span>
          </h4>
        </Link>
      </section>
    </div>
  );
}
