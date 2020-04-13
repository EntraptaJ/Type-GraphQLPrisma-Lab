// src/Modules/Users/UserResolver.ts
import { Ctx, Query, Resolver } from 'type-graphql';
import { User } from '../../Library/Prisma/TypeGQL';
import type { Context } from '../../Library/Context';

@Resolver(() => User)
export class CustomUserResolver {
  @Query({
    complexity: 0,
  })
  helloWorld(): string {
    return 'helloWorld';
  }

  @Query(() => User)
  async me(@Ctx() { user }: Context): Promise<User> {
    if (!user) throw new Error('Not signed in');

    return user;
  }
}
