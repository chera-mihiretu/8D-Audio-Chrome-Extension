import type { Metadata } from "next";
import { Orbitron, Exo_2 } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const exo2 = Exo_2({
  variable: "--font-exo2",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "8D Audio | Immersive Spatial Audio Chrome Extension",
  description:
    "Transform any audio into an immersive 8D experience. Real-time spatial audio processing for YouTube, Spotify, SoundCloud and more.",
  keywords: [
    "8D audio",
    "spatial audio",
    "chrome extension",
    "immersive sound",
    "3D audio",
    "surround sound",
  ],
  authors: [{ name: "8D Audio Team" }],
  openGraph: {
    title: "8D Audio | Immerse Your Senses",
    description:
      "Experience true spatial audio with our Chrome Extension. Works with your favorite platforms.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${exo2.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
