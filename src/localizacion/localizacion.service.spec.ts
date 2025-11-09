import { Test, TestingModule } from '@nestjs/testing';
import { LocalizacionService } from './localizacion.service';

describe('LocalizacionService', () => {
  let service: LocalizacionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocalizacionService],
    }).compile();

    service = module.get<LocalizacionService>(LocalizacionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
