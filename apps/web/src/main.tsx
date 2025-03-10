import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ModalProvider from './contexts/modal-context.tsx';
import ClientApolloProvider from './providers/apollo-provider.tsx';
import ClientThemeProvider from './providers/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientApolloProvider>
      <ClientThemeProvider>
        <SnackbarProvider maxSnack={4} autoHideDuration={3000}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ModalProvider>
              <App />
            </ModalProvider>
          </LocalizationProvider>
        </SnackbarProvider>
      </ClientThemeProvider>
    </ClientApolloProvider>
  </StrictMode>
);
