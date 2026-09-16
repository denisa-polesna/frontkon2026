import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
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
        paper: {
          sx: {
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(89, 81, 255, 0.25)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            p: { xs: 2.5, sm: 3.5 },
            textAlign: 'center',
            position: 'relative',
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

      <DialogContent sx={{ p: 0, pt: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            mb: 2,
          }}
        >
          {t.failedModalTitle}
        </Typography>

        {/* FailBot Speech Card */}
        <FailBotSpeechCard
          message={t.verifyFailedDevbot.replace('{name}', playerName || 'Senior Dev')}
          name="FailBot-404"
          sx={{ mb: 2.5 }}
        />
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
