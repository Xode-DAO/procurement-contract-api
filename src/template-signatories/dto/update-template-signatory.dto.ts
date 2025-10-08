import { PartialType } from '@nestjs/swagger';
import { CreateTemplateSignatoryDto } from './create-template-signatory.dto';

export class UpdateTemplateSignatoryDto extends PartialType(CreateTemplateSignatoryDto) {}
