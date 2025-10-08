import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthKeysDto {
  @ApiProperty({ example: 'your-access-key', description: 'Access key provided to the user' })
  @IsString()
  access_key: string;

  @ApiProperty({ example: 'your-secret-key', description: 'Secret key provided to the user' })
  @IsString()
  secret_key: string;
}
