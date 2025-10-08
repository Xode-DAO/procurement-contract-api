import { Controller, Get, Post, Body, Patch, Param, Delete, UploadedFile, UseInterceptors, Res, UseGuards } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Template } from './entities/template.entity';
import type { Response } from 'express';
import type { Multer } from 'multer';
import { AuthGuard } from 'src/auth/auth.guard';

@ApiTags('templates')
@Controller('templates')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class TemplateController {
  constructor(private readonly templateService: TemplateService) { }

  @Post()
  @UseInterceptors(FileInterceptor('template'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Template upload',
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Invoice Template' },
        template: {
          type: 'string',
          format: 'binary', // tells Swagger it's a file
          description: 'Template file (binary)',
        },
      },
      required: ['name', 'template'],
    },
  })
  create(
    @Body() createTemplateDto: CreateTemplateDto,
    @UploadedFile() template: Multer.File,
  ) {
    return this.templateService.create({
      ...createTemplateDto,
      template: template.buffer, 
    });
  }



  @Get()
  @ApiOperation({ summary: 'Get all templates' })
  @ApiResponse({ status: 200, description: 'Return all templates', type: [Template] })
  findAll() {
    return this.templateService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Download template by ID' })
  @ApiResponse({ status: 200, description: 'Return the template file' })
  async download(@Param('id') id: string, @Res() res: Response) {
    const template = await this.templateService.findOne(id);
    res.set({
      'Content-Type': 'application/octet-stream',
      'Content-Disposition': `attachment; filename="${template.name}"`,
    });
    res.send(template.template);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('template'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'Update template', type: CreateTemplateDto })
  update(
    @Param('id') id: string,
    @Body() updateTemplateDto: UpdateTemplateDto,
    @UploadedFile() template: Multer.File
  ) {
    const payload: any = { ...updateTemplateDto };
    if (template) payload.template = template.buffer;
    return this.templateService.update(id, payload);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a template by ID' })
  @ApiResponse({ status: 200, description: 'The template has been deleted' })
  remove(@Param('id') id: string) {
    return this.templateService.remove(id);
  }
}
