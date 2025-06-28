
import { z } from 'zod';

export const postSchema = z.object({
  title: z.string()
    .min(1, 'Título é obrigatório')
    .min(5, 'Título deve ter pelo menos 5 caracteres')
    .max(100, 'Título não pode exceder 100 caracteres'),
  body: z.string()
    .min(1, 'Conteúdo é obrigatório')
    .min(10, 'Conteúdo deve ter pelo menos 10 caracteres')
    .max(500, 'Conteúdo não pode exceder 500 caracteres'),
});

export type PostFormData = z.infer<typeof postSchema>;
