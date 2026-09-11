import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
} from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import { type GameRun, formatTime } from '../utils/storage';
import { fetchRemoteRuns, clearRemoteRuns, isSupabaseConfigured } from '../utils/leaderboardApi';
import type { translations } from '../utils/i18n';

interface LeaderboardModalProps {
  open: boolean;
  onClose: () => void;
  runs: GameRun[];
  onClearLeaderboard: () => void;
  t: typeof translations['en'];
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  open,
  onClose,
  runs: localRuns,
  onClearLeaderboard,
  t,
}) => {
  const [remoteRuns, setRemoteRuns] = useState<GameRun[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let cancelled = false;
    if (open && isSupabaseConfigured) {
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
  }, [open]);

  // Use remote runs if available and configured, otherwise local runs
  const displayRuns = remoteRuns !== null ? remoteRuns : localRuns;
  const sortedRuns = [...displayRuns].sort((a, b) => a.timeMs - b.timeMs);

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇 1st';
    if (index === 1) return '🥈 2nd';
    if (index === 2) return '🥉 3rd';
    return `#${index + 1}`;
  };

  const handleClear = () => {
    if (isSupabaseConfigured) {
      clearRemoteRuns();
      setRemoteRuns([]);
    }
    onClearLeaderboard();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#160844',
            border: '1px solid rgba(179, 176, 255, 0.25)',
            borderRadius: 2.5,
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
          },
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2.5,
          pb: 1.5,
          backgroundColor: '#1c0c52',
          borderBottom: '1px solid rgba(179, 176, 255, 0.15)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: 'rgba(89, 81, 255, 0.25)',
              color: '#b3b0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LeaderboardIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF', fontSize: '1.1rem' }}>
              {t.leaderboardTitle}
            </Typography>
            <Typography variant="caption" sx={{ color: '#b3b0ff', display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {t.leaderboardSub}
              {isSupabaseConfigured && (
                <Chip
                  icon={<CloudDoneOutlinedIcon sx={{ fontSize: '11px !important', color: '#00D2B4' }} />}
                  label="Live Cloud"
                  size="small"
                  sx={{
                    height: 16,
                    fontSize: '0.6rem',
                    fontWeight: 700,
                    backgroundColor: 'rgba(0, 210, 180, 0.15)',
                    color: '#00D2B4',
                    border: '1px solid rgba(0, 210, 180, 0.3)',
                    ml: 0.5,
                  }}
                />
              )}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {loading && <CircularProgress size={16} sx={{ color: '#5951ff' }} />}
          <Chip
            label={t.runsCount.replace('{count}', displayRuns.length.toString())}
            size="small"
            sx={{
              backgroundColor: '#26136d',
              color: '#FFFFFF',
              fontWeight: 700,
              fontSize: '0.72rem',
            }}
          />
        </Box>
      </DialogTitle>

      <DialogContent sx={{ p: 2 }}>
        {sortedRuns.length === 0 ? (
          <Box sx={{ py: 6, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: '#828BAA', fontStyle: 'italic' }}>
              {t.noRunsYet}
            </Typography>
          </Box>
        ) : (
          <TableContainer sx={{ maxHeight: 380 }}>
            <Table size="small">
              <TableHead>
                <TableRow sx={{ '& th': { borderColor: 'rgba(179, 176, 255, 0.15)', color: '#b3b0ff', fontWeight: 700 } }}>
                  <TableCell width="14%">{t.colRank}</TableCell>
                  <TableCell width="36%">{t.colPlayer}</TableCell>
                  <TableCell width="20%">Level</TableCell>
                  <TableCell width="18%">{t.colTime}</TableCell>
                  <TableCell width="12%">{t.colGolf}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedRuns.map((run, idx) => (
                  <TableRow
                    key={run.id}
                    sx={{
                      '& td': { borderColor: 'rgba(179, 176, 255, 0.1)', color: '#FFF', fontSize: '0.84rem' },
                      backgroundColor: idx === 0 ? 'rgba(0, 210, 180, 0.08)' : 'transparent',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700, color: idx === 0 ? '#00D2B4' : '#b3b0ff' }}>
                      {getRankBadge(idx)}
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600 }}>{run.playerTag}</TableCell>
                    <TableCell>
                      <Chip
                        label={
                          run.levelId === 'level1'
                            ? 'Level 1'
                            : run.levelId === 'level2'
                            ? 'Level 2'
                            : 'Level 3'
                        }
                        size="small"
                        sx={{
                          height: 18,
                          fontSize: '0.64rem',
                          fontWeight: 700,
                          bgcolor: 'rgba(89, 81, 255, 0.2)',
                          color: '#b3b0ff',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'ui-monospace, monospace', color: '#00D2B4', fontWeight: 700 }}>
                      {formatTime(run.timeMs)}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'ui-monospace, monospace', color: '#8E95B2' }}>
                      {run.charCount}c
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: 'rgba(179, 176, 255, 0.15)' }} />

      <DialogActions sx={{ p: 2, justifyContent: 'space-between', backgroundColor: '#14063e' }}>
        <Button
          size="small"
          startIcon={<DeleteOutlinedIcon />}
          onClick={handleClear}
          sx={{
            color: '#FF7081',
            fontSize: '0.74rem',
            '&:hover': {
              backgroundColor: 'rgba(255, 76, 97, 0.15)',
            },
          }}
        >
          {t.resetScoresBtn}
        </Button>

        <Button
          variant="contained"
          size="small"
          onClick={onClose}
          sx={{
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            fontSize: '0.82rem',
            fontWeight: 600,
            borderRadius: '6px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#3028a1',
              boxShadow: 'none',
            },
          }}
        >
          {t.closeBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
