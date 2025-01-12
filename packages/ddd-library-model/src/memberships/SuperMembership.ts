import { ILoan } from '../Loan';
import { IMembershipSelectorFactory, Membership, SelectorResult } from '../Membership';

export class SuperMembership extends Membership {
  constructor() {
    super('super');
  }
  getDurationInDays(): number {
    return 21;
  }
  getEntityName(): string {
    return 'SuperMembership';
  }

  canLoan(currentLoans: ILoan[]): boolean {
    return currentLoans.length <= 5;
  }

  selectFromFactory<T extends IMembershipSelectorFactory<any>>(selectorFactory: T): SelectorResult<T> {
    return selectorFactory.getSuper();
  }
}