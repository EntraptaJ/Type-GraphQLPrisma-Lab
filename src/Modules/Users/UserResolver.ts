// src/Modules/Users/UserResolver.ts
import { Resolver, Ctx, Mutation, Arg, Query } from 'type-graphql';
import { User } from '../../Library/Prisma/TypeGQL';
import { RegisterInput, UserInput } from './UserInput';
import { sign } from 'jsonwebtoken';

type Context = import('../../Library/Context').Context;

@Resolver()
export class CustomUserResolver {
  @Query()
  helloWorld(): string {
    return 'helloWorld';
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Ctx() { prisma }: Context,
    @Arg('input') input: RegisterInput,
  ): Promise<User | null> {
    const newUser = await prisma.user.create({
      data: input,
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
    if (!user) throw new Error('Invalid email or password');

    // TODO: CRYPTO AND SIGN AND SALT PASSWORDS
    if (user.password !== password) throw new Error('Invalid password');

    return sign(
      {
        userId: user.id,
      },
      'IM_SECRET',
    );
  }
}
