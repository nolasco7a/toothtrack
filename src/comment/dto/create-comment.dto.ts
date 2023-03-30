import { IsNotEmpty, IsString } from 'class-validator';
import { status_comment } from 'src/types/enums';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  author: string; // referencia to author

  @ApiProperty()
  content: string;

  @ApiProperty()
  status: status_comment; //crear el type del estatus

  @ApiProperty()
  @IsNotEmpty()
  created_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  created_by: string;
}
