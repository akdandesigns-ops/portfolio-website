import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a 30-minute brand strategy session with akdandesigns. Let's build a visual identity that lasts.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
