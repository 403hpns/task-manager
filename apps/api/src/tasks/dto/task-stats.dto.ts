import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskStats {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  open: number;

  @Field(() => Int)
  closed: number;
}
