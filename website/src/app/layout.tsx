import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "8D Audio Experience | Transform Any Audio Into Immersive 3D Sound",
  description: "A Chrome extension that transforms any audio playing in your browser into an immersive 8D experience with rotating spatial sound. Works with YouTube, Spotify, SoundCloud & more.",
  keywords: ["8D audio", "spatial audio", "Chrome extension", "3D sound", "HRTF", "immersive audio"],
  authors: [{ name: "8D Audio Team" }],
  openGraph: {
    title: "8D Audio Experience",
    description: "Transform any browser audio into immersive 8D spatial sound",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
