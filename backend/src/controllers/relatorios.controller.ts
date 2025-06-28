import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';

export async function totalDespesasController(request: FastifyRequest, reply: FastifyReply) {
  const result = await prisma.despesa.aggregate({
    _sum: { vlrLiquido: true }
  });
  
  return reply.send({ total: result._sum.vlrLiquido || 0 });
}

export async function totalDespesasDeputadoController(request: FastifyRequest, reply: FastifyReply) {
  const { id } = request.params as { id: string };

  const result = await prisma.despesa.aggregate({
    where: { deputadoId: Number(id) },
    _sum: { vlrLiquido: true }
  });
  
  return reply.send({ total: result._sum.vlrLiquido || 0 });
} 