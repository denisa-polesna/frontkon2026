import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { MeetingCard } from './MeetingCard';
import type { translations } from '../utils/i18n';

export type OverflowStatus = 'overflowing' | 'clipped_no_ellipsis' | 'wrapped' | 'solved';

interface PreviewViewportLevel2Props {
  userCss: string;
  onStatusChange: (status: OverflowStatus, isSolved: boolean) => void;
  isSolved: boolean;
  t: typeof translations['en'];
}

export const PreviewViewportLevel2: React.FC<PreviewViewportLevel2Props> = ({
  userCss,
  onStatusChange,
  isSolved,
  t,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [status, setStatus] = useState<OverflowStatus>('overflowing');

  useEffect(() => {
    const checkOverflow = () => {
      if (!titleRef.current) return;

      const el = titleRef.current;
      const style = window.getComputedStyle(el);

      const isOverflowHidden = style.overflow === 'hidden' || style.overflowX === 'hidden';
      const isEllipsis = style.textOverflow === 'ellipsis';
      const isNoWrap = style.whiteSpace === 'nowrap';
      const isClamped = style.webkitLineClamp !== 'none' && style.webkitLineClamp !== '';

      const solved = (isOverflowHidden && isEllipsis && isNoWrap) || (isOverflowHidden && isClamped);

      let currentStatus: OverflowStatus = 'overflowing';
      if (solved) {
        currentStatus = 'solved';
      } else if (isOverflowHidden && !isEllipsis) {
        currentStatus = 'clipped_no_ellipsis';
      } else if (!isNoWrap && el.offsetHeight > 50) {
        currentStatus = 'wrapped';
      } else {
        currentStatus = 'overflowing';
      }

      setStatus(currentStatus);
      onStatusChange(currentStatus, solved);
    };

    checkOverflow();
    const timer = setTimeout(checkOverflow, 50);

    return () => clearTimeout(timer);
  }, [userCss, onStatusChange]);

  const getStatusChip = () => {
    if (isSolved) {
      return {
        label: t.l3SolvedRadar || 'Cleanly Truncated! 🎯',
        color: '#00D2B4',
        bg: 'rgba(0, 210, 180, 0.2)',
        border: '#00D2B4',
        icon: <CheckCircleOutlinedIcon sx={{ fontSize: '14px !important' }} />,
      };
    }
    if (status === 'clipped_no_ellipsis') {
      return {
        label: t.l3ClippedRadar || 'Clipped but missing ellipsis!',
        color: '#C4B5FD',
        bg: 'rgba(110, 63, 243, 0.2)',
        border: 'rgba(110, 63, 243, 0.4)',
        icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: '14px !important' }} />,
      };
    }
    if (status === 'wrapped') {
      return {
        label: t.l3WrappedRadar || 'Wrapping across multiple rows!',
        color: '#FFB020',
        bg: 'rgba(255, 176, 32, 0.15)',
        border: 'rgba(255, 176, 32, 0.3)',
        icon: <ErrorOutlineOutlinedIcon sx={{ fontSize: '14px !important' }} />,
      };
    }
    return {
      label: t.l3OverflowRadar || 'Overflowing card boundary! 💥',
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
      {/* Dynamic Scoped Styles for the Meeting Title */}
      <style>
        {`
          #level2-stage .meeting-title {
            font-size: 0.88rem;
            font-weight: 700;
            color: #FFFFFF;
            line-height: 1.4;
            display: block;
            box-sizing: border-box;
            transition: all 0.25s ease;
            ${userCss || '/* DevBot default hallucination */ width: 99999px; white-space: nowrap; font-size: 8px; color: #FF7081;'}
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
            https://app.outreach.io/calendar/upcoming
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
        id="level2-stage"
        ref={stageRef}
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(110, 63, 243, 0.08) 0%, transparent 70%),
            linear-gradient(to right, #141829 1px, transparent 1px),
            linear-gradient(to bottom, #141829 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          backgroundColor: '#0A0C16',
        }}
      >
        <MeetingCard titleRef={titleRef} t={t} />
      </Box>
    </Box>
  );
};
