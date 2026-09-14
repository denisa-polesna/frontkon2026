import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Chip,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
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

  const handleVerifyClick = () => {
    if (isSolved) {
      onSolveAttempt();
    } else {
      setFailedVerify(true);
      setTimeout(() => setFailedVerify(false), 2500);
      onSolveAttempt();
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0F1322',
        borderRadius: 2.5,
        border: isSolved ? '2px solid #00D2B4' : '1px solid #232842',
        boxShadow: isSolved
          ? '0 0 24px rgba(0, 210, 180, 0.2)'
          : '0 8px 24px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        height: '100%',
        minHeight: { xs: 320, sm: 380, md: 440 },
      }}
    >
      {/* Sleek Minimal Toolbar Header */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: { xs: '6px 10px', sm: '8px 14px' },
          backgroundColor: '#161A2D',
          borderBottom: '1px solid #232842',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2, flexShrink: 0 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FF5F56' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#FFBD2E' }} />
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#27C93F' }} />
          </Box>
          <Typography
            sx={{
              fontSize: '0.8rem',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '0.02em',
            }}
          >
            {t.mobileTabEditor || 'Editor'}
          </Typography>
        </Box>

        {/* Right: Char count */}
        <Typography
          sx={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.74rem',
            color: '#8E95B2',
            fontWeight: 700,
          }}
        >
          {value.trim().length} chars
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
          backgroundColor: '#161A2D',
          borderTop: '1px solid #232842',
          gap: 1,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
          {failedVerify && (
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
          {t.verifyBtn}
        </Button>
      </Box>
    </Box>
  );
};
