import type { Metadata } from "next";
import { Bebas_Neue, DM_Sans, DM_Mono } from "next/font/google";
import CustomCursor from "@/components/CustomCursor";
import FluidCanvas from "@/components/FluidCanvas";
import HoverCanvas from "@/components/HoverCanvas";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    default: "akdandesigns | Clarity in Brand Design",
    template: "%s | akdandesigns",
  },
  description: "I design clarity. Stripping away the noise so your true value speaks for itself. Premium brand strategy, visual identity design, logo systems, and AI product photography.",
  keywords: ["Aswin Kumaaran", "akdandesigns", "Brand Identity Chennai", "Logo Design Chennai", "Visual Identity", "David Airey Style", "Premium Brand Strategist India", "Independent Designer Chennai", "AI Product Photography"],
  metadataBase: new URL("https://akdandesigns.in"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "akdandesigns | Clarity in Brand Design",
    description: "Stripping away the noise so your true value speaks for itself. Strategic visual systems that rise above the ordinary.",
    url: "https://akdandesigns.in",
    siteName: "akdandesigns",
    images: [
      {
        url: "/works/licet-15/display mockup.jpg",
        width: 1200,
        height: 630,
        alt: "akdandesigns Brand Design Showcase",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "akdandesigns | Clarity in Brand Design",
    description: "Stripping away the noise so your true value speaks for itself. Strategic visual systems that rise above the ordinary.",
    images: ["/works/licet-15/display mockup.jpg"],
  },
  icons: {
    icon: "/icon.svg",
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
      <body
        className={`${bebasNeue.variable} ${dmSans.variable} ${dmMono.variable} font-sans antialiased bg-bg text-text min-h-screen flex flex-col`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark" value={{ light: "light", dark: "dark" }}>
          <HoverCanvas />
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
