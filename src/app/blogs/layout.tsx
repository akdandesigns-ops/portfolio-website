import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal",
  description: "Read thoughts and insights on design, branding, and clarity from akdandesigns.",
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
