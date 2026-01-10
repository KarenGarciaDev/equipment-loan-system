import { IsString, IsNotEmpty, IsObject } from 'class-validator';

export class TriggerFlowDto {
  @IsString()
  @IsNotEmpty()
  flowName: string;

  @IsObject()
  payload: Record<string, any>;
}
