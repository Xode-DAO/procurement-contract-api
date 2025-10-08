import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type ContractDocument = Contract & Document;

@Schema({ timestamps: true })
export class Contract {
  @Prop({ required: true })
  name: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  template: string;

  @Prop({ required: true })
  templateInformation: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: 'draft' }) 
  status: string;

  @Prop()
  storageUrl: string;

  @Prop()
  txHash: string;
}

export const ContractSchema = SchemaFactory.createForClass(Contract);
