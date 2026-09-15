import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  TextField,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { isPlayerNameTaken } from '../utils/leaderboardApi';
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
  const [name, setName] = useState<string>('');
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const [isTaken, setIsTaken] = useState<boolean>(false);
  const [emptyError, setEmptyError] = useState<boolean>(false);

  // Debounced check against Supabase leaderboard
  useEffect(() => {
    const trimmed = name.trim();
    if (!trimmed) {
      return;
    }

    let isMounted = true;
    const timer = setTimeout(async () => {
      try {
        const taken = await isPlayerNameTaken(trimmed);
        if (isMounted) {
          setIsTaken(taken);
          setIsChecking(false);
        }
      } catch {
        if (isMounted) {
          setIsChecking(false);
        }
      }
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [name]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const trimmed = name.trim();
    if (!trimmed) {
      setEmptyError(true);
      return;
    }
    if (isTaken || isChecking) {
      return;
    }

    // Final direct verification before submitting
    setIsChecking(true);
    const taken = await isPlayerNameTaken(trimmed);
    setIsChecking(false);
    if (taken) {
      setIsTaken(true);
      return;
    }

    onSubmit(trimmed);
  };

  const trimmedName = name.trim();
  const isSubmitDisabled = !trimmedName || isChecking || isTaken;
  const hasError = (emptyError && !trimmedName) || isTaken;
  const helperMessage = (emptyError && !trimmedName)
    ? t.nameRequiredError
    : isTaken
    ? t.nameTakenError
    : isChecking
    ? t.nameCheckingText
    : undefined;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      transitionDuration={0}
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

      <form onSubmit={handleSubmit} noValidate>
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
              {t.nameInputLabel}{' '}
              <Box component="span" sx={{ color: '#d32f2f', fontWeight: 700 }}>
                *
              </Box>
            </Typography>

            <TextField
              id="player-name-input"
              autoFocus
              error={hasError}
              helperText={helperMessage}
              size="small"
              fullWidth
              autoComplete="off"
              value={name}
              onChange={(e) => {
                const val = e.target.value;
                setName(val);
                setIsTaken(false);
                setIsChecking(Boolean(val.trim()));
                if (emptyError && val.trim()) {
                  setEmptyError(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  if (!name.trim() || isTaken || isChecking) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!name.trim()) {
                      setEmptyError(true);
                    }
                  }
                }
              }}
              placeholder={t.nameInputPlaceholder}
              slotProps={{
                htmlInput: {
                  autoComplete: 'off',
                },
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
                      borderColor: hasError ? '#d32f2f' : '#5951ff',
                      boxShadow: hasError
                        ? '0 0 0 3px rgba(211, 47, 47, 0.2)'
                        : '0 0 0 3px rgba(89, 81, 255, 0.2)',
                    },
                    '& input::placeholder': {
                      color: '#767484',
                      opacity: 1,
                      fontWeight: 400,
                    },
                    '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active': {
                      WebkitBoxShadow: '0 0 0 1000px #FFFFFF inset !important',
                      boxShadow: '0 0 0 1000px #FFFFFF inset !important',
                      WebkitTextFillColor: '#120042 !important',
                      caretColor: '#120042 !important',
                      transition: 'background-color 5000s ease-in-out 0s',
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
            disabled={isSubmitDisabled}
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
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: '#3028a1',
                boxShadow: 'none',
              },
              '&.Mui-disabled, &:disabled': {
                backgroundColor: '#E8E7F0 !important',
                color: '#8C89A0 !important',
                boxShadow: 'none !important',
                cursor: 'not-allowed !important',
                pointerEvents: 'none',
              },
            }}
          >
            {isChecking ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={18} sx={{ color: '#8C89A0' }} />
                <Typography sx={{ fontSize: '0.92rem', fontWeight: 600, color: '#8C89A0' }}>
                  {t.nameCheckingText}
                </Typography>
              </Box>
            ) : (
              t.nameSubmitBtn
            )}
          </Button>
        </DialogContent>
      </form>
    </Dialog>
  );
};
