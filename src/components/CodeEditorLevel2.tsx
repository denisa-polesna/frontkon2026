import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FlashOnIcon from '@mui/icons-material/FlashOn';
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
        backgroundColor: '#101324',
        borderRadius: 2.5,
        border: isSolved ? '1.5px solid #00D2B4' : '1px solid #202642',
        boxShadow: isSolved
          ? '0 0 24px rgba(0, 210, 180, 0.2)'
          : '0 8px 24px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        height: '100%',
        minHeight: { xs: 240, md: 360 },
      }}
    >
      {/* Sleek Minimal Toolbar Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1.5, sm: 2 },
          py: 1,
          backgroundColor: '#14182C',
          borderBottom: '1px solid #202642',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {/* Left: Selector Tag & Shortcut */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
          <Typography
            sx={{
              color: '#FFD166',
              fontFamily: 'ui-monospace, monospace',
              fontWeight: 800,
              fontSize: '0.82rem',
            }}
          >
            .meeting-title
          </Typography>

          <Button
            size="small"
            startIcon={<FlashOnIcon sx={{ fontSize: '12px !important' }} />}
            onClick={() =>
              applyPreset('overflow: hidden;\ntext-overflow: ellipsis;\nwhite-space: nowrap;')
            }
            sx={{
              py: '2px',
              px: 1,
              minWidth: 'auto',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: '#FFD166',
              backgroundColor: 'rgba(255, 209, 102, 0.1)',
              border: '1px solid rgba(255, 209, 102, 0.25)',
              '&:hover': {
                backgroundColor: 'rgba(255, 209, 102, 0.2)',
              },
            }}
          >
            Ellipsis
          </Button>
        </Box>

        {/* Right: Golf count */}
        <Typography
          sx={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.74rem',
            color: '#8E95B2',
            fontWeight: 700,
          }}
        >
          {t.golfCount.replace('{chars}', charCount.toString())}
        </Typography>
      </Box>

      {/* Code Editor Body */}
      <Box
        sx={{
          flex: 1,
          p: { xs: 1.2, sm: 1.8 },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.84rem',
            color: '#8E95B2',
            userSelect: 'none',
            mb: 0.5,
          }}
        >
          <span style={{ color: '#FFD166', fontWeight: 700 }}>.meeting-title</span> &#123;
        </Typography>

        <Box sx={{ flex: 1, minHeight: { xs: 100, md: 150 } }}>
          <CodeMirror
            value={value}
            height="100%"
            minHeight="110px"
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
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.84rem',
            color: '#8E95B2',
            userSelect: 'none',
            mt: 0.5,
          }}
        >
          &#125;
        </Typography>
      </Box>

      {/* Clean Bottom Action Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: { xs: 1.5, sm: 2 },
          py: 1.2,
          backgroundColor: '#12162A',
          borderTop: '1px solid #202642',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          {failedVerify ? (
            <Chip
              label={t.verifyFailedToast}
              size="small"
              sx={{
                bgcolor: 'rgba(255, 76, 97, 0.2)',
                color: '#FF6B7D',
                border: '1px solid rgba(255, 76, 97, 0.4)',
                fontSize: '0.66rem',
                fontWeight: 700,
                animation: 'shake 0.35s ease-in-out',
              }}
            />
          ) : (
            <Typography variant="caption" sx={{ color: '#6A7394', fontSize: '0.7rem' }}>
              {t.autoCheckLabel}
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          size="small"
          startIcon={isSolved ? <CheckCircleIcon /> : undefined}
          onClick={handleVerifyClick}
          sx={{
            py: 0.8,
            px: { xs: 2, sm: 2.5 },
            fontSize: '0.8rem',
            fontWeight: 800,
            letterSpacing: '0.02em',
            backgroundColor: isSolved ? '#00D2B4' : failedVerify ? '#D9253B' : '#6E3FF3',
            color: isSolved ? '#08141B' : '#FFF',
            animation: failedVerify ? 'shake 0.35s ease-in-out' : 'none',
            flexShrink: 0,
            '&:hover': {
              backgroundColor: isSolved ? '#33DBC2' : failedVerify ? '#FF4C61' : '#572BD4',
            },
          }}
        >
          {isSolved ? t.mergedBtn : t.verifyBtn}
        </Button>
      </Box>
    </Box>
  );
};
