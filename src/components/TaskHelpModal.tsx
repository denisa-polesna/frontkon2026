import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogActions,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { translations } from '../utils/i18n';

interface TaskHelpModalProps {
  open: boolean;
  onClose: () => void;
  levelId: 'level1' | 'level2' | 'level3' | 'level4' | 'level5';
  t: typeof translations['en'];
}

export const TaskHelpModal: React.FC<TaskHelpModalProps> = ({
  open,
  onClose,
  levelId,
  t,
}) => {
  const getTaskData = () => {
    switch (levelId) {
      case 'level1':
        return {
          title: t.taskOverlayTitleL1,
          desc: t.taskOverlayDescL1,
        };
      case 'level2':
        return {
          title: t.taskOverlayTitleL2,
          desc: t.taskOverlayDescL2,
        };
      case 'level3':
        return {
          title: t.taskOverlayTitleL3,
          desc: t.taskOverlayDescL3,
        };
      case 'level4':
        return {
          title: t.taskOverlayTitleL4,
          desc: t.taskOverlayDescL4,
        };
      case 'level5':
      default:
        return {
          title: t.taskOverlayTitleL5,
          desc: t.taskOverlayDescL5,
        };
    }
  };

  const task = getTaskData();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'rgba(20, 20, 28, 0.98)',
            backdropFilter: 'blur(16px)',
          },
        },
        paper: {
          sx: {
            backgroundColor: '#FFFFFF',
            borderRadius: '16px',
            border: '1px solid rgba(89, 81, 255, 0.25)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            p: { xs: 2.5, sm: 3.2 },
            position: 'relative',
            m: { xs: '14px', sm: 2 },
            width: { xs: 'calc(100% - 28px)', sm: '100%' },
          },
        },
      }}
    >
      <IconButton
        onClick={onClose}
        size="small"
        aria-label="close"
        sx={{
          position: 'absolute',
          top: 14,
          right: 14,
          color: '#666666',
          backgroundColor: '#f5f4ff',
          width: 32,
          height: 32,
          '&:hover': {
            backgroundColor: '#e6e4ff',
            color: '#120042',
          },
        }}
      >
        <CloseIcon sx={{ fontSize: 18 }} />
      </IconButton>

      <DialogContent sx={{ p: 0, pt: 0.5 }}>
        {/* Task Title */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 800,
            color: '#120042',
            fontSize: { xs: '1.25rem', sm: '1.45rem' },
            letterSpacing: '-0.02em',
            mb: 2,
            px: { xs: 4, sm: 5 },
            textAlign: 'center',
          }}
        >
          {task.title}
        </Typography>

        {/* Task Description */}
        <Typography
          sx={{
            color: '#4B5563',
            fontSize: { xs: '0.9rem', sm: '0.96rem' },
            lineHeight: 1.6,
            mb: 3,
            textAlign: 'center',
            px: 1,
          }}
        >
          {task.desc}
        </Typography>
      </DialogContent>

      <DialogActions sx={{ p: 0 }}>
        <Button
          variant="contained"
          fullWidth
          size="large"
          onClick={onClose}
          sx={{
            height: 46,
            backgroundColor: '#5951ff',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.95rem',
            borderRadius: '6px',
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#3028a1',
              boxShadow: 'none',
            },
          }}
        >
          {t.helpModalResumeBtn}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
