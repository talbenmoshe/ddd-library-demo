import { ILoan } from '../Loan';
import { IMembershipSelectorFactory, Membership, SelectorResult } from '../Membership';

export class BasicMembership extends Membership {
  constructor() {
    super('basic');
  }

  getDurationInDays(): number {
    return 7;
  }

  canLoan(currentLoans: ILoan[]): boolean {
    return currentLoans.length === 0;
  }

  selectFromFactory<T extends IMembershipSelectorFactory<any>>(selectorFactory: T): SelectorResult<T> {
    return selectorFactory.getBasic();
  }

  getEntityName(): string {
    return 'BasicMembership';
  }
}