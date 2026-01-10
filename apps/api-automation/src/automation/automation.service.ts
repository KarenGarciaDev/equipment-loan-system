import { Injectable } from '@nestjs/common';

@Injectable()
export class AutomationService {
  triggerFlow(flowName: string, payload: any) {
    console.log(`Flow "${flowName}" triggered with payload:`, payload);
    return { flow: flowName, status: 'triggered', payload };
  }
}
