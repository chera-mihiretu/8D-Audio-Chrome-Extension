import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | 8D Audio",
  description:
    "Privacy Policy for 8D Audio Chrome Extension. Learn how we handle your data and protect your privacy.",
};

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

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0a0e17] circuit-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Logo size={36} />
            <span className="font-[family-name:var(--font-orbitron)] font-semibold text-lg">
              8D Audio
            </span>
          </Link>
          <Link
            href="/"
            className="btn-gradient px-6 py-2 rounded-full font-semibold text-black shine-effect"
          >
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6">
        {/* Background gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-[family-name:var(--font-orbitron)] text-4xl md:text-5xl font-bold mb-6 animate-fade-in-up">
            Privacy{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
              Policy
            </span>
          </h1>
          <p className="text-gray-400 text-lg animate-fade-in-up animation-delay-200">
            Last updated: January 21, 2026
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          <div className="gradient-border rounded-2xl p-8 md:p-12 space-y-10">
            {/* Introduction */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                Introduction
              </h2>
              <p className="text-gray-300 leading-relaxed">
                At 8D Audio, we are committed to protecting your privacy. This
                Privacy Policy explains how our Chrome Extension handles
                information when you use our service. We believe in
                transparency, and we want you to understand that your privacy
                is our top priority.
              </p>
            </div>

            {/* Data Collection */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                Data We Collect
              </h2>
              <div className="glass-card rounded-xl p-6 border border-cyan-500/10">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
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
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">
                      Zero Data Collection
                    </h3>
                    <p className="text-gray-400">
                      We do not collect, store, or transmit any personal data,
                      browsing history, audio content, or any other information
                      from your browser. The 8D Audio extension operates
                      entirely locally on your device.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                How the Extension Works
              </h2>
              <ul className="space-y-3">
                {[
                  "All audio processing happens locally in your browser using the Web Audio API",
                  "No audio data is ever sent to external servers",
                  "Your settings and preferences are stored locally in your browser",
                  "The extension does not track your browsing activity",
                  "No analytics or telemetry data is collected",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg
                      className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Permissions */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                Extension Permissions
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The 8D Audio extension requests the following permissions to
                function:
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  {
                    permission: "activeTab",
                    description:
                      "Required to access and process audio on the current tab only when you activate the extension",
                  },
                  {
                    permission: "storage",
                    description:
                      "Used to save your audio preferences locally in your browser (never sent to any server)",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="glass-card rounded-xl p-5 border border-purple-500/10"
                  >
                    <code className="text-purple-400 text-sm font-mono bg-purple-500/10 px-2 py-1 rounded">
                      {item.permission}
                    </code>
                    <p className="text-gray-400 text-sm mt-3">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Third Parties */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                Third-Party Services
              </h2>
              <p className="text-gray-300 leading-relaxed">
                The 8D Audio extension does not integrate with or share data
                with any third-party services, advertisers, or analytics
                providers. Your audio experience is completely private.
              </p>
            </div>

            {/* Updates */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                Updates to This Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page with an updated revision date. We
                encourage you to review this page periodically for any changes.
              </p>
            </div>

            {/* Open Source */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                Open Source
              </h2>
              <p className="text-gray-300 leading-relaxed">
                8D Audio is open source, which means you can review our code at
                any time to verify our privacy practices. Transparency is at
                the core of what we do.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
                View Source Code on GitHub
              </a>
            </div>

            {/* Contact */}
            <div className="space-y-4">
              <h2 className="font-[family-name:var(--font-orbitron)] text-2xl font-semibold text-cyan-400">
                Contact Us
              </h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or our
                practices, please feel free to contact us:
              </p>
              <div className="glass-card rounded-xl p-6 border border-cyan-500/10">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center">
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
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm">Email us at</p>
                    <a
                      href="mailto:support@8daudio.app"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      support@8daudio.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Summary Box */}
            <div className="mt-12 p-6 rounded-xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-cyan-500/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-black"
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
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    In Summary
                  </h3>
                  <p className="text-gray-300">
                    8D Audio is designed with privacy at its core. We don&apos;t
                    collect your data, we don&apos;t track you, and all audio
                    processing happens locally on your device. Your immersive
                    audio experience is yours alone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Logo size={32} />
              <span className="font-[family-name:var(--font-orbitron)] font-semibold">
                8D Audio
              </span>
            </Link>

            <div className="flex items-center gap-6 text-gray-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors text-cyan-400"
              >
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="hover:text-white transition-colors">
                Contact
              </Link>
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
            <p className="mt-2">Made with 💜 for music lovers everywhere</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

