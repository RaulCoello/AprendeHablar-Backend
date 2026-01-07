import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type GameDocument = Game & Document;

@Schema({ timestamps: true })
export class Game {
  @Prop({ required: true })
  title: string;

  @Prop()
  imageUrl?: string;

  @Prop({ required: true })
  color: string;
}

export const GameSchema = SchemaFactory.createForClass(Game);
