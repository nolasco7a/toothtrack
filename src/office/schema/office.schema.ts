import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  phone_number: number;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  created_by: string;

  @Prop()
  updated_by: string;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
