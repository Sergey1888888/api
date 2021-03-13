import { Test, TestingModule } from '@nestjs/testing';
import { RealtyService } from './realty.service';

describe('RealtyService', () => {
  let service: RealtyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RealtyService],
    }).compile();

    service = module.get<RealtyService>(RealtyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
