import { ILibrary, ILoan, IMember, IMembership } from 'ddd-library-model';
import { IMembersService } from './MembersService';
import { AdvancedEventEmitter, IPropEventBroker, IReadablePropEventBroker,
  LoadingState, LoadingStateBroker, PropEventBroker } from '@zdrbm/zdr-native-tools';
import { ILoansService } from './LoansService';
import { IBooksService } from './BooksService';
import { ILibraryModelFactory } from './LibraryModelFactory';

export interface ILoanProps {
  memberId?: string;
  bookId?: string;
}

export interface IEditMemberProps {
  member: IMember;
}

export enum LoanCreationState {
  SUCCESS = 'SUCCESS',
  CANT_LOAN = 'CANT_LOAN',
}

export interface ILibraryFacade {
  getModel(): ILibrary;
  ensureMembersLoaded(): Promise<void>;
  ensureBooksLoaded(): Promise<void>;

  loadMember(memberId: string): LoadingStateBroker;
  ensureMemberLoansLoaded(memberId: string): LoadingStateBroker;
  membersLoadingState: LoadingStateBroker;
  booksLoadingState: LoadingStateBroker;
  saveMemberState: LoadingStateBroker;

  changeLibraryDescription(newDescription: string): void;
  returnLoan(loan: ILoan): Promise<void>;

  loanProps: IReadablePropEventBroker<ILoanProps | undefined>;
  startLoanCreation(props: ILoanProps): void;
  finishLoanCreation(): void;
  createLoan(memberId: string, bookId: string): Promise<LoanCreationState>;

  startEditMember(memberId: string): void;
  startCreateMember(): void;
  editMemberProps: IReadablePropEventBroker<IEditMemberProps | undefined>;
  saveCurrentMember(): Promise<void>;
  endMemberEdit(): void;

  listMemberships(): IMembership[];
}

export interface ILibraryServices {
  membersService: IMembersService;
  loansService: ILoansService;
  booksService: IBooksService;
  libraryFactory: ILibraryModelFactory;
}

 interface IMemberLoadingStates {
  memberLoadingState: LoadingStateBroker
  memberLoansLoadingState: LoadingStateBroker
 }

export class LibraryFacade extends AdvancedEventEmitter implements ILibraryFacade {
  membersLoadingState: LoadingStateBroker;
  booksLoadingState: LoadingStateBroker;
  loanProps: IPropEventBroker<ILoanProps | undefined, string>;
  editMemberProps: IPropEventBroker<IEditMemberProps | undefined>;
  saveMemberState: LoadingStateBroker;

  private memberLoadingStates: Map<string, IMemberLoadingStates> = new Map();

  constructor(
    private model: ILibrary,
    private services: ILibraryServices
  ) {
    super();

    this.membersLoadingState = new LoadingStateBroker(this);
    this.booksLoadingState = new LoadingStateBroker(this);
    this.loanProps = new PropEventBroker(this, undefined);
    this.editMemberProps = new PropEventBroker(this, undefined);
    this.saveMemberState = new LoadingStateBroker(this);
  }

  listMemberships(): IMembership[] {
    return this.services.libraryFactory.listMemberships();
  }

  endMemberEdit(): void {
    this.editMemberProps.set(undefined);
  }

  async saveCurrentMember(): Promise<void> {
    const member = this.editMemberProps.get()?.member;

    if (member) {
      this.saveMemberState.setLoading();

      if (member.isNew()) {
        await this.services.membersService.createMember(member);
      } else {
        await this.services.membersService.updateMember(member);
      }
      this.saveMemberState.setDone();

      this.reloadMember();
    }
  }

  async reloadMember() {
    this.model.members.removeAllItems();
    await this.loadMembersInternal();
  }

  startEditMember(memberId: string): void {
    this.editMemberProps.set({ member: this.model.members.getItem(memberId)! });
  }

  startCreateMember(): void {
    this.editMemberProps.set({ member: this.services.libraryFactory.createNewMember() });
  }

  async createLoan(memberId: string, bookId: string): Promise<LoanCreationState> {
    let creationState = LoanCreationState.SUCCESS;

    const [
      member,
      book,
      loans
    ] = await Promise.all([
      this.services.membersService.getMemberById(memberId),
      this.services.booksService.getBookById(bookId),
      this.services.loansService.getMemberLoans(memberId)
    ]);

    const membership = member.membership.get();
    const canLoan = membership.canLoan(loans);
    const hasInventory = book.quantity.get() > 0;

    if (canLoan && hasInventory) {
      const durationInDays = membership.getDurationInDays();
      const loan = await this.services.loansService.createLoan(memberId, bookId, durationInDays);

      member.loans.appendItem(loan);
      book.setQuantity(book.quantity.get() - 1);
    } else {
      creationState = LoanCreationState.CANT_LOAN;
    }

    return creationState;
  }
  startLoanCreation(props: ILoanProps): void {
    this.loanProps.set(props);
  }

  finishLoanCreation(): void {
    this.loanProps.set(undefined);
  }

  async returnLoan(loan: ILoan): Promise<void> {
    await this.services.loansService.returnLoan(loan);
    const memberId = loan.memberId.get();
    const member = this.model.members.getItem(memberId);

    if (member) {
      member.loans.removeItem(loan.getId());
    }
  }

  private getMemberLoadingStates(memberId: string): IMemberLoadingStates {
    let memberLoadingStates = this.memberLoadingStates.get(memberId);

    if (!memberLoadingStates) {
      memberLoadingStates = {
        memberLoadingState: new LoadingStateBroker(this),
        memberLoansLoadingState: new LoadingStateBroker(this)
      };

      this.memberLoadingStates.set(memberId, memberLoadingStates);
    }

    return memberLoadingStates;
  }

  private async loadMemberLoansInternal(memberId: string): Promise<ILoan[]> {
    const member = await this.loadMemberInternal(memberId);
    const currentState = this.getMemberLoadingStates(memberId).memberLoansLoadingState;
    let loans = member.loans.getOrderedItems();

    currentState.setLoading();
    loans = await this.services.loansService.getMemberLoans(memberId);

    member.loans.addItems({}, ...loans);
    currentState.setDone();

    return loans;
  }

  ensureMemberLoansLoaded(memberId: string): LoadingStateBroker {
    const loadingState = this.getMemberLoadingStates(memberId).memberLoansLoadingState;

    if (loadingState.get() === LoadingState.IDLE) {
      loadingState.setLoading();
      this.loadMemberLoansInternal(memberId);
    }

    return loadingState;
  }

  private async ensureMember(memberId: string): Promise<IMember> {
    let member = this.model.members.getItem(memberId);

    if (!member) {
      member = await this.loadMemberInternal(memberId);
    }

    return member;
  }

  private async loadMemberInternal(memberId: string): Promise<IMember> {
    const currentState = this.getMemberLoadingStates(memberId).memberLoadingState;

    currentState.setLoading();
    const member = await this.services.membersService.getMemberById(memberId);

    this.model.members.addItems({
      keepExistingItems: true,
      replaceItemInExistingIndices: true
    }, member);
    currentState.setDone();

    return this.model.members.getItem(memberId)!;
  }

  loadMember(memberId: string): LoadingStateBroker {
    const loadingState = this.getMemberLoadingStates(memberId).memberLoadingState;
    const existingMember = this.model.members.getItem(memberId);

    if (existingMember) {
      loadingState.setDone();
    } else {
      this.loadMemberInternal(memberId);
    }

    return loadingState;
  }

  changeLibraryDescription(newDescription: string): void {
    this.model.setDescription(newDescription);
  }

  private async loadMembersInternal(): Promise<void> {
    this.membersLoadingState.setLoading();

    const members = await this.services.membersService.listMembers();

    this.model.members.addItems({
      keepExistingItems: true,
      replaceItemInExistingIndices: true
    }, ...members);

    this.membersLoadingState.setDone();
  }

  async ensureMembersLoaded(): Promise<void> {
    const currentState = this.membersLoadingState.get();

    if (currentState === LoadingState.IDLE) {
      this.loadMembersInternal();
    }
  }

  async ensureBooksLoaded(): Promise<void> {
    const currentState = this.booksLoadingState.get();

    if (currentState === LoadingState.IDLE) {
      this.booksLoadingState.setLoading();

      const books = await this.services.booksService.listBooks();

      this.model.books.addItems({
        keepExistingItems: true,
        replaceItemInExistingIndices: true
      }, ...books);

      this.booksLoadingState.setDone();
    }
  }

  getModel(): ILibrary {
    return this.model;
  }
}