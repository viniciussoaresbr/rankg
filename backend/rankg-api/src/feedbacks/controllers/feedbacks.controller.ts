import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';

import { PostFeedbackDto } from '../dtos/post-feedback.dto.js';
import { FeedbacksService } from '../services/feedbacks.service.js';

@Controller('feedbacks')
export class FeedbacksController {
  constructor(private readonly feedbacksService: FeedbacksService) {}

  @Post()
  create(@Body() postFeedbackDto: PostFeedbackDto) {
    return this.feedbacksService.create(postFeedbackDto);
  }

  @Get('game/:gameId')
  findByGame(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.feedbacksService.findByGame(gameId);
  }

  @Get('game/:gameId/summary')
  getGameSummary(@Param('gameId', ParseIntPipe) gameId: number) {
    return this.feedbacksService.getGameSummary(gameId);
  }

  @Get('top-rated')
  getTopRated() {
    return this.feedbacksService.getTopRatedGames();
  }
}
