"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function CustomCursor() {
  const [isMobile, setIsMobile] = useState(false);
  const cursorArrowRef = useRef<HTMLDivElement>(null);
  const cursorCircleRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  useGSAP(() => {
    if (isMobile) return;

    let isHovering = false;

    const xArrow = cursorArrowRef.current ? gsap.quickTo(cursorArrowRef.current, "x", { duration: 0.1, ease: "power3" }) : () => {};
    const yArrow = cursorArrowRef.current ? gsap.quickTo(cursorArrowRef.current, "y", { duration: 0.1, ease: "power3" }) : () => {};
    
    const xCircle = cursorCircleRef.current ? gsap.quickTo(cursorCircleRef.current, "x", { duration: 0.15, ease: "power3" }) : () => {};
    const yCircle = cursorCircleRef.current ? gsap.quickTo(cursorCircleRef.current, "y", { duration: 0.15, ease: "power3" }) : () => {};

    const updateMousePosition = (e: MouseEvent) => {
      xArrow(e.clientX - 2);
      yArrow(e.clientY - 2);
      xCircle(e.clientX - 24);
      yCircle(e.clientY - 24);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHoverStart = () => {
      isHovering = true;
      if (cursorArrowRef.current) gsap.to(cursorArrowRef.current, { opacity: 0, scale: 0, duration: 0.2 });
      if (cursorCircleRef.current) gsap.to(cursorCircleRef.current, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" });
    };

    const handleLinkHoverEnd = () => {
      isHovering = false;
      if (cursorArrowRef.current) gsap.to(cursorArrowRef.current, { opacity: 1, scale: 1, duration: 0.2 });
      if (cursorCircleRef.current) gsap.to(cursorCircleRef.current, { opacity: 0, scale: 0.3, duration: 0.3, ease: "power3.out" });
    };

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    const addHoverListeners = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, input, textarea, select, [data-magnetic], .group"
      );
      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleLinkHoverStart);
        el.addEventListener("mouseleave", handleLinkHoverEnd);
      });
      return interactiveElements;
    };

    let currentElements = addHoverListeners();

    const mutationObserver = new MutationObserver(() => {
      currentElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
      currentElements = addHoverListeners();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

    if (cursorCircleRef.current) {
      gsap.set(cursorCircleRef.current, { opacity: 0, scale: 0.3 });
    }

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      currentElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
      mutationObserver.disconnect();
    };
  }, [isMobile, isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      <div
        ref={cursorArrowRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M5 2L20 12L12 13.5L9 21L5 2Z" fill="var(--accent)" stroke="var(--accent)" strokeWidth="1" strokeLinejoin="round" />
        </svg>
      </div>

      <div
        ref={cursorCircleRef}
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          width: 48,
          height: 48,
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
        }}
      />
    </>
  );
}
