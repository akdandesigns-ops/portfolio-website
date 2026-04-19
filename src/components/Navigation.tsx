"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "/", label: "HOME" },
  { href: "/work", label: "WORK" },
  { href: "/blogs", label: "BLOGS" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/contact", label: "BOOK A CALL" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full h-[64px] z-[100] transition-all duration-300 flex items-center px-6 md:px-12 ${
          scrolled
            ? "bg-overlay backdrop-blur-[24px] border-b border-border"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex w-full justify-between items-center max-w-[2000px] mx-auto">
          <Link href="/" className="font-helvetica text-[22px] tracking-[0.02em] text-text">
            <MagneticButton>akdandesigns</MagneticButton>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <MagneticButton key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-mono text-[13px] uppercase tracking-[0.12em] transition-colors ${
                      isActive ? "text-text border-b-2 border-accent pb-[2px]" : "text-text hover:text-accent"
                    }`}
                  >
                    {link.label}
                  </Link>
                </MagneticButton>
              );
            })}
            <div className="ml-4">
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile Nav Toggle & Theme */}
          <div className="md:hidden flex items-center gap-6">
            <ThemeToggle />
            <button
              className="flex flex-col justify-center items-center w-8 h-8 z-[101]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span
              className={`block w-6 h-[1px] bg-text transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[2px]" : "-translate-y-1"
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-text transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`block w-6 h-[1px] bg-text transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[2px]" : "translate-y-1"
              }`}
            />
          </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] bg-bg flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-6">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-bebas text-5xl text-text hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
