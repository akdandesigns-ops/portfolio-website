"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Don't render custom cursor on touch devices
    if (window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 768) {
      setIsMobile(true);
      return;
    }

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleLinkHoverStart = () => setIsHovering(true);
    const handleLinkHoverEnd = () => setIsHovering(false);

    window.addEventListener("mousemove", updateMousePosition);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    // Use MutationObserver to track dynamically added interactive elements
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
      // Re-bind on DOM changes
      currentElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleLinkHoverStart);
        el.removeEventListener("mouseleave", handleLinkHoverEnd);
      });
      currentElements = addHoverListeners();
    });

    mutationObserver.observe(document.body, { childList: true, subtree: true });

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
  }, [isVisible]);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Default state: modern arrow cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        animate={{
          x: mousePosition.x - 2,
          y: mousePosition.y - 2,
          opacity: isHovering ? 0 : 1,
          scale: isHovering ? 0 : 1,
        }}
        transition={{
          x: { duration: 0, ease: "linear" },
          y: { duration: 0, ease: "linear" },
          opacity: { duration: 0.2 },
          scale: { duration: 0.2, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 2L20 12L12 13.5L9 21L5 2Z"
            fill="var(--accent)"
            stroke="var(--accent)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      {/* Hover state: expanding circle */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999]"
        style={{
          backgroundColor: "#ffffff",
          mixBlendMode: "difference",
        }}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          width: 48,
          height: 48,
          opacity: isHovering ? 1 : 0,
          scale: isHovering ? 1 : 0.3,
        }}
        transition={{
          x: { duration: 0, ease: "linear" },
          y: { duration: 0, ease: "linear" },
          opacity: { duration: 0.25 },
          scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
        }}
      />
    </>
  );
}
