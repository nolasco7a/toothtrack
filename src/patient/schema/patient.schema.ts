import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMoongose } from 'mongoose';

export type PatientDocument = HydratedDocument<Patient>;

@Schema()
export class Patient {
  _id: string;

  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop()
  gender: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: number;

  @Prop()
  address: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  created_by: string;

  @Prop()
  updated_by: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);
