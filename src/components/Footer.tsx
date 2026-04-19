import Link from "next/link";
import MagneticButton from "./MagneticButton";

export default function Footer() {
  return (
    <footer className="w-full bg-bg border-t border-border mt-auto">
      <div className="max-w-[2000px] mx-auto px-6 md:px-12 py-12 flex flex-col items-center md:items-start">
        
        <div className="flex flex-col md:flex-row w-full justify-between items-center mb-12 gap-8">
          <div className="font-helvetica text-[18px] tracking-[0.02em] text-text">
            akdandesigns
          </div>
          
          <nav className="flex flex-wrap justify-center gap-4 md:gap-12 text-center">
            {["HOME", "WORKS", "BLOGS", "ABOUT", "SERVICES", "BOOK A CALL"].map((label) => {
              const href = label === "HOME" ? "/" : label === "BOOK A CALL" ? "/contact" : `/${label.toLowerCase()}`;
              return (
                <MagneticButton key={label}>
                  <Link
                    href={href}
                    className="font-mono text-[13px] uppercase tracking-[0.12em] text-text hover:text-accent transition-colors"
                  >
                    {label}
                  </Link>
                </MagneticButton>
              );
            })}
          </nav>
          
          <div className="flex gap-6 font-mono text-[13px] tracking-[0.12em] uppercase">
            <MagneticButton>
              <a href="https://www.instagram.com/the_akdan/" target="_blank" rel="noopener noreferrer" className="text-text hover:text-accent transition-colors">IG</a>
            </MagneticButton>
            <MagneticButton>
              <a href="#" className="text-text hover:text-accent transition-colors">IN</a>
            </MagneticButton>
          </div>
        </div>

        <div className="w-full text-center border-t border-border/50 pt-8">
          <span className="font-mono text-[12px] text-muted tracking-widest uppercase">
            © {new Date().getFullYear()} akdandesigns. All rights reserved.
          </span>
        </div>

      </div>
    </footer>
  );
}
