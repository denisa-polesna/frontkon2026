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
          borderRadius: '16px',
          border: '1px solid rgba(89, 81, 255, 0.25)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), 0 2px 16px rgba(0, 0, 0, 0.08)',
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
              p: { xs: 1.8, sm: 2.2 },
              pb: 1.6,
              backgroundColor: '#FFFFFF',
              borderBottom: '1px solid #e2e0ed',
              position: 'relative',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
              <Avatar
                sx={{
                  bgcolor: '#5951ff',
                  color: '#FFFFFF',
                  width: 32,
                  height: 32,
                  borderRadius: '6px',
                }}
              >
                <TuneIcon sx={{ fontSize: 18 }} />
              </Avatar>
              <Box>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: 700,
                    color: '#120042',
                    lineHeight: 1.2,
                    fontSize: '0.94rem',
                  }}
                >
                  Upravit příležitost
                </Typography>
                <Typography variant="caption" sx={{ color: '#767484', fontSize: '0.72rem' }}>
                  Acme Enterprise Deal
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                p: 0.5,
                color: '#666666',
                backgroundColor: '#f5f4ff',
                borderRadius: '6px',
              }}
            >
              <CloseIcon sx={{ fontSize: 16 }} />
            </Box>
          </Box>
        </div>

        {/* Modal Form Content */}
        <CardContent sx={{ p: { xs: 1.8, sm: 2.2 }, pt: 2, pb: 1, position: 'relative' }}>
          {/* Account Field */}
          <Box sx={{ mb: 2 }}>
            <Typography component="label" sx={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#120042', mb: 0.6 }}>
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
                    fontWeight: 600,
                    color: '#120042',
                    backgroundColor: '#FFFFFF',
                    borderRadius: '6px',
                    border: '1.5px solid #d4d2e3',
                    '& fieldset': { border: 'none' },
                  },
                },
              }}
            />
          </Box>

          {/* Stage Dropdown Field with Open Menu overlapping the header */}
          <Box sx={{ mb: 2, position: 'relative' }}>
            <Typography component="label" sx={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#120042', mb: 0.6 }}>
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
                  borderRadius: '6px',
                  border: '1.5px solid #5951ff',
                  backgroundColor: '#FFFFFF',
                  color: '#120042',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  boxShadow: '0 0 0 3px rgba(89, 81, 255, 0.15)',
                }}
              >
                <span>Discovery Call Scheduled</span>
                <span style={{ fontSize: '0.7rem', color: '#5951ff' }}>▼</span>
              </Box>

              {/* The Open Dropdown Menu - positioned to overlap header */}
              <Box
                className="dropdown-menu"
                sx={{
                  position: 'absolute',
                  top: -46,
                  left: 0,
                  right: 0,
                  backgroundColor: '#FFFFFF',
                  borderRadius: '8px',
                  border: '1.5px solid #5951ff',
                  boxShadow: '0 12px 32px rgba(18, 0, 68, 0.28)',
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
                    py: 0.6,
                    borderRadius: '5px',
                    backgroundColor: '#5951ff',
                    color: '#FFFFFF',
                    fontSize: '0.78rem',
                    fontWeight: 700,
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
                    borderRadius: '5px',
                    backgroundColor: '#fbfaff',
                    color: '#120042',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}
                >
                  2. Proposal & Contract Sent
                </Box>

                <Box
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: '5px',
                    backgroundColor: '#fbfaff',
                    color: '#120042',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                  }}
                >
                  3. Security & Legal Review
                </Box>

                <Box
                  sx={{
                    px: 1.2,
                    py: 0.6,
                    borderRadius: '5px',
                    backgroundColor: '#fbfaff',
                    color: '#007A68',
                    fontSize: '0.78rem',
                    fontWeight: 700,
                  }}
                >
                  4. Closed Won ($450k ARR)
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>

        {/* Modal Action Buttons */}
        <CardActions sx={{ px: { xs: 1.8, sm: 2.2 }, pb: { xs: 1.8, sm: 2.2 }, pt: 0, justifyContent: 'flex-end', gap: 1 }}>
          <Button
            size="small"
            sx={{
              height: 36,
              color: '#555555',
              fontSize: '0.82rem',
              fontWeight: 600,
              textTransform: 'none',
              px: 1.6,
            }}
          >
            Zrušit
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              height: 36,
              backgroundColor: '#5951ff',
              color: '#FFFFFF',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: '6px',
              textTransform: 'none',
              boxShadow: 'none',
              px: 2,
            }}
          >
            Uložit změny
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
