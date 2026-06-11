// bot/src/events/ready.js

import { Events, ActivityType } from 'discord.js';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client) {
    console.log(`\n★ PAROKYA NI STIMMIE BOT ★`);
    console.log(`📛 Logged in as: ${client.user.tag}`);
    console.log(`🏠 Serving ${client.guilds.cache.size} server(s)`);
    console.log(`👥 Total members: ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`);
    
    // Set bot status
    client.user.setActivity('/help | Parokya ni Stimmie', { type: ActivityType.Watching });
    
    console.log('\n✨ Ready to help Pinoy hackers find their teams!\n');
}

