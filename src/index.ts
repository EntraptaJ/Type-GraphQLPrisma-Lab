// src/index.ts
import { ApolloServer } from 'apollo-server-fastify';
import fastify from 'fastify';
import 'reflect-metadata';
import { getContext } from './Library/Context';
import { loadModules } from './Library/ModuleLoader';

const [{ gqlSchema }] = await Promise.all([loadModules()]);

const webServer = fastify();
const apiServer = new ApolloServer({
  schema: gqlSchema,
  context: getContext,
});

webServer.register(apiServer.createHandler());

await webServer.listen(1232, '0.0.0.0');

console.log('Listening');

export {};
