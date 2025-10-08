import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'yourSecretKey',
      signOptions: { expiresIn: '24h' },
    }),
    HttpModule, // For external API requests
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],

})
export class AuthModule {}
