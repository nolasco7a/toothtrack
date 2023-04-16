import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppointmentModule } from './appointment/appointment.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PatientModule } from './patient/patient.module';
import { CommentModule } from './comment/comment.module';
import { OfficeModule } from './office/office.module';
import { RoleModule } from './role/role.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      ,
    ),
    AppointmentModule,
    UserModule,
    AuthModule,
    PatientModule,
    CommentModule,
    OfficeModule,
    RoleModule,
    CommentModule,
    PatientModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
