import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';
import { ReactNode } from 'react';

interface CustomModalProps {
  title: string;
  description?: string;
  children: ReactNode;
  isModalOpen: boolean;
  onClose: () => void;
}

export function CustomModal({
  title,
  description,
  children,
  isModalOpen,
  onClose,
}: CustomModalProps) {
  return (
    <Dialog fullWidth open={isModalOpen} onClose={onClose}>
      <DialogTitle>
        {title}
        {description && (
          <Typography color="textDisabled">{description}</Typography>
        )}
      </DialogTitle>
      <DialogContent>
        <Box py={1}>{children}</Box>
      </DialogContent>
    </Dialog>
  );
}
