// src/Library/TypeGQL.ts
import { buildSchema } from 'type-graphql';
import { NonEmptyArray } from 'type-graphql/dist/utils/types';
import {
  UserCrudResolver,
  UserRelationsResolver,
} from './Prisma/TypeGQL/index';

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
