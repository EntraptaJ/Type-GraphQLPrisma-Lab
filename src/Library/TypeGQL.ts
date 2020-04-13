// src/Library/TypeGQL.ts
import { buildSchema } from 'type-graphql';
import { NonEmptyArray } from 'type-graphql/dist/utils/types';
import * as TypeGQLPrisma from './Prisma/TypeGQL/index';

const resolverTest = /.*Resolver$/g;

export async function buildGQLSchema(
  resolvers: Function[],
): Promise<import('graphql').GraphQLSchema> {
  const prismaResolvers: Function[] = [];

  for (const moduleExport in TypeGQLPrisma) {
    if (resolverTest.test(moduleExport)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore
      prismaResolvers.push(TypeGQLPrisma[moduleExport]);
    }
  }

  return buildSchema({
    resolvers: [...resolvers, ...prismaResolvers] as NonEmptyArray<Function>,
    validate: false,
  });
}
