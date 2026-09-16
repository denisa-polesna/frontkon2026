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
      `${SUPABASE_URL}/rest/v1/leaderboard?select=*&order=created_at.desc&limit=1000`,
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
    // Fetch rows for this player ordered by creation time descending
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?or=(player_name.ilike.${encoded},player_tag.ilike.${encoded})&select=id,level_id,time_ms,timestamp,created_at&order=id.desc&limit=100`,
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

    const rows: { id: number; level_id: string; time_ms: number; timestamp?: number; created_at?: string }[] = await res.json();
    if (!Array.isArray(rows) || rows.length === 0) {
      return false;
    }

    // 1. If player has any completed level (with time > 0 and valid level), the name is taken permanently
    const hasCompletedRound = rows.some(
      (r) => r.level_id && r.level_id !== 'uncompleted' && r.level_id !== 'cancelled' && r.time_ms > 0
    );
    if (hasCompletedRound) {
      return true;
    }

    // 2. Check the most recent row: if it was cancelled, the reservation was released
    const latestRow = rows[0];
    if (latestRow.level_id === 'cancelled') {
      return false;
    }

    // 3. If there is an active reservation ('uncompleted'), check if it's recent (< 15 mins)
    const rowTime = latestRow.timestamp || (latestRow.created_at ? new Date(latestRow.created_at).getTime() : 0);
    const fifteenMinutesAgo = Date.now() - 15 * 60 * 1000;
    if (rowTime > fifteenMinutesAgo) {
      return true;
    }

    // Expired reservation (> 15 mins without completion)
    return false;
  } catch (err) {
    console.warn('Network error checking player name in Supabase:', err);
    return false;
  }
}

export async function reservePlayerName(name: string): Promise<boolean> {
  const trimmed = name.trim();
  if (!trimmed) return false;
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
        time_ms: 0,
        char_count: 0,
        player_name: trimmed,
        player_tag: trimmed,
        level_id: 'uncompleted',
        timestamp: Date.now(),
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('Network error reserving player name in Supabase:', err);
    return false;
  }
}

export async function releasePlayerReservation(name: string): Promise<boolean> {
  const trimmed = name.trim();
  if (!trimmed) return false;
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
        time_ms: 0,
        char_count: 0,
        player_name: trimmed,
        player_tag: trimmed,
        level_id: 'cancelled',
        timestamp: Date.now(),
      }),
    });

    return res.ok;
  } catch (err) {
    console.warn('Network error releasing player reservation in Supabase:', err);
    return false;
  }
}

export interface BoothRecord {
  levelId: string;
  playerName: string;
  timeMs: number;
  charCount?: number;
}

export async function fetchBoothRecords(): Promise<Record<string, BoothRecord>> {
  if (!isSupabaseConfigured || !SUPABASE_URL || !SUPABASE_KEY) {
    return {};
  }

  const records: Record<string, BoothRecord> = {};

  try {
    // Fast query directly on existing leaderboard table ordered by time_ms
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/leaderboard?select=level_id,player_name,player_tag,time_ms,char_count&time_ms=gt.0&order=time_ms.asc&limit=100`,
      {
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (res.ok) {
      const rows = await res.json();
      if (Array.isArray(rows)) {
        for (const row of rows) {
          const lid = row.level_id;
          if (lid && lid !== 'uncompleted' && !records[lid] && row.time_ms > 0) {
            records[lid] = {
              levelId: lid,
              playerName: row.player_name || row.player_tag || 'Senior Dev',
              timeMs: row.time_ms,
              charCount: row.char_count,
            };
          }
        }
      }
    }
  } catch (err) {
    console.warn('Network error fetching booth records from Supabase:', err);
  }

  return records;
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
