"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

const SvgDefs = () => (
  <svg width="0" height="0" style={{ position: 'absolute' }}>
    <defs>
      {/* Premium High-Fidelity Grain Texture */}
      <filter id="grain-texture" x="-20%" y="-20%" width="140%" height="140%">
        {/* Generate fine fractal noise */}
        <feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="3" result="noise" />
        {/* Convert noise to grayscale */}
        <feColorMatrix type="saturate" values="0" in="noise" result="grayNoise" />
        {/* Reduce noise opacity */}
        <feComponentTransfer in="grayNoise" result="transparentNoise">
          <feFuncA type="linear" slope="0.8" />
        </feComponentTransfer>
        {/* Clip noise to the graphic shape */}
        <feComposite operator="in" in="transparentNoise" in2="SourceGraphic" result="compositeNoise" />
        {/* Blend using soft-light to naturally lighten and darken the underlying gradient */}
        <feBlend mode="overlay" in="compositeNoise" in2="SourceGraphic" />
      </filter>
    </defs>
  </svg>
);

const Clover = () => (
  <svg width="0.75em" height="0.75em" viewBox="0 0 100 100" className="shape-clover inline-block mx-2 align-middle transform -translate-y-[0.05em]">
    <defs>
      <radialGradient id="cloverGrad" cx="50%" cy="50%" r="55%">
        <stop offset="0%" stopColor="#FFF0E6" />
        <stop offset="40%" stopColor="#FF9B73" />
        <stop offset="100%" stopColor="#F24C27" />
      </radialGradient>
    </defs>
    <g stroke="url(#cloverGrad)" strokeWidth="18" strokeLinecap="round" filter="url(#grain-texture)">
      <path d="M50 15 L50 85 M15 50 L85 50 M25.2 25.2 L74.8 74.8 M25.2 74.8 L74.8 25.2" />
    </g>
  </svg>
);

const Asterisk = () => (
  <svg width="0.7em" height="0.7em" viewBox="0 0 100 100" className="shape-asterisk inline-block mx-1 align-middle transform -translate-y-[0.05em]">
    <defs>
      <linearGradient id="astGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FFB88C" />
        <stop offset="100%" stopColor="#DE6262" />
      </linearGradient>
    </defs>
    <g stroke="url(#astGrad)" strokeWidth="22" strokeLinecap="round" filter="url(#grain-texture)">
      <line x1="20" y1="20" x2="80" y2="80" />
      <line x1="20" y1="80" x2="80" y2="20" />
    </g>
  </svg>
);

const Lightning = () => (
  <svg width="0.5em" height="0.8em" viewBox="0 0 100 160" className="shape-lightning inline-block mx-2 align-middle transform -translate-y-[0.05em]">
    <defs>
      <linearGradient id="lightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0AE448" />
        <stop offset="100%" stopColor="#00BAE2" />
      </linearGradient>
    </defs>
    <path d="M80 10 L10 90 L55 90 L30 150 L100 70 L55 70 Z" fill="url(#lightGrad)" filter="url(#grain-texture)" />
  </svg>
);

const Squiggle = () => (
  <svg width="0.5em" height="0.8em" viewBox="0 0 100 160" className="shape-squiggle inline-block mx-2 align-middle transform -translate-y-[0.05em]">
    <defs>
      <linearGradient id="sqGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#B388FF" />
        <stop offset="100%" stopColor="#8C9EFF" />
      </linearGradient>
    </defs>
    <path d="M25 20 C 100 20, 100 80, 50 80 C 0 80, 0 140, 75 140" fill="none" stroke="url(#sqGrad)" strokeWidth="26" strokeLinecap="round" filter="url(#grain-texture)" />
  </svg>
);

import MetallicPaint from "./MetallicPaint";

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Always show preloader on first mount (hard reload) for any page
    setMounted(true);
  }, []);

  useGSAP(() => {
    if (!mounted || !show) return;

    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        setShow(false);
      }
    });

    // Loading counter animation
    const progressObj = { value: 0 };
    tl.to(progressObj, {
      value: 100,
      duration: 3.7, // Matches the total hold time (1.2 + 2.5)
      ease: "power1.inOut",
      onUpdate: () => {
        if (progressRef.current) {
          progressRef.current.textContent = `${Math.round(progressObj.value)}%`;
        }
      }
    }, 0);

    // Animate the MetallicPaint canvas in
    tl.fromTo(".paint-container", {
      opacity: 0,
      scale: 0.9,
    }, {
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power2.out",
    }, 0);
    
    // Hold for a moment to let the paint effect play
    tl.to({}, { duration: 2.5 });
    
    // Exit animation: Simple screen split and fade out
    tl.to(".text-overlay", {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out"
    })
    .to(".panel-left", {
      xPercent: -100,
      duration: 1.4,
      ease: "expo.inOut"
    }, "<")
    .to(".panel-right", {
      xPercent: 100,
      duration: 1.4,
      ease: "expo.inOut"
    }, "<");

    return () => {
      document.body.style.overflow = "";
    };
  }, { scope: containerRef, dependencies: [mounted, show] });

  if (!mounted || !show) return null;

  return (
    <div ref={containerRef} className="fixed inset-0 z-[9999] pointer-events-none flex perspective-[1200px]">
      {/* Background Panels for Split Screen (solid black) */}
      <div className="panel-left absolute top-0 left-0 w-1/2 h-full bg-black pointer-events-auto origin-left" />
      <div className="panel-right absolute top-0 right-0 w-1/2 h-full bg-black pointer-events-auto origin-right" />

      {/* Content Overlay */}
      <div className="text-overlay absolute inset-0 flex flex-col items-center justify-center overflow-hidden pointer-events-none">
        
        {/* Logo Container (increased size) */}
        <div className="w-full h-full max-w-[800px] max-h-[800px] flex items-center justify-center pointer-events-auto">
          <MetallicPaint 
            imageSrc="/akdan-logo.png"
            liquid={0.4}
            speed={0.2}
            brightness={1.5}
            scale={5}
            refraction={0.02}
            mouseAnimation={true}
          />
        </div>

        {/* Loading Count */}
        <div 
          ref={progressRef}
          className="absolute bottom-[10%] font-mono text-[11px] uppercase tracking-[0.2em] text-[#f3f3ee] opacity-70"
        >
          0%
        </div>

      </div>
    </div>
  );
}
