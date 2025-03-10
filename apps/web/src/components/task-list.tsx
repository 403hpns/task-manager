import { useQuery } from '@apollo/client';
import { SentimentDissatisfied } from '@mui/icons-material';
import { Box, List, Stack, Typography } from '@mui/material';
import { useVirtualizer } from '@tanstack/react-virtual';
import { enqueueSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { GET_TASKS } from '../utils/apollo/query';
import ListToolbar from './list-toolbar';
import TaskListItem from './task-list-item';

type Task = {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  priority: string;
  dueDate: string;
};

type TasksQuery = {
  tasks: Task[];
  taskStats: { total: number; open: number; closed: number };
};

export type Filter = 'ALL' | 'OPEN' | 'CLOSED';

const ITEM_SIZE = 72;

function TaskList() {
  const [currentFilterPicked, setCurrentPicked] = useState<Filter>('ALL');
  const listRef = useRef<HTMLDivElement>(null);

  const handleFilterChange = (filter: Filter) => {
    setCurrentPicked(filter);
  };

  const { loading, data, refetch, error } = useQuery<TasksQuery>(GET_TASKS, {
    variables: { filter: currentFilterPicked },
  });

  const sortedTasks = [...(data?.tasks || [])].sort(
    (a, b) => Number(a.completed) - Number(b.completed)
  );

  const rowVirtualizer = useVirtualizer({
    count: sortedTasks.length,
    getScrollElement: () => listRef.current,
    estimateSize: () => ITEM_SIZE,
    overscan: 5,
  });

  if (loading) {
    return <p>Ładowanie...</p>;
  }

  if (error) {
    enqueueSnackbar(error.message, { variant: 'error' });
  }

  return (
    <Stack
      p={2.5}
      borderRadius="12px"
      boxShadow={'0 0 1px rgba(154, 68, 255, 0.4)'}
      sx={{ backdropFilter: 'blur(25px)' }}
    >
      <ListToolbar
        refetch={refetch}
        refetchDisabled={loading}
        allTasksCount={data?.taskStats.total || 0}
        openTasksCount={data?.taskStats.open || 0}
        closedTasksCount={data?.taskStats.closed || 0}
        currentFilterPicked={currentFilterPicked}
        onFilterChange={handleFilterChange}
      />

      <div
        ref={listRef}
        style={{
          maxHeight: '30vh',
          overflowY: 'auto',
        }}
      >
        <List
          sx={{
            height: `${rowVirtualizer.getTotalSize()}px`,
          }}
        >
          {rowVirtualizer.getVirtualItems().map((virtualRow) => {
            const task = sortedTasks[virtualRow.index];

            return (
              <Box
                key={task.id}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: `${virtualRow.size}px`,
                  transform: `translateY(${virtualRow.start}px)`,
                }}
              >
                <TaskListItem task={task} />
              </Box>
            );
          })}
        </List>

        {sortedTasks.length === 0 && (
          <Stack
            height="100%"
            alignItems="center"
            justifyContent="center"
            color="GrayText"
          >
            <SentimentDissatisfied fontSize="large" />
            <Typography>No tasks</Typography>
          </Stack>
        )}
      </div>
    </Stack>
  );
}

export default TaskList;
