import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as SchemaMoongose } from 'mongoose';
import { Patient } from 'src/patient/schema/patient.schema';
import { User } from 'src/user/schema/users.schema';

export type AppointmentDocument = HydratedDocument<Appointment>;

@Schema()
export class Appointment {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  phone_number: number;

  // fecha y/o hora de predeferencia del usuario
  @Prop()
  date: Date;

  @Prop()
  hour: string;

  // description
  @Prop()
  consulting_reason: string;

  // code provider to user to manage appointment
  @Prop()
  code: string;

  @Prop()
  status: string;

  // reference relation with dentist
  @Prop({ type: SchemaMoongose.Types.ObjectId, ref: 'User' })
  dentist: string;

  // reference relation with patient
  @Prop({ type: SchemaMoongose.Types.ObjectId, ref: 'Patient' })
  patient: string;

  @Prop()
  created_at: Date;

  @Prop()
  updated_at: Date;

  @Prop()
  created_by: string;

  @Prop()
  updated_by: string;
}

export const AppointmentSchema = SchemaFactory.createForClass(Appointment);
