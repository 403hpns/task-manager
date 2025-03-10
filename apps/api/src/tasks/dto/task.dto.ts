import { Field, ObjectType } from '@nestjs/graphql';
import {
  IsBoolean,
  IsDate,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

type Priority = 'low' | 'medium' | 'high';

@ObjectType()
export class Task {
  @Field()
  id: string;

  @Field()
  @IsString()
  @MinLength(3)
  title: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @Field()
  @IsString()
  @IsOptional()
  priority?: Priority;

  @Field({ nullable: true })
  @IsDate()
  @IsOptional()
  dueDate?: Date;
}
