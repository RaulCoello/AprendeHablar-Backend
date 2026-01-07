import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Types } from 'mongoose';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  // CREATE QUESTION
  @Post()
  create(
    @Body()
    body: {
      gameId?: Types.ObjectId;
      title?: string;
      indication?: string;
      resourceUrl?: string;
      resourceType?: 'image' | 'video';
      type?: 'single' | 'multiple';
      order?: number;
      answers?: any[];
    },
  ) {
    return this.questionsService.create({
      gameId: body.gameId,
      title: body.title,
      indication: body.indication,
      resourceUrl: body.resourceUrl,
      resourceType: body.resourceType,
      type: body.type,
      order: body.order,
      answers: body.answers,
    });
  }

  // GET QUESTIONS BY GAME
  @Get('game/:gameId')
  findByGame(@Param('gameId') gameId: string) {
    return this.questionsService.findByGame(gameId);
  }

  // GET ONE QUESTION
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }

  // UPDATE
  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.questionsService.update(id, body);
  }

  // DELETE
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(id);
  }
}
