import { z } from 'zod';

export const createMovementSchema = z.object({
  amount: z.number().positive(),
  concept: z.string().min(1),
  date: z.string().refine((d) => !isNaN(Date.parse(d)), {
    message: 'Invalid date',
  }),
  userId: z.string().min(10),
  type: z.enum(['INCOME', 'EXPENSE']),
});

export const updateMovementSchema = z.object({
  id: z.string().min(10),
  amount: z.number().positive().optional(),
  concept: z.string().min(1).optional(),
  date: z.string().optional(),
  type: z.enum(['INCOME', 'EXPENSE']).optional(),
});

export const deleteMovementSchema = z.object({
  id: z.string().min(10),
});
