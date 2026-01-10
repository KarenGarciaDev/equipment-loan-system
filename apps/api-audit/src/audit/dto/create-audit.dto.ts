export class CreateAuditDto {
  readonly userId: number;
  readonly action: string;
  readonly resource: string;
  readonly timestamp?: Date;
}
