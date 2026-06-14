"use client";

import { ReactNode, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // On every route change, refresh all ScrollTrigger instances
    // so content is measured correctly after the DOM updates
    const timer = setTimeout(() => {
      ScrollTrigger.refresh(true);
      // Scroll to top on route change
      window.scrollTo(0, 0);
    }, 100);

    // Setup ResizeObserver to detect layout shifts (like images loading)
    let resizeTimer: ReturnType<typeof setTimeout>;
    let lastWidth = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) return;
      const currentWidth = entries[0].contentRect.width;
      
      // Ignore if only height changed (prevents mobile URL bar scroll jumping)
      if (lastWidth !== 0 && lastWidth === currentWidth) return;
      lastWidth = currentWidth;

      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        ScrollTrigger.refresh(true);
      }, 50);
    });

    if (wrapperRef.current) {
      resizeObserver.observe(wrapperRef.current);
    }

    return () => {
      clearTimeout(timer);
      clearTimeout(resizeTimer);
      resizeObserver.disconnect();
    };
  }, [pathname]);

  return (
    <div ref={wrapperRef}>
      {children}
    </div>
  );
}
