import type { GameRun } from './storage';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;

const SUPABASE_KEY = (import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as string | undefined;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

interface SupabaseLeaderboardRow {
  id: number | string;
  created_at?: string;
  timestamp?: number;
  time_ms: number;
  char_count: number;
  player_tag?: string;
  player_name?: string;
  level_id: string;
}

export async function fetchRemoteRuns(): Promise<GameRun[] | null> {
  if (!isSupabaseConfigured || !SUPABASE_URL || !SUPABASE_KEY) {
    return null;
  }

  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?select=*&order=time_ms.asc&limit=50`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.warn('Failed to fetch remote leaderboard from Supabase:', res.statusText);
      return null;
    }

    const rows: SupabaseLeaderboardRow[] = await res.json();
    return rows.map((row) => ({
      id: String(row.id),
      timestamp: row.timestamp || (row.created_at ? new Date(row.created_at).getTime() : Date.now()),
      timeMs: row.time_ms,
      charCount: row.char_count,
      playerTag: row.player_tag || row.player_name || 'Senior Dev',
      levelId: row.level_id,
    }));
  } catch (err) {
    console.warn('Network error fetching Supabase leaderboard:', err);
    return null;
  }
}

export async function submitRemoteRun(run: {
  timeMs: number;
  charCount: number;
  playerTag: string;
  levelId: string;
}): Promise<boolean> {
  if (!isSupabaseConfigured || !SUPABASE_URL || !SUPABASE_KEY) {
    return false;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify({
        time_ms: run.timeMs,
        char_count: run.charCount,
        player_name: run.playerTag,
        player_tag: run.playerTag,
        level_id: run.levelId,
        timestamp: Date.now(),
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('Network error saving to Supabase:', err);
    return false;
  }
}

export async function isPlayerNameTaken(name: string): Promise<boolean> {
  const trimmed = name.trim();
  if (!trimmed) return false;
  if (!isSupabaseConfigured || !SUPABASE_URL || !SUPABASE_KEY) {
    return false;
  }

  try {
    const sanitized = trimmed.replace(/"/g, '');
    const encoded = encodeURIComponent(`"${sanitized}"`);
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?or=(player_name.ilike.${encoded},player_tag.ilike.${encoded})&select=id&limit=1`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (!res.ok) {
      console.warn('Failed to check name availability on Supabase:', res.statusText);
      return false;
    }

    const rows = await res.json();
    return Array.isArray(rows) && rows.length > 0;
  } catch (err) {
    console.warn('Network error checking player name in Supabase:', err);
    return false;
  }
}

export async function clearRemoteRuns(): Promise<boolean> {
  if (!isSupabaseConfigured || !SUPABASE_URL || !SUPABASE_KEY) {
    return false;
  }

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/leaderboard?id=gt.0`, {
      method: 'DELETE',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    return res.ok;
  } catch (err) {
    console.warn('Network error clearing Supabase:', err);
    return false;
  }
}
