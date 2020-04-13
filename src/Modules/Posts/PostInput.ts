// src/Modules/Posts/PostInput.ts
import { Field, InputType } from 'type-graphql';
import { Post } from '@prisma/client';

@InputType()
export class PostInput implements Partial<Post> {
  @Field()
  title: string;
}
