"use client";

import { useState } from "react";

/* ===========================================
   Logo Component
=========================================== */
function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" fill="none" className={className}>
      <circle cx="20" cy="20" r="18" stroke="url(#logoGrad)" strokeWidth="2"/>
      <circle cx="20" cy="20" r="12" stroke="url(#logoGrad)" strokeWidth="2" opacity="0.7"/>
      <circle cx="20" cy="20" r="6" fill="url(#logoGrad)"/>
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="40" y2="40">
          <stop offset="0%" stopColor="#00f5d4"/>
          <stop offset="100%" stopColor="#7b2cbf"/>
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ===========================================
   Navbar
=========================================== */
function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="animate-pulse-glow">
              <Logo className="w-10 h-10" />
            </div>
            <span className="text-xl font-bold gradient-text">8D Audio</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-white/70 hover:text-accent-cyan transition-colors">Features</a>
            <a href="#how-it-works" className="text-white/70 hover:text-accent-cyan transition-colors">How It Works</a>
            <a href="#faq" className="text-white/70 hover:text-accent-cyan transition-colors">FAQ</a>
            <a href="#support" className="text-white/70 hover:text-accent-cyan transition-colors">Support</a>
            <a 
              href="#download" 
              className="px-6 py-2.5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-semibold text-bg-primary hover:opacity-90 transition-all hover:scale-105"
            >
              Install Free
            </a>
          </div>

          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden py-6 border-t border-white/5 flex flex-col gap-4">
            <a href="#features" className="text-white/70 hover:text-accent-cyan py-2" onClick={() => setMobileOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-white/70 hover:text-accent-cyan py-2" onClick={() => setMobileOpen(false)}>How It Works</a>
            <a href="#faq" className="text-white/70 hover:text-accent-cyan py-2" onClick={() => setMobileOpen(false)}>FAQ</a>
            <a href="#support" className="text-white/70 hover:text-accent-cyan py-2" onClick={() => setMobileOpen(false)}>Support</a>
            <a href="#download" className="px-6 py-3 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-semibold text-bg-primary text-center mt-2" onClick={() => setMobileOpen(false)}>
              Install Free
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

/* ===========================================
   Hero Section
=========================================== */
function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-grid pt-20">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute w-[700px] h-[700px] rounded-full border border-accent-cyan/10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate" />
        <div className="absolute w-[500px] h-[500px] rounded-full border border-accent-purple/15 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate-reverse" style={{ animationDuration: '25s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full border border-accent-pink/10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate" style={{ animationDuration: '15s' }} />
        
        <div className="absolute w-[500px] h-[500px] bg-accent-cyan/5 rounded-full blur-[150px] -top-20 -left-40" />
        <div className="absolute w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px] top-1/4 -right-60" />
        <div className="absolute w-[400px] h-[400px] bg-accent-pink/5 rounded-full blur-[150px] bottom-0 left-1/4" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-16 lg:pt-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[calc(100vh-12rem)]">
          {/* Text Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8">
              <span className="w-2 h-2 bg-accent-cyan rounded-full animate-pulse" />
              <span className="text-sm text-white/60">Chrome Extension • 100% Free</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-[1.1] mb-6">
              Transform Any Audio Into
              <span className="block gradient-text mt-2">Immersive 8D Sound</span>
            </h1>

            <p className="text-lg lg:text-xl text-white/60 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience music like never before. Our Chrome extension captures any tab audio 
              and applies real-time 3D spatial processing — sound literally rotates around your head.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a 
                href="#download" 
                className="group px-8 py-4 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-bold text-lg text-bg-primary hover:scale-105 transition-all glow-cyan flex items-center justify-center gap-2"
              >
                <span>🎧</span>
                <span>Install for Chrome — Free</span>
              </a>
              <a 
                href="#how-it-works" 
                className="px-8 py-4 rounded-full font-semibold text-lg border border-white/10 hover:border-accent-cyan/50 hover:bg-white/5 transition-all flex items-center justify-center gap-2"
              >
                <span>See How It Works</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-full max-w-md">
              {/* Glow backdrop */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 rounded-[40px] blur-3xl scale-110" />
              
              {/* Main card */}
              <div className="relative glass rounded-[32px] p-8 animate-float">
                {/* 3D Rotation Visualization */}
                <div className="relative h-52 flex items-center justify-center mb-6">
                  <div className="absolute w-44 h-44 rounded-full border-2 border-accent-cyan/30 animate-rotate" />
                  <div className="absolute w-32 h-32 rounded-full border-2 border-accent-purple/30 animate-rotate-reverse" style={{ animationDuration: '12s' }} />
                  <div className="absolute w-20 h-20 rounded-full border border-accent-pink/20 animate-rotate" style={{ animationDuration: '8s' }} />
                  
                  {/* Center head */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-3xl z-10 shadow-lg shadow-accent-cyan/30">
                    👤
                  </div>
                  
                  {/* Orbiting music note */}
                  <div className="absolute w-44 h-44 animate-rotate" style={{ animationDuration: '4s' }}>
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-7 h-7 bg-accent-cyan rounded-full glow-cyan flex items-center justify-center text-sm">
                      🎵
                    </div>
                  </div>
                </div>
                
                {/* Sound Wave */}
                <div className="flex items-center justify-center gap-1.5 h-10 mb-4">
                  {[...Array(14)].map((_, i) => (
                    <div 
                      key={i}
                      className="w-2 rounded-full bg-gradient-to-t from-accent-cyan to-accent-purple animate-wave"
                      style={{ 
                        animationDelay: `${i * 0.08}s`,
                        height: '8px'
                      }}
                    />
                  ))}
                </div>
                
                <p className="text-center text-white/40 text-sm">Real-time 3D audio processing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms Bar */}
      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="glass rounded-2xl p-6 lg:p-8">
            <p className="text-center text-white/40 text-sm mb-5">Works with all your favorite platforms</p>
            <div className="flex items-center justify-center gap-8 lg:gap-16 flex-wrap">
              {['YouTube', 'Spotify', 'SoundCloud', 'Twitch', 'Netflix'].map((platform) => (
                <span key={platform} className="text-xl lg:text-2xl font-bold text-white/50 hover:text-accent-cyan transition-colors cursor-default">
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================
   Features Section
=========================================== */
function Features() {
  const features = [
    {
      icon: "🎧",
      title: "True 3D Spatial Audio",
      description: "Using HRTF (Head-Related Transfer Function), sound genuinely moves around your head in 3D space — not just panning left to right.",
      highlight: true,
    },
    {
      icon: "⚡",
      title: "Real-Time Processing",
      description: "Audio is processed instantly with zero noticeable latency. Works seamlessly with any playing audio in your browser.",
    },
    {
      icon: "🔄",
      title: "Background Mode",
      description: "Close the popup and keep enjoying the effect. 8D audio continues until you decide to stop it.",
    },
    {
      icon: "🎛️",
      title: "Full Customization",
      description: "Adjust rotation speed, intensity, reverb, bass boost, and 3D height. Make it uniquely yours.",
    },
    {
      icon: "🎵",
      title: "4 Built-in Presets",
      description: "Subtle, Classic, Intense, and Concert modes — each carefully tuned for different experiences.",
    },
    {
      icon: "💾",
      title: "Auto-Save Settings",
      description: "Your preferences persist between sessions. Set it once, enjoy forever.",
    },
  ];

  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-accent-purple/5 rounded-full blur-[150px]" />
      <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-accent-cyan/5 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mb-16">
          <span className="text-accent-cyan font-semibold uppercase tracking-wider text-sm">Features</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Everything You Need for <span className="gradient-text">Immersive Audio</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Powerful features packed into a lightweight extension that transforms how you experience sound.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`glass rounded-3xl p-8 hover:border-accent-cyan/30 transition-all hover:-translate-y-1 ${
                feature.highlight ? 'md:col-span-2 lg:col-span-1 lg:row-span-2 flex flex-col' : ''
              }`}
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-purple/10 flex items-center justify-center text-3xl mb-6">
                {feature.icon}
              </div>
              <h3 className={`font-bold mb-3 ${feature.highlight ? 'text-2xl' : 'text-xl'}`}>
                {feature.title}
              </h3>
              <p className={`text-white/60 leading-relaxed ${feature.highlight ? 'text-lg flex-1' : ''}`}>
                {feature.description}
              </p>
              
              {feature.highlight && (
                <div className="mt-8 relative h-40 flex items-center justify-center">
                  <div className="absolute w-28 h-28 rounded-full border-2 border-accent-cyan/30 animate-rotate" />
                  <div className="absolute w-20 h-20 rounded-full border border-accent-purple/30 animate-rotate-reverse" style={{ animationDuration: '8s' }} />
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-lg">
                    👤
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===========================================
   How It Works
=========================================== */
function HowItWorks() {
  const steps = [
    { num: "01", title: "Install Extension", desc: "Add 8D Audio to Chrome from the Web Store. One click, completely free." },
    { num: "02", title: "Play Audio", desc: "Open YouTube, Spotify, or any site with audio and start playing." },
    { num: "03", title: "Activate 8D", desc: "Click the extension icon, hit the power button. Headphones on!" },
    { num: "04", title: "Enjoy & Customize", desc: "Audio rotates around you. Tweak settings or use presets." },
  ];

  return (
    <section id="how-it-works" className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-purple font-semibold uppercase tracking-wider text-sm">Getting Started</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            Get immersive 8D audio in seconds — no technical knowledge required.
          </p>
        </div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-16 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-pink" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full bg-bg-primary border-2 border-accent-cyan/50 flex items-center justify-center mb-6 relative z-10">
                    <span className="text-2xl font-bold gradient-text">{step.num}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/60 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================
   Technology Section
=========================================== */
function Technology() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-accent-cyan/5 to-accent-purple/5 rounded-full blur-[200px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square max-w-md mx-auto relative">
              {/* Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/20" />
              <div className="absolute inset-0 rounded-full border-2 border-accent-cyan/30 animate-rotate" style={{ animationDuration: '25s' }} />
              <div className="absolute inset-10 rounded-full border-2 border-accent-purple/20" />
              <div className="absolute inset-10 rounded-full border-2 border-accent-purple/30 animate-rotate-reverse" style={{ animationDuration: '20s' }} />
              <div className="absolute inset-20 rounded-full border-2 border-accent-pink/20" />
              <div className="absolute inset-20 rounded-full border-2 border-accent-pink/30 animate-rotate" style={{ animationDuration: '15s' }} />
              
              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-4xl shadow-xl shadow-accent-cyan/30">
                  👤
                </div>
              </div>
              
              {/* Orbiting elements */}
              <div className="absolute inset-0 animate-rotate" style={{ animationDuration: '5s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-accent-cyan rounded-full glow-cyan flex items-center justify-center text-sm">🎵</div>
              </div>
              <div className="absolute inset-10 animate-rotate-reverse" style={{ animationDuration: '4s' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-6 bg-accent-purple rounded-full glow-purple flex items-center justify-center text-xs">🎵</div>
              </div>
              
              {/* Labels */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 glass px-3 py-1.5 rounded-full text-xs text-white/50">Sound Source</div>
              <div className="absolute top-1/2 -right-2 -translate-y-1/2 glass px-3 py-1.5 rounded-full text-xs text-white/50">HRTF</div>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <span className="text-accent-cyan font-semibold uppercase tracking-wider text-sm">Technology</span>
            <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-8">
              The Science Behind <span className="gradient-text">8D Audio</span>
            </h2>
            
            <div className="space-y-6 text-lg text-white/60 leading-relaxed">
              <p>
                Our extension uses the Web Audio API with <strong className="text-accent-cyan">HRTF (Head-Related Transfer Function)</strong> to simulate how your ears perceive sound from different directions.
              </p>
              <p>
                Unlike simple panning, HRTF creates true 3D positioning — the sound source orbits around your head with realistic height, depth, and distance cues.
              </p>
              <p>
                Combined with custom reverb and dynamic compression, you get a consistent, immersive experience regardless of the source audio.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mt-10">
              {[
                { icon: "🎯", label: "HRTF Spatial" },
                { icon: "⚡", label: "Zero Latency" },
                { icon: "🔊", label: "Custom Reverb" },
              ].map((item, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-sm text-white/50">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================
   Download CTA
=========================================== */
function Download() {
  return (
    <section id="download" className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-accent-cyan/5 via-transparent to-accent-purple/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 rounded-full blur-[200px]" />
      
      <div className="max-w-4xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="glass rounded-[40px] p-10 lg:p-16 text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center text-5xl glow-cyan">
            🎧
          </div>
          
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            Ready to <span className="gradient-text">Experience 8D?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            Install the extension now and transform how you experience audio. 
            Completely free, no account needed.
          </p>

          <a 
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full font-bold text-lg text-bg-primary hover:scale-105 transition-all glow-cyan"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.191-5.933A12.006 12.006 0 0 0 12 6.545h3.273z"/>
            </svg>
            Add to Chrome — Free
          </a>

          <div className="mt-10 flex items-center justify-center gap-8 text-white/40 text-sm flex-wrap">
            {['No account required', '100% Free forever', 'Manifest V3'].map((item, i) => (
              <span key={i} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================
   FAQ Section
=========================================== */
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { q: "What is 8D audio?", a: "8D audio creates the illusion of sound moving around your head by dynamically positioning audio in 3D space. With headphones, it feels like music is rotating around you." },
    { q: "Do I need special headphones?", a: "No! Any standard headphones or earbuds work. Over-ear headphones provide the best spatial perception, but it's not required." },
    { q: "Does it work with all websites?", a: "Yes! It works with YouTube, Spotify Web, SoundCloud, Twitch, Netflix, and any website that plays audio. Chrome internal pages (chrome://) are the only exception." },
    { q: "Will it slow down my computer?", a: "No. The extension is optimized for minimal resource usage. Audio processing uses the efficient Web Audio API with negligible performance impact." },
    { q: "Is my audio data collected?", a: "Absolutely not. All processing happens locally on your device. We don't collect, store, or transmit any audio data. Privacy first." },
    { q: "What about DRM content?", a: "Due to browser security, DRM-protected content (like Netflix originals) cannot be processed. This is a browser limitation, not ours." },
  ];

  return (
    <section id="faq" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute -left-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-purple/5 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <span className="text-accent-pink font-semibold uppercase tracking-wider text-sm">FAQ</span>
              <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
                Common <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-xl text-white/60 leading-relaxed mb-6">
                Everything you need to know about 8D Audio.
              </p>
              <a href="#support" className="inline-flex items-center gap-2 text-accent-cyan hover:underline font-medium">
                Still have questions?
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden">
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-lg pr-4">{faq.q}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openIndex === index ? 'bg-accent-cyan/20 rotate-180' : 'bg-white/5'}`}>
                    <svg className="w-5 h-5 text-accent-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40' : 'max-h-0'}`}>
                  <p className="px-6 pb-5 text-white/60 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===========================================
   Support Section
=========================================== */
function Support() {
  return (
    <section id="support" className="py-24 lg:py-32 bg-bg-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent-cyan font-semibold uppercase tracking-wider text-sm">Support</span>
          <h2 className="text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Need <span className="gradient-text">Help?</span>
          </h2>
          <p className="text-xl text-white/60 leading-relaxed">
            We&apos;re here to ensure you get the best experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-10 text-center group hover:border-accent-cyan/30 transition-all">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-cyan/20 to-accent-cyan/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
              ✉️
            </div>
            <h3 className="text-2xl font-bold mb-4">Email Support</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Questions or feedback? We&apos;d love to hear from you.
            </p>
            <a href="mailto:cheramihiretu@gmail.com" className="inline-flex items-center gap-2 text-accent-cyan hover:underline font-medium text-lg">
              cheramihiretu@gmail.com
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

          <div className="glass rounded-3xl p-10 text-center group hover:border-accent-purple/30 transition-all">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-purple/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
              🐛
            </div>
            <h3 className="text-2xl font-bold mb-4">Report a Bug</h3>
            <p className="text-white/60 mb-6 leading-relaxed">
              Found an issue? Let us know and we&apos;ll fix it ASAP.
            </p>
            <a href="mailto:cheramihiretu@gmail.com?subject=8D%20Audio%20Bug%20Report" className="inline-flex items-center gap-2 text-accent-purple hover:underline font-medium text-lg">
              Submit Report
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>
        </div>

        <p className="text-center text-white/40 mt-10 text-sm">
          Typical response time: 24-48 hours
        </p>
      </div>
    </section>
  );
}

/* ===========================================
   Footer
=========================================== */
function Footer() {
  return (
    <footer className="py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <Logo className="w-8 h-8" />
            <span className="font-semibold">8D Audio Experience</span>
          </div>

          <div className="flex items-center gap-8 text-white/50">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
            <a href="#support" className="hover:text-white transition-colors">Support</a>
          </div>

          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} 8D Audio Experience
          </p>
        </div>

        <div className="mt-10 pt-8 border-t border-white/5">
          <p className="text-center text-white/30 text-xs">
            Best experienced with headphones 🎧 • Not affiliated with YouTube, Spotify, or SoundCloud
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ===========================================
   Main Page
=========================================== */
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <Technology />
      <Download />
      <FAQ />
      <Support />
      <Footer />
    </main>
  );
}
