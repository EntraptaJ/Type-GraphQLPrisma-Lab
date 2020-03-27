// src/Library/Context.ts
import { PrismaClient } from '@prisma/client';

export interface Context {
  prisma: PrismaClient;
}

const prisma = new PrismaClient();

export async function getContext(): Promise<Context> {
  return {
    prisma,
  };
}
