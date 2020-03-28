// src/Modules/Users/UserResolver.ts
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { createUserToken } from '../../Library/Crypto';
import { User } from '../../Library/Prisma/TypeGQL';
import { RegisterInput, UserInput } from './UserInput';

type Context = import('../../Library/Context').Context;

@Resolver()
export class CustomUserResolver {
  @Query({
    complexity: 0,
  })
  helloWorld(): string {
    return 'helloWorld';
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Ctx() { prisma }: Context,
    @Arg('input') data: RegisterInput,
  ): Promise<User | null> {
    const newUser = await prisma.user.create({
      data,
    });

    return newUser;
  }

  @Query(() => User)
  async me(@Ctx() { user }: Context): Promise<User> {
    if (!user) throw new Error('Not signed in');

    return user;
  }

  @Mutation(() => String)
  async login(
    @Ctx() { prisma }: Context,
    @Arg('input') { email, password }: UserInput,
  ): Promise<string> {
    const user = await prisma.user.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error('INVALID_EMAIl');

    // TODO: CRYPTO AND SIGN AND SALT PASSWORDS
    if (user.password !== password) throw new Error('INVALID_PASSWORD');

    return createUserToken(user);
  }
}
