import React from 'react';
import {
  Box,
  Typography,
  Chip,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { OutreachLogo } from './OutreachLogo';
import { formatTime } from '../utils/storage';
import { sound } from '../utils/audio';
import type { Language, translations } from '../utils/i18n';

interface HeaderProps {
  elapsedMs: number;
  bestTimeMs?: number | null;
  isRunning: boolean;
  onReset?: () => void;
  onBackToMenu?: () => void;
  currentLevel: 'level1' | 'level2' | 'level3';
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  language: Language;
  onToggleLanguage: () => void;
  t: typeof translations['en'];
}

export const Header: React.FC<HeaderProps> = ({
  elapsedMs,
  isRunning,
  onBackToMenu,
  currentLevel,
  soundEnabled = true,
  onToggleSound,
  language,
  onToggleLanguage,
  t,
}) => {
  const levelNumber = currentLevel === 'level1' ? '1' : currentLevel === 'level2' ? '2' : '3';
  const levelBadgeLabel =
    currentLevel === 'level1'
      ? t.l1Badge
      : currentLevel === 'level2'
      ? t.l2Badge
      : t.l3Badge;

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
        gap: { xs: 1, sm: 2 },
        padding: { xs: '12px 14px', sm: '14px 24px' },
        backgroundColor: '#1f1f1f',
        borderBottom: '1px solid #2e2e2e',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Left: Back + Brand + Level */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.5 }, minWidth: 0 }}>
        {onBackToMenu && (
          <Tooltip title={t.menuBtn}>
            <Button
              size="small"
              variant="outlined"
              startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
              onClick={() => {
                sound.playBlip();
                onBackToMenu();
              }}
              sx={{
                borderColor: '#3a3a3a',
                color: '#FFFFFF',
                backgroundColor: '#282828',
                fontSize: '0.78rem',
                fontWeight: 600,
                minWidth: { xs: 36, sm: 72 },
                px: { xs: 1, sm: 1.5 },
                py: '5px',
                borderRadius: '6px',
                '& .MuiButton-startIcon': {
                  mr: { xs: 0, sm: 0.8 },
                },
                '&:hover': {
                  borderColor: '#5951ff',
                  backgroundColor: '#5951ff',
                  color: '#FFFFFF',
                },
              }}
            >
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {t.menuBtn}
              </Box>
            </Button>
          </Tooltip>
        )}

        <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
          <OutreachLogo height={24} />
        </Box>

        <Chip
          label={
            <Box component="span">
              <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
                {levelBadgeLabel}
              </Box>
              <Box component="span" sx={{ display: { xs: 'inline', sm: 'none' } }}>
                L{levelNumber}
              </Box>
            </Box>
          }
          size="small"
          sx={{
            height: 24,
            fontSize: '0.72rem',
            fontWeight: 800,
            borderRadius: '6px',
            backgroundColor:
              currentLevel === 'level1'
                ? 'rgba(89, 81, 255, 0.25)'
                : currentLevel === 'level2'
                ? 'rgba(0, 210, 180, 0.15)'
                : 'rgba(255, 176, 32, 0.15)',
            color:
              currentLevel === 'level1'
                ? '#b3b0ff'
                : currentLevel === 'level2'
                ? '#00D2B4'
                : '#FFD166',
            border: `1px solid ${
              currentLevel === 'level1'
                ? 'rgba(179, 176, 255, 0.35)'
                : currentLevel === 'level2'
                ? 'rgba(0, 210, 180, 0.35)'
                : 'rgba(255, 176, 32, 0.35)'
            }`,
          }}
        />
      </Box>

      {/* Middle: Clean Live Timer & Record centered in header */}
      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 0.8, sm: 1.2 },
          pointerEvents: 'none',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#141414',
            px: { xs: 1.4, sm: 2 },
            py: '4px',
            borderRadius: '6px',
            border: `1px solid ${isRunning ? '#5951ff' : '#333333'}`,
            boxShadow: isRunning ? '0 0 14px rgba(89, 81, 255, 0.35)' : 'none',
            transition: 'all 0.25s ease',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: { xs: '0.95rem', sm: '1.15rem' },
              fontWeight: 800,
              color: '#FFFFFF',
              letterSpacing: '0.04em',
            }}
          >
            {formatTime(elapsedMs)}
          </Typography>
        </Box>
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 0.8 } }}>
        {onToggleSound && (
          <Tooltip title={soundEnabled ? t.muteTooltip : t.unmuteTooltip}>
            <IconButton
              size="small"
              onClick={onToggleSound}
              sx={{
                color: soundEnabled ? '#FFFFFF' : '#888888',
                backgroundColor: '#282828',
                border: '1px solid #3a3a3a',
                borderRadius: '6px',
                width: 30,
                height: 30,
                '&:hover': {
                  borderColor: '#5951ff',
                  backgroundColor: '#5951ff',
                  color: '#FFFFFF',
                },
              }}
            >
              {soundEnabled ? <VolumeUpIcon sx={{ fontSize: 16 }} /> : <VolumeOffIcon sx={{ fontSize: 16 }} />}
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title={t.langTooltip}>
          <Button
            size="small"
            variant="outlined"
            onClick={onToggleLanguage}
            sx={{
              minWidth: 44,
              px: 0.8,
              py: '3px',
              fontSize: '0.72rem',
              fontWeight: 700,
              borderColor: '#3a3a3a',
              backgroundColor: '#282828',
              color: '#FFFFFF',
              borderRadius: '6px',
              height: 30,
              '&:hover': {
                borderColor: '#5951ff',
                backgroundColor: '#5951ff',
                color: '#FFFFFF',
              },
            }}
          >
            {language === 'cz' ? 'CZ' : 'EN'}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
};
