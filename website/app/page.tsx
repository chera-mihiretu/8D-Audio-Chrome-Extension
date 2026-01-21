"use client";

import { useState } from "react";

// Logo Component
const Logo = ({ size = 48 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="24"
      cy="24"
      r="22"
      stroke="url(#logoGradient)"
      strokeWidth="2"
    />
    <circle
      cx="24"
      cy="24"
      r="16"
      stroke="url(#logoGradient)"
      strokeWidth="2"
    />
    <circle cx="24" cy="24" r="6" fill="url(#logoGradient)" />
    <circle
      cx="24"
      cy="24"
      r="11"
      stroke="url(#logoGradient)"
      strokeWidth="2"
      strokeDasharray="4 4"
      className="rotate-wave"
      style={{ transformOrigin: "center" }}
    />
    <defs>
      <linearGradient
        id="logoGradient"
        x1="0"
        y1="0"
        x2="48"
        y2="48"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#00f0ff" />
        <stop offset="1" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
  </svg>
);

// Headphones SVG Component
const HeadphonesIllustration = () => (
  <div className="relative w-full max-w-md mx-auto">
    {/* Outer glow rings */}
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-80 h-80 rounded-full border border-cyan-500/20 orbit-ring" />
    </div>
    <div className="absolute inset-0 flex items-center justify-center">
      <div
        className="w-96 h-96 rounded-full border border-purple-500/10 orbit-ring"
        style={{ animationDuration: "6s", animationDirection: "reverse" }}
      />
    </div>

    {/* Particles */}
    {[...Array(12)].map((_, i) => (
      <div
        key={i}
        className="absolute w-2 h-2 rounded-full particle"
        style={{
          background: i % 2 === 0 ? "#00f0ff" : "#8b5cf6",
          left: `${20 + Math.random() * 60}%`,
          top: `${20 + Math.random() * 60}%`,
          animationDelay: `${i * 0.3}s`,
          opacity: 0.6,
        }}
      />
    ))}

    {/* Main headphones SVG */}
    <svg
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="relative z-10 headphones-glow float"
    >
      {/* Audio wave behind headphones */}
      <path
        d="M50 200 Q100 180 150 200 T250 200 T350 200"
        stroke="url(#waveGradient)"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M30 200 Q80 220 130 200 T230 200 T330 200 T370 200"
        stroke="url(#waveGradient2)"
        strokeWidth="1.5"
        fill="none"
        opacity="0.3"
      />

      {/* Headband */}
      <path
        d="M100 180 Q200 60 300 180"
        stroke="url(#headphonesGradient)"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M100 180 Q200 70 300 180"
        stroke="#0a0e17"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left ear cup */}
      <ellipse
        cx="100"
        cy="220"
        rx="45"
        ry="55"
        fill="url(#cupGradient)"
        stroke="url(#headphonesGradient)"
        strokeWidth="3"
      />
      <ellipse cx="100" cy="220" rx="30" ry="40" fill="#0a0e17" opacity="0.8" />
      <ellipse
        cx="100"
        cy="220"
        rx="20"
        ry="28"
        stroke="url(#headphonesGradient)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />

      {/* Right ear cup */}
      <ellipse
        cx="300"
        cy="220"
        rx="45"
        ry="55"
        fill="url(#cupGradient)"
        stroke="url(#headphonesGradient)"
        strokeWidth="3"
      />
      <ellipse cx="300" cy="220" rx="30" ry="40" fill="#0a0e17" opacity="0.8" />
      <ellipse
        cx="300"
        cy="220"
        rx="20"
        ry="28"
        stroke="url(#headphonesGradient)"
        strokeWidth="1"
        fill="none"
        opacity="0.5"
      />

      {/* Glow effects */}
      <circle cx="100" cy="220" r="60" fill="url(#glowGradient)" opacity="0.3" />
      <circle cx="300" cy="220" r="60" fill="url(#glowGradient)" opacity="0.3" />

      {/* Sound waves emanating */}
      <g opacity="0.6">
        <path
          d="M50 200 Q40 220 50 240"
          stroke="#00f0ff"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M35 190 Q20 220 35 250"
          stroke="#00f0ff"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M350 200 Q360 220 350 240"
          stroke="#8b5cf6"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M365 190 Q380 220 365 250"
          stroke="#8b5cf6"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      <defs>
        <linearGradient
          id="headphonesGradient"
          x1="100"
          y1="100"
          x2="300"
          y2="300"
        >
          <stop stopColor="#00f0ff" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id="cupGradient" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#1a2035" />
          <stop offset="1" stopColor="#0d1220" />
        </linearGradient>
        <radialGradient id="glowGradient">
          <stop stopColor="#00f0ff" stopOpacity="0.4" />
          <stop offset="1" stopColor="#00f0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="waveGradient" x1="0" y1="0" x2="400" y2="0">
          <stop stopColor="#00f0ff" />
          <stop offset="0.5" stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#c026d3" />
        </linearGradient>
        <linearGradient id="waveGradient2" x1="0" y1="0" x2="400" y2="0">
          <stop stopColor="#8b5cf6" />
          <stop offset="1" stopColor="#00f0ff" />
        </linearGradient>
      </defs>
    </svg>

    {/* Chrome logo */}
    <div className="absolute bottom-20 right-10 z-20">
      <svg width="40" height="40" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="#fff" />
        <path
          d="M24 14a10 10 0 0 1 8.66 5H44a20 20 0 0 0-40 0h11.34A10 10 0 0 1 24 14z"
          fill="#EA4335"
        />
        <path
          d="M33.66 19A10 10 0 0 1 24 34a10 10 0 0 1-8.66-5L4 24a20 20 0 0 0 20 20 20 20 0 0 0 17.32-10z"
          fill="#34A853"
        />
        <path
          d="M15.34 29A10 10 0 0 1 14 24a10 10 0 0 1 1.34-5L4 24a20 20 0 0 0 0 0l11.34 5z"
          fill="#FBBC05"
        />
        <path
          d="M24 14a10 10 0 0 1 9.66 5L44 24a20 20 0 0 0-20-20v10z"
          fill="#EA4335"
        />
        <path d="M24 14v10a10 10 0 0 1 0 0z" fill="#4285F4" />
        <circle cx="24" cy="24" r="8" fill="#4285F4" />
        <circle cx="24" cy="24" r="4" fill="#fff" />
      </svg>
    </div>
  </div>
);

// Circuit Pattern Component
const CircuitPattern = ({ position }: { position: "left" | "right" }) => (
  <svg
    className={`absolute ${position === "left" ? "left-0 top-20" : "right-0 top-20"} w-48 h-96 opacity-30`}
    viewBox="0 0 200 400"
    fill="none"
  >
    <g stroke="#00f0ff" strokeWidth="1">
      {/* Horizontal lines */}
      <path d={position === "left" ? "M0 50 H100" : "M100 50 H200"} />
      <path d={position === "left" ? "M0 150 H80" : "M120 150 H200"} />
      <path d={position === "left" ? "M0 250 H60" : "M140 250 H200"} />
      <path d={position === "left" ? "M0 350 H90" : "M110 350 H200"} />

      {/* Vertical connections */}
      <path
        d={position === "left" ? "M100 50 V100 H70 V150" : "M100 50 V100 H130 V150"}
      />
      <path
        d={position === "left" ? "M80 150 V200 H50 V250" : "M120 150 V200 H150 V250"}
      />
      <path
        d={position === "left" ? "M60 250 V300 H80 V350" : "M140 250 V300 H120 V350"}
      />

      {/* Circuit nodes */}
      <circle
        cx={position === "left" ? 100 : 100}
        cy="50"
        r="4"
        fill="#00f0ff"
      />
      <circle
        cx={position === "left" ? 80 : 120}
        cy="150"
        r="4"
        fill="#8b5cf6"
      />
      <circle
        cx={position === "left" ? 60 : 140}
        cy="250"
        r="4"
        fill="#00f0ff"
      />
      <circle
        cx={position === "left" ? 90 : 110}
        cy="350"
        r="4"
        fill="#8b5cf6"
      />

      {/* Additional decorative elements */}
      <rect
        x={position === "left" ? 20 : 160}
        y="80"
        width="20"
        height="10"
        rx="2"
        stroke="#00f0ff"
        fill="none"
      />
      <rect
        x={position === "left" ? 30 : 150}
        y="180"
        width="15"
        height="8"
        rx="2"
        stroke="#8b5cf6"
        fill="none"
      />
    </g>
  </svg>
);

// Sound Wave Visualizer Component
const SoundWave = () => (
  <div className="flex items-end justify-center gap-1 h-8">
    {[...Array(8)].map((_, i) => (
      <div
        key={i}
        className="w-1 bg-gradient-to-t from-cyan-500 to-purple-500 rounded-full sound-bar"
        style={{ height: "10px" }}
      />
    ))}
  </div>
);

// Feature Card Component
const FeatureCard = ({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) => (
  <div
    className="feature-card gradient-border p-6 opacity-0 animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="feature-icon w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center mb-4 text-cyan-400">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-orbitron)]">
      {title}
    </h3>
    <p className="text-gray-400 leading-relaxed">{description}</p>
  </div>
);

// Platform Logo Component
const PlatformLogo = ({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) => (
  <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105">
    <div className="w-12 h-12 flex items-center justify-center">{children}</div>
    <span className="text-sm text-gray-400">{name}</span>
  </div>
);

// Extension Preview Component
const ExtensionPreview = () => {
  const [isActive, setIsActive] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(0.8);
  const [intensity, setIntensity] = useState(95);
  const [reverb, setReverb] = useState(55);
  const [bassBoost, setBassBoost] = useState(10);

  return (
    <div className="w-full max-w-xs mx-auto">
      <div className="gradient-border rounded-2xl overflow-hidden">
        <div className="bg-[#0d1220] p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <Logo size={36} />
            <div>
              <h4 className="font-semibold font-[family-name:var(--font-orbitron)] text-sm">
                8D Audio
              </h4>
              <p className="text-xs text-gray-500 tracking-widest">
                IMMERSIVE EXPERIENCE
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="glass-card rounded-xl p-4 mb-6">
            <SoundWave />
            <p
              className={`text-center mt-2 font-medium ${isActive ? "text-cyan-400" : "text-gray-400"}`}
            >
              {isActive ? "Active" : "Ready"}
            </p>
            <p className="text-center text-xs text-gray-500">
              {isActive ? "8D audio is enabled" : "Click to activate 8D audio"}
            </p>
          </div>

          {/* Power Button */}
          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`relative w-20 h-20 rounded-full border-2 transition-all duration-500 ${
                isActive
                  ? "border-cyan-400 bg-cyan-400/10"
                  : "border-gray-600 bg-gray-800/50"
              }`}
            >
              {isActive && (
                <>
                  <div className="absolute inset-0 rounded-full border-2 border-cyan-400 ring-pulse" />
                  <div
                    className="absolute inset-0 rounded-full border-2 border-cyan-400 ring-pulse"
                    style={{ animationDelay: "0.5s" }}
                  />
                </>
              )}
              <svg
                className={`w-8 h-8 mx-auto transition-colors duration-300 ${isActive ? "text-cyan-400" : "text-gray-500"}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M18.364 5.636a9 9 0 010 12.728M5.636 5.636a9 9 0 000 12.728"
                />
              </svg>
            </button>
          </div>

          {/* Sliders */}
          <div className="space-y-4">
            {[
              {
                label: "Rotation Speed",
                value: rotationSpeed,
                setValue: setRotationSpeed,
                max: 2,
                suffix: "x",
              },
              {
                label: "Intensity",
                value: intensity,
                setValue: setIntensity,
                max: 100,
                suffix: "%",
              },
              {
                label: "Reverb",
                value: reverb,
                setValue: setReverb,
                max: 100,
                suffix: "%",
              },
              {
                label: "Bass Boost",
                value: bassBoost,
                setValue: setBassBoost,
                max: 100,
                suffix: "%",
              },
            ].map((slider) => (
              <div key={slider.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">{slider.label}</span>
                  <span className="text-cyan-400">
                    {slider.max === 2
                      ? slider.value.toFixed(1)
                      : Math.round(slider.value)}
                    {slider.suffix}
                  </span>
                </div>
                <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-full transition-all duration-200"
                    style={{
                      width: `${(slider.value / slider.max) * 100}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={0}
                    max={slider.max}
                    step={slider.max === 2 ? 0.1 : 1}
                    value={slider.value}
                    onChange={(e) =>
                      slider.setValue(parseFloat(e.target.value))
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Page Component
export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0e17] circuit-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-[family-name:var(--font-orbitron)] font-semibold text-lg">
              8D Audio
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="text-gray-400 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#platforms"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Platforms
            </a>
          </div>
          <a
            href="#download"
            className="btn-gradient px-6 py-2 rounded-full font-semibold text-black shine-effect"
          >
            Get Extension
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <CircuitPattern position="left" />
        <CircuitPattern position="right" />

        {/* Background gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center lg:text-left">
            <div className="flex items-center gap-3 justify-center lg:justify-start mb-6 opacity-0 animate-fade-in-up">
              <Logo size={56} />
              <div>
                <h1 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold">
                  8D Audio
                </h1>
                <p className="text-cyan-400 tracking-[0.3em] text-sm">
                  IMMERSE YOUR SENSES
                </p>
              </div>
            </div>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 mb-4 opacity-0 animate-fade-in-up animation-delay-200">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-sm text-gray-300">Chrome Extension • Free & Open Source</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 opacity-0 animate-fade-in-up animation-delay-400 font-[family-name:var(--font-orbitron)] leading-tight">
              Experience{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
                True Spatial
              </span>{" "}
              Audio
            </h2>

            <p className="text-gray-300 text-lg mb-4 max-w-xl opacity-0 animate-fade-in-up animation-delay-600">
              Transform any sound playing in your browser into an immersive 8D audio experience in real time.
            </p>

            <p className="text-gray-400 text-base mb-6 max-w-xl opacity-0 animate-fade-in-up animation-delay-600">
              Using advanced Web Audio API technology, 8D Audio captures the audio output of any website and applies dynamic stereo panning—making the sound feel like it&apos;s rotating around your head when using headphones. No downloads, no modifications to original files.
            </p>

            {/* Key highlights */}
            <div className="grid grid-cols-2 gap-3 mb-8 max-w-lg opacity-0 animate-fade-in-up animation-delay-600">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Real-time processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Works on any website</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>360° audio rotation</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Zero latency</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Customizable effects</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <svg className="w-5 h-5 text-cyan-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>100% privacy safe</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start opacity-0 animate-fade-in-up animation-delay-600">
              <a
                href="#download"
                className="btn-gradient px-8 py-4 rounded-full font-semibold text-black text-lg shine-effect flex items-center justify-center gap-2"
              >
                <svg width="24" height="24" viewBox="0 0 48 48">
                  <circle cx="24" cy="24" r="20" fill="#fff" />
                  <path
                    d="M24 8a16 16 0 0 1 13.86 8H10.14A16 16 0 0 1 24 8z"
                    fill="#EA4335"
                  />
                  <path
                    d="M37.86 16A16 16 0 0 1 24 40 16 16 0 0 1 10.14 16"
                    fill="#34A853"
                  />
                  <path d="M10.14 16A16 16 0 0 0 24 40V24z" fill="#FBBC05" />
                  <path d="M24 8v16l13.86-8A16 16 0 0 0 24 8z" fill="#EA4335" />
                  <circle cx="24" cy="24" r="8" fill="#4285F4" />
                  <circle cx="24" cy="24" r="4" fill="#fff" />
                </svg>
                GET IT NOW
              </a>
              <a
                href="#how-it-works"
                className="px-8 py-4 rounded-full font-semibold border border-white/20 hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
                See How It Works
              </a>
            </div>

            {/* Platform icons */}
            <div className="mt-8 opacity-0 animate-fade-in-up animation-delay-600">
              <p className="text-gray-500 text-sm mb-3">Works seamlessly with</p>
              <div className="flex items-center gap-4 justify-center lg:justify-start flex-wrap">
                <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span className="text-xs">YouTube</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
                  </svg>
                  <span className="text-xs">Spotify</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.19-1.308-.19-1.334c-.01-.057-.044-.092-.089-.092zm1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.044.12-.104l.24-2.474-.24-2.547c0-.06-.059-.104-.12-.104zm.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.225-2.559-.225-2.625c-.016-.075-.075-.135-.166-.135zm1.065.202c-.09 0-.166.075-.18.165l-.176 2.459.191 2.52c.014.09.09.166.18.166s.166-.075.18-.166l.21-2.52-.21-2.459c-.014-.09-.09-.165-.195-.165zm1.155-.329c-.105 0-.195.09-.21.195l-.162 2.611.177 2.489c.015.105.09.194.195.194.104 0 .194-.089.21-.194l.194-2.504-.209-2.611c-.015-.105-.105-.18-.195-.18zm1.23-.225c-.12 0-.224.104-.225.225l-.149 2.645.149 2.459c.016.12.105.225.225.225.12 0 .225-.105.225-.225l.165-2.459-.15-2.66c0-.12-.105-.21-.24-.21zm1.275-.195c-.135 0-.24.12-.255.24l-.135 2.655.15 2.43c.015.135.12.24.255.24.135 0 .24-.105.255-.24l.165-2.43-.165-2.655c-.015-.12-.12-.24-.27-.24zm1.29-.12c-.15 0-.27.12-.27.27l-.12 2.595.135 2.385c.015.15.12.27.27.27s.27-.12.285-.27l.15-2.385-.15-2.595c-.015-.15-.135-.27-.3-.27zm1.365-.015c-.165 0-.3.135-.315.3l-.105 2.43.12 2.355c.015.165.135.3.3.3.165 0 .3-.135.315-.3l.135-2.355-.135-2.43c-.015-.165-.15-.3-.315-.3zm4.155 1.065c-.21-.645-.615-1.185-1.155-1.545-.48-.315-1.05-.494-1.65-.494-.375 0-.75.075-1.095.21-.165.06-.255.135-.27.345v4.77c.015.21.165.39.375.405h3.72c.9 0 1.62-.735 1.62-1.635 0-.48-.225-.96-.545-1.26zm-5.73-1.155c-.18 0-.33.15-.33.33l-.105 2.22.105 2.325c.015.18.15.33.33.33.18 0 .33-.15.33-.33l.135-2.325-.135-2.22c0-.18-.15-.33-.33-.33zm-1.29.165c-.195 0-.345.15-.36.345l-.105 2.04.105 2.295c.015.195.165.345.36.345.195 0 .345-.15.36-.345l.12-2.31-.12-2.025c-.015-.195-.165-.345-.36-.345z" />
                  </svg>
                  <span className="text-xs">SoundCloud</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
                  </svg>
                  <span className="text-xs">Twitch</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <span className="text-xs">Any site</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right content - Headphones illustration */}
          <div className="relative">
            <HeadphonesIllustration />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <span className="text-gray-500 text-sm">Scroll to explore</span>
          <svg
            className="w-6 h-6 text-cyan-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold mb-4">
              Powerful{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Features
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Transform your audio experience with cutting-edge spatial audio
              technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              delay={0}
              icon={
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              }
              title="Real-Time Processing"
              description="Instantly transform any audio playing in your browser into immersive 8D sound without any delay or quality loss."
            />

            <FeatureCard
              delay={100}
              icon={
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              }
              title="360° Audio Rotation"
              description="Experience sound that dynamically moves around your head, creating an immersive surround sound effect."
            />

            <FeatureCard
              delay={200}
              icon={
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              }
              title="Customizable Controls"
              description="Fine-tune rotation speed, intensity, reverb, and bass boost to create your perfect listening experience."
            />

            <FeatureCard
              delay={300}
              icon={
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              }
              title="Universal Compatibility"
              description="Works seamlessly with any website that plays audio - YouTube, Spotify, SoundCloud, Netflix, and more."
            />

            <FeatureCard
              delay={400}
              icon={
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              title="Lightweight & Fast"
              description="Minimal CPU usage ensures smooth performance without affecting your browsing or streaming experience."
            />

            <FeatureCard
              delay={500}
              icon={
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              }
              title="Privacy Focused"
              description="All audio processing happens locally in your browser. No data is ever sent to external servers."
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-[#0d1220]/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold mb-4">
              How It{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Works
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Simple setup, powerful results. Get started in seconds.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Steps */}
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Install the Extension",
                  description:
                    "Click 'Get Extension' to add 8D Audio to your Chrome browser from the Chrome Web Store.",
                },
                {
                  step: 2,
                  title: "Open Any Audio Source",
                  description:
                    "Navigate to YouTube, Spotify, SoundCloud, or any website with audio content.",
                },
                {
                  step: 3,
                  title: "Activate 8D Audio",
                  description:
                    "Click the extension icon and press the power button to enable immersive spatial audio.",
                },
                {
                  step: 4,
                  title: "Customize Your Experience",
                  description:
                    "Adjust rotation speed, intensity, reverb, and bass boost to your preference.",
                },
              ].map((item, index) => (
                <div key={item.step} className="flex gap-6 items-start">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center font-[family-name:var(--font-orbitron)] font-bold text-lg text-black">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <div className="hidden lg:block absolute ml-6 mt-14 w-0.5 h-8 bg-gradient-to-b from-cyan-500/50 to-transparent" />
                  )}
                </div>
              ))}
            </div>

            {/* Extension Preview */}
            <ExtensionPreview />
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section id="platforms" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl font-bold mb-4">
              Works With Your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                Favorite Platforms
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Compatible with all major streaming services and any website with
              audio
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <PlatformLogo name="YouTube">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#FF0000">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </PlatformLogo>

            <PlatformLogo name="Spotify">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#1DB954">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
              </svg>
            </PlatformLogo>

            <PlatformLogo name="SoundCloud">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#FF5500">
                <path d="M1.175 12.225c-.051 0-.094.046-.101.1l-.233 2.154.233 2.105c.007.058.05.098.101.098.05 0 .09-.04.099-.098l.255-2.105-.27-2.154c-.009-.06-.052-.1-.084-.1zm-.899.828c-.06 0-.091.037-.104.094L0 14.479l.165 1.308c.014.057.045.094.09.094s.089-.037.099-.094l.19-1.308-.19-1.334c-.01-.057-.044-.092-.089-.092zm1.83-1.229c-.061 0-.12.045-.12.104l-.21 2.563.225 2.458c0 .06.045.104.106.104.061 0 .12-.044.12-.104l.24-2.474-.24-2.547c0-.06-.059-.104-.12-.104zm.945-.089c-.075 0-.135.06-.15.135l-.193 2.64.21 2.544c.016.077.075.138.149.138.075 0 .135-.061.15-.138l.225-2.559-.225-2.625c-.016-.075-.075-.135-.166-.135zm1.065.202c-.09 0-.166.075-.18.165l-.176 2.459.191 2.52c.014.09.09.166.18.166s.166-.075.18-.166l.21-2.52-.21-2.459c-.014-.09-.09-.165-.195-.165zm1.155-.329c-.105 0-.195.09-.21.195l-.162 2.611.177 2.489c.015.105.09.194.195.194.104 0 .194-.089.21-.194l.194-2.504-.209-2.611c-.015-.105-.105-.18-.195-.18zm1.23-.225c-.12 0-.224.104-.225.225l-.149 2.645.149 2.459c.016.12.105.225.225.225.12 0 .225-.105.225-.225l.165-2.459-.15-2.66c0-.12-.105-.21-.24-.21zm1.275-.195c-.135 0-.24.12-.255.24l-.135 2.655.15 2.43c.015.135.12.24.255.24.135 0 .24-.105.255-.24l.165-2.43-.165-2.655c-.015-.12-.12-.24-.27-.24zm1.29-.12c-.15 0-.27.12-.27.27l-.12 2.595.135 2.385c.015.15.12.27.27.27s.27-.12.285-.27l.15-2.385-.15-2.595c-.015-.15-.135-.27-.3-.27zm1.365-.015c-.165 0-.3.135-.315.3l-.105 2.43.12 2.355c.015.165.135.3.3.3.165 0 .3-.135.315-.3l.135-2.355-.135-2.43c-.015-.165-.15-.3-.315-.3zm4.155 1.065c-.21-.645-.615-1.185-1.155-1.545-.48-.315-1.05-.494-1.65-.494-.375 0-.75.075-1.095.21-.165.06-.255.135-.27.345v4.77c.015.21.165.39.375.405h3.72c.9 0 1.62-.735 1.62-1.635 0-.48-.225-.96-.545-1.26zm-5.73-1.155c-.18 0-.33.15-.33.33l-.105 2.22.105 2.325c.015.18.15.33.33.33.18 0 .33-.15.33-.33l.135-2.325-.135-2.22c0-.18-.15-.33-.33-.33zm-1.29.165c-.195 0-.345.15-.36.345l-.105 2.04.105 2.295c.015.195.165.345.36.345.195 0 .345-.15.36-.345l.12-2.31-.12-2.025c-.015-.195-.165-.345-.36-.345z" />
              </svg>
            </PlatformLogo>

            <PlatformLogo name="Netflix">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#E50914">
                <path d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.951c-.043-7.86-.004-15.913.002-22.95zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z" />
              </svg>
            </PlatformLogo>

            <PlatformLogo name="Twitch">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#9146FF">
                <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z" />
              </svg>
            </PlatformLogo>

            <PlatformLogo name="Apple Music">
              <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#FA2D48">
                <path d="M23.994 6.124a9.23 9.23 0 00-.24-2.19c-.317-1.31-1.062-2.31-2.18-3.043a5.022 5.022 0 00-1.877-.726 10.496 10.496 0 00-1.564-.15c-.04-.003-.083-.01-.124-.013H5.986c-.152.01-.303.017-.455.026-.747.043-1.49.123-2.193.4-1.336.53-2.3 1.452-2.865 2.78-.192.448-.292.925-.363 1.408-.056.392-.088.785-.1 1.18 0 .032-.007.062-.01.093v12.223c.01.14.017.283.027.424.05.815.154 1.624.497 2.373.65 1.42 1.738 2.353 3.234 2.801.42.127.856.187 1.293.228.555.053 1.11.06 1.667.06h11.03a12.5 12.5 0 001.57-.1c.822-.106 1.596-.35 2.295-.81a5.046 5.046 0 001.88-2.207c.186-.42.293-.87.37-1.324.113-.675.138-1.358.137-2.04-.002-3.8 0-7.595-.003-11.393zm-6.423 3.99v5.712c0 .417-.058.827-.244 1.206-.29.59-.76.962-1.388 1.14-.35.1-.706.157-1.07.173-.95.042-1.785-.384-2.17-1.243-.396-.89-.149-1.97.672-2.532.26-.178.555-.3.867-.37.328-.073.66-.122.99-.183l1.09-.18c.19-.036.374-.096.53-.22.15-.117.214-.27.216-.472V8.166a.486.486 0 00-.096-.312c-.088-.105-.21-.15-.36-.14-.16.012-.32.033-.478.058l-4.66.776c-.02.003-.04.01-.06.018-.158.05-.244.15-.264.305-.014.1-.02.202-.02.303-.002 2.593-.002 5.186-.003 7.78 0 .47-.063.932-.283 1.355-.318.613-.807.99-1.462 1.165-.348.094-.697.152-1.05.17-.877.04-1.66-.3-2.057-1.058-.516-.988-.244-2.118.718-2.763.263-.175.56-.28.87-.355.328-.07.66-.12.992-.18l.847-.146c.31-.055.584-.162.79-.42.095-.114.142-.25.145-.402V3.18c0-.154.028-.294.12-.423.09-.127.213-.198.37-.24l.6-.13c1.38-.29 2.76-.575 4.14-.866.51-.107 1.02-.212 1.528-.32.027-.005.056-.008.082-.012.252-.035.473.11.526.326.016.065.02.132.02.198v8.2h.01z" />
              </svg>
            </PlatformLogo>

            <PlatformLogo name="Any Website">
              <svg
                className="w-10 h-10"
                fill="none"
                stroke="#00f0ff"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
            </PlatformLogo>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        id="download"
        className="py-24 px-6 relative overflow-hidden"
      >
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold mb-6">
            Ready to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Immerse
            </span>{" "}
            Yourself?
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Transform your audio experience today. Install the 8D Audio Chrome
            Extension and discover a new dimension of sound.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://chrome.google.com/webstore"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gradient px-10 py-5 rounded-full font-bold text-black text-xl shine-effect flex items-center justify-center gap-3 pulse-glow"
            >
              <svg width="28" height="28" viewBox="0 0 48 48">
                <circle cx="24" cy="24" r="20" fill="#fff" />
                <path
                  d="M24 8a16 16 0 0 1 13.86 8H10.14A16 16 0 0 1 24 8z"
                  fill="#EA4335"
                />
                <path
                  d="M37.86 16A16 16 0 0 1 24 40 16 16 0 0 1 10.14 16"
                  fill="#34A853"
                />
                <path d="M10.14 16A16 16 0 0 0 24 40V24z" fill="#FBBC05" />
                <path d="M24 8v16l13.86-8A16 16 0 0 0 24 8z" fill="#EA4335" />
                <circle cx="24" cy="24" r="8" fill="#4285F4" />
                <circle cx="24" cy="24" r="4" fill="#fff" />
              </svg>
              Add to Chrome — It&apos;s Free
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-6">
            ⭐ 4.9/5 rating • 50,000+ users • Free forever
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <Logo size={32} />
              <span className="font-[family-name:var(--font-orbitron)] font-semibold">
                8D Audio
              </span>
            </div>

            <div className="flex items-center gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
            <p>© 2026 8D Audio. All rights reserved.</p>
            <p className="mt-2">
              Made with 💜 for music lovers everywhere
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
