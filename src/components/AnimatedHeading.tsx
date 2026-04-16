"use client";

import { motion } from "framer-motion";

interface AnimatedHeadingProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function AnimatedHeading({ text, className = "", delay = 0 }: AnimatedHeadingProps) {
  // Split the text into an array of words
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { 
        staggerChildren: 0.1, 
        delayChildren: delay 
      },
    },
  };

  const item = {
    hidden: { y: "100%", opacity: 0 },
    show: {
      y: "0%",
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" } as const,
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10%" }}
      className={`flex flex-wrap gap-x-[0.3em] gap-y-2 ${className}`}
    >
      {words.map((word, i) => (
        <div key={i} className="overflow-hidden pb-1 lg:pb-3">
          <motion.span variants={item} className="inline-block">
            {word}
          </motion.span>
        </div>
      ))}
    </motion.div>
  );
}
