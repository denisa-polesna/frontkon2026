import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Avatar,
  Divider,
} from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import CloseIcon from '@mui/icons-material/Close';
import type { translations } from '../utils/i18n';

interface ProspectModalProps {
  id?: string;
  t: typeof translations['en'];
}

export const ProspectModal = React.forwardRef<HTMLDivElement, ProspectModalProps>(
  ({ id = 'prospect-modal', t }, ref) => {
    return (
      <Card
        ref={ref}
        id={id}
        sx={{
          width: { xs: 330, sm: 380 },
          maxWidth: '95%',
          margin: 0,
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF',
          borderRadius: '16px',
          border: '1px solid rgba(89, 81, 255, 0.25)',
          boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), 0 2px 16px rgba(0, 0, 0, 0.08)',
          pointerEvents: 'none', // purely for display in the puzzle
          userSelect: 'none',
          overflow: 'hidden',
        }}
      >
        {/* Outreach Modal Header */}
        <CardHeader
          avatar={
            <Avatar
              sx={{
                bgcolor: '#5951ff',
                color: '#FFFFFF',
                width: 32,
                height: 32,
                borderRadius: '6px',
              }}
            >
              <PersonAddAlt1Icon sx={{ fontSize: 18 }} />
            </Avatar>
          }
          action={
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
          }
          title={
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: '#120042', fontSize: '0.94rem' }}>
              {t.modalTitle}
            </Typography>
          }
          sx={{ p: '12px 16px' }}
        />

        <Divider sx={{ borderColor: '#e8e6f5' }} />

        {/* Form Fields from Outreach CreateProspect */}
        <CardContent sx={{ p: '14px 16px', display: 'flex', flexDirection: 'column', gap: 1.4 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label={t.firstName}
              size="small"
              defaultValue="Ada"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true, sx: { color: '#555555', fontSize: '0.82rem' } },
                input: {
                  sx: {
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    color: '#120042',
                    borderRadius: '6px',
                    '& fieldset': { borderColor: '#d4d2e3' },
                  },
                },
              }}
            />
            <TextField
              label={t.lastName}
              size="small"
              defaultValue="Lovelace"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true, sx: { color: '#555555', fontSize: '0.82rem' } },
                input: {
                  sx: {
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    color: '#120042',
                    borderRadius: '6px',
                    '& fieldset': { borderColor: '#d4d2e3' },
                  },
                },
              }}
            />
          </Box>

          <TextField
            label={t.workEmail}
            size="small"
            defaultValue="ada.lovelace@analytical.engine"
            fullWidth
            slotProps={{
              inputLabel: { shrink: true, sx: { color: '#555555', fontSize: '0.82rem' } },
              input: {
                sx: {
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  backgroundColor: '#FFFFFF',
                  color: '#120042',
                  borderRadius: '6px',
                  '& fieldset': { borderColor: '#d4d2e3' },
                },
              },
            }}
          />

          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label={t.targetAccount}
              size="small"
              defaultValue="Babbage Industries"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true, sx: { color: '#555555', fontSize: '0.82rem' } },
                input: {
                  sx: {
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    color: '#120042',
                    borderRadius: '6px',
                    '& fieldset': { borderColor: '#d4d2e3' },
                  },
                },
              }}
            />
            <TextField
              label={t.stage}
              size="small"
              defaultValue={t.stageValue}
              fullWidth
              slotProps={{
                inputLabel: { shrink: true, sx: { color: '#555555', fontSize: '0.82rem' } },
                input: {
                  sx: {
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    backgroundColor: '#FFFFFF',
                    color: '#120042',
                    borderRadius: '6px',
                    '& fieldset': { borderColor: '#d4d2e3' },
                  },
                },
              }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pt: 0.5 }}>
            <Box sx={{ display: 'flex', gap: 0.75 }}>
              <Chip
                label={t.tierBadge}
                size="small"
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  height: 22,
                  backgroundColor: 'rgba(0, 210, 180, 0.15)',
                  color: '#008775',
                  border: '1px solid rgba(0, 210, 180, 0.35)',
                }}
              />
              <Chip
                label={t.ownerBadge}
                size="small"
                sx={{
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  height: 22,
                  backgroundColor: 'rgba(89, 81, 255, 0.12)',
                  color: '#5951ff',
                  border: '1px solid rgba(89, 81, 255, 0.3)',
                }}
              />
            </Box>
          </Box>
        </CardContent>

        <Divider sx={{ borderColor: '#e8e6f5' }} />

        {/* Modal Actions */}
        <CardActions sx={{ p: '10px 16px', justifyContent: 'flex-end', gap: 1, backgroundColor: '#faf9ff' }}>
          <Button
            size="small"
            sx={{
              color: '#666666',
              fontSize: '0.78rem',
              fontWeight: 600,
              minWidth: 60,
              textTransform: 'none',
            }}
          >
            {t.cancelBtn}
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#5951ff',
              color: '#FFFFFF',
              fontSize: '0.78rem',
              fontWeight: 600,
              borderRadius: '6px',
              textTransform: 'none',
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: '#3028a1',
                boxShadow: 'none',
              },
            }}
          >
            {t.saveBtn}
          </Button>
        </CardActions>
      </Card>
  );
});

ProspectModal.displayName = 'ProspectModal';
