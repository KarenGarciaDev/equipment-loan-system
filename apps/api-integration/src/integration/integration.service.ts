import { Injectable } from '@nestjs/common';

@Injectable()
export class IntegrationService {
  sendEvent(payload: any) {
    console.log('📡 Event sent:', payload);
    return { message: 'Event processed', payload };
  }
}
