import { AutoAwesome } from '@mui/icons-material';
import { Box, Chip, Typography } from '@mui/material';

function Header() {
  return (
    <Box textAlign="center">
      <Chip
        color="secondary"
        variant="outlined"
        label="Your best task management tool"
        icon={<AutoAwesome />}
      />
      <Typography
        variant="h2"
        component="h1"
        lineHeight={1.1}
        whiteSpace={'pretty'}
        sx={{
          fontWeight: 'bold',
          background:
            'linear-gradient(to bottom right, white 40%, #9A44FF 90%)',
          backgroundClip: 'text',
          color: 'transparent',
          textWrap: 'balance',
        }}
      >
        Manage your tasks with ease in single place
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        Organize your day doing tasks and keep track of your progress
      </Typography>
    </Box>
  );
}

export default Header;
