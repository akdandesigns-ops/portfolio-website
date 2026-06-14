"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { usePathname } from "next/navigation";

let cachedNoiseUrl = "";
function getNoiseDataUrl() {
  if (cachedNoiseUrl) return cachedNoiseUrl;
  if (typeof document === "undefined") return "";
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");
  if (!ctx) return "";
  const idata = ctx.createImageData(64, 64);
  const data = idata.data;
  for (let i = 0; i < data.length; i += 4) {
    const val = Math.random() * 255 | 0;
    data[i] = val;
    data[i+1] = val;
    data[i+2] = val;
    data[i+3] = 255;
  }
  ctx.putImageData(idata, 0, 0);
  cachedNoiseUrl = canvas.toDataURL("image/png");
  return cachedNoiseUrl;
}

export default function Preloader() {
  const [show, setShow] = useState(true);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only show the preloader if the user is loading the homepage
    if (pathname !== "/") {
      setShow(false);
    }
    setMounted(true);
  }, [pathname]);

  useGSAP(() => {
    if (!mounted || !show) return;

    // Block scrolling while loader is active
    document.body.style.overflow = "hidden";

    // Spline expansion (loader progress)
    gsap.fromTo(".spline-blob", 
      { scale: 0.5, rotation: 0 }, 
      { 
        scale: 8, // Expand to cover screen
        rotation: 180,
        duration: 3, 
        ease: "power2.inOut",
        onComplete: () => {
          // Exit Animation Timeline
          const tl = gsap.timeline({
            onComplete: () => {
              document.body.style.overflow = "";
              setShow(false);
            }
          });

          // Text scales up and fades out
          tl.to(".preloader-text", {
            scale: 1.2,
            opacity: 0,
            duration: 0.5,
            ease: "power3.in"
          }, 0)
          // Spline fades out
          .to(".spline-container", {
            opacity: 0,
            duration: 0.4,
            ease: "power2.out"
          }, 0.2)
          // Split screen doors open
          .to(".panel-left", {
            xPercent: -100,
            duration: 1.2,
            ease: "power4.inOut"
          }, 0.4)
          .to(".panel-right", {
            xPercent: 100,
            duration: 1.2,
            ease: "power4.inOut"
          }, 0.4);
        }
      }
    );

    return () => {
      document.body.style.overflow = "";
    };
  }, { scope: containerRef, dependencies: [mounted, show] });

  if (!mounted || !show) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] pointer-events-none flex"
    >
      {/* Background Panels for Split Screen */}
      <div className="panel-left absolute top-0 left-0 w-1/2 h-full bg-bg pointer-events-auto" />
      <div className="panel-right absolute top-0 right-0 w-1/2 h-full bg-bg pointer-events-auto" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
        
        {/* Swirling Spline Container */}
        <div className="spline-container absolute inset-0 flex items-center justify-center opacity-80" style={{ willChange: "opacity, transform", transform: "translateZ(0)" }}>
          <div 
            className="spline-blob absolute"
            style={{
              width: "30vw",
              height: "30vw",
              minWidth: "300px",
              minHeight: "300px",
              background: "linear-gradient(45deg, #0AE448, #FFA6FA, #FF8709, #00BAE2)",
              backgroundSize: "400% 400%",
              borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              filter: "blur(30px)",
              animation: "blob-morph 4s ease-in-out infinite alternate, blob-bg 8s ease infinite",
              willChange: "transform, filter, border-radius, background-position",
              transform: "translateZ(0)",
            }}
          />
        </div>

        {/* Global Grain Overlay for texture */}
        <div 
          className="spline-container absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          style={{
            backgroundImage: `url("${getNoiseDataUrl()}")`,
            backgroundRepeat: "repeat",
            willChange: "transform",
            transform: "translateZ(0)",
          }}
        />

        {/* Foreground Text */}
        <h1 className="preloader-text relative z-10 font-bebas text-6xl md:text-[100px] lg:text-[160px] leading-none tracking-widest text-text drop-shadow-2xl select-none text-center px-4">
          AK DAN DESIGNS
        </h1>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes blob-morph {
          0% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
          50% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
          100% { border-radius: 40% 60% 30% 70% / 60% 40% 60% 30%; }
        }
        @keyframes blob-bg {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </div>
  );
}
