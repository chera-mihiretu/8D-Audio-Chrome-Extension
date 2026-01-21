"use client";

import { useState } from "react";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 animate-pulse-glow">
              <svg viewBox="0 0 40 40" fill="none">
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
            </div>
            <span className="text-xl font-bold gradient-text">8D Audio</span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors">Features</a>
            <a href="#how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors">How It Works</a>
            <a href="#faq" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors">FAQ</a>
            <a href="#support" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors">Support</a>
            <a href="#download" className="px-6 py-2.5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-full font-medium text-[var(--bg-primary)] hover:opacity-90 transition-opacity">
              Install Free
            </a>
          </div>

          <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/5 flex flex-col gap-5">
            <a href="#features" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#how-it-works" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
            <a href="#faq" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]" onClick={() => setMobileMenuOpen(false)}>FAQ</a>
            <a href="#support" className="text-[var(--text-secondary)] hover:text-[var(--accent-cyan)]" onClick={() => setMobileMenuOpen(false)}>Support</a>
            <a href="#download" className="px-6 py-3 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-full font-medium text-[var(--bg-primary)] text-center" onClick={() => setMobileMenuOpen(false)}>
              Install Free
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col relative overflow-hidden pt-32 bg-grid">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] rounded-full border border-[var(--accent-cyan)]/10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate" />
        <div className="absolute w-[800px] h-[800px] rounded-full border border-[var(--accent-purple)]/10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-rotate" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute w-[400px] h-[400px] bg-[var(--accent-cyan)]/5 rounded-full blur-[120px] top-20 -left-40" />
        <div className="absolute w-[500px] h-[500px] bg-[var(--accent-purple)]/5 rounded-full blur-[120px] top-40 -right-40" />
      </div>

      <div className="flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass mb-8">
                <span className="w-2 h-2 bg-[var(--accent-cyan)] rounded-full animate-pulse" />
                <span className="text-sm text-[var(--text-secondary)]">Chrome Extension • Free to Use</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-8 leading-[1.1]">
                Transform Any Audio Into
                <br />
                <span className="gradient-text">Immersive 8D Sound</span>
              </h1>

              <p className="text-lg sm:text-xl text-[var(--text-secondary)] mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0">
                Experience music like never before. Our Chrome extension captures any tab audio 
                and applies real-time 3D spatial processing, making sound rotate around your head.
              </p>

              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
                <a href="#download" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-full font-semibold text-lg text-[var(--bg-primary)] hover:opacity-90 transition-all hover:scale-105 glow-cyan text-center">
                  🎧 Install for Chrome — Free
                </a>
                <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 rounded-full font-semibold text-lg border border-white/10 hover:border-[var(--accent-cyan)]/50 transition-all text-center">
                  See How It Works
                </a>
              </div>
            </div>

            {/* Visualizer */}
            <div className="relative order-first lg:order-last">
              <div className="relative max-w-md mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-cyan)]/20 to-[var(--accent-purple)]/20 rounded-[40px] blur-3xl" />
                
                <div className="glass rounded-[32px] p-8 sm:p-10 animate-float relative">
                  <div className="relative h-48 sm:h-56 flex items-center justify-center mb-8">
                    <div className="absolute w-40 h-40 rounded-full border-2 border-[var(--accent-cyan)]/30 animate-rotate" />
                    <div className="absolute w-56 h-56 rounded-full border border-[var(--accent-purple)]/20 animate-rotate" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
                    
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center text-3xl z-10">
                      👤
                    </div>
                    
                    <div className="absolute w-full h-full animate-rotate" style={{ animationDuration: '4s' }}>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-[var(--accent-cyan)] rounded-full glow-cyan flex items-center justify-center text-xs">
                        🎵
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center gap-1.5 h-12">
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-2 bg-gradient-to-t from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-full"
                        style={{ animation: `wave 1s ease-in-out infinite`, animationDelay: `${i * 0.08}s`, height: '6px' }}
                      />
                    ))}
                  </div>
                  <p className="text-[var(--text-muted)] text-sm mt-4 text-center">Real-time 3D audio visualization</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platforms */}
      <div className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="glass rounded-2xl py-8 px-6">
            <p className="text-[var(--text-muted)] text-sm mb-6 text-center">Works with all your favorite platforms</p>
            <div className="flex items-center justify-center gap-8 sm:gap-16 flex-wrap">
              {['YouTube', 'Spotify', 'SoundCloud', 'Twitch'].map((platform) => (
                <span key={platform} className="text-xl sm:text-2xl font-bold text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-colors cursor-default">
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

function Features() {
  const features = [
    { icon: "🎧", title: "True 3D Spatial Audio", description: "Using HRTF (Head-Related Transfer Function), sound genuinely moves around your head in 3D space, not just left-right panning.", accent: "cyan" },
    { icon: "🔄", title: "Real-Time Processing", description: "Audio is processed instantly with no noticeable latency. Works seamlessly with any playing audio in your browser tab.", accent: "purple" },
    { icon: "⚡", title: "Background Processing", description: "Close the popup and keep enjoying the effect. The 8D audio continues running until you decide to stop it.", accent: "pink" },
    { icon: "🎛️", title: "Full Customization", description: "Adjust rotation speed, intensity, reverb, bass boost, and 3D height. Make the experience uniquely yours.", accent: "cyan" },
    { icon: "🎵", title: "4 Built-in Presets", description: "Choose from Subtle, Classic, Intense, or Concert modes. Each preset is carefully tuned for different listening experiences.", accent: "purple" },
    { icon: "💾", title: "Settings Persistence", description: "Your preferences are automatically saved. The extension remembers your favorite settings between sessions.", accent: "pink" },
  ];

  const accentColors: Record<string, string> = {
    cyan: 'var(--accent-cyan)',
    purple: 'var(--accent-purple)',
    pink: 'var(--accent-pink)',
  };

  return (
    <section id="features" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-[var(--accent-purple)]/5 rounded-full blur-[150px]" />
      <div className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-[var(--accent-cyan)]/5 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="max-w-3xl mb-20">
          <p className="text-[var(--accent-cyan)] font-medium mb-4 tracking-wide uppercase text-sm">Features</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Packed with <span className="gradient-text">Powerful Features</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            Everything you need to transform your audio experience into something extraordinary.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured card - spans 2 columns */}
          <div className="md:col-span-2 glass rounded-3xl p-8 lg:p-10 hover:border-[var(--accent-cyan)]/30 transition-all">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
              <div className="flex-1">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-4xl mb-6" style={{ background: `linear-gradient(135deg, ${accentColors[features[0].accent]}20, ${accentColors[features[0].accent]}05)` }}>
                  {features[0].icon}
                </div>
                <h3 className="text-2xl lg:text-3xl font-semibold mb-4">{features[0].title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed text-lg">{features[0].description}</p>
              </div>
              <div className="relative w-full lg:w-64 h-48 flex items-center justify-center">
                <div className="absolute w-32 h-32 rounded-full border-2 border-[var(--accent-cyan)]/30 animate-rotate" />
                <div className="absolute w-24 h-24 rounded-full border border-[var(--accent-purple)]/40 animate-rotate" style={{ animationDirection: 'reverse', animationDuration: '8s' }} />
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center text-xl">👤</div>
              </div>
            </div>
          </div>

          {/* Regular cards */}
          {features.slice(1, 4).map((feature, index) => (
            <div key={index} className="glass rounded-3xl p-8 hover:border-[var(--accent-cyan)]/30 transition-all">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5" style={{ background: `linear-gradient(135deg, ${accentColors[feature.accent]}20, ${accentColors[feature.accent]}05)` }}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
            </div>
          ))}

          {/* Last two cards */}
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6 lg:gap-8">
            {features.slice(4).map((feature, index) => (
              <div key={index} className="glass rounded-3xl p-8 hover:border-[var(--accent-cyan)]/30 transition-all">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl mb-5" style={{ background: `linear-gradient(135deg, ${accentColors[feature.accent]}20, ${accentColors[feature.accent]}05)` }}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-[var(--text-secondary)] leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { number: "01", title: "Install the Extension", description: "Add 8D Audio Experience to Chrome from the Web Store. It's completely free and takes just one click." },
    { number: "02", title: "Play Some Audio", description: "Open YouTube, Spotify, or any website with audio and start playing your favorite content." },
    { number: "03", title: "Activate 8D Mode", description: "Click the extension icon and press the power button. Make sure to put on your headphones!" },
    { number: "04", title: "Customize & Enjoy", description: "Adjust the settings to your liking or use presets. The audio now rotates around your head!" },
  ];

  return (
    <section id="how-it-works" className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-50" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <p className="text-[var(--accent-purple)] font-medium mb-4 tracking-wide uppercase text-sm">Getting Started</p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            Get started in seconds — no technical knowledge required
          </p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[60px] left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-[var(--accent-cyan)] via-[var(--accent-purple)] to-[var(--accent-pink)]" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute top-[120px] left-10 w-0.5 h-[calc(100%+48px)] bg-gradient-to-b from-[var(--accent-cyan)] to-[var(--accent-purple)] opacity-30" />
                )}
                
                <div className="flex lg:flex-col items-start lg:items-center gap-6 lg:gap-0">
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--accent-cyan)]/50 flex items-center justify-center lg:mb-8">
                      <span className="text-2xl font-bold gradient-text">{step.number}</span>
                    </div>
                  </div>
                  
                  <div className="lg:text-center">
                    <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                    <p className="text-[var(--text-secondary)] leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Technology() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-br from-[var(--accent-cyan)]/5 to-[var(--accent-purple)]/5 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="aspect-square max-w-lg mx-auto relative">
              <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-cyan)]/20" />
              <div className="absolute inset-0 rounded-full border-2 border-[var(--accent-cyan)]/30 animate-rotate" style={{ animationDuration: '20s' }} />
              
              <div className="absolute inset-12 rounded-full border-2 border-[var(--accent-purple)]/20" />
              <div className="absolute inset-12 rounded-full border-2 border-[var(--accent-purple)]/30 animate-rotate" style={{ animationDirection: 'reverse', animationDuration: '15s' }} />
              
              <div className="absolute inset-24 rounded-full border-2 border-[var(--accent-pink)]/20" />
              <div className="absolute inset-24 rounded-full border-2 border-[var(--accent-pink)]/30 animate-rotate" style={{ animationDuration: '10s' }} />
              
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center text-5xl shadow-lg shadow-[var(--accent-cyan)]/20">
                  👤
                </div>
              </div>
              
              <div className="absolute inset-0 animate-rotate" style={{ animationDuration: '6s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-[var(--accent-cyan)] rounded-full glow-cyan flex items-center justify-center">🎵</div>
              </div>
              <div className="absolute inset-12 animate-rotate" style={{ animationDuration: '4s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-[var(--accent-purple)] rounded-full glow-purple flex items-center justify-center text-sm">🎵</div>
              </div>
              
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 glass px-3 py-1 rounded-full text-xs text-[var(--text-muted)]">Sound Source</div>
              <div className="absolute top-1/2 -right-4 -translate-y-1/2 glass px-3 py-1 rounded-full text-xs text-[var(--text-muted)]">HRTF Processing</div>
            </div>
          </div>
          
          {/* Content */}
          <div className="order-1 lg:order-2">
            <p className="text-[var(--accent-cyan)] font-medium mb-4 tracking-wide uppercase text-sm">Technology</p>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8 leading-tight">
              The Science Behind <span className="gradient-text">8D Audio</span>
            </h2>
            
            <div className="space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed">
              <p>
                Our extension uses the Web Audio API with <strong className="text-[var(--accent-cyan)]">HRTF (Head-Related Transfer Function)</strong> to create 
                realistic 3D spatial audio.
              </p>
              <p>
                The sound source orbits around your head in true 3D space — not just panning left to right, 
                but with realistic height and depth positioning.
              </p>
              <p>
                Combined with our custom reverb algorithm and dynamic compressor, you get a 
                consistent, immersive experience that works with any audio content.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-3 gap-6 mt-10">
              {[
                { icon: "🎯", label: "HRTF Spatial" },
                { icon: "⚡", label: "Zero Latency" },
                { icon: "🔊", label: "Custom Reverb" },
              ].map((item, index) => (
                <div key={index} className="glass rounded-2xl p-5 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-sm text-[var(--text-muted)]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Download() {
  return (
    <section id="download" className="py-32 relative overflow-hidden bg-[var(--bg-secondary)]">
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-cyan)]/5 via-transparent to-[var(--accent-purple)]/5" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-[var(--accent-cyan)]/10 to-[var(--accent-purple)]/10 rounded-full blur-[150px]" />
      
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <div className="absolute top-20 left-10 text-6xl animate-float opacity-50">🎧</div>
        <div className="absolute top-40 right-20 text-4xl animate-float opacity-30" style={{ animationDelay: '1s' }}>🎵</div>
        <div className="absolute bottom-20 left-20 text-5xl animate-float opacity-40" style={{ animationDelay: '2s' }}>🎶</div>
        
        <div className="glass rounded-[40px] p-10 sm:p-16 lg:p-20">
          <div className="w-24 h-24 mx-auto mb-10 rounded-full bg-gradient-to-br from-[var(--accent-cyan)] to-[var(--accent-purple)] flex items-center justify-center text-5xl glow-cyan">
            🎧
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to <span className="gradient-text">Experience 8D?</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] mb-12 max-w-2xl mx-auto leading-relaxed">
            Install the extension now and transform your audio experience. 
            It&apos;s completely free with no hidden costs or account required.
          </p>

          <a 
            href="https://chrome.google.com/webstore"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-[var(--accent-cyan)] to-[var(--accent-purple)] rounded-full font-semibold text-lg text-[var(--bg-primary)] hover:opacity-90 transition-all hover:scale-105 glow-cyan"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.191-5.933A12.006 12.006 0 0 0 12 6.545h3.273z"/>
            </svg>
            Add to Chrome — Free
          </a>

          <div className="mt-12 flex items-center justify-center gap-6 sm:gap-10 text-[var(--text-muted)] text-sm flex-wrap">
            {['No account required', '100% Free forever', 'Manifest V3'].map((item, index) => (
              <span key={index} className="flex items-center gap-2">
                <svg className="w-5 h-5 text-[var(--accent-cyan)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    { question: "What is 8D audio?", answer: "8D audio creates the illusion of sound moving around your head by dynamically positioning audio in 3D space. When using headphones, it feels like the music is rotating around you, creating an immersive listening experience." },
    { question: "Do I need special headphones?", answer: "No special equipment needed! Any standard headphones or earbuds will work. However, for the best experience, we recommend using over-ear headphones as they provide better spatial perception." },
    { question: "Does it work with all websites?", answer: "Yes! The extension works with any website that plays audio — YouTube, Spotify Web, SoundCloud, Twitch, Netflix, and more. The only exception is Chrome's internal pages (chrome://) which cannot be captured for security reasons." },
    { question: "Will it affect my computer's performance?", answer: "The extension is optimized for minimal resource usage. Audio processing happens efficiently using the Web Audio API, and you shouldn't notice any significant impact on your computer's performance." },
    { question: "Is my audio data being collected?", answer: "Absolutely not. All audio processing happens locally on your device. We don't collect, store, or transmit any of your audio data. Your privacy is fully protected." },
    { question: "Can I use it with DRM-protected content?", answer: "Due to browser security restrictions, DRM-protected content (like Netflix originals) cannot be captured. This is a browser limitation, not a limitation of our extension." },
  ];

  return (
    <section id="faq" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/2 -left-64 w-[500px] h-[500px] bg-[var(--accent-purple)]/5 rounded-full blur-[150px]" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 lg:gap-24">
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-32">
              <p className="text-[var(--accent-pink)] font-medium mb-4 tracking-wide uppercase text-sm">FAQ</p>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
                Frequently Asked <span className="gradient-text">Questions</span>
              </h2>
              <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-8">
                Everything you need to know about 8D Audio. Can&apos;t find what you&apos;re looking for?
              </p>
              <a href="#support" className="inline-flex items-center gap-2 text-[var(--accent-cyan)] hover:underline font-medium">
                Contact us
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="glass rounded-2xl overflow-hidden transition-all">
                <button
                  className="w-full px-6 sm:px-8 py-6 flex items-center justify-between text-left"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-semibold text-lg pr-4">{faq.question}</span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${openIndex === index ? 'bg-[var(--accent-cyan)]/20' : 'bg-white/5'}`}>
                    <svg className={`w-5 h-5 text-[var(--accent-cyan)] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-48' : 'max-h-0'}`}>
                  <div className="px-6 sm:px-8 pb-6">
                    <p className="text-[var(--text-secondary)] leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Support() {
  const cards = [
    { icon: "✉️", title: "Email Support", description: "Have questions or feedback? We'd love to hear from you.", link: "mailto:cheramihiretu@gmail.com", linkText: "cheramihiretu@gmail.com", accent: "cyan" },
    { icon: "🐛", title: "Report an Issue", description: "Found a bug? Let us know and we'll fix it as soon as possible.", link: "mailto:cheramihiretu@gmail.com?subject=8D%20Audio%20Bug%20Report", linkText: "Submit Bug Report", accent: "purple" },
  ];

  return (
    <section id="support" className="py-32 bg-[var(--bg-secondary)] relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-30" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-[var(--accent-cyan)] font-medium mb-4 tracking-wide uppercase text-sm">Support</p>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
            Need <span className="gradient-text">Help?</span>
          </h2>
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
            We&apos;re here to help you get the best experience possible
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div key={index} className={`glass rounded-3xl p-10 text-center hover:border-[var(--accent-${card.accent})]/30 transition-all group`}>
              <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--accent-${card.accent})]/20 to-[var(--accent-${card.accent})]/5 flex items-center justify-center text-4xl group-hover:scale-110 transition-transform`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold mb-4">{card.title}</h3>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">{card.description}</p>
              <a href={card.link} className={`inline-flex items-center gap-2 text-[var(--accent-${card.accent})] hover:underline font-medium text-lg`}>
                {card.linkText}
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          ))}
        </div>

        <p className="text-center text-[var(--text-muted)] mt-12 text-sm">
          We typically respond within 24-48 hours
        </p>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid md:grid-cols-3 gap-10 items-center">
          <div className="flex items-center gap-3 justify-center md:justify-start">
            <div className="w-10 h-10">
              <svg viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="18" stroke="url(#footerGrad)" strokeWidth="2"/>
                <circle cx="20" cy="20" r="12" stroke="url(#footerGrad)" strokeWidth="2" opacity="0.7"/>
                <circle cx="20" cy="20" r="6" fill="url(#footerGrad)"/>
                <defs>
                  <linearGradient id="footerGrad" x1="0" y1="0" x2="40" y2="40">
                    <stop offset="0%" stopColor="#00f5d4"/>
                    <stop offset="100%" stopColor="#7b2cbf"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <span className="font-semibold text-lg">8D Audio Experience</span>
          </div>

          <div className="flex items-center justify-center gap-8 text-[var(--text-muted)]">
            <a href="#features" className="hover:text-[var(--text-primary)] transition-colors">Features</a>
            <a href="#faq" className="hover:text-[var(--text-primary)] transition-colors">FAQ</a>
            <a href="#support" className="hover:text-[var(--text-primary)] transition-colors">Support</a>
          </div>

          <p className="text-sm text-[var(--text-muted)] text-center md:text-right">
            © {new Date().getFullYear()} 8D Audio Experience
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5">
          <p className="text-center text-[var(--text-muted)] text-xs">
            Best experienced with headphones 🎧 • Not affiliated with YouTube, Spotify, or SoundCloud
          </p>
        </div>
      </div>
    </footer>
  );
}

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
