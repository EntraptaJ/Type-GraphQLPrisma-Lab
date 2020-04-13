// src/Modules/Auth/AuthInput.ts
import { Field, InputType } from 'type-graphql';
import { User } from '../../Library/Prisma/TypeGQL';

@InputType()
export class LoginInput implements Partial<User> {
  @Field()
  email: string;

  @Field()
  password: string;
}

@InputType()
export class RegisterInput extends LoginInput implements Partial<User> {
  @Field()
  name: string;
}
