import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
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
  soundEnabled = true,
  onToggleSound,
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
          px: { xs: 2, sm: 4 },
          py: { xs: 1.6, sm: 2.2 },
          backgroundColor: '#1f1f1f',
          borderBottom: '1px solid #2e2e2e',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <OutreachLogo height={26} />
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
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
                  width: 32,
                  height: 32,
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
          py: { xs: 2.5, sm: 3.5 },
          px: { xs: 3.5, sm: 4 },
          textAlign: 'center',
        }}
      >
        {/* FrontKon 2026 Eyebrow Badge */}
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 1.6,
            py: 0.5,
            mb: { xs: 1, sm: 1.4 },
            borderRadius: '999px',
            backgroundColor: 'rgba(89, 81, 255, 0.16)',
            border: '1px solid rgba(179, 176, 255, 0.35)',
            boxShadow: '0 2px 14px rgba(89, 81, 255, 0.25)',
          }}
        >
          <Box
            sx={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: '#00D2B4',
              boxShadow: '0 0 8px #00D2B4',
            }}
          />
          <Typography
            sx={{
              color: '#FFFFFF',
              fontSize: { xs: '0.72rem', sm: '0.8rem' },
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
            }}
          >
            FrontKon 2026 • Prague
          </Typography>
        </Box>

        <Typography
          variant="h2"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '2.4rem', sm: '3.4rem', md: '4.2rem' },
            letterSpacing: '-0.03em',
            color: '#FFFFFF',
            mb: 0.8,
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
            margin: '0 auto',
            lineHeight: 1.6,
            fontSize: { xs: '0.94rem', sm: '1.08rem' },
          }}
        >
          {t.menuSubtitle}
        </Typography>

        {/* Rival DevBot speech card - aligned to same width as action buttons */}
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: 440 },
            width: '100%',
            my: { xs: 3.5, sm: 4.5 },
            mx: 'auto',
            backgroundColor: '#FFFFFF',
            backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/698651938e6808536770fe17_dot-repeat-svg.svg")`,
            backgroundRepeat: 'repeat',
            border: '1px solid rgba(89, 81, 255, 0.35)',
            borderRadius: '12px',
            p: { xs: 1.8, sm: 2.2 },
            display: 'flex',
            alignItems: 'center',
            gap: 1.8,
            textAlign: 'left',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          }}
        >
          {/* Exact outreach.ai icon square: background #5951ff, color #fff, radius 6px */}
          <Box
            sx={{
              width: { xs: 44, sm: 48 },
              height: { xs: 44, sm: 48 },
              borderRadius: '6px',
              backgroundColor: '#5951ff',
              color: '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 4px 14px rgba(89, 81, 255, 0.35)',
            }}
          >
            <SmartToyIcon sx={{ color: '#FFFFFF', fontSize: { xs: 26, sm: 30 } }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#000000', fontSize: '0.88rem', mb: 0.3 }}>
              DevBot-3000
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000000',
                fontStyle: 'italic',
                fontSize: { xs: '0.82rem', sm: '0.88rem' },
                lineHeight: 1.45,
              }}
            >
              &ldquo;{t.menuDevbotTaunt}&rdquo;
            </Typography>
          </Box>
        </Box>

        {/* Action Buttons: START CHALLENGE & LEADERBOARD (exact same width as bot card) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.5,
            width: '100%',
            maxWidth: { xs: '100%', sm: 440 },
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

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          py: { xs: 1.8, sm: 2.2 },
          px: { xs: 2, sm: 4 },
          backgroundColor: '#1f1f1f',
          borderTop: '1px solid #2e2e2e',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 1.5,
          zIndex: 10,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <OutreachLogo height={20} />
          <Typography
            sx={{
              color: '#888888',
              fontSize: '0.78rem',
              fontWeight: 400,
            }}
          >
            © 2026 Outreach, Inc.
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography
            component="a"
            href="https://www.outreach.ai/"
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.6,
              transition: 'color 0.2s ease',
              '&:hover': {
                color: '#5951ff',
                textDecoration: 'underline',
              },
            }}
          >
            outreach.ai
            <OpenInNewIcon sx={{ fontSize: 14, color: 'inherit' }} />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
