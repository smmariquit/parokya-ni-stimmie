import { SlashCommandBuilder, ChannelType, PermissionFlagsBits } from 'discord.js';
import { getOrCreateUser, createTeam, addTeamMember, getUpcomingHackathons } from '../utils/database.js';
import { createTeamEmbed, createSuccessEmbed, createErrorEmbed } from '../utils/embeds.js';

export const data = new SlashCommandBuilder()
    .setName('createteam')
    .setDescription('Create a new team for a hackathon')
    .addStringOption(option =>
        option.setName('name')
            .setDescription('Your team name')
            .setRequired(true)
            .setMaxLength(50)
    )
    .addStringOption(option =>
        option.setName('description')
            .setDescription('What your team is about / project idea')
            .setRequired(true)
            .setMaxLength(300)
    )
    .addIntegerOption(option =>
        option.setName('max_members')
            .setDescription('Maximum team size (default: 4)')
            .setRequired(false)
            .setMinValue(2)
            .setMaxValue(10)
    )
    .addStringOption(option =>
        option.setName('looking_for')
            .setDescription('Skills you need (comma-separated, e.g., "frontend, backend, design")')
            .setRequired(false)
    )
    .addBooleanOption(option =>
        option.setName('create_channel')
            .setDescription('Create a private text channel for your team')
            .setRequired(false)
    );

export async function execute(interaction) {
    await interaction.deferReply();

    const name = interaction.options.getString('name');
    const description = interaction.options.getString('description');
    const maxMembers = interaction.options.getInteger('max_members') || 4;
    const lookingForRaw = interaction.options.getString('looking_for');
    const createChannel = interaction.options.getBoolean('create_channel') || false;

    const lookingFor = lookingForRaw 
        ? lookingForRaw.split(',').map(s => s.trim().toLowerCase())
        : [];

    try {
        // Get or create user
        const user = await getOrCreateUser(interaction.user);

        // Get upcoming hackathons for selection (simplified - just create without hackathon for now)
        const teamData = {
            name: name,
            description: description,
            leader_id: user.id,
            max_members: maxMembers,
            looking_for: lookingFor,
            is_open: true,
        };

        // Create team in database
        const team = await createTeam(teamData);

        // Add creator as team leader
        await addTeamMember(team.id, user.id, 'leader');

        // Create team channel if requested
        let channelMention = null;
        if (createChannel) {
            try {
                // Find or create a "Teams" category
                let category = interaction.guild.channels.cache.find(
                    c => c.name.toLowerCase() === 'teams' && c.type === ChannelType.GuildCategory
                );

                if (!category && interaction.guild.members.me.permissions.has(PermissionFlagsBits.ManageChannels)) {
                    category = await interaction.guild.channels.create({
                        name: 'Teams',
                        type: ChannelType.GuildCategory,
                    });
                }

                // Create team channel
                const channelName = `team-${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`;
                const teamChannel = await interaction.guild.channels.create({
                    name: channelName,
                    type: ChannelType.GuildText,
                    parent: category?.id,
                    topic: `Team channel for ${name} | ${description}`,
                    permissionOverwrites: [
                        {
                            id: interaction.guild.id,
                            deny: [PermissionFlagsBits.ViewChannel],
                        },
                        {
                            id: interaction.user.id,
                            allow: [
                                PermissionFlagsBits.ViewChannel,
                                PermissionFlagsBits.SendMessages,
                                PermissionFlagsBits.ManageMessages,
                            ],
                        },
                    ],
                });

                channelMention = `<#${teamChannel.id}>`;

                // Send welcome message to team channel
                const teamEmbed = createTeamEmbed(team, [{ role: 'leader', users: { discord_username: interaction.user.username } }]);
                await teamChannel.send({
                    content: `🎉 Welcome to your team channel, ${interaction.user}!`,
                    embeds: [teamEmbed]
                });

            } catch (channelError) {
                console.error('Could not create team channel:', channelError);
            }
        }

        // Success response
        const successEmbed = createSuccessEmbed(
            'Team Created!',
            `Your team **${name}** has been created!\n\n` +
            `**Description:** ${description}\n` +
            `**Max Members:** ${maxMembers}\n` +
            `**Looking for:** ${lookingFor.length > 0 ? lookingFor.join(', ') : 'Anyone!'}\n` +
            (channelMention ? `**Team Channel:** ${channelMention}` : '')
        );

        // Post team to a teams channel if it exists
        const teamsChannel = interaction.guild.channels.cache.find(
            ch => ch.name === 'open-teams' || ch.name === 'teams' || ch.name === 'team-recruitment'
        );

        if (teamsChannel) {
            const publicEmbed = createTeamEmbed(team, [{ role: 'leader', users: { discord_username: interaction.user.username } }]);
            await teamsChannel.send({
                content: `🚀 **New team looking for members!** Created by ${interaction.user}`,
                embeds: [publicEmbed]
            });
        }

        await interaction.editReply({ embeds: [successEmbed] });

    } catch (error) {
        console.error('Error in createteam command:', error);
        const errorEmbed = createErrorEmbed(
            'Could not create team',
            'There was an error creating your team. Please try again.'
        );
        await interaction.editReply({ embeds: [errorEmbed] });
    }
}

