import { IsString, IsOptional } from 'class-validator';
import { Types } from 'mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateContractDto {
  @ApiProperty({ description: 'Contract name' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Description of the contract' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Type of the contract' })
  @IsString()
  type: string;

  @ApiProperty({ description: 'Template ObjectId', type: String })
  @IsString()
  template: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Template Information ObjectId', type: String })
  @IsString()
  @IsOptional()
  templateInformation?: Types.ObjectId;

  @ApiPropertyOptional({ description: 'Contract status (e.g., draft, active)' })
  @IsString()
  @IsOptional()
  status?: string;

  @ApiPropertyOptional({ description: 'Storage URL for the contract' })
  @IsString()
  @IsOptional()
  storageUrl?: string;

  @ApiPropertyOptional({ description: 'Transaction hash associated with contract' })
  @IsString()
  @IsOptional()
  txHash?: string;
}
