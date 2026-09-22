import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Box,
  Avatar,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';

interface DropdownHeaderCardProps {
  stageId?: string;
}

export const DropdownHeaderCard: React.FC<DropdownHeaderCardProps> = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: { xs: 1.5, sm: 2 },
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Card
        sx={{
          width: { xs: 330, sm: 380 },
          maxWidth: '96%',
          backgroundColor: '#FFFFFF',
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
          userSelect: 'none',
          pointerEvents: 'none',
          position: 'relative',
        }}
      >
        {/* The Header being targeted by CSS (.header) */}
        <div className="header">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              p: { xs: 1.6, sm: 2 },
              pb: 1.6,
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #E5E7EB',
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Avatar
                sx={{
                  bgcolor: '#EEEDFE',
                  color: '#5951FF',
                  width: 34,
                  height: 34,
                  borderRadius: '8px',
                }}
              >
                <TuneIcon sx={{ fontSize: 19 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1.2,
                    fontSize: '0.94rem',
                  }}
                >
                  Upravit příležitost
                </Typography>
                <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.74rem' }}>
                  Acme Enterprise Deal
                </Typography>
              </Box>
            </Box>

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
          </Box>
        </div>

        {/* Modal Form Content */}
        <CardContent sx={{ p: { xs: 1.8, sm: 2.2 }, pt: 2, pb: 1, position: 'static' }}>
          {/* Stage Dropdown Field with Open Menu overlapping the header */}
          <Box sx={{ mb: 2, position: 'relative' }}>
            <Typography component="label" sx={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', mb: 0.6 }}>
              Fáze obchodu
            </Typography>

            <Box sx={{ position: 'relative' }}>
              {/* Trigger Input */}
              <Box
                sx={{
                  height: 38,
                  px: 1.5,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderRadius: '8px',
                  border: '1.5px solid #5951FF',
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  boxShadow: '0 0 0 3px rgba(89, 81, 255, 0.15)',
                }}
              >
                <span>Discovery Call Scheduled</span>
                <span style={{ fontSize: '0.7rem', color: '#5951FF' }}>▼</span>
              </Box>

              {/* The Open Dropdown Menu - positioned to overlap header */}
              <Box
                className="dropdown-menu"
                sx={{
                  position: 'absolute',
                  top: -54,
                  left: 0,
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 12px 28px rgba(0, 0, 0, 0.12)',
                  zIndex: 50,
                  p: 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.4,
                }}
              >
                <Box
                  sx={{
                    px: 1.2,
                    py: 0.65,
                    borderRadius: '6px',
                    backgroundColor: '#5951FF',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>✓ 1. Discovery Call Scheduled</span>
                  <span style={{ fontSize: '0.68rem', opacity: 0.9 }}>Active</span>
                </Box>

                <Box
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: '6px',
                    backgroundColor: '#F9FAFB',
                    color: '#374151',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                  }}
                >
                  2. Proposal & Contract Sent
                </Box>

                <Box
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: '6px',
                    backgroundColor: '#F9FAFB',
                    color: '#374151',
                    fontSize: '0.78rem',
                    fontWeight: 500,
                  }}
                >
                  3. Executive Decision Maker Review
                </Box>

                <Box
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: '6px',
                    backgroundColor: '#ECFDF5',
                    color: '#047857',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}
                >
                  4. Closed Won ($450k ARR)
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Account Field */}
          <Box sx={{ mb: 2 }}>
            <Typography component="label" sx={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', mb: 0.6 }}>
              Název účtu
            </Typography>
            <TextField
              size="small"
              fullWidth
              value="Acme Global Corporation"
              slotProps={{
                input: {
                  readOnly: true,
                  sx: {
                    height: 38,
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    color: '#111827',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB',
                    '& fieldset': { border: 'none' },
                  },
                },
              }}
            />
          </Box>
        </CardContent>

        {/* Modal Action Buttons */}
        <CardActions sx={{ px: { xs: 1.8, sm: 2.2 }, py: 1.4, backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB', justifyContent: 'flex-end', gap: 1 }}>
          <Button
            size="small"
            sx={{
              height: 36,
              color: '#4B5563',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'none',
              px: 1.6,
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#F3F4F6', color: '#111827' },
            }}
          >
            Zrušit
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              height: 36,
              backgroundColor: '#5951FF',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '8px',
              textTransform: 'none',
              boxShadow: 'none',
              px: 2,
              '&:hover': {
                backgroundColor: '#4338CA',
                boxShadow: 'none',
              },
            }}
          >
            Uložit změny
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
