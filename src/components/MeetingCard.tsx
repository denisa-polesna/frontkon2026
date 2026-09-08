import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Avatar,
  AvatarGroup,
  Divider,
} from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import EventNoteIcon from '@mui/icons-material/EventNote';
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
        width: 360,
        maxWidth: '92%',
        backgroundColor: '#161A2D',
        borderRadius: 2.5,
        border: '1px solid #282F4E',
        boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65), 0 0 20px rgba(110, 63, 243, 0.15)',
        position: 'relative',
        overflow: 'visible', // allows visual overflow demonstration!
        userSelect: 'none',
      }}
    >
      {/* Top Meeting Info */}
      <CardContent sx={{ p: '16px 18px', pb: 1.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: '#00D2B4' }}>
            <AccessTimeIcon sx={{ fontSize: 16 }} />
            <Typography variant="caption" sx={{ fontWeight: 700, fontSize: '0.74rem' }}>
              10:30 AM – 11:15 AM &bull; 45 min
            </Typography>
          </Box>
          <Chip
            label={t.stageValue}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              backgroundColor: 'rgba(110, 63, 243, 0.2)',
              color: '#C4B5FD',
              border: '1px solid rgba(110, 63, 243, 0.35)',
            }}
          />
        </Box>

        {/* Card Title Container - Target of the Challenge */}
        <Box
          sx={{
            width: '100%',
            maxWidth: 320,
            my: 1.5,
            p: 1,
            backgroundColor: 'rgba(9, 12, 22, 0.6)',
            borderRadius: 1.5,
            border: '1px dashed rgba(110, 63, 243, 0.35)',
            position: 'relative',
          }}
        >
          <Typography variant="caption" sx={{ color: '#8892B0', fontSize: '0.66rem', display: 'block', mb: 0.5 }}>
            {t.meetingTitleHeader || 'Calendar Title:'}
          </Typography>

          {/* The broken / overflowing element */}
          <div
            id="meeting-title-element"
            ref={titleRef as React.RefObject<HTMLDivElement>}
            className="meeting-title"
          >
            Urgent Enterprise Global Sync re: Q4 Multi-Year Renewal with VP of Procurement, Legal Compliance &amp; Architecture Governance Steering Committee
          </div>
        </Box>

        {/* Attendees & Context */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <AvatarGroup max={3} sx={{ '& .MuiAvatar-root': { width: 26, height: 26, fontSize: '0.72rem' } }}>
              <Avatar alt="Sarah" sx={{ bgcolor: '#6E3FF3' }}>SM</Avatar>
              <Avatar alt="David" sx={{ bgcolor: '#00D2B4', color: '#000' }}>DK</Avatar>
              <Avatar alt="Alex" sx={{ bgcolor: '#FFB020' }}>AL</Avatar>
            </AvatarGroup>
            <Typography variant="caption" sx={{ color: '#8E95B2', fontSize: '0.72rem' }}>
              5 attendees
            </Typography>
          </Box>

          <Chip
            label="$240k ARR"
            size="small"
            sx={{
              height: 20,
              fontSize: '0.68rem',
              fontWeight: 800,
              backgroundColor: 'rgba(0, 210, 180, 0.15)',
              color: '#00D2B4',
            }}
          />
        </Box>
      </CardContent>

      <Divider sx={{ borderColor: '#232842' }} />

      {/* Action Footer */}
      <Box sx={{ p: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Button
          size="small"
          startIcon={<EventNoteIcon sx={{ fontSize: 16 }} />}
          sx={{ color: '#8E95B2', fontSize: '0.74rem' }}
        >
          {t.meetingNotesBtn || 'Brief'}
        </Button>

        <Button
          variant="contained"
          size="small"
          startIcon={<VideoCallIcon sx={{ fontSize: 18 }} />}
          sx={{
            backgroundColor: '#6E3FF3',
            fontSize: '0.76rem',
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#572BD4',
            },
          }}
        >
          {t.joinZoomBtn || 'Join Call'}
        </Button>
      </Box>
    </Card>
  );
};
