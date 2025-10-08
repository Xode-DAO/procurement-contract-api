import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'john', description: 'Unique username of the user' })
  @IsString()
  userName: string;

   @ApiProperty({ example: 'john_doe', description: 'Full Name of the user' })
  @IsString()
  fullName: string;

  @ApiProperty({ example: 'Developer', description: 'Position of the user' })
  @IsString()
  position: string;

  @ApiProperty({ example: 'password123', description: 'Password of the user (min 6 characters)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'john@example.com', description: 'Email of the user' })
  @IsEmail()
  email: string;
}
