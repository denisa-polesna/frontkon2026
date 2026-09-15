import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { MeetingCard } from './MeetingCard';
import type { translations } from '../utils/i18n';

export type OverflowStatus = 'overflowing' | 'clipped_no_ellipsis' | 'wrapped' | 'solved';

interface PreviewViewportLevel2Props {
  userCss?: string;
  onStatusChange?: (status: OverflowStatus, solved: boolean) => void;
  isSolved?: boolean;
  t: typeof translations['en'];
  isTarget?: boolean;
}

export const PreviewViewportLevel2: React.FC<PreviewViewportLevel2Props> = ({
  userCss = '',
  onStatusChange,
  isSolved: _isSolved = false,
  t,
  isTarget = false,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [, setStatus] = useState<OverflowStatus>('overflowing');

  useEffect(() => {
    if (isTarget) return;

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
      if (onStatusChange) {
        onStatusChange(currentStatus, solved);
      }
    };

    checkOverflow();
    const timer = setTimeout(checkOverflow, 50);

    return () => clearTimeout(timer);
  }, [userCss, onStatusChange, isTarget]);

  const stageId = isTarget ? 'target-stage-l3' : 'level2-stage';

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2.5,
        overflow: 'hidden',
        border: '1px solid #232842',
        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
        backgroundColor: '#0F1322',
        transition: 'all 0.3s ease',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Scoped Styles */}
      <style>
        {isTarget
          ? `
            #${stageId} .meeting-title {
              font-size: 0.88rem;
              font-weight: 700;
              color: #FFFFFF;
              line-height: 1.4;
              display: block;
              box-sizing: border-box;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          `
          : `
            #${stageId} .meeting-title {
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
          padding: { xs: '6px 10px', sm: '8px 14px' },
          backgroundColor: '#161A2D',
          borderBottom: '1px solid #232842',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FF5F56' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#27C93F' }} />
          </Box>
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
            }}
          >
            {isTarget ? t.targetGoalHeader : t.codeOutputHeader}
          </Typography>
        </Box>
      </Box>

      {/* Viewport Canvas Stage */}
      <Box
        id={stageId}
        ref={stageRef}
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1.5, sm: 3 },
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(110, 63, 243, 0.08) 0%, transparent 70%),
            linear-gradient(to right, #141829 1px, transparent 1px),
            linear-gradient(to bottom, #141829 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          backgroundColor: '#0A0C16',
        }}
      >
        <MeetingCard titleRef={isTarget ? undefined : titleRef} t={t} />
      </Box>
    </Box>
  );
};
