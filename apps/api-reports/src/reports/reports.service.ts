import { Injectable } from '@nestjs/common';

// Definimos la interfaz Report aquí directamente
export interface Report {
  id: number;
  title: string;
  content: string;
}

@Injectable()
export class ReportsService {
  private reports: Report[] = [];

  create(data: { title: string; content: string }): Report {
    const report: Report = {
      id: Date.now(),
      ...data,
    };
    this.reports.push(report);
    return report;
  }

  findAll(): Report[] {
    return this.reports;
  }
}
