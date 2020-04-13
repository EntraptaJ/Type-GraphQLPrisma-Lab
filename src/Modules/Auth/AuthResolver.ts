// src/Modules/Auth/AuthResolver.ts
import { Arg, Ctx, Mutation, Resolver } from 'type-graphql';
import type { Context } from '../../Library/Context';
import {
  comparePassword,
  createUserToken,
  hashPassword,
} from '../../Library/Crypto';
import { User } from '../../Library/Prisma/TypeGQL';
import { LoginInput, RegisterInput } from './AuthInput';

@Resolver()
export class AuthResolver {
  @Mutation(() => String)
  async login(
    @Ctx() { prisma }: Context,
    @Arg('input', () => LoginInput) { email, password }: LoginInput,
  ): Promise<string> {
    const user = await prisma.user.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new Error('INVALID_EMAIl');

    const passwordMatched = await comparePassword(password, user.password);
    if (passwordMatched !== true) throw new Error('INVALID_PASSWORD');

    return createUserToken(user);
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
}
