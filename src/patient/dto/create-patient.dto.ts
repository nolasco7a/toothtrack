export class CreatePatientDto {
  name: string;
  age: number;
  gender: string;
  email: string;
  phone_number: number;
  address: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;

  // define default values
  constructor(partial: Partial<CreatePatientDto>) {
    Object.assign(this, partial);
    this.name = this.name || '';
    this.age = this.age || 0;
    this.gender = this.gender || '';
    this.email = this.email || '';
    this.phone_number = this.phone_number || 0;
    this.address = this.address || '';
    this.created_at = new Date();
    this.updated_at = this.updated_at || null;
    this.created_by = this.created_by || '';
    this.updated_by = this.updated_by || '';
  }
}
