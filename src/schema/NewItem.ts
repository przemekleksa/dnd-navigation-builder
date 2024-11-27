import { z } from 'zod';

export const newItemSchema = z.object({
  name: z
    .string()
    .min(1, 'Nazwa jest wymagana')
    .max(50, 'Maksymalnie 50 znaków'),
  link: z.string().url('Podaj prawidłowy URL'),
});
