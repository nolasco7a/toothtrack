import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { status_comment } from 'src/types/enums';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto extends PartialType(CreateCommentDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string; // referencia to author

  @ApiProperty()
  @IsNotEmpty()
  content: string;

  @ApiProperty()
  @IsNotEmpty()
  status: status_comment; //crear el type del estatus

  @ApiProperty()
  @IsNotEmpty()
  updated_at: Date;

  @ApiProperty()
  @IsNotEmpty()
  updated_by: string;
}
