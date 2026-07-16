// web/src/app/resources/page.tsx

import Link from 'next/link';

const guides = [
  {
    icon: '🌱',
    title: 'FIRST HACKATHON GUIDE',
    description: 'Everything you need to know before your first hackathon!',
    topics: ['What is a hackathon?', 'What to bring', 'Time management', 'Pitching basics'],
    color: 'pink',
  },
  {
    icon: '👥',
    title: 'TEAM FORMATION',
    description: 'Build the perfect team with complementary skills.',
    topics: ['Key roles needed', 'Finding teammates', 'Communication tips', 'Handling conflicts'],
    color: 'blue',
  },
  {
    icon: '💡',
    title: 'PROJECT IDEATION',
    description: 'Brainstorm winning ideas that judges will love.',
    topics: ['Understanding themes', 'Problem validation', 'Scoping your MVP', 'Demo-ready builds'],
    color: 'green',
  },
  {
    icon: '🎤',
    title: 'PITCHING TO WIN',
    description: 'Deliver presentations that make judges say WOW.',
    topics: ['Pitch structure', 'Storytelling', 'Demo tips', 'Q&A handling'],
    color: 'yellow',
  },
];

const roles = [
  { emoji: '💻', name: 'Developers', desc: 'Build the actual product or prototype' },
  { emoji: '🎨', name: 'Designers', desc: 'UI/UX, mockups, and visual design' },
  { emoji: '🔬', name: 'Researchers', desc: 'Validate problems and solutions' },
  { emoji: '📝', name: 'Content Writers', desc: 'Pitch decks, scripts, docs' },
  { emoji: '🎤', name: 'Pitchers', desc: 'Deliver the winning presentation' },
  { emoji: '📋', name: 'Project Managers', desc: 'Keep the team on track' },
];

const tools = [
  { name: 'Figma', desc: 'Design & prototype', icon: '🎨', url: 'https://figma.com' },
  { name: 'Vercel', desc: 'Free web hosting', icon: '▲', url: 'https://vercel.com' },
  { name: 'Supabase', desc: 'Free database', icon: '⚡', url: 'https://supabase.com' },
  { name: 'Railway', desc: 'Backend hosting', icon: '🚂', url: 'https://railway.app' },
  { name: 'GitHub', desc: 'Code collab', icon: '🐙', url: 'https://github.com' },
  { name: 'Canva', desc: 'Presentations', icon: '🖼️', url: 'https://canva.com' },
  { name: 'Notion', desc: 'Planning', icon: '📝', url: 'https://notion.so' },
  { name: 'Loom', desc: 'Demo videos', icon: '📹', url: 'https://loom.com' },
];

const faqs = [
  {
    q: 'Do I need experience to join hackathons?',
    a: 'Nope! Many hackathons are beginner-friendly. Everyone starts somewhere. Look for hackathons with "beginner-friendly" tags!',
  },
  {
    q: 'Can I participate alone?',
    a: 'Most allow solo, but teams are recommended. You\'ll learn more, build better, and have more fun! Use our Discord to find teammates.',
  },
  {
    q: 'What if I can\'t code?',
    a: 'Teams need more than coders! Designers, researchers, pitchers, and project managers are all valuable. Find your role!',
  },
  {
    q: 'How do I prepare?',
    a: 'Research the theme, set up your dev environment, prepare boilerplate code, get good sleep, and most importantly - HAVE FUN!',
  },
  {
    q: 'What should I bring to in-person hackathons?',
    a: 'Laptop + charger, phone charger, headphones, comfy clothes, snacks, water bottle, and any hardware you need.',
  },
  {
    q: 'How do I make my project stand out?',
    a: 'Solve a REAL problem, have a WORKING demo (not just slides), tell a compelling STORY, and PRACTICE your pitch!',
  },
];

const phases = [
  { name: 'Pre-Hackathon', emoji: '📋', tasks: ['Read rules & criteria', 'Form your team', 'Research the theme', 'Set up tools'] },
  { name: 'Day 1: Ideation', emoji: '💡', tasks: ['Brainstorm ideas', 'Validate problem', 'Scope your MVP', 'Assign roles'] },
  { name: 'Day 2: Building', emoji: '🔨', tasks: ['Build core features', 'Create designs', 'Test frequently', 'Document progress'] },
  { name: 'Day 3: Polish', emoji: '✨', tasks: ['Bug fixes', 'Prepare demo', 'Create pitch deck', 'Practice presentation'] },
];

export default function ResourcesPage() {
  return (
    <div className="stars-bg min-h-screen">
      {/* Header */}
      <section className="py-12 border-b-4 border-[var(--neon-pink)]">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="pixel-font text-5xl md:text-7xl text-center mb-4 rainbow-text">
            📚 HACKATHON KIT 📚
          </h1>
          <p className="text-center text-[var(--neon-blue)] text-lg max-w-2xl mx-auto">
            &gt;&gt;&gt; Based on Stimmie&apos;s experiences from 24+ hackathons &lt;&lt;&lt;
          </p>
          <div className="flex justify-center mt-6">
            <a 
              href="https://docs.google.com/document/d/1cJya3Zb2ck9vkxIKc1LQjJomQS_LFtBOABlzHrb7Z5s/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn retro-btn-green text-lg"
            >
              📄 VIEW LIVE GOOGLE DOCS VERSION
            </a>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12">
        
        {/* What is a Hackathon */}
        <section className="mb-16">
          <div className="retro-border bg-[var(--dark-bg)] p-6">
            <h2 className="pixel-font text-3xl text-[var(--neon-pink)] mb-4 flex items-center gap-3">
              <span className="blink">❓</span> WHAT IS A HACKATHON?
            </h2>
            <p className="text-lg mb-4">
              A <span className="text-[var(--neon-yellow)]">hackathon</span> is a time-limited event (usually 24-72 hours) 
              where teams come together to build innovative solutions to real-world problems.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-[var(--darker-bg)] p-4 border-2 border-[var(--neon-blue)]">
                <div className="text-2xl mb-2">⏱️</div>
                <div className="pixel-font text-[var(--neon-blue)]">TIME-BOXED</div>
                <div className="text-sm text-gray-400">Build fast, learn faster</div>
              </div>
              <div className="bg-[var(--darker-bg)] p-4 border-2 border-[var(--neon-green)]">
                <div className="text-2xl mb-2">👥</div>
                <div className="pixel-font text-[var(--neon-green)]">TEAM-BASED</div>
                <div className="text-sm text-gray-400">Collaborate & learn</div>
              </div>
              <div className="bg-[var(--darker-bg)] p-4 border-2 border-[var(--neon-pink)]">
                <div className="text-2xl mb-2">🏆</div>
                <div className="pixel-font text-[var(--neon-pink)]">COMPETITIVE</div>
                <div className="text-sm text-gray-400">Win prizes & recognition</div>
              </div>
            </div>
          </div>
        </section>

        {/* Hackathon Phases */}
        <section className="mb-16">
          <h2 className="pixel-font text-4xl text-[var(--neon-green)] mb-8 flex items-center gap-3">
            <span>📅</span> HACKATHON PHASES
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {phases.map((phase, i) => (
              <div key={i} className="retro-border bg-[var(--dark-bg)] p-4">
                <div className="text-3xl mb-2">{phase.emoji}</div>
                <h3 className="pixel-font text-[var(--neon-yellow)] text-lg mb-3">{phase.name}</h3>
                <ul className="space-y-1">
                  {phase.tasks.map((task, j) => (
                    <li key={j} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-[var(--neon-pink)]">►</span> {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Team Roles */}
        <section className="mb-16">
          <h2 className="pixel-font text-4xl text-[var(--neon-blue)] mb-8 flex items-center gap-3">
            <span>👥</span> TEAM ROLES
          </h2>
          <p className="text-gray-400 mb-6">
            You don&apos;t need to code to join hackathons! Here are the key roles every team needs:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {roles.map((role, i) => (
              <div key={i} className="retro-border bg-[var(--dark-bg)] p-4 card-hover">
                <div className="text-3xl mb-2">{role.emoji}</div>
                <h3 className="pixel-font text-[var(--neon-pink)]">{role.name}</h3>
                <p className="text-sm text-gray-400">{role.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Guides */}
        <section className="mb-16">
          <h2 className="pixel-font text-4xl text-[var(--neon-yellow)] mb-8 flex items-center gap-3">
            <span>📖</span> DETAILED GUIDES
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide, i) => (
              <div key={i} className="retro-border bg-[var(--dark-bg)] p-6 card-hover cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="text-5xl">{guide.icon}</div>
                  <div className="flex-1">
                    <h3 className="pixel-font text-2xl text-[var(--neon-pink)] mb-2">{guide.title}</h3>
                    <p className="text-gray-400 mb-4">{guide.description}</p>
                    <ul className="space-y-1">
                      {guide.topics.map((topic, j) => (
                        <li key={j} className="text-sm text-[var(--neon-blue)] flex items-center gap-2">
                          <span className="text-[var(--neon-green)]">✓</span> {topic}
                        </li>
                      ))}
                    </ul>
                    <button className="mt-4 text-[var(--neon-yellow)] pixel-font text-sm hover:underline">
                      READ MORE →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Tools */}
        <section className="mb-16">
          <h2 className="pixel-font text-4xl text-[var(--neon-purple)] mb-8 flex items-center gap-3">
            <span>🛠️</span> RECOMMENDED TOOLS
          </h2>
          <p className="text-gray-400 mb-6">
            Free tools with generous tiers, perfect for hackathon projects:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <a
                key={i}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-border bg-[var(--dark-bg)] p-4 text-center card-hover"
              >
                <div className="text-3xl mb-2">{tool.icon}</div>
                <div className="pixel-font text-[var(--neon-pink)]">{tool.name}</div>
                <div className="text-xs text-gray-500">{tool.desc}</div>
              </a>
            ))}
          </div>
        </section>

        {/* FAQs */}
        <section className="mb-16">
          <h2 className="pixel-font text-4xl text-[var(--neon-orange)] mb-8 flex items-center gap-3">
            <span>❓</span> FREQUENTLY ASKED
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="retro-border bg-[var(--dark-bg)] p-4">
                <h3 className="pixel-font text-[var(--neon-blue)] mb-2">{faq.q}</h3>
                <p className="text-gray-400">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pro Tips */}
        <section className="mb-16">
          <div className="retro-border bg-[var(--darker-bg)] p-6 border-[var(--neon-yellow)]">
            <h2 className="pixel-font text-3xl text-[var(--neon-yellow)] mb-6 flex items-center gap-3">
              <span className="blink">💡</span> STIMMIE&apos;S PRO TIPS
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <div>
                  <div className="pixel-font text-[var(--neon-pink)]">SOLVE REAL PROBLEMS</div>
                  <div className="text-sm text-gray-400">Judges love solutions that address actual pain points</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎮</span>
                <div>
                  <div className="pixel-font text-[var(--neon-blue)]">WORKING DEMO &gt; SLIDES</div>
                  <div className="text-sm text-gray-400">Show, don&apos;t tell. A working prototype wins every time</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">📖</span>
                <div>
                  <div className="pixel-font text-[var(--neon-green)]">TELL A STORY</div>
                  <div className="text-sm text-gray-400">Connect emotionally with your audience and judges</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl">🎤</span>
                <div>
                  <div className="pixel-font text-[var(--neon-yellow)]">PRACTICE YOUR PITCH</div>
                  <div className="text-sm text-gray-400">Rehearse until it feels natural. Time yourself!</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="text-center">
          <div className="retro-border bg-[var(--dark-bg)] p-8 max-w-2xl mx-auto">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="pixel-font text-3xl rainbow-text mb-4">
              READY TO HACK?
            </h3>
            <p className="text-gray-400 mb-6">
              Join our Discord community to find teammates, get mentorship, and start your hackathon journey!
            </p>
            <a
              href="https://discord.gg/JrwMpgQuTH"
              target="_blank"
              rel="noopener noreferrer"
              className="retro-btn inline-block text-lg"
            >
              🏠 JOIN PAROKYA NI STIMMIE
            </a>
          </div>
        </section>

        {/* Footer decoration */}
        <div className="mt-16 text-center">
          <div className="pixel-font text-[var(--neon-purple)] opacity-60">
            ~ Made with 💜 for Filipino hackers ~
          </div>
          <div className="mt-4 text-2xl">
            <span className="blink">⭐</span>
            <span className="mx-2">🇵🇭</span>
            <span className="blink">⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
}

