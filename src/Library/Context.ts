// src/Library/Context.ts
import { PrismaClient } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { getUserFromToken } from './Crypto';
import { prisma } from './Prisma';
import { User } from './Prisma/TypeGQL';

interface BaseContext {
  prisma: PrismaClient;
}

interface AuthContext extends BaseContext {
  user?: User;
}

export type Context = AuthContext;

export async function getContext(request: FastifyRequest): Promise<Context> {
  const context: Partial<Context> = { prisma };

  try {
    const authHeader = request.headers.authorization as string | undefined;
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];

      const user = await getUserFromToken(token);
      if (user) context.user = user;
    }
  } catch {}

  return context as Context;
}
