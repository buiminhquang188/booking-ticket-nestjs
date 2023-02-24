import { Test, TestingModule } from '@nestjs/testing';
import { CineplexService } from './cineplex.service';

describe('CineplexService', () => {
  let service: CineplexService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CineplexService],
    }).compile();

    service = module.get<CineplexService>(CineplexService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
