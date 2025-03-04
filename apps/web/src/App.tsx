import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import ThemeToggle from './components/theme-toggle';

type Task = {
  id: string;
  text: string;
  completed: boolean;
};

const defaultTasks: Task[] = [
  { id: '1', text: 'Task 1', completed: false },
  { id: '2', text: 'Task 2', completed: false },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(defaultTasks);
  const [newTaskInputValue, setNewTaskInputValue] = useState('');

  const createTask = () => {
    if (newTaskInputValue.trim() === '') {
      return;
    }

    setTasks((prevTasks) => [
      ...prevTasks,
      { id: Date.now().toString(), text: newTaskInputValue, completed: false },
    ]);

    setNewTaskInputValue('');
  };

  return (
    <>
      <CssBaseline enableColorScheme />
      <ThemeToggle />

      <Container>
        <Box sx={{ width: '100%' }}>
          <Typography variant="h5">Lista zadań</Typography>

          <Stack direction="row" spacing={2}>
            <Input
              sx={{ flex: 1 }}
              placeholder="Nowe zadanie"
              value={newTaskInputValue}
              onChange={(event) => setNewTaskInputValue(event.target.value)}
            />

            <Button variant="contained" onClick={createTask}>
              Dodaj
            </Button>
          </Stack>

          <List>
            {tasks.map((task) => (
              <ListItem key={task.id} divider>
                <Checkbox />

                <ListItemButton>
                  <ListItemText primary={task.text} />
                </ListItemButton>

                <IconButton>
                  <Edit />
                </IconButton>

                <IconButton>
                  <Delete />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </>
  );
}

export default App;
