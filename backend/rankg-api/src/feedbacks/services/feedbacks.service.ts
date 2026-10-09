import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { PostFeedbackDto } from '../dtos/post-feedback.dto.js';

@Injectable()
export class FeedbacksService {
  constructor(private readonly prisma: PrismaClient) {}

  async create(createFeedbackDto: PostFeedbackDto) {
    return this.prisma.feedback.create({
      data: createFeedbackDto,
    });
  }

  async findByGame(gameId: number) {
    return this.prisma.feedback.findMany({
      where: { gameId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getGameSummary(gameId: number) {
    const total = await this.prisma.feedback.count({
      where: { gameId },
    });

    if (total === 0) {
      return { gameId, averageRating: 0, totalReviews: 0 };
    }

    const aggregate = await this.prisma.feedback.aggregate({
      where: { gameId },
      _avg: { rating: true },
    });

    return {
      gameId,
      averageRating: Number(aggregate._avg.rating?.toFixed(1)) || 0,
      totalReviews: total,
    };
  }

  //Ranking: 10 jogos com melhores notas
  async getTopRatedGames() {
    return this.prisma.feedback.groupBy({
      by: ['gameId'],
      _avg: { rating: true },
      _count: { rating: true },
      orderBy: {
        _avg: { rating: 'desc' },
      },
      take: 10,
    });
  }
}
