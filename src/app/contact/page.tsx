"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/MagneticButton";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    type: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const service = params.get("service");
      if (service) {
        setFormData((prev) => ({ ...prev, type: service }));
      }
    }
  }, []);

  useGSAP(() => {
    gsap.from(".contact-col-left", { opacity: 0, duration: 1, delay: 0.4, ease: "power2.out" });
    gsap.from(".contact-col-right", { opacity: 0, x: 20, duration: 0.8, delay: 0.2, ease: "power2.out" });
  }, { scope: containerRef });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formPayload = new URLSearchParams();
      formPayload.append("name", formData.name);
      formPayload.append("email", formData.email);
      formPayload.append("company", formData.company);
      formPayload.append("type", formData.type);
      formPayload.append("message", formData.message);
      formPayload.append("timestamp", new Date().toISOString());

      await fetch(
        "https://script.google.com/macros/s/AKfycby_25qDxXRa-65sNBLfd6_-T7iEAgnm4QvjiSpCSOWNjzC4j4MA_e7OPvE2HSitGR21/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formPayload.toString(),
        }
      );

      setSubmitted(true);
      window.open("https://calendly.com/akdandesigns/30min", "_blank");
    } catch (err) {
      console.error("Submission error:", err);
      setError("Something went wrong. Please try again or email directly.");
    } finally {
      setLoading(false);
    }
  };

  const isFilled = (val: string) => val.length > 0;

  return (
    <div ref={containerRef} className="w-full flex-1 flex flex-col bg-bg text-text pt-28 md:pt-40 px-4 sm:px-6 md:px-12 pb-24 md:pb-32 max-w-[2000px] mx-auto min-h-screen">
      
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-32 h-full">
        
        {/* Left Column (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col gap-8 md:gap-16">
          <AnimatedHeading 
            text="LET'S BUILD SOMETHING THAT LASTS."
            className="font-bebas text-5xl sm:text-7xl md:text-[120px] leading-[0.85] tracking-wide"
          />

          <div 
            className="contact-col-left flex flex-col gap-6 font-mono text-[12px] md:text-[15px] text-muted tracking-[0.1em]"
          >
            <div className="flex items-start gap-4">
              <span className="text-accent">—</span>
              <p>30-MIN BRAND STRATEGY SESSION</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-accent">—</span>
              <p>NO PITCH. JUST HONEST CONVERSATION.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="text-accent">—</span>
              <p>QUALITY ISN&apos;T NEGOTIABLE. EVERY PIXEL, INTENTIONAL.</p>
            </div>
          </div>
        </div>

        {/* Right Column (45%) — Form */}
        <div 
          className="contact-col-right w-full lg:w-[45%] flex flex-col justify-center"
        >
          {submitted ? (
            <div className="flex flex-col gap-6">
              <h2 className="font-bebas text-4xl md:text-5xl text-accent">THANK YOU.</h2>
              <p className="font-sans font-light text-[16px] md:text-[18px] text-text/80 leading-[1.8]">
                Your details have been recorded. A Calendly tab has been opened for you to pick a time slot. I&apos;ll review your request and we&apos;ll connect soon.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-2 h-2 bg-accent rounded-full" />
                <span className="font-mono text-[12px] text-accent tracking-widest uppercase">Submission successful</span>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-14 md:gap-16 w-full max-w-[600px]">
              
              {/* Full Name */}
              <div className="relative w-full pt-6">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    isFilled(formData.name)
                      ? "top-0 text-[11px] text-accent font-mono tracking-widest uppercase"
                      : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"
                  }`}
                >
                  Full Name
                </label>
                <input 
                  type="text" 
                  required 
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2"
                  value={formData.name}
                  onFocus={(e) => {
                    const label = e.target.previousElementSibling as HTMLElement;
                    if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] text-accent font-mono tracking-widest uppercase"; }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      const label = e.target.previousElementSibling as HTMLElement;
                      if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; }
                    }
                  }}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Email Address */}
              <div className="relative w-full pt-6">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    isFilled(formData.email)
                      ? "top-0 text-[11px] text-accent font-mono tracking-widest uppercase"
                      : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"
                  }`}
                >
                  Email Address
                </label>
                <input 
                  type="email" 
                  required 
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2"
                  value={formData.email}
                  onFocus={(e) => {
                    const label = e.target.previousElementSibling as HTMLElement;
                    if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] text-accent font-mono tracking-widest uppercase"; }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      const label = e.target.previousElementSibling as HTMLElement;
                      if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; }
                    }
                  }}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Business/Brand Name */}
              <div className="relative w-full pt-6">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    isFilled(formData.company)
                      ? "top-0 text-[11px] text-accent font-mono tracking-widest uppercase"
                      : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"
                  }`}
                >
                  Business / Brand Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2"
                  value={formData.company}
                  onFocus={(e) => {
                    const label = e.target.previousElementSibling as HTMLElement;
                    if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] text-accent font-mono tracking-widest uppercase"; }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      const label = e.target.previousElementSibling as HTMLElement;
                      if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; }
                    }
                  }}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Type of Project Dropdown */}
              <div className="relative w-full pt-6">
                <label className="absolute left-0 top-0 text-[11px] text-accent font-mono tracking-widest uppercase pointer-events-none transition-all duration-300">
                  Type of Project
                </label>
                <select
                  required
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2 cursor-pointer appearance-none rounded-none"
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                >
                  <option value="" disabled className="text-text bg-surface">Select a Project Type</option>
                  <option value="Landing Page Design" className="text-text bg-surface">Landing Page Design</option>
                  <option value="Logo Design" className="text-text bg-surface">Logo Design</option>
                  <option value="Visual Identity" className="text-text bg-surface">Visual Identity</option>
                  <option value="Brand Identity" className="text-text bg-surface">Brand Identity</option>
                  <option value="Other" className="text-text bg-surface">Other</option>
                </select>
                <div className="absolute right-0 top-8 pointer-events-none text-text/50">▼</div>
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Brief Description */}
              <div className="relative w-full pt-6">
                <label
                  className={`absolute left-0 transition-all duration-300 pointer-events-none ${
                    isFilled(formData.message)
                      ? "top-0 text-[11px] text-accent font-mono tracking-widest uppercase"
                      : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"
                  }`}
                >
                  Brief description of what you need
                </label>
                <textarea 
                  required 
                  rows={3}
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2 resize-none"
                  value={formData.message}
                  onFocus={(e) => {
                    const label = e.target.previousElementSibling as HTMLElement;
                    if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] text-accent font-mono tracking-widest uppercase"; }
                  }}
                  onBlur={(e) => {
                    if (!e.target.value) {
                      const label = e.target.previousElementSibling as HTMLElement;
                      if (label) { label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; }
                    }
                  }}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Error Message */}
              {error && (
                <p className="font-mono text-[12px] text-red-400 tracking-wide">{error}</p>
              )}

              {/* Submit CTA */}
              <div className="mt-2 md:mt-4">
                <MagneticButton className="w-full">
                  <button disabled={loading} type="submit" className="w-full flex justify-center items-center py-5 md:py-6 bg-accent border border-accent text-bg font-mono text-[13px] md:text-[14px] uppercase tracking-widest hover:bg-bg hover:text-accent transition-colors duration-300 disabled:opacity-50">
                    {loading ? "SUBMITTING..." : "BOOK YOUR CALL →"}
                  </button>
                </MagneticButton>
              </div>

            </form>
          )}
        </div>
      </div>

    </div>
  );
}
