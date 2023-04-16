import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Address } from '../entities/address.entity';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop()
  name: string;

  @Prop()
  address: Address;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
