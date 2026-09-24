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
  Avatar,
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
          borderRadius: '14px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
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
                bgcolor: '#EEEDFE',
                color: '#5951FF',
                width: 34,
                height: 34,
                borderRadius: '8px',
              }}
            >
              <PersonAddAlt1Icon sx={{ fontSize: 19 }} />
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
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#111827', fontSize: '0.94rem' }}>
              {t.modalTitle}
            </Typography>
          }
          sx={{ p: '14px 18px', borderBottom: '1px solid #E5E7EB' }}
        />

        {/* Form Fields from Outreach CreateProspect */}
        <CardContent sx={{ p: '16px 18px', display: 'flex', flexDirection: 'column', gap: 1.4 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              label={t.firstName}
              size="small"
              defaultValue="Ada"
              fullWidth
              slotProps={{
                inputLabel: { shrink: true, sx: { color: '#4B5563', fontSize: '0.82rem', fontWeight: 500 } },
                input: {
                  sx: {
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    backgroundColor: '#FFFFFF',
                    color: '#111827',
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#E5E7EB' },
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
                inputLabel: { shrink: true, sx: { color: '#4B5563', fontSize: '0.82rem', fontWeight: 500 } },
                input: {
                  sx: {
                    fontSize: '0.84rem',
                    fontWeight: 500,
                    backgroundColor: '#FFFFFF',
                    color: '#111827',
                    borderRadius: '8px',
                    '& fieldset': { borderColor: '#E5E7EB' },
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
              inputLabel: { shrink: true, sx: { color: '#4B5563', fontSize: '0.82rem', fontWeight: 500 } },
              input: {
                sx: {
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#E5E7EB' },
                },
              },
            }}
          />

          <TextField
            label={t.targetAccount}
            size="small"
            defaultValue="Babbage Industries"
            fullWidth
            slotProps={{
              inputLabel: { shrink: true, sx: { color: '#4B5563', fontSize: '0.82rem', fontWeight: 500 } },
              input: {
                sx: {
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  backgroundColor: '#FFFFFF',
                  color: '#111827',
                  borderRadius: '8px',
                  '& fieldset': { borderColor: '#E5E7EB' },
                },
              },
            }}
          />
        </CardContent>

        {/* Modal Actions */}
        <CardActions sx={{ p: '12px 18px', justifyContent: 'flex-end', gap: 1, backgroundColor: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
          <Button
            size="small"
            sx={{
              color: '#4B5563',
              fontSize: '0.8rem',
              fontWeight: 600,
              minWidth: 64,
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#F3F4F6', color: '#111827' },
            }}
          >
            {t.cancelBtn}
          </Button>
          <Button
            variant="contained"
            size="small"
            sx={{
              backgroundColor: '#5951FF',
              color: '#FFFFFF',
              fontSize: '0.8rem',
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
            {t.saveBtn}
          </Button>
        </CardActions>
      </Card>
  );
});

ProspectModal.displayName = 'ProspectModal';
