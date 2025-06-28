import { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../lib/prisma';
import fetch from 'node-fetch';

type DeputadoApi = {
  id: number;
  nome: string;
  siglaPartido: string;
  siglaUf: string;
};

type DespesaApi = {
  codDocumento: number;
  dataDocumento: string;
  nomeFornecedor: string;
  valorLiquido: number;
  urlDocumento: string;
};

export async function processarDadosController(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const depRes = await fetch('https://dadosabertos.camara.leg.br/api/v2/deputados');
    const depJson = await depRes.json();
    const deputados: DeputadoApi[] = depJson.dados;

    for (const dep of deputados) {
      await prisma.deputado.upsert({
        where: { id: dep.id },
        update: {
          nome: dep.nome,
          uf: dep.siglaUf,
          partido: dep.siglaPartido,
        },
        create: {
          id: dep.id,
          nome: dep.nome,
          uf: dep.siglaUf,
          partido: dep.siglaPartido
        }
      });

      let pagina = 1;
      let acabou = false;
      while (!acabou) {
        const url = `https://dadosabertos.camara.leg.br/api/v2/deputados/${dep.id}/despesas?ano=2025&pagina=${pagina}&itens=100`;
        const res = await fetch(url);
        const json = await res.json();
        const despesas: DespesaApi[] = json.dados;

        for (const desp of despesas) {
          const exists = await prisma.despesa.findUnique({
            where: { id: desp.codDocumento }
          });
          if (!exists) {
            await prisma.despesa.create({
              data: {
                id: desp.codDocumento,
                deputadoId: dep.id,
                dataEmissao: desp.dataDocumento,
                txtFornecedor: desp.nomeFornecedor,
                vlrLiquido: desp.valorLiquido,
              }
            });
          }
        }

        acabou = despesas.length === 0;
        pagina++;
      }
    }

    return reply.status(201).send({ message: 'Deputados e despesas importados com sucesso!' });
  } catch (error) {
    return reply.status(500).send({ error: 'Erro ao importar dados', details: (error as Error).message });
  }
}