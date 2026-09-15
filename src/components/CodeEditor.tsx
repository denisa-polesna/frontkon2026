import React, { useMemo } from 'react';
import {
  Box,
  Typography,
  Button,
} from '@mui/material';
import CodeMirror, { oneDark } from '@uiw/react-codemirror';
import { lineNumbers, EditorView } from '@codemirror/view';
import { css } from '@codemirror/lang-css';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { cssEditorExtensions } from '../utils/cssAutocomplete';
import type { translations } from '../utils/i18n';

export interface CodeEditorLine {
  text: string;
  indent?: number;
  color?: string;
  isComment?: boolean;
  isSelector?: boolean;
}

export interface CodeEditorProps {
  value: string;
  onChange: (val: string) => void;
  onSolveAttempt: () => void;
  onExit?: () => void;
  readOnlyLines: CodeEditorLine[];
  t: typeof translations['en'];
  placeholder?: string;
  isSolved?: boolean;
  hideClosingBrace?: boolean;
}

const FONT_FAMILY = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
const FONT_SIZE = '0.84rem';
const LINE_HEIGHT_PX = 21;
const LINE_HEIGHT = `${LINE_HEIGHT_PX}px`;
const GUTTER_WIDTH = 34;

const editorTheme = EditorView.theme({
  '&': {
    backgroundColor: 'transparent !important',
    fontSize: FONT_SIZE,
    fontFamily: FONT_FAMILY,
  },
  '.cm-scroller': {
    fontFamily: FONT_FAMILY,
    lineHeight: LINE_HEIGHT,
  },
  '.cm-content': {
    fontFamily: FONT_FAMILY,
    padding: '0 !important',
  },
  '.cm-line': {
    padding: '0 8px !important',
    lineHeight: LINE_HEIGHT,
  },
  '.cm-gutters': {
    backgroundColor: 'transparent !important',
    borderRight: 'none !important',
    color: '#495162 !important',
    width: `${GUTTER_WIDTH}px !important`,
    minWidth: `${GUTTER_WIDTH}px !important`,
  },
  '.cm-lineNumbers .cm-gutterElement': {
    padding: '0 10px 0 0 !important',
    minWidth: `${GUTTER_WIDTH}px !important`,
    textAlign: 'right !important',
    lineHeight: LINE_HEIGHT,
    fontFamily: FONT_FAMILY,
    fontSize: FONT_SIZE,
    color: '#495162 !important',
  },
});

export const CodeEditor: React.FC<CodeEditorProps> = ({
  value,
  onChange,
  onSolveAttempt,
  onExit,
  readOnlyLines,
  t,
  placeholder,
  isSolved: _isSolved,
  hideClosingBrace = false,
}) => {
  const readOnlyCount = readOnlyLines.length;
  const lineCount = useMemo(() => value.split('\n').length, [value]);
  const closingLineNo = readOnlyCount + lineCount + 1;

  const extensions = useMemo(
    () => [
      css(),
      ...cssEditorExtensions,
      lineNumbers({ formatNumber: (n) => String(n + readOnlyCount) }),
      editorTheme,
    ],
    [readOnlyCount]
  );
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
        {/* Scrollable IDE Code Buffer */}
        <Box
          sx={{
            flex: 1,
            minHeight: 0,
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {/* Read-only lines */}
          <Box sx={{ display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
            {readOnlyLines.map((line, index) => {
              const lineNo = index + 1;
              const textColor = line.color || (line.isSelector ? '#FFFFFF' : '#7E88A8');
              return (
                <Box
                  key={lineNo}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: LINE_HEIGHT,
                    lineHeight: LINE_HEIGHT,
                    fontFamily: FONT_FAMILY,
                    fontSize: FONT_SIZE,
                    userSelect: 'none',
                  }}
                >
                  <Box
                    sx={{
                      width: `${GUTTER_WIDTH}px`,
                      minWidth: `${GUTTER_WIDTH}px`,
                      textAlign: 'right',
                      pr: '10px',
                      color: '#495162',
                      flexShrink: 0,
                      userSelect: 'none',
                      lineHeight: LINE_HEIGHT,
                    }}
                  >
                    {lineNo}
                  </Box>
                  <Box
                    sx={{
                      pl: '8px',
                      pr: 1,
                      flex: 1,
                      color: textColor,
                      fontWeight: line.isSelector ? 700 : 400,
                      fontStyle: line.isComment ? 'italic' : 'normal',
                      whiteSpace: 'pre',
                      lineHeight: LINE_HEIGHT,
                    }}
                  >
                    {line.indent ? '  '.repeat(line.indent) : ''}
                    {line.text || '\u00A0'}
                  </Box>
                </Box>
              );
            })}
          </Box>

          {/* User code inside CodeMirror */}
          <CodeMirror
            value={value}
            height="auto"
            theme={oneDark}
            extensions={extensions}
            onChange={(val) => onChange(val)}
            basicSetup={{
              lineNumbers: false,
              foldGutter: false,
              dropCursor: false,
              allowMultipleSelections: false,
              indentOnInput: true,
              autocompletion: false,
            }}
            placeholder={placeholder || t.editorPlaceholder}
          />

          {/* Closing brace line immediately after user's last CSS line (hidden when user code manages multiple rules with braces) */}
          {!hideClosingBrace && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: LINE_HEIGHT,
                lineHeight: LINE_HEIGHT,
                fontFamily: FONT_FAMILY,
                fontSize: FONT_SIZE,
                userSelect: 'none',
                flexShrink: 0,
              }}
            >
              <Box
                sx={{
                  width: `${GUTTER_WIDTH}px`,
                  minWidth: `${GUTTER_WIDTH}px`,
                  textAlign: 'right',
                  pr: '10px',
                  color: '#495162',
                  flexShrink: 0,
                  userSelect: 'none',
                }}
              >
                {closingLineNo}
              </Box>
              <Box sx={{ pl: '8px', color: '#FFFFFF', fontWeight: 700 }}>
                &#125;
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Clean Bottom Action Bar */}
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: onExit ? 'space-between' : 'flex-end',
          px: { xs: 1.5, sm: 2 },
          py: 1.2,
          backgroundColor: '#161A2D',
          borderTop: '1px solid #232842',
          gap: 1,
          flexShrink: 0,
        }}
      >
        {onExit && (
          <Button
            variant="outlined"
            size="small"
            onClick={onExit}
            startIcon={<ExitToAppIcon sx={{ fontSize: 16 }} />}
            sx={{
              py: 0.7,
              px: { xs: 1.4, sm: 1.8 },
              fontSize: '0.8rem',
              fontWeight: 600,
              borderRadius: '6px',
              borderColor: 'rgba(255, 255, 255, 0.15)',
              color: '#B0B8C8',
              backgroundColor: 'transparent',
              textTransform: 'none',
              '&:hover': {
                borderColor: '#FF5F56',
                color: '#FF5F56',
                backgroundColor: 'rgba(255, 95, 86, 0.08)',
              },
            }}
          >
            {t.exitBtn}
          </Button>
        )}

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
