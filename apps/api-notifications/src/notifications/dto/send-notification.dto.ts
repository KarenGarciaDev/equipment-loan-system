import { IsEmail, IsString } from 'class-validator';

export class SendNotificationDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  message: string;
}
