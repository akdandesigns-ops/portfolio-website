import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import FluidCanvas from "@/components/FluidCanvas";
import GrainOverlay from "@/components/GrainOverlay";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
import Preloader from "@/components/Preloader";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
});

const dmMono = DM_Mono({
  weight: ["300", "400"],
  subsets: ["latin"],
  variable: "--font-dm-mono",
});

export const metadata: Metadata = {
  title: {
    default: "AK Dan Designs | Brand Design in Chennai & Web Design Service",
    template: "%s | AK Dan Designs",
  },
  description: "Welcome to AK Dan Designs (akdandesigns) by Aswin Kumaaran. I design clarity, stripping away the noise so your true value speaks for itself. Premium brand design in Chennai, web design service, and animated website design.",
  keywords: [
    "AK Dan Designs",
    "ak dan designs",
    "akdandesigns",
    "Aswin Kumaaran",
    "Brand Identity Chennai",
    "Logo Design Chennai",
    "Brand Design in Chennai",
    "Web Design Service",
    "Animated Website Design",
    "Visual Identity",
    "Premium Brand Strategist India",
    "Independent Designer Chennai",
    "AI Product Photography"
  ],
  metadataBase: new URL("https://akdandesigns.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AK Dan Designs | Brand Design in Chennai & Web Design Service",
    description: "Stripping away the noise so your true value speaks for itself. Strategic visual systems and animated website design by AK Dan Designs.",
    url: "https://akdandesigns.in",
    siteName: "AK Dan Designs",
    images: [
      {
        url: "/works/licet-15/display mockup.jpg",
        width: 1200,
        height: 630,
        alt: "AK Dan Designs Brand Design Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AK Dan Designs | Clarity in Brand Design",
    description: "Stripping away the noise so your true value speaks for itself. Strategic visual systems by AK Dan Designs.",
    images: ["/works/licet-15/display mockup.jpg"],
  },
  icons: {
    icon: "/favicon.png",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "AK Dan Designs",
              "description": "Premium brand design in Chennai, offering web design services and animated website design by freelance designer Aswin Kumaaran.",
              "url": "https://akdandesigns.in",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Chennai",
                "addressCountry": "IN"
              }
            })
          }}
        />
      </head>
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable} font-sans antialiased bg-bg text-text min-h-screen flex flex-col overflow-x-clip`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" value={{ light: "light", dark: "dark" }}>
          <Preloader />
          <FluidCanvas />
          <CustomCursor />
          <Navigation />
          <SmoothScroll>
            <main className="flex-1 w-full relative z-10 pt-[64px]">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
