import React from 'react';
import {
  Box,
  IconButton,
  Tooltip,
  Button,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import { OutreachLogo } from './OutreachLogo';
import type { Language, translations } from '../utils/i18n';

interface HeaderProps {
  elapsedMs?: number;
  bestTimeMs?: number | null;
  isRunning?: boolean;
  isLevelStarted?: boolean;
  onReset?: () => void;
  onLogoClick?: () => void;
  currentLevel?: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  language: Language;
  onToggleLanguage: () => void;
  t: typeof translations['en'];
}

export const Header: React.FC<HeaderProps> = ({
  onLogoClick,
  soundEnabled = true,
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
      {/* Left: Brand */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.5 }, minWidth: 0 }}>
        <Box
          onClick={onLogoClick}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: onLogoClick ? 'pointer' : 'default',
            transition: 'opacity 0.2s ease',
            '&:hover': onLogoClick ? { opacity: 0.8 } : undefined,
          }}
        >
          <OutreachLogo height={24} />
        </Box>
      </Box>

      {/* Right Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.8, sm: 1.2 } }}>
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
