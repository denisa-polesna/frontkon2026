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
        borderRadius: '16px',
        border: '1px solid rgba(89, 81, 255, 0.25)',
        boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45), 0 2px 16px rgba(0, 0, 0, 0.08)',
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
              bgcolor: '#5951ff',
              color: '#FFFFFF',
              width: 32,
              height: 32,
              borderRadius: '6px',
            }}
          >
            <FormatListBulletedIcon sx={{ fontSize: 18 }} />
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
          <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#120042', fontSize: '0.94rem', lineHeight: 1.2 }}>
            Seznam aktivit
          </Typography>
        }
        subheader={
          <Typography variant="caption" sx={{ color: '#767484', fontSize: '0.72rem' }}>
            Acme Corp • 4 naplánované úkoly
          </Typography>
        }
        sx={{
          p: { xs: 1.8, sm: 2.2 },
          pb: 1.6,
          borderBottom: '1px solid #e2e0ed',
        }}
      />

      {/* Content */}
      <CardContent sx={{ p: { xs: 1.8, sm: 2.2 }, pt: 2, pb: 1.5 }}>
        <Typography component="label" sx={{ display: 'block', fontSize: '0.76rem', fontWeight: 600, color: '#120042', mb: 1 }}>
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
      <CardActions sx={{ px: { xs: 1.8, sm: 2.2 }, pb: { xs: 1.8, sm: 2.2 }, pt: 0.5, justifyContent: 'flex-end', gap: 1 }}>
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
          Zavřít
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
          + Přidat aktivitu
        </Button>
      </CardActions>
    </Card>
  );
};
