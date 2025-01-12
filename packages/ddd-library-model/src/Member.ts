import { EditableEntity, ICreatableEntityCollection, IEditableEntity,
  IPropEventBroker, IReadablePropEventBroker, textMinLength } from '@zdrbm/zdr-native-tools';
import { ILoan } from './Loan';
import { IMembership } from './Membership';

export interface IMember extends IEditableEntity {
  age: IReadablePropEventBroker<number>;
  name: IReadablePropEventBroker<string>;
  loans: ICreatableEntityCollection<ILoan>;
  membership: IReadablePropEventBroker<IMembership>;

  changeName(newName: string): void;
  changeAge(newAge: number): void;
  changeMembership(newMembership: IMembership): void;
}

const MIN_AGE = 10;

export class Member extends EditableEntity<keyof IMember> implements IMember {
  age: IPropEventBroker<number, string>;
  name: IPropEventBroker<string, string>;
  loans: ICreatableEntityCollection<ILoan>;
  membership: IPropEventBroker<IMembership, string>;

  getEntityName(): string {
    return 'Member';
  }

  constructor(
    id: string | undefined,
    name: string,
    age: number,
    membership: IMembership
  ) {
    super(id);

    this.age = this.createPropEventBroker('age', age, {
      validators: [{
        metadata: { $minAge: MIN_AGE },
        validator: (value: number) => {
          let result;
          const isValid = value >= MIN_AGE;

          if (!isValid) {
            result = { result: 'Age must be a positive number' };
          }

          return result;
        }
      }]
    });
    this.name = this.createPropEventBroker('name', name, {
      validators: [textMinLength(3)]
    });
    this.membership = this.createPropEventBroker('membership', membership);
    this.loans = this.createEntityCollection<ILoan>('loans', []);

    this.addSubEntity(membership);
  }

  changeName(newName: string): void {
    this.name.set(newName);
  }

  changeAge(newAge: number): void {
    this.age.set(newAge);
  }

  changeMembership(newMembership: IMembership): void {
    const currentMembership = this.membership.get();
    this.removeSubEntity(currentMembership);
    this.membership.set(newMembership);
    this.addSubEntity(newMembership);
  }
}