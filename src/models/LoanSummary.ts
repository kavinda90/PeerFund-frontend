export class LoanSummary {
  active: number;
  approved: number;
  pending: number;

  constructor(active: number, approved: number, pending: number) {
    this.active = active;
    this.approved = approved;
    this.pending = pending;
  }
}
