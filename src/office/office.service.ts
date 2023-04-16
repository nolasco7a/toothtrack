import { Injectable } from '@nestjs/common';
import { CreateOfficeDto } from './dto/create-office.dto';
import { UpdateOfficeDto } from './dto/update-office.dto';
import { Office, OfficeDocument } from './schema/office.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OfficeService {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<OfficeDocument>,
  ) {}

  async create(createOfficeDto: CreateOfficeDto): Promise<Office> {
    const createOffice = await new this.officeModel(createOfficeDto);
    return createOffice.save();
  }

  async findAll(): Promise<Office[]> {
    const offices = await this.officeModel.find();
    return offices;
  }

  async findOne(id: number): Promise<Office> {
    const office = await this.officeModel.findById(id);
    return office;
  }

  async update(id: number, updateOfficeDto: UpdateOfficeDto): Promise<Office> {
    const office = await this.officeModel.findByIdAndUpdate(
      id,
      updateOfficeDto,
    );
    return office;
  }

  async remove(id: number) {
    const office = await this.officeModel.findByIdAndDelete(id);
    return office;
  }
}
