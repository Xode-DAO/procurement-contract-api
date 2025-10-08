import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { TemplateSignatoriesService } from './template-signatories.service';
import { CreateTemplateSignatoryDto } from './dto/create-template-signatory.dto';
import { UpdateTemplateSignatoryDto } from './dto/update-template-signatory.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TemplateSignatory } from './entities/template-signatory.entity';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('template-signatories')
@Controller('template-signatories')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TemplateSignatoriesController {
  constructor(private readonly service: TemplateSignatoriesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new template signatory' })
  @ApiResponse({ status: 201, description: 'Template signatory created', type: TemplateSignatory })
  create(@Body() createDto: CreateTemplateSignatoryDto) {
    return this.service.create(createDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all template signatories' })
  @ApiResponse({ status: 200, description: 'Return all signatories', type: [TemplateSignatory] })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a template signatory by ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a template signatory by ID' })
  update(@Param('id') id: string, @Body() updateDto: UpdateTemplateSignatoryDto) {
    return this.service.update(id, updateDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a template signatory by ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
