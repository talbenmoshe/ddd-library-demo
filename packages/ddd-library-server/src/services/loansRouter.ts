import { wait } from '@zdrbm/zdr-native-tools';
import { LoanDTO } from 'ddd-library-dto';
import { FastifyInstance } from 'fastify';

interface GetLoanRequest {
  id: string;
}

interface CreateLoanRequest {
  memberId: string;
  bookId: string;
  durationInDays: string;
}

interface ListLoanRequest {
  memberId?: string;
}

export function loansRouter(fastify: FastifyInstance) {
  fastify.get<{Params: GetLoanRequest}>('/:id', async (request/* , reply */): Promise< LoanDTO> => {
    const loan = await request.dataAccessLayer.getLoanById(request.params.id);
    await wait(100);

    return loan;
  });

  fastify.delete<{Params: GetLoanRequest}>('/:id', async (request/* , reply */): Promise<void> => {
    await request.dataAccessLayer.deleteLoad(request.params.id);
    await wait(100);
  });

  fastify.get<{Querystring: ListLoanRequest}>('/', async (request/* , reply */): Promise<LoanDTO[]> => {
    const memberId = request.query.memberId;
    await wait(1000);

    return await request.dataAccessLayer.listLoans({ memberId });
  });

  fastify.post<{Body: CreateLoanRequest}>('/', async (request/* , reply */): Promise<LoanDTO> => {
    const memberId = request.body.memberId;
    const bookId = request.body.bookId;
    const durationInDays = parseInt(request.body.durationInDays);
    const member = await request.dataAccessLayer.getMemberById(memberId);
    const book = await request.dataAccessLayer.getBookById(bookId);
    const newLoan: Omit<LoanDTO, 'id'> = {
      memberId,
      bookId,
      memberName: member.name,
      bookTitle: book.title,
      loanTime: new Date().toISOString(),
      returnTime: new Date(Date.now() + durationInDays * 24 * 60 * 60 * 1000).toISOString()
    };

    const result = await request.dataAccessLayer.createLoan(newLoan);

    return result;
  });
}