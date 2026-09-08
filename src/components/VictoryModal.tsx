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
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
  playerName,
  timeMs,
  charCount,
  userCss = '',
  isNewBest,
  onNextLevel,
  language,
  t,
}) => {
  const badge = getPlayerBadge(timeMs);
  const badgeTitle = language === 'cz' ? badge.titleCz : badge.titleEn;
  const badgeSub = language === 'cz' ? badge.subCz : badge.subEn;

  const getVictoryTitle = () => {
    if (levelId === 'level1') return t.victoryTitleL1;
    if (levelId === 'level2') return t.victoryTitleL2;
    return t.victoryTitleL3;
  };

  const getPostMortem = () => {
    if (levelId === 'level1') {
      const isFlex = userCss.toLowerCase().includes('flex');
      const isGrid = userCss.toLowerCase().includes('grid');
      let quote = t.postMortemTextL1;
      if (isFlex) {
        quote = t.postMortemTextL1Flex;
      } else if (isGrid) {
        quote = t.postMortemTextL1Grid;
      }
      return quote.replace(/{name}/g, playerName);
    }
    if (levelId === 'level2') return t.postMortemTextL2.replace(/{name}/g, playerName);
    return t.postMortemTextL3.replace(/{name}/g, playerName);
  };

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
            backgroundColor: '#121628',
            border: '2px solid #00D2B4',
            borderRadius: 3,
            boxShadow: '0 0 50px rgba(0, 210, 180, 0.35)',
            overflow: 'hidden',
          },
        },
      }}
    >
      <Box
        sx={{
          background: 'linear-gradient(135deg, rgba(0, 210, 180, 0.2) 0%, rgba(110, 63, 243, 0.2) 100%)',
          p: 3,
          textAlign: 'center',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            width: 60,
            height: 60,
            borderRadius: '50%',
            backgroundColor: '#00D2B4',
            color: '#09151F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 12px auto',
            boxShadow: '0 0 20px rgba(0, 210, 180, 0.6)',
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 34 }} />
        </Box>

        <Typography variant="h5" sx={{ fontWeight: 800, color: '#FFFFFF', mb: 0.5 }}>
          {getVictoryTitle()}
        </Typography>
        <Typography variant="body2" sx={{ color: '#00D2B4', fontWeight: 600 }}>
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
            borderRadius: 2,
            backgroundColor: 'rgba(9, 12, 22, 0.75)',
            border: `1.5px solid ${badge.color}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 1.2,
          }}
        >
          <Typography sx={{ fontSize: '1.4rem' }}>{badge.icon}</Typography>
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 800, color: badge.color, lineHeight: 1.2 }}>
              {badgeTitle}
            </Typography>
            <Typography sx={{ fontSize: '0.68rem', color: '#8892B0' }}>
              {badgeSub}
            </Typography>
          </Box>
        </Box>
      </Box>

      <DialogContent sx={{ p: 3, pb: 1 }}>
        {/* Stats Grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 1.5,
            mb: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: '#171B30',
              p: 1.5,
              borderRadius: 2,
              border: '1px solid #282E4E',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#8892B0', mb: 0.5 }}>
              <TimerIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {t.timeTakenLabel}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#FFFFFF' }}>
              {formatTime(timeMs)}
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: '#171B30',
              p: 1.5,
              borderRadius: 2,
              border: '1px solid #282E4E',
              textAlign: 'center',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 0.5, color: '#8892B0', mb: 0.5 }}>
              <CodeIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {t.cssGolfLabel}
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#C4B5FD' }}>
              {charCount} chars
            </Typography>
          </Box>
        </Box>

        {/* Auto-saved to Leaderboard notice */}
        <Box
          sx={{
            mb: 2,
            p: 1,
            borderRadius: 1.5,
            backgroundColor: 'rgba(0, 210, 180, 0.1)',
            border: '1px solid rgba(0, 210, 180, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 0.8,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 16, color: '#00D2B4' }} />
          <Typography variant="caption" sx={{ color: '#00D2B4', fontWeight: 700, fontSize: '0.78rem' }}>
            {t.savedAutoBadge.replace('{name}', playerName)}
          </Typography>
        </Box>

        {/* DevBot Defeated Quote */}
        <Box
          sx={{
            backgroundColor: '#0D101C',
            p: 1.5,
            borderRadius: 2,
            border: '1px solid #232842',
            mb: 1.5,
          }}
        >
          <Typography variant="caption" sx={{ color: '#6A7394', display: 'block', mb: 0.5 }}>
            {t.postMortemHeader}
          </Typography>
          <Typography variant="body2" sx={{ color: '#D5DAEA', fontStyle: 'italic', fontSize: '0.82rem' }}>
            {getPostMortem()}
          </Typography>
        </Box>
      </DialogContent>

      {/* Single Progression Button */}
      <DialogActions sx={{ p: 2.5, pt: 1 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          endIcon={levelId !== 'level3' ? <ArrowForwardIcon /> : undefined}
          onClick={onNextLevel}
          sx={{
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 800,
            backgroundColor: levelId === 'level3' ? '#FFB020' : '#00D2B4',
            color: '#09151F',
            '&:hover': {
              backgroundColor: levelId === 'level3' ? '#FFC247' : '#33DBC2',
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
