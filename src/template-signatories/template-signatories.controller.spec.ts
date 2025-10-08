import { Test, TestingModule } from '@nestjs/testing';
import { TemplateSignatoriesController } from './template-signatories.controller';
import { TemplateSignatoriesService } from './template-signatories.service';

describe('TemplateSignatoriesController', () => {
  let controller: TemplateSignatoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TemplateSignatoriesController],
      providers: [TemplateSignatoriesService],
    }).compile();

    controller = module.get<TemplateSignatoriesController>(TemplateSignatoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
