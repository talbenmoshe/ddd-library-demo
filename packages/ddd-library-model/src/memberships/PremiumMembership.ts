import { ILoan } from '../Loan';
import { IMembershipSelectorFactory, Membership, SelectorResult } from '../Membership';

export class PremiumMembership extends Membership {
  constructor() {
    super('premium');
  }

  getDurationInDays(): number {
    return 14;
  }

  getEntityName(): string {
    return 'PremiumMembership';
  }

  canLoan(currentLoans: ILoan[]): boolean {
    return currentLoans.length <= 5 && !currentLoans.some(loan => loan.isOverdue());
  }

  selectFromFactory<T extends IMembershipSelectorFactory<any>>(selectorFactory: T): SelectorResult<T> {
    return selectorFactory.getPremium();
  }
}