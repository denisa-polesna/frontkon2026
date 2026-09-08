import React, { useState } from 'react';
import {
  Box,
  Typography,
  Chip,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import type { translations } from '../utils/i18n';

interface JiraTicketBannerProps {
  levelId: 'level1' | 'level2' | 'level3';
  isSolved: boolean;
  t: typeof translations['en'];
}

export const JiraTicketBanner: React.FC<JiraTicketBannerProps> = ({
  levelId,
  isSolved,
  t,
}) => {
  const [expanded, setExpanded] = useState<boolean>(true);

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
        backgroundColor: '#111526',
        borderRadius: 2,
        border: isSolved ? '1.5px solid #00D2B4' : '1px solid #232845',
        boxShadow: isSolved
          ? '0 0 20px rgba(0, 210, 180, 0.2)'
          : '0 4px 16px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
      }}
    >
      {/* Jira Ticket Header Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1,
          backgroundColor: '#161B30',
          borderBottom: expanded ? '1px solid #232845' : 'none',
          gap: 1.5,
          cursor: 'pointer',
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexWrap: 'wrap' }}>
          {/* Jira Key Badge */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 0.6,
              backgroundColor: '#1E2648',
              border: '1px solid #333F6E',
              color: '#82A0FF',
              px: 1,
              py: 0.3,
              borderRadius: 1,
              fontFamily: 'monospace',
              fontWeight: 800,
              fontSize: '0.74rem',
            }}
          >
            <BugReportIcon sx={{ fontSize: 14, color: ticket.priorityColor }} />
            {ticket.key}
          </Box>

          {/* Priority */}
          <Chip
            label={ticket.priority}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.64rem',
              fontWeight: 800,
              backgroundColor: `${ticket.priorityColor}20`,
              color: ticket.priorityColor,
              border: `1px solid ${ticket.priorityColor}50`,
            }}
          />

          {/* Status */}
          <Chip
            label={isSolved ? t.jiraStatusDone : t.jiraStatusProgress}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.64rem',
              fontWeight: 800,
              backgroundColor: isSolved ? 'rgba(0, 210, 180, 0.2)' : 'rgba(110, 63, 243, 0.2)',
              color: isSolved ? '#00D2B4' : '#C4B5FD',
              border: `1px solid ${isSolved ? '#00D2B4' : 'rgba(110, 63, 243, 0.4)'}`,
            }}
          />

          {/* Summary */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: '0.84rem',
              color: '#FFFFFF',
              letterSpacing: '-0.01em',
            }}
          >
            {ticket.summary}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Tooltip title={t.jiraToggleDetails}>
            <IconButton size="small" sx={{ color: '#8E95B2', p: 0.5 }}>
              {expanded ? <KeyboardArrowUpIcon fontSize="small" /> : <KeyboardArrowDownIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Expandable Ticket Body */}
      <Collapse in={expanded}>
        <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
          {/* Metadata Row: Reporter & Assignee */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Typography variant="caption" sx={{ color: '#6A7292', fontWeight: 600, fontSize: '0.72rem' }}>
                {t.jiraReporterLabel}
              </Typography>
              <Typography variant="caption" sx={{ color: '#FF7081', fontWeight: 700, fontSize: '0.74rem' }}>
                🤖 DevBot-3000 (Junior AI)
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Typography variant="caption" sx={{ color: '#6A7292', fontWeight: 600, fontSize: '0.72rem' }}>
                {t.jiraAssigneeLabel}
              </Typography>
              <Typography variant="caption" sx={{ color: '#00D2B4', fontWeight: 700, fontSize: '0.74rem' }}>
                {t.jiraAssigneeYou}
              </Typography>
            </Box>
          </Box>

          {/* Description */}
          <Box
            sx={{
              backgroundColor: '#0D101E',
              p: 1.5,
              borderRadius: 1.5,
              border: '1px solid #1D233D',
            }}
          >
            <Typography variant="caption" sx={{ color: '#8892B0', fontWeight: 700, display: 'block', mb: 0.5 }}>
              Description / Popis:
            </Typography>
            <Typography variant="body2" sx={{ color: '#D4DAEC', fontSize: '0.82rem', lineHeight: 1.5 }}>
              {ticket.desc}
            </Typography>
          </Box>

          {/* Acceptance Criteria (AC) Checklist */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              backgroundColor: isSolved ? 'rgba(0, 210, 180, 0.1)' : 'rgba(110, 63, 243, 0.08)',
              p: 1.2,
              borderRadius: 1.5,
              border: `1px solid ${isSolved ? 'rgba(0, 210, 180, 0.4)' : 'rgba(110, 63, 243, 0.3)'}`,
            }}
          >
            {isSolved ? (
              <CheckCircleIcon sx={{ fontSize: 18, color: '#00D2B4' }} />
            ) : (
              <RadioButtonUncheckedIcon sx={{ fontSize: 18, color: '#C4B5FD' }} />
            )}
            <Box>
              <Typography variant="caption" sx={{ color: isSolved ? '#00D2B4' : '#C4B5FD', fontWeight: 800, mr: 0.8 }}>
                {t.jiraAcLabel}
              </Typography>
              <Typography
                component="span"
                sx={{
                  color: '#FFFFFF',
                  fontSize: '0.8rem',
                  textDecoration: isSolved ? 'line-through' : 'none',
                  opacity: isSolved ? 0.8 : 1,
                }}
              >
                {ticket.ac}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
};
