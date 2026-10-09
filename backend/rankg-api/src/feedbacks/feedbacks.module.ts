import { Module } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { FeedbacksController } from './controllers/feedbacks.controller.js';
import { FeedbacksService } from './services/feedbacks.service.js';

const prismaProvider = {
  provide: PrismaClient,
  useFactory: () => {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL must be defined');
    }

    const adapter = new PrismaPg({ connectionString });
    return new PrismaClient({ adapter });
  },
};

@Module({
  controllers: [FeedbacksController],
  providers: [FeedbacksService, prismaProvider],
})
export class FeedbacksModule {}
