// bot/src/commands/help.js

import { SlashCommandBuilder, EmbedBuilder } from 'discord.js';
import { COLORS } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
    .setName('help')
    .setDescription('View all available commands and how to use Parokya ni Stimmie');

export async function execute(interaction) {
    const helpEmbed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle('★ PAROKYA NI STIMMIE ★')
        .setDescription(
            '**Welcome ka sa Parokya!** 🇵🇭\n\n' +
            'We help Filipino students find hackathon teammates and opportunities. ' +
            'Based on Stimmie\'s experience from 24+ hackathons!\n\n' +
            '**Getting Started:**\n' +
            '1️⃣ Use `/lookingforteam` to register yourself\n' +
            '2️⃣ Browse `/hackathons` to find opportunities\n' +
            '3️⃣ Use `/findteammates` to find teammates\n' +
            '4️⃣ Create a team with `/createteam`'
        )
        .addFields(
            {
                name: '👥 Team Formation',
                value: 
                    '`/lookingforteam` - Register as looking for a team\n' +
                    '`/findteammates` - Search for potential teammates\n' +
                    '`/createteam` - Create a new team',
                inline: false
            },
            {
                name: '🏆 Hackathon Discovery',
                value: 
                    '`/hackathons` - View upcoming hackathons\n' +
                    'Filter by online/in-person or featured events',
                inline: false
            },
            {
                name: '🎓 Mentorship',
                value: 
                    '`/mentor` - Register as a mentor (2+ hackathons required)\n' +
                    '`/askmentor` - Request help from a mentor',
                inline: false
            },
            {
                name: '📚 The Hackathon Kit',
                value: 
                    'Visit our website for Stimmie\'s guides:\n' +
                    '• First-time hackathon survival guide\n' +
                    '• Team roles & formation tips\n' +
                    '• Pitching to win advice',
                inline: false
            }
        )
        .setFooter({ text: '★ Parokya ni Stimmie | Good luck sa hackathon mo! 🚀' })
        .setTimestamp();

    await interaction.reply({ embeds: [helpEmbed] });
}

