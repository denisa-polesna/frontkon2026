import React from 'react';
import { Box, Typography, type SxProps, type Theme } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';

interface FailBotSpeechCardProps {
  message: string;
  name?: string;
  sx?: SxProps<Theme>;
}

export const FailBotSpeechCard: React.FC<FailBotSpeechCardProps> = ({
  message,
  name = 'FailBot-404',
  sx,
}) => {
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#fbfaff',
        border: '1px solid rgba(89, 81, 255, 0.25)',
        borderRadius: '12px',
        p: { xs: 1.6, sm: 1.8 },
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1.4, sm: 1.8 },
        textAlign: 'left',
        ...sx,
      }}
    >
      {/* FailBot Avatar with glowing green notification dot */}
      <Box sx={{ position: 'relative', flexShrink: 0 }}>
        <Box
          sx={{
            width: { xs: 40, sm: 44 },
            height: { xs: 40, sm: 44 },
            borderRadius: '8px',
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(89, 81, 255, 0.35)',
          }}
        >
          <SmartToyIcon sx={{ color: '#FFFFFF', fontSize: { xs: 22, sm: 26 } }} />
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

      {/* Name and Speech */}
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant="subtitle2"
          sx={{
            fontWeight: 800,
            color: '#000000',
            fontSize: { xs: '0.9rem', sm: '0.96rem' },
            mb: 0.2,
          }}
        >
          {name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: '#000000',
            fontStyle: 'italic',
            fontSize: { xs: '0.82rem', sm: '0.88rem' },
            lineHeight: 1.4,
          }}
        >
          &ldquo;{message}&rdquo;
        </Typography>
      </Box>
    </Box>
  );
};
