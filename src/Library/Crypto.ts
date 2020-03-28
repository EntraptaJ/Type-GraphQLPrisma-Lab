// src/Library/Crypto.ts
import { sign, verify } from 'jsonwebtoken';
import { prisma } from './Prisma';
import { User } from './Prisma/TypeGQL';

const secretKey = 'I_AM_SECRET';

interface TokenPayload {
  userId: string;
}

export async function hashPassword(): Promise<string> {
  return 'PASSWORD';
}

export async function createUserToken(user: User): Promise<string> {
  const tokenPayload: TokenPayload = {
    userId: user.id,
  };

  return sign(tokenPayload, secretKey);
}

export async function getUserFromToken(token: string): Promise<User | null> {
  const tokenPayload = verify(token, secretKey) as TokenPayload;

  return prisma.user.findOne({
    where: {
      id: tokenPayload.userId,
    },
  });
}
