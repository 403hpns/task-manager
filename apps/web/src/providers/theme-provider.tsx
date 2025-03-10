import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

export const brand = {
  50: 'hsl(210, 100%, 95%)',
  100: 'hsl(210, 100%, 92%)',
  200: 'hsl(210, 100%, 80%)',
  300: 'hsl(210, 100%, 65%)',
  400: 'hsl(210, 98%, 48%)',
  500: 'hsl(210, 98%, 42%)',
  600: 'hsl(210, 98%, 55%)',
  700: 'hsl(210, 100%, 35%)',
  800: 'hsl(210, 100%, 16%)',
  900: 'hsl(210, 100%, 21%)',
};

export const gray = {
  50: 'hsl(220, 35%, 97%)',
  100: 'hsl(220, 30%, 94%)',
  200: 'hsl(220, 20%, 88%)',
  300: 'hsl(220, 20%, 80%)',
  400: 'hsl(220, 20%, 65%)',
  500: 'hsl(220, 20%, 42%)',
  600: 'hsl(220, 20%, 35%)',
  700: 'hsl(220, 20%, 25%)',
  800: 'hsl(220, 30%, 6%)',
  900: 'hsl(220, 35%, 3%)',
};

const theme = createTheme({
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: '#9A44FF',
        },

        secondary: {
          main: '#B97EFF',
        },

        background: {
          default: '#0c0c0c0',
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: '#9A44FF',
        },

        secondary: {
          main: '#B97EFF',
        },

        background: {
          default: '#1f1f21',
        },
      },
    },
  },

  shape: {
    borderRadius: 12,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'RGBA(9, 0, 19, 0.9)',
          backdropFilter: 'blur(1px)',
          backgroundImage: 'none',
        },
      },
    },
  },
});

function ClientThemeProvider({ children }: PropsWithChildren) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default ClientThemeProvider;
