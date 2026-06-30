"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Physics2DPlugin } from "@/lib/gsap/Physics2DPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Physics2DPlugin);
}

const SHAPE_COLORS = [
  "#0AE448", // GSAP Green
  "#FFA6FA", // GSAP Pink
  "#FF8709", // GSAP Orange
  "#8D65FF", // GSAP Purple
];

const SHAPES = ['cube', 'sphere', 'cone', 'star', 'pentagon', 'diamond'];

// Pre-compute noise data URL for grain (reusing from HoverCanvas logic but localized for independence)
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

const svgCache: Record<string, string> = {};

function getShapeSvgUrl(shapeType: string, colorStr: string, isMobile: boolean): string {
  const cacheKey = `${shapeType}-${colorStr}-${isMobile}`;
  if (svgCache[cacheKey]) return svgCache[cacheKey];

  let pathData = "";
  if (shapeType === 'cone') pathData = "M 50 0 L 0 100 L 100 100 Z";
  else if (shapeType === 'star') pathData = "M 50 0 L 61 35 L 98 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 2 35 L 39 35 Z";
  else if (shapeType === 'pentagon') pathData = "M 50 0 L 100 38 L 82 100 L 18 100 L 0 38 Z";

  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" style="overflow: visible;">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#ffffff" stop-opacity="0.6" />
          <stop offset="50%" stop-color="${colorStr}" />
          <stop offset="100%" stop-color="${colorStr}" />
        </linearGradient>
        ${isMobile ? '' : `<filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
          <feOffset dx="-4" dy="-4" in="SourceAlpha" result="shadowOffset"/>
          <feGaussianBlur stdDeviation="3" in="shadowOffset" result="shadowBlur"/>
          <feComposite operator="out" in="SourceAlpha" in2="shadowBlur" result="shadowInverse"/>
          <feFlood flood-color="#000000" flood-opacity="0.2" result="shadowColor"/>
          <feComposite operator="in" in="shadowColor" in2="shadowInverse" result="shadowResult"/>
          
          <feOffset dx="4" dy="4" in="SourceAlpha" result="highlightOffset"/>
          <feGaussianBlur stdDeviation="3" in="highlightOffset" result="highlightBlur"/>
          <feComposite operator="out" in="SourceAlpha" in2="highlightBlur" result="highlightInverse"/>
          <feFlood flood-color="#ffffff" flood-opacity="0.9" result="highlightColor"/>
          <feComposite operator="in" in="highlightColor" in2="highlightInverse" result="highlightResult"/>
          
          <feMerge>
            <feMergeNode in="SourceGraphic" />
            <feMergeNode in="shadowResult" />
            <feMergeNode in="highlightResult" />
          </feMerge>
        </filter>`}
      </defs>
      <path d="${pathData}" fill="url(#grad)" ${isMobile ? '' : `filter="url(#emboss)"`} />
    </svg>`;

  const url = `url("data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}")`;
  svgCache[cacheKey] = url;
  return url;
}

if (typeof window !== "undefined") {
  // Pre-generate and cache SVG images to prevent lag on first burst
  setTimeout(() => {
    SHAPES.forEach(shapeType => {
      if (shapeType !== 'sphere' && shapeType !== 'cube' && shapeType !== 'diamond') {
        SHAPE_COLORS.forEach(colorStr => {
          const urlDesktop = getShapeSvgUrl(shapeType, colorStr, false);
          // extract the raw data uri from `url("...")`
          const src = urlDesktop.slice(5, -2);
          const img = new Image();
          img.src = src;
        });
      }
    });
  }, 1000);
}

export function HeroDragInteraction() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const mousePos = useRef({ x: 0, y: 0 });

  // Handle canvas sizing and drawing the colorful dashed line
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      canvas.width = rect.width || window.innerWidth;
      canvas.height = rect.height || window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (isDragging) {
        const dx = mousePos.current.x - dragStart.current.x;
        const dy = mousePos.current.y - dragStart.current.y;
        
        ctx.beginPath();
        ctx.moveTo(dragStart.current.x, dragStart.current.y);
        ctx.lineTo(mousePos.current.x, mousePos.current.y);
        
        // Colorful Gradient Stroke
        const gradient = ctx.createLinearGradient(
          dragStart.current.x, dragStart.current.y, 
          mousePos.current.x, mousePos.current.y
        );
        gradient.addColorStop(0, "#ff007f");
        gradient.addColorStop(0.33, "#ff7f00");
        gradient.addColorStop(0.66, "#ffff00");
        gradient.addColorStop(1, "#007fff");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 4;
        ctx.lineCap = "round";
        
        // Dashed line pattern
        // We can animate the offset for a premium flowing effect
        ctx.setLineDash([15, 15]);
        ctx.lineDashOffset = -(Date.now() / 20) % 30;
        
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDragging]);

  const triggerBurst = (x: number, y: number) => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const noiseDataUrl = getNoiseDataUrl();
    const isMobile = window.innerWidth < 768;

    // Spawn 15-20 shapes (reduced to 5-8 on mobile)
    const numShapes = isMobile ? Math.floor(gsap.utils.random(5, 8)) : Math.floor(gsap.utils.random(15, 25));

    for (let i = 0; i < numShapes; i++) {
      const shapeType = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      const colorStr = SHAPE_COLORS[Math.floor(Math.random() * SHAPE_COLORS.length)];
      
      const el = document.createElement("div");
      
      el.style.position = "absolute";
      el.style.left = `${x}px`;
      el.style.top = `${y}px`;
      
      el.style.width = "96px";
      el.style.height = "96px";
      el.style.marginLeft = "-48px";
      el.style.marginTop = "-48px";
      
      el.style.pointerEvents = "none";
      el.style.zIndex = "40";
      el.style.willChange = "transform, opacity";
      
      const shadowBright = isMobile ? "none" : `inset -4px -4px 8px rgba(0,0,0,0.2), inset 4px 4px 12px rgba(255,255,255,0.8), 0 10px 20px rgba(0,0,0,0.3)`;
      
      if (shapeType === 'sphere' || shapeType === 'cube' || shapeType === 'diamond') {
        el.style.boxShadow = shadowBright;
        el.style.border = `1px solid rgba(255,255,255,0.6)`;
        
        if (shapeType === 'sphere') {
          el.style.borderRadius = "50%";
          el.style.background = `radial-gradient(circle at 30% 30%, #ffffff 0%, ${colorStr} 40%, ${colorStr} 100%)`;
        } else if (shapeType === 'cube') {
          el.style.borderRadius = "12px";
          el.style.background = `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, ${colorStr} 40%, ${colorStr} 100%)`;
        } else if (shapeType === 'diamond') {
          el.style.width = "80px";
          el.style.height = "80px";
          el.style.marginLeft = "-40px";
          el.style.marginTop = "-40px";
          el.style.borderRadius = "16px";
          el.style.background = `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, ${colorStr} 40%, ${colorStr} 100%)`;
        }
      } else {
        el.style.backgroundImage = getShapeSvgUrl(shapeType, colorStr, isMobile);
        el.style.backgroundSize = "contain";
        el.style.backgroundPosition = "center";
        el.style.backgroundRepeat = "no-repeat";
        el.style.filter = isMobile ? 'none' : `drop-shadow(0 15px 25px rgba(0,0,0,0.5))`;
      }

      if (!isMobile) {
        // Add grain
        const grain = document.createElement("div");
        grain.style.position = "absolute";
        grain.style.inset = "0";
        grain.style.opacity = "0.9";
        grain.style.mixBlendMode = "overlay";
        grain.style.pointerEvents = "none";
        grain.style.backgroundImage = `url("${noiseDataUrl}")`;
        
        if (shapeType === 'sphere') grain.style.borderRadius = "50%";
        else if (shapeType === 'cube') grain.style.borderRadius = "12px";
        else if (shapeType === 'diamond') grain.style.borderRadius = "8px";
        else if (shapeType === 'cone') grain.style.clipPath = 'polygon(50% 0%, 0% 100%, 100% 100%)';
        else if (shapeType === 'star') grain.style.clipPath = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        else if (shapeType === 'pentagon') grain.style.clipPath = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
        
        el.appendChild(grain);
      }
      container.appendChild(el);

      // Animate with Physics2DPlugin!
      const startRotZ = gsap.utils.random(-180, 180);
      gsap.set(el, { scale: 0, opacity: 1, rotationZ: startRotZ });
      
      // Explosion physics
      gsap.to(el, {
        scale: gsap.utils.random(0.8, 2.0),
        rotationZ: startRotZ + gsap.utils.random(-720, 720),
        opacity: 0,
        physics2D: {
          velocity: gsap.utils.random(500, 1200), // Explosive speed
          angle: gsap.utils.random(0, 360),
          gravity: gsap.utils.random(600, 1200), // Heavy gravity drop
          friction: 0.02 // Air resistance for premium organic slow-down
        },
        duration: gsap.utils.random(2.0, 3.5),
        ease: "power3.out", // Premium initial explosive snap
        onComplete: () => {
          if (container.contains(el)) {
            container.removeChild(el);
          }
        }
      });
    }
  };

  // Handle dragging via window events so we don't block clicks on the actual UI
  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return;
      const target = e.target as HTMLElement;
      
      // Special handling for the mobile trigger button
      const isMobileTrigger = target.closest('#mobile-burst-trigger');
      if (isMobileTrigger) {
        const rect = isMobileTrigger.getBoundingClientRect();
        const containerRect = containerRef.current?.getBoundingClientRect();
        const localX = containerRect ? (rect.left + rect.width / 2) - containerRect.left : rect.left + rect.width / 2;
        const localY = containerRect ? (rect.top + rect.height / 2) - containerRect.top : rect.top + rect.height / 2;
        triggerBurst(localX, localY);
        return; // Do not start a drag
      }

      if (target.closest('a, button, input, textarea, [data-magnetic]')) return;
      
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      
      // Only interact if we started strictly inside the Hero section bounds!
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;

      const localX = e.clientX - rect.left;
      const localY = e.clientY - rect.top;

      // Ensure touch devices don't get their scroll blocked by line drawing.
      // We'll just spawn a single premium burst on tap instead.
      const isTouch = e.pointerType === 'touch' || e.pointerType === 'pen' || (e.pointerType === '' && window.innerWidth < 1024);
      
      if (isTouch) {
        triggerBurst(localX, localY);
        return;
      }

      e.preventDefault(); // Stop native text selection and image dragging (safe for desktop mouse)
      
      setIsDragging(true);
      (window as any).isHeroDragging = true;
      document.body.style.userSelect = "none";
      document.documentElement.style.userSelect = "none";
      document.body.classList.add("is-dragging");
      
      dragStart.current = { x: localX, y: localY };
      mousePos.current = { x: localX, y: localY };
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        // We only allow isDragging=true on non-touch devices now, so preventDefault is completely safe and won't hijack mobile scroll!
        e.preventDefault(); 
        const rect = containerRef.current?.getBoundingClientRect();
        const localX = rect ? e.clientX - rect.left : e.clientX;
        const localY = rect ? e.clientY - rect.top : e.clientY;
        mousePos.current = { x: localX, y: localY };
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging) {
        setIsDragging(false);
        (window as any).isHeroDragging = false;
        document.body.style.userSelect = "";
        document.documentElement.style.userSelect = "";
        document.body.classList.remove("is-dragging");
        
        const dx = mousePos.current.x - dragStart.current.x;
        const dy = mousePos.current.y - dragStart.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 20) {
          triggerBurst(dragStart.current.x, dragStart.current.y);
        }
      }
    };

    window.addEventListener("pointerdown", handlePointerDown, { passive: false });
    window.addEventListener("pointermove", handlePointerMove, { passive: false });
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointercancel", handlePointerUp);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointercancel", handlePointerUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-[20] pointer-events-none overflow-hidden"
      style={{ clipPath: "inset(0)" }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none"
      />
    </div>
  );
}
