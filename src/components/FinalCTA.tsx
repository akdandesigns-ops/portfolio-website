import Link from "next/link";
import MagneticButton from "./MagneticButton";
import AnimatedHeading from "./AnimatedHeading";

export function FinalCTA() {
  return (
    <section className="w-full py-24 md:py-32 flex flex-col items-center justify-center px-6 text-center border-t border-border mt-16 relative">
      <div className="max-w-4xl flex flex-col items-center gap-8 z-10">
        <AnimatedHeading 
          text="Launching or growing a D2C brand?" 
          className="font-bebas text-5xl md:text-8xl tracking-wide uppercase text-text"
        />
        
        <p className="font-sans font-light text-[16px] md:text-[20px] leading-[1.6] max-w-2xl text-text/80">
          Let’s build a brand identity that makes your product look premium, trustworthy, and ready for the market.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-6 mt-8">
          <MagneticButton>
            <Link 
              href="/contact" 
              className="group px-10 py-5 brand-button transition-all duration-300 flex items-center justify-center min-w-[200px]"
            >
              <span className="font-mono text-sm uppercase tracking-widest font-bold">
                Start a Project
              </span>
            </Link>
          </MagneticButton>

          <MagneticButton>
            <Link 
              href="/works" 
              className="group px-10 py-5 border border-border hover:border-text transition-all duration-300 flex items-center justify-center min-w-[200px]"
            >
              <span className="font-mono text-sm uppercase tracking-widest text-text">
                View Work
              </span>
            </Link>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
