import { Module } from '@nestjs/common';
import { FeedbacksModule } from './feedbacks/feedbacks.module.js';

@Module({
  imports: [FeedbacksModule],
})
export class AppModule {}
