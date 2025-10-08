import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ContractService } from './contract.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Contract } from './entities/contract.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('contracts')
@Controller('contract')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new contract' })
  @ApiResponse({ status: 201, description: 'Contract successfully created', type: Contract })
  @ApiBody({ type: CreateContractDto })
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractService.create(createContractDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all contracts' })
  @ApiResponse({ status: 200, description: 'List of contracts', type: [Contract] })
  findAll() {
    return this.contractService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a contract by ID' })
  @ApiParam({ name: 'id', description: 'Contract ObjectId' })
  @ApiResponse({ status: 200, description: 'Contract found', type: Contract })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  findOne(@Param('id') id: string) {
    return this.contractService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a contract by ID' })
  @ApiParam({ name: 'id', description: 'Contract ObjectId' })
  @ApiResponse({ status: 200, description: 'Contract updated', type: Contract })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  @ApiBody({ type: UpdateContractDto })
  update(@Param('id') id: string, @Body() updateContractDto: UpdateContractDto) {
    return this.contractService.update(id, updateContractDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a contract by ID' })
  @ApiParam({ name: 'id', description: 'Contract ObjectId' })
  @ApiResponse({ status: 200, description: 'Contract deleted' })
  @ApiResponse({ status: 404, description: 'Contract not found' })
  remove(@Param('id') id: string) {
    return this.contractService.remove(id);
  }
}
