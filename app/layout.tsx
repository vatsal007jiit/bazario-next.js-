import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import 'animate.css';
import MainProvider from "@/components/MainProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Greenatva - Roll Ons Made From Natural Essential Oils",
    template: "%s | Greenatva",
  },
  description: "Experience the power of nature with Greenatva's essential oil roll-ons — 100% natural, chemical-free, and crafted for wellness, relaxation, and relief.",
  keywords: [
    "natural essential oil roll-ons",
    "Greenatva roll-ons",
    "aromatherapy roll-ons",
    "chemical-free wellness",
    "herbal remedies India",
    "natural pain relief",
    "organic essential oils",
    "stress relief roll-ons",
    "baby relief roll-ons",
    "baby teeth-pain relief",
  ],
  openGraph: {
    title: "Greenatva - Roll Ons Made From Natural Essential Oils",
    description:
      "Discover Greenatva's pure essential oil roll-ons — a natural path to wellness, stress relief, and rejuvenation. Made in India with love and care.",
    url: "https://greenatva.com",
    siteName: "Greenatva",
    images: [
      {
        url: "/images/review3.webp", // Replace with your actual OG image URL
        width: 1200,
        height: 630,
        alt: "Greenatva - Roll Ons Made From Natural Essential Oils",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greenatva - Roll Ons Made From Natural Essential Oils",
    description:
      "Explore Greenatva's 100% natural, chemical-free essential oil roll-ons for wellness, stress relief, and more.",
    images: ["/images/review3.webp"], // Same as OG image
    creator: "@greenatva",
  },
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainProvider>{children}</MainProvider>
      </body>
    </html>
  );
}
