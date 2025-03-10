import { useMutation } from '@apollo/client';
import { Menu, MenuItem } from '@mui/material';
import { UPDATE_TASK } from '../lib/mutations';
import { GET_TASKS } from '../lib/query';

interface TaskPriorityMenuProps {
  taskId: string;
  anchorEl: HTMLElement | null;
  isOpen: boolean;
  onClose: () => void;
}

function TaskPriorityMenu({
  taskId,
  anchorEl,
  isOpen,
  onClose,
}: TaskPriorityMenuProps) {
  const [updateTask] = useMutation(UPDATE_TASK);

  const handlePriorityChange = async (priority: string) => {
    await updateTask({
      variables: {
        updateTaskInput: { id: taskId, priority },
      },
      refetchQueries: [GET_TASKS],
    });

    onClose();
  };

  return (
    <Menu anchorEl={anchorEl} open={isOpen} onClose={onClose}>
      <MenuItem onClick={() => handlePriorityChange('low')}>Low</MenuItem>
      <MenuItem onClick={() => handlePriorityChange('medium')}>Medium</MenuItem>
      <MenuItem onClick={() => handlePriorityChange('high')}>High</MenuItem>
    </Menu>
  );
}

export default TaskPriorityMenu;
