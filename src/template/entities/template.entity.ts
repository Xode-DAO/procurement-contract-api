import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TemplateDocument = Template & Document;

@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: false } })
export class Template {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  template: Buffer;

  @Prop()
  createdAt: Date;
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
