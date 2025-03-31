import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { 
      main: '#4dabf5',  // Light blue
      light: '#81d4fa',
      dark: '#2196f3'
    },
    secondary: { 
      main: '#f48fb1',  // Light pink
    },
    success: { 
      main: '#66bb6a',  // Light green
      dark: '#43a047'
    },
    error: { 
      main: '#ef5350',  // Light red
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    divider: 'rgba(255, 255, 255, 0.1)',
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h4: {
      letterSpacing: '0.02em',
    },
    h6: {
      letterSpacing: '0.01em',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
    }
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.25)',
            },
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.95rem',
        },
        containedPrimary: {
          background: 'linear-gradient(45deg, #2196f3 30%, #4dabf5 90%)',
        },
        containedSuccess: {
          background: 'linear-gradient(45deg, #43a047 30%, #66bb6a 90%)',
        }
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.5)',
        }
      }
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        }
      }
    }
  }
});

// Obtain the root element from the DOM
const container = document.getElementById('root');
// Create a root with createRoot
const root = createRoot(container);
// Render the app
root.render(
  <ThemeProvider theme={darkTheme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);