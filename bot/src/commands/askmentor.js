import { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';
import { getOrCreateUser, findMentors, createMentorRequest } from '../utils/database.js';
import { createInfoEmbed, createSuccessEmbed, COLORS } from '../utils/embeds.js';

const TOPIC_CHOICES = [
    { name: '🎯 General Hackathon Advice', value: 'general' },
    { name: '💻 Technical Help (Code)', value: 'technical' },
    { name: '🎨 Design/UI Feedback', value: 'design' },
    { name: '🎤 Pitching/Presentation', value: 'pitching' },
    { name: '📋 Project Planning', value: 'planning' },
    { name: '🚀 Deployment Help', value: 'deployment' },
    { name: '👥 Team Dynamics', value: 'team' },
];

export const data = new SlashCommandBuilder()
    .setName('askmentor')
    .setDescription('Request help from a mentor')
    .addStringOption(option =>
        option.setName('topic')
            .setDescription('What do you need help with?')
            .setRequired(true)
            .addChoices(...TOPIC_CHOICES)
    )
    .addStringOption(option =>
        option.setName('message')
            .setDescription('Describe what you need help with')
            .setRequired(true)
            .setMaxLength(500)
    )
    .addStringOption(option =>
        option.setName('hackathon')
            .setDescription('Which hackathon is this for? (optional)')
            .setRequired(false)
    );

export async function execute(interaction) {
    await interaction.deferReply();

    const topic = interaction.options.getString('topic');
    const message = interaction.options.getString('message');
    const hackathon = interaction.options.getString('hackathon');

    try {
        // Get or create user
        const user = await getOrCreateUser(interaction.user);

        // Find available mentors
        const mentors = await findMentors();

        if (mentors.length === 0) {
            const noMentorsEmbed = createInfoEmbed(
                'No Mentors Available',
                'There are no mentors registered yet.\n\n' +
                '**Want to become a mentor?** Use `/mentor` if you have hackathon experience!\n\n' +
                'In the meantime, try asking in the general chat - the community is always ready to help! 💪'
            );
            return await interaction.editReply({ embeds: [noMentorsEmbed] });
        }

        // Create request embed
        const requestEmbed = new EmbedBuilder()
            .setColor(COLORS.WARNING)
            .setTitle('🙋 Mentorship Request')
            .setDescription(`**From:** ${interaction.user}\n**Topic:** ${TOPIC_CHOICES.find(t => t.value === topic)?.name || topic}`)
            .addFields(
                {
                    name: '📝 Message',
                    value: message,
                    inline: false
                }
            )
            .setTimestamp();

        if (hackathon) {
            requestEmbed.addFields({
                name: '🎪 Hackathon',
                value: hackathon,
                inline: true
            });
        }

        // Show available mentors
        const mentorListEmbed = new EmbedBuilder()
            .setColor(COLORS.INFO)
            .setTitle('🎓 Available Mentors')
            .setDescription('Here are some mentors who might be able to help:');

        mentors.slice(0, 5).forEach((mentor, index) => {
            mentorListEmbed.addFields({
                name: `${index + 1}. ${mentor.discord_username}`,
                value: `**Specialties:** ${mentor.mentor_specialties?.join(', ') || 'General'}\n**Experience:** ${mentor.hackathons_joined} hackathons`,
                inline: true
            });
        });

        // Create buttons to request specific mentors
        const buttons = mentors.slice(0, 5).map((mentor, index) =>
            new ButtonBuilder()
                .setCustomId(`request_mentor_${mentor.discord_id}_${topic}`)
                .setLabel(mentor.discord_username.slice(0, 20))
                .setStyle(ButtonStyle.Primary)
                .setEmoji('🎓')
        );

        const row = new ActionRowBuilder().addComponents(buttons);

        // Also add a "Request Any Available" button
        const row2 = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setCustomId(`request_any_mentor_${topic}`)
                .setLabel('Request Any Available Mentor')
                .setStyle(ButtonStyle.Secondary)
                .setEmoji('🎲')
        );

        await interaction.editReply({
            embeds: [requestEmbed, mentorListEmbed],
            components: [row, row2]
        });

        // Wait for button click
        const filter = i => i.user.id === interaction.user.id && i.customId.startsWith('request_');
        
        try {
            const buttonInteraction = await interaction.channel.awaitMessageComponent({
                filter,
                time: 60000
            });

            let selectedMentor;
            if (buttonInteraction.customId.startsWith('request_any_mentor')) {
                // Random mentor
                selectedMentor = mentors[Math.floor(Math.random() * mentors.length)];
            } else {
                const mentorDiscordId = buttonInteraction.customId.split('_')[2];
                selectedMentor = mentors.find(m => m.discord_id === mentorDiscordId);
            }

            if (selectedMentor) {
                // Create mentor request in database
                await createMentorRequest({
                    mentee_id: user.id,
                    mentor_id: selectedMentor.id,
                    topic: topic,
                    message: message,
                    status: 'pending'
                });

                // Try to DM the mentor
                try {
                    const mentorUser = await interaction.client.users.fetch(selectedMentor.discord_id);
                    await mentorUser.send({
                        embeds: [
                            new EmbedBuilder()
                                .setColor(COLORS.WARNING)
                                .setTitle('🎓 New Mentorship Request!')
                                .setDescription(`**${interaction.user.username}** is requesting your help.`)
                                .addFields(
                                    { name: 'Topic', value: TOPIC_CHOICES.find(t => t.value === topic)?.name || topic, inline: true },
                                    { name: 'Message', value: message, inline: false }
                                )
                                .setFooter({ text: `Reply to ${interaction.user.username} to help them out!` })
                        ]
                    });
                } catch (dmError) {
                    console.log('Could not DM mentor:', dmError.message);
                }

                const successEmbed = createSuccessEmbed(
                    'Request Sent!',
                    `Your request has been sent to **${selectedMentor.discord_username}**!\n\n` +
                    `They will be notified and should reach out to you soon.\n\n` +
                    `💡 **Tip:** You can also message them directly if it's urgent!`
                );

                await buttonInteraction.update({
                    embeds: [successEmbed],
                    components: []
                });
            }

        } catch (e) {
            if (e.code === 'InteractionCollectorError') {
                await interaction.editReply({
                    content: '⏰ Request timed out. Run the command again if you still need help!',
                    embeds: [],
                    components: []
                });
            } else {
                throw e;
            }
        }

    } catch (error) {
        console.error('Error in askmentor command:', error);
        await interaction.editReply({
            content: '❌ There was an error processing your request. Please try again.',
        });
    }
}

