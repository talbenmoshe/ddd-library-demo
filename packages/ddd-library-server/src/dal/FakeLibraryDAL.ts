import { MemberDto, LoanDTO, BookDTO } from 'ddd-library-dto';
import data from './data.json';
import { v4 } from 'uuid';

export interface ILoansFilters {
  memberId?: string;
}
export interface ILibraryDAL {
    updateMember(id: string, member: MemberDto): Promise<void>;
    createLoan(newLoan: Omit<LoanDTO, 'id'>): Promise<LoanDTO>;
    deleteLoad(loanId: string): Promise<void>;
    listMembers(): Promise<MemberDto[]>;
    getMemberById(memberId: string): Promise<MemberDto>;
    listLoans(filter?: ILoansFilters): Promise<LoanDTO[]>;
    getLoanById(loanId:string): Promise<LoanDTO>;
    listBooks(): Promise<BookDTO[]>;
    getBookById(bookId:string): Promise<BookDTO>;
    createMember(member: Omit<MemberDto, 'id'>): Promise<MemberDto>;
}

export class FakeLibraryDAL implements ILibraryDAL {
  createMember(member: Omit<MemberDto, 'id'>): Promise<MemberDto> {
    const newId = v4();
    const newMember: MemberDto = {
      ...member,
      id: newId
    };

    data.members.unshift(newMember);

    return Promise.resolve(newMember);
  }
  async updateMember(id: string, member: MemberDto): Promise<void> {
    const existingMember = await this.getMemberById(id);

    if (!existingMember) {
      throw new Error(`Member with id ${id} not found`);
    }

    Object.assign(existingMember, member);
  }

  async createLoan(newLoan: Omit<LoanDTO, 'id'>): Promise<LoanDTO> {
    const loan: LoanDTO = {
      ...newLoan,
      id: v4()
    };

    data.loans.push(loan);

    return loan;
  }
  async deleteLoad(loanId: string): Promise<void> {
    const loans = this.getAllLoans();
    const loanIndex = loans.findIndex(loan => loan.id === loanId);

    if (loanIndex === -1) {
      throw new Error(`Loan with id ${loanId} not found`);
    }

    loans.splice(loanIndex, 1);
  }

  private getAllLoans(): LoanDTO[] {
    return data.loans as LoanDTO[];
  }

  getLoanById(loanId: string): Promise<LoanDTO> {
    return Promise.resolve(this.getAllLoans().find(loan => loan.id === loanId)!);
  }

  listBooks(): Promise<BookDTO[]> {
    return Promise.resolve(data.books);
  }

  getBookById(bookId: string): Promise<BookDTO> {
    return Promise.resolve(data.books.find(member => member.id === bookId)!);
  }

  listLoans(filter?: ILoansFilters): Promise<LoanDTO[]> {
    let finalLoans = this.getAllLoans();
    const memberId = filter?.memberId;

    if (memberId) {
      finalLoans = finalLoans.filter(loan => loan.memberId === memberId);
    }

    return Promise.resolve(finalLoans);
  }

  getMemberById(memberId: string): Promise<MemberDto> {
    return Promise.resolve(data.members.find(member => member.id === memberId)!);
  }

  listMembers(): Promise<MemberDto[]> {
    return Promise.resolve(data.members);
  }
}