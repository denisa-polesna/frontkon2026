import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import { formatDuration } from '../utils/storage';
import { FailBotSpeechCard } from './FailBotSpeechCard';
import type { Language, translations } from '../utils/i18n';

interface VictoryModalProps {
  open: boolean;
  levelId: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  playerName: string;
  timeMs: number;
  charCount: number;
  userCss?: string;
  isBoothRecord?: boolean;
  onNextLevel: () => void;
  language: Language;
  t: typeof translations['en'];
}

export const VictoryModal: React.FC<VictoryModalProps> = ({
  open,
  levelId,
  playerName,
  timeMs,
  charCount: _charCount,
  userCss = '',
  isBoothRecord = false,
  onNextLevel,
  language,
  t,
}) => {
  const getPostMortem = () => {
    if (levelId === 'level1') return t.postMortemTextL1.replace(/{name}/g, playerName);
    if (levelId === 'level2') {
      const isFlex = userCss.toLowerCase().includes('flex');
      const isGrid = userCss.toLowerCase().includes('grid');
      let quote = t.postMortemTextL2;
      if (isFlex) {
        quote = t.postMortemTextL2Flex;
      } else if (isGrid) {
        quote = t.postMortemTextL2Grid;
      }
      return quote.replace(/{name}/g, playerName);
    }
    if (levelId === 'level3') return t.postMortemTextL3.replace(/{name}/g, playerName);
    if (levelId === 'level4') return t.postMortemTextL4.replace(/{name}/g, playerName);
    return t.postMortemTextL5.replace(/{name}/g, playerName);
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
      <DialogContent
        sx={{
          p: { xs: 2.5, sm: 3.5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          textAlign: 'center',
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            m: 0,
          }}
        >
          {t.victorySubtitle}
        </Typography>

        {/* Record Chip */}
        {isBoothRecord && (
          <Chip
            label={t.newRecordBadge}
            size="small"
            sx={{
              backgroundColor: '#FFB020',
              color: '#1A1202',
              fontWeight: 800,
              fontSize: '0.72rem',
              height: 24,
            }}
          />
        )}

        {/* FailBot Defeated Post-Mortem Card */}
        <FailBotSpeechCard
          message={getPostMortem()}
          name="FailBot-404"
        />

        {/* Single Stats Box: Time */}
        <Box
          sx={{
            backgroundColor: '#fbfaff',
            py: 1.4,
            px: 3,
            borderRadius: '10px',
            border: '1px solid #e2e0ed',
            textAlign: 'center',
            width: '100%',
            maxWidth: 220,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 0.3,
          }}
        >
          <Typography
            sx={{
              fontSize: '0.72rem',
              fontWeight: 800,
              color: '#6A7292',
              letterSpacing: '0.06em',
            }}
          >
            {t.timeTakenLabel || 'ČAS'}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontFamily: 'ui-monospace, monospace',
              fontWeight: 800,
              color: '#120042',
              fontSize: { xs: '1.45rem', sm: '1.7rem' },
              m: 0,
            }}
          >
            {formatDuration(timeMs, language)}
          </Typography>
        </Box>

        {/* Progression Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onNextLevel}
          sx={{
            height: 48,
            fontSize: '0.96rem',
            fontWeight: 600,
            borderRadius: '6px',
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            textTransform: 'none',
            boxShadow: 'none',
            mt: 0.5,
            '&:hover': {
              backgroundColor: '#3028a1',
              boxShadow: 'none',
            },
          }}
        >
          {levelId === 'level5' ? t.finishCampaignBtn : t.nextLevelBtn}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
