import { Arg, Args, ArgsType, Ctx, Field, FieldResolver, Float, ID, InputType, Int, Mutation, ObjectType, Query, Resolver, Root, registerEnumType } from "type-graphql";

@InputType({
  isAbstract: true,
  description: undefined,
})
export class PostUpdateManyDataInput {
  @Field(_type => Int, {
    nullable: true,
    description: undefined
  })
  id?: number | null;

  @Field(_type => Date, {
    nullable: true,
    description: undefined
  })
  createdAt?: Date | null;

  @Field(_type => Date, {
    nullable: true,
    description: undefined
  })
  updatedAt?: Date | null;

  @Field(_type => String, {
    nullable: true,
    description: undefined
  })
  title?: string | null;

  @Field(_type => Boolean, {
    nullable: true,
    description: undefined
  })
  published?: boolean | null;
}
