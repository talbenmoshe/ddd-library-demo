import { IReadablePropEventBroker, ICreatableEntityCollection } from '@zdrbm/zdr-interfaces';
import { ILoan, IMember, IMembership } from '../src';
import { FakeEditableEntity, FakeEditableEntityBuilder, FakeReadablePropEventBrokerBuilder,
  FakeCreatableEntityCollectionBuilder } from '@zdrbm/zdr-native-tools/test';
import { vi } from 'vitest';
import { FakeMembershipBuilder } from './FakeMembership';

export interface IFakeMemberInitialData {
  id: string;
  isNew: boolean;
  name: IReadablePropEventBroker<string, string>;
  age: IReadablePropEventBroker<number, string>;
  membership: IReadablePropEventBroker<IMembership, string>;
  loans: ICreatableEntityCollection<ILoan>;
}

export class FakeMember extends FakeEditableEntity implements IMember {
  age: IReadablePropEventBroker<number, string>;
  name: IReadablePropEventBroker<string, string>;
  loans: ICreatableEntityCollection<ILoan>;
  membership: IReadablePropEventBroker<IMembership, string>;

  constructor(initialData: IFakeMemberInitialData) {
    super(initialData.id, initialData.isNew);
    this.age = initialData.age;
    this.name = initialData.name;
    this.membership = initialData.membership;
    this.loans = initialData.loans;
  }

  changeName = vi.fn<(newName: string) => void>();
  changeAge = vi.fn<(newAge: number) => void>();
  changeMembership = vi.fn<(newMembership: IMembership) => void>();
}

export class FakeMemberBuilder extends FakeEditableEntityBuilder {
  name: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>('').build();
  age: IReadablePropEventBroker<number, string> = new FakeReadablePropEventBrokerBuilder<number, string>(0).build();
  membership: IReadablePropEventBroker<IMembership, string> = new FakeReadablePropEventBrokerBuilder<IMembership, string>(
    new FakeMembershipBuilder().build()
  ).build();
  loans: ICreatableEntityCollection<ILoan> = new FakeCreatableEntityCollectionBuilder<ILoan>().build();

  withName(name: IReadablePropEventBroker<string, string>): this {
    this.name = name;

    return this;
  }

  withNameValue(name: string): this {
    this.name = new FakeReadablePropEventBrokerBuilder<string, string>(name).build();

    return this;
  }

  withAge(age: IReadablePropEventBroker<number, string>): this {
    this.age = age;

    return this;
  }

  withAgeValue(age: number): this {
    this.age = new FakeReadablePropEventBrokerBuilder<number, string>(age).build();

    return this;
  }

  withMembership(membership: IReadablePropEventBroker<IMembership, string>): this {
    this.membership = membership;

    return this;
  }

  withMembershipValue(membership: IMembership): this {
    this.membership = new FakeReadablePropEventBrokerBuilder<IMembership, string>(membership).build();

    return this;
  }

  withLoans(loans: ICreatableEntityCollection<ILoan>): this {
    this.loans = loans;

    return this;
  }

  build() {
    return new FakeMember({
      id: this.id,
      isNew: this.isNew,
      name: this.name,
      age: this.age,
      membership: this.membership,
      loans: this.loans
    });
  }
}