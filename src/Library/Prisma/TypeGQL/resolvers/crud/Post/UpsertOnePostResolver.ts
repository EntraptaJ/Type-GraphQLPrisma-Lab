import { Arg, Args, ArgsType, Ctx, Field, FieldResolver, Float, ID, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, registerEnumType } from "type-graphql";
import { UpsertOnePostArgs } from "./args/UpsertOnePostArgs";
import { Post } from "../../../models/Post";

@Resolver(_of => Post)
export class UpsertOnePostResolver {
  @Mutation(_returns => Post, {
    nullable: false,
    description: undefined
  })
  async upsertOnePost(@Ctx() ctx: any, @Args() args: UpsertOnePostArgs): Promise<Post> {
    return ctx.prisma.post.upsert(args);
  }
}
