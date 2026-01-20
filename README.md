# ★ PAROKYA NI STIMMIE ★

> A hackathon community for Filipino students 🇵🇭

Based on Stimmie's experiences from **24+ hackathons**, **66+ teammates**, and **₱131K+ in prize money**!

```
 ╔══════════════════════════════════════╗
 ║  FIND TEAMS • WIN HACKATHONS • LEARN ║
 ╚══════════════════════════════════════╝
```

## 🎯 What is this?

A community platform helping Filipino students:
- 👥 **Find hackathon teammates** with complementary skills
- 🏆 **Discover hackathons** (PH-friendly timezones)
- 🎓 **Get mentorship** from experienced hackers
- 📚 **Learn from the Hackathon Kit** guide

## 📁 Project Structure

```
parokya-ni-stimmie/
├── bot/                 # Discord.js bot
│   ├── src/
│   │   ├── commands/    # Slash commands
│   │   ├── events/      # Discord events
│   │   └── utils/       # Helpers
│   └── package.json
│
├── web/                 # Next.js website (neocities vibes!)
│   ├── src/
│   │   ├── app/         # Pages
│   │   ├── components/  # React components
│   │   └── lib/         # Database
│   └── package.json
│
├── database/            # Supabase schema
└── README.md
```

## 🤖 Bot Commands

| Command | Description |
|---------|-------------|
| `/lookingforteam` | Register yourself + your skills |
| `/findteammates` | Search for potential teammates |
| `/createteam` | Create a team for a hackathon |
| `/hackathons` | View upcoming hackathons |
| `/mentor` | Register as a mentor |
| `/askmentor` | Request help from a mentor |
| `/help` | View all commands |

## 🌐 Website Pages

- **Home** - Landing page with community info
- **Hackathons** - Calendar of upcoming events
- **Guide** - The Hackathon Kit (based on Stimmie's PDF)

## ⚡ Tech Stack

| Component | Technology |
|-----------|------------|
| Bot | Discord.js v14 |
| Website | Next.js 14 + Tailwind |
| Database | Supabase |
| Hosting | Vercel + Railway |

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Discord Bot Token
- Supabase Project

### 1. Setup Database

```sql
-- Run database/schema.sql in Supabase SQL Editor
```

### 2. Setup Discord Bot

```bash
cd bot
npm install
cp .env.example .env
# Fill in your tokens
npm run deploy-commands
npm run dev
```

### 3. Setup Website

```bash
cd web
npm install
cp .env.example .env.local
# Fill in Supabase credentials
npm run dev
```

## 🎨 Design

The website uses a **neocities/retro web aesthetic** with:
- Pixel fonts (VT323, Silkscreen)
- Neon colors (pink, blue, green, yellow)
- Chunky borders and scanlines
- Blinking elements and marquees
- Windows 95-style boxes

## 📖 Based on the Hackathon Kit

The guide content is based on Stimmie's original "[Parokya ni Stimmie] Hackathon Kit" PDF which covers:
- What is a hackathon?
- Team roles (not just devs!)
- Hackathon phases
- Pitching tips
- And more!

## 🤝 Contributing

This is a community project! Feel free to contribute.

## 📜 License

MIT

---

```
★ Made with 💜 for Filipino hackers ★
```
