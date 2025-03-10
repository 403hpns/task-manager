import { registerEnumType } from '@nestjs/graphql';

export enum TaskStatusFilter {
  ALL = 'ALL',
  OPEN = 'OPEN',
  CLOSED = 'CLOSED',
}

registerEnumType(TaskStatusFilter, {
  name: 'TaskStatusFilter',
});
