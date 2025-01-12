import { MemberDto, BookDTO, LoanDTO } from 'ddd-library-dto';
import { IMember, IBook, ILoan, ILibrary, IMembership } from 'ddd-library-model';
import { FakeBookBuilder, FakeLibraryBuilder, FakeLoanBuilder, FakeMemberBuilder } from 'ddd-library-model/fakes';
import { ILibraryModelFactory } from '../src/LibraryModelFactory';
import { vi } from 'vitest';
import { aRandomGuid, aRandomInteger, aRandomString } from '@zdrbm/zdr-native-tools';

export function aMemberDto(): MemberDto {
  return {
    id: aRandomGuid(),
    name: aRandomString(),
    age: aRandomInteger(),
    membership: 'basic'
  };
}

export interface FakeLibraryModelFactoryInitialData {
  newMemberDto: MemberDto;
  memberDto: MemberDto;
  newMember: IMember;
  book: IBook;
  loan: ILoan;
  library: ILibrary;
  memberships: IMembership[];
}

export class FakeLibraryModelFactory implements ILibraryModelFactory {
  constructor(private initialData: FakeLibraryModelFactoryInitialData) {}
  createNewMemberDto = vi.fn<(member: IMember) => MemberDto>(() => this.initialData.newMemberDto);
  createMemberDto = vi.fn<(member: IMember) => MemberDto>(() => this.initialData.memberDto);
  createNewMember = vi.fn<() => IMember>(() => this.initialData.newMember);
  createMember = vi.fn<(userData: MemberDto) => IMember>(() => this.initialData.newMember);
  createBook = vi.fn<(bookData: BookDTO) => IBook>(() => this.initialData.book);
  createLoan = vi.fn<(loanData: LoanDTO) => ILoan>(() => this.initialData.loan);
  createLibrary = vi.fn<() => ILibrary>(() => this.initialData.library);
  listMemberships = vi.fn<() => IMembership[]>(() => this.initialData.memberships);
}

export class FakeLibraryModelFactoryBuilder {
  newMemberDto: MemberDto = aMemberDto();
  memberDto: MemberDto = aMemberDto();
  newMember: IMember = new FakeMemberBuilder().build();
  book: IBook = new FakeBookBuilder().build();
  loan: ILoan = new FakeLoanBuilder().build();
  library: ILibrary = new FakeLibraryBuilder().build();
  memberships: IMembership[] = [];

  withNewMemberDto(newMemberDto: MemberDto): this {
    this.newMemberDto = newMemberDto;

    return this;
  }

  withMemberDto(memberDto: MemberDto): this {
    this.memberDto = memberDto;

    return this;
  }

  withNewMember(newMember: IMember): this {
    this.newMember = newMember;

    return this;
  }

  withBook(book: IBook): this {
    this.book = book;

    return this;
  }

  withLoan(loan: ILoan): this {
    this.loan = loan;

    return this;
  }

  withLibrary(library: ILibrary): this {
    this.library = library;

    return this;
  }

  withMemberships(memberships: IMembership[]): this {
    this.memberships = memberships;

    return this;
  }

  build(): FakeLibraryModelFactory {
    return new FakeLibraryModelFactory({
      newMemberDto: this.newMemberDto,
      memberDto: this.memberDto,
      newMember: this.newMember,
      book: this.book,
      loan: this.loan,
      library: this.library,
      memberships: this.memberships
    });
  }
}