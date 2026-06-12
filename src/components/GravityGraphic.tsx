"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Observer } from "@/lib/gsap/Observer";
// We don't strictly need Physics2D if we write a custom repel logic, 
// but we will register it if we want to use it later.
import { Physics2DPlugin } from "@/lib/gsap/Physics2DPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP, Observer, Physics2DPlugin);
}

export function GravityGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => {
    setMounted(true);
    setItems(Array.from({ length: 30 }).map((_, i) => {
      const shapes = ['cube', 'sphere', 'cone', 'star', 'pentagon', 'diamond'];
      const colors = ["#0AE448", "#FFA6FA", "#FF8709", "#00BAE2"];
      return {
        id: `item-${i}`,
        type: "shape",
        shapeType: shapes[Math.floor(Math.random() * shapes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        startPos: { 
          x: 10 + Math.random() * 80, 
          y: 10 + Math.random() * 80 
        },
        rotation: Math.random() * 360
      };
    }));
  }, []);

  useGSAP(() => {
    if (!containerRef.current || items.length === 0) return;

    const mm = gsap.matchMedia();

    // Desktop logic: Ambient Floating + Observer Mouse Repel
    mm.add("(min-width: 768px)", () => {
      itemsRef.current.forEach((el, index) => {
        if (!el) return;
        
        const randomRot = gsap.utils.random(-45, 45);

        // Initial pop-in
        gsap.from(el, {
          scale: 0,
          opacity: 0,
          rotation: randomRot * 2,
          duration: 1.5,
          delay: 1 + (index * 0.1),
          ease: "back.out(1.5)"
        });

        // Continuous floating
        gsap.to(el, {
          y: `-=${15 + Math.random() * 20}`,
          x: `+=${(Math.random() - 0.5) * 20}`,
          rotation: `+=${(Math.random() - 0.5) * 45}`,
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.5
        });
      });

      const xTo: gsap.QuickToFunc[] = [];
      const yTo: gsap.QuickToFunc[] = [];

      itemsRef.current.forEach((el) => {
        if (el) {
          xTo.push(gsap.quickTo(el, "x", { duration: 0.8, ease: "power3" }));
          yTo.push(gsap.quickTo(el, "y", { duration: 0.8, ease: "power3" }));
        } else {
          xTo.push((() => {}) as any);
          yTo.push((() => {}) as any);
        }
      });

      (Observer as any).create({
        target: window,
        type: "pointer",
        preventDefault: false,
        onMove: (e: any) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          if (rect.top > window.innerHeight || rect.bottom < 0) return;
          
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const mouseX = e.x;
          const mouseY = e.y;

          itemsRef.current.forEach((el, i) => {
            if (!el) return;
            
            const elRect = el.getBoundingClientRect();
            const elCenterX = elRect.left + elRect.width / 2;
            const elCenterY = elRect.top + elRect.height / 2;

            const dx = elCenterX - mouseX;
            const dy = elCenterY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDist = 400;
            if (distance < maxDist) {
              const force = (maxDist - distance) / maxDist; 
              const repelX = (dx / distance) * force * 100; 
              const repelY = (dy / distance) * force * 100;
              
              const parallaxX = (mouseX - centerX) * 0.05 * (i % 2 === 0 ? 1 : -1);
              const parallaxY = (mouseY - centerY) * 0.05 * (i % 2 === 0 ? 1 : -1);

              gsap.to(el, {
                x: `+=${repelX + parallaxX}`,
                y: `+=${repelY + parallaxY}`,
                duration: 1,
                ease: "power2.out",
                overwrite: "auto"
              });
            } else {
              const parallaxX = (mouseX - centerX) * 0.02 * (i % 2 === 0 ? 1 : -1);
              const parallaxY = (mouseY - centerY) * 0.02 * (i % 2 === 0 ? 1 : -1);
              gsap.to(el, {
                x: parallaxX,
                y: parallaxY,
                duration: 2,
                ease: "power2.out",
                overwrite: "auto"
              });
            }
          });
        }
      });
    });

    // Mobile logic: Ambient Floating + Safe Touch Tracking
    mm.add("(max-width: 767px)", () => {
      itemsRef.current.forEach((el, index) => {
        if (!el) return;
        
        const randomRot = gsap.utils.random(-45, 45);

        // Initial pop-in
        gsap.from(el, {
          scale: 0,
          opacity: 0,
          rotation: randomRot * 2,
          duration: 1.5,
          delay: 1 + (index * 0.1),
          ease: "back.out(1.5)"
        });

        // Continuous floating
        gsap.to(el, {
          y: `-=${15 + Math.random() * 20}`,
          x: `+=${(Math.random() - 0.5) * 20}`,
          rotation: `+=${(Math.random() - 0.5) * 45}`,
          duration: 3 + Math.random() * 2,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: 1.5
        });
      });

      // Touch Observer with absolute xPercent/yPercent to prevent floating conflicts
      (Observer as any).create({
        target: window,
        type: "touch,pointer",
        preventDefault: false,
        onMove: (e: any) => {
          if (!containerRef.current) return;
          const rect = containerRef.current.getBoundingClientRect();
          if (rect.top > window.innerHeight || rect.bottom < 0) return;
          
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          const mouseX = e.x;
          const mouseY = e.y;

          itemsRef.current.forEach((el, i) => {
            if (!el) return;
            
            const elRect = el.getBoundingClientRect();
            const elCenterX = elRect.left + elRect.width / 2;
            const elCenterY = elRect.top + elRect.height / 2;

            const dx = elCenterX - mouseX;
            const dy = elCenterY - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            const maxDist = 250;
            if (distance < maxDist) {
              const force = (maxDist - distance) / maxDist; 
              const repelX = (dx / distance) * force * 80; 
              const repelY = (dy / distance) * force * 80;
              
              const parallaxX = (mouseX - centerX) * 0.05 * (i % 2 === 0 ? 1 : -1);
              const parallaxY = (mouseY - centerY) * 0.05 * (i % 2 === 0 ? 1 : -1);

              gsap.to(el, {
                x: `+=${repelX + parallaxX}`,
                y: `+=${repelY + parallaxY}`,
                duration: 1,
                ease: "power2.out",
                overwrite: "auto"
              });
            } else {
              const parallaxX = (mouseX - centerX) * 0.02 * (i % 2 === 0 ? 1 : -1);
              const parallaxY = (mouseY - centerY) * 0.02 * (i % 2 === 0 ? 1 : -1);
              gsap.to(el, {
                x: parallaxX,
                y: parallaxY,
                duration: 2,
                ease: "power2.out",
                overwrite: "auto"
              });
            }
          });
        }
      });
    });

  }, { scope: containerRef, dependencies: [items] });

  const renderShape = (shapeType: string, color: string, i: number) => {
    const shadowBright = `inset -4px -4px 8px rgba(0,0,0,0.2), inset 4px 4px 12px rgba(255,255,255,0.8), 0 10px 20px rgba(0,0,0,0.3)`;

    if (shapeType === 'sphere') {
      return (
        <div 
          className="rounded-full w-20 h-20 md:w-28 md:h-28 grain-shape" 
          style={{ background: `radial-gradient(circle at 30% 30%, #ffffff 0%, ${color} 40%, ${color} 100%)`, border: '1px solid rgba(255,255,255,0.6)', boxShadow: shadowBright }}
        />
      );
    } else if (shapeType === 'cube') {
      return (
        <div 
          className="rounded-xl w-20 h-20 md:w-28 md:h-28 grain-shape" 
          style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, ${color} 40%, ${color} 100%)`, border: '1px solid rgba(255,255,255,0.6)', boxShadow: shadowBright }}
        />
      );
    } else if (shapeType === 'diamond') {
      return (
        <div 
          className="rounded-2xl w-16 h-16 md:w-24 md:h-24 grain-shape" 
          style={{ background: `linear-gradient(135deg, rgba(255,255,255,0.6) 0%, ${color} 40%, ${color} 100%)`, border: '1px solid rgba(255,255,255,0.6)', boxShadow: shadowBright }}
        />
      );
    } else {
      let pathData = "";
      if (shapeType === 'cone') pathData = "M 50 0 L 0 100 L 100 100 Z";
      else if (shapeType === 'star') pathData = "M 50 0 L 61 35 L 98 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 2 35 L 39 35 Z";
      else if (shapeType === 'pentagon') pathData = "M 50 0 L 100 38 L 82 100 L 18 100 L 0 38 Z";

      return (
        <div className="w-20 h-20 md:w-28 md:h-28 relative" style={{ filter: "drop-shadow(0 15px 25px rgba(0,0,0,0.5))" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 100 100" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id={`grad-${shapeType}-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="50%" stopColor={color} />
                <stop offset="100%" stopColor={color} />
              </linearGradient>
              <filter id={`emboss-${shapeType}-${i}`} x="-20%" y="-20%" width="140%" height="140%">
                <feOffset dx="-4" dy="-4" in="SourceAlpha" result="shadowOffset"/>
                <feGaussianBlur stdDeviation="3" in="shadowOffset" result="shadowBlur"/>
                <feComposite operator="out" in="SourceAlpha" in2="shadowBlur" result="shadowInverse"/>
                <feFlood floodColor="#000000" floodOpacity="0.2" result="shadowColor"/>
                <feComposite operator="in" in="shadowColor" in2="shadowInverse" result="shadowResult"/>
                
                <feOffset dx="4" dy="4" in="SourceAlpha" result="highlightOffset"/>
                <feGaussianBlur stdDeviation="3" in="highlightOffset" result="highlightBlur"/>
                <feComposite operator="out" in="SourceAlpha" in2="highlightBlur" result="highlightInverse"/>
                <feFlood floodColor="#ffffff" floodOpacity="0.9" result="highlightColor"/>
                <feComposite operator="in" in="highlightColor" in2="highlightInverse" result="highlightResult"/>
                
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode in="shadowResult" />
                  <feMergeNode in="highlightResult" />
                </feMerge>
              </filter>
            </defs>
            <path d={pathData} fill={`url(#grad-${shapeType}-${i})`} filter={`url(#emboss-${shapeType}-${i})`} />
          </svg>
          <div 
             className="absolute inset-0 pointer-events-none opacity-50 mix-blend-overlay"
             style={{
               backgroundImage: `var(--noise-url)`,
               backgroundRepeat: "repeat",
               clipPath: shapeType === 'cone' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' :
                         shapeType === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' :
                         shapeType === 'pentagon' ? 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' : 'none'
             }}
          />
        </div>
      );
    }
  };

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full flex items-center justify-center overflow-visible pointer-events-none">
      <div className="absolute inset-0 z-0">
        {items.map((item, i) => (
          <div
            key={item.id}
            ref={(el) => {
              itemsRef.current[i] = el;
            }}
            className="absolute will-change-transform flex items-center justify-center"
            style={{
              left: `${item.startPos.x}%`,
              top: `${item.startPos.y}%`,
              transform: `rotate(${item.rotation}deg)`
            }}
          >
            {renderShape(item.shapeType, item.color, i)}
          </div>
        ))}
      </div>
    </div>
  );
}
