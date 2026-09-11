import React from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Container,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { OutreachLogo } from './OutreachLogo';
import type { GameStats } from '../utils/storage';
import type { Language, translations } from '../utils/i18n';

interface MainMenuProps {
  stats: GameStats;
  onStartCampaign: () => void;
  onOpenLeaderboard: () => void;
  language: Language;
  onToggleLanguage: () => void;
  soundEnabled?: boolean;
  onToggleSound?: () => void;
  t: typeof translations['en'];
}

export const MainMenu: React.FC<MainMenuProps> = ({
  onStartCampaign,
  onOpenLeaderboard,
  language,
  onToggleLanguage,
  t,
}) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#120042',
        backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/69e7e28ad18979a7c4351f30_Hero%20Frame.svg")`,
        backgroundPosition: '50% 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'cover', md: '100% auto' },
      }}
    >
      {/* Top Navbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1.5, sm: 3.5 },
          py: { xs: 1.2, sm: 1.8 },
          backgroundColor: '#1f1f1f',
          borderBottom: '1px solid #2e2e2e',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
          <OutreachLogo height={20} />
          <Chip
            label="FrontKon 2026 Prague"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              backgroundColor: 'rgba(89, 81, 255, 0.25)',
              color: '#FFFFFF',
              border: '1px solid rgba(179, 176, 255, 0.35)',
              display: { xs: 'none', sm: 'inline-flex' },
            }}
          />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={onToggleLanguage}
            sx={{
              minWidth: 46,
              px: 1,
              py: '3px',
              height: 32,
              fontSize: '0.74rem',
              fontWeight: 700,
              borderColor: '#3a3a3a',
              backgroundColor: '#282828',
              color: '#FFFFFF',
              borderRadius: '6px',
              '&:hover': {
                borderColor: '#5951ff',
                backgroundColor: '#5951ff',
                color: '#FFFFFF',
              },
            }}
          >
            {language === 'cz' ? 'CZ' : 'EN'}
          </Button>
        </Box>
      </Box>

      {/* Main Content Container */}
      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: { xs: 4, sm: 6 },
          px: { xs: 2, sm: 3 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            mb: 1.5,
          }}
        >
          GIT BLAME: AI
        </Typography>

        <Typography
          variant="subtitle1"
          sx={{
            color: '#FFFFFF',
            opacity: 0.9,
            maxWidth: 580,
            margin: '0 auto 28px auto',
            lineHeight: 1.6,
            fontSize: { xs: '0.94rem', sm: '1.08rem' },
          }}
        >
          {t.menuSubtitle}
        </Typography>

        {/* Rival DevBot speech card */}
        <Box
          sx={{
            maxWidth: 600,
            width: '100%',
            margin: '0 auto 36px auto',
            backgroundColor: '#1c0c52',
            border: '1px solid rgba(255, 76, 97, 0.35)',
            borderRadius: 2.5,
            p: { xs: 1.8, sm: 2.2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1.8,
            textAlign: 'left',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Box
            sx={{
              width: { xs: 44, sm: 50 },
              height: { xs: 44, sm: 50 },
              borderRadius: '12px',
              backgroundColor: 'rgba(255, 76, 97, 0.15)',
              border: '1.5px solid #FF4C61',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <SmartToyIcon sx={{ color: '#FF4C61', fontSize: { xs: 26, sm: 30 } }} />
          </Box>
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.88rem' }}>
                DevBot-3000
              </Typography>
              <Chip
                label="PR Author"
                size="small"
                sx={{
                  height: 16,
                  fontSize: '0.6rem',
                  fontWeight: 800,
                  bgcolor: 'rgba(255, 76, 97, 0.25)',
                  color: '#FF7081',
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#FFFFFF',
                fontStyle: 'italic',
                fontSize: { xs: '0.82rem', sm: '0.88rem' },
                lineHeight: 1.45,
                opacity: 0.95,
              }}
            >
              &ldquo;{t.menuDevbotTaunt}&rdquo;
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons: START CHALLENGE & LEADERBOARD (flex column stacked) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            width: '100%',
            maxWidth: { xs: 260, sm: 300 },
            margin: '0 auto',
          }}
        >
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onStartCampaign}
            sx={{
              py: 1.4,
              fontSize: { xs: '1rem', sm: '1.08rem' },
              fontWeight: 600,
              letterSpacing: '0.01em',
              borderRadius: '6px',
              backgroundColor: '#5951ff',
              color: '#FFFFFF',
              boxShadow: 'none',
              transition: 'background-color 0.25s ease',
              '&:hover': {
                backgroundColor: '#3028a1',
                boxShadow: 'none',
                color: '#FFFFFF',
              },
              '&:active': {
                backgroundColor: '#030268',
                color: '#FFFFFF',
              },
            }}
          >
            {t.startCampaignBtn}
          </Button>

          <Button
            variant="outlined"
            size="large"
            fullWidth
            startIcon={<LeaderboardIcon sx={{ fontSize: '20px !important', color: '#FFFFFF' }} />}
            onClick={onOpenLeaderboard}
            sx={{
              py: 1.4,
              fontSize: { xs: '0.94rem', sm: '1.02rem' },
              fontWeight: 600,
              borderRadius: '6px',
              borderColor: 'rgba(179, 176, 255, 0.35)',
              color: '#FFFFFF',
              backgroundColor: 'transparent',
              transition: 'all 0.25s ease',
              '&:hover': {
                borderColor: '#5951ff',
                backgroundColor: '#5951ff',
                color: '#FFFFFF',
              },
            }}
          >
            {t.leaderboardBtn}
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
