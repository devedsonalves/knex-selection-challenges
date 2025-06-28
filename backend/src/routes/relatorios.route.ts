import { FastifyInstance } from 'fastify';
import { totalDespesasController, totalDespesasDeputadoController } from '../controllers/relatorios.controller';

export async function relatoriosRoutes(app: FastifyInstance) {
  app.get('/relatorios/total-despesas', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            total: { type: 'number' },
          },
        },
      },
    },
    handler: totalDespesasController,
  });

  app.get('/relatorios/deputados/:id/total-despesas', {
    schema: {
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' },
        },
        required: ['id'],
      },
      response: {
        200: {
          type: 'object',
          properties: {
            total: { type: 'number' },
          },
        },
      },
    },
    handler: totalDespesasDeputadoController,
  });
} 