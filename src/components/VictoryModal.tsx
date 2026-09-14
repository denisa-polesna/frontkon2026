import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimerIcon from '@mui/icons-material/Timer';
import CodeIcon from '@mui/icons-material/Code';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatTime, getPlayerBadge } from '../utils/storage';
import type { Language, translations } from '../utils/i18n';

interface VictoryModalProps {
  open: boolean;
  levelId: 'level1' | 'level2' | 'level3';
  playerName: string;
  timeMs: number;
  charCount: number;
  userCss?: string;
  isNewBest: boolean;
  onNextLevel: () => void;
  language: Language;
  t: typeof translations['en'];
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  open,
  levelId,
  timeMs,
  charCount,
  isNewBest,
  onNextLevel,
  language,
  t,
}) => {
  const badge = getPlayerBadge(timeMs);
  const badgeTitle = language === 'cz' ? badge.titleCz : badge.titleEn;
  const badgeSub = language === 'cz' ? badge.subCz : badge.subEn;

  const getNextLevelNumber = () => {
    if (levelId === 'level1') return 2;
    if (levelId === 'level2') return 3;
    return 1;
  };

  return (
    <Dialog
      open={open}
      maxWidth="xs"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(89, 81, 255, 0.25)',
            borderRadius: '16px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(89, 81, 255, 0.08) 0%, rgba(0, 210, 180, 0.08) 100%)',
          p: { xs: 2.5, sm: 3 },
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            boxShadow: '0 4px 16px rgba(89, 81, 255, 0.35)',
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 32 }} />
        </Box>

        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            mb: 0.5,
          }}
        >
          {t.victorySubtitle}
        </Typography>

        {isNewBest && (
          <Box sx={{ mt: 1 }}>
            <Chip
              label={t.newRecordBadge}
              size="small"
              sx={{
                backgroundColor: '#FFB020',
                color: '#1A1202',
                fontWeight: 800,
                fontSize: '0.72rem',
              }}
            />
          </Box>
        )}

        {/* 3 Badges Earned Ribbon */}
        <Box
          sx={{
            mt: 2,
            p: 1.2,
            borderRadius: '10px',
            backgroundColor: '#f6f5ff',
            border: `1.5px solid ${badge.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.2,
          }}
        >
          <Typography sx={{ fontSize: '1.4rem' }}>{badge.icon}</Typography>
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: '0.82rem', fontWeight: 800, color: '#120042', lineHeight: 1.2 }}>
              {badgeTitle}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: '#666666' }}>
              {badgeSub}
            </Typography>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: { xs: 2.5, sm: 3 }, pb: 1 }}>
        {/* Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1.5,
            mb: 1.5,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#fbfaff',
              p: 1.5,
              borderRadius: '8px',
              border: '1px solid #e2e0ed',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#666666', mb: 0.5 }}>
              <TimerIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {t.timeTakenLabel}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#120042' }}>
              {formatTime(timeMs)}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#fbfaff',
              p: 1.5,
              borderRadius: '8px',
              border: '1px solid #e2e0ed',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#666666', mb: 0.5 }}>
              <CodeIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {t.cssGolfLabel}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#5951ff' }}>
              {charCount} chars
            </Typography>
          </Box>
        </Box>
      </DialogContent>

      {/* Single Progression Button */}
      <DialogActions sx={{ p: { xs: 2.5, sm: 3 }, pt: 0.5 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          endIcon={levelId !== 'level3' ? <ArrowForwardIcon /> : undefined}
          onClick={onNextLevel}
          sx={{
            py: 1.3,
            fontSize: '0.96rem',
            fontWeight: 600,
            borderRadius: '6px',
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#3028a1',
              boxShadow: 'none',
            },
          }}
        >
          {levelId === 'level3'
            ? t.finishCampaignBtn
            : t.nextLevelBtn.replace('{next}', getNextLevelNumber().toString())}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
