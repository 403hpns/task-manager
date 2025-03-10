import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TaskDocument = HydratedDocument<Task>;

type Priority = 'low' | 'medium' | 'high';

@Schema()
export class Task {
  @Prop()
  title: string;

  @Prop({ nullable: true, default: null })
  description?: string;

  @Prop({ default: false })
  completed?: boolean;

  @Prop({ type: String, default: 'low' })
  priority?: Priority;

  @Prop({ type: Date, nullable: true })
  dueDate?: Date;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
