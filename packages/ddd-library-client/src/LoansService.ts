import { ILoan } from 'ddd-library-model';
import { ILibraryModelFactory } from './LibraryModelFactory';
import { ILoansClient } from './LoansClient';

export interface ILoansService {
  createLoan(memberId: string, bookId: string, durationInDays: number): Promise<ILoan>;
  returnLoan(loan: ILoan): Promise<void>;
  getLoanById(loadId: string): Promise<ILoan>;
  listLoans(): Promise<ILoan[]>;
  getMemberLoans(memberId: string): Promise<ILoan[]>;
}

export class LoansService implements ILoansService {
  constructor(
    private factory: ILibraryModelFactory,
    private client: ILoansClient
  ) {}

  async createLoan(memberId: string, bookId: string, durationInDays: number): Promise<ILoan> {
    const loan = await this.client.createLoan(memberId, bookId, durationInDays);

    return this.factory.createLoan(loan);
  }

  async returnLoan(loan: ILoan): Promise<void> {
    return this.client.returnLoan(loan.getId());
  }

  async listLoans(): Promise<ILoan[]> {
    const loans = await this.client.listLoans();

    return loans.map(loan => this.factory.createLoan(loan));
  }

  async getMemberLoans(memberId: string): Promise<ILoan[]> {
    const memberLoans = await this.client.listLoans({ memberId });

    return memberLoans.map(loan => this.factory.createLoan(loan));
  }

  async getLoanById(loadId: string): Promise<ILoan> {
    const loan = await this.client.getLoan(loadId);

    return this.factory.createLoan(loan);
  }
}
