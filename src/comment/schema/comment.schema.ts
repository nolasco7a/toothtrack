import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Schema as schemaMongoose } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment {
  @Prop({ type: schemaMongoose.Types.ObjectId, ref: 'Patient' })
  author: string;

  @Prop()
  content: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  created_by: string;

  @Prop()
  updated_by: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
