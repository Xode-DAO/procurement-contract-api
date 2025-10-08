import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  async authenticate(
    access_key: string,
    secret_key: string,
  ): Promise<{ success: boolean; data: { access_token: string } }> {
    if (access_key !== process.env.API_ACCESS_KEY) {
      throw new UnauthorizedException('Invalid access key');
    }

    if (secret_key !== process.env.API_SECRET_KEY) {
      throw new UnauthorizedException('Invalid secret key');
    }

    const payload = { access_key };

    const access_token = await this.jwtService.signAsync(payload, {
      secret: secret_key,
      expiresIn: '24h',
    });

    return {
      success: true,
      data: { access_token },
    };
  }
}
