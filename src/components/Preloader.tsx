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

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

    // Enter animation: Rotation and flip individual to each letter/shape
    tl.fromTo(".char", {
      opacity: 0,
      rotateX: -120,
      rotateY: 90,
      rotateZ: -15,
      scale: 0.3,
      y: 60,
      z: -300,
    }, {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      y: 0,
      z: 0,
      duration: 1.2,
      stagger: 0.04,
      ease: "back.out(1.4)",
    });
    
    const holdTime = tl.duration();

    // Specific shape animations during the hold
    // Clover: rotate clockwise then anticlockwise
    tl.to(".shape-clover", {
      rotationZ: 180,
      duration: 0.5,
      ease: "power2.inOut"
    }, holdTime)
    .to(".shape-clover", {
      rotationZ: -90,
      duration: 0.6,
      ease: "power2.inOut"
    }, holdTime + 0.5);

    // Asterisk: wiggle
    tl.to(".shape-asterisk", {
      rotationZ: 25,
      duration: 0.1,
      yoyo: true,
      repeat: 7,
      ease: "sine.inOut"
    }, holdTime + 0.1);

    // Lightning: strike (scale and CSS brightness)
    tl.to(".shape-lightning", {
      scale: 1.25,
      filter: "brightness(1.5)",
      duration: 0.08,
      yoyo: true,
      repeat: 5,
      ease: "power4.out"
    }, holdTime + 0.2);

    // Squiggle: organic stretch
    tl.to(".shape-squiggle", {
      scaleY: 1.15,
      scaleX: 0.85,
      duration: 0.4,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    }, holdTime + 0.1);

    // Ensure we hold a bit before the exit
    tl.to({}, { duration: 1.5 }, holdTime);
    
    // Exit animation: Simple screen split and text fade
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
        <SvgDefs />
        
        {/* Animated Text Container */}
        <h1 className="preloader-text relative z-10 flex flex-col items-center gap-y-4 md:gap-y-6 font-bebas text-7xl md:text-[120px] lg:text-[160px] leading-none tracking-wide text-[#f3f3ee] select-none text-center px-4 max-w-5xl [perspective:1200px]">
          
          <div className="flex items-center gap-x-4 md:gap-x-8">
            <div className="flex items-center">
              <span className="char inline-block origin-center transform-style-3d">A</span>
              <span className="char inline-block origin-center transform-style-3d">K</span>
            </div>

            <div className="flex items-center">
              <span className="char inline-block origin-center transform-style-3d">D</span>
              <span className="char inline-block origin-center transform-style-3d"><Asterisk /></span>
              <span className="char inline-block origin-center transform-style-3d">N</span>
            </div>
          </div>

          <div className="flex items-center">
            <span className="char inline-block origin-center transform-style-3d">D</span>
            <span className="char inline-block origin-center transform-style-3d">E</span>
            <span className="char inline-block origin-center transform-style-3d">S</span>
            <span className="char inline-block origin-center transform-style-3d"><Lightning /></span>
            <span className="char inline-block origin-center transform-style-3d">G</span>
            <span className="char inline-block origin-center transform-style-3d"><Squiggle /></span>
            <span className="char inline-block origin-center transform-style-3d">N</span>
            <span className="char inline-block origin-center transform-style-3d">S</span>
            <span className="char inline-block origin-center transform-style-3d"><Clover /></span>
          </div>

        </h1>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}} />
    </div>
  );
}
