export interface Loan {
  id: number;
  userId: number;
  equipmentId: number;
  startDate: Date;
  endDate?: Date;
  returned: boolean;
}
