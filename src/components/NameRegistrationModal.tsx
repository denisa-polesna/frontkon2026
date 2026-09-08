import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  TextField,
  Chip,
} from '@mui/material';
import BadgeIcon from '@mui/icons-material/Badge';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import type { translations } from '../utils/i18n';

interface NameRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  initialName?: string;
  t: typeof translations['en'];
}

export const NameRegistrationModal: React.FC<NameRegistrationModalProps> = ({
  open,
  onClose,
  onSubmit,
  initialName = '',
  t,
}) => {
  const [name, setName] = useState<string>(initialName);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const finalName = name.trim() || 'Senior Dev';
    onSubmit(finalName);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#121628',
            border: '2px solid #6E3FF3',
            borderRadius: 3,
            boxShadow: '0 0 50px rgba(110, 63, 243, 0.4)',
            overflow: 'hidden',
          },
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ p: 2.5, pb: 1, textAlign: 'center' }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              backgroundColor: 'rgba(110, 63, 243, 0.2)',
              border: '2px solid #6E3FF3',
              color: '#C4B5FD',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}
          >
            <BadgeIcon sx={{ fontSize: 28 }} />
          </Box>

          <Typography variant="h6" sx={{ fontWeight: 800, color: '#FFF', fontSize: '1.2rem' }}>
            {t.nameModalTitle}
          </Typography>
          <Typography variant="caption" sx={{ color: '#8892B0', display: 'block', mt: 0.5, fontSize: '0.78rem' }}>
            {t.nameModalSubtitle}
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ p: 2.5, pt: 1 }}>
          {/* Sassy DevBot preview bubble */}
          <Box
            sx={{
              backgroundColor: '#0D101C',
              p: 1.5,
              borderRadius: 2,
              border: '1px solid #232842',
              mb: 2.5,
              display: 'flex',
              alignItems: 'center',
              gap: 1.2,
            }}
          >
            <SmartToyIcon sx={{ color: '#FF4C61', fontSize: 24, flexShrink: 0 }} />
            <Typography variant="caption" sx={{ color: '#C8D0E5', fontStyle: 'italic', fontSize: '0.76rem' }}>
              &ldquo;{t.menuDevbotTaunt.replace('{name}', name.trim() || 'human')}&rdquo;
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="caption" sx={{ color: '#C4B5FD', fontWeight: 700 }}>
                {t.nameInputLabel}:
              </Typography>
              <Chip label="Required for Leaderboard" size="small" sx={{ fontSize: '0.62rem', height: 18 }} />
            </Box>

            <TextField
              autoFocus
              size="small"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.nameInputPlaceholder}
              slotProps={{
                input: {
                  sx: {
                    backgroundColor: '#0F1220',
                    color: '#FFF',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                  },
                },
              }}
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              py: 1.4,
              backgroundColor: '#6E3FF3',
              color: '#FFF',
              fontWeight: 800,
              fontSize: '1rem',
              '&:hover': {
                backgroundColor: '#572BD4',
              },
            }}
          >
            {t.nameSubmitBtn}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
