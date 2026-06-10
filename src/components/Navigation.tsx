"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import MagneticButton from "./MagneticButton";
import { ThemeToggle } from "./ThemeToggle";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const links = [
  { href: "/", label: "HOME" },
  { href: "/works", label: "WORKS" },
  { href: "/blogs", label: "BLOGS" },
  { href: "/about", label: "ABOUT" },
  { href: "/services", label: "SERVICES" },
  { href: "/contact", label: "BOOK A CALL" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  const menuRef = useRef<HTMLDivElement>(null);
  const { contextSafe } = useGSAP({ scope: menuRef });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      gsap.to(menuRef.current, { autoAlpha: 1, duration: 0.4, ease: "power3.out" });
      gsap.fromTo(".mobile-link", 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.1, ease: "power3.out" }
      );
    } else {
      document.body.style.overflow = "";
      gsap.to(menuRef.current, { autoAlpha: 0, duration: 0.4, ease: "power3.in" });
    }
    
    return () => {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

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
                      isActive ? "text-text border-b-2 brand-border-gradient pb-[2px]" : "text-text hover:brand-text-gradient"
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
      <div
        ref={menuRef}
        className="fixed inset-0 z-[99] bg-bg flex flex-col items-center justify-center opacity-0 invisible"
      >
        <nav className="flex flex-col items-center gap-6">
          {links.map((link) => (
            <div key={link.href} className="mobile-link opacity-0">
              <Link
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-bebas text-5xl text-text hover:brand-text-gradient transition-colors"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </>
  );
}
