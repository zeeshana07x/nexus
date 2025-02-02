// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Work_Sans } from "next/font/google";
import "./globals.css";

// Load Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Load Work Sans font
const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // Specify the weights you need
});

// Update metadata
export const metadata: Metadata = {
  title: "Nexus - Discover Amazing Products",
  description:
    "Shop the latest trends with unbeatable prices. Explore our collection of modern furniture and home decor.",
  keywords: ["furniture", "home decor", "modern chairs", "sofas", "ecommerce"],
  authors: [{ name: "Zeeshan Ali", url: "getnexus.vercel.com" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}