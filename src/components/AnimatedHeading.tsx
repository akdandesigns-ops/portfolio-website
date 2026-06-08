"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "@/lib/gsap/SplitText";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);
}

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedHeading({ text, className = "", delay = 0 }: AnimatedHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const split = new SplitText(containerRef.current, { type: "words,chars" });

    gsap.from(split.chars, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%",
      },
      yPercent: 120,
      opacity: 0,
      duration: 0.8,
      stagger: 0.02,
      ease: "power4.out",
      delay: delay,
    });

    return () => split.revert();
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      {text}
    </div>
  );
}
