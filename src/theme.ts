import { createTheme } from '@mui/material/styles';

export const outreachTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#5951ff', // Outreach Signature Brand Color from outreach.ai
      light: '#7a7fff',
      dark: '#3028a1',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00D2B4', // Outreach Emerald/Mint
      light: '#33DBC2',
      dark: '#00A890',
      contrastText: '#0A0E1A',
    },
    background: {
      default: '#0c0226', // Outreach Deep Midnight
      paper: '#160844',
    },
    text: {
      primary: '#F0F3FA',
      secondary: '#9BA3BE',
    },
    error: {
      main: '#FF4C61',
      light: '#FF7081',
      dark: '#D9253B',
    },
    warning: {
      main: '#FFB020',
    },
    success: {
      main: '#00D2B4',
    },
  },
  typography: {
    fontFamily: [
      'Lexend',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 6, // matching outreach.ai (.25rem / 6px)
          fontFamily: 'Lexend, sans-serif',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'background-color 0.25s cubic-bezier(0.165, 0.84, 0.44, 1), border-color 0.25s cubic-bezier(0.165, 0.84, 0.44, 1)',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#5951ff',
          color: '#ffffff',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#3028a1',
            boxShadow: 'none',
          },
          '&:active': {
            backgroundColor: '#030268',
          },
        },
        outlined: {
          borderColor: 'rgba(179, 176, 255, 0.35)',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#5951ff',
            borderColor: '#5951ff',
            color: '#ffffff',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
        },
      },
    },
  },
});
