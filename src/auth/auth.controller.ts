import { Controller, Post, Body, UnauthorizedException, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthKeysDto } from './dto/create-auth.dto';


@ApiTags('Authentication')
@Controller('authenticate')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @ApiBody({ type: AuthKeysDto, description: 'Access and Secret Keys' })
  @ApiResponse({
    status: 201,
    description: 'Token generated successfully',
    schema: {
      example: {
        success: true,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Invalid credentials',
    schema: {
      example: {
        statusCode: 401,
        message: 'Invalid credentials',
        error: 'Unauthorized',
      },
    },
  })
  async authenticate(@Body() credentials: AuthKeysDto) {
    try {
      const { data } = await this.authService.authenticate(
        credentials.access_key,
        credentials.secret_key,
      );
      return {
        success: true,
        token: data.access_token,  // combined token
      };
    } catch (error) {
      throw new UnauthorizedException('Authentication failed');
    }
  }
}
