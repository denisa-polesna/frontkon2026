import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
  Collapse,
  IconButton,
  Tooltip,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import GitHubIcon from '@mui/icons-material/GitHub';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { css } from '@codemirror/lang-css';
import { cssEditorExtensions } from '../utils/cssAutocomplete';
import type { translations } from '../utils/i18n';

interface CodeEditorLevel2Props {
  value: string;
  onChange: (val: string) => void;
  isSolved: boolean;
  onSolveAttempt: () => void;
  t: typeof translations['en'];
}

export const CodeEditorLevel2: React.FC<CodeEditorLevel2Props> = ({
  value,
  onChange,
  isSolved,
  onSolveAttempt,
  t,
}) => {
  const [showHint, setShowHint] = useState<boolean>(false);
  const [failedVerify, setFailedVerify] = useState<boolean>(false);

  const applyPreset = (presetCss: string) => {
    onChange(presetCss);
  };

  const handleVerifyClick = () => {
    if (isSolved) {
      onSolveAttempt();
    } else {
      setFailedVerify(true);
      setTimeout(() => setFailedVerify(false), 2500);
      onSolveAttempt();
    }
  };

  const charCount = value.trim().length;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        height: '100%',
      }}
    >
      {/* PR Card / Context Header */}
      <Box
        sx={{
          backgroundColor: '#131627',
          borderRadius: 2,
          padding: '12px 16px',
          border: '1px solid #232842',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <GitHubIcon sx={{ fontSize: 18, color: '#C4B5FD' }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 700, color: '#FFFFFF', fontSize: '0.88rem' }}>
              {t.l3PrTitle}
            </Typography>
          </Box>
          <Chip
            label={t.needsReview}
            size="small"
            sx={{
              height: 20,
              fontSize: '0.65rem',
              fontWeight: 700,
              backgroundColor: 'rgba(255, 176, 32, 0.15)',
              color: '#FFB020',
              border: '1px solid rgba(255, 176, 32, 0.3)',
            }}
          />
        </Box>
        <Typography variant="caption" sx={{ color: '#8892B0', fontSize: '0.74rem' }}>
          {t.branchLabel} <code style={{ color: '#C4B5FD' }}>devbot/ultrawide-title</code> &bull; Target: <code>main</code>
        </Typography>
      </Box>

      {/* DevBot's Bad Code (Crossed out) */}
      <Box
        sx={{
          backgroundColor: '#1a1217',
          borderRadius: 2,
          padding: '12px 16px',
          border: '1px solid rgba(255, 76, 97, 0.3)',
          position: 'relative',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Typography
            sx={{
              fontSize: '0.74rem',
              fontWeight: 700,
              color: '#FF6B7D',
              display: 'flex',
              alignItems: 'center',
              gap: 0.8,
            }}
          >
            {t.devbotHallucination}
          </Typography>
          <Typography variant="caption" sx={{ color: '#B35D67', fontSize: '0.68rem', fontStyle: 'italic' }}>
            {t.l3DevbotExcuse}
          </Typography>
        </Box>

        <Box
          component="pre"
          sx={{
            m: 0,
            fontFamily: 'monospace',
            fontSize: '0.78rem',
            color: '#B35D67',
            textDecoration: 'line-through',
            opacity: 0.85,
            lineHeight: 1.5,
          }}
        >
          {`.meeting-title {
  width: 99999px;
  white-space: nowrap;
  font-size: 8px; /* shrunk by 80% so it fits 4K TVs */
}`}
        </Box>
      </Box>

      {/* Senior Dev Editor */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#0F1220',
          borderRadius: 2,
          border: isSolved ? '1px solid #00D2B4' : '1px solid #232842',
          overflow: 'hidden',
        }}
      >
        {/* Editor Title Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 14px',
            backgroundColor: '#16192B',
            borderBottom: '1px solid #232842',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon sx={{ fontSize: 16, color: '#00D2B4' }} />
            <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: '#FFFFFF' }}>
              {t.seniorEditorTitle}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#8892B0', fontFamily: 'monospace', fontSize: '0.72rem' }}>
              {t.golfCount.replace('{chars}', charCount.toString())}
            </Typography>
            <Tooltip title={t.hintsToggle}>
              <IconButton
                size="small"
                onClick={() => setShowHint(!showHint)}
                sx={{
                  color: showHint ? '#FFB020' : '#8892B0',
                  padding: '2px',
                }}
              >
                <LightbulbOutlinedIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Collapsible Hints Box */}
        <Collapse in={showHint}>
          <Box
            sx={{
              padding: '10px 14px',
              backgroundColor: '#1F1B12',
              borderBottom: '1px solid #382D16',
              display: 'flex',
              flexDirection: 'column',
              gap: 1,
            }}
          >
            <Typography variant="caption" sx={{ color: '#FFD166', fontWeight: 600 }}>
              {t.hintsHeader}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ContentCopyIcon sx={{ fontSize: '12px !important' }} />}
                onClick={() => applyPreset('overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;')}
                sx={{
                  borderColor: '#4A3B18',
                  color: '#FFD166',
                  fontSize: '0.72rem',
                  py: 0.2,
                }}
              >
                {t.l3HintEllipsis}
              </Button>
            </Box>
          </Box>
        </Collapse>

        {/* Code Input Canvas with CodeMirror + CSS Autocompletion */}
        <Box
          sx={{
            flex: 1,
            position: 'relative',
            padding: '10px 14px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: '0.86rem',
              color: '#8E95B2',
              userSelect: 'none',
              mb: 0.5,
            }}
          >
            <span style={{ color: '#00D2B4', fontWeight: 700 }}>.meeting-title</span> &#123;
          </Typography>

          <Box sx={{ flex: 1, minHeight: 125 }}>
            <CodeMirror
              value={value}
              height="135px"
              theme={oneDark}
              extensions={[css(), ...cssEditorExtensions]}
              onChange={(val) => onChange(val)}
              basicSetup={{
                lineNumbers: true,
                foldGutter: false,
                dropCursor: false,
                allowMultipleSelections: false,
                indentOnInput: true,
                autocompletion: false,
              }}
              placeholder={t.editorPlaceholder}
            />
          </Box>

          <Typography
            sx={{
              fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
              fontSize: '0.86rem',
              color: '#8E95B2',
              userSelect: 'none',
              mt: 0.5,
            }}
          >
            &#125;
          </Typography>
        </Box>

        {/* Bottom Action Footer */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            backgroundColor: '#141829',
            borderTop: '1px solid #232842',
            gap: 1,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="caption" sx={{ color: '#6A7394', fontSize: '0.72rem' }}>
              {t.autoCheckLabel}
            </Typography>
            {failedVerify && (
              <Chip
                label={t.verifyFailedToast}
                size="small"
                sx={{
                  bgcolor: 'rgba(255, 76, 97, 0.2)',
                  color: '#FF6B7D',
                  border: '1px solid rgba(255, 76, 97, 0.4)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  animation: 'shake 0.35s ease-in-out',
                }}
              />
            )}
          </Box>

          <Button
            variant="contained"
            size="small"
            color={isSolved ? 'success' : 'primary'}
            startIcon={isSolved ? <CheckCircleIcon /> : undefined}
            onClick={handleVerifyClick}
            sx={{
              fontSize: '0.78rem',
              fontWeight: 700,
              backgroundColor: isSolved ? '#00D2B4' : failedVerify ? '#D9253B' : '#6E3FF3',
              color: isSolved ? '#08141B' : '#FFF',
              animation: failedVerify ? 'shake 0.35s ease-in-out' : 'none',
              '&:hover': {
                backgroundColor: isSolved ? '#33DBC2' : failedVerify ? '#FF4C61' : '#572BD4',
              },
            }}
          >
            {isSolved ? t.mergedBtn : t.verifyBtn}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
