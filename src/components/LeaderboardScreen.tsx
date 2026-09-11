import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
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
import { type GameRun, formatTime, getPlayerBadge } from '../utils/storage';
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

  const displayRuns = remoteRuns !== null ? remoteRuns : localRuns;
  const sortedRuns = [...displayRuns].sort((a, b) => a.timeMs - b.timeMs);

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇 1st';
    if (index === 1) return '🥈 2nd';
    if (index === 2) return '🥉 3rd';
    return `#${index + 1}`;
  };

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

          <OutreachLogo height={26} />
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
              fontWeight: 900,
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
            backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/698651938e6808536770fe17_dot-repeat-svg.svg")`,
            backgroundRepeat: 'repeat',
            borderRadius: '12px',
            border: '1px solid rgba(89, 81, 255, 0.35)',
            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.35)',
            overflow: 'hidden',
            mb: 3,
          }}
        >
          {sortedRuns.length === 0 ? (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="body1" sx={{ color: '#000000', fontStyle: 'italic', fontWeight: 600 }}>
                {t.noRunsYet}
              </Typography>
            </Box>
          ) : (
            <TableContainer sx={{ maxHeight: { xs: '65vh', sm: '70vh', md: 680, xl: 800 }, backgroundColor: 'transparent' }}>
              <Table stickyHeader size="medium">
                <TableHead
                  sx={{
                    '& .MuiTableCell-head': {
                      backgroundColor: '#1f1f1f',
                      borderBottom: '1px solid #2e2e2e !important',
                      borderColor: '#2e2e2e !important',
                      color: '#FFFFFF',
                      fontWeight: 800,
                      fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1.02rem', lg: '1.08rem' },
                      py: { xs: 1.2, sm: 1.6, md: 2, lg: 2.2 },
                      px: { xs: 1.5, sm: 2.5, md: 3, lg: 4 },
                      letterSpacing: '0.02em',
                    },
                  }}
                >
                  <TableRow>
                    <TableCell width="44%">{t.colPlayer}</TableCell>
                    <TableCell width="36%">{t.colRating}</TableCell>
                    <TableCell width="20%" align="right">{t.colTime}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRuns.map((run, idx) => {
                    const badge = getPlayerBadge(run.timeMs);
                    const badgeStyles =
                      badge.tier === 'senior'
                        ? { bg: 'rgba(0, 210, 180, 0.12)', color: '#007A68', border: '1px solid rgba(0, 210, 180, 0.35)' }
                        : badge.tier === 'mid'
                        ? { bg: 'rgba(89, 81, 255, 0.1)', color: '#3028A1', border: '1px solid rgba(89, 81, 255, 0.3)' }
                        : { bg: 'rgba(255, 176, 32, 0.14)', color: '#8A5200', border: '1px solid rgba(255, 176, 32, 0.35)' };

                    return (
                      <TableRow
                        key={run.id}
                        sx={{
                          '& td': {
                            borderColor: 'rgba(89, 81, 255, 0.14)',
                            color: '#000000',
                            fontSize: { xs: '0.88rem', sm: '1rem', md: '1.08rem', lg: '1.15rem' },
                            py: { xs: 1.2, sm: 1.6, md: 2 },
                            px: { xs: 1.5, sm: 2.5, md: 3, lg: 4 },
                          },
                          backgroundColor:
                            idx === 0
                              ? 'rgba(0, 210, 180, 0.12)'
                              : idx === 1
                              ? 'rgba(89, 81, 255, 0.08)'
                              : idx === 2
                              ? 'rgba(255, 176, 32, 0.1)'
                              : 'transparent',
                          '&:hover': {
                            backgroundColor: 'rgba(89, 81, 255, 0.12)',
                          },
                        }}
                      >
                        <TableCell sx={{ fontWeight: 700, color: '#000000' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 1.8 } }}>
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 800,
                                fontSize: { xs: '0.92rem', sm: '1.05rem', md: '1.16rem' },
                                color: idx === 0 ? '#007A68' : idx === 1 ? '#3028A1' : idx === 2 ? '#945800' : '#444444',
                                minWidth: { xs: 32, sm: 42 },
                                flexShrink: 0,
                              }}
                            >
                              {getRankBadge(idx)}
                            </Typography>
                            <Typography
                              component="span"
                              sx={{
                                fontWeight: 700,
                                color: '#000000',
                                fontSize: 'inherit',
                              }}
                            >
                              {run.playerTag}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip
                            icon={<span style={{ fontSize: '1rem', marginLeft: '6px' }}>{badge.icon}</span>}
                            label={
                              <Box component="span">
                                <Box component="span" sx={{ display: { xs: 'none', md: 'inline' } }}>
                                  {language === 'cz' ? badge.titleCz : badge.titleEn}
                                </Box>
                                <Box component="span" sx={{ display: { xs: 'inline', md: 'none' } }}>
                                  {badge.tier === 'senior'
                                    ? (language === 'cz' ? 'Senior Inženýr' : 'Senior Dev')
                                    : badge.tier === 'mid'
                                    ? 'Mid-Level'
                                    : (language === 'cz' ? 'Prompt Inž.' : 'Prompt Eng')}
                                </Box>
                              </Box>
                            }
                            size="small"
                            sx={{
                              height: { xs: 24, sm: 26, md: 30 },
                              fontSize: { xs: '0.74rem', sm: '0.8rem', md: '0.86rem' },
                              fontWeight: 700,
                              borderRadius: '6px',
                              bgcolor: badgeStyles.bg,
                              color: badgeStyles.color,
                              border: badgeStyles.border,
                              '& .MuiChip-icon': {
                                margin: 0,
                              },
                              '& .MuiChip-label': {
                                px: { xs: 0.8, sm: 1.2 },
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell
                          align="right"
                          sx={{
                            fontFamily: 'ui-monospace, monospace',
                            color: '#007A68',
                            fontWeight: 800,
                            fontSize: { xs: '0.92rem', sm: '1.05rem', md: '1.22rem', lg: '1.32rem' },
                          }}
                        >
                          {formatTime(run.timeMs)}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      </Container>
    </Box>
  );
};
