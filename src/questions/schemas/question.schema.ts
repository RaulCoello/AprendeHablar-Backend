import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type QuestionDocument = Question & Document;

@Schema({ _id: false })
export class Answer {
  @Prop({ required: true })
  text: string;

  @Prop()
  soundUrl?: string;

  @Prop()
  color?: string;

  @Prop({ default: false })
  isCorrect: boolean;
}

const AnswerSchema = SchemaFactory.createForClass(Answer);

@Schema({ timestamps: true })
export class Question {
  @Prop({ type: Types.ObjectId, ref: 'Game', required: true })
  gameId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop()
  indication?: string;

  @Prop()
  resourceUrl?: string;

  @Prop({ enum: ['image', 'video'], required: false })
  resourceType?: 'image' | 'video';

  @Prop({ enum: ['single', 'multiple'], required: true })
  type: 'single' | 'multiple';

  @Prop({ required: true })
  order: number;

  @Prop({ type: [AnswerSchema], default: [] })
  answers: Answer[];
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
