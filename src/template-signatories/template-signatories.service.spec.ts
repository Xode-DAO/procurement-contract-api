import { Test, TestingModule } from '@nestjs/testing';
import { TemplateSignatoriesService } from './template-signatories.service';

describe('TemplateSignatoriesService', () => {
  let service: TemplateSignatoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TemplateSignatoriesService],
    }).compile();

    service = module.get<TemplateSignatoriesService>(TemplateSignatoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
