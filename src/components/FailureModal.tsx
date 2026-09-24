import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import { FailBotSpeechCard } from './FailBotSpeechCard';
import type { translations } from '../utils/i18n';

interface FailureModalProps {
  open: boolean;
  onClose: () => void;
  playerName?: string;
  t: typeof translations['en'];
}

export const FailureModal: React.FC<FailureModalProps> = ({
  open,
  onClose,
  playerName = 'Senior Dev',
  t,
}) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
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
            p: { xs: 2.5, sm: 3.5 },
            textAlign: 'center',
            position: 'relative',
            m: { xs: '14px', sm: 2 },
            width: { xs: 'calc(100% - 28px)', sm: '100%' },
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
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
          {t.failedModalTitle}
        </Typography>

        {/* FailBot Speech Card */}
        <FailBotSpeechCard
          message={t.verifyFailedDevbot.replace('{name}', playerName || 'Senior Dev')}
          name="FailBot-404"
          sx={{ mb: 2 }}
        />

        {/* Timer is still running notice */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.8,
            backgroundColor: '#F3F4F6',
            borderRadius: '8px',
            py: 1.1,
            px: 1.6,
            mb: 2.5,
          }}
        >
          <TimerOutlinedIcon sx={{ fontSize: 18, color: '#4B5563', flexShrink: 0 }} />
          <Typography
            sx={{
              color: '#374151',
              fontSize: '0.84rem',
              fontWeight: 600,
            }}
          >
            {t.failedModalTimerRunning}
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 0 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onClose}
          sx={{
            height: 48,
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.95rem',
            borderRadius: '6px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#3028a1',
              boxShadow: 'none',
            },
          }}
        >
          {t.failedModalBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
