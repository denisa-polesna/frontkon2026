import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CloseIcon from '@mui/icons-material/Close';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';
import type { translations } from '../utils/i18n';

interface TooltipCardProps {
  id?: string;
  tooltipContainerRef?: React.RefObject<HTMLDivElement | null>;
  tooltipRef?: React.RefObject<HTMLDivElement | null>;
  t?: typeof translations['en'];
}

export const TooltipCard: React.FC<TooltipCardProps> = ({
  id = 'tooltip-card',
  tooltipContainerRef,
  tooltipRef,
}) => {
  return (
    <Card
      id={id}
      sx={{
        width: { xs: 330, sm: 380, xxl: 480 },
        maxWidth: '96%',
        minHeight: { xs: 295, sm: 315 },
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        userSelect: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: '#EEEDFE',
              color: '#5951FF',
              width: 34,
              height: 34,
              borderRadius: '8px',
            }}
          >
            <AutoAwesomeIcon sx={{ fontSize: 19 }} />
          </Avatar>
        }
        action={
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 0.6,
              color: '#6B7280',
              backgroundColor: '#F3F4F6',
              borderRadius: '6px',
            }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </Box>
        }
        title={
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '0.94rem', lineHeight: 1.2 }}>
              AI Email Asistent
            </Typography>
            <Chip
              label="Kaia Copilot"
              size="small"
              sx={{
                height: 20,
                fontSize: '0.65rem',
                fontWeight: 700,
                backgroundColor: '#EEEDFE',
                color: '#5951FF',
                borderRadius: '4px',
              }}
            />
          </Box>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.74rem' }}>
            Acme Corp &bull; Šablona odpovědi kontraktu
          </Typography>
        }
        sx={{
          p: { xs: 1.6, sm: 2 },
          pb: 1.6,
          backgroundColor: '#FFFFFF',
          borderBottom: '1px solid #E5E7EB',
        }}
      />

      {/* Content */}
      <CardContent
        sx={{
          p: { xs: 1.8, sm: 2.2 },
          pt: 2,
          pb: 2.5,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          flex: 1,
          gap: 2,
        }}
      >
        {/* Email preview snippet */}
        <Box sx={{ p: 1.4, borderRadius: '8px', backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB' }}>
          <Typography sx={{ fontSize: '0.74rem', color: '#6B7280', mb: 0.4 }}>
            Předmět: <strong style={{ color: '#111827' }}>Finální návrh licenčních podmínek</strong>
          </Typography>
          <Typography sx={{ fontSize: '0.8rem', color: '#374151', lineHeight: 1.45 }}>
            Dobrý den, posíláme aktualizované znění smlouvy. Požadované úpravy platebního kalendáře byly zapracovány.
          </Typography>
        </Box>

        {/* Action Row containing the button with the tooltip (no position: relative here so outer card is ancestor) */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 'auto', pt: 1.5 }}>
          <Button
            variant="outlined"
            size="small"
            sx={{
              color: '#4B5563',
              borderColor: '#E5E7EB',
              borderRadius: '8px',
              fontSize: '0.78rem',
              fontWeight: 500,
              textTransform: 'none',
              '&:hover': { backgroundColor: '#F3F4F6', borderColor: '#D1D5DB' },
            }}
          >
            Uložit
          </Button>

          {/* THE BUTTON & TOOLTIP */}
          <div
            ref={tooltipContainerRef as React.RefObject<HTMLDivElement>}
            className="tooltip-container button"
            style={{ display: 'inline-flex', verticalAlign: 'middle' }}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <Button
                variant="contained"
                size="small"
                startIcon={<AutoAwesomeIcon sx={{ fontSize: 16 }} />}
                sx={{
                  backgroundColor: '#5951FF',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.78rem',
                  borderRadius: '8px',
                  boxShadow: 'none',
                  textTransform: 'none',
                  '&:hover': { backgroundColor: '#4338CA', boxShadow: 'none' },
                }}
              >
                Doporučení Kaia
              </Button>

              {/* Hand cursor indicating user hover */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: -10,
                  right: 18,
                  pointerEvents: 'none',
                  zIndex: 30,
                  animation: 'cursorHoverFloat 2.2s ease-in-out infinite',
                  '@keyframes cursorHoverFloat': {
                    '0%, 100%': { transform: 'translate(0, 0)' },
                    '50%': { transform: 'translate(2px, -3px)' },
                  },
                }}
              >
                <PanToolAltIcon
                  sx={{
                    fontSize: 26,
                    color: '#FFFFFF',
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 1.5px #000000)',
                    transform: 'rotate(-25deg)',
                  }}
                />
              </Box>
            </Box>

            {/* The Tooltip balloon */}
            <div
              ref={tooltipRef as React.RefObject<HTMLDivElement>}
              className="tooltip"
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.8,
                  px: 1.2,
                  py: 0.6,
                  borderRadius: '8px',
                  backgroundColor: '#1E1B4B',
                  color: '#FFFFFF',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.3)',
                  whiteSpace: 'nowrap',
                }}
              >
                <LightbulbIcon sx={{ fontSize: 14, color: '#FFB020' }} />
                <span>Nabídni 10% slevu při podpisu do pátku</span>
              </Box>
            </div>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};
