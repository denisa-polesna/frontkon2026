import React from 'react';
import {
  Card,
  Typography,
  Box,
  Chip,
  Button,
} from '@mui/material';
import HandshakeIcon from '@mui/icons-material/Handshake';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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
        width: 420,
        maxWidth: '94%',
        backgroundColor: '#161A2D',
        borderRadius: 2.5,
        border: '1px solid #282F4E',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65), 0 0 20px rgba(110, 63, 243, 0.15)',
        display: 'flex',
        flexDirection: 'column',
        height: 440,
        overflow: 'hidden',
        position: 'relative',
        userSelect: 'none',
      }}
    >
      {/* Top Fixed Deal Header */}
      <Box
        sx={{
          p: '14px 18px',
          borderBottom: '1px solid #232842',
          backgroundColor: '#121526',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexShrink: 0,
        }}
      >
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFFFFF', fontSize: '0.94rem' }}>
              Acme Global Corp
            </Typography>
            <Chip
              label="$450,000 ARR"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 800,
                backgroundColor: 'rgba(0, 210, 180, 0.15)',
                color: '#00D2B4',
              }}
            />
          </Box>
          <Typography variant="caption" sx={{ color: '#8892B0', fontSize: '0.72rem' }}>
            Stage: Negotiation &bull; Owner: Sarah Miller
          </Typography>
        </Box>

        <Chip
          label="Closing Q4"
          size="small"
          sx={{
            height: 20,
            fontSize: '0.65rem',
            fontWeight: 700,
            backgroundColor: 'rgba(110, 63, 243, 0.2)',
            color: '#C4B5FD',
          }}
        />
      </Box>

      {/* Scrollable Deal Activities Container */}
      <Box
        id="timeline-scroll-container"
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
          position: 'relative',
        }}
      >
        {/* Activity 1 */}
        <Box sx={{ p: 1.5, backgroundColor: '#111422', borderRadius: 2, border: '1px solid #212640' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#00D2B4', mb: 0.5 }}>
            <PhoneInTalkIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              Kaia AI Call Recording &bull; 42 mins
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#CCD2E6' }}>
            VP of Procurement approved licensing terms. Next step: Sign contract before Friday cutoff.
          </Typography>
        </Box>

        {/* Activity 2 */}
        <Box sx={{ p: 1.5, backgroundColor: '#111422', borderRadius: 2, border: '1px solid #212640' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#C4B5FD', mb: 0.5 }}>
            <EmailIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              Email Sequence &bull; Step 4 delivered
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#CCD2E6' }}>
            &ldquo;Security whitepaper and SOC2 Type II compliance reports verified by architecture council.&rdquo;
          </Typography>
        </Box>

        {/* Activity 3 */}
        <Box sx={{ p: 1.5, backgroundColor: '#111422', borderRadius: 2, border: '1px solid #212640' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#00D2B4', mb: 0.5 }}>
            <VerifiedUserIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              InfoSec Approval Complete
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#CCD2E6' }}>
            Vendor onboarding questionnaire approved with zero pending security findings.
          </Typography>
        </Box>

        {/* Activity 4 */}
        <Box sx={{ p: 1.5, backgroundColor: '#111422', borderRadius: 2, border: '1px solid #212640' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#FFB020', mb: 0.5 }}>
            <RequestQuoteIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              Multi-Year Enterprise Proposal Sent
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#CCD2E6' }}>
            Standard 3-year term agreement with annual invoicing and dedicated customer success architect.
          </Typography>
        </Box>

        {/* Activity 5 */}
        <Box sx={{ p: 1.5, backgroundColor: '#111422', borderRadius: 2, border: '1px solid #212640' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#00D2B4', mb: 0.5 }}>
            <CheckCircleIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
              Legal Redlines Accepted
            </Typography>
          </Box>
          <Typography variant="body2" sx={{ fontSize: '0.78rem', color: '#CCD2E6' }}>
            Indemnification mutual cap agreed by both legal teams. Ready for executive sign-off!
          </Typography>
        </Box>

        {/* Scroll hint spacer so player can scroll */}
        <Box sx={{ py: 2, textAlign: 'center' }}>
          <Typography variant="caption" sx={{ color: '#565F80', fontStyle: 'italic' }}>
            {t.scrollHint || 'Scroll up and down to test sticky docking...'}
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
              p: 1.5,
              borderRadius: 2,
              backgroundColor: '#0F1325',
              border: '1.5px solid #6E3FF3',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.8), 0 0 16px rgba(110, 63, 243, 0.3)',
            }}
          >
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#FFF', fontSize: '0.82rem' }}>
                {t.dealReadyTitle || 'Deal Ready to Close'}
              </Typography>
              <Typography variant="caption" sx={{ color: '#8892B0', fontSize: '0.68rem' }}>
                All procurement approvals met
              </Typography>
            </Box>

            <Button
              variant="contained"
              size="small"
              startIcon={<HandshakeIcon />}
              sx={{
                backgroundColor: '#00D2B4',
                color: '#08141B',
                fontWeight: 800,
                fontSize: '0.76rem',
                '&:hover': { backgroundColor: '#33DBC2' },
              }}
            >
              {t.signDealBtn || 'Sign Deal'}
            </Button>
          </Box>
        </div>
      </Box>
    </Card>
  );
};
