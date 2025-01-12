import { FastifyInstance } from 'fastify';
import { membersRouter } from './membersRouter';
import { loansRouter } from './loansRouter';
import { booksRouter } from './booksRouter';

export function apiRouter(fastify: FastifyInstance) {
  fastify.register(membersRouter, { prefix: '/members' });
  fastify.register(loansRouter, { prefix: '/loans' });
  fastify.register(booksRouter, { prefix: '/books' });
}