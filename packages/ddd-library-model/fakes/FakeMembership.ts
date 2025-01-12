import { FakeEditableEntity, FakeEditableEntityBuilder } from '@zdrbm/zdr-native-tools/test';
import { ILoan, IMembership, IMembershipSelectorFactory } from '../src';
import { vi } from 'vitest';

export interface IFakeMembershipInitialData {
  id: string;
  isNew: boolean;
  membershipType: string;
  canLoanValue: boolean;
  durationInDaysValue: number;
}

export class FakeMembership extends FakeEditableEntity implements IMembership {
  constructor(private initialData: IFakeMembershipInitialData) {
    super(initialData.id, initialData.isNew);
  }

  selectFromFactory = vi.fn<(factory: IMembershipSelectorFactory<any>) => any>(factory => {
    switch (this.initialData.membershipType) {
      case 'basic':
        return factory.getBasic();
      case 'premium':
        return factory.getPremium;
      case 'super':
        return factory.getSuper();
    }

    throw new Error('Unknown poiSelectorType');
  });

  canLoan = vi.fn<(currentLoans: ILoan[]) => boolean>(() => this.initialData.canLoanValue);
  getDurationInDays = vi.fn<() => number>(() => this.initialData.durationInDaysValue);
}

export class FakeMembershipBuilder extends FakeEditableEntityBuilder {
  membershipType: string = 'basic';
  canLoanValue: boolean = true;
  durationInDaysValue: number = 30;

  withMembershipType(membershipType: string): this {
    this.membershipType = membershipType;

    return this;
  }

  withCanLoanValue(canLoanValue: boolean): this {
    this.canLoanValue = canLoanValue;

    return this;
  }

  withDurationInDaysValue(durationInDaysValue: number): this {
    this.durationInDaysValue = durationInDaysValue;

    return this;
  }

  build() {
    return new FakeMembership({
      id: this.id,
      isNew: this.isNew,
      membershipType: this.membershipType,
      canLoanValue: this.canLoanValue,
      durationInDaysValue: this.durationInDaysValue
    });
  }
}