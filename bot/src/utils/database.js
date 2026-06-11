// bot/src/utils/database.js

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';

config();

// Create Supabase client with service role key (full access)
const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_SERVICE_KEY
);

export default supabase;

// User functions
export async function getOrCreateUser(discordUser) {
    const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('discord_id', discordUser.id)
        .single();

    if (existingUser) return existingUser;

    const { data: newUser, error } = await supabase
        .from('users')
        .insert({
            discord_id: discordUser.id,
            discord_username: discordUser.username,
            discord_avatar: discordUser.avatar,
        })
        .select()
        .single();

    if (error) throw error;
    return newUser;
}

export async function updateUser(discordId, updates) {
    const { data, error } = await supabase
        .from('users')
        .update(updates)
        .eq('discord_id', discordId)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getUserByDiscordId(discordId) {
    const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('discord_id', discordId)
        .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
}

export async function findUsersLookingForTeam(skills = null) {
    let query = supabase
        .from('users')
        .select('*')
        .eq('is_looking_for_team', true);

    if (skills && skills.length > 0) {
        query = query.overlaps('skills', skills);
    }

    const { data, error } = await query.limit(10);
    if (error) throw error;
    return data;
}

export async function findMentors(specialty = null) {
    let query = supabase
        .from('users')
        .select('*')
        .eq('is_mentor', true);

    if (specialty) {
        query = query.contains('mentor_specialties', [specialty]);
    }

    const { data, error } = await query.limit(10);
    if (error) throw error;
    return data;
}

// Hackathon functions
export async function getUpcomingHackathons(limit = 10) {
    const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .gte('end_date', new Date().toISOString())
        .order('start_date', { ascending: true })
        .limit(limit);

    if (error) throw error;
    return data;
}

export async function getHackathonById(id) {
    const { data, error } = await supabase
        .from('hackathons')
        .select('*')
        .eq('id', id)
        .single();

    if (error) throw error;
    return data;
}

export async function createHackathon(hackathonData) {
    const { data, error } = await supabase
        .from('hackathons')
        .insert(hackathonData)
        .select()
        .single();

    if (error) throw error;
    return data;
}

// Team functions
export async function createTeam(teamData) {
    const { data, error } = await supabase
        .from('teams')
        .insert(teamData)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function addTeamMember(teamId, userId, role = 'member') {
    const { data, error } = await supabase
        .from('team_members')
        .insert({ team_id: teamId, user_id: userId, role })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getOpenTeams(hackathonId = null) {
    let query = supabase
        .from('teams')
        .select(`
            *,
            hackathons (name, start_date),
            leader:users!teams_leader_id_fkey (discord_username)
        `)
        .eq('is_open', true);

    if (hackathonId) {
        query = query.eq('hackathon_id', hackathonId);
    }

    const { data, error } = await query.limit(10);
    if (error) throw error;
    return data;
}

export async function getTeamMembers(teamId) {
    const { data, error } = await supabase
        .from('team_members')
        .select(`
            *,
            users (discord_id, discord_username, skills)
        `)
        .eq('team_id', teamId);

    if (error) throw error;
    return data;
}

// Mentor request functions
export async function createMentorRequest(requestData) {
    const { data, error } = await supabase
        .from('mentor_requests')
        .insert(requestData)
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getPendingMentorRequests(mentorUserId) {
    const { data, error } = await supabase
        .from('mentor_requests')
        .select(`
            *,
            mentee:users!mentor_requests_mentee_id_fkey (discord_id, discord_username)
        `)
        .eq('mentor_id', mentorUserId)
        .eq('status', 'pending');

    if (error) throw error;
    return data;
}

