import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about akdandesigns and the philosophy behind clarity in premium brand strategy and visual identity design.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
