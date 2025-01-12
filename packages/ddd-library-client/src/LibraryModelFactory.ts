import { BookDTO, LoanDTO, MemberDto } from 'ddd-library-dto';
import { BasicMembership, Book, IBook, ILibrary, ILoan, IMember, Library, Loan, Member, PremiumMembership, SuperMembership } from 'ddd-library-model';
import { IMembership } from 'ddd-library-model';

export interface ILibraryModelFactory {
  createNewMemberDto(member: IMember): Omit<MemberDto, 'id'>;
  createMemberDto(member: IMember): MemberDto;
  createNewMember(): IMember;
  createMember(userData: MemberDto): IMember;
  createBook(bookData: BookDTO): IBook;
  createLoan(loanData: LoanDTO): ILoan;
  createLibrary(): ILibrary;
  listMemberships(): IMembership[];
}

export class LibraryModelFactory implements ILibraryModelFactory {
  constructor() {}

  createNewMemberDto(member: IMember): Omit<MemberDto, 'id'> {
    return {
      name: member.name.get(),
      age: member.age.get(),
      membership: member.membership.get().getId()
    };
  }

  createMemberDto(member: IMember): MemberDto {
    return {
      ...this.createNewMemberDto(member),
      id: member.getId()

    };
  }

  listMemberships(): IMembership[] {
    return [
      new BasicMembership(),
      new PremiumMembership(),
      new SuperMembership()
    ];
  }

  createBook(bookData: BookDTO): IBook {
    return new Book({
      id: bookData.id,
      title: bookData.title,
      author: bookData.author,
      description: bookData.description,
      yearPublished: bookData.yearPublished,
      quantity: bookData.quantity
    });
  }

  createLoan(loanData: LoanDTO): ILoan {
    return new Loan({
      id: loanData.id,
      bookId: loanData.bookId,
      memberId: loanData.memberId,
      loanTime: new Date(loanData.loanTime),
      memberName: loanData.memberName,
      bookTitle: loanData.bookTitle,
      returnTime: new Date(loanData.returnTime)
    });
  }

  createLibrary(): ILibrary {
    return new Library({
      members: []
    });
  }

  createMembership(membershipId: string): IMembership {
    let membership = new BasicMembership();

    switch (membershipId) {
      case 'premium':
        membership = new PremiumMembership();
        break;
      case 'super':
        membership = new SuperMembership();
        break;
    }

    return membership;
  }

  createMember(userData: MemberDto): IMember {
    const { id, name, age, membership } = userData;

    return new Member(
      id,
      name,
      age,
      this.createMembership(membership)
    );
  }

  createNewMember(): IMember {
    return new Member(undefined, '', 0, new BasicMembership());
  }
}