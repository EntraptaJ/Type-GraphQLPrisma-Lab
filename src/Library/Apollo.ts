// src/Library/Apollo.ts
import { ApolloServer } from 'apollo-server-fastify';
import type { GraphQLSchema } from 'graphql';
import { getContext } from './Context';

export async function createApolloServer(
  schema: GraphQLSchema,
): Promise<ApolloServer> {
  const apiServer = new ApolloServer({
    schema,
    context: getContext,
  });

  return apiServer;
}
