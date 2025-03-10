import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskInput } from './dto/create-task.input';
import { UpdateTaskInput } from './dto/update-task.input';
import { TaskStatusFilter } from './enums/task-status-filter.enum';
import { Task } from './schemas/task.schema';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private readonly taskModel: Model<Task>,
  ) {}

  async create(createTaskInput: CreateTaskInput) {
    const createdTask = await this.taskModel.create(createTaskInput);
    return createdTask.save();
  }

  async findAll(filter: TaskStatusFilter = TaskStatusFilter.ALL) {
    const query: Partial<Task> = {};

    if (filter === TaskStatusFilter.OPEN) {
      query.completed = false;
    } else if (filter === TaskStatusFilter.CLOSED) {
      query.completed = true;
    }

    return await this.taskModel.find(query).exec();
  }

  async findOne(id: string) {
    return await this.taskModel.findById(id).exec();
  }

  async update(id: string, updateTaskInput: UpdateTaskInput) {
    return await this.taskModel.findByIdAndUpdate(id, updateTaskInput);
  }

  async remove(id: string) {
    return await this.taskModel.findByIdAndDelete(id);
  }

  async getStats() {
    const [total, open, closed] = await Promise.all([
      this.taskModel.countDocuments().exec(),
      this.taskModel.countDocuments({ completed: false }).exec(),
      this.taskModel.countDocuments({ completed: true }).exec(),
    ])

    return {total, open, closed}
  }
}
