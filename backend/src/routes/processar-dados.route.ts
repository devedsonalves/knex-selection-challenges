import { FastifyInstance } from 'fastify';
import { processarDadosController } from '../controllers/processar-dados.controller';

export async function processarDadosRoutes(app: FastifyInstance) {
  app.post('/processar-dados', {
    schema: {
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
          },
        },
        500: {
          type: 'object',
          properties: {
            error: { type: 'string' },
            details: { type: 'string' },
          },
        },
      },
    },
    handler: processarDadosController,
  });
} 