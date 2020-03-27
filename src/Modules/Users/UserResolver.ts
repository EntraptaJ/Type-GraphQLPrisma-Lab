// src/Modules/Users/UserResolver.ts
import {
  Resolver,
  Ctx,
  Query,
  Mutation,
  Arg,
  InputType,
  Field,
} from 'type-graphql';
import { User } from '../../Library/Prisma/TypeGQL';

type Context = import('../../Library/Context').Context;

@InputType()
class RegisterInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;
}

@Resolver()
export class CustomUserResolver {
  @Query(() => User, { nullable: true })
  async bestUser(@Ctx() { prisma }: Context): Promise<User | null> {
    return prisma.user.findOne({
      where: { email: 'me@kristianjones.dev' },
    });
  }

  @Mutation(() => User, { nullable: true })
  async register(
    @Ctx() { prisma }: Context,
    @Arg('input') input: RegisterInput,
  ): Promise<User | null> {
    const newUser = await prisma.user.create({
      data: {
        ...input,
      },
    });

    return newUser;
  }
}
