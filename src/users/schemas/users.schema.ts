import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop({ String, required: true })
  name: string;
  @Prop({ String, required: true })
  surname: string;
  @Prop({ String, required: true })
  patronymic: string;
  @Prop({ String, required: false, default: null })
  avatar: string;
  @Prop({ String, required: true })
  phoneNumber: string;
  @Prop({ String, required: true })
  email: string;
  @Prop({ String, required: true })
  password: string;
  @Prop({ String, required: false })
  telegram: string;
  @Prop({ String, required: false })
  vk: string;
  @Prop({ String, required: false })
  whatsup: string;
  @Prop({ Boolean, required: false, default: false })
  isAdmin: boolean;
}

export const UsersSchema = SchemaFactory.createForClass(Users);
