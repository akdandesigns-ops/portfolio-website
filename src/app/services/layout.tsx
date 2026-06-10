import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore the premium brand design services offered by akdandesigns, from logo design to complete visual identity systems.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
