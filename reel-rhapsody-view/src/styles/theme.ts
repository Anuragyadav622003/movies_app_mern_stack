import { createTheme } from '@mui/material/styles';

// Netflix/IMDb inspired dark theme for Material UI
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#e53e3e', // Cinema red
      light: '#fc8181',
      dark: '#c53030',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#f6e05e', // Cinema gold
      light: '#faf089',
      dark: '#d69e2e',
      contrastText: '#1a202c',
    },
    background: {
      default: '#0a0a0a',
      paper: '#141414',
    },
    text: {
      primary: '#f2f2f2',
      secondary: '#a0aec0',
    },
    error: {
      main: '#fc8181',
    },
    success: {
      main: '#68d391',
    },
    warning: {
      main: '#f6ad55',
    },
    info: {
      main: '#63b3ed',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontWeight: 700,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 24px',
          fontSize: '0.95rem',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(229, 62, 62, 0.3)',
          },
        },
        containedPrimary: {
          background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 100%)',
          '&:hover': {
            background: 'linear-gradient(135deg, #fc8181 0%, #e53e3e 100%)',
          },
        },
        outlined: {
          borderColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            borderColor: '#e53e3e',
            backgroundColor: 'rgba(229, 62, 62, 0.1)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: 'rgba(229, 62, 62, 0.5)',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#e53e3e',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(20, 20, 20, 0.8)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
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
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1a1a1a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(229, 62, 62, 0.15)',
          color: '#fc8181',
          border: '1px solid rgba(229, 62, 62, 0.3)',
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          color: '#e53e3e',
        },
        thumb: {
          '&:hover, &.Mui-focusVisible': {
            boxShadow: '0 0 0 8px rgba(229, 62, 62, 0.16)',
          },
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: 'rgba(229, 62, 62, 0.05)',
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          '& .MuiPaginationItem-root': {
            color: '#f2f2f2',
            '&.Mui-selected': {
              backgroundColor: '#e53e3e',
            },
          },
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#0f0f0f',
          borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(10, 10, 10, 0.9)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: '#2d2d2d',
          fontSize: '0.875rem',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

export default theme;
