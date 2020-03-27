// src/Library/TypeGQL.ts
import {
  UserRelationsResolver,
  UserCrudResolver,
} from './Prisma/TypeGQL/index';
import { buildSchema } from 'type-graphql';
import { NonEmptyArray } from 'type-graphql/dist/utils/types';

export async function buildGQLSchema(
  resolvers: Function[],
): Promise<import('graphql').GraphQLSchema> {
  return buildSchema({
    resolvers: [
      ...resolvers,
      UserRelationsResolver,
      UserCrudResolver,
    ] as NonEmptyArray<Function>,
    validate: false,
  });
}
