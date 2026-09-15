import React from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
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
  isSolved: _isSolved,
  onSolveAttempt,
  t,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#0A0C16',
        borderRadius: 2.5,
        border: '1px solid #232842',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
        overflow: 'hidden',
        height: '100%',
        minHeight: 0,
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
          flexShrink: 0,
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
      </Box>

      {/* Code Editor Body */}
      <Box
        sx={{
          flex: 1,
          minHeight: 0,
          p: { xs: 1.2, sm: 1.8 },
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography
          sx={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.8rem',
            color: '#7E88A8',
            fontStyle: 'italic',
            userSelect: 'none',
            mb: 0.6,
            flexShrink: 0,
          }}
        >
          {t.taskCommentL3}
        </Typography>

        <Typography
          sx={{
            fontFamily: 'ui-monospace, monospace',
            fontSize: '0.84rem',
            color: '#FFFFFF',
            userSelect: 'none',
            mb: 0.5,
            flexShrink: 0,
          }}
        >
          <span style={{ color: '#FFFFFF', fontWeight: 700 }}>.meeting-title</span> &#123;
        </Typography>

        <Box sx={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
          <CodeMirror
            value={value}
            height="100%"
            minHeight="80px"
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
            flexShrink: 0,
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
          justifyContent: 'flex-end',
          px: { xs: 1.5, sm: 2 },
          py: 1.2,
          backgroundColor: '#161A2D',
          borderTop: '1px solid #232842',
          gap: 1,
          flexShrink: 0,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={onSolveAttempt}
          sx={{
            py: 0.8,
            px: { xs: 2, sm: 2.5 },
            fontSize: '0.8rem',
            fontWeight: 600,
            borderRadius: '6px',
            backgroundColor: '#5951ff',
            color: '#FFF',
            flexShrink: 0,
            boxShadow: 'none',
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#3028a1',
              boxShadow: 'none',
            },
            '&:active': {
              backgroundColor: '#030268',
            },
          }}
        >
          {t.verifyBtn}
        </Button>
      </Box>
    </Box>
  );
};
