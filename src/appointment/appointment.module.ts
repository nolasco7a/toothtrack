import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppointmentService } from './appointment.service';
import { AppointmentController } from './appointment.controller';
import { Appointment, AppointmentSchema } from './schema/appointments.schema';
import { Patient, PatientSchema } from 'src/patient/schema/patient.schema';
import { PatientService } from 'src/patient/patient.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Appointment.name, schema: AppointmentSchema },
      { name: Patient.name, schema: PatientSchema },
    ]),
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService, PatientService],
})
export class AppointmentModule {}
