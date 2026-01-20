import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { getOrCreateUser, updateUser } from '../utils/database.js';
import { createSuccessEmbed, createUserProfileEmbed } from '../utils/embeds.js';

const SKILLS_OPTIONS = [
    { label: 'JavaScript/TypeScript', value: 'javascript' },
    { label: 'Python', value: 'python' },
    { label: 'React/Next.js', value: 'react' },
    { label: 'Node.js', value: 'nodejs' },
    { label: 'Mobile (React Native/Flutter)', value: 'mobile' },
    { label: 'Machine Learning/AI', value: 'ml' },
    { label: 'Backend/APIs', value: 'backend' },
    { label: 'Database/SQL', value: 'database' },
    { label: 'UI/UX Design', value: 'design' },
    { label: 'DevOps/Cloud', value: 'devops' },
    { label: 'Blockchain/Web3', value: 'web3' },
    { label: 'Game Development', value: 'gamedev' },
];

const EXPERIENCE_LEVELS = [
    { label: '🌱 Beginner (0-1 hackathons)', value: 'beginner' },
    { label: '🌿 Intermediate (2-5 hackathons)', value: 'intermediate' },
    { label: '🌳 Advanced (5+ hackathons)', value: 'advanced' },
];

export const data = new SlashCommandBuilder()
    .setName('lookingforteam')
    .setDescription('Register yourself as looking for a hackathon team')
    .addStringOption(option =>
        option.setName('experience')
            .setDescription('Your hackathon experience level')
            .setRequired(true)
            .addChoices(...EXPERIENCE_LEVELS.map(e => ({ name: e.label, value: e.value })))
    )
    .addStringOption(option =>
        option.setName('bio')
            .setDescription('A short bio about yourself (max 200 characters)')
            .setRequired(false)
            .setMaxLength(200)
    )
    .addStringOption(option =>
        option.setName('hackathon')
            .setDescription('Specific hackathon you want to join (optional)')
            .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('github')
            .setDescription('Your GitHub profile URL')
            .setRequired(false)
    );

export async function execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const experience = interaction.options.getString('experience');
    const bio = interaction.options.getString('bio');
    const hackathon = interaction.options.getString('hackathon');
    const github = interaction.options.getString('github');

    try {
        // Get or create user
        await getOrCreateUser(interaction.user);

        // Build skills select menu
        const skillsSelect = new StringSelectMenuBuilder()
            .setCustomId('skills_select')
            .setPlaceholder('Select your skills (up to 5)')
            .setMinValues(1)
            .setMaxValues(5)
            .addOptions(SKILLS_OPTIONS);

        const row = new ActionRowBuilder().addComponents(skillsSelect);

        await interaction.editReply({
            content: '**Step 1/2:** Select your skills from the dropdown below:',
            components: [row],
        });

        // Wait for skills selection
        const filter = i => i.customId === 'skills_select' && i.user.id === interaction.user.id;
        
        try {
            const skillsInteraction = await interaction.channel.awaitMessageComponent({
                filter,
                time: 60000
            });

            const skills = skillsInteraction.values;

            // Update user in database
            const updates = {
                experience_level: experience,
                skills: skills,
                is_looking_for_team: true,
            };

            if (bio) updates.bio = bio;
            if (hackathon) updates.looking_for_hackathon = hackathon;
            if (github) updates.github_url = github;

            const updatedUser = await updateUser(interaction.user.id, updates);

            // Create success embed
            const successEmbed = createSuccessEmbed(
                'You\'re now looking for a team!',
                `Your profile has been updated. Other members can now find you using \`/findteammates\`.\n\n**Skills:** ${skills.join(', ')}\n**Experience:** ${experience}`
            );

            // Also show in a public channel
            const publicEmbed = createUserProfileEmbed({
                ...updatedUser,
                discord_username: interaction.user.username
            });

            await skillsInteraction.update({
                content: null,
                embeds: [successEmbed],
                components: [],
            });

            // Post to looking-for-team channel if it exists
            const lfgChannel = interaction.guild.channels.cache.find(
                ch => ch.name === 'looking-for-team' || ch.name === 'lfg'
            );

            if (lfgChannel) {
                await lfgChannel.send({
                    content: `🔍 **${interaction.user}** is looking for a team!`,
                    embeds: [publicEmbed]
                });
            }

        } catch (e) {
            if (e.code === 'InteractionCollectorError') {
                await interaction.editReply({
                    content: '⏰ Time expired! Please run the command again.',
                    components: []
                });
            } else {
                throw e;
            }
        }

    } catch (error) {
        console.error('Error in lookingforteam command:', error);
        await interaction.editReply({
            content: '❌ There was an error processing your request. Please try again.',
            components: []
        });
    }
}

