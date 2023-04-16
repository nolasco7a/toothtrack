import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AppointmentService } from './appointment.service';
import { CreateAppointmentByWebsiteDto } from './dto/create-appointment-by-website.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@ApiBearerAuth()
@ApiTags('appointment')
@Controller('appointment')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post('create_initial_appointment')
  @UsePipes(new ValidationPipe({ transform: true }))
  createByWebsite(
    @Body() createAppointmentByWebsiteDto: CreateAppointmentByWebsiteDto,
  ) {
    return this.appointmentService.createByWebSite(
      createAppointmentByWebsiteDto,
    );
  }

  // all of them routes must be protected with auth method
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentService.create(createAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('patient/:id')
  findByPatient(@Param('id') id: string) {
    return this.appointmentService.findByPatient(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dentist/:id')
  findByDentist(@Param('id') id: string) {
    return this.appointmentService.findByDentist(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAppointmentDto: UpdateAppointmentDto,
  ) {
    return this.appointmentService.update(id, updateAppointmentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentService.remove(id);
  }
}
