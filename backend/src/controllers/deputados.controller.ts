import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';

export async function listarDeputadosController(request: FastifyRequest, reply: FastifyReply) {
  const { uf } = request.query as { uf: string };

  const deputados = await prisma.deputado.findMany({
    where: { uf: uf.toUpperCase() },
    select: {
      id: true,
      nome: true,
      uf: true,
      partido: true,
    },
  });
  
  return reply.send(deputados);
} 