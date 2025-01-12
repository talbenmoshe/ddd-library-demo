import { BookDTO } from 'ddd-library-dto';
import { IHttpClient } from './IHttpClient';

export interface IBooksClient {
  getBook(bookId: string): Promise<BookDTO>;
  listBooks(): Promise<BookDTO[]>;
}

export class BooksClient implements IBooksClient {
  constructor(private httpClient: IHttpClient) { }

  async getBook(bookId: string): Promise<BookDTO> {
    const httpResult = await this.httpClient.get<BookDTO>(`/api/books/${bookId}`);

    return httpResult.data;
  }

  async listBooks(): Promise<BookDTO[]> {
    const httpResult = await this.httpClient.get<BookDTO[]>('/api/books');

    return httpResult.data;
  }
}

