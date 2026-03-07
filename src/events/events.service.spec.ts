import { Test, TestingModule } from '@nestjs/testing';
import { eventsService } from './events.service';

describe('eventsService', () => {
  let service: eventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [eventsService],
    }).compile();

    service = module.get<eventsService>(eventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
