import React from 'react';
import {
  Dialog,
  DialogContent,
  Typography,
  Button,
  Box,
  Chip,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { formatTime } from '../utils/storage';
import type { Language, translations } from '../utils/i18n';

interface VictoryModalProps {
  open: boolean;
  levelId: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
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
  charCount: _charCount,
  userCss = '',
  isNewBest,
  onNextLevel,
  language: _language,
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
        {isNewBest && (
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

        {/* DevBot Defeated Post-Mortem Card */}
        <Box
          sx={{
            backgroundColor: '#fbfaff',
            backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/698651938e6808536770fe17_dot-repeat-svg.svg")`,
            backgroundRepeat: 'repeat',
            border: '1px solid rgba(89, 81, 255, 0.25)',
            borderRadius: '10px',
            p: { xs: 1.6, sm: 2 },
            textAlign: 'left',
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 1.4,
          }}
        >
          {/* DevBot Avatar with glowing green notification dot */}
          <Box sx={{ position: 'relative', flexShrink: 0, mt: 0.2 }}>
            <Box
              sx={{
                width: 34,
                height: 34,
                borderRadius: '8px',
                backgroundColor: '#5951ff',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(89, 81, 255, 0.35)',
              }}
            >
              <SmartToyIcon sx={{ color: '#FFFFFF', fontSize: 20 }} />
            </Box>
            <Box
              sx={{
                position: 'absolute',
                bottom: -2,
                right: -2,
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: '#00D2B4',
                border: '2px solid #FFFFFF',
                boxShadow: '0 0 8px #00D2B4, 0 0 12px rgba(0, 210, 180, 0.7)',
                animation: 'botGreenPulse 2s infinite ease-in-out',
                '@keyframes botGreenPulse': {
                  '0%': { transform: 'scale(1)', boxShadow: '0 0 6px #00D2B4' },
                  '50%': { transform: 'scale(1.2)', boxShadow: '0 0 12px #00D2B4, 0 0 16px rgba(0, 210, 180, 0.8)' },
                  '100%': { transform: 'scale(1)', boxShadow: '0 0 6px #00D2B4' },
                },
              }}
            />
          </Box>

          <Box sx={{ flex: 1, minWidth: 0 }}>
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
              {getPostMortem()}
            </Typography>
          </Box>
        </Box>

        {/* Single Stats Box: Time */}
        <Box
          sx={{
            backgroundColor: '#fbfaff',
            py: 1.2,
            px: 3,
            borderRadius: '10px',
            border: '1px solid #e2e0ed',
            textAlign: 'center',
            width: '100%',
            maxWidth: 200,
          }}
        >
          <Typography variant="h5" sx={{ fontFamily: 'monospace', fontWeight: 800, color: '#120042', m: 0 }}>
            {formatTime(timeMs)}
          </Typography>
        </Box>

        {/* Progression Button */}
        <Button
          variant="contained"
          fullWidth
          size="large"
          endIcon={levelId !== 'level5' ? <ArrowForwardIcon /> : undefined}
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
