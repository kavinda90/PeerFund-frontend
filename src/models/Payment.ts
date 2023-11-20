export interface Payment {
  lender: string;
  date: string;
  installment: string;
  loanId: string;
  overdue?: Overdue;
  isAutoPayEnabled: boolean;
}
export type Overdue = -1 | 0 | 1;
