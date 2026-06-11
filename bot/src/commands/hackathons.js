// bot/src/commands/hackathons.js

import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { getUpcomingHackathons } from '../utils/database.js';
import { createHackathonEmbed, createInfoEmbed, COLORS } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
    .setName('hackathons')
    .setDescription('View upcoming hackathons')
    .addStringOption(option =>
        option.setName('filter')
            .setDescription('Filter hackathons')
            .setRequired(false)
            .addChoices(
                { name: '🌐 Online Only', value: 'online' },
                { name: '📍 In-Person Only', value: 'inperson' },
                { name: '⭐ Featured', value: 'featured' }
            )
    );

export async function execute(interaction) {
    await interaction.deferReply();

    const filter = interaction.options.getString('filter');

    try {
        let hackathons = await getUpcomingHackathons(10);

        // Apply filters
        if (filter === 'online') {
            hackathons = hackathons.filter(h => h.is_online);
        } else if (filter === 'inperson') {
            hackathons = hackathons.filter(h => !h.is_online);
        } else if (filter === 'featured') {
            hackathons = hackathons.filter(h => h.is_featured);
        }

        if (hackathons.length === 0) {
            // Show sample hackathons if database is empty (for demo purposes)
            const emptyEmbed = createInfoEmbed(
                'No Hackathons Found',
                'There are no upcoming hackathons in our database yet.\n\n' +
                '**Want to add one?** Ask a moderator to add hackathons, or stay tuned for updates!\n\n' +
                '**Popular hackathon sites:**\n' +
                '• [Devpost](https://devpost.com/hackathons)\n' +
                '• [MLH](https://mlh.io/seasons/2026/events)\n' +
                '• [Devfolio](https://devfolio.co/hackathons)'
            );

            return await interaction.editReply({ embeds: [emptyEmbed] });
        }

        // Create summary embed
        const summaryEmbed = new EmbedBuilder()
            .setColor(COLORS.PRIMARY)
            .setTitle('🏆 Upcoming Hackathons')
            .setDescription(
                `Found **${hackathons.length}** upcoming hackathon(s)!\n\n` +
                `Use the buttons below to register or find teammates.`
            )
            .setFooter({ text: 'HackathonPool PH • Dates shown in Philippine Time' })
            .setTimestamp();

        // Create embeds for hackathons (max 3 to avoid spam)
        const hackathonEmbeds = hackathons.slice(0, 3).map(h => createHackathonEmbed(h));

        // Create buttons for each hackathon
        const rows = hackathons.slice(0, 3).map((h, index) => {
            const buttons = [
                new ButtonBuilder()
                    .setLabel('Register')
                    .setStyle(ButtonStyle.Link)
                    .setURL(h.registration_url || h.website_url || 'https://devpost.com')
                    .setEmoji('📝'),
                new ButtonBuilder()
                    .setCustomId(`find_team_${h.id}`)
                    .setLabel('Find Team')
                    .setStyle(ButtonStyle.Primary)
                    .setEmoji('👥'),
            ];

            if (h.website_url) {
                buttons.push(
                    new ButtonBuilder()
                        .setLabel('Website')
                        .setStyle(ButtonStyle.Link)
                        .setURL(h.website_url)
                        .setEmoji('🔗')
                );
            }

            return new ActionRowBuilder().addComponents(buttons);
        });

        // Add a row for viewing more
        if (hackathons.length > 3) {
            rows.push(
                new ActionRowBuilder().addComponents(
                    new ButtonBuilder()
                        .setCustomId('view_more_hackathons')
                        .setLabel(`View ${hackathons.length - 3} More`)
                        .setStyle(ButtonStyle.Secondary)
                        .setEmoji('📋')
                )
            );
        }

        await interaction.editReply({
            embeds: [summaryEmbed, ...hackathonEmbeds],
            components: rows.slice(0, 5) // Discord max 5 action rows
        });

    } catch (error) {
        console.error('Error in hackathons command:', error);
        await interaction.editReply({
            content: '❌ There was an error fetching hackathons. Please try again.',
        });
    }
}

