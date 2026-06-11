// bot/src/commands/findteammates.js

import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { findUsersLookingForTeam } from '../utils/database.js';
import { createUserProfileEmbed, createInfoEmbed, COLORS } from '../utils/embeds.js';

const SKILL_CHOICES = [
    { name: 'JavaScript/TypeScript', value: 'javascript' },
    { name: 'Python', value: 'python' },
    { name: 'React/Next.js', value: 'react' },
    { name: 'Node.js', value: 'nodejs' },
    { name: 'Mobile Development', value: 'mobile' },
    { name: 'Machine Learning/AI', value: 'ml' },
    { name: 'Backend/APIs', value: 'backend' },
    { name: 'Database/SQL', value: 'database' },
    { name: 'UI/UX Design', value: 'design' },
    { name: 'DevOps/Cloud', value: 'devops' },
];

export const data = new SlashCommandBuilder()
    .setName('findteammates')
    .setDescription('Find people who are looking for a hackathon team')
    .addStringOption(option =>
        option.setName('skill')
            .setDescription('Filter by skill')
            .setRequired(false)
            .addChoices(...SKILL_CHOICES)
    )
    .addStringOption(option =>
        option.setName('experience')
            .setDescription('Filter by experience level')
            .setRequired(false)
            .addChoices(
                { name: 'Beginner', value: 'beginner' },
                { name: 'Intermediate', value: 'intermediate' },
                { name: 'Advanced', value: 'advanced' }
            )
    );

export async function execute(interaction) {
    await interaction.deferReply();

    const skill = interaction.options.getString('skill');
    const experience = interaction.options.getString('experience');

    try {
        const skills = skill ? [skill] : null;
        let users = await findUsersLookingForTeam(skills);

        // Filter by experience if specified
        if (experience) {
            users = users.filter(u => u.experience_level === experience);
        }

        if (users.length === 0) {
            const noResultsEmbed = createInfoEmbed(
                'No teammates found',
                'No one is currently looking for a team with those criteria.\n\nTry:\n• Using different filters\n• Checking back later\n• Using `/lookingforteam` to register yourself!'
            );
            return await interaction.editReply({ embeds: [noResultsEmbed] });
        }

        // Create summary embed
        const summaryEmbed = new EmbedBuilder()
            .setColor(COLORS.PRIMARY)
            .setTitle('🔍 People Looking for Teams')
            .setDescription(`Found **${users.length}** potential teammate(s)${skill ? ` with **${skill}** skills` : ''}`)
            .setTimestamp();

        // Create embed for each user (max 5 to avoid spam)
        const userEmbeds = users.slice(0, 5).map(user => {
            const embed = new EmbedBuilder()
                .setColor(COLORS.INFO)
                .setTitle(`👤 ${user.discord_username}`)
                .addFields(
                    {
                        name: '💼 Skills',
                        value: user.skills?.length > 0 ? user.skills.join(', ') : 'Not specified',
                        inline: true
                    },
                    {
                        name: '🎯 Experience',
                        value: user.experience_level || 'Not specified',
                        inline: true
                    }
                );

            if (user.bio) {
                embed.setDescription(user.bio);
            }

            if (user.looking_for_hackathon) {
                embed.addFields({
                    name: '🎪 Looking for',
                    value: user.looking_for_hackathon,
                    inline: false
                });
            }

            if (user.github_url) {
                embed.addFields({
                    name: '🔗 GitHub',
                    value: `[Profile](${user.github_url})`,
                    inline: true
                });
            }

            return embed;
        });

        // Create buttons to DM users
        const buttons = users.slice(0, 5).map((user, index) =>
            new ButtonBuilder()
                .setCustomId(`dm_user_${user.discord_id}`)
                .setLabel(`Message ${user.discord_username}`)
                .setStyle(ButtonStyle.Primary)
                .setEmoji('💬')
        );

        // Split buttons into rows (max 5 per row)
        const rows = [];
        for (let i = 0; i < buttons.length; i += 5) {
            rows.push(new ActionRowBuilder().addComponents(buttons.slice(i, i + 5)));
        }

        await interaction.editReply({
            embeds: [summaryEmbed, ...userEmbeds],
            components: rows
        });

    } catch (error) {
        console.error('Error in findteammates command:', error);
        await interaction.editReply({
            content: '❌ There was an error searching for teammates. Please try again.',
        });
    }
}

