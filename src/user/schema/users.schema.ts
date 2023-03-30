import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  image: string;

  @Prop()
  phone_number: number;

  @Prop()
  especialization: string;

  @Prop()
  license_number: string;

  @Prop()
  languages: string[];

  @Prop()
  treatments: string; // TODO: hacer la relacion para los tratamientos ofrecidos

  @Prop()
  comments_valorations: string; // TODO: hacer la relacion para comentarios y valoraciones
}

export const UserSchema = SchemaFactory.createForClass(User);
