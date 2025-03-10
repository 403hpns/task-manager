import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SnackbarProvider } from 'notistack';
import { PropsWithChildren } from 'react';
import ModalProvider from '../contexts/modal-context';
import ClientApolloProvider from './apollo-provider';
import ClientThemeProvider from './theme-provider';

function Providers({ children }: PropsWithChildren) {
  return (
    <ClientApolloProvider>
      <ClientThemeProvider>
        <SnackbarProvider maxSnack={4} autoHideDuration={3000} preventDuplicate>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <ModalProvider>{children}</ModalProvider>
          </LocalizationProvider>
        </SnackbarProvider>
      </ClientThemeProvider>
    </ClientApolloProvider>
  );
}

export default Providers;
