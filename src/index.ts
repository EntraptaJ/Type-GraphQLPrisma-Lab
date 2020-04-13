// src/index.ts
import fastify from 'fastify';
import 'reflect-metadata';
import { createApolloServer } from './Library/Apollo';
import { loadModules } from './Library/ModuleLoader';

const [modules] = await Promise.all([loadModules()]);

const webServer = fastify();
const apiServer = await createApolloServer(modules.gqlSchema);

webServer.register(apiServer.createHandler());

await webServer.listen(1232, '0.0.0.0');

console.log('Listening');

export {};
