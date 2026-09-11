import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Chip,
  Collapse,
  Button,
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { sound } from '../utils/audio';
import type { translations } from '../utils/i18n';

interface MissionBannerProps {
  levelId: 'level1' | 'level2' | 'level3';
  isSolved: boolean;
  devBot: {
    mood: 'confident' | 'confused' | 'panicked' | 'defeated';
    message: string;
    badgeLabel: string;
  };
  t: typeof translations['en'];
}

export const MissionBanner: React.FC<MissionBannerProps> = ({
  levelId,
  isSolved,
  devBot,
  t,
}) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const prevMessageRef = useRef<string>(devBot.message);

  useEffect(() => {
    if (prevMessageRef.current !== devBot.message) {
      sound.playNotification();
      prevMessageRef.current = devBot.message;
    }
  }, [devBot.message]);

  const getMoodColor = () => {
    switch (devBot.mood) {
      case 'panicked':
        return '#FFB020';
      case 'defeated':
        return '#00D2B4';
      case 'confused':
        return '#FF4C61';
      case 'confident':
      default:
        return '#6E3FF3';
    }
  };

  const moodColor = getMoodColor();

  const getTicketData = () => {
    switch (levelId) {
      case 'level1':
        return {
          key: t.jiraKeyL1,
          summary: t.jiraSummaryL1,
          desc: t.jiraDescL1,
          ac: t.jiraAcL1,
          priority: t.jiraPriorityP0,
          priorityColor: '#FF4C61',
        };
      case 'level2':
        return {
          key: t.jiraKeyL2,
          summary: t.jiraSummaryL2,
          desc: t.jiraDescL2,
          ac: t.jiraAcL2,
          priority: t.jiraPriorityP0,
          priorityColor: '#FF4C61',
        };
      case 'level3':
      default:
        return {
          key: t.jiraKeyL3,
          summary: t.jiraSummaryL3,
          desc: t.jiraDescL3,
          ac: t.jiraAcL3,
          priority: t.jiraPriorityP1,
          priorityColor: '#FFB020',
        };
    }
  };

  const ticket = getTicketData();

  return (
    <Box
      sx={{
        backgroundColor: '#160844',
        borderRadius: 2,
        border: isSolved ? '1.5px solid #00D2B4' : '1px solid rgba(179, 176, 255, 0.18)',
        boxShadow: isSolved
          ? '0 0 24px rgba(0, 210, 180, 0.2)'
          : '0 4px 16px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Compact Main Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1.2, sm: 2 },
          py: { xs: 1, sm: 1.2 },
          gap: { xs: 1, sm: 1.5 },
        }}
      >
        {/* DevBot Avatar with mood outline and pulsing dot */}
        <Box sx={{ position: 'relative', flexShrink: 0 }}>
          <Box
            sx={{
              width: { xs: 34, sm: 38 },
              height: { xs: 34, sm: 38 },
              borderRadius: '10px',
              backgroundColor: `${moodColor}22`,
              border: `1.5px solid ${moodColor}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 10px ${moodColor}33`,
              transition: 'all 0.3s ease',
            }}
          >
            <SmartToyIcon sx={{ color: moodColor, fontSize: { xs: 20, sm: 22 } }} />
          </Box>
          <Box
            sx={{
              position: 'absolute',
              bottom: -1,
              right: -1,
              width: 9,
              height: 9,
              borderRadius: '50%',
              backgroundColor: '#00D2B4',
              border: '1.5px solid #160844',
              animation: 'pulseGlow 2s infinite',
            }}
          />
        </Box>

        {/* Middle Content: Jira Task on row 1, DevBot roast on row 2 */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Row 1: Key + Priority + Summary */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, flexWrap: 'nowrap', overflow: 'hidden' }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.4,
                backgroundColor: '#23125d',
                color: '#b3b0ff',
                px: 0.8,
                py: '2px',
                borderRadius: '4px',
                fontFamily: 'ui-monospace, monospace',
                fontWeight: 800,
                fontSize: '0.68rem',
                flexShrink: 0,
              }}
            >
              <BugReportIcon sx={{ fontSize: 12, color: ticket.priorityColor }} />
              {ticket.key}
            </Box>

            <Chip
              label={ticket.priority.split(' - ')[0]}
              size="small"
              sx={{
                height: 18,
                fontSize: '0.6rem',
                fontWeight: 800,
                backgroundColor: `${ticket.priorityColor}22`,
                color: ticket.priorityColor,
                border: `1px solid ${ticket.priorityColor}44`,
                flexShrink: 0,
                display: { xs: 'none', sm: 'inline-flex' },
              }}
            />

            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '0.78rem', sm: '0.84rem' },
                color: '#FFFFFF',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {ticket.summary}
            </Typography>
          </Box>

          {/* Row 2: DevBot Commentary */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mt: 0.3 }}>
            <Typography
              sx={{
                color: '#D4DAF0',
                fontSize: { xs: '0.72rem', sm: '0.78rem' },
                fontStyle: 'italic',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                lineHeight: 1.3,
              }}
            >
              <Box component="span" sx={{ color: moodColor, fontWeight: 700, fontStyle: 'normal', mr: 0.6 }}>
                DevBot:
              </Box>
              &ldquo;{devBot.message}&rdquo;
            </Typography>
          </Box>
        </Box>

        {/* Right Toggle for Jira Details */}
        <Button
          size="small"
          onClick={() => setExpanded(!expanded)}
          endIcon={expanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
          sx={{
            flexShrink: 0,
            fontSize: '0.7rem',
            fontWeight: 700,
            color: '#b3b0ff',
            px: { xs: 0.8, sm: 1.2 },
            py: '3px',
            minWidth: 'auto',
            border: '1px solid rgba(179, 176, 255, 0.25)',
            backgroundColor: '#1c0c52',
            '&:hover': {
              color: '#FFF',
              backgroundColor: '#26136d',
            },
          }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            {expanded ? 'Less' : 'Details'}
          </Box>
        </Button>
      </Box>

      {/* Expandable Details Drawer */}
      <Collapse in={expanded}>
        <Box
          sx={{
            px: { xs: 1.5, sm: 2 },
            py: 1.5,
            borderTop: '1px solid rgba(179, 176, 255, 0.18)',
            backgroundColor: '#100236',
            display: 'flex',
            flexDirection: 'column',
            gap: 1.2,
          }}
        >
          {/* Description */}
          <Box sx={{ p: 1.2, backgroundColor: '#18074d', borderRadius: 1.5, border: '1px solid rgba(179, 176, 255, 0.15)' }}>
            <Typography variant="caption" sx={{ color: '#b3b0ff', fontWeight: 700, display: 'block', mb: 0.3 }}>
              Description:
            </Typography>
            <Typography variant="body2" sx={{ color: '#CCD2E6', fontSize: '0.78rem', lineHeight: 1.45 }}>
              {ticket.desc}
            </Typography>
          </Box>

          {/* Acceptance Criteria (AC) Checklist */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1.2,
              borderRadius: 1.5,
              backgroundColor: isSolved ? 'rgba(0, 210, 180, 0.1)' : 'rgba(89, 81, 255, 0.1)',
              border: `1px solid ${isSolved ? 'rgba(0, 210, 180, 0.4)' : 'rgba(179, 176, 255, 0.3)'}`,
            }}
          >
            {isSolved ? (
              <CheckCircleIcon sx={{ fontSize: 16, color: '#00D2B4', flexShrink: 0 }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 16, color: '#b3b0ff', flexShrink: 0 }} />
            )}
            <Typography sx={{ color: '#FFF', fontSize: '0.76rem', lineHeight: 1.35 }}>
              <Box component="span" sx={{ color: isSolved ? '#00D2B4' : '#b3b0ff', fontWeight: 800, mr: 0.8 }}>
                {t.jiraAcLabel}
              </Box>
              {ticket.ac}
            </Typography>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
