"use client";

import { useRef, MouseEvent, ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ClickSpark from "./ClickSpark";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const xTo = useRef<gsap.QuickToFunc>();
  const yTo = useRef<gsap.QuickToFunc>();

  useGSAP(() => {
    xTo.current = gsap.quickTo(ref.current, "x", { duration: 0.5, ease: "elastic.out(1, 0.3)" });
    yTo.current = gsap.quickTo(ref.current, "y", { duration: 0.5, ease: "elastic.out(1, 0.3)" });
  }, { scope: ref });

  const handleMouse = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    
    const x = middleX * 0.2;
    const y = middleY * 0.2;
    
    if (xTo.current) xTo.current(x);
    if (yTo.current) yTo.current(y);
  };

  const reset = () => {
    if (xTo.current) xTo.current(0);
    if (yTo.current) yTo.current(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      className={`relative inline-block ${className}`}
      data-magnetic="true"
    >
      <ClickSpark
        sparkColor="#ffffff"
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
        easing="ease-out"
        extraScale={1}
      >
        {children}
      </ClickSpark>
    </div>
  );
}
