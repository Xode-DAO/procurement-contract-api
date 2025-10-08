import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Contract, ContractDocument } from './entities/contract.entity';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';

@Injectable()
export class ContractService {
  constructor(
    @InjectModel(Contract.name) private contractModel: Model<ContractDocument>,
  ) {}

  async create(createContractDto: CreateContractDto): Promise<Contract> {
    const contract = new this.contractModel(createContractDto);
    return contract.save();
  }

  async findAll(): Promise<Contract[]> {
    return this.contractModel.find().exec();
  }

  async findOne(id: string): Promise<Contract> {
    const contract = await this.contractModel.findById(id).exec();
    if (!contract) throw new NotFoundException(`Contract #${id} not found`);
    return contract;
  }

  async update(id: string, updateContractDto: UpdateContractDto): Promise<Contract> {
    const updated = await this.contractModel
      .findByIdAndUpdate(id, updateContractDto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException(`Contract #${id} not found`);
    return updated;
  }

  async remove(id: string): Promise<{ deleted: boolean }> {
    const res = await this.contractModel.findByIdAndDelete(id).exec();
    return { deleted: !!res };
  }
}
