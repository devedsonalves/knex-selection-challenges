import { FastifyInstance } from 'fastify';
import { processarDadosRoutes } from './processar-dados.route';
import { deputadosRoutes } from './deputados.route';
import { despesasRoutes } from './despesas.route';
import { relatoriosRoutes } from './relatorios.route';

export function routes(app: FastifyInstance) {  
  processarDadosRoutes(app);
  deputadosRoutes(app);
  despesasRoutes(app);
  relatoriosRoutes(app);
} 