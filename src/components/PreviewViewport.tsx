import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Chip } from '@mui/material';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import { ProspectModal } from './ProspectModal';
import type { translations } from '../utils/i18n';

export type AlignmentStatus = 'off' | 'horizontal_only' | 'vertical_only' | 'centered';

interface PreviewViewportProps {
  userCss: string;
  onDistanceChange: (distance: number, isCentered: boolean, status: AlignmentStatus) => void;
  isSolved: boolean;
  t: typeof translations['en'];
}

export const PreviewViewport: React.FC<PreviewViewportProps> = ({
  userCss,
  onDistanceChange,
  isSolved,
  t,
}) => {
  const stageRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [distance, setDistance] = useState<number>(350);
  const [alignmentStatus, setAlignmentStatus] = useState<AlignmentStatus>('off');
  const [modalDimensions, setModalDimensions] = useState<{ width: number; height: number }>({
    width: 380,
    height: 380,
  });

  // Measure alignment on resize or CSS change
  useEffect(() => {
    const checkAlignment = () => {
      if (!targetRef.current || !modalRef.current) return;

      const targetRect = targetRef.current.getBoundingClientRect();
      const modalRect = modalRef.current.getBoundingClientRect();

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

      setDistance(dist);

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

      setAlignmentStatus(status);
      onDistanceChange(dist, centered, status);
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
  }, [userCss, onDistanceChange, modalDimensions.height]);

  const getChipLabel = () => {
    if (isSolved) return t.centeredRadar;
    if (alignmentStatus === 'horizontal_only') return t.horizontalOnlyRadar;
    if (alignmentStatus === 'vertical_only') return t.verticalOnlyRadar;
    return t.distanceRadar.replace('{dist}', distance.toString());
  };

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
      {/* Dynamic Scoped Styles for the User's CSS */}
      <style>
        {`
          #challenge-stage .modal-viewport {
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            ${userCss || '/* DevBot defaults */ display: block; padding: 24px;'}
          }

          #challenge-stage .modal-viewport > #prospect-modal {
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
          padding: '10px 16px',
          backgroundColor: '#161A2D',
          borderBottom: '1px solid #232842',
        }}
      >
        {/* macOS window dots */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FF5F56' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
          <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: '#27C93F' }} />
        </Box>

        {/* Browser URL Bar */}
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
            https://app.outreach.io/prospects/new
          </Typography>
        </Box>

        {/* Alignment Radar Status */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Chip
            icon={isSolved ? <CheckCircleOutlinedIcon sx={{ fontSize: '14px !important' }} /> : <MyLocationIcon sx={{ fontSize: '14px !important' }} />}
            label={getChipLabel()}
            size="small"
            sx={{
              fontSize: '0.72rem',
              fontWeight: 700,
              height: 24,
              backgroundColor: isSolved
                ? 'rgba(0, 210, 180, 0.2)'
                : alignmentStatus === 'horizontal_only' || alignmentStatus === 'vertical_only'
                ? 'rgba(110, 63, 243, 0.2)'
                : 'rgba(255, 176, 32, 0.15)',
              color: isSolved
                ? '#00D2B4'
                : alignmentStatus === 'horizontal_only' || alignmentStatus === 'vertical_only'
                ? '#C4B5FD'
                : '#FFB020',
              border: `1px solid ${
                isSolved
                  ? '#00D2B4'
                  : alignmentStatus === 'horizontal_only' || alignmentStatus === 'vertical_only'
                  ? 'rgba(110, 63, 243, 0.4)'
                  : 'rgba(255, 176, 32, 0.3)'
              }`,
            }}
          />
        </Box>
      </Box>

      {/* Viewport Canvas Stage */}
      <Box
        id="challenge-stage"
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
        {/* Target Ghost Box (The Ground Truth Center) */}
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
            border: `2px dashed ${isSolved ? '#00D2B4' : 'rgba(110, 63, 243, 0.5)'}`,
            backgroundColor: isSolved ? 'rgba(0, 210, 180, 0.05)' : 'rgba(110, 63, 243, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 1,
            transition: 'all 0.3s ease',
          }}
        >
          <Box
            sx={{
              backgroundColor: isSolved ? 'rgba(0, 210, 180, 0.15)' : 'rgba(110, 63, 243, 0.2)',
              px: 1.5,
              py: 0.5,
              borderRadius: 1.5,
              border: `1px solid ${isSolved ? 'rgba(0, 210, 180, 0.4)' : 'rgba(110, 63, 243, 0.4)'}`,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.74rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: isSolved ? '#00D2B4' : '#C4B5FD',
                fontFamily: 'monospace',
                textTransform: 'uppercase',
              }}
            >
              {isSolved ? t.targetAligned : t.targetLabel}
            </Typography>
          </Box>
        </Box>

        {/* Live Container with User's CSS applied */}
        <div className="modal-viewport" style={{ position: 'relative', zIndex: 2 }}>
          <ProspectModal ref={modalRef} t={t} />
        </div>
      </Box>
    </Box>
  );
};
