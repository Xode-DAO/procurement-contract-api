import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateTemplateDto {
  @ApiProperty({ example: 'Invoice Template', description: 'Name of the template' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
