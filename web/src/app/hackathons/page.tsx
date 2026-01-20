import Link from 'next/link';

const hackathons = [
  {
    name: 'MLH Global Hack Week',
    description: 'A week-long celebration of building, learning, and connecting with the global hacker community!',
    organizer: 'Major League Hacking',
    website: 'https://hackweek.mlh.io',
    startDate: 'Feb 1, 2026',
    endDate: 'Feb 7, 2026',
    deadline: 'Jan 30, 2026',
    type: 'ONLINE',
    teamSize: '1-4',
    prizes: '$500 + swag',
    tags: ['beginner-friendly', 'global', 'all-themes'],
    featured: true,
    daysLeft: 10,
  },
  {
    name: 'DevPost AI Hackathon',
    description: 'Build innovative AI-powered solutions to solve real-world problems.',
    organizer: 'Devpost',
    website: 'https://devpost.com',
    startDate: 'Feb 15, 2026',
    endDate: 'Feb 17, 2026',
    deadline: 'Feb 14, 2026',
    type: 'ONLINE',
    teamSize: '1-5',
    prizes: '$10,000 grand prize',
    tags: ['ai', 'machine-learning'],
    featured: true,
    daysLeft: 24,
  },
  {
    name: 'PH Tech Summit Hackathon',
    description: 'The biggest in-person hackathon in the Philippines! Build for local communities.',
    organizer: 'PH Tech Community',
    website: 'https://phtechsummit.com',
    startDate: 'Mar 1, 2026',
    endDate: 'Mar 3, 2026',
    deadline: 'Feb 20, 2026',
    type: 'MANILA',
    teamSize: '2-4',
    prizes: '₱100,000 + incubation',
    tags: ['philippines', 'startup', 'social-good'],
    featured: true,
    daysLeft: 30,
  },
  {
    name: 'Google Solution Challenge',
    description: 'Build solutions using Google technologies to address UN SDGs.',
    organizer: 'Google',
    website: 'https://developers.google.com/community/gdsc-solution-challenge',
    startDate: 'Mar 15, 2026',
    endDate: 'Mar 31, 2026',
    deadline: 'Mar 1, 2026',
    type: 'ONLINE',
    teamSize: '1-4',
    prizes: 'Trip to Google HQ',
    tags: ['google', 'social-good', 'students'],
    featured: false,
    daysLeft: 39,
  },
  {
    name: 'ETH Manila Hackathon',
    description: 'Build decentralized applications on Ethereum. Web3 builders welcome!',
    organizer: 'ETH Manila',
    website: 'https://ethmanila.com',
    startDate: 'Apr 10, 2026',
    endDate: 'Apr 12, 2026',
    deadline: 'Apr 1, 2026',
    type: 'MAKATI',
    teamSize: '1-5',
    prizes: '$20,000 in bounties',
    tags: ['web3', 'blockchain', 'ethereum'],
    featured: false,
    daysLeft: 70,
  },
  {
    name: 'AWS GameDay',
    description: 'Gamified learning where you solve challenges using AWS.',
    organizer: 'Amazon Web Services',
    website: 'https://aws.amazon.com',
    startDate: 'Apr 20, 2026',
    endDate: 'Apr 20, 2026',
    type: 'ONLINE',
    teamSize: '1-4',
    prizes: 'AWS credits + swag',
    tags: ['cloud', 'aws', 'beginner-friendly'],
    featured: false,
    daysLeft: 89,
  },
];

const typeColors: Record<string, string> = {
  'ONLINE': 'neon-box-blue',
  'MANILA': 'neon-box-pink',
  'MAKATI': 'neon-box-green',
};

export default function HackathonsPage() {
  const featured = hackathons.filter(h => h.featured);
  const upcoming = hackathons.filter(h => !h.featured);

  return (
    <div className="stars-bg min-h-screen">
      {/* Header */}
      <section className="py-12 border-b-4 border-[var(--neon-pink)]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="pixel-font text-5xl md:text-7xl text-center mb-4 rainbow-text">
            📅 HACKATHON CALENDAR 📅
          </h1>
          <p className="text-center text-[var(--neon-blue)] text-lg max-w-2xl mx-auto">
            &gt;&gt;&gt; Find your next hackathon adventure! All times in PHT &lt;&lt;&lt;
          </p>
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <button className="retro-btn text-sm">✨ ALL</button>
            <button className="retro-btn-outline text-sm">🌐 ONLINE</button>
            <button className="retro-btn-outline text-sm">📍 IN-PERSON</button>
            <button className="retro-btn-outline text-sm">🇵🇭 PHILIPPINES</button>
            <button className="retro-btn-outline text-sm">🌱 BEGINNER</button>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Featured Section */}
        <section className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="blink text-3xl">⭐</div>
            <h2 className="pixel-font text-4xl text-[var(--neon-yellow)]">FEATURED HACKATHONS</h2>
            <div className="blink text-3xl">⭐</div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {featured.map((h, i) => (
              <div key={i} className="retro-border bg-[var(--dark-bg)] p-0 overflow-hidden hover:scale-105 transition-transform">
                <div className="bg-gradient-to-r from-[var(--neon-pink)] to-[var(--neon-purple)] p-2 flex justify-between items-center">
                  <span className="pixel-font text-black font-bold">⭐ FEATURED</span>
                  <span className={`pixel-font text-xs px-2 py-1 ${h.type === 'ONLINE' ? 'bg-[var(--neon-blue)]' : 'bg-[var(--neon-green)]'} text-black`}>
                    {h.type === 'ONLINE' ? '🌐' : '📍'} {h.type}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="pixel-font text-2xl text-[var(--neon-pink)] mb-2">{h.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{h.description}</p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <span>📅</span>
                      <span className="text-[var(--neon-blue)]">{h.startDate} - {h.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>👥</span>
                      <span className="text-[var(--neon-green)]">Team: {h.teamSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🏆</span>
                      <span className="text-[var(--neon-yellow)]">{h.prizes}</span>
                    </div>
                    {h.deadline && (
                      <div className="flex items-center gap-2">
                        <span>⏰</span>
                        <span className="text-[var(--neon-orange)]">
                          Deadline: {h.deadline}
                          {h.daysLeft && h.daysLeft <= 14 && (
                            <span className="ml-2 blink text-[var(--neon-pink)]">({h.daysLeft}d left!)</span>
                          )}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-4">
                    {h.tags.map((tag, j) => (
                      <span key={j} className="text-xs px-2 py-1 bg-[var(--darker-bg)] border border-[var(--neon-purple)] text-[var(--neon-purple)]">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <a href={h.website} target="_blank" rel="noopener noreferrer" className="retro-btn text-xs flex-1 text-center">
                      🔗 WEBSITE
                    </a>
                    <button className="retro-btn-outline text-xs flex-1">
                      👥 FIND TEAM
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* All Hackathons Table */}
        <section>
          <h2 className="pixel-font text-4xl text-[var(--neon-blue)] mb-8">📋 ALL UPCOMING</h2>
          
          <div className="retro-border bg-[var(--dark-bg)] overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-[var(--neon-blue)] text-black pixel-font">
                  <th className="p-3 text-left">HACKATHON</th>
                  <th className="p-3 text-left hidden md:table-cell">DATES</th>
                  <th className="p-3 text-left hidden lg:table-cell">TYPE</th>
                  <th className="p-3 text-left hidden lg:table-cell">PRIZES</th>
                  <th className="p-3 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody>
                {upcoming.map((h, i) => (
                  <tr key={i} className="border-t-2 border-[var(--neon-purple)] hover:bg-[var(--darker-bg)]">
                    <td className="p-3">
                      <div className="pixel-font text-[var(--neon-pink)]">{h.name}</div>
                      <div className="text-xs text-gray-500">{h.organizer}</div>
                      <div className="text-xs text-[var(--neon-blue)] md:hidden">{h.startDate}</div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <span className="text-[var(--neon-green)]">{h.startDate}</span>
                      <div className="text-xs text-gray-500">to {h.endDate}</div>
                    </td>
                    <td className="p-3 hidden lg:table-cell">
                      <span className={`pixel-font text-xs px-2 py-1 ${h.type === 'ONLINE' ? 'bg-[var(--neon-blue)]' : 'bg-[var(--neon-green)]'} text-black`}>
                        {h.type}
                      </span>
                    </td>
                    <td className="p-3 hidden lg:table-cell text-[var(--neon-yellow)]">{h.prizes}</td>
                    <td className="p-3 text-right">
                      <a href={h.website} target="_blank" rel="noopener noreferrer" className="text-[var(--neon-pink)] hover:underline pixel-font text-sm">
                        VIEW →
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Submit CTA */}
        <section className="mt-16 text-center">
          <div className="retro-border bg-[var(--dark-bg)] p-8 max-w-2xl mx-auto">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="pixel-font text-3xl text-[var(--neon-yellow)] mb-4">
              KNOW A HACKATHON WE MISSED?
            </h3>
            <p className="text-gray-400 mb-6">
              Help the community by submitting hackathons to our calendar!
            </p>
            <a
              href="https://discord.gg/JrwMpgQuTH"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn inline-block"
            >
              📝 SUBMIT ON DISCORD
            </a>
          </div>
        </section>

        {/* Decorative Elements */}
        <div className="mt-16 text-center">
          <div className="marquee-container overflow-hidden">
            <div className="marquee-content pixel-font text-[var(--neon-green)]">
              🏆 HACK THE PLANET 🏆 BUILD SOMETHING COOL 🏆 WIN PRIZES 🏆 MAKE FRIENDS 🏆 HACK THE PLANET 🏆 BUILD SOMETHING COOL 🏆 WIN PRIZES 🏆 MAKE FRIENDS 🏆
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

