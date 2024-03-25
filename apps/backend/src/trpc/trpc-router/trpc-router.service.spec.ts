import { Test, TestingModule } from '@nestjs/testing';
import { TrpcRouter } from './trpc-router.service';

describe('TrpcRouterService', () => {
  let service: TrpcRouter;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrpcRouter],
    }).compile();

    service = module.get<TrpcRouter>(TrpcRouter);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
