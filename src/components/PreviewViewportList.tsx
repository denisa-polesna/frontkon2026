import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { ActivityListModal } from './ActivityListModal';
import type { translations } from '../utils/i18n';

export type ListStatus = 'row_crammed' | 'no_gap' | 'solved';

interface PreviewViewportListProps {
  userCss?: string;
  onStatusChange?: (status: ListStatus, solved: boolean) => void;
  isSolved?: boolean;
  t: typeof translations['en'];
  isTarget?: boolean;
}

export const PreviewViewportList: React.FC<PreviewViewportListProps> = ({
  userCss = '',
  onStatusChange,
  isSolved: _isSolved = false,
  t,
  isTarget = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTarget) return;

    const checkList = () => {
      if (!containerRef.current) return;

      const listEl = containerRef.current.querySelector('.activity-list') as HTMLElement | null;
      if (!listEl) return;

      const style = window.getComputedStyle(listEl);
      const isColumnReverse = style.flexDirection === 'column-reverse';
      const gapVal = parseInt(style.rowGap || style.gap, 10);
      const has10pxGap = !isNaN(gapVal) && gapVal >= 8 && gapVal <= 14;

      const solved = isColumnReverse && has10pxGap;
      const status: ListStatus = solved
        ? 'solved'
        : isColumnReverse && !has10pxGap
        ? 'no_gap'
        : 'row_crammed';

      if (onStatusChange) {
        onStatusChange(status, solved);
      }
    };

    checkList();
    const timer = setTimeout(checkList, 50);

    return () => clearTimeout(timer);
  }, [userCss, onStatusChange, isTarget]);

  const stageId = isTarget ? 'target-stage-list' : 'list-stage';

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
            #${stageId} .activity-list {
              display: flex;
              flex-direction: column-reverse;
              gap: 10px;
            }
          `
          : `
            #${stageId} .activity-list {
              ${userCss || '/* DevBot */ display: flex; flex-direction: row; gap: 0px;'}
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
          backgroundColor: '#0A0C16',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: { xs: 1.5, sm: 2 },
        }}
      >
        <ActivityListModal />
      </Box>
    </Box>
  );
};
