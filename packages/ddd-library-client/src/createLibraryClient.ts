import { IHttpClient } from './IHttpClient';
import { ILibraryFacade, LibraryFacade } from './LibraryFacade';
import { LibraryModelFactory } from './LibraryModelFactory';
import { IMembersClient, MembersClient } from './MembersClient';
import { MembersService } from './MembersService';
import { BooksClient, IBooksClient } from './BooksClient';
import { ILoansClient, LoansClient } from './LoansClient';
import { LoansService } from './LoansService';
import { IMembershipPresenterFactory, MembershipPresenterFactory } from './presenters/MembershipPresenterFactory';
import { BooksService } from './BooksService';

interface ITransports {
  usersClient: IMembersClient;
  booksClient: IBooksClient;
  loansClient: ILoansClient;
}

function createTransports(httpClient: IHttpClient):ITransports {
  const usersClient = new MembersClient(httpClient);
  const booksClient = new BooksClient(httpClient);
  const loansClient = new LoansClient(httpClient);

  return {
    usersClient,
    booksClient,
    loansClient
  };
}

function createServices(transports: ITransports) {
  const membershipPresenter: IMembershipPresenterFactory = new MembershipPresenterFactory();
  const libraryFactory = new LibraryModelFactory();
  const membersService = new MembersService(libraryFactory, transports.usersClient);
  const loansService = new LoansService(libraryFactory, transports.loansClient);
  const booksService = new BooksService(libraryFactory, transports.booksClient);
  const model = libraryFactory.createLibrary();
  const facade = new LibraryFacade(model, {
    membersService,
    loansService,
    booksService,
    libraryFactory
  });

  return {
    facade,
    membershipPresenter
  };
}

export interface CreateClientResult {
  facade: ILibraryFacade;
  membershipPresenter: IMembershipPresenterFactory;
}

export function createLibraryClient(httpClient: IHttpClient): CreateClientResult {
  const transports = createTransports(httpClient);
  const services = createServices(transports);

  return services;
}

