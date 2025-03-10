import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.input';
import { TaskStats } from './dto/task-stats.dto';
import { Task } from './dto/task.dto';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskStatusFilter } from './enums/task-status-filter.enum';
import { TasksService } from './tasks.service';

@Resolver(() => Task)
export class TasksResolver {
  constructor(private readonly tasksService: TasksService) {}

  @Mutation(() => Task)
  createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput) {
    return this.tasksService.create(createTaskInput);
  }

  @Query(() => [Task], { name: 'tasks' })
  findAll(
    @Args('filter', {
      type: () => TaskStatusFilter,
      defaultValue: TaskStatusFilter.ALL,
      nullable: true,
    })
    filter: TaskStatusFilter,
  ) {
    return this.tasksService.findAll(filter);
  }

  @Query(() => Task, { name: 'task' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.findOne(id);
  }

  @Mutation(() => Task)
  updateTask(@Args('updateTaskInput') updateTaskInput: UpdateTaskInput) {
    return this.tasksService.update(updateTaskInput.id, updateTaskInput);
  }

  @Mutation(() => Task)
  removeTask(@Args('id', { type: () => String }) id: string) {
    return this.tasksService.remove(id);
  }

  @Query(() => TaskStats, { name: 'taskStats' })
  getTaskStats() {
    return this.tasksService.getStats();
  }
}
