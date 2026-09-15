import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { sound } from '../utils/audio';
import type { translations } from '../utils/i18n';

interface MissionBannerProps {
  levelId: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  isSolved: boolean;
  devBot: {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  };
  t: typeof translations['en'];
}

export const MissionBanner: React.FC<MissionBannerProps> = ({
  isSolved: _isSolved,
  devBot,
}) => {
  const prevMessageRef = useRef<string>(devBot.message);

  useEffect(() => {
    if (prevMessageRef.current !== devBot.message) {
      sound.playNotification();
      prevMessageRef.current = devBot.message;
    }
  }, [devBot.message]);

  return (
    <Box
      sx={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        border: '1px solid rgba(89, 81, 255, 0.3)',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        px: { xs: 1.5, sm: 2 },
        py: { xs: 1, sm: 1.2 },
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.2, sm: 1.6 },
      }}
    >
      {/* DevBot Avatar with exact outreach.ai icon square styling */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          sx={{
            width: { xs: 36, sm: 40 },
            height: { xs: 36, sm: 40 },
            borderRadius: '8px',
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(89, 81, 255, 0.35)',
          }}
        >
          <SmartToyIcon sx={{ color: '#FFFFFF', fontSize: { xs: 22, sm: 24 } }} />
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 11,
            height: 11,
            borderRadius: '50%',
            backgroundColor: '#00D2B4',
            boxShadow: '0 0 10px #00D2B4, 0 0 16px rgba(0, 210, 180, 0.7)',
            animation: 'botGreenPulse 2s infinite ease-in-out',
            '@keyframes botGreenPulse': {
              '0%': { transform: 'scale(1)', boxShadow: '0 0 6px #00D2B4' },
              '50%': { transform: 'scale(1.2)', boxShadow: '0 0 14px #00D2B4, 0 0 20px rgba(0, 210, 180, 0.8)' },
              '100%': { transform: 'scale(1)', boxShadow: '0 0 6px #00D2B4' },
            },
          }}
        />
      </Box>

      {/* DevBot Name & Roast Message */}
      <Box sx={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            color: '#000000',
            fontSize: { xs: '0.82rem', sm: '0.88rem' },
            mb: 0.1,
          }}
        >
          DevBot-3000
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#000000',
            fontStyle: 'italic',
            fontSize: { xs: '0.78rem', sm: '0.85rem' },
            lineHeight: 1.4,
          }}
        >
          &ldquo;{devBot.message}&rdquo;
        </Typography>
      </Box>
    </Box>
  );
};
