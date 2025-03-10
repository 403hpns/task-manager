import { ThemeProvider, createTheme } from '@mui/material/styles';
import { PropsWithChildren } from 'react';

const theme = createTheme({
  colorSchemes: {
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

  typography: {
    fontFamily: 'Inter, sans-serif',
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
  return (
    <ThemeProvider defaultMode="dark" theme={theme}>
      {children}
    </ThemeProvider>
  );
}

export default ClientThemeProvider;
