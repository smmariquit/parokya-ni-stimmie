# 🚀 Deployment Guide for Parokya ni Stimmie

## Prerequisites
- [Supabase](https://supabase.com) account (free)
- [Railway](https://railway.app) account (free tier available)
- [Vercel](https://vercel.com) account (free)
- [Discord Developer Portal](https://discord.com/developers) access
- GitHub account

---

## 📊 STEP 1: Set Up Supabase (Database)

1. Go to **[supabase.com](https://supabase.com)** and sign in/create account
2. Click **"New Project"**
3. Configure:
 - **Organization:** Your org
 - **Name:** `parokya-ni-stimmie`
 - **Database Password:** Generate and SAVE THIS!
 - **Region:** `Southeast Asia (Singapore)` - closest to PH 🇵🇭
4. Wait ~2 minutes for project creation
5. Go to **SQL Editor** (left sidebar)
6. Copy the contents of `database/schema.sql` and paste it
7. Click **"Run"** to create all tables
8. Go to **Settings → API** and note down:
 - `Project URL` → Your `SUPABASE_URL`
 - `anon public` key → Your `NEXT_PUBLIC_SUPABASE_ANON_KEY`
 - `service_role` key → Your `SUPABASE_SERVICE_KEY`

---

## 🤖 STEP 2: Create Discord Bot

1. Go to **[Discord Developer Portal](https://discord.com/developers/applications)**
2. Click **"New Application"** → Name: `Parokya ni Stimmie`
3. Go to **Bot** tab → Click **"Add Bot"**
4. Under **Privileged Gateway Intents**, enable:
 - ✅ Server Members Intent
 - ✅ Message Content Intent
5. Click **"Reset Token"** and copy → This is your `DISCORD_TOKEN`
6. Go to **OAuth2 → General**:
 - Copy **Client ID** → This is your `DISCORD_CLIENT_ID`
7. Go to **OAuth2 → URL Generator**:
 - Scopes: `bot`, `applications.commands`
 - Bot Permissions: `Send Messages`, `Embed Links`, `Read Message History`, `Use Slash Commands`
 - Copy the generated URL and open it to invite bot to your server
8. Get your server's ID:
 - Enable Developer Mode in Discord (Settings → Advanced → Developer Mode)
 - Right-click your server → "Copy Server ID" → This is your `DISCORD_GUILD_ID`

---

## 🔗 STEP 3: Push to GitHub

1. Create a new repository on GitHub named `parokya-ni-stimmie`
2. Run these commands:

```bash
cd hackathonpool
git remote add origin https://github.com/YOUR_USERNAME/parokya-ni-stimmie.git
git branch -M main
git push -u origin main
```

---

## 🚂 STEP 4: Deploy Bot to Railway

1. Go to **[railway.app](https://railway.app)** and sign in with GitHub
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select your `parokya-ni-stimmie` repository
4. Configure:
 - **Root Directory:** `bot`
 - **Start Command:** `node src/index.js`
5. Go to **Variables** tab and add:

```
DISCORD_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_GUILD_ID=your_discord_server_id
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_supabase_service_role_key
```

6. The bot will auto-deploy! Check logs for any errors.
7. To register slash commands, run once in Railway shell:
```bash
node src/deploy-commands.js
```

---

## ▲ STEP 5: Deploy Website to Vercel

1. Go to **[vercel.com](https://vercel.com)** and sign in with GitHub
2. Click **"Add New..."** → **"Project"**
3. Import your `parokya-ni-stimmie` repository
4. Configure:
 - **Framework Preset:** Next.js
 - **Root Directory:** `web`
5. Add **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
NEXT_PUBLIC_SITE_URL=https://your-vercel-domain.vercel.app
```

6. Click **"Deploy"**
7. Your site will be live at `https://parokya-ni-stimmie.vercel.app` (or similar)

---

## ✅ Post-Deployment Checklist

- [ ] Supabase tables created successfully
- [ ] Discord bot is online and responding to `/help`
- [ ] Website is live and showing correct data
- [ ] Discord invite link works on website
- [ ] Google Docs guide link works

---

## 🔧 Environment Variables Summary

### Bot (Railway)
| Variable | Description |
|----------|-------------|
| `DISCORD_TOKEN` | Bot token from Discord Developer Portal |
| `DISCORD_CLIENT_ID` | Client ID from Discord Developer Portal |
| `DISCORD_GUILD_ID` | Your Discord server ID |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_KEY` | Supabase service role key |

### Website (Vercel)
| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `NEXT_PUBLIC_SITE_URL` | Your Vercel deployment URL |

---

## 🆘 Troubleshooting

### Bot not responding to commands?
1. Make sure slash commands are registered: `node src/deploy-commands.js`
2. Check Railway logs for errors
3. Verify all environment variables are set

### Website showing errors?
1. Check Vercel deployment logs
2. Verify Supabase URL and anon key are correct
3. Check browser console for errors

### Database connection issues?
1. Verify your Supabase project is active
2. Check if RLS policies are blocking access
3. For bot: use service_role key; for website: use anon key

---

Made with 💜 by Stimmie for Parokya ni Stimmie
