import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread';
import { sound } from '../utils/audio';

interface DevBotAvatarProps {
  mood: 'confident' | 'confused' | 'panicked' | 'defeated';
  message: string;
  badgeLabel: string;
}

export const DevBotAvatar: React.FC<DevBotAvatarProps> = ({ mood, message, badgeLabel }) => {
  const prevMessageRef = useRef<string>(message);

  useEffect(() => {
    if (prevMessageRef.current !== message) {
      sound.playNotification();
      prevMessageRef.current = message;
    }
  }, [message]);

  const getMoodColor = () => {
    switch (mood) {
      case 'panicked':
        return '#FFB020';
      case 'defeated':
        return '#00D2B4';
      case 'confused':
        return '#FF4C61';
      case 'confident':
      default:
        return '#6E3FF3';
    }
  };

  const moodColor = getMoodColor();

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 1.8,
        width: '100%',
      }}
    >
      {/* DevBot Profile Avatar with Pulsing Online Indicator */}
      <Box sx={{ position: 'relative', flexShrink: 0, pt: 0.3 }}>
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: '14px',
            backgroundColor: `${moodColor}22`,
            border: `2px solid ${moodColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 0 18px ${moodColor}44`,
            transition: 'all 0.3s ease',
          }}
        >
          <SmartToyIcon sx={{ color: moodColor, fontSize: 28 }} />
        </Box>

        {/* Pulsing Green Online Dot */}
        <Box
          sx={{
            position: 'absolute',
            bottom: -2,
            right: -2,
            width: 13,
            height: 13,
            borderRadius: '50%',
            backgroundColor: '#00D2B4',
            border: '2px solid #090B14',
            animation: 'pulseGlow 2s infinite',
          }}
        />
      </Box>

      {/* Live Notification / Chat Bubble */}
      <Box
        key={message}
        sx={{
          flex: 1,
          position: 'relative',
          backgroundColor: '#13182C',
          borderRadius: '4px 16px 16px 16px',
          padding: '12px 18px',
          border: `1px solid ${moodColor}55`,
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.45), 0 0 12px rgba(110, 63, 243, 0.1)',
          animation: 'notificationBounce 0.4s cubic-bezier(0.2, 0.9, 0.3, 1)',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 14,
            left: -8,
            width: 0,
            height: 0,
            borderTop: '6px solid transparent',
            borderBottom: '6px solid transparent',
            borderRight: `8px solid #13182C`,
            zIndex: 2,
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 13,
            left: -10,
            width: 0,
            height: 0,
            borderTop: '7px solid transparent',
            borderBottom: '7px solid transparent',
            borderRight: `9px solid ${moodColor}55`,
            zIndex: 1,
          },
        }}
      >
        {/* Notification Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.8, flexWrap: 'wrap', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MarkChatUnreadIcon sx={{ fontSize: 16, color: moodColor }} />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 800,
                fontSize: '0.82rem',
                color: '#FFFFFF',
                letterSpacing: '0.02em',
              }}
            >
              DevBot-3000 (Junior AI)
            </Typography>

            <Box
              sx={{
                fontSize: '0.66rem',
                fontWeight: 800,
                color: moodColor,
                backgroundColor: `${moodColor}1A`,
                px: 1,
                py: 0.25,
                borderRadius: 1,
                border: `1px solid ${moodColor}40`,
              }}
            >
              {badgeLabel}
            </Box>
          </Box>

          <Typography variant="caption" sx={{ color: '#7E87A8', fontSize: '0.7rem', fontWeight: 600 }}>
            Active now &bull; Direct Message
          </Typography>
        </Box>

        {/* Message Bubble Body */}
        <Typography
          variant="body2"
          sx={{
            color: '#E3E8F8',
            fontSize: '0.9rem',
            lineHeight: 1.5,
            fontWeight: 500,
          }}
        >
          &ldquo;{message}&rdquo;
        </Typography>
      </Box>
    </Box>
  );
};
