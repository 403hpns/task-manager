import { gql } from '@apollo/client';

export const CREATE_TASK = gql`
  mutation CreateTask($createTaskInput: CreateTaskInput!) {
    createTask(createTaskInput: $createTaskInput) {
      id
      title
    }
  }
`;

export const DELETE_TASK = gql`
  mutation RemoveTask($id: String!) {
    removeTask(id: $id) {
      title
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($updateTaskInput: UpdateTaskInput!) {
    updateTask(updateTaskInput: $updateTaskInput) {
      title
      completed
    }
  }
`;
