import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { OutreachLogo } from './OutreachLogo';
import { formatTime } from '../utils/storage';
import { sound } from '../utils/audio';
import type { Language, translations } from '../utils/i18n';

interface HeaderProps {
  elapsedMs: number;
  bestTimeMs: number | null;
  isRunning: boolean;
  onReset: () => void;
  onBackToMenu?: () => void;
  currentLevel: 'level1' | 'level2' | 'level3';
  soundEnabled: boolean;
  onToggleSound: () => void;
  language: Language;
  onToggleLanguage: () => void;
  t: typeof translations['en'];
}

export const Header: React.FC<HeaderProps> = ({
  elapsedMs,
  bestTimeMs,
  isRunning,
  onReset,
  onBackToMenu,
  currentLevel,
  soundEnabled,
  onToggleSound,
  language,
  onToggleLanguage,
  t,
}) => {
  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2,
        padding: '12px 24px',
        backgroundColor: '#121526',
        borderBottom: '1px solid #232742',
      }}
    >
      {/* Brand, Back Button & Title */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {onBackToMenu && (
          <Button
            size="small"
            variant="outlined"
            startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
            onClick={() => {
              sound.playBlip();
              onBackToMenu();
            }}
            sx={{
              borderColor: '#2D3252',
              color: '#C4B5FD',
              fontSize: '0.78rem',
              fontWeight: 700,
              minWidth: 78,
              '&:hover': {
                borderColor: '#6E3FF3',
                backgroundColor: 'rgba(110, 63, 243, 0.1)',
              },
            }}
          >
            {t.menuBtn}
          </Button>
        )}

        <OutreachLogo height={20} />

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', textAlign: 'left' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(90deg, #FFFFFF 0%, #C4B5FD 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t.appTitle}
            </Typography>
            <Chip
              label={
                currentLevel === 'level1'
                  ? t.l1Badge
                  : currentLevel === 'level2'
                  ? t.l2Badge
                  : t.l3Badge
              }
              size="small"
              sx={{
                height: 20,
                fontSize: '0.68rem',
                backgroundColor:
                  currentLevel === 'level1'
                    ? 'rgba(110, 63, 243, 0.25)'
                    : currentLevel === 'level2'
                    ? 'rgba(0, 210, 180, 0.2)'
                    : 'rgba(255, 176, 32, 0.2)',
                color:
                  currentLevel === 'level1'
                    ? '#C4B5FD'
                    : currentLevel === 'level2'
                    ? '#00D2B4'
                    : '#FFD166',
                border: `1px solid ${
                  currentLevel === 'level1'
                    ? 'rgba(110, 63, 243, 0.4)'
                    : currentLevel === 'level2'
                    ? 'rgba(0, 210, 180, 0.4)'
                    : 'rgba(255, 176, 32, 0.4)'
                }`,
                fontWeight: 700,
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#8E95B2', display: 'block', fontSize: '0.78rem' }}>
            {currentLevel === 'level1'
              ? t.subtitleL1
              : currentLevel === 'level2'
              ? t.subtitleL2
              : t.subtitleL3}
          </Typography>
        </Box>
      </Box>

      {/* Middle: Live Speedrun Timer & Separate Level Record Chip */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        {/* Chip 1: Timer */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            backgroundColor: '#0c0e1a',
            padding: '6px 16px',
            borderRadius: '24px',
            border: `1px solid ${isRunning ? '#00D2B4' : '#232742'}`,
            transition: 'border-color 0.3s ease',
          }}
        >
          <PlayArrowIcon sx={{ fontSize: 16, color: isRunning ? '#00D2B4' : '#6A708E' }} />
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.05em',
              minWidth: 50,
            }}
          >
            {formatTime(elapsedMs)}
          </Typography>
        </Box>

        {/* Chip 2: Record (Separate Chip) */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.8,
            backgroundColor: '#0c0e1a',
            padding: '6px 14px',
            borderRadius: '24px',
            border: '1px solid #232742',
          }}
        >
          <EmojiEventsIcon sx={{ fontSize: 16, color: bestTimeMs ? '#FFB020' : '#6A708E' }} />
          <Typography variant="caption" sx={{ color: '#8E95B2', fontWeight: 700, fontSize: '0.74rem' }}>
            {t.bestLabel}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: bestTimeMs ? '#00D2B4' : '#6A708E',
            }}
          >
            {formatTime(bestTimeMs)}
          </Typography>
        </Box>
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Tooltip title={t.resetTooltip}>
          <IconButton
            size="small"
            onClick={() => {
              sound.playBlip();
              onReset();
            }}
            sx={{
              color: '#9BA3BE',
              backgroundColor: '#191D33',
              border: '1px solid #282E4E',
              '&:hover': {
                color: '#FFF',
                backgroundColor: '#232948',
              },
            }}
          >
            <RestartAltIcon fontSize="small" />
          </IconButton>
        </Tooltip>

        <Tooltip title={soundEnabled ? t.muteTooltip : t.unmuteTooltip}>
          <IconButton
            size="small"
            onClick={onToggleSound}
            sx={{
              color: soundEnabled ? '#00D2B4' : '#6A708E',
              backgroundColor: '#191D33',
              border: '1px solid #282E4E',
              '&:hover': {
                backgroundColor: '#232948',
              },
            }}
          >
            {soundEnabled ? <VolumeUpIcon fontSize="small" /> : <VolumeOffIcon fontSize="small" />}
          </IconButton>
        </Tooltip>

        {/* Language Switcher (EN / CZ) placed right next to Reset and Sound */}
        <Tooltip title={t.langTooltip}>
          <Button
            size="small"
            variant="outlined"
            onClick={onToggleLanguage}
            sx={{
              minWidth: 64,
              px: 1,
              py: '4px',
              fontSize: '0.75rem',
              fontWeight: 800,
              borderColor: '#282E4E',
              backgroundColor: '#191D33',
              color: '#C4B5FD',
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              '&:hover': {
                borderColor: '#6E3FF3',
                backgroundColor: '#232948',
              },
            }}
          >
            {language === 'cz' ? '🇨🇿 CZ' : '🇬🇧 EN'}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
