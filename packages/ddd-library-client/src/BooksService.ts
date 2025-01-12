import { IBook } from 'ddd-library-model';
import { ILibraryModelFactory } from './LibraryModelFactory';
import { memoize } from 'lodash';
import { IBooksClient } from './BooksClient';

export interface IBooksService {
  getBookById(bookId: string): Promise<IBook>;
  listBooks(): Promise<IBook[]>;
}

export class BooksService implements IBooksService {
  constructor(
    private factory: ILibraryModelFactory,
    private client: IBooksClient
  ) {}

  getBookById = memoize(async (bookId: string): Promise<IBook> => {
    const book = await this.client.getBook(bookId);

    return this.factory.createBook(book);
  });

  async listBooks(): Promise<IBook[]> {
    const members = await this.client.listBooks();

    return members.map(member => this.factory.createBook(member));
  }
}
