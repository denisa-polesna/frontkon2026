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
  totalTimeMs?: number;
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
  totalTimeMs,
  charCount: _charCount,
  userCss = '',
  isBoothRecord = false,
  onNextLevel,
  language,
  t,
}) => {
  const isFinalLevel = levelId === 'level5';

  const getPostMortem = () => {
    if (isFinalLevel) return t.campaignVictoryFailBot.replace(/{name}/g, playerName);
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
      maxWidth={isFinalLevel ? 'sm' : 'xs'}
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
            border: '1px solid rgba(89, 81, 255, 0.25)',
            borderRadius: '16px',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            overflow: 'hidden',
            m: { xs: '14px', sm: 2 },
            width: { xs: 'calc(100% - 28px)', sm: '100%' },
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
          gap: 1.8,
          textAlign: 'center',
        }}
      >
        {/* Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: isFinalLevel ? { xs: '1.4rem', sm: '1.65rem' } : { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            m: 0,
          }}
        >
          {isFinalLevel ? t.campaignVictoryTitle : t.victorySubtitle}
        </Typography>

        {/* Subtitle for final level */}
        {isFinalLevel && (
          <Typography
            sx={{
              color: '#5951ff',
              fontWeight: 700,
              fontSize: { xs: '0.88rem', sm: '0.98rem' },
              mt: -0.8,
              lineHeight: 1.4,
            }}
          >
            {t.campaignVictorySubtitle.replace('{name}', playerName || 'Senior Dev')}
          </Typography>
        )}

        {/* Badges / Chips */}
        {isBoothRecord && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
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
          </Box>
        )}

        {/* FailBot Defeated Post-Mortem Card */}
        <FailBotSpeechCard
          message={getPostMortem()}
          name="FailBot-404"
        />

        {/* Stats Display */}
        {isFinalLevel ? (
          <Box sx={{ display: 'flex', gap: 1.5, width: '100%', maxWidth: 360, justifyContent: 'center' }}>
            <Box
              sx={{
                flex: 1,
                backgroundColor: '#fbfaff',
                py: 1.2,
                px: 1.5,
                borderRadius: '10px',
                border: '1.5px solid #5951ff',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.3,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  color: '#5951ff',
                  letterSpacing: '0.04em',
                }}
              >
                {t.campaignTotalTimeLabel}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'ui-monospace, monospace',
                  fontWeight: 800,
                  color: '#120042',
                  fontSize: { xs: '1.25rem', sm: '1.45rem' },
                  m: 0,
                }}
              >
                {formatDuration(totalTimeMs || timeMs, language)}
              </Typography>
            </Box>

            <Box
              sx={{
                flex: 1,
                backgroundColor: '#fbfaff',
                py: 1.2,
                px: 1.5,
                borderRadius: '10px',
                border: '1px solid #e2e0ed',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0.3,
              }}
            >
              <Typography
                sx={{
                  fontSize: '0.66rem',
                  fontWeight: 800,
                  color: '#6A7292',
                  letterSpacing: '0.04em',
                }}
              >
                {t.campaignLevelTimeLabel}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontFamily: 'ui-monospace, monospace',
                  fontWeight: 800,
                  color: '#120042',
                  fontSize: { xs: '1.25rem', sm: '1.45rem' },
                  m: 0,
                }}
              >
                {formatDuration(timeMs, language)}
              </Typography>
            </Box>
          </Box>
        ) : (
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
        )}

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
          {isFinalLevel ? t.viewFinalLeaderboardBtn : t.nextLevelBtn}
        </Button>
      </DialogContent>
    </Dialog>
  );
};
