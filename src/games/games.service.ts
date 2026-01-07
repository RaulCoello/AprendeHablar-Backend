import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Game, GameDocument } from './schemas/game.schema';

@Injectable()
export class GamesService {
  constructor(
    @InjectModel(Game.name)
    private gameModel: Model<GameDocument>,
  ) {}

  create(data: Partial<Game>) {
    if (!data.title || data.title.trim().length === 0) {
      throw new BadRequestException('El título del juego no puede estar vacío');
    }
    return this.gameModel.create({
      ...data,
      title: data.title.trim(),
    });
  }

  findAll() {
    return this.gameModel.find();
  }
  findOne(id: string) {
    return this.gameModel.findById(id);
  }

  update(id: string, data: Partial<Game>) {
    return this.gameModel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  remove(id: string) {
    return this.gameModel.findByIdAndDelete(id);
  }
}
