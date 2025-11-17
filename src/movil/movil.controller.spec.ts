import { Test, TestingModule } from '@nestjs/testing';
import { MovilController } from './movil.controller';

describe('MovilController', () => {
  let controller: MovilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovilController],
    }).compile();

    controller = module.get<MovilController>(MovilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
