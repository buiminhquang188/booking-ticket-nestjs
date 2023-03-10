import { Test, TestingModule } from '@nestjs/testing';
import { CineplexController } from './cineplex.controller';

describe('CineplexController', () => {
  let controller: CineplexController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CineplexController],
    }).compile();

    controller = module.get<CineplexController>(CineplexController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
