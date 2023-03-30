import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateAppointmentByWebsiteDto } from './dto/create-appointment-by-website.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentDocument } from './schema/appointments.schema';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {}

  async validatePatient(
    email: string,
    phone_number: number,
  ): Promise<Patient | undefined> {
    const patient = await this.patientModel.findOne({
      $or: [{ email }, { phone_number }],
    });
    if (patient) {
      return patient;
    }
    return null;
  }

  async createPatient(data: object): Promise<Patient | undefined> {
    const createPatient = await new this.patientModel({
      email: data['email'] ? data['email'] : null,
      name: data['name'],
      phone_number: data['phone_number'],
    });
    return createPatient.save();
  }

  async createByWebSite(
    createAppointmentByWebsiteDto: CreateAppointmentByWebsiteDto,
  ): Promise<Appointment> {
    try {
      const { email, phone_number } = createAppointmentByWebsiteDto;
      const patient = await this.validatePatient(email, phone_number);
      if (patient) {
        const createAppointment = await new this.appointmentModel(
          createAppointmentByWebsiteDto,
        );
        createAppointment.patient = patient._id;

        return createAppointment.save();
      } else {
        const createPatient = await this.createPatient(
          createAppointmentByWebsiteDto,
        );

        const createAppointment = await new this.appointmentModel(
          createAppointmentByWebsiteDto,
        );

        createAppointment.patient = createPatient._id;

        return createAppointment.save();
      }
    } catch (error) {
      return error;
    }
  }

  async create(
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment> {
    try {
      const { email, phone_number } = createAppointmentDto;
      const patient = await this.validatePatient(email, phone_number);
      if (patient) {
        const createAppointment = await new this.appointmentModel(
          createAppointmentDto,
        );
        createAppointment.patient = patient._id;

        return createAppointment.save();
      } else {
        const createPatient = await this.createPatient(createAppointmentDto);

        const createAppointment = await new this.appointmentModel(
          createAppointmentDto,
        );

        createAppointment.patient = createPatient._id;

        return createAppointment.save();
      }
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const appointments = await this.appointmentModel
        .find({})
        .populate('patient')
        .populate({ path: 'dentist', select: '-password' })
        .exec();
      return appointments;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const appointment = await this.appointmentModel
        .findById({ _id: id })
        .populate('patient')
        .populate({ path: 'dentist', select: '-password' })
        .exec();
      return appointment;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    try {
      const updateAppointment = await this.appointmentModel.findByIdAndUpdate(
        id,
        updateAppointmentDto,
        { new: true },
      );
      return updateAppointment;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const removedAppointment = await this.appointmentModel.deleteOne({
        _id: id,
      });
      return removedAppointment;
    } catch (error) {
      return error;
    }
  }
}
