import { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } from 'discord.js';
import { getOrCreateUser, updateUser } from '../utils/database.js';
import { createSuccessEmbed, createUserProfileEmbed, COLORS } from '../utils/embeds.js';

const SPECIALTY_OPTIONS = [
    { label: 'Frontend Development', value: 'frontend' },
    { label: 'Backend Development', value: 'backend' },
    { label: 'Full Stack', value: 'fullstack' },
    { label: 'Mobile Development', value: 'mobile' },
    { label: 'Machine Learning/AI', value: 'ml' },
    { label: 'UI/UX Design', value: 'design' },
    { label: 'DevOps & Deployment', value: 'devops' },
    { label: 'Pitching & Presentations', value: 'pitching' },
    { label: 'Project Management', value: 'pm' },
    { label: 'General Hackathon Strategy', value: 'strategy' },
];

export const data = new SlashCommandBuilder()
    .setName('mentor')
    .setDescription('Register as a mentor to help other hackathon participants')
    .addIntegerOption(option =>
        option.setName('hackathons_joined')
            .setDescription('How many hackathons have you participated in?')
            .setRequired(true)
            .setMinValue(1)
    )
    .addIntegerOption(option =>
        option.setName('hackathons_won')
            .setDescription('How many hackathons have you won/placed in?')
            .setRequired(false)
            .setMinValue(0)
    )
    .addStringOption(option =>
        option.setName('bio')
            .setDescription('Tell others about your experience')
            .setRequired(false)
            .setMaxLength(300)
    );

export async function execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const hackathonsJoined = interaction.options.getInteger('hackathons_joined');
    const hackathonsWon = interaction.options.getInteger('hackathons_won') || 0;
    const bio = interaction.options.getString('bio');

    // Minimum requirement check
    if (hackathonsJoined < 2) {
        return await interaction.editReply({
            content: '❌ You need to have participated in at least 2 hackathons to register as a mentor. Keep participating and come back soon! 💪',
        });
    }

    try {
        // Get or create user
        await getOrCreateUser(interaction.user);

        // Build specialties select menu
        const specialtiesSelect = new StringSelectMenuBuilder()
            .setCustomId('mentor_specialties_select')
            .setPlaceholder('Select your mentoring specialties (up to 5)')
            .setMinValues(1)
            .setMaxValues(5)
            .addOptions(SPECIALTY_OPTIONS);

        const row = new ActionRowBuilder().addComponents(specialtiesSelect);

        await interaction.editReply({
            content: '**Select the areas where you can mentor others:**',
            components: [row],
        });

        // Wait for specialties selection
        const filter = i => i.customId === 'mentor_specialties_select' && i.user.id === interaction.user.id;
        
        try {
            const specialtiesInteraction = await interaction.channel.awaitMessageComponent({
                filter,
                time: 60000
            });

            const specialties = specialtiesInteraction.values;

            // Update user in database
            const updates = {
                is_mentor: true,
                mentor_specialties: specialties,
                hackathons_joined: hackathonsJoined,
                hackathons_won: hackathonsWon,
            };

            if (bio) updates.bio = bio;

            const updatedUser = await updateUser(interaction.user.id, updates);

            // Create success embed
            const successEmbed = createSuccessEmbed(
                'You\'re now a mentor! 🎓',
                `Thank you for volunteering to help others!\n\n` +
                `**Experience:** ${hackathonsJoined} hackathons (${hackathonsWon} wins)\n` +
                `**Specialties:** ${specialties.join(', ')}\n\n` +
                `Others can now request your help using \`/askmentor\`.`
            );

            await specialtiesInteraction.update({
                content: null,
                embeds: [successEmbed],
                components: [],
            });

            // Post to mentors channel if it exists
            const mentorsChannel = interaction.guild.channels.cache.find(
                ch => ch.name === 'mentors' || ch.name === 'mentor-list'
            );

            if (mentorsChannel) {
                const publicEmbed = createUserProfileEmbed({
                    ...updatedUser,
                    discord_username: interaction.user.username
                });
                await mentorsChannel.send({
                    content: `🎓 **New mentor joined!** Welcome ${interaction.user}!`,
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
        console.error('Error in mentor command:', error);
        await interaction.editReply({
            content: '❌ There was an error processing your request. Please try again.',
            components: []
        });
    }
}

