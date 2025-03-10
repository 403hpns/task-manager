import { useMutation } from '@apollo/client';
import {
  Check,
  CheckCircleOutline,
  CircleOutlined,
  Delete,
  Edit,
  FlagOutlined,
} from '@mui/icons-material';
import {
  Checkbox,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { ChangeEvent, useState } from 'react';
import { useModal } from '../hooks/use-modal';
import { DELETE_TASK, UPDATE_TASK } from '../lib/mutations';
import { GET_TASKS } from '../lib/query';
import UpdateTaskDialog from './dialogs/update-task-dialog';
import TaskPriorityMenu from './task-priority-menu';

type Task = {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDate: string;
};

interface TaskListItemProps {
  task: Task;
}

const priorityColors = {
  low: 'success',
  medium: 'warning',
  high: 'error',
} as const;

type Priority = "low" | "medium" | "high"

const getColor = (priority: keyof typeof priorityColors) => {
  return priorityColors[priority];
};

function TaskListItem({ task }: TaskListItemProps) {
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editedTaskTitle, setEditedTaskTitle] = useState<string>('');
  const [priorityAnchorEl, setPriorityAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const { openModal } = useModal();

  const handleCompleteChange = (
    event: ChangeEvent<HTMLInputElement>,
    taskId: string
  ) => {
    updateTask({
      variables: {
        updateTaskInput: {
          id: taskId,
          completed: event.target.checked,
        },
      },
      refetchQueries: [GET_TASKS],
    });
  };

  const handleDeleteTask = async (id: string) => {
    if (id.trim() === '') return;

    const { data } = await deleteTask({
      variables: { id },
      refetchQueries: [GET_TASKS],
    });

    enqueueSnackbar(`Zadanie ${data.removeTask.title} usunięte`, {
      variant: 'success',
    });
  };

  const handleSaveEdit = async (taskId: string) => {
    if (!editedTaskTitle.trim()) return;

    await updateTask({
      variables: {
        updateTaskInput: {
          id: taskId,
          title: editedTaskTitle,
        },
      },
      refetchQueries: [GET_TASKS],
    });

    setEditingTaskId(null);
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id || null);
    setEditedTaskTitle(task.title);
  };

  const handleOpenPriorityMenu = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setPriorityAnchorEl(event.currentTarget);
  };

  const handleClosePriorityMenu = () => {
    setPriorityAnchorEl(null);
  };

  return (
    <ListItem disableGutters>
      <Checkbox
        aria-label="set task completed"
        checked={task.completed}
        onChange={(event) => handleCompleteChange(event, task.id || '')}
        icon={<CircleOutlined />}
        checkedIcon={<CheckCircleOutline />}
      />
      <IconButton
        aria-label="set task priority"
        onClick={handleOpenPriorityMenu}
      >
        <FlagOutlined color={getColor(task.priority as Priority)} />
      </IconButton>

      <TaskPriorityMenu
        taskId={task.id || ''}
        anchorEl={priorityAnchorEl}
        isOpen={Boolean(priorityAnchorEl)}
        onClose={handleClosePriorityMenu}
      />

      {editingTaskId === task.id ? (
        <TextField
          value={editedTaskTitle}
          onChange={(e) => setEditedTaskTitle(e.target.value)}
          onBlur={() => handleSaveEdit(task.id || '')}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSaveEdit(task.id || '');
            } else if (e.key === 'Escape') {
              e.preventDefault();
              setEditingTaskId(null);
            }
          }}
          autoFocus
          sx={{ flex: 1 }}
        />
      ) : (
        <ListItemButton
          aria-label="edit task title"
          title="Quick edit"
          onClick={() => handleEditClick(task)}
        >
          <Stack
            direction="row"
            alignItems="center"
            spacing={1}
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
          >
            <ListItemText
              primary={task.title}
              secondary={
                <>
                  {task.description}
                  <Typography
                    component="strong"
                    variant="caption"
                    color="textDisabled"
                    sx={{ display: 'block' }}
                  >
                    {task?.dueDate
                      ? `Due ${dayjs(task.dueDate).format(
                          'MMMM Do YYYY, h:mm A, dddd'
                        )}`
                      : 'No due date'}
                  </Typography>
                </>
              }
              sx={{
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? 'gray' : 'inherit',
              }}
            />
          </Stack>
        </ListItemButton>
      )}

      {editingTaskId === task.id ? (
        <IconButton onClick={() => handleSaveEdit(task.id || '')}>
          <Check />
        </IconButton>
      ) : (
        <IconButton
          onClick={() =>
            openModal({
              title: 'Edit task',
              children: <UpdateTaskDialog taskId={task.id || ''} />,
            })
          }
        >
          <Edit />
        </IconButton>
      )}

      <IconButton onClick={() => handleDeleteTask(task.id || '')}>
        <Delete />
      </IconButton>
    </ListItem>
  );
}

export default TaskListItem;
