import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { DealTimelineCard } from './DealTimelineCard';
import type { translations } from '../utils/i18n';

export type StickyStatus = 'off' | 'fixed_escaped' | 'sticky_no_bottom' | 'solved';

interface PreviewViewportStickyProps {
  userCss?: string;
  onStatusChange?: (status: StickyStatus, solved: boolean) => void;
  isSolved?: boolean;
  t: typeof translations['en'];
  isTarget?: boolean;
}

export const PreviewViewportSticky: React.FC<PreviewViewportStickyProps> = ({
  userCss = '',
  onStatusChange,
  isSolved: _isSolved = false,
  t,
  isTarget = false,
}) => {
  const actionBarRef = useRef<HTMLDivElement | null>(null);
  const [, setStatus] = useState<StickyStatus>('off');

  useEffect(() => {
    if (isTarget) return;

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
      if (onStatusChange) {
        onStatusChange(currentStatus, solved);
      }
    };

    checkSticky();
    const timer = setTimeout(checkSticky, 50);

    return () => clearTimeout(timer);
  }, [userCss, onStatusChange, isTarget]);

  const stageId = isTarget ? 'target-stage-l2' : 'sticky-stage';

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
            #${stageId} .deal-action-bar {
              width: 100%;
              display: block;
              box-sizing: border-box;
              position: sticky;
              bottom: 0;
              z-index: 10;
            }
          `
          : `
            #${stageId} .deal-action-bar {
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
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1.5, sm: 2.5 },
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(110, 63, 243, 0.08) 0%, transparent 70%),
            linear-gradient(to right, #141829 1px, transparent 1px),
            linear-gradient(to bottom, #141829 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          backgroundColor: '#0A0C16',
        }}
      >
        <DealTimelineCard actionBarRef={isTarget ? undefined : actionBarRef} t={t} />
      </Box>
    </Box>
  );
};
