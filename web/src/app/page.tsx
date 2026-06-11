// web/src/app/page.tsx

import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { emoji: '🏆', value: '24+', label: 'Hackathons Joined', color: 'pink' },
  { emoji: '🤝', value: '66+', label: 'Teammates', color: 'blue' },
  { emoji: '🥇', value: '6', label: 'Podium Finishes', color: 'green' },
  { emoji: '💰', value: '₱131K+', label: 'Prize Money Won', color: 'yellow' },
];

const roles = [
  { emoji: '💻', title: 'Developers', desc: 'Build the actual product or prototype', color: 'pink' },
  { emoji: '🎨', title: 'Designers', desc: 'UI/UX, mockups, and visual design', color: 'blue' },
  { emoji: '🔬', title: 'Researchers', desc: 'Validate problems and solutions', color: 'green' },
  { emoji: '📝', title: 'Content', desc: 'Pitch decks, scripts, documentation', color: 'yellow' },
  { emoji: '🎤', title: 'Pitchers', desc: 'Deliver the winning presentation', color: 'pink' },
  { emoji: '📋', title: 'Project Mgmt', desc: 'Keep the team on track', color: 'blue' },
];

const upcomingHackathons = [
  {
    name: 'MLH Global Hack Week',
    date: 'Feb 1-7, 2026',
    type: 'ONLINE',
    tags: ['beginner-friendly', 'global'],
  },
  {
    name: 'PH Tech Summit Hackathon',
    date: 'Mar 1-3, 2026',
    type: 'MANILA',
    tags: ['startup', 'philippines'],
  },
  {
    name: 'ETH Manila',
    date: 'Apr 10-12, 2026',
    type: 'MAKATI',
    tags: ['web3', 'blockchain'],
  },
];

export default function Home() {
  return (
    <div className="stars-bg">
      {/* Hero Section */}
      <section className="py-16 lg:py-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center">
            {/* Logo */}
            <div className="mb-8">
              <Image
                src="/parokya.png"
                alt="Parokya ni Stimmie"
                width={150}
                height={150}
                className="mx-auto floating pixelated"
              />
            </div>

            {/* Title */}
            <h1 className="pixel-font text-5xl md:text-7xl lg:text-8xl mb-4">
              <span className="neon-text-pink">PAROKYA</span>
              <br />
              <span className="text-white">ni </span>
              <span className="neon-text-blue">STIMMIE</span>
            </h1>

            <p className="pixel-font text-xl md:text-2xl text-[var(--neon-green)] mb-2">
              🇵🇭 HACKATHON POOL PHILIPPINES 🇵🇭
            </p>

            <p className="text-gray-300 max-w-2xl mx-auto mb-8 leading-relaxed">
              &quot;an event where participants learn, build, and share their creations 
              in a relaxed, welcoming atmosphere&quot;
              <br />
              <span className="text-xs text-gray-500">— Major League Hacking</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="https://discord.gg/JrwMpgQuTH" className="retro-btn text-xl">
                <span className="mr-2">💬</span> JOIN THE PAROKYA
              </a>
              <Link href="/resources" className="retro-btn retro-btn-blue text-xl">
                <span className="mr-2">📖</span> READ THE GUIDE
              </Link>
            </div>

            {/* Under construction tape */}
            <div className="construction-tape pixel-font text-black text-sm py-2 -mx-4">
              <span className="px-4">⚠️ COMMUNITY UNDER CONSTRUCTION ⚠️ JOIN US AS WE BUILD ⚠️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12">
        <div className="max-w-5xl mx-auto px-4">
          <div className="retro-border bg-[var(--dark-bg)] p-6">
            <h2 className="pixel-font text-2xl text-center mb-6 rainbow-text">
              ★ STIMMIE&apos;S HACKATHON STATS ★
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, i) => (
                <div key={i} className="text-center p-4 bg-black/50 border-2 border-[var(--neon-pink)]">
                  <div className="text-3xl mb-2">{stat.emoji}</div>
                  <div className={`pixel-font text-3xl md:text-4xl neon-text-${stat.color}`}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What is this? */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="retro-border-blue bg-[var(--dark-bg)] p-8">
            <h2 className="pixel-font text-3xl md:text-4xl neon-text-blue mb-6 text-center">
              &lt;WHAT IS A HACKATHON?&gt;
            </h2>
            <div className="space-y-4 text-gray-300">
              <p className="text-lg">
                <span className="text-[var(--neon-pink)]">&gt;</span> Basically, it&apos;s an <strong className="text-[var(--neon-yellow)]">invention marathon</strong>. &quot;Permissionless innovation&quot;.
              </p>
              <p>
                <span className="text-[var(--neon-pink)]">&gt;</span> The software part is deliberately not part of the definition because hackathons are 
                <strong className="text-[var(--neon-green)]"> NOT </strong> 
                merely for CS/IT students!
              </p>
              <p>
                <span className="text-[var(--neon-pink)]">&gt;</span> Psychology, Engineering, Business, Arts, Medical fields — everyone can contribute!
              </p>
              <div className="mt-6 p-4 bg-black/30 border-l-4 border-[var(--neon-green)]">
                <p className="pixel-font text-[var(--neon-green)]">
                  &quot;Hacking is creative problem solving. A hackathon is any event where people 
                  come together to solve problems.&quot;
                </p>
                <p className="text-xs text-gray-500 mt-2">— Joshua Tauberer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Roles Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="pixel-font text-3xl md:text-4xl text-center mb-8">
            <span className="neon-text-pink">HACKATHON</span>{' '}
            <span className="neon-text-green">ROLES</span>
          </h2>
          <p className="text-center text-gray-400 mb-8">
            Great teams are built on diverse strengths. Here are the hats you can wear:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {roles.map((role, i) => (
              <div 
                key={i} 
                className={`retro-border${role.color === 'pink' ? '' : role.color === 'blue' ? '-blue' : '-green'} bg-[var(--dark-bg)] p-4 card-hover cursor-pointer`}
              >
                <div className="text-4xl mb-2">{role.emoji}</div>
                <h3 className={`pixel-font text-xl neon-text-${role.color}`}>{role.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{role.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center mt-6 text-sm text-gray-500 pixel-font">
            ★ ONE DEVELOPER WILL SUFFICE. HACKATHONS ARE AN EXERCISE IN PROBLEM-SOLVING ★
          </p>
        </div>
      </section>

      {/* Upcoming Hackathons */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="pixel-font text-3xl neon-text-yellow">
              📅 UPCOMING HACKATHONS
            </h2>
            <Link href="/hackathons" className="pixel-font text-[var(--neon-blue)] hover:underline">
              [VIEW ALL →]
            </Link>
          </div>
          
          <div className="space-y-4">
            {upcomingHackathons.map((hack, i) => (
              <div 
                key={i}
                className="retro-border-green bg-[var(--dark-bg)] p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 card-hover"
              >
                <div>
                  <h3 className="pixel-font text-xl text-white">{hack.name}</h3>
                  <p className="text-sm text-gray-400">{hack.date}</p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`badge ${hack.type === 'ONLINE' ? 'badge-blue' : 'badge-green'}`}>
                    {hack.type === 'ONLINE' ? '🌐' : '📍'} {hack.type}
                  </span>
                  {hack.tags.map((tag, j) => (
                    <span key={j} className="text-xs px-2 py-1 bg-black/50 text-gray-400 border border-gray-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="pixel-font text-3xl md:text-4xl text-center neon-text-purple mb-12">
            ★ HOW TO GET STARTED ★
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="retro-border bg-[var(--dark-bg)] p-6 text-center">
              <div className="pixel-font text-6xl neon-text-pink mb-4">01</div>
              <h3 className="pixel-font text-xl text-white mb-2">JOIN THE PAROKYA</h3>
              <p className="text-sm text-gray-400">Click the Discord button and become part of the community. Introduce yourself!</p>
            </div>
            <div className="retro-border-blue bg-[var(--dark-bg)] p-6 text-center">
              <div className="pixel-font text-6xl neon-text-blue mb-4">02</div>
              <h3 className="pixel-font text-xl text-white mb-2">FIND YOUR TEAM</h3>
              <p className="text-sm text-gray-400">Use /lookingforteam to register your skills. Browse teammates with /findteammates</p>
            </div>
            <div className="retro-border-green bg-[var(--dark-bg)] p-6 text-center">
              <div className="pixel-font text-6xl neon-text-green mb-4">03</div>
              <h3 className="pixel-font text-xl text-white mb-2">WIN HACKATHONS</h3>
              <p className="text-sm text-gray-400">Join hackathons, build projects, learn tons, and maybe win some prizes! 🏆</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="gif-border bg-[var(--dark-bg)] p-8 md:p-12 text-center">
            <h2 className="pixel-font text-3xl md:text-4xl mb-4">
              <span className="rainbow-text">READY TO HACK?</span>
            </h2>
            <p className="text-gray-300 mb-8 max-w-xl mx-auto">
              Join hundreds of Filipino students who are building amazing projects, 
              making friends, and winning competitions together!
            </p>
            <a href="https://discord.gg/JrwMpgQuTH" className="retro-btn text-xl inline-block">
              🚀 JOIN PAROKYA NI STIMMIE
            </a>
            <p className="mt-6 text-xs text-gray-500 pixel-font">
              <span className="blink">●</span> FREE TO JOIN <span className="blink">●</span> BEGINNER FRIENDLY <span className="blink">●</span>
            </p>
          </div>
        </div>
      </section>

      {/* Guestbook teaser */}
      <section className="py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="win95-box inline-block px-6 py-4">
            <p className="text-black pixel-font">
              📝 Sign my guestbook! (coming soon)
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

