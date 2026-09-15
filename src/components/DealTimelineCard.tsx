import React from 'react';
import {
  Card,
  CardHeader,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
} from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import type { translations } from '../utils/i18n';

interface DealTimelineCardProps {
  id?: string;
  actionBarRef?: React.RefObject<HTMLDivElement | null>;
  t: typeof translations['en'];
}

export const DealTimelineCard: React.FC<DealTimelineCardProps> = ({
  id = 'deal-timeline-card',
  actionBarRef,
  t,
}) => {
  return (
    <Card
      id={id}
      sx={{
        width: { xs: 330, sm: 380, xxl: 480 },
        maxWidth: '96%',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid rgba(89, 81, 255, 0.25)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), 0 2px 16px rgba(0, 0, 0, 0.08)',
        display: 'flex',
        flexDirection: 'column',
        height: { xs: 290, sm: 380, md: 440 },
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Top Fixed Deal Header */}
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: '#5951ff',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '6px',
            }}
          >
            <HandshakeIcon sx={{ fontSize: 18 }} />
          </Avatar>
        }
        action={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 0.5,
              color: '#666666',
              backgroundColor: '#f5f4ff',
              borderRadius: '6px',
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </Box>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#120042', fontSize: '0.94rem', lineHeight: 1.2 }}>
              Acme Global Corp
            </Typography>
            <Chip
              label="$450k ARR"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 800,
                backgroundColor: 'rgba(0, 210, 180, 0.15)',
                color: '#007A68',
                borderRadius: '4px',
              }}
            />
          </Box>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#767484', fontSize: '0.72rem' }}>
            Fáze: Vyjednávání &bull; Vlastník: Sarah Miller
          </Typography>
        }
        sx={{
          p: { xs: 1.8, sm: 2.2 },
          pb: 1.6,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #e2e0ed',
          flexShrink: 0,
        }}
      />

      {/* Scrollable Deal Activities Container */}
      <Box
        id="timeline-scroll-container"
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: { xs: 1.5, sm: 2 },
          display: 'flex',
          flexDirection: 'column',
          gap: 1.2,
          position: 'relative',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Activity 1 */}
        <Box sx={{ p: 1.2, backgroundColor: '#fbfaff', borderRadius: '8px', border: '1.5px solid #e2e0ed' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#007A68', mb: 0.4 }}>
            <PhoneInTalkIcon sx={{ fontSize: 15 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.76rem' }}>
              Kaia AI záznam hovoru &bull; 42 min
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.76rem', color: '#4B4860', lineHeight: 1.35 }}>
            VP schválil licenční podmínky. Další krok: Podepsat smlouvu do páteční uzávěrky.
          </Typography>
        </Box>

        {/* Activity 2 */}
        <Box sx={{ p: 1.2, backgroundColor: '#fbfaff', borderRadius: '8px', border: '1.5px solid #e2e0ed' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#5951ff', mb: 0.4 }}>
            <EmailIcon sx={{ fontSize: 15 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.76rem' }}>
              Emailová sekvence &bull; Krok 4 doručen
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.76rem', color: '#4B4860', lineHeight: 1.35 }}>
            Bezpečnostní dokumentace a SOC2 Type II certifikace byly ověřeny architektonickou radou.
          </Typography>
        </Box>

        {/* Activity 3 */}
        <Box sx={{ p: 1.2, backgroundColor: '#fbfaff', borderRadius: '8px', border: '1.5px solid #e2e0ed' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#007A68', mb: 0.4 }}>
            <VerifiedUserIcon sx={{ fontSize: 15 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.76rem' }}>
              Bezpečnostní prověrka dokončena
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.76rem', color: '#4B4860', lineHeight: 1.35 }}>
            Dotazník dodavatele schválen s nulovými bezpečnostními nálezy.
          </Typography>
        </Box>

        {/* Activity 4 */}
        <Box sx={{ p: 1.2, backgroundColor: '#fbfaff', borderRadius: '8px', border: '1.5px solid #e2e0ed' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#FFB020', mb: 0.4 }}>
            <RequestQuoteIcon sx={{ fontSize: 15 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.76rem' }}>
              Odeslán víceletý enterprise návrh
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.76rem', color: '#4B4860', lineHeight: 1.35 }}>
            Standardní 3letá smlouva s roční fakturací a dedikovaným Customer Success architektem.
          </Typography>
        </Box>

        {/* Activity 5 */}
        <Box sx={{ p: 1.2, backgroundColor: '#fbfaff', borderRadius: '8px', border: '1.5px solid #e2e0ed' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, color: '#007A68', mb: 0.4 }}>
            <CheckCircleIcon sx={{ fontSize: 15 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.76rem' }}>
              Právní připomínky akceptovány
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.76rem', color: '#4B4860', lineHeight: 1.35 }}>
            Vzájemný limit odpovědnosti odsouhlasen. Připraveno pro exekutivní podpis!
          </Typography>
        </Box>

        {/* Scroll hint */}
        <Box sx={{ py: 1.5, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#767484', fontStyle: 'italic', fontSize: '0.72rem' }}>
            {t.scrollHint || 'Posunem vyzkoušej přišpendlení lišty...'}
          </Typography>
        </Box>

        {/* THE TARGET STICKY CTA BAR - User's CSS applies here */}
        <div
          id="deal-action-bar-element"
          ref={actionBarRef as React.RefObject<HTMLDivElement>}
          className="deal-action-bar"
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: 1.4,
              borderRadius: '10px',
              backgroundColor: '#FFFFFF',
              border: '1.5px solid #5951ff',
              boxShadow: '0 8px 24px rgba(89, 81, 255, 0.25)',
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#120042', fontSize: '0.82rem' }}>
                {t.dealReadyTitle || 'Dohoda připravena k podpisu'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#767484', fontSize: '0.68rem' }}>
                Všechna schválení získána
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="small"
              startIcon={<HandshakeIcon sx={{ fontSize: 16 }} />}
              sx={{
                backgroundColor: '#5951ff',
                color: '#FFFFFF',
                fontWeight: 700,
                fontSize: '0.76rem',
                borderRadius: '6px',
                boxShadow: 'none',
                textTransform: 'none',
                '&:hover': { backgroundColor: '#3028a1', boxShadow: 'none' },
              }}
            >
              {t.signDealBtn || 'Podepsat'}
            </Button>
          </Box>
        </div>
      </Box>
    </Card>
  );
};
