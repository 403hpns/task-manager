import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Add, ChevronRightOutlined } from '@mui/icons-material';
import {
  Button,
  FormControl,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useModal } from '../hooks/use-modal';
import { CREATE_TASK, DELETE_TASK } from '../utils/apollo/mutations';
import { GET_TASKS } from '../utils/apollo/query';
import {
  CreateSimpleTaskSchema,
  createSimpleTaskSchema,
} from '../utils/schemas/create-task';
import NewTaskDialog from './dialogs/new-task-dialog';

function CreateTaskMenu() {
  const [createTask, { loading: isCreatingTask }] = useMutation(CREATE_TASK, {
    update(cache, { data: { createTask } }) {
      cache.modify({
        fields: {
          tasks(existingTasks = []) {
            return [...existingTasks, createTask];
          },
        },
      });
    },
  });

  const [deleteTask, { loading: isDeletingTask }] = useMutation(DELETE_TASK);

  const { openModal, closeModal, isModalOpen, modalProps } = useModal();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateSimpleTaskSchema>({
    resolver: zodResolver(createSimpleTaskSchema),
  });

  const handleCreateTask = async (formFields: CreateSimpleTaskSchema) => {
    const { data } = await createTask({
      variables: {
        createTaskInput: {
          title: formFields.title,
        },
      },
      refetchQueries: [GET_TASKS],
    });

    enqueueSnackbar(`Zadanie dodane`, {
      variant: 'success',
      action: (
        <>
          <Button
            onClick={() => {
              handleUndoCreateTask(data?.createTask?.id);
            }}
          >
            Cofnij
          </Button>
        </>
      ),
    });

    reset();
  };

  const handleUndoCreateTask = async (id: string) => {
    await deleteTask({
      variables: { id },
      refetchQueries: [GET_TASKS],
    });

    enqueueSnackbar('Anulowano zadanie', { variant: 'info' });
  };

  return (
    <form noValidate onSubmit={handleSubmit(handleCreateTask)}>
      <Stack
        p={2.5}
        borderRadius="12px"
        direction="row"
        boxShadow={'0 0 1px rgba(154, 68, 255, 0.4)'}
        sx={{ backdropFilter: 'blur(25px)' }}
      >
        <Stack direction="column" spacing={2} sx={{ flex: 1 }}>
          <Typography fontWeight="bold">What's your plan for today?</Typography>

          <FormControl fullWidth>
            <TextField
              autoFocus
              placeholder="Create a Task Manager app for Typeofcode :-)"
              {...register('title')}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </FormControl>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              size="large"
              endIcon={<ChevronRightOutlined />}
              onClick={() =>
                openModal({
                  title: 'New task',
                  description: 'Create a new task',
                  children: <NewTaskDialog />,
                })
              }
            >
              More options
            </Button>

            <Stack direction="row" alignItems="center" gap={2}>
              <Button
                type="reset"
                variant="outlined"
                size="large"
                onClick={() => reset()}
              >
                Reset
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="large"
                loading={isCreatingTask}
              >
                <Add />
                Create Task
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </form>
  );
}

export default CreateTaskMenu;
