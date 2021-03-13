import { Test, TestingModule } from '@nestjs/testing';
import { RealtyController } from './realty.controller';

describe('RealtyController', () => {
  let controller: RealtyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RealtyController],
    }).compile();

    controller = module.get<RealtyController>(RealtyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
