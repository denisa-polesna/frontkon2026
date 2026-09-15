import React, { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { DropdownHeaderCard } from './DropdownHeaderCard';
import type { translations } from '../utils/i18n';

export type DropdownStatus = 'hidden_behind_header' | 'solved';

interface PreviewViewportDropdownProps {
  userCss?: string;
  onStatusChange?: (status: DropdownStatus, solved: boolean) => void;
  isSolved?: boolean;
  t: typeof translations['en'];
  isTarget?: boolean;
}

export const PreviewViewportDropdown: React.FC<PreviewViewportDropdownProps> = ({
  userCss = '',
  onStatusChange,
  isSolved: _isSolved = false,
  t,
  isTarget = false,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isTarget) return;

    const checkStacking = () => {
      if (!containerRef.current) return;

      const dropdownEl = containerRef.current.querySelector('.dropdown-menu') as HTMLElement | null;
      if (!dropdownEl) return;

      const style = window.getComputedStyle(dropdownEl);
      const zIndexRaw = style.zIndex;
      const parsedZ = parseInt(zIndexRaw, 10);

      // Header has z-index: 100. Dropdown must have z-index > 100 to display on top!
      const isDropdownAboveHeader = !isNaN(parsedZ) && parsedZ > 100;

      const solved = isDropdownAboveHeader;
      const status: DropdownStatus = solved ? 'solved' : 'hidden_behind_header';

      if (onStatusChange) {
        onStatusChange(status, solved);
      }
    };

    checkStacking();
    const timer = setTimeout(checkStacking, 50);

    return () => clearTimeout(timer);
  }, [userCss, onStatusChange, isTarget]);

  const stageId = isTarget ? 'target-stage-dropdown' : 'dropdown-stage';

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
            #${stageId} .header {
              position: sticky;
              top: 0;
              z-index: 100;
              background-color: #FFFFFF;
            }
            #${stageId} .dropdown-menu {
              position: absolute;
              top: -54px;
              left: 0;
              right: 0;
              z-index: 150;
            }
          `
          : `
            #${stageId} .header {
              position: sticky;
              top: 0;
              z-index: 100;
              background-color: #FFFFFF;
            }
            #${stageId} .dropdown-menu {
              top: -54px;
              left: 0;
              right: 0;
              ${userCss || 'position: absolute; z-index: 1;'}
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
        }}
      >
        <DropdownHeaderCard stageId={stageId} />
      </Box>
    </Box>
  );
};
