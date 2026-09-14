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
          px: { xs: 2, sm: 4 },
          py: { xs: 1.2, sm: 1.8 },
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
          gap: { xs: 2.5, sm: 3, md: '40px' },
          py: { xs: 2, sm: 3 },
          px: { xs: 2.5, sm: 4 },
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
            gap: { xs: 1, sm: 1.2 },
          }}
        >
          {/* FrontKon 2026 Eyebrow Badge */}
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 1.2,
              px: { xs: 2, sm: 2.6 },
              py: { xs: 0.5, sm: 0.7 },
              borderRadius: '999px',
              backgroundColor: 'rgba(89, 81, 255, 0.18)',
              border: '1px solid rgba(179, 176, 255, 0.45)',
              boxShadow: '0 2px 18px rgba(89, 81, 255, 0.35)',
            }}
          >
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                backgroundColor: '#00D2B4',
                boxShadow: '0 0 10px #00D2B4',
                flexShrink: 0,
              }}
            />
            <Typography
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: '0.84rem', sm: '0.96rem', md: '1.02rem' },
                fontWeight: 800,
                letterSpacing: '0.04em',
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
              fontSize: { xs: '2rem', sm: '3rem', md: '3.8rem' },
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
              maxWidth: 580,
              lineHeight: { xs: 1.45, sm: 1.6 },
              fontSize: { xs: '0.84rem', sm: '0.98rem', md: '1.05rem' },
              m: 0,
            }}
          >
            {t.menuSubtitle}
          </Typography>
        </Box>

        {/* Rival DevBot speech card - aligned to same width as action buttons */}
        <Box
          sx={{
            maxWidth: { xs: '100%', sm: 440 },
            width: '100%',
            m: 0,
            backgroundColor: '#FFFFFF',
            backgroundImage: `url("https://cdn.prod.website-files.com/696ea7504e736c595e9a2313/698651938e6808536770fe17_dot-repeat-svg.svg")`,
            backgroundRepeat: 'repeat',
            border: '1px solid rgba(89, 81, 255, 0.35)',
            borderRadius: '12px',
            p: { xs: 1.4, sm: 1.8, md: 2.2 },
            display: 'flex',
            alignItems: 'center',
            gap: { xs: 1.4, sm: 1.8 },
            textAlign: 'left',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
          }}
        >
          {/* Exact outreach.ai icon square: background #5951ff, color #fff, radius 6px */}
          <Box
            sx={{
              width: { xs: 40, sm: 46 },
              height: { xs: 40, sm: 46 },
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
            <SmartToyIcon sx={{ color: '#FFFFFF', fontSize: { xs: 24, sm: 28 } }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#000000', fontSize: '0.85rem', mb: 0.2 }}>
              DevBot-3000
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#000000',
                fontStyle: 'italic',
                fontSize: { xs: '0.78rem', sm: '0.84rem', md: '0.88rem' },
                lineHeight: 1.4,
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
            gap: 1.2,
            width: '100%',
            maxWidth: { xs: '100%', sm: 440 },
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
          py: { xs: 1.6, sm: 2 },
          px: { xs: 2, sm: 4, md: 5 },
          backgroundColor: '#1f1f1f',
          borderTop: '1px solid #2e2e2e',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 0.8,
          flexShrink: 0,
          zIndex: 10,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 1, sm: 1.2 },
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
