import { FastifyInstance } from 'fastify';
import { listarDespesasController } from '../controllers/despesas.controller';

export async function despesasRoutes(app: FastifyInstance) {
  app.get('/despesas', {
    schema: {
      querystring: {
        type: 'object',
        properties: {
          dataEmissao: { type: 'string' },
          txtFornecedor: { type: 'string' },
          deputadoId: { type: 'string' },
          limit: { type: 'string' },
          offset: { type: 'string' }
        }
      },
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              dataEmissao: { type: 'string' },
              txtFornecedor: { type: 'string' },
              vlrLiquido: { type: 'number' },
              urlDocumento: { type: 'string' },
            },
          },
        },
      },
    },
    handler: listarDespesasController,
  });
} 