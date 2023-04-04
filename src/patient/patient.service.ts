import { Injectable, HttpException } from '@nestjs/common';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { PatientDocument, Patient } from './schema/patient.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<CreatePatientDto>,
  ) {}

  public async validatePatient(
    email: string,
    phone_number: number,
  ): Promise<Patient | any> {
    const patient = await this.patientModel.findOne({
      $or: [
        { email: email ? email : '' },
        { phone_number: phone_number ? phone_number : '' },
      ],
    });
    if (patient) {
      return patient;
    }
    return null;
  }

  async create(createPatientDto: CreatePatientDto) {
    const { email, phone_number, name } = createPatientDto;
    try {
      const validatePatient = await this.validatePatient(email, phone_number);
      if (validatePatient === null) {
        const createPatient = await new this.patientModel({
          name: name ? name : null,
          email: email ? email : null,
          phone_number: phone_number ? phone_number : null,
        });
        return createPatient.save();
      } else {
        throw new HttpException(
          'Patient with this email or phone number already exists',
          409,
        );
      }
    } catch (error) {
      return error;
    }
  }

  async findAll() {
    try {
      const patients = await this.patientModel.find();
      return patients;
    } catch (error) {
      return error;
    }
  }

  async findOne(id: string) {
    try {
      const patient = await this.patientModel.findById(id);
      return patient;
    } catch (error) {
      return error;
    }
  }

  async update(id: string, updatePatientDto: any) {
    try {
      const updatedPatient = await this.patientModel.findByIdAndUpdate(
        id,
        updatePatientDto,
        { new: true },
      );
      return updatedPatient;
    } catch (error) {
      return error;
    }
  }

  async remove(id: string) {
    try {
      const deletedPatient = await this.patientModel.deleteOne({ _id: id });
      return deletedPatient;
    } catch (error) {
      return error;
    }
  }
}
