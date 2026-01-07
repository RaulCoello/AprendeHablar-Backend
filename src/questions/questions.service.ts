import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Question, QuestionDocument } from './schemas/question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(Question.name)
    private questionModel: Model<QuestionDocument>,
  ) {}

  create(data: Partial<Question>) {
    if (!data.gameId) {
      throw new BadRequestException('gameId is required');
    }

    if (!data.title || data.title.trim() === '') {
      throw new BadRequestException('Question title is required');
    }

    return this.questionModel.create({
      ...data,
      title: data.title.trim(),
    });
  }

  findByGame(gameId: string) {
    return this.questionModel
      .find({ gameId: new Types.ObjectId(gameId) })
      .sort({ order: 1 });
  }

  findOne(id: string) {
    return this.questionModel.findById(id);
  }

  update(id: string, data: Partial<Question>) {
    return this.questionModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  remove(id: string) {
    return this.questionModel.findByIdAndDelete(id);
  }
}
