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
          width: 380,
          maxWidth: '92%',
          margin: 0,
          boxSizing: 'border-box',
          backgroundColor: '#181C2E',
          borderRadius: 2.5,
          border: '1px solid #2B3254',
          boxShadow: '0 20px 45px rgba(0, 0, 0, 0.65), 0 0 20px rgba(110, 63, 243, 0.2)',
          pointerEvents: 'none', // purely for display in the puzzle
          userSelect: 'none',
        }}
      >
      {/* Outreach Modal Header */}
      <CardHeader
        avatar={
          <Avatar
            sx={{
              bgcolor: '#6E3FF3',
              width: 32,
              height: 32,
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
              color: '#656D8A',
            }}
          >
            <CloseIcon sx={{ fontSize: 18 }} />
          </Box>
        }
        title={
          <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.92rem' }}>
            {t.modalTitle}
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#828BAA', fontSize: '0.72rem' }}>
            {t.modalSubheader}
          </Typography>
        }
        sx={{ p: '12px 16px', pb: 1 }}
      />

      <Divider sx={{ borderColor: '#232842' }} />

      {/* Form Fields from Outreach CreateProspect */}
      <CardContent sx={{ p: '14px 16px', display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label={t.firstName}
            size="small"
            defaultValue="Ada"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.82rem',
                backgroundColor: '#111422',
                color: '#E2E6F2',
              },
            }}
          />
          <TextField
            label={t.lastName}
            size="small"
            defaultValue="Lovelace"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.82rem',
                backgroundColor: '#111422',
                color: '#E2E6F2',
              },
            }}
          />
        </Box>

        <TextField
          label={t.workEmail}
          size="small"
          defaultValue="ada.lovelace@analytical.engine"
          fullWidth
          slotProps={{ inputLabel: { shrink: true } }}
          sx={{
            '& .MuiInputBase-root': {
              fontSize: '0.82rem',
              backgroundColor: '#111422',
              color: '#E2E6F2',
            },
          }}
        />

        <Box sx={{ display: 'flex', gap: 1 }}>
          <TextField
            label={t.targetAccount}
            size="small"
            defaultValue="Babbage Industries"
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.82rem',
                backgroundColor: '#111422',
                color: '#E2E6F2',
              },
            }}
          />
          <TextField
            label={t.stage}
            size="small"
            defaultValue={t.stageValue}
            fullWidth
            slotProps={{ inputLabel: { shrink: true } }}
            sx={{
              '& .MuiInputBase-root': {
                fontSize: '0.82rem',
                backgroundColor: '#111422',
                color: '#E2E6F2',
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
                height: 22,
                backgroundColor: 'rgba(0, 210, 180, 0.15)',
                color: '#00D2B4',
                border: '1px solid rgba(0, 210, 180, 0.3)',
              }}
            />
            <Chip
              label={t.ownerBadge}
              size="small"
              sx={{
                fontSize: '0.68rem',
                height: 22,
                backgroundColor: 'rgba(110, 63, 243, 0.15)',
                color: '#C4B5FD',
                border: '1px solid rgba(110, 63, 243, 0.3)',
              }}
            />
          </Box>
        </Box>
      </CardContent>

      <Divider sx={{ borderColor: '#232842' }} />

      {/* Modal Actions */}
      <CardActions sx={{ p: '10px 16px', justifyContent: 'flex-end', gap: 1 }}>
        <Button
          size="small"
          sx={{
            color: '#8E95B2',
            fontSize: '0.78rem',
            minWidth: 60,
          }}
        >
          {t.cancelBtn}
        </Button>
        <Button
          variant="contained"
          size="small"
          sx={{
            backgroundColor: '#6E3FF3',
            fontSize: '0.78rem',
            fontWeight: 700,
            '&:hover': {
              backgroundColor: '#5930D9',
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
