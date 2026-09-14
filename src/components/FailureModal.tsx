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
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import type { translations } from '../utils/i18n';

interface FailureModalProps {
  open: boolean;
  onClose: () => void;
  t: typeof translations['en'];
}

export const FailureModal: React.FC<FailureModalProps> = ({
  open,
  onClose,
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
            border: '1px solid rgba(255, 76, 97, 0.3)',
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
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 76, 97, 0.12)',
            border: '2px solid #FF4C61',
            color: '#FF4C61',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px auto',
          }}
        >
          <ErrorOutlineOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            mb: 0.8,
          }}
        >
          {t.failedModalTitle}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: '#555555',
            fontSize: { xs: '0.86rem', sm: '0.92rem' },
            lineHeight: 1.5,
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
