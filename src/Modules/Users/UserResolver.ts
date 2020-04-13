// src/Modules/Users/UserResolver.ts
import { Arg, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import {
  createUserToken,
  hashPassword,
  comparePassword,
} from '../../Library/Crypto';
import { User } from '../../Library/Prisma/TypeGQL';
import { RegisterInput, UserInput } from './UserInput';

type Context = import('../../Library/Context').Context;

@Resolver(() => User)
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
    @Arg('input') { password, ...input }: RegisterInput,
  ): Promise<User | null> {
    const newUser = await prisma.user.create({
      data: {
        ...input,
        password: await hashPassword(password),
      },
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

    const passwordMatched = await comparePassword(password, user.password);
    // TODO: CRYPTO AND SIGN AND SALT PASSWORDS
    if (passwordMatched !== true) throw new Error('INVALID_PASSWORD');

    return createUserToken(user);
  }
}
