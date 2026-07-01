"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import MagneticButton from "@/components/MagneticButton";
import AnimatedHeading from "@/components/AnimatedHeading";

export default function ContactPage() {
  const [step, setStep] = useState<"form" | "booking" | "success">("form");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    type: "",
    message: "",
  });
  const [bookingData, setBookingData] = useState({
    date: "",
    slot: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const timeSlots = ["8:30 PM", "9:00 PM", "9:30 PM"];

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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("booking");
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingData.date || !bookingData.slot) {
      setError("Please select a date and time slot.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Create a nice human readable date (e.g. Oct 14, 2026)
      const dateObj = new Date(bookingData.date);
      const formattedDate = dateObj.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
      const formattedSlot = `${formattedDate} at ${bookingData.slot} (IST)`;

      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, slot: formattedSlot }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to book call");

      setStep("success");
    } catch (err: any) {
      console.error("Submission error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const isFilled = (val: string) => val.length > 0;
  
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  return (
    <div ref={containerRef} className="w-full flex-1 flex flex-col bg-bg text-text pt-28 md:pt-40 px-4 sm:px-6 md:px-12 pb-24 md:pb-32 max-w-[2000px] mx-auto min-h-screen">
      <div className="w-full flex flex-col lg:flex-row gap-12 lg:gap-32 h-full">
        
        {/* Left Column (55%) */}
        <div className="w-full lg:w-[55%] flex flex-col gap-8 md:gap-16">
          <AnimatedHeading 
            text="LET'S BUILD SOMETHING THAT LASTS."
            className="font-bebas text-5xl sm:text-7xl md:text-[120px] leading-[0.85] tracking-wide"
          />

          <div className="contact-col-left flex flex-col gap-6 font-mono text-[12px] md:text-[15px] text-muted tracking-[0.1em]">
            <div className="flex items-start gap-4">
              <span className="brand-text-gradient">—</span>
              <p>30-MIN BRAND STRATEGY SESSION</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="brand-text-gradient">—</span>
              <p>NO PITCH. JUST HONEST CONVERSATION.</p>
            </div>
            <div className="flex items-start gap-4">
              <span className="brand-text-gradient">—</span>
              <p>QUALITY ISN'T NEGOTIABLE. EVERY PIXEL, INTENTIONAL.</p>
            </div>
          </div>
        </div>

        {/* Right Column (45%) — Form / Booking / Success */}
        <div className="contact-col-right w-full lg:w-[45%] flex flex-col justify-center">
          
          {step === "success" ? (
            <div className="flex flex-col gap-6">
              <h2 className="font-bebas text-4xl md:text-5xl brand-text-gradient">THANK YOU.</h2>
              <p className="font-sans font-light text-[16px] md:text-[18px] text-text/80 leading-[1.8]">
                Your booking has been confirmed! An email has been sent to <strong>{formData.email}</strong> containing your Google Meet link. I look forward to our conversation.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <div className="w-2 h-2 brand-bg-gradient rounded-full" />
                <span className="font-mono text-[12px] brand-text-gradient tracking-widest uppercase">Meeting Scheduled</span>
              </div>
            </div>
          ) : step === "booking" ? (
            <form onSubmit={handleBookingSubmit} className="flex flex-col gap-10 w-full max-w-[600px] fade-in">
              <div className="flex flex-col gap-2">
                <h3 className="font-bebas text-3xl md:text-4xl text-text tracking-wide">Pick a Time</h3>
                <p className="font-mono text-[12px] text-muted tracking-widest uppercase">Select an available 30-min slot</p>
              </div>

              {/* Date Picker */}
              <div className="flex flex-col gap-4">
                <label className="font-mono text-[11px] brand-text-gradient tracking-widest uppercase">Select Date</label>
                <input 
                  type="date" 
                  min={minDate}
                  required
                  className="w-full bg-surface/50 border border-border/50 outline-none rounded-[8px] font-sans font-light text-[16px] text-text py-4 px-4 focus:border-accent/50 transition-colors"
                  value={bookingData.date}
                  onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                />
              </div>

              {/* Time Slots */}
              {bookingData.date && (
                <div className="flex flex-col gap-4 fade-in">
                  <label className="font-mono text-[11px] brand-text-gradient tracking-widest uppercase">Select Time (IST)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {timeSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBookingData({...bookingData, slot})}
                        className={`py-3 px-4 font-mono text-[13px] rounded-[6px] border transition-all duration-300 ${
                          bookingData.slot === slot 
                          ? "border-accent bg-accent/10 text-accent" 
                          : "border-border/50 bg-surface/30 text-text hover:border-text/30"
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && <p className="font-mono text-[12px] text-red-400 tracking-wide">{error}</p>}

              <div className="flex gap-4 mt-4">
                <button 
                  type="button" 
                  onClick={() => setStep("form")}
                  className="py-5 px-8 font-mono text-[13px] uppercase tracking-widest text-text hover:text-accent transition-colors"
                >
                  ← Back
                </button>
                <MagneticButton className="flex-1">
                  <button 
                    disabled={loading || !bookingData.date || !bookingData.slot} 
                    type="submit" 
                    className="group w-full flex justify-center items-center py-5 brand-button transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="font-mono text-[13px] md:text-[14px] uppercase tracking-widest font-bold">
                      {loading ? "SCHEDULING..." : "CONFIRM BOOKING →"}
                    </span>
                  </button>
                </MagneticButton>
              </div>
            </form>
          ) : (
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-14 md:gap-16 w-full max-w-[600px] fade-in">
              {/* Full Name */}
              <div className="relative w-full pt-6">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${isFilled(formData.name) ? "top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase" : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"}`}>
                  Full Name
                </label>
                <input 
                  type="text" required 
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2"
                  value={formData.name}
                  onFocus={(e) => { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase"; }}
                  onBlur={(e) => { if (!e.target.value) { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; } }}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Email Address */}
              <div className="relative w-full pt-6">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${isFilled(formData.email) ? "top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase" : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"}`}>
                  Email Address
                </label>
                <input 
                  type="email" required 
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2"
                  value={formData.email}
                  onFocus={(e) => { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase"; }}
                  onBlur={(e) => { if (!e.target.value) { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; } }}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Business/Brand Name */}
              <div className="relative w-full pt-6">
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${isFilled(formData.company) ? "top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase" : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"}`}>
                  Business / Brand Name
                </label>
                <input 
                  type="text" 
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2"
                  value={formData.company}
                  onFocus={(e) => { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase"; }}
                  onBlur={(e) => { if (!e.target.value) { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; } }}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Type of Project Dropdown */}
              <div className="relative w-full pt-6">
                <label className="absolute left-0 top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase pointer-events-none transition-all duration-300">
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
                <label className={`absolute left-0 transition-all duration-300 pointer-events-none ${isFilled(formData.message) ? "top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase" : "top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"}`}>
                  Brief description of what you need
                </label>
                <textarea 
                  required rows={3}
                  className="w-full bg-transparent border-none outline-none font-sans font-light text-[16px] md:text-[18px] text-text py-2 resize-none"
                  value={formData.message}
                  onFocus={(e) => { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-0 text-[11px] brand-text-gradient font-mono tracking-widest uppercase"; }}
                  onBlur={(e) => { if (!e.target.value) { const label = e.target.previousElementSibling as HTMLElement; if (label) label.className = "absolute left-0 transition-all duration-300 pointer-events-none top-8 text-[16px] md:text-[18px] text-text/50 font-sans font-light"; } }}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
                <div className="w-full h-[1px] bg-border" />
              </div>

              {/* Submit CTA */}
              <div className="mt-2 md:mt-4">
                <MagneticButton className="w-full">
                  <button type="submit" className="group w-full flex justify-center items-center py-5 md:py-6 brand-button transition-all duration-300">
                    <span className="font-mono text-[13px] md:text-[14px] uppercase tracking-widest font-bold">
                      NEXT: SELECT TIME →
                    </span>
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
