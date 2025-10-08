import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TemplateSignatory, TemplateSignatoryDocument } from './entities/template-signatory.entity';
import { CreateTemplateSignatoryDto } from './dto/create-template-signatory.dto';
import { UpdateTemplateSignatoryDto } from './dto/update-template-signatory.dto';

@Injectable()
export class TemplateSignatoriesService {
  constructor(
    @InjectModel(TemplateSignatory.name)
    private readonly signatoryModel: Model<TemplateSignatoryDocument>,
  ) {}

  async create(createDto: CreateTemplateSignatoryDto): Promise<TemplateSignatory> {
    const created = new this.signatoryModel(createDto);
    return created.save();
  }

  async findAll(): Promise<TemplateSignatory[]> {
    return this.signatoryModel.find().exec(); 
  }

  async findOne(id: string): Promise<TemplateSignatory> {
    const signatory = await this.signatoryModel.findById(id).exec(); 
    if (!signatory) throw new NotFoundException(`TemplateSignatory #${id} not found`);
    return signatory;
  }

  async update(id: string, updateDto: UpdateTemplateSignatoryDto): Promise<TemplateSignatory> {
    const updated = await this.signatoryModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
    if (!updated) throw new NotFoundException(`TemplateSignatory #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<void> {
    const deleted = await this.signatoryModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException(`TemplateSignatory #${id} not found`);
  }
}
