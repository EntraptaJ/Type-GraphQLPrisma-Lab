// src/Modules/Users/UserInput.ts
import { User } from '@prisma/client';
import { Field, InputType } from 'type-graphql';

@InputType()
export class RegisterInput implements Partial<User> {
  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class UserInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}
