import fastify from 'fastify';
import { utils } from './utils';
import cors from 'cors';
import helmet from 'helmet';
import fastifyExpress from '@fastify/express';
import { apiRouter } from './services/apiRouter';
import { FakeLibraryDAL, ILibraryDAL } from './dal/FakeLibraryDAL';

const port = Number(process.env.API_PORT) || 5001;
const host = process.env.API_HOST || '0.0.0.0';

declare module 'fastify' {
  interface FastifyRequest {
    dataAccessLayer: ILibraryDAL;
  }
}

const startServer = async () => {
  const server = fastify({
    logger: true
  });

  const dataAccessLayer = new FakeLibraryDAL();
  server.decorateRequest('dataAccessLayer', {
    getter() {
      return dataAccessLayer; // Return the shared instance or create per-request logic if needed
    }
  });
  await server.register(fastifyExpress);
  server.use(cors());
  server.use(helmet());

  server.register(apiRouter, { prefix: '/api' });

  // Set error handler
  server.setErrorHandler((error, _request, reply) => {
    server.log.error(error);
    reply.status(500).send({ error: 'Something went wrong' });
  });

  // Health check route
  server.get('/health', async (_request, reply) => {
    try {
      await utils.healthCheck();
      reply.status(200).send({
        message: 'Health check endpoint success.'
      });
    } catch (e) {
      reply.status(500).send({
        message: 'Health  check endpoint failed.'
      });
    }
  });

  // Root route
  server.get('/', (_, reply) => {
    reply.status(200).send({ message: 'Hello from fastify boilerplate!' });
  });

  // Graceful shutdown
  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM'];
  signals.forEach(signal => {
    process.on(signal, async () => {
      try {
        await server.close();
        server.log.error(`Closed application on ${signal}`);
        process.exit(0);
      } catch (err) {
        server.log.error(`Error closing application on ${signal}`, err);
        process.exit(1);
      }
    });
  });

  // Start server
  try {
    await server.listen({
      port,
      host
    });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

// Handle unhandled rejections
process.on('unhandledRejection', err => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});

startServer();
