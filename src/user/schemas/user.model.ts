import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;
  @Prop()
  lastName: string;
  @Prop()
  address: string;
  @Prop()
  picture: string;
  @Prop()
  password: string;
  @Prop()
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
