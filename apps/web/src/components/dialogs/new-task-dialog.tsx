import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  DialogActions,
  FormControl,
  MenuItem,
  Stack,
  TextField,
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { enqueueSnackbar } from 'notistack';
import { Controller, useForm } from 'react-hook-form';
import { useModal } from '../../hooks/use-modal';
import { CREATE_TASK } from '../../utils/apollo/mutations';
import { GET_TASKS } from '../../utils/apollo/query';
import {
  CreateFullTaskSchema,
  createFullTaskSchema,
} from '../../utils/schemas/create-task';

function NewTaskDialog() {
  const { closeModal } = useModal();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateFullTaskSchema>({
    defaultValues: {
      name: '',
      description: '',
      priority: 'low',
      dueDate: dayjs(),
    },
    resolver: zodResolver(createFullTaskSchema),
  });

  const [createTask] = useMutation(CREATE_TASK);

  const onSubmit = async (formValues: CreateFullTaskSchema) => {
    await createTask({
      variables: {
        createTaskInput: {
          title: formValues.name,
          description: formValues.description,
          priority: formValues.priority,
          dueDate: formValues.dueDate.toISOString(),
        },
      },
      refetchQueries: [GET_TASKS],
    });

    closeModal();
    enqueueSnackbar('Zadanie zostało utworzone', { variant: 'success' });
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
}

export default NewTaskDialog;
