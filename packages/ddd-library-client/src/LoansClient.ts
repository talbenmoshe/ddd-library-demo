import { LoanDTO } from 'ddd-library-dto';
import { IHttpClient } from './IHttpClient';

export interface ILoansFilter {
  memberId?: string;
}

export interface ILoansClient {
  createLoan(memberId: string, bookId: string, durationInDays: number): Promise<LoanDTO>;
  returnLoan(loadId: string): Promise<void>;
  getLoan(loadId: string): Promise<LoanDTO>;
  listLoans(filter?: ILoansFilter): Promise<LoanDTO[]>;
}

export class LoansClient implements ILoansClient {
  constructor(private httpClient: IHttpClient) { }

  async createLoan(memberId: string, bookId: string, durationInDays: number): Promise<LoanDTO> {
    const httpResult = await this.httpClient.post<LoanDTO>('/api/loans', {
      memberId,
      bookId,
      durationInDays
    });

    return httpResult.data;
  }

  async returnLoan(loadId: string): Promise<void> {
    await this.httpClient.delete<void>(`/api/loans/${loadId}`);
  }

  async getLoan(loadId: string): Promise<LoanDTO> {
    const httpResult = await this.httpClient.get<LoanDTO>(`/api/loans/${loadId}`);

    return httpResult.data;
  }

  async listLoans(filter?: ILoansFilter): Promise<LoanDTO[]> {
    const httpResult = await this.httpClient.get<LoanDTO[]>('/api/loans',
      {
        params: filter
      }
    );

    return httpResult.data;
  }
}

