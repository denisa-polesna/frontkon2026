import React, { useEffect, useState, useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Tooltip,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { OutreachLogo } from './OutreachLogo';
import { type GameRun, formatDuration } from '../utils/storage';
import { fetchRemoteRuns, isSupabaseConfigured } from '../utils/leaderboardApi';
import type { Language, translations } from '../utils/i18n';

interface LeaderboardScreenProps {
  runs: GameRun[];
  onBack: () => void;
  onStartCampaign?: () => void;
  onClearLeaderboard?: () => void;
  language: Language;
  onToggleLanguage: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  t: typeof translations['en'];
}

export const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({
  runs: localRuns,
  onBack,
  language,
  onToggleLanguage,
  soundEnabled,
  onToggleSound,
  t,
}) => {
  const [remoteRuns, setRemoteRuns] = useState<GameRun[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    if (isSupabaseConfigured) {
      Promise.resolve().then(() => {
        if (!cancelled) setLoading(true);
      });
      fetchRemoteRuns().then((data) => {
        if (!cancelled) {
          if (data) setRemoteRuns(data);
          setLoading(false);
        }
      });
    }
    return () => {
      cancelled = true;
    };
  }, []);

  const displayRuns = useMemo(() => {
    return [...(localRuns || []), ...(remoteRuns || [])];
  }, [localRuns, remoteRuns]);

  const aggregatedPlayers = useMemo(() => {
    const playerMap: Record<
      string,
      {
        playerName: string;
        levelTimes: Record<string, number>;
        lastUpdated: number;
      }
    > = {};

    for (const run of displayRuns) {
      const name = (run.playerTag || 'Senior Dev').trim();
      if (!playerMap[name]) {
        playerMap[name] = {
          playerName: name,
          levelTimes: {},
          lastUpdated: run.timestamp,
        };
      }
      if (run.levelId && run.levelId !== 'uncompleted') {
        const currentBest = playerMap[name].levelTimes[run.levelId];
        if (currentBest === undefined || run.timeMs < currentBest) {
          playerMap[name].levelTimes[run.levelId] = run.timeMs;
        }
      }
      playerMap[name].lastUpdated = Math.max(playerMap[name].lastUpdated, run.timestamp);
    }

    return Object.values(playerMap)
      .map((player) => {
        const completedCount = Object.keys(player.levelTimes).length;
        const totalTimeMs = Object.values(player.levelTimes).reduce((sum, t) => sum + t, 0);
        return {
          playerName: player.playerName,
          completedCount,
          totalTimeMs,
          lastUpdated: player.lastUpdated,
        };
      })
      .filter((player) => player.completedCount > 0)
      .sort((a, b) => {
        // 1. More completed rounds ranks first
        if (b.completedCount !== a.completedCount) {
          return b.completedCount - a.completedCount;
        }
        // 2. Faster total time ranks first
        return a.totalTimeMs - b.totalTimeMs;
      });
  }, [displayRuns]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#120042',
        backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/69e7e28ad18979a7c4351f30_Hero%20Frame.svg")`,
        backgroundPosition: '50% 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'cover', md: '100% auto' },
      }}
    >
      {/* Top Navbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 2, sm: 4 },
          py: { xs: 1.6, sm: 2.2 },
          backgroundColor: '#1f1f1f',
          borderBottom: '1px solid #2e2e2e',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.6 }}>
          <Button
            size="small"
            variant="outlined"
            startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
            onClick={onBack}
            sx={{
              borderColor: '#3a3a3a',
              color: '#FFFFFF',
              backgroundColor: '#282828',
              fontSize: '0.8rem',
              fontWeight: 700,
              minWidth: { xs: 36, sm: 84 },
              px: { xs: 1.4, sm: 2 },
              py: '6px',
              borderRadius: '6px',
              '&:hover': {
                borderColor: '#5951ff',
                backgroundColor: '#5951ff',
                color: '#FFFFFF',
              },
            }}
          >
            {language === 'cz' ? 'Zpět' : 'Back'}
          </Button>

          <Box
            onClick={onBack}
            sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease',
              '&:hover': { opacity: 0.8 },
            }}
          >
            <OutreachLogo height={26} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={soundEnabled ? t.muteTooltip : t.unmuteTooltip}>
            <IconButton
              size="small"
              onClick={onToggleSound}
              sx={{
                color: soundEnabled ? '#FFFFFF' : '#888888',
                backgroundColor: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '6px',
                width: 32,
                height: 32,
                '&:hover': {
                  borderColor: '#5951ff',
                  backgroundColor: '#5951ff',
                  color: '#FFFFFF',
                },
              }}
            >
              {soundEnabled ? <VolumeUpIcon sx={{ fontSize: 16 }} /> : <VolumeOffIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Tooltip>

          <Button
            size="small"
            variant="outlined"
            onClick={onToggleLanguage}
            sx={{
              minWidth: 46,
              px: 1,
              py: '3px',
              height: 32,
              fontSize: '0.74rem',
              fontWeight: 700,
              borderColor: '#3a3a3a',
              backgroundColor: '#282828',
              color: '#FFFFFF',
              borderRadius: '6px',
              '&:hover': {
                borderColor: '#5951ff',
                backgroundColor: '#5951ff',
                color: '#FFFFFF',
              },
            }}
          >
            {language === 'cz' ? 'CZ' : 'EN'}
          </Button>
        </Box>
      </Box>

      {/* Main Container */}
      <Container
        maxWidth={false}
        sx={{
          flex: 1,
          py: { xs: 2.5, sm: 4, md: 5 },
          px: { xs: 1.5, sm: 3, md: 5, lg: 8, xl: 12 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        {/* Title Header */}
        <Box sx={{ textAlign: 'center', mb: { xs: 2.5, sm: 3.5 } }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.8rem', sm: '2.5rem', md: '3rem' },
              color: '#FFFFFF',
              letterSpacing: '-0.02em',
            }}
          >
            {t.leaderboardTitle}
          </Typography>
          {loading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
              <CircularProgress size={18} sx={{ color: '#5951ff' }} />
            </Box>
          )}
        </Box>

        {/* Leaderboard Table Card */}
        <Box
          sx={{
            width: '100%',
            maxWidth: { xs: '100%', sm: '100%', md: 1050, lg: 1320, xl: 1600 },
            backgroundColor: '#FFFFFF',
            borderRadius: '12px',
            border: '1px solid #2e2e2e',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {aggregatedPlayers.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: '#000000', fontStyle: 'italic', fontWeight: 600 }}>
                {t.noRunsYet}
              </Typography>
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: { xs: '65vh', sm: '70vh', md: 680, xl: 800 }, backgroundColor: '#FFFFFF' }}>
              <Table
                stickyHeader
                size="medium"
                sx={{
                  '& .MuiTableCell-stickyHeader': {
                    backgroundColor: '#5951ff',
                    borderBottom: '1px solid #4a42e8 !important',
                  },
                }}
              >
                <TableHead
                  sx={{
                    '& .MuiTableCell-head': {
                      backgroundColor: '#5951ff',
                      borderBottom: '1px solid #4a42e8 !important',
                      borderColor: '#4a42e8 !important',
                      color: '#FFFFFF',
                      fontWeight: 600,
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.98rem' },
                      py: { xs: 1.2, sm: 1.6, md: 1.8 },
                      px: { xs: 1.5, sm: 2.5, md: 3, lg: 4 },
                      letterSpacing: '0.01em',
                    },
                  }}
                >
                  <TableRow sx={{ '& th': { borderBottom: '1px solid #4a42e8 !important', borderColor: '#4a42e8 !important' } }}>
                    <TableCell width="14%" sx={{ borderBottom: '1px solid #4a42e8 !important', borderColor: '#4a42e8 !important' }}>{t.colRank || 'Místo'}</TableCell>
                    <TableCell width="40%" sx={{ borderBottom: '1px solid #4a42e8 !important', borderColor: '#4a42e8 !important' }}>{t.colPlayer}</TableCell>
                    <TableCell width="26%" sx={{ borderBottom: '1px solid #4a42e8 !important', borderColor: '#4a42e8 !important' }}>{t.colRounds || t.colRating || 'Dokončená kola'}</TableCell>
                    <TableCell width="20%" sx={{ borderBottom: '1px solid #4a42e8 !important', borderColor: '#4a42e8 !important' }}>{t.colTime}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {aggregatedPlayers.map((player, idx) => (
                    <TableRow
                      key={player.playerName}
                      sx={{
                        '& td': {
                          borderColor: '#e2e0ed',
                          color: '#1f1f1f',
                          fontSize: { xs: '0.88rem', sm: '0.96rem', md: '1.05rem' },
                          py: { xs: 1.2, sm: 1.5, md: 1.6 },
                          px: { xs: 1.5, sm: 2.5, md: 3, lg: 4 },
                        },
                        backgroundColor: '#FFFFFF',
                        '&:hover': {
                          backgroundColor: '#fbfaff',
                        },
                      }}
                    >
                      <TableCell sx={{ fontWeight: 500, color: '#444444' }}>
                        {idx + 1}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 500, color: '#1f1f1f' }}>
                        {player.playerName}
                      </TableCell>
                      <TableCell sx={{ fontWeight: 400, color: '#333333' }}>
                        <Typography
                          component="span"
                          sx={{
                            color: '#333333',
                            fontWeight: 400,
                            fontSize: 'inherit',
                          }}
                        >
                          {player.completedCount} / 5
                        </Typography>
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: 'ui-monospace, monospace',
                          color: '#1f1f1f',
                          fontWeight: 500,
                          fontSize: { xs: '0.92rem', sm: '1rem', md: '1.08rem' },
                        }}
                      >
                        {formatDuration(player.totalTimeMs, language)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </Box>
  );
};
