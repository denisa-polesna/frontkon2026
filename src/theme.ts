import { createTheme } from '@mui/material/styles';

export const outreachTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6E3FF3', // Outreach Signature Purple
      light: '#8B64F6',
      dark: '#4D24BD',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#00D2B4', // Outreach Emerald/Mint
      light: '#33DBC2',
      dark: '#00A890',
      contrastText: '#0A0E1A',
    },
    background: {
      default: '#0A0D18',
      paper: '#141828',
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
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(110, 63, 243, 0.3)',
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
