import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { translations } from '../utils/i18n';

interface NameRegistrationModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
  t: typeof translations['en'];
}

export const NameRegistrationModal: React.FC<NameRegistrationModalProps> = ({
  open,
  onClose,
  onSubmit,
  t,
}) => {
  const [prevOpen, setPrevOpen] = useState(open);
  const [name, setName] = useState<string>('');

  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setName('');
    }
  }

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
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(89, 81, 255, 0.25)',
            borderRadius: '16px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), 0 2px 16px rgba(0, 0, 0, 0.08)',
            overflow: 'hidden',
            p: { xs: 2.5, sm: 3.5 },
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

      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ p: 0 }}>
          {/* Header */}
          <Box sx={{ mb: 2.2, pr: 3 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: '#120042',
                fontSize: { xs: '1.25rem', sm: '1.45rem' },
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              {t.nameModalTitle}
            </Typography>
          </Box>

          {/* Form Fields */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.8, mb: 2.5 }}>
            <Typography
              component="label"
              htmlFor="player-name-input"
              sx={{
                fontSize: '0.82rem',
                fontWeight: 600,
                color: '#120042',
              }}
            >
              {t.nameInputLabel}
            </Typography>

            <TextField
              id="player-name-input"
              autoFocus
              size="small"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.nameInputPlaceholder}
              slotProps={{
                input: {
                  sx: {
                    height: 48,
                    backgroundColor: '#FFFFFF',
                    color: '#120042',
                    fontSize: '0.94rem',
                    fontWeight: 600,
                    borderRadius: '6px',
                    border: '1.5px solid #d4d2e3',
                    transition: 'all 0.2s ease',
                    '& fieldset': { border: 'none' },
                    '&:hover': {
                      borderColor: '#5951ff',
                    },
                    '&.Mui-focused': {
                      borderColor: '#5951ff',
                      boxShadow: '0 0 0 3px rgba(89, 81, 255, 0.2)',
                    },
                    '& input::placeholder': {
                      color: '#767484',
                      opacity: 1,
                      fontWeight: 400,
                    },
                  },
                },
              }}
            />
          </Box>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            sx={{
              height: 48,
              backgroundColor: '#5951ff',
              color: '#FFFFFF',
              fontWeight: 600,
              fontSize: '0.95rem',
              letterSpacing: '0.01em',
              borderRadius: '6px',
              textTransform: 'none',
              boxShadow: 'none',
              transition: 'background-color 0.2s ease',
              '&:hover': {
                backgroundColor: '#3028a1',
                boxShadow: 'none',
              },
            }}
          >
            {t.nameSubmitBtn}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};
