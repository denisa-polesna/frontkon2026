import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { FailBotSpeechCard } from './FailBotSpeechCard';
import type { translations } from '../utils/i18n';

interface ExitConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirmQuit: () => void;
  playerName?: string;
  completedRoundsCount: number;
  t: typeof translations['en'];
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({
  open,
  onCancel,
  onConfirmQuit,
  playerName = 'Senior Dev',
  completedRoundsCount,
  t,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(20, 20, 28, 0.98)',
            backdropFilter: 'blur(16px)',
          },
        },
        paper: {
          sx: {
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(89, 81, 255, 0.25)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            p: { xs: 2.5, sm: 3.2 },
            textAlign: 'center',
            position: 'relative',
            m: { xs: '14px', sm: 2 },
            width: { xs: 'calc(100% - 28px)', sm: '100%' },
          },
        },
      }}
    >
      <IconButton
        onClick={onCancel}
        size="small"
        aria-label="close"
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          color: '#666666',
          backgroundColor: '#f5f4ff',
          width: 32,
          height: 32,
          '&:hover': {
            backgroundColor: '#e6e4ff',
            color: '#120042',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <DialogContent sx={{ p: 0, pt: 0.5 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            mb: 2,
            px: { xs: 4, sm: 5 },
          }}
        >
          {t.exitConfirmTitle}
        </Typography>

        {/* FailBot Speech Card */}
        <FailBotSpeechCard
          message={t.exitConfirmDevbot.replace('{name}', playerName || 'Senior Dev')}
          name="FailBot-404"
          sx={{ mb: 2 }}
        />

        {/* Leaderboard Progress Note */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
            p: 1.4,
            textAlign: 'left',
            mb: 2.5,
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 18, color: '#4B5563', flexShrink: 0 }} />
          <Typography
            variant="caption"
            sx={{
              color: '#374151',
              fontSize: '0.8rem',
              lineHeight: 1.35,
              fontWeight: 600,
            }}
          >
            {completedRoundsCount > 0
              ? `${t.exitConfirmLeaderboardInfo} (${completedRoundsCount}/5)`
              : t.exitConfirmNoRoundsInfo}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 0, display: 'flex', flexDirection: 'column', gap: 1 }}>
        {/* Primary Action: Stay & keep fighting */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onCancel}
          sx={{
            height: 44,
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.92rem',
            borderRadius: '6px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#3028a1',
              boxShadow: 'none',
            },
          }}
        >
          {t.exitConfirmStayBtn}
        </Button>

        {/* Secondary Action: Give up & exit (same style as Leaderboard button) */}
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={onConfirmQuit}
          sx={{
            height: 44,
            fontSize: '0.92rem',
            fontWeight: 600,
            borderRadius: '6px',
            borderColor: 'rgba(89, 81, 255, 0.35)',
            color: '#120042',
            backgroundColor: 'transparent',
            textTransform: 'none',
            transition: 'all 0.25s ease',
            '&:hover': {
              borderColor: '#5951ff',
              backgroundColor: '#5951ff',
              color: '#FFFFFF',
            },
          }}
        >
          {t.exitConfirmQuitBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
