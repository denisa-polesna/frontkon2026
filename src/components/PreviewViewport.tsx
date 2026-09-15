import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { ProspectModal } from './ProspectModal';
import type { translations } from '../utils/i18n';

export type AlignmentStatus = 'off' | 'horizontal_only' | 'vertical_only' | 'centered';

interface PreviewViewportProps {
  userCss?: string;
  onDistanceChange?: (distance: number, isCentered: boolean, status: AlignmentStatus) => void;
  isSolved?: boolean;
  t: typeof translations['en'];
  isTarget?: boolean;
}

export const PreviewViewport: React.FC<PreviewViewportProps> = ({
  userCss = '',
  onDistanceChange,
  isSolved: _isSolved = false,
  t,
  isTarget = false,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [modalDimensions, setModalDimensions] = useState<{ width: number; height: number }>({
    width: 380,
    height: 380,
  });

  // Measure alignment on resize or CSS change (only in active challenge mode)
  useEffect(() => {
    if (isTarget) return;

    const checkAlignment = () => {
      if (!targetRef.current || !modalRef.current) return;

      const targetRect = targetRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

      // Ensure elements are actually rendered and visible before measuring
      if (targetRect.width === 0 || modalRect.width === 0) return;

      // Dynamically sync target ghost dimensions to match modal
      if (modalRect.height > 100 && Math.abs(modalDimensions.height - modalRect.height) > 4) {
        setModalDimensions({ width: modalRect.width, height: modalRect.height });
      }

      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;

      const modalCenterX = modalRect.left + modalRect.width / 2;
      const modalCenterY = modalRect.top + modalRect.height / 2;

      const dx = Math.abs(targetCenterX - modalCenterX);
      const dy = Math.abs(targetCenterY - modalCenterY);
      const dist = Math.round(Math.hypot(dx, dy));

      // BOTH horizontal and vertical axes must be centered!
      const isHorizontallyCentered = dx <= 10;
      const isVerticallyCentered = dy <= 10;
      const centered = isHorizontallyCentered && isVerticallyCentered;

      let status: AlignmentStatus = 'off';
      if (centered) {
        status = 'centered';
      } else if (isHorizontallyCentered && !isVerticallyCentered) {
        status = 'horizontal_only';
      } else if (isVerticallyCentered && !isHorizontallyCentered) {
        status = 'vertical_only';
      }

      if (onDistanceChange) {
        onDistanceChange(dist, centered, status);
      }
    };

    // Run immediately and after CSS transitions
    checkAlignment();
    const timer1 = setTimeout(checkAlignment, 50);
    const timer2 = setTimeout(checkAlignment, 320);

    const handleResize = () => checkAlignment();
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('resize', handleResize);
    };
  }, [userCss, onDistanceChange, modalDimensions.height, isTarget]);

  const stageId = isTarget ? 'target-stage-l1' : 'challenge-stage';

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
            #${stageId} .modal-viewport {
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 16px;
            }
            #${stageId} .modal-viewport > #prospect-modal {
              height: fit-content;
              max-height: fit-content;
            }
          `
          : `
            #${stageId} .modal-viewport {
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              ${userCss || '/* DevBot defaults */ display: block; margin-top: -240px; margin-left: 20px; float: left;'}
            }
            #${stageId} .modal-viewport > #prospect-modal {
              height: fit-content;
              max-height: fit-content;
              transition: transform 0.3s cubic-bezier(0.2, 0.9, 0.3, 1),
                          margin 0.3s cubic-bezier(0.2, 0.9, 0.3, 1),
                          opacity 0.3s ease;
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
        {/* macOS window dots & Pane Title */}
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
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(110, 63, 243, 0.08) 0%, transparent 70%),
            linear-gradient(to right, #141829 1px, transparent 1px),
            linear-gradient(to bottom, #141829 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 24px 24px, 24px 24px',
          backgroundColor: '#0A0C16',
        }}
      >
        {/* Target Ghost Box (The Ground Truth Center) - shown only on active challenge stage */}
        {!isTarget && (
          <Box
            ref={targetRef}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: modalDimensions.width || 380,
              maxWidth: '92%',
              height: modalDimensions.height || 380,
              borderRadius: 2.5,
              border: '2px dashed rgba(110, 63, 243, 0.4)',
              backgroundColor: 'rgba(110, 63, 243, 0.04)',
              pointerEvents: 'none',
              zIndex: 1,
              transition: 'all 0.3s ease',
            }}
          />
        )}

        {/* Live Container */}
        <div className="modal-viewport" style={{ position: 'relative', zIndex: 2 }}>
          <ProspectModal ref={modalRef} t={t} />
        </div>
      </Box>
    </Box>
  );
};
