"use client";

import { motion, Variants } from "framer-motion";

export function Hero() {
  const line1 = "WE DESIGN".split(" ");
  const line2 = "BRANDS THAT".split(" ");
  const line3 = "DEFY GRAVITY.".split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.5 },
    },
  };

  const item: Variants = {
    hidden: { y: "120%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative w-full min-h-[100vh] flex flex-col justify-between px-6 md:px-12 max-w-[2000px] mx-auto py-12">
      
      {/* Spacer to push content down */}
      <div className="flex-1 min-h-[60px]" />

      {/* Hero Content Block */}
      <div className="w-full flex justify-center max-w-[2000px] mx-auto z-10">
        <div className="flex flex-col items-start gap-1 md:gap-3">
          {/* Top Left Label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="font-mono text-[10px] md:text-[11px] tracking-[0.12em] uppercase text-muted pl-1"
          >
            Independent Designer — Est. 2024
          </motion.div>

          {/* Center Huge Text */}
          <motion.h1
            variants={container}
            initial="hidden"
            animate="show"
            className="font-bebas text-[clamp(72px,12vw,180px)] leading-[0.85] tracking-[0.04em] text-text flex flex-col uppercase"
          >
            <div className="overflow-hidden pb-2 lg:pb-4 flex gap-[clamp(16px,2.5vw,36px)]">
              {line1.map((word, i) => (
                <motion.span key={i} variants={item} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden pb-2 lg:pb-4 flex gap-[clamp(16px,2.5vw,36px)]">
              {line2.map((word, i) => (
                <motion.span key={i} variants={item} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="overflow-hidden pb-2 lg:pb-4 flex gap-[clamp(16px,2.5vw,36px)] text-accent">
              {line3.map((word, i) => (
                <motion.span key={i} variants={item} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </div>
          </motion.h1>

          {/* Descriptor — 40px below hero text, left-aligned */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans font-light text-[15px] md:text-[17px] leading-[1.6] max-w-[420px] text-text/80 mt-10 pl-1"
          >
            akdandesigns crafts identities that rise above the ordinary — strategic, precise, and impossible to ignore.
          </motion.p>
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1 min-h-[40px]" />

      {/* Scroll Indicator — bottom center */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center gap-4 self-center pb-4"
      >
        <span className="font-mono text-[11px] tracking-[0.12em] text-text uppercase">
          Scroll
        </span>
        <div className="w-[1px] h-[60px] bg-border relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-[30px] bg-accent"
            animate={{
              y: ["-100%", "200%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}
