import React from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  IconButton,
  Tooltip,
} from '@mui/material';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { OutreachLogo } from './OutreachLogo';
import { FailBotSpeechCard } from './FailBotSpeechCard';
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
        height: '100%',
        minHeight: '100%',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#120042',
        backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/69e7e28ad18979a7c4351f30_Hero%20Frame.svg")`,
        backgroundPosition: '50% 0',
        backgroundRepeat: 'no-repeat',
        backgroundSize: { xs: 'cover', md: '100% auto' },
        overflow: 'hidden',
      }}
    >
      {/* Top Navbar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: '30px',
          py: { xs: 1.4, sm: 1.8 },
          backgroundColor: '#1f1f1f',
          borderBottom: '1px solid #2e2e2e',
          flexShrink: 0,
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
          gap: { xs: '32px', sm: '36px', md: '32px', lg: '36px' },
          py: { xs: 2, sm: 2.5, md: 3 },
          px: '30px',
          textAlign: 'center',
          minHeight: 0,
        }}
      >
        {/* Headline Block */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: '20px', sm: '24px', md: '22px' },
          }}
        >
          {/* FrontKon 2026 Eyebrow Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1,
              px: { xs: 2, sm: 2.4 },
              py: { xs: 0.5, sm: 0.6 },
              borderRadius: '999px',
              backgroundColor: 'rgba(89, 81, 255, 0.18)',
              border: '1px solid rgba(179, 176, 255, 0.45)',
              boxShadow: '0 2px 18px rgba(89, 81, 255, 0.35)',
            }}
          >
            <Box
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                backgroundColor: '#00D2B4',
                boxShadow: '0 0 8px #00D2B4',
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '0.8rem', sm: '0.88rem', md: '0.92rem' },
                fontWeight: 700,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
              }}
            >
              FrontKon 2026 • Prague
            </Typography>
          </Box>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: { xs: 1, sm: 1.2 },
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 900,
                fontSize: { xs: '2.4rem', sm: '3rem', md: '3.4rem', lg: '3.8rem' },
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                lineHeight: 1.1,
                m: 0,
              }}
            >
              GIT BLAME: AI
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: '#FFFFFF',
                opacity: 0.9,
                maxWidth: { xs: '100%', sm: 520, md: 560 },
                lineHeight: { xs: 1.45, sm: 1.55 },
                fontSize: { xs: '0.9rem', sm: '0.98rem', md: '1.04rem' },
                m: 0,
              }}
            >
              {t.menuSubtitle}
            </Typography>
          </Box>
        </Box>

        {/* Rival FailBot speech card - aligned to same width as action buttons */}
        <FailBotSpeechCard
          message={t.menuDevbotTaunt}
          name="FailBot-404"
          sx={{
            maxWidth: { xs: '100%', sm: 440, md: 460 },
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(89, 81, 255, 0.35)',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          }}
        />

        {/* Action Buttons: START CHALLENGE & LEADERBOARD (exact same width as bot card) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 1.2,
            width: '100%',
            maxWidth: { xs: '100%', sm: 440, md: 460 },
            m: 0,
          }}
        >
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={onStartCampaign}
            sx={{
              py: { xs: 1.1, sm: 1.3 },
              fontSize: { xs: '0.94rem', sm: '1.05rem' },
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
            onClick={onOpenLeaderboard}
            sx={{
              py: { xs: 1.1, sm: 1.3 },
              fontSize: { xs: '0.94rem', sm: '1.05rem' },
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
          py: { xs: 1.5, md: 1.8 },
          px: '30px',
          backgroundColor: '#1f1f1f',
          borderTop: '1px solid #2e2e2e',
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: { xs: 'center', md: 'space-between' },
          gap: { xs: 0.8, md: 2 },
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1, sm: 1.4 },
            flexWrap: 'nowrap',
            whiteSpace: 'nowrap',
          }}
        >
          <OutreachLogo height={18} />
          <Typography
            sx={{
              color: '#888888',
              fontSize: { xs: '0.74rem', sm: '0.84rem' },
              fontWeight: 400,
              whiteSpace: 'nowrap',
            }}
          >
            © 2026 Outreach,&nbsp;Inc.
          </Typography>
        </Box>

        <Typography
          component="a"
          href="https://www.outreach.ai/"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: '#FFFFFF',
            fontSize: { xs: '0.8rem', sm: '0.88rem' },
            fontWeight: 600,
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            whiteSpace: 'nowrap',
            transition: 'color 0.2s ease',
            '&:hover': {
              color: '#5951ff',
              textDecoration: 'underline',
            },
          }}
        >
          outreach.ai
          <OpenInNewIcon sx={{ fontSize: { xs: 13, sm: 15 }, color: 'inherit' }} />
        </Typography>
      </Box>
    </Box>
  );
};
