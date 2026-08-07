"use client";

import { useRef, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
  duration?: number;
  delay?: number;
  once?: boolean;
}

export default function ScrollReveal({
  children,
  className = "",
  yOffset = 40,
  duration = 0.9,
  delay = 0,
  once = true,
}: ScrollRevealProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!elementRef.current) return;
    
    gsap.from(elementRef.current, {
      scrollTrigger: {
        trigger: elementRef.current,
        start: "top 85%",
        once: once,
      },
      opacity: 0,
      y: yOffset,
      duration: duration,
      delay: delay,
      ease: "power3.out",
    });
  }, { scope: elementRef });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}
