import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for database tables
export interface User {
  id: string;
  discord_id: string;
  discord_username: string;
  discord_avatar?: string;
  bio?: string;
  skills?: string[];
  experience_level?: 'beginner' | 'intermediate' | 'advanced';
  github_url?: string;
  linkedin_url?: string;
  portfolio_url?: string;
  is_looking_for_team: boolean;
  is_mentor: boolean;
  mentor_specialties?: string[];
  hackathons_joined: number;
  hackathons_won: number;
  created_at: string;
}

export interface Hackathon {
  id: string;
  name: string;
  description?: string;
  organizer?: string;
  website_url?: string;
  registration_url?: string;
  start_date: string;
  end_date: string;
  registration_deadline?: string;
  location?: string;
  is_online: boolean;
  max_team_size: number;
  min_team_size: number;
  prizes?: string;
  tags?: string[];
  is_featured: boolean;
  created_at: string;
}

export interface Team {
  id: string;
  name: string;
  hackathon_id?: string;
  leader_id: string;
  description?: string;
  looking_for?: string[];
  max_members: number;
  is_open: boolean;
  created_at: string;
}

// Database functions
export async function getUpcomingHackathons(): Promise<Hackathon[]> {
  const { data, error } = await supabase
    .from('hackathons')
    .select('*')
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function getFeaturedHackathons(): Promise<Hackathon[]> {
  const { data, error } = await supabase
    .from('hackathons')
    .select('*')
    .eq('is_featured', true)
    .gte('end_date', new Date().toISOString())
    .order('start_date', { ascending: true })
    .limit(3);

  if (error) throw error;
  return data || [];
}

export async function getHackathonById(id: string): Promise<Hackathon | null> {
  const { data, error } = await supabase
    .from('hackathons')
    .select('*')
    .eq('id', id)
    .single();

  if (error) return null;
  return data;
}

export async function getOpenTeams(): Promise<Team[]> {
  const { data, error } = await supabase
    .from('teams')
    .select('*')
    .eq('is_open', true)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getMentors(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('is_mentor', true)
    .order('hackathons_won', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function getStats() {
  const [usersResult, hackathonsResult, teamsResult] = await Promise.all([
    supabase.from('users').select('id', { count: 'exact', head: true }),
    supabase.from('hackathons').select('id', { count: 'exact', head: true }),
    supabase.from('teams').select('id', { count: 'exact', head: true }),
  ]);

  return {
    users: usersResult.count || 0,
    hackathons: hackathonsResult.count || 0,
    teams: teamsResult.count || 0,
  };
}
