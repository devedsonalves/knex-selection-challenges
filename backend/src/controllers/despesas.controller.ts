import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';

export async function listarDespesasController(request: FastifyRequest, reply: FastifyReply) {
  const { dataEmissao, txtFornecedor, deputadoId, limit = '20', offset = '0' } = request.query as any;

  const where: any = {};
  if (dataEmissao) where.dataEmissao = dataEmissao;
  if (txtFornecedor) where.txtFornecedor = txtFornecedor;
  if (deputadoId) where.deputadoId = Number(deputadoId);

  const despesas = await prisma.despesa.findMany({
    where,
    take: Number(limit),
    skip: Number(offset),
    select: {
      id: true,
      deputadoId: true,
      dataEmissao: true,
      txtFornecedor: true,
      vlrLiquido: true,
    },
    orderBy: { dataEmissao: 'desc' },
  });

  return reply.send(despesas);
} 