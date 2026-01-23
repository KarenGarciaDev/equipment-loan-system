// apps/api-audit/src/audit/audit.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AuditEvent extends Document {
  @Prop({ required: true })
  topic: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Object, required: true })
  payload: Record<string, any>;
}

export const AuditEventSchema = SchemaFactory.createForClass(AuditEvent);
