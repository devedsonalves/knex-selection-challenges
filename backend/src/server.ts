import fastify from 'fastify';
import multipart from '@fastify/multipart';
import { routes } from './routes';

const app = fastify();
app.register(multipart);
routes(app);

app.listen({ port: 3333, host: '0.0.0.0' })
  .then(() => {
    console.log('🚀 Servidor rodando em http://localhost:3333');
  })
  .catch((err) => {
    console.error(err);
  }); 