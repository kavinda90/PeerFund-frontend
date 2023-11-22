export interface Payment {
  lender: string;
  date: string;
  installment: string;
  loanId: number;
  overdue?: Overdue;
  isAutoPayEnabled: boolean;
}
export type Overdue = -1 | 0 | 1;
