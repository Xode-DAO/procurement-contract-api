import { Module } from '@nestjs/common';
import { TemplateSignatoriesService } from './template-signatories.service';
import { TemplateSignatoriesController } from './template-signatories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TemplateSignatory, TemplateSignatorySchema } from './entities/template-signatory.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: TemplateSignatory.name, schema: TemplateSignatorySchema }])],
  controllers: [TemplateSignatoriesController],
  providers: [TemplateSignatoriesService],
})
export class TemplateSignatoriesModule {}
