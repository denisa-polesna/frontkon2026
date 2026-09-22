import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Box,
  Button,
  Avatar,
  Chip,
} from '@mui/material';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import CloseIcon from '@mui/icons-material/Close';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import EmailIcon from '@mui/icons-material/Email';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import DescriptionIcon from '@mui/icons-material/Description';

interface ActivityListModalProps {
  id?: string;
  listRef?: React.RefObject<HTMLDivElement | null>;
}

export const ActivityListModal: React.FC<ActivityListModalProps> = ({ id = 'activity-modal', listRef }) => {
  return (
    <Card
      id={id}
      sx={{
        width: { xs: 330, sm: 380 },
        maxWidth: '96%',
        backgroundColor: '#FFFFFF',
        borderRadius: '14px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
        position: 'relative',
        userSelect: 'none',
        pointerEvents: 'none',
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
            <FormatListBulletedIcon sx={{ fontSize: 19 }} />
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
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#111827', fontSize: '0.94rem', lineHeight: 1.2 }}>
            Seznam aktivit
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#6B7280', fontSize: '0.74rem' }}>
            Acme Corp • 4 naplánované úkoly
          </Typography>
        }
        sx={{
          p: { xs: 1.6, sm: 2 },
          pb: 1.6,
          borderBottom: '1px solid #E5E7EB',
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: { xs: 1.8, sm: 2.2 }, pt: 2, pb: 1.5 }}>
        <Typography component="label" sx={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#374151', mb: 1 }}>
          Nadcházející aktivity:
        </Typography>

        {/* The List Container styled by player with .activity-list */}
        <div
          ref={listRef as React.RefObject<HTMLDivElement>}
          className="activity-list"
          style={{ width: '100%', boxSizing: 'border-box' }}
        >
          {/* Item 1 */}
          <Box
            className="activity-item"
            sx={{
              p: 1.2,
              borderRadius: '8px',
              backgroundColor: '#fbfaff',
              border: '1.5px solid #e2e0ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(89, 81, 255, 0.12)',
                  color: '#5951ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <PhoneInTalkIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#120042', lineHeight: 1.2 }}>
                  Telefonát s klientem
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#767484' }}>
                  Dnes v 15:30 (15 min)
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Hovor"
              size="small"
              sx={{ height: 20, fontSize: '0.66rem', fontWeight: 700, bgcolor: 'rgba(89, 81, 255, 0.1)', color: '#5951ff' }}
            />
          </Box>

          {/* Item 2 */}
          <Box
            className="activity-item"
            sx={{
              p: 1.2,
              borderRadius: '8px',
              backgroundColor: '#fbfaff',
              border: '1.5px solid #e2e0ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(0, 210, 180, 0.12)',
                  color: '#007A68',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <EmailIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#120042', lineHeight: 1.2 }}>
                  Odeslat nabídku na Q4
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#767484' }}>
                  Předloha připravena
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Email"
              size="small"
              sx={{ height: 20, fontSize: '0.66rem', fontWeight: 700, bgcolor: 'rgba(0, 210, 180, 0.12)', color: '#007A68' }}
            />
          </Box>

          {/* Item 3 */}
          <Box
            className="activity-item"
            sx={{
              p: 1.2,
              borderRadius: '8px',
              backgroundColor: '#fbfaff',
              border: '1.5px solid #e2e0ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(255, 176, 32, 0.12)',
                  color: '#945800',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <EventAvailableIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#120042', lineHeight: 1.2 }}>
                  Prezentace pro vedení
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#767484' }}>
                  Zítra v 10:00
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Schůzka"
              size="small"
              sx={{ height: 20, fontSize: '0.66rem', fontWeight: 700, bgcolor: 'rgba(255, 176, 32, 0.12)', color: '#945800' }}
            />
          </Box>

          {/* Item 4 */}
          <Box
            className="activity-item"
            sx={{
              p: 1.2,
              borderRadius: '8px',
              backgroundColor: '#fbfaff',
              border: '1.5px solid #e2e0ed',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxSizing: 'border-box',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 28,
                  height: 28,
                  borderRadius: '6px',
                  backgroundColor: 'rgba(89, 81, 255, 0.12)',
                  color: '#5951ff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <DescriptionIcon sx={{ fontSize: 16 }} />
              </Box>
              <Box>
                <Typography sx={{ fontSize: '0.82rem', fontWeight: 700, color: '#120042', lineHeight: 1.2 }}>
                  Zápis z jednání
                </Typography>
                <Typography sx={{ fontSize: '0.7rem', color: '#767484' }}>
                  Podepsáno $450k ARR
                </Typography>
              </Box>
            </Box>
            <Chip
              label="Zápis"
              size="small"
              sx={{ height: 20, fontSize: '0.66rem', fontWeight: 700, bgcolor: 'rgba(89, 81, 255, 0.1)', color: '#5951ff' }}
            />
          </Box>
        </div>
      </CardContent>

      {/* Action Footer */}
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
          Zavřít
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
          + Přidat aktivitu
        </Button>
      </CardActions>
    </Card>
  );
};
