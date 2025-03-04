import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

@ObjectType()
export class Task {
  @Field()
  @IsString()
  @MinLength(3)
  title: string;

  @Field()
  @IsString()
  @IsOptional()
  description?: string;

  @Field()
  @IsBoolean()
  completed?: boolean;
}
