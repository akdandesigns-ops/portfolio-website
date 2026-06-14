"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SplitText } from "@/lib/gsap/SplitText";
import { HeroDragInteraction } from "./HeroDragInteraction";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, useGSAP);
}

const PHRASES = [
  { text: "DEFY GRAVITY.", color: "#0AE448" },
  { text: "INSPIRE AWE.", color: "#FFA6FA" },
  { text: "BREAK RULES.", color: "#FF8709" },
  { text: "DRIVE ACTION.", color: "#00BAE2" },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Top Left Label
    gsap.fromTo(".hero-label", { opacity: 0 }, { opacity: 1, duration: 1, delay: 1 });
    
    // SplitText on Heading
    const split = new SplitText(".hero-heading > .split-line", { type: "chars, words" });
    
    gsap.fromTo(split.chars, {
      yPercent: 120,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.02,
      delay: 0.5,
    });

    // Phrase Cycler Timeline Setup
    const phrases = gsap.utils.toArray(".phrase-wrapper");
    gsap.set(phrases.slice(1), { opacity: 0, yPercent: 50 });

    // Initial entrance for the first phrase words to sync with the main text
    const firstPhraseWords = (phrases[0] as HTMLElement).querySelectorAll("span");
    gsap.fromTo(firstPhraseWords, {
      yPercent: 120,
      opacity: 0,
    }, {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: "power4.out",
      stagger: 0.1,
      delay: 0.7,
    });

    gsap.set(phrases.slice(1), { opacity: 0, yPercent: 50 });
    const cyclerTl = gsap.timeline({ repeat: -1 });
    
    phrases.forEach((phrase, i) => {
      const nextPhrase = phrases[(i + 1) % phrases.length] as Element;
      
      cyclerTl.fromTo(phrase as Element, 
        { opacity: 1, yPercent: 0 }, 
        { opacity: 0, yPercent: -50, duration: 0.6, ease: "power3.inOut", immediateRender: false }, 
        "+=1.0"
      );
      cyclerTl.fromTo(nextPhrase, 
        { opacity: 0, yPercent: 50 }, 
        { opacity: 1, yPercent: 0, duration: 0.6, ease: "power3.inOut", immediateRender: false }, 
        "<"
      );
    });

    // Descriptor
    gsap.fromTo(".hero-desc", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.2, ease: "power2.out" });

    // Scroll Indicator
    gsap.fromTo(".hero-scroll", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, delay: 1.4, ease: "power2.out" });

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
      <HeroDragInteraction />
      
      {/* Spacer to push content down */}
      <div className="flex-1 min-h-[60px]" />

      {/* Hero Content Block */}
      <div className="relative w-full flex items-center max-w-[2000px] mx-auto z-10">
        
        {/* Left Column: Typography */}
        <div className="flex flex-col items-start gap-2 md:gap-3 w-full">
          {/* Top Bar: Label & Interactive Trigger */}
          <div className="w-full flex items-center justify-between pb-2 md:pb-4">
            <div className="hero-label font-mono text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-muted pl-1 md:pl-2">
              Independent Designer — Est. 2024
            </div>
            
            {/* Drag / Burst Indicator */}
            <div 
              id="mobile-burst-trigger"
              className="hero-desc flex items-center gap-2 cursor-pointer z-50 pr-2"
            >
              <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full brand-bg-gradient animate-pulse" />
              <div className="font-mono text-[9px] md:text-[11px] tracking-[0.2em] brand-text-gradient uppercase font-semibold pointer-events-none">
                <span className="hidden md:inline">Click & Drag Anywhere</span>
                <span className="md:hidden">Tap to See</span>
              </div>
            </div>
          </div>

          {/* Center Huge Text */}
          <h1 className="hero-heading font-bebas text-[clamp(64px,14vw,180px)] leading-[0.85] tracking-[0.04em] text-text flex flex-col uppercase mt-2">
            <div className="split-line overflow-hidden pb-2 lg:pb-4 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2">
              I DESIGN
            </div>
            <div className="split-line overflow-hidden pb-2 lg:pb-4 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2">
              BRANDS THAT
            </div>
            
            {/* Cycling Phrases */}
            <div className="gradient-line relative overflow-hidden pb-2 lg:pb-6">
               {/* Invisible ghost to establish layout height and width */}
               <div className="opacity-0 pointer-events-none flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 select-none" aria-hidden="true">
                  <span className="inline-block leading-tight pb-1">DEFY</span>
                  <span className="inline-block leading-tight pb-1">GRAVITY.</span>
               </div>

              {PHRASES.map((phrase, i) => (
                <div 
                  key={i} 
                  className={`phrase-wrapper absolute top-0 left-0 flex flex-wrap gap-x-4 md:gap-x-8 gap-y-2 items-center w-full ${i === 0 ? '' : 'opacity-0'}`}
                >
                  {phrase.text.split(" ").map((word, wIdx) => (
                    <span 
                      key={wIdx} 
                      className="inline-block leading-tight pb-1 grain-text"
                      style={{ '--text-color': `linear-gradient(${phrase.color}, ${phrase.color})` } as React.CSSProperties}
                    >
                      {word}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </h1>

          {/* Descriptor */}
          <p className="hero-desc font-sans font-light text-[14px] md:text-[17px] leading-[1.6] max-w-[420px] text-text/80 mt-6 md:mt-10 pl-1 md:pl-2">
            <span className="font-bebas text-[20px] tracking-widest translate-y-[2px] inline-block">AK DAN DESIGNS</span> is a premium web design service offering brand design in Chennai. I craft animated website design and identities that rise above the ordinary — strategic, precise, and impossible to ignore.
          </p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[40px]" />

      {/* Scroll Indicator */}
      <div className="hero-scroll flex flex-col items-center gap-4 self-center pb-4">
        <span className="font-mono text-[11px] tracking-[0.12em] text-text uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-[60px] bg-border relative overflow-hidden">
          <div className="hero-scroll-line absolute top-[-100%] left-0 w-full h-[30px] brand-bg-gradient" />
        </div>
      </div>
    </section>
  );
}
