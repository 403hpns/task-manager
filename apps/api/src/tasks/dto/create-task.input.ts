import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

type Priority = 'low' | 'medium' | 'high';

@InputType()
export class CreateTaskInput {
  @Field()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  completed?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  priority?: Priority;

  @Field({ nullable: true })
  @IsOptional()
  dueDate?: Date;
}
