import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Card,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { OutreachLogo } from './OutreachLogo';
import type { GameStats } from '../utils/storage';
import type { Language, translations } from '../utils/i18n';

interface MainMenuProps {
  stats: GameStats;
  onStartCampaign: () => void;
  onOpenLeaderboard: () => void;
  language: Language;
  onToggleLanguage: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  t: typeof translations['en'];
}

export const MainMenu: React.FC<MainMenuProps> = ({
  stats,
  onStartCampaign,
  onOpenLeaderboard,
  language,
  onToggleLanguage,
  soundEnabled,
  onToggleSound,
  t,
}) => {
  const isL1Done = !!stats.completedLevels['level1'];
  const isL2Done = !!stats.completedLevels['level2'];
  const isL3Done = !!stats.completedLevels['level3'];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#090B14',
        backgroundImage: `
          radial-gradient(circle at 50% 15%, rgba(110, 63, 243, 0.15) 0%, transparent 60%),
          linear-gradient(to bottom, #090B14 0%, #0F1322 100%)
        `,
      }}
    >
      {/* Top Navbar - Outreach and FrontKon 2026 stay here exclusively */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: '16px 32px',
          borderBottom: '1px solid #1E233D',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <OutreachLogo height={22} />
          <Chip
            label="FrontKon 2026 Prague"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.66rem',
              fontWeight: 700,
              backgroundColor: 'rgba(110, 63, 243, 0.2)',
              color: '#C4B5FD',
              border: '1px solid rgba(110, 63, 243, 0.4)',
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={soundEnabled ? t.muteTooltip : t.unmuteTooltip}>
            <IconButton
              size="small"
              onClick={onToggleSound}
              sx={{
                color: soundEnabled ? '#00D2B4' : '#6A708E',
                backgroundColor: '#191D33',
                border: '1px solid #282E4E',
              }}
            >
              {soundEnabled ? <VolumeUpIcon fontSize="small" /> : <VolumeOffIcon fontSize="small" />}
            </IconButton>
          </Tooltip>

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
            }}
          >
            {language === 'cz' ? '🇨🇿 CZ' : '🇬🇧 EN'}
          </Button>
        </Box>
      </Box>

      {/* Main Content Container */}
      <Container maxWidth="lg" sx={{ pt: { xs: 4, md: 6 }, pb: 6, textAlign: 'center' }}>
        {/* Title starts directly without duplicate logo/chip */}
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2.5rem', md: '3.8rem' },
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #C4B5FD 50%, #6E3FF3 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1.5,
          }}
        >
          GIT BLAME: AI
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: '#9BA3BE',
            maxWidth: 640,
            margin: '0 auto 26px auto',
            lineHeight: 1.6,
            fontSize: { xs: '0.98rem', md: '1.12rem' },
          }}
        >
          {t.menuSubtitle}
        </Typography>

        {/* Rival DevBot speech card */}
        <Box
          sx={{
            maxWidth: 680,
            margin: '0 auto 32px auto',
            backgroundColor: '#14172B',
            border: '1px solid rgba(255, 76, 97, 0.3)',
            borderRadius: 3,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            textAlign: 'left',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box
            sx={{
              width: 50,
              height: 50,
              borderRadius: '14px',
              backgroundColor: 'rgba(255, 76, 97, 0.15)',
              border: '1.5px solid #FF4C61',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SmartToyIcon sx={{ color: '#FF4C61', fontSize: 30 }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF' }}>
                DevBot-3000
              </Typography>
              <Chip
                label="PR Author"
                size="small"
                sx={{
                  height: 18,
                  fontSize: '0.62rem',
                  fontWeight: 800,
                  bgcolor: 'rgba(255, 76, 97, 0.2)',
                  color: '#FF7081',
                }}
              />
            </Box>
            <Typography variant="body2" sx={{ color: '#C8D0E5', fontStyle: 'italic', fontSize: '0.86rem' }}>
              &ldquo;{t.menuDevbotTaunt}&rdquo;
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons: START CHALLENGE & LEADERBOARD as separate buttons */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            flexWrap: 'wrap',
            mb: 4.5,
          }}
        >
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon sx={{ fontSize: '30px !important' }} />}
            onClick={onStartCampaign}
            sx={{
              py: 1.8,
              px: { xs: 4, sm: 6 },
              fontSize: { xs: '1.05rem', sm: '1.2rem' },
              fontWeight: 900,
              letterSpacing: '0.02em',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #6E3FF3 0%, #00D2B4 100%)',
              color: '#FFFFFF',
              boxShadow: '0 0 35px rgba(110, 63, 243, 0.5), 0 10px 30px rgba(0, 0, 0, 0.6)',
              transition: 'all 0.25s ease',
              '&:hover': {
                transform: 'translateY(-2px) scale(1.02)',
                boxShadow: '0 0 50px rgba(0, 210, 180, 0.7), 0 14px 35px rgba(0, 0, 0, 0.7)',
              },
            }}
          >
            {t.startCampaignBtn}
          </Button>

          <Button
            variant="outlined"
            size="large"
            startIcon={<LeaderboardIcon sx={{ fontSize: '22px !important' }} />}
            onClick={onOpenLeaderboard}
            sx={{
              py: 1.8,
              px: 4,
              fontSize: { xs: '0.98rem', sm: '1.08rem' },
              fontWeight: 800,
              borderRadius: 3,
              borderColor: '#343C66',
              color: '#C4B5FD',
              backgroundColor: '#12162A',
              '&:hover': {
                borderColor: '#6E3FF3',
                backgroundColor: 'rgba(110, 63, 243, 0.15)',
                color: '#FFF',
              },
            }}
          >
            {t.leaderboardBtn}
          </Button>
        </Box>

        {/* 3 Badges System Showcase */}
        <Box sx={{ mb: 4.5 }}>
          <Typography
            variant="caption"
            sx={{
              color: '#8E95B2',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 1.5,
            }}
          >
            {t.badgesHeader}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: 2,
            }}
          >
            <Box
              sx={{
                backgroundColor: 'rgba(0, 210, 180, 0.08)',
                border: '1px solid rgba(0, 210, 180, 0.3)',
                borderRadius: 2,
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: '1.2rem' }}>🏆</Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: '#00D2B4' }}>
                  {t.seniorBadgeTitle}
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: '#8892B0' }}>
                  {t.seniorBadgeSub}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: 'rgba(196, 181, 253, 0.08)',
                border: '1px solid rgba(196, 181, 253, 0.3)',
                borderRadius: 2,
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: '1.2rem' }}>🥈</Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: '#C4B5FD' }}>
                  {t.midBadgeTitle}
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: '#8892B0' }}>
                  {t.midBadgeSub}
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                backgroundColor: 'rgba(255, 176, 32, 0.08)',
                border: '1px solid rgba(255, 176, 32, 0.3)',
                borderRadius: 2,
                px: 2,
                py: 1,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Typography sx={{ fontSize: '1.2rem' }}>🥉</Typography>
              <Box sx={{ textAlign: 'left' }}>
                <Typography sx={{ fontSize: '0.78rem', fontWeight: 800, color: '#FFD166' }}>
                  {t.promptBadgeTitle}
                </Typography>
                <Typography sx={{ fontSize: '0.68rem', color: '#8892B0' }}>
                  {t.promptBadgeSub}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Level Roadmap Sequence */}
        <Box>
          <Typography
            variant="caption"
            sx={{
              color: '#8E95B2',
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'block',
              mb: 2,
            }}
          >
            {t.roadmapHeader}
          </Typography>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr auto 1fr auto 1fr' },
              alignItems: 'center',
              gap: { xs: 2, md: 1 },
              textAlign: 'left',
            }}
          >
            {/* Step 1 */}
            <Card
              sx={{
                backgroundColor: '#12162A',
                border: isL1Done ? '1px solid #00D2B4' : '1px solid #282E4E',
                borderRadius: 3,
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Chip
                  label="1. Modal Center"
                  size="small"
                  sx={{ bgcolor: 'rgba(110, 63, 243, 0.2)', color: '#C4B5FD', fontWeight: 800, fontSize: '0.68rem' }}
                />
                {isL1Done && <CheckCircleIcon sx={{ fontSize: 16, color: '#00D2B4' }} />}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF', fontSize: '0.9rem', mb: 0.5 }}>
                {t.l1Title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#8892B0', fontSize: '0.74rem' }}>
                {t.l1Desc}
              </Typography>
            </Card>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', color: '#4A5478' }}>
              <ArrowForwardIcon />
            </Box>

            {/* Step 2 */}
            <Card
              sx={{
                backgroundColor: '#12162A',
                border: isL2Done ? '1px solid #00D2B4' : '1px solid #282E4E',
                borderRadius: 3,
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Chip
                  label="2. Sticky CTA"
                  size="small"
                  sx={{ bgcolor: 'rgba(0, 210, 180, 0.15)', color: '#00D2B4', fontWeight: 800, fontSize: '0.68rem' }}
                />
                {isL2Done && <CheckCircleIcon sx={{ fontSize: 16, color: '#00D2B4' }} />}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF', fontSize: '0.9rem', mb: 0.5 }}>
                {t.l2Title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#8892B0', fontSize: '0.74rem' }}>
                {t.l2Desc}
              </Typography>
            </Card>

            <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center', color: '#4A5478' }}>
              <ArrowForwardIcon />
            </Box>

            {/* Step 3 */}
            <Card
              sx={{
                backgroundColor: '#12162A',
                border: isL3Done ? '1px solid #00D2B4' : '1px solid #282E4E',
                borderRadius: 3,
                p: 2,
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Chip
                  label="3. Text Overflow"
                  size="small"
                  sx={{ bgcolor: 'rgba(255, 176, 32, 0.15)', color: '#FFD166', fontWeight: 800, fontSize: '0.68rem' }}
                />
                {isL3Done && <CheckCircleIcon sx={{ fontSize: 16, color: '#00D2B4' }} />}
              </Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF', fontSize: '0.9rem', mb: 0.5 }}>
                {t.l3Title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#8892B0', fontSize: '0.74rem' }}>
                {t.l3Desc}
              </Typography>
            </Card>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
