import { EditableEntity, IEditableEntity, IReadablePropEventBroker } from '@zdrbm/zdr-native-tools';

export interface ILoanInitialData {
  id: string;
  bookId: string;
  memberId: string;
  memberName: string;
  bookTitle: string;
  loanTime: Date;
  returnTime: Date;
}

export interface ILoan extends IEditableEntity {
  bookId: IReadablePropEventBroker<string>;
  memberId: IReadablePropEventBroker<string>;
  loanTime: IReadablePropEventBroker<Date>;
  memberName: IReadablePropEventBroker<string>;
  bookTitle: IReadablePropEventBroker<string>;
  returnTime: IReadablePropEventBroker<Date>;

  isOverdue(): boolean;
}

export class Loan extends EditableEntity<keyof ILoan> implements ILoan {
  bookId: IReadablePropEventBroker<string>;
  memberId: IReadablePropEventBroker<string>;
  loanTime: IReadablePropEventBroker<Date>;
  memberName: IReadablePropEventBroker<string>;
  bookTitle: IReadablePropEventBroker<string>;
  returnTime: IReadablePropEventBroker<Date>;

  getEntityName(): string {
    return 'Loan';
  }

  constructor(initialData: ILoanInitialData) {
    super(initialData.id);

    this.bookId = this.createPropEventBroker('bookId', initialData.bookId);
    this.memberId = this.createPropEventBroker('memberId', initialData.memberId);
    this.loanTime = this.createPropEventBroker('loanTime', initialData.loanTime);
    this.memberName = this.createPropEventBroker('memberName', initialData.memberName);
    this.bookTitle = this.createPropEventBroker('bookTitle', initialData.bookTitle);
    this.returnTime = this.createPropEventBroker('returnTime', initialData.returnTime);
  }

  isOverdue(): boolean {
    return this.returnTime.get() <= new Date();
  }
}