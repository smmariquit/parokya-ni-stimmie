// bot/src/utils/embeds.js

import { EmbedBuilder } from 'discord.js';

// Parokya ni Stimmie brand colors (neocities vibes)
export const COLORS = {
    PRIMARY: 0xff71ce,    // Neon Pink
    SUCCESS: 0x05ffa1,    // Neon Green
    WARNING: 0xfffb96,    // Neon Yellow
    ERROR: 0xff6b6b,      // Soft Red
    INFO: 0x01cdfe,       // Neon Blue
    PURPLE: 0xb967ff,     // Neon Purple
};

export function createUserProfileEmbed(user) {
    const embed = new EmbedBuilder()
        .setColor(COLORS.PRIMARY)
        .setTitle(`👤 ${user.discord_username}`)
        .setDescription(user.bio || 'No bio set')
        .addFields(
            {
                name: '🎯 Experience Level',
                value: user.experience_level || 'Not set',
                inline: true
            },
            {
                name: '🏆 Hackathons',
                value: `${user.hackathons_joined} joined, ${user.hackathons_won} won`,
                inline: true
            },
            {
                name: '💼 Skills',
                value: user.skills?.length > 0 ? user.skills.join(', ') : 'No skills added',
                inline: false
            }
        )
        .setFooter({ text: '★ Parokya ni Stimmie ★' })
        .setTimestamp();

    if (user.is_looking_for_team) {
        embed.setFooter({ text: '🔍 Looking for a team! | ★ Parokya ni Stimmie ★' });
    }

    if (user.is_mentor) {
        embed.addFields({
            name: '🎓 Mentor Specialties',
            value: user.mentor_specialties?.join(', ') || 'General mentorship',
            inline: false
        });
    }

    return embed;
}

export function createHackathonEmbed(hackathon) {
    const startDate = new Date(hackathon.start_date);
    const endDate = new Date(hackathon.end_date);
    const deadline = hackathon.registration_deadline 
        ? new Date(hackathon.registration_deadline) 
        : null;

    const embed = new EmbedBuilder()
        .setColor(hackathon.is_featured ? COLORS.WARNING : COLORS.INFO)
        .setTitle(`${hackathon.is_featured ? '⭐ ' : ''}${hackathon.name}`)
        .setDescription(hackathon.description || 'No description available')
        .addFields(
            {
                name: '📅 Dates',
                value: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`,
                inline: true
            },
            {
                name: '📍 Location',
                value: hackathon.is_online ? '🌐 Online' : `📍 ${hackathon.location}`,
                inline: true
            },
            {
                name: '👥 Team Size',
                value: `${hackathon.min_team_size}-${hackathon.max_team_size} members`,
                inline: true
            }
        )
        .setTimestamp();

    if (deadline) {
        embed.addFields({
            name: '⏰ Registration Deadline',
            value: deadline.toLocaleDateString(),
            inline: true
        });
    }

    if (hackathon.prizes) {
        embed.addFields({
            name: '🏆 Prizes',
            value: hackathon.prizes,
            inline: false
        });
    }

    if (hackathon.tags?.length > 0) {
        embed.addFields({
            name: '🏷️ Tags',
            value: hackathon.tags.map(t => `\`${t}\``).join(' '),
            inline: false
        });
    }

    if (hackathon.website_url) {
        embed.setURL(hackathon.website_url);
    }

    return embed;
}

export function createTeamEmbed(team, members = []) {
    const embed = new EmbedBuilder()
        .setColor(team.is_open ? COLORS.SUCCESS : COLORS.PRIMARY)
        .setTitle(`🚀 ${team.name}`)
        .setDescription(team.description || 'No description')
        .addFields(
            {
                name: '🎯 Hackathon',
                value: team.hackathons?.name || 'General',
                inline: true
            },
            {
                name: '👥 Members',
                value: `${members.length}/${team.max_members}`,
                inline: true
            },
            {
                name: '📊 Status',
                value: team.is_open ? '🟢 Open for members' : '🔴 Full',
                inline: true
            }
        )
        .setTimestamp();

    if (team.looking_for?.length > 0) {
        embed.addFields({
            name: '🔍 Looking For',
            value: team.looking_for.join(', '),
            inline: false
        });
    }

    if (members.length > 0) {
        const memberList = members.map(m => 
            `${m.role === 'leader' ? '👑' : '👤'} ${m.users.discord_username}`
        ).join('\n');
        embed.addFields({
            name: '👥 Current Members',
            value: memberList,
            inline: false
        });
    }

    return embed;
}

export function createSuccessEmbed(title, description) {
    return new EmbedBuilder()
        .setColor(COLORS.SUCCESS)
        .setTitle(`✅ ${title}`)
        .setDescription(description)
        .setTimestamp();
}

export function createErrorEmbed(title, description) {
    return new EmbedBuilder()
        .setColor(COLORS.ERROR)
        .setTitle(`❌ ${title}`)
        .setDescription(description)
        .setTimestamp();
}

export function createInfoEmbed(title, description) {
    return new EmbedBuilder()
        .setColor(COLORS.INFO)
        .setTitle(`ℹ️ ${title}`)
        .setDescription(description)
        .setTimestamp();
}

