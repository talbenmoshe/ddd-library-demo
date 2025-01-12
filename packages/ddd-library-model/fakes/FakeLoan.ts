import { FakeEditableEntity, FakeEditableEntityBuilder, FakeReadablePropEventBrokerBuilder } from '@zdrbm/zdr-native-tools/test';
import { ILoan } from '../src';
import { IReadablePropEventBroker } from '@zdrbm/zdr-interfaces';
import { vi } from 'vitest';
import { aRandomGuid, aRandomString } from '@zdrbm/zdr-native-tools';

export interface IFakeLoanInitialData {
  id: string;
  isNew: boolean;
  bookId: IReadablePropEventBroker<string, string>;
  memberId: IReadablePropEventBroker<string, string>;
  loanTime: IReadablePropEventBroker<Date, string>;
  memberName: IReadablePropEventBroker<string, string>;
  bookTitle: IReadablePropEventBroker<string, string>;
  returnTime: IReadablePropEventBroker<Date, string>;
  isOverdueValue: boolean;
}

export class FakeLoan extends FakeEditableEntity implements ILoan {
  bookId: IReadablePropEventBroker<string, string>;
  memberId: IReadablePropEventBroker<string, string>;
  loanTime: IReadablePropEventBroker<Date, string>;
  memberName: IReadablePropEventBroker<string, string>;
  bookTitle: IReadablePropEventBroker<string, string>;
  returnTime: IReadablePropEventBroker<Date, string>;

  constructor(private initialData: IFakeLoanInitialData) {
    super(initialData.id, initialData.isNew);
    this.bookId = initialData.bookId;
    this.memberId = initialData.memberId;
    this.loanTime = initialData.loanTime;
    this.memberName = initialData.memberName;
    this.bookTitle = initialData.bookTitle;
    this.returnTime = initialData.returnTime;
  }

  isOverdue = vi.fn<() => boolean>(() => this.initialData.isOverdueValue);
}
export class FakeLoanBuilder extends FakeEditableEntityBuilder {
  bookId: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>(aRandomString()).build();
  memberId: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>(aRandomGuid()).build();
  loanTime: IReadablePropEventBroker<Date, string> = new FakeReadablePropEventBrokerBuilder<Date, string>(new Date()).build();
  memberName: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>(aRandomString()).build();
  bookTitle: IReadablePropEventBroker<string, string> = new FakeReadablePropEventBrokerBuilder<string, string>(aRandomString()).build();
  returnTime: IReadablePropEventBroker<Date, string> = new FakeReadablePropEventBrokerBuilder<Date, string>(new Date()).build();
  protected isOverdueValue = false;

  withBookId(bookId: IReadablePropEventBroker<string, string>): this {
    this.bookId = bookId;

    return this;
  }

  withBookIdValue(bookId: string): this {
    this.bookId = new FakeReadablePropEventBrokerBuilder<string, string>(bookId).build();

    return this;
  }

  withMemberId(memberId: IReadablePropEventBroker<string, string>): this {
    this.memberId = memberId;

    return this;
  }

  withMemberIdValue(memberId: string): this {
    this.memberId = new FakeReadablePropEventBrokerBuilder<string, string>(memberId).build();

    return this;
  }

  withLoanTime(loanTime: IReadablePropEventBroker<Date, string>): this {
    this.loanTime = loanTime;

    return this;
  }

  withLoanTimeValue(loanTime: Date): this {
    this.loanTime = new FakeReadablePropEventBrokerBuilder<Date, string>(loanTime).build();

    return this;
  }

  withMemberName(memberName: IReadablePropEventBroker<string, string>): this {
    this.memberName = memberName;

    return this;
  }

  withMemberNameValue(memberName: string): this {
    this.memberName = new FakeReadablePropEventBrokerBuilder<string, string>(memberName).build();

    return this;
  }

  withBookTitle(bookTitle: IReadablePropEventBroker<string, string>): this {
    this.bookTitle = bookTitle;

    return this;
  }

  withBookTitleValue(bookTitle: string): this {
    this.bookTitle = new FakeReadablePropEventBrokerBuilder<string, string>(bookTitle).build();

    return this;
  }

  withReturnTime(returnTime: IReadablePropEventBroker<Date, string>): this {
    this.returnTime = returnTime;

    return this;
  }

  withReturnTimeValue(returnTime: Date): this {
    this.returnTime = new FakeReadablePropEventBrokerBuilder<Date, string>(returnTime).build();

    return this;
  }

  withIsOverdueValue(isOverdueValue: boolean): this {
    this.isOverdueValue = isOverdueValue;

    return this;
  }

  build(): FakeLoan {
    return new FakeLoan(
      {
        id: this.id,
        isNew: this.isNew,
        bookId: this.bookId,
        memberId: this.memberId,
        loanTime: this.loanTime,
        memberName: this.memberName,
        bookTitle: this.bookTitle,
        returnTime: this.returnTime,
        isOverdueValue: this.isOverdueValue
      }
    );
  }
}