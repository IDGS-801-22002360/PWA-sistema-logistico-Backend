import { Test, TestingModule } from '@nestjs/testing';
import { MovilService } from './movil.service';

describe('MovilService', () => {
  let service: MovilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MovilService],
    }).compile();

    service = module.get<MovilService>(MovilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
