import { Refresh } from '@mui/icons-material';
import { Chip, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Filter } from './task-list';

interface ListToolbarProps {
  allTasksCount: number | string;
  openTasksCount: number | string;
  closedTasksCount: number | string;
  refetch: () => void;
  refetchDisabled: boolean;
  currentFilterPicked: Filter;
  onFilterChange: (filter: Filter) => void;
}

function ListToolbar({
  allTasksCount,
  openTasksCount,
  closedTasksCount,
  refetchDisabled,
  refetch,
  currentFilterPicked,
  onFilterChange,
}: ListToolbarProps) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" spacing={1}>
        <Chip
          onClick={() => onFilterChange('ALL')}
          clickable
          label={
            <Stack direction="row" alignItems="center" gap={1}>
              All
              <Typography variant="caption" color="textSecondary">
                {allTasksCount}
              </Typography>
            </Stack>
          }
          variant={currentFilterPicked === 'ALL' ? 'filled' : 'outlined'}
        />

        <Divider orientation="vertical" flexItem />

        <Chip
          clickable
          onClick={() => onFilterChange('OPEN')}
          label={
            <Stack direction="row" alignItems="center" gap={1}>
              Open
              <Typography variant="caption" color="textSecondary">
                {openTasksCount}
              </Typography>
            </Stack>
          }
          variant={currentFilterPicked === 'OPEN' ? 'filled' : 'outlined'}
        />

        <Chip
          clickable
          onClick={() => onFilterChange('CLOSED')}
          label={
            <Stack direction="row" alignItems="center" gap={1}>
              Closed
              <Typography variant="caption" color="textSecondary">
                {closedTasksCount}
              </Typography>
            </Stack>
          }
          variant={currentFilterPicked === 'CLOSED' ? 'filled' : 'outlined'}
        />
      </Stack>
      <IconButton disabled={refetchDisabled} onClick={() => refetch()}>
        <Refresh />
      </IconButton>
    </Stack>
  );
}

export default ListToolbar;
