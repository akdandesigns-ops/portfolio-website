import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Works",
  description: "View the portfolio of akdandesigns. Strategic visual systems and brand identities that rise above the ordinary.",
};

export default function WorksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
