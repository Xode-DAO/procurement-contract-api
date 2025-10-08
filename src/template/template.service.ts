import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Template, TemplateDocument } from './entities/template.entity';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';

@Injectable()
export class TemplateService {
  constructor(@InjectModel(Template.name) private templateModel: Model<TemplateDocument>) {}

  async create(createTemplateDto: CreateTemplateDto & { template: Buffer }): Promise<Template> {
    const created = new this.templateModel(createTemplateDto);
    return created.save();
  }

  async findAll(): Promise<Template[]> {
    return this.templateModel.find().exec();
  }

  async findOne(id: string): Promise<Template> {
    const template = await this.templateModel.findById(id).exec();
    if (!template) throw new NotFoundException(`Template #${id} not found`);
    return template;
  }

  async update(id: string, updateTemplateDto: UpdateTemplateDto & { template?: Buffer }): Promise<Template> {
    const updated = await this.templateModel.findByIdAndUpdate(id, updateTemplateDto, { new: true });
    if (!updated) throw new NotFoundException(`Template #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.templateModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException(`Template #${id} not found`);
  }
}
