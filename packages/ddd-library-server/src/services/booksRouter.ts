import { wait } from '@zdrbm/zdr-native-tools';
import { BookDTO } from 'ddd-library-dto';
import { FastifyInstance } from 'fastify';

interface GetBookRequest {
  bookId: string;
}

interface ListBooksRequest {
}

export function booksRouter(fastify: FastifyInstance) {
  fastify.get<{Params: GetBookRequest}>('/:bookId', async (request/* , reply */): Promise<BookDTO> => {
    const book = await request.dataAccessLayer.getBookById(request.params.bookId);
    await wait(100);

    return book;
  });

  fastify.get<{Querystring: ListBooksRequest}>('/', async (request/* , reply */): Promise<BookDTO[]> => {
    await wait(1000);

    return await request.dataAccessLayer.listBooks();
  });
}