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
import SmartToyIcon from '@mui/icons-material/SmartToy';
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
        {/* DevBot Avatar with glowing green notification dot */}
        <Box sx={{ position: 'relative', display: 'inline-block', margin: '0 auto 14px auto' }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: '10px',
              backgroundColor: '#5951ff',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 16px rgba(89, 81, 255, 0.35)',
            }}
          >
            <SmartToyIcon sx={{ fontSize: 32, color: '#FFFFFF' }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: '#00D2B4',
              border: '2px solid #FFFFFF',
              boxShadow: '0 0 10px #00D2B4, 0 0 14px rgba(0, 210, 180, 0.7)',
              animation: 'botGreenPulse 2s infinite ease-in-out',
              '@keyframes botGreenPulse': {
                '0%': { transform: 'scale(1)', boxShadow: '0 0 6px #00D2B4' },
                '50%': { transform: 'scale(1.2)', boxShadow: '0 0 14px #00D2B4, 0 0 18px rgba(0, 210, 180, 0.8)' },
                '100%': { transform: 'scale(1)', boxShadow: '0 0 6px #00D2B4' },
              },
            }}
          />
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            mb: 0.6,
          }}
        >
          {t.failedModalTitle}
        </Typography>

        {/* DevBot Roast Speech Card */}
        <Box
          sx={{
            backgroundColor: '#fbfaff',
            backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/698651938e6808536770fe17_dot-repeat-svg.svg")`,
            backgroundRepeat: 'repeat',
            border: '1px solid rgba(89, 81, 255, 0.25)',
            borderRadius: '10px',
            p: { xs: 1.6, sm: 2 },
            my: 2,
            textAlign: 'left',
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              fontWeight: 800,
              color: '#120042',
              fontSize: '0.85rem',
              mb: 0.3,
            }}
          >
            DevBot-3000
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: '#222222',
              fontStyle: 'italic',
              fontSize: { xs: '0.82rem', sm: '0.88rem' },
              lineHeight: 1.45,
            }}
          >
            &ldquo;{t.verifyFailedDevbot.replace('{name}', playerName || 'Senior Dev')}&rdquo;
          </Typography>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: '#666666',
            fontSize: { xs: '0.84rem', sm: '0.9rem' },
            lineHeight: 1.45,
            mb: 2.5,
          }}
        >
          {t.failedModalSubtitle}
        </Typography>
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
