import { DarkModeOutlined, LightModeOutlined } from '@mui/icons-material';
import { IconButton, useColorScheme } from '@mui/material';

function ThemeToggle() {
  const { mode, setMode } = useColorScheme();

  return (
    <IconButton
      aria-label="toggle color mode"
      onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}
      sx={{ position: 'fixed', top: 0, right: 0, m: 1 }}
    >
      {mode === 'dark' ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
}

export default ThemeToggle;
