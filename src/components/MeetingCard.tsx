import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  AvatarGroup,
} from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import type { translations } from '../utils/i18n';

interface MeetingCardProps {
  id?: string;
  titleRef?: React.RefObject<HTMLDivElement | null>;
  t: typeof translations['en'];
}

export const MeetingCard: React.FC<MeetingCardProps> = ({ id = 'meeting-card', titleRef, t }) => {
  return (
    <Card
      id={id}
      sx={{
        width: { xs: 330, sm: 380 },
        maxWidth: '96%',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        userSelect: 'none',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: '#EEEDFE',
              color: '#5951FF',
              width: 34,
              height: 34,
              borderRadius: '8px',
            }}
          >
            <EventNoteIcon sx={{ fontSize: 19 }} />
          </Avatar>
        }
        action={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 0.6,
              color: '#6B7280',
              backgroundColor: '#F3F4F6',
              borderRadius: '6px',
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </Box>
        }
        title={
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '0.94rem', lineHeight: 1.2 }}>
            Detail schůzky
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.74rem' }}>
            Acme Global • Q4 Renewal
          </Typography>
        }
        sx={{
          p: { xs: 1.6, sm: 2 },
          pb: 1.6,
          borderBottom: '1px solid #E5E7EB',
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: { xs: 1.8, sm: 2.2 }, pt: 2, pb: 1 }}>
        {/* Time row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#5951FF' }}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 600, fontSize: '0.8rem', color: '#111827' }}>
              Dnes 14:00 – 15:00 (60 min)
            </Typography>
          </Box>
          <Chip
            label={t.stageValue}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 600,
              backgroundColor: '#EEEDFE',
              color: '#5951FF',
              borderRadius: '6px',
            }}
          />
        </Box>

        {/* Meeting Title Field - The Target of the Challenge */}
        <Box sx={{ mb: 2 }}>
          <Typography component="label" sx={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', mb: 0.6 }}>
            {t.meetingTitleHeader || 'Předmět schůzky:'}
          </Typography>

          <Box
            sx={{
              width: '100%',
              backgroundColor: '#F9FAFB',
              borderRadius: '8px',
              border: '1px solid #E5E7EB',
              p: 1.2,
              boxSizing: 'border-box',
              overflow: 'hidden',
            }}
          >
            {/* The element being styled with .meeting-title */}
            <div
              id="meeting-title-element"
              ref={titleRef as React.RefObject<HTMLDivElement>}
              className="meeting-title"
            >
              Urgent Enterprise Global Sync re: Q4 Multi-Year Renewal with VP of Procurement, Legal Compliance &amp; Architecture Governance Steering Committee
            </div>
          </Box>
        </Box>

        {/* Attendees & Deal ARR */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 26, height: 26, fontSize: '0.72rem', border: '1.5px solid #FFFFFF' } }}>
              <Avatar alt="Sarah" sx={{ bgcolor: '#5951FF' }}>SC</Avatar>
              <Avatar alt="David" sx={{ bgcolor: '#00D2B4', color: '#000' }}>JM</Avatar>
              <Avatar alt="Alex" sx={{ bgcolor: '#FFB020' }}>BW</Avatar>
            </AvatarGroup>
            <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.74rem', fontWeight: 600 }}>
              3 účastníci
            </Typography>
          </Box>

          <Box
            sx={{
              px: 1.2,
              py: '2px',
              borderRadius: '6px',
              backgroundColor: '#ECFDF5',
              color: '#047857',
              fontSize: '0.74rem',
              fontWeight: 700,
              fontFamily: 'monospace',
            }}
          >
            $450k ARR
          </Box>
        </Box>
      </CardContent>

      {/* Action Footer */}
      <CardActions sx={{ px: { xs: 1.8, sm: 2.2 }, py: 1.4, backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          size="small"
          sx={{
            height: 36,
            color: '#4B5563',
            fontSize: '0.82rem',
            fontWeight: 600,
            textTransform: 'none',
            px: 1.6,
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#F3F4F6', color: '#111827' },
          }}
        >
          Zrušit
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            height: 36,
            backgroundColor: '#5951FF',
            color: '#FFFFFF',
            fontSize: '0.82rem',
            fontWeight: 600,
            borderRadius: '8px',
            textTransform: 'none',
            boxShadow: 'none',
            px: 2,
            '&:hover': {
              backgroundColor: '#4338CA',
              boxShadow: 'none',
            },
          }}
        >
          {t.joinZoomBtn || 'Připojit se'}
        </Button>
      </CardActions>
    </Card>
  );
};
