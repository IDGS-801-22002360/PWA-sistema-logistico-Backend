import { Test, TestingModule } from '@nestjs/testing';
import { LocalizacionController } from './localizacion.controller';

describe('LocalizacionController', () => {
  let controller: LocalizacionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocalizacionController],
    }).compile();

    controller = module.get<LocalizacionController>(LocalizacionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
