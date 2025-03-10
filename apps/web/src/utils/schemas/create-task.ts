import { Dayjs, isDayjs } from 'dayjs';
import { z } from 'zod';

export const createSimpleTaskSchema = z.object({
  title: z.string().min(1),
});

export type CreateSimpleTaskSchema = z.infer<typeof createSimpleTaskSchema>;

export const createFullTaskSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional().default('low'),
  dueDate: z.custom<Dayjs>((val) => isDayjs(val), 'Invalid date'),
});

export type CreateFullTaskSchema = z.infer<typeof createFullTaskSchema>;
