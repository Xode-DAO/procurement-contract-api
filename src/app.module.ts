import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateModule } from './template/template.module';
import { TemplateSignatoriesModule } from './template-signatories/template-signatories.module';
import { ContractModule } from './contract/contract.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    UserModule,
    TemplateModule,
    TemplateSignatoriesModule,
    ContractModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
