import { FastifyInstance } from 'fastify';
import { listarDeputadosController } from '../controllers/deputados.controller';

export async function deputadosRoutes(app: FastifyInstance) {
  app.get('/deputados', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          uf: { type: 'string', minLength: 2, maxLength: 2 }
        },
        required: ['uf']
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number' },
              nome: { type: 'string' },
              uf: { type: 'string' },
              cpf: { type: 'string' },
              partido: { type: 'string' },
            },
          },
        },
      },
    },
    handler: listarDeputadosController,
  });
} 