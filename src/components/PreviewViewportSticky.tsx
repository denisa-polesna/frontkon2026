import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { DealTimelineCard } from './DealTimelineCard';
import type { translations } from '../utils/i18n';

export type StickyStatus = 'off' | 'fixed_escaped' | 'sticky_no_bottom' | 'solved';

interface PreviewViewportStickyProps {
  userCss: string;
  onStatusChange: (status: StickyStatus, isSolved: boolean) => void;
  isSolved: boolean;
  t: typeof translations['en'];
}

export const PreviewViewportSticky: React.FC<PreviewViewportStickyProps> = ({
  userCss,
  onStatusChange,
  isSolved,
  t,
}) => {
  const actionBarRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<StickyStatus>('off');

  useEffect(() => {
    const checkSticky = () => {
      if (!actionBarRef.current) return;

      const el = actionBarRef.current;
      const style = window.getComputedStyle(el);

      const isSticky = style.position === 'sticky';
      const isFixed = style.position === 'fixed';
      const isBottomZero = style.bottom === '0px' || parseInt(style.bottom, 10) === 0;

      let currentStatus: StickyStatus = 'off';
      const solved = isSticky && isBottomZero;

      if (solved) {
        currentStatus = 'solved';
      } else if (isFixed) {
        currentStatus = 'fixed_escaped';
      } else if (isSticky && !isBottomZero) {
        currentStatus = 'sticky_no_bottom';
      } else {
        currentStatus = 'off';
      }

      setStatus(currentStatus);
      onStatusChange(currentStatus, solved);
    };

    checkSticky();
    const timer = setTimeout(checkSticky, 50);

    return () => clearTimeout(timer);
  }, [userCss, onStatusChange]);

  const getStatusChip = () => {
    if (isSolved) {
      return {
        label: t.stickySolvedRadar || 'Sticky Docked! 🎯',
        color: '#00D2B4',
        bg: 'rgba(0, 210, 180, 0.2)',
        border: '#00D2B4',
        icon: <CheckCircleOutlinedIcon sx={{ fontSize: '14px !important' }} />,
      };
    }
    if (status === 'fixed_escaped') {
      return {
        label: t.stickyFixedRadar || 'Fixed (Escaped container!) ⚠️',
        color: '#FFB020',
        bg: 'rgba(255, 176, 32, 0.15)',
        border: 'rgba(255, 176, 32, 0.3)',
        icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: '14px !important' }} />,
      };
    }
    if (status === 'sticky_no_bottom') {
      return {
        label: t.stickyNoBottomRadar || 'Sticky but missing bottom: 0!',
        color: '#C4B5FD',
        bg: 'rgba(110, 63, 243, 0.2)',
        border: 'rgba(110, 63, 243, 0.4)',
        icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: '14px !important' }} />,
      };
    }
    return {
      label: t.stickyOffRadar || 'Scrolled out of view! 💥',
      color: '#FF4C61',
      bg: 'rgba(255, 76, 97, 0.15)',
      border: 'rgba(255, 76, 97, 0.3)',
      icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: '14px !important' }} />,
    };
  };

  const chip = getStatusChip();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2.5,
        overflow: 'hidden',
        border: isSolved ? '2px solid #00D2B4' : '1px solid #232842',
        boxShadow: isSolved
          ? '0 0 30px rgba(0, 210, 180, 0.25), 0 10px 30px rgba(0,0,0,0.5)'
          : '0 10px 30px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#0F1322',
        transition: 'all 0.3s ease',
        height: '100%',
        minHeight: 520,
      }}
    >
      {/* Dynamic Scoped Styles for the Sticky Action Bar */}
      <style>
        {`
          #sticky-stage .deal-action-bar {
            width: 100%;
            display: block;
            box-sizing: border-box;
            z-index: 10;
            transition: all 0.2s ease;
            ${userCss || '/* DevBot defaults */ position: absolute; top: 4800px; z-index: 2147483647 !important;'}
          }
        `}
      </style>

      {/* Browser Chrome Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          backgroundColor: '#161A2D',
          borderBottom: '1px solid #232842',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF5F56' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27C93F' }} />
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#0D101D',
            px: 2,
            py: 0.5,
            borderRadius: 1.5,
            border: '1px solid #232842',
            maxWidth: 320,
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'monospace',
              fontSize: '0.74rem',
              color: '#8B94B2',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            https://app.outreach.io/deals/acme-corp
          </Typography>
        </Box>

        <Chip
          icon={chip.icon}
          label={chip.label}
          size="small"
          sx={{
            fontSize: '0.72rem',
            fontWeight: 700,
            height: 24,
            backgroundColor: chip.bg,
            color: chip.color,
            border: `1px solid ${chip.border}`,
          }}
        />
      </Box>

      {/* Viewport Canvas Stage */}
      <Box
        id="sticky-stage"
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 2.5,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(110, 63, 243, 0.08) 0%, transparent 70%),
            linear-gradient(to right, #141829 1px, transparent 1px),
            linear-gradient(to bottom, #141829 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          backgroundColor: '#0A0C16',
        }}
      >
        <DealTimelineCard actionBarRef={actionBarRef} t={t} />
      </Box>
    </Box>
  );
};
