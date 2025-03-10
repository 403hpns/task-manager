import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($filter: TaskStatusFilter) {
    tasks(filter: $filter) {
      id
      title
      description
      completed
      priority
      dueDate
    }

    taskStats {
      total
      open
      closed
    }
  }
`;

export const GET_TASK = gql`
  query GetTask($id: String!) {
    task(id: $id) {
      id
      title
      description
      completed
      priority
      dueDate
    }
  }
`;
