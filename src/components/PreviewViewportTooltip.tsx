import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { TooltipCard } from './TooltipCard';
import type { translations } from '../utils/i18n';

export type TooltipStatus = 'not_relative' | 'not_absolute' | 'misplaced' | 'solved';

interface PreviewViewportTooltipProps {
  userCss?: string;
  onStatusChange?: (status: TooltipStatus, isSolved: boolean) => void;
  isSolved?: boolean;
  t: typeof translations['en'];
  isTarget?: boolean;
}

export const PreviewViewportTooltip: React.FC<PreviewViewportTooltipProps> = ({
  userCss = '',
  onStatusChange,
  isSolved: _isSolved = false,
  isTarget = false,
  t,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipContainerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTarget) return;

    const checkTooltip = () => {
      if (!containerRef.current) return;

      const containerEl = containerRef.current.querySelector('.tooltip-container') as HTMLElement | null;
      const tooltipEl = containerRef.current.querySelector('.tooltip') as HTMLElement | null;
      if (!containerEl || !tooltipEl) return;

      const containerStyle = window.getComputedStyle(containerEl);
      const tooltipStyle = window.getComputedStyle(tooltipEl);

      const isContainerRelative = containerStyle.position === 'relative';
      const isTooltipAbsolute = tooltipStyle.position === 'absolute';

      // Check distance: tooltip must be located near the top of containerEl
      const containerRect = containerEl.getBoundingClientRect();
      const tooltipRect = tooltipEl.getBoundingClientRect();

      // Tooltip center X should be close to container center X (within 70px)
      const containerCenterX = containerRect.left + containerRect.width / 2;
      const tooltipCenterX = tooltipRect.left + tooltipRect.width / 2;
      const isHorizontallyAligned = Math.abs(containerCenterX - tooltipCenterX) <= 70;

      // Tooltip bottom should be near container top (above button, within 55px)
      const isNearButton = tooltipRect.bottom <= containerRect.top + 14 && tooltipRect.bottom >= containerRect.top - 55;

      const solved = isContainerRelative && isTooltipAbsolute && isNearButton && isHorizontallyAligned;
      const status: TooltipStatus = solved
        ? 'solved'
        : !isContainerRelative
        ? 'not_relative'
        : !isTooltipAbsolute
        ? 'not_absolute'
        : 'misplaced';

      if (onStatusChange) {
        onStatusChange(status, solved);
      }
    };

    checkTooltip();
    const timer = setTimeout(checkTooltip, 50);

    return () => clearTimeout(timer);
  }, [userCss, onStatusChange, isTarget]);

  const stageId = isTarget ? 'target-stage-l5' : 'tooltip-stage';

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
        isolation: 'isolate',
      }}
    >
      {/* Scoped Styles */}
      <style>
        {isTarget
          ? `
            #${stageId} .tooltip-container {
              position: relative;
              display: inline-block;
            }
            #${stageId} .tooltip {
              position: absolute;
              bottom: calc(100% + 8px);
              left: 50%;
              transform: translateX(-50%);
              white-space: nowrap;
            }
          `
          : `
            #${stageId} .tooltip-container {
              display: inline-block;
            }
            #${stageId} .tooltip {
              white-space: nowrap;
            }
            #${stageId} {
              ${userCss}
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
        ref={containerRef}
        sx={{
          position: 'relative',
          flex: 1,
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1.5, sm: 2.5 },
          backgroundColor: '#0A0C16',
        }}
      >
        <TooltipCard
          tooltipContainerRef={isTarget ? undefined : tooltipContainerRef}
          tooltipRef={isTarget ? undefined : tooltipRef}
          t={t}
        />
      </Box>
    </Box>
  );
};
