# AK Dan Designs — Design System & Guidelines

This document outlines the core design language, typography, color tokens, and interaction patterns for **AK Dan Designs**. Use this as a reference guide for any future additions to the website to ensure brand consistency.

## 1. Brand Philosophy
- **Aesthetic:** Brutalist, premium, high-contrast, motion-driven.
- **Core Principle:** "I design clarity, stripping away the noise so your true value speaks for itself."
- **Tone:** Confident, sparse, and impactful.

---

## 2. Color Palette
The website uses a dynamic CSS variable system defined in `globals.css` with a Light and Dark mode.

### Dark Mode (Default)
- **Background (`--bg`):** `#0e100f` (Deep Charcoal Black)
- **Surface (`--surface`):** `#1c1e1d` (Elevated dark gray for cards/sections)
- **Text (`--text`):** `#fffce1` (Warm off-white)
- **Muted Text (`--muted`):** `#9ba09e`
- **Borders (`--border`):** `#2e302f`
- **Accent:** `#0ae448` (Neon Green)

### Light Mode
- **Background (`--bg`):** `#fffce1` (Warm off-white)
- **Surface (`--surface`):** `#f3f0d1`
- **Text (`--text`):** `#0e100f`
- **Muted Text (`--muted`):** `#666867`
- **Borders (`--border`):** `#e0ddc0`

### The "Brand Gradient"
Used in dynamic borders, buttons, and hover states. Uses 4 primary vibrant brand colors:
1. **Green:** `#0AE448`
2. **Pink:** `#FFA6FA`
3. **Orange:** `#FF8709`
4. **Cyan:** `#00BAE2`

*Utility Classes:* `.brand-text-gradient`, `.brand-bg-gradient`, `.brand-border-gradient`

---

## 3. Typography
The system uses 3 primary Google Fonts + 1 Custom Font, mapped in `tailwind.config.ts`.

- **Headings (`font-bebas`):** *Bebas Neue*
  - Used for massive hero text, section headers, and project titles. Always `uppercase`, tightly leaded (`leading-none` or `leading-[0.85]`), and often slightly tracked out (`tracking-wide`).
- **Body (`font-sans`):** *DM Sans*
  - Used for paragraphs, descriptions, and general reading text. Keep font weights light (`font-light` or `font-normal`).
- **Labels & Micro-copy (`font-mono`):** *DM Mono*
  - Used for small uppercase labels, buttons, and categories. Always combined with `text-[11px]` to `text-[13px]`, `uppercase`, and `tracking-[0.1em]` to `tracking-widest`.
- **Accent (`font-brother`):** *Brother Oblique*
  - Used sparingly for special italicized brand touches.

---

## 4. Interaction & Motion Patterns
All interactions should feel deliberate, premium, and smooth.

- **GSAP Splitting:** Large headings load using `SplitText` from GSAP, sliding up by character or word from `yPercent: 120`.
- **Magnetic Buttons:** Primary Calls to Action (CTAs) are wrapped in a `<MagneticButton>` component to give them a premium physical "pull" effect on hover.
- **Custom Cursor:** On desktop (`min-width: 768px`), the native cursor is hidden and replaced by `<CustomCursor />` which tracks the mouse position.
- **Smooth Scrolling:** Handled globally by `Lenis` via the `<SmoothScroll>` component wrapper.
- **Hover Reveal:** Project images strictly use `grayscale` on idle, and transition to full color (`grayscale-0`) with a slow scale up (`scale-[1.03]`) on hover.

---

## 5. Textures & Effects
- **Grain Overlay:** The site utilizes dynamic generated noise/grain. On text or background shapes, a data-URI canvas noise is applied via `mix-blend-mode: overlay`. 
- **Glass/Glow:** Gradients are frequently heavily blurred (`filter: blur(30px)`) to create ambient glowing orbs behind elements (e.g., the Preloader and the Hero interactions).

> [!WARNING]
> **Mobile Optimization:** Do not use `mix-blend-mode` or intense `filter: blur()` alongside CSS animations on mobile elements that spawn frequently. Always use GPU acceleration (`will-change: transform`, `transform: translateZ(0)`) to prevent scroll flickering on phones.
