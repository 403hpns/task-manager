import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ClientThemeProvider from './providers/theme-provider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ClientThemeProvider>
      <App />
    </ClientThemeProvider>
  </StrictMode>
);
