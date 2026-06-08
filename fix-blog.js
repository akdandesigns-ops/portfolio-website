const fs = require('fs');
const filePath = 'src/app/blogs/[slug]/page.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// Replace imports
c = c.replace(/import { motion } from "framer-motion";/g, 'import gsap from "gsap";\nimport { useGSAP } from "@gsap/react";\nimport { useRef } from "react";');

// Add container ref and GSAP hook
c = c.replace(/export default function BlogPostPage\(\) {/g, `export default function BlogPostPage() {
  const containerRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    gsap.from(".fade-up", {
      opacity: 0,
      y: 20,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out"
    });
    gsap.from(".fade-scale", {
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      delay: 0.4,
      ease: "power3.out"
    });
    gsap.from(".fade-in", {
      opacity: 0,
      duration: 0.8,
      delay: 0.6,
      ease: "power3.out"
    });
  }, { scope: containerRef });`);

// Replace article
c = c.replace(/<article /g, '<article ref={containerRef} ');

// Replace motion tags
c = c.replace(/<motion\.div\s*initial={{[^}]+}}\s*animate={{[^}]+}}\s*className="([^"]+)"/g, '<div className="$1 fade-up"');
c = c.replace(/<motion\.h1\s*initial={{[^}]+}}\s*animate={{[^}]+}}\s*transition={{[^}]+}}\s*className="([^"]+)"/g, '<h1 className="$1 fade-up"');
c = c.replace(/<motion\.div\s*initial={{[^}]+}}\s*animate={{[^}]+}}\s*transition={{[^}]+}}\s*className="([^"]+)"/g, '<div className="$1 fade-scale"');
// Fallback for others
c = c.replace(/<motion\.div[^>]*className="([^"]+)"/g, '<div className="$1 fade-in"');

c = c.replace(/<\/motion\.div>/g, '</div>');
c = c.replace(/<\/motion\.h1>/g, '</h1>');

fs.writeFileSync(filePath, c);
console.log('Fixed blog slug framer motion');
