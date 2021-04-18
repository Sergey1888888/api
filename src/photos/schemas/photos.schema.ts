import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';

export type PhotosDocument = Photos & Document;

@Schema()
export class Photos {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Realty', required: true })
  est_id: mongoose.Schema.Types.ObjectId;
  @Prop({ type: String, required: true })
  URL: string;
  @Prop({ type: String, required: false, default: null })
  hash: string;
}

export const PhotosSchema = SchemaFactory.createForClass(Photos);
