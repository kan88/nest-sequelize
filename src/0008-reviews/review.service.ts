import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { Comment } from 'src/0008-comments/comments.model';
import { CommentsService } from 'src/0008-comments/comments.service';
import { CreateCommentDto } from 'src/0008-comments/dto/create-comment.dto';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review) private reviewRepository: typeof Review,
    private CommentsService: CommentsService,
  ) {}

  async get() {
    const data = await this.reviewRepository.findAll({
      where: {
        [Op.or]: [{ status: null }, { status: 1 }],
      },
    });
    return data;
  }

  async getArchive() {
    const data = await this.reviewRepository.findAll({
      where: {
        status: [2, 3, 4],
      },
    });
    return data;
  }

  async create(dto: CreateReviewDto) {
    const data = await this.reviewRepository.create(dto);
    return data;
  }

  async update(dto: UpdateReviewDto, id: number) {
    const data = await this.reviewRepository.update(dto, {
      where: {
        id,
      },
      returning: true,
    });

    return data;
  }

  async createComment(dto: CreateCommentDto, review_id: number) {
    const data = await this.CommentsService.create(dto, review_id);
    return data;
  }

  async getComments(review_id: number) {
    const data = await this.CommentsService.get(review_id);
    return data;
  }
}
