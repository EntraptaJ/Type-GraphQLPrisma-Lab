// src/Modules/Posts/PostResolver.ts
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import { Post, User } from '../../Library/Prisma/TypeGQL';
import type { Context } from '../../Library/Context';
import { PostInput } from './PostInput';

@Resolver(() => Post)
export class PostResolver {
  @Mutation(() => User)
  async createPost(
    @Ctx() { prisma, user }: Context,
    @Arg('input') postInput: PostInput,
  ): Promise<User> {
    if (!user) throw new Error('NOT LOGGED_IN');

    const post = await prisma.post.create({
      data: {
        author: {
          connect: {
            id: user.id,
          },
        },
        ...postInput,
      },
    });
    console.log(post);

    return user;
  }
}
