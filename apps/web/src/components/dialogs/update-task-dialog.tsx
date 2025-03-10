import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CircularProgress,
  DialogActions,
  FormControl,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useModal } from '../../hooks/use-modal';
import { UPDATE_TASK } from '../../utils/apollo/mutations';
import { GET_TASK, GET_TASKS } from '../../utils/apollo/query';
import {
  CreateFullTaskSchema,
  createFullTaskSchema,
} from '../../utils/schemas/create-task';

interface UpdateTaskDialogProps {
  taskId: string;
}

function UpdateTaskDialog({ taskId }: UpdateTaskDialogProps) {
  const { closeModal } = useModal();

  const { data, loading, client } = useQuery(GET_TASK, {
    variables: { id: taskId },
  });

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateFullTaskSchema>({
    defaultValues: {
      name: data?.task?.title || '',
      description: data?.task?.description || '',
      priority: data?.task?.priority || 'low',
      dueDate: dayjs(data?.task?.dueDate) || dayjs(),
    },

    resolver: zodResolver(createFullTaskSchema),
  });

  useEffect(() => {
    if (data?.task) {
      reset({
        name: data.task.title,
        description: data.task.description,
        priority: data.task.priority,
        dueDate: data.task.dueDate ? dayjs(data.task.dueDate) : dayjs(),
      });
    }
  }, [data, reset]);

  const [updateTask] = useMutation(UPDATE_TASK);

  const onSubmit = async (formValues: CreateFullTaskSchema) => {
    await updateTask({
      variables: {
        updateTaskInput: {
          id: data?.task?.id || '',
          title: formValues.name,
          description: formValues.description,
          priority: formValues.priority,
          dueDate: dayjs(formValues.dueDate),
        },
      },
      refetchQueries: [GET_TASKS],
    });

    closeModal();
    enqueueSnackbar('Zadanie zaktualizowane', { variant: 'success' });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      {loading ? (
        <Stack alignItems="center" justifyContent="center">
          <CircularProgress />
        </Stack>
      ) : (
        <Stack gap={2}>
          <TextField
            fullWidth
            label="Name"
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            fullWidth
            multiline
            label="Description"
            {...register('description')}
            error={!!errors.description}
            helperText={errors.description?.message}
          />

          <Stack direction="row" spacing={2}>
            <FormControl sx={{ width: '50%' }}>
              <TextField
                select
                label="Priority"
                defaultValue="low"
                error={!!errors.priority}
                {...register('priority')}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </TextField>
            </FormControl>
            <Controller
              name="dueDate"
              control={control}
              render={({ field }) => (
                <DateTimePicker
                  sx={{ width: '50%' }}
                  label="Due Date"
                  value={field.value}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      error: !!errors.dueDate,
                      helperText: errors.dueDate?.message,
                    },
                  }}
                />
              )}
            />
          </Stack>

          <DialogActions>
            <Button onClick={closeModal}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Stack>
      )}
    </form>
  );
}

export default UpdateTaskDialog;
