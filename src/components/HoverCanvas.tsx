"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { useTheme } from "next-themes";

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

export default function HoverCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    let lastTime = 0;
    let shapeIndex = 0;
    const container = containerRef.current;
    if (!container) return;

    const noiseDataUrl = getNoiseDataUrl();

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, input, [data-magnetic]')) return;
      
      const now = Date.now();
      // Throttle object creation
      if (now - lastTime < 150) return;
      lastTime = now;

      if (Math.random() > 0.8) return;

      const isLight = resolvedTheme === 'light';
      const colorStart = isLight ? '#ffffff' : '#C8FF00';
      const colorEnd = isLight ? '#000000' : '#000000';

      const el = document.createElement("div");

      const shapes = ['cube', 'sphere', 'cone', 'star', 'pentagon', 'diamond'];
      const shapeType = shapes[shapeIndex % shapes.length];
      shapeIndex++;
      
      el.style.position = "absolute";
      el.style.left = `${e.clientX}px`;
      el.style.top = `${e.clientY}px`;
      
      el.style.width = "48px";
      el.style.height = "48px";
      el.style.marginLeft = "-24px";
      el.style.marginTop = "-24px";
      
      el.style.pointerEvents = "none";
      el.style.zIndex = "40";
      // Force hardware acceleration
      el.style.transformStyle = "preserve-3d";
      el.style.willChange = "transform, opacity";
      
      // Box shadow definitions for deep 3D emboss (for CSS shapes)
      const shadowLight = `inset -6px -6px 12px rgba(0,0,0,0.3), inset 6px 6px 16px rgba(255,255,255,1), 0 15px 25px rgba(0,0,0,0.15)`;
      const shadowDark = `inset -6px -6px 12px rgba(0,0,0,0.9), inset 6px 6px 16px rgba(255,255,255,0.4), 0 15px 25px rgba(0,0,0,0.5)`;
      const baseShadow = isLight ? shadowLight : shadowDark;
      
      if (shapeType === 'sphere' || shapeType === 'cube' || shapeType === 'diamond') {
        // Apply CSS 3D styling
        el.style.boxShadow = baseShadow;
        el.style.border = `1px solid ${isLight ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.15)'}`;
        
        if (shapeType === 'sphere') {
          el.style.borderRadius = "50%";
          el.style.background = `radial-gradient(circle at 30% 30%, ${colorStart} 0%, ${colorEnd} 90%)`;
        } else if (shapeType === 'cube') {
          el.style.borderRadius = "12px";
          el.style.background = `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`;
        } else if (shapeType === 'diamond') {
          el.style.width = "40px";
          el.style.height = "40px";
          el.style.marginLeft = "-20px";
          el.style.marginTop = "-20px";
          el.style.borderRadius = "8px";
          el.style.background = `linear-gradient(135deg, ${colorStart} 0%, ${colorEnd} 100%)`;
        }
      } else {
        // For complex shapes, use pre-rendered SVG image URL to offload filter calculations
        let pathData = "";
        if (shapeType === 'cone') pathData = "M 50 0 L 0 100 L 100 100 Z";
        else if (shapeType === 'star') pathData = "M 50 0 L 61 35 L 98 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 2 35 L 39 35 Z";
        else if (shapeType === 'pentagon') pathData = "M 50 0 L 100 38 L 82 100 L 18 100 L 0 38 Z";

        const shadowOp = isLight ? "0.3" : "0.7";
        const highOp = isLight ? "0.9" : "0.3";

        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" style="overflow: visible;">
            <defs>
              <linearGradient id="grad-${shapeType}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${colorStart}" />
                <stop offset="100%" stop-color="${colorEnd}" />
              </linearGradient>
              <filter id="emboss-${shapeType}" x="-20%" y="-20%" width="140%" height="140%">
                <!-- Shadow (Bottom-Right) -->
                <feOffset dx="-8" dy="-8" in="SourceAlpha" result="shadowOffset"/>
                <feGaussianBlur stdDeviation="4" in="shadowOffset" result="shadowBlur"/>
                <feComposite operator="out" in="SourceAlpha" in2="shadowBlur" result="shadowInverse"/>
                <feFlood flood-color="#000000" flood-opacity="${shadowOp}" result="shadowColor"/>
                <feComposite operator="in" in="shadowColor" in2="shadowInverse" result="shadowResult"/>
                
                <!-- Highlight (Top-Left) -->
                <feOffset dx="8" dy="8" in="SourceAlpha" result="highlightOffset"/>
                <feGaussianBlur stdDeviation="4" in="highlightOffset" result="highlightBlur"/>
                <feComposite operator="out" in="SourceAlpha" in2="highlightBlur" result="highlightInverse"/>
                <feFlood flood-color="#ffffff" flood-opacity="${highOp}" result="highlightColor"/>
                <feComposite operator="in" in="highlightColor" in2="highlightInverse" result="highlightResult"/>
                
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="shadowResult" />
                  <feMergeNode in="highlightResult" />
                </feMerge>
              </filter>
            </defs>
            <path d="${pathData}" fill="url(#grad-${shapeType})" filter="url(#emboss-${shapeType})" />
          </svg>`;

        // Convert the string to a Data URL and apply as background
        el.style.backgroundImage = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}")`;
        el.style.backgroundSize = "contain";
        el.style.backgroundPosition = "center";
        el.style.backgroundRepeat = "no-repeat";
        
        // Add outer drop shadow to the parent div
        el.style.filter = isLight ? `drop-shadow(0 15px 25px rgba(0,0,0,0.15))` : `drop-shadow(0 15px 25px rgba(0,0,0,0.5))`;
      }

      // Add grain overlay (using fast bitmap noise texture instead of slow SVG feTurbulence)
      const grain = document.createElement("div");
      grain.style.position = "absolute";
      grain.style.inset = "0";
      grain.style.opacity = "0.5";
      grain.style.mixBlendMode = "overlay";
      grain.style.pointerEvents = "none";
      grain.style.backgroundImage = `url("${noiseDataUrl}")`;
      
      // Match grain overlay rounding/clipping to parent
      if (shapeType === 'sphere') grain.style.borderRadius = "50%";
      else if (shapeType === 'cube') grain.style.borderRadius = "12px";
      else if (shapeType === 'diamond') grain.style.borderRadius = "8px";
      else if (shapeType === 'cone') grain.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
      else if (shapeType === 'star') grain.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
      else if (shapeType === 'pentagon') grain.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
      
      el.appendChild(grain);
      container.appendChild(el);

      // 3D Entrance animation
      // We DO NOT rotate X or Y so they always face the screen like a true 3D pre-render
      // We add a random start rotationZ for variety
      const startRotZ = gsap.utils.random(-30, 30);
      gsap.fromTo(el, 
        { 
          opacity: 0, 
          scale: 0,
          rotationZ: startRotZ
        },
        { 
          opacity: 0.9, 
          scale: gsap.utils.random(0.7, 1.3), 
          duration: 0.6, 
          ease: "back.out(2)",
          onComplete: () => {
            // Smooth float away and fade out
            gsap.to(el, {
              opacity: 0,
              scale: 0,
              y: "-=150",
              x: `+=${gsap.utils.random(-80, 80)}`,
              rotationZ: startRotZ + gsap.utils.random(-45, 45), // gentle drift spin
              duration: 1.8,
              ease: "power3.inOut",
              onComplete: () => {
                if (container.contains(el)) {
                  container.removeChild(el);
                }
              }
            });
          }
        }
      );
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [resolvedTheme]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[40] overflow-hidden" style={{ perspective: '800px' }}>
    </div>
  );
}
