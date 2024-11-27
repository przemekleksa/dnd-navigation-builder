import { newItemSchema } from '@/schema/NewItem';
import { z } from 'zod';

type FormData = z.infer<typeof newItemSchema>;

export type MenuItem = FormData & { id: string; parentId?: string };
