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
        borderRadius: '16px',
        border: '1px solid rgba(89, 81, 255, 0.25)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), 0 2px 16px rgba(0, 0, 0, 0.08)',
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
              bgcolor: '#5951ff',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '6px',
            }}
          >
            <EventNoteIcon sx={{ fontSize: 18 }} />
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
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#120042', fontSize: '0.94rem', lineHeight: 1.2 }}>
            Detail schůzky
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#767484', fontSize: '0.72rem' }}>
            Acme Global • Q4 Renewal
          </Typography>
        }
        sx={{
          p: { xs: 1.8, sm: 2.2 },
          pb: 1.6,
          borderBottom: '1px solid #e2e0ed',
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: { xs: 1.8, sm: 2.2 }, pt: 2, pb: 1 }}>
        {/* Time row */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#5951ff' }}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.78rem', color: '#120042' }}>
              Dnes 14:00 – 15:00 (60 min)
            </Typography>
          </Box>
          <Chip
            label={t.stageValue}
            size="small"
            sx={{
              height: 22,
              fontSize: '0.7rem',
              fontWeight: 700,
              backgroundColor: 'rgba(89, 81, 255, 0.12)',
              color: '#5951ff',
              borderRadius: '6px',
            }}
          />
        </Box>

        {/* Meeting Title Field - The Target of the Challenge */}
        <Box sx={{ mb: 2 }}>
          <Typography component="label" sx={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#120042', mb: 0.6 }}>
            {t.meetingTitleHeader || 'Předmět schůzky:'}
          </Typography>

          <Box
            sx={{
              width: '100%',
              backgroundColor: '#fbfaff',
              borderRadius: '6px',
              border: '1.5px solid #d4d2e3',
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
              <Avatar alt="Sarah" sx={{ bgcolor: '#5951ff' }}>SC</Avatar>
              <Avatar alt="David" sx={{ bgcolor: '#00D2B4', color: '#000' }}>JM</Avatar>
              <Avatar alt="Alex" sx={{ bgcolor: '#FFB020' }}>BW</Avatar>
            </AvatarGroup>
            <Typography variant="caption" sx={{ color: '#767484', fontSize: '0.74rem', fontWeight: 600 }}>
              3 účastníci
            </Typography>
          </Box>

          <Box
            sx={{
              px: 1,
              py: '2px',
              borderRadius: '6px',
              backgroundColor: 'rgba(0, 210, 180, 0.15)',
              color: '#007A68',
              fontSize: '0.74rem',
              fontWeight: 800,
              fontFamily: 'monospace',
            }}
          >
            $450k ARR
          </Box>
        </Box>
      </CardContent>

      {/* Action Footer */}
      <CardActions sx={{ px: { xs: 1.8, sm: 2.2 }, pb: { xs: 1.8, sm: 2.2 }, pt: 1, justifyContent: 'flex-end', gap: 1 }}>
        <Button
          size="small"
          sx={{
            height: 36,
            color: '#555555',
            fontSize: '0.82rem',
            fontWeight: 600,
            textTransform: 'none',
            px: 1.6,
          }}
        >
          Zrušit
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            height: 36,
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            fontSize: '0.82rem',
            fontWeight: 600,
            borderRadius: '6px',
            textTransform: 'none',
            boxShadow: 'none',
            px: 2,
          }}
        >
          {t.joinZoomBtn || 'Připojit se'}
        </Button>
      </CardActions>
    </Card>
  );
};
