import { EditableEntity, IEditableEntity } from '@zdrbm/zdr-native-tools';
import { ILoan } from './Loan';

export interface IMembershipSelectorFactory<T> {
  getBasic(): T;
  getPremium(): T;
  getSuper(): T;
}
export type SelectorResult<T> = T extends IMembershipSelectorFactory<infer U> ? U : never;

export interface IMembership extends IEditableEntity {
  selectFromFactory<T extends IMembershipSelectorFactory<any>>(selectorFactory: T): SelectorResult<T>;
  canLoan(currentLoans: ILoan[]): boolean;
  getDurationInDays(): number;
}

export abstract class Membership extends EditableEntity<keyof IMembership> implements IMembership {
  constructor(id: string) {
    super(id);
  }

  abstract getEntityName(): string;
  abstract getDurationInDays(): number;
  abstract canLoan(currentLoans: ILoan[]): boolean;
  abstract selectFromFactory<T extends IMembershipSelectorFactory<any>>(selectorFactory: T): SelectorResult<T>;
}