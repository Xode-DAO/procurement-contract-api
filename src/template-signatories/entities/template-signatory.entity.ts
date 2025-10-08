import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type TemplateSignatoryDocument = TemplateSignatory & Document;

@Schema({ timestamps: true })
export class TemplateSignatory {
  @Prop({ type: Types.ObjectId, ref: 'Template', required: true })
  templateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const TemplateSignatorySchema = SchemaFactory.createForClass(TemplateSignatory);
