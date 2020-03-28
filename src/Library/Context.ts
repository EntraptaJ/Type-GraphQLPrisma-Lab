// src/Library/Context.ts
import { PrismaClient, User } from '@prisma/client';
import { FastifyRequest } from 'fastify';
import { verify } from 'jsonwebtoken';

export interface Context {
  prisma: PrismaClient;

  user: User;
}

const prisma = new PrismaClient();

export async function getContext(request: FastifyRequest): Promise<Context> {
  let context: Partial<Context> = { prisma };

  try {
    const authHeader = request.headers.authorization as string | undefined;
    if (authHeader) {
      const token = authHeader.split('Bearer ')[1];

      const tokenData = verify(token, 'IM_SECRET') as { userId: string };

      const user = await prisma.user.findOne({
        where: {
          id: tokenData.userId,
        },
      });
      if (user) context.user = user;
    }
  } catch {}

  return context as Context;
}
