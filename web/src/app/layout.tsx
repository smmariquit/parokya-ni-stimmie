// web/src/app/layout.tsx

import type { Metadata } from 'next';
import './globals.css';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Parokya ni Stimmie - Hackathon Pool PH 🇵🇭',
  description: 'A community for Filipino students to find hackathon teammates, discover opportunities, and get mentorship. Created by Stimmie.',
  keywords: ['hackathon', 'philippines', 'team', 'coding', 'students', 'stimmie', 'parokya'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen scanlines">
        {/* Top marquee banner */}
        <div className="bg-black border-b-4 border-[var(--neon-pink)] py-2">
          <div className="marquee">
            <span className="marquee-content pixel-font text-xl">
              <span className="text-[var(--neon-pink)]">★</span> WELCOME TO PAROKYA NI STIMMIE <span className="text-[var(--neon-blue)]">★</span> JOIN THE HACKATHON COMMUNITY <span className="text-[var(--neon-green)]">★</span> FIND YOUR TEAM <span className="text-[var(--neon-yellow)]">★</span> WIN COMPETITIONS <span className="text-[var(--neon-purple)]">★</span> LEVEL UP YOUR SKILLS <span className="text-[var(--neon-pink)]">★</span> 24 HACKATHONS & COUNTING <span className="text-[var(--neon-blue)]">★</span>
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-[var(--dark-bg)] border-b-4 border-[var(--neon-blue)] sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="relative w-12 h-12">
                  <Image 
                    src="/parokya.png" 
                    alt="Parokya ni Stimmie"
                    width={48}
                    height={48}
                    className="pixelated floating"
                  />
                </div>
                <div>
                  <span className="pixel-font text-2xl neon-text-pink group-hover:neon-text-blue transition-colors">
                    PAROKYA
                  </span>
                  <span className="block text-xs text-[var(--neon-green)]">ni Stimmie</span>
                </div>
              </Link>

              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-6">
                <Link href="/" className="pixel-font text-lg text-white hover:neon-text-pink transition-colors">
                  [HOME]
                </Link>
                <Link href="/hackathons" className="pixel-font text-lg text-white hover:neon-text-blue transition-colors">
                  [HACKATHONS]
                </Link>
                <Link href="/resources" className="pixel-font text-lg text-white hover:neon-text-green transition-colors">
                  [GUIDE]
                </Link>
                <a
                  href="https://discord.gg/JrwMpgQuTH"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="retro-btn text-sm"
                >
                  JOIN DISCORD
                </a>
              </div>

              {/* Mobile menu */}
              <div className="md:hidden">
                <a href="https://discord.gg/JrwMpgQuTH" className="retro-btn text-xs">
                  JOIN
                </a>
              </div>
            </div>
          </div>
        </nav>

        <main>{children}</main>

        {/* Footer */}
        <footer className="bg-[var(--darker-bg)] border-t-4 border-[var(--neon-purple)] mt-20">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* About */}
              <div className="retro-border bg-[var(--dark-bg)] p-6">
                <h3 className="pixel-font text-2xl neon-text-pink mb-4">PAROKYA NI STIMMIE</h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  A hackathon community for Filipino students. Find teammates, discover opportunities, 
                  and level up together! 🇵🇭
                </p>
                <div className="mt-4">
                  <span className="text-xs text-gray-500">Created with 💜 by Stimmie</span>
                </div>
              </div>

              {/* Links */}
              <div className="retro-border-blue bg-[var(--dark-bg)] p-6">
                <h3 className="pixel-font text-2xl neon-text-blue mb-4">QUICK LINKS</h3>
                <ul className="space-y-2 pixel-font text-lg">
                  <li><Link href="/hackathons" className="hover:text-[var(--neon-pink)]">→ Hackathons</Link></li>
                  <li><Link href="/resources" className="hover:text-[var(--neon-pink)]">→ The Guide</Link></li>
                  <li><a href="https://stimmie.dev" target="_blank" className="hover:text-[var(--neon-pink)]">→ Stimmie&apos;s Site</a></li>
                  <li><a href="https://discord.gg/JrwMpgQuTH" className="hover:text-[var(--neon-pink)]">→ Discord</a></li>
                </ul>
              </div>

              {/* Visitor Counter */}
              <div className="retro-border-green bg-[var(--dark-bg)] p-6">
                <h3 className="pixel-font text-2xl neon-text-green mb-4">SITE STATS</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <div className="visitor-counter text-xl">001337</div>
                      <span className="text-xs text-gray-500">visitors</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🏆</span>
                    <div>
                      <div className="pixel-font text-xl text-[var(--neon-yellow)]">24+</div>
                      <span className="text-xs text-gray-500">hackathons joined</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🤝</span>
                    <div>
                      <div className="pixel-font text-xl text-[var(--neon-orange)]">66+</div>
                      <span className="text-xs text-gray-500">teammates</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 pt-8 border-t-2 border-dashed border-gray-700 text-center">
              <p className="pixel-font text-sm text-gray-500">
                <span className="blink">●</span> BEST VIEWED IN ANY BROWSER <span className="blink">●</span>
              </p>
              <p className="text-xs text-gray-600 mt-2">
                © 2026 Parokya ni Stimmie | Made in the Philippines 🇵🇭
              </p>
              <div className="mt-4 flex justify-center gap-4">
                <span className="badge badge-pink">HTML</span>
                <span className="badge badge-blue">CSS</span>
                <span className="badge badge-green">JS</span>
                <span className="badge badge-yellow">COOL</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

