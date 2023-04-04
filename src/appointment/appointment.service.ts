import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { CreateAppointmentByWebsiteDto } from './dto/create-appointment-by-website.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment, AppointmentDocument } from './schema/appointments.schema';
import { Patient, PatientDocument } from 'src/patient/schema/patient.schema';
import { PatientService } from 'src/patient/patient.service';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectModel(Appointment.name)
    private appointmentModel: Model<AppointmentDocument>,
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
    private readonly patientService: PatientService,
  ) {}

  async createPatient(data: object): Promise<Patient | any> {
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
      const patient = await this.patientService.validatePatient(
        email,
        phone_number,
      );
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
      const patient = await this.patientService.validatePatient(
        email,
        phone_number,
      );
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

  async findByPatient(id: string) {
    try {
      const appointmentsByPatient = await this.appointmentModel
        .find({ patient: id })
        .exec();

      return appointmentsByPatient;
    } catch (error) {
      return error;
    }
  }

  async findByDentist(id: string) {
    try {
      const appointmentsByDentist = await this.appointmentModel
        .find({ dentist: id })
        .exec();

      return appointmentsByDentist;
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
