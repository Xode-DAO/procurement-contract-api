import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsMongoId } from 'class-validator';

export class CreateTemplateSignatoryDto {
  @ApiProperty({ example: '652b8d4a4c1fcd9d2ef8a223', description: 'Template ObjectId' })
  @IsMongoId()
  @IsNotEmpty()
  templateId: string;

  @ApiProperty({ example: '652b8d4a4c1fcd9d2ef8b334', description: 'User ObjectId' })
  @IsMongoId()
  @IsNotEmpty()
  userId: string;
}
