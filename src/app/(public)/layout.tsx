import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/public/Navbar";
import SimpleFooter from "@/components/public/Footer";

export const metadata: Metadata = {
  title: "Snapvault",
  description: "Created By Nishant Chaudhary",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
