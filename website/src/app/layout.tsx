import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "8D Audio Experience - Chrome Extension",
  description: "Transform any audio into immersive 8D sound with our free Chrome extension. Real-time 3D spatial audio processing for YouTube, Spotify, and more.",
  keywords: "8D audio, 3D sound, Chrome extension, spatial audio, HRTF, immersive audio",
};

export default function RootLayout({
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

