export interface GameRun {
  id: string;
  timestamp: number;
  timeMs: number;
  charCount: number;
  playerTag: string;
  levelId: string;
}

export interface GameStats {
  bestTimeMs: number | null;
  fewestChars: number | null;
  totalWins: number;
  completedLevels: Record<string, boolean>;
  levelBestTimes: Record<string, number>;
  history: GameRun[];
}

const STORAGE_KEY = 'frontkon_blame_ai_stats';

const DEFAULT_STATS: GameStats = {
  bestTimeMs: null,
  fewestChars: null,
  totalWins: 0,
  completedLevels: {},
  levelBestTimes: {},
  history: [],
};

export function getStoredStats(): GameStats {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATS;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATS,
      ...parsed,
      completedLevels: parsed.completedLevels || {},
      levelBestTimes: parsed.levelBestTimes || {},
      history: parsed.history || [],
    };
  } catch {
    return DEFAULT_STATS;
  }
}

export function saveRun(timeMs: number, charCount: number, playerTag = 'Senior Dev', levelId = 'level1'): GameStats {
  const current = getStoredStats();
  const newRun: GameRun = {
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    timestamp: Date.now(),
    timeMs,
    charCount,
    playerTag,
    levelId,
  };

  const bestTimeMs = current.bestTimeMs === null ? timeMs : Math.min(current.bestTimeMs, timeMs);
  const fewestChars = current.fewestChars === null ? charCount : Math.min(current.fewestChars, charCount);
  const history = [newRun, ...current.history].slice(0, 50);

  const levelBestTimes = {
    ...current.levelBestTimes,
    [levelId]: current.levelBestTimes[levelId] ? Math.min(current.levelBestTimes[levelId], timeMs) : timeMs,
  };

  const completedLevels = {
    ...current.completedLevels,
    [levelId]: true,
  };

  const updated: GameStats = {
    bestTimeMs,
    fewestChars,
    totalWins: current.totalWins + 1,
    completedLevels,
    levelBestTimes,
    history,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // LocalStorage quota or disabled fallback
  }

  return updated;
}

export function clearStats(): GameStats {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Ignore
  }
  return DEFAULT_STATS;
}

export function formatTime(ms: number | null): string {
  if (ms === null || ms === undefined) return '--:--';
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

export type PlayerTier = 'senior' | 'mid' | 'prompt_engineer';

export function getPlayerBadge(timeMs: number): {
  tier: PlayerTier;
  titleEn: string;
  titleCz: string;
  subEn: string;
  subCz: string;
  icon: string;
  color: string;
} {
  if (timeMs < 20000) {
    return {
      tier: 'senior',
      titleEn: 'Unreplaceable Senior Engineer',
      titleCz: 'Nenahraditelný Senior Inženýr',
      subEn: 'Job security: 100% (AI-proof)',
      subCz: 'Jistota práce: 100 % (AI tě nenahradí)',
      icon: '🏆',
      color: '#00D2B4',
    };
  }
  if (timeMs < 45000) {
    return {
      tier: 'mid',
      titleEn: 'Solid Mid-Level Dev',
      titleCz: 'Šikovný Mid-Level Dev',
      subEn: 'AI might take your job in 2038',
      subCz: 'AI tě možná nahradí v roce 2038',
      icon: '🥈',
      color: '#C4B5FD',
    };
  }
  return {
    tier: 'prompt_engineer',
    titleEn: 'Prompt Engineer',
    titleCz: 'Prompt Inženýr',
    subEn: 'Did you ask ChatGPT for the answer?',
    subCz: 'Ptal ses ChatGPT na odpověď, co?',
    icon: '🥉',
    color: '#FFB020',
  };
}
