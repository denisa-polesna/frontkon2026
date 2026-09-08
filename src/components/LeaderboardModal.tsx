import React from 'react';
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
} from '@mui/material';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { type GameRun, formatTime } from '../utils/storage';
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
  runs,
  onClearLeaderboard,
  t,
}) => {
  // Sort runs by time ascending
  const sortedRuns = [...runs].sort((a, b) => a.timeMs - b.timeMs);

  const getRankBadge = (index: number) => {
    if (index === 0) return '🥇 1st';
    if (index === 1) return '🥈 2nd';
    if (index === 2) return '🥉 3rd';
    return `#${index + 1}`;
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
            backgroundColor: '#121628',
            border: '1px solid #232842',
            borderRadius: 3,
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
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '8px',
              backgroundColor: 'rgba(110, 63, 243, 0.2)',
              color: '#C4B5FD',
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
            <Typography variant="caption" sx={{ color: '#8892B0' }}>
              {t.leaderboardSub}
            </Typography>
          </Box>
        </Box>

        <Chip
          label={t.runsCount.replace('{count}', runs.length.toString())}
          size="small"
          sx={{
            backgroundColor: '#1C223D',
            color: '#C4B5FD',
            fontWeight: 700,
            fontSize: '0.72rem',
          }}
        />
      </DialogTitle>

      <Divider sx={{ borderColor: '#232842' }} />

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
                <TableRow sx={{ '& th': { borderColor: '#232842', color: '#8892B0', fontWeight: 700 } }}>
                  <TableCell width="12%">{t.colRank}</TableCell>
                  <TableCell width="38%">{t.colPlayer}</TableCell>
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
                      '& td': { borderColor: '#1F243B', color: '#FFF', fontSize: '0.84rem' },
                      backgroundColor: idx === 0 ? 'rgba(0, 210, 180, 0.06)' : 'transparent',
                    }}
                  >
                    <TableCell sx={{ fontWeight: 700, color: idx === 0 ? '#00D2B4' : '#C4B5FD' }}>
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
                          bgcolor: 'rgba(110, 63, 243, 0.15)',
                          color: '#C4B5FD',
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: '#00D2B4', fontWeight: 700 }}>
                      {formatTime(run.timeMs)}
                    </TableCell>
                    <TableCell sx={{ fontFamily: 'monospace', color: '#8892B0' }}>
                      {run.charCount}c
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DialogContent>

      <Divider sx={{ borderColor: '#232842' }} />

      <DialogActions sx={{ p: 2, justifyContent: 'space-between' }}>
        <Button
          size="small"
          startIcon={<DeleteOutlinedIcon />}
          onClick={onClearLeaderboard}
          sx={{
            color: '#B35D67',
            fontSize: '0.74rem',
            '&:hover': {
              backgroundColor: 'rgba(255, 76, 97, 0.1)',
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
            backgroundColor: '#6E3FF3',
            fontSize: '0.82rem',
          }}
        >
          {t.closeBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
