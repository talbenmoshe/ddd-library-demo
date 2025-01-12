import { describe, it, expect } from 'vitest';
import { aRandomInteger, aRandomString } from '@zdrbm/zdr-native-tools';
import { ILoan, ILoanInitialData, Loan } from '../src/Loan';

describe('Loan', () => {
  describe('isOverdue', () => {
    it('should not be overdue when return date is in the future', () => {
      const date = new Date();
      const data: ILoanInitialData = {
        id: aRandomString(),
        bookId: aRandomString(),
        memberId: aRandomString(),
        memberName: aRandomString(),
        bookTitle: aRandomString(),
        loanTime: date,
        returnTime: new Date(date.getTime() + aRandomInteger())
      };

      const loan: ILoan = new Loan(data);

      expect(loan.isOverdue()).toBeFalsy();
    });

    it('should be overdue when current time it pass return time', () => {
      const date = new Date();
      const data: ILoanInitialData = {
        id: aRandomString(),
        bookId: aRandomString(),
        memberId: aRandomString(),
        memberName: aRandomString(),
        bookTitle: aRandomString(),
        loanTime: date,
        returnTime: new Date(date.getTime() - aRandomInteger())

      };

      const loan: ILoan = new Loan(data);

      expect(loan.isOverdue()).toBeTruthy();
    });
  });
});